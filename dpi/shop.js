function objToHtml(object) {

}

function purchase(itemName) {
	var item = null;
	//look up the item name in the store
	for (i=0; i<shop.rows.length; i++) {
		row = shop.rows[i];

		row.forEach(
			function(o) {
				if (o.name == itemName && item != null) {
					item = o;
				}
			}
		);

		alert("No item named "+itemName)
	}

	if (game.indulgences < item.price) {
		alert("Not enough indulgences!")
		return;
	}

	//decrease currency
	game.indulgences -= item.price;

	//remove from the store
	store.removeItem(item);

	//apply the effect
	applyEffect(item);

	//and add it to owned items
	game.ownedUpgrades.push(item)
}

var autoIndulgers = [
	ail1
]

var ail1 = {
	effects: {
		"addIPS": 1,
	}
	name: "Rusty Auto-Indulger",
	price: 25,
	description: "+1 ips"
}

var shop = {
	removeItem: function() {
		//take out the item (look by name)
		//and then append the next one in the list, if possible
	},
	rows: [
		autoIndulgers
	]
}

effects = {
	addIPS: function(num) {
		game.ips += num;
	},
	addIndulgences: function(num) {
		game.indulgences += num;
	}
}