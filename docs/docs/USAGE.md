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
