import { QueryClient } from '@tanstack/react-query';

/**
 * 创建全局 React Query Client 实例
 * 配置默认选项以优化数据获取策略
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 数据过期时间：60秒
        staleTime: 60 * 1000,
        // 缓存时间：5分钟
        gcTime: 5 * 60 * 1000,
        // 窗口重新聚焦时不自动重新获取
        refetchOnWindowFocus: false,
        // 失败重试次数
        retry: 1,
        // 重试延迟
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * 获取 QueryClient 实例
 * 服务端每次请求创建新实例，客户端复用单例
 */
export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: 每次都创建新实例
    return makeQueryClient();
  }

  // Browser: 复用单例
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
