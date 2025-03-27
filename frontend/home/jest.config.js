module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "^@users/(.*)$": "<rootDir>/../users/src/$1",
      "^@courses/(.*)$": "<rootDir>/../courses/src/$1",
      "^@inscriptions/(.*)$": "<rootDir>/../inscriptions/src/$1",
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/index.tsx",
      "!src/reportWebVitals.ts",
      "!src/setupTests.ts",
    ],
  };
  