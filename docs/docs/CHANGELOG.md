---
title: Changelog
description: A detailed changelog.
sidebar_position: 5
---

## Unreleased

#### Security:

- Upgraded `sharp` to `^0.35.5`, picking up fixes for the libvips, libheif and
  librsvg vulnerabilities reported against `sharp@0.33.x`.
- Ran `npm audit fix` for transitive dev dependencies.
- Hardened GitHub Actions workflows: least-privilege `permissions`, actions pinned to
  commit SHAs, `npm ci` for reproducible installs, and no `${{ }}` expression
  interpolation inside `run` scripts.
- Added Dependabot (npm, docs, GitHub Actions) and a `SECURITY.md` policy.
- `--width`, `--height` and `--quality` are validated (positive integers; dimensions
  1-16383, quality 1-100) instead of passing `NaN`/huge values through to `sharp`.
- `batchResize` refuses to write into its input directory and ignores directories
  whose names look like images.

#### Changed:

- **Breaking:** the minimum supported Node.js version is now 20.9 (required by
  `sharp@0.35`). CI and docs deploys now run on Node 20.

#### Fixed:

- CLI commands now exit with status code `1` on failure (previously always `0`).
- `--version` reports the real package version (was hard-coded to `1.0.0`).
- `main` in `package.json` points at the library entry (`dist/index.js`) instead of
  the CLI, so `require('@the-node-forge/image-resizer-cli')` no longer runs the CLI.
- `--quality 0` is no longer silently replaced by the default of 80.

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
