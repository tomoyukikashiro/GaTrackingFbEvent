module.exports = function(grunt) {

  "use strict";

  var lintFiles = [
    'js/GaTrackingFbEvent.js'
  ];

  // Project configuration.
  grunt.initConfig({

    // lint javascript file
    lint: {
      dev: lintFiles,
      prod: lintFiles
    },
    jshint: {
      files: lintFiles,
      options: {
        jshintrc: '.jshintrc',
        jshintignore: '.jshintignore'
      }
    },
    concat: {
      prod: {
        src: lintFiles,
        dest: '../dist/GaTrackingFbEvent.js'
      }
    },
    uglify: {
      dist: {
        files: {
          "../dist/GaTrackingFbEvent.min.js":['../dist/GaTrackingFbEvent.js']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  // load Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  // regist for js
  grunt.registerTask('prod', ['jshint', 'concat:prod', 'uglify']);
};
