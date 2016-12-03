define(['three'], function(THREE) {
'use strict';
var THREE;
var V3D = {};
V3D.ToRad = Math.PI/180;
V3D.ToDeg = 180 / Math.PI;
V3D.msePos = new THREE.Vector3(0,0,0);
V3D.startRender = 0;
V3D.bincam = 1;
V3D.exdrone1;
V3D.exdrone2;
V3D.exdrone3;
V3D.phasers;
V3D.dphasers;
V3D.mesharrpos = {phasers:0,dphasers:0,drones:0};
V3D.grouppart = new THREE.Object3D();
V3D.percom = document.getElementById('perCom');


V3D.View = function(h,v,d){
    
    var container = document.getElementById('container');
	this.w = container.clientWidth;
	this.h = container.clientHeight;
	this.id = 'container';

	this.init(h,v,d);
	this.initBasic();
    this.sight;

    this.startRot = { issleeping: 1, rot: 0, axis: new THREE.Vector3() };
    this.world;


}

V3D.View.prototype = {
    constructor: V3D.View,
    init:function(h,v,d){
    	this.clock = new THREE.Clock();
    	this.renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false});

        //this.renderer = new THREE.WebGLRenderer({ antialias:true });

    	this.renderer.setSize( this.w, this.h );
    	// this.renderer.setClearColor( 0x1d1f20, 1 );
     //    this.renderer.setPixelRatio( window.devicePixelRatio );
     //    this.renderer.autoClear = false;

        this.renderer.setClearColor( 0x000000, 1 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
       this.renderer.autoClear = true;


    	// siolsite this.camera = new THREE.PerspectiveCamera( 60, this.w/this.h, 0.1, 2000 );
        this.camera = new THREE.PerspectiveCamera( 60, this.w/this.h, 0.1, 10000 );
        // this.camhelp = new THREE.CameraHelper( this.camera );
        this.camera.useQuarternion = true;

        
        // need to update both cam pos and tmpVCPprev here and for mobile
        var insideship = document.getElementById('insideship');
        if(insideship.value == 'clicked inside'){
            V3D.bincam = 0;
        }
        else {
            V3D.bincam = 1;
        }

        if( V3D.bincam ) {
            this.camera.position.z = 10;
            this.tmpVCPprev = new THREE.Vector3(0,0,10);
            this.camdist = 9.9;
            this.regulaterot = 0.1;
        }
        else {
            this.camera.position.z = 0.1;
            this.tmpVCPprev = new THREE.Vector3(0,0,0.1);
            this.camdist = 0.09;
            this.regulaterot = 0.01;
        }

        this.camera.matrixAutoUpdate = true;
        this.camAngle = -0.025;

        this.msechngdir;
        this.chngeindir = false;
        
        
    	this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x000000 );
        
        
        this.container = document.getElementById(this.id)
        this.renderer.domElement.id = 'gamecanvas'; 
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
        this.tusv = new THREE.Vector3();



        this.containerMesh = 0;
        this.mothership;
        this.camrot = new THREE.Vector3();
        this.pbrot = new THREE.Vector3();
        this.newsightpos = new THREE.Vector3();
        this.dir = new THREE.Vector3();
        this.bodys = [];
        this.velocity = 1;
        this.reverse = false;
        this.heading = new THREE.Vector3();
        this.shootStart = new THREE.Vector3();
        this.paobj = [[0,0],[1,8],[2,12],[3,15],[4,17],[5,19],[6,22],[7,24],[8,26],[9,28],[10,29],[11,30],[12,31],[13,33],[14,34],[15,35],[16,36],[17,37],[18,38],[19,39]];

        this.drota = 0;
        this.ldh = new THREE.Vector3(0,0,1);
        this.bincount = 0;
        this.dpcnt = 0;

        // applyRot() Vectors
        this.tmpCM = new THREE.Vector3();
        this.tmpVCP = new THREE.Vector3();
        this.rotaxis = new THREE.Vector3();
        this.rotdir = new THREE.Vector3();
        this.rottmpCM = new THREE.Vector3();
        this.up = new THREE.Vector3(0,1,0);

        this.addforce = false;
        this.minusforce = false;

        this.f = new THREE.Vector3();
        this.u = new THREE.Vector3();
        this.s = new THREE.Vector3();

        this.dronetex;

        V3D.grouppart.name = 'grouppart';
        this.scene.add(V3D.grouppart);



    },
    initBackground:function(){
    	var geometry = new THREE.SphereGeometry( 10000, 32, 32 );
        var texture = new THREE.TextureLoader().load('images/space_bg.png');
        var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide } );
        var bg = new THREE.Mesh( geometry, material );
        bg.name = 'bg';
        bg.position.set(0,0,-200);
        this.scene.add( bg );
//this.renderer.autoClear = false;
    },
    initLight:function(){

        var dirlight1  = new THREE.DirectionalLight( 0xffffff, 1.2 );
        dirlight1.position.set( 0, -1, 0 );
        dirlight1.name = 'dirlight';
        var dirlight2 = new THREE.DirectionalLight( 0xffffff, 1.2 );
        dirlight2.position.set( 0, 1, 0 );
        dirlight2.name = 'dirlight';

        this.scene.add( dirlight1 );
        this.scene.add( dirlight2 );

     // var hemlight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
     // this.scene.add( hemlight );

    },
    initPoints: function() {

        var particles = 500;
        var geometry = new THREE.BufferGeometry();
        var positions = new Float32Array( particles * 3 );

        for( var i = 0; i < positions.length; i++) {
            var x = this.randMinMax(-11000,11000);
            var y = this.randMinMax(-11000,11000);
            var z = this.randMinMax(-11000,11000);
            positions[ i ]     = x;
            positions[ i + 1 ] = y;
            positions[ i + 2 ] = z;
        }
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.computeBoundingSphere();
        var points = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 1, color: '#ffffff' } ) );
        points.name = 'points';
        this.scene.add( points );


    },



    
    expart: function() {

        var particles = 150;
        var geometry = new THREE.BufferGeometry();
        var positions = new Float32Array( particles * 3 );

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.computeBoundingSphere();
        var points = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 0.01, color: '#ffff00' } ) );
        points.name = 'points1';
        points.visible = true;
        points.geometry.attributes.position.setDynamic(true);

        return points;

    },





    render : function(){

         if( this.startRot.rot !== 0 && this.containerMesh != 0){ this.applyRot() };
    	this.renderer.render( this.scene, this.camera );


    },
    initBasic:function(){
        var geos = {};
        geos['boxTarget'] = new THREE.BoxGeometry(50,50,50);
        geos['containerMesh'] = new THREE.SphereGeometry(8);
      //  geos['cylTarget'] = new THREE.CylinderGeometry( 20, 20, 20 );
        geos['phaser'] = new THREE.SphereGeometry(0.5, 32, 32);
        geos['dphaser'] = new THREE.SphereGeometry(1, 32, 32);
        geos['planet'] = new THREE.SphereBufferGeometry(500, 16, 12);
        geos['shp1'] = new THREE.SphereGeometry(0.1)
        geos['sight'] = new THREE.BoxGeometry(15,15,0.5);
        geos['mothershipbb'] = new THREE.BoxGeometry(500,100,100,10,10,10);

        

        this.geos = geos;

    },
    addBox: function(box){

        if(box.image && box.name != 'mothership'){
            var setImage = 'images/'+box.image;
            var material = new THREE.MeshBasicMaterial();
            material.map = new THREE.TextureLoader().load(setImage);
            material.transparent = true;
        }
        if(box.name == 'mothership'){
            var texture = '';
           // var object = this.loadOBJ(texture,this.scene,box);
           // this.mothership = object;
         //  var texture = new THREE.TextureLoader().load(box.texture);
           this.loadOBJ(texture,this.scene,box);
            return;
        }

        if(!box.image) {
             var material = new THREE.MeshBasicMaterial({ color: box.color, wireframe: box.wireframe, name: box.name, transparent: box.transparent, opacity: box.opacity });
            if(box.wireframe){ material.wireframe = true;}
        }

        var mesh = new THREE.Mesh( this.geos[box.name], material, box.name );
        mesh.position.set( box.pos[0], box.pos[1], box.pos[2] );
        this.scene.add( mesh );

        if(mesh.name == 'sight'){
            this.sight = mesh;
        };

        //return mesh;

    },
    addCylinder: function(cylinder){

        if(cylinder.length > 0){
          var texture = this.loadTGA('images/Free_Droid/Materials/BaseMaterial_normal.tga');

          this.dronetex = texture;

//            var texture = new THREE.TextureLoader().load('images/Free_Droid/Materials/BaseMaterial_normal.png');
            this.loadOBJ(texture,this.scene,cylinder);}
        if(cylinder.name){

           //  var texture = new THREE.TextureLoader().load(cylinder.mtl);
            this.loadOBJ(this.dronetex,this.scene,cylinder); 
        }

        // if(cylinder.length > 0) {
        //     for(var i =0; i< cylinder.length; i++) {

        //         var material =  new THREE.MeshBasicMaterial({ color: cylinder[i].color, wireframe: cylinder[i].wireframe, name: cylinder[i].name, transparent: cylinder[i].transparent, opacity: cylinder[i].opacity });
        //         var mesh = new THREE.Mesh( this.geos['cylTarget'], material );
        //         mesh.position.set( cylinder[i].pos[0], cylinder[i].pos[1], cylinder[i].pos[2] );
        //         this.scene.add(mesh);
        //     }
        // }


    },
    addSphere : function(sphere){
    
        // this.mats['sph'] = this.setMesh(color);
        if( sphere.name == 'moon' || sphere.name == 'mercury'){
            var setImage = 'images/'+sphere.image;
            var texture = new THREE.TextureLoader().load(setImage);
            var material = new THREE.MeshBasicMaterial({map:texture});
            var mesh = new THREE.Mesh( this.geos[sphere.name], material, sphere.name );
            mesh.position.set( sphere.pos[0], sphere.pos[1], sphere.pos[2] );
            this.scene.add( mesh );
        }
        if(sphere.name == 'containerMesh' && sphere.image != 0){
            var texture = '';
            var object = this.loadOBJ(texture,this.scene,sphere);
        }
        if(sphere.name == 'containerMesh' && sphere.image === 0) {
            var material = new THREE.MeshBasicMaterial({ color: sphere.color, wireframe: sphere.wireframe, name: sphere.name, transparent: sphere.transparent, opacity: sphere.opacity });
            var mesh = new THREE.Mesh( this.geos[sphere.name], material, sphere.name );
            mesh.position.set( sphere.pos[0], sphere.pos[1], sphere.pos[2] );
            this.scene.add( mesh );
        }
        if(sphere.name == 'phasers' || sphere.name == 'dphasers') {
            var texture = new THREE.TextureLoader().load(sphere.texture);
            this.loadOBJ(texture,this.scene,sphere);
        }
        if(sphere.name == 'shp1') {
            var material = new THREE.MeshBasicMaterial({ color: sphere.color, wireframe: sphere.wireframe, name: sphere.name, transparent: sphere.transparent, opacity: sphere.opacity });
            var mesh = new THREE.Mesh( this.geos[sphere.name], material, sphere.name );
            mesh.position.set( sphere.pos[0], sphere.pos[1], sphere.pos[2] );
            this.scene.add( mesh );
        }


        if(sphere.name == 'phaser') {
            var material = new THREE.MeshBasicMaterial({ color: sphere.color, wireframe: sphere.wireframe, name: sphere.name, transparent: sphere.transparent, opacity: sphere.opacity });
            var mesh = new THREE.Mesh( this.geos[sphere.name], material, sphere.name );
            mesh.position.set( sphere.pos[0], sphere.pos[1], sphere.pos[2] );
            this.scene.add( mesh );
        }

        
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

            heading = heading.subVectors( retMse, playerPos );
        }
        else {
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
            this.newsightpos.addVectors ( this.camera.position, this.dir.multiplyScalar( 100 ));
            this.sight.position.set(this.newsightpos.x, this.newsightpos.y, this.newsightpos.z);
        

            this.camdir.subVectors(this.camera.position, this.containerMesh.position).normalize();
            var q = new THREE.Quaternion();
            q.setFromAxisAngle( this.camdir, Math.PI/2 );
            this.sight.up.set(q.x, q.y, q.z);
            // this.sight.lookAt(this.containerMesh.position);
            // this.containerMesh.lookAt(this.sight.position);


            this.tusv.subVectors(this.sight.position,this.containerMesh.position);
            var m = this.lookAtFunc(this.tusv, this.sight.up);
            this.sight.quaternion.setFromRotationMatrix( m );
            this.tusv.subVectors(this.sight.position,this.containerMesh.position);
            var m = this.lookAtFunc(this.tusv, this.up);
            this.containerMesh.quaternion.setFromRotationMatrix( m );            
            

    },
    applyRot: function () {


        this.rotdir.subVectors( this.camera.position, this.containerMesh.position);
        if (this.msechngdir === undefined){
            this.msechngdir = this.startRot.rot;  
        }
        if (this.msechngdir.charAt(0) !== this.startRot.rot.charAt(0)){
            this.chngeindir = true;
            this.msechngdir = this.startRot.rot;
        }

        if( (this.rotdir.y > -this.camdist && this.rotdir.y < this.camdist) || this.chngeindir){

            this.rotaxis.subVectors(this.tmpCM, V3D.msePos);

            this.rotaxis.z = 0;

            this.rotaxis.set ( this.rotaxis.y, this.rotaxis.x*-1, this.rotaxis.z );

            this.rotaxis.applyEuler(this.camera.rotation);
                
            this.tmpVCP.copy(this.tmpVCPprev);
            this.tmpVCP.applyAxisAngle( this.rotaxis, this.camAngle );

            this.tmpVCP.x -= this.tmpVCPprev.x;
            this.tmpVCP.y -= this.tmpVCPprev.y;
            this.tmpVCP.z -= this.tmpVCPprev.z;

            if(this.chngeindir){
                this.chngeindir = false; 
                if ( this.tmpVCPprev.y + this.tmpVCP.y > this.camdist ) {
                    this.tmpVCP.y = this.tmpVCPprev.y - (this.camdist - this.regulaterot);
                    this.tmpVCP.y *= -1;
                }
                else if ( this.tmpVCPprev.y + this.tmpVCP.y < -this.camdist ) {
                    this.tmpVCP.y = this.tmpVCPprev.y + (this.camdist - this.regulaterot);
                    this.tmpVCP.y *= -1;    
                }
            }
            this.tmpVCPprev.x += this.tmpVCP.x; 
            this.tmpVCPprev.y += this.tmpVCP.y;
            this.tmpVCPprev.z += this.tmpVCP.z;
            this.camrot.x = this.tmpVCP.x;
            this.camrot.y = this.tmpVCP.y;
            this.camrot.z = this.tmpVCP.z;
        }
        else {

            if(this.startRot.rot == 'ul' || this.startRot.rot == 'dl'){
                var camAngle = 0.025;
            }
            else {
                var camAngle = -0.025;
            }
            this.tmpVCP.copy(this.tmpVCPprev);
            this.tmpVCP.applyAxisAngle( this.up, camAngle );

            this.tmpVCP.x -= this.tmpVCPprev.x;
            this.tmpVCP.y -= this.tmpVCPprev.y;
            this.tmpVCP.z -= this.tmpVCPprev.z;


            this.tmpVCPprev.x += this.tmpVCP.x;
            this.tmpVCPprev.y += this.tmpVCP.y;
            this.tmpVCPprev.z += this.tmpVCP.z;

            this.camrot.x = this.tmpVCP.x;
            this.camrot.y = this.tmpVCP.y;
            this.camrot.z = this.tmpVCP.z;

        }
            
    },
    lookAtFunc: function(currdir,up) {

            var f;
            var u;
            var s;


                var m = new THREE.Matrix4;
                var te = m.elements;

                this.f = currdir.normalize()

                // if ( z.lengthSq() === 0 ) {

                //     z.z = 1;

                // }

                this.u.crossVectors( up, this.f ).normalize();

                // if ( x.lengthSq() === 0 ) {

                //     z.z += 0.0001;
                //     x.crossVectors( up, z ).normalize();

                // }

                this.s.crossVectors( this.f, this.u ).normalize();

                //u.crossVectors( s, f);


                te[ 0 ] = this.u.x; te[ 4 ] = this.s.x; te[ 8 ] = this.f.x;
                te[ 1 ] = this.u.y; te[ 5 ] = this.s.y; te[ 9 ] = this.f.y;
                te[ 2 ] = this.u.z; te[ 6 ] = this.s.z; te[ 10 ] = this.f.z;

                return m;
    },
    addForce: function() {

        var rb = this.bodys[0].body;
        var heading = this.getPlayerDir('forward', this.containerMesh.position);  
        var chngeindir = heading.equals(this.heading); 
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
            }
        } 
        if( chngeindir ){
            if(rb.linearVelocity.length() < 40){
                heading.multiplyScalar(15);
                rb.linearVelocity.addTime(heading , this.world.timeStep);
            }
        }

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
        var lengthlv = lv.length();
        if((lv.x == 0 && lv.y == 0 && lv.z == 0) || this.reverse) {
            var heading = this.getPlayerDir('reverse', this.containerMesh.position);
            if( lengthlv<40 ) { 
                heading.multiplyScalar( 15 );
                rb.linearVelocity.addTime(heading , this.world.timeStep);
                this.reverse = true;  }
            if(rb.linearVelocity.length() > 40){
                var count = -2;
                while(rb.linearVelocity.length() > 40){
                    heading.multiplyScalar(count);
                    rb.linearVelocity.addTime(heading , this.world.timeStep);
                    count --;
                }
            }
        }
        else {
            lv = lv.normalize();
            lv = lv.multiplyScalar( lengthlv -0.5 );
            rb.linearVelocity.copy( lv );
            if(lengthlv < 1) {
                this.reverse = true;
            }
        }

        var perlv = ((rb.linearVelocity.length()/40)*100) - 5;
        accel.style.width = perlv + '%';
        // if(this.velocity < 3){
            this.velocity = 1 + rb.linearVelocity.length() / 10;
        //}
    },
    phaser: function(heading) {
        var heading = this.getPlayerDir('forward', this.containerMesh.position);
        var mag = 2000;
        heading.x *= mag;
        heading.y *= mag;
        heading.z *= mag;

        if( !V3D.bincam ){
            this.shootStart.subVectors( this.sight.position, this.containerMesh.position );
            this.shootStart.normalize();
            this.shootStart.multiplyScalar(50);
            this.shootStart.addVectors(this.shootStart, this.containerMesh.position);
        }
        else {
            this.shootStart.subVectors( this.containerMesh.position, this.camera.position );
            this.shootStart.normalize();
            this.shootStart.multiplyScalar(30);
            this.shootStart.addVectors(this.shootStart, this.containerMesh.position);
        }
        
        var phaser = V3D.phasers.children[0].clone();
        phaser.visible = true;
        phaser.position.set(this.shootStart.x, this.shootStart.y, this.shootStart.z);
        V3D.phasers.children.push(phaser);



      //  var tmpsphere = { type: 'sphere', color: '#66ff33', pos: [this.shootStart.x, this.shootStart.y, this.shootStart.z], move: 'true', world: this.world, name:'phaser'};
       // this.addSphere(tmpsphere);


        var body = { type: 'sphere', size: [1.5,1.5,1.5], pos: [this.shootStart.x, this.shootStart.y, this.shootStart.z], move: 'true', world: this.world, allowSleep: false, name:'phaser', density: 20  };

        var rb = this.addPhaser(body, phaser);
        rb.body.linearVelocity.addTime(heading, this.world.timeStep);
        var shplv = new THREE.Vector3( this.bodys[0].body.linearVelocity.x,this.bodys[0].body.linearVelocity.y,this.bodys[0].body.linearVelocity.z); 
        shplv.normalize();
        var shp1 = this.bodys[0].body.linearVelocity;
        var len = this.bodys[0].body.linearVelocity.length();
       // console.log(len);


        for(var i=0;i<this.paobj.length-1;i++){
            if( len > this.paobj[i][1] && len < this.paobj[i+1][1] ){
                var diff = this.paobj[i+1][1] - this.paobj[i][1];
                var appvelmag = ((len - this.paobj[i][1])/diff) + this.paobj[i][0] ;
            }
        }
        shplv.multiplyScalar(len + appvelmag);
        rb.body.linearVelocity.addEqual(shplv);
    },
    // updateDrones: function(db){
         updateDrones: function(rb,drone){


            // var q = new THREE.Quaternion();
            // q.setFromAxisAngle( this.startRot.axis, this.startRot.camAngle);

            // var cmq = this.camera.quaternion;
            // cmq.multiplyQuaternions(q, cmq);
            // cmq.normalize;
            // this.camera.matrix.makeRotationFromQuaternion(cmq);

            // var q = new THREE.Quaternion();
            // var rotAxis = new THREE.Vector3(0,1,0);
            // q.setFromAxisAngle( rotAxis, 0.1);



        /////////////////////////////////////
            // later level use getObjHeading/////
            // to predict heading of shp1 ////
            /// and adjust heading of drone ///
            ///////////////////////////////////


            // for(var i=0;i<db.body.length;i++){

            //     var rb = db.body[i];
            //     var drone = db.drone[i];


            var rblv = rb.linearVelocity.length();
        //   console.log('velocity ' + rblv); 


            var correctvec = new THREE.Vector3(this.ldh.x,this.ldh.y,this.ldh.z).normalize();

            this.ldh.subVectors( this.containerMesh.position, drone.position );
            var dist = Math.round(this.ldh.length());
            this.ldh.normalize()
            var m = this.lookAtFunc(this.ldh, this.up);
            var q = new THREE.Quaternion();
            q.setFromRotationMatrix( m );
            rb.setQuaternion(q);

            var angle = 2 * Math.acos(q.w);

            if( drone.userData.bincount === 0) {

                if( this.drota != angle) {

                    var anglediff = this.drota - angle;
                    if( anglediff < 0 ) { anglediff *= -1; }
                    var mag = anglediff;
                    
                   if(anglediff <= 0.01) {
                        mag *= 100;
                    }
                    if(anglediff > 0.01 && anglediff <= 0.1) {
                        mag *= 100;
                    }
                    if(anglediff > 0.1 && anglediff < 1) {
                        mag *= 10;
                    }
                    if(anglediff > 1) {
                        mag;
                    }
                 //   console.log('mag ' + mag); 

                    correctvec.multiplyScalar(-mag);
                    rb.linearVelocity.addTime(correctvec, this.world.timeStep);
                    this.drota = angle;
                    //console.log(rb.linearVelocity); 
                  //  console.log('anglediff' + anglediff);

                }
            }
            else {

                    if ( dist <= 1500 ) {

                        this.normalizelv( rb,2,this.ldh );

                    }
                    if (dist > 1500 && dist <= 4000) { 

                        this.normalizelv( rb,7,this.ldh );
                    
                    }
                    if (dist > 4000 && dist <= 10000 ) {

                        this.normalizelv( rb,10,this.ldh );

                    }
                    if (dist > 10000 ) {
                        this.ldh.multiplyScalar(15);
                        rb.linearVelocity.addTime(this.ldh, this.world.timeStep);  
                    }

            }
            if( drone.userData.dpcnt == 300 ) {
                var heading = new THREE.Vector3(this.ldh.x,this.ldh.y,this.ldh.z);
                heading.normalize;
                var mag = 10 * heading.length();
                heading.x *= mag;
                heading.y *= mag;
                heading.z *= mag;
                this.shootStart.subVectors( this.containerMesh.position, drone.position );
                this.shootStart.normalize();
                this.shootStart.addVectors(this.shootStart, drone.position);
                
                //var phaser = { type: 'sphere', pos: [this.shootStart.x, this.shootStart.y, this.shootStart.z], move: 'true', world: this.world, color:'#ffff00', wireframe: 'false', name:'dphaser', transparent: 'false', opacity: 1};
                //var sphere = this.addSphere(phaser);
                var dphaser = V3D.dphasers.children[0].clone();
                dphaser.position.set(this.shootStart.x, this.shootStart.y, this.shootStart.z);
                dphaser.visible = true;
                V3D.dphasers.children.push(dphaser);
                var body = { type: 'sphere', size: [0.3,0.3,0.3], pos: [this.shootStart.x, this.shootStart.y, this.shootStart.z], move: 'true', world: this.world, name: 'dphaser' };
                var rb = this.addPhaser(body, dphaser);
                rb.body.linearVelocity.addTime(heading, this.world.timeStep);
                // var shp1 = this.bodys[0].body;
                // rb.body.linearVelocity.addEqual(shp1.linearVelocity);
                drone.userData.dpcnt = 0;
            }
            else {
                drone.userData.dpcnt +=1;
            }
            drone.userData.bincount ? drone.userData.bincount = 0 : drone.userData.bincount = 1;
            rb.awake();

        //}





    },
    normalizelv: function(rb, mag, ldh) {

        if( rb.linearVelocity.length() >= (mag + 1) ){
            rb.linearVelocity.normalize(rb.linearVelocity);
            rb.linearVelocity.multiplyScalar(mag);
        }
        ldh.multiplyScalar(mag);
        rb.linearVelocity.addTime( ldh, this.world.timeStep );  


    },
    getObjHeading: function(pos, rot) {
        
        return pos.applyQuaternion(rot).negate();

    },
    onProgress: function ( xhr ) {


//         V3D.objimage = 0;
// V3D.totalImg = 5;
// V3D.loadingScreen = document.getElementById('loadingScreen');

            

            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                V3D.percom.innerHTML = '  Current ' + Math.round(percentComplete, 2) + '% downloaded ';
            }

    },
    onError: function ( xhr ) { 

            console.log(xhr);

            var errscreen = document.getElementById('errScreen');
            errscreen.innerHTML = "<div id='errdiv'><p>"+ xhr.target.responseURL + "</p><p>"+xhr.target.statusText+"</p><p>"+xhr.target.status+"</p></div>";
            errscreen.style.display = "block";

    },
    loadTGA: function(texture) {
        // var onProgress = function ( xhr ) {
        //     if ( xhr.lengthComputable ) {
        //         var percentComplete = xhr.loaded / xhr.total * 100;
        //         console.log( Math.round(percentComplete, 2) + '% downloaded ' + xhr.srcElement.responseURL);
        //     }
        // };
        // var onError = function ( xhr ) { 
        //     console.log(xhr);
        // };
        var loader = new THREE.TGALoader();
        var texture = loader.load( texture, function( object) {
        }, V3D.View.prototype.onProgress, V3D.View.prototype.onError);
        return texture
    },
    loadOBJ: function(texture,scene,obj) {

        // var onProgress = function ( xhr ) {
        //     if ( xhr.lengthComputable ) {
        //         var percentComplete = xhr.loaded / xhr.total * 100;
        //         console.log( Math.round(percentComplete, 2) + '% downloaded ' + xhr.srcElement.responseURL );
        //     }
        // };
        // var onError = function ( xhr ) { 
        //     console.log(xhr);
        // };

        // if( obj[0] || obj.name.charAt(0) == 'e' || obj.name == 'phasers' || obj.name == 'dphasers' || obj.name == 'mothership') {
        if( obj[0] || obj.name.charAt(0) == 'e' || obj.name == 'phasers' || obj.name == 'dphasers') {
            if(obj[0]){ var image = obj[0].image;}
            else {var image = obj.image;}
            var loader = new THREE.OBJLoader( );
            loader.load( 'images/'+image, function ( object ) {

                object.traverse( function ( child ) {

                    if ( child instanceof THREE.Mesh ) {
                        if (child.material.type == 'MultiMaterial') { 
                            child.material.materials[0].map = texture; }
                        if (child.material.type == 'MeshPhongMaterial') { 
                            child.material.map = texture;} 
                    }

                } );

                if( obj[0] && obj[0].name == 'drone'){
                    for(var i=0;i<obj.length;i++){
                        if(i==0){
                            object.children[0].position.set(obj[i].pos[0], obj[i].pos[1], obj[i].pos[2]);
                            object.children[0].name = 'drone';
                        }
                        else {
                            var tmpDrone = object.children[0].clone();
                            tmpDrone.position.set(obj[i].pos[0], obj[i].pos[1], obj[i].pos[2]);
                            object.children.push(tmpDrone);
                        }


                    }
                    object.name = 'drones';
                    V3D.mesharrpos.drones = scene.children.length;
                    scene.add(object);
                }
                if(object.name != 'drones') { object.name = obj.name ;}
                if(object.name == 'exdrone3'){
                    object.userData.active = false;
                    V3D.exdrone3 = object;
                    V3D.exdrone3.children[0].visible = false;
                    scene.add(V3D.exdrone3);
                }
                if(object.name == 'exdrone2'){
                    object.userData.active = false;
                    V3D.exdrone2 = object;
                    V3D.exdrone2.children[0].visible = false;
                    scene.add(V3D.exdrone2);
                }
                if(object.name == 'exdrone1'){
                    object.userData.active = false;
                    V3D.exdrone1 = object;
                    V3D.exdrone1.children[0].visible = false;
                    scene.add(V3D.exdrone1);
                }
                if(object.name == 'phasers'){
                    V3D.phasers = object;
                    V3D.phasers.children[0].visible = false;
                    V3D.phasers.children[0].name = 'phaser';
                    V3D.mesharrpos.phasers = scene.children.length;
                    scene.add(V3D.phasers);
                }
                if(object.name == 'dphasers'){
                    V3D.dphasers = object;
                    V3D.dphasers.children[0].visible = false;
                    V3D.dphasers.children[0].name = 'dphaser';
                    V3D.mesharrpos.dphasers = scene.children.length;
                    scene.add(V3D.dphasers);
                }
                 if(object.name == 'mothership'){
                    scene.add(object);
                }
                V3D.startRender +=1;
            }, V3D.View.prototype.onProgress, V3D.View.prototype.onError);
        }
        else {

            var image = obj.image; 
            var mtl = obj.mtl;
            THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.load( 'images/'+mtl , function( materials ) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.load( 'images/'+image, function ( object ) {

                    object.position.set(obj.pos[0], obj.pos[1], obj.pos[2]);
                    object.name = obj.name;
                    scene.add(object);
                    // if(object.name == 'mothership'){
                    //     V3D.startRender = 1;}
                    V3D.startRender +=1;
                }, V3D.View.prototype.onProgress, V3D.View.prototype.onError);
            });
        }
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
    randMinMax: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    log: function(atxt, aval) {
        if(typeof(aval) == 'ojbect') {
            console.log(atxt);console.log(aval);
        }
        else {
            console.log(atxt + ' ' + aval); 
        }
    }

}


return V3D;

});

//----------------------------------
//  LOADER IMAGE/SEA3D
//----------------------------------

// POOL move to sea3D is more logical