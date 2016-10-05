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
    // siolsite new force
    var newForce = new OIMO.Vec3(0,0,0);
    

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
    var proBox;

    var planetMesh;
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

                    var x, y, z, mesh, body;
                    var i = bodys.length;
                    while (i--){
                        body = bodys[i];
                        mesh = meshs[i];

                        
                        if(!body.getSleep()){ // if body didn't sleep
                            // apply rigidbody position and rotation to mesh
                            mesh.position.copy(body.getPosition());
                            mesh.quaternion.copy(body.getQuaternion());

                            if(body.name == 'sph1'){
                                containerMeshPrev.copy(containerMesh.position);
                                containerMesh.position.copy(body.getPosition());
                               var tmpPosX = (containerMesh.position.x - containerMeshPrev.x);
                               var tmpPosY = (containerMesh.position.y - containerMeshPrev.y);


                                v3d.camera.position.x = containerMesh.position.x;
                                v3d.camera.position.y = containerMesh.position.y; 
                                v3d.camera.position.z = containerMesh.position.z + 100;


                                proBox.position.x += tmpPosX;
                                proBox.position.y += tmpPosY; 
                                proBox.position.z = containerMesh.position.z - 100;

                                 $('canvas').trigger('mousemove');
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
                }
            },

            populate: function(n) {
                var obj;

                thisPerf = new OIMO.Performance(world);
                //add static ground
                // obj = { size:[400, 40, 390], pos:[0,-20,0],world:world, name:'ground', flat:true }
                // new OIMO.Body(obj);
                // v3d.add(obj);

                //add random objects
                var x, y, z, w, h, d, t;
                
                    x = 500;
                    z = -1500;
                    y = 100;
                    w = 60;
                    h = 60;
                    d = 60;

                var spheres = [{ "size":[7.5, 7.5, 7.5], "pos":[0,1,0], "move":"true", "name":"sph1", "color":'#66ff33', "image":'shp1.jpg'},
                               { "size":[2, 2, 2], "pos":[0, 0, -200], "move":"true", "name":"sight","color":'#ff00ff'},
                               { "size":[2, 2, 2], "pos":[0,1,0], "move":"true", "name":"containerSphere", "color": '#ff0000'},
                               { "size":[500, 500, 500], "pos":[500,10,-5000], "move":"true", "name":"planet","color":"#0000ff", "image":"planet_1.png"}];


                this.addSphere(spheres);

                proBox = { type:'box', size:[300, 240, 0.5], pos:[0,0,-200], move:true, world:world, name:'proBox' };
                meshs[meshNum] = v3d.add(proBox);
                proBox = meshs[meshNum];

             //   for(var i=0;i<1;i++){

                 //   var t = 2;
                 //   if(t===2) obj = { type:'box', size:[w,h,d], pos:[x,y,z], move:true,world:world, name:'box1' };
                 //   if(t===3) obj = { type:'cylinder', size:[w,h,w, w,h,w, w,h,w, w,h,w], pos:[x,y,z], rot:[0,0,0, 0,45,0, 0,22.5,0, 0,-22.5,0], move:true,world:world };

                    // bodys[bodysNum] = new OIMO.Body(obj);
                    // meshs[meshNum] = v3d.add(obj);
                    // bodysNum += 1;
                    // meshNum +=1

                    // x = this.randMinMax(-1000,1000);
                    // y = this.randMinMax(-1000,1000);
                    // z = this.randMinMax(200,-500);
               // }
            },

            addSphere: function(spheres) {
                var target;
                for( var i in spheres){
                    var sphere =  {type: 'sphere', size:spheres[i].size, pos:spheres[i].pos, move:spheres[i].move,world:world, name:spheres[i].name, color: spheres[i].color, image: spheres[i].image};
                    if(sphere.name != 'containerSphere' && sphere.name != 'sight'){
                        bodys[bodysNum] = new OIMO.Body(sphere);
                        meshs[meshNum] = v3d.add(sphere,target,sphere.color,sphere.image);
                        if(sphere.name == 'planet'){
                            planetMesh = meshs[meshNum];
                        }
                        bodysNum += 1;
                        meshNum +=1;
                         if(sphere.name == 'shoot') {
                            return bodys[bodysNum - 1];
                        }
                    }
                    if(sphere.name == 'containerSphere'){
                        containerMesh = v3d.add(sphere,target,sphere.color);
                    }
                    if(sphere.name == 'sight'){
                        sightMesh = v3d.add(sphere,target,sphere.color);
                    }
                }
            },
            getObj: function(el) {

                switch (el) {
                    case 'bodys':
                        return bodys;
                        break;
                    case 'containerMesh': 
                        return containerMesh;
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
            }
        }
    }
});


// $('canvas').on('mousemove', function(event){

//     mousePos.x = ( event.clientX / v3d.w ) * 2 - 1;
//     mousePos.y = - ( event.clientY / v3d.h ) * 2 + 1;     

// });

// function getMousePos(canvas, evt) {
//         var rect = canvas.getBoundingClientRect();
//         return {
//           x: evt.clientX - rect.left,
//           y: evt.clientY - rect.top
//         };
// }



    // var vector = new OIMO.Vec3();

    // if(event.clientX !== undefined){
    //     mousePos.x = event.clientX;
    //     mousePos.y = event.clientY;
    // }

    // vector.set(
    //     ( mousePos.x / v3d.w ) * 2 - 1,
    //     - ( mousePos.y / v3d.h ) * 2 + 1,
    //     0.5 );

    // vector.unproject( v3d.camera );

    // var dir = vector.sub( v3d.camera.position ).normalize();

    // var targetZ = -100

    // var distance = (containerMesh.position.z - v3d.camera.position.z) / dir.z;
    // var pos = v3d.camera.position.clone().add( dir.multiplyScalar( distance ) );

    // smPos.x = pos.x;
    // smPos.y = pos.y;

    // console.log('pos ' + pos.x + ' , ' + pos.y);

//

//  canvas.addEventListener('mousemove', function(evt) {
//        //  mousePos = getMousePos(canvas, evt);

//         console.log('w: ' + evt.clientX + ' h: '+ evt.clientY); 
//          Helper.Compute( evt.clientX, evt.clientY, v3d.camera, vProjectedMousePos );


//         //  if(mousePos.x > canvasCentreX){
//         //     sightMesh.position.x = ((mousePos.x-canvasCentreX)/ratio) + containerMesh.position.x;

//         // }

//         //  if(mousePos.x < canvasCentreX){
//         //     sightMesh.position.x = ((canvasCentreX-mousePos.x)/-ratio) + containerMesh.position.x;
//         // }

//         //  if(mousePos.y < canvasCentreY){
//         //     sightMesh.position.y = ((mousePos.y-canvasCentreY)/-ratio) + containerMesh.position.y
//         // }

//         //  if(mousePos.y > canvasCentreY){
//         //     sightMesh.position.y = ((canvasCentreY-mousePos.y)/ratio) + containerMesh.position.y;
//         // }
//         // sightMesh.position.z = containerMesh.position.z - 500; 
//  //  console.log('Mouse position: ' + mousePos.x.toFixed(0) + ',' + mousePos.y.toFixed(0));
//   // console.log('sight position' + sightMesh.position.x + ',' + sightMesh.position.y ); 
// }, false);

//  class CProjectMousePosToXYPlaneHelper
// {
//     constructor()
//     {
//         this.m_vPos = new OIMO.Vec3();;
//         this.m_vDir = new OIMO.Vec3();;
//     }

//     Compute( nMouseX, nMouseY, Camera, vOutPos )
//     {
//         let vPos = OIMO.Vec3();;;
//         let vDir = OIMO.Vec3();;;

//         vPos.set(
//             -1.0 + 2.0 * nMouseX / v3d.w,
//             -1.0 + 2.0 * nMouseY / v3d.h,
//             0.5
//         ).unproject( Camera );

//         // Calculate a unit vector from the camera to the projected position
//         vDir.copy( vPos ).sub( Camera.position ).normalize();

//         // Project onto z=0
//         let flDistance = -Camera.position.z / vDir.z;
//         vOutPos.copy( Camera.position ).add( vDir.multiplyScalar( flDistance ) );

//        // vOutPosGlobal.copy(vOutPos);

//         sightMesh.position.x = vOutPos.x;
//         sightMesh.position.y = vOutPos.y * -1; 
//         sightMesh.position.z = Camera.position.z - 200;

//        // console.log(vOutPos.x +' , '+ vOutPos.y); 

//     }
// }
// let Helper = new CProjectMousePosToXYPlaneHelper(canvas);
// let vProjectedMousePos = new OIMO.Vec3();;

// $('canvas').on('mousemove', function(evt){
//     if(evt.clientX !== undefined && evt.clientY !== undefined){
//         mousePos.x = evt.clientX;
//         mousePos.y = evt.clientY;
//     }
//     Helper.Compute( mousePos.x, mousePos.y, v3d.camera, vProjectedMousePos );
// });

