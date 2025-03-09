import React from 'react';
import { Descendant } from 'slate';
export interface ReadOnlyEditorProps {
    value: Descendant[];
    noBorder?: boolean;
    noShadow?: boolean;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    backgroundColor?: string;
    padding?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ReadOnlyEditor: React.FC<ReadOnlyEditorProps>;
