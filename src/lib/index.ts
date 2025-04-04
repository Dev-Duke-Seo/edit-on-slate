// 스타일 import
import '../fonts.css';

// 컴포넌트 내보내기
export { Editor } from '../components/Editor';
export type { EditorProps } from '../components/Editor';
export { Toolbar } from '../components/Editor/Toolbar';
export { ReadOnlyEditor } from '../components/Editor/ReadOnlyEditor';
export type { ReadOnlyEditorProps } from '../components/Editor/ReadOnlyEditor';

// 유틸리티 함수 내보내기
export { toggleMark, isMarkActive, toggleBlock, isBlockActive } from '../utils/editorUtils';

// 폰트 로딩 유틸리티 내보내기
export { isFontLoaded, waitForFont, loadFontStylesheet, loadDefaultFonts } from '../utils/fontLoader';

// 커스텀 타입 내보내기
export type { CustomEditor, CustomElement, CustomText } from '../utils/types';

// 플러그인 내보내기
export { withShortcuts } from '../plugins/withShortcuts';

// Slate 코어 재내보내기
export {
  createEditor,
  Editor as SlateEditor,
  Element as SlateElement,
  Node,
  Path,
  Point,
  Range,
  Text,
  Transforms
} from 'slate';

// Slate React 재내보내기
export {
  Editable,
  ReactEditor,
  Slate,
  useSelected,
  useFocused,
  useSlate,
  useSlateStatic,
  withReact
} from 'slate-react';

// Slate History 재내보내기
export {
  HistoryEditor,
  withHistory
} from 'slate-history';

// Slate 타입 재내보내기
export type {
  BaseEditor,
  Descendant,
  Editor as SlateEditorType,
  Element,
  NodeEntry,
  Operation,
  Selection
} from 'slate'; 