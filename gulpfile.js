const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
var exec = require('child_process').exec;

const config = {
    package: {
        source: './package.json'
    },
    baseDir: 'src',
    releaseDirectory: 'dist'
};

config.package.data = JSON.parse(fs.readFileSync(config.package.source));


function buildApp(network, env, done) {
    exec('yarn run build:' + env + ' --env.network=' + network, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    })
}

function dockerImage(done) {
    exec('docker build . -t turtlenetwork/tn-explorer:' + config.package.data.version, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
}

function pushDockerImage(done){
    exec('docker push turtlenetwork/tn-explorer:' + config.package.data.version, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
}


gulp.task('clean', function (done) {
    return del([
        config.releaseDirectory + '/*',
        config.releaseDirectory
    ], done);
});

gulp.task('build-official-prod', gulp.series('clean', function (done) {
    buildApp('mainnet', 'prod', done);
}));

gulp.task('build-official-staging', gulp.series('clean', function (done) {
    buildApp('mainnet', 'dev', done);
}));

gulp.task('docker-prod', function (done) {
    dockerImage(done);
});
gulp.task('docker-push',gulp.series('docker-prod', function (done) {
    pushDockerImage(done);
}));

gulp.task('build-devnet', gulp.series('clean', function (done) {
    buildApp('devnet', 'prod', done);
}));


