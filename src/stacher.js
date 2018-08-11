
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');
const Canvas = require('canvas');
const Logger = require('./logger');

function detectFaces(inputFile, callback) {
  // Detect the faces & facial attributes using Google's Vision API.
  const request = {image: {source: {filename: inputFile}}};
  
  return client.faceDetection(request).then(results => {
    const faces = results[0].faceAnnotations;
    const numFaces = faces.length;
    
    Logger.log('Found ' + numFaces + (numFaces === 1 ? ' face' : ' faces'));
    callback(null, faces);
  })
  .catch(err => {
    callback(err);
  });
}

function drawStaches(inputFile, faces, outputFile, stacheFile, callback) {
  fs.readFile(inputFile, (err, image) => {
    if (err) {
      return callback(err);
    }

    const Image = Canvas.Image;
    
    // Render the original image into a Canvas.
    const img = new Image();
    img.src = image;
    const canvas = new Canvas(img.width, img.height);
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);

    // Draw a mustache on each face.
    faces.forEach(face => {
      // Look for the edges of the mouth, bottom of nose, and upper lip.
      const {landmarks} = face;
      const mouthLeft = (landmarks.find(l => l.type === 'MOUTH_LEFT') || {}).position;
      const mouthRight = (landmarks.find(l => l.type === 'MOUTH_RIGHT') || {}).position;
      const noseBottomCenter = (landmarks.find(l => l.type === 'NOSE_BOTTOM_CENTER') || {}).position;
      const upperLip = (landmarks.find(l => l.type === 'UPPER_LIP') || {}).position;

      // Create an image object for the mustache.
      const stacheImage = new Image();
      stacheImage.src = stacheFile;

      let rotation = 0;
      if (mouthLeft.y != mouthRight.y) {

      }

      // Calculate mustache size, and position.
      const stacheOffsetFactor = .3;
      const stacheOffsetY = (upperLip.y - noseBottomCenter.y) * stacheOffsetFactor;
      const stacheOffsetX = (mouthRight.x - mouthLeft.x) * stacheOffsetFactor;
      const stacheWidth = mouthRight.x - mouthLeft.x + stacheOffsetX;
      const stacheHeight = upperLip.y - noseBottomCenter.y;
      const stacheX = mouthLeft.x - (stacheOffsetX / 2);
      const stacheY = noseBottomCenter.y + stacheOffsetY;
      const stacheRatio = stacheWidth / stacheHeight;
      const stacheAdjWidth = stacheWidth;
      const stacheAdjHeight = stacheWidth / stacheRatio;

      // Draw the mustache on the face.
      context.drawImage(
        stacheImage,
        stacheX,
        stacheY,
        stacheAdjWidth,
        stacheAdjHeight
      );
    });

    // Output the result to a file.
    const writeStream = fs.createWriteStream(outputFile);
    const pngStream = canvas.pngStream();

    pngStream.on('data', chunk => {
      writeStream.write(chunk);
    });
    pngStream.on('error', console.log);
    pngStream.on('end', callback);
  });
}

module.exports = {
  detectFaces,
  drawStaches
};