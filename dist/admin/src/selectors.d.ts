/**
 * @deprecated
 *
 * Use `useTypedSelector` and access the state directly, this was only used so we knew
 * we were using the correct path. Which is state.admin_app.permissions
 */
export declare const selectAdminPermissions: ((state: {
    readonly admin_app: import("./reducer").AppState;
    readonly rbacProvider: import("./components/RBACProvider").RBACState;
    readonly 'content-manager_app': import("./content-manager/pages/App").ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("./content-manager/hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("./content-manager/pages/EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("./content-manager/sharedReducers/crud/reducer").CrudState;
}) => Partial<import("./types/permissions").PermissionMap>) & import("reselect").OutputSelectorFields<(args_0: {
    readonly admin_app: import("./reducer").AppState;
    readonly rbacProvider: import("./components/RBACProvider").RBACState;
    readonly 'content-manager_app': import("./content-manager/pages/App").ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("./content-manager/hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("./content-manager/pages/EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("./content-manager/sharedReducers/crud/reducer").CrudState;
}) => Partial<import("./types/permissions").PermissionMap>, {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
