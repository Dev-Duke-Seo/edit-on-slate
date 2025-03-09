import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toolbar } from '../Toolbar';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor } from '../../../utils/types';
import { toggleMark, toggleBlock, toggleFontFamily, toggleTextAlign, toggleFontColor } from '../../../utils/editorUtils';

// editorUtils 모듈 모킹
jest.mock('../../../utils/editorUtils', () => ({
  toggleMark: jest.fn(),
  isMarkActive: jest.fn().mockReturnValue(false),
  toggleBlock: jest.fn(),
  isBlockActive: jest.fn().mockReturnValue(false),
  toggleFontFamily: jest.fn(),
  toggleTextAlign: jest.fn(),
  toggleFontColor: jest.fn(),
  isTextAlignActive: jest.fn().mockReturnValue(false),
}));

// 이미지 모킹
jest.mock('../../../assets/icons/font-bold.png', () => 'font-bold.png');
jest.mock('../../../assets/icons/font-italic.png', () => 'font-italic.png');
jest.mock('../../../assets/icons/font-underline.png', () => 'font-underline.png');
jest.mock('../../../assets/icons/bullet-point.png', () => 'bullet-point.png');
jest.mock('../../../assets/icons/bullet-number.png', () => 'bullet-number.png');
jest.mock('../../../assets/icons/alignment-center.png', () => 'alignment-center.png');
jest.mock('../../../assets/icons/alignment-right.png', () => 'alignment-right.png');
jest.mock('../../../assets/icons/alignment-both.png', () => 'alignment-both.png');
jest.mock('../../../assets/icons/font-color.png', () => 'font-color.png');

// 무지개색 팔레트 정의 (Toolbar.tsx와 동일하게 유지)
const RAINBOW_COLORS = [
  '#FF0000', // 빨강
  '#FF7F00', // 주황
  '#FFFF00', // 노랑
  '#00FF00', // 초록
  '#0000FF', // 파랑
  '#4B0082', // 남색
  '#9400D3', // 보라
  '#FF1493', // 핫핑크
  '#00FFFF', // 하늘색
  '#FFD700', // 금색
  '#C0C0C0', // 은색
  '#000000', // 검정
  '#FFFFFF', // 흰색
];

describe('Toolbar 컴포넌트', () => {
  let editor: CustomEditor;
  
  beforeEach(() => {
    // 각 테스트 전에 에디터 초기화
    editor = withHistory(withReact(createEditor())) as CustomEditor;
    
    // 모킹된 함수 초기화
    jest.clearAllMocks();
  });
  
  test('기본 렌더링', () => {
    render(<Toolbar editor={editor} />);
    
    // 서체 선택 확인
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    // 텍스트 스타일 버튼 확인 (이미지 alt 텍스트로 확인)
    expect(screen.getByAltText('Bold')).toBeInTheDocument();
    expect(screen.getByAltText('Italic')).toBeInTheDocument();
    expect(screen.getByAltText('Underline')).toBeInTheDocument();
    expect(screen.getByText('</>')).toBeInTheDocument();
    
    // 글자 색상 버튼 확인
    expect(screen.getByAltText('Font Color')).toBeInTheDocument();
    
    // 블록 스타일 버튼 확인
    expect(screen.getByText('H1')).toBeInTheDocument();
    expect(screen.getByText('H2')).toBeInTheDocument();
    expect(screen.getByText('H3')).toBeInTheDocument();
    
    // 텍스트 정렬 버튼 확인
    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByAltText('Center Align')).toBeInTheDocument();
    expect(screen.getByAltText('Right Align')).toBeInTheDocument();
    expect(screen.getByAltText('Justify Align')).toBeInTheDocument();
    
    // 리스트 버튼 확인
    expect(screen.getByAltText('Bullet List')).toBeInTheDocument();
    expect(screen.getByAltText('Number List')).toBeInTheDocument();
    
    // 인용구 버튼 확인
    expect(screen.getByText('인용구')).toBeInTheDocument();
  });
  
  test('굵게 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 굵게 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Bold'));
    
    // toggleMark 함수가 호출되었는지 확인
    expect(toggleMark).toHaveBeenCalledWith(editor, 'bold');
  });
  
  test('기울임 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 기울임 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Italic'));
    
    // toggleMark 함수가 호출되었는지 확인
    expect(toggleMark).toHaveBeenCalledWith(editor, 'italic');
  });
  
  test('밑줄 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 밑줄 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Underline'));
    
    // toggleMark 함수가 호출되었는지 확인
    expect(toggleMark).toHaveBeenCalledWith(editor, 'underline');
  });
  
  test('코드 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 코드 버튼 클릭
    fireEvent.mouseDown(screen.getByText('</>'));
    
    // toggleMark 함수가 호출되었는지 확인
    expect(toggleMark).toHaveBeenCalledWith(editor, 'code');
  });
  
  test('H1 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // H1 버튼 클릭
    fireEvent.mouseDown(screen.getByText('H1'));
    
    // toggleBlock 함수가 호출되었는지 확인
    expect(toggleBlock).toHaveBeenCalledWith(editor, 'heading-one');
  });
  
  test('H2 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // H2 버튼 클릭
    fireEvent.mouseDown(screen.getByText('H2'));
    
    // toggleBlock 함수가 호출되었는지 확인
    expect(toggleBlock).toHaveBeenCalledWith(editor, 'heading-two');
  });
  
  test('H3 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // H3 버튼 클릭
    fireEvent.mouseDown(screen.getByText('H3'));
    
    // toggleBlock 함수가 호출되었는지 확인
    expect(toggleBlock).toHaveBeenCalledWith(editor, 'heading-three');
  });
  
  test('글머리 기호 목록 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 글머리 기호 목록 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Bullet List'));
    
    // toggleBlock 함수가 호출되었는지 확인
    expect(toggleBlock).toHaveBeenCalledWith(editor, 'bulleted-list');
  });
  
  test('번호 매기기 목록 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 번호 매기기 목록 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Number List'));
    
    // toggleBlock 함수가 호출되었는지 확인
    expect(toggleBlock).toHaveBeenCalledWith(editor, 'numbered-list');
  });
  
  test('인용구 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 인용구 버튼 클릭
    fireEvent.mouseDown(screen.getByText('인용구'));
    
    // toggleBlock 함수가 호출되었는지 확인
    expect(toggleBlock).toHaveBeenCalledWith(editor, 'block-quote');
  });
  
  test('서체 변경', () => {
    render(<Toolbar editor={editor} />);
    
    // 서체 선택
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'NanumSquareNeo' } });
    
    // toggleFontFamily 함수가 호출되었는지 확인
    expect(toggleFontFamily).toHaveBeenCalledWith(editor, 'NanumSquareNeo');
  });
  
  test('왼쪽 정렬 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 왼쪽 정렬 버튼 클릭
    fireEvent.mouseDown(screen.getByText('←'));
    
    // toggleTextAlign 함수가 호출되었는지 확인
    expect(toggleTextAlign).toHaveBeenCalledWith(editor, 'left');
  });
  
  test('가운데 정렬 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 가운데 정렬 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Center Align'));
    
    // toggleTextAlign 함수가 호출되었는지 확인
    expect(toggleTextAlign).toHaveBeenCalledWith(editor, 'center');
  });
  
  test('오른쪽 정렬 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 오른쪽 정렬 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Right Align'));
    
    // toggleTextAlign 함수가 호출되었는지 확인
    expect(toggleTextAlign).toHaveBeenCalledWith(editor, 'right');
  });
  
  test('양쪽 정렬 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 양쪽 정렬 버튼 클릭
    fireEvent.mouseDown(screen.getByAltText('Justify Align'));
    
    // toggleTextAlign 함수가 호출되었는지 확인
    expect(toggleTextAlign).toHaveBeenCalledWith(editor, 'justify');
  });
  
  test('색상 팔레트 버튼 클릭', () => {
    render(<Toolbar editor={editor} />);
    
    // 글자 색상 버튼 클릭하여 팔레트 표시
    fireEvent.mouseDown(screen.getByAltText('Font Color'));
    
    // 색상 버튼 중 하나 클릭 (빨간색)
    const redColorButton = screen.getByTitle('#FF0000');
    fireEvent.click(redColorButton);
    
    // toggleFontColor 함수가 호출되었는지 확인
    expect(toggleFontColor).toHaveBeenCalledWith(editor, '#FF0000');
  });
  
  test('모든 색상 팔레트 버튼 확인', () => {
    render(<Toolbar editor={editor} />);
    
    // 글자 색상 버튼 클릭하여 팔레트 표시
    fireEvent.mouseDown(screen.getByAltText('Font Color'));
    
    // 모든 색상 버튼이 렌더링되었는지 확인
    RAINBOW_COLORS.forEach(color => {
      expect(screen.getByTitle(color)).toBeInTheDocument();
    });
  });
}); 