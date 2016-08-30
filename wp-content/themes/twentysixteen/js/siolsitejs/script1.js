"use strict";

var x = '0';
console.log('string' + typeof(x));
var num = parseInt(x);
console.log(typeof(num)); 

window.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    
    
        
    //////////////////////////
    //****Three Variables****//
    //////////////////////////
    
    // set the scene size
    var container = document.getElementById('container');
    container.style.width = '100%';
    container.style.height = '500px';
    var WIDTH = container.offsetWidth,
      HEIGHT = container.offsetHeight;
    console.log('width: '+WIDTH+' height: '+HEIGHT);
    // container to hold three.js objects
    var meshs = {};
    var meshNum = 0;
    var scene = new THREE.Scene();
    

    // get a camera and set parameters
    
    var camera = new THREE.PerspectiveCamera(
        75,         // Field of view
        WIDTH/HEIGHT,  // Aspect ratio
        0.1,        // Near
        10000       // Far
    );
    //move camera back
    camera.position.z = 5;
    
    
    // build the renderer
    var renderer = new THREE.WebGLRenderer();
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    // renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x000000 );
    // renderer.setPixelRatio( window.devicePixelRatio );
    
    // get the canvas element
    var container = document.getElementById('container')
    container.appendChild(renderer.domElement);
    
    // light
	//var light = new THREE.PointLight(0xffffff);
	//light.position.set(100,250,100);
	//scene.add(light);
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    
    
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

    // container to hold oimo objects
    var bods = {};
    var bodsNum = 0;


    // Oimo Physics use international system units 0.1 to 10 meters max for dynamique body.
    // for three.js i use by default *100  so object is between 10 to 10000 three unit.
    // big object give better precision try change value 10 , 1 ...
    world.worldscale(100);
    

    
    // create the ground as a plane 
//    var loader = new THREE.TextureLoader();
//    loader.load(
//                            '/website/wordpress/wp-content/uploads/2016/08/assets/pavingGround.jpg',
//                            function (texture) {
//                                //texture.repeat.x = 256;
//                                //texture.repeat.y = 256;
//                                //texture.repeat.set = (10,10);
//                                //texture.wrapS = THREE.RepeatWrapping; 
//                               // texture.wrapT = THREE.RepeatWrapping; 
//                              //  texture.minFilter = THREE.LinearFilter;
//                               // var material = new THREE.MeshBasicMaterial({map:texture}); 
//                                
//                                var material = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});    
//
//                                // PlaneGeometry(width, height, widthSegments, heightSegments)
//                                var gGeo = new THREE.PlaneGeometry(100,100,512,512);
//                                var g = new THREE.Mesh(gGeo,material);
//                                g.position.y = -0.5;
//                                g.rotation.x = -Math.PI/2; //-90 degrees around the xaxis
//                                g.name = 'g';
//                                meshs[meshNum] = g;
//                                meshNum += 1;                                
//                            },
//                            function (xhr) {
//                                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
//	                        },
//                            // Function called when download errors
//                            function ( xhr ) {
//                                console.log( 'An error happened' );
//                            
//                            });

    
    
    var material = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});    
    var gGeo = new THREE.PlaneGeometry(100,100,512,512);
    var g = new THREE.Mesh(gGeo,material);
    g.position.y = -0.5;
    g.rotation.x = -Math.PI/2; //-90 degrees around the xaxis
    g.name = 'g';
    meshs[meshNum] = g;
    meshNum += 1;                                
    
    
    
    var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x66ff33, wireframe: true });
    //SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    var s1 = new THREE.Mesh( new THREE.SphereGeometry(10,16,16), sphereMaterial);
    s1.name = 's1';
    meshs[meshNum] = s1;
    meshNum += 1;
    s1.position.y = 1.0;
    console.log('s1 position.x ' + s1.position.x + 's1 position.x ' + s1.position.y + 's1 position.z ' + s1.position.z); 
    window.addEventListener( 'resize', onWindowResize, false );
    
    
    
    // add obj to OIMO
    oimoPopulate(g);
    oimoPopulate(s1);
    scene.add(g);
    scene.add(s1);
    
    
    
    var targetRotationOnMouseDown = 0;
    var targetRotation = 0;
    var mouseXOnMouseDown = 0;
    var mouseX = 0;
    var windowHalfX = WIDTH/2;
    
    
    
  //  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    function onDocumentMouseDown( event ) {

				event.preventDefault();

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mouseout', onDocumentMouseOut, false );

				mouseXOnMouseDown = event.clientX - windowHalfX;
				targetRotationOnMouseDown = targetRotation;

			}

    function onDocumentMouseMove( event ) {

        var mouseX = event.clientX - windowHalfX;

        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
        
        console.log(targetRotation, targetRotationOnMouseDown, mouseX, mouseXOnMouseDown); 

    }

    function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

    }

    function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

    }
    
    
    
    function onWindowResize() {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( container.innerWidth, container.innerHeight );
    }
    

    var render = function () {
        requestAnimationFrame( render );
        s1.rotation.y += ( targetRotation - s1.rotation.y ) * 0.05;
        
        controls.update();
        
        renderer.render(scene, camera);
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

        var x, y, z, mesh, bod;
        var i = bodsNum;
        while (i--){
            bod = bods[i];
            mesh = meshs[i];

            if(!bod.getSleep()){ // if body didn't sleep

                // apply rigidbody position and rotation to mesh
                mesh.position.copy(bod.getPosition());
                mesh.quaternion.copy(bod.getQuaternion());

                console.log('name '+ mesh.name + 'x: ' + mesh.position.x + ' y: ' + mesh.position.y + ' z: ' + mesh.position.z)

                ///change material
          //      if(mesh.material.name === 'sbox') mesh.material = v3d.mats.box;
          //      if(mesh.material.name === 'ssph') mesh.material = v3d.mats.sph; kjkjhkjh

                // reset position
    //            if(mesh.position.y<-100){
    //                x = rand(-100,100);
    //                z = rand(-100,100);
    //                y = rand(100,1000);
    //                body.resetPosition(x,y,z);
    //            }
            } 
    //        else {
    //            if(mesh.material.name === 'box') mesh.material = v3d.mats.sbox;
    //            if(mesh.material.name === 'sph') mesh.material = v3d.mats.ssph;
    //        }
        }
        // oimo stat display
       // document.getElementById("info").innerHTML = world.performance.show();
    }

    function oimoPopulate(obj){
        console.log(obj);
        var oimoObj = {};
        var w;
        var h;
        var posx = obj.position.x;
        var posy = obj.position.y;
        var posz = obj.position.z;
        if (obj.name.charAt(0) === 'g') {
             //add static ground
            w = obj.geometry.parameters.width;
            h = obj.geometry.parameters.height;
            // 22082016 changed flat true which i could not find in oimo code to rot: [90,0,0] to rotate ground 90 degrees
            oimoObj = {type:'box', size: [h, 400, w], pos:[posx, posy, posz], world:world, rot: [90,0,0], name:obj.name };
        }
        else if (obj.name.charAt(0) === 's'){
            //add sphere
            w = obj.geometry.parameters.radius;
            oimoObj = { type:'sphere', size:[w,w,w], pos:[posx,posy,posz], move:true, world:world, name:obj.name };;
        }
        bods[bodsNum] = new OIMO.Body(oimoObj);
        bodsNum += 1;

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