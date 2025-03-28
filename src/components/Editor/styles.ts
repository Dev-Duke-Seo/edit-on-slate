import styled from '@emotion/styled';

const fontVariables = `
  --font-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-code: "JetBrains Mono", "Fira Code", monospace;
  --font-family-sans: "Nanum Gothic", "Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif;
  --font-family-serif: "Noto Serif KR", Georgia, "Times New Roman", serif;
  --font-family-mono: "JetBrains Mono", "D2Coding", Consolas, monospace;
`;

export const Root = styled.div`
  ${fontVariables}
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
`;

export const Container = styled.div<{ height?: string }>`
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: #fff;
  height: ${props => props.height || '500px'};
  display: flex;
  flex-direction: column;
`;

export const StyledEditor = styled.div`
  font-family: var(--font-primary);
  line-height: 1.5;
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.1);
  }

  p {
    margin: 0 0 1em 0;
    &:last-child { margin-bottom: 0; }
  }

  h1 { font-size: 2em; margin: 1em 0 0.5em; }
  h2 { font-size: 1.5em; margin: 1em 0 0.5em; }
  h3 { font-size: 1.17em; margin: 1em 0 0.5em; }

  blockquote {
    border-left: 2px solid #ddd;
    margin: 1em 0;
    padding-left: 1em;
    color: #666;
  }

  code {
    font-family: var(--font-code);
    background: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  ul, ol {
    margin: 1em 0;
    padding-left: 2em;
  }

  li { margin: 0.5em 0; }
`;

export const Toolbar = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  background: #f8f9fa;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const ToolbarGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const Button = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    border-color: #ccc;
  }

  &.active {
    background: #e9ecef;
    border-color: #adb5bd;
    color: #000;
  }

  img {
    width: 16px;
    height: 16px;
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export const Select = styled.select`
  height: 32px;
  padding: 0 24px 0 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff url('data:image/svg+xml;utf8,<svg fill="%23333" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 4px center;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  appearance: none;
  min-width: 120px;

  &:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
  }

  &:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.1);
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;
  margin: 0;
  background: #ddd;
  flex-shrink: 0;
`; 