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

function buildApp(network, done) {
    exec('yarn run app:prod --env.network=' + network, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    })
}

gulp.task('clean', function (done) {
    return del([
        config.releaseDirectory + '/*',
        config.releaseDirectory
    ], done);
});

gulp.task('build-mainnet', ['clean'], function (done) {
    buildApp('mainnet', done);
});

gulp.task('build-testnet', ['clean'], function (done) {
    buildApp('testnet', done);
});

gulp.task('build-devnet', ['clean'], function (done) {
    buildApp('devnet', done);
});

gulp.task('invalidate', ['upload'], function() {
    const settings = {
        accessKeyId: process.env.EXPLORER_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.EXPLORER_AWS_ACCESS_SECRET,
        distribution: 'EJSIVKMWKE29F',
        paths: ['/index.html']
    };

    return gulp.src('.')
        .pipe(cloudfront(settings));
});

gulp.task('upload', ['build'], function () {
    var credentials = awsCredentials('eu-central-1', 'it-1166.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/**');
});

gulp.task('publish-mainnet', ['build-mainnet', 'upload', 'invalidate']);
gulp.task('publish-testnet', ['build-testnet', 'upload', 'invalidate']);
gulp.task('publish-devnet', ['build-devnet', 'upload', 'invalidate']);

gulp.task('publish', ['build-mainnet', 'upload', 'invalidate']);
