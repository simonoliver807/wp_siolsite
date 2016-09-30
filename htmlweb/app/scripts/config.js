//if (typeof jQuery === 'function') {
//  define('jquery', function () { return jQuery; });
//}


// TODO check out optimization tool

requirejs.config({
  baseUrl: "/scripts/",
  paths: {
    ddUtil: '/scripts/ddUtil',
    sMods: '/scripts/sliderModjs'
    // ajax_submit: '/website/wordpress/wp-content/plugins/unyson/framework/static/js/'
  },
  shim: {
     'UIModule' : ['Helper','TooltipModulesto','TemplateModule']
  }
});


var pageTitle = document.title;
// Start the main app logic.
if (pageTitle == '3d Game'){
    requirejs(['oimo', 'three', 'v3d', 'gameinit'],
        function (OIMO, THREE, V3D) {
          
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
    requirejs(['sMods/TemplateModule','sMods/UIModule','sMods/TooltipModulesto','sMods/ButtonModule','sMods/Custom','sMods/DoughNutModule','sMods/HighLight','sMods/Main','sMods/ScorerModule','sMods/SliderModule','sMods/SliderModuleYN'],
        function (TemplateModule,UIModule,TooltipModulesto,ButtonModule,Custom,DoughNutModule,HighLight,Main,ScorerModule,SliderModule,SliderModuleYN) {

        }
    )
}
// if (pageTitle == 'CBT Apps – siolsite'){
//     requirejs(['calendar','calendarinit'],
//         function (calendar,bootstrap,calendarinit,underscore) {
//         }
//     );
// }

if (pageTitle == 'CBT Apps – siolsite'){
    requirejs(['calendar','bstrap/bootstrap','calendarinit','corejs/underscore.min','form_helpers'],
        function (calendar,bootstrap,calendarinit,underscore,form_helpers) {
        }
    );
}

