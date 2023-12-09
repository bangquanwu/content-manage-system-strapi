import { ContentApiPermission } from '../../../../../../../shared/contracts/content-api/permissions';
import { ApiTokenPermissionsContextValue } from '../../../../../contexts/apiTokenPermissions';
type InitialState = Pick<ApiTokenPermissionsContextValue['value'], 'data' | 'routes' | 'selectedAction' | 'selectedActions'>;
interface ActionOnChange {
    type: 'ON_CHANGE';
    value: string;
}
interface ActionSelectAllInPermission {
    type: 'SELECT_ALL_IN_PERMISSION';
    value: {
        action: string;
        actionId: string;
    }[];
}
interface ActionSelectAllActions {
    type: 'SELECT_ALL_ACTIONS';
}
interface ActionOnChangeReadOnly {
    type: 'ON_CHANGE_READ_ONLY';
}
interface ActionUpdatePermissionsLayout {
    type: 'UPDATE_PERMISSIONS_LAYOUT';
    value: ContentApiPermission;
}
interface ActionUpdateRoutes {
    type: 'UPDATE_ROUTES';
    value: ApiTokenPermissionsContextValue['value']['routes'] | undefined;
}
interface ActionUpdatePermissions {
    type: 'UPDATE_PERMISSIONS';
    value: any[];
}
interface ActionSetSelectedAction {
    type: 'SET_SELECTED_ACTION';
    value: string;
}
type Action = ActionOnChange | ActionSelectAllInPermission | ActionSelectAllActions | ActionOnChangeReadOnly | ActionUpdatePermissionsLayout | ActionUpdateRoutes | ActionUpdatePermissions | ActionSetSelectedAction;
export declare const initialState: InitialState;
export declare const reducer: (state: typeof initialState, action: Action) => InitialState;
export {};
