import * as React from 'react';
export interface UseKeyboardDragAndDropCallbacks {
    onCancel?: (index: number) => void;
    onDropItem?: (index: number) => void;
    onGrabItem?: (index: number) => void;
    onMoveItem: (toIndex: number, fromIndex: number) => void;
}
/**
 * Utility hook designed to implement keyboard accessibile drag and drop by
 * returning an onKeyDown handler to be passed to the drag icon button.
 *
 * @internal - You should use `useDragAndDrop` instead.
 */
export declare const useKeyboardDragAndDrop: (active: boolean, index: number, { onCancel, onDropItem, onGrabItem, onMoveItem }: UseKeyboardDragAndDropCallbacks) => React.KeyboardEventHandler<HTMLButtonElement>;
