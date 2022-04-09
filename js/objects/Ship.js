class Ship extends GameObject {
	constructor() {
		super();
		this.MAX_SHOOT_TIMER = 25;
		this.MAX_INVINCIBLE_TIMER = 100;
		this.VELOCITY_CHANGE = 0.1;
		this.MAX_VELOCITY = 2;
		this.ROTATION_CHANGE = 0.1;

		this.canShootTimer = this.MAX_SHOOT_TIMER;
		this.lives = 3;
		this.invincibleTimer = this.MAX_INVINCIBLE_TIMER;
		this.dir = 0;
		this.width = 32;
		this.height = 32;
		this.isAccelerating = false;
	}
	rotate(direction) {
		if (direction === Utils.Direction.CLOCKWISE) {
			this.dir += this.ROTATION_CHANGE;
		} else {
			this.dir -= this.ROTATION_CHANGE;
		}
	}
	resetPosition() {
		this.x = Utils.WIDTH / 2 - this.width / 2;
		this.y = Utils.HEIGHT / 2 - this.height / 2;
	}
	reset() {
		super.reset();
		this.resetPosition();
		this.hasShield = false;
		this.canShoot = true;
		this.isInvincible = false;
		this.isAnimating = false;
		this.frame = 0;
		this.invincibleTimer = this.MAX_INVINCIBLE_TIMER;
	}
	thrust() {
		this.isMoving = true;
		this.isAccelerating = true;
		this.turn(this.dir);
	}
	clampVelocity(velocity) {
		let clampedVelocity = velocity;

		if (clampedVelocity > this.MAX_VELOCITY) {
			clampedVelocity = this.MAX_VELOCITY;
		} else if (clampedVelocity < this.MAX_VELOCITY * -1) {
			clampedVelocity = this.MAX_VELOCITY * -1;
		}

		return clampedVelocity;
	}
	turn(dir) {
		this.dir = dir;
		this.xSpeed += Math.cos(this.dir) * this.VELOCITY_CHANGE;
		this.ySpeed += Math.sin(this.dir) * this.VELOCITY_CHANGE;

		this.xSpeed = this.clampVelocity(this.xSpeed);
		this.ySpeed = this.clampVelocity(this.ySpeed);

		this.leadingHitbox = this.calculateLeadingHitbox();

	}
	update() {
		super.update();
		this.canShootTimer--;
		if (this.canShootTimer === 0) {
			this.canShootTimer = this.MAX_SHOOT_TIMER;
			this.canShoot = true;
		}

		if (this.isInvincible) {
			this.invincibleTimer--;

			if (this.invincibleTimer === 0) {
				this.isInvincible = false;
				this.invincibleTimer = this.MAX_INVINCIBLE_TIMER;
			}
		}

		this.isAccelerating = false;
	}
}