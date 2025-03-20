// jest.config.js (최종 권장 설정)
export default {
    preset: 'ts-jest/presets/default-esm', // ES모듈 및 TS 지원
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    },
    extensionsToTreatAsEsm: ['.ts'],
    testMatch: ['<rootDir>/test/**/*.spec.ts', '<rootDir>/src/**/*.spec.ts'], // test 파일 지정
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1', // .js 확장자 생략 자동처리
    },
  };
  