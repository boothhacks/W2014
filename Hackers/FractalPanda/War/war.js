window.Attack =  function(xfrom, yfrom, xto, yto, range, attack, aoe, team)
{
    if(Math.pow(Math.pow(xfrom - xto, 2) + Math.pow(yfrom - yto, 2), 0.5) < range)
    {
        //TODO: add raytracing and wall detection
        window.Lines.push(new Line(CoordFromGridx(xfrom), CoordFromGridy(yfrom), CoordFromGridx(xto), CoordFromGridy(yto), team));
        collisions = collision(xto, yto);
        for(var j = 0; j < collisions.length; j++)
        {
            if(collisions[j].team != team)
            {
              if(collisions[j].currentHealth <= 0)
              {
                //already died this turn!
                continue;
              }
              console.log(collisions[j].ID + ' taking ' + attack + ' damage');
              collisions[j].damage(attack);
              if(aoe == false) //disabling for now... otherwise units can hide behind other units.  Maybe
                //we want that though, to add to the strategy?
              {
                return;
              }
            }
        }
    }
}
function CreateGlobals()
{
	//declaring globals means declaring them outside functions.  Since we don't want to do that,
	//we'll add the values to window instead.  It turns out, your browser does this anyways every
	//time you declare a global variable: http://snook.ca/archives/javascript/global_variable

	//As a general note, global variables aren't really the best idea; but they DO increase the
	//readability of simple code like this, so we're doing it even though it's not a best practice

    window.StartTime = (new Date()).getTime();
    window.LastResourceTime = window.StartTime;
    window.ResourceSpawnTime = 1500;
    window.MaxResourceAmount = 70;
    window.Lines = new Array();

	window.gridBlockWidth = 3;
	window.gridBlockHeight = 3;
	window.currentGridPosx = 0;
	window.currentGridPosy = 0;
	window.boardWidth = window.innerWidth - 50;
	window.boardHeight = window.innerHeight - 100;

    window.unitCount = 0;
    window.baseCount = 0;

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

    window.units = new Array();
    window.resources = new Array();

    window.baseOne = new Warbase(GridFromCoordx(window.boardWidth) / 5, GridFromCoordy(window.boardHeight)/5, "Team 1");
    window.baseTwo = new Warbase(GridFromCoordx(window.boardWidth) * 4 / 5, GridFromCoordy(window.boardHeight) * 4/5, "Team 2");
    
    window.baseOne.generateBlock();
    window.baseTwo.generateBlock();

    window.baseOne.AI = eval("new Warrior2()");
    window.baseTwo.AI = eval("new Warrior1()");

    window.units1 = document.getElementById("scoreboard-score1-table-units");
    window.energy1 = document.getElementById("scoreboard-score1-table-energy");
    window.money1 = document.getElementById("scoreboard-score1-table-money");
    window.base1 = document.getElementById("scoreboard-score1-table-base");

    window.units2 = document.getElementById("scoreboard-score2-table-units");
    window.energy2 = document.getElementById("scoreboard-score2-table-energy");
    window.money2 = document.getElementById("scoreboard-score2-table-money");
    window.base2 = document.getElementById("scoreboard-score2-table-base");

    window.timer = document.getElementById("game-timer");
}
function resetGame()
{
	var elm = document.getElementById("tryAgain");
	for(var i = 0; i < window.units.length; i++)
	{
		window.board.removeChild(window.units[i].block);
	}
    for(var i = 0; i < window.resources.length; i++)
    {
        window.board.removeChild(window.resources[i].block)
    }
    for(var i = 0; i < window.Lines.length; i++)
    {
        window.board.removeChild(window.Lines[i].block)
    }
	window.baseOne.deleteBlock();
    window.baseTwo.deleteBlock();
    window.board.removeChild(elm);
	CreateGlobals();
	Update();
}
function tryAgain() 
{
    var tmpElm = document.createElement("div");
    tmpElm.id = "tryAgain";
    tmpElm.className = "try-again-dialog";
    tryagainstring = "Booth Hacks War<p></p>You died :(<p></p>";
    if(!window.baseOne.isAlive)
    {
        tryagainstring = "Team Two wins!"
    }
    else
    {
        tryagainstring = "Team One wins!"
    }

    tryagainstring += "<p>Team 1: " + window.baseOne.currentHealth + "/" + window.baseOne.maxHealth + "</p>"; 
    tryagainstring += "<p>Team 2: " + window.baseTwo.currentHealth + "/" + window.baseTwo.maxHealth + "</p>";
    tryagainstring += "<p>Resource Count:" + window.resources.length + "</p>"
    var tryAgainTxt = document.createElement("div");
    tryAgainTxt.innerHTML = tryagainstring;
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

function Cleanup()
{
    for(var i = 0; i < window.units.length; i++)
    {
        if(units[i].isAlive == false)
        {
            console.log("unit " + i + " died!");
            window.baseOne.unitDied(window.units[i].team);
            window.baseTwo.unitDied(window.units[i].team);
            window.units[i].deleteBlock();
            window.units[i] = null;
            window.units.splice(i, 1);
            i--;
        }
    }
    for(var i = 0; i < window.resources.length; i++)
    {
        if(window.resources[i].isAlive == false)
        {
            console.log("resource " + i + " consumed!");
            window.resources[i].deleteBlock();
            window.resources[i] = null;
            window.resources.splice(i, 1);
            i--;
        }
    }
    currenttime = (new Date()).getTime();
    fade = 250;
    for(var i = 0; i < window.Lines.length; i++)
    {
        if(window.Lines[i].team == window.baseOne.team)
        {
            window.Lines[i].block.setAttribute('style','border:1px solid rgba(255, 0, 0, ' + 
                (1 - Math.max(currenttime - window.Lines[i].startTime, 0)/fade) + ');width:'+window.Lines[i].width+
                'px;height:0px;-moz-transform:rotate('+window.Lines[i].deg+'deg);-webkit-transform:rotate('+
                window.Lines[i].deg+'deg);position:absolute;top:'+window.Lines[i].y+'px;left:'+
                window.Lines[i].x+'px;');   
        }
        else
        {
            window.Lines[i].block.setAttribute('style','border:1px solid rgba(0, 0, 255, ' + 
                (1 - Math.max(currenttime - window.Lines[i].startTime, 0)/fade) + ');width:'+window.Lines[i].width+
                'px;height:0px;-moz-transform:rotate('+window.Lines[i].deg+'deg);-webkit-transform:rotate('+
                window.Lines[i].deg+'deg);position:absolute;top:'+window.Lines[i].y+'px;left:'+
                window.Lines[i].x+'px;');   
        }
        if(window.Lines[i].startTime + fade < currenttime)
        {
            window.Lines[i].deleteBlock();
            window.Lines[i] = null;
            window.Lines.splice(i, 1);
            i--;
        }
    }
}
function ParseWarPlan(base, warplan, debug)
{
    for(var i = 0; i < warplan.myUnits.length; i++)
    {
        for(var j = 0; j < window.units.length; j++)
        {
            if(window.units[j].ID == warplan.myUnits[i].ID)
            {
                if(debug)
                {
                    console.log(window.units[j].ID + ": " + warplan.myUnits[i].moveDirection + ", " + warplan.myUnits[i].moveSpeed);
                }
                window.units[j].update(
                    warplan.myUnits[i].actionDescription, 
                    warplan.myUnits[i].moveDirection, 
                    warplan.myUnits[i].moveSpeed
                );
            }
        }
    }
    base.update(warplan.myBase.actionDescription);
}
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function UpdateScoreboard()
{
    window.units1.innerHTML = "Units: " + window.baseOne.currentUnitCount + "/" + window.baseTwo.maxUnitCount;
    window.energy1.innerHTML = "Energy: " + Math.round(window.baseOne.energy);
    window.money1.innerHTML = "Money: " + Math.round(window.baseOne.money);
    window.base1.innerHTML = "Base: " + Math.round(window.baseOne.currentHealth) + "/" + window.baseOne.maxHealth;

    window.units2.innerHTML = "Units: " + window.baseTwo.currentUnitCount + "/" + window.baseTwo.maxUnitCount;
    window.energy2.innerHTML = "Energy: " + Math.round(window.baseTwo.energy);
    window.money2.innerHTML = "Money: " + Math.round(window.baseTwo.money);
    window.base2.innerHTML = "Base: " + Math.round(window.baseTwo.currentHealth) + "/" + window.baseTwo.maxHealth;

    currenttime = (new Date()).getTime() - window.StartTime;
    window.timer.innerHTML = Math.round(currenttime / (60 * 1000)) + ':' + pad(Math.round((currenttime / 1000) % 60), 2);
}
function GenerateResources()
{
    currenttime = (new Date()).getTime();
    if(window.LastResourceTime + window.ResourceSpawnTime < currenttime)
    {
        type = Math.random() < 0.5 ? ResourceType.MONEY : ResourceType.ENERGY;
        amount = 10 + Math.random() * window.MaxResourceAmount;
        x = 14 + Math.random() * (window.boardWidth - 28);
        y = 14 + Math.random() * (window.boardHeight - 28);
        window.resources.push(new Resource(type, amount, x, y));

        window.LastResourceTime = currenttime;
    }

}
function CheckResources()
{
    for(var i = 0; i < window.resources.length; i++)
    {
        collisions = collision(window.resources[i].gridx, window.resources[i].gridy);
        for(var j = 0; j < collisions.length; j++)
        {
            if(collisions[j].unitType && collisions[j].team)
            {
                if(collisions[j].team == window.baseOne.team)
                {
                    switch(window.resources[i].resourceType)
                    {
                        case(ResourceType.MONEY):
                            window.baseOne.money += window.resources[i].resourceAmount;
                            break;
                        case(ResourceType.ENERGY):
                            window.baseOne.energy += window.resources[i].resourceAmount;
                            break;
                        default:
                          break;
                    }
                    window.resources[i].isAlive = false;
                    break;
                }
                else if (collisions[j].team == window.baseTwo.team)
                {
                     switch(window.resources[i].resourceType)
                    {
                        case(ResourceType.MONEY):
                            window.baseTwo.money += window.resources[i].resourceAmount;
                            break;
                        case(ResourceType.ENERGY):
                            window.baseTwo.energy += window.resources[i].resourceAmount;
                            break;
                        default:
                          break;
                    }
                    window.resources[i].isAlive = false;
                    break;
                }
            }
        }
    }
}
function Update()
{

    warplan = new Warplan(window.baseOne, window.baseTwo, window.StartTime, window.resources)
    updatedPlan = window.baseOne.AI.Execute(warplan);
    ParseWarPlan(window.baseOne, updatedPlan, false);
    
    warplan2 = new Warplan(window.baseTwo, window.baseOne, window.StartTime, window.resources)
    updatedPlan2 = window.baseTwo.AI.Execute(warplan2);
    ParseWarPlan(window.baseTwo, updatedPlan2, false);

    CheckResources();

    Cleanup();
    GenerateResources();
    UpdateScoreboard();
    if((new Date()).getTime() - window.StartTime > 25 * 60 * 1000)
    {
        window.isAlive = false;
    }
    if(window.isAlive)
    {
        setTimeout(function(){Update();}, 30);
    }
    else
    {
        tryAgain();
    }
}

function runWar()
{
	CreateGlobals();
	Update();
}