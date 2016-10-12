define(['game/gameinit','game/v3d'], function(GAMEINIT,V3D){
	'use strict'

	return function(){
		var gameinit = new GAMEINIT;
		var container = document.getElementById('container');    
		var timestep = 1/60;
		var keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, ECS: 27, SPC: 32 };
		var pause = 0;
		var render;
		var v3d;


		return {
			init: function(){
				

				v3d = gameinit.getObj('v3d');
				this.loadEvents();
				gameinit.createWorld(timestep);
				gameinit.populate(1000);
			    v3d.initLight();
			    render = this.render;
		        this.render();
				setInterval(gameinit.oimoLoop, timestep*1000);


			},
			 render: function () {

		        requestAnimationFrame( render );
		        	if(!pause){ 
		            v3d.render();
		        }

		    },
			handleKeyDown: function( event ) {

			    event.preventDefault();
			    event.stopPropagation();

			
			    var bodys = gameinit.getObj('bodys');
			    var containerMesh = gameinit.getObj('containerMesh');
			    var world = gameinit.getObj('world');

			    switch ( event.keyCode ) {

			        case keys.UP:

			        	v3d.log('cam but push: ' , v3d.camera.position);

			            var heading = v3d.getPlayerDir('forward', containerMesh.position);
			            heading.x *= 50;
			            heading.y *= 50;
			            heading.z *= 50;
			            var rb = bodys[0].body;
			            rb.linearVelocity.addTime(heading , world.timeStep);
			            console.log('heading x: '+ rb.linearVelocity.x + ' heading y: '+ rb.linearVelocity.y + 'heading z: '+ rb.linearVelocity.z); 
			            break;

			        case keys.BOTTOM:
			            var heading = v3d.getPlayerDir('reverse',containerMesh.position);
			            heading.x *= 50;
			            heading.y *= 50;
			            heading.z *= 50;
			            var rb = bodys[0].body;
			            rb.linearVelocity.addTime(heading , world.timeStep); 
			          //  console.log('heading x: '+ rb.linearVelocity.x + ' heading y: '+ rb.linearVelocity.y + 'heading z: '+ rb.linearVelocity.z); 
			            break;

			        case keys.LEFT:

			            break;

			        case keys.RIGHT:
			            v3d.applyRot();
			            break;

			        case keys.SPC:
			            var heading = v3d.getPlayerDir('forward', containerMesh, sightMesh);
			            heading.x *= 500;
			            heading.y *= 500;
			            heading.z *= 500;
			            var shootStart = containerMesh.position;
			            var sphere = [{ "size":[1.5, 1.5, 1.5], "pos":[shootStart.x, shootStart.y, shootStart.z -1], "move":"true", "name":"shoot", "color":'#66ff33'}];
			            var ss = addSphere(sphere);
			            ss.body.linearVelocity.addTime(heading, world.timeStep);
			            break;

			        case keys.ECS:
			            pause = (pause === 1) ? 0: 1;
			            break;
			    }
			},
			handleMouseMove: function(event){


				var canvas = v3d.container.children[0];
				var rect = canvas.getBoundingClientRect();
				var x = event.clientX - rect.left;
				var y = event.clientY - rect.top;
				
				V3D.msePos.x = ( x / v3d.w ) * 2 - 1;
				V3D.msePos.y = - ( y / v3d.h ) * 2 + 1; 				


				// V3D.msePos.x = ( event.clientX / v3d.w ) * 2 - 1;
				// V3D.msePos.y = - ( event.clientY / v3d.h ) * 2 + 1; 

				var issleeping = gameinit.isSleeping('shp1');

				var perw = (v3d.w / 100) * 10;
				var perh = (v3d.h / 100) * 10;
				var perwr = v3d.w - perw;
				var perwl = perw;
				var perhu = v3d.h - perh;
				var perhd = perh

				if ( x > perwr ){
					v3d.startRot.axis.set(0,1,0);
					v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle, axis: v3d.startRot.axis};
				}
				else if ( x < perwl ) {
					v3d.startRot.axis.set(0,1,0);
					v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle * -1, axis: v3d.startRot.axis};
				}
				else if ( y > perhu ) {
					v3d.startRot.axis.set(1,0,0);
					v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle, axis: v3d.startRot.axis}; 
				}
				else if ( y < perhd ) {
					v3d.startRot.axis.set(1,0,0);
					v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle * -1, axis: v3d.startRot.axis}; 
				}
				else {
					v3d.startRot = {issleeping: issleeping, rot: 0, camAngle: v3d.camAngle, axis: v3d.startRot.axis};
				}

			},
			loadEvents: function(){

				window.addEventListener( 'keydown', this.handleKeyDown, false );
				window.scrollTo(0, document.body.clientHeight);
				container.addEventListener('mousemove', this.handleMouseMove, false);

			}
		}
	}

});