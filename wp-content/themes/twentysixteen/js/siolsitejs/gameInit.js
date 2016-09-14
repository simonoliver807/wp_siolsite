"use strict";

    
    
define(['oimo', 'v3d'], function(OIMO,V3D) {
      
      

    //////////////////////////
    //****Three Variables****//
    //////////////////////////
    

    // container to hold three.js objects
    var meshs = [];
    var meshNum = 0;
    
    var pause = 0;
    
    //////////////////////////
    //****Oimo Variables****//
    //////////////////////////
    
    // The time between each step
      var timestep = 1/60;
    // siolsite this is a defualt value for oimo line 123

    // Algorithm used for collision
    // 1: BruteForceBroadPhase  2: sweep and prune  3: dynamic bounding volume tree
    // default is 2 : best speed and lower cpu use.
    var boardphase = 2;

    // The number of iterations for constraint solvers : default 8.
    var Iterations = 8;

    // calculate statistique or not
    var noStat = false;
    

    // create oimo world contains all rigidBodys and joint.
    var world = new OIMO.World( timestep, boardphase, Iterations, noStat );

    // you can choose world gravity 
    // world.gravity = new OIMO.Vec3(0, -9.8, 0);
    world.gravity = new OIMO.Vec3(0, 0, 0);


    // siolsite new force
    var newForce = new OIMO.Vec3(0,0,0);
    var keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, ECS: 27 };
    
    world.worldscale(100);

    // three.js view with geometrys and materials ../js/v3d.js
    var v3d = new V3D.View();
    v3d.initLight();

    // container to hold oimo objects
    var bodys = [];
    var bodysNum = 0;
    
    var thisPerf;

    var containerMesh;

    var newForce = 0;

    populate(1);

    var render = function () { 
        requestAnimationFrame( render );
        if(!pause){ 
            v3d.render();
        }
    };
    
    
    
    
    // oimo render loop to run the same time as three.js render loop
    setInterval(oimoLoop, timestep*1000);
    // three render loop
    render();

    ///////////////////
    //**** Oimo *****//
    ///////////////////


    /* oimo loop */
    function oimoLoop() 
    {  
    if(!pause){  
        world.step();// update world

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
                    containerMesh.position.copy(body.getPosition());
                }
                

                // change material
                if(mesh.material.name === 'sbox') mesh.material = v3d.mats.box;
                if(mesh.material.name === 'ssph') mesh.material = v3d.mats.sph; 

                // reset position
                // if(mesh.position.y<-100){
                //     x = rand(-100,100);
                //     z = rand(-100,100);
                //     y = rand(100,1000);
                //     body.resetPosition(x,y,z);
                // }
            } else {
            //    if(mesh.material.name === 'box') mesh.material = v3d.mats.sbox;
             //   if(mesh.material.name === 'sph') mesh.material = v3d.mats.ssph;
            }
        }
        if(newForce){

            var heading = v3d.getCamDir('forward', containerMesh);

         //   if(lastCamPos.pos != v3d.getCam.position){

                console.log('magnitude ' + heading.length()); 
                console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 
                if(heading.length() > 99){
                   heading.x = heading.x - 1;
                   heading.y = heading.y - 1;
                   heading.z = heading.z - 1;
                }
                console.log('magnitude limit ' + heading.length()); 
                console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 

                heading.x /= 10;
                heading.y /=10;
                heading.z /=10;
                var rb = bodys[0].body;
                rb.linearVelocity.addTime(heading , world.timeStep );

        //        lastCamPos.setPos(v3d.get.position);
       //     }

          //  console.log('heading x: '+ heading.x + ' heading x: '+ heading.x + 'heading x: '+ heading.x); 
        }
        // oimo stat display
        //  docu//ment.getElementById("info").innerHTML = world.performance.show();
    }
    }

    /* add random object */
    function populate(n) 
    {
        var obj;

        thisPerf = new OIMO.Performance(world);
        //add static ground
        // obj = { size:[400, 40, 390], pos:[0,-20,0], world:world, name:'ground', flat:true }
        // new OIMO.Body(obj);
        // v3d.add(obj);

        //add random objects
        var x, y, z, w, h, d, t;
        var shapes = [2];
        
            x = 0;
            var xbox = 100;
            z = 0;
            y = 100;
            w = 15;
            h = 15;
            d = 15;

        var spheres = [{ "size":[7.5, 7.5, 7.5], "pos":[0,0,0], "move":"true", "name":"sph1", "color":'#66ff33'},
                       { "size":[1, 1, 1], "pos":[50,0,0], "move":"true", "name":"sight","color":'#66ff33'},
                       { "size":[1, 1, 1], "pos":[0,0,0], "move":"true", "name":"containerSphere", "color":'#ff0000'},
                       { "size":[500, 500, 500], "pos":[500,10,500], "move":"true", "name":"planet","color":'#66ff33'}];
        addSphere(spheres);

        for(var i=0;i<shapes.length;i++){
    //        w = rand(10,20);
    //        h = rand(10,20);
    //        d = rand(10,20);
            var t = shapes[i];
            if(t===2) obj = { type:'box', size:[w,h,d], pos:[xbox,y,z], move:true, world:world, name:'box1' };
            if(t===3) obj = { type:'cylinder', size:[w,h,w, w,h,w, w,h,w, w,h,w], pos:[x,y,z], rot:[0,0,0, 0,45,0, 0,22.5,0, 0,-22.5,0], move:true, world:world };
            
            bodys[bodysNum] = new OIMO.Body(obj);
            meshs[meshNum] = v3d.add(obj);
            bodysNum += 1;
            meshNum +=1
        }
    }

    function addSphere(spheres) {
        var target;
        for( var i in spheres){
            var sphere =  {type: 'sphere', size:spheres[i].size, pos:spheres[i].pos, move:spheres[i].move, world:world, name:spheres[i].name, color: spheres[i].color}
            if(sphere.name != 'containerSphere'){
                bodys[bodysNum] = new OIMO.Body(sphere);
                meshs[meshNum] = v3d.add(sphere,target,sphere.color);
                bodysNum += 1;
                meshNum +=1}
            if(sphere.name == 'containerSphere'){
                containerMesh = v3d.add(sphere,target,sphere.color);
            }
        }
    }

function handleKeyDown( event ) {

      event.preventDefault();
      event.stopPropagation();

    switch ( event.keyCode ) {

        case keys.UP:
            var heading = v3d.getCamDir('forward', containerMesh);

            console.log('magnitude ' + heading.length()); 

            console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 

            if(heading.length() > 100){
               heading.x = heading.x - 10;
               heading.y = heading.y - 10;
               heading.z = heading.z - 10;
            }

            console.log('magnitude limit ' + heading.length()); 

            console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 

            heading.x /= 10;
            heading.y /=10;
            heading.z /=10;


            var rb = bodys[0].body;
            rb.linearVelocity.addTime(heading , world.timeStep );

            console.log('heading x: '+ rb.linearVelocity.x + ' heading y: '+ rb.linearVelocity.y + 'heading z: '+ rb.linearVelocity.z); 

            newForce = true;

            break;
        case keys.BOTTOM:
            var heading = v3d.getCamDir('reverse', containerMesh);
            heading.x /= 10;
            heading.y /=10;
            heading.z /=10;
            var rb = bodys[0].body;
            rb.linearVelocity.addTime(heading , world.timeStep ); 

            console.log('heading x: '+ rb.linearVelocity.x + ' heading y: '+ rb.linearVelocity.y + 'heading z: '+ rb.linearVelocity.z); 

            break;
        // case keys.LEFT:
        //     var rb = bodys[0].body;
        //     newForce.x = 5;
        //     rb.linearVelocity.addTime(newForce , world.timeStep );
        //     break;
        // case keys.RIGHT:
        //     var rb = bodys[0].body;
        //     newForce.x = -5;
        //     rb.linearVelocity.addTime(newForce , world.timeStep );
        //     break;
            // siolsite remove events if the ESC key is pressed
        case keys.ECS:
            pause = (pause === 1) ? 0: 1;
            break;
            

    }

}

// var lastCamPos = (function () {
//     return {
//         setPos: function (camPos) {
//             this.pos.x = camPos.x;
//             this.pos.y = camPos.y;
//             this.pos.z = camPos.z;
//         },
//         getPos: function () {
//             return this.pos;
//         }
//     };
// })();
// var camPos = OIMO.Vec3(0,0,0);
// lastCamPos.setPos(camPos);

window.addEventListener( 'keydown', handleKeyDown, false );
window.scrollTo(0, document.body.clientHeight);
var falseKey = {keyCode: 38};
// for(var i=0;i<1000;i++){
  //  handleKeyDown(falseKey);
// }

});   











//window.addEventListener('DOMContentLoaded', function() {
//   console.log('DOM Content Loaded');
//    var canvas = document.getElementById('renderCanvas');
//    var engine = new BABYLON.Engine(canvas, true);
//
//    var createScene = function () {
//
//        // Set the scene and background color
//        var scene = new BABYLON.Scene(engine);
//        scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());
//        scene.clearColor = new BABYLON.Color3(0,0,0.2);
//
//        // Create a camera
//        var camera = new BABYLON.ArcRotateCamera("Camera", 1.0,
//            1.0, 12, BABYLON.Vector3.Zero(), scene);
//
//        // Attach camera to canvas
//        camera.attachControl(canvas, false);
//
//        // Add a light
//        var light = new BABYLON.HemisphericLight("hemi",
//            new BABYLON.Vector3(0, 1, 0), scene);
//
//        // Reflect the light off the ground to light the mesh bottom
//        light.groundColor = new BABYLON.Color3(0.5, 0, 0.5);
//        
//        var ground = BABYLON.Mesh.CreateGround('ground', 20, 20, 2, scene);
//        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
//        
//
//        // Create a builtin shape
//        var box = BABYLON.Mesh.CreateBox("mesh", 2, scene);
//        box.showBoundingBox = true;
//       // scene.meshes[1].setPhysicsState(BABYLON.PhysicsEngine.BoxImposter, {mass: 0, friction: 0.5, restitution: 0.7});
//         scene.meshes[1].setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 });
//        
//        box.scaling = new BABYLON.Vector3(1,1,1);
//        box.position.y = 3;
//
//        // Define a material
//        var material = new BABYLON.StandardMaterial("std", scene);
//        material.diffuseColor = new BABYLON.Color3(0.5, 0, 0.5);
//
//        // Apply the material
//        box.material = material;
//        ground.material = material;
//
//    return scene;
//    };
//    
//    scene = createScene();
//    engine.runRenderLoop(function() {
//        scene.render();
//    });
//    window.addEventListener('resize', function() {
//        engine.resize();
//    });
//
//});