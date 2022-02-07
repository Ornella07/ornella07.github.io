module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //-- tarea para comprimir el javascript
        uglify:{
            prod:{
                options: {
			        mangle: false,
			        banner: '/**\n * Script principal del sitio <%= pkg.name %>\n'+
			                ' * @author <%= pkg.author %>\n'+
			                ' * @version <%= pkg.version %>\n'+
			                ' * @date <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %>\n'+
			                ' */'
			        },
				  files: {
			    	'web/js/script.min.js':
				    [
					'node_modules/jquery/dist/jquery.min.js',
					'node_modules/swiper/swiper-bundle.js',
					'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
					'desarrollo/js/script.js'
				    ]
			    }
            }
        },

        //-- tarea para compilar sass a css
		sass: {
			prod:{
				options:{
					style: 'compressed'
				},
				files:{
					'web/css/style.css': 'desarrollo/sass/main.scss'
				}
			},
			dev : {
				options:{
					style:'expanded'

			},
			files:{
					'web/css/style.css':'desarrollo/sass/main.scss'
				}
			}
		},
		//compilador de bootstrap 
		'dart-sass': {
				dev: {
					options:{
						sourceMap: true
					},
					files:{
						'web/css/style.css' : 'desarrollo/sass/main.scss'
					}
				},
				prod: {
					options:{
						outputStyle:'compressed'
					},
					files:{
						'web/css/style.css':'desarrollo/sass/main.scss',
						'web/css/bootstrap.min.css' : 'node_modules/bootstrap/scss/bootstrap.scss',
						'web/css/swiper.min.css':'node_modules/swiper/swiper-bundle.css',
			            'web/css/fancybox.min.css': 'node_modules/@fancyapps/ui/src/Fancybox/Fancybox.scss',
						}
					}
					
			},

        //-- visualizador de archivos
        watch: {
			scriptFiles: {
				files: ['desarrollo/js/script.js'],
				tasks: ['uglify:prod']
			},
			sassFiles: {
				files: 'desarrollo/sass/{,*/}*.{scss,sass}',
				tasks: ['sass:prod']
			}
		},

        //-- sincronizacion automatica
        browserSync: {
			dev: {
				bsFiles: {
					src : [
						'web/css/*.css',
						'web/js/script.min.js',
						'web/*/*.html',
						'web/*.html'
					]
				},
				options: {
					watchTask: true,
					proxy: "http://localhost/laspastillas2/web/" //--> Esto es la URL de su proyecto
				}
			}
		}
    });

	
    //-- importamos las librerías para el desarrollo
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-dart-sass');

    //-- registro de tareas
    grunt.registerTask('default', ['browserSync','sass:prod','dart-sass:dev', 'watch']); 
    grunt.registerTask('produccion', ['uglify:prod', 'dart-sass:prod']);
};
