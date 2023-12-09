import * as React from 'react';
import type { RenderChildProps } from './SingleTypeFormWrapper';
import type { Entity } from '@strapi/types';
interface CollectionTypeFormWrapperProps {
    children: (props: RenderChildProps) => React.JSX.Element;
    slug: string;
    id?: Entity.ID;
    origin?: string;
}
declare const CollectionTypeFormWrapper: ({ children, slug, id, origin, }: CollectionTypeFormWrapperProps) => React.JSX.Element;
export { CollectionTypeFormWrapper };
