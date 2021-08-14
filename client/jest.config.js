export default {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  // testMatch: [
  //   '<rootDir>/**/*.test.(js|jsx|ts|tsx)',
  //   '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  // ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
