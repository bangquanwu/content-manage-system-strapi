import { Schema, Attribute } from '@strapi/types';
import { Entity } from '../../../shared/contracts/shared';
interface Schemas<TSchema extends Schema.ContentType> {
    contentType: TSchema;
    components: Record<string, Schema.Component>;
}
declare const cleanData: <TSchema extends Schema.ContentType, TData extends { [K in keyof TSchema["attributes"]]: import("@strapi/types/dist/types/utils/expression").If<import("@strapi/types/dist/types/utils/expression").IsTrue<import("@strapi/types/dist/types/utils/expression").IsTrue<import("@strapi/types/dist/types/utils/expression").Extends<Attribute.GetBigIntegerValue<TSchema["attributes"][K]> | Attribute.GetBooleanValue<TSchema["attributes"][K]> | Attribute.GetBlocksValue<TSchema["attributes"][K]> | Attribute.GetComponentValue<TSchema["attributes"][K]> | Attribute.GetDecimalValue<TSchema["attributes"][K]> | Attribute.GetDynamicZoneValue<TSchema["attributes"][K]> | Attribute.GetEnumerationValue<TSchema["attributes"][K]> | Attribute.GetEmailValue<TSchema["attributes"][K]> | Attribute.GetFloatValue<TSchema["attributes"][K]> | Attribute.GetIntegerValue<TSchema["attributes"][K]> | Attribute.GetJsonValue<TSchema["attributes"][K]> | Attribute.GetMediaValue<TSchema["attributes"][K]> | Attribute.GetPasswordValue<TSchema["attributes"][K]> | Attribute.GetRelationValue<TSchema["attributes"][K]> | Attribute.GetRichTextValue<TSchema["attributes"][K]> | Attribute.GetStringValue<TSchema["attributes"][K]> | Attribute.GetTextValue<TSchema["attributes"][K]> | Attribute.GetUIDValue<TSchema["attributes"][K]> | Attribute.GetDateValue<TSchema["attributes"][K]> | Attribute.GetDateTimeValue<TSchema["attributes"][K]> | Attribute.GetTimeValue<TSchema["attributes"][K]> | Attribute.GetTimestampValue<TSchema["attributes"][K]>, never>> | import("@strapi/types/dist/types/utils/expression").IsTrue<import("@strapi/types/dist/types/utils/expression").Extends<never, Attribute.GetBigIntegerValue<TSchema["attributes"][K]> | Attribute.GetBooleanValue<TSchema["attributes"][K]> | Attribute.GetBlocksValue<TSchema["attributes"][K]> | Attribute.GetComponentValue<TSchema["attributes"][K]> | Attribute.GetDecimalValue<TSchema["attributes"][K]> | Attribute.GetDynamicZoneValue<TSchema["attributes"][K]> | Attribute.GetEnumerationValue<TSchema["attributes"][K]> | Attribute.GetEmailValue<TSchema["attributes"][K]> | Attribute.GetFloatValue<TSchema["attributes"][K]> | Attribute.GetIntegerValue<TSchema["attributes"][K]> | Attribute.GetJsonValue<TSchema["attributes"][K]> | Attribute.GetMediaValue<TSchema["attributes"][K]> | Attribute.GetPasswordValue<TSchema["attributes"][K]> | Attribute.GetRelationValue<TSchema["attributes"][K]> | Attribute.GetRichTextValue<TSchema["attributes"][K]> | Attribute.GetStringValue<TSchema["attributes"][K]> | Attribute.GetTextValue<TSchema["attributes"][K]> | Attribute.GetUIDValue<TSchema["attributes"][K]> | Attribute.GetDateValue<TSchema["attributes"][K]> | Attribute.GetDateTimeValue<TSchema["attributes"][K]> | Attribute.GetTimeValue<TSchema["attributes"][K]> | Attribute.GetTimestampValue<TSchema["attributes"][K]>>>>, unknown, Attribute.GetBigIntegerValue<TSchema["attributes"][K]> | Attribute.GetBooleanValue<TSchema["attributes"][K]> | Attribute.GetBlocksValue<TSchema["attributes"][K]> | Attribute.GetComponentValue<TSchema["attributes"][K]> | Attribute.GetDecimalValue<TSchema["attributes"][K]> | Attribute.GetDynamicZoneValue<TSchema["attributes"][K]> | Attribute.GetEnumerationValue<TSchema["attributes"][K]> | Attribute.GetEmailValue<TSchema["attributes"][K]> | Attribute.GetFloatValue<TSchema["attributes"][K]> | Attribute.GetIntegerValue<TSchema["attributes"][K]> | Attribute.GetJsonValue<TSchema["attributes"][K]> | Attribute.GetMediaValue<TSchema["attributes"][K]> | Attribute.GetPasswordValue<TSchema["attributes"][K]> | Attribute.GetRelationValue<TSchema["attributes"][K]> | Attribute.GetRichTextValue<TSchema["attributes"][K]> | Attribute.GetStringValue<TSchema["attributes"][K]> | Attribute.GetTextValue<TSchema["attributes"][K]> | Attribute.GetUIDValue<TSchema["attributes"][K]> | Attribute.GetDateValue<TSchema["attributes"][K]> | Attribute.GetDateTimeValue<TSchema["attributes"][K]> | Attribute.GetTimeValue<TSchema["attributes"][K]> | Attribute.GetTimestampValue<TSchema["attributes"][K]>>; }>(data: TData, { contentType, components }: Schemas<TSchema>, initialLocalizations: Localization[]) => TData & {
    localizations: Localization[];
};
interface ContentData extends Entity {
    localizations: Localization[];
    [key: string]: Attribute.GetValue<Attribute.Any>;
}
interface Localization extends Pick<ContentData, 'id'> {
    locale: string;
    publishedAt: string | null;
}
declare const getLocalizationsFromData: (entity: unknown) => Localization[];
export { cleanData, getLocalizationsFromData };
export type { Localization };
