module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dev: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'stylesheets',
                    noLineComments: false,
                    debugInfo: true
                }
            },
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'stylesheets',
                    environment: 'production',
                    outputStyle: 'compressed',
                    noLineComments: true,
                    debugInfo: false
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 7']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: '<%= pkg.dir.css %>/*.css',
                dest: '<%= pkg.dir.dist %>/css/'
            }
        },
        watch: {
            compass: {
                files: '<%= pkg.dir.sass %>/**/*.scss',
                tasks: ['compass:dev']
            },
            autoprefixer: {
                files: '<%= pkg.dir.css %>/**/*.css',
                tasks: ['autoprefixer']
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7,
                    pngquant: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.dir.images %>',
                    src: ['**/*.png'],
                    dest: '<%= pkg.dir.dist %>/images/',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.dir.images %>',
                    src: ['**/*.jpg'],
                    dest: '<%= pkg.dir.dist %>/images/',
                    ext: '.jpg'
                }]
            },

        },
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('junk', ['uncss']);
    grunt.registerTask('dev', ['compass:dev', 'autoprefixer']);
    grunt.registerTask('build', ['imagemin', 'compass:dist', 'autoprefixer']);
}
