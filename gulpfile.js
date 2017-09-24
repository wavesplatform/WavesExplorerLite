const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const series = require('stream-series');
const order = require('gulp-order');
const inject = require('gulp-inject');
const del = require('del');
const templateCache = require('gulp-angular-templatecache');

const config = {
    libraries: {
        sources: [
            'node_modules/angular/angular.js',
            'node_modules/angular-loading-bar/build/loading-bar.js',
            'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/angular-recaptcha/release/angular-recaptcha.min.js'
        ],
        version: '1.6.6' // change this version if libraries are updated or changed
    },
    styles: [
        'node_modules/angular/angular-csp.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'src/css/style.css',
        'node_modules/angular-loading-bar/build/loading-bar.css',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
    ],
    fonts: 'src/fonts/*.*',
    icons: 'src/*.ico',
    html: 'src/templates/*.html',
    baseDir: 'src',
    buildDirectory: 'build',
    resultDirectory: 'distr'
};

function copyFiles(source, destination) {
    return gulp.src(source)
        .pipe(gulp.dest(destination))
}

function buildLibrariesScriptName() {
    return 'vendor-' + config.libraries.version + '.js';
}

function combineScripts(network) {
    gulp.src(config.libraries.sources)
        .pipe(concat(buildLibrariesScriptName()))
        .pipe(gulp.dest(config.buildDirectory + '/js'));

    gulp.src(config.html)
        .pipe(templateCache(
            'templates.js', {
                module: 'web',
                standAlone: false,
                root: '/templates/'
            }))
        .pipe(gulp.dest(config.buildDirectory + '/js'));

    return series(
            gulp.src('src/js/app.js'),
            gulp.src(['src/js/**/*.js', '!src/js/app.js', '!src/js/config.*']),
            gulp.src('src/js/config.' + network + '.js'))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.buildDirectory + '/js'));
}

gulp.task('scripts-testnet', function() {
    return combineScripts('testnet');
});

gulp.task('copy-css', function () {
    return gulp.src(config.styles)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(config.buildDirectory + '/css'))
});

gulp.task('copy-fonts', function () {
    return copyFiles(config.fonts, config.buildDirectory + '/fonts');
});

gulp.task('copy-icons', function () {
    return copyFiles(config.icons, config.buildDirectory);
});

gulp.task('copy-html', function () {
    return gulp.src(config.baseDir + '/index.html')
        .pipe(gulp.dest(config.buildDirectory));
});

gulp.task('patch-html', ['resources', 'scripts-testnet'], function () {
    return gulp.src(config.buildDirectory + '/index.html')
        .pipe(inject(series(
            gulp.src(config.buildDirectory + '/css/*.css', {read: false}),
            gulp.src(config.buildDirectory + '/js/vendor*.js', {read: false}),
            gulp.src(config.buildDirectory + '/js/bundle*.js', {read: false})
        ), {relative:true}))
        .pipe(gulp.dest(config.buildDirectory))
});

gulp.task('clean', function () {
    return del([
        config.buildDirectory + '/*',
        config.resultDirectory + '/*'
    ]);
});

gulp.task('resources', ['copy-css', 'copy-fonts', 'copy-icons', 'copy-html']);

gulp.task('default', ['clean', 'resources', 'scripts-testnet']);