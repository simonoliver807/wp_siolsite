//if (typeof jQuery === 'function') {
//  define('jquery', function () { return jQuery; });
//}


// TODO check out optimization tool

requirejs.config({
  baseUrl: "/scripts/",
  paths: {
    ddUtil: '/scripts/ddUtil',
    sMods: '/scripts/sliderModjs',
    game: '/scripts/game'
    // jquery: '/scripts/lib/jquery/jquery-2.1.3',
    // jqueryUI: '/lib/jquery-ui/jquery-ui',
    // jqueryTP: '/lib/jqueryUItouchPunch/jquery.ui.touch-punch',
    // jqueryMobile: '/lib/jqueryMobile/jquery.mobile-1.4.5',
    // tinysort: 'lib/tinysort/tinysort',
    // chartjs: 'lib/chartjs/Chart.min',
    // niceScroll: '/lib/niceScroll/niceScroll',
    // bstrap: '/bootstrapjs/bootstrap',
    // bstrapCol: '/bootstrapjs/collapse',
    // bstrapTran: '/bootstrapjs/transition',
    // bstrapCaro: '/bootstrapjs/carousel'


  }
});

  // 'jqueryUI','jqueryTP','jqueryMobile','tinysort','chartjs','niceScroll','bstrap','bstrapCol','bstrapTran','bstrapCaro'],


var pageTitle = document.title;
// Start the main app logic.
if (pageTitle == '3d Game'){
    requirejs(['game/oimo', 'game/three', 'game/v3d', 'game/gameinit'],
        function (OIMO, THREE, V3D, gameinit) {
          
        }
    );
}

if (pageTitle == 'Drag And Drop Utility'){
    requirejs(['ddUtil/createDragDropElement', 'ddUtil/dragDrop'],
        function (createDragDropElement, dragDrop) {
          
        }
    )
}

if (pageTitle == 'SOMYMU'){
    requirejs(['sMods/SetUI','sMods/TemplateModule','sMods/UIModule','sMods/TooltipModulesto','sMods/ButtonModule',
               'sMods/DoughNutModule','sMods/HighLight','sMods/Main','sMods/ScorerModule','sMods/SliderModule','sMods/SliderModuleYN'],
        function (SetUI,TemplateModule,UIModule,TooltipModulesto,ButtonModule,DoughNutModule,HighLight,Main,ScorerModule,
                  SliderModule,SliderModuleYN) {

        }
    )
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

