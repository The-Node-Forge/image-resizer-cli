const {
  resizeImage,
  convertImage,
  batchResize,
  compressImage,
  getImageInfo,
} = require('../src/resizer');
const fs = require('fs');
const path = require('path');

describe('Image Resizer', () => {
  const testInput = path.join(__dirname, 'sample.jpg');
  const testOutput = path.join(__dirname, 'output.jpg');
  const testConvertedPng = path.join(__dirname, 'output.png');
  const testConvertedWebp = path.join(__dirname, 'output.webp');
  const testInvalidFormat = path.join(__dirname, 'output.gif');
  const batchInputDir = path.join(__dirname, 'batch_input');
  const batchOutputDir = path.join(__dirname, 'batch_output');

  afterEach(() => {
    [testOutput, testConvertedPng, testConvertedWebp, testInvalidFormat].forEach(
      (file) => {
        if (fs.existsSync(file)) fs.unlinkSync(file);
      },
    );

    if (fs.existsSync(batchOutputDir)) {
      fs.rmdirSync(batchOutputDir, { recursive: true });
    }
  });

  test('should resize an image successfully', async () => {
    await resizeImage(testInput, testOutput, 300, 200);
    expect(fs.existsSync(testOutput)).toBe(true);
  });

  test('should convert an image to PNG successfully', async () => {
    await convertImage(testInput, testConvertedPng);
    expect(fs.existsSync(testConvertedPng)).toBe(true);
  });

  test('should convert an image to WebP successfully', async () => {
    await convertImage(testInput, testConvertedWebp);
    expect(fs.existsSync(testConvertedWebp)).toBe(true);
  });

  test('should fail when converting to an unsupported format', async () => {
    await expect(convertImage(testInput, testInvalidFormat)).rejects.toThrow(
      'Invalid format: gif',
    );
  });

  test('should batch resize images', async () => {
    fs.mkdirSync(batchInputDir, { recursive: true });
    fs.copyFileSync(testInput, path.join(batchInputDir, 'test1.jpg'));
    fs.copyFileSync(testInput, path.join(batchInputDir, 'test2.jpg'));

    await batchResize(batchInputDir, batchOutputDir, 300, 200);

    expect(fs.existsSync(batchOutputDir)).toBe(true);
    expect(fs.readdirSync(batchOutputDir)).toHaveLength(2);
  });

  test('should compress an image', async () => {
    await compressImage(testInput, testOutput, 80);
    expect(fs.existsSync(testOutput)).toBe(true);
  });

  test('should return image metadata', async () => {
    const metadata = await getImageInfo(testInput);
    expect(metadata).toHaveProperty('width');
    expect(metadata).toHaveProperty('height');
  });
});
