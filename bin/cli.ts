/* eslint-disable @typescript-eslint/no-require-imports */

const { program } = require('commander');
const chalk = require('chalk');

const {
  resizeImage,
  convertImage,
  batchResize,
  compressImage,
  getImageInfo,
} = require('../src/resizer');

program
  .name('img-resizer')
  .description('CLI tool for resizing images')
  .version('1.0.0');

// resize an image
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
  .option('-w, --width <number>', 'Width in pixels', parseInt)
  .option('-h, --height <number>', 'Height in pixels', parseInt)
  .action(
    async (input: string, output: string, options: ResizeOptions): Promise<void> => {
      try {
        await resizeImage(input, output, options.width, options.height);
        console.log(chalk.green(`✅ Image resized successfully!`));
      } catch (err: unknown) {
        console.error(
          chalk.red(
            `❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
          ),
        );
      }
    },
  );

// Convert an image to a different format
program
  .command('convert <input> <output>')
  .description('Convert an image to a different format (e.g., PNG to JPG)')
  .action(async (input: string, output: string): Promise<void> => {
    try {
      await convertImage(input, output);
      console.log(chalk.green(`✅ Image converted successfully: ${output}`));
    } catch (err: unknown) {
      console.error(
        chalk.red(
          `❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        ),
      );
    }
  });

// batch resize multiple images
program
  .command('batch-resize <inputDir> <outputDir>')
  .description('Resize all images in a directory')
  .option('-w, --width <number>', 'Width in pixels', parseInt)
  .option('-h, --height <number>', 'Height in pixels', parseInt)
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
        console.error(
          chalk.red(
            `❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
          ),
        );
      }
    },
  );

// compress an image
program
  .command('compress <input> <output>')
  .description('Compress an image while maintaining quality')
  .option('-q, --quality <number>', 'Quality (1-100)', parseInt)
  .action(
    async (
      input: string,
      output: string,
      options: CompressOptions,
    ): Promise<void> => {
      try {
        await compressImage(input, output, options.quality || 80);
        console.log(chalk.green(`✅ Image compressed successfully: ${output}`));
      } catch (err: unknown) {
        console.error(
          chalk.red(
            `❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
          ),
        );
      }
    },
  );

// get image metadata
program
  .command('info <input>')
  .description('Get metadata of an image')
  .action(async (input: string): Promise<void> => {
    try {
      const metadata = await getImageInfo(input);
      console.log(chalk.yellow(`📷 Image Info:`), metadata);
    } catch (err: unknown) {
      console.error(
        chalk.red(
          `❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        ),
      );
    }
  });

program.parse(process.argv);
