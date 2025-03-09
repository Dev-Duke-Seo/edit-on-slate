import { Editor, Transforms, createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor } from '../types';
import { 
  toggleMark, 
  isMarkActive, 
  toggleBlock, 
  isBlockActive, 
  toggleFontFamily, 
  toggleTextAlign, 
  isTextAlignActive, 
  toggleFontColor 
} from '../editorUtils';

// Slate 모듈 모킹
jest.mock('slate', () => {
  const originalModule = jest.requireActual('slate');
  return {
    ...originalModule,
    Editor: {
      ...originalModule.Editor,
      marks: jest.fn(),
      nodes: jest.fn(),
      above: jest.fn(),
      isBlock: jest.fn(),
      unhangRange: jest.fn(),
      isEditor: jest.fn(),
      start: jest.fn(),
    },
    Transforms: {
      setNodes: jest.fn(),
      unwrapNodes: jest.fn(),
      wrapNodes: jest.fn(),
    },
  };
});

// slate-react 모듈 모킹
jest.mock('slate-react', () => {
  const originalModule = jest.requireActual('slate-react');
  return {
    ...originalModule,
    ReactEditor: {
      ...originalModule.ReactEditor,
    },
  };
});

describe('editorUtils', () => {
  let editor: CustomEditor;
  
  beforeEach(() => {
    // 각 테스트 전에 에디터 초기화
    editor = withHistory(withReact(createEditor())) as CustomEditor;
    
    // 모킹된 함수 초기화
    jest.clearAllMocks();
    
    // 기본 selection 설정
    editor.selection = {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 0 },
    };
  });
  
  describe('toggleMark', () => {
    test('마크가 활성화되지 않았을 때 마크 추가', () => {
      // isMarkActive가 false를 반환하도록 설정
      (Editor.marks as jest.Mock).mockReturnValueOnce({});
      
      toggleMark(editor, 'bold');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { bold: true },
        { match: expect.any(Function), split: true }
      );
    });
    
    test('마크가 활성화되었을 때 마크 제거', () => {
      // isMarkActive가 true를 반환하도록 설정
      (Editor.marks as jest.Mock).mockReturnValueOnce({ bold: true });
      
      toggleMark(editor, 'bold');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { bold: null },
        { match: expect.any(Function), split: true }
      );
    });
  });
  
  describe('isMarkActive', () => {
    test('마크가 활성화되었을 때 true 반환', () => {
      // Editor.marks가 bold: true를 포함하는 객체를 반환하도록 설정
      (Editor.marks as jest.Mock).mockReturnValueOnce({ bold: true });
      
      const result = isMarkActive(editor, 'bold');
      
      expect(result).toBe(true);
    });
    
    test('마크가 활성화되지 않았을 때 false 반환', () => {
      // Editor.marks가 bold 속성이 없는 객체를 반환하도록 설정
      (Editor.marks as jest.Mock).mockReturnValueOnce({});
      
      const result = isMarkActive(editor, 'bold');
      
      expect(result).toBe(false);
    });
    
    test('marks가 null일 때 false 반환', () => {
      // Editor.marks가 null을 반환하도록 설정
      (Editor.marks as jest.Mock).mockReturnValueOnce(null);
      
      const result = isMarkActive(editor, 'bold');
      
      expect(result).toBe(false);
    });
  });
  
  describe('toggleBlock', () => {
    test('블록이 활성화되지 않았을 때 블록 설정', () => {
      // isBlockActive가 false를 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([]);
      
      toggleBlock(editor, 'heading-one');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'heading-one' }
      );
    });
    
    test('블록이 활성화되었을 때 paragraph로 변경', () => {
      // isBlockActive가 true를 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([[{ type: 'heading-one' }, [0]]]);
      
      toggleBlock(editor, 'heading-one');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'paragraph' }
      );
    });
    
    test('리스트 블록 토글 시 list-item으로 설정하고 리스트로 래핑', () => {
      // isBlockActive가 false를 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([]);
      
      toggleBlock(editor, 'bulleted-list');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { type: 'list-item' }
      );
      
      // Transforms.wrapNodes가 호출되었는지 확인
      expect(Transforms.wrapNodes).toHaveBeenCalledWith(
        editor,
        { type: 'bulleted-list', children: [] }
      );
    });
  });
  
  describe('isBlockActive', () => {
    test('selection이 없을 때 false 반환', () => {
      editor.selection = null;
      
      const result = isBlockActive(editor, 'heading-one');
      
      expect(result).toBe(false);
    });
    
    test('블록이 활성화되었을 때 true 반환', () => {
      // Editor.nodes가 매치되는 노드를 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([[{ type: 'heading-one' }, [0]]]);
      (Editor.unhangRange as jest.Mock).mockReturnValueOnce(editor.selection);
      
      const result = isBlockActive(editor, 'heading-one');
      
      expect(result).toBe(true);
    });
    
    test('블록이 활성화되지 않았을 때 false 반환', () => {
      // Editor.nodes가 빈 배열을 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([]);
      (Editor.unhangRange as jest.Mock).mockReturnValueOnce(editor.selection);
      
      const result = isBlockActive(editor, 'heading-one');
      
      expect(result).toBe(false);
    });
  });
  
  describe('toggleFontFamily', () => {
    test('서체 변경', () => {
      toggleFontFamily(editor, 'Pretendard');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { fontFamily: 'Pretendard' },
        { match: expect.any(Function), split: true }
      );
    });
  });
  
  describe('toggleTextAlign', () => {
    test('selection이 없을 때 함수 종료', () => {
      editor.selection = null;
      
      toggleTextAlign(editor, 'center');
      
      // Transforms.setNodes가 호출되지 않았는지 확인
      expect(Transforms.setNodes).not.toHaveBeenCalled();
    });
    
    test('정렬이 활성화되지 않았을 때 정렬 설정', () => {
      // isTextAlignActive가 false를 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([]);
      (Editor.unhangRange as jest.Mock).mockReturnValueOnce(editor.selection);
      (Editor.isBlock as jest.Mock).mockReturnValueOnce(true);
      
      toggleTextAlign(editor, 'center');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { textAlign: 'center' },
        { match: expect.any(Function) }
      );
    });
    
    test('정렬이 활성화되었을 때 정렬 제거', () => {
      // isTextAlignActive가 true를 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([[{ textAlign: 'center' }, [0]]]);
      (Editor.unhangRange as jest.Mock).mockReturnValueOnce(editor.selection);
      (Editor.isBlock as jest.Mock).mockReturnValueOnce(true);
      
      toggleTextAlign(editor, 'center');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { textAlign: undefined },
        { match: expect.any(Function) }
      );
    });
  });
  
  describe('isTextAlignActive', () => {
    test('selection이 없을 때 false 반환', () => {
      editor.selection = null;
      
      const result = isTextAlignActive(editor, 'center');
      
      expect(result).toBe(false);
    });
    
    test('정렬이 활성화되었을 때 true 반환', () => {
      // Editor.nodes가 매치되는 노드를 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([[{ textAlign: 'center' }, [0]]]);
      (Editor.unhangRange as jest.Mock).mockReturnValueOnce(editor.selection);
      
      const result = isTextAlignActive(editor, 'center');
      
      expect(result).toBe(true);
    });
    
    test('정렬이 활성화되지 않았을 때 false 반환', () => {
      // Editor.nodes가 빈 배열을 반환하도록 설정
      (Editor.nodes as jest.Mock).mockReturnValueOnce([]);
      (Editor.unhangRange as jest.Mock).mockReturnValueOnce(editor.selection);
      
      const result = isTextAlignActive(editor, 'center');
      
      expect(result).toBe(false);
    });
  });
  
  describe('toggleFontColor', () => {
    test('글자 색상 변경', () => {
      toggleFontColor(editor, '#FF0000');
      
      // Transforms.setNodes가 호출되었는지 확인
      expect(Transforms.setNodes).toHaveBeenCalledWith(
        editor,
        { color: '#FF0000' },
        { match: expect.any(Function), split: true }
      );
    });
  });
}); 