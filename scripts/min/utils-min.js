define(function(){var t=function(){function t(t,n,e){return Math.max(n,Math.min(e,t))}function n(t,n){return Math.random()*(n-t)+t}function e(t,n){return Math.floor(Math.random()*(n-t+1))+t}function a(t){var n={};return n.x=t.pageX-t.target.offsetLeft,n.y=t.pageY-t.target.offsetTop,n}return{clamp:t,getRandom:n,getRandomInt:e,getMouse:a}}()});