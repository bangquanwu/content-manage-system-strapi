import { ProtectedEditViewPageProps } from './EditView/EditViewPage';
import type { FormattedLayouts } from '../utils/layouts';
interface EditViewLayoutManagerProps extends ProtectedEditViewPageProps {
    layout: FormattedLayouts;
}
declare const EditViewLayoutManager: ({ layout, ...rest }: EditViewLayoutManagerProps) => import("react/jsx-runtime").JSX.Element;
declare const RESET_PROPS = "ContentManager/EditViewLayoutManager/RESET_PROPS";
interface ResetPropsAction {
    type: typeof RESET_PROPS;
}
declare const SET_LAYOUT = "ContentManager/EditViewLayoutManager/SET_LAYOUT";
interface SetLayoutAction {
    type: typeof SET_LAYOUT;
    layout: EditViewLayoutManagerProps['layout'];
    query: object;
}
interface EditViewState {
    currentLayout: {
        components: EditViewLayoutManagerProps['layout']['components'];
        contentType: EditViewLayoutManagerProps['layout']['contentType'] | null;
    };
}
type Action = ResetPropsAction | SetLayoutAction;
declare const reducer: (state: EditViewState | undefined, action: Action) => EditViewState;
export { EditViewLayoutManager, reducer };
export type { EditViewLayoutManagerProps, EditViewState };
