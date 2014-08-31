module.exports = function (grunt) {
    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            target: {
                src: 'src/js/*.js'
            }
        }

    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', ['jshint']);
}
