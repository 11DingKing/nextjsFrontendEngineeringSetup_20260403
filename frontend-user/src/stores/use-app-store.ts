import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/** 主题类型 */
type Theme = 'light' | 'dark' | 'system';

/** 应用全局状态接口 */
interface AppState {
  /** 当前主题 */
  theme: Theme;
  /** 侧边栏是否展开 */
  sidebarOpen: boolean;
  /** 全局加载状态 */
  globalLoading: boolean;
}

/** 应用全局操作接口 */
interface AppActions {
  /** 设置主题 */
  setTheme: (theme: Theme) => void;
  /** 切换侧边栏 */
  toggleSidebar: () => void;
  /** 设置侧边栏状态 */
  setSidebarOpen: (open: boolean) => void;
  /** 设置全局加载状态 */
  setGlobalLoading: (loading: boolean) => void;
}

/** 应用全局 Store */
export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set) => ({
      // 初始状态
      theme: 'system',
      sidebarOpen: true,
      globalLoading: false,

      // 操作方法
      setTheme: (theme) => set({ theme }, false, 'setTheme'),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),
      setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'setSidebarOpen'),
      setGlobalLoading: (loading) => set({ globalLoading: loading }, false, 'setGlobalLoading'),
    }),
    { name: 'AppStore' },
  ),
);
