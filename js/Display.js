class Display {
	constructor() {
		this.$playArea = document.getElementById('playArea');
		this.$hudArea = document.getElementById('hudArea');
		this.$gameWrapper = document.getElementById('gameWrapper');
		
		this.$playArea.width = Utils.WIDTH;
		this.$playArea.height = Utils.HEIGHT;
		this.playAreaContext = this.$playArea.getContext('2d');

		this.$hudArea.width = Utils.WIDTH;
		this.$hudArea.height = Utils.HUD_HEIGHT;
		this.hudAreaContext = this.$hudArea.getContext('2d');

		this.hudAreaContext.fillStyle = 'white';
		this.hudAreaContext.strokeStyle = 'white';
		this.playAreaContext.strokeStyle = 'white';
		this.LIFE_ICON_WIDTH = 16;
	}

	init(isDebug) {
		this.isDebug = isDebug;

	}

	drawWaveIntro(wave) {
		Utils.Font.drawString(
			`wave ${wave}`,
			50, 50, 8,
			this.playAreaContext
			);
	}
	drawMenu(highScore = 0) {
		const hasTouchControls = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)').matches;

		this.playAreaContext.clearRect(0, 0, Utils.WIDTH, Utils.HEIGHT);
		this.playAreaContext.fillStyle = 'white';
		Utils.Font.drawString(
			'asteroids',
			0,0,8,
			this.playAreaContext);
		Utils.Font.drawString(
			`high score ${highScore}`,
			0,100,6,
			this.playAreaContext);
		if (hasTouchControls) {
			Utils.Font.drawString(
				'move: pad',
				0,200,4,
				this.playAreaContext);
			Utils.Font.drawString(
				'shoot: tap',
				400,200,4,
				this.playAreaContext);
		} else {
			Utils.Font.drawString(
				'move: arrows',
				0,200,4,
				this.playAreaContext);
			Utils.Font.drawString(
				'shoot: spacebar',
				400,200,4,
				this.playAreaContext);
		}

		Utils.Font.drawString(
			hasTouchControls ? 'tap shoot to start' : 'press space to start',
			0,400,6,
			this.playAreaContext);

	}
	drawHUD(score, lives) {
		this.hudAreaContext.clearRect(0, 0, Utils.WIDTH, Utils.HUD_HEIGHT);
		Utils.Font.drawString(
			`${score}`,
			0,
			0,
			2,
			this.hudAreaContext
		);
		this.hudAreaContext.save();
		this.hudAreaContext.beginPath();
		this.hudAreaContext.translate(Utils.WIDTH - (lives * Utils.HUD_HEIGHT),
			Utils.HUD_HEIGHT / 2);
		this.hudAreaContext.rotate(Math.PI);

		for (let i=0; i<lives; i++) {
			this.hudAreaContext.translate(Utils.HUD_HEIGHT, 0);

			this.drawShip(Utils.HUD_HEIGHT, Utils.HUD_HEIGHT, this.hudAreaContext);
		}
		this.hudAreaContext.restore();
		this.hudAreaContext.stroke();
	}

	drawShip(width, height, context = this.playAreaContext) {
		context.moveTo(width / 2 * -1, height / 2 * -1);
		context.lineTo(0, height / 2);
		context.lineTo(width / 2,  height / 2 * -1);
		context.lineTo(0, 0);
		context.lineTo(width / 2 * -1, height / 2 * -1);
	}
	drawPlayer(player) {
		/*

		-----*-----
		----*-*----
		---*---*---
		--*--*--*--
		-*-*---*-*-
        *---------*

        */
		const { x, y, width, height, dir, isAccelerating } = player;
		const centerX = x + width / 2;
		const centerY = y + height / 2;

		this.playAreaContext.save();
		this.playAreaContext.translate(centerX, centerY);
		this.playAreaContext.rotate(dir + Math.PI / 2 * -1);
		this.drawShip(width, height);

		if (isAccelerating) {
			// draw thrust
			this.playAreaContext.moveTo(0, height / 2 * -1);
			this.playAreaContext.lineTo(width / 4, height / 4 * -1);
			this.playAreaContext.moveTo(width / 4 * -1, height / 4 * -1);
			this.playAreaContext.lineTo(0, height / 2 * -1);

		}


		this.playAreaContext.restore();
	}

	drawLargeAsteroid(width, height) {
		this.playAreaContext.moveTo((width / 2) * -1, height / 4 * -1);
		this.playAreaContext.lineTo(width / 4 * -1, height / 2 * -1);
		this.playAreaContext.lineTo(width / 2, height / 2 * -1);

		this.playAreaContext.lineTo(width / 2, height / 4);
		this.playAreaContext.lineTo(width / 4 * -1, height / 2);
		this.playAreaContext.lineTo(width / 2 * -1, height / 4 * -1);
	}

	drawMediumAsteroid(width, height) {
		this.playAreaContext.moveTo((width / 2) * -1, (height / 2) * -1);
		this.playAreaContext.lineTo((width / 4), height / 4 * -1);
		this.playAreaContext.lineTo((width / 2), (height / 4));
		this.playAreaContext.lineTo((width / 4) * -1, (height / 4));
		this.playAreaContext.lineTo((width / 2) * -1, (height / 2) * -1);
	}
	drawSmallAsteroid(width, height) {
		this.playAreaContext.moveTo(width / 2 * -1, height / 2 * -1);
		this.playAreaContext.lineTo(width / 1.5, height / 2 * -1);
		this.playAreaContext.lineTo(width / 1.5, height / 2);
		this.playAreaContext.lineTo(width / 2 * -1, height / 2);
		this.playAreaContext.lineTo(width / 2 * -1, height / 2 * -1);
	}
	drawAsteroid(asteroid) {
		const { x, y, width, height, dir, type } = asteroid;

		this.playAreaContext.save();
		this.playAreaContext.translate(x + width / 2, y + height / 2);
		this.playAreaContext.rotate(dir);

		if (type === Utils.AsteroidType.LARGE) {
			this.drawLargeAsteroid(width, height);
		} else if (type === Utils.AsteroidType.MEDIUM) {
			this.drawMediumAsteroid(width, height);
		} else {
			this.drawSmallAsteroid(width, height);
		}

		this.playAreaContext.restore();
	}
	drawAlien(alien) {

	}

	drawBullet(bullet) {
		const { x, y, width, height, dir } = bullet;

		this.playAreaContext.beginPath();
		this.playAreaContext.fillStyle = 'yellow';
		this.playAreaContext.arc(x, y, width, 0, Math.PI * 2);
		this.playAreaContext.fill();
	
	}
	drawBonusItem(bonusItem) {
		const { x, y, width, height, dir } = bonusItem;
		const centerX = x + width / 2;
		const centerY = y + height / 2;

		this.playAreaContext.save();
		this.playAreaContext.translate(centerX, centerY);
		this.playAreaContext.rotate(dir);
		this.playAreaContext.beginPath();
		this.playAreaContext.fillStyle = '#ffd84d';
		this.playAreaContext.moveTo(0, height / 2 * -1);
		this.playAreaContext.lineTo(width / 2, 0);
		this.playAreaContext.lineTo(0, height / 2);
		this.playAreaContext.lineTo(width / 2 * -1, 0);
		this.playAreaContext.closePath();
		this.playAreaContext.fill();
		this.playAreaContext.strokeStyle = 'white';
		this.playAreaContext.stroke();
		this.playAreaContext.beginPath();
		this.playAreaContext.strokeStyle = '#fff4a3';
		this.playAreaContext.moveTo(0, height / 2 * -0.65);
		this.playAreaContext.lineTo(width / 4, 0);
		this.playAreaContext.lineTo(0, height / 2 * 0.65);
		this.playAreaContext.lineTo(width / 4 * -1, 0);
		this.playAreaContext.closePath();
		this.playAreaContext.stroke();
		this.playAreaContext.restore();
	}

	drawExplosion(explosion) {
		
		const { aliveTime, TOTAL_ALIVE_TIME } = explosion;

		this.playAreaContext.globalAlpha = (TOTAL_ALIVE_TIME - aliveTime) * .01;
		explosion.particles.forEach(particle => {
			const { x, y, color } = particle;
			this.playAreaContext.beginPath();
			this.playAreaContext.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
			this.playAreaContext.arc(x, y, 2, 0,Math.PI * 2);
			this.playAreaContext.fill();
		});
		this.playAreaContext.globalAlpha = 1;

	}
	drawShipBreakup(shipExplosion) {
		const { x, y, aliveTime, TOTAL_ALIVE_TIME } = shipExplosion;

		this.playAreaContext.save();
		this.playAreaContext.globalAlpha = (TOTAL_ALIVE_TIME - aliveTime) / TOTAL_ALIVE_TIME;
		this.playAreaContext.strokeStyle = 'white';
		this.playAreaContext.lineWidth = 2;
		shipExplosion.fragments.forEach(fragment => {
			const centerX = (fragment.x1 + fragment.x2) / 2;
			const centerY = (fragment.y1 + fragment.y2) / 2;

			this.playAreaContext.save();
			this.playAreaContext.translate(x + centerX, y + centerY);
			this.playAreaContext.rotate(fragment.rotation);
			this.playAreaContext.beginPath();
			this.playAreaContext.moveTo(fragment.x1 - centerX, fragment.y1 - centerY);
			this.playAreaContext.lineTo(fragment.x2 - centerX, fragment.y2 - centerY);
			this.playAreaContext.stroke();
			this.playAreaContext.restore();
		});
		this.playAreaContext.restore();
	}

	clearAll() {
		this.playAreaContext.clearRect(0, 0, Utils.WIDTH, Utils.HEIGHT);
		this.hudAreaContext.clearRect(0, 0, Utils.WIDTH, Utils.HEIGHT);
	}

	draw(game, updateHUD = false) {
		const { ship, shipExplosion, bullets, asteroids, explosions, bonusItem, isDebug, score, state, currentWave,
			State } = game;
		const { lives } = ship;

		const activeExplosions = explosions.filter(explosion => explosion.isActive);
		const activeBullets = bullets.filter(bullet => bullet.isActive);
		const activeAsteroids = asteroids.filter(asteroid => asteroid.isActive);

		this.playAreaContext.clearRect(0, 0, Utils.WIDTH, Utils.HEIGHT);

		if (state === State.WAVE_INTRO) {
			this.drawWaveIntro(currentWave + 1);

			return;
		}
		
		this.playAreaContext.strokeStyle = 'white';
		this.playAreaContext.fillStyle = 'white';
		this.playAreaContext.beginPath();
		this.drawPlayer(ship);

		activeAsteroids.forEach(asteroid => {
			this.drawAsteroid(asteroid);
		});
		this.playAreaContext.stroke();

		activeBullets.forEach(bullet => {
			this.drawBullet(bullet);
		});
		if (bonusItem.isActive) {
			this.drawBonusItem(bonusItem);
		}

		activeExplosions.forEach(explosion => {
			this.drawExplosion(explosion);
		});
		if (shipExplosion.isActive) {
			this.drawShipBreakup(shipExplosion);
		}
		if (updateHUD) {
			this.drawHUD(score, lives);
		}
		if (isDebug) {
			const debugObjects = [
				...activeAsteroids,
				...activeBullets,
				ship
			];

			this.playAreaContext.strokeStyle = 'red';
			debugObjects.forEach(debugObject => {
				const { x, y, width, height } = debugObject;

				this.playAreaContext.strokeRect(x, y, width, height);
			});
		}
	}
}
