import { Permission, AllowedActions } from '@strapi/helper-plugin';
import { Entity } from '@strapi/types';
import { RouteComponentProps } from 'react-router-dom';
interface EditViewPageProps {
    allowedActions: AllowedActions;
    goBack: RouteComponentProps['history']['goBack'];
    id?: Entity.ID;
    isSingleType?: boolean;
    origin?: string;
    slug: string;
    userPermissions?: Permission[];
}
declare const EditViewPage: ({ allowedActions, isSingleType, goBack, slug, id, origin, userPermissions, }: EditViewPageProps) => import("react/jsx-runtime").JSX.Element | null;
interface ProtectedEditViewPageProps extends Omit<EditViewPageProps, 'allowedActions'> {
}
declare const ProtectedEditViewPage: ({ slug, userPermissions, ...restProps }: ProtectedEditViewPageProps) => import("react/jsx-runtime").JSX.Element;
export { EditViewPage, ProtectedEditViewPage };
export type { EditViewPageProps, ProtectedEditViewPageProps };
