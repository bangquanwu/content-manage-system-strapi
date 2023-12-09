/// <reference types="react" />
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import { UpdateProjectSettings } from '../../../shared/contracts/admin';
export interface UpdateProjectSettingsBody {
    authLogo: ((UpdateProjectSettings.Request['body']['authLogo'] | ConfigurationLogo['custom']) & {
        rawFile?: File;
    }) | null;
    menuLogo: ((UpdateProjectSettings.Request['body']['menuLogo'] | ConfigurationLogo['custom']) & {
        rawFile?: File;
    }) | null;
}
interface ConfigurationLogo {
    custom?: {
        name?: string;
        url?: string;
    };
    default: string;
}
export interface ConfigurationContextValue {
    logos: {
        auth: ConfigurationLogo;
        menu: ConfigurationLogo;
    };
    showTutorials: boolean;
    showReleaseNotification: boolean;
    updateProjectSettings: UseMutateFunction<{
        menuLogo: boolean;
        authLogo: boolean;
    }, AxiosError<Required<UpdateProjectSettings.Response>>, UpdateProjectSettingsBody>;
}
declare const ConfigurationContextProvider: {
    (props: ConfigurationContextValue & {
        children: import("react").ReactNode;
    }): JSX.Element;
    displayName: string;
};
declare const useConfiguration: () => ConfigurationContextValue;
export { ConfigurationContextProvider, useConfiguration };
