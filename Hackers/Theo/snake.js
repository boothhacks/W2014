<script>

function CreateGlobals()
{
	//declaring globals means declaring them outside functions.  Since we don't want to do that,
	//we'll add the values to window instead.  It turns out, your browser does this anyways every
	//time you declare a global variable: http://snook.ca/archives/javascript/global_variable

	//As a general note, global variables aren't really the best idea; but they DO increase the
	//readability of simple code like this, so we're doing it even though it's not a best practice
	window.gridBlockWidth = 20;
	window.gridBlockHeight = 20;
	window.currentGridPosx = 0;
	window.currentGridPosy = 0;
	window.boardWidth = 500;
	window.boardHeight = 500;
	window.foodGridPosx = 0;
	window.foodGridPosy = 0;

	//down: 0  right: 1  up: 2  left: 3
	window.xmove = new Array(0, 1, 0, -1);
	window.ymove = new Array(1, 0, -1, 0);

	window.isAlive = true;
	window.board = document.getElementById("board");
	window.board.style.border = "1px solid black";
	window.board.style.width = window.boardWidth;
	window.board.style.height = window.boardHeight;
	window.gridWidthInBlocks = window.boardWidth / window.gridBlockWidth;
	window.gridHeightInBlocks =  window.boardHeight / window.gridBlockHeight;

	window.snakeHeadPosx =1;
	window.snakeHeadPosy = 1;
	window.snakeBodyCount = 0;
	window.snakeDir = 0;
	window.snakeBody = new Array(createSnakeBlock(CoordFromGridx(window.snakeHeadPosx), CoordFromGridy(window.snakeHeadPosy)), createSnakeBlock(CoordFromGridx(window.snakeHeadPosx), CoordFromGridy(window.snakeHeadPosy)));

	placeRandomFood();

	document.addEventListener('keydown', keydownEventFunction, false);

	window.tryAgainCount = 0;
}
function resetGame()
{
	var elm = document.getElementById("tryAgain");
	for(var i = 0; i < window.snakeBody.length; i++)
	{
		window.board.removeChild(snakeBody[i]);
	}
	window.board.removeChild(document.getElementById("snake-food-" + window.foodCount));
	window.board.removeChild(elm);
	CreateGlobals();
	Update();
}
function tryAgain() 
{
    var tmpElm = document.createElement("div");
    tmpElm.id = "tryAgain";
    tmpElm.className = "try-again-dialog";
    
    var tryAgainTxt = document.createElement("div");
    tryAgainTxt.innerHTML = "Booth Hacks Snake<p></p>You died :(<p></p>";
    var tryAgainStart = document.createElement("button");
    tryAgainStart.appendChild( document.createTextNode("Play Again?"));
    
    var reloadGame = function() {
        resetGame();
    };
    
    tryAgainStart.addEventListener("click", reloadGame, false);
    tmpElm.appendChild(tryAgainTxt);
    tmpElm.appendChild(tryAgainStart);
    window.board.appendChild(tmpElm);
    return tmpElm;
}
function keydownEventFunction(evt) 
{
    if (!evt) 
    {
    	var evt = window.event;
   	}
    var keyNum = (evt.which) ? evt.which : evt.keyCode;

    if(keyNum == 37) //left key
    {
    	if ( window.snakeDir !== 1 /*right*/) 
    	{
           window.snakeDir = 3; //left 
        }
    }
    else if(keyNum == 38) //right key
    {
    	if ( window.snakeDir !== 0 /*down*/) 
    	{
           window.snakeDir = 2; //up 
        }
    }    
    else if(keyNum == 39)  //right key
    {
    	if ( window.snakeDir !== 3 /*left*/) 
    	{
           window.snakeDir = 1; //right
        }
    }   
    else if(keyNum == 40) //down key
    {
    	if ( window.snakeDir !== 2 /*up*/) 
    	{
           window.snakeDir = 0; //down
        }
    }         
    return false;           
}
function CoordFromGridx(x)
{
	return Math.round((x + 0.5) *  window.gridBlockWidth);
}
function GridFromCoordx(x)
{
	return Math.round(x / window.gridBlockWidth - 0.5);
}
function CoordFromGridy(y)
{
	return Math.round((y + 0.5) *  window.gridBlockHeight);
}
function GridFromCoordy(y)
{
	return Math.round(y / window.gridBlockHeight - 0.5);
}

function createSnakeBlock(x, y)
{
	var block = document.createElement("div");
    block.setAttribute("id", "snake-body-" + window.snakeBodyCount);
    block.className = "snake-body-block";
    block.style.width = window.gridBlockWidth + "px";
    block.style.height = window.gridBlockHeight + "px";
    block.style.backgroundColor = "blue";
    block.style.position = "absolute";
	
    block.style.left = x;
    block.style.top = y;

    window.board.appendChild(block);

	return block;
}

function deleteOldFood()
{
	var oldFood = document.getElementById("snake-food-" + window.foodCount);
	window.board.removeChild(oldFood);
}

function placeRandomFood()
{
	window.foodCount++;
	var newFood = document.createElement("div");
    newFood.setAttribute("id", "snake-food-"+window.foodCount);
    newFood.className = "snake-food-block";
    newFood.style.width = window.gridBlockWidth + "px";
    newFood.style.height = window.gridBlockHeight + "px";
    newFood.style.backgroundColor = "black";
    newFood.style.position = "absolute";
	
	window.foodGridPosx = GridFromCoordx(Math.random() * window.boardWidth);
	window.foodGridPosy = GridFromCoordy(Math.random() * window.boardHeight);
	while(collision(window.foodGridPosx, window.foodGridPosy))
	{
		//if we were going to place the new food somewhere that's already occupied, 
		//retry the random placement until we place on an empty square
		
		//NOTE: This scales really poorly if your snake ever gets big enough to fill
		//up most of the screen...

		window.foodGridPosx = GridFromCoordx(Math.random() * window.boardWidth);
		window.foodGridPosy = GridFromCoordy(Math.random() * window.boardHeight);
	}

    newFood.style.left = CoordFromGridx(window.foodGridPosx);
    newFood.style.top = CoordFromGridy(window.foodGridPosy);

	window.board.appendChild(newFood);
}

function Update()
{
	Move();
	if(window.isAlive)
	{
		setTimeout(function(){Update();}, 100);
	}
	else
	{
		tryAgain();
	}
}

function growSnake()
{
	if(window.snakeBody.length < 10)
	{
		addSnakeBodyElement();
	}
	addSnakeBodyElement();
}
function Move()
{
	/*
		In this function, we pop the last snake body element off the back of the array.  We move it
		to the next position (wherever our current head is + one square in the direction we were traveling)
		and then insert the element back into the front of the array (that's what unshift does)
	*/
	var elm = window.snakeBody.pop();
	window.snakeHeadPosx += window.xmove[window.snakeDir];
	window.snakeHeadPosy += window.ymove[window.snakeDir];
	elm.style.left = CoordFromGridx(window.snakeHeadPosx);
	elm.style.top = CoordFromGridy(window.snakeHeadPosy);
	window.snakeBody.unshift(elm);

	checkAteFood();

	checkDeath();
}
function runSnake()
{
	CreateGlobals();
	Update();
}


//------ your code all goes below this line ------//

function checkDeath()
{
	/*
		This function checks to see if your snake died.

		Your snake dies if it goes out of bounds (which we've written for you), or if it
		runs into it's own tail.  You need to write the logic to check and see if the snake has
		run into itself.

		We've provided a function called collision() (which you need to finish) which you should 
		figure out how to use here.
	*/

	if(window.snakeHeadPosx < 0 || window.snakeHeadPosx  >= window.boardWidth / window.gridBlockWidth ||
		window.snakeHeadPosy < 0 || window.snakeHeadPosy  >= window.boardHeight / window.gridBlockHeight)
	{
		window.isAlive = false;
	}
	if(false /*TODO: YOUR CODE GOES HERE (replace the 'false' with your code)*/)
	{
		window.isAlive = false;
	}
}
function checkAteFood()
{
	//This function checks to see if our snake has just eaten the food.  If it has, we delete the old
	//food, create a new piece of food, and grow our snake.

	//HINT:
	//How do we test if our snake just ate our food?
	//Read the code to find out what functions we need to call to delete our old food, 
	//    create new food, and grow your snake
	
	/*TODO: YOUR CODE GOES HERE*/

}
function addSnakeBodyElement()
{
	var x = parseInt(window.snakeBody[window.snakeBody.length - 1].style.left, 10);
	var y = parseInt(window.snakeBody[window.snakeBody.length - 1].style.top, 10);
	
	//alright, we know where our snake body element goes (x,y), but how do we actually add it?
	//We're going to have to call createSnakeBlock(), but what do we do with the result? 

	//HINT: We do something simillar (though not quite the same) at the end of our CreateGlobals() function

	/*TODO: YOUR CODE GOES HERE*/

	window.snakeBodyCount++;
}

function collision(x, y, startIndex)
{

	//This function returns true if the grid coordinate x,y is occupied by part of the existing snake
	//note that x and y are Grid indexes, not pixel coordinates

	//this means if somebody only calls us with x, y, we will default to starting at 0
	if(typeof startIndex == 'undefined')
	{
		startIndex = 0;
	}

	for(var i = startIndex; i < window.snakeBody.length; i++)
	{
		//how would you test if x and y were occupying the same space as a given element of 
		//the snake body?

		//HINT: 
		//addSnakeBodyElement() also has to find the pixel coordinates from snakeBody
		//placeRandomFood() also to go from pixel coordinates to grid coordinates

		/*TODO: YOUR CODE GOES HERE*/
	}
	return false;
}

</script>