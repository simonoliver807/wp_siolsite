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

    var sightMesh;
    var containerMesh;
    var playerMesh;

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
    function oimoLoop() {  
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
                    sightMesh.position.y = containerMesh.position.y + 20; 
                    sightMesh.position.z = containerMesh.position.z - 50; 
                }

                    

                    // change material
                    if(mesh.material.name === 'sbox') mesh.material = v3d.mats.box;
                    if(mesh.material.name === 'ssph') mesh.material = v3d.mats.sph; 

                } else {
                //    if(mesh.material.name === 'box') mesh.material = v3d.mats.sbox;
                 //   if(mesh.material.name === 'sph') mesh.material = v3d.mats.ssph;
                }
            }

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
        
            x = 0;
            z = -50;
            y = 0;
            w = 15;
            h = 15;
            d = 15;

            var spheres = [{ "size":[7.5, 7.5, 7.5], "pos":[0,0,-100], "move":"true", "name":"sph1", "color":'#66ff33'},
               { "size":[1, 1, 1], "pos":[0,20,-150], "move":"true", "name":"sight","color":'#66ff33'},
               { "size":[1, 1, 1], "pos":[0,0,-100], "move":"true", "name":"containerSphere", "color":'#ff0000'}];

            addSphere(spheres);
    }

    function addSphere(spheres) {
        var target;
        for( var i in spheres){
            var sphere =  {type: 'sphere', size:spheres[i].size, pos:spheres[i].pos, move:spheres[i].move, world:world, name:spheres[i].name, color: spheres[i].color}
            if(sphere.name != 'containerSphere' && sphere.name != 'sight'){
                bodys[bodysNum] = new OIMO.Body(sphere);
                meshs[meshNum] = v3d.add(sphere,target,sphere.color);
                playerMesh = meshs[meshNum];
                bodysNum += 1;
                meshNum +=1}

            if(sphere.name == 'containerSphere'){
                containerMesh = v3d.add(sphere,target,sphere.color);
                containerMesh.add(v3d.camera);
            }
            if(sphere.name == 'sight'){
                sightMesh = v3d.add(sphere,target,sphere.color);
            }
        }
    }

function handleKeyDown( event ) {

    event.preventDefault();
    event.stopPropagation();

    switch ( event.keyCode ) {

        case keys.UP:
        console.log('up key pressed'); 
            
            playerMesh.position.x +=1;
            containerMesh.position.x +=1;

            sightMesh.position.x +=1;


            break;
        case keys.BOTTOM:
            var heading = v3d.getCamDir('reverse', containerMesh);


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


window.addEventListener( 'keydown', handleKeyDown, false );
window.scrollTo(0, document.body.clientHeight);

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}
 var canvasCentre = 385.5;
var canvas = document.getElementById('container');
canvas.addEventListener('mousemove', function(evt) {
         var mousePos = getMousePos(canvas, evt);

         console.log('mousePos.x 1: ' + mousePos.x); 
         console.log('containerMesh' + containerMesh.position.x +', '+ containerMesh.position.y )
         mousePos.x += containerMesh.position.x;
         canvasCentre += containerMesh.position.x;

         console.log('canvas centre: ' + canvasCentre);
         console.log('mousPos.x 2: ' + mousePos.x);   

         if(mousePos.x > canvasCentre){
              sightMesh.position.x = (mousePos.x-canvasCentre)/3.192;
               sightMesh.position.x += containerMesh.position.x;
                    }
         if(mousePos.x < 398.5){
            sightMesh.position.x = (398.5 - mousePos.x)/-3.192;
        }
    console.log('Mouse position: ' + mousePos.x.toFixed(0) + ',' + mousePos.y.toFixed(0));
    console.log('sight position' + sightMesh.position.x + ',' + sightMesh.position.y ); 
}, false);




});   



