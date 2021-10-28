module.exports = {
  clearMocks: true,
  collectCoverage: false,
  preset: 'ts-jest',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
};
