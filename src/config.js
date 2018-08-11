const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
let configObj;

if (!configObj) {
  // Load the config file if 
  configObj = yaml.safeLoad(
    fs.readFileSync(
      path.resolve(path.dirname(require.main.filename), '.conf.yaml'), 
      'utf8'
    )
  );
}

module.exports = configObj;
