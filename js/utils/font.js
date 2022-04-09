Utils.Font = {
	characterCols: 5,
	characterRows: 10,
	characterPadding: 5,
	sectionWidth: 1,
	sectionHeight: 1,
	characters: {
		' ': [
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' ',
			' ',' ',' ',' ',' '
		],
		'a': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*'
		],
		'b': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'c': [
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*'
		],
		'd': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'e': [
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*'
		],
		'g': [
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'h': [
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*'
		],
		'i': [
			'*','*','*','*','*',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			'*','*','*','*','*'
		],
		'l': [
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*'
		],
		'm': [
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*',' ','*','*',
			'*',' ','*',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*'
		],
		'o': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'p': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' '
		],
		'r': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			'*','*',' ',' ',' ',
			'*',' ','*',' ',' ',
			'*',' ',' ','*',' ',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*'
		],
		's': [
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		't': [
			'*','*','*','*','*',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' ',
			' ',' ','*',' ',' '
		],
		'v': [
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			' ','*',' ','*',' ',
			' ','*',' ','*',' ',
			' ',' ','*',' ',' '
		],
		'w': [
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ','*',' ','*',
			'*',' ','*',' ','*',
			' ','*',' ','*',' ',
			' ','*',' ','*',' '
		],

		'0': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'1': [
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*'
		],
		'2': [
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*'
		],
 		'3': [
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			'*','*','*','*','*'
		],
 		'4': [
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*'
		],
		'5': [
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'6': [
			'*','*','*','*','*',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*',' ',' ',' ',' ',
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'7': [
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*'
		],
		'8': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*'
		],
		'9': [
			'*','*','*','*','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*',' ',' ',' ','*',
			'*','*','*','*','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*',
			' ',' ',' ',' ','*'
		]
	},

	measureString(string, scale = 1) {
		const width = string.length * this.sectionWidth *
			this.characterCols * scale +
			(string.length * this.characterPadding);
		const height = this.sectionHeight * this.characterCols * scale;
 
		return {
			width: width,
			height: height
		};
	},

	drawString(string, x, y, scale, ctx) {
		const str = string.toString();
		const sW = this.sectionWidth * scale * this.characterCols;
		let drawX = x;
	
		for (let i=0; i<str.length; i++) {
			this.drawCharacter(str[i], drawX, y, scale, ctx);
			drawX += this.sectionWidth * scale * this.characterCols;
			drawX += this.characterPadding;
		}
	},
		
	drawCharacter(character, x, y, scale, ctx) {
		const map = this.characters[character.toString().toLowerCase()];
		const sW = this.sectionWidth * scale;
		const sH = this.sectionHeight * scale;
		let drawX = x;
		let drawY = y;
		let currentCol = 1;	

		if (map) {
			for (let i=0; i<map.length; i++) {
				if (map[i] === '*') {
					ctx.fillRect(drawX, drawY, sW, sH);
				}
				if (currentCol === this.characterCols) {
					// move down one row
					drawY += sH;
					drawX = x;
					currentCol = 1; 
				} else {
					// move across one column
					drawX += sW;
					currentCol++;
				}
			}
		}
	}
};