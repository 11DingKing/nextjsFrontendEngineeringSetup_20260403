import apiClient from '@/lib/axios';
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, User } from '@/types';

/**
 * 认证相关 API 服务
 */
export const authService = {
  /** 登录 */
  login: (data: LoginRequest) => {
    return apiClient.post<LoginRequest, ApiResponse<LoginResponse>>('/auth/login', data);
  },

  /** 注册 */
  register: (data: RegisterRequest) => {
    return apiClient.post<RegisterRequest, ApiResponse<User>>('/auth/register', data);
  },

  /** 获取当前用户信息 */
  getCurrentUser: () => {
    return apiClient.get<never, ApiResponse<User>>('/auth/me');
  },

  /** 刷新 Token */
  refreshToken: (refreshToken: string) => {
    return apiClient.post<{ refreshToken: string }, ApiResponse<{ accessToken: string }>>(
      '/auth/refresh',
      { refreshToken },
    );
  },

  /** 登出 */
  logout: () => {
    return apiClient.post<never, ApiResponse<null>>('/auth/logout');
  },
};
