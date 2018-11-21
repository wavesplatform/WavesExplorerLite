const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const awspublish = require('gulp-awspublish');
const cloudfront = require('gulp-cloudfront-invalidate');
var exec = require('child_process').exec;

const config = {
    package: {
        source: './package.json'
    },
    baseDir: 'src',
    releaseDirectory: 'dist'
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

gulp.task('clean', function (done) {
    return del([
        config.releaseDirectory + '/*',
        config.releaseDirectory
    ], done);
});

gulp.task('build', ['clean'], function (done) {
    exec('yarn run build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    })
});

gulp.task('copy', function () {
    return gulp.src('./manifest.json')
        .pipe(gulp.dest(config.releaseDirectory));
});

gulp.task('invalidate', function() {
    const settings = {
        accessKeyId: process.env.EXPLORER_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.EXPLORER_AWS_ACCESS_SECRET,
        distribution: 'EJSIVKMWKE29F',
        paths: ['/index.html']
    };

    return gulp.src('.')
        .pipe(cloudfront(settings));
});

gulp.task('upload', ['build', 'copy'], function () {
    var credentials = awsCredentials('eu-central-1', 'it-1166.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/**');
});

gulp.task('publish', ['build', 'copy', 'upload', 'invalidate']);
