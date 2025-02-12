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

// Resize an image
program
  .command('resize <input> <output>')
  .description('Resize an image')
  .option('-w, --width <number>', 'Width in pixels', parseInt)
  .option('-h, --height <number>', 'Height in pixels', parseInt)
  .action(async (input, output, options) => {
    try {
      await resizeImage(input, output, options.width, options.height);
      console.log(chalk.green(`✅ Image resized successfully!`));
    } catch (err) {
      console.error(
        chalk.red(`❌ Error: ${err instanceof Error ? err.message : err}`),
      );
    }
  });

// Convert an image to a different format
program
  .command('convert <input> <output>')
  .description('Convert an image to a different format (e.g., PNG to JPG)')
  .action(async (input, output) => {
    try {
      await convertImage(input, output);
      console.log(chalk.green(`✅ Image converted successfully: ${output}`));
    } catch (err) {
      console.error(chalk.red(`❌ Error: ${err.message}`));
    }
  });

// Batch resize multiple images
program
  .command('batch-resize <inputDir> <outputDir>')
  .description('Resize all images in a directory')
  .option('-w, --width <number>', 'Width in pixels', parseInt)
  .option('-h, --height <number>', 'Height in pixels', parseInt)
  .action(async (inputDir, outputDir, options) => {
    try {
      await batchResize(inputDir, outputDir, options.width, options.height);
      console.log(chalk.green(`✅ All images resized successfully!`));
    } catch (err) {
      console.error(chalk.red(`❌ Error: ${err.message}`));
    }
  });

// Compress an image
program
  .command('compress <input> <output>')
  .description('Compress an image while maintaining quality')
  .option('-q, --quality <number>', 'Quality (1-100)', parseInt)
  .action(async (input, output, options) => {
    try {
      await compressImage(input, output, options.quality || 80);
      console.log(chalk.green(`✅ Image compressed successfully: ${output}`));
    } catch (err) {
      console.error(chalk.red(`❌ Error: ${err.message}`));
    }
  });

// Get image metadata
program
  .command('info <input>')
  .description('Get metadata of an image')
  .action(async (input) => {
    try {
      const metadata = await getImageInfo(input);
      console.log(chalk.yellow(`📷 Image Info:`), metadata);
    } catch (err) {
      console.error(chalk.red(`❌ Error: ${err.message}`));
    }
  });

program.parse(process.argv);
