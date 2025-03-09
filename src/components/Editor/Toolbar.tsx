import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CustomEditor } from '../../utils/types';
import { toggleMark, isMarkActive, toggleBlock, isBlockActive, toggleFontFamily, toggleTextAlign, toggleFontColor } from '../../utils/editorUtils';

// 아이콘 이미지 임포트
import boldIcon from '../../assets/icons/font-bold.png';
import italicIcon from '../../assets/icons/font-italic.png';
import underlineIcon from '../../assets/icons/font-underline.png';
import bulletListIcon from '../../assets/icons/bullet-point.png';
import numberListIcon from '../../assets/icons/bullet-number.png';
import alignCenterIcon from '../../assets/icons/alignment-center.png';
import alignRightIcon from '../../assets/icons/alignment-right.png';
import alignJustifyIcon from '../../assets/icons/alignment-both.png';
import fontColorIcon from '../../assets/icons/font-color.png';

// 무지개색 팔레트 정의
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

// 스타일 컴포넌트 정의
const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #f8f8f8;
`;

const ToolbarButton = styled.button<{ active: boolean }>`
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 6px 10px;
  border: ${(props) => (props.active ? '1px solid #666' : '1px solid #ccc')};
  background-color: ${(props) => (props.active ? '#e6e6e6' : 'white')};
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #e6e6e6;
  }
  
  &:focus {
    outline: none;
  }
`;

const ToolbarDivider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #ddd;
  margin: 0 10px;
`;

const IconImage = styled.img`
  width: 16px;
  height: 16px;
`;

const FontSelect = styled.select`
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const ColorPicker = styled.input`
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  
  &::-webkit-color-swatch {
    border: 1px solid #ccc;
    border-radius: 3px;
  }
`;

const ColorPickerContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ColorPickerPopup = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 200px;
`;

const ColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const ColorButton = styled.button<{ color: string }>`
  width: 24px;
  height: 24px;
  margin: 2px;
  padding: 0;
  border: 1px solid #ccc;
  background-color: ${(props) => props.color};
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

// 툴바 컴포넌트 Props 타입
interface ToolbarProps {
  editor: CustomEditor;
}

// 툴바 컴포넌트
export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  
  // 마크 토글 핸들러
  const handleMarkToggle = (format: 'bold' | 'italic' | 'underline' | 'code') => {
    toggleMark(editor, format);
  };

  // 블록 토글 핸들러
  const handleBlockToggle = (format: 'heading-one' | 'heading-two' | 'heading-three' | 'block-quote' | 'bulleted-list' | 'numbered-list') => {
    toggleBlock(editor, format);
  };
  
  // 서체 변경 핸들러
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    toggleFontFamily(editor, e.target.value);
  };
  
  // 텍스트 정렬 핸들러
  const handleTextAlignToggle = (align: 'center' | 'right' | 'justify') => {
    toggleTextAlign(editor, align);
  };
  
  // 글자 색상 변경 핸들러
  const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleFontColor(editor, e.target.value);
    setColorPickerVisible(false);
  };
  
  // 팔레트에서 색상 선택 핸들러
  const handleColorSelect = (color: string) => {
    toggleFontColor(editor, color);
    setColorPickerVisible(false);
  };

  return (
    <ToolbarContainer>
      {/* 서체 선택 */}
      <FontSelect onChange={handleFontFamilyChange}>
        <option value="Pretendard">Pretendard</option>
        <option value="Nanum Gothic">Nanum Gothic</option>
        <option value="sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </FontSelect>
      
      <ToolbarDivider />
      
      {/* 텍스트 스타일 버튼 */}
      <ToolbarButton
        active={isMarkActive(editor, 'bold')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleMarkToggle('bold');
        }}
        title="굵게"
      >
        <IconImage src={boldIcon} alt="Bold" />
      </ToolbarButton>
      <ToolbarButton
        active={isMarkActive(editor, 'italic')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleMarkToggle('italic');
        }}
        title="기울임"
      >
        <IconImage src={italicIcon} alt="Italic" />
      </ToolbarButton>
      <ToolbarButton
        active={isMarkActive(editor, 'underline')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleMarkToggle('underline');
        }}
        title="밑줄"
      >
        <IconImage src={underlineIcon} alt="Underline" />
      </ToolbarButton>
      <ToolbarButton
        active={isMarkActive(editor, 'code')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleMarkToggle('code');
        }}
        title="코드"
      >
        {'</>'}
      </ToolbarButton>
      
      {/* 글자 색상 */}
      <ColorPickerContainer>
        <ToolbarButton
          active={false}
          onMouseDown={(e) => {
            e.preventDefault();
            setColorPickerVisible(!colorPickerVisible);
          }}
          title="글자 색상"
        >
          <IconImage src={fontColorIcon} alt="Font Color" />
        </ToolbarButton>
        <ColorPickerPopup visible={colorPickerVisible}>
          <ColorPicker
            type="color"
            onChange={handleFontColorChange}
            defaultValue="#000000"
          />
          <ColorPalette>
            {RAINBOW_COLORS.map((color) => (
              <ColorButton
                key={color}
                color={color}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </ColorPalette>
        </ColorPickerPopup>
      </ColorPickerContainer>

      <ToolbarDivider />

      {/* 블록 스타일 버튼 */}
      <ToolbarButton
        active={isBlockActive(editor, 'heading-one')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleBlockToggle('heading-one');
        }}
        title="제목 1"
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        active={isBlockActive(editor, 'heading-two')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleBlockToggle('heading-two');
        }}
        title="제목 2"
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        active={isBlockActive(editor, 'heading-three')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleBlockToggle('heading-three');
        }}
        title="제목 3"
      >
        H3
      </ToolbarButton>

      <ToolbarDivider />
      
      {/* 텍스트 정렬 버튼 */}
      <ToolbarButton
        active={false}
        onMouseDown={(e) => {
          e.preventDefault();
          handleTextAlignToggle('center');
        }}
        title="가운데 정렬"
      >
        <IconImage src={alignCenterIcon} alt="Center Align" />
      </ToolbarButton>
      <ToolbarButton
        active={false}
        onMouseDown={(e) => {
          e.preventDefault();
          handleTextAlignToggle('right');
        }}
        title="오른쪽 정렬"
      >
        <IconImage src={alignRightIcon} alt="Right Align" />
      </ToolbarButton>
      <ToolbarButton
        active={false}
        onMouseDown={(e) => {
          e.preventDefault();
          handleTextAlignToggle('justify');
        }}
        title="양쪽 정렬"
      >
        <IconImage src={alignJustifyIcon} alt="Justify Align" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* 리스트 버튼 */}
      <ToolbarButton
        active={isBlockActive(editor, 'bulleted-list')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleBlockToggle('bulleted-list');
        }}
        title="글머리 기호 목록"
      >
        <IconImage src={bulletListIcon} alt="Bullet List" />
      </ToolbarButton>
      <ToolbarButton
        active={isBlockActive(editor, 'numbered-list')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleBlockToggle('numbered-list');
        }}
        title="번호 매기기 목록"
      >
        <IconImage src={numberListIcon} alt="Number List" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* 인용구 버튼 */}
      <ToolbarButton
        active={isBlockActive(editor, 'block-quote')}
        onMouseDown={(e) => {
          e.preventDefault();
          handleBlockToggle('block-quote');
        }}
        title="인용구"
      >
        인용구
      </ToolbarButton>
    </ToolbarContainer>
  );
}; 