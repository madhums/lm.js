
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Project configuration.
  grunt.initConfig({
    qunit: {
      files: ['index.html']
    }
  });

  // Default task.
  grunt.registerTask('default', ['qunit']);
};
