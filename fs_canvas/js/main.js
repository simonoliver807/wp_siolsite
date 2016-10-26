define(['gameinit','v3d'], function(GAMEINIT,V3D){
	'use strict'

	return function(){
		var gameinit = new GAMEINIT;
		var container = document.getElementById('container'); 
		var accel;
		var timestep = 1/60;
		var keys = { LEFT: 37, UP: 48, RIGHT: 39, DOWN: 40, ECS: 27, SPC: 49 };
		var render;
		var v3d;
		var velocity;
		var shootStart;
		var keys2;



		return {
			init: function(){
				

				accel = document.getElementById('accel');
				var ac = document.getElementById('accelCont');
				var ach = ac.clientHeight/2;
				var acw = ac.clientWidth * 0.01;
				accel.style.top = ach+'px';
				accel.style.right = acw + 'px';
				keys2 = [];
				v3d = gameinit.getObj('v3d');
				this.loadEvents();
				gameinit.createWorld(timestep);
				gameinit.populate(1000);
			    v3d.initLight();
			    render = this.render;
				setInterval(gameinit.oimoLoop, timestep*1000);
				velocity = 1;
				shootStart = v3d.tvec();


			},
			 // render: function () {

		        // requestAnimationFrame( render );
		        // 	if(!pause){ 
		        //     v3d.render();
		        // }

		    // },
			handleKeyDown: function( event ) {


				var bodys = gameinit.getObj('bodys');
				var containerMesh = gameinit.getObj('containerMesh');
				var world = gameinit.getObj('world');

				function addForce() {
					var rb = bodys[0].body;

					if( rb.linearVelocity.length() < 50){
					var heading = v3d.getPlayerDir('forward', containerMesh.position);

					if (v3d.startRot.rot !== 0) { 
					heading.multiplyScalar( 35 ); 

					}
					else { 
					if (rb.linearVelocity.length() < 21) { 
					heading.multiplyScalar( 49 ); 
					}
					else {
					heading.multiplyScalar( 25 ); 
					}
					}
					rb.linearVelocity.addTime(heading , world.timeStep);

					v3d.log('linearVelocity: ', rb.linearVelocity.length());

					var perlv = ((rb.linearVelocity.length()/50)*100) - 5;

					accel.style.width = perlv + '%';


					if( rb.linearVelocity.length < 1 && gameinit.reverse){
					gameinit.reverse = false;
					}

					velocity = 1 + rb.linearVelocity.length() / 10;
					}
				}
				function minusForce() {
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

					v3d.log('linearVelocity: ', rb.linearVelocity.length());

					if(velocity < 3){
						velocity = 1 + rb.linearVelocity.length() / 10;
					}
				}
				function phaser() {
	    			var heading = v3d.getPlayerDir('forward', containerMesh.position);
		            var mag = 1000 * velocity;
		            heading.x *= mag;
		            heading.y *= mag;
		            heading.z *= mag;
		            shootStart.subVectors( containerMesh.position, v3d.camera.position );
		            shootStart.normalize();
		            shootStart.add(containerMesh.position);
		            
		            var phaser = { type: 'sphere', size: [1.5,1.5,1.5], pos: [shootStart.x, shootStart.y, shootStart.z], move: 'true', world: world, color:'#66ff33', wireframe: 'false', name:'phaser', transparent: 'false', opacity: 1};
		            var sphere = v3d.addSphere(phaser);
		            var rb = gameinit.addPhaser(phaser, sphere);
		            rb.body.linearVelocity.addTime(heading, world.timeStep);
		            var shp1 = bodys[0].body;
		            rb.body.linearVelocity.addEqual(shp1.linearVelocity);
		            console.log('velocity: ' + velocity);
				}
				function pause() {
					var val = gameinit.gspause() ? 0: 1;
			        gameinit.gspause(val);
				}


				console.log('key ' + event.keyCode);
				keys2[event.which] = true;
				if ( keys2[48] && keys2[49] ){
					addForce();
					phaser();
				}
				else {

					var hkd = false;
					for(var key in keys){
						if ( event.keyCode == keys[key]){
							hkd = true;
						}
					}

					if(hkd) {

					    event.preventDefault();
					    event.stopPropagation();


					    switch ( event.keyCode ) {

					        case keys.UP:

					          addForce();

					            break;

					        case keys.DOWN:

					        	minusForce();

					            break;

					        case keys.SPC:
					            
					            phaser();

					            break;
				    		case keys.ECS:
				            	
				    			pause();

				            break;

					    }
					 }
				}
			},
			handleKeyUp: function(event){

					delete keys2[event.which];

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
					if( event.clientY > v3d.h/2){
						v3d.startRot = {issleeping: issleeping, rot: 'dr'};
					}
					else {
						v3d.startRot = {issleeping: issleeping, rot: 'ur'};
					}
				}
				else if ( event.clientX < perwl ) {
					if( event.clientY > v3d.h/2){
						v3d.startRot = {issleeping: issleeping, rot: 'dl'};
					}
					else {
						v3d.startRot = {issleeping: issleeping, rot: 'ul'};
					}
				}
				else if ( event.clientY > perhu ) {
					if( event.clientX > v3d.w/2){
						v3d.startRot = {issleeping: issleeping, rot: 'dr'}; 
					}
					else {
						v3d.startRot = {issleeping: issleeping, rot: 'dl'};
					}
				}
				else if ( event.clientY < perhd ) {
					if( event.clientX > v3d.w/2){
						v3d.startRot = {issleeping: issleeping, rot: 'ur'}; 
					}
					else {
						v3d.startRot = {issleeping: issleeping, rot: 'ul'};
					}
				}
				else {
					v3d.startRot = {issleeping: issleeping, rot: 0};
				}

			},
			loadEvents: function(){

				window.addEventListener( 'keydown', this.handleKeyDown, false );
				window.addEventListener( 'keyup', this.handleKeyUp, false );
				window.scrollTo(0, document.body.clientHeight);
				container.addEventListener('mousemove', this.handleMouseMove, false);

			}
		}
	}

});