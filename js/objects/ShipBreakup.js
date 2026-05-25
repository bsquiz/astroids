class ShipBreakup extends GameObject {
	constructor() {
		super();
		this.hasAliveTimer = true;
		this.TOTAL_ALIVE_TIME = 70;
		this.reset();
	}

	spawnFromShip(ship) {
		this.x = ship.x + ship.width / 2;
		this.y = ship.y + ship.height / 2;
		this.dir = ship.dir;
		this.reset();
		this.activate();
	}

	reset() {
		super.reset();
		this.fragments = [
			this.createFragment(-16, -16, 0, 16, -2.1),
			this.createFragment(0, 16, 16, -16, -0.7),
			this.createFragment(16, -16, 0, 0, 0.7),
			this.createFragment(0, 0, -16, -16, 2.1)
		];
	}

	createFragment(x1, y1, x2, y2, dirOffset) {
		const speed = 1.4 + Math.random() * 1.2;
		const dir = this.dir + dirOffset;

		return {
			x1,
			y1,
			x2,
			y2,
			xSpeed: Math.cos(dir) * speed,
			ySpeed: Math.sin(dir) * speed,
			rotation: dir,
			rotationSpeed: Utils.randomMagnitude(0.08)
		};
	}

	update() {
		this.aliveTime++;
		this.fragments.forEach(fragment => {
			fragment.x1 += fragment.xSpeed;
			fragment.y1 += fragment.ySpeed;
			fragment.x2 += fragment.xSpeed;
			fragment.y2 += fragment.ySpeed;
			fragment.rotation += fragment.rotationSpeed;
		});

		if (this.aliveTime === this.TOTAL_ALIVE_TIME) {
			this.reset();
		}
	}
}
