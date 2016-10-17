define(['three'], function(THREE) {
'use strict';
var THREE;
var V3D = {};
V3D.ToRad = Math.PI/180;
V3D.ToDeg = 180 / Math.PI;
V3D.msePos = new THREE.Vector3(0,0,0);


V3D.View = function(h,v,d){

	var n = navigator.userAgent;
	this.isMobile = false;
    if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i) || n.match(/Windows Phone/i)) this.isMobile = true;      

    
    var container = document.getElementById('container');


    container.style.width = "100%";
    container.style.height = "500px";
	this.w = container.clientWidth;
	this.h = container.clientHeight;
	this.id = 'container';
    this.initialcamz = 100;

	this.init(h,v,d);
	this.initBasic();
    this.sight;

    // this.arrCamX = [];
    // this.arrCamY = [];
    // this.pbX = [];
    // this.pbY = [];
    // this.axis = new THREE.Vector3();
    this.startRot = { issleeping: 1, rot: 0, camAngle: 0.5, axis: new THREE.Vector3() };

}

V3D.View.prototype = {
    constructor: V3D.View,
    init:function(h,v,d){
    	this.clock = new THREE.Clock();
    	this.renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false});
    	this.renderer.setSize( this.w, this.h );
    	this.renderer.setClearColor( 0x1d1f20, 1 );


    	// siolsite this.camera = new THREE.PerspectiveCamera( 60, this.w/this.h, 0.1, 2000 );
        this.camera = new THREE.PerspectiveCamera( 60, this.w/this.h, 0.1, 10000 );
        // this.camhelp = new THREE.CameraHelper( this.camera );
        this.camera.useQuarternion = true;

        this.camera.position.z = this.initialcamz;
        this.camera.position.y = 0;
        this.camera.matrixAutoUpdate = true;
        
        
    	this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x000000 );
        // this.scene.add( this.camhelp )
        
        
        
    	// siolsite abandoned changed the scene color this.initBackground();
        this.container = document.getElementById(this.id)
        this.container.appendChild( this.renderer.domElement );

        this.miniMap = null;
        this.player = null;

       // this.raycaster = new THREE.Raycaster(this.camera.position, [0,1,0], 1, 100);
        this.raycaster = new THREE.Raycaster();

        this.camAngle = 0.01;
        
        this.tmpVCPprev1 = new THREE.Vector3(0,0,100);

        this.tmpVCPprev = new THREE.Vector3(0,0,100);
        this.tmppbprev = new THREE.Vector3(0,0,-100);
      //  this.axis = new THREE.Vector3(0,1,0);

        this.containerMesh;
        this.proBox;
        this.camrot = new THREE.Vector3();
        this.pbrot = new THREE.Vector3();
        this.newsightpos = new THREE.Vector3();
        this.dir = new THREE.Vector3();

        //this.projector = new THREE.Projector();
    	//this.raycaster = new THREE.Raycaster();
    },
    initBackground:function(){
    	var buffgeoBack = new THREE.BufferGeometry();
        buffgeoBack.fromGeometry( new THREE.IcosahedronGeometry(1000,1) );
        var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:this.gradTexture([[0.75,0.6,0.4,0.25], ['#1B1D1E','#3D4143','#72797D', '#b0babf']]), side:THREE.BackSide, depthWrite: false, fog:false }  ));
        back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*V3D.ToRad));
        this.scene.add( back );
        this.renderer.autoClear = false;
    },
    initLight:function(){
    	if(this.isMobile) return;
    	//this.scene.fog = new THREE.Fog( 0x1d1f20, 100, 600 );
    	//this.scene.add( new THREE.AmbientLight( 0x3D4143 ) );
    	var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x303030, 0.3 );
		this.scene.add( hemiLight );
		var dirLight = new THREE.DirectionalLight( 0xffffff, 1.2 );
		dirLight.position.set( 0.5, 1, 0.5 ).normalize();
		this.scene.add( dirLight );
    },
    initLightShadow:function(){
    	if(this.isMobile) return;
    	this.scene.add( new THREE.AmbientLight( 0x606060 ) );
	    var light = new THREE.DirectionalLight( 0xffffff , 1);
	    light.position.set( 300, 1000, 500 );
	    light.target.position.set( 0, 0, 0 );
	    light.castShadow = true;
	    light.shadowCameraNear = 500;
	    light.shadowCameraFar = 1600;
	    light.shadowCameraFov = 70;
	    light.shadowBias = 0.0001;
	    light.shadowDarkness = 0.7;
	    //light.shadowCameraVisible = true;
	    light.shadowMapWidth = light.shadowMapHeight = 1024;
	    this.scene.add( light );
    },
    initBasic:function(){
    	var geos = {};
		geos['sph'] = new THREE.BufferGeometry();
		geos['box'] = new THREE.BufferGeometry();
		geos['cyl'] = new THREE.BufferGeometry();
	    geos['sph'].fromGeometry( new THREE.SphereGeometry(1,12,10)); 
	    geos['cyl'].fromGeometry( new THREE.CylinderGeometry(0.5,0.5,1,12,1));  
	    geos['box'].fromGeometry( new THREE.BoxGeometry(1,1,1));
	    geos['plane'] = new THREE.PlaneBufferGeometry(1,1, 100, 100);
	    geos['plane'].applyMatrix(new THREE.Matrix4().makeRotationX(-90*V3D.ToRad));




	    var mats = {};
	   // mats['sph'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(0), name:'sph', wireframe:'true'} );
        // mats['sph'] = new THREE.MeshLambertMaterial( { color: 0x66ff33, wireframe: true, name:'sph'} );

	    mats['ssph'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(1), name:'ssph' } );


	    //mats['box'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(2), name:'box' } );
        mats['box'] = new THREE.MeshLambertMaterial( { color: 0x66ff33, wireframe: false, name:'box'} );
        mats['transbox'] = new THREE.MeshLambertMaterial( { color: 0x0000ff, wireframe: true, name:'transbox', transparent:true, opacity: 0.0} );


	    mats['sbox'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(3), name:'sbox' } );
	    mats['cyl'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(5), name:'cyl' } );
	    mats['scyl'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(6), name:'scyl' } );
	    mats['static'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(4), name:'static' } );
	   

       // mats['static2'] = new THREE.MeshLambertMaterial( { map: this.basicTexture(4, 6), name:'static2' } );
        mats['static2'] = new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: true, name:'static2' } );

	    mats['joint']  = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

	    this.mats = mats;
	    this.geos = geos;
    },
    render : function(){



            // var m = new THREE.Matrix4();
            // var q = new THREE.Quaternion();
            // q.setFromAxisAngle( new THREE.Vector3(1,0,0), this.camAngle);

            // var cmq = this.camera.quaternion;
            // cmq.multiplyQuaternions(q, cmq);
            // cmq.normalize;
            // this.camera.matrix.makeRotationFromQuaternion(cmq);
         //   this.containerMesh.matrixAutoUpdate = false;
//            var d = m.makeRotationFromQuaternion( q );


        if(this.startRot.rot){ this.applyRot() };
       
       // update the picking ray with the camera and mouse position    
        // this.raycaster.setFromCamera( V3D.msePos, this.camera );  

        // var objArr = [];
        // objArr[0] = this.scene.children[0];
        // objArr[1] = this.scene.children[1];

        // calculate objects intersecting the picking ray
        // var intersects = this.raycaster.intersectObjects( objArr );

        // for ( let i = 0; i < intersects.length; i++ ) {

        //     if(intersects[ i ].object.name == 'proBox') {
                
        //         this.sight.position.copy(intersects[i].point);
        //      //   this.gs_mse_pos('set', intersects[i].point);
        //     }
        
        // }

        // this.raycaster.setFromCamera( V3D.msePos, this.camera );  
        // this.newsightpos.addVectors ( this.raycaster.ray.origin, this.raycaster.ray.direction.multiplyScalar( 200 ));
        // this.sight.position.copy(this.newsightpos);

        // this.origin.setFromMatrixPosition( this.camera.matrixWorld );
        // this.dir.set( V3D.msePos.x, V3D.msePos.y, 0.5 ).unproject( this.camera ).sub( this.origin ).normalize();
        // this.newsightpos.addVectors ( this.origin, this.dir.multiplyScalar( 200 ));
        // this.sight.position.copy(this.newsightpos);




    	this.renderer.render( this.scene, this.camera );

        // this.dir.set( V3D.msePos.x, V3D.msePos.y, 0.5 ).unproject( this.camera ).sub( this.camera.position ).normalize();
        // this.newsightpos.addVectors ( this.camera.position, this.dir.multiplyScalar( 200 ));
        // this.sight.position.copy(this.newsightpos);
        // this.sight.lookAt(this.containerMesh.position);

    },
    setMesh : function(color) {
        var mats = {};
        return mats['sph'] = new THREE.MeshLambertMaterial( { color: color, wireframe: true, name:'sph'} );

    },
    add : function(obj, target, color, image){
    	var type = obj.type || 'box';
    	var size = obj.size || [10,10,10];
    	var pos = obj.pos || [0,0,0];
    	var rot = obj.rot || [0,0,0];
    	var move = obj.move || false;
        var name = obj.name || '';
    	if(obj.flat){ type = 'plane'; pos[1]+=size[1]*0.5; }
    	
    	if(type.substring(0,5) === 'joint'){//_____________ Joint
    		var joint;
    		var pos1 = obj.pos1 || [0,0,0];
    		var pos2 = obj.pos2 || [0,0,0];
			var geo = new THREE.Geometry();
			geo.vertices.push( new THREE.Vector3( pos1[0], pos1[1], pos1[2] ) );
			geo.vertices.push( new THREE.Vector3( pos2[0], pos2[1], pos2[2] ) );
			joint = new THREE.Line( geo, this.mats.joint, THREE.LinePieces );
			if(target) target.add( mesh );
			else this.scene.add( joint );
			return joint;
    	} else {//_____________ Object
    		var mesh;
            if(color){ 
                this.mats['sph'] = this.setMesh(color);
            }
             //siolsite put back to load images 
             if(image){
                var setImage = 'http://localhost:8887/fs_canvas/images/'+image;
                var texture = new THREE.TextureLoader().load(setImage);
                if(type == 'sphere'){
                    this.mats['sph'] = new THREE.MeshBasicMaterial({map:texture});
                }
                else {
                    this.mats['boxImage'] = new THREE.MeshBasicMaterial({map:texture, wireframe: true, name:'boxImage', transparent:true, opacity: 0.0});
                }
            }
    		if(type=='box' && move) mesh = new THREE.Mesh( this.geos.box, this.mats.box, name );
	    	if(type=='box' && !move) mesh = new THREE.Mesh( this.geos.box, this.mats.static, name);
            if(type=='boxImage' && move) mesh = new THREE.Mesh( this.geos.box, this.mats.boxImage, name );
            if(type=='transbox' && move) mesh = new THREE.Mesh( this.geos.box, this.mats.transbox, name);
	    	if(type=='plane' && !move) mesh = new THREE.Mesh( this.geos.plane, this.mats.static2, name );
	    	if(type=='sphere' && move) mesh = new THREE.Mesh( this.geos.sph, this.mats.sph, name );
	    	if(type=='sphere' && !move) mesh = new THREE.Mesh( this.geos.sph, this.mats.static, name);
	    	if(type=='cylinder' && move) mesh = new THREE.Mesh( this.geos.cyl, this.mats.cyl, name );
	    	if(type=='cylinder' && !move) mesh = new THREE.Mesh( this.geos.cyl, this.mats.static, name);
	    	mesh.scale.set( size[0], size[1], size[2] );
	        mesh.position.set( pos[0], pos[1], pos[2] );
	        mesh.rotation.set( rot[0]*V3D.ToRad, rot[1]*V3D.ToRad, rot[2]*V3D.ToRad );
	        if(target) {target.add( mesh ); }
	        else {
                this.scene.add( mesh ); }
           
            if(mesh.name == 'sight'){
                this.sight = mesh;
            };
            if(mesh.name == 'containerSphere'){
                this.containerMesh = mesh;
            };
            // if(mesh.name == 'proBox'){
            //     this.proBox = mesh;
            // }

	        return mesh;
    	}
    	
    },
    moveLink:function(line, p1, p2){
    	line.geometry.vertices[0].copy( p1 );
        line.geometry.vertices[1].copy( p2 );
        line.geometry.verticesNeedUpdate = true;
    },
    initKeyboard:function(){
    	this.nav.bindKeys();
    },
    customShader:function(shader){
    	var material = new THREE.ShaderMaterial({
			uniforms: shader.uniforms,
			attributes: shader.attributes,
			vertexShader: shader.vs,
			fragmentShader: shader.fs
		});
		return material;
    },
    gradTexture : function(color) {
        var c = document.createElement("canvas");
        var ct = c.getContext("2d");
        c.width = 16; c.height = 128;
        var gradient = ct.createLinearGradient(0,0,0,128);
        var i = color[0].length;
        while(i--){ gradient.addColorStop(color[0][i],color[1][i]); }
        ct.fillStyle = gradient;
        ct.fillRect(0,0,16,128);
        var tx = new THREE.Texture(c);
        tx.needsUpdate = true;
        return tx;
    },
    basicTexture : function (n, r){
        var canvas = document.createElement( 'canvas' );
        canvas.width = canvas.height = 64;
        var ctx = canvas.getContext( '2d' );
        var color;
        if(n===0) color = "#58C3FF";// sphere
        if(n===1) color = "#3580AA";// sphere sleep
        if(n===2) color = "#FFAA58";// box
        if(n===3) color = "#AA8038";// box sleep
        if(n===4) color = "#1d1f20";// static
        if(n===5) color = "#58FFAA";// cyl
        if(n===6) color = "#38AA80";// cyl sleep
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = "rgba(0,0,0,0.1);";//colors[1];
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        var tx = new THREE.Texture(canvas);
        tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
        tx.repeat = new THREE.Vector2( r || 1, r || 1);
        tx.needsUpdate = true;
        return tx;
    },
    gs_mse_pos: function (gs, pos){
        if(gs == 'get'){
            return this.sight.position;
        }
        else {
            this.sight.position.x = pos.x;
            this.sight.position.y = pos.y;
            this.sight.position.z = pos.z;


        }
    },
    getPlayerDir : function (direction, playerPos){

        var heading = new THREE.Vector3();
        if(direction == 'forward'){

            var retMse = this.gs_mse_pos('get');
         //   this.log('forward sight pos ', retMse);
         //   this.log('cm: ' , playerPos);
         //   this.log('gpd cam', this.camera.position);


            heading = heading.subVectors( retMse, playerPos );
        }
        else {

            this.log('reverse sight pos ', retMse);


            heading = heading.subVectors( playerPos, this.gs_mse_pos('get') );
        }
        return heading.normalize();
    },
    updateSightPos: function () {

            this.dir.set( V3D.msePos.x, V3D.msePos.y, 0.5 ).unproject( this.camera ).sub( this.camera.position ).normalize();
            this.newsightpos.addVectors ( this.camera.position, this.dir.multiplyScalar( 200 ));
            this.sight.position.copy(this.newsightpos);
            this.sight.lookAt(this.containerMesh.position);

    },
    applyRot: function (issleeping) {



            // var q = new THREE.Quaternion();
            // q.setFromAxisAngle( this.startRot.axis, this.startRot.camAngle);

            // var cmq = this.camera.quaternion;
            // cmq.multiplyQuaternions(q, cmq);
            // cmq.normalize;
            // this.camera.matrix.makeRotationFromQuaternion(cmq);



            var tmpVCP = new THREE.Vector3();
            tmpVCP.copy(this.tmpVCPprev);
            tmpVCP.applyAxisAngle( this.startRot.axis, this.startRot.camAngle );

            tmpVCP.x -= this.tmpVCPprev.x;
            tmpVCP.y -= this.tmpVCPprev.y;
            tmpVCP.z -= this.tmpVCPprev.z;

            this.tmpVCPprev.x += tmpVCP.x;
            this.tmpVCPprev.y += tmpVCP.y;
            this.tmpVCPprev.z += tmpVCP.z;

            if ( this.startRot.issleeping ) {
                this.camera.position.x += tmpVCP.x;
                this.camera.position.y += tmpVCP.y;
                this.camera.position.z += tmpVCP.z;
                this.camera.lookAt( this.containerMesh.position );
            }
            else {
                this.camrot.x = tmpVCP.x;
                this.camrot.y = tmpVCP.y;
                this.camrot.z = tmpVCP.z;
            }



            // var tmpVCP = new THREE.Vector3();
            // tmpVCP.copy(this.tmppbprev);
            // tmpVCP.applyAxisAngle( this.startRot.axis, this.startRot.camAngle );

            // tmpVCP.x -= this.tmppbprev.x;
            // tmpVCP.y -= this.tmppbprev.y;
            // tmpVCP.z -= this.tmppbprev.z;

            // this.tmppbprev.x += tmpVCP.x;
            // this.tmppbprev.y += tmpVCP.y;
            // this.tmppbprev.z += tmpVCP.z;



            // if( this.startRot.issleeping) {
            //     this.proBox.position.x += tmpVCP.x;
            //     this.proBox.position.y += tmpVCP.y;
            //     this.proBox.position.z += tmpVCP.z; 
            //     this.proBox.lookAt( this.containerMesh.position );
            // }

            // else {
            //     this.pbrot.x = tmpVCP.x;
            //     this.pbrot.y = tmpVCP.y;
            //     this.pbrot.z = tmpVCP.z;
            // }
            


         
            
    },
    tvec: function() {
        return new THREE.Vector3();
    },
    whcam: function() {
        var vFOV = this.camera.fov * Math.PI / 180;        // convert vertical fov to radians
        var height = 2 * Math.tan( vFOV / 2 ) * 300; // visible height

        var aspect = this.w / this.h;
        var width = height * aspect;   

        return {h: height,w: width};

    },
    log: function(name, output){
            
        if( typeof output == 'object' ){   
            console.log(`output ${name}  x ${output.x} , y ${output.y} , z ${output.z} `);
        }
        else if( typeof output === undefined ) {
            console.log(`string is ${name} `);
        }
        else {
            console.log(`name ${name} and output ${output}`);
        }

    }

}


return V3D;

});

//----------------------------------
//  LOADER IMAGE/SEA3D
//----------------------------------

// POOL move to sea3D is more logical