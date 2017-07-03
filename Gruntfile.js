/*global module:false*/
module.exports = function (grunt) {

    var replaceVersion = function (content, target) {
        return content
            .replace(/CLIENT_VERSION\s*:\s*'[^']+'/, grunt.template.process("CLIENT_VERSION: '<%= pkg.version %>a'"))
            .replace(/NODE_ADDRESS\s*:\s*'[^']+'/, grunt.template.process("NODE_ADDRESS: '<%= meta.configurations." + target + ".server %>'"))
            .replace(/NETWORK_NAME\s*:\s*'[^']+'/, grunt.template.process("NETWORK_NAME: '<%= meta.configurations." + target + ".name %>'"))
            .replace(/NETWORK_CODE\s*:\s*'[^']+'/, grunt.template.process("NETWORK_CODE: '<%= meta.configurations." + target + ".code %>'"))
            .replace(/COINOMAT_ADDRESS\s*:\s*'[^']+'/, grunt.template.process("COINOMAT_ADDRESS: '<%= meta.configurations." + target + ".coinomat %>'"))
            .replace(/DATAFEED_ADDRESS\s*:\s*'[^']+'/, grunt.template.process("DATAFEED_ADDRESS: '<%= meta.configurations." + target + ".datafeed %>'"))
            .replace(/MATCHER_ADDRESS\s*:\s*'[^']+'/, grunt.template.process("MATCHER_ADDRESS: '<%= meta.configurations." + target + ".matcher %>'"));
    };

    var patchHtml = function (content, target) {
        return content;
    };

    var generateCopyDirectives = function (target) {
        return {
            files: [
                {expand: true, cwd: 'src', src: ['**/*', '!js/config*.js'], dest: 'distr/<%= meta.configurations.' + target + '.name %>/'},
                {expand: true, flatten: true, src: 'src/js/config.<%= meta.configurations.' + target + '.name %>.js', dest: 'distr/<%= meta.configurations.' + target + '.name %>/js/', ext: '.js', extDot: 'first'},
            ],
            options: {
                process: function (content, srcPath) {
                    if (srcPath.endsWith('index.html'))
                        return patchHtml(content, target);

                    return content;
                }
            }
        }
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            stylesheets: [
                'bower_components/angular/angular-csp.css',
                'bower_components/angular-material/angular-material.css',
                // application stylesheets
                'src/css/bootstrap.min.css',
                'src/css/loading-bar.min.css',
                'src/css/style.css'
            ],
            fonts: ['fonts/**'],
            content: ['*.ico', 'index.html'],
            configurations: {
                testnet: {
                    name: 'testnet',
                    config: 'config.testnet.js'
                },
                mainnet: {
                    name: 'mainnet',
                    config: 'config.mainner.js'
                }
            },
            dependencies: [
                'bower_components/angular/angular.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/angular-aria/angular-aria.js',
                'bower_components/angular-material/angular-material.js',
                'bower_components/Base58/Base58.js'
            ],
            application: [
                // project sources
                'src/js/ui.module.js',
                'src/js/ui.utils.service.js',
                'src/js/application.context.factory.js',
                'src/js/restangular.factories.js',
                'src/js/home.controller.js',
                'src/js/splash.controller.js',

                'src/js/app.js'
            ]
        },
        clean: ['build/**', 'distr/**'],
        copy: {
            options: {
                // if this line is not included copy corrupts binary files
                noProcess: ['**/*.{png,gif,jpg,ico,icns,psd,woff,woff2,svg,eot,ttf}']
            },
            testnet: generateCopyDirectives('testnet'),
            mainnet: generateCopyDirectives('mainnet')
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true, // debug
                commitFiles: ['package.json'],
                push: 'branch', // debug
                pushTo: 'origin',
                createTag: false,
                commitMessage: "chore(version): bumping version v%VERSION%"
            }
        },
        s3: {
            options: {
                accessKeyId: process.env['EXPLORER_AWS_ACCESS_KEY_ID'],
                secretAccessKey: process.env['EXPLORER_AWS_ACCESS_SECRET'],
                region: 'eu-central-1',
                dryRun: false
            },
            testnet: {
                options: {
                    bucket: 'testnet.wavesexplorer.com'
                },
                cwd: 'distr/<%= meta.configurations.testnet.name %>',
                src: '**/*'
            },
            mainnet: {
                options: {
                    bucket: 'wavesexplorer.com'
                },
                cwd: 'distr/<%= meta.configurations.mainnet.name %>',
                src: '**/*'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('distr', ['clean', 'build', 'copy']);
    grunt.registerTask('publish', ['bump', 'distr', 's3']);

    grunt.registerTask('build', [
    ]);

    // Default task.
    grunt.registerTask('default', ['distr']);
};
