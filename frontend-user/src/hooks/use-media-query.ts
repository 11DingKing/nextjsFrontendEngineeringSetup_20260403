import { useEffect, useState } from 'react';

/**
 * 媒体查询 Hook
 * @param query CSS 媒体查询字符串
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

/** 判断是否为移动端 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}
