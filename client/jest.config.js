export default {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
