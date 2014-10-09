// require JS
/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};


window.onload = function(){
  // this is where we hook our modules up so that
  // we dont have any hard-coded dependencies
  console.log("window.onload called");
  app.ship.drawLib = app.drawLib;
  app.blastem.drawLib = app.drawLib;
  app.blastem.utils = app.utils;
  app.Enemy.prototype.utils = app.utils;
  app.Emitter.utils = app.utils;
  app.blastem.app = app;
};
