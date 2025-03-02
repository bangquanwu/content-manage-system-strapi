import type { Attribute } from '..';
interface TextInlineNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}
interface BaseNode {
    type: string;
    children: unknown[];
}
interface LinkInlineNode extends BaseNode {
    type: 'link';
    url: string;
    children: TextInlineNode[];
}
interface ListItemInlineNode extends BaseNode {
    type: 'list-item';
    children: DefaultInlineNode[];
}
type InlineNode = TextInlineNode | LinkInlineNode | ListItemInlineNode;
type DefaultInlineNode = Exclude<InlineNode, ListItemInlineNode>;
type NonTextInlineNode = Exclude<InlineNode, TextInlineNode>;
interface ParagraphBlockNode extends BaseNode {
    type: 'paragraph';
    children: DefaultInlineNode[];
}
interface QuoteBlockNode extends BaseNode {
    type: 'quote';
    children: DefaultInlineNode[];
}
interface CodeBlockNode extends BaseNode {
    type: 'code';
    children: DefaultInlineNode[];
}
interface HeadingBlockNode extends BaseNode {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: DefaultInlineNode[];
}
interface ListBlockNode extends BaseNode {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemInlineNode | ListBlockNode)[];
}
interface ImageBlockNode extends BaseNode {
    type: 'image';
    image: Attribute.GetValue<{
        type: 'media';
        allowedTypes: ['images'];
        multiple: false;
    }>;
    children: [{
        type: 'text';
        text: '';
    }];
}
type RootNode = ParagraphBlockNode | QuoteBlockNode | CodeBlockNode | HeadingBlockNode | ListBlockNode | ImageBlockNode;
export type Blocks = Attribute.OfType<'blocks'> & Attribute.ConfigurableOption & Attribute.PrivateOption & Attribute.RequiredOption & Attribute.WritableOption & Attribute.VisibleOption;
export type BlocksValue = RootNode[];
export type GetBlocksValue<T extends Attribute.Attribute> = T extends Blocks ? BlocksValue : never;
export type BlocksNode = RootNode | NonTextInlineNode;
export type BlocksInlineNode = NonTextInlineNode;
export type BlocksTextNode = TextInlineNode;
export {};
//# sourceMappingURL=blocks.d.ts.map