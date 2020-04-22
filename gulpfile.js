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

function buildApp(vars, env, done) {

    const cmd = `yarn run build:${env} ${ Object.entries(vars).map(([k,v]) => `--env.${k}=${v}`).join(' ')}`;

    exec(cmd, function (err, stdout, stderr) {
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
    buildApp({network: 'mainnet'}, 'prod', done);
}

function buildOfficialStaging(done) {
    buildApp({network: 'mainnet'}, 'dev', done);
}

function buildOfficialStagenet(done) {
    buildApp({network: 'stagenet', decompileUrl: 'https://nodes-stagenet.wavesnodes.com/utils/script/decompile'}, 'prod', done);
}

function buildDevnet(done) {
    buildApp({network: 'devnet'}, 'prod', done);
}

exports.buildOfficialProd = gulp.series(clean, buildOfficialProd);
exports.buildOfficialStaging = gulp.series(clean, buildOfficialStaging);
exports.buildOfficialStagenet = gulp.series(clean, buildOfficialStagenet);
exports.buildDevnet = gulp.series(clean, buildDevnet);
