declare const _default: () => {
    bootstrap: () => Promise<void>;
    controllers: {
        'collection-types': {
            find(ctx: any): Promise<any>;
            findOne(ctx: any): Promise<any>;
            create(ctx: any): Promise<any>;
            update(ctx: any): Promise<any>;
            clone(ctx: any): Promise<any>;
            autoClone(ctx: any): Promise<void>;
            delete(ctx: any): Promise<any>;
            publish(ctx: any): Promise<any>;
            bulkPublish(ctx: any): Promise<any>;
            bulkUnpublish(ctx: any): Promise<any>;
            unpublish(ctx: any): Promise<any>;
            bulkDelete(ctx: any): Promise<any>;
            countDraftRelations(ctx: any): Promise<any>;
            countManyEntriesDraftRelations(ctx: any): Promise<any>;
        };
        components: {
            findComponents(ctx: any): void;
            findComponentConfiguration(ctx: any): Promise<any>;
            updateComponentConfiguration(ctx: any): Promise<any>;
        };
        'content-types': {
            findContentTypes(ctx: any): Promise<any>;
            findContentTypesSettings(ctx: any): Promise<void>;
            findContentTypeConfiguration(ctx: any): Promise<any>;
            updateContentTypeConfiguration(ctx: any): Promise<any>;
        };
        init: {
            getInitData(ctx: any): void;
        };
        relations: {
            findAvailable(ctx: any): Promise<any>;
            findExisting(ctx: any): Promise<any>;
        };
        'single-types': {
            find(ctx: any): Promise<any>;
            createOrUpdate(ctx: any): Promise<any>;
            delete(ctx: any): Promise<any>;
            publish(ctx: any): Promise<any>;
            unpublish(ctx: any): Promise<any>;
            countDraftRelations(ctx: any): Promise<any>;
        };
        uid: {
            generateUID(ctx: any): Promise<void>;
            checkUIDAvailability(ctx: any): Promise<void>;
        };
    };
    routes: {
        admin: {
            type: string;
            routes: ({
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: string[];
                    middlewares?: undefined;
                };
            } | {
                method: string;
                path: string;
                handler: string;
                config: {
                    middlewares: ((ctx: import("koa").Context, next: import("koa").Next) => Promise<any>)[];
                    policies: (string | {
                        name: string;
                        config: {
                            actions: string[];
                        };
                    })[];
                };
            } | {
                method: string;
                path: string;
                handler: string;
                config: {
                    middlewares: ((ctx: import("koa").Context, next: import("koa").Next) => Promise<any>)[];
                    policies: (string | {
                        name: string;
                        config: {
                            actions: string[];
                            hasAtLeastOne: boolean;
                        };
                    })[];
                };
            })[];
        };
    };
    policies: {
        'has-draft-and-publish': (ctx: import("koa").Context, config: any, { strapi }: {
            strapi: import("@strapi/types").Strapi;
        }) => boolean;
        hasPermissions: {
            name: string;
            validator: (config: unknown) => void;
            handler: (...args: any[]) => any;
        };
    };
    services: {
        components: ({ strapi }: {
            strapi: import("@strapi/types").Strapi;
        }) => {
            findAllComponents(): unknown[];
            findComponent(uid: `${string}.${string}`): any;
            findConfiguration(component: import("@strapi/types/dist/types/core/schemas").Component): Promise<{
                uid: string;
                settings: import("../../shared/contracts/content-types").Settings;
                metadatas: import("../../shared/contracts/content-types").Metadatas;
                layouts: import("../../shared/contracts/content-types").Layouts;
                category: string;
            }>;
            updateConfiguration(component: import("@strapi/types/dist/types/core/schemas").Component, newConfiguration: import("./services/configuration").ConfigurationUpdate): Promise<{
                uid: string;
                settings: import("../../shared/contracts/content-types").Settings;
                metadatas: import("../../shared/contracts/content-types").Metadatas;
                layouts: import("../../shared/contracts/content-types").Layouts;
                category: string;
            }>;
            findComponentsConfigurations(model: import("@strapi/types/dist/types/core/schemas").Component): Promise<Record<string, import("../../shared/contracts/content-types").Configuration & {
                category: string;
                isComponent: boolean;
            }>>;
            syncConfigurations(): Promise<void>;
        };
        'content-types': ({ strapi }: {
            strapi: Required<import("@strapi/types").Strapi>;
        }) => {
            findAllContentTypes(): unknown[];
            findContentType(uid: `admin::${string}` | `strapi::${string}` | `api::${string}.${string}` | `plugin::${string}.${string}`): any;
            findDisplayedContentTypes(): unknown[];
            findContentTypesByKind(kind: {
                kind: import("@strapi/types/dist/types/core/schemas").ContentTypeKind | undefined;
            }): unknown[];
            findConfiguration(contentType: import("@strapi/types/dist/types/core/schemas").ContentType): Promise<any>;
            updateConfiguration(contentType: import("@strapi/types/dist/types/core/schemas").ContentType, newConfiguration: import("./services/configuration").ConfigurationUpdate): Promise<any>;
            findComponentsConfigurations(contentType: import("@strapi/types/dist/types/core/schemas").ContentType): any;
            syncConfigurations(): Promise<void>;
        };
        'data-mapper': () => {
            toContentManagerModel(contentType: any): any;
            toDto: import("lodash/fp").LodashPick2x1;
        };
        'entity-manager': ({ strapi }: {
            strapi: Required<import("@strapi/types").Strapi>;
        }) => {
            mapEntity<T = unknown>(entity: T): T;
            mapEntitiesResponse(entities: any, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<any>;
            find(opts: ({
                sort?: import("@strapi/types/dist/modules/entity-service/params/sort").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & {
                fields?: import("@strapi/types/dist/modules/entity-service/params/fields").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & {
                filters?: import("@strapi/types/dist/modules/entity-service/params/filters").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & {
                populate?: import("@strapi/types/dist/modules/entity-service/params/populate").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & import("@strapi/types/dist/modules/entity-service/params/pagination").OffsetNotation & {
                publicationState?: import("@strapi/types/dist/modules/entity-service/params/publication-state").Kind | undefined;
            } & {
                _q?: string | undefined;
            }) | undefined, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<any>;
            findPage(opts: ({
                sort?: import("@strapi/types/dist/modules/entity-service/params/sort").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & {
                fields?: import("@strapi/types/dist/modules/entity-service/params/fields").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & {
                filters?: import("@strapi/types/dist/modules/entity-service/params/filters").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & {
                populate?: import("@strapi/types/dist/modules/entity-service/params/populate").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & ((import("@strapi/types/dist/types/utils").Without<import("@strapi/types/dist/modules/entity-service/params/pagination").PageNotation, import("@strapi/types/dist/modules/entity-service/params/pagination").OffsetNotation> & import("@strapi/types/dist/modules/entity-service/params/pagination").OffsetNotation) | (import("@strapi/types/dist/types/utils").Without<import("@strapi/types/dist/modules/entity-service/params/pagination").OffsetNotation, import("@strapi/types/dist/modules/entity-service/params/pagination").PageNotation> & import("@strapi/types/dist/modules/entity-service/params/pagination").PageNotation)) & {
                publicationState?: import("@strapi/types/dist/modules/entity-service/params/publication-state").Kind | undefined;
            } & {
                _q?: string | undefined;
            }) | undefined, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<any>;
            findOne(id: import("@strapi/types/dist/types/core/entity").ID, uid: import("@strapi/types/dist/types/core/common/uid").ContentType, opts?: {}): Promise<import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>>;
            create(body: {
                id?: import("@strapi/types/dist/types/core/entity").ID | undefined;
            } & import("@strapi/types/dist/modules/entity-service/params/attributes").OmitRelationWithoutTarget<import("@strapi/types/dist/types/core/common/uid").ContentType, {
                [x: string]: any;
            } & {}>, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<{}>;
            update(entity: import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>, body: Partial<{
                id?: import("@strapi/types/dist/types/core/entity").ID | undefined;
            } & import("@strapi/types/dist/modules/entity-service/params/attributes").OmitRelationWithoutTarget<import("@strapi/types/dist/types/core/common/uid").ContentType, {
                [x: string]: any;
            } & {}>>, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<{}>;
            clone(entity: import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>, body: Partial<{
                id?: import("@strapi/types/dist/types/core/entity").ID | undefined;
            } & import("@strapi/types/dist/modules/entity-service/params/attributes").OmitRelationWithoutTarget<import("@strapi/types/dist/types/core/common/uid").ContentType, {
                [x: string]: any;
            } & {}>>, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<{} | null>;
            delete(entity: import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<{} | null>;
            deleteMany(opts: {
                filters?: import("@strapi/types/dist/modules/entity-service/params/filters").Any<import("@strapi/types/dist/types/core/common/uid").ContentType> | undefined;
            } & {
                _q?: string | undefined;
            }, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<{
                count: number;
            }>;
            publish(entity: import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>, uid: import("@strapi/types/dist/types/core/common/uid").ContentType, body?: {}): Promise<{} | null>;
            publishMany(entities: import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>[], uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<{
                count: number;
            } | null>;
            unpublishMany(entities: import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>[], uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<{
                count: number;
            } | null>;
            unpublish(entity: import("@strapi/types/dist/types/core/attributes").GetValues<import("@strapi/types/dist/types/core/common/uid").ContentType, string>, uid: import("@strapi/types/dist/types/core/common/uid").ContentType, body?: {}): Promise<{} | null>;
            countDraftRelations(id: import("@strapi/types/dist/types/core/entity").ID, uid: import("@strapi/types/dist/types/core/common/uid").ContentType): Promise<number>;
            countManyEntriesDraftRelations(ids: number[], uid: import("@strapi/types/dist/types/core/common/uid").ContentType, locale?: string): Promise<number>;
        };
        'field-sizes': ({ strapi }: {
            strapi: Required<import("@strapi/types").Strapi>;
        }) => {
            getAllFieldSizes(): Record<string, {
                default: 4 | 8 | 6 | 12;
                isResizable: boolean;
            } | undefined>;
            hasFieldSize(type: string): boolean;
            getFieldSize(type?: string | undefined): {
                default: 4 | 8 | 6 | 12;
                isResizable: boolean;
            };
            setFieldSize(type: string, size: {
                default: 4 | 8 | 6 | 12;
                isResizable: boolean;
            } | undefined): void;
            setCustomFieldInputSizes(): void;
        };
        metrics: ({ strapi }: any) => {
            sendDidConfigureListView: (contentType: any, configuration: any) => Promise<void>;
        };
        'permission-checker': ({ strapi }: any) => {
            create: ({ userAbility, model }: any) => {
                can: (action: any, entity: any, field: any) => any;
                cannot: (action: any, entity: any, field: any) => any;
                sanitizeOutput: (data: any, { action }?: {
                    action?: any;
                }) => any;
                sanitizeQuery: (query: any, { action }?: {
                    action?: any;
                }) => any;
                sanitizeCreateInput: (data: any) => any;
                sanitizeUpdateInput: (entity: any) => (data: any) => any;
                validateQuery: (query: any, { action }?: {
                    action?: any;
                }) => any;
                validateInput: (action: any, data: any, entity: any) => any;
                sanitizedQuery: (query: any, action: any) => Promise<any>;
            };
        };
        permission: ({ strapi }: any) => {
            canConfigureContentType({ userAbility, contentType }: any): any;
            registerPermissions(): Promise<void>;
        };
        'populate-builder': () => (uid: import("@strapi/types/dist/types/core/common/uid").Schema) => {
            populateFromQuery(query: object): any;
            countRelationsIf(condition: boolean, { toMany, toOne }?: {
                toMany: boolean;
                toOne: boolean;
            }): any;
            countRelations({ toMany, toOne }?: {
                toMany: boolean;
                toOne: boolean;
            }): any;
            populateDeep(level?: number): any;
            build(): Promise<{} | undefined>;
        };
        uid: ({ strapi }: any) => {
            generateUIDField({ contentTypeUID, field, data }: any): Promise<any>;
            findUniqueUID({ contentTypeUID, field, value }: any): Promise<any>;
            checkUIDAvailability({ contentTypeUID, field, value }: any): Promise<boolean>;
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map