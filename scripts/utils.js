define(function() {
  var utils = function() {

  	/*
  	Function Name: clamp(val, min, max)
  	Return Value: returns a value that is constrained between min and max (inclusive)
  	*/
  	function clamp(val, min, max){
  		return Math.max(min, Math.min(max, val));
  	}


  	/*
  		Function Name: getRandom(min, max)
  		Return Value: a floating point random number between min and max
  	*/
  	function getRandom(min, max) {
  	  return Math.random() * (max - min) + min;
  	}


  	/*
  		Function Name: getRandomInt(min, max)
  		Return Value: a random integer between min and max
  	*/
  	function getRandomInt(min, max) {
  	  return Math.floor(Math.random() * (max - min + 1)) + min;
  	}

  	// Function Name: getMouse(e)
  	// returns mouse position in local coordinate system of element
  	function getMouse(e){
  		var mouse = {}
  		mouse.x = e.pageX - e.target.offsetLeft;
  		mouse.y = e.pageY - e.target.offsetTop;
  		return mouse;
  	}

  	// the "public interface" of this module
  	return {
  		clamp : clamp,
  		getRandom : getRandom,
  		getRandomInt : getRandomInt,
  		getMouse : getMouse
  	};
  }();
});
