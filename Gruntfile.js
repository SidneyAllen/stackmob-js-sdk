module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'watch': {
      files: '<%= jshint.all %>',
      tasks: 'lint'
    },
    'jshint': {
      options: {
        '-W069': true // ignore jshint suggestion to use dot notation
      },
      all: ['stackmob.js']
    },
    'uglify': {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> */',
        preserveComments: 'some'
      },
      bundled: {
        src: [
          'node_modules/json2/lib/JSON2/static/json2.js',
          'node_modules/underscore/underscore.js',
          'node_modules/underscore.deferred/underscore.deferred.js',
          'node_modules/backbone/backbone.js',
          'stackmob.js',
          'lib/cryptojs-3.1.2/hmac-sha1.js',
          'lib/cryptojs-3.1.2/enc-base64.js'
        ],
        dest: 'dist/stackmob-js-<%= pkg.version %>-bundled-min.js'
      },
      min: {
        src: [
          'stackmob.js',
          'lib/cryptojs-3.1.2/hmac-sha1.js',
          'lib/cryptojs-3.1.2/enc-base64.js'
        ],
        dest: 'dist/stackmob-js-<%= pkg.version %>-min.js'
      }
    },
    'concat': {
      dev: {
        src: [
          'stackmob.js',
          'lib/cryptojs-3.1.2/hmac-sha1.js',
          'lib/cryptojs-3.1.2/enc-base64.js'
        ],
        dest: 'dist/stackmob-js-<%= pkg.version %>.js'
      }
    },
    'regex-replace': {
      version: {
        src: ['stackmob.js'],
        actions: [{
          name: 'version',
          search: 'sdkVersion[ ]?:.*',
          replace: 'sdkVersion : \"<%= pkg.version %>\",',
          flags: ''
        }, {
          name: 'version',
          search: 'StackMob JS SDK Version.*',
          replace: 'StackMob JS SDK Version <%= pkg.version %>',
          flags: ''
        }]
      }
    },
    jasmine: {
      src: 'spec/init.js',
      options: {
        specs: [
          'test/spec/unit/*Spec.js'
        ],
        vendor: [
          'vendor/jquery.js',
          'test/lib/jquery.mockjax.js'
        ],
        helpers: [
          'dist/stackmob-js-*-bundled-min.js',
          'test/spec/unit/UnitTestHelper.js',
          'test/spec/unit/SetupUnitTests.js',
          'test/spec/unit/*Helper.js',
          'test/spec/unit/modifyExpiry.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-regex-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default use from command line
  grunt.registerTask('default', ['regex-replace', 'lint', 'uglify', 'concat']);

  grunt.registerTask('lint', ['jshint']);

  grunt.registerTask('test', ['default', 'jasmine']);

  // Default task for Travis CI
  grunt.registerTask('travis', ['test']);
};