/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  testPathIgnorePatterns: [
    '<rootDir>/dist/'
  ],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  maxWorkers: process.env.CI ? 2 : '50%',
  ci: process.env.CI === 'true',
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/index.ts',
    '!src/types/*.ts',
    '!src/components/index.ts',
  ]
}

module.exports = config
