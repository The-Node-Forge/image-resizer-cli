---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

### Basic Example

#### **Resize an Image**

```sh
img-resizer resize input.jpg output.jpg --width 300 --height 200
```

#### **Convert an Image Format**

```sh
img-resizer convert input.jpg output.png
```

#### **Batch Resize Multiple Images**

```sh
img-resizer batch-resize images/ resized/ --width 500 --height 500
```

#### **Compress an Image**

```sh
img-resizer compress input.jpg output.jpg --quality 80
```

#### **Get Image Metadata**

```sh
img-resizer info input.jpg
```

---

### Validation and Exit Codes

- `--width`, `--height` and `--quality` must be positive integers. Dimensions are
  limited to 1-16383 and quality to 1-100; anything else is rejected with an error.
- `batch-resize` refuses to use the input directory as the output directory.
- The CLI exits with a non-zero status code when a command fails, so it is safe to
  use in scripts and CI (`img-resizer resize in.jpg out.jpg -w 300 || exit 1`).

---

### Configuration (Optional Settings)

```json
{
  "defaultWidth": 800,
  "defaultHeight": 600,
  "quality": 85,
  "batchProcessing": true
}
```

For API details, see [API_REFERENCE.md](API_REFERENCE.md).
