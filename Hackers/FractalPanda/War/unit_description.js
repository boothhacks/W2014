function UnitDescription(unit)
{
    this.maxHealth = unit.maxHealth;
    this.currentHealth = unit.currentHealth;
    this.speed = unit.speed;
    this.cooldown = unit.cooldown;
    this.range = unit.range;
    this.attack = unit.attack;
    this.unitsize = unit.unitsize;
    this.x = GridFromCoordx(unit.x);
    this.y = GridFromCoordy(unit.y);
    this.ID = unit.ID;
    this.unitType = unit.unitType;

    this.actionDescription = null;
    this.moveDirection = null;
    this.moveSpeed = null;
}