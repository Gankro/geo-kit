var gk = (function(gk){

    var LINE_DRAW_LENGTH = 1000;

    function Line(ptA, ptB){
        this.ptA = ptA;
        this.ptB = ptB;
    }
    
    Line.createPrimitive = function(mouse){
        return new Line(new Point(mouse.x, mouse.y), new Point(mouse.x+0.01, mouse.y));
    }

    Line.prototype = new gk.Drawable();

    Line.prototype.__defineGetter__("slope", function(){
        return (this.ptB.y - this.ptA.y)/(this.ptB.x - this.ptA.x);
    });

    Line.prototype.__defineGetter__("yIntercept", function(){
        return this.ptA.y - this.ptA.x*this.slope;
    });

    Line.prototype.__defineGetter__("angle", function(){
        return Math.atan2(this.ptA.y-this.ptB.y,this.ptA.x-this.ptB.x);
    });

    Line.prototype.draw = function(options){

        var angle = this.angle;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        this.startRender(options);
        var ctx = this.getContext(options);
        ctx.beginPath();
        ctx.moveTo(this.ptA.x+cos*LINE_DRAW_LENGTH, this.ptA.y+sin*LINE_DRAW_LENGTH);
        ctx.lineTo(this.ptA.x-cos*LINE_DRAW_LENGTH, this.ptA.y-sin*LINE_DRAW_LENGTH);
        ctx.closePath();
        ctx.stroke();
        this.finishRender(options);   
    }

    gk.Line = Line;

    gk.registerPrimitive(Line);

    return gk;
})(gk || {});