import * as React from 'react';
import { CustomFieldsProviderProps, LibraryProviderProps, StrapiAppProviderProps } from '@strapi/helper-plugin';
import { AdminContextValue } from '../contexts/admin';
import { LanguageProviderProps } from './LanguageProvider';
import { ThemeToggleProviderProps } from './ThemeToggleProvider';
import type { Store } from '../core/store/configure';
interface ProvidersProps extends Pick<ThemeToggleProviderProps, 'themes'>, Pick<LanguageProviderProps, 'messages' | 'localeNames'>, Pick<AdminContextValue, 'getAdminInjectedComponents'>, Pick<CustomFieldsProviderProps, 'customFields'>, Pick<LibraryProviderProps, 'components' | 'fields'>, Pick<StrapiAppProviderProps, 'getPlugin' | 'menu' | 'plugins' | 'runHookParallel' | 'runHookSeries' | 'runHookWaterfall' | 'settings'> {
    children: React.ReactNode;
    store: Store;
}
declare const Providers: ({ children, components, customFields, fields, getAdminInjectedComponents, getPlugin, localeNames, menu, messages, plugins, runHookParallel, runHookSeries, runHookWaterfall, settings, store, themes, }: ProvidersProps) => import("react/jsx-runtime").JSX.Element;
export { Providers };
