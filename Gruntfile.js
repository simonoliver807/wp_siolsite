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
              files: ['../index.php','/wp-includes/*.php','/wp-config.php','wp-admin/**/*.php','wp-content/**/*.php','!wp-content/uploads/**/*.php']
          },
          css: {
            files: ['app/sass/*.scss'],
            tasks: ['sass']
          }
        },
        requirejs: {
          compile: {
            options: {
              appDir: 'wp-content/themes/twentysixteen/js/siolsitejs/',
              baseUrl: '.',
              dir: 'target/',
              optimize: 'uglify',
              mainConfigFile: './wp-content/themes/twentysixteen/js/config.js',
              modules:[
                {
                  name: 'gameInit'
                }
              ],
              logLevel: 0,
              findNestedDependencies: true,
              fileExclusionRegExp: /^\./,
              inlineText: true
            }
          }
        }
  });    
    grunt.event.on('watch', function(action, filepath, target) {
      grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['watch']);    
}