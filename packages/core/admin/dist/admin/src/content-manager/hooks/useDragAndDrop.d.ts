import * as React from 'react';
import { ConnectDragPreview, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { UseKeyboardDragAndDropCallbacks } from './useKeyboardDragAndDrop';
import type { Entity } from '@strapi/types';
import type { Identifier } from 'dnd-core';
export interface UseDragAndDropOptions<TItem extends {
    index: Entity.ID;
} = {
    index: Entity.ID;
}> extends UseKeyboardDragAndDropCallbacks {
    type?: string;
    index: number;
    item?: TItem;
    onStart?: () => void;
    onEnd?: () => void;
    dropSensitivity?: 'regular' | 'immediate';
}
export type UseDragAndDropReturn = [
    props: {
        handlerId: Identifier | null;
        isDragging: boolean;
        handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    },
    objectRef: React.RefObject<HTMLElement>,
    dragRef: ConnectDropTarget,
    dropRef: ConnectDragSource,
    dragPreviewRef: ConnectDragPreview
];
/**
 * A utility hook abstracting the general drag and drop hooks from react-dnd.
 * Centralising the same behaviours and by default offering keyboard support.
 */
export declare const useDragAndDrop: <TItem extends {
    [key: string]: any;
    index: number;
    id?: Entity.ID | undefined;
}>(active: boolean, { type, index, item, onStart, onEnd, onGrabItem, onDropItem, onCancel, onMoveItem, dropSensitivity, }: UseDragAndDropOptions<TItem>) => UseDragAndDropReturn;
