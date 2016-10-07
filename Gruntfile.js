module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/boostrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-boostrap/ui-bootstrap.min.js',
                    'bower_components/angular-boostrap/ui-bootstrap-tpls.min.js',
                ],
                dest: 'dist/js/vendor.js'
            }
        },
        clean: ['dist/**'],
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**'],
                        dest: 'dist/'
                    }

                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'concat', 'copy']);
}