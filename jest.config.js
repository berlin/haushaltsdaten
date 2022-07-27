module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@lib(.*)$': '<rootDir>/src/lib$1',
    '^@modules(.*)$': '<rootDir>/src/modules$1',
    '^@layouts(.*)$': '<rootDir>/src/layouts$1',
    '^@data(.*)$': '<rootDir>/src/data$1',
    '\\.css$': '<rootDir>/test/__mocks__/cssMock.ts',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.ts',
    '^d3(.*)$': `d3$1/dist/d3$1`,
  },
}
