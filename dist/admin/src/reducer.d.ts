import { ACTION_SET_APP_RUNTIME_STATUS, ACTION_SET_ADMIN_PERMISSIONS } from './constants';
import { PermissionMap } from './types/permissions';
interface AppState {
    status: 'init' | 'runtime';
    permissions: Partial<PermissionMap>;
}
declare const initialState: {
    permissions: {};
    status: "init";
};
interface SetAppRuntimeStatusAction {
    type: typeof ACTION_SET_APP_RUNTIME_STATUS;
}
interface SetAdminPermissionsAction {
    type: typeof ACTION_SET_ADMIN_PERMISSIONS;
    payload: Record<string, unknown>;
}
type Action = SetAppRuntimeStatusAction | SetAdminPermissionsAction;
declare const reducer: (state: AppState | undefined, action: Action) => AppState;
export { reducer, initialState };
export type { AppState, Action, SetAppRuntimeStatusAction, SetAdminPermissionsAction };
