//global helpers
function d(sides) {	
	return Math.floor(Math.random() * sides) + 1
}

function render(obj) {
	var output
	var preWrapper = "<p id=" + obj.id + ">"
	var postWrapper = "</p>"
	$("#enemies").prepend(output)
}

//enemy objects

//lightly armored pirate
function lap() {
	laps++
	this.id = "lap" + laps

	this.hp = 10 + d(6)
	this.ac = 8
	this.str = 2
	this.dex = 0
	this.con = 3
	this.wis = 0
	this.cha = 0
	this.sp = 30
	function dmg() {
		this.hp =- 1
	}
	render(this)
}

$("#lap").click(function() {
	lap()
})