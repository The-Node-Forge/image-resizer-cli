import sharp from 'sharp';

/**
 * Resize an image to the given dimensions.
 * @param inputPath - Path to the input image
 * @param outputPath - Path to the output image
 * @param width - New width (optional)
 * @param height - New height (optional)
 */
export async function resizeImage(
  inputPath: string,
  outputPath: string,
  width?: number,
  height?: number,
): Promise<void> {
  try {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
    console.log(`📷 Processed: ${inputPath} → ${outputPath} (${width}x${height})`);
  } catch (error) {
    throw new Error('Failed to process image: ' + (error as Error).message);
  }
}
