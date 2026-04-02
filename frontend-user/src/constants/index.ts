/** 应用名称 */
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Front UI';

/** API 基础地址 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/** 每页默认条目数 */
export const DEFAULT_PAGE_SIZE = 10;

/** Token 存储键名 */
export const TOKEN_KEY = 'access_token';

/** 路由路径常量 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;
