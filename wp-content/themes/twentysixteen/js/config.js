//if (typeof jQuery === 'function') {
//  define('jquery', function () { return jQuery; });
//}


// TODO check out optimization tool

requirejs.config({
  baseUrl: "/website/wordpress/wp-content/themes/twentysixteen/js/siolsitejs"
});

var pageTitle = document.title;
// Start the main app logic.
if (pageTitle == '3d game – siolsite'){
    requirejs(['oimo', 'three', 'v3d', 'gameInit'],
        function   (OIMO, THREE, V3D, gameInits) {
        }
    );
};
if (pageTitle == 'oimo demo – siolsite'){
    requirejs(['oimo', 'three', 'v3d','oimoDemo',],
        function   (OIMO, THREE, V3D, oimoDemo) {
        }
    );
};

