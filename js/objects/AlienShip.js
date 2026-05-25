class AlienShip extends GameObject {
	constructor() {
		super();
		this.width = 40;
		this.height = 20;
		this.maxSpeed = 0.8;
		this.hasAliveTimer = true;
		this.TOTAL_ALIVE_TIME = 900;
		this.turnTimer = 0;
		this.MAX_TURN_TIMER = 140;
	}

	spawn() {
		const startsLeft = Math.random() < 0.5;

		this.x = startsLeft ? this.width * -1 : Utils.WIDTH;
		this.y = Math.floor(Math.random() * (Utils.HEIGHT - this.height));
		this.reset();
		this.activate();
		this.turn(startsLeft ? Utils.randomMagnitude(0.5) : Math.PI + Utils.randomMagnitude(0.5));
	}

	update() {
		super.update();
		this.turnTimer--;

		if (this.turnTimer <= 0) {
			this.turnTimer = this.MAX_TURN_TIMER + Math.floor(Math.random() * this.MAX_TURN_TIMER);
			this.turn(this.dir + Utils.randomMagnitude(0.7));
		}
	}
}
