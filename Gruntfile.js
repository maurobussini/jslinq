module.exports = function (grunt) {

    //Source file definition
    var files = [
        "src/*js",
        "test/*js"
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: 
					'//! <%= pkg.name %>\n' + 
					'//! <%= pkg.description %>\n' +
					'//! version : <%= pkg.version %>\n' + 
					'//! authors : <%= pkg.author %>\n' + 
					'//! license : <%= pkg.license %>\n' + 
					'//! built   : <%= grunt.template.today("yyyy-mm-dd") %>\n' + 
					'//! https://github.com/maurobussini/jslinq\n'
            },
            build: {
                src: 'src/<%= pkg.name %>*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            files: files
        },
        watch: {
            files: files,
            tasks: ["jshint"]
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};