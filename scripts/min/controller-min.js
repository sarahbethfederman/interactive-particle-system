define(["emitter","particle","vector"],function(t,i,e){return controller={canvas:void 0,ctx:void 0,emitters:[],particles:[],maxParticles:200,emissionRate:4,particleSize:1,drawQueue:[],updateQueue:[],addNewParticles:function(){if(!(this.particles.length>this.maxParticles))for(var t=0;t<this.emitters.length;t++)for(var i=0;i<this.emissionRate;i++)this.particles.push(this.emitters[t].emitParticle())},plotParticles:function(t,i){for(var e=[],s=0;s<this.particles.length;s++){var a=this.particles[s],r=a.position;r.x<0||r.x>t||r.y<0||r.y>i?console.log(r.x,t):(a.move(),console.log("yo"),e.push(a),this.particles=e,console.log(e.length,"0"))}},drawParticles:function(){this.ctx.fillStyle="rgb(0,40,255)";for(var t=0;t<this.particles.length;t++){var i=this.particles[t].position;this.ctx.fillRect(i.x,i.y,this.particleSize,this.particleSize)}},update:function(){this.addNewParticles(),this.plotParticles(this.canvas.width,this.canvas.height)},draw:function(){this.drawParticles()},animate:function(){window.requestAnimationFrame(this.animate.bind(this)),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.update(),this.draw()},init:function(){console.log("controller inited"),this.canvas=document.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.emitters.push(new t(new e(500,530),e.prototype.fromAngle(0,2))),this.animate()}}});