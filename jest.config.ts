import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // For path aliases
  },
};

export default config;
