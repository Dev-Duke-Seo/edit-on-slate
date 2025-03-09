import React, { useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import styled from '@emotion/styled';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { withShortcuts } from '../../plugins/withShortcuts';

// 스타일 컴포넌트 정의
const EditorContainer = styled.div<{
  noBorder?: boolean;
  noShadow?: boolean;
  width?: string;
  maxWidth?: string;
  minHeight?: string;
  backgroundColor?: string;
  padding?: string;
}>`
  border: ${props => props.noBorder ? 'none' : '1px solid #ddd'};
  border-radius: 4px;
  box-shadow: ${props => props.noShadow ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  background-color: ${props => props.backgroundColor || 'white'};
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxWidth || '800px'};
  margin: 0 auto;
`;

const EditableContainer = styled.div<{
  padding?: string;
  minHeight?: string;
  maxHeight?: string;
  fontSize?: string;
  overflow?: string;
}>`
  padding: ${props => props.padding || '20px'};
  min-height: ${props => props.minHeight || 'auto'};
  max-height: ${props => props.maxHeight || 'none'};
  font-size: ${props => props.fontSize || '16px'};
  overflow: ${props => props.overflow || 'auto'};
`;

// 읽기 전용 에디터 컴포넌트 Props 타입
export interface ReadOnlyEditorProps {
  value: Descendant[];
  noBorder?: boolean;
  noShadow?: boolean;
  width?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  backgroundColor?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  fontSize?: string;
  overflow?: string;
}

// 읽기 전용 에디터 컴포넌트
export const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({
  value,
  noBorder = false,
  noShadow = false,
  width,
  maxWidth,
  minHeight,
  maxHeight,
  backgroundColor,
  padding,
  className,
  fontSize,
  style,
  overflow,
}) => {
  // 에디터 초기화
  const editor = useMemo(() => {
    return withShortcuts(withHistory(withReact(createEditor())));
  }, []);

  // 요소 렌더링 핸들러
  const renderElement = React.useCallback((props: RenderElementProps) => <Element {...props} />, []);

  // 텍스트 스타일 렌더링 핸들러
  const renderLeaf = React.useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  return (
    <EditorContainer 
      className={className} 
      style={style}
      noBorder={noBorder}
      noShadow={noShadow}
      width={width}
      maxWidth={maxWidth}
      backgroundColor={backgroundColor}
    >
      <Slate editor={editor} initialValue={value} onChange={() => {}}>
        <EditableContainer 
          padding={padding} 
          minHeight={minHeight} 
          maxHeight={maxHeight}
          fontSize={fontSize}
          overflow={overflow}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly={true}
            data-testid="slate-readonly-editor"
          />
        </EditableContainer>
      </Slate>
    </EditorContainer>
  );
}; 