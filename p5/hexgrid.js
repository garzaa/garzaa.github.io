class vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static flipX = new vec2(-1, 1);
	static zero = new vec2(0, 0);
	static up = new vec2(0, -1);
	static right = new vec2(1, 0);
	static left = new vec2(-1, 0);
	static down = new vec2(0, 11);

	add(b) {
		return new vec2(this.x + b.x, this.y + b.y);
	}

	sub(b) {
		return new vec2(this.x - b.x, this.y - b.y);
	}

	scale(s) {
		return new vec2(this.x * s, this.y * s);
	}

	mul(v) {
		return new vec2(this.x * v.x, this.y * v.y);
	}

	midpoint(v, variance) {
		if (typeof variance === 'undefined') {
			return this.add(v.sub(this).scale(0.5));
		} else {
			// either get the current midpoint or get another one
			variance -= 1;
			if (variance <= 0) {
				return this.add(v.sub(this).scale(0.5));
			} else {
				return this.midpoint(this.midpoint(v), variance);
			}
		}
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
				let gridPos = new vec2(x, y);
				row.push(new HexCell(gridPos, this.cellToWorld(gridPos)));
			}
			this.rows.push(row);
		}
	}

	cellToWorld(cellPos) {
		let c = new vec2(
			this.origin.x + (cellPos.x*(this.cellSize.x + this.sideLength)),
			this.origin.y + (cellPos.y*(this.cellSize.y * 0.5))
		);
		if (cellPos.y % 2 == 0) {
			// this should be something based on side length maybe
			c.x += this.sideLength * 0.75;
		} else {
			c.x -= this.sideLength * 0.75;
		}
		return c;
	}

	iterate(f) {
		for (let x=0; x<this.rows.length; x++) {
			for (let y=0; y<this.rows[x].length; y++) {
				f(this.rows[x][y]);
			}
		}
	}
}
