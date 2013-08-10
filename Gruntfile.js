module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: '<%= jshint.all %>',
            tasks: 'test'
        },
        jshint: {
            options: {
                '-W069': true,
                '-W033': true
            },
            all: ['stackmob.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> */'
            },
            dist: {
                src: [
                    'node_modules/json2/lib/JSON2/static/json2.js',
                    'node_modules/underscore/underscore.js',
                    'node_modules/backbone/backbone.js',
                    'stackmob.js'
                ],
                dest: 'stackmob-<%= pkg.version %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('test', ['jshint']);
};