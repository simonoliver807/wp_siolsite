define(['gameinit','v3d'], function(GAMEINIT,V3D){
	'use strict'

	return function(){
		var gameinit = new GAMEINIT;
		var container = document.getElementById('container'); 

		var accel;
		var timestep = 1/60;
		var render;
		var v3d;
		var phaser;
		var self;



		return {
			init: function(){


				// var socket = io('http://localhost:9000');

				// //var socket = io('https://grisly-scarecrow-29073.herokuapp.com');

			 //  	 socket.on('gamestart', function (data) {
				//  	console.log(data);
				//     socket.emit('getgd', { id: data });
				//     socket.on('ggd', function(gamedata){
				//     	gameinit.prs.push(gamedata);
				//     });

				//  });
				
		//		try {


					window.oncontextmenu = function (){ return false; }
					window.addEventListener( 'resize', this.onWindowResize, false );

					accel = document.getElementById('accel');
					var ac = document.getElementById('accelCont');
					var tapaccel = document.getElementById('tapaccel');
					// var ach = ac.clientHeight/2;
					// var acw = ac.clientWidth * 0.01;
					// accel.style.top = ach+'px';
					// accel.style.right = acw + 'px';
					var mobcon = document.getElementById('mobcon')

					v3d = gameinit.getObj('v3d');
					gameinit.createWorld(timestep);
					gameinit.populate(600);
					phaser = false;



					var n = navigator.userAgent;
					this.isMobile = false;
				    if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i) || n.match(/Windows Phone/i)) {
				    	this.loadMobileEvents(n);
				    }   
				    else {
				    	this.loadEvents();
				    }

							
				    v3d.initLight();
				    v3d.initPoints();		

				    gameinit.oimoLoop();



				//}
				// catch (err) {
				// 	document.getElementById('loadingScreen').style.display = 'none';
				// 	var errscreen = document.getElementById('errScreen')
				// 	errscreen.style.display = 'block';
				// 	errscreen.innerHTML = '<div id="errdiv">Sorry there has been an error ' + err.message + ' </div>';
				// }
			},

			handleKeyDown: function( event ) {

				//event.preventDefault();
				if( event.keyCode === 27) {
					var val = gameinit.gspause() ? 0: 1;
				    gameinit.gspause(val);
				}
				if ( event.keyCode == 83) {
					var bodys = gameinit.getObj('bodys');
					bodys[0].body.linearVelocity.init();
				}
				if ( event.keyCode == 70) {
					document.body.webkitRequestFullScreen();
				}
				else {
					var keys = gameinit.getObj('keys');
					keys[event.which] = true;
				}

			},
			handleKeyUp: function(event){

					var keys = gameinit.getObj('keys');
					delete keys[event.which];

			},
			handleMouseMove: function(event){


				if( event.target.id == 'mobcon') {
		    		var x = ((event.pageX - mobcon.offsetLeft)/13)*100 ;
		    		var y = ((event.pageY - mobcon.offsetTop )/13)*100 ; 
					var clientX = x;
					var clientY = y;
				}
				else {
					var canvas = document.getElementById('gamecanvas');
					var rect = canvas.getBoundingClientRect();
					var x = event.clientX - rect.left;
					var y = event.clientY - rect.top;
					var clientX = event.clientX;
					var clientY = event.clientY;
				}
				


				V3D.msePos.set( ( x / v3d.w ) * 2 - 1, - ( y / v3d.h ) * 2 + 1, 0.5 )


				var perw = (v3d.w / 100) * 5;
				var perh = (v3d.h / 100) * 5;
				var perwr = v3d.w - perw;
				var perwl = perw;
				var perhu = v3d.h - perh;
				var perhd = perh

				if ( clientX > perwr ){
					if( clientY > v3d.h/2){
						v3d.startRot = {rot: 'dr'};
					}
					else {
						v3d.startRot = {rot: 'ur'};
					}
				}
				else if ( clientX < perwl ) {
					if( clientY > v3d.h/2){
						v3d.startRot = {rot: 'dl'};
					}
					else {
						v3d.startRot = {rot: 'ul'};
					}
				}
				else if ( clientY > perhu ) {
					if( clientX > v3d.w/2){
						v3d.startRot = {rot: 'dr'}; 
					}
					else {
						v3d.startRot = {rot: 'dl'};
					}
				}
				else if ( clientY < perhd ) {
					if( clientX > v3d.w/2){
						v3d.startRot = {rot: 'ur'}; 
					}
					else {
						v3d.startRot = {rot: 'ul'};
					}
				}
				else {
					v3d.startRot = {rot: 0};
				}

			},
			loadEvents: function(){

				window.addEventListener( 'keydown', this.handleKeyDown, false );
				window.addEventListener( 'keyup', this.handleKeyUp, false );
				window.scrollTo(0, document.body.clientHeight);
				container.addEventListener('mousemove', this.handleMouseMove, false);

			},
			loadMobileEvents: function(n) {
				self = this;
				mobcon.style.display = 'block';
				var keys = gameinit.getObj('keys');
		    	if( n.match(/iPhone/) ){
		    		if(!V3D.bincam){
		    			var pos = 0.1;
		    			v3d.camdist = 0.09;}    
		    		else {
		    			var pos = 5;
		    			v3d.camdist = 4.9;}
		    	}
		    	if( n.match(/iPad/) ){
		    		if(!V3D.bincam){
		    			var pos = 0.1;
		    			v3d.camdist = 0.09}    
		    		else {
		    			var pos = 7;
		    			v3d.camdist = 6.9;}
		    	}
		    	v3d.camera.position.z = pos;
		    	v3d.sight.position.z = pos * -1;
		        v3d.tmpVCPprev = new v3d.tvec(0,0,pos);
		        // for the rotation
		    	var addforce = document.getElementById('addforce');
		    	var minusforce = document.getElementById('minusforce');
		    	addforce.style.display = 'block';
		    	minusforce.style.display = 'block';


		    	container.addEventListener('touchstart', handleStart, false);
		    	container.addEventListener('touchend', handleEnd, false);
		    	container.addEventListener('touchmove', handleMove, false);

		    	var toucharr = [];
		    	function handleStart() {
		    		event.preventDefault();
		    		for(var i = 0; i< event.changedTouches.length; i++) {
		    			if(event.changedTouches[i].target.id == 'addforce' || event.changedTouches[i].target.id == 'addforcebut'){
		    				keys[38] = 1;
		    			}
		    			if(event.changedTouches[i].target.id == 'minusforce' || event.changedTouches[i].target.id == 'minusforcebut'){
		    				keys[40] = 1;
		    			}
		    		}

		    	}
		    	function handleEnd() {
		    		event.preventDefault();
		    		for(var i = 0; i< event.changedTouches.length; i++) {
		    			if(event.changedTouches[i].target.id == 'addforce' || event.changedTouches[i].target.id == 'addforcebut'){
		    				keys[38] = 0;
		    			}
		    			if(event.changedTouches[i].target.id == 'minusforce' || event.changedTouches[i].target.id == 'minusforcebut'){
		    				keys[40] = 0;
		    			}
		    			if(event.changedTouches[i].target.id == 'mobcon'){
		    				mobcon.style.opacity = '1';
		    			}
		    		}
		    	}
		    	function handleMove() {
		    		event.preventDefault();
		    		for(var i = 0; i< event.changedTouches.length; i++) {
		    			if(event.changedTouches[i].target.id == 'mobcon'){
		    				self.handleMouseMove(event.changedTouches[i]);
		    				mobcon.style.opacity = '0.1';
		    			}
		    		}

		    	}


		    	var mc = new Hammer(container);


		  //   	mc.on('pan', function(event) {
		  //   		self.handleMouseMove(event);
		  //   		event.preventDefault();
		  //   	});



		  //   	mc.on('press', function(event) {
		  //   		if ( event.target.id == 'addforce') {
				// 		keys[38] = true;
		  //   		}
		  //   		if ( event.target.id == 'minusforce') {
				// 		keys[40] = true;
		  //   		}
		  //   	});
		  //   	mc.on('pressup', function(event) {
		  //   		if ( event.target.id == 'addforce') {
				// 		delete keys[38];
		  //   		}
		  //   		if ( event.target.id == 'minusforce') {
				// 		delete keys[40];
		  //   		}
		  //   	});
				
		  //   	mc.add(new Hammer.Press()).recognizeWith(mc.get('pan'));
		  //   	mc.on('press pan', function(event) {
		  //   		accel.innerHTML += 'a';
		  //   	});

				mc.add( new Hammer.Tap({ event: 'doubleletap', taps: 2 }) );
				mc.get('doubleletap').recognizeWith('tap');
				mc.add( new Hammer.Tap({ event: 'tripletap', taps: 3 }) );
				mc.get('tripletap').recognizeWith('tap');
				mc.on('tap doubleletap', function(ev) {
				    if(ev.type == 'doubleletap'){
				    	if(!phaser){ keys[32] = true; phaser = true; }
				    	else { delete keys[32]; phaser = false; }

				     }
				     if(ev.type == 'tap'){
				     	if(ev.target.id == 'accelCont'){
				     		 var elem = document.body;
				     		 var req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
        					req.call(elem);
				     	}
				     }
				});
				mc.on('tap tripletap', function(ev) {
				    if(ev.type == 'tripletap'){
				    	// var val = gameinit.gspause() ? 0: 1;
				    	// gameinit.gspause(val);
				    	if(!phaser){ keys[32] = true; phaser = true; }
				    	else { delete keys[32]; phaser = false; }
				     }
				});
		    	this.loadHammerTime();
			},
			loadHammerTime: function() {

				    var a = window.MutationObserver || window.WebKitMutationObserver,
				        b = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
				        c = void 0 !== document.documentElement.style["touch-action"] || document.documentElement.style["-ms-touch-action"];
				    if (!c && b && a) {
				        window.Hammer = window.Hammer || {};
				        var d = /touch-action[:][\s]*(none)[^;'"]*/,
				            e = /touch-action[:][\s]*(manipulation)[^;'"]*/,
				            f = /touch-action/,
				            g = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1,
				            h = function() {
				                try {
				                    var a = document.createElement("canvas");
				                    return !(!window.WebGLRenderingContext || !a.getContext("webgl") && !a.getContext("experimental-webgl"))
				                } catch (b) {
				                    return !1
				                }
				            }(),
				            i = h && g;
				        window.Hammer.time = {
				            getTouchAction: function(a) {
				                return this.checkStyleString(a.getAttribute("style"))
				            },
				            checkStyleString: function(a) {
				                return f.test(a) ? d.test(a) ? "none" : e.test(a) ? "manipulation" : !0 : void 0
				            },
				            shouldHammer: function(a) {
				                var b = this.hasParent(a.target);
				                return b && (!i || Date.now() - a.target.lastStart < 125) ? b : !1
				            },
				            touchHandler: function(a) {
				                var b = a.target.getBoundingClientRect(),
				                    c = b.top !== this.pos.top || b.left !== this.pos.left,
				                    d = this.shouldHammer(a);
				                ("none" === d || c === !1 && "manipulation" === d) && ("touchend" === a.type && (a.target.focus(), setTimeout(function() {
				                    a.target.click()
				                }, 0)), a.preventDefault()), this.scrolled = !1, delete a.target.lastStart
				            },
				            touchStart: function(a) {
				                this.pos = a.target.getBoundingClientRect(), i && this.hasParent(a.target) && (a.target.lastStart = Date.now())
				            },
				            styleWatcher: function(a) {
				                a.forEach(this.styleUpdater, this)
				            },
				            styleUpdater: function(a) {
				                if (a.target.updateNext) return void(a.target.updateNext = !1);
				                var b = this.getTouchAction(a.target);
				                return b ? void("none" !== b && (a.target.hadTouchNone = !1)) : void(!b && (a.oldValue && this.checkStyleString(a.oldValue) || a.target.hadTouchNone) && (a.target.hadTouchNone = !0, a.target.updateNext = !1, a.target.setAttribute("style", a.target.getAttribute("style") + " touch-action: none;")))
				            },
				            hasParent: function(a) {
				                for (var b, c = a; c && c.parentNode; c = c.parentNode)
				                    if (b = this.getTouchAction(c)) return b;
				                return !1
				            },
				            installStartEvents: function() {
				                document.addEventListener("touchstart", this.touchStart.bind(this)), document.addEventListener("mousedown", this.touchStart.bind(this))
				            },
				            installEndEvents: function() {
				                document.addEventListener("touchend", this.touchHandler.bind(this), !0), document.addEventListener("mouseup", this.touchHandler.bind(this), !0)
				            },
				            installObserver: function() {
				                this.observer = new a(this.styleWatcher.bind(this)).observe(document, {
				                    subtree: !0,
				                    attributes: !0,
				                    attributeOldValue: !0,
				                    attributeFilter: ["style"]
				                })
				            },
				            install: function() {
				                this.installEndEvents(), this.installStartEvents(), this.installObserver()
				            }
				        }, window.Hammer.time.install()
				    }
				},
				onWindowResize: function(){
			    	v3d.camera.aspect = window.innerWidth / window.innerHeight;
			    	v3d.camera.updateProjectionMatrix();
			    	v3d.renderer.setSize( window.innerWidth, window.innerHeight );
				}


		}
	}

});