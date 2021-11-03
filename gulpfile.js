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

    const cmd = `yarn run build:${env} ${Object.entries(vars).map(([k, v]) => `--env.${k}=${v}`).join(' ')}`;

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
    buildApp({
        network: 'mainnet',
        decompileUrl: 'https://nodes.wavesnodes.com/utils/script/decompile'
    }, 'prod', done);
}

function buildOfficialTestnet(done) {
    buildApp({
        network: 'testnet',
        decompileUrl: 'https://testnode1.wavesnodes.com/utils/script/decompile'
    }, 'prod', done);
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




exports.buildOfficialProd = gulp.series(clean, buildOfficialProd);
exports.buildOfficialTestnet = gulp.series(clean, buildOfficialTestnet);
exports.buildOfficialDocker = gulp.series(clean,buildOfficialProd, dockerImage,pushDockerImage);
