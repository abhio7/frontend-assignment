module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Transpile JS/JSX files
    "^.+\\.css$": "jest-transform-stub"  // Mock CSS imports
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS imports with identity-obj-proxy
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom"  // Correct way to load jest-dom
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]  // Ignore node_modules and dist
};
