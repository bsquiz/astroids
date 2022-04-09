class GameObject {
	constructor() {
		this.width = 48;
		this.height = 48;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.x = 0;
		this.y = 0;
		this.dir = 0;
		this.maxSpeed = 1;
		this.hasAliveTimer = false;
		this.MAX_FRAMES = 1;
		this.TOTAL_HP = 1;
		this.leadingHitbox = {};
		this.reset();
	}

	reset() {
		this.isActive = false;
		this.isMoving = false;
		this.frame = 0;
		this.animationDelay = 0;
		this.aliveTime = 0;
		this.hp = this.TOTAL_HP;
	}
	wrap() {
		if (this.x < 0) {
			this.x = Utils.WIDTH;
		}
		if (this.x > Utils.WIDTH) {
		this.x = 0;
		}

		if (this.y < 0) {
			this.y = Utils.HEIGHT;
		}

		if (this.y > Utils.HEIGHT) {
			this.y = 0;
		}
	}

	activate() {
		this.isMoving = true;
		this.isActive = true;
		this.isAnimating = true;
	}
	takeDamage(amount) {
		this.hp -= amount;

		return this.hp <= 0;
	}
	
	getCenterHitBox() {
		return {
			x: this.x + this.width / 4,
			y: this.y + this.height / 4,
			width: 2,
			height: 2
		};
	}

	calculateLeadingHitbox() {
		let x;
		let y;
		
		x = this.x + this.width / 2;
		y = this.y + this.height / 2;
		x += this.xSpeed * 4;
		y += this.ySpeed * 4;

		return {
			x,
			y,
			width: 2,
			height: 2
		};
	}

	getPerimeterHitBoxes() {
		return [
			{
				x: this.x + this.width / 2,
				y: this.y,
				width: 2,
				height: 2
			},
			{
				x: this.x + this.width,
				y: this.y + this.height / 2,
				width: 2,
				height: 2
			},
			{
				x: this.x + this.width / 2,
				y: this.y + this.height,
				width: 2,
				height: 2
			},
			{
				x: this.x,
				y: this.y + this.height / 2,
				width: 2,
				height: 2
			}
		];
	}

	getFuturePosition(x = this.x, y = this.y) {
		return {
			x: x + this.xSpeed,
			y: y + this.ySpeed
		};
	}
	turn(dir) {
		this.dir = dir;
		this.xSpeed = Math.cos(this.dir) * this.maxSpeed;
		this.ySpeed = Math.sin(this.dir) * this.maxSpeed;
		//this.xSpeed *= -1;

		this.leadingHitbox = this.calculateLeadingHitbox();

	}

	move() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.leadingHitbox = this.calculateLeadingHitbox();
	}

	updateAnimation() {
					if (this.animationDelay === 0) {
				this.animationDelay = this.MAX_ANIMATION_DELAY;
				if (this.frame < this.MAX_FRAMES) {
					this.frame++;
				} else {
					this.frame = 0;
				}
			}
			this.animationDelay--;
	}
	update() {
		if (this.isMoving) {
			this.move();
			this.wrap();
		}
		if (this.isAnimating) {
			this.updateAnimation();
		}

		if (this.hasAliveTimer) {
			this.aliveTime++;
			if (this.aliveTime === this.TOTAL_ALIVE_TIME) {
				this.reset();
			}
		}
	}
}