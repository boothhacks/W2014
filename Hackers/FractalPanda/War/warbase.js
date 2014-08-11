function Warbase(x, y, team)
{
    this.checkUnitAvailable = function()
    {
        if(this.currentUnitCount < this.maxUnitCount)
        {
          current = (new Date()).getTime();
          if(current - this.lastAction > this.cooldown)
          {
            this.lastAction = current;
            return true;
          }
        }
        return false;
    }
    this.block = null;
    this.maxHealth = 1000;
    this.currentHealth = this.maxHealth;
    this.AI = null;
    this.money = 200;
    this.energy = 200;
    this.energyRegen = 0.3;
    this.moneyRegen = 0.3;
    this.cooldown = 1000;
    this.lastAction = (new Date()).getTime() - this.cooldown;
    this.maxUnitCount = 15;
    this.currentUnitCount = 0;
    this.team = team;
    this.size = 15;
    this.x = x;
    this.y = y;
    this.gridx = (x)
    this.gridy = (y)
    this.gridWidth = this.size;
    this.gridHeight = this.size;
    this.isAlive = true;
    this.ID = team + '-' + window.baseCount;
    this.generateBlock = function()
    {
      block = document.createElement("div");
      block.setAttribute("id", "base-block-" + window.baseCount);
      block.className = "base-block";
      block.style.width = window.gridBlockWidth * this.size + "px";
      block.style.height = window.gridBlockHeight * this.size + "px";
      block.style.backgroundColor = "grey";
      block.style.position = "absolute";
      //TODO: add more blocks, make it colorful.  Also need to add a base object
      block.style.left = CoordFromGridx(this.x - this.gridWidth/2);
      block.style.top = CoordFromGridy(this.y - this.gridHeight/2);
      window.baseCount++;
      window.board.appendChild(block);
      this.block = block;
    }
    this.deleteBlock = function()
    {
      window.board.removeChild(this.block);
    }
    this.spawnUnit = function(unitType)
    {
        if(this.checkUnitAvailable())
        {
            x = CoordFromGridx(this.x), 
            y = CoordFromGridy(this.y)
            unit = new Unit(unitType, this.team, x, y);
            if(this.energy > unit.energyCost && this.money > unit.moneyCost)
            {
              window.units.push(unit);
              this.currentUnitCount++;
              this.energy -= unit.energyCost;
              this.money -= unit.moneyCost;
            }
            else
            {
                unit.deleteBlock()
            }
        }
    }
    this.unitDied = function(team)
    {
        if(team == this.team)
        {
            this.currentUnitCount--;
        }
    }
    this.incrementGoods = function()
    {
        this.money += this.moneyRegen;
        this.energy += this.energyRegen;
    }

    this.update = function(actionDescription)
    {
        if(actionDescription)
        {
          switch(actionDescription.actionEnum)
          {
            case (ActionEnum.SPAWN):
                this.spawnUnit(
                    actionDescription.params
                );
                break;
            default:
                break;
          }
        }
        this.incrementGoods()
        this.checkDeath();
    }
    this.damage = function(damage)
    {
        this.currentHealth -= damage;
        console.log(this.currentHealth + "/" + this.maxHealth)
    }
    this.checkDeath = function()
    {
        if(this.currentHealth <= 0)
        {
            this.isAlive = false;
            window.isAlive = false;
        }
    }
}