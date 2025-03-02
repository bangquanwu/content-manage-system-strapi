import { Middleware, Reducer } from '@reduxjs/toolkit';
import { RBACState } from '../../components/RBACProvider';
import { AppState } from '../../reducer';
/**
 * @description This is the main store configuration function, injected Reducers use our legacy app.addReducer API,
 * which we're trying to phase out. App Middlewares could potentially be improved...?
 */
declare const configureStoreImpl: (appMiddlewares?: Array<() => Middleware>, injectedReducers?: Record<string, Reducer>) => import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    readonly admin_app: AppState;
    readonly rbacProvider: RBACState;
    readonly 'content-manager_app': import("../../content-manager/pages/App").ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("../../content-manager/hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("../../content-manager/pages/EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("../../content-manager/sharedReducers/crud/reducer").CrudState;
}, import("redux").AnyAction, import("@reduxjs/toolkit").ThunkMiddleware<{
    readonly admin_app: AppState;
    readonly rbacProvider: RBACState;
    readonly 'content-manager_app': import("../../content-manager/pages/App").ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("../../content-manager/hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("../../content-manager/pages/EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("../../content-manager/sharedReducers/crud/reducer").CrudState;
}, import("redux").AnyAction>[]>;
type Store = ReturnType<typeof configureStoreImpl> & {
    asyncReducers: Record<string, Reducer>;
    injectReducer: (key: string, asyncReducer: Reducer) => void;
};
type RootState = ReturnType<Store['getState']>;
export { configureStoreImpl as configureStore };
export type { RootState, AppState, RBACState, Store };
