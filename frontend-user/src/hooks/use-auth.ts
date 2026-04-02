import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores';
import { authService } from '@/services';
import type { LoginRequest, RegisterRequest } from '@/types';

/** 认证相关查询 Key */
const AUTH_QUERY_KEYS = {
  user: ['auth', 'user'] as const,
};

/**
 * 获取当前用户信息 Hook
 */
export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.user,
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated,
  });
}

/**
 * 登录 Hook
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      login(user, accessToken);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user });
    },
  });
}

/**
 * 注册 Hook
 */
export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
}

/**
 * 登出 Hook
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
}
