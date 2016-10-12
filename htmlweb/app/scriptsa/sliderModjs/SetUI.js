
define(['sMods/Main'], function(Main){
	"use strict";

        //****  TODO try putting back requires Jquery and nicescroll ****//


        // if ($(window).width() > 680) {
        //     $("html").niceScrolthis.helper.l({
        //         zindex: 9999,
        //         cursoropacitymin: 0.3,
        //         cursorwidth: 7,
        //         cursorborder: 0,
        //         mousescrollstep: 40,
        //         scrollspeed: 100,
        //         horizrailenabled: false
        //     });
        // }

        // function OffScrolthis.helper.l() {
        //     var winScrollTop = $(window).scrollTop();
        //     $(window).bind('scroll', function () {
        //         $(window).scrollTop(winScrollTop);
        //     });
        // }


        // function setHeight() {
        //     var hgt = $(window).height();
        //     var wdth = $(window).width();
        //     $("#home").css('height', hgt + 'px');
        //     $("#home").css('width', wdth + 'px');

        // }
        // function removeHeight() {
        //     $("#home").removeAttr("style")
        // }

	 var uiType = window.location.search.substring(1);
         if(uiType){
	       uiType = uiType.charAt(uiType.length-1);
        }
        else {
                uiType = 1;
        }

	var ui = new Main();
	ui.init(uiType);

});
