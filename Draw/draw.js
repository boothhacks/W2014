function drawShape(ctx, radians, granularity, divisor, scalar, xoffset, yoffset)
{

	var pointsx = new Array();
	var pointsy = new Array();

    for(var theta = 0; theta < radians; theta += granularity)
	{
		//r is the radius in polar coordinates
		var r = 100 * Math.sin(scalar/divisor*theta);

		//convert to cartesian coordinates, add an offset so we can show multiple graphs on one screen
		var x = xoffset + r * Math.cos(theta);
		var y = yoffset + r * Math.sin(theta);

		//push the values onto the back of the arrays
		pointsx.push(x);
		pointsy.push(y);
	}
	/*
	for(var k = 1; k < pointsx.length; k++)
	{
		//if you wanted to draw a background, you could do it here
	}
	*/

	for(var k = 1; k < pointsx.length; k++)
	{
		ctx.beginPath();
		ctx.moveTo(pointsx[k-1],pointsy[k-1]);
		ctx.lineTo(pointsx[k],pointsy[k]);
		ctx.stroke();			
	}
	return true;
	//Save your file to a .png file- http://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
}

function draw()
{
	//see reference at http://www.w3schools.com/tags/ref_canvas.asp
	var canvas = document.getElementById("myCanvas");
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	var width = 1;
	var granularity = parseFloat(document.getElementById("granularity").value);
	var radians = parseFloat(document.getElementById("radians").value);	
	var divisor = parseFloat(document.getElementById("divisor").value);

	var ctx = canvas.getContext("2d");
	ctx.strokeStyle=document.getElementById("color").value;
	ctx.lineWidth = parseFloat(document.getElementById("width").value);
	//things to try: shadowColor, shadowBlur, createLinearGradient, lineCap, arc, etc.
	
	for(var i = 1; i < 13; i++)
	{
		var xoffset = 100 + 200 * ((i-1)%4);
		var yoffset = 100 + 200 * Math.floor((i-1)/4);
		drawShape(ctx, radians, granularity, divisor, i, xoffset, yoffset);
	}
}
function drawWord(ctx, text, font, x, y, gradWidth, gradHeight, color1, color2)
{
	//see http://www.w3schools.com/tags/canvas_createlineargradient.asp
	var grd=ctx.createLinearGradient(x, 0, x + gradWidth, gradHeight);
	
	//see http://www.w3schools.com/tags/canvas_addcolorstop.asp
	grd.addColorStop(0,color1);
	grd.addColorStop(1,color2);
	
	
	ctx.fillStyle=grd;
	ctx.font = font;
	ctx.fillText(text, x, y);
	ctx.strokeText(text, x, y);
}
function drawText()
{
	//see reference at http://www.w3schools.com/tags/ref_canvas.asp
	var canvas = document.getElementById("myCanvas");
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);
	canvas.setAttribute("style", "position: absolute; x:0; y:0;");

	var text1 = document.getElementById("text1").value
	var text1x = parseInt(document.getElementById("text1x").value);
	var text1y = parseInt(document.getElementById("text1y").value);
	var text1color1 = document.getElementById("text1color1").value;
	var text1color2 = document.getElementById("text1color2").value;

	var text2 = document.getElementById("text2").value
	var text2x = parseInt(document.getElementById("text2x").value);
	var text2y = parseInt(document.getElementById("text2y").value);
	var text2color1 = document.getElementById("text2color1").value;
	var text2color2 = document.getElementById("text2color2").value;

	//see http://www.w3schools.com/tags/canvas_font.asp
	//and http://www.w3schools.com/cssref/css_websafe_fonts.asp
	var text1font = document.getElementById("text1font").value;
	var text2font = document.getElementById("text2font").value;

	
	var ctx = canvas.getContext("2d");
	
	drawWord(ctx, text1, text1font, text1x, text1y, 200, 0, text1color1, text1color2);
	drawWord(ctx, text2, text2font, text2x, text2y, 200, 0, text2color1, text2color2);
}