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
  transition: font-family 0.2s ease;

  &.edit-on-slate-bold {
    font-weight: bold;
  }

  &.edit-on-slate-italic {
    font-style: italic;
  }

  &.edit-on-slate-underline {
    text-decoration: underline;
  }

  &.edit-on-slate-code {
    background-color: #f0f0f0;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: var(--font-code, monospace);
    font-size: 0.9em;
  }
`;

// 텍스트 스타일 렌더링 컴포넌트
export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const customLeaf = leaf as CustomText;
  const classes = [
    leaf.bold && 'edit-on-slate-bold',
    leaf.italic && 'edit-on-slate-italic',
    leaf.underline && 'edit-on-slate-underline',
    leaf.code && 'edit-on-slate-code',
    customLeaf.fontFamily && `edit-on-slate-font-${customLeaf.fontFamily.toLowerCase()}`
  ].filter(Boolean).join(' ');

  return (
    <StyledSpan
      {...attributes}
      fontFamily={customLeaf.fontFamily}
      color={customLeaf.color}
      className={classes}
    >
      {children}
    </StyledSpan>
  );
}; 