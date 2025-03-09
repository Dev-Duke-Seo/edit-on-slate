import React from 'react';
import { RenderLeafProps } from 'slate-react';
import styled from '@emotion/styled';
import { CustomText } from '../../utils/types';

// 스타일 컴포넌트 정의
const StyledBold = styled.span`
  font-weight: bold;
`;

const StyledItalic = styled.span`
  font-style: italic;
`;

const StyledUnderline = styled.span`
  text-decoration: underline;
`;

const StyledCode = styled.code`
  background-color: #f0f0f0;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
`;

const StyledSpan = styled.span<{ fontFamily?: string; color?: string }>`
  font-family: ${(props) => props.fontFamily || 'inherit'};
  color: ${(props) => props.color || 'inherit'};
`;

// 텍스트 스타일 렌더링 컴포넌트
export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const customLeaf = leaf as CustomText;
  let styledChildren = children;

  if (leaf.bold) {
    styledChildren = <StyledBold>{styledChildren}</StyledBold>;
  }

  if (leaf.italic) {
    styledChildren = <StyledItalic>{styledChildren}</StyledItalic>;
  }

  if (leaf.underline) {
    styledChildren = <StyledUnderline>{styledChildren}</StyledUnderline>;
  }

  if (leaf.code) {
    styledChildren = <StyledCode>{styledChildren}</StyledCode>;
  }

  return (
    <StyledSpan 
      {...attributes} 
      fontFamily={customLeaf.fontFamily} 
      color={customLeaf.color}
    >
      {styledChildren}
    </StyledSpan>
  );
}; 