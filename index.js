
const util = require('util');
const argv = require('yargs').argv;
const Logger = require('./src/logger');
const {detectFaces, drawStaches} = require('./src/stacher');
const instructions = `
----------------------------------------------------------------------------------------------
Stacher - Adds mustaches to faces.

Usage:
npm start --input=<Input Image Path> [--output=<Output Image Path>] [--log-faces=1]

Example:
npm start --  --input=~/Photos/trump.png --output=~/Photos/trump-stache.png --log-faces=1
----------------------------------------------------------------------------------------------
`;

function run(callback) {
  // read command line args...
  const inputFile = argv.input;
  const outputFile = argv.output || './output/stached.png';
  const stacheFile = argv.stache || './images/stache-2.png';
  const logFaces = argv['log-faces'] || false;
  
  if (!inputFile) {
    Logger.error('no input image specified.');
    Logger.log(instructions);
    return;
  }
  detectFaces(inputFile, (err, faces) => {
    if (err) {
      return callback(err);
    }
    drawStaches(inputFile, faces, outputFile, stacheFile, err => {
      if (err) {
        return callback(err);
      }

      Logger.log('\nGoogle VisionAPI Face Data:\n', util.inspect(faces, {depth:Infinity}));

      callback(null, faces);
    });
  });
}

run(err => {
  if (err) {
    Logger.error('Stacher error - ', err);
    return;
  }
  Logger.log('Done.');
});