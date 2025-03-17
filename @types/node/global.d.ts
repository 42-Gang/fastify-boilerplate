// global.d.ts
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
    }
  }
}
