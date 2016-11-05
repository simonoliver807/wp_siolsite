requirejs(['hammer','oimo','three','objloader','tgaloader','mtlloader','ddsloader','v3d','gameinit','main'],
        function (Hammer,OIMO, THREE, OBJLOADER, TGALoader, MTLLoader, DDSLoader, V3D, GAMEINIT, MAIN) {
            var main = new MAIN;
            main.init();
        }
    );

