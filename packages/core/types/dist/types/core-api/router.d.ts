import type { ExtendableContext, Middleware as KoaMiddleware } from 'koa';
import type { Strapi } from '../..';
import type { Common, Utils } from '..';
export type MiddlewareFactory = (config: any, ctx: {
    strapi: Strapi;
}) => Middleware | null;
export type Middleware = KoaMiddleware | MiddlewareFactory;
export interface PolicyContext extends ExtendableContext {
    type: string;
}
export type PolicyImplementation<TCfg = unknown> = (ctx: PolicyContext, cfg: TCfg, { strapi }: {
    strapi: Strapi;
}) => boolean | undefined;
type HandlerConfig = {
    auth?: false | {
        scope: string[];
    };
    policies?: Array<string | PolicyImplementation | {
        name: string;
        config: object;
    }>;
    middlewares?: Array<string | Middleware | {
        name: string;
        config: object;
    }>;
};
export type Generic = {
    [method: string | number | symbol]: HandlerConfig | undefined;
};
export interface SingleTypeRouterConfig extends Generic {
    find?: HandlerConfig;
    update?: HandlerConfig;
    delete?: HandlerConfig;
}
export interface CollectionTypeRouterConfig extends Generic {
    find?: HandlerConfig;
    findOne?: HandlerConfig;
    create?: HandlerConfig;
    update?: HandlerConfig;
    delete?: HandlerConfig;
}
export type RouterConfig<TContentTypeUID extends Common.UID.ContentType> = {
    prefix?: string;
    only?: string[];
    except?: string[];
    config?: Utils.Expression.MatchFirst<[
        Utils.Expression.Test<Common.UID.IsCollectionType<TContentTypeUID>, CollectionTypeRouterConfig>,
        Utils.Expression.Test<Common.UID.IsSingleType<TContentTypeUID>, SingleTypeRouterConfig>
    ], Generic>;
    type?: RouterType;
};
export type RouterType = 'admin' | 'content-api';
export type Route = {
    method: string;
    path: string;
};
export type Router = {
    type: RouterType;
    prefix?: string;
    routes: Route[] | (() => Route[]);
};
export {};
//# sourceMappingURL=router.d.ts.map