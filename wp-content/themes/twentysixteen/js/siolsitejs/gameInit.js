"use strict";

    
    
define(['oimo', 'v3d'], function(OIMO,V3D) {
      
      

    //////////////////////////
    //****Three Variables****//
    //////////////////////////
    

    // container to hold three.js objects
    var meshs = [];
    var meshNum = 0;
    
    
    
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
    world.gravity = new OIMO.Vec3(0, -9.8, 0);
    // siolsite new force
    var newForce = new OIMO.Vec3(1.0,0,0);
    
    world.worldscale(100);

    // three.js view with geometrys and materials ../js/v3d.js
    var v3d = new V3D.View();
    v3d.initLight();

    // container to hold oimo objects
    var bodys = [];
    var bodysNum = 0;

    populate(1);

    var render = function () {
        requestAnimationFrame( render );
        v3d.render();
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
    world.step();// update world

    var x, y, z, mesh, body;
    var i = bodys.length;
    while (i--){
        body = bodys[i];
        mesh = meshs[i];
        
        
        // siolsite try again to add force
        body.linearVelocity.addTime(newForce , world.timeStep );
        body.updatePosition( world.timeStep );
        
//    siolsite   if(appFor > 0){
//            var bodyPos = body.getPosition();
//            body.body.applyImpulse(bodyPos, new OIMO.Vec3(0.5, 0, 0));
//            appFor -= 1;
//        }

        if(!body.getSleep()){ // if body didn't sleep

            // apply rigidbody position and rotation to mesh
            mesh.position.copy(body.getPosition());
            mesh.quaternion.copy(body.getQuaternion());

            // change material
            if(mesh.material.name === 'sbox') mesh.material = v3d.mats.box;
            if(mesh.material.name === 'ssph') mesh.material = v3d.mats.sph; 

            // reset position
            if(mesh.position.y<-100){
                x = rand(-100,100);
                z = rand(-100,100);
                y = rand(100,1000);
                body.resetPosition(x,y,z);
            }
        } else {
            if(mesh.material.name === 'box') mesh.material = v3d.mats.sbox;
            if(mesh.material.name === 'sph') mesh.material = v3d.mats.ssph;
        }
    }
    // oimo stat display
  //  document.getElementById("info").innerHTML = world.performance.show();
}

/* add random object */
function populate(n) 
{
    var obj;

    //add static ground
    obj = { size:[400, 40, 390], pos:[0,-20,0], world:world, name:'ground', flat:true }
    new OIMO.Body(obj);
    v3d.add(obj);

    //add random objects
    var x, y, z, w, h, d, t;
    var i = 1;

    while (i--){
        t = 1;
        x = 0;
        z = 0;
        y = 100;
        w = rand(10,20);
        h = rand(10,20);
        d = rand(10,20);

        if(t===1) obj = { type:'sphere', size:[w*0.5, w*0.5, w*0.5], pos:[x,y,z], move:true, world:world, name:'sph1' };
        if(t===2) obj = { type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world };
        if(t===3) obj = { type:'cylinder', size:[w,h,w, w,h,w, w,h,w, w,h,w], pos:[x,y,z], rot:[0,0,0, 0,45,0, 0,22.5,0, 0,-22.5,0], move:true, world:world };
        
        bodys[i] = new OIMO.Body(obj);
        meshs[i] = v3d.add(obj);
    }
}

/* random number */
function rand(min, max, n)
{
    var r, n = n||0;
    if (min < 0) r = min + Math.random() * (Math.abs(min)+max);
    else r = min + Math.random() * max;
    return r.toFixed(n)*1;
}
    
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