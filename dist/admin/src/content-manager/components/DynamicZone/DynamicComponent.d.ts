import type { ComponentPickerProps } from './ComponentPicker';
interface DynamicComponentProps extends Pick<ComponentPickerProps, 'dynamicComponentsByCategory'> {
    componentUid: string;
    formErrors?: Record<string, unknown>;
    index?: number;
    isFieldAllowed?: boolean;
    name: string;
    onAddComponent?: (componentUid: string, index: number) => void;
    onRemoveComponentClick: () => void;
    onMoveComponent: (dragIndex: number, hoverIndex: number) => void;
    onGrabItem?: (index: number) => void;
    onDropItem?: (index: number) => void;
    onCancel?: (index: number) => void;
}
declare const DynamicComponent: ({ componentUid, formErrors, index, isFieldAllowed, name, onRemoveComponentClick, onMoveComponent, onGrabItem, onDropItem, onCancel, dynamicComponentsByCategory, onAddComponent, }: DynamicComponentProps) => import("react/jsx-runtime").JSX.Element;
export { DynamicComponent };
export type { DynamicComponentProps };
