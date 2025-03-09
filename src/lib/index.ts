// 컴포넌트 내보내기
export { Editor } from '../components/Editor';
export type { EditorProps } from '../components/Editor';

// 유틸리티 함수 내보내기
export { toggleMark, isMarkActive, toggleBlock, isBlockActive } from '../utils/editorUtils';

// 타입 내보내기
export type { CustomEditor, CustomElement, CustomText } from '../utils/types';

// 플러그인 내보내기
export { withShortcuts } from '../plugins/withShortcuts'; 