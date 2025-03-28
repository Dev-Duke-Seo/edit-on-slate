import React from "react";
import { RenderLeafProps } from "slate-react";
import styled from "@emotion/styled";
import { CustomText } from "../../utils/types";

const StyledSpan = styled.span<{
	fontFamily?: string;
	color?: string;
	isBold?: boolean;
	isItalic?: boolean;
	isUnderline?: boolean;
	isCode?: boolean;
}>`
	font-family: ${(props) => props.fontFamily || "inherit"};
	color: ${(props) => props.color || "inherit"};
	font-weight: ${(props) => (props.isBold ? "bold" : "normal")};
	font-style: ${(props) => (props.isItalic ? "italic" : "normal")};
	text-decoration: ${(props) => (props.isUnderline ? "underline" : "none")};
	${(props) =>
		props.isCode &&
		`
    background-color: #f0f0f0;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: var(--font-code, monospace);
    font-size: 0.9em;
  `}
	transition: all 0.2s ease;
`;

// 텍스트 스타일 렌더링 컴포넌트
export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
	const customLeaf = leaf as CustomText;

	return (
		<StyledSpan
			{...attributes}
			fontFamily={customLeaf.fontFamily}
			color={customLeaf.color}
			isBold={leaf.bold}
			isItalic={leaf.italic}
			isUnderline={leaf.underline}
			isCode={leaf.code}
		>
			{children}
		</StyledSpan>
	);
};

export const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
