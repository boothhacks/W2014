function ResourceDescription(resource)
{
    this.resourceAmount = resource.resourceAmount;
    this.resourceType = resource.resourceType;
    this.x = GridFromCoordx(resource.x);
    this.y = GridFromCoordy(resource.y);
    this.ID = resource.ID;
}