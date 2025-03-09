import React from 'react';
import { Descendant } from 'slate';
export interface EditorProps {
    value?: Descendant[];
    onChange?: (value: Descendant[]) => void;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Editor: React.FC<EditorProps>;
