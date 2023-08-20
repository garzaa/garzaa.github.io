// get mouse pos relative to center of div
// rotatex based on y distance
// rotatey based on x distance

class vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	sub(other) {
		return new vec2(this.x - other.x, this.y - other.y);
	}

	add(other) {
		return new vec2(this.x + other.x, this.y + other.y);
	}

	mul(other) {
		return new vec2(this.x * other.x, this.y * other.y);
	}

	div(other) {
		return new vec2(this.x / other.x, this.y / other.y);
	}
}

const card = $("#card");
let cardSize = new vec2($("#card").width(), $("#card").height());
const two = new vec2(2, 2);
let c = new vec2(card.position().left, card.position().top).add(cardSize.div(two));

$(window).on("resize", function() {
	cardSize = new vec2($("#card").width(), $("#card").height());
	c = new vec2(card.position().left, card.position().top).add(cardSize.div(two));
	console.log("window resize")
});

$.getJSON("https://api.ipify.org?format=json", function(data) {
    console.log("success");
	// Setting text of element P with id gfg
	$("#ip").html(data.ip);
})

$("body").on("mousemove", function(event) {
	// get distance from card center to mouse pos
	let v = new vec2(event.pageX, event.pageY);
	let distance = c.sub(v);

	// then convert that into a fraction of distance from center
	// so x = x / radius, y = y / radius
	let distanceRatio = new vec2(
		-distance.x / (cardSize.x / 2),
		distance.y / (cardSize.y / 2)
	);

	// console.log(distanceRatio);

	// then apply rotation based on that
	$("#card").css("transform", "rotateY("+distanceRatio.x * 45+"deg) rotateX("+distanceRatio.y * 45+"deg)");
});
