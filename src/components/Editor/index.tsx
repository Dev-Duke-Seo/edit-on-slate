import React, { useMemo, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react";
import { withHistory } from "slate-history";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { Toolbar } from "./Toolbar";
import { withShortcuts } from "../../plugins/withShortcuts";
import { CustomElement } from "../../utils/types";
import { ShadowContainer } from "./ShadowContainer";
import { ReadOnlyEditor } from "./ReadOnlyEditor";
import { Root, Container, StyledEditor } from "./styles";

// 초기 에디터 값
const initialValue: Descendant[] = [
	{
		type: "paragraph",
		children: [{ text: "" }],
	} as CustomElement,
];

// 에디터 컴포넌트 Props 타입
export interface EditorProps {
	value?: Descendant[];
	onChange?: (value: Descendant[]) => void;
	placeholder?: string;
	readOnly?: boolean;
	className?: string;
	style?: React.CSSProperties;
	height?: string;
}

// 에디터 컴포넌트
export const Editor: React.FC<EditorProps> = ({
	value = initialValue,
	onChange,
	placeholder = "내용을 입력하세요...",
	readOnly = false,
	className,
	style,
	height,
}) => {
	// 에디터 초기화
	const editor = useMemo(() => {
		return withShortcuts(withHistory(withReact(createEditor())));
	}, []);

	// 요소 렌더링 핸들러
	const renderElement = useCallback(
		(props: RenderElementProps) => <Element {...props} />,
		[]
	);

	// 텍스트 스타일 렌더링 핸들러
	const renderLeaf = useCallback(
		(props: RenderLeafProps) => <Leaf {...props} />,
		[]
	);

	const content = readOnly ? (
		<ReadOnlyEditor
			value={value}
			placeholder={placeholder}
			style={style}
			height={height}
		/>
	) : (
		<Slate editor={editor} initialValue={value} onChange={onChange}>
			<Container height={height}>
				<Toolbar editor={editor} />
				<StyledEditor>
					<Editable
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						placeholder={placeholder}
						spellCheck
						autoFocus
					/>
				</StyledEditor>
			</Container>
		</Slate>
	);

	return <ShadowContainer>{content}</ShadowContainer>;
};

export default Editor;
