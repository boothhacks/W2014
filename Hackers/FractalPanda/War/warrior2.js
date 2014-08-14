function Warrior2()
{
    this.warplan = null;
    this.initialDelay = 30000;
    this.spawnAttacking = false;
    this.canAfford = function(unitType)
    {
        if(this.warplan.energy >= EnergyCost[unitType] && this.warplan.money >= MoneyCost[unitType])
        {
            return true;
        }
        return false;
    }
    this.ChooseBaseAction = function()
    {
        this.enemyUnitCounts = {};
        this.myUnitCounts = {};
        for(var k in UnitTypeEnum)
        {
            this.enemyUnitCounts[UnitTypeEnum[k]] = 0;
            this.myUnitCounts[UnitTypeEnum[k]] = 0;
        }
        for(var i = 0; i < this.warplan.enemyUnits.length; i++)
        {
            this.enemyUnitCounts[this.warplan.enemyUnits[i].unitType] += 1;
        }
        for(var i = 0; i < this.warplan.myUnits.length; i++)
        {
            this.myUnitCounts[this.warplan.myUnits[i].unitType] += 1;
        }
        this.totalenemyUnits = 0;
        this.totalmyUnits = 0;
        for(var k in UnitTypeEnum)
        {  
            this.totalenemyUnits += this.enemyUnitCounts[UnitTypeEnum[k]];
            this.totalmyUnits += this.myUnitCounts[UnitTypeEnum[k]];
        }

        current = (new Date()).getTime() 
        if((this.myUnitCounts[UnitTypeEnum.SCOUT] < 3  || (this.warplan.resources.length > 10 && this.myUnitCounts[UnitTypeEnum.SCOUT] < 4) || 
            (this.warplan.resources.length > 15 && this.myUnitCounts[UnitTypeEnum.SCOUT] < 5)) && this.totalenemyUnits - this.totalmyUnits < 4 && 
            this.canAfford(UnitTypeEnum.SCOUT))
        {
            //if I don't have enough scouts on the field, that's the first priority
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.SCOUT);
        }
        else if(this.myUnitCounts[UnitTypeEnum.GATLING] < 1 && this.canAfford(UnitTypeEnum.GATLING) && 
            (this.enemyUnitCounts[UnitTypeEnum.SNIPER] < 1 || (this.totalmyUnits > 15 && this.enemyUnitCounts[UnitTypeEnum.SNIPER] < 3))
            && this.enemyUnitCounts[UnitTypeEnum.TANK] < 1 && current - window.startTime > 10000)
        {
            //If they have snipers on the field, I do NOT want a gatling
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.GATLING);
        }
        else if(this.myUnitCounts[UnitTypeEnum.GATLING] < 1 && this.enemyUnitCounts[UnitTypeEnum.BRAWLER] > 2 && 
            this.enemyUnitCounts[UnitTypeEnum.SNIPER] < 1 && this.enemyUnitCounts[UnitTypeEnum.TANK] < 1)
        {
            //if there's at least 3 brawlers and no snipers in the field, I want to save for a 
            //gatling even if I can't afford it right now
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.GATLING);
        }
        else if(this.myUnitCounts[UnitTypeEnum.SNIPER] < 3 && this.canAfford(UnitTypeEnum.SNIPER) && 
            this.enemyUnitCounts[UnitTypeEnum.BRAWLER] < (this.myUnitCounts[UnitTypeEnum.SNIPER] + 1) * 2.5 && 
            this.enemyUnitCounts[UnitTypeEnum.SWARM] < (this.myUnitCounts[UnitTypeEnum.SNIPER] + 2) * 3)
        {
            //If they have Brawlers or swarms on the field, I do NOT want a sniper
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.SNIPER);
        }
        else if(this.myUnitCounts[UnitTypeEnum.BRAWLER] < 5 && this.canAfford(UnitTypeEnum.BRAWLER) && 
            this.enemyUnitCounts[UnitTypeEnum.GATLING] < 1)
        {
            //if they have Gatlings on the field, I do NOT want a brawler
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.BRAWLER);      
        }
        else if(this.enemyUnitCounts[UnitTypeEnum.GATLING] > 0)
        {
            //I need snipers, even if I can't afford them
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.SNIPER);      
        }
        else if(this.canAfford(UnitTypeEnum.SNIPER) && this.totalenemyUnits - this.totalmyUnits < 1)
        {
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.SNIPER);      
        }
        else if(this.canAfford(UnitTypeEnum.GUNNER))
        {
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.GUNNER);         
        }

    }
    this.ChooseScoutActions = function()
    {
        //TODO: Scouts could move much smarter
        //have them target resources based on who's closest
        //instead of chasing the base, have them run away from the center of mass of all friendly scouts
        //(toward the enemy base if they're the only scout)
        //Make sure there's some randomness so they end up scattering
        //if one direction is sealed off, try running in the opposite
        //add a "persistent storage" dictionary for people to use across turns?
        //check if path to resource goes through target zone
        //use pathfinding to determine closest resource, and follow the path!

    }
    this.ChooseSniperActions = function()
    {
        //Target enemy Gatling's first, then enemy Snipers, then enemy Gunners... 
        //don't target swarm unless you have to? 
    }
    this.ChooseSwarmActions = function()
    {
        //TODO: if enemies are overlapping, choose ones that haven't been chosen!  Or at least choose a random one.
        for(var i = 0; i < this.warplan.myUnits.length; i++)
        {
            if(this.warplan.myUnits[i].unitType != UnitTypeEnum.SWARM)
            {
              continue;
            }
            closestUnit = null;
            closestDistance = 120;
            var almostInRangeOf = new Array();
            for(var j = 0; j < this.warplan.enemyUnits.length; j++)
            {
                distance = Math.pow(
                             Math.pow(this.warplan.myUnits[i].x - this.warplan.enemyUnits[j].x, 2) + 
                             Math.pow(this.warplan.myUnits[i].y - this.warplan.enemyUnits[j].y, 2), 
                             0.5);
                buffer = 2;
                if(distance < this.warplan.enemyUnits[j].range + buffer)
                {
                    almostInRangeOf.push(this.warplan.enemyUnits[j]);
                }
                if(this.warplan.enemyUnits[j].speed >= this.warplan.myUnits[i].speed &&
                    distance > this.warplan.myUnits[i].range)
                {
                    //If there's an enemy in range who's faster than me, ignore them
                    continue;
                }
                if(this.warplan.enemyUnits[j].unitType == UnitTypeEnum.SNIPER && 
                    ((closestUnit && closestUnit.unitType != UnitTypeEnum.SNIPER) || !closestUnit))
                {
                   //if the enemy I'm looking at is a sniper and 
                   //(I'm not targeting anyone or I'm targeting a non-sniper)
                   //then target this guy (means I always target a sniper if there's one nearby)
                   closestUnit = this.warplan.enemyUnits[j];
                   closestDistance = distance; 
                }
                else if(distance < closestDistance && ((closestUnit && closestUnit.unitType != UnitTypeEnum.SNIPER) || !closestUnit))
                {
                    //TODO: differntiate between destination target and attack target.  Should at least attack somebody if they're next to me!

                    //either this guy isn't a sniper, or he is a sniper but I already have a sniper targeted
                    //if this guy is closer than the current closest and 
                    //(I'm not targeting anyone or the current target isn't a sniper)
                    //choose this guy.  That means I'll target the closest guy, assuming there's no sniper in ranger.  Otherwise, 
                    //I'll target the sniper
                    closestUnit = this.warplan.enemyUnits[j];
                    closestDistance = distance;
                }
            }
            if(this.myUnitCounts[UnitTypeEnum.SWARM] < this.enemyUnitCounts[UnitTypeEnum.SNIPER] * 2 || (this.enemyUnitCounts[UnitTypeEnum.SNIPER] > 4 && this.myUnitCounts[UnitTypeEnum.SWARM] < 16))
            {
                this.swarmAttacking == false;
            }
            //batch my Swarm waves
            //don't swarm if there's a gatling, or you'll get slaughtered
            //...but you should still attack if you're in range of someone
            if(((this.myUnitCounts[UnitTypeEnum.SWARM] < this.enemyUnitCounts[UnitTypeEnum.SNIPER] * 7 && almostInRangeOf.length == 0 && !this.swarmAttacking) ||
                this.enemyUnitCounts[UnitTypeEnum.GATLING] > 0 || (this.myUnitCounts[UnitTypeEnum.SWARM] < 15 && !this.attack)) && almostInRangeOf.length < 1 )
            {
                //go to my own base
                this.warplan.myUnits[i].actionDescription = null;
                x =  this.warplan.myBase.x - this.warplan.myUnits[i].x
                y = this.warplan.myBase.y - this.warplan.myUnits[i].y
                
                this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;
               continue;
            }
            if(this.myUnitCounts[UnitTypeEnum.SWARM] > this.enemyUnitCounts[UnitTypeEnum.SNIPER] * 7 && this.enemyUnitCounts[UnitTypeEnum.GATLING] < 1)
            {
                this.swarmAttacking = true;
            }
            if(closestUnit == null)
            {
                //see if the enemy base is in range, set that as closest unit
                enemyBaseDistance = Math.pow(
                Math.pow(this.warplan.myUnits[i].x - this.warplan.enemyBase.x, 2) + 
                Math.pow(this.warplan.myUnits[i].y - this.warplan.enemyBase.y, 2), 
                0.5);
                if(enemyBaseDistance < closestDistance)
                {
                    closestUnit = this.warplan.enemyBase;
                    closestDistance = enemyBaseDistance;
                }
            }
            //if we didn't find a targetable unit, just head towards the enemy base
            if(closestUnit == null)
            {
                this.warplan.myUnits[i].actionDescription = null;
                x =  this.warplan.enemyBase.x - this.warplan.myUnits[i].x
                y = this.warplan.enemyBase.y - this.warplan.myUnits[i].y
                
                this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;
            }
            //if we DID find a targetable unit...
            else
            {
                //try attacking the unit if able
                if(closestDistance < this.warplan.myUnits[i].range)
                {
                    this.warplan.myUnits[i].actionDescription = 
                        new ActionDescription(ActionEnum.ATTACK, new Array(closestUnit.x, closestUnit.y));
                }

                //first, check if we're near any hazards- like the edge- and run away!
                buffer = this.warplan.myUnits[i].speed - 1;
                if( (this.warplan.myUnits[i].x < this.warplan.minx + buffer || this.warplan.myUnits[i].x > this.warplan.maxx - buffer) ||
                    (this.warplan.myUnits[i].y < this.warplan.miny + buffer || this.warplan.myUnits[i].y > this.warplan.maxy - buffer))
                {
                    //move towards the middle
                    x = (this.warplan.minx + this.warplan.maxx)/2 - this.warplan.myUnits[i].x;
                    y = (this.warplan.miny + this.warplan.maxy)/2 - this.warplan.myUnits[i].y;
                    this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                        this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;
                }
                else
                {
                    buffer = 2;
                    //we want to stay at the edge of our range if we can, so move away from the nearest unit
                    x = closestUnit.x - this.warplan.myUnits[i].x
                    y = closestUnit.y - this.warplan.myUnits[i].y
                    if(closestDistance < this.warplan.myUnits[i].range - buffer)
                    {
                        this.warplan.myUnits[i].moveDirection = new Array(-x, -y);  
                        this.warplan.myUnits[i].moveSpeed = Math.max(Math.min(
                            this.warplan.myUnits[i].speed, this.warplan.myUnits[i].range - closestDistance - buffer), 0);    
                    }
                    else
                    {
                        this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                        this.warplan.myUnits[i].moveSpeed = Math.max(Math.min(
                            this.warplan.myUnits[i].speed, closestDistance), 0);       
                    }
                }
            }
            //don't spread if you are within striking distance
            if(this.warplan.myUnits[i].moveDirection && closestDistance > this.warplan.myUnits[i].range + 8)
            {
               //spread apart to avoid AOE damage
               //find the center of gravity of all nearby units and move away from that

               //also, it looks cool :)
               centerx = 0;
               centery = 0;
               closeCount = 0;
               radius = 4;
               strength = 1;
               for(var k = 0; k < this.warplan.myUnits.length; k++)
               {
                 if(Math.abs(this.warplan.myUnits[i].x - this.warplan.myUnits[k].x) < radius && 
                     Math.abs(this.warplan.myUnits[i].y - this.warplan.myUnits[k].y) < radius)
                  {
                    centerx = centerx + this.warplan.myUnits[k].x;
                    centery = centery + this.warplan.myUnits[k].y;
                    closeCount = closeCount + 1;
                  }
               }
               //closeCount should never be 0, since we're inclided in the closeCount
               centerx = centerx / closeCount;
               centery = centery / closeCount;
               if(this.warplan.myUnits[i].x != centerx || this.warplan.myUnits[i].y != centery)
               {
                   x = centerx - this.warplan.myUnits[i].x;
                   y = centery - this.warplan.myUnits[i].y;
                   d1 = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
                   d2 = Math.pow(Math.pow(this.warplan.myUnits[i].moveDirection[0], 2) + Math.pow(this.warplan.myUnits[i].moveDirection[1], 2), 0.5);
                   this.warplan.myUnits[i].moveDirection[0] += strength * (-x * d2 / d1 + (Math.random() - 0.5));
                   this.warplan.myUnits[i].moveDirection[1] += strength * (-y * d2  / d1 + (Math.random() - 0.5));
               }
               this.warplan.myUnits[i].moveDirection[0] += (Math.random() - 0.5) * 3;
               this.warplan.myUnits[i].moveDirection[1] += (Math.random() - 0.5) * 3;
            }
        }   
    }
    this.ChooseUnitActions = function()
    {
        for(var i = 0; i < this.warplan.myUnits.length; i++)
        {
            closestUnit = null;
            closestDistance = 120;
            var almostInRangeOf = new Array();
            for(var j = 0; j < this.warplan.enemyUnits.length; j++)
            {
                distance = Math.pow(
                             Math.pow(this.warplan.myUnits[i].x - this.warplan.enemyUnits[j].x, 2) + 
                             Math.pow(this.warplan.myUnits[i].y - this.warplan.enemyUnits[j].y, 2), 
                             0.5);
                buffer = 2;
                //TODO: if there's a sniper or gatling in range, target it!
                if(distance < this.warplan.enemyUnits[j].range + buffer)
                {
                    almostInRangeOf.push(this.warplan.enemyUnits[j]);
                }
               if(this.warplan.myUnits[i].unitType != UnitTypeEnum.GUNNER)
                {
                    //if I'm a non-gunner, ignore faster units unless they're in my range,
                    //since I can't catch them anyways and they can be used to harass
                    //But I kinda want gunners to chase them, since they are fast and have range, and can trap
                    //scouts against walls
                    if(this.warplan.enemyUnits[j].speed >= this.warplan.myUnits[i].speed &&
                        distance > this.warplan.myUnits[i].range)
                    {
                        continue;
                    }
                }
                if(distance < closestDistance)
                {
                    closestUnit = this.warplan.enemyUnits[j];
                    closestDistance = distance;
                }
            }
            //batch my first wave of brawlers
            if(this.warplan.myUnits[i].unitType == UnitTypeEnum.BRAWLER)
            {
                if((new Date()).getTime() - this.warplan.startTime < this.initialDelay && closestUnit == null)
                {
                 continue;
                }
            }

            if(closestUnit == null)
            {
                if(this.warplan.myUnits[i].unitType == UnitTypeEnum.SCOUT)
                {
                    //if we're a scout, we should go after the closest good, unless it puts us in harms way
                    //otherwise, go after enemy base
                    closestResource = null;
                    closestResourceDistance = 270; //don't bother if it's too far away; never going to get there in time
                    closestResourceIndex = 0;
                    for(var j = 0; j < this.warplan.resources.length; j++)
                    {
                        distance = Math.pow(
                                     Math.pow(this.warplan.myUnits[i].x - this.warplan.resources[j].x, 2) + 
                                     Math.pow(this.warplan.myUnits[i].y - this.warplan.resources[j].y, 2), 
                                     0.5);
                       
                        if(distance < closestResourceDistance)
                        {
                            closestResource = this.warplan.resources[j];
                            closestResourceDistance = distance;
                            closestResourceIndex = j;
                        }
                    }
                    //if there are nearby enemies, run away from them
                    if(almostInRangeOf.length != 0 && closestResourceDistance > this.warplan.myUnits[i].speed * 4)
                    {
                        var totx = 0;
                        var toty = 0;
                        for(var j = 0; j < almostInRangeOf.length; j++)
                        {
                            totx += almostInRangeOf[j].x
                            toty += almostInRangeOf[j].y
                        }
                        //find average x, y value of all people who almost have us in range (if they're clumped, 
                        // we will run away from the clump.  If we're surrounded, we're screwed anyways)
                        x = totx/almostInRangeOf.length - this.warplan.myUnits[i].x
                        y = toty/almostInRangeOf.length - this.warplan.myUnits[i].y
                        //add a random perturbation to stop them from chasing me directly back to my base
                        this.warplan.myUnits[i].moveDirection = new Array( -x + (Math.random() - 0.5) * 0.1 * x, -y + (Math.random() -0.5) * 0.1 * y);
                        this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;    
                    }
                    //if there aren't nearby enemies or resources, run towards the enemy base
                    else if(closestResource == null)
                    {
                        x = this.warplan.enemyBase.x - this.warplan.myUnits[i].x
                        y = this.warplan.enemyBase.y - this.warplan.myUnits[i].y
                        //if we can't find a resource, we'll just head toward the enemy base
                        this.warplan.myUnits[i].moveDirection = new Array(x + Math.random() - 0.5, y + Math.random() -0.5);  
                        this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed; 

                        if(Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5) < this.warplan.myUnits[i].range)
                         {
                            this.warplan.myUnits[i].actionDescription = 
                            new ActionDescription(ActionEnum.ATTACK, new Array(this.warplan.enemyBase.x, this.warplan.enemyBase.y));
                        }     
                    }
                    //if there are nearby resources and no nearby enemies, run and get them!
                    else
                    {
                        x = closestResource.x - this.warplan.myUnits[i].x
                        y = closestResource.y - this.warplan.myUnits[i].y
                        this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                        this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed; 
                        this.warplan.resources.splice(closestResourceIndex, 1); //once somebody is chasing, remove it 
                    }
                    //if we're a scout, we're done.  bail out.
                    continue;
                }
                else
                {
                    //see if the enemy base is in range, set that as closest unit
                    enemyBaseDistance = Math.pow(
                     Math.pow(this.warplan.myUnits[i].x - this.warplan.enemyBase.x, 2) + 
                     Math.pow(this.warplan.myUnits[i].y - this.warplan.enemyBase.y, 2), 
                    0.5);
                    if(enemyBaseDistance < closestDistance)
                    {
                        closestUnit = this.warplan.enemyBase;
                        closestDistance = enemyBaseDistance;
                    }
                }
            }
            //if we didn't find a targetable unit, just head towards the enemy base
            if(closestUnit == null)
            {
                this.warplan.myUnits[i].actionDescription = null;
                x =  this.warplan.enemyBase.x - this.warplan.myUnits[i].x
                y = this.warplan.enemyBase.y - this.warplan.myUnits[i].y
                
                this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;
            }
            //if we DID find a targetable unit...
            else
            {
                //try attacking the unit if able
                if(closestDistance < this.warplan.myUnits[i].range)
                {
                    this.warplan.myUnits[i].actionDescription = 
                        new ActionDescription(ActionEnum.ATTACK, new Array(closestUnit.x, closestUnit.y));
                }

                //first, check if we're near any hazards- like the edge- and run away!
                buffer = 1 + this.warplan.myUnits[i].speed;
                if( (this.warplan.myUnits[i].x < this.warplan.minx + buffer || this.warplan.myUnits[i].x > this.warplan.maxx - buffer) ||
                    (this.warplan.myUnits[i].y < this.warplan.miny + buffer || this.warplan.myUnits[i].y > this.warplan.maxy - buffer))
                {
                    //move towards the middle
                    x = (this.warplan.minx + this.warplan.maxx)/2 - this.warplan.myUnits[i].x;
                    y = (this.warplan.miny + this.warplan.maxy)/2 - this.warplan.myUnits[i].y;
                    this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                        this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;
                }
                //scouts shouldn't bother chasing down and attacking - they should collect stuff and run away
                else if(this.warplan.myUnits[i].unitType == UnitTypeEnum.SCOUT)
                {
                    x = closestUnit.x - this.warplan.myUnits[i].x
                    y = closestUnit.y - this.warplan.myUnits[i].y

                    closestResource = null;
                    closestResourceDistance = 270;
                    closestResourceIndex
                    for(var j = 0; j < this.warplan.resources.length; j++)
                    {
                        distance = Math.pow(
                                     Math.pow(this.warplan.myUnits[i].x - this.warplan.resources[j].x, 2) + 
                                     Math.pow(this.warplan.myUnits[i].y - this.warplan.resources[j].y, 2), 
                                     0.5);
                       
                        if(distance < closestResourceDistance)
                        {
                            closestResource = this.warplan.resources[j];
                            closestResourceDistance = distance;
                            closestResourceIndex = j;
                        }
                    }

                     buffer = 2;
                    //if we're uncomfortable close to units range, run away... unless we're really close to the resource
                    if(almostInRangeOf.length != 0 && closestResourceDistance > this.warplan.myUnits[i].speed * 4)
                    {
                        var totx = 0;
                        var toty = 0;
                        for(var j = 0; j < almostInRangeOf.length; j++)
                        {
                            totx += almostInRangeOf[j].x
                            toty += almostInRangeOf[j].y
                        }
                        //find average x, y value of all people who almost have us in range (if they're clumped, 
                        // we will run away from the clump.  If we're surrounded, we're screwed anyways)
                        x = totx/almostInRangeOf.length - this.warplan.myUnits[i].x
                        y = toty/almostInRangeOf.length - this.warplan.myUnits[i].y
                        //add a random perturbation to stop them from chasing me directly back to my base
                        this.warplan.myUnits[i].moveDirection = new Array(-x + Math.random() - 0.5, -y + Math.random() -0.5);  
                        this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;    
                    }
                    else
                    {
                        if(closestResource == null)
                        {
                            //if we can't find a resource, we'll just head toward the closest unit
                            this.warplan.myUnits[i].moveDirection = new Array(x + Math.random() - 0.5, y + Math.random() -0.5);  
                            this.warplan.myUnits[i].moveSpeed = Math.max(Math.min(
                                //don't walk into their range...
                                this.warplan.myUnits[i].speed, closestDistance - closestUnit.range - 1), 0);      
                        }
                        else
                        {
                            //chase the closest resource!
                            x = closestResource.x - this.warplan.myUnits[i].x
                            y = closestResource.y - this.warplan.myUnits[i].y
                            this.warplan.myUnits[i].moveDirection = new Array(x + Math.random() - 0.5, y + Math.random() -0.5);  
                            this.warplan.myUnits[i].moveSpeed = this.warplan.myUnits[i].speed;      
                            this.warplan.resources.splice(closestResourceIndex, 1); //once somebody is chasing, remove it
                        }
                    }                    
                }
                else
                {
                    buffer = 2;
                    //we want to stay at the edge of our range if we can, so move away from the nearest unit
                    x = closestUnit.x - this.warplan.myUnits[i].x
                    y = closestUnit.y - this.warplan.myUnits[i].y
                    if(closestDistance < this.warplan.myUnits[i].range - buffer)
                    {
                        this.warplan.myUnits[i].moveDirection = new Array(-x, -y);  
                        this.warplan.myUnits[i].moveSpeed = Math.max(Math.min(
                            this.warplan.myUnits[i].speed, this.warplan.myUnits[i].range - closestDistance - buffer), 0);    
                    }
                    else
                    {
                        this.warplan.myUnits[i].moveDirection = new Array(x, y);  
                        this.warplan.myUnits[i].moveSpeed = Math.max(Math.min(
                            this.warplan.myUnits[i].speed, closestDistance), 0);       
                    }
                }
            }
            //don't spread if you are within striking distance
            if(this.warplan.myUnits[i].moveDirection && closestDistance > this.warplan.myUnits[i].range + 8)
            {
               //spread apart to avoid AOE damage
               //find the center of gravity of all nearby units and move away from that

               //also, it looks cool :)
               centerx = 0;
               centery = 0;
               closeCount = 0;
               radius = 4;
               strength = 1;
               for(var k = 0; k < this.warplan.myUnits.length; k++)
               {
                 if(Math.abs(this.warplan.myUnits[i].x - this.warplan.myUnits[k].x) < radius && 
                     Math.abs(this.warplan.myUnits[i].y - this.warplan.myUnits[k].y) < radius)
                  {
                    centerx = centerx + this.warplan.myUnits[k].x;
                    centery = centery + this.warplan.myUnits[k].y;
                    closeCount = closeCount + 1;
                  }
               }
               //closeCount should never be 0, since we're inclided in the closeCount
               centerx = centerx / closeCount;
               centery = centery / closeCount;
               if(this.warplan.myUnits[i].x != centerx || this.warplan.myUnits[i].y != centery)
               {
                   x = centerx - this.warplan.myUnits[i].x;
                   y = centery - this.warplan.myUnits[i].y;
                   d1 = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
                   d2 = Math.pow(Math.pow(this.warplan.myUnits[i].moveDirection[0], 2) + Math.pow(this.warplan.myUnits[i].moveDirection[1], 2), 0.5);
                   this.warplan.myUnits[i].moveDirection[0] += strength * (-x * d2 / d1 + (Math.random() - 0.5));
                   this.warplan.myUnits[i].moveDirection[1] += strength * (-y * d2  / d1 + (Math.random() - 0.5));
               }
               this.warplan.myUnits[i].moveDirection[0] += (Math.random() - 0.5) * 3;
               this.warplan.myUnits[i].moveDirection[1] += (Math.random() - 0.5) * 3;
            }
        }  
        this.ChooseSwarmActions(); 
    }
    this.Execute = function(warplan)
    {
        this.warplan = warplan
        this.ChooseBaseAction();
        this.ChooseUnitActions();
        return this.warplan;
    }
}