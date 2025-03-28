/** @jsxImportSource @emotion/react */
import React, { useState, ReactNode } from "react";
import styled from "@emotion/styled";
import { CustomEditor } from "../../utils/types";
import {
	toggleMark,
	isMarkActive,
	toggleBlock,
	isBlockActive,
	toggleFontFamily,
	toggleTextAlign,
	toggleFontColor,
} from "../../utils/editorUtils";
import { Editor } from "slate";
import { useSlate } from "slate-react";

// 아이콘 이미지 임포트
import boldIcon from "../../assets/icons/font-bold.png";
import italicIcon from "../../assets/icons/font-italic.png";
import underlineIcon from "../../assets/icons/font-underline.png";
import bulletListIcon from "../../assets/icons/bullet-point.png";
import numberListIcon from "../../assets/icons/bullet-number.png";
import alignCenterIcon from "../../assets/icons/alignment-center.png";
import alignRightIcon from "../../assets/icons/alignment-right.png";
import alignJustifyIcon from "../../assets/icons/alignment-both.png";
import fontColorIcon from "../../assets/icons/font-color.png";

// 무지개색 팔레트 정의
const RAINBOW_COLORS = [
	"#FF0000", // 빨강
	"#FF7F00", // 주황
	"#FFFF00", // 노랑
	"#00FF00", // 초록
	"#0000FF", // 파랑
	"#4B0082", // 남색
	"#9400D3", // 보라
	"#FF1493", // 핫핑크
	"#00FFFF", // 하늘색
	"#FFD700", // 금색
	"#C0C0C0", // 은색
	"#000000", // 검정
	"#FFFFFF", // 흰색
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
	all: unset;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	box-sizing: border-box;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	padding: 6px;
	width: 32px;
	height: 32px;
	border: 1px solid ${(props) => (props.active ? "#666" : "#ccc")};
	border-radius: 4px;
	background-color: ${(props) => (props.active ? "#e6e6e6" : "white")};
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: #e6e6e6;
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
	}

	&:active {
		transform: translateY(1px);
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
	display: block;
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
	display: ${(props) => (props.visible ? "block" : "none")};
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

const ToolbarGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

interface ToolbarProps {
	editor: Editor;
}

type BlockType =
	| "heading-one"
	| "heading-two"
	| "block-quote"
	| "numbered-list"
	| "bulleted-list";
type MarkType = "bold" | "italic" | "underline" | "code";

interface MarkButtonProps {
	format: MarkType;
	icon: ReactNode;
}

interface BlockButtonProps {
	format: BlockType;
	icon: ReactNode;
}

const MarkButton: React.FC<MarkButtonProps> = ({ format, icon }) => {
	const editor = useSlate() as CustomEditor;
	const isActive = isMarkActive(editor, format);

	return (
		<ToolbarButton
			active={isActive}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
			title={format}
		>
			{icon}
		</ToolbarButton>
	);
};

const BlockButton: React.FC<BlockButtonProps> = ({ format, icon }) => {
	const editor = useSlate() as CustomEditor;
	const isActive = isBlockActive(editor, format);

	return (
		<ToolbarButton
			active={isActive}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
			title={format}
		>
			{icon}
		</ToolbarButton>
	);
};

const AlignButton: React.FC<{
	align: "center" | "right" | "justify";
	icon: ReactNode;
}> = ({ align, icon }) => {
	const editor = useSlate() as CustomEditor;

	return (
		<ToolbarButton
			active={false}
			onMouseDown={(e) => {
				e.preventDefault();
				toggleTextAlign(editor, align);
			}}
			title={`${align} Align`}
		>
			{icon}
		</ToolbarButton>
	);
};

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
	const [colorPickerVisible, setColorPickerVisible] = useState(false);

	// 서체 변경 핸들러
	const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		toggleFontFamily(editor as CustomEditor, e.target.value);
	};

	// 텍스트 정렬 핸들러
	const handleTextAlignToggle = (align: "center" | "right" | "justify") => {
		toggleTextAlign(editor as CustomEditor, align);
	};

	// 글자 색상 변경 핸들러
	const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		toggleFontColor(editor as CustomEditor, e.target.value);
		setColorPickerVisible(false);
	};

	// 팔레트에서 색상 선택 핸들러
	const handleColorSelect = (color: string) => {
		toggleFontColor(editor as CustomEditor, color);
		setColorPickerVisible(false);
	};

	return (
		<ToolbarContainer>
			<ToolbarGroup>
				<MarkButton
					format="bold"
					icon={<IconImage src={boldIcon} alt="Bold" />}
				/>
				<MarkButton
					format="italic"
					icon={<IconImage src={italicIcon} alt="Italic" />}
				/>
				<MarkButton
					format="underline"
					icon={<IconImage src={underlineIcon} alt="Underline" />}
				/>
				<MarkButton format="code" icon="</>" />
			</ToolbarGroup>

			<ToolbarDivider />

			<ToolbarGroup>
				<BlockButton format="heading-one" icon="H1" />
				<BlockButton format="heading-two" icon="H2" />
				<BlockButton format="block-quote" icon={'"'} />
			</ToolbarGroup>

			<ToolbarDivider />

			<ToolbarGroup>
				<BlockButton
					format="bulleted-list"
					icon={<IconImage src={bulletListIcon} alt="Bullet List" />}
				/>
				<BlockButton
					format="numbered-list"
					icon={<IconImage src={numberListIcon} alt="Number List" />}
				/>
			</ToolbarGroup>

			<ToolbarDivider />

			<ToolbarGroup>
				<AlignButton
					align="center"
					icon={<IconImage src={alignCenterIcon} alt="Center Align" />}
				/>
				<AlignButton
					align="right"
					icon={<IconImage src={alignRightIcon} alt="Right Align" />}
				/>
				<AlignButton
					align="justify"
					icon={<IconImage src={alignJustifyIcon} alt="Justify" />}
				/>
			</ToolbarGroup>

			<ToolbarDivider />

			<ToolbarGroup>
				<FontSelect onChange={handleFontFamilyChange} title="Font Family">
					<option value="Pretendard">Pretendard</option>
					<option value="Nanum Gothic">나눔고딕</option>
					<option value="sans-serif">Sans-serif</option>
					<option value="serif">Serif</option>
					<option value="monospace">Monospace</option>
				</FontSelect>
			</ToolbarGroup>

			<ToolbarDivider />

			<ToolbarGroup>
				<ColorPickerContainer>
					<ToolbarButton
						active={false}
						onMouseDown={(e) => {
							e.preventDefault();
							setColorPickerVisible(!colorPickerVisible);
						}}
						title="Font Color"
					>
						<IconImage src={fontColorIcon} alt="Font Color" />
					</ToolbarButton>

					<ColorPickerPopup visible={colorPickerVisible}>
						<ColorPicker
							type="color"
							onChange={handleFontColorChange}
							title="Choose Color"
						/>
						<ColorPalette>
							{RAINBOW_COLORS.map((color) => (
								<ColorButton
									key={color}
									color={color}
									onClick={() => handleColorSelect(color)}
								/>
							))}
						</ColorPalette>
					</ColorPickerPopup>
				</ColorPickerContainer>
			</ToolbarGroup>
		</ToolbarContainer>
	);
};
