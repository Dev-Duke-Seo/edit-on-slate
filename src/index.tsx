// 개발 환경에서 사용할 코드
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import './index.css';
import './fonts.css';
import App from './App';

// Shadow DOM을 위한 emotion cache 설정
const createEmotionCache = (container: HTMLElement) => createCache({
  key: 'edit-on-slate',
  container,
  // Shadow DOM 내부에서도 스타일이 적용되도록 설정
  prepend: true,
  stylisPlugins: []
});

// 개발 환경에서만 실행
if (process.env.NODE_ENV === 'development') {
  const rootElement = document.getElementById('root') as HTMLElement;
  const emotionCache = createEmotionCache(rootElement);

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <CacheProvider value={emotionCache}>
        <App />
      </CacheProvider>
    </React.StrictMode>
  );
}

// 라이브러리 컴포넌트 및 유틸리티 export
export { Editor } from './components/Editor';
export { Toolbar } from './components/Editor/Toolbar';
export { Element } from './components/Editor/Element';
export { Leaf } from './components/Editor/Leaf';

// 유틸리티 함수 export
export {
  toggleMark,
  isMarkActive,
  toggleBlock,
  isBlockActive,
  toggleFontFamily,
  toggleTextAlign,
  isTextAlignActive,
  toggleFontColor
} from './utils/editorUtils';

// 타입 export
export type {
  CustomEditor,
  CustomElement,
  CustomText
} from './utils/types';

// 플러그인 export
export { withShortcuts } from './plugins/withShortcuts';

// emotion cache 생성 함수도 export
export { createEmotionCache };
