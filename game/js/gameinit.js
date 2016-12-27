define(['oimo', 'v3d'], function(OIMO,V3D) {

    "use strict";
      
    return function () {   

    //////////////////////////
    //****Three Variables****//
    //////////////////////////
    


    // non physics object to exclude from mesh array
   // var exmesh = ['sight','hemlight','dirlight','containerMesh','points']
    var pause = 0;
    var v3d = new V3D.View();
    
    //////////////////////////
    //****Oimo Variables****//
    //////////////////////////

    // Algorithm used for collision
    // 1: BruteForceBroadPhase  2: sweep and prune  3: dynamic bounding volume tree
    // default is 2 : best speed and lower cpu use.
    var boardphase = 2;

    // The number of iterations for constraint solvers : default 8.
    var Iterations = 8;

    // calculate statistique or not
    var noStat = false;

    var world;
    var worldcount = 0;

    var levels = [];
    var currlevel = 1;      //*************************************
    var startlevel = 1;     //*************************************


    var socket;
    var gameUUID;
    var prs;


    var perf;

    // container to hold oimo objects
    var bodys = [];
    var bodysNum = 0;
    var meshs = [];
    var meshNum = 0;
    

    // var tmpRot = 10;

    var containerMesh;
    var sightMesh;
    // radius of the ship
    var shp1r = 50;


    var prevAngle;
    var prevCamVector;
    var camAngle = 0.01;
    var axis = new OIMO.Vec3(0,1,0);
    var canvasCentreX = v3d.w/2;
    var canvasCentreY = v3d.h/2;

    var containerMeshPrev;
    containerMeshPrev = new OIMO.Vec3(0,0,0)
    var canvas = document.getElementById('container');
    var keys = [];
    var pddist = new OIMO.Vec3();

    var perfcont;

    var anibincnt;

    var mapcm = v3d.tvec(0,0,0);
    var mapms = v3d.tvec(0,0,0);
    var mapel1 = document.getElementById('mapms1');
    var mapel2 = document.getElementById('mapms2');
    var mapel;
    var gmap = document.getElementById('gmap');
    var anglems1 = 1;
    var anglems2 = 1;

    var ms1len = 0;
    var ms2len = 0;

    var numofdrone = 0;
    var endsequence = 0;

    var halfdiamplanet = 0;


    // var ms1phaser = 0;
    // var ms2phaser = 0;
    var numobj = 0;
    var self;

        return {

            createWorld: function(timestep){

                // socket = io('http://localhost:9000');
                // socket.on('gamestart', function (data) {
                //     gameUUID = data['id'];
                //     console.log('gu ' + gameUUID); 
                // });
                 // create oimo world contains all rigidBodys and joint.

                world = new OIMO.World( timestep, boardphase, Iterations, noStat );
                world.worldscale(100);
                world.gravity = new OIMO.Vec3(0, 0, 0);
                v3d.setWorld(world);
                bodysNum = 0;
                v3d.addPhaser = function(body, phaser) {
                    bodys[bodys.length] = new OIMO.Body(body);
                    meshs[meshs.length] = phaser;
                    return bodys[bodys.length -1];
                }
                containerMesh = 0;
                prs = [{id:'temp1',gameid:12345,posx:0,posy:0,posx:0,rotx:0,roty:0,rotz:0}];

                perfcont = document.getElementById('perf');
                perf = 0;
                anibincnt = 1;
                endsequence = 100;
                self = this;


            },
            oimoLoop: function() {  

                    function render(){

                        if( endsequence !== 0 ){
                            requestAnimationFrame( render );
                        }
                        else {
                            console.log('end of level');
                            self.startnext();
                        }
                        if(numofdrone == 0 && V3D.ms1_1arrpos == 99){
                            endsequence -= 1;
                        }
                        worldcount += 0.00001;


                      if( !pause && V3D.startRender == numobj ){  
                            // reset bodies to dispose array
                            var btd = []
                            world.step();
                            v3d.render();


                          //  bodys[2].body.angularVelocity = new OIMO.Vec3( 0,0.1,0);

                            anibincnt == 5 ? anibincnt =0 : anibincnt += 1;

                            //prs = [];
                            // socket.emit('getgd', gameUUID);
                            // socket.on('sgd', function(gdarr){ 

                            //     prs = gdarr;

                            // });
                            // if( prs.length > 1 ) {
                            //     for(var i=0;i<prs.length;i++){

                            //         prs[i]['posx'] = 1;

                            //     }
                            //     socket.emit('setgd', prs);
                            // }

                           if(!containerMesh){
                               document.getElementById('loadingScreen').style.display = 'none';  
                               var dist = v3d.tvec();                             
                               // make sure the two mesh and body array match
                                   // container to hold three.js objects
                                    for(var b = 0; b < bodys.length; b++){
                                        for(var i =0; i < v3d.scene.children.length ; i++){
                                            if(bodys[b].name == v3d.scene.children[i].name){

                                                    meshs.push(v3d.scene.children[i]);

                                                    if(bodys[b].name == 'ms1' || bodys[b].name == 'ms2'){

                                                        var q = v3d.msla(bodys[b].body);
                                                        bodys[b].body.setQuaternion(q);
                                                        // for(var n=0; n < v3d.scene.children.length; n++){
                                                        //     if(v3d.scene.children[n].name == 'mothershipbb1' && bodys[b].body.name == 'ms1'){
                                                        //         v3d.scene.children[n].quaternion.set( q.x,q.y,q.z,q.w); 
                                                        //     }
                                                        //      if(v3d.scene.children[n].name == 'mothershipbb2' && bodys[b].body.name == 'ms2'){
                                                        //         v3d.scene.children[n].quaternion.set( q.x,q.y,q.z,q.w); 
                                                        //     }
                                                        // }
                                                      //  bodys[b].body.setupMass(0x2);
             
                                                    }
                                                    break;
                                            }
                                            if(v3d.scene.children[i].name == 'drones') {
                                                v3d.dronenum = i;
                                            }
                                            if(v3d.scene.children[i].name == 'containerMesh'){
                                                var contmeshnum = i;
                                            }
                                            if(v3d.scene.children[i].name == 'ms1'){
                                                v3d.ms1arrpos = i;
                                                v3d.scene.children[i].children[0].add(V3D.ms1phaser);
                                                dist.subVectors(v3d.planetpos, v3d.scene.children[v3d.ms1arrpos].position );
                                                ms1len = dist.length();
                                                ms1len -= halfdiamplanet; // minus half the diameter of the planet

                                            }
                                            if(v3d.scene.children[i].name == 'ms2'){
                                                v3d.ms2arrpos = i;
                                                v3d.scene.children[i].children[0].add(V3D.ms2phaser);
                                                dist.subVectors(v3d.planetpos, v3d.scene.children[v3d.ms2arrpos].position );
                                                ms2len = dist.length();
                                                ms2len -= halfdiamplanet; // minus half the diameter of the planet
                                            }
                                            if(v3d.scene.children[i].name == 'ms1_1'){
                                                v3d.ms1_1arrpos = i;
                                            }

                                        }
                                    }
                                    for(var i = 0; i < v3d.scene.children[v3d.dronenum].children.length;i++){
                                        meshs.push(v3d.scene.children[v3d.dronenum].children[i]);
                                    }
                                    v3d.containerMesh = v3d.scene.children[contmeshnum];
                                    containerMesh = v3d.scene.children[contmeshnum];
                                    meshNum = meshs.length;
                                }



                            
                                if(V3D.exdrone3.userData.active){
                                    for(var i=1; i <V3D.exdrone3.children.length; i++) {

                                            var points = v3d.expart();
                                            for(var p = 0; p < points.geometry.vertices.length; p++){
                                                points.geometry.vertices[p].x = V3D.exdrone3.children[i].position.x;
                                                points.geometry.vertices[p].y = V3D.exdrone3.children[i].position.y;
                                                points.geometry.vertices[p].z = V3D.exdrone3.children[i].position.z;
                                            }
                                            points.userData.timecreated = worldcount;
                                            V3D.grouppart.add(points);
                                        V3D.exdrone3.children[i].geometry.dispose();
                                        V3D.exdrone3.remove(V3D.exdrone3.children[i])
                                    }
                                    V3D.exdrone3.userData.active = false;
                                    numofdrone -= 1;

                                }
                                if(V3D.exdrone2.userData.active){
                                    for(var i=1; i <V3D.exdrone2.children.length; i++) {
                                        var exdrone = V3D.exdrone3.children[0].clone();
                                        exdrone.position.set(V3D.exdrone2.children[i].position.x,V3D.exdrone2.children[i].position.y,V3D.exdrone2.children[i].position.z);
                                        exdrone.quaternion.set(V3D.exdrone2.children[i].quaternion.x,V3D.exdrone2.children[i].quaternion.y,V3D.exdrone2.children[i].quaternion.z,V3D.exdrone2.children[i].quaternion.w);
                                        exdrone.visible = true;
                                        V3D.exdrone3.children.push(exdrone);
                                        V3D.exdrone3.userData.active = true;
                                        V3D.exdrone2.children[i].geometry.dispose();
                                        V3D.exdrone2.remove(V3D.exdrone2.children[i])
                                    }

                                    V3D.exdrone2.userData.active = false;
                                }
                                  if(V3D.exdrone1.userData.active){
                                    for(var i=1; i <V3D.exdrone1.children.length; i++) {
                                        var exdrone = V3D.exdrone2.children[0].clone();
                                        exdrone.position.set(V3D.exdrone1.children[i].position.x,V3D.exdrone1.children[i].position.y,V3D.exdrone1.children[i].position.z);
                                        exdrone.quaternion.set(V3D.exdrone1.children[i].quaternion.x,V3D.exdrone1.children[i].quaternion.y,V3D.exdrone1.children[i].quaternion.z,V3D.exdrone1.children[i].quaternion.w);
                                        exdrone.visible = true;
                                        V3D.exdrone2.children.push(exdrone);
                                        V3D.exdrone2.userData.active = true;

                                        V3D.exdrone1.children[i].geometry.dispose();
//   V3D.exdrone1.children[i].material.dispose();
                                        V3D.exdrone1.remove(V3D.exdrone1.children[i])
                                   // V3D.exdrone1.children.splice(1,V3D.exdrone1.children.length);

                                    }
                                    V3D.exdrone1.userData.active = false;
                                }

                            var n1, n2;
                            // var name1 = 'drone';
                            // var name2 = 'phaser';
                            var name3 = 'shp1';
                            var name4 = 'dphaser';
                            // var name5 = 'ms1';
                            // var name6 = 'ms2';
                            var contact = world.contacts;
                            while(contact!==null){
                                if(contact.body1 != null && contact.body2 != null){
                                    n1 = contact.body1.name || ' ';
                                    n2 = contact.body2.name || ' ';
                                   // if((n1==name1 && n2==name2) || (n2==name1 && n1==name2)){ 
                                     //  if(contact.touching) {
                                          // if(contact.shape1.proxy && contact.shape2.proxy){
                                          //      btd.push(contact.shape1.id);
                                        //        btd.push(contact.shape2.id); 
                                      //          world.removeContact(contact);
                                        //   }
                                      // }
                                    //}
                                    if((n1==name3 && n2==name4) || (n2==name3 && n1==name4)){
                                        console.log('collision');
                                    } 
                                    //  if((n1==name2 && n2==name5) || (n2==name2 && n1==name5)){
                                    //         ms1y = 1;
                                    //         world.removeContact(contact);
                                    // }
                                    // if((n1==name2 && n2==name6) || (n2==name2 && n1==name6)){
                                    //         ms2y = 1;
                                    //          world.removeContact(contact);
                                    // }

                                }
                                contact = contact.next;
                            }
                            for( var i = 0; i < V3D.grouppart.children.length; i++ ) {
                                if(worldcount - V3D.grouppart.children[i].userData.timecreated > 0.0008) {
                                    V3D.grouppart.children[i].geometry.dispose();
                                    V3D.grouppart.children[i].material.dispose();
                                    V3D.grouppart.remove( V3D.grouppart.children[i] );
                                }
                                else {
                                    var expart = V3D.grouppart.children[i].geometry.vertices;;
                                    for(var numarr = 0; numarr< expart.length; numarr++){
                                        var num = Math.random() * 10;
                                        if( numarr % 2 === 0 ){
                                            num *= -1;
                                        }
                                         V3D.grouppart.children[i].geometry.vertices[numarr].x += Math.random() * 10;
                                         V3D.grouppart.children[i].geometry.vertices[numarr].y += Math.random() * 10;
                                         V3D.grouppart.children[i].geometry.vertices[numarr].z += Math.random() * 10;
                                    }
                                   V3D.grouppart.children[i].geometry.verticesNeedUpdate = true;
                                }
                            }
                            

                            perf = world.performance.show();
                            perfcont.innerHTML = perf;
                          

                           // var x, y, z, mesh, body;

                           var mesh, body;

                            var i = bodys.length;
                            while (i--){
                                body = bodys[i];
                                mesh = meshs[i];

                                if( mesh.name == 'phaser' || mesh.name == 'dphaser' ) {
                                    if( mesh.userData.timealive ){
                                        if( worldcount - mesh.userData.timealive > 0.008 && mesh.name == 'dphaser' ){
                                            btd.push(bodys[i].body.shapes.id);
                                        }
                                        if( worldcount - mesh.userData.timealive > 0.000615 && mesh.name == 'phaser' ){
                                            btd.push(bodys[i].body.shapes.id);
                                        }
                                    }
                                    else {
                                        mesh.userData.timealive = worldcount;
                                    }
                                }



                                
                                if(!body.getSleep()){ // if body didn't sleep
                                    // apply rigidbody position and rotation to mesh
                                    mesh.position.copy(body.getPosition());
                                    mesh.quaternion.copy(body.getQuaternion());

                                    if(body.name == 'shp1'){

                                        containerMeshPrev.set(containerMesh.position.x,containerMesh.position.y, containerMesh.position.z);
                                        containerMesh.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
                                       var tmpPosX = (containerMesh.position.x - containerMeshPrev.x);
                                       var tmpPosY = (containerMesh.position.y - containerMeshPrev.y);
                                       var tmpPosZ = (containerMesh.position.z - containerMeshPrev.z); 



                                        v3d.camera.position.x += tmpPosX;
                                        v3d.camera.position.y += tmpPosY; 
                                        v3d.camera.position.z += tmpPosZ;
                                        if(v3d.startRot.rot !== 0){

                                            v3d.camera.position.x += v3d.camrot.x;
                                            v3d.camera.position.y += v3d.camrot.y;
                                            v3d.camera.position.z += v3d.camrot.z;
                                            v3d.camera.lookAt( containerMesh.position );
                                            
                                        };
                                        v3d.camera.updateMatrixWorld();
                                    }


                                } 
                                if ( btd.indexOf(body.body.shapes.id) != -1 || mesh.userData.tbd ) {
                                    bodys.splice(i,1);
                                    meshs.splice(i,1);
                                    var g = mesh.geometry;
                                    var m = mesh.material;
                                    g.dispose();
                                    if( typeof(m.dispose) === 'undefined' ){                 
                                            V3D.exdrone1.userData.active = true;
                                            var exdrone = V3D.exdrone1.children[0].clone();
                                            exdrone.position.set(mesh.position.x,mesh.position.y,mesh.position.z);
                                            exdrone.quaternion.set(mesh.quaternion.x,mesh.quaternion.y,mesh.quaternion.z,mesh.quaternion.w);
                                            exdrone.visible = true;
                                            V3D.exdrone1.children.push(exdrone);
                                            m.materials[0].dispose();
                                            m.materials[1].dispose();
                                            v3d.scene.children[V3D.mesharrpos.drones].remove(mesh);
                                        }
                                    else {
                                        m.dispose();
                                        if(mesh.name == 'phaser'){
                                             v3d.scene.children[V3D.mesharrpos.phasers].remove(mesh);
                                        }
                                        if(mesh.name = 'dphaser'){
                                            v3d.scene.children[V3D.mesharrpos.dphasers].remove(mesh);
                                        }
                             
                                    }
                                    world.removeRigidBody(body.body);
                                
                                }
                                if(mesh.name == 'ms1' || mesh.name == 'ms2') {
                                    if (body.msname == 'ms1') {
                                        mapel = mapel1;
                                        if(v3d.ms1y.y){
                                            mesh.children[0].material.color.setRGB(255,255,0);
                                            mesh.userData.color = worldcount;
                                            v3d.ms1y.y = 0;
                                            if(v3d.ms1y.t == 10 && V3D.ms1_1arrpos !== 99){
                                               meshs[i] = v3d.swapms(mesh);

                                            }
                                        }
                                        if(worldcount - mesh.userData.color > 0.0005 ){
                                            mesh.children[0].material.color.setRGB(0.64,0.64,0.64);
                                            mesh.userData.color = 0;

                                        }
                                    } 
                                    else {
                                          mapel = mapel2;
                                        if(v3d.ms2y){
                                            mesh.children[0].material.color.setRGB(255,255,0);
                                            mesh.userData.color = worldcount;
                                            v3d.ms2y = 0;
                                        }
                                        if(worldcount - mesh.userData.color > 0.0005 ){
                                            mesh.children[0].material.color.setRGB(0.64,0.64,0.64);
                                            mesh.userData.color = 0;

                                        }
                                    }
                                    mapcm.set(containerMesh.position.x, containerMesh.position.y, containerMesh.position.z);
                                    mapms.set(mesh.position.x,mesh.position.y,mesh.position.z);
                                        var percx = mapms.x - mapcm.x;
                                        if(percx < 4000 && percx > -4000) {
                                            percx = ((percx + 4000)/8000) * 100;
                                            mapel.style.left = percx + '%'
                                        }
                                         var percy = mapms.y - mapcm.y;
                                        if(percy < 4000 && percy > -4000) {
                                            percy = ((percy + 4000)/8000) * 100;
                                            mapel.style.top = percy + '%'
                                          //  gmap.children[2].style.top = percy + '%';
                                        }                                
                                        var heading1 = v3d.getPlayerDir('forward',containerMesh.position);
                                        var heading2 = v3d.tvec();
                                        heading2.subVectors(mapms, mapcm).normalize();

                                        body.msname == 'ms1' ? anglems1 =  Math.acos(heading1.dot(heading2)) : anglems2 =  Math.acos(heading1.dot(heading2)) ;
                                       var colorval;
                                       if(anglems1 < 0.7 || anglems2 < 0.7) {
                                           gmap.className = 'divGreen';
                                       }
                                       else {
                                            gmap.className = 'divRed';
                                       }

                                }

                            }

                            if(keys[38] && !keys[32]){
                                v3d.addForce();
                            }
                            if(keys[40] && !keys[32]){
                                v3d.minusForce();
                            }
                            //if(keys[32] || false){
                            if(keys[32] && !keys[38] && !keys[40]){
                                v3d.phaser();
                            }
                            if(keys[32] && keys[38]){
                                v3d.addForce();
                                v3d.phaser();
                            }
                            if(keys[32] && keys[40]){
                                v3d.minusForce();
                                v3d.phaser();
                            }
                            v3d.updateSightPos();
                            // update drones 

                            var db = {body:[],drone:[]};
                            for(var i=0;i<bodys.length;i++){
                                var dbody = bodys[i];
                                var drone = meshs[i];
                                if(dbody.name == 'drone') {
                                    if( drone.userData.ld ) {
                                   //   v3d.updateDrones( dbody.body, meshs[i], dbody.ms );
                                    }
                                    if ( !drone.userData.ld && !drone.userData.rtm) {
                                        pddist.sub(containerMesh.position,meshs[i].position);
                                        if(pddist.length() < 3500) {
                                            drone.userData.ld = 1;
                                        }
                                        else {
                                            dbody.body.linearVelocity.set(0,0,0);
                                            dbody.body.angularVelocity.set(0,0,0);
                                        }
                                    }
                                }
                            }
                            // update ms phasers
                            var p = 0;
                            while(p < V3D.ms1phaser.children.length){
                                if( V3D.ms1phaser.children[p].scale.z * -20 < ms1len){
                                    V3D.ms1phaser.children[p].scale.z -= 0.5;
                                    V3D.ms1phaser.children[p].position.z -= 5;
                                }
                                if(V3D.ms2phaser.children.length > 0){
                                    if( V3D.ms2phaser.children[p].scale.z * -20 < ms2len ){
                                        V3D.ms2phaser.children[p].scale.z -= 0.5;
                                        V3D.ms2phaser.children[p].position.z -= 5; 
                                    }
                                }
                                 p ++;
                            }

                        }
                    }
                    render();       
            },

            populate: function() {

                /////////////*********************////////////////
                /////////////*********************///////////////
                //////    if you update size here   /////////////
                //////     You must update size     /////////////
                //////      in the geomety          /////////////
                /////////////*********************///////////////
                /////////////*********************///////////////

                var obj;

                //add random drones
                var x, y, z, w, h, d, t;
                
                    x = 0;
                    z = 0;
                    y = 0;
                    w = h = d = 25 ;

                var spheres = [];
                var ms = [];
                numofdrone = 0;
                if(startlevel) {
                    spheres = [{ type: 'sphere', size: [shp1r, shp1r, shp1r], pos:[0,0,0], move: true, noSleep: true, world: world, color: 0xffffff , wireframe: 'false', name:"shp1", transparent: 'true', opacity: 0},
                                { type: 'sphere', size:[8, 8, 8], pos:[0,0,0], move: true, world: world, color: '#ff0000', wireframe: 'false',  name: 'containerMesh', transparent: 'false', opacity: 1, image:'cpv/cpv.obj', mtl:'cpv/cpv.mtl'}];

                    if(!V3D.bincam) {
                        spheres[1].image = 0;
                        spheres[1].mtl = 0;
                    }
                    // sight mesh
                   // sightMesh = { type: 'box', size: [15, 15, 0.5], pos:[0,0,-100], move: 'true', world: world, color:'#66ff33', wireframe: 'false', name: 'sight', transparent: 'true', opacity: 0, image:'sight_1.png'};
                   // sightMesh = v3d.addBox(sightMesh);

                   // add the sight
                   v3d.addLine();

                }
                this.levelobj = levels[0][currlevel];
                for( obj in  this.levelobj){
                    if(obj.charAt(0) == 'p'){
                        spheres.push(this.levelobj[obj]);
                    }
                    if(obj.charAt(0) == 'm'){
                        ms.push(this.levelobj[obj]);
                    }
                    if(obj == 'drone') {
                        numofdrone= this.levelobj[obj];
                    }
                }
                    

                for( var i=0; i<spheres.length; i++) {
                    if(spheres[i].name != 'containerMesh'){
                        spheres[i].world = world;
                        bodys[bodysNum] = new OIMO.Body(spheres[i]);
                        v3d.addSphere(spheres[i]);
                        v3d.setBodys(bodys[bodysNum]);
                        bodysNum += 1;
                    }
                    if(spheres[i].name == 'containerMesh'){
                      v3d.addSphere(spheres[i]);
                    }
                }
                for( var i=0; i<ms.length;i++){
                    ms[i].world = world;
                    ms[i].pos = ms[i].pos;
                    bodys[bodysNum] = new OIMO.Body(ms[i]);
                    bodys[bodysNum].msname = ms[i].msname;
                    bodysNum += 1;
                    v3d.addBox(ms[i]);
                    v3d.addBox({ "type": "box",
                                 "pos": [-5000, 0, -2000],
                                 "world": "world",
                                 "name": "ms1_1",
                                 "msname": "ms1_1",
                                 "image": "ms/ms_1.obj",
                                 "mtl": "ms/ms_1.mtl"});

                    var msphaser = {type: 'cylinder', name: 'ms'+(i+1)+'phaser', color: 0x0099ff}
                    v3d.addCylinder(msphaser);
                    var mapel;
                    ms[i].msname == 'ms1' ? mapel = mapel1 : mapel = mapel2;
                    ms[i].pos[0] > 0 ? mapel.style.left = '100%' : mapel.style.left = '0';
                    

                    //bounding box
               //      var msbb1 = { type: 'box', size:[700,300,700], pos:[-5000,0,-2000], move: true, world: world, color: 0xff0000, wireframe: 'false',  name: 'mothershipbb1', transparent: 'false', opacity: 0};
                 //   v3d.addBox(msbb1);
                    // var msbb2 = { type: 'box', size:[700,500,300], pos:[8000,0,-10000], move: true, world: world, color: 0xff0000, wireframe: 'false',  name: 'mothershipbb2', transparent: 'false', opacity: 0};
                    // v3d.addBox(msbb2);
                }

               var t = 3;
               var cylArr = [];
               var msnum = 0;
               var numofms = ms.length;
               var dpm = 0;
               

               var x =  0;

               for(var i=0;i<numofdrone;i++){
                    x = this.randMinMax(-1000,1000);
                    y = this.randMinMax(-1000,1000);
                    z = this.randMinMax(-1000,1000);

                 //   ms mothership
                    if(dpm < numofdrone/numofms){
                        x += ms[msnum].pos[0];
                        y += ms[msnum].pos[1];
                        z += ms[msnum].pos[2]; 


                           // x += 0;
                           // y = 0;
                           //    z = -3500;

                        var droneobj= { type:'cylinder', size:[w,h,d], pos:[x,y,z], move: true, world:world, noSleep: true, color:'#66ff33', wireframe: 'false', name: 'drone', transparent: 'false', opacity: 1, image:'Free_Droid/bake.obj'};
                        bodys[bodysNum] = new OIMO.Body(droneobj);
                        bodys[bodysNum].drota = 0;
                        bodys[bodysNum].ms = ms[msnum].msname;
                        cylArr.push(droneobj);
                        bodysNum += 1;
                        dpm +=1;
                    }
                    else {
                        msnum +=1;
                        dpm = 0;
                        x += ms[msnum].pos[0];
                        y += ms[msnum].pos[1];
                        z += ms[msnum].pos[2]; 
                        var droneobj= { type:'cylinder', size:[w,h,d], pos:[x,y,z], move: true, world:world, noSleep: true, color:'#66ff33', wireframe: 'false', name: 'drone', transparent: 'false', opacity: 1, image:'Free_Droid/bake.obj'};
                        bodys[bodysNum] = new OIMO.Body(droneobj);
                        bodys[bodysNum].drota = 0;
                        bodys[bodysNum].ms = ms[msnum].msname;
                        bodysNum += 1;
                        cylArr.push(droneobj);
                    }
               }
               if(startlevel){
                   v3d.addCylinder(cylArr);
                }
                else {
                    // add next level drones to scene drones

                }


               var exdrones = [{ type: 'cylinder', move: 'true', world: world, name: 'exdrone1', transparent: 'false', opacity: 1, image:'ani/exdrone1.obj',mtl:'images/ani/BaseMaterial_normal.png'},
                              { type: 'cylinder', move: 'true', world: world, name: 'exdrone2', transparent: 'false', opacity: 1, image:'ani/exdrone2.obj',mtl:'images/ani/BaseMaterial_normal.png'},
                              { type: 'cylinder', move: 'true', world: world, name: 'exdrone3', transparent: 'false', opacity: 1, image:'ani/exdrone3.obj',mtl:'images/ani/BaseMaterial_normal.png'}];
               for(var i=0;i<exdrones.length;i++){
                  v3d.addCylinder(exdrones[i]);
               }



            // var phaser = { type: 'sphere', move: 'true', world: world, name:'phasers', transparent: 'false', opacity: 1, image:'phasers/phaser.obj', texture:'images/phasers/fb.jpg'};
            // v3d.addSphere(phaser);



            var dphaser = { type: 'sphere', move: 'true', world: world, name:'dphasers', transparent: 'false', opacity: 1, image:'phasers/dphaser.obj', texture:'images/phasers/bluefire.png'};
            v3d.addSphere(dphaser);


            if(V3D.bincam){
                var laser = {type: 'cylinder', name: 'laser', color: 0x0099ff};
                v3d.addCylinder(laser);
            }
            
            numobj =  ms.length + 7;
            if(!V3D.bincam){ numobj -= 1};

            },
            getObj: function(el) {

                   switch (el) {
                    case 'bodys':
                        return bodys;
                        break;
                    case 'containerMesh': 
                        return containerMesh;
                        break;
                    case 'shp1r': 
                        return shp1r;
                        break;
                    case 'v3d':
                        return v3d;
                        break;
                    case 'world':
                        return world;
                        break;
                    case 'keys':
                        return keys;
                        break;
                    case 'levels':
                        return levels;
                        break;
                }

            },
            randMinMax: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            isSleeping: function(name) {
                for(var i = 0; i<bodys.length;i++){
                    if(bodys[i].name == name){
                        return bodys[i].getSleep();
                    }
                }
            },
            gspause: function(val) {
                if(val != undefined){
                    pause = val;
                }
                else {
                    return pause;
                }
            },
            startnext: function() {
                currlevel += 1;
                startlevel = 0;
                console.log(currlevel);
                this.populate();
            }
        }
    }
});

