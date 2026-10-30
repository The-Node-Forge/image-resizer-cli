import sharp, { type FormatEnum } from 'sharp';
import fs from 'fs';
import path from 'path';

/** Largest edge (in pixels) accepted for resize operations; matches libvips' limit. */
export const MAX_DIMENSION = 16383;

function assertDimension(value: number | undefined, name: string): void {
  if (value === undefined) return;
  if (!Number.isInteger(value) || value < 1 || value > MAX_DIMENSION) {
    throw new Error(
      `Invalid ${name}: ${value}. Must be an integer between 1 and ${MAX_DIMENSION}.`,
    );
  }
}

/**
 * Resize an image, preserving the whole image (`contain`) on a transparent background.
 *
 * @param inputPath - Path of the source image.
 * @param outputPath - Path to write the resized image to.
 * @param width - Target width in pixels (1-16383).
 * @param height - Target height in pixels (1-16383).
 * @throws If a dimension is not a positive integer within range, or processing fails.
 */
export async function resizeImage(
  inputPath: string,
  outputPath: string,
  width?: number,
  height?: number,
): Promise<void> {
  assertDimension(width, 'width');
  assertDimension(height, 'height');

  try {
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(outputPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to process image: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while resizing the image.');
    }
  }
}

/**
 * Convert an image to the format implied by the output file extension.
 *
 * @param inputPath - Path of the source image.
 * @param outputPath - Output path; its extension (jpg, jpeg, png, webp, tiff, avif) selects the format.
 * @throws If the extension is unsupported or conversion fails.
 */
export async function convertImage(
  inputPath: string,
  outputPath: string,
): Promise<void> {
  try {
    let format = path.extname(outputPath).slice(1).toLowerCase();

    if (format === 'jpg') format = 'jpeg';

    const validFormats = ['jpeg', 'png', 'webp', 'tiff', 'avif'];

    if (!validFormats.includes(format)) {
      throw new Error(
        `Invalid format: ${format}. Supported formats: ${validFormats.join(', ')}`,
      );
    }

    await sharp(inputPath)
      .toFormat(format as keyof FormatEnum)
      .toFile(outputPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Failed to convert image: ' + error.message);
      throw error;
    } else {
      throw new Error('An unknown error occurred while converting the image.');
    }
  }
}

/**
 * Resize every supported image (jpg, jpeg, png, webp, tiff, avif) in a directory.
 * Refuses to run when the output directory is the input directory, since that would
 * overwrite the originals.
 *
 * @param inputDir - Directory containing the source images.
 * @param outputDir - Directory to write resized images to (created if missing).
 * @param width - Target width in pixels (1-16383).
 * @param height - Target height in pixels (1-16383).
 * @throws If the directories are the same, a dimension is invalid, or any image fails.
 */
export async function batchResize(
  inputDir: string,
  outputDir: string,
  width?: number,
  height?: number,
): Promise<void> {
  assertDimension(width, 'width');
  assertDimension(height, 'height');

  try {
    if (path.resolve(inputDir) === path.resolve(outputDir)) {
      throw new Error(
        'Output directory must be different from the input directory.',
      );
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const supportedFormats = /\.(jpg|jpeg|png|webp|tiff|avif)$/i;

    const files = fs
      .readdirSync(inputDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && supportedFormats.test(entry.name))
      .map((entry) => entry.name);

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      await resizeImage(inputPath, outputPath, width, height);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to batch resize images: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while batch resizing images.');
    }
  }
}

/**
 * Compress an image as JPEG while maintaining quality.
 *
 * @param inputPath - Path of the source image.
 * @param outputPath - Path to write the compressed JPEG to.
 * @param quality - JPEG quality, an integer from 1 to 100.
 * @throws If quality is out of range or compression fails.
 */
export async function compressImage(
  inputPath: string,
  outputPath: string,
  quality: number,
): Promise<void> {
  if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
    throw new Error(
      `Invalid quality: ${quality}. Must be an integer between 1 and 100.`,
    );
  }

  try {
    await sharp(inputPath).jpeg({ quality }).toFile(outputPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to compress image: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while compressing the image.');
    }
  }
}

/**
 * Read an image's metadata (format, dimensions, channels, etc.).
 *
 * @param inputPath - Path of the image.
 * @returns The sharp metadata object.
 * @throws If the file cannot be read as an image.
 */
export async function getImageInfo(inputPath: string): Promise<object> {
  try {
    return await sharp(inputPath).metadata();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to get image metadata: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while retrieving image metadata.');
    }
  }
}
