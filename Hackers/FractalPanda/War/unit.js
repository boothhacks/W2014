function Unit(unitType, team, x, y)
{
    this.maxHealth = 0;
    this.currentHealth = 0;
    this.speed = 0;
    this.cooldown = 0;
    this.range = 0;
    this.attack = 0;
    this.unitsize = 0;
    this.colorstring = "red";
    this.AOE = false;
    this.energyCost = 0;
    this.moneyCost = 0;
    this.unitType = unitType;
    this.moneyCost = MoneyCost[this.unitType];
    this.energyCost = EnergyCost[this.unitType];
    this.colorstring = "";
    switch (this.unitType)
    {
        case UnitTypeEnum.BRAWLER:
            this.maxHealth = 105;
            this.currentHealth = this.maxHealth;
            this.speed = 3;
            this.cooldown = 700;
            this.range = 2;
            this.attack = 4;
            this.unitsize = 3;
            this.colorstring = (40).toString(16)+(102).toString(16);
            break;
        case UnitTypeEnum.SCOUT:
            this.maxHealth = 25;
            this.currentHealth = this.maxHealth;
            this.speed = 4;
            this.cooldown = 800;
            this.range = 2;
            this.attack = 1;
            this.unitsize = 2;
            this.colorstring = (102).toString(16)+(102).toString(16);
            break;
        case UnitTypeEnum.GUNNER:
            this.maxHealth = 70;
            this.currentHealth = this.maxHealth;
            this.speed = 2;
            this.cooldown = 850;
            this.range = 45;
            this.attack = 4;
            this.unitsize = 2;
            this.colorstring = (140).toString(16)+(102).toString(16);
            break;
        case UnitTypeEnum.SNIPER:
            this.maxHealth = 40;
            this.currentHealth = this.maxHealth;
            this.speed = 0.7;
            this.cooldown = 2500;
            this.range = 90;
            this.attack = 27;
            this.unitsize = 1;
            this.colorstring = (140).toString(16)+(40).toString(16);
            break;
        case UnitTypeEnum.BOMBADIER:
            this.maxHealth = 400;
            this.currentHealth = this.maxHealth;
            this.speed = 0.2;
            this.cooldown = 4000;
            this.range = 100;
            this.attack = 21;
            this.unitsize = 5;
            this.colorstring = (140).toString(16)+(102).toString(16)
            this.AOE = true;
            break;
        case UnitTypeEnum.GATLING:
            this.maxHealth = 200;
            this.currentHealth = this.maxHealth;
            this.speed = 0.5;
            this.cooldown = 100;
            this.range = 75;
            this.attack = 3;
            this.unitsize = 4;
            this.colorstring = (140).toString(16)+(140).toString(16)
            this.AOE = false;
            break;
        default:
            break;
    }
    this.lastAction = (new Date()).getTime() - this.cooldown;

    if(team == window.baseOne.team)
    {
        this.colorstring = "red";
    }
    else if (team == window.baseTwo.team)
    {
        this.colorstring = "blue";
    }
    else
    {
        console.log(team);
    }
    this.checkActionAvailable = function()
    {
        current = (new Date()).getTime();
        if(current - this.lastAction > this.cooldown)
        {
          return true;
        }
        return false;
    }
    this.damage = function(attack)
    {
        this.currentHealth -= attack;
        console.log(this.currentHealth + "/" + this.maxHealth)
    }
    this.update = function(action, direction, speed)
    {
        tookAction = false;
        if(action != null)
        {
            if(this.checkActionAvailable())
            {
              switch(action.actionEnum)
              {
                case(ActionEnum.ATTACK):
                    window.Attack(GridFromCoordx(this.x), GridFromCoordy(this.y), action.params[0], 
                        action.params[1], this.range, this.attack, this.AOE, this.team);
                    tookAction = true;
                    break;
                default:
                    break;
              }
            }
        }
        if(tookAction == true)
        {
            this.lastAction = (new Date()).getTime();
        }
        if(direction && speed)
        {
            speed = Math.min(speed, this.speed);
            if(tookAction == true)
            {
                speed = 0;
            }
            distance = Math.pow(Math.pow(direction[0], 2) + Math.pow(direction[1], 2), 0.5);
            if(distance != 0)
            {
              changex = direction[0] * speed / distance
              changey = direction[1] * speed / distance
              //don't overlap!
              collisions = collision(GridFromCoordx(this.x + changex), GridFromCoordy(this.y + changey));
              wallCollision = false;
                for(var k = 0; k < collisions.length; k++)
                {
                    if(collisions[k].unitType == UnitTypeEnum.WALL)
                    {
                        wallCollision = true;
                    }
                }
                if(!wallCollision)
                {
                    //we can pass through, time to do the calculations
                    this.x += changex
                    this.y += changey
                    this.block.style.left = this.x - this.gridWidth * window.gridBlockWidth / 2;
                    this.block.style.top = this.y - this.gridHeight * window.gridBlockHeight / 2;
                    this.gridx = GridFromCoordx(this.x)
                    this.gridy = GridFromCoordy(this.y)
                }
            }
        }
        this.checkDeath();
    }
    this.deleteBlock = function()
    {
        window.board.removeChild(this.block);
    }
    this.checkDeath = function()
    {
      if(this.x < 0 || this.x >= window.boardWidth ||
          this.y < 0 || this.y >= window.boardHeight )
      {
        console.log("unit died!")
         this.isAlive = false;
      }
      if(this.currentHealth <= 0)
      {
         this.isAlive = false;
      }
    }
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.team = team;
    this.ID = team + '-' + window.unitCount;

    this.gridWidth = this.unitsize;
    this.gridHeight = this.unitsize;
    this.gridx = GridFromCoordx(this.x)
    this.gridy = GridFromCoordy(this.y)

    this.block = document.createElement("div");
    this.block.setAttribute("id", "unit-block-" + window.unitCount);
    this.block.className = "unit-block";
    this.block.style.width = window.gridBlockWidth * this.unitsize + "px";
    this.block.style.height = window.gridBlockHeight * this.unitsize + "px";
    this.block.style.backgroundColor = this.colorstring;
    this.block.style.position = "absolute";
      //TODO: add more blocks, make it colorful.  Also need to add a base object
    this.block.style.left = x  - this.gridWidth * window.gridBlockWidth / 2;
    this.block.style.top = y - this.gridHeight * window.gridBlockHeight / 2;
    window.unitCount++;
    window.board.appendChild(this.block);

}