import React from 'react';
import { render, screen } from '@testing-library/react';
import { Editor } from '../components/Editor';
import { Descendant } from 'slate';
import { CustomElement } from '../utils/types';

describe('에디터 통합 테스트', () => {
  test('에디터 초기 값 설정', () => {
    const initialValue: Descendant[] = [
      {
        type: 'paragraph' as CustomElement['type'],
        children: [{ text: '초기 텍스트' }],
      } as CustomElement,
    ];
    
    render(<Editor value={initialValue} />);
    
    // 초기 값이 렌더링되었는지 확인
    expect(screen.getByText('초기 텍스트')).toBeInTheDocument();
  });
  
  test('readOnly 모드에서 툴바 버튼 없음', () => {
    const initialValue: Descendant[] = [
      {
        type: 'paragraph' as CustomElement['type'],
        children: [{ text: '읽기 전용 텍스트' }],
      } as CustomElement,
    ];
    
    render(<Editor value={initialValue} readOnly={true} />);
    
    // 원래 텍스트는 표시되어야 함
    expect(screen.getByText('읽기 전용 텍스트')).toBeInTheDocument();
    
    // readOnly 모드에서는 툴바 버튼이 렌더링되지 않아야 함
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });
}); 