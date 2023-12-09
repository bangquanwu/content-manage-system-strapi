import type { StrapiAppSettingLink } from '@strapi/helper-plugin';
import type { Store } from '@strapi/strapi/admin';
import type { Schema } from '@strapi/types';
export interface AddLocaleToCTLinksArgs {
    ctLinks: Array<StrapiAppSettingLink & {
        search?: string;
    }>;
    models: Schema.ContentType[];
}
export interface AddLocaleToSTLinksArgs {
    stLinks: Array<StrapiAppSettingLink & {
        search?: string;
    }>;
    models: Schema.ContentType[];
}
export type AddLocalToLinksHookArgs<TType extends 'collectionType' | 'singleType'> = TType extends 'collectionType' ? AddLocaleToCTLinksArgs : AddLocaleToSTLinksArgs;
declare const addLocaleToLinksHook: <TType extends "collectionType" | "singleType">(type: TType) => (args: AddLocalToLinksHookArgs<TType>, store: Store) => AddLocaleToCTLinksArgs | AddLocaleToSTLinksArgs;
export { addLocaleToLinksHook };
