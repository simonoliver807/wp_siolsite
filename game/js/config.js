requirejs(['autoGame','hammer','ddsloader','oimo','three','objloader','tgaloader','mtlloader','v3d','gameinit','main'],
        function (AUTOGAME,Hammer,OIMO, THREE, OBJLOADER, TGALoader, MTLLoader, DDSLoader, V3D, GAMEINIT, MAIN) {
            var main = new MAIN;
            main.init();

        }
    );

