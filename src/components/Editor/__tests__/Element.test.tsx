import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Element } from '../Element';
import { RenderElementProps } from 'slate-react';
import { CustomElement } from '../../../utils/types';

describe('Element 컴포넌트', () => {
  const baseProps: RenderElementProps = {
    attributes: {
      'data-slate-node': 'element',
      'data-testid': 'element',
      ref: null,
    },
    children: <span>테스트 텍스트</span>,
    element: {
      type: 'paragraph',
      children: [{ text: '테스트 텍스트' }],
    } as CustomElement,
  };
  
  test('paragraph 렌더링', () => {
    render(<Element {...baseProps} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
  });
  
  test('heading-one 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'heading-one',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H1');
  });
  
  test('heading-two 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'heading-two',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H2');
  });
  
  test('heading-three 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'heading-three',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H3');
  });
  
  test('block-quote 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'block-quote',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('BLOCKQUOTE');
  });
  
  test('bulleted-list 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'bulleted-list',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('UL');
  });
  
  test('numbered-list 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'numbered-list',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('OL');
  });
  
  test('list-item 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'list-item',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('LI');
  });
  
  test('알 수 없는 요소 타입은 paragraph로 렌더링', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        // @ts-ignore - 테스트를 위해 의도적으로 잘못된 타입 사용
        type: 'unknown-type',
      },
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
  });
  
  test('왼쪽 정렬 적용', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        textAlign: 'left',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({ textAlign: 'left' });
  });
  
  test('가운데 정렬 적용', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        textAlign: 'center',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({ textAlign: 'center' });
  });
  
  test('오른쪽 정렬 적용', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        textAlign: 'right',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({ textAlign: 'right' });
  });
  
  test('양쪽 정렬 적용', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        textAlign: 'justify',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({ textAlign: 'justify' });
  });
  
  test('다양한 요소에 정렬 적용', () => {
    const props = {
      ...baseProps,
      element: {
        ...baseProps.element,
        type: 'heading-one',
        textAlign: 'center',
      } as CustomElement,
    };
    
    render(<Element {...props} />);
    
    const element = screen.getByTestId('element');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H1');
    expect(element).toHaveStyle({ textAlign: 'center' });
  });
}); 