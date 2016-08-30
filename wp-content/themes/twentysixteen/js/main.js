//if (typeof jQuery === 'function') {
//  define('jquery', function () { return jQuery; });
//}


//requirejs.config({
//     baseUrl: requirejs.toUrl('/website/wordpress/wp-content/themes/twentysixteen')
//});


requirejs.config({

  baseUrl: "/website/wordpress/wp-content/themes/twentysixteen/js/siolsitejs"
});

var pageTitle = document.title;
console.log(pageTitle);; 
// Start the main app logic.
if (pageTitle == '3d game – siolsite'){
    requirejs(['oimo', 'three', 'gameInit','orbitControls'],
        function   (OIMO, THREE, gameInits, orbitControls) {
            //jQuery, canvas and the app/sub module are all
            //loaded and can be used here now.
            console.log(OIMO);
        }
    );
};

