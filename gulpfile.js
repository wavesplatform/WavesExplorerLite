const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const inject = require('gulp-inject');
const del = require('del');
const order = require('gulp-order');

const config = {
    libraries: [
        'node_modules/node_modules/angular/angular.js',
        'node_modules/angular-loading-bar/build/loading-bar.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/angular-recaptcha/release/angular-recaptcha.min.js',
    ],
    sources: [
        'src/js/**/*.js'
    ],
    styles: [
        'node_modules/angular/angular-csp.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'src/css/style.css',
        'node_modules/angular-loading-bar/build/loading-bar.css',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
    ],
    fonts: 'src/fonts/*.*',
    icons: 'src/*.ico',
    baseDir: 'src',
    buildDirectory: 'build',
    resultDirectory: 'distr'
};

function copyFiles(source, destination) {
    return gulp.src(source)
        .pipe(gulp.dest(destination))
}

function copyArray(array) {
    return array.slice(0);
}

function combineScripts(network) {
    var src = copyArray(config.libraries);
    config.sources.forEach(function (item) {
        src.push(item)
    });
    src.push('!' + config.baseDir + '/js/config.*');

    var sources = gulp.src(src);
    var configs = gulp.src(config.baseDir + '/js/config.' + network + '.js');

    var fileOrder = copyArray(config.libraries);
    fileOrder.push('src/js/app.js');

    return merge(sources, configs)
        .pipe(order(fileOrder))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.buildDirectory + '/js'))
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
        .pipe(inject(gulp.src([
            config.buildDirectory + '/css/*.css',
            config.buildDirectory + '/js/*.js'
        ], {read: false}), {relative:true}))
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