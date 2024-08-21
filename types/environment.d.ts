declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_HIGH_LEVEL_CLIENT_ID: string
      HIGH_LEVEL_SECRET: string
    }
  }
}

export {}
