import type { ContentManagerLink } from '../hooks/useContentManagerInitData';
import type { Contracts } from '@strapi/plugin-content-manager/_internal/shared';
declare const App: () => import("react/jsx-runtime").JSX.Element;
declare const GET_INIT_DATA = "ContentManager/App/GET_INIT_DATA";
declare const RESET_INIT_DATA = "ContentManager/App/RESET_INIT_DATA";
declare const SET_INIT_DATA = "ContentManager/App/SET_INIT_DATA";
interface GetInitDataAction {
    type: typeof GET_INIT_DATA;
}
interface ResetInitDataAction {
    type: typeof RESET_INIT_DATA;
}
interface SetInitDataAction {
    type: typeof SET_INIT_DATA;
    data: {
        authorizedCollectionTypeLinks: ContentManagerAppState['collectionTypeLinks'];
        authorizedSingleTypeLinks: ContentManagerAppState['singleTypeLinks'];
        components: ContentManagerAppState['components'];
        contentTypeSchemas: ContentManagerAppState['models'];
        fieldSizes: ContentManagerAppState['fieldSizes'];
    };
}
type Action = GetInitDataAction | ResetInitDataAction | SetInitDataAction;
interface ContentManagerAppState {
    collectionTypeLinks: ContentManagerLink[];
    components: Contracts.Init.GetInitData.Response['data']['components'];
    fieldSizes: Contracts.Init.GetInitData.Response['data']['fieldSizes'];
    models: Contracts.Init.GetInitData.Response['data']['contentTypes'];
    singleTypeLinks: ContentManagerLink[];
    status: 'loading' | 'resolved' | 'error';
}
declare const selectSchemas: ((state: {
    readonly admin_app: import("../../reducer").AppState;
    readonly rbacProvider: import("../../components/RBACProvider").RBACState;
    readonly 'content-manager_app': ContentManagerAppState;
    readonly 'content-manager_listView': unknown;
    readonly 'content-manager_rbacManager': import("../hooks/useSyncRbac").SyncRbacState;
    readonly 'content-manager_editViewLayoutManager': import("./EditViewLayoutManager").EditViewState;
    readonly 'content-manager_editViewCrudReducer': import("../sharedReducers/crud/reducer").CrudState;
}) => (Contracts.Components.Component | Contracts.ContentTypes.ContentType)[]) & import("reselect").OutputSelectorFields<(args_0: ContentManagerAppState) => (Contracts.Components.Component | Contracts.ContentTypes.ContentType)[], {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
declare const reducer: (state: ContentManagerAppState | undefined, action: Action) => ContentManagerAppState;
export { App, reducer, selectSchemas };
export type { ContentManagerAppState };
