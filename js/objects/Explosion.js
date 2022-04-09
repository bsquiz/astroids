class Explosion extends GameObject {
	constructor(numParticles = 20) {
		super();
		this.hasAliveTimer = true;
		this.TOTAL_ALIVE_TIME = 100;
		this.particles = [];
		this.numParticles = numParticles;
	}

	update() {
		super.update();
		this.particles.forEach(particle => particle.update());
	}
	reset() {
		super.reset();
		this.particles = [];
		for (let i=0; i<this.numParticles; i++) {
			const particle = new GameObject();

			particle.reset();
			particle.x = this.x;
			particle.y = this.y;
			particle.maxSpeed = Math.random() * 2;
			particle.color = [
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255)
			];
			particle.activate();
			particle.turn(Math.random() * Math.PI * 2);
			this.particles.push(particle);
		}
	}
}