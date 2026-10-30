---
title: Changelog
description: A detailed changelog.
sidebar_position: 5
---

## Unreleased

#### Security:

- Upgraded `sharp` to `^0.35.5`, picking up fixes for the libvips, libheif and librsvg
  vulnerabilities reported against `sharp@0.33.x`.
- Ran `npm audit fix` for transitive dev dependencies.

#### Changed:

- **Breaking:** the minimum supported Node.js version is now 20.9 (required by
  `sharp@0.35`). CI and docs deploys now run on Node 20.

## v1.1.0 - 2025-02-12

#### Added:

- Added support for `fit: 'contain'` in `resizeImage` to ensure the entire image is
  preserved when resizing.
- Implemented transparent background support for images that support alpha channels
  (PNG, WebP).

#### Changed:

- Updated `batchResize` to apply the improved `resizeImage` behavior across
  batch-processed images.
- Ensured PNG output format when transparency is needed.

#### Fixed:

- Fixed an issue where images were getting cropped unexpectedly during resizing.

## v1.0.1 - v1.0.6 2025-02-18

#### Added:

- Auto documentation updates

## v1.0.0 - 2025-02-12

#### Added:

- Initial release
