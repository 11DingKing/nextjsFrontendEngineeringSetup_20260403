declare namespace NodeJS {
  interface ProcessEnv {
    /** API 基础地址 */
    NEXT_PUBLIC_API_BASE_URL: string;
    /** 应用名称 */
    NEXT_PUBLIC_APP_NAME: string;
    /** 应用版本 */
    NEXT_PUBLIC_APP_VERSION: string;
    /** 当前环境 */
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
