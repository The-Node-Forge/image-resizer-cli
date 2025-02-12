import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Resize an image to the given dimensions.
 */
export async function resizeImage(
  inputPath: string,
  outputPath: string,
  width?: number,
  height?: number,
): Promise<void> {
  try {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to process image: ' + error.message);
    } else {
      throw new Error('An unknown error occurred while resizing the image.');
    }
  }
}

/**
 * Convert an image to a different format.
 */
export async function convertImage(
  inputPath: string,
  outputPath: string,
): Promise<void> {
  try {
    const format = path.extname(outputPath).slice(1).toLowerCase();

    const validFormats = ['jpeg', 'png', 'webp', 'tiff', 'avif'];

    if (!validFormats.includes(format)) {
      throw new Error(
        `Invalid format: ${format}. Supported formats: ${validFormats.join(', ')}`,
      );
    }

    await sharp(inputPath)
      .toFormat(format as keyof sharp.FormatEnum)
      .toFile(outputPath);
    console.log(`✅ Image converted successfully: ${outputPath}`);
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
 * Batch resize all images in a directory.
 */
export async function batchResize(
  inputDir: string,
  outputDir: string,
  width?: number,
  height?: number,
): Promise<void> {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs
      .readdirSync(inputDir)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

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
 * Compress an image while maintaining quality.
 */
export async function compressImage(
  inputPath: string,
  outputPath: string,
  quality: number,
): Promise<void> {
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
 * Get metadata of an image.
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
