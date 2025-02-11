#!/usr/bin/env node

const { program } = require("commander");
const { resizeImage } = require("../src/resizer");
const chalk = require("chalk");

program
  .name("img-resizer")
  .description("CLI tool for resizing images")
  .version("1.0.0");

program
  .command("resize <input> <output>")
  .description("Resize an image")
  .option("-w, --width <number>", "Width in pixels", parseInt)
  .option("-h, --height <number>", "Height in pixels", parseInt)
  .action(async (input, output, options) => {
    try {
      await resizeImage(input, output, options.width, options.height);
      console.log(chalk.green(`✅ Image resized successfully!`));
    } catch (err) {
      console.error(chalk.red(`❌ Error: ${err instanceof Error ? err.message : err}`));
    }
  });

program.parse(process.argv);
