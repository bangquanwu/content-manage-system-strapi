import * as React from 'react';
import { type Attribute } from '@strapi/types';
import { MessageDescriptor } from 'react-intl';
import { type Editor } from 'slate';
import { type RenderElementProps } from 'slate-react';
import { type ModifiersStore } from './Modifiers';
interface BaseBlock {
    renderElement: (props: RenderElementProps) => React.JSX.Element;
    matchNode: (node: Attribute.BlocksNode) => boolean;
    handleConvert?: (editor: Editor) => void | (() => React.JSX.Element);
    handleEnterKey?: (editor: Editor) => void;
    handleBackspaceKey?: (editor: Editor, event: React.KeyboardEvent<HTMLElement>) => void;
    snippets?: string[];
}
interface NonSelectorBlock extends BaseBlock {
    isInBlocksSelector: false;
}
interface SelectorBlock extends BaseBlock {
    isInBlocksSelector: true;
    icon: React.ComponentType;
    label: MessageDescriptor;
}
type NonSelectorBlockKey = 'list-item' | 'link';
declare const selectorBlockKeys: readonly ["paragraph", "heading-one", "heading-two", "heading-three", "heading-four", "heading-five", "heading-six", "list-ordered", "list-unordered", "image", "quote", "code"];
type SelectorBlockKey = (typeof selectorBlockKeys)[number];
declare const isSelectorBlockKey: (key: unknown) => key is "code" | "image" | "quote" | "paragraph" | "heading-one" | "heading-two" | "heading-three" | "heading-four" | "heading-five" | "heading-six" | "list-ordered" | "list-unordered";
type BlocksStore = {
    [K in SelectorBlockKey]: SelectorBlock;
} & {
    [K in NonSelectorBlockKey]: NonSelectorBlock;
};
interface BlocksEditorContextValue {
    blocks: BlocksStore;
    modifiers: ModifiersStore;
    disabled: boolean;
}
declare const BlocksEditorProvider: {
    (props: BlocksEditorContextValue & {
        children: React.ReactNode;
    }): JSX.Element;
    displayName: string;
};
declare function useBlocksEditorContext(consumerName: string): BlocksEditorContextValue & {
    editor: Editor;
};
interface BlocksEditorProps {
    name: string;
    onChange: (event: {
        target: {
            name: string;
            value: Attribute.BlocksValue;
            type: 'blocks';
        };
    }) => void;
    disabled?: boolean;
    value?: Attribute.BlocksValue;
    placeholder?: MessageDescriptor;
    error?: string;
}
declare const BlocksEditor: React.ForwardRefExoticComponent<BlocksEditorProps & React.RefAttributes<{
    focus: () => void;
}>>;
export { type BlocksStore, type SelectorBlockKey, BlocksEditor, BlocksEditorProvider, useBlocksEditorContext, isSelectorBlockKey, };
