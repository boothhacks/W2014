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
	//things to try: shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY, 
	for(var i = 1; i < 13; i++)
	{
		var pointsx = new Array();
		var pointsy = new Array();
	    for(var theta = 0; theta < radians; theta += granularity)
		{
			var r = 100 * Math.sin(i/divisor*theta);
			var x = 100 + 200 * ((i-1)%4) + r * Math.cos(theta);
			var y = 100 + 200 * Math.floor((i-1)/4) + r * Math.sin(theta);
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
	}
	//Save your file to a .png file- http://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
}

function drawtext()
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
	
	//see http://www.w3schools.com/tags/canvas_createlineargradient.asp
	var grd1=ctx.createLinearGradient(text1x, 0, text1x + 200 ,0);
	var grd2=ctx.createLinearGradient(text2x, 0, text2x + 200 ,0);
	
	//see http://www.w3schools.com/tags/canvas_addcolorstop.asp
	grd1.addColorStop(0,text1color1);
	grd1.addColorStop(1,text1color2);
	
	grd2.addColorStop(0,text2color1);
	grd2.addColorStop(1,text2color2);
	
	ctx.fillStyle=grd1;
	ctx.font = text1font;
	ctx.fillText(text1, text1x, text1y);

	ctx.fillStyle=grd2;
	ctx.font = text2font;
	ctx.fillText(text2, text2x, text2y);
}