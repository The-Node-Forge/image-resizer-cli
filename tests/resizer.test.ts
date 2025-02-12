import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

import {
  resizeImage,
  convertImage,
  batchResize,
  compressImage,
  getImageInfo,
} from '../src/resizer';

describe('Image Resizer', () => {
  const testInput = path.join(__dirname, 'sample.jpg');

  // ✅ Define output paths for all supported conversions
  const testOutputs = {
    jpg: path.join(__dirname, 'output.jpg'),
    png: path.join(__dirname, 'output.png'),
    webp: path.join(__dirname, 'output.webp'),
    tiff: path.join(__dirname, 'output.tiff'),
    avif: path.join(__dirname, 'output.avif'),
    invalid: path.join(__dirname, 'output.gif'),
  };

  const batchInputDir = path.join(__dirname, 'batch_input');
  const batchOutputDir = path.join(__dirname, 'batch_output');

  beforeEach(async () => {
    // ✅ Ensure test directories exist
    await fsPromises.mkdir(batchInputDir, { recursive: true });
  });

  afterEach(async () => {
    // ✅ Remove all generated test files
    await Promise.all(
      Object.values(testOutputs).map(async (file) => {
        if (fs.existsSync(file)) {
          await fsPromises.unlink(file);
        }
      }),
    );

    if (fs.existsSync(batchOutputDir)) {
      await fsPromises.rm(batchOutputDir, { recursive: true, force: true });
    }
  });

  test('should resize an image successfully', async () => {
    await resizeImage(testInput, testOutputs.jpg, 300, 200);
    expect(fs.existsSync(testOutputs.jpg)).toBe(true);
  });

  // ✅ Convert to all supported formats, including JPEG
  const supportedFormats = ['jpg', 'png', 'webp', 'tiff', 'avif'] as const;

  supportedFormats.forEach((format) => {
    test(`should convert an image to ${format.toUpperCase()} successfully`, async () => {
      await convertImage(testInput, testOutputs[format]);
      expect(fs.existsSync(testOutputs[format])).toBe(true);
    });
  });

  test('should fail when converting to an unsupported format', async () => {
    await expect(convertImage(testInput, testOutputs.invalid)).rejects.toThrow(
      'Invalid format: gif',
    );
  });

  test('should batch resize images', async () => {
    await fsPromises.copyFile(testInput, path.join(batchInputDir, 'test1.jpg'));
    await fsPromises.copyFile(testInput, path.join(batchInputDir, 'test2.jpg'));

    await batchResize(batchInputDir, batchOutputDir, 300, 200);

    expect(fs.existsSync(batchOutputDir)).toBe(true);
    expect(fs.readdirSync(batchOutputDir)).toHaveLength(2);
  });

  test('should compress an image', async () => {
    await compressImage(testInput, testOutputs.jpg, 80);
    expect(fs.existsSync(testOutputs.jpg)).toBe(true);
  });

  test('should return image metadata', async () => {
    const metadata = await getImageInfo(testInput);
    expect(metadata).toHaveProperty('width');
    expect(metadata).toHaveProperty('height');
  });
});
