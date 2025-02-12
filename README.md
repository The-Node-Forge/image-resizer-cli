<div align="center">
   
# image-resizer-cli
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Documentation](https://the-node-forge.github.io/image-resizer-cli/)

 </div>

Welcome to The-Node-Forge **image-resizer-cli**! This repository serves as a
**template** for The Node Forge members to quickly scaffold a new **TypeScript-based
NPM package** with built-in **linting, testing, documentation, and CI/CD**.

---

# ✨ Getting Started

## **🎯 CLI example**

```bash
img-resizer resize input.jpg output.jpg --width 300 --height 200
```

```bash
ls -lh output.jpg  # Check file details
open output.jpg     # Open file (macOS)
start output.jpg    # Open file (Windows)
```

## 🎯 **List of Commands**

| **Command**                                                                          | **Description**                                           |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `img-resizer resize <input> <output> --width <number> --height <number>`             | Resize an image to specific dimensions                    |
| `img-resizer convert <input> <output>`                                               | Convert an image to a different format (e.g., PNG to JPG) |
| `img-resizer batch-resize <inputDir> <outputDir> --width <number> --height <number>` | Resize all images in a directory                          |
| `img-resizer compress <input> <output> --quality <number>`                           | Compress an image with adjustable quality (1-100)         |
| `img-resizer info <input>`                                                           | Display image metadata (format, size, dimensions)         |
| `img-resizer --help`                                                                 | Show all available commands and options                   |

## **🎯 Summary**

| **Section**                                                       | **Purpose**                                |
| ----------------------------------------------------------------- | ------------------------------------------ |
| `const { program } = require("commander");`                       | Loads `commander` for CLI command handling |
| `const { resizeImage } = require("../src/resizer");`              | Imports the `resizeImage` function         |
| `const chalk = require("chalk");`                                 | Loads `chalk` for colored terminal output  |
| `program.name("img-resizer");`                                    | Defines the CLI name (`img-resizer`)       |
| `program.description("CLI tool for resizing images");`            | Sets CLI description                       |
| `program.version("1.0.0");`                                       | Specifies CLI version                      |
| `program.command("resize <input> <output>");`                     | Defines the `resize` command               |
| `.option("-w, --width <number>", "Width in pixels", parseInt);`   | Adds optional `--width` argument           |
| `.option("-h, --height <number>", "Height in pixels", parseInt);` | Adds optional `--height` argument          |
| `.action(async (input, output, options) => { ... });`             | Calls `resizeImage()` with user inputs     |
| `console.log(chalk.green(...));`                                  | Prints success message in green            |
| `console.error(chalk.red(...));`                                  | Prints error message in red                |
| `program.parse(process.argv);`                                    | Parses CLI arguments and runs the command  |

## 📜 Available Scripts

The `package.json` includes several useful scripts:

| Script                  | Description                                 |
| ----------------------- | ------------------------------------------- |
| `npm run test`          | Runs Jest tests.                            |
| `npm run test:watch`    | Runs Jest in watch mode.                    |
| `npm run test:coverage` | Runs Jest with coverage report.             |
| `npm run format`        | Formats the code using Prettier.            |
| `npm run format:check`  | Checks if code follows Prettier formatting. |
| `npm run lint`          | Runs ESLint to check for issues.            |
| `npm run lint:fix`      | Automatically fixes lint issues.            |
| `npm run build`         | Compiles TypeScript code to JavaScript.     |
| `npm run docs:build`    | Builds documentation using Docusaurus.      |
| `npm run docs:start`    | Runs Docusaurus locally for preview.        |
| `npm run docs:clean`    | Cleans and rebuilds documentation.          |
| `npm run docs:deploy`   | Deploys docs to GitHub Pages.               |

---

# 📘 Documentation with Docusaurus

This repository uses **Docusaurus** to generate project documentation. Documentation
lives in the `docs/docs/` folder.

## ✏️ Customizing Documentation

## 1️⃣ Enable github pages for your repo

- Start by going to this repo in github vselect settings > pages > (build and
  development) > deploy from branch > gh-pages > /(root)

## 2️⃣ Where to Edit Documentation

#### 📂 **`docs/docusaurus.config.ts`**

- remove any instance of /image-resizer-cli/ and add your /repo-name/
- Edit baseUrl to match repo name /repo-name/.
- Edit meta data to matcg your package details, comments left to help

#### 📂 **`docs/docs/`**

- Houses main documentation files.

#### 📂 **`docs/docs/api/`**

- **Autogenerated API documentation** from JSDoc comments. (optional)

#### 📂 **`docs/docs/`**

- 6 Guides written in Markdown, all need to be filled out.
- API_REFERENCE, CHANGELOG, CODE_OF_CONDUCT, INSTALLATION, USAGE, intro.md (use
  readme.md info)

#### 📂 **`docs/static/PROJECTMARKDOWN.md`**

- Add your project readme here, this is your documentation landing page

#### 📂 **`docs/src/components/HomepageFeatures/index.tsx`**

- Edit Documentation Splashpage.

---

# 🛠️ Auto-Generating API Documentation

This repository uses **JSDoc** to document code and generate API references
automatically.

## 🔍 How Auto Documentation Works

- 📂 **`docs/docs/api/`** → Contains autogenerated documentation.
- **JSDoc comments** inside TypeScript files provide function and class
  documentation.
- **Docusaurus and TypeDoc** process these comments into readable documentation.

#### ✅ Example JSDoc Comment

```ts
/**
 * Generates a unique package identifier based on package name and version.
 *
 * @param {string} packageName - The name of the NPM package.
 * @param {string} version - The package version (must follow SemVer: MAJOR.MINOR.PATCH).
 * @returns {string} A unique identifier in the format "packageName@version".
 * @throws {Error} Throws an error if the version is not in SemVer format.
 *
 * @example
 * const packageId = generatePackageIdentifier("my-awesome-package", "1.2.3");
 * console.log(packageId); // "my-awesome-package@1.2.3"
 */

export function generatePackageIdentifier(
  packageName: string,
  version: string,
): string {
  const semverRegex = /^\d+\.\d+\.\d+$/;

  if (!semverRegex.test(version)) {
    throw new Error(
      'Invalid version format. Must follow Semantic Versioning: MAJOR.MINOR.PATCH',
    );
  }

  return `${packageName}@${version}`;
}
```

#### 🔄 Generating API Documentation

To generate API documentation based on JSDoc comments, run:

```sh
npm run docs:build
```

This will create or update documentation inside `docs/docs/api/`.

To preview the changes, run:

```sh
npm run docs:start
```

## 3️⃣ Building & Running Documentation

After you edit or majke any documentation changes you want to clean, and rebuild your
docs

To generate and preview documentation:

```sh
npm run docs:clean   # rm -rf docs/build and runs build
npm run docs:start   # Run the docs locally
```

- Open **`http://localhost:3000/`** to view the site.

#### To deploy to GitHub Pages:

Your Docusaurus docs will build to github pages on push to main. Make sure all docs
are filled out for a properly scaffolded documention gh-page

---

## 🛠️ Code Quality & Formatting

This template includes **ESLint** and **Prettier** to enforce code quality.

### 🛠️ ESLint Configuration

- Enforces best practices and TypeScript rules.
- Ignores everything in `/docs/` (Docusaurus files).
- Auto-fixes issues using:
  ```sh
  npm run lint:fix
  ```

### 🔧 Prettier Configuration

- Formats the code automatically.
- Enforces consistent spacing, semicolons, and line breaks.

To apply formatting:

```sh
npm run format
```

---

## ⚖️ Continuous Integration (CI)

### 🔄 What CI Does

- **Runs tests automatically** on every `push` or `pull request`.
- **Formats & lints code**, fixing issues before merging.
- **Prevents PRs without tests**.
- **Uploads test coverage results**.

### ⚙️ How CI Works (`.github/workflows/ci.yaml`)

| Step                        | Purpose                               |
| --------------------------- | ------------------------------------- |
| ✅ **Install Dependencies** | Installs required NPM packages.       |
| ✅ **Run Prettier**         | Auto-formats code.                    |
| ✅ **Run ESLint**           | Fixes linting issues.                 |
| ✅ **Check for Tests**      | Ensures PRs include test files.       |
| ✅ **Run Jest Tests**       | Executes all unit tests.              |
| ✅ **Upload Coverage**      | Stores Jest test results.             |
| ✅ **Commit Auto-Fixes**    | Commits any auto-fixes to the branch. |

If you push **broken code**, CI **fails** and prevents merging. 🚨

---

## 🌟 Final Checklist for New Repos

✔ **Update `package.json`**  
✔ **Modify documentation** in `docs/`  
✔ **Run tests before committing** (`npm run test`)  
✔ **Ensure CI passes before merging**

---

## 💡 Need Help?

If you run into any issues, reach out to **The Node Forge team** on GitHub!

Happy coding! 🚀
