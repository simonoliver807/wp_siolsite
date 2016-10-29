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
    var exmesh = ['sight','hemlight','dirlight','containerMesh']
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

    var perf;
    

    // // three.js view with geometrys and materials ../js/v3d.js
    // var v3d = new V3D.View();
    // v3d.initLight();

    // container to hold oimo objects
    var bodys = [];
    var bodysNum = 0;
    
    var thisPerf;


    var tmpRot = 10;



    // my variables GLOBAL
    var containerMesh;
    var sightMesh;
    // radius of the ship
    var shp1r = 0.1;
    //var proBox;
    var tmp;

    var prevAngle;
    var prevCamVector;
    var camAngle = 0.01;
    var tmpVCPprev = new OIMO.Vec3(0,0,100);
    var tmppbprev = new OIMO.Vec3(0,0,-100);
    var axis = new OIMO.Vec3(0,1,0);
    var canvasCentreX = v3d.w/2;
    var canvasCentreY = v3d.h/2;
    // ratio needs to be worked out canvasCentreX divided by camera width  
    var ratio = 0.73;

    var newForce = 0;

    var containerMeshPrev;
    containerMeshPrev = new OIMO.Vec3(0,0,0)
    var canvas = document.getElementById('container');
    var keys = [];


        return {

            createWorld: function(timestep){

                 // create oimo world contains all rigidBodys and joint.
                world = new OIMO.World( timestep, boardphase, Iterations, noStat );
                world.worldscale(100);
                // you can chooseworld gravity 
                world.gravity = new OIMO.Vec3(0, 0, 0);
                v3d.setWorld(world);
                v3d.addPhaser = function(body, sphere) {
                    bodys[bodysNum] = new OIMO.Body(body);
                    meshs[meshNum] = sphere
                    bodysNum += 1;
                    meshNum +=1;
                    return bodys[bodysNum -1];
                }
                containerMesh = 0;

            },
            oimoLoop: function() {  
                if( !pause && V3D.startRender ){  


                   world.step();// updateworld
                   v3d.render();

                   if(!containerMesh){
                        for(var i=0;i<v3d.scene.children.length;i++){
                            if(exmesh.indexOf(v3d.scene.children[i].name) === -1){
                                meshs.push(v3d.scene.children[i]);
                                console.log('name ' + meshs[meshNum].name);
                                 meshNum +=1;
                            }
                       }
                       var scl = v3d.scene.children.length - 1;
                       v3d.containerMesh = v3d.scene.children[scl];
                       containerMesh = v3d.scene.children[scl];
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
                                    world.removeShape(contact.shape1);
                                    world.removeShape(contact.shape2);
                                    v3d.scene.remove(meshs[contact.shape1.id]);
                                    v3d.scene.remove(meshs[contact.shape2.id]);
                                }
                            }
                        }
                        contact = contact.next;
                    }


                  // console.log('perf fps: ' + perf.fps); 

                   // var x, y, z, mesh, body;

                   var mesh, body;

                    var i = bodys.length;
                    while (i--){
                        body = bodys[i];
                        mesh = meshs[i];

                        
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


                                // proBox.position.x += tmpPosX;
                                // proBox.position.y += tmpPosY; 
                                // proBox.position.z += tmpPosZ;
                                // if(v3d.startRot.rot){
                                //    // v3d.log('rot started', 'proBox');
                                //     proBox.position.x += v3d.pbrot.x;
                                //     proBox.position.y += v3d.pbrot.y;
                                //     proBox.position.z += v3d.pbrot.z;
                                //     proBox.lookAt( containerMesh.position );
                                // };


                            }
                        } 
                    }
                    if(keys){
                        if(keys[38]){
                            v3d.addForce();
                        }
                        if(keys[40]){
                            v3d.minusForce();
                        }
                        if(keys[32] || false){
                            v3d.phaser();
                        }
                        if(keys[32] && keys[38]){
                            v3d.addForce();
                            v3d.phaser();
                        }
                    }
                    v3d.updateSightPos();
                }
            },

            populate: function(n) {
                var obj;

                perf = new OIMO.Performance(world);

                //add random objects
                var x, y, z, w, h, d, t;
                
                    x = 500;
                    z = -1500;
                    y = 100;
                    w = 20;
                    h = 20;
                    d = 20;

                var spheres = [{ type: 'sphere', size: [shp1r, shp1r, shp1r], pos:[0,0,0], move: 'true', world: world, color: 0x0000ff , wireframe: 'true', name:"shp1", transparent: 'true', opacity: 0.5},
                               { type: 'sphere', size:[8, 8, 8], pos:[0,0,0], move: 'true', world: world, color: '#ff0000', wireframe: 'false',  name: 'containerMesh', transparent: 'false', opacity: 1, image:'cpv/cpv.obj'},
                               { type: 'sphere', size:[500, 500, 500], pos:[500,10,-10000], move: 'true', world: world, color: '#0000ff', wireframe: 'false',  name: 'planet', transparent: 'false', opacity: 1, image:'planet_1.png'},
                               { type: 'sphere', size:[500, 500, 500], pos:[500,10,10000], move: 'true', world: world, color: '#0000ff', wireframe: 'false',  name: 'planet', transparent: 'false', opacity: 1, image:'planet_2.jpg'}];


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
                sightMesh = { type: 'box', size: [15, 15, 0.5], pos:[0,0,-10], move: 'true', world: world, color:'#66ff33', wireframe: 'false', name: 'sight', transparent: 'true', opacity: 0, image:'sight_1.png'};
                sightMesh = v3d.addBox(sightMesh);

               var t = 3;
               var cylArr = []
               for(var i=0;i<n;i++){
                  // t === 2 ? t=3 : t=2 ;
                   if(t===2) obj = { type:'box', size:[w,h,d], pos:[x,y,z], move: true, world:world, color:'#66ff33', wireframe: 'false', name: 'boxTarget', transparent: 'false', opacity: 1, image:''};;
                   if(t===3) obj = { type:'cylinder', size:[w,h,d], pos:[x,y,z], move: true, world:world, color:'#66ff33', wireframe: 'false', name: 'drone', transparent: 'false', opacity: 1, image:'Free_Droid/bake.obj'};;

                    bodys[bodysNum] = new OIMO.Body(obj);
                    if(t == 2) {
                       // meshs[meshNum] = v3d.addBox(obj);
                    }
                    else {
                       // meshs[meshNum] = v3d.addCylinder(obj);
                       cylArr.push(obj);

                    }
                    bodysNum += 1;
                    //meshNum +=1

                    x = this.randMinMax(-5000,5000);
                    y = this.randMinMax(-5000,5000);
                    z = this.randMinMax(-5000,5000);
               }
               v3d.addCylinder(cylArr);
            },
            addPhaser: function(body, sphere){

                bodys[bodysNum] = new OIMO.Body(body);
                meshs[meshNum] = sphere
                bodysNum += 1;
                meshNum +=1;
                return bodys[bodysNum -1];
                
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
                for(let i = 0; i<bodys.length;i++){
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

