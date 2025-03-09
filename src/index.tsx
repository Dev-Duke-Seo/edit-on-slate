// 개발 환경에서 사용할 코드
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts.css';
import App from './App';

// 개발 환경에서만 실행
if (process.env.NODE_ENV === 'development') {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
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
