requirejs(['oimo', 'three', 'v3d', 'gameinit','main'],
        function (OIMO, THREE, V3D, GAMEINIT, MAIN) {
           var main = new MAIN;
           main.init();
        }
    );