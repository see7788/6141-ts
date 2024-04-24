/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // 更多环境变量...
    // 实现import.meta.env.VITE_APP_TITLE

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }