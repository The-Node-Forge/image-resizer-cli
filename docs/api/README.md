**@the-node-forge/image-resizer-cli**

---

<div align="center">

# Image Resizer CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Documentation](https://the-node-forge.github.io/image-resizer-cli/)

</div>

**Image Resizer CLI is a fast, lightweight, and versatile Node.js CLI tool for
resizing, converting, compressing, and optimizing images in JPEG, PNG, WebP, and
other formats. It supports batch processing, custom dimensions, and high-quality
compression using sharp. Ideal for developers, designers, and automation workflows
needing quick and efficient image manipulation directly from the command line.**

---

## ✨ Features

- ✅ **Resize Images** – Easily scale images to custom dimensions.
- ✅ **Batch Resize** – Resize multiple images at once.
- ✅ **Convert Image Format** – Change images to PNG, JPG, WebP, and more.
- ✅ **Compress Images** – Reduce file size while maintaining quality.
- ✅ **Retrieve Image Metadata** – View image details (format, size, dimensions).
- ✅ **Cross-Platform** – Works on Windows, macOS, and Linux.
- ✅ **Fast & Lightweight** – Uses `sharp` for efficient processing.
- ✅ **TypeScript Support** – Fully typed for safer development.

---

## 📚 Installation

```sh
npm install -g @the-node-forge/image-resizer-cli
```

or using Yarn:

```sh
yarn global add @the-node-forge/image-resizer-cli
```

---

## 🎯 **List of Commands**

| **Command**                                                                          | **Description**                                           |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `img-resizer resize <input> <output> --width <number> --height <number>`             | Resize an image to specific dimensions                    |
| `img-resizer convert <input> <output>`                                               | Convert an image to a different format (e.g., PNG to JPG) |
| `img-resizer batch-resize <inputDir> <outputDir> --width <number> --height <number>` | Resize all images in a directory                          |
| `img-resizer compress <input> <output> --quality <number>`                           | Compress an image with adjustable quality (1-100)         |
| `img-resizer info <input>`                                                           | Display image metadata (format, size, dimensions)         |
| `img-resizer --help`                                                                 | Show all available commands and options                   |

---

## 🛠️ **Basic Usage**

### **Resize an Image**

```bash
img-resizer resize input.jpg output.jpg --width 300 --height 200
```

### **Check the Resized File**

```bash
ls -lh output.jpg  # Check file details
open output.jpg     # Open file (macOS)
start output.jpg    # Open file (Windows)
```

### **Convert an Image Format**

```bash
img-resizer convert input.jpg output.png
```

### **Batch Resize Multiple Images**

```bash
img-resizer batch-resize images/ resized/ --width 500 --height 500
```

### **Compress an Image**

```bash
img-resizer compress input.jpg output.jpg --quality 80
```

### **Get Image Metadata**

```bash
img-resizer info input.jpg
```

---

## 📚 **Custom Output File Naming**

When using `img-resizer`, you can name the output file **whatever you want**,
including setting a custom directory.

### **Example Custom Naming**

```bash
img-resizer resize input.jpg my_custom_name.png --width 400 --height 300
```

- Output file: `my_custom_name.png`

```bash
img-resizer resize input.jpg /images/optimized-photo.webp --width 600 --height 400
```

- Output file: `/images/optimized-photo.webp`

If the output directory doesn’t exist, it will be **automatically created**.

---

## 👑 **Contributing**

Contributions are welcome! Please submit  
[issues](https://github.com/The-Node-Forge/image-resizer-cli/issues) or  
[pull requests](https://github.com/The-Node-Forge/image-resizer-cli/pulls).

---

### ⭐ Support

If you find this package useful, please **give it a ⭐ on**  
[GitHub](https://github.com/The-Node-Forge/image-resizer-cli 'GitHub Repository')

---

### 🔗 **Links**

- 📚 [NPM Package](https://www.npmjs.com/package/@the-node-forge/image-resizer-cli)
- 🏠 [The Node Forge](https://github.com/The-Node-Forge)
