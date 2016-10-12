//if (typeof jQuery === 'function') {
//  define('jquery', function () { return jQuery; });
//}


// TODO check out optimization tool

// requirejs.config({
//   baseUrl: "/scripts/",
//   paths: {
//     ddUtil: '/website/wordpress/htmlweb/app/scripts/ddUtil',
//     sMods: '/website/wordpress/htmlweb/app/scripts/sliderModjs',
//     game: '/website/wordpress/htmlweb/app/scripts/game',
//     wpFunc: '/website/wordpress/htmlweb/app/scripts/wp',
//     jquery: '/website/wordpress/htmlweb/app/scripts/lib/jquery/jquery-2.1.3',
//     jqueryUI: '/website/wordpress/htmlweb/app/scripts/lib/jquery-ui/jquery-ui',
//     jqueryTP: '/website/wordpress/htmlweb/app/scripts/lib/jqueryUItouchPunch/jquery.ui.touch-punch',
//     //jqueryMobile: '/website/wordpress/htmlweb/app/scripts/lib/jqueryMobile/jquery.mobile-1.4.5',
//     tinysort: '/website/wordpress/htmlweb/app/scripts/lib/tinysort/tinysort',
//     chartjs: '/website/wordpress/htmlweb/app/scripts/lib/chartjs/Chart.min',
//     niceScroll: '/website/wordpress/htmlweb/app/scripts/lib/niceScroll/niceScroll',
//     bstrap: '/website/wordpress/htmlweb/app/scripts/bootstrapjs/bootstrap',
//     bstrapCol: '/website/wordpress/htmlweb/app/scripts/bootstrapjs/bootstrap/collapse',
//     bstrapTran: '/website/wordpress/htmlweb/app/scripts/bootstrapjs/bootstrap/transition',
//     bstrapCaro: '/website/wordpress/htmlweb/app/scripts/bootstrapjs/bootstrap/carousel'
//   },
//   shim: {
//     'bstrap' : { 'deps' :['jquery'] },
//     'bstrapCol' : { 'deps' :['jquery'] },
//     'bstrapTran' : { 'deps' :['jquery'] },
//     'bstrapCaro' : { 'deps' :['jquery'] },
//     'niceScroll': { 'deps' :['jquery'] }
//   }
// });

  // 'jqueryUI','jqueryTP','jqueryMobile','tinysort','chartjs','niceScroll','bstrap','bstrapCol','bstrapTran','bstrapCaro'],


var pageTitle = document.title;

if (pageTitle == 'siolsite.com'){
    requirejs(['wpFunc/functions'],
        function (functions) {
          
        }
    );
}

// Start the main app logic.
if (pageTitle == '3d Game'){
    requirejs(['game/oimo', 'game/three', 'game/v3d', 'game/gameinit','game/main','wpFunc/functions'],
        function (OIMO, THREE, V3D, GAMEINIT, MAIN, functions) {
           var main = new MAIN;
           main.init(); 
        }
    );
}

if (pageTitle == 'Drag And Drop Utility'){
    requirejs(['ddUtil/createDragDropElement', 'ddUtil/dragDrop','wpFunc/functions','jquery','jqueryUI'],
        function (createDragDropElement, dragDrop, functions,jquery,jqueryUI) {
          
        }
    );
}

if (pageTitle == 'SOMYMU'){
    requirejs(['jquery','jqueryUI','jqueryTP','tinysort','chartjs','niceScroll','bstrap','bstrapCol','bstrapTran','bstrapCaro',
               'sMods/SetUI','sMods/TemplateModule','sMods/UIModule','sMods/TooltipModulesto','sMods/ButtonModule',
               'sMods/DoughNutModule','sMods/HighLight','sMods/Main','sMods/ScorerModule','sMods/SliderModule','sMods/SliderModuleYN',
               'sMods/Helper','wpFunc/functions'],
        function (jquery,jqueryUI,jqueryTP,tinysort,chartjs,niceScroll,bstrap,bstrapCol,bstrapTran,bstrapCaro,
                  SetUI,TemplateModule,UIModule,TooltipModulesto,ButtonModule,DoughNutModule,HighLight,Main,ScorerModule,
                  SliderModule,SliderModuleYN,Helper,functions) {

                }
        );
}




// if (pageTitle == 'CBT Apps – siolsite'){
//     requirejs(['calendar','calendarinit'],
//         function (calendar,bootstrap,calendarinit,underscore) {
//         }
//     );
// }

// if (pageTitle == 'CBT Apps – siolsite'){
//     requirejs(['calendar','bstrap/bootstrap','calendarinit','corejs/underscore.min','form_helpers'],
//         function (calendar,bootstrap,calendarinit,underscore,form_helpers) {
//         }
//     );
// }

