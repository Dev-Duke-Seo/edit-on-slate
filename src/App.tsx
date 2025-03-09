import React, { useState } from 'react';
import { Descendant } from 'slate';
import styled from '@emotion/styled';
import { Editor } from './components/Editor';
import './App.css';

// 스타일 컴포넌트 정의
const AppContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const EditorWrapper = styled.div`
  margin-bottom: 30px;
`;

const OutputContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const OutputTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const OutputContent = styled.pre`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 14px;
`;

function App() {
  // 에디터 값 상태 관리
  const [editorValue, setEditorValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '에디터 라이브러리에 오신 것을 환영합니다!' }],
    },
    {
      type: 'paragraph',
      children: [{ text: '이 에디터는 ' }, { text: '리액트', bold: true }, { text: '로 만들어졌으며, ' }, { text: 'Slate.js', italic: true }, { text: ' 기반입니다.' }],
    },
    {
      type: 'heading-one',
      children: [{ text: '주요 기능' }],
    },
    {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: '텍스트 서식 지정 (굵게, 기울임, 밑줄, 코드)' }],
        },
        {
          type: 'list-item',
          children: [{ text: '블록 스타일 (제목, 인용구, 목록)' }],
        },
        {
          type: 'list-item',
          children: [{ text: '마크다운 단축키 지원' }],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [{ text: '자유롭게 편집해보세요!' }],
    },
  ]);

  // 에디터 값 변경 핸들러
  const handleEditorChange = (value: Descendant[]) => {
    setEditorValue(value);
  };

  return (
    <AppContainer>
      <Header>
        <Title>리액트 에디터 라이브러리</Title>
        <Subtitle>글쓰기에 필요한 기본적인 기능을 제공하는 리액트 컴포넌트</Subtitle>
      </Header>

      <EditorWrapper>
        <Editor value={editorValue} onChange={handleEditorChange} />
      </EditorWrapper>

      <OutputContainer>
        <OutputTitle>에디터 데이터 출력</OutputTitle>
        <OutputContent>{JSON.stringify(editorValue, null, 2)}</OutputContent>
      </OutputContainer>
    </AppContainer>
  );
}

export default App;
