const game = {
	State: {
		MENU: 0,
		PLAYING: 1,
		GAME_OVER: 2,
		PAUSE: 3,
		GAME_WIN: 4,
		WAVE_INTRO: 5
	},
	keysDown: {
		'ArrowUp': false,
		'ArrowDown': false,
		'ArrowRight': false,
		'ArrowLeft': false,
		'Space': false
	},

	state: 0,
	isRunning: true,
	currentFrame: 0,
	fps: 0,
	fpsFrameCount: 0,
	fpsLastTime: 0,
	display: new Display(),
	audio: new AudioPlayer(),
	ship: new Ship(),
	shipExplosion: new ShipBreakup(),
	bullets: [],
	alienBullets: [],
	explosions: [],
	bonusItem: new BonusItem(),
	alienShip: new AlienShip(),
	waves: [1, 3, 5, 8, 13],
	currentWave: -1,
	oldScore: 0,
	score: 0,
	oldLives: 3,
	waveIntroTimer: 0,
	MAX_WAVE_INTRO_TIMER: 100,
	bonusSpawnTimer: 0,
	bonusSpawnDelay: 900,
	alienSpawnTimer: 0,
	alienSpawnDelay: 1200,
	alienShootTimer: 0,
	alienShootDelay: 90,
	isDebug: false,
	debugInvincibility: false,
	isMobile: false,
	
	gameOver() {
		this.state = this.State.GAME_OVER;
		this.saveHighScore(this.score);
		this.display.clearAll();
		this.display.drawMenu(this.getHighScore());
		this.score = 0;
	},

	gameWin() {
		this.state = this.State.GAME_WIN;
		this.saveHighScore(this.score);
		this.display.drawMenu(this.getHighScore());
	},

	spawnGameObject(x, y, dir, gameObjects) {
		for (let i=0; i<gameObjects.length; i++) {
			const gameObject = gameObjects[i];

			if (!gameObject.isActive) {
				gameObject.x = x;
				gameObject.y = y;
				gameObject.turn(dir);
				gameObject.reset();
				gameObject.activate();

				return gameObject;
			}	
		}
	},

	spawnAsteroid(x, y, type) {
		const asteroid = this.spawnGameObject(x, y, Math.random() * Math.PI, this.asteroids);

		asteroid.setType(type);

		return asteroid;
	},
	breakAsteroid(asteroid, awardPoints = true, playSound = true) {
		const { x, y, points, type } = asteroid;
		let spawnType = Utils.AsteroidType.MEDIUM;

		this.spawnGameObject(x, y, 0, this.explosions);

		if (awardPoints) {
			this.score += points;
		}

		if (type === Utils.AsteroidType.MEDIUM) {
			spawnType = Utils.AsteroidType.SMALL;
		}

		if (type !== Utils.AsteroidType.SMALL) {
			this.spawnAsteroid(x, y, spawnType);
			this.spawnAsteroid(x, y, spawnType);
		}

		asteroid.reset();

		if (playSound) {
			this.audio.playExplosionSnd();
		}
	},
	setNextBonusSpawnDelay() {
		this.bonusSpawnDelay = 900 + Math.floor(Math.random() * 900);
		this.bonusSpawnTimer = 0;
	},
	spawnBonusItem() {
		if (this.bonusItem.isActive) return;

		this.bonusItem.randomPosition();
		this.bonusItem.turn(Math.random() * Math.PI * 2);
		this.bonusItem.reset();
		this.bonusItem.activate();
		this.setNextBonusSpawnDelay();
	},
	setNextAlienSpawnDelay() {
		this.alienSpawnDelay = 1200 + Math.floor(Math.random() * 1200);
		this.alienSpawnTimer = 0;
	},
	spawnAlienShip() {
		if (this.alienShip.isActive) return;

		this.alienShip.spawn();
		this.setNextAlienSpawnDelay();
		this.setNextAlienShootDelay();
	},
	setNextAlienShootDelay() {
		this.alienShootDelay = 70 + Math.floor(Math.random() * 110);
		this.alienShootTimer = 0;
	},
	spawnAlienBullet() {
		const alienCenterX = this.alienShip.x + this.alienShip.width / 2;
		const alienCenterY = this.alienShip.y + this.alienShip.height / 2;
		const shipCenterX = this.ship.x + this.ship.width / 2;
		const shipCenterY = this.ship.y + this.ship.height / 2;
		const dir = Utils.turnTowardsPoint(alienCenterX, alienCenterY, shipCenterX, shipCenterY);

		this.spawnGameObject(alienCenterX, alienCenterY, dir, this.alienBullets);
	},
	destroyAlienShip(bullet) {
		const alienCenterX = this.alienShip.x + this.alienShip.width / 2;
		const alienCenterY = this.alienShip.y + this.alienShip.height / 2;

		this.spawnGameObject(alienCenterX, alienCenterY, 0, this.explosions);
		this.score += 1000;
		this.display.drawHUD(this.score, this.ship.lives);
		this.alienShip.reset();
		bullet.reset();
		this.audio.playExplosionSnd();
	},

	updateBullets() {
		const activeBullets = this.bullets.filter(bullet => bullet.isActive);

		activeBullets.forEach(bullet => {
			bullet.update();

			if (this.alienShip.isActive && Utils.rectsOverlap(bullet, this.alienShip)) {
				this.destroyAlienShip(bullet);
			}
		});
	},
	updateAlienBullets() {
		const activeAlienBullets = this.alienBullets.filter(bullet => bullet.isActive);

		activeAlienBullets.forEach(bullet => {
			bullet.update();

			if (Utils.rectsOverlap(this.ship, bullet) && this.damageShip()) {
				bullet.reset();
			}
		});
	},

	checkCanShoot() {
		return this.keysDown[Utils.Keys.SPACE]
			&& this.ship.canShoot;
	},
	applyDebugInvincibility() {
		if (!this.debugInvincibility) return;

		this.ship.isInvincible = true;
		this.ship.invincibleTimer = Infinity;
	},
	toggleDebugInvincibility() {
		if (!this.isDebug) return;

		this.debugInvincibility = !this.debugInvincibility;
		this.ship.isInvincible = this.debugInvincibility;
		this.ship.invincibleTimer = this.debugInvincibility ? Infinity : this.ship.MAX_INVINCIBLE_TIMER;
	},

	damageShip() {
		if (this.ship.isInvincible) return false;

		if (this.ship.hasShield) {
			this.ship.hasShield = false;
			this.ship.isInvincible = true;
			return true;
		}

		const { x, y, dir } = this.ship;

		this.spawnGameObject(x, y, dir, this.explosions);
		this.shipExplosion.spawnFromShip(this.ship);
		this.ship.lives--;
		this.display.drawHUD(this.score, this.ship.lives);
		this.ship.isInvincible = true;
		this.ship.resetPosition();
		this.audio.playExplosionSnd();

		if (this.ship.lives === 0) {
			this.audio.playGameOverSnd();
			this.gameOver();
		}

		return true;
	},

	hitTestShip(hitTestObject) {
		if (!this.ship.isInvincible) {
			let isHit = false;
			const hitBoxes = this.ship.getPerimeterHitBoxes();

			for (let i=0; i<hitBoxes.length; i++) {
				if (Utils.hitTest(hitBoxes[i], hitTestObject)) {
					isHit = true;
					break;
				}
			}
			if (isHit) {
				return this.damageShip();
			}
		}

		return false;
	},
	updateAsteroids() {
		const activeAsteroids = this.asteroids.filter(asteroid => asteroid.isActive);
		const activeBullets = this.bullets.filter(bullet => bullet.isActive);

		activeAsteroids.forEach(asteroid => {
			asteroid.update();

			activeBullets.forEach(bullet => {
				if (Utils.hitTest(bullet, asteroid)) {
					bullet.isActive = false;

					if (asteroid.takeDamage(1)) {
						this.breakAsteroid(asteroid);
						bullet.reset();
					}
				}
			});

			if (asteroid.isActive && this.hitTestShip(asteroid)) {
				this.breakAsteroid(asteroid, false, false);
			}
		});
	},
	updateExplosions() {
		this.explosions.forEach(explosion => {
			if (explosion.isActive) {
				explosion.update();
			}
		});
		if (this.shipExplosion.isActive) {
			this.shipExplosion.update();
		}
	},
	updateBonusItem() {
		if (this.bonusItem.isActive) {
			this.bonusItem.update();
			if (!this.bonusItem.isActive) return;

			if (Utils.rectsOverlap(this.ship, this.bonusItem)) {
				this.score += this.bonusItem.points;
				this.bonusItem.reset();
				this.display.drawHUD(this.score, this.ship.lives);
				this.audio.playBonusPickupSnd();
			}

			return;
		}

		this.bonusSpawnTimer++;
		if (this.bonusSpawnTimer >= this.bonusSpawnDelay) {
			this.spawnBonusItem();
		}
	},
	updateAlienShip() {
		if (this.alienShip.isActive) {
			this.alienShip.update();
			this.alienShootTimer++;

			if (this.alienShootTimer >= this.alienShootDelay) {
				this.spawnAlienBullet();
				this.setNextAlienShootDelay();
			}

			return;
		}

		this.alienSpawnTimer++;
		if (this.alienSpawnTimer >= this.alienSpawnDelay) {
			this.spawnAlienShip();
		}
	},
	updateShip() {
		this.ship.update();

		if (this.checkCanShoot()) {
			const { x, y, width, height, dir } = this.ship;

			const bullet = this.spawnGameObject(
			Math.floor(x + width / 2), Math.floor(y + height / 2), dir, this.bullets);
			this.ship.canShoot = false;
			this.audio.playPlayerShootSnd();
		}

		if (this.keysDown[Utils.Keys.UP]) {
			this.ship.thrust();
			this.audio.startThrusterSnd();
		} else {
			this.audio.stopThrusterSnd();
		}

		if (this.keysDown[Utils.Keys.LEFT]) {
			this.ship.rotate(Utils.Direction.COUNTER_CLOCKWISE);
		} else if (this.keysDown[Utils.Keys.RIGHT]) {
			this.ship.rotate(Utils.Direction.CLOCKWISE);
		}
	},

	update(timestamp = performance.now()) {
		if (this.isRunning) {
			this.currentFrame++;
			this.updateFPS(timestamp);
			switch (this.state) {
				case this.State.WAVE_INTRO:
					this.waveIntroTimer++;

					if (this.waveIntroTimer === this.MAX_WAVE_INTRO_TIMER) {
						this.waveIntroTimer = 0;
						this.state = this.State.PLAYING;
					}
				break;
				case this.State.PLAYING:
					this.updateShip();
					this.updateAsteroids();
					this.updateBullets();
					this.updateAlienBullets();
					this.updateExplosions();
					this.updateBonusItem();
					this.updateAlienShip();

					if (!this.asteroids.find(asteroid => asteroid.isActive)) {
						this.audio.playWaveClearSnd();
						this.nextWave();
					}
				break;

				case this.State.GAME_OVER:

				case this.State.MENU:
					if (this.keysDown[Utils.Keys.SPACE]) {
						this.reset();
						this.start();
					}
				break;
			}

			if (this.state === this.State.PLAYING || this.state === this.State.WAVE_INTRO) {
				this.display.draw(this, this.shouldUpdateHUD());
			}

			if (isGamepadConnected()) {
				const input = getGamepadInput();
				const keys = Object.keys(this.keysDown);

				keys.forEach(key => {
					this.keysDown[key] = false;
				});

				if (input.left) this.keysDown[Utils.Keys.LEFT] = true;
				if (input.right) this.keysDown[Utils.Keys.RIGHT] = true;
				if (input.up) this.keysDown[Utils.Keys.UP] = true;
				if (input.down) this.keysDown[Utils.Keys.DOWN] = true;
				if (input.confirm) this.keysDown[Utils.Keys.SPACE] = true;
			}

			window.requestAnimationFrame(timestamp => game.update(timestamp));
		}
	},
	updateFPS(timestamp) {
		if (!this.fpsLastTime) {
			this.fpsLastTime = timestamp;
		}

		this.fpsFrameCount++;

		if (timestamp - this.fpsLastTime >= 500) {
			this.fps = Math.round(this.fpsFrameCount * 1000 / (timestamp - this.fpsLastTime));
			this.fpsFrameCount = 0;
			this.fpsLastTime = timestamp;
		}
	},
	shouldUpdateHUD() {
		return this.ship.lives !== this.oldLives
		|| this.score !== this.oldScore;
	},
	nextWave() {
		this.state = this.State.WAVE_INTRO;
		if (this.currentWave < this.waves.length - 1) {
			this.currentWave++;
		}

		const totalAsteroids = this.waves[this.currentWave];

		for (let i = 0; i < totalAsteroids; i++) {
			const asteroid = this.spawnAsteroid(0, 0, Utils.AsteroidType.LARGE);

			asteroid.randomPosition();
		}

		this.ship.reset();
		this.explosions.forEach(explosion => {
			explosion.reset();
		});
		this.bullets.forEach(bullet => {
			bullet.reset();
		});
		this.alienBullets.forEach(bullet => {
			bullet.reset();
		});
		this.bonusItem.reset();
		this.alienShip.reset();
		this.shipExplosion.reset();
		this.setNextBonusSpawnDelay();
		this.applyDebugInvincibility();

	},
	reset() {
		this.isMobile = window.matchMedia('(max-width: 900px)').matches;
		this.state = 0;
		this.ship = new Ship();
		this.bullets = [];
		this.alienBullets = [];
		this.explosions = [];
		this.asteroids = [];
		this.bonusItem = new BonusItem();
		this.alienShip = new AlienShip();
		this.shipExplosion = new ShipBreakup();
		this.score = 0;
		this.currentWave = -1;
		this.setNextBonusSpawnDelay();
		this.setNextAlienSpawnDelay();


		for (let i = 0; i<10; i++) {
			this.explosions.push(new Explosion());
			this.bullets.push(new Bullet());
			this.alienBullets.push(new AlienBullet());
		}
		for (let i=0; i<78; i++) {
			this.asteroids.push(new Asteroid());
		}
		this.nextWave();
		this.audio.init();

		this.ship.resetPosition();
		this.applyDebugInvincibility();
		//this.ship.maxSpeed = 5; // test
		//this.display.drawHUD(this.score, this.ship.lives);
	},
	start() {
		this.state = this.State.WAVE_INTRO;
		// draw hud first time
		this.display.drawHUD(this.score, this.ship.lives);
		//this.audio.playBGM();
	},
	getHighScore() {
		return window.localStorage.getItem('asteroids_highscore')
			|| window.localStorage.getItem('astroids_highscore')
			|| 0;
	},
	saveHighScore(score) {
		const oldScore = this.getHighScore();

		if (oldScore < score) {
			window.localStorage.setItem('asteroids_highscore', score);
		}
	}
};
