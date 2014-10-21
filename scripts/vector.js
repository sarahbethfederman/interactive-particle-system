// Vector module
// similar to a point

"use strict";

define(function() {

  var Vector = function() {
    function Vector(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }

    // Add one vector to another
    Vector.prototype.add = function(vector) {
      this.x += vector.x;
      this.y += vector.y;
    }

    // Get the length of the vector
    Vector.prototype.getLength = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Get the angle account for the quadrant we're in
    Vector.prototype.getAngle = function() {
      return Math.atan2(this.y, this.x);
    }

    // Allows us to get a new vector from angle and length
    Vector.fromAngle = function(angle, length) {
      return new Vector(length * Math.cos(angle), length * Math.sin(angle));
    }

    return Vector;
  }();

  return Vector;
});
