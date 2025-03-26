import React from 'react';
import { RenderElementProps } from 'slate-react';
import styled from '@emotion/styled';
import { CustomElement } from '../../utils/types';

// 스타일 컴포넌트 정의
const StyledParagraph = styled.p<{ textAlign?: string }>`
  margin: 0.5em 0;
  line-height: 1.6;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledH1 = styled.h1<{ textAlign?: string }>`
  font-size: 2em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: bold;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledH2 = styled.h2<{ textAlign?: string }>`
  font-size: 1.5em;
  margin-top: 0.8em;
  margin-bottom: 0.4em;
  font-weight: bold;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledH3 = styled.h3<{ textAlign?: string }>`
  font-size: 1.2em;
  margin-top: 0.6em;
  margin-bottom: 0.3em;
  font-weight: bold;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledBlockquote = styled.blockquote<{ textAlign?: string }>`
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #666;
  font-style: italic;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledUl = styled.ul<{ textAlign?: string }>`
  margin: 0.5em 0;
  padding-left: 1.5em;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledOl = styled.ol<{ textAlign?: string }>`
  margin: 0.5em 0;
  padding-left: 1.5em;
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledLi = styled.li<{ textAlign?: string }>`
  margin: 0.2em 0;
  text-align: ${(props) => props.textAlign || 'left'};
`;

// 요소 렌더링 컴포넌트
export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const customElement = element as CustomElement;
  const textAlign = customElement.textAlign;
  
  switch (element.type) {
    case 'paragraph':
      return <StyledParagraph textAlign={textAlign} {...attributes}>{children}</StyledParagraph>;
    case 'heading-one':
      return <StyledH1 textAlign={textAlign} {...attributes}>{children}</StyledH1>;
    case 'heading-two':
      return <StyledH2 textAlign={textAlign} {...attributes}>{children}</StyledH2>;
    case 'heading-three':
      return <StyledH3 textAlign={textAlign} {...attributes}>{children}</StyledH3>;
    case 'block-quote':
      return <StyledBlockquote textAlign={textAlign} {...attributes}>{children}</StyledBlockquote>;
    case 'bulleted-list':
      return <StyledUl textAlign={textAlign} {...attributes}>{children}</StyledUl>;
    case 'numbered-list':
      return <StyledOl textAlign={textAlign} {...attributes}>{children}</StyledOl>;
    case 'list-item':
      return <StyledLi textAlign={textAlign} {...attributes}>{children}</StyledLi>;
    default:
      return <StyledParagraph textAlign={textAlign} {...attributes}>{children}</StyledParagraph>;
  }
};

export const renderElement = (props: RenderElementProps) => <Element {...props} />; 