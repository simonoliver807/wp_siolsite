requirejs(['oimo', 'three', 'objloader', 'tgaloader','v3d', 'gameinit','main'],
        function (OIMO, THREE, OBJLOADER, TGALoader, V3D, GAMEINIT, MAIN) {
           var main = new MAIN;
           main.init();
        }
    );