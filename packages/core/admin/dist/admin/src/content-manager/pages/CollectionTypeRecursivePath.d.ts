import { RouteComponentProps } from 'react-router-dom';
interface CollectionTypeRecursivePathProps extends RouteComponentProps<{
    slug: string;
}> {
}
declare const CollectionTypeRecursivePath: ({ match: { params: { slug }, url, }, }: CollectionTypeRecursivePathProps) => import("react/jsx-runtime").JSX.Element;
export { CollectionTypeRecursivePath };
