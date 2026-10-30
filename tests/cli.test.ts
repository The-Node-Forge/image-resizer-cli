import { execFileSync, spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const root = path.join(__dirname, '..');
const cli = path.join(root, 'dist', 'bin', 'cli.js');
const sample = path.join(__dirname, 'sample.jpg');

function run(...args: string[]) {
  return spawnSync('node', [cli, ...args], { encoding: 'utf8' });
}

describe('CLI', () => {
  let tmp: string;

  beforeAll(() => {
    execFileSync(path.join(root, 'node_modules', '.bin', 'tsc'), [], { cwd: root });
  }, 60000);

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'img-resizer-cli-'));
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  test('--version reports the package.json version', () => {
    const { version } = JSON.parse(
      fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
    );
    const res = run('--version');
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe(version);
  });

  test('resize succeeds with exit code 0', () => {
    const out = path.join(tmp, 'out.jpg');
    const res = run('resize', sample, out, '--width', '40', '--height', '40');
    expect(res.status).toBe(0);
    expect(fs.existsSync(out)).toBe(true);
  });

  test('resize exits non-zero when the input is missing', () => {
    const res = run(
      'resize',
      path.join(tmp, 'nope.jpg'),
      path.join(tmp, 'o.jpg'),
      '-w',
      '10',
    );
    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/Error/);
  });

  test.each([['abc'], ['-5'], ['10.5'], ['1e3']])(
    'resize rejects non-integer width %p',
    (value) => {
      const res = run('resize', sample, path.join(tmp, 'o.jpg'), '--width', value);
      expect(res.status).not.toBe(0);
      expect(res.stderr).toMatch(/positive integer/);
    },
  );

  test('resize exits non-zero for an out-of-range width', () => {
    const res = run(
      'resize',
      sample,
      path.join(tmp, 'o.jpg'),
      '--width',
      '99999999',
    );
    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/Invalid width/);
  });

  test('compress exits non-zero for an out-of-range quality', () => {
    const res = run('compress', sample, path.join(tmp, 'o.jpg'), '--quality', '500');
    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/Invalid quality/);
  });

  test('compress defaults to quality 80 when omitted', () => {
    const out = path.join(tmp, 'o.jpg');
    expect(run('compress', sample, out).status).toBe(0);
    expect(fs.existsSync(out)).toBe(true);
  });

  test('convert exits non-zero for an unsupported format', () => {
    const res = run('convert', sample, path.join(tmp, 'o.gif'));
    expect(res.status).toBe(1);
  });

  test('batch-resize exits non-zero when output equals input', () => {
    const res = run('batch-resize', tmp, tmp, '-w', '10');
    expect(res.status).toBe(1);
    expect(res.stderr).toMatch(/must be different/);
  });

  test('info prints metadata and exits 0', () => {
    const res = run('info', sample);
    expect(res.status).toBe(0);
    expect(res.stdout).toMatch(/width/);
  });

  test('package "main" points at the library entry, not the CLI', async () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    expect(pkg.main).toBe('dist/index.js');
    // requiring the library must not execute the CLI or throw
    const lib = await import(path.join(root, pkg.main));
    expect(typeof lib.resizeImage).toBe('function');
  });
});
