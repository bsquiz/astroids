class Astroid extends GameObject {
	constructor() {
		super();
		this.turn(Math.random() * Math.PI);
		this.points = 100;
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