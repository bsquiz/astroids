const Utils = {
	WIDTH: 800,
	HEIGHT: 500,
	HUD_HEIGHT: 20,
	Direction: {
		CLOCKWISE: 0,
		COUNTER_CLOCKWISE: 1,
		NORTH: 180,
		SOUTH: 0,
		EAST: 90,
		WEST: 270,
		SOUTH_EAST: 45,
		NORTH_EAST: 135,
		SOUTH_WEST: 315
	},
	Keys: {
		'UP': 'ArrowUp',
		'DOWN': 'ArrowDown',
		'LEFT': 'ArrowLeft',
		'RIGHT': 'ArrowRight',
		'SPACE': 'Space'
	},
	AstroidType: {
		LARGE: 0,
		MEDIUM: 1,
		SMALL: 2
	},

	numberInRange(val, max, min = 0) {
		return (val > min && val < max);
	},
	randomMagnitude(max) {
		const x = Math.floor(Math.random() * 2);
		const mag = Math.random() * max;

		return (x) ? mag * -1 : mag;
	},
	turnTowardsPoint(objectX, objectY, targetX, targetY) {
		const rads = Math.atan2(targetY - objectY , targetX - objectX);
		
		return rads;
	},
	hitTest(gameObject1, gameObject2) {
		const xContained =
			gameObject1.x > gameObject2.x
			&& gameObject1.x < gameObject2.x + gameObject2.width;
		const yContained =
			gameObject1.y > gameObject2.y
			&& gameObject1.y < gameObject2.y + gameObject2.height;

		return (xContained && yContained);
	}
}