import * as React from 'react';
import { TrackingEvent } from '@strapi/helper-plugin';
import { EntityData } from '../sharedReducers/crud/reducer';
import type { Contracts } from '@strapi/plugin-content-manager/_internal/shared';
interface RenderChildProps {
    componentsDataStructure: Record<string, any>;
    contentTypeDataStructure: Record<string, any>;
    data: EntityData | null;
    isCreatingEntry: boolean;
    isLoadingForData: boolean;
    onDelete: (trackerProperty: Extract<TrackingEvent, {
        name: 'willDeleteEntry' | 'didDeleteEntry' | 'didNotDeleteEntry';
    }>['properties']) => Promise<Contracts.SingleTypes.Delete.Response>;
    onPost: (body: Contracts.SingleTypes.CreateOrUpdate.Request['body'], trackerProperty: Extract<TrackingEvent, {
        name: 'didCreateEntry' | 'didNotCreateEntry';
    }>['properties']) => Promise<Contracts.SingleTypes.CreateOrUpdate.Response>;
    onDraftRelationCheck: () => Promise<Contracts.SingleTypes.CountDraftRelations.Response['data']>;
    onPublish: () => Promise<Contracts.SingleTypes.Publish.Response>;
    onPut: (body: Contracts.SingleTypes.CreateOrUpdate.Request['body'], trackerProperty: Extract<TrackingEvent, {
        name: 'willEditEntry' | 'didEditEntry' | 'didNotEditEntry';
    }>['properties']) => Promise<Contracts.SingleTypes.CreateOrUpdate.Response>;
    onUnpublish: () => Promise<void>;
    redirectionLink: string;
    status: string;
}
interface SingleTypeFormWrapperProps {
    slug: string;
    children: (props: RenderChildProps) => React.JSX.Element;
}
declare const SingleTypeFormWrapper: ({ children, slug }: SingleTypeFormWrapperProps) => React.JSX.Element;
export { SingleTypeFormWrapper };
export type { RenderChildProps };
