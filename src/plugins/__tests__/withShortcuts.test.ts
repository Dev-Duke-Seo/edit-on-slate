import { Editor, Transforms, createEditor, Range, Element, Point } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor, CustomElement } from '../../utils/types';
import { withShortcuts } from '../withShortcuts';

// Slate 모듈 모킹
jest.mock('slate', () => {
  const originalModule = jest.requireActual('slate');
  return {
    ...originalModule,
    Editor: {
      ...originalModule.Editor,
      above: jest.fn(),
      string: jest.fn(),
      start: jest.fn(),
      isBlock: jest.fn(),
      isEditor: jest.fn(),
    },
    Transforms: {
      select: jest.fn(),
      delete: jest.fn(),
      setNodes: jest.fn(),
      wrapNodes: jest.fn(),
    },
    Range: {
      ...originalModule.Range,
      isCollapsed: jest.fn(),
    },
    Element: {
      ...originalModule.Element,
      isElement: jest.fn(),
    },
    Point: {
      ...originalModule.Point,
      equals: jest.fn(),
    },
  };
});

describe('withShortcuts 플러그인', () => {
  let editor: CustomEditor;
  let originalInsertText: (text: string) => void;
  let originalDeleteBackward: (unit: 'character' | 'word' | 'line' | 'block') => void;
  
  beforeEach(() => {
    // 각 테스트 전에 에디터 초기화
    editor = withHistory(withReact(createEditor())) as CustomEditor;
    
    // 기본 children 배열 설정
    editor.children = [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      } as CustomElement,
    ];
    
    // 원본 메서드 저장
    originalInsertText = editor.insertText;
    originalDeleteBackward = editor.deleteBackward;
    
    // withShortcuts 플러그인 적용
    editor = withShortcuts(editor);
    
    // 모킹된 함수 초기화
    jest.clearAllMocks();
    
    // 기본 selection 설정
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
  });
  
  describe('insertText', () => {
    test('공백이 아닌 일반 텍스트 삽입 시 원본 insertText 호출', () => {
      // 원본 insertText 메서드를 모킹
      editor.insertText = jest.fn();
      
      editor.insertText('a');
      
      // 모킹된 insertText가 호출되었는지 확인
      expect(editor.insertText).toHaveBeenCalledWith('a');
    });
    
    test('공백 삽입 시 selection이 없으면 원본 insertText 호출', () => {
      // 원본 insertText 메서드를 모킹
      editor.insertText = jest.fn();
      editor.selection = null;
      
      editor.insertText(' ');
      
      // 모킹된 insertText가 호출되었는지 확인
      expect(editor.insertText).toHaveBeenCalledWith(' ');
    });
    
    test('공백 삽입 시 selection이 collapsed가 아니면 원본 insertText 호출', () => {
      // 원본 insertText 메서드를 모킹
      editor.insertText = jest.fn();
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(false);
      
      editor.insertText(' ');
      
      // 모킹된 insertText가 호출되었는지 확인
      expect(editor.insertText).toHaveBeenCalledWith(' ');
    });
    
    test('* 단축키로 글머리 기호 목록 변환', () => {
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(true);
      (Editor.above as jest.Mock).mockReturnValueOnce([{ type: 'paragraph' }, [0]]);
      (Editor.start as jest.Mock).mockReturnValueOnce({ path: [0, 0], offset: 0 });
      (Editor.string as jest.Mock).mockReturnValueOnce('*');
      
      editor.insertText(' ');
      
      // Transforms.select, Transforms.delete, Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.select).toHaveBeenCalled();
      expect(Transforms.delete).toHaveBeenCalled();
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'bulleted-list' },
        expect.any(Object)
      );
      expect(Transforms.wrapNodes).toHaveBeenCalled();
    });
    
    test('# 단축키로 heading-one 변환', () => {
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(true);
      (Editor.above as jest.Mock).mockReturnValueOnce([{ type: 'paragraph' }, [0]]);
      (Editor.start as jest.Mock).mockReturnValueOnce({ path: [0, 0], offset: 0 });
      (Editor.string as jest.Mock).mockReturnValueOnce('#');
      
      editor.insertText(' ');
      
      // Transforms.select, Transforms.delete, Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.select).toHaveBeenCalled();
      expect(Transforms.delete).toHaveBeenCalled();
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'heading-one' },
        expect.any(Object)
      );
    });
    
    test('## 단축키로 heading-two 변환', () => {
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(true);
      (Editor.above as jest.Mock).mockReturnValueOnce([{ type: 'paragraph' }, [0]]);
      (Editor.start as jest.Mock).mockReturnValueOnce({ path: [0, 0], offset: 0 });
      (Editor.string as jest.Mock).mockReturnValueOnce('##');
      
      editor.insertText(' ');
      
      // Transforms.select, Transforms.delete, Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.select).toHaveBeenCalled();
      expect(Transforms.delete).toHaveBeenCalled();
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'heading-two' },
        expect.any(Object)
      );
    });
    
    test('> 단축키로 block-quote 변환', () => {
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(true);
      (Editor.above as jest.Mock).mockReturnValueOnce([{ type: 'paragraph' }, [0]]);
      (Editor.start as jest.Mock).mockReturnValueOnce({ path: [0, 0], offset: 0 });
      (Editor.string as jest.Mock).mockReturnValueOnce('>');
      
      editor.insertText(' ');
      
      // Transforms.select, Transforms.delete, Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.select).toHaveBeenCalled();
      expect(Transforms.delete).toHaveBeenCalled();
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'block-quote' },
        expect.any(Object)
      );
    });
  });
  
  describe('deleteBackward', () => {
    test('selection이 없으면 원본 deleteBackward 호출', () => {
      // 원본 deleteBackward 메서드를 모킹
      editor.deleteBackward = jest.fn();
      editor.selection = null;
      
      editor.deleteBackward('character');
      
      // 모킹된 deleteBackward가 호출되었는지 확인
      expect(editor.deleteBackward).toHaveBeenCalledWith('character');
    });
    
    test('selection이 collapsed가 아니면 원본 deleteBackward 호출', () => {
      // 원본 deleteBackward 메서드를 모킹
      editor.deleteBackward = jest.fn();
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(false);
      
      editor.deleteBackward('character');
      
      // 모킹된 deleteBackward가 호출되었는지 확인
      expect(editor.deleteBackward).toHaveBeenCalledWith('character');
    });
    
    test('커서가 블록의 시작 위치에 있고 paragraph가 아닌 경우 paragraph로 변환', () => {
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(true);
      (Editor.above as jest.Mock).mockReturnValueOnce([{ type: 'heading-one' }, [0]]);
      (Editor.start as jest.Mock).mockReturnValueOnce({ path: [0, 0], offset: 0 });
      (Element.isElement as jest.Mock).mockReturnValueOnce(true);
      (Point.equals as jest.Mock).mockReturnValueOnce(true);
      
      editor.deleteBackward('character');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'paragraph' }
      );
    });
    
    test('커서가 블록의 시작 위치에 있지 않으면 원본 deleteBackward 호출', () => {
      (Range.isCollapsed as jest.Mock).mockReturnValueOnce(true);
      (Editor.above as jest.Mock).mockReturnValueOnce([{ type: 'heading-one' }, [0]]);
      (Editor.start as jest.Mock).mockReturnValueOnce({ path: [0, 0], offset: 0 });
      
      // 커서 위치가 블록의 시작 위치와 다르게 설정
      editor.selection = {
        anchor: { path: [0, 0], offset: 1 },
        focus: { path: [0, 0], offset: 1 },
      };
      
      const spy = jest.spyOn(editor, 'deleteBackward');
      
      editor.deleteBackward('character');
      
      expect(spy).toHaveBeenCalledWith('character');
    });
  });
}); 