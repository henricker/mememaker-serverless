/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/4-framework/**',
    '!<rootDir>/src/shared/**',
    '!<rootDir>/src/2-business/module/errors/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/__tests__'],
  moduleNameMapper: {
    '@tests/(.*)': '<rootDir>/__tests__/$1',
    '@domain/(.*)': '<rootDir>/src/1-domain/$1',
    '@business/(.*)': '<rootDir>/src/2-business/$1',
    '@controller/(.*)': '<rootDir>/src/3-controller/$1',
    '@framework/(.*)': '<rootDir>/src/4-framework/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@root/(.*)': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
}
