module.exports = {
  clearMocks: true,
  collectCoverage: false,
  preset: 'ts-jest',
  verbose: true,
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
    '^@tests/(.*)': '<rootDir>/tests/$1',
  },
};
