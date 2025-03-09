import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import styled from '@emotion/styled';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Toolbar } from './Toolbar';
import { withShortcuts } from '../../plugins/withShortcuts';
import { CustomElement } from '../../utils/types';

// 스타일 컴포넌트 정의
const EditorContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
  max-width: 800px;
  margin: 0 auto;
`;

const EditableContainer = styled.div`
  padding: 20px;
  min-height: 300px;
`;

// 초기 에디터 값
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  } as CustomElement,
];

// 에디터 컴포넌트 Props 타입
export interface EditorProps {
  value?: Descendant[];
  onChange?: (value: Descendant[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// 에디터 컴포넌트
export const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder = '내용을 입력하세요...',
  readOnly = false,
  className,
  style,
}) => {
  // 에디터 초기화
  const editor = useMemo(() => {
    return withShortcuts(withHistory(withReact(createEditor())));
  }, []);

  // 에디터 값 상태 관리
  const [editorValue, setEditorValue] = useState<Descendant[]>(value || initialValue);

  // 에디터 값 변경 핸들러
  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setEditorValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  // 요소 렌더링 핸들러
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);

  // 텍스트 스타일 렌더링 핸들러
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  return (
    <EditorContainer className={className} style={style}>
      <Slate editor={editor} initialValue={editorValue} onChange={handleChange}>
        {!readOnly && <Toolbar editor={editor} />}
        <EditableContainer>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            readOnly={readOnly}
            spellCheck
            autoFocus
            data-testid="slate-editor"
          />
        </EditableContainer>
      </Slate>
    </EditorContainer>
  );
}; 