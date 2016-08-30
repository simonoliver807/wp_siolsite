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
grunt.registerTask('default', ['watch']);   

//grunt.registerTask('default', ['uglify','availabletasks','connect','watch']);
};