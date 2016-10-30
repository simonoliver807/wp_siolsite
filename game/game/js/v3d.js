define(['three'], function(THREE) {
'use strict';
var THREE;
var V3D = {};
V3D.ToRad = Math.PI/180;
V3D.ToDeg = 180 / Math.PI;
V3D.msePos = new THREE.Vector3(0,0,0);
V3D.startRender = false;
// V3D.objimage = 0;


V3D.View = function(h,v,d){

	var n = navigator.userAgent;
	this.isMobile = false;
    if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i) || n.match(/Windows Phone/i)) this.isMobile = true;      

    
    var container = document.getElementById('container');


    // container.style.width = "100%";
    // container.style.height = "500px";
	this.w = container.clientWidth;
	this.h = container.clientHeight;
	this.id = 'container';

	this.init(h,v,d);
	this.initBasic();
    this.sight;

    // this.arrCamX = [];
    // this.arrCamY = [];
    // this.pbX = [];
    // this.pbY = [];
    // this.axis = new THREE.Vector3();
    this.startRot = { issleeping: 1, rot: 0, axis: new THREE.Vector3() };
    this.world;
    this.var =0;

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

        this.camera.position.z = 10;
        this.origcamz = 10;
       // this.camera.position.y = 0;
        this.camera.matrixAutoUpdate = true;
        this.camAngle = -0.025;

        this.msechngdir;
        this.chngeindir = false;


       // this.tmpVCPprev1 = new THREE.Vector3(0,0,100);
        this.tmpVCPprev = new THREE.Vector3(0,0,10);
        
        
    	this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x000000 );
        
        
        
    	// siolsite abandoned changed the scene color this.initBackground();
        this.container = document.getElementById(this.id)
        this.container.appendChild( this.renderer.domElement );

        this.miniMap = null;
        this.player = null;

       // this.raycaster = new THREE.Raycaster(this.camera.position, [0,1,0], 1, 100);
        this.raycaster = new THREE.Raycaster();


       // update sight vars
        this.matrixWorld = new THREE.Matrix4();
        this.matrix2 = new THREE.Matrix4();
        this.matrix3 = new THREE.Matrix4();
        this.cpn = new THREE.Vector3( 0, 0, 0 );
        this.len = 0;  
        this.cp = new THREE.Vector3();
        this.camdir = new THREE.Vector3();



        this.containerMesh = 0;
        this.proBox;
        this.camrot = new THREE.Vector3();
        this.pbrot = new THREE.Vector3();
        this.newsightpos = new THREE.Vector3();
        this.dir = new THREE.Vector3();
        this.bodys = [];
        this.velocity = 1;
        this.reverse = false;
        this.heading = new THREE.Vector3();
        this.shootStart = new THREE.Vector3();

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
  //   	var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x303030, 0.3 );
  //       hemiLight.name = 'hemlight';
		// this.scene.add( hemiLight );
		// var dirlight = new THREE.DirectionalLight( 0xffffff, 1.2 );
		// dirlight.position.set( 0.5, 1, 0.5 ).normalize();
  //       dirlight.name = 'dirlight';
		// this.scene.add( dirlight );
         var dirlight1 = new THREE.DirectionalLight( 0xffffff, 1.2 );
         dirlight1.position.set( 0, 1, 0 );
         dirlight1.name = 'dirlight';
         var dirlight2 = new THREE.DirectionalLight( 0xffffff, 1.2 );
         dirlight2.position.set( 0, -1, 0 );
         dirlight2.name = 'dirlight';
         this.scene.add( dirlight1 );
         this.scene.add( dirlight2 );
    },
    // initLightShadow:function(){
    // 	if(this.isMobile) return;
    // 	this.scene.add( new THREE.AmbientLight( 0x606060 ) );
	   //  var light = new THREE.DirectionalLight( 0xffffff , 1);
	   //  light.position.set( 300, 1000, 500 );
	   //  light.target.position.set( 0, 0, 0 );
	   //  light.castShadow = true;
	   //  light.shadowCameraNear = 500;
	   //  light.shadowCameraFar = 1600;
	   //  light.shadowCameraFov = 70;
	   //  light.shadowBias = 0.0001;
	   //  light.shadowDarkness = 0.7;
	   //  //light.shadowCameraVisible = true;
	   //  light.shadowMapWidth = light.shadowMapHeight = 1024;
	   //  this.scene.add( light );
    // },
    render : function(){

         if(this.startRot.rot !== 0){ this.applyRot() };
    	this.renderer.render( this.scene, this.camera );


    },
    initBasic:function(){
        var geos = {};
        geos['boxTarget'] = new THREE.BoxGeometry(50,50,50);
        geos['containerMesh'] = new THREE.SphereGeometry(8);
        geos['cylTarget'] = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        geos['phaser'] = new THREE.SphereGeometry(1.5, 3, 2);
        geos['planet'] = new THREE.SphereBufferGeometry(500, 16, 12);
        geos['shp1'] = new THREE.SphereGeometry(0.5)
        geos['sight'] = new THREE.BoxGeometry(15,15,0.5);
        

        this.geos = geos;

    },
    addSphere : function(sphere){
    
        // this.mats['sph'] = this.setMesh(color);
         if(sphere.image){
            var setImage = 'images/'+sphere.image;
            var texture = new THREE.TextureLoader().load(setImage);
            var material = new THREE.MeshBasicMaterial({map:texture});
        }
        else {
            var material = new THREE.MeshBasicMaterial({ color: sphere.color, wireframe: sphere.wireframe, name: sphere.name, transparent: sphere.transparent, opacity: sphere.opacity });
        }

        if(sphere.name == 'containerMesh'){
            var texture = this.loadTGA();
            var object = this.loadOBJ(texture,this.scene,sphere);
        }
        else {

            var mesh = new THREE.Mesh( this.geos[sphere.name], material, sphere.name );
            mesh.position.set( sphere.pos[0], sphere.pos[1], sphere.pos[2] );
            this.scene.add( mesh );

            // if(mesh.name == 'containerMesh'){
            //     this.containerMesh = mesh;
            // };

            return mesh;
        }
    	
    },
    addBox: function(box){

        if(box.image){
            var setImage = 'images/'+box.image;
          //  var texture = new THREE.TextureLoader().load(setImage);
            var material = new THREE.MeshBasicMaterial();
            material.map = new THREE.TextureLoader().load(setImage);
            material.transparent = true;
         
          //  material.depthWrite = false;
            //material.color = new THREE.Color(0x66ff33);

            //  var material = new THREE.MeshBasicMaterial({map:texture, wireframe: box.wireframe, name: box.name, transparent: box.transparent, opacity: box.opacity});
        }
        else {
             var material = new THREE.MeshBasicMaterial({ color: box.color, wireframe: box.wireframe, name: box.name, transparent: box.transparent, opacity: box.opacity });
        }

        var mesh = new THREE.Mesh( this.geos[box.name], material, box.name );
        mesh.position.set( box.pos[0], box.pos[1], box.pos[2] );
        this.scene.add( mesh );

        if(mesh.name == 'sight'){
            this.sight = mesh;
        };
        return mesh;

    },
    addCylinder: function(cylinder){


            var texture = this.loadTGA();
            this.loadOBJ(texture,this.scene,cylinder);
        
        // var material = new THREE.MeshBasicMaterial({ color: cylinder.color, wireframe: cylinder.wireframe, name: cylinder.name, transparent: cylinder.transparent, opacity: cylinder.opacity });
        // var mesh = new THREE.Mesh( this.geos['cylTarget'], material, cylinder.name );
        // mesh.position.set( cylinder.pos[0], cylinder.pos[1], cylinder.pos[2] );
        // this.scene.add( mesh );
        // return mesh;


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

          // this.dir.set( V3D.msePos.x, V3D.msePos.y, 0.5 ).unproject( this.camera ).sub( this.camera.position ).normalize();

            this.cp.setFromMatrixPosition( this.camera.matrixWorld );
            this.len = this.cp.length();
            this.matrixWorld.copy(this.camera.matrixWorld);
            this.cpn.x = this.matrixWorld.elements[12];
            this.cpn.y = this.matrixWorld.elements[13];
            this.cpn.z = this.matrixWorld.elements[14];
            this.cpn.normalize()
            this.matrixWorld.setPosition(this.cpn);
            this.matrix2.multiplyMatrices( this.matrixWorld, this.matrix2.getInverse( this.camera.projectionMatrix ) );
            var tmpvecmse = new THREE.Vector3(V3D.msePos.x, V3D.msePos.y, 0.5);
            tmpvecmse.applyProjection(this.matrix2);
            this.dir.copy(tmpvecmse.sub(this.cpn).normalize());
            this.newsightpos.addVectors ( this.camera.position, this.dir.multiplyScalar( 200 ));
            this.sight.position.set(this.newsightpos.x, this.newsightpos.y, this.newsightpos.z);
        

            this.camdir.subVectors(this.camera.position, this.containerMesh.position).normalize();
            var q = new THREE.Quaternion();
            q.setFromAxisAngle( this.camdir, Math.PI/2 );
            this.sight.up.set(q.x, q.y, q.z);
            this.sight.lookAt(this.containerMesh.position);
            this.containerMesh.lookAt(this.sight.position);
            
            

    },
    applyRot: function (issleeping) {

            // var q = new THREE.Quaternion();
            // q.setFromAxisAngle( this.startRot.axis, this.startRot.camAngle);

            // var cmq = this.camera.quaternion;
            // cmq.multiplyQuaternions(q, cmq);
            // cmq.normalize;
            // this.camera.matrix.makeRotationFromQuaternion(cmq);

            // var q = new THREE.Quaternion();
            // var rotAxis = new THREE.Vector3(0,1,0);
            // q.setFromAxisAngle( rotAxis, 0.1);

          //  this.log('sm rot: ', this.sight.rotation);


            var dir = new THREE.Vector3();
            dir.subVectors( this.camera.position, this.containerMesh.position);
            if (this.msechngdir === undefined){
                this.msechngdir = this.startRot.rot;  
            }
            if (this.msechngdir != this.startRot.rot){
                this.chngeindir = true;
                this.msechngdir = this.startRot.rot;
            }

          if( (dir.y > -97 && dir.y < 97) || this.chngeindir){

            var axis = new THREE.Vector3();
            var tmpCM = new THREE.Vector3();
            axis.subVectors(tmpCM, V3D.msePos);

         //   axis.set(V3D.msePos.x, V3D.msePos.y, V3D.msePos.z);
            axis.z = 0;

            axis.set ( axis.y, axis.x*-1, axis.z );

            axis.applyEuler(this.camera.rotation);


          //  this.log('up down: ', this.startRot.rot);

            //this.log('dir ' , dir);
                
                var tmpVCP = new THREE.Vector3();
                tmpVCP.copy(this.tmpVCPprev);
                tmpVCP.applyAxisAngle( axis, this.camAngle );
                

//this.log('tmpVCP ', tmpVCP);

                tmpVCP.x -= this.tmpVCPprev.x;
                tmpVCP.y -= this.tmpVCPprev.y;
                tmpVCP.z -= this.tmpVCPprev.z;

                if(this.chngeindir){
                    this.chngeindir = false; 
                    if ( this.tmpVCPprev.y + tmpVCP.y > 97 ) {
                        tmpVCP.y = this.tmpVCPprev.y - 96.9;
                        tmpVCP.y *= -1;
                    }
                    else if ( this.tmpVCPprev.y + tmpVCP.y < -97 ) {
                        tmpVCP.y = this.tmpVCPprev.y + 96.9;
                        tmpVCP.y *= -1;    
                    }
                }



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
            }
            else {

                var axis = new THREE.Vector3(0,1,0);
               // var camAngle = new THREE.Vector3();
                if(this.startRot.rot == 'ul' || this.startRot.rot == 'dl'){
                    var camAngle = 0.001
                }
                else {
                    var camAngle = -0.001;
                }

                var tmpVCP = new THREE.Vector3();
                tmpVCP.copy(this.tmpVCPprev);
                tmpVCP.applyAxisAngle( axis, camAngle );


             //   this.log('tmpVCP ', tmpVCP);

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

            }

           // } 
          //  else {
           //     this.startRot.rot = 0;
                // var axis = new THREE.Vector3();
                // axis.subVectors( this.camera.position, this.containerMesh.position);
            
                // var q = new THREE.Quaternion();
                // q.setFromAxisAngle( axis, this.camAngle);

                // var cmq = this.camera.quaternion;
                // cmq.multiplyQuaternions(q, cmq);
                // cmq.normalize;
                // this.camera.matrix.makeRotationFromQuaternion(cmq);


            //}     
            
    },
    addForce: function() {

        var rb = this.bodys[0].body;
        var heading = this.getPlayerDir('forward', this.containerMesh.position);  
        var chngeindir = heading.equals(this.heading); 
        //var set = false;
        if ( !chngeindir ) {
            this.heading.set(heading.x,heading.y,heading.z);
        }
        if(this.startRot.rot || !chngeindir || rb.linearVelocity.length() < 15){
            if(rb.linearVelocity.length() < 40){
                heading.multiplyScalar(25);
                rb.linearVelocity.addTime(heading , this.world.timeStep);
                if(rb.linearVelocity.length() > 40){
                    var count = -2;
                    while(rb.linearVelocity.length() > 40){
                        heading.multiplyScalar(count);
                        rb.linearVelocity.addTime(heading , this.world.timeStep);
                        count --;
                    }
                }
               // set = true;
            }
        } 
        if( chngeindir ){
            if(rb.linearVelocity.length() < 40){
                heading.multiplyScalar(15);
                rb.linearVelocity.addTime(heading , this.world.timeStep);
            }
        }
        // if( !chngeindir && rb.linearVelocity.length() > 40 && rb.linearVelocity.length() < 41 && !set){
        //     heading.multiplyScalar(-10);
        //     rb.linearVelocity.addTime(heading , this.world.timeStep);
        // }

        this.log('lv ', rb.linearVelocity.length());

        var perlv = ((rb.linearVelocity.length()/40)*100) - 5;
        accel.style.width = perlv + '%';
        if( rb.linearVelocity.length < 1 && this.reverse ){
            this.reverse = false;
        }

        this.velocity = 1 + rb.linearVelocity.length() / 10;
        
    },
    minusForce: function() {

        var rb = this.bodys[0].body;
        var lv = new THREE.Vector3(rb.linearVelocity.x,rb.linearVelocity.y,rb.linearVelocity.z);
       // lv.copy( rb.linearVelocity );
        var lenghtlv = lv.length();
        if((lv.x == 0 && lv.y == 0 && lv.z == 0) || this.reverse) {
            var heading = this.getPlayerDir('reverse', this.containerMesh.position);
            heading.multiplyScalar( 15 );
            rb.linearVelocity.addTime(heading , this.world.timeStep);
            this.reverse = true; 
        }
        else {
            lv = lv.normalize();
            lv = lv.multiplyScalar( lenghtlv -0.5 );
            rb.linearVelocity.copy( lv );
            if(lenghtlv < 1) {
                this.reverse = true;
            }
        }

        this.log('lv ', rb.linearVelocity.length());

        var perlv = ((rb.linearVelocity.length()/40)*100) - 5;
        accel.style.width = perlv + '%';
        if(this.velocity < 3){
            this.velocity = 1 + rb.linearVelocity.length() / 10;
        }
    },
    phaser: function() {
        var heading = this.getPlayerDir('forward', this.containerMesh.position);
        var mag = 700 * this.velocity;
        heading.x *= mag;
        heading.y *= mag;
        heading.z *= mag;
        this.shootStart.subVectors( this.containerMesh.position, this.camera.position );
        this.shootStart.normalize();
        this.shootStart.addVectors(this.shootStart, this.containerMesh.position);
        
        var phaser = { type: 'sphere', size: [0.5,0.5,0.5], pos: [this.shootStart.x, this.shootStart.y, this.shootStart.z], move: 'true', world: this.world, color:'#66ff33', wireframe: 'false', name:'phaser', transparent: 'false', opacity: 1};
        var sphere = this.addSphere(phaser);
        var rb = this.addPhaser(phaser, sphere);
        rb.body.linearVelocity.addTime(heading, this.world.timeStep);
        var shp1 = this.bodys[0].body;
        rb.body.linearVelocity.addEqual(shp1.linearVelocity);
        //console.log('velocity: ' + velocity);
    },
    loadTGA: function() {
        var loader = new THREE.TGALoader();
        var texture = loader.load( 'images/Free_Droid/Materials/BaseMaterial_diffuse.tga' );
        return texture
    },
    loadOBJ: function(texture,scene,obj) {
        if( obj.length > 1) {
            var image = obj[0].image;
        }
        else { var image = obj.image; }
        var loader = new THREE.OBJLoader( );
        loader.load( 'images/'+image, function ( object ) {

            object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    child.material.map = texture;

                }

            } );
            if(obj.name == 'containerMesh'){
                object.position.set(obj.pos[0], obj.pos[1], obj.pos[2]);
                object.name = obj.name;
                scene.add(object);
                V3D.startRender = 1;
            }
            else {
                for(var i=0;i<obj.length;i++){
                    var tmpobj = obj[i];
                    var tmpgroup = object.clone();
                    tmpgroup.position.set(tmpobj.pos[0], tmpobj.pos[1], tmpobj.pos[2]);
                    tmpgroup.name = tmpobj.name;
                    scene.add(tmpgroup);
                }
            }

        }, this.onProgress, this.onError );
    },
    onProgress: function ( xhr ) {
    //     if ( xhr.lengthComputable ) {
    //         var percentComplete = xhr.loaded / xhr.total * 100;
    //         console.log( Math.round(percentComplete, 2) + '% downloaded' );
    //     }
    //     if (percentComplete == 100){
    //          V3D.objimage += 1;
    //     }
    //     if ( percentComplete == 100 && V3D.objimage == 2) {
    //         V3D.startRender = true;
    //     }
    },
    onError: function ( xhr ) {

        console.log('xhr error ' + xhr);
    },
    setBodys: function(rb){
        this.bodys.push(rb);
    },
    setWorld: function(world){

        this.world = world;
    },
    tvec: function(x,y,z) {
        return new THREE.Vector3(x,y,z);
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
            if(output.w) { console.log(`output ${name}  x ${output.x} , y ${output.y} , z ${output.z} , w ${output.w}`) }
            else { console.log(`output ${name}  x ${output.x} , y ${output.y} , z ${output.z} `);}
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