define(['oimo', 'v3d'], function(OIMO,V3D) {

    "use strict";
      
    return function () {   

    //////////////////////////
    //****Three Variables****//
    //////////////////////////
    

    // container to hold three.js objects
    var meshs = [];
    var meshNum = 0;
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
    var shp1r = 7.5;
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
    var reverse = false;



        return {

            createWorld: function(timestep){

                 // create oimo world contains all rigidBodys and joint.
                world = new OIMO.World( timestep, boardphase, Iterations, noStat );
                world.worldscale(100);
                // you can chooseworld gravity 
                world.gravity = new OIMO.Vec3(0, 0, 0);


            },
            oimoLoop: function() {  
                if(!pause){  
                   world.step();// updateworld
                   v3d.render();


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

                                containerMeshPrev.copy(containerMesh.position);
                                containerMesh.position.copy(body.getPosition());
                               var tmpPosX = (containerMesh.position.x - containerMeshPrev.x);
                               var tmpPosY = (containerMesh.position.y - containerMeshPrev.y);
                               var tmpPosZ = (containerMesh.position.z - containerMeshPrev.z); 



                                v3d.camera.position.x += tmpPosX;
                                v3d.camera.position.y += tmpPosY; 
                                v3d.camera.position.z += tmpPosZ;
                                if(v3d.startRot.rot){
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

                            // change material
                            if(mesh.material.name === 'sbox') mesh.material = v3d.mats.box;
                            if(mesh.material.name === 'ssph') mesh.material = v3d.mats.sph; 

                            // }
                        } 
                        else {
                        //    if(mesh.material.name === 'box') mesh.material = v3d.mats.sbox;
                         //   if(mesh.material.name === 'sph') mesh.material = v3d.mats.ssph;
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
                    w = 15;
                    h = 15;
                    d = 15;

                var spheres = [{ type: 'sphere', size: [shp1r, shp1r, shp1r], pos:[0,0,0], move: 'true', world: world, color:'#66ff33', wireframe: 'false', name:"shp1", transparent: 'false', opacity: 1},
                               { type: 'sphere', size:[8, 8, 8], pos:[0,0,0], move: 'true', world: world, color: '#ff0000', wireframe: 'false',  name: 'containerMesh', transparent: 'false', opacity: 1, image:'shp1.jpg'},
                               { type: 'sphere', size:[500, 500, 500], pos:[500,10,-10000], move: 'true', world: world, color: '#0000ff', wireframe: 'false',  name: 'planet', transparent: 'false', opacity: 1, image:'planet_1.png'},
                               { type: 'sphere', size:[500, 500, 500], pos:[500,10,10000], move: 'true', world: world, color: '#0000ff', wireframe: 'false',  name: 'planet', transparent: 'false', opacity: 1, image:'planet_2.jpg'}];


                var target;
                for( var i=0; i<spheres.length; i++) {
                    //var sphere =  {size:spheres[i].size, pos:spheres[i].pos, move:spheres[i].move,world:world, name:spheres[i].name, image: spheres[i].image};
                    if(spheres[i].name != 'containerMesh'){
                        bodys[bodysNum] = new OIMO.Body(spheres[i]);
                        meshs[meshNum] = v3d.addSphere(spheres[i]);
                        bodysNum += 1;
                        meshNum +=1;
                    }
                    if(spheres[i].name == 'containerMesh'){
                        containerMesh = v3d.addSphere(spheres[i]);
                    }
                }
                sightMesh = { type: 'box', size: [15, 15, 0.5], pos:[0,0,-100], move: 'true', world: world, color:'#66ff33', wireframe: 'false', name: 'sight', transparent: 'false', opacity: 1, image:'basic_gunsight.gif'};
                sightMesh = v3d.addBox(sightMesh);

               // var t = 2;
               // for(var i=0;i<n;i++){
               //     t === 2 ? t=3 : t=2 ;
               //     if(t===2) obj = { type:'box', size:[w,h,d], pos:[x,y,z], move:true,world:world, name:'box1' };
               //     if(t===3) obj = { type:'cylinder', size:[w,h,w, w,h,w, w,h,w, w,h,w], pos:[x,y,z], rot:[0,0,0, 0,45,0, 0,22.5,0, 0,-22.5,0], move:true,world:world };

               //      bodys[bodysNum] = new OIMO.Body(obj);
               //      meshs[meshNum] = v3d.add(obj);
               //      bodysNum += 1;
               //      meshNum +=1

               //      x = this.randMinMax(-5000,5000);
               //      y = this.randMinMax(-5000,5000);
               //      z = this.randMinMax(-5000,5000);
               // }
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

