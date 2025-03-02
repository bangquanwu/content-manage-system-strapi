import { AxiosError } from 'axios';
import { UseQueryOptions } from 'react-query';
import * as Users from '../../../shared/contracts/user';
export type APIUsersQueryParams = Users.FindOne.Params | (Users.FindAll.Request['query'] & {
    id?: never;
});
export declare function useAdminUsers(params?: APIUsersQueryParams, queryOptions?: Omit<UseQueryOptions<Users.FindAll.Response['data'] | Users.FindOne.Response['data'], AxiosError<Required<Pick<Users.FindAll.Response | Users.FindOne.Response, 'error'>>>>, 'queryKey' | 'queryFn'>): {
    users: import("../../../shared/contracts/shared").SanitizedAdminUser[];
    pagination: import("../../../shared/contracts/shared").Pagination | null;
    isLoading: boolean;
    isError: boolean;
    refetch: <TPageData>(options?: (import("react-query").RefetchOptions & import("react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("react-query").QueryObserverResult<import("../../../shared/contracts/shared").SanitizedAdminUser | {
        results: import("../../../shared/contracts/shared").SanitizedAdminUser[];
        pagination: import("../../../shared/contracts/shared").Pagination;
    }, AxiosError<Required<Pick<Users.FindAll.Response | Users.FindOne.Response, "error">>, any>>>;
};
