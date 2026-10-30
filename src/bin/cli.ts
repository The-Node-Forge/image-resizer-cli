#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */

const { program, InvalidArgumentError } = require('commander');
const chalk = require('chalk');

const { version } = require('../../package.json');
const {
  resizeImage,
  convertImage,
  batchResize,
  compressImage,
  getImageInfo,
} = require('../resizer');

program
  .name('img-resizer')
  .description('CLI tool for resizing images')
  .version(version);

function parseIntegerOption(value: string): number {
  if (!/^\d+$/.test(value)) {
    throw new InvalidArgumentError('Must be a positive integer.');
  }
  return Number(value);
}

function reportError(err: unknown): void {
  console.error(
    chalk.red(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`),
  );
  process.exitCode = 1;
}

interface ResizeOptions {
  width?: number;
  height?: number;
}

interface CompressOptions {
  quality?: number;
}

program
  .command('resize <input> <output>')
  .description('Resize an image')
  .option('-w, --width <number>', 'Width in pixels', parseIntegerOption)
  .option('-h, --height <number>', 'Height in pixels', parseIntegerOption)
  .action(
    async (input: string, output: string, options: ResizeOptions): Promise<void> => {
      try {
        await resizeImage(input, output, options.width, options.height);
        console.log(chalk.green(`✅ Image resized successfully!`));
      } catch (err: unknown) {
        reportError(err);
      }
    },
  );

program
  .command('convert <input> <output>')
  .description('Convert an image to a different format (e.g., PNG to JPG)')
  .action(async (input: string, output: string): Promise<void> => {
    try {
      await convertImage(input, output);
      console.log(chalk.green(`✅ Image converted successfully: ${output}`));
    } catch (err: unknown) {
      reportError(err);
    }
  });

program
  .command('batch-resize <inputDir> <outputDir>')
  .description('Resize all images in a directory')
  .option('-w, --width <number>', 'Width in pixels', parseIntegerOption)
  .option('-h, --height <number>', 'Height in pixels', parseIntegerOption)
  .action(
    async (
      inputDir: string,
      outputDir: string,
      options: ResizeOptions,
    ): Promise<void> => {
      try {
        await batchResize(inputDir, outputDir, options.width, options.height);
        console.log(chalk.green(`✅ All images resized successfully!`));
      } catch (err: unknown) {
        reportError(err);
      }
    },
  );

program
  .command('compress <input> <output>')
  .description('Compress an image while maintaining quality')
  .option('-q, --quality <number>', 'Quality (1-100)', parseIntegerOption)
  .action(
    async (
      input: string,
      output: string,
      options: CompressOptions,
    ): Promise<void> => {
      try {
        await compressImage(input, output, options.quality ?? 80);
        console.log(chalk.green(`✅ Image compressed successfully: ${output}`));
      } catch (err: unknown) {
        reportError(err);
      }
    },
  );

program
  .command('info <input>')
  .description('Get metadata of an image')
  .action(async (input: string): Promise<void> => {
    try {
      const metadata = await getImageInfo(input);
      console.log(chalk.yellow(`📷 Image Info:`), metadata);
    } catch (err: unknown) {
      reportError(err);
    }
  });

program.parse(process.argv);
