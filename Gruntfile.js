// Gruntfile.js

// Wrapper function (required by grunt and its plugins)
// All configuration goes inside this function
module.exports = function(grunt) {

    // =========================================================================
    // CONFIGURE GRUNT =========================================================
    // =========================================================================
    grunt.initConfig({

        // Get the configuration info from package.json,
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        express: {
            options: {
                background: true
            },
            web: {
                options: {
                    script: 'server.js'
                }
            }
        },

        // Configure jshint to validate js files
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },

            // When this task is run, lint the Gruntfile and all js files in public
            dev: ['Gruntfile.js', 'public/js/*.js'],
            production: ['Gruntfile.js', 'public/js/*.js']
        },

        // Configure uglify to minify js files
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            production: {
                files: {
                    'dist/js/scripts.min.js': 'public/js/scripts.js'
                    // Combine files with: 'dist/js/filename_combination.min.js': ['src/js/filename1.js', 'src/js/filename2.js']
                }
            }
        },

        // Compile less stylesheets to css
        less: {
            dev: {
                files: {
                    'public/css/main.css': 'public/less/main.less'
                }
            },
            production: {
                files: {
                    'public/css/main.css': 'public/less/main.less'
                }
            }
        },

        // Configure cssmin to minify css files
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dev: {
                files: {
                    'dist/css/main.min.css': 'public/css/main.css'
                }
            },
            production: {
                files: {
                    'dist/css/main.min.css': 'public/css/main.css'
                }
            }
        },

        // Configure watch to auto run tasks
        watch: {

            // Compile less when it changes
            less: {
                files: ['public/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    // livereload: true
                }
            },

            // Minify css when it changes
            css: {
                files: ['public/**/*.css'],
                tasks: ['cssmin:dev']
            },

            // For scripts, run jshint
            scripts: {
                files: 'public/**/*.js',
                tasks: ['jshint:dev']
            },

            // For livereloading any frontend files (templates, css, etc)
            frontend: {
                options: {
                    // livereload: true
                },
                files: [
                    'public/css/*.css',
                    'views/**/*.ejs'
                ]
            },

            // For loading the express server
            web: {
                files: [
                    'public/js/**/*.js'
                ],
                tasks: [
                    'express:web'
                ],
                options: {
                    nospawn: true,
                    atBegin: true
                }
            }
        },

        // Configure parallel to run tasks together
        parallel: {
            web: {
                options: {
                    stream: true
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['watch:less']
                    },
                    {
                        grunt: true,
                        args: ['watch:scripts']
                    },
                    {
                        grunt: true,
                        args: ['watch:frontend']
                    },
                    {
                        grunt: true,
                        args: ['watch:web']
                    }
                ]
            }
        }
    });

    // ============= CREATE TASKS ========== //
    // This is the primary development task to run the server and the watches
    grunt.registerTask('serve', ['parallel:web']);

    // This default task will go through all configuration (dev and production) in each task
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);

    // This task will only run the dev configuration
    grunt.registerTask('dev', ['jshint:dev', 'cssmin:dev', 'less:dev']);

    // Only run production configuration
    grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);

    // =========================================================================
    // LOAD GRUNT PLUGINS ======================================================
    // =========================================================================
    // We can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
