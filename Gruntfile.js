module.exports = function(grunt) {
    grunt.initConfig({
       watch: {
           options: {
              livereload: true
          },
          html: {
            files: ['index.html']
          },
          js: {
            files: ['**/*.js']
          },
          php: {
              files: ['**/*.php']
          },
          css: {
            files: ['app/sass/*.scss'],
            tasks: ['sass']
          }
        },
        requirejs: {
             compile: {
                 options: {
                   baseUrl: '/website/wordpress/wp-content/themes/twentysixteen/js/siolsitejs',
                   mainConfigFile: '/website/wordpress/wp-content/themes/twentysixteen/js/config.js',
                  include: [ 'gameinit','oimo.js' ],
                  out: '/website/wordpress/wp-content/themes/twentysixteen/js/siolsitejs/optimized.js'
                }
          }
        }

      });

    
grunt.event.on('watch', function(action, filepath, target) {
  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
});

//   grunt.loadNpmTasks('grunt-available-tasks');
//   grunt.loadNpmTasks('grunt-contrib-connect');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-sass');
//   grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.registerTask('default', ['watch','requirejs']);   

//grunt.registerTask('default', ['uglify','availabletasks','connect','watch']);
};