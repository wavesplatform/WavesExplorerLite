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

function clean() {
    return del([
        config.releaseDirectory + '/*',
        config.releaseDirectory
    ]);
}

function buildOfficialProd(done) {
    buildApp('mainnet', 'prod', done);
}

function buildOfficialStaging(done) {
    buildApp('mainnet', 'dev', done);
}

function buildDevnet(done) {
    buildApp('devnet', 'prod', done);
}

exports.buildOfficialProd = gulp.series(clean, buildOfficialProd);
exports.buildOfficialStaging = gulp.series(clean, buildOfficialStaging);
exports.buildDevnet = gulp.series(clean, buildDevnet);
