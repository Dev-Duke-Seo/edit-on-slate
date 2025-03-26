import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { withReact, Slate, Editable } from 'slate-react';
import { renderElement } from './Element';
import { renderLeaf } from './Leaf';
import { Descendant } from 'slate';

interface ReadOnlyEditorProps {
  value: Descendant[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({
  value,
  placeholder,
  className,
  style
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div className={className} style={style}>
      <Slate editor={editor} initialValue={value}>
        <Editable
          className="edit-on-slate-editor"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          readOnly
        />
      </Slate>
    </div>
  );
}; 