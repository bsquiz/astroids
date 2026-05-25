class BonusItem extends GameObject {
	constructor() {
		super();
		this.width = 20;
		this.height = 20;
		this.maxSpeed = 0.7;
		this.points = 1000;
		this.hasAliveTimer = true;
		this.TOTAL_ALIVE_TIME = 480;
	}

	randomPosition() {
		this.x = Math.floor(Math.random() * Utils.WIDTH);
		this.y = Math.floor(Math.random() * Utils.HEIGHT);
	}
}
