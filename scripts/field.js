// Field module
// creates a gravitational push OR pull that particles respond to
// TO DO: control mass with audio data

"use strict";

define(["audio", "utils"], function(audio, utils) {
  var Field = function() {
    function Field(ctx, point, mass) {
      this.position = point;
      this.ctx = ctx;
      this.setMass(mass);
      this.baseMass = mass;
      this.size = 5;
    }

    Field.prototype.setMass = function(mass) {
      this.mass = mass || 100;

      // if it attracts, draw green, if it repels draw red
      this.drawColor = mass < 0 ? "red" : "green";
    }

    Field.prototype.resetMass = function (effector) {
      this.mass = this.baseMass * (effector/2);
    }

    Field.prototype.effectMass = function(effector) {
      // effect the field by a factor of change
      this.setMass(this.baseMass * effector);
    }

    Field.prototype.draw = function () {
      // draw a circle at the center of the field
      utils.drawCircle(this.ctx, this);
    }

    return Field;
  }();

  return Field;
});
