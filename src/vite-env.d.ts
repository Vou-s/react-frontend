/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // tambahkan env variables lain di sini jika ada
  readonly VITE_APP_TITLE: string
  // dll...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}