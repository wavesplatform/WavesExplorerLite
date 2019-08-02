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

function buildApp(network, env, done) {
    exec('yarn run build:' + env + ' --env.network=' + network, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    })
}

function dockerImage(done) {
    exec('docker build . -t waves-explorer:' + config.package.data.version, function (err, stdout, stderr) {
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

gulp.task('build-official-prod', ['clean'], function (done) {
    buildApp('mainnet', 'prod', done);
});

gulp.task('build-official-staging', ['clean'], function (done) {
    buildApp('mainnet', 'dev', done);
});

gulp.task('docker-official-prod', function (done) {
    dockerImage(done);
});

gulp.task('build-devnet', ['clean'], function (done) {
    buildApp('devnet', 'prod', done);
});

gulp.task('build-stagenet', ['clean'], function (done) {
    buildApp('stagenet', 'prod', done);
});

gulp.task('invalidate-official-staging', ['upload-official-staging'], function() {
    return invalidateCache('EJSIVKMWKE29F');
});

gulp.task('invalidate-devnet', ['upload-devnet'], function() {
    return invalidateCache('ECH0R3VC2E1B');
});

gulp.task('upload-official-staging', ['build-official-staging'], function () {
    var credentials = awsCredentials('eu-central-1', 'it-1166.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/**');
});

gulp.task('upload-official-prod', ['build-official-prod'], function () {
    var credentials = awsCredentials('eu-central-1', 'wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/**');
});

gulp.task('upload-devnet', ['build-devnet'], function () {
    var credentials = awsCredentials('eu-west-1', 'devnet.wavesexplorer.com');

    return publishToS3(credentials, config.releaseDirectory + '/**');
});

gulp.task('publish-official-staging', ['build-official-staging', 'upload-official-staging', 'invalidate-official-staging']);
gulp.task('publish-official-prod', ['build-official-prod', 'upload-official-prod']);
gulp.task('publish-devnet', ['build-devnet', 'upload-devnet', 'invalidate-devnet']);

gulp.task('publish', ['publish-official-staging']);
