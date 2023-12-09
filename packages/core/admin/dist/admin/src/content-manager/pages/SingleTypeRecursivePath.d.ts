import { RouteComponentProps } from 'react-router-dom';
interface SingleTypeRecursivePathProps extends RouteComponentProps<{
    slug: string;
}> {
}
declare const SingleTypeRecursivePath: ({ match: { params: { slug }, url, }, }: SingleTypeRecursivePathProps) => import("react/jsx-runtime").JSX.Element;
export { SingleTypeRecursivePath };
