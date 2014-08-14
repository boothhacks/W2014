
function Warplan(homebase, enemybase, startTime, resources)
{
    //this is the object passed back and forth between players and the game
    this.myBase = new WarbaseDescription(homebase);
    this.enemyBase = new WarbaseDescription(enemybase);
    this.startTime = startTime;
    this.myUnits = new Array();
    this.enemyUnits = new Array();
    this.minx = 0;
    this.miny = 0;
    this.maxx = GridFromCoordx(window.boardWidth);
    this.maxy = GridFromCoordy(window.boardHeight);
    this.resources = new Array();
    this.energy = homebase.energy;
    this.money = homebase.money;
    this.team = homebase.team;
    for(var i = 0; i < window.units.length; i++)
    {
        if(window.units[i].team == homebase.team)
        {
            this.myUnits.push(new UnitDescription(window.units[i]));
        }
        else
        {
            this.enemyUnits.push(new UnitDescription(window.units[i]));
        }
    }
    for(var i = 0; i < window.resources.length; i++)
    {
        this.resources.push(new ResourceDescription(window.resources[i]));
    }
}