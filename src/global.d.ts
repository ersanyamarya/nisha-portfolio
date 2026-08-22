declare module '*.css';
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.webp';

// dotenv v8.x has types but its exports field blocks resolution in bundler moduleResolution mode
declare module 'dotenv' {
  const dotenv: {
    config(options?: { path?: string; encoding?: string; debug?: boolean; override?: boolean }): {
      error?: Error;
      parsed?: { [key: string]: string };
    };
  };
  export default dotenv;
}
