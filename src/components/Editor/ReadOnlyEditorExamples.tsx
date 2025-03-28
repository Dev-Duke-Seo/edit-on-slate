import React from 'react';
import styled from '@emotion/styled';
import { Descendant } from 'slate';
import { ReadOnlyEditor } from './ReadOnlyEditor';
import { CustomElement, CustomText } from '../../utils/types';

const Container = styled.div`
  margin-top: 50px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: #666;
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExampleCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
`;

const ExampleTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
`;

const sampleValue: Descendant[] = [
  {
    type: 'heading-one',
    children: [{ text: '고급 예제' }],
  } as CustomElement,
  {
    type: 'paragraph',
    children: [
      { text: '이것은 ' },
      { text: '읽기 전용', bold: true },
      { text: ' 에디터의 고급 예제입니다.' },
    ],
  } as CustomElement,
];

export const ReadOnlyEditorExamples: React.FC = () => {
  return (
    <Container>
      <Title>고급 읽기 전용 에디터 예제</Title>
      <Description>다양한 스타일과 기능이 적용된 읽기 전용 에디터의 고급 예제입니다.</Description>
      
      <ExamplesGrid>
        <ExampleCard>
          <ExampleTitle>커스텀 스타일</ExampleTitle>
          <ReadOnlyEditor 
            value={sampleValue}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '20px',
              backgroundColor: '#fff'
            }}
          />
        </ExampleCard>

        <ExampleCard>
          <ExampleTitle>최소 높이 설정</ExampleTitle>
          <ReadOnlyEditor 
            value={sampleValue}
            style={{
              minHeight: '200px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '20px'
            }}
          />
        </ExampleCard>

        <ExampleCard>
          <ExampleTitle>스크롤 가능한 에디터</ExampleTitle>
          <ReadOnlyEditor 
            value={sampleValue}
            style={{
              maxHeight: '150px',
              overflowY: 'auto',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '20px'
            }}
          />
        </ExampleCard>

        <ExampleCard>
          <ExampleTitle>커스텀 폰트 크기</ExampleTitle>
          <ReadOnlyEditor 
            value={sampleValue}
            style={{
              fontSize: '18px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '20px'
            }}
          />
        </ExampleCard>
      </ExamplesGrid>
    </Container>
  );
}; 