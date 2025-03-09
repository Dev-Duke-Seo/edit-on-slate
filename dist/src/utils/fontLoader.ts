/**
 * 폰트 로딩을 최적화하기 위한 유틸리티 함수
 */

/**
 * 폰트가 로드되었는지 확인하는 함수
 * @param fontFamily 폰트 패밀리 이름
 * @param text 테스트할 텍스트 (기본값: 'a')
 * @returns 폰트가 로드되었는지 여부
 */
export const isFontLoaded = (fontFamily: string, text: string = 'a'): boolean => {
  if (typeof document === 'undefined' || !document.fonts) {
    return false;
  }
  
  return document.fonts.check(`12px '${fontFamily}'`, text);
};

/**
 * 폰트가 로드될 때까지 기다리는 함수
 * @param fontFamily 폰트 패밀리 이름
 * @param timeout 타임아웃 (밀리초, 기본값: 5000)
 * @returns Promise<boolean> 폰트가 로드되었는지 여부
 */
export const waitForFont = (fontFamily: string, timeout: number = 5000): Promise<boolean> => {
  if (typeof document === 'undefined' || !document.fonts) {
    return Promise.resolve(false);
  }
  
  return new Promise((resolve) => {
    if (isFontLoaded(fontFamily)) {
      resolve(true);
      return;
    }
    
    // 폰트 로딩 이벤트 리스너
    const checkFont = () => {
      if (isFontLoaded(fontFamily)) {
        resolve(true);
        document.removeEventListener('fontload', checkFont);
        clearTimeout(timeoutId);
      }
    };
    
    // 타임아웃 설정
    const timeoutId = setTimeout(() => {
      document.removeEventListener('fontload', checkFont);
      resolve(false);
    }, timeout);
    
    // 폰트 로딩 이벤트 리스너 등록
    document.addEventListener('fontload', checkFont);
    
    // 폰트 로딩 시도
    if (document.fonts.load) {
      document.fonts.load(`12px '${fontFamily}'`).then(checkFont);
    }
  });
};

/**
 * 최적화된 방식으로 폰트 스타일시트를 로드하는 함수
 * @param url 폰트 스타일시트 URL
 */
export const loadFontStylesheet = (url: string): void => {
  if (typeof document === 'undefined') {
    return;
  }
  
  // preconnect 링크 생성
  const preconnectLink = document.createElement('link');
  preconnectLink.rel = 'preconnect';
  preconnectLink.href = new URL(url).origin;
  preconnectLink.crossOrigin = 'anonymous';
  document.head.appendChild(preconnectLink);
  
  // preload 링크 생성
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'style';
  preloadLink.href = url;
  document.head.appendChild(preloadLink);
  
  // 스타일시트 링크 생성 (비동기 로딩)
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = url;
  styleLink.media = 'print';
  styleLink.onload = () => {
    styleLink.media = 'all';
  };
  document.head.appendChild(styleLink);
  
  // noscript 대체 방법 추가
  const noscript = document.createElement('noscript');
  const noscriptLink = document.createElement('link');
  noscriptLink.rel = 'stylesheet';
  noscriptLink.href = url;
  noscript.appendChild(noscriptLink);
  document.head.appendChild(noscript);
};

/**
 * 기본 폰트 로드 함수
 * 라이브러리에서 사용하는 기본 폰트를 로드합니다.
 */
export const loadDefaultFonts = (): void => {
  // Nanum Gothic 폰트 로드
  loadFontStylesheet('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
  // Pretendard 폰트 로드
  loadFontStylesheet('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
}; 