const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const series = require('stream-series');
const order = require('gulp-order');
const inject = require('gulp-inject');
const del = require('del');
const templateCache = require('gulp-angular-templatecache');
const fs = require('fs');
const git = require('gulp-git');
const bump = require('gulp-bump');
const injectVersion = require('gulp-inject-version');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const awspublish = require('gulp-awspublish');
const debug = require('gulp-debug');

const config = {
    libraries: {
        sources: [
            'node_modules/angular/angular.js',
            'node_modules/angular-loading-bar/build/loading-bar.js',
            'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/angular-recaptcha/release/angular-recaptcha.min.js',
            'node_modules/underscore/underscore.js',
            'node_modules/decimal.js/decimal.js',
            'node_modules/base-58/Base58.js',
            'node_modules/js-sha3/src/sha3.js',
            'node_modules/restangular/dist/restangular.js',
            'node_modules/angular-growl-v2/build/angular-growl.js',
            'node_modules/clipboard/dist/clipboard.js',
            'node_modules/ngclipboard/dist/ngclipboard.js',
            'node_modules/wavesplatform-core-js/distr/wavesplatform-core.js'
        ],
        version: '1.6.10' // change this version if libraries are updated or changed
    },
    styles: [
        'node_modules/angular/angular-csp.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        'src/css/ace-fonts.css',
        'src/css/ace.css',
        'src/css/ace-part2.css',
        'src/css/ace-skins.css',
        'node_modules/angular-loading-bar/build/loading-bar.css',
        'node_modules/angular-growl-v2/build/angular-growl.css',
        'src/css/style.css'
    ],
    fonts: 'src/fonts/*.*',
    icons: 'src/icons/*.*',
    html: 'src/templates/*.html',
    package: {
        source: './package.json'
    },
    baseDir: 'src',
    buildDirectory: 'build',
    releaseDirectory: 'distr'
};

config.package.data = JSON.parse(fs.readFileSync(config.package.source));

function awsCredentials(region, bucket) {
    return {
        accessKeyId: process.env.EXPLORER_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.EXPLORER_AWS_ACCESS_SECRET,
        region: region,
        params: {
            Bucket: bucket
        }
    }
}

function publishToS3(credentials, fileSpec) {
    var publisher = awspublish.create(credentials);

    return gulp.src(fileSpec)
        .pipe(publisher.publish())
        .pipe(awspublish.reporter());
}

function copyFiles(source, destination) {
    return gulp.src(source)
        .pipe(gulp.dest(destination))
}

function buildScriptName(name, version) {
    return name + '-' + version + '.js';
}

function createConfig(baseDir, network) {
    return gulp.src('src/js/config.' + network + '.js')
        .pipe(rename(buildScriptName('config', config.package.data.version)))
        .pipe(gulp.dest(baseDir + '/js'));
}

function copyAndConfigureRelease(network) {
    var releaseDirectory = config.releaseDirectory + '/' + network;

    return series(
        gulp.src([
            config.buildDirectory + '/**/*.*',
            '!' + config.buildDirectory + '/js/config*'
        ]).pipe(gulp.dest(releaseDirectory)),
        createConfig(releaseDirectory, network)
    );
}

gulp.task('scripts', function() {
    gulp.src(config.libraries.sources)
        .pipe(concat(buildScriptName('vendor', config.libraries.version)))
        .pipe(gulp.dest(config.buildDirectory + '/js'));

    return series(
            gulp.src('src/js/app.js'),
            gulp.src(['src/js/**/*.js', '!src/js/app.js', '!src/js/config.*']))
        .pipe(concat(buildScriptName('bundle', config.package.data.version)))
        .pipe(gulp.dest(config.buildDirectory + '/js'));
});

gulp.task('copy-css', ['clean'], function () {
    return gulp.src(config.styles)
        .pipe(concat('styles-' + config.package.data.version + '.css'))
        .pipe(gulp.dest(config.buildDirectory + '/css'))
});

gulp.task('copy-fonts', ['clean'], function () {
    return copyFiles(config.fonts, config.buildDirectory + '/fonts');
});

gulp.task('copy-icons', ['clean'], function () {
    return series(
        copyFiles(config.baseDir + '/favicon.ico', config.buildDirectory),
        copyFiles(config.icons, config.buildDirectory + '/icons')
    );
});

gulp.task('copy-html', ['clean'], function () {
    return copyFiles(config.baseDir + '/index.html', config.buildDirectory);
});

gulp.task('templates', function () {
    return gulp.src(config.html)
        .pipe(templateCache(
            buildScriptName('templates', config.package.data.version), {
                module: 'web',
                standAlone: false,
                root: '/templates/'
            }
        ))
        .pipe(gulp.dest(config.buildDirectory + '/js'));
});

gulp.task('bump', function () {
    return gulp.src(config.package.source)
        .pipe(bump())
        .pipe(gulp.dest('./'))
        .pipe(git.commit('chore(version): bumping version'));
});

gulp.task('patch-html', ['resources', 'scripts', 'templates', 'build-default-config'], function () {
    return gulp.src(config.buildDirectory + '/index.html')
        .pipe(inject(series(
            gulp.src(config.buildDirectory + '/css/*.css', {read: false}),
            gulp.src(config.buildDirectory + '/js/vendor*.js', {read: false}),
            gulp.src(config.buildDirectory + '/js/bundle*.js', {read: false}),
            gulp.src(config.buildDirectory + '/js/config*.js', {read: false}),
            gulp.src(config.buildDirectory + '/js/templates*.js', {read: false})
        ), {relative:false, ignorePath: config.buildDirectory}))
        .pipe(injectVersion())
        .pipe(gulp.dest(config.buildDirectory))
});

gulp.task('watch', function() {
    watch('./src/**/*.*', {read:false, readDelay:100}, batch(function (events, done) {
        gulp.start('build', done);
    }));
});

gulp.task('clean', function (done) {
    return del([
        config.buildDirectory + '/*',
        config.buildDirectory,
        config.releaseDirectory + '/*',
        config.releaseDirectory
    ], done);
});

gulp.task('build-default-config', function () {
    return createConfig(config.buildDirectory, 'testnet');
});

gulp.task('resources', ['copy-css', 'copy-fonts', 'copy-icons', 'copy-html']);
gulp.task('default', ['build']);
gulp.task('build', ['clean', 'patch-html']);
gulp.task('distr', ['clean', 'patch-html'], function () {
    return series(
        copyAndConfigureRelease('testnet'),
        copyAndConfigureRelease('mainnet'),
        copyAndConfigureRelease('devnet')
    );
});

gulp.task('publish-testnet', ['distr'], function () {
    var credentials = awsCredentials('eu-central-1', 'testnet.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/testnet/**');
});

gulp.task('publish-mainnet', ['distr'], function () {
    var credentials = awsCredentials('eu-central-1', 'wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/mainnet/**');
});

gulp.task('publish-devnet', ['distr'], function () {
    var credentials = awsCredentials('eu-west-1', 'devnet.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/devnet/**');
});

gulp.task('publish', ['publish-testnet', 'publish-mainnet', 'publish-devnet']);

