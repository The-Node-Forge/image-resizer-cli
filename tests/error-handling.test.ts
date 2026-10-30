import fs from 'fs';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

import * as publicApi from '../src/index';
import {
  resizeImage,
  convertImage,
  batchResize,
  compressImage,
  getImageInfo,
} from '../src/resizer';

describe('Error handling (real sharp)', () => {
  let tmp: string;
  const missing = () => path.join(tmp, 'does-not-exist.jpg');

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'img-resizer-errors-'));
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  test('resizeImage wraps errors for a missing input', async () => {
    await expect(
      resizeImage(missing(), path.join(tmp, 'o.jpg'), 10, 10),
    ).rejects.toThrow(/^Failed to process image:/);
  });

  test('resizeImage rejects a file that is not an image', async () => {
    const bogus = path.join(tmp, 'bogus.jpg');
    fs.writeFileSync(bogus, 'definitely not an image');
    await expect(
      resizeImage(bogus, path.join(tmp, 'o.jpg'), 10, 10),
    ).rejects.toThrow(/^Failed to process image:/);
  });

  test('convertImage rethrows sharp errors for a missing input', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    await expect(convertImage(missing(), path.join(tmp, 'o.png'))).rejects.toThrow();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to convert image'),
    );
    spy.mockRestore();
  });

  test('convertImage treats an output without an extension as unsupported', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    await expect(
      convertImage(path.join(__dirname, 'sample.jpg'), path.join(tmp, 'noext')),
    ).rejects.toThrow(/Invalid format/);
    spy.mockRestore();
  });

  test('convertImage matches extensions case-insensitively', async () => {
    const out = path.join(tmp, 'OUT.PNG');
    await convertImage(path.join(__dirname, 'sample.jpg'), out);
    expect((await sharp(out).metadata()).format).toBe('png');
  });

  test('batchResize rejects when the input directory does not exist', async () => {
    // Note: under jest's vm realm, fs errors fail `instanceof Error`, so only assert rejection
    await expect(
      batchResize(path.join(tmp, 'nope'), path.join(tmp, 'out')),
    ).rejects.toThrow();
  });

  test('batchResize ignores unsupported files and creates nested output dirs', async () => {
    const inDir = path.join(tmp, 'in');
    fs.mkdirSync(inDir);
    fs.copyFileSync(path.join(__dirname, 'sample.jpg'), path.join(inDir, 'A.JPG'));
    fs.writeFileSync(path.join(inDir, 'notes.txt'), 'skip me');
    const outDir = path.join(tmp, 'a', 'b', 'out');

    await batchResize(inDir, outDir, 20, 20);

    expect(fs.readdirSync(outDir)).toEqual(['A.JPG']);
  });

  test('batchResize surfaces a corrupt image in the batch', async () => {
    const inDir = path.join(tmp, 'in');
    fs.mkdirSync(inDir);
    fs.writeFileSync(path.join(inDir, 'broken.png'), 'nope');
    await expect(batchResize(inDir, path.join(tmp, 'out'), 20, 20)).rejects.toThrow(
      /Failed to batch resize images: Failed to process image/,
    );
  });

  test('compressImage wraps errors for a missing input', async () => {
    await expect(
      compressImage(missing(), path.join(tmp, 'o.jpg'), 80),
    ).rejects.toThrow(/^Failed to compress image:/);
  });

  test('compressImage output is smaller at lower quality', async () => {
    const hi = path.join(tmp, 'hi.jpg');
    const lo = path.join(tmp, 'lo.jpg');
    await compressImage(path.join(__dirname, 'sample.jpg'), hi, 95);
    await compressImage(path.join(__dirname, 'sample.jpg'), lo, 10);
    expect(fs.statSync(lo).size).toBeLessThan(fs.statSync(hi).size);
  });

  test('compressImage writes real AVIF data for an .avif output', async () => {
    const out = path.join(tmp, 'o.avif');
    await compressImage(path.join(__dirname, 'sample.jpg'), out, 50);
    expect((await sharp(out).metadata()).format).toBe('heif');
  }, 30000);

  test('getImageInfo wraps errors for a missing input', async () => {
    await expect(getImageInfo(missing())).rejects.toThrow(
      /^Failed to get image metadata:/,
    );
  });

  test('resizeImage uses contain: output has the requested size and keeps aspect ratio', async () => {
    const out = path.join(tmp, 'contain.png');
    await resizeImage(path.join(__dirname, 'sample.jpg'), out, 50, 50);
    const meta = await sharp(out).metadata();
    expect([meta.width, meta.height]).toEqual([50, 50]);
    expect(meta.hasAlpha).toBe(true);
  });
});

describe('Non-Error rejections', () => {
  // sharp is mocked in an isolated module registry so the real tests above are unaffected
  let fns: typeof import('../src/resizer');

  beforeEach(() => {
    jest.resetModules();
    jest.doMock('sharp', () => {
      const thrower = () => {
        throw 'boom';
      };
      return Object.assign(thrower, {});
    });
    fns = require('../src/resizer'); // eslint-disable-line @typescript-eslint/no-require-imports
  });

  afterEach(() => {
    jest.dontMock('sharp');
  });

  test('resizeImage', async () => {
    await expect(fns.resizeImage('a.jpg', 'b.jpg', 1, 1)).rejects.toThrow(
      'An unknown error occurred while resizing the image.',
    );
  });

  test('convertImage', async () => {
    await expect(fns.convertImage('a.jpg', 'b.png')).rejects.toThrow(
      'An unknown error occurred while converting the image.',
    );
  });

  test('compressImage', async () => {
    await expect(fns.compressImage('a.jpg', 'b.jpg', 80)).rejects.toThrow(
      'An unknown error occurred while compressing the image.',
    );
  });

  test('getImageInfo', async () => {
    await expect(fns.getImageInfo('a.jpg')).rejects.toThrow(
      'An unknown error occurred while retrieving image metadata.',
    );
  });

  test('batchResize with a non-Error from the filesystem', async () => {
    jest.spyOn(fs, 'readdirSync').mockImplementation(() => {
      throw 'fs-boom';
    });
    await expect(
      fns.batchResize(os.tmpdir(), path.join(os.tmpdir(), 'x')),
    ).rejects.toThrow('An unknown error occurred while batch resizing images.');
    jest.restoreAllMocks();
  });
});

describe('Public API', () => {
  test('index re-exports every library function', () => {
    expect(Object.keys(publicApi).sort()).toEqual(
      [
        'batchResize',
        'compressImage',
        'convertImage',
        'getImageInfo',
        'resizeImage',
      ].sort(),
    );
    expect(publicApi.resizeImage).toBe(resizeImage);
  });
});
