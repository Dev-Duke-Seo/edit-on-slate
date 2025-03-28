import React, { useMemo } from "react";
import { createEditor } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import { renderElement } from "./Element";
import { renderLeaf } from "./Leaf";
import { Descendant } from "slate";
import { Container, StyledEditor } from "./styles";

export interface ReadOnlyEditorProps {
	value: Descendant[];
	placeholder?: string;
	style?: React.CSSProperties;
	containerStyle?: React.CSSProperties;
	editorStyle?: React.CSSProperties;
}

export const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({
	value,
	style,
	containerStyle,
	editorStyle,
}) => {
	const editor = useMemo(() => withReact(createEditor()), []);

	return (
		<div style={style}>
			<Slate editor={editor} initialValue={value}>
				<Container style={containerStyle}>
					<StyledEditor style={editorStyle}>
						<Editable
							renderElement={renderElement}
							renderLeaf={renderLeaf}
							readOnly
						/>
					</StyledEditor>
				</Container>
			</Slate>
		</div>
	);
};
