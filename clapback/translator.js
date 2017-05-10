function convert() {
	//document.getElementById("input").value = '';
	var inputStr = document.getElementById("input").value;
	var outputSpan = $("#output");

	if (inputStr == "") {
		outputSpan.html("&nbsp;")
		return;
	}

	outStr = inputStr.split(" ").join("👏");

	outputSpan.html(outStr)
}

document.getElementById('input').onkeydown = function(e){
   if(e.keyCode == 13){
	     convert();
   }
};
