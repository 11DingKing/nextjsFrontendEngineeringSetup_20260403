import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '@/types';

/** 认证状态接口 */
interface AuthState {
  /** 当前用户 */
  user: User | null;
  /** 访问令牌 */
  accessToken: string | null;
  /** 是否已登录 */
  isAuthenticated: boolean;
  /** 是否正在加载 */
  isLoading: boolean;
}

/** 认证操作接口 */
interface AuthActions {
  /** 设置用户信息 */
  setUser: (user: User) => void;
  /** 设置令牌 */
  setToken: (token: string) => void;
  /** 登录成功 */
  login: (user: User, token: string) => void;
  /** 登出 */
  logout: () => void;
  /** 设置加载状态 */
  setLoading: (loading: boolean) => void;
}

/** 认证 Store */
export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        // 初始状态
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,

        // 操作方法
        setUser: (user) => set({ user }, false, 'setUser'),

        setToken: (token) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', token);
          }
          set({ accessToken: token }, false, 'setToken');
        },

        login: (user, token) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', token);
          }
          set(
            {
              user,
              accessToken: token,
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            'login'
          );
        },

        logout: () => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
          }
          set(
            {
              user: null,
              accessToken: null,
              isAuthenticated: false,
            },
            false,
            'logout'
          );
        },

        setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
