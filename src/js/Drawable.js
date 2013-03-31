var gk = (function(gk){

    var DEFAULT_COLOR = "#000000";
    var base_id = 0;

    //Constructor//////////////////////////////////////////////////////
    function Drawable(){ }
    
    Drawable.prototype = new gk.Eventable();

    //Instance Methods/////////////////////////////////////////////////    
    Drawable.prototype.updateMouse = function(oldMouse, curMouse){
        throw "Class does not provide a mouse update";
    }
    
    Drawable.prototype.startRender = function(options){
        var ctx = this.getContext(options);
        ctx.save();
        ctx.fillStyle = getColor(options);
        ctx.strokeStyle = getColor(options);
    }

    Drawable.prototype.finishRender = function(options){
        var ctx = this.getContext(options);
        ctx.restore();
    }
    
    Drawable.prototype.getContext = function(options){
        return options.ctx;
    }

    Drawable.prototype.draw = function(options){
        throw "Unimplemented abstract method: Drawable.draw";
    }
    
    Drawable.prototype.toString = function(){
        return this.id || this.generateNewId();    
    }
    
    Drawable.prototype.generateNewId = function(){
        return this.id = ++base_id;
    }
    
    //Utility methods//////////////////////////////////////////////////
    function getColor(options){
        return options.color || DEFAULT_COLOR;    
    }
    
    gk.primitives = [];
    gk.registerPrimitive = function(primitiveClass){
        gk.primitives.push(primitiveClass);    
    }
    
    gk.Drawable = Drawable;

    return gk;
})(gk || {});