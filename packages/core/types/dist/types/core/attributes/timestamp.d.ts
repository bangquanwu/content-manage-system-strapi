import type { Attribute } from '..';
export type Timestamp = Attribute.OfType<'timestamp'> & Attribute.ConfigurableOption & Attribute.DefaultOption<TimestampValue> & Attribute.PrivateOption & Attribute.RequiredOption & Attribute.UniqueOption & Attribute.WritableOption & Attribute.VisibleOption;
export type TimestampValue = globalThis.Date | number | string;
export type GetTimestampValue<T extends Attribute.Attribute> = T extends Timestamp ? TimestampValue : never;
//# sourceMappingURL=timestamp.d.ts.map