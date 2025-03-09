import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

// 커스텀 텍스트 타입 정의
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  fontFamily?: string;
  color?: string;
};

// 커스텀 요소 타입 정의
export type CustomElement = {
  type: 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three' | 'block-quote' | 'bulleted-list' | 'numbered-list' | 'list-item';
  children: (CustomElement | CustomText)[];
  textAlign?: 'left' | 'center' | 'right' | 'justify';
};

// 에디터 타입 정의
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

// Slate 타입 확장
declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
} 