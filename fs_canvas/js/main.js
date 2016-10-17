define(['gameinit','v3d'], function(GAMEINIT,V3D){
	'use strict'

	return function(){
		var gameinit = new GAMEINIT;
		var container = document.getElementById('container');    
		var timestep = 1/60;
		var keys = { LEFT: 37, UP: 48, RIGHT: 39, DOWN: 40, ECS: 27, SPC: 32 };
		var render;
		var v3d;
		var velocity;
		var shootStart;


		return {
			init: function(){
				

				v3d = gameinit.getObj('v3d');
				this.loadEvents();
				gameinit.createWorld(timestep);
				gameinit.populate(15);
			    v3d.initLight();
			    render = this.render;
		        this.render();
				setInterval(gameinit.oimoLoop, timestep*1000);
				velocity = 1;
				shootStart = v3d.tvec();


			},
			 render: function () {

		        // requestAnimationFrame( render );
		        // 	if(!pause){ 
		        //     v3d.render();
		        // }

		    },
			handleKeyDown: function( event ) {

				var hkd = false;
				for(var key in keys){
					if ( event.keyCode == keys[key]){
						hkd = true;
					}
				}

				if(hkd) {

				    event.preventDefault();
				    event.stopPropagation();

				
				    var bodys = gameinit.getObj('bodys');
				    var containerMesh = gameinit.getObj('containerMesh');
				    var world = gameinit.getObj('world');

				    switch ( event.keyCode ) {

				        case keys.UP:

				            var heading = v3d.getPlayerDir('forward', containerMesh.position);
				            heading.multiplyScalar( 25 );
				            var rb = bodys[0].body;
				            rb.linearVelocity.addTime(heading , world.timeStep);

				            if( rb.linearVelocity.length < 1 && gameinit.reverse){
				            	gameinit.reverse = false;
				            }

				            velocity = 1 + rb.linearVelocity.length() / 10;

				            break;

				        case keys.DOWN:

				        	// get the linear velocity of player
				        	var rb = bodys[0].body;
				        	var lv = V3D.View.prototype.tvec();
				        	lv.copy( rb.linearVelocity );
				        	var lenghtlv = lv.length();
				        	if((lv.x == 0 && lv.y == 0 && lv.z == 0) || gameinit.reverse) {
				        		var heading = v3d.getPlayerDir('reverse',containerMesh.position);
					            heading.multiplyScalar( 20 );
					            var rb = bodys[0].body;
					            rb.linearVelocity.addTime(heading , world.timeStep);
					            gameinit.reverse = true; 
				        	}
				        	else {
				        		lv = lv.normalize();
				        		lv = lv.multiplyScalar( lenghtlv -0.5 );
				        		rb.linearVelocity.copy( lv );
				        		if(lenghtlv < 1) {
				        			gameinit.reverse = true;
				        		}
				        	}

				        	if(velocity < 3){
				        		velocity = 1 + rb.linearVelocity.length() / 10;
				        	}

				            break;

				        case keys.LEFT:

				            break;

				        case keys.RIGHT:
				           // v3d.applyRot();
				            break;

				        case keys.SPC:
				            var heading = v3d.getPlayerDir('forward', containerMesh.position);
				            var mag = 1000 * velocity;
				            heading.x *= mag;
				            heading.y *= mag;
				            heading.z *= mag;
				            shootStart.copy(containerMesh.position);
				            shootStart = shootStart.sub( v3d.camera.position );
				            shootStart = shootStart.normalize();
				            shootStart.add(containerMesh.position);
				            //shootStart.multiplyScalar(8);
				            var sphere = [{ "size":[1.5, 1.5, 1.5], "pos":[shootStart.x, shootStart.y, shootStart.z], "move":"true", "name":"shoot", "color":'#66ff33'}];
				            var ss = gameinit.addSphere(sphere);
				            var rb = ss.body;
				            rb.linearVelocity.addTime(heading, world.timeStep);
				            console.log('velocity: ' + velocity);
				            break;

				        case keys.ECS:
				            var val = gameinit.gspause() ? 0: 1;
				            gameinit.gspause(val);
				            break;
				    	}

				    }
			},
			handleMouseMove: function(event){


				var canvas = v3d.container.children[0];
				var rect = canvas.getBoundingClientRect();
				var x = event.clientX - rect.left;
				var y = event.clientY - rect.top;
				
				// V3D.msePos.x = ( x / v3d.w ) * 2 - 1;
				// V3D.msePos.y = - ( y / v3d.h ) * 2 + 1; 	

				V3D.msePos.set( ( x / v3d.w ) * 2 - 1, - ( y / v3d.h ) * 2 + 1, 0.5 )

				

				var issleeping = gameinit.isSleeping('shp1');

				var perw = (v3d.w / 100) * 5;
				var perh = (v3d.h / 100) * 5;
				var perwr = v3d.w - perw;
				var perwl = perw;
				var perhu = v3d.h - perh;
				var perhd = perh

				if ( event.clientX > perwr ){
					// v3d.startRot.axis.set(0,1,0);
					// v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle, axis: v3d.startRot.axis};
					v3d.startRot.axis.set(0,1,0);
					v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle * -1, axis: v3d.startRot.axis};
				}
				else if ( event.clientX < perwl ) {
					// v3d.startRot.axis.set(0,1,0);
					// v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle * -1, axis: v3d.startRot.axis};
					v3d.startRot.axis.set(0,1,0);
					v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle, axis: v3d.startRot.axis};
				}
				else if ( event.clientY > perhu ) {
					v3d.startRot.axis.set(1,0,0);
					v3d.startRot = {issleeping: issleeping, rot: 1, camAngle: v3d.camAngle, axis: v3d.startRot.axis}; 
				}
				else if ( event.clientY < perhd ) {
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