class Astroid extends GameObject {
	constructor() {
		super();
		this.turn(Math.random() * Math.PI);
		this.points = 100;
	}

	randomPosition() {
		this.x = Math.floor(Math.random() * Utils.WIDTH);
		this.y = Math.floor(Math.random() * Utils.HEIGHT);

		// dont position near player
		while (
			(this.x > Utils.WIDTH / 3 && this.x < Utils.WIDTH / 1.5)
			&&
			(this.y > Utils.HEIGHT / 3 && this.y < Utils.HEIGHT / 1.5)
		) {
			this.x = Math.floor(Math.random() * Utils.WIDTH);
			this.y = Math.floor(Math.random() * Utils.HEIGHT);
		}
	}
	setType(type) {
		this.type = type;

		if (type === Utils.AstroidType.LARGE) {
			this.width = 48;
			this.height = 48;
		} else if (type === Utils.AstroidType.MEDIUM) {
			this.width = 32;
			this.height = 32;
		} else {
			this.width = 16;
			this.height = 16;
		}
	}
}
