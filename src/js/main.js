// === Include plugin files with gulp-include rule === //

//=include ../../bower_components/jquery/dist/jquery.js 
//=include ../../bower_components/slick-carousel/slick/slick.js

jQuery(document).ready(function($){

    var Site = {
        
        init: function() {
            Site.customFunction();
        },

        customFunction: function() {
            console.log('milllove');
        }

    };

    // here we go!
    Site.init();
});