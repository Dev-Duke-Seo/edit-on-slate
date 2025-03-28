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
	height?: string;
}

export const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({
	value,
	style,
	height,
}) => {
	const editor = useMemo(() => withReact(createEditor()), []);

	return (
		<div style={style}>
			<Slate editor={editor} initialValue={value}>
				<Container height={height}>
					<StyledEditor>
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
