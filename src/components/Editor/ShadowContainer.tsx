import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

interface ShadowContainerProps {
  children: React.ReactNode;
}

export const ShadowContainer: React.FC<ShadowContainerProps> = ({ children }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const emotionCacheRef = useRef<ReturnType<typeof createCache> | null>(null);
  const [, forceUpdate] = React.useState({});

  useEffect(() => {
    if (hostRef.current && !shadowRootRef.current) {
      // Shadow Root 생성
      shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });

      // container div 생성 및 추가
      const container = document.createElement('div');
      shadowRootRef.current.appendChild(container);

      // emotion cache 생성
      emotionCacheRef.current = createCache({
        key: 'edit-on-slate',
        container: shadowRootRef.current,
        prepend: true,
        stylisPlugins: []
      });

      // 폰트 스타일 복사
      const fontLinks = document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
      fontLinks.forEach(link => {
        const clonedLink = link.cloneNode(true) as HTMLLinkElement;
        shadowRootRef.current?.appendChild(clonedLink);
      });

      // 강제 리렌더링을 위한 상태 업데이트
      forceUpdate({});
    }
  }, []);

  return (
    <div ref={hostRef}>
      {shadowRootRef.current && emotionCacheRef.current && createPortal(
        <CacheProvider value={emotionCacheRef.current}>
          {children}
        </CacheProvider>,
        shadowRootRef.current
      )}
    </div>
  );
}; 