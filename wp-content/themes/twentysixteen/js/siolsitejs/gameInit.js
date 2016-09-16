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
    var keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, ECS: 27, SPC: 32 };
    
    world.worldscale(100);

    // three.js view with geometrys and materials ../js/v3d.js
    var v3d = new V3D.View();
    v3d.initLight();

    // container to hold oimo objects
    var bodys = [];
    var bodysNum = 0;
    
    var thisPerf;

    // my variables
    var containerMesh;
    var sightMesh;
    var planetMesh;

    var mousePos;
    var canvasCentreX = 398.5;
    var canvasCentreY = 251.5;
    var ratio = 0.7;

    var newForce = 0;

    var containerMeshPrev;
    containerMeshPrev = new OIMO.Vec3(0,0,0)
   


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
                    containerMeshPrev.copy(containerMesh.position);
                    containerMesh.position.copy(body.getPosition());
                   var tmpPosX = (containerMesh.position.x - containerMeshPrev.x);
                   var tmpPosY = (containerMesh.position.y - containerMeshPrev.y);
                    sightMesh.position.x += tmpPosX;
                    sightMesh.position.y += tmpPosY; 
                    sightMesh.position.z = containerMesh.position.z - 500; 

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

       //  if(newForce){

       //      var heading = v3d.getPlayerDir('forward', containerMesh, sightMesh);
       //   // TODO only update vector if camera pos changes
       //   //   if(lastCamPos.pos != v3d.getCam.position){

       //          var headingMag = heading.length();
       //          console.log('magnitude ' + headingMag); 
       //          console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 
       //          // headingMag /= 10;
       //          // heading.x /= (headingMag);
       //          // heading.y /= (headingMag);
       //          // heading.z /= (headingMag);
       //          var rb = bodys[0].body;
       //          rb.linearVelocity.addTime(heading , world.timeStep );

       //          console.log('magnitude limit ' + heading.length()); 
       //          console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 

       //  //        lastCamPos.setPos(v3d.get.position);
       // //     }

        //}
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
        
            x = 500;
            z = -1500;
            y = 100;
            w = 60;
            h = 60;
            d = 60;

        var spheres = [{ "size":[7.5, 7.5, 7.5], "pos":[0,0,-100], "move":"true", "name":"sph1", "color":'#66ff33'},
                       { "size":[2, 2, 2], "pos":[20,20,-500], "move":"true", "name":"sight","color":'#ff00ff'},
                       { "size":[1, 1, 1], "pos":[0,0,-100], "move":"true", "name":"containerSphere", "color":'#ff0000'},
                       { "size":[500, 500, 500], "pos":[500,10,-5000], "move":"true", "name":"planet","color":'#0000ff'}];


        addSphere(spheres);

        for(var i=0;i<1;i++){

            var t = 2;
            if(t===2) obj = { type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, name:'box1' };
            if(t===3) obj = { type:'cylinder', size:[w,h,w, w,h,w, w,h,w, w,h,w], pos:[x,y,z], rot:[0,0,0, 0,45,0, 0,22.5,0, 0,-22.5,0], move:true, world:world };

            bodys[bodysNum] = new OIMO.Body(obj);
            meshs[meshNum] = v3d.add(obj);
            bodysNum += 1;
            meshNum +=1

            x = randMinMax(-1000,1000);
            y = randMinMax(-1000,1000);
            z = randMinMax(200,-500);



        }
    }

    function addSphere(spheres) {
        var target;
        for( var i in spheres){
            var sphere =  {type: 'sphere', size:spheres[i].size, pos:spheres[i].pos, move:spheres[i].move, world:world, name:spheres[i].name, color: spheres[i].color}
            if(sphere.name != 'containerSphere' && sphere.name != 'sight'){
                bodys[bodysNum] = new OIMO.Body(sphere);
                meshs[meshNum] = v3d.add(sphere,target,sphere.color);
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
                containerMesh.add(v3d.camera);
            }
            if(sphere.name == 'sight'){
                sightMesh = v3d.add(sphere,target,sphere.color);
               // v3d.camera.add(sightMesh);
            }
        }
    }

    function randMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleKeyDown( event ) {

        event.preventDefault();
        event.stopPropagation();

        switch ( event.keyCode ) {

            case keys.UP:
                console.log('up key pressed'); 
                var heading = v3d.getPlayerDir('forward', containerMesh, sightMesh);

                // console.log('sightMesh x: '+ sightMesh.position.x + ' sightMesh y: '+ sightMesh.position.y + 'sightMesh z: '+ sightMesh.position.z); 

                // console.log('magnitude ' + heading.length()); 

                // console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 

                // console.log('magnitude limit ' + heading.length()); 

                // console.log('heading x: '+ heading.x + ' heading y: '+ heading.y + 'heading z: '+ heading.z); 

                heading.x *= 50;
                heading.y *= 50;
                heading.z *= 50;
                var rb = bodys[0].body;
                rb.linearVelocity.addTime(heading , world.timeStep);
                console.log('heading x: '+ rb.linearVelocity.x + ' heading y: '+ rb.linearVelocity.y + 'heading z: '+ rb.linearVelocity.z); 
                newForce = true;

                break;
            case keys.BOTTOM:
                var heading = v3d.getPlayerDir('reverse',containerMesh, sightMesh);
                heading.x *= 50;
                heading.y *= 50;
                heading.z *= 50;
                var rb = bodys[0].body;
                rb.linearVelocity.addTime(heading , world.timeStep); 

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
            case keys.SPC:
                var heading = v3d.getPlayerDir('forward', containerMesh, sightMesh);
                heading.x *= 500;
                heading.y *= 500;
                heading.z *= 500;
                var shootStart = containerMesh.position;
                var sphere = [{ "size":[1.5, 1.5, 1.5], "pos":[shootStart.x, shootStart.y, shootStart.z -1], "move":"true", "name":"shoot", "color":'#66ff33'}];
                var ss = addSphere(sphere);
                ss.body.linearVelocity.addTime(heading, world.timeStep);

                break;
            case keys.ECS:
                pause = (pause === 1) ? 0: 1;
                break;
            

    }

}

// var LastPos = (function () {
//     var pos;
//     return {
//         setPos: function (pos) {
//             this.pos.x = pos.x;
//             this.pos.y = pos.y;
//             this.pos.z = pos.z;
//         },
//         getPos: function () {
//             return this.pos;
//         }
//     };
// });
//var containerMeshPrev = new LastPos();

// var camPos = OIMO.Vec3(0,0,0);
// lastCamPos.setPos(camPos);

window.addEventListener( 'keydown', handleKeyDown, false );
window.scrollTo(0, document.body.clientHeight);

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

var canvas = document.getElementById('container');
canvas.addEventListener('mousemove', function(evt) {
         mousePos = getMousePos(canvas, evt);


   //      console.log('mousePos.x 1: ' + mousePos.x); 
    //     console.log('containerMesh' + containerMesh.position.x +', '+ containerMesh.position.y )


       //  mousePos.x += containerMesh.position.x;
       //  canvasCentre += containerMesh.position.x;

   //      console.log('canvas centre: ' + canvasCentre);
    //     console.log('mousPos.x 2: ' + mousePos.x);   

         if(mousePos.x > canvasCentreX){
              sightMesh.position.x = ((mousePos.x-canvasCentreX)/ratio) + containerMesh.position.x;
        }

         if(mousePos.x < canvasCentreX){
            sightMesh.position.x = ((canvasCentreX-mousePos.x)/-ratio) + containerMesh.position.x;
        }

         if(mousePos.y < canvasCentreY){
            sightMesh.position.y = ((mousePos.y-canvasCentreY)/-ratio) + containerMesh.position.y
        }

         if(mousePos.y > canvasCentreY){
            sightMesh.position.y = ((canvasCentreY-mousePos.y)/ratio) + containerMesh.position.y;
        }
         sightMesh.position.z = containerMesh.position.z - 500; 
 //  console.log('Mouse position: ' + mousePos.x.toFixed(0) + ',' + mousePos.y.toFixed(0));
  // console.log('sight position' + sightMesh.position.x + ',' + sightMesh.position.y ); 
}, false);



});   
