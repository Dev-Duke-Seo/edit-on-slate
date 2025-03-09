import { Editor, Transforms, Range, Point, Element } from 'slate';
import { CustomEditor, CustomElement } from '../utils/types';

// 단축키 플러그인
export const withShortcuts = (editor: CustomEditor) => {
  const { deleteBackward, insertText } = editor;

  // 텍스트 삽입 시 단축키 처리
  editor.insertText = (text) => {
    const { selection } = editor;

    // 선택 영역이 있고 텍스트가 공백인 경우
    if (selection && Range.isCollapsed(selection) && text === ' ') {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);

      // 마크다운 스타일 단축키 처리
      const shortcuts: Record<string, CustomElement['type']> = {
        '*': 'bulleted-list',
        '-': 'bulleted-list',
        '+': 'bulleted-list',
        '1.': 'numbered-list',
        '>': 'block-quote',
        '#': 'heading-one',
        '##': 'heading-two',
        '###': 'heading-three',
      };

      const blockType = shortcuts[beforeText];

      if (blockType) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes<CustomElement>(
          editor,
          { type: blockType },
          { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        );

        if (['bulleted-list', 'numbered-list'].includes(blockType)) {
          const listItemBlock: CustomElement = { 
            type: 'list-item', 
            children: [{ text: '' }] 
          };
          
          const listBlock: CustomElement = { 
            type: blockType, 
            children: [listItemBlock] 
          };
          
          Transforms.wrapNodes(editor, listBlock);
          return;
        }

        return;
      }
    }

    insertText(text);
  };

  // 백스페이스 처리
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          Point.equals(selection.anchor, start) &&
          (block as CustomElement).type !== 'paragraph'
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' } as Partial<CustomElement>);
          return;
        }
      }
    }

    deleteBackward(...args);
  };

  return editor;
}; 