define(["vector"],function(t){var i=function(){function i(i,n,e){this.position=i||new t(0,0),this.velocity=n||new t(0,0),this.acceleration=e||new t(0,0)}return i.prototype.move=function(){this.velocity.add(this.acceleration),this.position.add(this.velocity)},i}();return i});