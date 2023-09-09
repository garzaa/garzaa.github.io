class vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(b) {
		return new vec2(this.x + b.x, this.y + b.y);
	}

	scale(s) {
		return new vec2(this.x * s, this.y * s);
	}
}

class HexCell {
	constructor(gridCoords, worldCoords) {
		this.gridCoords = gridCoords;
		this.worldCoords = worldCoords;
	}
}

class HexGrid {
	constructor(origin, gridSize, cellDiameter) {
		this.cellSize = new vec2(cellDiameter, (cellDiameter / 2) * sqrt(3));
		this.origin = origin;
		this.rows = [];
		this.sideLength = cellDiameter/2;
		for (let x=0; x<gridSize.x; x++) {
			let row = [];
			for (let y=0; y<gridSize.y; y++) {
				let c = new vec2(
					// todo: move x sideways by side length
					origin.x + (x*(this.cellSize.x + this.sideLength)),
					// and y up by side length? need to move across too
					origin.y + (y*(this.cellSize.y * 0.5))
				);

				if (y % 2 == 0) {
					// this should be something based on side length maybe
					c.x += this.sideLength * 0.75;
				} else {
					c.x -= this.sideLength * 0.75;
				}

				row.push(new HexCell(new vec2(x, y), c));
			}
			this.rows.push(row);
		}
	}

	iterate(f) {
		for (let x=0; x<this.rows.length; x++) {
			for (let y=0; y<this.rows[x].length; y++) {
				f(this.rows[x][y]);
			}
		}
	}
}
