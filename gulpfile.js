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
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        'src/css/style.css',
        'node_modules/angular-loading-bar/build/loading-bar.css'
    ],
    fonts: 'src/fonts/*.*',
    icons: 'src/*.ico',
    html: 'src/templates/*.html',
    package: {
        source: './package.json'
    },
    baseDir: 'src',
    buildDirectory: 'build',
    resultDirectory: 'distr'
};

config.package.data = JSON.parse(fs.readFileSync(config.package.source));

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

gulp.task('patch-html', ['resources', 'scripts'], function () {
    return gulp.src(config.buildDirectory + '/index.html')
        .pipe(inject(series(
            gulp.src(config.buildDirectory + '/css/*.css', {read: false}),
            gulp.src(config.buildDirectory + '/js/vendor*.js', {read: false}),
            gulp.src(config.buildDirectory + '/js/bundle*.js', {read: false}),
            gulp.src(config.buildDirectory + '/js/config*.js', {read: false}),
            gulp.src(config.buildDirectory + '/js/templates*.js', {read: false})
        ), {relative:true}))
        .pipe(injectVersion())
        .pipe(gulp.dest(config.buildDirectory))
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.*', ['clean', 'patch-html'])
});

gulp.task('clean', function () {
    return del([
        config.buildDirectory + '/*',
        config.resultDirectory + '/*'
    ]);
});

gulp.task('config-build-testnet', function () {
    return createConfig(config.buildDirectory, 'testnet');
});

gulp.task('resources', ['copy-css', 'copy-fonts', 'copy-icons', 'copy-html']);
gulp.task('default', ['clean', 'patch-html']);
gulp.task('build', ['clean', 'resources', 'templates', 'scripts', 'config-build-testnet'], function () {
    gulp.run('patch-html');
});