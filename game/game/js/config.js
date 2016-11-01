requirejs(['libs/jquery','oimo', 'three', 'objloader', 'tgaloader','v3d', 'gameinit','main'],
        function (JQUERY,OIMO, THREE, OBJLOADER, TGALoader, V3D, GAMEINIT, MAIN) {
           var main = new MAIN;
           main.init();
        }
    );