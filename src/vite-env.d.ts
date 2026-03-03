/// <reference types="vite/client" />

interface ViteTypeOptions {
  "";
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
