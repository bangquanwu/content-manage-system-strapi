import type { LoadedStrapi as Strapi, Common, EntityService } from '@strapi/types';
type Entity = EntityService.Result<Common.UID.ContentType>;
type Body = EntityService.Params.Data.Input<Common.UID.ContentType>;
/**
 * @type {import('./entity-manager').default}
 */
declare const _default: ({ strapi }: {
    strapi: Strapi;
}) => {
    /**
     * Extend this function from other plugins to add custom mapping of entity
     * responses
     * @param {Object} entity
     * @returns
     */
    mapEntity<T = unknown>(entity: T): T;
    /**
     * Some entity manager functions may return multiple entities or one entity.
     * This function maps the response in both cases
     * @param {Array|Object|null} entities
     * @param {string} uid
     */
    mapEntitiesResponse(entities: any, uid: Common.UID.ContentType): Promise<any>;
    find(opts: ({
        sort?: EntityService.Params.Sort.Any<Common.UID.ContentType> | undefined;
    } & {
        fields?: EntityService.Params.Fields.Any<Common.UID.ContentType> | undefined;
    } & {
        filters?: EntityService.Params.Filters.Any<Common.UID.ContentType> | undefined;
    } & {
        populate?: EntityService.Params.Populate.Any<Common.UID.ContentType> | undefined;
    } & EntityService.Params.Pagination.OffsetNotation & {
        publicationState?: EntityService.Params.PublicationState.Kind | undefined;
    } & {
        _q?: string | undefined;
    }) | undefined, uid: Common.UID.ContentType): Promise<any>;
    findPage(opts: ({
        sort?: EntityService.Params.Sort.Any<Common.UID.ContentType> | undefined;
    } & {
        fields?: EntityService.Params.Fields.Any<Common.UID.ContentType> | undefined;
    } & {
        filters?: EntityService.Params.Filters.Any<Common.UID.ContentType> | undefined;
    } & {
        populate?: EntityService.Params.Populate.Any<Common.UID.ContentType> | undefined;
    } & ((import("@strapi/types/dist/types/utils").Without<EntityService.Params.Pagination.PageNotation, EntityService.Params.Pagination.OffsetNotation> & EntityService.Params.Pagination.OffsetNotation) | (import("@strapi/types/dist/types/utils").Without<EntityService.Params.Pagination.OffsetNotation, EntityService.Params.Pagination.PageNotation> & EntityService.Params.Pagination.PageNotation)) & {
        publicationState?: EntityService.Params.PublicationState.Kind | undefined;
    } & {
        _q?: string | undefined;
    }) | undefined, uid: Common.UID.ContentType): Promise<any>;
    findOne(id: Entity['id'], uid: Common.UID.ContentType, opts?: {}): Promise<import("@strapi/types/dist/types/core/attributes").GetValues<Common.UID.ContentType, string>>;
    create(body: Body, uid: Common.UID.ContentType): Promise<{}>;
    update(entity: Entity, body: Partial<Body>, uid: Common.UID.ContentType): Promise<{}>;
    clone(entity: Entity, body: Partial<Body>, uid: Common.UID.ContentType): Promise<{} | null>;
    delete(entity: Entity, uid: Common.UID.ContentType): Promise<{} | null>;
    deleteMany(opts: {
        filters?: EntityService.Params.Filters.Any<Common.UID.ContentType> | undefined;
    } & {
        _q?: string | undefined;
    }, uid: Common.UID.ContentType): Promise<{
        count: number;
    }>;
    publish(entity: Entity, uid: Common.UID.ContentType, body?: {}): Promise<{} | null>;
    publishMany(entities: Entity[], uid: Common.UID.ContentType): Promise<{
        count: number;
    } | null>;
    unpublishMany(entities: Entity[], uid: Common.UID.ContentType): Promise<{
        count: number;
    } | null>;
    unpublish(entity: Entity, uid: Common.UID.ContentType, body?: {}): Promise<{} | null>;
    countDraftRelations(id: Entity['id'], uid: Common.UID.ContentType): Promise<number>;
    countManyEntriesDraftRelations(ids: number[], uid: Common.UID.ContentType, locale?: string): Promise<number>;
};
export default _default;
//# sourceMappingURL=entity-manager.d.ts.map