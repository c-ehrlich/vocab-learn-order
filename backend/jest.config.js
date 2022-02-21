/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // stuff we added begins here
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true, // even if there are pending handlers
  clearMocks: true, // so our .toHaveBeenCalled keeps count per if, rather than global
  resetMocks: true,
  restoreMocks: true, // restore modules to original state between tests
};