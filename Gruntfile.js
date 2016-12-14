
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                options: {
                    beautify: false,
                    mangle: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/js/controllers.min.js': [
                        "app/app.js",
                        "app/components/restaurant/searchRestaurant.js"
                    ]
                }
            }
        },
        targethtml: {
            dev: {
                files: {
                    'index1.html': 'index_common.html'
                }
            },
            prod: {
                files: {
                    'index1.html': 'index_common.html'
                }
            }
        },
        cache_control: {
            your_target: {
                source: "index1.html",
                options: {
                    version: "2.0",
                    links: true,
                    scripts: true,
                    replace: false,
                    ignoreCDN: true,
                    outputDest: "index.html"

                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-cache-control');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-targethtml');

    grunt.registerTask('dev', ['targethtml:dev','cache_control']);
    grunt.registerTask('prod', ['uglify', 'targethtml:prod', 'cache_control' ]);


}
