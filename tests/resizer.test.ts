const { resizeImage } = require('../src/resizer');
const fs = require('fs');
const path = require('path');

describe('Image Resizer', () => {
  const testInput = path.join(__dirname, 'sample.jpg');
  const testOutput = path.join(__dirname, 'output.jpg');

  afterEach(() => {
    if (fs.existsSync(testOutput)) {
      fs.unlinkSync(testOutput);
    }
  });

  test('should resize an image successfully', async () => {
    await resizeImage(testInput, testOutput, 300, 200);

    expect(fs.existsSync(testOutput)).toBe(true);
  });

  test('should fail for non-existent file', async () => {
    await expect(
      resizeImage('tests/nonexistent.jpg', testOutput, 300, 200),
    ).rejects.toThrow();
  });
});
