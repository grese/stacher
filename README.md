
# face-detection-demo

A face detection demo using the Google Vision API.

## Installation

1. Install [nodejs](https://nodejs.org/)
2. Install dependencies needed by [node-canvas](https://github.com/Automattic/node-canvas#installation)
    - `brew install pkg-config cairo pango libpng jpeg giflib`
3. `cd face-detect-demo`
4. `npm install`

# Usage

**Command format:**

`npm start -- --input=<INPUT_IMAGE> [--output=<OUTPUT_IMAGE>] [--log-faces=1|0]`

**Parameters:**

- `--input=<INPUT_FILE>` (*required) path where input image file is located.
- `--output=<OUTPUT_FILE>` (optional, default=./output/stached.png) path where output image will be stored.
- `--log-faces=0|1` (optional, default=0) whether or not to log faces response from google vision

**Examples:**
```shell
npm start -- --input=./images/trump.jpg --output=./output/trump-stache.png
```

```shell
npm start -- --input=./images/trump.jpg --log-faces=1
```

```shell
npm start -- --input=./images/trump.jpg
```