define(['gameinit','v3d'], function(GAMEINIT,V3D){
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


				// $.ajax({
				//   type: "POST",
				//   url: 'http://localhost:8887/fs_canvas/index.php',
				//   data: { name: "John", time: "2pm" } ,
				//   dataType: 'json'
				// });



				v3d = gameinit.getObj('v3d');
				this.loadEvents();
				gameinit.createWorld(timestep);
				gameinit.populate(1);
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
			            console.log('heading x: '+ rb.linearVelocity.x + ' heading y: '+ rb.linearVelocity.y + 'heading z: '+ rb.linearVelocity.z); 
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

				V3D.msePos.x = ( event.clientX / 1351 ) * 2 - 1;
				V3D.msePos.y = - ( event.clientY / 978 ) * 2 + 1; 

				if(event.clientX > 1216){
					v3d.startRot = 1;
				}
				else {
					v3d.startRot = 0;
			
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