UnitTypeEnum = {
    BRAWLER : "Brawler",
    GUNNER : "Gunner",
    SNIPER : "Sniper",
    SCOUT : "Scout",
    TANK : "TANK",
    GATLING : "Gatling",
    SWARM : "Swarm",
    BASE: "base",
    WALL: "wall"
}

MoneyCost = {
    "Brawler" : 45,
    "Gunner" : 60,
    "Sniper" : 100,
    "Scout" : 0,
    "TANK" : 300,
    "Gatling" : 250,
    "Swarm" : 10
}
EnergyCost = {
    "Brawler" : 45,
    "Gunner" : 10,
    "Sniper" : 30,
    "Scout" : 25,
    "TANK" : 250,
    "Gatling" : 200,
    "Swarm" : 55
}

ResourceType = {
    MONEY : "Money",
    ENERGY : "Energy"
}

ActionEnum = {
    SPAWN : "Spawn",
    ATTACK : "Attack"
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
function collision(x, y)
{
    //returns an array of all the units, bases, and walls that occupy grid coordinate x,y
    //otherwise returns empty array
    results = new Array();

    for(var i = 0; i < window.units.length; i++)
    {
        // x1  x1 + width
        //  ____  y1
        // |    |
        // |____| ___  y2
        //       |   |
        //       |___|
        //       x2  x2 + width
       
        if( (x >= window.units[i].gridx && x <= window.units[i].gridx + window.units[i].gridWidth ) &&
            (y >= window.units[i].gridy && y <= window.units[i].gridy + window.units[i].gridHeight ))
        {
            results.push(window.units[i]);
        }
    }

    if( (x >= window.baseOne.gridx && x <= window.baseOne.gridx + window.baseOne.gridWidth  ) &&
        (y >= window.baseOne.gridy && y <= window.baseOne.gridy + window.baseOne.gridHeight ))
    {
        results.push(window.baseOne);
    }
    if( (x >= window.baseTwo.gridx && x <= window.baseTwo.gridx + window.baseTwo.gridWidth  ) &&
        (y >= window.baseTwo.gridy && y <= window.baseTwo.gridy + window.baseTwo.gridHeight ))
    {
        results.push(window.baseTwo);
    }
    return results;
}
