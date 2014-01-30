
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
function collision(x, y, startIndex)
{
	startIndex = typeof startIndex !== 'undefined' ? startIndex : 0;

	//returns true if the grid coordinate x,y is occupied by part of the existing snake
	for(var i = startIndex; i < window.snakeBody.length; i++)
	{
		if(GridFromCoordx(parseInt(window.snakeBody[i].style.left, 10)) == x &&
			GridFromCoordy(parseInt(window.snakeBody[i].style.top, 10)) == y)
		{
			return true;
		}
	}
	return false;
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

function checkDeath()
{
	if(window.snakeHeadPosx < 0 || window.snakeHeadPosx  >= window.boardWidth / window.gridBlockWidth ||
		window.snakeHeadPosy < 0 || window.snakeHeadPosy  >= window.boardHeight / window.gridBlockHeight)
	{
		window.isAlive = false;
	}
	if(collision(window.snakeHeadPosx, window.snakeHeadPosy, 1))
	{
		window.isAlive = false;
	}
}

function checkAteFood()
{
	if(collision(window.foodGridPosx, window.foodGridPosy))
	{
		deleteOldFood();
		placeRandomFood();
		growSnake();
	}
}

function Move()
{
	var elm = window.snakeBody.pop();
	window.snakeHeadPosx += window.xmove[window.snakeDir];
	window.snakeHeadPosy += window.ymove[window.snakeDir];
	elm.style.left = CoordFromGridx(window.snakeHeadPosx);
	elm.style.top = CoordFromGridy(window.snakeHeadPosy);
	window.snakeBody.unshift(elm);

	checkAteFood();

	checkDeath();
}


function addSnakeBodyElement()
{
	var x = parseInt(window.snakeBody[window.snakeBody.length - 1].style.left, 10);
	var y = parseInt(window.snakeBody[window.snakeBody.length - 1].style.top, 10);
	window.snakeBody.push(createSnakeBlock(x,y));
	window.snakeBodyCount++;
}


function growSnake()
{
	if(window.snakeBody.length < 10)
	{
		addSnakeBodyElement();
	}
	addSnakeBodyElement();
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
		//if we're going to place the new food somewhere that's already occupied, retry the random placement
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

function runSnake()
{
	CreateGlobals();
	Update();
}