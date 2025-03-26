import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const ShadowRoot = styled.div`
  /* 컨테이너 스타일 */
  width: 100%;
  height: 100%;
`;

interface ShadowContainerProps {
  children: React.ReactNode;
  styles?: string;
}

export const ShadowContainer: React.FC<ShadowContainerProps> = ({ children, styles = '' }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (hostRef.current && !shadowRootRef.current) {
      // Shadow DOM 생성
      shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });

      // 스타일 추가
      const styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(styles);
      shadowRootRef.current.adoptedStyleSheets = [styleSheet];

      // 폰트 스타일을 Shadow DOM 내부로 복사
      const fontLinks = document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
      fontLinks.forEach(link => {
        const clonedLink = link.cloneNode(true) as HTMLLinkElement;
        shadowRootRef.current?.appendChild(clonedLink);
      });
    }
  }, [styles]);

  return (
    <ShadowRoot ref={hostRef}>
      {shadowRootRef.current && createPortal(children, shadowRootRef.current)}
    </ShadowRoot>
  );
}; 