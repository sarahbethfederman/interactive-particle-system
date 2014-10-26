"use strict";

define(function() {
  var utils = {
    	/*
    	Function Name: clamp(val, min, max)
    	Return Value: returns a value that is constrained between min and max (inclusive)
    	*/
    	'clamp': function (val, min, max){
    		return Math.max(min, Math.min(max, val));
    	},

    	/*
    		Function Name: getRandom(min, max)
    		Return Value: a floating point random number between min and max
    	*/
    	'getRandom': function (min, max) {
    	  return Math.random() * (max - min) + min;
    	},

    	/*
    		Function Name: getRandomInt(min, max)
    		Return Value: a random integer between min and max
    	*/
    	'getRandomInt': function (min, max) {
    	  return Math.floor(Math.random() * (max - min + 1)) + min;
    	},

    	// Function Name: getMouse(e)
    	// returns mouse position in local coordinate system of element
    	'getMouse': function () {
    		var mouse = {};
        mouse.x = event.clientX + document.body.scrollLeft;
        mouse.y = event.clientY + document.body.scrollTop;
    		return mouse;
    	},

      // Function name: drawCircle
      // takes an object that has a drawColor and position
      'drawCircle': function (ctx, object) {
        ctx.fillStyle = object.drawColor;
        ctx.beginPath();
        ctx.arc(object.position.x, object.position.y, object.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    };

  	// the "public interface" of this module
  	return utils;
});
