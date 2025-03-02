import type { Attribute } from '..';
export type JSON = Attribute.OfType<'json'> & Attribute.ConfigurableOption & Attribute.RequiredOption & Attribute.PrivateOption & Attribute.WritableOption & Attribute.VisibleOption & Attribute.DefaultOption<JsonValue>;
type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONArray = Array<JSONValue>;
export interface JSONObject {
    [key: string]: JSONValue;
}
export type JsonValue<T extends JSONValue = JSONValue> = T;
export type GetJsonValue<T extends Attribute.Attribute> = T extends JSON ? JsonValue : never;
export {};
//# sourceMappingURL=json.d.ts.map