const { resizeImage } = require("../src/resizer");
const fs = require("fs");

const testInput = "tests/sample.jpg";
const testOutput = "tests/output.jpg";

(async () => {
  try {
    await resizeImage(testInput, testOutput, 300, 200);
    if (fs.existsSync(testOutput)) {
      console.log("✅ Test Passed: Image resized successfully.");
    } else {
      console.log("❌ Test Failed: Output file not found.");
    }
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
})();
