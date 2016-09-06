define(['calendar'], function(calendar) {
    
    
    var calCont = document.getElementById('calCont');
    var $ = jQuery;
    
    console.log('calCont' + calCont);
    
     var calendar = $("#calCont").calendar(
            {
                tmpl_path: "/website/wordpress/wp-content/themes/twentysixteen/views/",
                events_source: function () { return []; }
            });   
    
    
});