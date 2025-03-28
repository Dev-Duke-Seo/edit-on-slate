import React, { useState } from 'react';
import { Descendant } from 'slate';
import styled from '@emotion/styled';
import { Editor } from './components/Editor';
import { ReadOnlyEditor } from './components/Editor/ReadOnlyEditor';
import { ReadOnlyEditorExamples } from './components/Editor/ReadOnlyEditorExamples';
import { CustomElement, CustomText } from './utils/types';
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

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#f0f0f0' : 'transparent'};
  border: none;
  border-bottom: ${props => props.active ? '2px solid #333' : 'none'};
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#333' : '#666'};
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const EditorWrapper = styled.div`
  margin-bottom: 30px;
`;

const ReadOnlySection = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

const SectionDescription = styled.p`
  margin-bottom: 20px;
  color: #666;
`;

const ReadOnlyExamples = styled.div`
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

// 탭 타입 정의
type TabType = 'editor' | 'basic-examples' | 'advanced-examples';

function App() {
  // 에디터 값 상태 관리
  const [editorValue, setEditorValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '에디터 라이브러리에 오신 것을 환영합니다!' } as CustomText],
    } as CustomElement,
    {
      type: 'paragraph',
      children: [
        { text: '이 에디터는 ' } as CustomText, 
        { text: '리액트', bold: true } as CustomText, 
        { text: '로 만들어졌으며, ' } as CustomText, 
        { text: 'Slate.js', italic: true } as CustomText, 
        { text: ' 기반입니다.' } as CustomText
      ],
    } as CustomElement,
    {
      type: 'heading-one',
      children: [{ text: '주요 기능' } as CustomText],
    } as CustomElement,
    {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: '텍스트 서식 지정 (굵게, 기울임, 밑줄, 코드)' } as CustomText],
        } as CustomElement,
        {
          type: 'list-item',
          children: [{ text: '블록 스타일 (제목, 인용구, 목록)' } as CustomText],
        } as CustomElement,
        {
          type: 'list-item',
          children: [{ text: '마크다운 단축키 지원' } as CustomText],
        } as CustomElement,
      ],
    } as CustomElement,
    {
      type: 'paragraph',
      children: [{ text: '자유롭게 편집해보세요!' } as CustomText],
    } as CustomElement,
  ]);

  // 현재 활성화된 탭
  const [activeTab, setActiveTab] = useState<TabType>('editor');

  // 에디터 값 변경 핸들러
  const handleEditorChange = (value: Descendant[]) => {
    setEditorValue(value);
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <AppContainer>
      <Header>
        <Title>리액트 에디터 라이브러리</Title>
        <Subtitle>글쓰기에 필요한 기본적인 기능을 제공하는 리액트 컴포넌트</Subtitle>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === 'editor'} 
          onClick={() => handleTabChange('editor')}
        >
          에디터
        </Tab>
        <Tab 
          active={activeTab === 'basic-examples'} 
          onClick={() => handleTabChange('basic-examples')}
        >
          기본 예제
        </Tab>
        <Tab 
          active={activeTab === 'advanced-examples'} 
          onClick={() => handleTabChange('advanced-examples')}
        >
          고급 예제
        </Tab>
      </TabsContainer>

      {activeTab === 'editor' && (
        <EditorWrapper>
          <SectionTitle>편집 가능한 에디터</SectionTitle>
          <SectionDescription>아래 에디터에서 내용을 자유롭게 편집해보세요.</SectionDescription>
          <Editor 
            value={editorValue} 
            onChange={handleEditorChange} 
          />
          
          <OutputContainer>
            <OutputTitle>에디터 데이터 출력</OutputTitle>
            <OutputContent>{JSON.stringify(editorValue, null, 2)}</OutputContent>
          </OutputContainer>
        </EditorWrapper>
      )}

      {activeTab === 'basic-examples' && (
        <ReadOnlySection>
          <SectionTitle>읽기 전용 에디터 예제</SectionTitle>
          <SectionDescription>다양한 스타일 옵션이 적용된 읽기 전용 에디터 예제입니다.</SectionDescription>
          
          <ReadOnlyExamples>
            <ExampleCard>
              <ExampleTitle>기본 스타일</ExampleTitle>
              <ReadOnlyEditor 
                value={editorValue} 
                containerStyle={{ 
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#fff'
                }}
                editorStyle={{
                  padding: '20px'
                }}
              />
            </ExampleCard>
            
            <ExampleCard>
              <ExampleTitle>테두리 없음</ExampleTitle>
              <ReadOnlyEditor 
                value={editorValue} 
                containerStyle={{
                  border: 'none',
                  boxShadow: 'none'
                }}
                editorStyle={{
                  border: 'none',
                  boxShadow: 'none'
                }}
              />
            </ExampleCard>
            
            <ExampleCard>
              <ExampleTitle>배경색 변경</ExampleTitle>
              <ReadOnlyEditor 
                value={editorValue} 
                containerStyle={{
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                editorStyle={{ 
                  backgroundColor: '#f5f5f5',
                  padding: '15px'
                }}
              />
            </ExampleCard>
            
            <ExampleCard>
              <ExampleTitle>너비 조절</ExampleTitle>
              <ReadOnlyEditor 
                value={editorValue} 
                containerStyle={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  width: '70%'
                }}
                editorStyle={{ 
                  minHeight: '150px',
                  padding: '20px'
                }}
              />
            </ExampleCard>
          </ReadOnlyExamples>
        </ReadOnlySection>
      )}

      {activeTab === 'advanced-examples' && (
        <ReadOnlyEditorExamples />
      )}
    </AppContainer>
  );
}

export default App;
