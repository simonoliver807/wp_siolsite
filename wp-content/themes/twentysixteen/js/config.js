//if (typeof jQuery === 'function') {
//  define('jquery', function () { return jQuery; });
//}


// TODO check out optimization tool

requirejs.config({
  baseUrl: "/website/wordpress/wp-content/themes/twentysixteen/js/siolsitejs",
  paths: {
    bstrap: '/website/wordpress/node_modules/bootstrap-sass/assets/javascripts/',
    corejs: '/website/wordpress/wp-includes/js/'
  }
});

var pageTitle = document.title;
// Start the main app logic.
if (pageTitle == '3d game – siolsite'){
    requirejs(['oimo', 'three', 'v3d', 'gameinit','orbitControls'],
        function (OIMO, THREE, V3D, OrbitControls) {
          
        }
    );
}

if (pageTitle == 'game sand box – siolsite'){
    requirejs(['oimo', 'three', 'v3d', 'gameSandBox'],
        function (OIMO, THREE, V3D) {
          
        }
    )
}

if (pageTitle == 'CBT Apps – siolsite'){
    requirejs(['calendar','bstrap/bootstrap','calendarinit','corejs/underscore.min'],
        function (calendar,bootstrap,calendarinit,underscore) {
        }
    );
}

