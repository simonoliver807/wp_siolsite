define(['three'], function(THREE) {
'use strict';
var THREE;
var V3D = {};
V3D.ToRad = Math.PI/180;
V3D.ToDeg = 180 / Math.PI;
V3D.msePos = {x:0,y:0};


V3D.View = function(h,v,d){

	var n = navigator.userAgent;
	this.isMobile = false;
    if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i) || n.match(/Windows Phone/i)) this.isMobile = true;      

    
    var container = document.getElementById('container');


    container.style.width = "1351px";
    container.style.height = "987px";
	this.w = container.clientWidth;
	this.h = container.clientHeight;
	this.id = 'container';

	this.init(h,v,d);
	this.initBasic();
    this.sight;

    this.arrCamX = [];
    this.arrCamY = [];
    this.pbX = [];
    this.pbY = [];

    this.startRot = 0;

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

        this.camera.position.z = 100;
        this.camera.position.y = 0;
        
        
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
        this.tmpVCPprev = new THREE.Vector3(0,0,100);
        this.tmppbprev = new THREE.Vector3(0,0,-100);
        this.axis = new THREE.Vector3(0,1,0);

        this.containerMesh;
        this.proBox;

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
        mats['box'] = new THREE.MeshLambertMaterial( { color: 0x66ff33, wireframe: true, name:'box'} );


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


        if(this.startRot){ this.applyRot() };
       
       // update the picking ray with the camera and mouse position    
        this.raycaster.setFromCamera( V3D.msePos, this.camera );   

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects( this.scene.children );

        for ( let i = 0; i < intersects.length; i++ ) {

            if(intersects[ i ].object.name == 'proBox') {
                
                this.sight.position.copy(intersects[i].point);
             //   this.gs_mse_pos('set', intersects[i].point);
            }
        
        }


        //this.camhelp.update();




    	this.renderer.render( this.scene, this.camera );
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
            //  siolsite put back to load images if(image){
            //     var setImage = 'http://localhost:8887/fs_canvas/images/'+image;
            //     var texture = new THREE.TextureLoader().load(setImage);
            //     this.mats['sph'] = new THREE.MeshBasicMaterial({map:texture});
            // }
    		if(type=='box' && move) mesh = new THREE.Mesh( this.geos.box, this.mats.box, name );
	    	if(type=='box' && !move) mesh = new THREE.Mesh( this.geos.box, this.mats.static, name);
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
            if(mesh.name == 'proBox'){
                this.proBox = mesh;

            }

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
            heading = heading.subVectors( this.gs_mse_pos('get'), playerPos );
        }
        else {
            heading = heading.subVectors( playerPos, this.gs_mse_pos('get') );
        }
        return heading.normalize();
    },

    applyRot: function () {


            // var tmpVCP = new OIMO.Vec3();
            // tmpVCP.copy(tmpVCPprev);
            // var length = tmpVCP.length();
            // tmpVCP.normalize();
            // tmpVCP.applyAxisAngle( axis, camAngle );
            // tmpVCP.multiplyScalar( length );
            // tmpVCP.x -= tmpVCPprev.x;
            // tmpVCP.z -= tmpVCPprev.z;
            // tmpVCPprev.x += tmpVCP.x;
            // tmpVCPprev.z += tmpVCP.z;
            // v3d.camera.position.x += tmpVCP.x;
            // v3d.camera.position.z += tmpVCP.z;
            // v3d.camera.lookAt ( containerMesh.position );

            var tmpVCP = new THREE.Vector3();
            tmpVCP.copy(this.tmpVCPprev);

            tmpVCP.applyAxisAngle( this.axis, this.camAngle );
            this.tmpVCPprev.copy(tmpVCP)

            this.camera.position.x = tmpVCP.x;
            this.camera.position.z = tmpVCP.z;
            this.camera.lookAt ( this.containerMesh.position );

            this.arrCamX.push(tmpVCP.x);




            var tmpVCP = new THREE.Vector3(0,0,0);
            tmpVCP.copy(this.tmppbprev);
            tmpVCP.applyAxisAngle( this.axis, this.camAngle );
            this.tmppbprev.copy(tmpVCP);

            this.proBox.position.x = tmpVCP.x;
            this.proBox.position.z = tmpVCP.z;
            this.proBox.lookAt(this.containerMesh.position);
            
            this.pbX.push(tmpVCP.x);
            console.log(this.pbx);
    }

}


return V3D;

});

//----------------------------------
//  LOADER IMAGE/SEA3D
//----------------------------------

// POOL move to sea3D is more logical