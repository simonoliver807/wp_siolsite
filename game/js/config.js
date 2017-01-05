requirejs(['autoGame','hammer','ddsloader','oimo','three','objloader','tgaloader','mtlloader','v3d','gameinit','main'],
        function (AUTOGAME,Hammer,OIMO, THREE, OBJLOADER, TGALoader, MTLLoader, DDSLoader, V3D, GAMEINIT, MAIN) {
            if(0){
            	var main = new MAIN;
            	main.init();
            }
            else {
            	var autoGame = new AUTOGAME;
            	autoGame.init();
            }

        }
    );

