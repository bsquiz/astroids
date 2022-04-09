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
	display: new Display(),
	audio: new AudioPlayer(),
	ship: new Ship(),
	shipExplosion: new Explosion(4),
	bullets: [],
	explosions: [],
	waves: [1, 3, 5, 8, 13],
	currentWave: -1,
	oldScore: 0,
	score: 0,
	oldLives: 3,
	waveIntroTimer: 0,
	MAX_WAVE_INTRO_TIMER: 100,
	isDebug: false,
	isMobile: false,
	
	gameOver() {
		this.state = this.State.GAME_OVER;
		this.saveHighScore(this.score);
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

	spawnAstroid(x, y, type) {
		const astroid = this.spawnGameObject(x, y, Math.random() * Math.PI, this.astroids);

		astroid.setType(type);
	},

	updateBullets() {
		const activeBullets = this.bullets.filter(bullet => bullet.isActive);

		activeBullets.forEach(bullet => {
			bullet.update();
		});
	},

	checkCanShoot() {
		return this.keysDown[Utils.Keys.SPACE]
			&& this.ship.canShoot;
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
				if (this.ship.hasShield) {
					this.ship.hasShield = false;
					this.ship.isInvincible = true;
				} else {
					const { x, y, dir } = this.ship;

					this.spawnGameObject(x, y, dir, this.explosions);
					this.shipExplosion.reset();
					this.shipExplosion.activate();
					this.ship.lives--;
					this.display.drawHUD(this.score, this.ship.lives);
					this.ship.isInvincible = true;
					this.ship.resetPosition();
					//this.audio.play(this.audio.Sound.EXPLOSION);

					if (this.ship.lives === 0) {
						this.gameOver();
					}
				}
			}
		}
	},
	updateAstroids() {
		const activeAstroids = this.astroids.filter(astroid => astroid.isActive);
		const activeBullets = this.bullets.filter(bullet => bullet.isActive);

		activeAstroids.forEach(astroid => {
			astroid.update();

			activeBullets.forEach(bullet => {
				if (Utils.hitTest(bullet, astroid)) {
					bullet.isActive = false;

					if (astroid.takeDamage(1)) {
						const { x, y, dir, points, type } = astroid;
						let spawnType = Utils.AstroidType.MEDIUM;

						this.spawnGameObject(x, y, 0, this.explosions);

						this.score += points;

						if (type === Utils.AstroidType.MEDIUM) {
							spawnType = Utils.AstroidType.SMALL;
						}

						if (type !== Utils.AstroidType.SMALL) {
													this.spawnAstroid(x, y, spawnType);
						this.spawnAstroid(x, y, spawnType);

						}

						astroid.reset();
						bullet.reset();
						this.audio.playExplosionSnd();
					}
				}
			});

			this.hitTestShip(astroid);
		});
	},
	updateExplosions() {
		this.explosions.forEach(explosion => {
			if (explosion.isActive) {
				explosion.update();
			}
		});
	},
	updateShip() {
		this.ship.update();

		if (this.checkCanShoot()) {
			const { x, y, width, dir } = this.ship;

			const bullet = this.spawnGameObject(
			Math.floor(x + width / 2), y, dir, this.bullets);
			this.ship.canShoot = false;
			this.audio.playPlayerShootSnd();
		}

		if (this.keysDown[Utils.Keys.UP]) {
			this.ship.thrust();
		} else if (this.keysDown[Utils.Keys.DOWN]) {
			dir = Utils.Angle.UP;
		} else if (this.keysDown[Utils.Keys.LEFT]) {
			this.ship.rotate(Utils.Direction.COUNTER_CLOCKWISE);
		} else if (this.keysDown[Utils.Keys.RIGHT]) {
			this.ship.rotate(Utils.Direction.CLOCKWISE);
		}
	},

	update() {
		if (this.isRunning) {
			this.currentFrame++;
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
					this.updateAstroids();
					this.updateBullets();
					this.updateExplosions();

					if (!this.astroids.find(astroid => astroid.isActive)) {
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

			window.requestAnimationFrame(() => game.update());
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

		const totalAstroids = this.waves[this.currentWave];

		for (let i = 0; i < totalAstroids; i++) {
			this.spawnAstroid(0, 0, Utils.AstroidType.LARGE);
		}

		this.ship.reset();
		this.explosions.forEach(explosion => {
			explosion.reset();
		});
		this.bullets.forEach(bullet => {
			bullet.reset();
		});

	},
	reset() {
		this.isMobile = window.matchMedia('max-width: 900px').matches;
		this.state = 0;
		this.ship = new Ship();
		this.bullets = [];
		this.explosions = [];
		this.astroids = [];
		this.score = 0;
		this.currentWave = -1;
		for (let i = 0; i<10; i++) {
			this.explosions.push(new Explosion());
			this.bullets.push(new Bullet());
		}
		for (let i=0; i<78; i++) {
			this.astroids.push(new Astroid());
		}
		this.nextWave();
		this.audio.init();

		this.ship.resetPosition();
		//this.ship.maxSpeed = 5; // test
		//this.display.drawHUD(this.score, this.ship.lives);
	},
	start() {
		this.state = this.State.WAVE_INTRO;
		//this.audio.playBGM();
	},
	getHighScore() {
		return window.localStorage.getItem('astroids_highscore') || 0;
	},
	saveHighScore(score) {
		const oldScore = this.getHighScore();

		if (oldScore < score) {
			window.localStorage.setItem('astroids_highscore', score);
		}
	}
};