function draw()
{
	//see reference at http://www.w3schools.com/tags/ref_canvas.asp
	var canvas = document.getElementById("myCanvas");
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);
	canvas.setAttribute("style", "position: absolute; x:0; y:0;");

	var width = 1
	var granularity = parseFloat(document.getElementById("granularity").value);
	var radians = parseFloat(document.getElementById("radians").value);	
	var divisor = parseFloat(document.getElementById("divisor").value);

	var ctx = canvas.getContext("2d");
	ctx.strokeStyle=document.getElementById("color").value;
	ctx.lineWidth = parseFloat(document.getElementById("width").value);

	for(var i = 1; i < 13; i++)
	{
		var pointsx = new Array();
		var pointsy = new Array();
		//for(var theta = 0; theta < degrees/granularity; theta += granularity)
	    for(var theta = 0; theta < radians; theta += granularity)
		{
			var r = 100 * Math.sin(i/divisor*theta);
			var x = 100 + 200 * ((i-1)%4) + r * Math.cos(theta);
			var y = 100 + 200 * Math.floor((i-1)/4) + r * Math.sin(theta);
			pointsx.push(x);
			pointsy.push(y);
		}
		for(var k = 1; k < pointsx.length; k++)
		{
			ctx.beginPath();
			ctx.moveTo(pointsx[k-1],pointsy[k-1]);
			ctx.lineTo(pointsx[k],pointsy[k]);
			ctx.stroke();			
		}
	}
	//Save your file to a .png file- http://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
}