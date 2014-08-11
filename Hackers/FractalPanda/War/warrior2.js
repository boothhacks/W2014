function Warrior2()
{
    this.warplan = null;
    this.initialDelay = 21000;
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
        //TODO: count how many of each unit type I have.  Make decisions based on that.
        var scoutCount = 0;
        var gatlingCount = 0;
        var sniperCount = 0;
        var brawlerCount = 0;
        var bombadierCount = 0;
        for(var i = 0; i < this.warplan.myUnits.length; i++)
        {
            if(this.warplan.myUnits[i].unitType == UnitTypeEnum.SCOUT)
            {
                scoutCount++;
            }
            if(this.warplan.myUnits[i].unitType == UnitTypeEnum.GATLING)
            {
                gatlingCount++;
            }
            if(this.warplan.myUnits[i].unitType == UnitTypeEnum.SNIPER)
            {
                sniperCount++;
            }
            if(this.warplan.myUnits[i].unitType == UnitTypeEnum.BRAWLER)
            {
                brawlerCount++;
            }
            if(this.warplan.myUnits[i].unitType == UnitTypeEnum.BOMBADIER)
            {
                bombadierCount++;
            }
        }

        current = (new Date()).getTime() 
        if(scoutCount < 3 || (this.warplan.resources.length > 10 && scoutCount < 4) || 
            (this.warplan.resources.length > 15 && scoutCount < 5) && this.canAfford(UnitTypeEnum.SCOUT))
        {
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.SCOUT);
        }
        else if(gatlingCount < 1 && this.canAfford(UnitTypeEnum.GATLING))
        {
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.GATLING);      
        }
        else if(bombadierCount < 1 && this.canAfford(UnitTypeEnum.BOMBADIER))
        {
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.BOMBADIER);      
        }

        //if they have Gatlings on the field, I do NOT want a brawler
        else if(brawlerCount < 5 && this.canAfford(UnitTypeEnum.BRAWLER))
        {
            this.warplan.myBase.actionDescription = new ActionDescription(ActionEnum.SPAWN, UnitTypeEnum.BRAWLER);      
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
                if(this.warplan.myUnits[i].unitType == UnitTypeEnum.SCOUT)
                {
                    //if I'm a scout, ignore everybody but brawlers.  Too much jumping around trying
                    //to dodge ranged attacks
                    //NVM.  Appears this doesn't actually work, makes me lose
                    //if(this.warplan.enemyUnits[j].unitType != UnitTypeEnum.BRAWLER)
                    //{
                    //    continue;
                    //}
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
                x = this.warplan.enemyBase.x - this.warplan.myUnits[i].x
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
        }   
    }
    this.Execute = function(warplan)
    {
        this.warplan = warplan
        this.ChooseBaseAction();
        this.ChooseUnitActions();
        return this.warplan;
    }
}