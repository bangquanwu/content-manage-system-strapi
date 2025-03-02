import { Selector } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import type { RootState, Store } from './configure';
type AppDispatch = Store['dispatch'];
declare const useTypedDispatch: () => AppDispatch;
declare const useTypedStore: () => Store;
declare const useTypedSelector: TypedUseSelectorHook<RootState>;
declare const createTypedSelector: <TResult>(selector: (state: {
    readonly admin_app: import("../../reducer").AppState;
    readonly rbacProvider: import("../../components/RBACProvider").RBACState;
    readonly 'content-manager_app': import("../../content-manager/pages/App").ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("../../content-manager/hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("../../content-manager/pages/EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("../../content-manager/sharedReducers/crud/reducer").CrudState;
}, ...params: any[]) => TResult) => ((state: {
    readonly admin_app: import("../../reducer").AppState;
    readonly rbacProvider: import("../../components/RBACProvider").RBACState;
    readonly 'content-manager_app': import("../../content-manager/pages/App").ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("../../content-manager/hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("../../content-manager/pages/EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("../../content-manager/sharedReducers/crud/reducer").CrudState;
}) => TResult) & import("reselect").OutputSelectorFields<(args_0: {
    readonly admin_app: import("../../reducer").AppState;
    readonly rbacProvider: import("../../components/RBACProvider").RBACState;
    readonly 'content-manager_app': import("../../content-manager/pages/App").ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("../../content-manager/hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("../../content-manager/pages/EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("../../content-manager/sharedReducers/crud/reducer").CrudState;
}) => TResult, {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export { useTypedDispatch, useTypedStore, useTypedSelector, createTypedSelector };
