// Allow imports of JS/JSX modules without types

declare module '*.js' {
  const value: any;
  export default value;
}

declare module '*.jsx' {
  const value: any;
  export default value;
}

// Alias modules under @/
declare module '@/*' {
  const value: any;
  export default value;
}

// Environment exports
declare module '@env' {
  export const Env: any;
  export const ClientEnv: any;
  export function withEnvSuffix(name: string): string;
}

// Local env module
declare module './env' {
  export const Env: any;
  export const ClientEnv: any;
  export function withEnvSuffix(name: string): string;
}
