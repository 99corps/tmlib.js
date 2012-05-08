/*
 * prim.tm.js
 */

tm.controller = tm.controller || {};


(function() {
    
    /**
     * @class
     * pad
     */
    tm.controller.Pad = tm.createClass({
        superClass: tm.app.Sprite,
        
        isTouching: false,
        circle: null,
        
        init: function() {
            this.superInit(120, 120);
            
            var c = this.canvas;
            c.fillStyle = "#fff";
            c.fillCircle(60, 60, 60);
            c.fillStyle = "#eee";
            
            this._createCircle();
            
            this.interaction;
            
            this.alpha = 0.75;
        },
        
        _createCircle: function() {
            var circle = this.circle = tm.app.Sprite(80, 80);
            this.addChild(circle);
            
            var c = circle.canvas;
            c.fillStyle = "#222";
            c.setShadow("black", 2, 2, 2);
            c.fillCircle(40, 40, 35);
        },
        
        onmousedown: function() {
            this.isTouching = true;
        },
        
        onmouseup: function() {
            this.isTouching = false;
            this.circle.position.set(0, 0);
        },
        
        onmousemove: function(e) {
            if (this.isTouching==false) return ;
            
            var p = e.app.pointing;
            var v = tm.geom.Vector2(p.x - this.x, p.y - this.y);
            this.angle = Math.radToDeg(v.toAngle());
            this.circle.position.set(v.x, v.y);
        }
        
        
    });
    
})();

