function Line(x1, y1, x2, y2, team)
{
    this.id = "line-" + window.LineCount;
    window.LineCount++;
    this.startTime = (new Date()).getTime();

    if(y1 < y2){
        var pom = y1;
        y1 = y2;
        y2 = pom;
        pom = x1;
        x1 = x2;
        x2 = pom;
    }
    this.team = team;
    var a = Math.abs(x1-x2);
    var b = Math.abs(y1-y2);
    var c;
    var sx = (x1+x2)/2 ;
    var sy = (y1+y2)/2 ;
    this.width = Math.sqrt(a*a + b*b ) ;
    this.x = sx - this.width/2;
    this.y = sy;

    a = this.width / 2;

    c = Math.abs(sx-this.x);

    b = Math.sqrt(Math.abs(x1-this.x)*Math.abs(x1-this.x)+Math.abs(y1-this.y)*Math.abs(y1-this.y) );

    var cosb = (b*b - a*a - c*c) / (2*a*c);
    var rad = Math.acos(cosb);
    this.deg = (rad*180)/Math.PI

    htmlns = "http://www.w3.org/1999/xhtml";
    this.block = document.createElementNS(htmlns, "div");
    this.block.setAttribute('style','border:1px solid black;width:'+this.width+'px;height:0px;-moz-transform:rotate('+this.deg+'deg);-webkit-transform:rotate('+this.deg+'deg);position:absolute;top:'+this.y+'px;left:'+this.x+'px;');   

    window.board.appendChild(this.block);

    this.deleteBlock = function()
    {
        window.board.removeChild(this.block);
    }
}