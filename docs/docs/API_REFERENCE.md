---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `resizeImage(inputPath, outputPath, width, height)`

Resizes an image to the specified width and height.

**Parameters:**

- `inputPath` - `string` - Path to the input image.
- `outputPath` - `string` - Path to save the resized image.
- `width` - `number` (optional) - Desired width in pixels.
- `height` - `number` (optional) - Desired height in pixels.

**Returns:**

- `Promise<void>` - Resolves when the image is successfully resized.

**Examples:**

```js
resizeImage('input.jpg', 'output.jpg', 300, 200);
```

---

### `convertImage(inputPath, outputPath)`

Converts an image to a different format based on the output file extension.

**Parameters:**

- `inputPath` - `string` - Path to the input image.
- `outputPath` - `string` - Path to save the converted image (e.g., `output.png`).

**Returns:**

- `Promise<void>` - Resolves when the image is successfully converted.

**Examples:**

```js
convertImage('input.jpg', 'output.png');
```

---

### `batchResize(inputDir, outputDir, width, height)`

Resizes all images in a directory.

**Parameters:**

- `inputDir` - `string` - Path to the directory containing images.
- `outputDir` - `string` - Path to save resized images.
- `width` - `number` (optional) - Desired width in pixels.
- `height` - `number` (optional) - Desired height in pixels.

**Returns:**

- `Promise<void>` - Resolves when all images are resized.

**Examples:**

```js
batchResize('images/', 'resized/', 500, 500);
```

---

### `compressImage(inputPath, outputPath, quality)`

Compresses an image while maintaining quality.

**Parameters:**

- `inputPath` - `string` - Path to the input image.
- `outputPath` - `string` - Path to save the compressed image.
- `quality` - `number` - Compression quality (1-100).

**Returns:**

- `Promise<void>` - Resolves when the image is successfully compressed.

**Examples:**

```js
compressImage('input.jpg', 'compressed.jpg', 80);
```

---

### `getImageInfo(inputPath)`

Retrieves metadata about an image (e.g., format, dimensions, size).

**Parameters:**

- `inputPath` - `string` - Path to the input image.

**Returns:**

- `Promise<object>` - Resolves with an object containing image metadata.

**Examples:**

```js
getImageInfo('input.jpg').then(console.log);
```
