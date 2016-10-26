define(['gameinit','v3d'], function(GAMEINIT,V3D){
	'use strict'

	return function(){
		var gameinit = new GAMEINIT;
		var container = document.getElementById('container'); 
		var accel;
		var timestep = 1/60;
		var keys = { LEFT: 37, UP: 32, RIGHT: 39, DOWN: 40, ECS: 27, SPC: 49 };
		var render;
		var v3d;



		return {
			init: function(){
				

				accel = document.getElementById('accel');
				var ac = document.getElementById('accelCont');
				var ach = ac.clientHeight/2;
				var acw = ac.clientWidth * 0.01;
				accel.style.top = ach+'px';
				accel.style.right = acw + 'px';
				v3d = gameinit.getObj('v3d');
				this.loadEvents();
				gameinit.createWorld(timestep);
				gameinit.populate(1000);
			    v3d.initLight();
			    render = this.render;
				setInterval(gameinit.oimoLoop, timestep*1000);


			},

			handleKeyDown: function( event ) {


				var keys = gameinit.getObj('keys');
				keys[event.which] = true;

			},
			handleKeyUp: function(event){

					var keys = gameinit.getObj('keys');
					delete keys[event.which];

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