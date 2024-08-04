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

	distort(str, scale=1) {
		// ok don't add...instead, turn it into polar coordinates
		let a = noise(this.x*scale, this.y*scale) * TWO_PI;
		let s = noise((this.x+999, this.y+999) * scale) * str;
		return this.add(new vec2(Math.cos(a)*s, Math.sin(a)*s));
		// return this.add(new vec2(noise(this.x*scale)*str, noise(this.y*scale)*str));
	}

	str() {
		return "("+this.x+", "+this.y+")"
	}

	lerp(b, t) {
		return new vec2(lerp(this.x, b.x, t), lerp(this.y, b.y, t));
	}

	fbmDistort(str, noiseScale, maxDistortion) {
		let q = new vec2(
			fbm(this, noiseScale),
			fbm(this, noiseScale*2)
		);

		/*
		float2 r = float2( 
			fbm( uv + 4.0*q + 5*sin(_Time/2.0)),
			fbm( uv + 4.0*q)
		);

		float t = fbm( uv + 4.0*(r-(_Time/2.0)));

		ColorResult result;
		result.q = q;
		result.r = r;
		result.t = t;
		
		return result;
		*/
		let r = new vec2(
			fbm(this.add(q.scale(4)), noiseScale),
			fbm(this.add(q.scale(4)), noiseScale)
		)
		
		let a = r.x * TWO_PI;
		let s = Math.min(r.y * str, maxDistortion);

		return this.add(new vec2(Math.cos(a)*s, Math.sin(a)*s));

		return this.add(new vec2(q.x, r.y).scale(str));
	}
}

function fbm(v, noiseScale, density=4) {
	let sum = 0;
	let amp = 1;
	let x = v.scale(noiseScale);
	for (let i = 0; i < density; i++){
        sum += noise(x.x, x.y) * amp;
        x = x.scale(1.2);
        amp *= 0.4;
    }
	return sum;
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
		if (arguments.length > 1) {
			cellPos = new vec2(arguments[0], arguments[1]);
		}

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
