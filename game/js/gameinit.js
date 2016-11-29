define(['oimo', 'v3d'], function(OIMO,V3D) {

    "use strict";
      
    return function () {   

    //////////////////////////
    //****Three Variables****//
    //////////////////////////
    

    // container to hold three.js objects
    var meshs = [];
    var meshNum = 0;
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


    var socket;
    var gameUUID;
    var prs;


    var perf;

    // container to hold oimo objects
    var bodys = [];
    var bodysNum = 0;
    

    // var tmpRot = 10;

    var containerMesh;
    var sightMesh;
    // radius of the ship
    var shp1r = 0.1;


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

    // var dw;
    // var te;
    // var td;
    // var dronesupdated = 1;

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
                meshNum = 0;
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

            },
            oimoLoop: function() {  

                // if ( window.Worker ) {
                //     dw = new Worker('js/updatedrone.js');
        
                //     dw.onmessage = function(msg) {

                //         var view = new DataView(msg.data, 0, msg.data.byteLength);
                //        var rdd = td.decode(view);
                //         rdd = rdd.split('/');
                //         for(var i=0;i<rdd.length;i+=7){
                //             rdd[i+2] = JSON.parse(rdd[i+2]);
                //             rdd[i+3] = JSON.parse(rdd[i+3]);
                //             rdd[i+5] = JSON.parse(rdd[i+5]);
                //             rdd[i+6] = JSON.parse(rdd[i+6]);
                //         }

                //         for(var i=0; i<rdd.length;i+=7){
                //                 if ( rdd[i+1] == 'true'  ) {
                //                     // rdd += '['+ldh+']/'+'['+rblv+']/'+'['+bincount+']/'+'['+drota+']/';
                //                     var id = parseInt(rdd[i]);
                //                     bodys[id].ld = rdd[i+1];
                //                     bodys[id].ldh.x = rdd[i+2][0],bodys[id].ldh.y = rdd[i+2][1],bodys[id].ldh.z = rdd[i+2][2];
                //                     bodys[id].body.linearVelocity.x = rdd[i+3][0],bodys[id].body.linearVelocity.y = rdd[i+3][1],bodys[id].body.linearVelocity.z = rdd[i+3][2];
                //                     bodys[id].bincount = rdd[i+4];
                //                     bodys[id].drota = rdd[i+5];
                //                     bodys[id].body.newOrientation.x = rdd[i+6][0],bodys[id].body.newOrientation.y = rdd[i+6][1],bodys[id].body.newOrientation.z = rdd[i+6][2],bodys[id].body.newOrientation.s = rdd[i+6][3];
                //                 }
                //         }

                //         dronesupdated = 1;

                //         console.log('message received'); 

                //     }

                //     dw.onerror = function(error){
                //         console.log('web worker error');
                //         // console.log(error); 
                //     }
                // }
                // else {
                //     // handle exception for now web worker
                // }    

                    function render(){

                        requestAnimationFrame( render );
                        worldcount += 0.00001;

                      if(!V3D.bincam){var numobj = 7};
                      if(V3D.bincam){var numobj = 8};  
                      if( !pause && V3D.startRender == numobj ){  
                            // reset bodies to dispose array
                            var btd = []
                            world.step();
                            v3d.render();

                            anibincnt == 5 ? anibincnt =0 : anibincnt += 1;


                            // var dd = '['+bodys[0].body.position.x+','+bodys[0].body.position.y+','+bodys[0].body.position.z+']';
                            // for(i=0; i<bodys.length;i++){
                            //     if (bodys[i].name == 'drone'){

                            //         dd += '/'+i;
                            //         dd += '/['+bodys[i].body.linearVelocity.x+','+bodys[i].body.linearVelocity.y+','+bodys[i].body.linearVelocity.z+']';
                            //         dd += '/['+bodys[i].body.position.x+','+bodys[i].body.position.y+','+bodys[i].body.position.z+']';
                            //         dd += "/["+bodys[i].ldh.x+","+bodys[i].ldh.y+","+bodys[i].ldh.z+"]";  
                            //         dd += '/'+bodys[i].ld;
                            //         dd += '/'+bodys[i].drota;
                            //         dd += '/'+bodys[i].bincount;


                            //     }                    
                            // }
                            // var uint8_array = te.encode(dd);
                            // var array_buffer = uint8_array.buffer;
                            // dw.postMessage(array_buffer, [array_buffer]);
                          //  dw.postMessage('a');







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
                               for(var i=0;i<v3d.scene.children.length;i++){
                                    if(v3d.scene.children[i].name != 'containerMesh'){
                                        if( v3d.scene.children[i].name == 'drones' ) {
                                            var drones = v3d.scene.children[i].children;
                                            for(var j=0;j<drones.length;j++) {
                                                drones[j].userData.dpcnt = v3d.randMinMax(0,290);
                                                drones[j].userData.bincount = 0;
                                                meshs.push(drones[j]);
                                                meshNum +=1;
                                            }
                                        }
                                        if( v3d.scene.children[i].name == 'mothership' ){
                                            meshs.push(v3d.scene.children[i]);
                                            meshNum +=1;
                                        }
                                        if( v3d.scene.children[i].type == 'Mesh' && v3d.scene.children[i].name != 'sight' ) {
                                             meshs.push(v3d.scene.children[i]);
                                             meshNum +=1;
                                        }
                                    }
                                    else {
                                        v3d.containerMesh = v3d.scene.children[i];
                                        containerMesh = v3d.scene.children[i];
                                    }
                               }
                            }
                                if(V3D.exdrone3.userData.active){
                                    for(var i=1; i <V3D.exdrone3.children.length; i++) {

                                            var points = v3d.expart();
                                            var numArr = points.geometry.attributes.position.array.length;
                                            while(numArr>2) {
                                                points.geometry.attributes.position.array[numArr-3] = V3D.exdrone3.children[i].position.x;
                                                points.geometry.attributes.position.array[numArr-2] = V3D.exdrone3.children[i].position.y;
                                                points.geometry.attributes.position.array[numArr-1] = V3D.exdrone3.children[i].position.z;
                                                numArr-=3;

                                            }
                                            points.userData.timecreated = worldcount;
                                            V3D.grouppart.add(points);
                                        V3D.exdrone3.children[i].geometry.dispose();
                                        V3D.exdrone3.remove(V3D.exdrone3.children[i])
                                    }
                                    V3D.exdrone3.userData.active = false;

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
                            var name1 = 'drone';
                            var name2 = 'phaser';
                            var contact = world.contacts;
                            while(contact!==null){
                                n1 = contact.body1.name || ' ';
                                n2 = contact.body2.name || ' ';
                                if((n1==name1 && n2==name2) || (n2==name1 && n1==name2)){ 
                                   if(contact.touching) {
                                       if(contact.shape1.proxy && contact.shape2.proxy){
                                            btd.push(contact.shape1.id);
                                            btd.push(contact.shape2.id); 
                                       }
                                   }
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
                                    var expart = V3D.grouppart.children[i].geometry.attributes.position.array;
                                    for(var numArr = 0; numArr< expart.length; numArr++){
                                        var num = Math.random();
                                        if( numArr % 2 === 0 ){
                                            num *= -1;
                                        }
                                         V3D.grouppart.children[i].geometry.attributes.position.array[numArr] += num;
                                    }
                                    V3D.grouppart.children[i].geometry.attributes.position.needsUpdate = true;
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
                                        if( worldcount - mesh.userData.timealive > 0.002 ){
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
                                if ( btd.indexOf(body.body.shapes.id) != -1 ) {
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
                            }

                            if(keys.length > 0){
                                if(keys[38] && keys[32] === undefined){
                                    v3d.addForce();
                                }
                                if(keys[40] && keys[32] === undefined){
                                    v3d.minusForce();
                                }
                                //if(keys[32] || false){
                                if(keys[32] && keys[38] === undefined && keys[40] === undefined){
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
                            }
                            v3d.updateSightPos();
                            // update drones 

                            var db = {body:[],drone:[]};
                            for(var i=0;i<bodys.length;i++){
                                var dbody = bodys[i];
                                if(dbody.name == 'drone') {
                                    if( dbody.ld ) {
                                        v3d.updateDrones( dbody.body, meshs[i] );
                                    }
                                    if ( !dbody.ld && !dbody.rtm && dbody.name == 'drone' ) {
                                        pddist.sub(containerMesh.position,meshs[i].position);
                                        if(pddist.length() < 1500) {
                                            dbody.ld = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    render();    
            },

            populate: function(n) {

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
                    w = 25;
                    h = 25;
                    d = 25;

                var spheres = [{ type: 'sphere', size: [shp1r, shp1r, shp1r], pos:[0,0,0], move: 'true', noSleep: true, world: world, color: 0xffffff , wireframe: 'false', name:"shp1", transparent: 'true', opacity: 0},
                               { type: 'sphere', size:[8, 8, 8], pos:[0,0,0], move: 'true', world: world, color: '#ff0000', wireframe: 'false',  name: 'containerMesh', transparent: 'false', opacity: 1, image:'cpv/cpv.obj', mtl:'cpv/cpv.mtl'},
                               { type: 'sphere', size:[500, 500, 500], pos:[500,10,-10000], move: 'true', world: world, color: '#0000ff', wireframe: 'false',  name: 'planet', transparent: 'false', opacity: 1, image:'planets/mercury.jpg'},
                               { type: 'sphere', size:[500, 500, 500], pos:[500,10,10000], move: 'true', world: world, color: '#0000ff', wireframe: 'false',  name: 'planet', transparent: 'false', opacity: 1, image:'planets/moon.jpg'}];


               if(!V3D.bincam) {

                    spheres[1].image = 0;
                    spheres[1].mtl = 0;


               }
                var target;
                for( var i=0; i<spheres.length; i++) {
                    //var sphere =  {size:spheres[i].size, pos:spheres[i].pos, move:spheres[i].move,world:world, name:spheres[i].name, image: spheres[i].image};
                    if(spheres[i].name != 'containerMesh'){
                        bodys[bodysNum] = new OIMO.Body(spheres[i]);
                        v3d.addSphere(spheres[i]);
                        v3d.setBodys(bodys[bodysNum]);
                        bodysNum += 1;
                       // meshNum +=1;
                    }
                    if(spheres[i].name == 'containerMesh'){
                      //  containerMesh = v3d.addSphere(spheres[i]);
                      v3d.addSphere(spheres[i]);
                    }
                }
                // sight mesh
                sightMesh = { type: 'box', size: [15, 15, 0.5], pos:[0,0,-100], move: 'true', world: world, color:'#66ff33', wireframe: 'false', name: 'sight', transparent: 'true', opacity: 0, image:'sight_1.png'};
                sightMesh = v3d.addBox(sightMesh);
               


                    //ms mothership
               var ms = { type: 'box', size:[5,1,1], pos:[200,0,-2000], move: 'false', world: world, color: '#ff0000', wireframe: 'false',  name: 'mothership', transparent: 'false', opacity: 0, image:'ms/ds.obj', mtl:'ms/ds.mtl'};
               bodys[bodysNum] = new OIMO.Body(ms);
               v3d.addBox(ms);
               bodysNum += 1;
               

               var t = 3;
               var cylArr = [];
               for(var i=0;i<n;i++){
                    x = this.randMinMax(-1000,1000);
                    y = this.randMinMax(-1000,1000);
                    z = this.randMinMax(-1000,1000);


                    //ms mothership
                    x += ms.pos[0];
                    y += ms.pos[1];
                    z += ms.pos[2];



                  // // t === 2 ? t=3 : t=2 ;
                    if(t===2) obj = { type:'box', size:[w,h,d], pos:[x,y,z], move: true, world:world, color:'#66ff33', wireframe: 'false', name: 'boxTarget', transparent: 'false', opacity: 1, image:''};
                    if(t===3) obj = { type:'cylinder', size:[w,h,d], pos:[x,y,z], move: true, world:world, color:'#66ff33', wireframe: 'false', name: 'drone', transparent: 'false', opacity: 1, image:'Free_Droid/bake.obj'};

                    bodys[bodysNum] = new OIMO.Body(obj);
                    bodys[bodysNum].ld = false;
                   // bodys[bodysNum].rtm = false;
                    bodys[bodysNum].drota = 0;
                   // bodys[bodysNum].ldh = {x:0,y:0,z:0};

                 //  bodys[bodysNum].body.position.set(0,0,-1);


                    if(t == 2) {
                       // meshs[meshNum] = v3d.addBox(obj);
                    }
                    else {
                       // meshs[meshNum] = v3d.addCylinder(obj);
                       cylArr.push(obj);

                    }
                    bodysNum += 1;
               }
               v3d.addCylinder(cylArr);


               var exdrones = [{ type: 'cylinder', move: 'true', world: world, name: 'exdrone1', transparent: 'false', opacity: 1, image:'ani/exdrone1.obj',mtl:'images/ani/BaseMaterial_normal.png'},
                              { type: 'cylinder', move: 'true', world: world, name: 'exdrone2', transparent: 'false', opacity: 1, image:'ani/exdrone2.obj',mtl:'images/ani/BaseMaterial_normal.png'},
                              { type: 'cylinder', move: 'true', world: world, name: 'exdrone3', transparent: 'false', opacity: 1, image:'ani/exdrone3.obj',mtl:'images/ani/BaseMaterial_normal.png'}];
               for(var i=0;i<exdrones.length;i++){
                  v3d.addCylinder(exdrones[i]);
               }



            var phaser = { type: 'sphere', move: 'true', world: world, name:'phasers', transparent: 'false', opacity: 1, image:'phasers/phaser.obj', texture:'images/phasers/fb.jpg'};
            v3d.addSphere(phaser);



            var dphaser = { type: 'sphere', move: 'true', world: world, name:'dphasers', transparent: 'false', opacity: 1, image:'phasers/dphaser.obj', texture:'images/phasers/bluefire.png'};
            v3d.addSphere(dphaser);

            

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
            }
        }
    }
});

