import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
export type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
    fontFamily?: string;
    color?: string;
};
export type CustomElement = {
    type: 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three' | 'block-quote' | 'bulleted-list' | 'numbered-list' | 'list-item';
    children: (CustomElement | CustomText)[];
    textAlign?: 'center' | 'right' | 'justify';
};
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
