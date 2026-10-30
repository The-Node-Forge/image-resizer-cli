module.exports = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'node', // Use Node.js environment for tests
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  testMatch: ['**/tests/**/*.test.ts'], // Match test files
  collectCoverageFrom: ['src/**/*.ts', '!src/bin/**'], // CLI is exercised via child process, not instrumentable
  verbose: true, // Show detailed test results
  transform: {}, // Avoids unnecessary transpilation errors

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // ✅ Use a separate Jest TypeScript config
    },
  },
};
