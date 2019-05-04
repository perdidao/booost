module.exports = function(grunt){

var hb = require('./source/js/lib/hb');
	hb(grunt, grunt.option('lang'));

	var webpack = require('webpack'),
		webpackConfig = require("./webpack.config.js");

grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),

		watch:{
			options: {
				livereload: true
			},
			js:{
				files:[
				'source/js/**/*.js'
				],
				tasks:['webpack']
			},
			sass:{
				files:[
				'source/scss/**/*.scss'
				],
				tasks:['sass']
			},
			html: {
				files: ['source/templates/**', 'source/pages/**', 'source/elements/**', 'source/scripts/data/**'],
				tasks: ['hb:watch', 'webpack'],
				options: {
					atBegin: true
				}
			}
		},

		sass: {
			dev: {
				options: {
				style: 'compact'
				},
				files: {
				'develop/css/main.css': 'source/scss/main.scss'
				}
			},
			dist: {
				options: {
				style: 'compact'
				},
				files: {
				'dist/css/main.css': 'source/scss/main.scss'
				}
			},
		},

		connect: {
			server: {
				options: {
					port: 9000,
					base: './develop/',
					hostname: 'lucasalmeida.dev.br',
					livereload: true,
					open: true
				}
			}
		},

		webpack: {
			options: webpackConfig,
			build: {
				output: {
					path: require('path').resolve(__dirname, 'develop'),
					path: require('path').resolve(__dirname, 'dist'),
				},
				devtool: 'sourcemap',
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						'process.env': {
							'NODE_ENV': JSON.stringify('production')
						}
					}),
					new webpack.optimize.UglifyJsPlugin()
				)
			},
			watch: {
				progress: true,
				devtool: 'sourcemap',
				failOnError: false,
				keepalive: true
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'source/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/'
				}]
			}
		},

		cwebp: {
			dist: {
				expand: true,
				cwd: 'source/',
				src: ['**/*.png'],
				dest: 'dist/'
			}
		},

		clean: {
			dist: {
				src: ['dist']
			}
		},

		copy: {
			dev: {
				files: [
				{
					expand: true,
					cwd: 'source/js/libs/',
					src: '**',
					dest: 'develop/js/'
				},
				{
					expand: true,
					cwd: 'source/js/data/',
					src: '**',
					dest: 'develop/js/data/'
				},
				{
					expand: true,
					cwd: 'source/fonts/',
					src: '**',
					dest: 'develop/fonts/'
				},
				{
					expand: true,
					cwd: 'source/images/',
					src: '**',
					dest: 'develop/images/'
				}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'source/js/libs/',
						src: '**',
						dest: 'dist/js/'
					},
					{
						expand: true,
						cwd: 'source/js/data/',
						src: '**',
						dest: 'dist/js/data/'
					},
					{
						expand: true,
						cwd: 'source/fonts/',
						src: '**',
						dest: 'dist/fonts/'
					},
					{
						expand: true,
						cwd: 'source/fonts/',
						src: '**',
						dest: 'dist/fonts/'
					},
					{
						expand: true,
						cwd: 'source/images/',
						src: '**',
						dest: 'dist/images/'
					}
					]
			}
		},

		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5,
				title: 'Grunt watch',
				success: true,
				duration: 3
			}
		},

		hb: {
			options: {
				data: ['source/js/data/**/*.json'],
				partials: ['source/templates/**/*.hbs']
			},
			watch: {
				options: {
					more: {
						layout: "layouts/skel",
						cdn_url: "./"
					}
				},
				files: [
					{
						expand: true,
						cwd: 'source/pages/',
						src: '**/*.hbs',
						dest: './develop/',
						ext: '.html'
					}
				]
			},
			dist: {
				options: {
					bustCache: true,
					more: {
						layout: "layouts/skel",
						cdn_url: "./",
						date: ((function (d) { return [d.getFullYear(), (d.getMonth() + 1 + '').padStart(2, '0'), d.getDate()].join('-'); })(new Date()))
					}
				},
				files: [
					{
						expand: true,
						cwd: 'source/pages/',
						src: '**/*.hbs',
						dest: './dist/',
						ext: '.html'
					}
				]
			}
		},

		postcss: {
			options: {
				processors: [
					require('pixrem')(),
					require('autoprefixer')({browsers: 'last 2 versions'}),
					require('cssnano')()
				]
			},
			dev: {
				src: './develop/css/*.css'
			},
			dist: {
				src: './dist/css/*.css'
			}
		}


	});

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-cwebp');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-postcss');

	grunt.task.run('notify_hooks');

	// Default tasks
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('dev', ['sass:dev', 'copy:dev', 'hb:watch', 'connect:server', 'watch', 'webpack']);
	grunt.registerTask('build', ['clean:dev', 'sass:dev', 'postcss:dev', 'copy:dev', 'imagemin', 'cwebp', 'hb:dev', 'webpack']);
	grunt.registerTask('deploy', ['clean:dist', 'sass:dist', 'postcss:dist', 'copy:dist', 'imagemin', 'cwebp', 'hb:dist', 'webpack']);

};
