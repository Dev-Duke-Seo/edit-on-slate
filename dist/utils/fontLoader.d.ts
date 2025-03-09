/**
 * 폰트 로딩을 최적화하기 위한 유틸리티 함수
 */
/**
 * 폰트가 로드되었는지 확인하는 함수
 * @param fontFamily 폰트 패밀리 이름
 * @param text 테스트할 텍스트 (기본값: 'a')
 * @returns 폰트가 로드되었는지 여부
 */
export declare const isFontLoaded: (fontFamily: string, text?: string) => boolean;
/**
 * 폰트가 로드될 때까지 기다리는 함수
 * @param fontFamily 폰트 패밀리 이름
 * @param timeout 타임아웃 (밀리초, 기본값: 5000)
 * @returns Promise<boolean> 폰트가 로드되었는지 여부
 */
export declare const waitForFont: (fontFamily: string, timeout?: number) => Promise<boolean>;
/**
 * 최적화된 방식으로 폰트 스타일시트를 로드하는 함수
 * @param url 폰트 스타일시트 URL
 */
export declare const loadFontStylesheet: (url: string) => void;
/**
 * 기본 폰트 로드 함수
 * 라이브러리에서 사용하는 기본 폰트를 로드합니다.
 */
export declare const loadDefaultFonts: () => void;
