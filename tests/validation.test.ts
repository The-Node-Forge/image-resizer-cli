import fs from 'fs';
import os from 'os';
import path from 'path';

import {
  resizeImage,
  batchResize,
  compressImage,
  MAX_DIMENSION,
} from '../src/resizer';

describe('Input validation', () => {
  const testInput = path.join(__dirname, 'sample.jpg');
  let tmp: string;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'img-resizer-validation-'));
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  test.each([
    ['zero', 0],
    ['negative', -5],
    ['fractional', 10.5],
    ['NaN', NaN],
    ['Infinity', Infinity],
    ['over the maximum', MAX_DIMENSION + 1],
  ])('resizeImage rejects a %s width', async (_label, width) => {
    const out = path.join(tmp, 'out.jpg');
    await expect(resizeImage(testInput, out, width, 100)).rejects.toThrow(
      /Invalid width/,
    );
    expect(fs.existsSync(out)).toBe(false);
  });

  test('resizeImage rejects an invalid height', async () => {
    await expect(
      resizeImage(testInput, path.join(tmp, 'out.jpg'), 100, -1),
    ).rejects.toThrow(/Invalid height/);
  });

  test('resizeImage accepts the smallest valid dimensions', async () => {
    await expect(
      resizeImage(testInput, path.join(tmp, 'out.png'), 1, 1),
    ).resolves.toBeUndefined();
  });

  test.each([0, 101, -1, 80.5, NaN])(
    'compressImage rejects quality %p',
    async (q) => {
      await expect(
        compressImage(testInput, path.join(tmp, 'o.jpg'), q),
      ).rejects.toThrow(/Invalid quality/);
    },
  );

  test('batchResize rejects invalid dimensions before touching the filesystem', async () => {
    const outDir = path.join(tmp, 'never-created');
    await expect(batchResize(tmp, outDir, 0, 10)).rejects.toThrow(/Invalid width/);
    expect(fs.existsSync(outDir)).toBe(false);
  });

  test('batchResize refuses to write into the input directory', async () => {
    const dir = path.join(tmp, 'photos');
    fs.mkdirSync(dir);
    fs.copyFileSync(testInput, path.join(dir, 'a.jpg'));
    const before = fs.readFileSync(path.join(dir, 'a.jpg'));

    await expect(batchResize(dir, dir + path.sep, 50, 50)).rejects.toThrow(
      /must be different from the input directory/,
    );
    expect(fs.readFileSync(path.join(dir, 'a.jpg')).equals(before)).toBe(true);
  });

  test('batchResize skips directories whose names look like images', async () => {
    const inDir = path.join(tmp, 'in');
    const outDir = path.join(tmp, 'out');
    fs.mkdirSync(path.join(inDir, 'folder.jpg'), { recursive: true });
    fs.copyFileSync(testInput, path.join(inDir, 'real.jpg'));

    await batchResize(inDir, outDir, 50, 50);

    expect(fs.readdirSync(outDir)).toEqual(['real.jpg']);
  });
});
