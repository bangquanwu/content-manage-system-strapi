import * as React from 'react';
import { ConfigurationContextValue } from '../contexts/configuration';
interface ConfigurationProviderProps extends Required<Logos> {
    children: React.ReactNode;
    showReleaseNotification?: boolean;
    showTutorials?: boolean;
}
interface Logos {
    menuLogo: ConfigurationContextValue['logos']['menu'];
    authLogo: ConfigurationContextValue['logos']['auth'];
}
declare const ConfigurationProvider: ({ children, authLogo: defaultAuthLogo, menuLogo: defaultMenuLogo, showReleaseNotification, showTutorials, }: ConfigurationProviderProps) => import("react/jsx-runtime").JSX.Element;
export { ConfigurationProvider };
export type { ConfigurationProviderProps };
