import React from 'react';
import styled from '@emotion/styled';
import { Descendant } from 'slate';
import { ReadOnlyEditor } from './ReadOnlyEditor';
import { CustomElement, CustomText } from '../../utils/types';

// 스타일 컴포넌트 정의
const ExamplesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const ExampleSection = styled.section`
  margin-bottom: 40px;
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

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
`;

const CardDescription = styled.p`
  margin-bottom: 15px;
  color: #666;
  font-size: 0.9rem;
`;

const BlogPostContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Georgia', serif;
`;

const BlogPostTitle = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 10px;
  color: #333;
`;

const BlogPostMeta = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 30px;
`;

const CommentSection = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const CommentTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 20px;
`;

const Comment = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #666;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
`;

const CommentDate = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 3px;
`;

const DashboardCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const DashboardCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const DashboardCardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: #333;
`;

const DashboardCardActions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

// 예제 데이터
const sampleContent: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '이것은 읽기 전용 에디터에 표시되는 샘플 콘텐츠입니다. 다양한 스타일과 레이아웃에서 어떻게 보이는지 확인할 수 있습니다.' } as CustomText],
  } as CustomElement,
  {
    type: 'heading-two',
    children: [{ text: '주요 특징' } as CustomText],
  } as CustomElement,
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [{ text: '테두리와 그림자를 조절할 수 있습니다.' } as CustomText],
      } as CustomElement,
      {
        type: 'list-item',
        children: [{ text: '너비와 높이를 유동적으로 설정할 수 있습니다.' } as CustomText],
      } as CustomElement,
      {
        type: 'list-item',
        children: [{ text: '배경색과 패딩을 조절할 수 있습니다.' } as CustomText],
      } as CustomElement,
    ],
  } as CustomElement,
  {
    type: 'paragraph',
    children: [{ text: '이 컴포넌트는 다양한 상황에서 활용할 수 있습니다.' } as CustomText],
  } as CustomElement,
];

const blogPostContent: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '리액트(React)는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 페이스북에서 개발했으며, 단일 페이지 애플리케이션이나 모바일 애플리케이션 개발에 주로 사용됩니다.' } as CustomText],
  } as CustomElement,
  {
    type: 'paragraph',
    children: [
      { text: '리액트의 주요 특징 중 하나는 ' } as CustomText, 
      { text: '가상 DOM(Virtual DOM)', bold: true } as CustomText, 
      { text: '입니다. 이는 실제 DOM의 가벼운 복사본으로, 리액트는 이를 통해 실제 DOM에 변경 사항을 적용하기 전에 메모리에서 계산을 수행합니다.' } as CustomText
    ],
  } as CustomElement,
  {
    type: 'heading-two',
    children: [{ text: '컴포넌트 기반 아키텍처' } as CustomText],
  } as CustomElement,
  {
    type: 'paragraph',
    children: [{ text: '리액트는 컴포넌트 기반 아키텍처를 사용합니다. 이는 UI를 독립적이고 재사용 가능한 조각으로 나누어 개발할 수 있게 해줍니다. 각 컴포넌트는 자체 상태와 렌더링 로직을 가지고 있습니다.' } as CustomText],
  } as CustomElement,
  {
    type: 'block-quote',
    children: [{ text: '컴포넌트를 사용하면 코드를 재사용하고, 테스트하고, 관리하기가 더 쉬워집니다.' } as CustomText],
  } as CustomElement,
  {
    type: 'paragraph',
    children: [{ text: '리액트는 JSX라는 문법을 사용하여 JavaScript 코드 안에 HTML과 유사한 마크업을 작성할 수 있게 해줍니다. 이는 UI 구조와 로직을 한 곳에서 관리할 수 있게 해줍니다.' } as CustomText],
  } as CustomElement,
];

const commentContent: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '정말 유익한 글이네요! 리액트의 가상 DOM 개념이 특히 흥미로웠습니다. 이런 글 더 부탁드립니다.' } as CustomText],
  } as CustomElement,
];

// ReadOnlyEditor 예제 컴포넌트
export const ReadOnlyEditorExamples: React.FC = () => {
  return (
    <ExamplesContainer>
      <ExampleSection>
        <SectionTitle>읽기 전용 에디터 활용 예제</SectionTitle>
        <SectionDescription>
          다양한 상황에서 ReadOnlyEditor 컴포넌트를 어떻게 활용할 수 있는지 보여주는 예제입니다.
        </SectionDescription>
        
        <Card>
          <CardTitle>기본 카드 내 콘텐츠</CardTitle>
          <CardDescription>
            카드 UI 내에서 서식이 있는 콘텐츠를 표시하는 예제입니다.
          </CardDescription>
          <ReadOnlyEditor 
            value={sampleContent} 
            noBorder={true}
            noShadow={true}
            width="100%"
            maxWidth="100%"
            backgroundColor="transparent"
            padding="0"
          />
        </Card>
        
        <Card>
          <CardTitle>블로그 포스트 예제</CardTitle>
          <CardDescription>
            블로그 포스트 레이아웃에서 ReadOnlyEditor를 사용하는 예제입니다.
          </CardDescription>
          
          <BlogPostContainer>
            <BlogPostTitle>리액트(React)의 기본 개념 이해하기</BlogPostTitle>
            <BlogPostMeta>작성자: 홍길동 | 작성일: 2023년 3월 15일</BlogPostMeta>
            
            <ReadOnlyEditor 
              value={blogPostContent} 
              noBorder={true}
              noShadow={true}
              width="100%"
              maxWidth="100%"
              backgroundColor="transparent"
              padding="0"
            />
            
            <CommentSection>
              <CommentTitle>댓글 (1)</CommentTitle>
              
              <Comment>
                <CommentHeader>
                  <CommentAvatar>K</CommentAvatar>
                  <div>
                    <CommentAuthor>김철수</CommentAuthor>
                    <CommentDate>2023년 3월 16일</CommentDate>
                  </div>
                </CommentHeader>
                
                <ReadOnlyEditor 
                  value={commentContent} 
                  noBorder={true}
                  noShadow={true}
                  width="100%"
                  maxWidth="100%"
                  backgroundColor="transparent"
                  padding="0"
                />
              </Comment>
            </CommentSection>
          </BlogPostContainer>
        </Card>
        
        <Card>
          <CardTitle>대시보드 카드 예제</CardTitle>
          <CardDescription>
            대시보드 UI에서 ReadOnlyEditor를 사용하는 예제입니다.
          </CardDescription>
          
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>최근 공지사항</DashboardCardTitle>
              <DashboardCardActions>
                <Button>수정</Button>
                <Button>삭제</Button>
              </DashboardCardActions>
            </DashboardCardHeader>
            
            <ReadOnlyEditor 
              value={sampleContent} 
              noBorder={true}
              noShadow={true}
              width="100%"
              maxWidth="100%"
              backgroundColor="#f9f9f9"
              padding="15px"
              minHeight="150px"
            />
          </DashboardCard>
        </Card>
      </ExampleSection>
    </ExamplesContainer>
  );
}; 