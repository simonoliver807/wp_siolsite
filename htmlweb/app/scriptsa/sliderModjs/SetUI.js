
define(['sMods/Main'], function(Main){
	"use strict";
	
	 var uiType = window.location.search.substring(1);
	 uiType = uiType.charAt(uiType.length-1);

	var ui = new Main();
	ui.init(uiType);

});

                // if (this.uiType == 'ui1') {
                //     document.getElementById('game-content1').className = 'ui1';

                //     this.slider();
                // }
                // else if (this.uiType == 'ui2') {
                //     document.getElementById('game-content2').className = 'ui2';
                //     document.getElementById('game-content2').style.display = 'none';
                //     this.scorer();
                // }
                // else if (this.uiType = 'ui3') {
                //     document.getElementById('game-content3').className = 'ui3';
                //     document.getElementById('game-content3').style.display = 'none';
                //     this.sliderYN();
                // }