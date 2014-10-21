// Field module
// creates a gravitational push OR pull that particle's respond to

define(["utils"], function(utils) {
  var Field = function() {
    function Field(ctx, point, mass) {
      this.position = point;
      this.ctx = ctx;
      this.setMass(mass);
      this.size = 5;
    }

    Field.prototype.setMass = function(mass) {
      this.mass = mass || 100;
      
      // if it attracts, draw green, if it repels draw red
      this.drawColor = mass < 0 ? "red" : "green";
    }

    Field.prototype.draw = function () {
      utils.drawCircle(this.ctx, this);
    }

    return Field;
  }();

  return Field;
});
