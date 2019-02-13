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

function invalidateCache(distributionId) {
    const settings = {
        accessKeyId: process.env.EXPLORER_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.EXPLORER_AWS_ACCESS_SECRET,
        distribution: distributionId,
        paths: ['/index.html']
    };

    return gulp.src('.')
        .pipe(cloudfront(settings));
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

gulp.task('invalidate-mainnet', ['upload-mainnet'], function() {
    return invalidateCache('EJSIVKMWKE29F');
});

gulp.task('invalidate-devnet', ['upload-devnet'], function() {
    return invalidateCache('ECH0R3VC2E1B');
});

gulp.task('invalidate-testnet', function() {
    return invalidateCache('EQKVTOJX3PEGY');
});

gulp.task('upload-mainnet', ['build-mainnet'], function () {
    var credentials = awsCredentials('eu-central-1', 'it-1166.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/**');
});

gulp.task('upload-devnet', ['build-devnet'], function () {
    var credentials = awsCredentials('eu-west-1', 'devnet.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/**');
});


gulp.task('publish-mainnet', ['build-mainnet', 'upload-mainnet', 'invalidate-mainnet']);
gulp.task('publish-devnet', ['build-devnet', 'upload-devnet', 'invalidate-devnet']);

gulp.task('publish', ['publish-mainnet']);
