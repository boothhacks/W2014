function Resource(resourceType, resourceAmount, x, y)
{
    this.resourceType = resourceType;
    this.resourceAmount = resourceAmount;
    this.unitsize = Math.max(Math.min(resourceAmount / 10, 5), 2);

    switch(this.resourceType)
    {
        case (ResourceType.MONEY):
            this.colorstring = "gold";
            break;
        case (ResourceType.ENERGY):
            this.colorstring = "lightgreen";
            break;
        default:
            break;
    }

    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.ID = this.resourceType + '-' + window.resourceCount;

    this.gridWidth = this.unitsize;
    this.gridHeight = this.unitsize;
    this.gridx = GridFromCoordx(this.x)
    this.gridy = GridFromCoordy(this.y)

    this.block = document.createElement("div");
    this.block.setAttribute("id", "resource-block-" + window.resourceCount);
    this.block.className = "resource-block";
    this.block.style.width = window.gridBlockWidth * this.unitsize + "px";
    this.block.style.height = window.gridBlockHeight * this.unitsize + "px";
    this.block.style.backgroundColor = this.colorstring;
    this.block.style.position = "absolute";
      //TODO: add more blocks, make it colorful.  Also need to add a base object
    this.block.style.left = x  - this.gridWidth * window.gridBlockWidth / 2;
    this.block.style.top = y - this.gridHeight * window.gridBlockHeight / 2;
    window.unitCount++;
    window.board.appendChild(this.block);
    
    this.deleteBlock = function()
    {
        window.board.removeChild(this.block);
    }
}