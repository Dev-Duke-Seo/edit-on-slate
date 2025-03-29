import React, { useMemo, useCallback, useEffect, useState } from "react";
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
import { Container, StyledEditor } from "./styles";
import { loadDefaultFonts, waitForFont } from "../../utils/fontLoader";

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
	containerStyle?: React.CSSProperties;
	editorStyle?: React.CSSProperties;
	height?: string;
}

// 에디터 컴포넌트
export const Editor: React.FC<EditorProps> = ({
	value = initialValue,
	onChange,
	placeholder = "내용을 입력하세요...",
	readOnly = false,
	containerStyle,
	editorStyle,
}) => {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	
	// 폰트 로딩 처리
	useEffect(() => {
		// 기본 폰트 로드
		loadDefaultFonts();
		
		// 주요 폰트들이 로드될 때까지 대기
		Promise.all([
			waitForFont('Nanum Gothic'),
			waitForFont('Pretendard'),
			waitForFont('Inter')
		]).then(() => {
			setFontsLoaded(true);
			document.documentElement.classList.add('fonts-loaded');
		});
	}, []);

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
			containerStyle={containerStyle}
			editorStyle={editorStyle}
		/>
	) : (
		<Slate editor={editor} initialValue={value} onChange={onChange}>
			<Container style={containerStyle}>
				<Toolbar editor={editor} />
				<StyledEditor style={editorStyle}>
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

	return <ShadowContainer>
		<div className={fontsLoaded ? 'fonts-loaded' : ''}>
			{content}
		</div>
	</ShadowContainer>;
};

export default Editor;
