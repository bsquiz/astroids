class Bullet extends GameObject {
	constructor() {
		super();
		this.width = 2;
		this.height = 2;
		this.ySpeed = 0;
		this.xSpeed = 0;
		this.dir = 0;
		this.hasAliveTimer = true;
		this.maxSpeed = 6;
		this.TOTAL_ALIVE_TIME = 100;
	}
}