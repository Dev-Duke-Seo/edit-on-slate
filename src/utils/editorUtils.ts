import { Editor, Transforms, Element as SlateElement, Text } from 'slate';
import { CustomEditor, CustomElement } from './types';

// 텍스트 스타일 토글 함수
export const toggleMark = (editor: CustomEditor, format: keyof Omit<Text, 'text'>) => {
  const isActive = isMarkActive(editor, format);
  
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
};

// 텍스트 스타일 활성화 여부 확인 함수
export const isMarkActive = (editor: CustomEditor, format: keyof Omit<Text, 'text'>) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// 블록 타입 토글 함수
export const toggleBlock = (editor: CustomEditor, format: CustomElement['type']) => {
  const isActive = isBlockActive(editor, format);
  const isList = ['numbered-list', 'bulleted-list'].includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ['numbered-list', 'bulleted-list'].includes((n as CustomElement).type),
    split: true,
  });

  let newProperties: Partial<CustomElement>;
  if (isActive) {
    newProperties = {
      type: 'paragraph',
    };
  } else {
    newProperties = {
      type: isList ? 'list-item' : format,
    };
  }

  Transforms.setNodes<CustomElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// 블록 타입 활성화 여부 확인 함수
export const isBlockActive = (editor: CustomEditor, format: CustomElement['type']) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n as CustomElement).type === format,
    })
  );

  return !!match;
};

// 서체 변경 함수
export const toggleFontFamily = (editor: CustomEditor, fontFamily: string) => {
  Transforms.setNodes(
    editor,
    { fontFamily },
    { match: (n) => Text.isText(n), split: true }
  );
};

// 텍스트 정렬 함수
export const toggleTextAlign = (editor: CustomEditor, align: 'left' | 'center' | 'right' | 'justify') => {
  const { selection } = editor;
  if (!selection) return;

  const isActive = isTextAlignActive(editor, align);

  Transforms.setNodes<CustomElement>(
    editor,
    { textAlign: isActive ? undefined : align },
    { match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
  );
};

// 텍스트 정렬 활성화 여부 확인 함수
export const isTextAlignActive = (editor: CustomEditor, align: 'left' | 'center' | 'right' | 'justify') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && 
        SlateElement.isElement(n) && 
        (n as CustomElement).textAlign === align,
    })
  );

  return !!match;
};

// 글자 색상 변경 함수
export const toggleFontColor = (editor: CustomEditor, color: string) => {
  Transforms.setNodes(
    editor,
    { color },
    { match: (n) => Text.isText(n), split: true }
  );
}; 