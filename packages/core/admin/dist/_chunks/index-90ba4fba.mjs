import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useTracking, useFetchClient, useNotification, useAPIErrorHandler, prefixFileUrlWithBackendUrl, auth, useCallbackRef, translatedErrors, useQuery as useQuery$1, Form, usePersistentState, useGuidedTour, getYupInnerErrors, useFocusWhenNavigate, pxToRem, LoadingIndicatorPage, useAppInfo, TrackingProvider, GuidedTourProvider as GuidedTourProvider$1, StrapiAppProvider, LibraryProvider, CustomFieldsProvider, AutoReloadOverlayBlockerProvider, OverlayBlockerProvider, NotificationsProvider, RBACContext, useFocusInputField, useCMEditViewDataManager, NotAllowedInput, useFilter, useCollator, useRBACProvider, useStrapiApp, hasPermissions, CheckPermissions, LinkButton as LinkButton$2, Link as Link$3, useCustomFields, ConfirmDialog, useQueryParams, formatContentTypeData, useLibrary, useLockScroll, GenericInput as GenericInput$1, useOverlayBlocker, getAPIInnerErrors, ContentManagerEditViewDataManagerContext, findMatchingPermissions, useRBAC, FilterPopoverURLQuery, FilterListURLQuery, useTableContext, Table, getFileExtension, SearchURLQuery, PageSizeURLQuery, PaginationURLQuery, NoPermissions as NoPermissions$1, difference, AnErrorOccurred, CheckPagePermissions, getFetchClient } from "@strapi/helper-plugin";
import { createRoot } from "react-dom/client";
import { Box, Flex, SingleSelect, SingleSelectOption, FieldAction, TextInput, Main, Typography, Checkbox, Button, Field, Grid as Grid$1, GridItem, HeaderLayout, ContentLayout, EmptyStateLayout, LinkButton as LinkButton$1, Select, Option as Option$1, TextButton, SkipToContent, DesignSystemProvider, IconButton, Link as Link$2, Combobox, VisuallyHidden, ComboboxOption, Icon, Tooltip, Status, useNotifyAT, ToggleInput, ModalLayout, ModalHeader, ModalBody, ModalFooter, Divider, BaseButton, Accordion, AccordionToggle, AccordionContent as AccordionContent$1, KeyboardNavigable, BaseLink, Popover, FieldLabel, FieldInput, InputWrapper, Portal, FocusTrap, IconButtonGroup, Dialog, DialogBody, DialogFooter, Layout, BaseCheckbox, Tr, Td, Loader as Loader$1, Avatar, AvatarGroup, Badge, ActionLayout, lightTheme, darkTheme } from "@strapi/design-system";
import invariant from "invariant";
import isFunction from "lodash/isFunction";
import merge from "lodash/merge";
import pick$1 from "lodash/pick";
import { Helmet } from "react-helmet";
import { useLocation, Route, Redirect, useHistory, NavLink, useRouteMatch, Switch, Link as Link$4, Prompt, useParams, BrowserRouter } from "react-router-dom";
import * as React from "react";
import React__default, { useEffect, useRef, useState, useMemo, useCallback, useReducer, memo } from "react";
import { useIntl, IntlProvider } from "react-intl";
import { useDispatch, Provider, useSelector, useStore } from "react-redux";
import { useQuery, useMutation, QueryClient, QueryClientProvider, useInfiniteQuery, useQueryClient } from "react-query";
import { createContext } from "@radix-ui/react-context";
import { Link as Link$1, SubNav, SubNavHeader, SubNavSections, SubNavSection, SubNavLink, Menu, MenuItem, LinkButton as LinkButton$3 } from "@strapi/design-system/v2";
import * as Icons from "@strapi/icons";
import { Eye, EyeStriked, ArrowRight, EmptyPictures, Drag, Pencil, Cross, CarretDown, Trash, Refresh, Cog, Plus, Number as Number$1, Boolean as Boolean$1, Date as Date$1, Email, Enumeration, Media as Media$1, Relation, Text, Json, Uid, Component as Component$1, DynamicZone as DynamicZone$1, ArrowLeft, Check, PlusCircle, Code, HeadingOne, HeadingTwo, HeadingThree, HeadingFour, HeadingFive, HeadingSix, Picture, NumberList, BulletList, Paragraph, Quote, Link as Link$5, Bold, Italic, Underline, StrikeThrough, CheckCircle, ExclamationMarkCircle, Loader, Collapse, Expand, More, Dot, Layer, Filter as Filter$1, Duplicate, CrossCircle, EmptyDocuments } from "@strapi/icons";
import { Formik } from "formik";
import camelCase from "lodash/camelCase";
import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import * as yup from "yup";
import { ValidationError } from "yup";
import defaultsDeep from "lodash/defaultsDeep";
import omit from "lodash/omit";
import { parse, stringify } from "qs";
import produce from "immer";
import get from "lodash/get";
import set from "lodash/set";
import { createSelector, bindActionCreators, configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDragLayer, useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { FixedSizeList } from "react-window";
import { ErrorBoundary } from "react-error-boundary";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import upperFirst from "lodash/upperFirst";
import PropTypes, { PropTypes as PropTypes$1 } from "prop-types";
import axios, { AxiosError, isAxiosError } from "axios";
import size from "lodash/size";
import isNaN$1 from "lodash/isNaN";
import take from "lodash/take";
import { Transforms, Editor as Editor$1, Node, Element, Range, Path, Point, createEditor } from "slate";
import { withHistory } from "slate-history";
import { useFocused, useSelected, ReactEditor, Editable, useSlate, Slate, withReact } from "slate-react";
import * as Toolbar from "@radix-ui/react-toolbar";
import CodeMirror from "codemirror5";
import sanitizeHtml from "sanitize-html";
import { getLanguage, highlight, highlightAuto } from "highlight.js";
import Markdown from "markdown-it";
import abbr from "markdown-it-abbr";
import container from "markdown-it-container";
import deflist from "markdown-it-deflist";
import emoji from "markdown-it-emoji";
import footnote from "markdown-it-footnote";
import ins from "markdown-it-ins";
import mark from "markdown-it-mark";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import "codemirror5/addon/display/placeholder";
import toString from "lodash/toString";
import isEmpty from "lodash/isEmpty";
import { flushSync } from "react-dom";
import isBoolean from "lodash/isBoolean";
import toNumber from "lodash/toNumber";
import { generateNKeysBetween } from "fractional-indexing";
import uniqBy from "lodash/uniqBy";
import unset from "lodash/unset";
import isArray from "lodash/isArray";
import parseISO from "date-fns/parseISO";
import isNumber from "lodash/isNumber";
const styles = `
.strapi--root {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #fff;
}

.strapi--no-js {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: helvetica, arial, sans-serif;
}
`;
const NoJavascript = () => {
  return /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("div", { className: "strapi--root", children: /* @__PURE__ */ jsxs("div", { className: "strapi--no-js", children: [
    /* @__PURE__ */ jsx("style", { type: "text/css", children: styles }),
    /* @__PURE__ */ jsx("h1", { children: "JavaScript disabled" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Please ",
      /* @__PURE__ */ jsx("a", { href: "https://www.enable-javascript.com/", children: "enable JavaScript" }),
      " in your browser and reload the page to proceed."
    ] })
  ] }) }) });
};
const globalStyles = `
  html,
  body,
  #strapi {
    height: 100%;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }
`;
const DefaultDocument = () => {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex" }),
      /* @__PURE__ */ jsx("meta", { name: "referrer", content: "same-origin" }),
      /* @__PURE__ */ jsx("title", { children: "Content Manage Admin" }),
      /* @__PURE__ */ jsx("style", { children: globalStyles })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("div", { id: "strapi" }),
      /* @__PURE__ */ jsx(NoJavascript, {})
    ] })
  ] });
};
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const [ConfigurationContextProvider, useConfigurationContext] = createContext("ConfigurationContext");
const useConfiguration = () => useConfigurationContext("useConfiguration");
const ConfigurationProvider = ({
  children,
  authLogo: defaultAuthLogo,
  menuLogo: defaultMenuLogo,
  showReleaseNotification = false,
  showTutorials = false
}) => {
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { get: get2, post } = useFetchClient();
  const toggleNotification = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const { data, refetch, isSuccess } = useQuery(
    ["project-settings"],
    async () => {
      const { data: data2, status } = await get2("/admin/project-settings", {
        /**
         * needed because the interceptors of the fetchClient redirect to
         * /login when receive a 401 and it would end up in an infinite
         * loop when the user doesn't have a session.
         */
        validateStatus: (status2) => status2 < 500
      });
      if (status === 401) {
        throw new Error("Unauthenticated");
      }
      return data2;
    },
    {
      retry: false,
      select(data2) {
        return {
          authLogo: data2.authLogo ? {
            name: data2.authLogo.name,
            url: prefixFileUrlWithBackendUrl(data2.authLogo.url)
          } : void 0,
          menuLogo: data2.menuLogo ? {
            name: data2.menuLogo.name,
            url: prefixFileUrlWithBackendUrl(data2.menuLogo.url)
          } : void 0
        };
      }
    }
  );
  const { mutate } = useMutation(
    async (body) => {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        if (value?.rawFile) {
          formData.append(key, value.rawFile);
        } else if (value === null) {
          formData.append(key, JSON.stringify(value));
        }
      });
      const { data: data2 } = await post(
        "/admin/project-settings",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return {
        menuLogo: !!data2.menuLogo && !!body.menuLogo?.rawFile,
        authLogo: !!data2.authLogo && !!body.menuLogo?.rawFile
      };
    },
    {
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      },
      async onSuccess(data2) {
        const { menuLogo, authLogo } = data2;
        if (menuLogo) {
          trackUsage("didChangeLogo", {
            logo: "menu"
          });
        }
        if (authLogo) {
          trackUsage("didChangeLogo", {
            logo: "auth"
          });
        }
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "app", defaultMessage: "Saved" })
        });
        refetch();
      }
    }
  );
  const updateProjectSettings = React.useCallback(mutate, [mutate]);
  return /* @__PURE__ */ jsx(
    ConfigurationContextProvider,
    {
      showReleaseNotification,
      showTutorials,
      logos: {
        menu: {
          custom: isSuccess ? data?.menuLogo : defaultMenuLogo.custom,
          default: defaultMenuLogo.default
        },
        auth: {
          custom: isSuccess ? data?.authLogo : defaultAuthLogo.custom,
          default: defaultAuthLogo.default
        }
      },
      updateProjectSettings,
      children
    }
  );
};
const PrivateRoute = ({
  component: Component2,
  path,
  ...rest
}) => {
  const { pathname, search } = useLocation();
  return /* @__PURE__ */ jsx(
    Route,
    {
      path,
      render: (props) => auth.getToken() !== null ? /* @__PURE__ */ jsx(Component2, { ...rest, ...props }) : /* @__PURE__ */ jsx(
        Redirect,
        {
          to: {
            pathname: "/auth/login",
            search: pathname !== "/" ? `?redirectTo=${encodeURIComponent(`${pathname}${search}`)}` : void 0
          }
        }
      )
    }
  );
};
const ADMIN_PERMISSIONS_CE = {
  contentManager: {
    main: [],
    collectionTypesConfigurations: [
      {
        action: "plugin::content-manager.collection-types.configure-view",
        subject: null
      }
    ],
    componentsConfigurations: [
      {
        action: "plugin::content-manager.components.configure-layout",
        subject: null
      }
    ],
    singleTypesConfigurations: [
      {
        action: "plugin::content-manager.single-types.configure-view",
        subject: null
      }
    ]
  },
  marketplace: {
    main: [{ action: "admin::marketplace.read", subject: null }],
    read: [{ action: "admin::marketplace.read", subject: null }]
  },
  settings: {
    main: [{ action: "admin::settings.read", subject: null }],
    roles: {
      main: [
        { action: "admin::roles.create", subject: null },
        { action: "admin::roles.update", subject: null },
        { action: "admin::roles.read", subject: null },
        { action: "admin::roles.delete", subject: null }
      ],
      create: [{ action: "admin::roles.create", subject: null }],
      delete: [{ action: "admin::roles.delete", subject: null }],
      read: [{ action: "admin::roles.read", subject: null }],
      update: [{ action: "admin::roles.update", subject: null }]
    },
    users: {
      main: [
        { action: "admin::users.create", subject: null },
        { action: "admin::users.read", subject: null },
        { action: "admin::users.update", subject: null },
        { action: "admin::users.delete", subject: null }
      ],
      create: [{ action: "admin::users.create", subject: null }],
      delete: [{ action: "admin::users.delete", subject: null }],
      read: [{ action: "admin::users.read", subject: null }],
      update: [{ action: "admin::users.update", subject: null }]
    },
    webhooks: {
      main: [
        { action: "admin::webhooks.create", subject: null },
        { action: "admin::webhooks.read", subject: null },
        { action: "admin::webhooks.update", subject: null },
        { action: "admin::webhooks.delete", subject: null }
      ],
      create: [{ action: "admin::webhooks.create", subject: null }],
      delete: [{ action: "admin::webhooks.delete", subject: null }],
      read: [
        { action: "admin::webhooks.read", subject: null },
        // NOTE: We need to check with the API
        { action: "admin::webhooks.update", subject: null },
        { action: "admin::webhooks.delete", subject: null }
      ],
      update: [{ action: "admin::webhooks.update", subject: null }]
    },
    "api-tokens": {
      main: [{ action: "admin::api-tokens.access", subject: null }],
      create: [{ action: "admin::api-tokens.create", subject: null }],
      delete: [{ action: "admin::api-tokens.delete", subject: null }],
      read: [{ action: "admin::api-tokens.read", subject: null }],
      update: [{ action: "admin::api-tokens.update", subject: null }],
      regenerate: [{ action: "admin::api-tokens.regenerate", subject: null }]
    },
    "transfer-tokens": {
      main: [{ action: "admin::transfer.tokens.access", subject: null }],
      create: [{ action: "admin::transfer.tokens.create", subject: null }],
      delete: [{ action: "admin::transfer.tokens.delete", subject: null }],
      read: [{ action: "admin::transfer.tokens.read", subject: null }],
      update: [{ action: "admin::transfer.tokens.update", subject: null }],
      regenerate: [{ action: "admin::transfer.tokens.regenerate", subject: null }]
    },
    "project-settings": {
      read: [{ action: "admin::project-settings.read", subject: null }],
      update: [{ action: "admin::project-settings.update", subject: null }]
    }
  }
};
const HOOKS = {
  /**
   * Hook that allows to mutate the displayed headers of the list view table
   * @constant
   * @type {string}
   */
  INJECT_COLUMN_IN_TABLE: "Admin/CM/pages/ListView/inject-column-in-table",
  /**
   * Hook that allows to mutate the CM's collection types links pre-set filters
   * @constant
   * @type {string}
   */
  MUTATE_COLLECTION_TYPES_LINKS: "Admin/CM/pages/App/mutate-collection-types-links",
  /**
   * Hook that allows to mutate the CM's edit view layout
   * @constant
   * @type {string}
   */
  MUTATE_EDIT_VIEW_LAYOUT: "Admin/CM/pages/EditView/mutate-edit-view-layout",
  /**
   * Hook that allows to mutate the CM's single types links pre-set filters
   * @constant
   * @type {string}
   */
  MUTATE_SINGLE_TYPES_LINKS: "Admin/CM/pages/App/mutate-single-types-links"
};
const ACTION_SET_APP_RUNTIME_STATUS = "StrapiAdmin/APP/SET_APP_RUNTIME_STATUS";
const ACTION_SET_ADMIN_PERMISSIONS = "StrapiAdmin/App/SET_ADMIN_PERMISSIONS";
const SETTINGS_LINKS_CE = () => ({
  global: [
    {
      intlLabel: { id: "Settings.application.title", defaultMessage: "Overview" },
      to: "/settings/application-infos",
      id: "000-application-infos"
    },
    {
      intlLabel: { id: "Settings.webhooks.title", defaultMessage: "Webhooks" },
      to: "/settings/webhooks",
      id: "webhooks"
    },
    {
      intlLabel: { id: "Settings.apiTokens.title", defaultMessage: "API Tokens" },
      to: "/settings/api-tokens?sort=name:ASC",
      id: "api-tokens"
    },
    {
      intlLabel: { id: "Settings.transferTokens.title", defaultMessage: "Transfer Tokens" },
      to: "/settings/transfer-tokens?sort=name:ASC",
      id: "transfer-tokens"
    },
    // If the Enterprise feature is not enabled and if the config doesn't disable it, we promote the Enterprise feature by displaying them in the settings menu.
    // Disable this by adding "promoteEE: false" to your `./config/admin.js` file
    ...!window.strapi.features.isEnabled(window.strapi.features.SSO) && window.strapi?.flags?.promoteEE ? [
      {
        intlLabel: { id: "Settings.sso.title", defaultMessage: "Single Sign-On" },
        to: "/settings/purchase-single-sign-on",
        id: "sso",
        lockIcon: true
      }
    ] : [],
    ...!window.strapi.features.isEnabled(window.strapi.features.REVIEW_WORKFLOWS) && window.strapi?.flags?.promoteEE ? [
      {
        intlLabel: {
          id: "Settings.review-workflows.page.title",
          defaultMessage: "Review Workflows"
        },
        to: "/settings/purchase-review-workflows",
        id: "review-workflows",
        lockIcon: true
      }
    ] : []
  ],
  admin: [
    {
      intlLabel: { id: "global.roles", defaultMessage: "Roles" },
      to: "/settings/roles",
      id: "roles"
    },
    {
      intlLabel: { id: "global.users", defaultMessage: "Users" },
      // Init the search params directly
      to: "/settings/users?pageSize=10&page=1&sort=firstname",
      id: "users"
    },
    ...!window.strapi.features.isEnabled(window.strapi.features.AUDIT_LOGS) && window.strapi?.flags?.promoteEE ? [
      {
        intlLabel: { id: "global.auditLogs", defaultMessage: "Audit Logs" },
        to: "/settings/purchase-audit-logs",
        id: "auditLogs",
        lockIcon: true
      }
    ] : []
  ]
});
function isEnterprise() {
  return window.strapi.isEE;
}
const useEnterprise = (ceData, eeCallback, opts = {}) => {
  const { defaultValue = null, combine = (_ceData, eeData) => eeData, enabled = true } = opts;
  const eeCallbackRef = useCallbackRef(eeCallback);
  const combineCallbackRef = useCallbackRef(combine);
  const [{ data }, setData] = React.useState({
    data: isEnterprise() && enabled ? defaultValue : ceData
  });
  React.useEffect(() => {
    async function importEE() {
      const eeData = await eeCallbackRef();
      const combinedValue = combineCallbackRef(ceData, eeData);
      setData({ data: combinedValue ? combinedValue : eeData });
    }
    if (isEnterprise() && enabled) {
      importEE();
    }
  }, [ceData, eeCallbackRef, combineCallbackRef, enabled]);
  return data;
};
const [LocalesContextProvider, useLocalesContext] = createContext("LocalesContext");
const useLocales = () => useLocalesContext("useLocales");
const LANGUAGE_LOCAL_STORAGE_KEY = "strapi-admin-language";
const LanguageProvider = ({ children, localeNames, messages }) => {
  const [{ locale }, dispatch] = React.useReducer(
    reducer$9,
    initialState$b,
    () => {
      const languageFromLocaleStorage = window.localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
      if (languageFromLocaleStorage && localeNames[languageFromLocaleStorage]) {
        return {
          locale: languageFromLocaleStorage,
          localeNames
        };
      } else {
        return {
          locale: "en",
          localeNames
        };
      }
    }
  );
  React.useEffect(() => {
    window.localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, locale);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);
  const changeLocale = React.useCallback((locale2) => {
    dispatch({
      type: "CHANGE_LOCALE",
      locale: locale2
    });
  }, []);
  const appMessages = defaultsDeep(messages[locale], messages.en);
  return /* @__PURE__ */ jsx(IntlProvider, { locale, defaultLocale: "en", messages: appMessages, textComponent: "span", children: /* @__PURE__ */ jsx(LocalesContextProvider, { changeLocale, localeNames, children }) });
};
const initialState$b = {
  localeNames: { en: "English" },
  locale: "en"
};
const reducer$9 = (state = initialState$b, action) => {
  switch (action.type) {
    case "CHANGE_LOCALE": {
      const { locale } = action;
      if (!state.localeNames[locale]) {
        return state;
      }
      return { ...state, locale };
    }
    default: {
      return state;
    }
  }
};
const Img = styled.img`
  height: ${72 / 16}rem;
`;
const Logo = () => {
  const {
    logos: { auth: auth2 }
  } = useConfiguration();
  return /* @__PURE__ */ jsx(Img, { src: auth2?.custom?.url ?? auth2.default, "aria-hidden": true, alt: "" });
};
const Wrapper$3 = styled(Box)`
  margin: 0 auto;
  width: 552px;
`;
const Column = styled(Flex)`
  flex-direction: column;
`;
const LocaleToggle = () => {
  const { changeLocale, localeNames } = useLocales();
  const { formatMessage, locale } = useIntl();
  return /* @__PURE__ */ jsx(
    SingleSelect,
    {
      "aria-label": formatMessage({
        id: "global.localeToggle.label",
        defaultMessage: "Select interface language"
      }),
      value: locale,
      onChange: (language) => {
        changeLocale(language);
      },
      children: Object.entries(localeNames).map(([language, name]) => /* @__PURE__ */ jsx(SingleSelectOption, { value: language, children: name }, language))
    }
  );
};
const LayoutContent = ({ children }) => /* @__PURE__ */ jsx(
  Wrapper$3,
  {
    shadow: "tableShadow",
    hasRadius: true,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 10,
    paddingRight: 10,
    background: "neutral0",
    children
  }
);
const UnauthenticatedLayout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Flex, { as: "header", justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingRight: 8, children: /* @__PURE__ */ jsx(LocaleToggle, {}) }) }),
    /* @__PURE__ */ jsx(Box, { paddingTop: 2, paddingBottom: 11, children })
  ] });
};
const FieldActionWrapper$1 = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
const LOGIN_SCHEMA = yup.object().shape({
  email: yup.string().email(translatedErrors.email).required(translatedErrors.required),
  password: yup.string().required(translatedErrors.required),
  rememberMe: yup.bool().nullable()
});
const Login = ({ children }) => {
  const [apiError, setApiError] = React.useState();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const { formatMessage } = useIntl();
  const { post } = useFetchClient();
  const { changeLocale } = useLocales();
  const query = useQuery$1();
  const { push } = useHistory();
  const mutation = useMutation(
    async (body) => {
      const {
        data: { data }
      } = await post("/admin/login", body);
      return { ...data, rememberMe: body.rememberMe };
    },
    {
      onSuccess(data) {
        if (data) {
          const { token, user } = data;
          if (user.preferedLanguage) {
            changeLocale(user.preferedLanguage);
          }
          auth.setToken(token, data.rememberMe);
          auth.setUserInfo(user, data.rememberMe);
          const redirectTo = query.get("redirectTo");
          const redirectUrl = redirectTo ? decodeURIComponent(redirectTo) : "/";
          push(redirectUrl);
        }
      },
      onError(err) {
        const message = err.response?.data?.error?.message ?? "Something went wrong";
        if (camelCase(message).toLowerCase() === "usernotactive") {
          push("/auth/oops");
          return;
        }
        setApiError(message);
      }
    }
  );
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsxs(LayoutContent, { children: [
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(Logo, {}),
        /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "alpha", as: "h1", children: formatMessage({
          id: "Auth.form.welcome.title",
          defaultMessage: "Welcome!"
        }) }) }),
        /* @__PURE__ */ jsx(Box, { paddingBottom: 7, children: /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage({
          id: "Auth.form.welcome.subtitle",
          defaultMessage: "Log in to your Strapi account"
        }) }) }),
        mutation.isError && apiError ? /* @__PURE__ */ jsx(Typography, { id: "global-form-error", role: "alert", tabIndex: -1, textColor: "danger600", children: apiError }) : null
      ] }),
      /* @__PURE__ */ jsx(
        Formik,
        {
          enableReinitialize: true,
          initialValues: {
            email: "",
            password: "",
            rememberMe: false
          },
          onSubmit: (values) => {
            mutation.mutate(values);
          },
          validationSchema: LOGIN_SCHEMA,
          validateOnChange: false,
          children: ({ values, errors, handleChange }) => /* @__PURE__ */ jsx(Form, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                error: errors.email ? formatMessage({
                  id: errors.email,
                  defaultMessage: "This value is required."
                }) : "",
                value: values.email,
                onChange: handleChange,
                label: formatMessage({ id: "Auth.form.email.label", defaultMessage: "Email" }),
                placeholder: formatMessage({
                  id: "Auth.form.email.placeholder",
                  defaultMessage: "kai@doe.com"
                }),
                name: "email",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              PasswordInput$2,
              {
                error: errors.password ? formatMessage({
                  id: errors.password,
                  defaultMessage: "This value is required."
                }) : "",
                onChange: handleChange,
                value: values.password,
                label: formatMessage({
                  id: "global.password",
                  defaultMessage: "Password"
                }),
                name: "password",
                type: passwordShown ? "text" : "password",
                endAction: /* @__PURE__ */ jsx(
                  FieldActionWrapper$1,
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      setPasswordShown((prev) => !prev);
                    },
                    label: formatMessage(
                      passwordShown ? {
                        id: "Auth.form.password.show-password",
                        defaultMessage: "Show password"
                      } : {
                        id: "Auth.form.password.hide-password",
                        defaultMessage: "Hide password"
                      }
                    ),
                    children: passwordShown ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeStriked, {})
                  }
                ),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                onValueChange: (checked) => {
                  handleChange({ target: { value: checked, name: "rememberMe" } });
                },
                value: values.rememberMe,
                "aria-label": "rememberMe",
                name: "rememberMe",
                children: formatMessage({
                  id: "Auth.form.rememberMe.label",
                  defaultMessage: "Remember me"
                })
              }
            ),
            /* @__PURE__ */ jsx(Button, { fullWidth: true, type: "submit", children: formatMessage({ id: "Auth.form.button.login", defaultMessage: "Login" }) })
          ] }) })
        }
      ),
      children
    ] }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Link$1, { as: NavLink, to: "/auth/forgot-password", children: formatMessage({
      id: "Auth.link.forgot-password",
      defaultMessage: "Forgot your password?"
    }) }) }) })
  ] }) });
};
const PasswordInput$2 = styled(TextInput)`
  ::-ms-reveal {
    display: none;
  }
`;
const ForgotPassword = () => {
  const { push } = useHistory();
  const { post } = useFetchClient();
  const { formatMessage } = useIntl();
  const { mutate, isError } = useMutation(
    async (body) => {
      await post("/admin/forgot-password", body);
    },
    {
      onSuccess() {
        push("/auth/forgot-password-success");
      }
    }
  );
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsxs(LayoutContent, { children: [
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(Logo, {}),
        /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 7, children: /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", children: formatMessage({
          id: "Auth.form.button.password-recovery",
          defaultMessage: "Password Recovery"
        }) }) }),
        isError ? /* @__PURE__ */ jsx(Typography, { id: "global-form-error", role: "alert", tabIndex: -1, textColor: "danger600", children: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        }) }) : null
      ] }),
      /* @__PURE__ */ jsx(
        Formik,
        {
          enableReinitialize: true,
          initialValues: {
            email: ""
          },
          onSubmit: (values) => {
            mutate(values);
          },
          validationSchema: yup.object().shape({
            email: yup.string().email(translatedErrors.email).required(translatedErrors.required)
          }),
          validateOnChange: false,
          children: ({ values, errors, handleChange }) => /* @__PURE__ */ jsx(Form, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsx(
              TextInput,
              {
                error: errors.email ? formatMessage({
                  id: errors.email,
                  defaultMessage: "This email is invalid."
                }) : "",
                value: values.email,
                onChange: handleChange,
                label: formatMessage({ id: "Auth.form.email.label", defaultMessage: "Email" }),
                placeholder: formatMessage({
                  id: "Auth.form.email.placeholder",
                  defaultMessage: "kai@doe.com"
                }),
                name: "email",
                required: true
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, children: formatMessage({
              id: "Auth.form.button.forgot-password",
              defaultMessage: "Send Email"
            }) })
          ] }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Link$1, { as: NavLink, to: "/auth/login", children: formatMessage({ id: "Auth.link.ready", defaultMessage: "Ready to sign in?" }) }) }) })
  ] }) });
};
const ForgotPasswordSuccess = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(LayoutContent, { children: /* @__PURE__ */ jsxs(Column, { children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 7, children: /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", children: formatMessage({
        id: "app.containers.AuthPage.ForgotPasswordSuccess.title",
        defaultMessage: "Email sent"
      }) }) }),
      /* @__PURE__ */ jsx(Typography, { children: formatMessage({
        id: "app.containers.AuthPage.ForgotPasswordSuccess.text.email",
        defaultMessage: "It can take a few minutes to receive your password recovery link."
      }) }),
      /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
        id: "app.containers.AuthPage.ForgotPasswordSuccess.text.contact-admin",
        defaultMessage: "If you do not receive this link, please contact your administrator."
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Link$1, { as: NavLink, to: "/auth/login", children: formatMessage({ id: "Auth.link.signin", defaultMessage: "Sign in" }) }) }) })
  ] }) });
};
const Oops = () => {
  const { formatMessage } = useIntl();
  const query = useQuery$1();
  const message = query.get("info") || formatMessage({
    id: "Auth.components.Oops.text",
    defaultMessage: "Your account has been suspended."
  });
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(LayoutContent, { children: /* @__PURE__ */ jsxs(Column, { children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 7, children: /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", children: formatMessage({ id: "Auth.components.Oops.title", defaultMessage: "Oops..." }) }) }),
      /* @__PURE__ */ jsx(Typography, { children: message }),
      /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
        id: "Auth.components.Oops.text.admin",
        defaultMessage: "If this is a mistake, please contact your administrator."
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Link$1, { as: NavLink, to: "/auth/login", children: formatMessage({ id: "Auth.link.signin", defaultMessage: "Sign in" }) }) }) })
  ] }) });
};
styled(Field)`
  height: ${32 / 16}rem;
  width: ${32 / 16}rem;

  > label,
  ~ input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  > label {
    color: inherit;
    cursor: pointer;
    padding: ${({ theme }) => theme.spaces[2]};
    text-align: center;
    vertical-align: middle;
  }

  &:hover,
  &:focus-within {
    background-color: ${({ theme }) => theme.colors.neutral0};
  }

  &:active,
  &.selected {
    color: ${({ theme }) => theme.colors.primary700};
    background-color: ${({ theme }) => theme.colors.neutral0};
    border-color: ${({ theme }) => theme.colors.primary700};
  }
`;
[...Array(11).keys()];
function useNpsSurveySettings() {
  const [npsSurveySettings, setNpsSurveySettings] = usePersistentState(
    "STRAPI_NPS_SURVEY_SETTINGS",
    {
      enabled: true,
      lastResponseDate: null,
      firstDismissalDate: null,
      lastDismissalDate: null
    }
  );
  return { npsSurveySettings, setNpsSurveySettings };
}
const REGISTER_USER_SCHEMA = yup.object().shape({
  firstname: yup.string().trim().required(translatedErrors.required),
  lastname: yup.string().nullable(),
  password: yup.string().min(8, translatedErrors.minLength).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number").required(translatedErrors.required),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "components.Input.error.password.noMatch").required(translatedErrors.required),
  registrationToken: yup.string().required(translatedErrors.required)
});
const REGISTER_ADMIN_SCHEMA = yup.object().shape({
  firstname: yup.string().trim().required(translatedErrors.required),
  lastname: yup.string().nullable(),
  password: yup.string().min(8, translatedErrors.minLength).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number").required(translatedErrors.required),
  email: yup.string().email(translatedErrors.email).strict().lowercase(translatedErrors.lowercase).required(translatedErrors.required),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "components.Input.error.password.noMatch").required(translatedErrors.required)
});
const Register = ({ hasAdmin }) => {
  const toggleNotification = useNotification();
  const { push } = useHistory();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = React.useState(false);
  const [submitCount, setSubmitCount] = React.useState(0);
  const [apiError, setApiError] = React.useState();
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { setSkipped } = useGuidedTour();
  const query = useQuery$1();
  const match = useRouteMatch(
    "/auth/:authType"
  );
  const { formatAPIError } = useAPIErrorHandler();
  const { get: get2, post } = useFetchClient();
  const { setNpsSurveySettings } = useNpsSurveySettings();
  const registrationToken = query.get("registrationToken");
  const { data: userInfo } = useQuery({
    queryKey: ["admin", "registration-info", registrationToken],
    async queryFn() {
      const {
        data: { data }
      } = await get2(`/admin/registration-info`, {
        params: {
          registrationToken
        }
      });
      return data;
    },
    enabled: !!registrationToken,
    initialData: {},
    onError(err) {
      const message = formatAPIError(err);
      toggleNotification({
        type: "warning",
        message
      });
      push(`/auth/oops?info=${encodeURIComponent(message)}`);
    }
  });
  const registerAdminMutation = useMutation(
    async (body) => {
      const { news, ...restBody } = body;
      const { data } = await post("/admin/register-admin", restBody);
      return { ...data.data, news };
    },
    {
      onSuccess(data) {
        const { token, user, news } = data;
        auth.setToken(token, false);
        auth.setUserInfo(user, false);
        const { roles } = user;
        if (roles) {
          const isUserSuperAdmin = roles.find(({ code }) => code === "strapi-super-admin");
          if (isUserSuperAdmin) {
            auth.set(false, "GUIDED_TOUR_SKIPPED", true);
            setSkipped(false);
            trackUsage("didLaunchGuidedtour");
          }
        }
        if (news) {
          setNpsSurveySettings((s) => ({ ...s, enabled: true }));
          push({
            pathname: "/usecase",
            search: `?hasAdmin=${true}`
          });
        } else {
          push("/");
        }
      },
      onError(err) {
        trackUsage("didNotCreateFirstAdmin");
        const error = formatAPIError(err);
        setApiError(error);
      }
    }
  );
  const registerUserMutation = useMutation(
    async (body) => {
      const { news, ...restBody } = body;
      const { data } = await post("/admin/register", restBody);
      return { ...data.data, news };
    },
    {
      onSuccess(data) {
        const { token, user, news } = data;
        auth.setToken(token, false);
        auth.setUserInfo(user, false);
        if (news) {
          setNpsSurveySettings((s) => ({ ...s, enabled: true }));
          push({
            pathname: "/usecase",
            search: `?hasAdmin=${hasAdmin}`
          });
        } else {
          push("/");
        }
      },
      onError(err) {
        trackUsage("didNotCreateFirstAdmin");
        const error = formatAPIError(err);
        setApiError(error);
      }
    }
  );
  if (!match || match.params.authType !== "register" && match.params.authType !== "register-admin") {
    return /* @__PURE__ */ jsx(Redirect, { to: "/" });
  }
  const isAdminRegistration = match.params.authType === "register-admin";
  const schema = isAdminRegistration ? REGISTER_ADMIN_SCHEMA : REGISTER_USER_SCHEMA;
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(LayoutContent, { children: [
    /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "center", gap: 3, children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", textAlign: "center", children: formatMessage({
        id: "Auth.form.welcome.title",
        defaultMessage: "Welcome to Strapi!"
      }) }),
      /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", textAlign: "center", children: formatMessage({
        id: "Auth.form.register.subtitle",
        defaultMessage: "Credentials are only used to authenticate in Strapi. All saved data will be stored in your database."
      }) }),
      apiError ? /* @__PURE__ */ jsx(Typography, { id: "global-form-error", role: "alert", tabIndex: -1, textColor: "danger600", children: apiError }) : null
    ] }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        enableReinitialize: true,
        initialValues: {
          firstname: userInfo?.firstname || "",
          lastname: userInfo?.lastname || "",
          email: userInfo?.email || "",
          password: "",
          confirmPassword: "",
          registrationToken: registrationToken || void 0,
          news: false
        },
        onSubmit: async (data, formik) => {
          const normalizedData = normalizeData(data);
          try {
            await schema.validate(normalizedData, { abortEarly: false });
            if (submitCount > 0 && isAdminRegistration) {
              trackUsage("didSubmitWithErrorsFirstAdmin", { count: submitCount.toString() });
            }
            if (normalizedData.registrationToken) {
              registerUserMutation.mutate({
                userInfo: omit(normalizedData, [
                  "registrationToken",
                  "confirmPassword",
                  "email",
                  "news"
                ]),
                registrationToken: normalizedData.registrationToken,
                news: normalizedData.news
              });
            } else {
              registerAdminMutation.mutate(
                omit(normalizedData, ["registrationToken", "confirmPassword"])
              );
            }
          } catch (err) {
            if (err instanceof ValidationError) {
              const errors = getYupInnerErrors(err);
              formik.setErrors(errors);
            }
            setSubmitCount(submitCount + 1);
          }
        },
        validateOnChange: false,
        children: ({ values, errors, handleChange }) => {
          return /* @__PURE__ */ jsx(Form, { children: /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, marginTop: 7, children: [
            /* @__PURE__ */ jsxs(Grid$1, { gap: 4, children: [
              /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
                TextInput,
                {
                  name: "firstname",
                  required: true,
                  value: values.firstname,
                  error: errors.firstname ? formatMessage(errors.firstname) : void 0,
                  onChange: handleChange,
                  label: formatMessage({
                    id: "Auth.form.firstname.label",
                    defaultMessage: "Firstname"
                  })
                }
              ) }),
              /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
                TextInput,
                {
                  name: "lastname",
                  value: values.lastname,
                  onChange: handleChange,
                  label: formatMessage({
                    id: "Auth.form.lastname.label",
                    defaultMessage: "Lastname"
                  })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                name: "email",
                disabled: !isAdminRegistration,
                value: values.email,
                onChange: handleChange,
                error: errors.email ? formatMessage(errors.email) : void 0,
                required: true,
                label: formatMessage({
                  id: "Auth.form.email.label",
                  defaultMessage: "Email"
                }),
                type: "email"
              }
            ),
            /* @__PURE__ */ jsx(
              PasswordInput$1,
              {
                name: "password",
                onChange: handleChange,
                value: values.password,
                error: errors.password ? formatMessage(errors.password) : void 0,
                endAction: /* @__PURE__ */ jsx(
                  FieldActionWrapper$1,
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      setPasswordShown((prev) => !prev);
                    },
                    label: formatMessage(
                      passwordShown ? {
                        id: "Auth.form.password.show-password",
                        defaultMessage: "Show password"
                      } : {
                        id: "Auth.form.password.hide-password",
                        defaultMessage: "Hide password"
                      }
                    ),
                    children: passwordShown ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeStriked, {})
                  }
                ),
                hint: formatMessage({
                  id: "Auth.form.password.hint",
                  defaultMessage: "Must be at least 8 characters, 1 uppercase, 1 lowercase & 1 number"
                }),
                required: true,
                label: formatMessage({
                  id: "global.password",
                  defaultMessage: "Password"
                }),
                type: passwordShown ? "text" : "password"
              }
            ),
            /* @__PURE__ */ jsx(
              PasswordInput$1,
              {
                name: "confirmPassword",
                onChange: handleChange,
                value: values.confirmPassword,
                error: errors.confirmPassword ? formatMessage(errors.confirmPassword) : void 0,
                endAction: /* @__PURE__ */ jsx(
                  FieldActionWrapper$1,
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      setConfirmPasswordShown((prev) => !prev);
                    },
                    label: formatMessage(
                      confirmPasswordShown ? {
                        id: "Auth.form.password.show-password",
                        defaultMessage: "Show password"
                      } : {
                        id: "Auth.form.password.hide-password",
                        defaultMessage: "Hide password"
                      }
                    ),
                    children: confirmPasswordShown ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeStriked, {})
                  }
                ),
                required: true,
                label: formatMessage({
                  id: "Auth.form.confirmPassword.label",
                  defaultMessage: "Confirm Password"
                }),
                type: confirmPasswordShown ? "text" : "password"
              }
            ),
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                onValueChange: (checked) => {
                  handleChange({ target: { value: checked, name: "news" } });
                },
                value: values.news,
                name: "news",
                "aria-label": "news",
                children: formatMessage(
                  {
                    id: "Auth.form.register.news.label",
                    defaultMessage: "Keep me updated about new features & upcoming improvements (by doing this you accept the {terms} and the {policy})."
                  },
                  {
                    terms: /* @__PURE__ */ jsx(A, { target: "_blank", href: "https://strapi.io/terms", rel: "noreferrer", children: formatMessage({
                      id: "Auth.privacy-policy-agreement.terms",
                      defaultMessage: "terms"
                    }) }),
                    policy: /* @__PURE__ */ jsx(A, { target: "_blank", href: "https://strapi.io/privacy", rel: "noreferrer", children: formatMessage({
                      id: "Auth.privacy-policy-agreement.policy",
                      defaultMessage: "policy"
                    }) })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(Button, { fullWidth: true, size: "L", type: "submit", children: formatMessage({
              id: "Auth.form.button.register",
              defaultMessage: "Let's start"
            }) })
          ] }) }) });
        }
      }
    ),
    match?.params.authType === "register" && /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Link$1, { as: NavLink, to: "/auth/login", children: formatMessage({
      id: "Auth.link.signin.account",
      defaultMessage: "Already have an account?"
    }) }) }) })
  ] }) });
};
function normalizeData(data) {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      if (!["password", "confirmPassword"].includes(key) && typeof value === "string") {
        acc[key] = value.trim();
        if (key === "lastname") {
          acc[key] = value || void 0;
        }
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
}
const A = styled.a`
  color: ${({ theme }) => theme.colors.primary600};
`;
const PasswordInput$1 = styled(TextInput)`
  ::-ms-reveal {
    display: none;
  }
`;
const RESET_PASSWORD_SCHEMA = yup.object().shape({
  password: yup.string().min(8, translatedErrors.minLength).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number").required(translatedErrors.required),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "components.Input.error.password.noMatch").required(translatedErrors.required)
});
const ResetPassword = () => {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = React.useState(false);
  const { formatMessage } = useIntl();
  const { post } = useFetchClient();
  const { push } = useHistory();
  const query = useQuery$1();
  const { mutate, isError } = useMutation(
    async (body) => {
      const {
        data: { data }
      } = await post("/admin/reset-password", {
        ...body,
        resetPasswordToken: query.get("code")
      });
      return data;
    },
    {
      onSuccess(data) {
        if (data) {
          const { token, user } = data;
          auth.setToken(token, false);
          auth.setUserInfo(user, false);
          push("/");
        }
      }
    }
  );
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsxs(LayoutContent, { children: [
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(Logo, {}),
        /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 7, children: /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", children: formatMessage({
          id: "global.reset-password",
          defaultMessage: "Reset password"
        }) }) }),
        isError ? /* @__PURE__ */ jsx(Typography, { id: "global-form-error", role: "alert", tabIndex: -1, textColor: "danger600", children: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        }) }) : null
      ] }),
      /* @__PURE__ */ jsx(
        Formik,
        {
          enableReinitialize: true,
          initialValues: {
            password: "",
            confirmPassword: ""
          },
          onSubmit: (values) => {
            mutate({ password: values.password });
          },
          validationSchema: RESET_PASSWORD_SCHEMA,
          validateOnChange: false,
          children: ({ values, errors, handleChange }) => /* @__PURE__ */ jsx(Form, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                name: "password",
                onChange: handleChange,
                value: values.password,
                error: errors.password ? formatMessage(
                  {
                    id: errors.password,
                    defaultMessage: "This field is required."
                  },
                  {
                    min: 8
                  }
                ) : void 0,
                endAction: /* @__PURE__ */ jsx(
                  FieldActionWrapper$1,
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      setPasswordShown((prev) => !prev);
                    },
                    label: formatMessage(
                      passwordShown ? {
                        id: "Auth.form.password.show-password",
                        defaultMessage: "Show password"
                      } : {
                        id: "Auth.form.password.hide-password",
                        defaultMessage: "Hide password"
                      }
                    ),
                    children: passwordShown ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeStriked, {})
                  }
                ),
                hint: formatMessage({
                  id: "Auth.form.password.hint",
                  defaultMessage: "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number"
                }),
                required: true,
                label: formatMessage({
                  id: "global.password",
                  defaultMessage: "Password"
                }),
                type: passwordShown ? "text" : "password"
              }
            ),
            /* @__PURE__ */ jsx(
              PasswordInput,
              {
                name: "confirmPassword",
                onChange: handleChange,
                value: values.confirmPassword,
                error: errors.confirmPassword ? formatMessage({
                  id: errors.confirmPassword,
                  defaultMessage: "This value is required."
                }) : void 0,
                endAction: /* @__PURE__ */ jsx(
                  FieldActionWrapper$1,
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      setConfirmPasswordShown((prev) => !prev);
                    },
                    label: formatMessage(
                      passwordShown ? {
                        id: "Auth.form.password.show-password",
                        defaultMessage: "Show password"
                      } : {
                        id: "Auth.form.password.hide-password",
                        defaultMessage: "Hide password"
                      }
                    ),
                    children: confirmPasswordShown ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeStriked, {})
                  }
                ),
                required: true,
                label: formatMessage({
                  id: "Auth.form.confirmPassword.label",
                  defaultMessage: "Confirm Password"
                }),
                type: confirmPasswordShown ? "text" : "password"
              }
            ),
            /* @__PURE__ */ jsx(Button, { fullWidth: true, type: "submit", children: formatMessage({
              id: "global.change-password",
              defaultMessage: "Change password"
            }) })
          ] }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Link$1, { as: NavLink, to: "/auth/login", children: formatMessage({ id: "Auth.link.ready", defaultMessage: "Ready to sign in?" }) }) }) })
  ] }) });
};
const PasswordInput = styled(TextInput)`
  ::-ms-reveal {
    display: none;
  }
`;
const FORMS = {
  "forgot-password": ForgotPassword,
  "forgot-password-success": ForgotPasswordSuccess,
  // the `Component` attribute is set after all forms and CE/EE components are loaded, but since we
  // are here outside of a React component we can not use the hook directly
  login: () => null,
  oops: Oops,
  register: Register,
  "register-admin": Register,
  "reset-password": ResetPassword,
  providers: () => null
};
const AuthPage = ({ hasAdmin }) => {
  const {
    location: { search }
  } = useHistory();
  const match = useRouteMatch("/auth/:authType");
  const authType = match?.params.authType;
  const Login$1 = useEnterprise(
    Login,
    async () => (await import("./Login-e6754f30.mjs")).LoginEE
  );
  const forms = useEnterprise(
    FORMS,
    async () => (await import("./constants-b43a23f8.mjs")).FORMS,
    {
      combine(ceForms, eeForms) {
        return {
          ...ceForms,
          ...eeForms
        };
      },
      defaultValue: FORMS
    }
  );
  if (!authType || !forms) {
    return /* @__PURE__ */ jsx(Redirect, { to: "/" });
  }
  const Component2 = forms[authType];
  if (!Component2 || hasAdmin && authType === "register-admin" || auth.getToken()) {
    return /* @__PURE__ */ jsx(Redirect, { to: "/" });
  }
  if (!hasAdmin && authType !== "register-admin") {
    return /* @__PURE__ */ jsx(
      Redirect,
      {
        to: {
          pathname: "/auth/register-admin",
          // Forward the `?redirectTo` from /auth/login
          // /abc => /auth/login?redirectTo=%2Fabc => /auth/register-admin?redirectTo=%2Fabc
          search
        }
      }
    );
  }
  if (Login$1 && authType === "login") {
    return /* @__PURE__ */ jsx(Login$1, {});
  } else if (authType === "login" && !Login$1) {
    return null;
  }
  return /* @__PURE__ */ jsx(Component2, { hasAdmin });
};
const NotFoundPage = () => {
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsxs(Main, { labelledBy: "title", children: [
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        id: "title",
        title: formatMessage({
          id: "content-manager.pageNotFound",
          defaultMessage: "Page not found"
        })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        action: /* @__PURE__ */ jsx(LinkButton$1, { variant: "secondary", endIcon: /* @__PURE__ */ jsx(ArrowRight, {}), to: "/", children: formatMessage({
          id: "app.components.NotFoundPage.back",
          defaultMessage: "Back to homepage"
        }) }),
        content: formatMessage({
          id: "app.page.not.found",
          defaultMessage: "Oops! We can't seem to find the page you're looging for..."
        }),
        hasRadius: true,
        icon: /* @__PURE__ */ jsx(EmptyPictures, { width: "10rem" }),
        shadow: "tableShadow"
      }
    ) })
  ] });
};
const NotFoundPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NotFoundPage
}, Symbol.toStringTag, { value: "Module" }));
const options = [
  {
    intlLabel: {
      id: "Usecase.front-end",
      defaultMessage: "Front-end developer"
    },
    value: "front_end_developer"
  },
  {
    intlLabel: {
      id: "Usecase.back-end",
      defaultMessage: "Back-end developer"
    },
    value: "back_end_developer"
  },
  {
    intlLabel: {
      id: "Usecase.full-stack",
      defaultMessage: "Full-stack developer"
    },
    value: "full_stack_developer"
  },
  {
    intlLabel: {
      id: "global.content-manager",
      defaultMessage: "Content Manager"
    },
    value: "content_manager"
  },
  {
    intlLabel: {
      id: "Usecase.content-creator",
      defaultMessage: "Content Creator"
    },
    value: "content_creator"
  },
  {
    intlLabel: {
      id: "Usecase.other",
      defaultMessage: "Other"
    },
    value: "other"
  }
];
const TypographyCenter = styled(Typography)`
  text-align: center;
`;
const UseCasePage = () => {
  const toggleNotification = useNotification();
  const { push, location } = useHistory();
  const { formatMessage } = useIntl();
  const [role, setRole] = React.useState(null);
  const [otherRole, setOtherRole] = React.useState("");
  const { post } = useFetchClient();
  const { firstname, email } = auth.get("userInfo") ?? {};
  const { hasAdmin } = parse(location?.search, { ignoreQueryPrefix: true });
  const isOther = role === "other";
  const handleSubmit = async (event, skipPersona) => {
    event.preventDefault();
    try {
      await post("https://analytics.strapi.io/register", {
        email,
        username: firstname,
        firstAdmin: Boolean(!hasAdmin),
        persona: {
          role: skipPersona ? void 0 : role,
          otherRole: skipPersona ? void 0 : otherRole
        }
      });
      toggleNotification({
        type: "success",
        message: {
          id: "Usecase.notification.success.project-created",
          defaultMessage: "Project has been successfully created"
        }
      });
      push("/");
    } catch (err) {
    }
  };
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(Main, { labelledBy: "usecase-title", children: [
    /* @__PURE__ */ jsx(LayoutContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => handleSubmit(e, false), children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", paddingBottom: 7, children: [
        /* @__PURE__ */ jsx(Logo, {}),
        /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 1, width: pxToRem(250), children: /* @__PURE__ */ jsx(TypographyCenter, { variant: "alpha", as: "h1", id: "usecase-title", children: formatMessage({
          id: "Usecase.title",
          defaultMessage: "Tell us a bit more about yourself"
        }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
        /* @__PURE__ */ jsx(
          Select,
          {
            id: "usecase",
            "data-testid": "usecase",
            label: formatMessage({
              id: "Usecase.input.work-type",
              defaultMessage: "What type of work do you do?"
            }),
            onChange: (value) => setRole(value),
            value: role,
            children: options.map(({ intlLabel, value }) => /* @__PURE__ */ jsx(Option$1, { value, children: formatMessage(intlLabel) }, value))
          }
        ),
        isOther && /* @__PURE__ */ jsx(
          TextInput,
          {
            name: "other",
            label: formatMessage({ id: "Usecase.other", defaultMessage: "Other" }),
            value: otherRole,
            onChange: (e) => setOtherRole(e.target.value),
            "data-testid": "other"
          }
        ),
        /* @__PURE__ */ jsx(Button, { type: "submit", size: "L", fullWidth: true, disabled: !role, children: formatMessage({ id: "global.finish", defaultMessage: "Finish" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(TextButton, { onClick: (event) => handleSubmit(event, true), children: formatMessage({
      id: "Usecase.button.skip",
      defaultMessage: "Skip this question"
    }) }) }) })
  ] }) });
};
const LazyCompo = ({ loadComponent }) => {
  const [Compo, setCompo] = React.useState(null);
  React.useEffect(() => {
    const loadCompo = async () => {
      try {
        const loadedCompo = await loadComponent();
        if (typeof loadedCompo === "function") {
          setCompo(() => loadedCompo);
        } else if (loadedCompo.default) {
          setCompo(() => loadedCompo.default);
        }
      } catch (err) {
      }
    };
    loadCompo();
  }, [loadComponent]);
  if (Compo) {
    return /* @__PURE__ */ jsx(Compo, {});
  }
  return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
};
const createRoute = (loadComponent, to, exact = false) => {
  return /* @__PURE__ */ jsx(
    Route,
    {
      render: () => /* @__PURE__ */ jsx(LazyCompo, { loadComponent }),
      path: to,
      exact: exact || false
    },
    to
  );
};
const ROUTES_CE = null;
const AuthenticatedApp = React.lazy(
  () => import("./AuthenticatedApp-4fe5a7bd.mjs").then((n) => n.A).then((mod) => ({ default: mod.AuthenticatedApp }))
);
const App$2 = ({ authLogo, menuLogo, showReleaseNotification, showTutorials }) => {
  const adminPermissions = useEnterprise(
    ADMIN_PERMISSIONS_CE,
    async () => (await import("./constants-6ecddc43.mjs")).ADMIN_PERMISSIONS_EE,
    {
      combine(cePermissions, eePermissions) {
        return merge({}, cePermissions, eePermissions);
      },
      defaultValue: ADMIN_PERMISSIONS_CE
    }
  );
  const routes = useEnterprise(
    ROUTES_CE,
    async () => (await import("./constants-6ecddc43.mjs")).ROUTES_EE,
    {
      defaultValue: []
    }
  );
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const [
    { isLoading, hasAdmin, uuid, deviceId, authLogo: customAuthLogo, menuLogo: customMenuLogo },
    setState
  ] = React.useState({
    isLoading: true,
    deviceId: void 0,
    hasAdmin: false,
    uuid: false
  });
  const dispatch = useDispatch();
  const appInfo = useAppInfo();
  const { get: get2, post } = useFetchClient();
  const authRoutes = React.useMemo(() => {
    if (!routes) {
      return null;
    }
    return routes.map(({ to, Component: Component2, exact }) => createRoute(Component2, to, exact));
  }, [routes]);
  const [telemetryProperties, setTelemetryProperties] = React.useState(void 0);
  React.useEffect(() => {
    dispatch({ type: ACTION_SET_ADMIN_PERMISSIONS, payload: adminPermissions });
  }, [adminPermissions, dispatch]);
  React.useEffect(() => {
    const currentToken = auth.getToken();
    const renewToken = async () => {
      try {
        const {
          data: {
            data: { token }
          }
        } = await post("/admin/renew-token", { token: currentToken });
        auth.updateToken(token);
      } catch (err) {
        auth.clearAppStorage();
        window.location.reload();
      }
    };
    if (currentToken) {
      renewToken();
    }
  }, [post]);
  React.useEffect(() => {
    const getData2 = async () => {
      try {
        const {
          data: {
            data: { hasAdmin: hasAdmin2, uuid: uuid2, authLogo: authLogo2, menuLogo: menuLogo2 }
          }
        } = await get2(`/admin/init`);
        if (uuid2) {
          const {
            data: { data: properties }
          } = await get2(`/admin/telemetry-properties`, {
            // NOTE: needed because the interceptors of the fetchClient redirect to /login when receive a 401 and it would end up in an infinite loop when the user doesn't have a session.
            validateStatus: (status) => status < 500
          });
          setTelemetryProperties(properties);
          try {
            const event = "didInitializeAdministration";
            post(
              "https://analytics.strapi.io/api/v2/track",
              {
                // This event is anonymous
                event,
                userId: "",
                deviceId,
                eventPropeties: {},
                userProperties: { environment: appInfo.currentEnvironment },
                groupProperties: { ...properties, projectId: uuid2 }
              },
              {
                headers: {
                  "X-Strapi-Event": event
                }
              }
            );
          } catch (e) {
          }
        }
        setState({ isLoading: false, hasAdmin: hasAdmin2, uuid: uuid2, deviceId, authLogo: authLogo2, menuLogo: menuLogo2 });
      } catch (err) {
        toggleNotification({
          type: "warning",
          message: { id: "app.containers.App.notification.error.init" }
        });
      }
    };
    getData2();
  }, [toggleNotification]);
  const trackingInfo = React.useMemo(
    () => ({
      uuid,
      telemetryProperties,
      deviceId
    }),
    [uuid, telemetryProperties, deviceId]
  );
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsxs(React.Suspense, { fallback: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}), children: [
    /* @__PURE__ */ jsx(SkipToContent, { children: formatMessage({ id: "skipToContent", defaultMessage: "Skip to content" }) }),
    /* @__PURE__ */ jsx(
      ConfigurationProvider,
      {
        authLogo: {
          default: authLogo,
          custom: {
            url: customAuthLogo
          }
        },
        menuLogo: {
          default: menuLogo,
          custom: {
            url: customMenuLogo
          }
        },
        showReleaseNotification,
        showTutorials,
        children: /* @__PURE__ */ jsx(TrackingProvider, { value: trackingInfo, children: /* @__PURE__ */ jsxs(Switch, { children: [
          authRoutes,
          /* @__PURE__ */ jsx(
            Route,
            {
              path: "/auth/:authType",
              render: (routerProps) => /* @__PURE__ */ jsx(AuthPage, { ...routerProps, hasAdmin }),
              exact: true
            }
          ),
          /* @__PURE__ */ jsx(PrivateRoute, { path: "/usecase", component: UseCasePage }),
          /* @__PURE__ */ jsx(PrivateRoute, { path: "/", component: AuthenticatedApp }),
          /* @__PURE__ */ jsx(Route, { path: "", component: NotFoundPage })
        ] }) })
      }
    )
  ] });
};
const StrapiLogo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMzkgMjgyYzAtMTE4IDAtMTc2LjkgMzYuNi0yMTMuNUMxMTIuMiAzMiAxNzEuMSAzMiAyODguOSAzMmgyMjEuMmMxMTcuOCAwIDE3Ni43IDAgMjEzLjMgMzYuNkM3NjAgMTA1LjIgNzYwIDE2NC4xIDc2MCAyODEuOXYyMjEuMmMwIDExNy44IDAgMTc2LjctMzYuNiAyMTMuM0M2ODYuOCA3NTMgNjI3LjkgNzUzIDUxMC4xIDc1M0gyODguOWMtMTE3LjggMC0xNzYuNyAwLTIxMy4zLTM2LjZDMzkgNjc5LjggMzkgNjIwLjkgMzkgNTAzLjFWMjgxLjlaIiBmaWxsPSIjNDk0NUZGIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUzNi40IDI1MC43SDI5My43djEyMy44aDEyMy44djEyMy43aDEyMy44VjI1NS41YzAtMi42LTIuMi00LjgtNC45LTQuOFoiIGZpbGw9IiNmZmYiLz4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00MTIuNyAzNzQuNWg0Ljh2NC44aC00Ljh6Ii8+CiAgICA8cGF0aCBkPSJNMjkzLjggMzc0LjVoMTE5YzIuNiAwIDQuOCAyLjEgNC44IDQuOHYxMTloLTExOWE0LjggNC44IDAgMCAxLTQuOC00Ljl2LTExOVoiIGZpbGw9IiM5NTkzRkYiLz4KICAgIDxwYXRoIGQ9Ik00MTcuNSA0OTguMmgxMjMuOEw0MjEuNiA2MThhMi40IDIuNCAwIDAgMS00LTEuN3YtMTE4Wk0yOTMuOCAzNzQuNWgtMTE4YTIuNCAyLjQgMCAwIDEtMS43LTQuMWwxMTkuNy0xMTkuN3YxMjMuOFoiIGZpbGw9IiM5NTkzRkYiLz4KPC9zdmc+Cg==";
const [AdminContextProvider, useAdminContext] = createContext("AdminContext");
const useAdmin = () => useAdminContext("useAdmin");
const GuidedTourProvider = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible, isSkipped }, dispatch] = React.useReducer(reducer$8, initialState$a, initialiseState);
  const setCurrentStep = (step) => {
    if (step !== null) {
      const isStepAlreadyDone = get(guidedTourState, step);
      const [sectionName, stepName] = step.split(".");
      const sectionArray = Object.entries(guidedTourState[sectionName]);
      const currentStepIndex = sectionArray.findIndex(([key]) => key === stepName);
      const previousSteps = sectionArray.slice(0, currentStepIndex);
      const isStepToShow = previousSteps.every(([, sectionValue]) => sectionValue);
      if (isStepAlreadyDone || isSkipped || !isStepToShow) {
        return null;
      }
    }
    auth.set(null, "GUIDED_TOUR_CURRENT_STEP", true);
    return dispatch({
      type: "SET_CURRENT_STEP",
      step
    });
  };
  const setGuidedTourVisibility = (value) => {
    dispatch({
      type: "SET_GUIDED_TOUR_VISIBILITY",
      value
    });
  };
  const setStepState = (currentStep2, value) => {
    addCompletedStep(currentStep2);
    dispatch({
      type: "SET_STEP_STATE",
      currentStep: currentStep2,
      value
    });
  };
  const startSection = (sectionName) => {
    const sectionSteps = guidedTourState[sectionName];
    if (sectionSteps) {
      const guidedTourArray = Object.entries(guidedTourState);
      const currentSectionIndex = guidedTourArray.findIndex(([key]) => key === sectionName);
      const previousSections = guidedTourArray.slice(0, currentSectionIndex);
      const isSectionToShow = previousSections.every(
        ([, sectionValue]) => Object.values(sectionValue).every(Boolean)
      );
      const [firstStep] = Object.keys(sectionSteps);
      const isFirstStepDone = sectionSteps[firstStep];
      if (isSectionToShow && !currentStep && !isFirstStepDone) {
        setCurrentStep(`${sectionName}.${firstStep}`);
      }
    }
  };
  const setSkipped = (value) => {
    auth.set(value, "GUIDED_TOUR_SKIPPED", true);
    dispatch({
      type: "SET_SKIPPED",
      value
    });
  };
  return /* @__PURE__ */ jsx(
    GuidedTourProvider$1,
    {
      guidedTourState,
      currentStep,
      setCurrentStep,
      setGuidedTourVisibility,
      setSkipped,
      setStepState,
      startSection,
      isGuidedTourVisible,
      isSkipped,
      children
    }
  );
};
const initialState$a = {
  currentStep: null,
  guidedTourState: {
    contentTypeBuilder: {
      create: false,
      success: false
    },
    contentManager: {
      create: false,
      success: false
    },
    apiTokens: {
      create: false,
      success: false
    },
    transferTokens: {
      create: false,
      success: false
    }
  },
  isGuidedTourVisible: false,
  isSkipped: false
};
const reducer$8 = (state = initialState$a, action) => produce(state, (draftState) => {
  switch (action.type) {
    case "SET_CURRENT_STEP": {
      draftState.currentStep = action.step;
      break;
    }
    case "SET_STEP_STATE": {
      const [section, step] = action.currentStep.split(".");
      draftState.guidedTourState[section][step] = action.value;
      break;
    }
    case "SET_SKIPPED": {
      draftState.isSkipped = action.value;
      break;
    }
    case "SET_GUIDED_TOUR_VISIBILITY": {
      draftState.isGuidedTourVisible = action.value;
      break;
    }
    default: {
      return draftState;
    }
  }
});
const initialiseState = (initialState2) => {
  const copyInitialState = { ...initialState2 };
  const guidedTourLocaleStorage = auth.get("GUIDED_TOUR_COMPLETED_STEPS");
  const currentStepLocaleStorage = auth.get("GUIDED_TOUR_CURRENT_STEP");
  const skippedLocaleStorage = auth.get("GUIDED_TOUR_SKIPPED");
  if (Array.isArray(guidedTourLocaleStorage)) {
    guidedTourLocaleStorage.forEach((step) => {
      const [sectionName, stepName] = step.split(".");
      set(copyInitialState, ["guidedTourState", sectionName, stepName], true);
    });
  }
  if (currentStepLocaleStorage) {
    const [sectionName, stepName] = currentStepLocaleStorage.split(".");
    set(copyInitialState, ["guidedTourState", sectionName, stepName], true);
    addCompletedStep(currentStepLocaleStorage);
    auth.set(null, "GUIDED_TOUR_CURRENT_STEP", true);
  }
  if (skippedLocaleStorage !== null) {
    set(copyInitialState, "isSkipped", skippedLocaleStorage);
  }
  return copyInitialState;
};
const addCompletedStep = (completedStep) => {
  const currentSteps = auth.get("GUIDED_TOUR_COMPLETED_STEPS") ?? [];
  if (!Array.isArray(currentSteps)) {
    return;
  }
  const isAlreadyStored = currentSteps.includes(completedStep);
  if (isAlreadyStored) {
    return;
  }
  auth.set([...currentSteps, completedStep], "GUIDED_TOUR_COMPLETED_STEPS", true);
};
const [ThemeToggleContextProvider, useThemeToggleContext] = createContext("ThemeToggleContext");
const useThemeToggle = () => useThemeToggleContext("useThemeToggle");
const Theme = ({ children }) => {
  const { currentTheme, themes, systemTheme } = useThemeToggle();
  const { locale } = useIntl();
  const computedThemeName = currentTheme === "system" ? systemTheme : currentTheme;
  return /* @__PURE__ */ jsxs(
    DesignSystemProvider,
    {
      locale,
      theme: themes?.[computedThemeName || "light"],
      children: [
        children,
        /* @__PURE__ */ jsx(GlobalStyle, {})
      ]
    }
  );
};
const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.neutral100};
  }
`;
const THEME_KEY = "STRAPI_THEME";
const getDefaultTheme = () => {
  const persistedTheme = localStorage.getItem(THEME_KEY);
  return persistedTheme || "system";
};
const ThemeToggleProvider = ({ children, themes }) => {
  const [currentTheme, setCurrentTheme] = React.useState(getDefaultTheme());
  const [systemTheme, setSystemTheme] = React.useState();
  const handleChangeTheme = React.useCallback(
    (nextTheme) => {
      setCurrentTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    },
    [setCurrentTheme]
  );
  React.useEffect(() => {
    const themeWatcher = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(themeWatcher.matches ? "dark" : "light");
    const listener = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    themeWatcher.addEventListener("change", listener);
    return () => {
      themeWatcher.removeEventListener("change", listener);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    ThemeToggleContextProvider,
    {
      currentTheme,
      onChangeTheme: handleChangeTheme,
      themes,
      systemTheme,
      children
    }
  );
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
const Providers = ({
  children,
  components,
  customFields,
  fields,
  getAdminInjectedComponents,
  getPlugin,
  localeNames,
  menu,
  messages,
  plugins,
  runHookParallel,
  runHookSeries,
  runHookWaterfall,
  settings,
  store,
  themes
}) => {
  return /* @__PURE__ */ jsx(LanguageProvider, { messages, localeNames, children: /* @__PURE__ */ jsx(ThemeToggleProvider, { themes, children: /* @__PURE__ */ jsx(Theme, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(AdminContextProvider, { getAdminInjectedComponents, children: /* @__PURE__ */ jsx(
    StrapiAppProvider,
    {
      getPlugin,
      menu,
      plugins,
      runHookParallel,
      runHookWaterfall,
      runHookSeries,
      settings,
      children: /* @__PURE__ */ jsx(LibraryProvider, { components, fields, children: /* @__PURE__ */ jsx(CustomFieldsProvider, { customFields, children: /* @__PURE__ */ jsx(AutoReloadOverlayBlockerProvider, { children: /* @__PURE__ */ jsx(OverlayBlockerProvider, { children: /* @__PURE__ */ jsx(GuidedTourProvider, { children: /* @__PURE__ */ jsx(NotificationsProvider, { children }) }) }) }) }) })
    }
  ) }) }) }) }) }) });
};
class Components {
  components;
  constructor() {
    this.components = {};
  }
  add(component) {
    const { name, Component: Component2 } = component;
    invariant(Component2, "A Component must be provided");
    invariant(name, "A name must be provided");
    invariant(this.components[name] === void 0, "A similar field already exists");
    this.components[name] = Component2;
  }
}
const ALLOWED_TYPES = [
  "biginteger",
  "boolean",
  "date",
  "datetime",
  "decimal",
  "email",
  "enumeration",
  "float",
  "integer",
  "json",
  "password",
  "richtext",
  "string",
  "text",
  "time",
  "uid"
];
const ALLOWED_ROOT_LEVEL_OPTIONS = [
  "min",
  "minLength",
  "max",
  "maxLength",
  "required",
  "regex",
  "enum",
  "unique",
  "private",
  "default"
];
class CustomFields {
  customFields;
  constructor() {
    this.customFields = {};
  }
  register(customFields) {
    if (Array.isArray(customFields)) {
      customFields.forEach((customField) => {
        this.register(customField);
      });
    } else {
      const { name, pluginId, type, intlLabel, intlDescription, components, options: options2 } = customFields;
      invariant(name, "A name must be provided");
      invariant(type, "A type must be provided");
      invariant(intlLabel, "An intlLabel must be provided");
      invariant(intlDescription, "An intlDescription must be provided");
      invariant(components, "A components object must be provided");
      invariant(components.Input, "An Input component must be provided");
      invariant(
        ALLOWED_TYPES.includes(type),
        `Custom field type: '${type}' is not a valid Strapi type or it can't be used with a Custom Field`
      );
      const isValidObjectKey = /^(?![0-9])[a-zA-Z0-9$_-]+$/g;
      invariant(
        isValidObjectKey.test(name),
        `Custom field name: '${name}' is not a valid object key`
      );
      const allFormOptions = [...options2?.base || [], ...options2?.advanced || []];
      if (allFormOptions.length) {
        const optionPathValidations = allFormOptions.reduce(optionsValidationReducer, []);
        optionPathValidations.forEach(({ isValidOptionPath, errorMessage }) => {
          invariant(isValidOptionPath, errorMessage);
        });
      }
      const uid = pluginId ? `plugin::${pluginId}.${name}` : `global::${name}`;
      const uidAlreadyUsed = Object.prototype.hasOwnProperty.call(this.customFields, uid);
      invariant(!uidAlreadyUsed, `Custom field: '${uid}' has already been registered`);
      this.customFields[uid] = customFields;
    }
  }
  getAll() {
    return this.customFields;
  }
  get(uid) {
    return this.customFields[uid];
  }
}
const optionsValidationReducer = (acc, option) => {
  if ("items" in option) {
    return option.items.reduce(optionsValidationReducer, acc);
  }
  if (!option.name) {
    acc.push({
      isValidOptionPath: false,
      errorMessage: "The 'name' property is required on an options object"
    });
  } else {
    acc.push({
      isValidOptionPath: option.name.startsWith("options") || ALLOWED_ROOT_LEVEL_OPTIONS.includes(option.name),
      errorMessage: `'${option.name}' must be prefixed with 'options.'`
    });
  }
  return acc;
};
class Fields {
  fields;
  constructor() {
    this.fields = {};
  }
  add(field) {
    const { type, Component: Component2 } = field;
    invariant(Component2, "A Component must be provided");
    invariant(type, "A type must be provided");
    this.fields[type] = Component2;
  }
}
class Middlewares {
  middlewares;
  constructor() {
    this.middlewares = [];
  }
  add(middleware) {
    this.middlewares.push(middleware);
  }
}
class Plugin {
  apis;
  initializer;
  injectionZones;
  isReady;
  name;
  pluginId;
  constructor(pluginConf) {
    this.apis = pluginConf.apis || {};
    this.initializer = pluginConf.initializer || null;
    this.injectionZones = pluginConf.injectionZones || {};
    this.isReady = pluginConf.isReady !== void 0 ? pluginConf.isReady : true;
    this.name = pluginConf.name;
    this.pluginId = pluginConf.id;
  }
  getInjectedComponents(containerName, blockName) {
    try {
      return this.injectionZones[containerName][blockName] || [];
    } catch (err) {
      console.error("Cannot get injected component", err);
      return [];
    }
  }
  injectComponent(containerName, blockName, component) {
    try {
      this.injectionZones[containerName][blockName].push(component);
    } catch (err) {
      console.error("Cannot inject component", err);
    }
  }
}
class Reducers {
  reducers;
  constructor({ appReducers = {} } = {}) {
    this.reducers = { ...appReducers };
  }
  add(reducerName, reducer2) {
    this.reducers[reducerName] = reducer2;
  }
}
const useTypedDispatch = useDispatch;
const useTypedStore = useStore;
const useTypedSelector = useSelector;
const createTypedSelector = (selector) => createSelector((state) => state, selector);
const RBACProvider = ({ children, permissions: permissions2, refetchPermissions }) => {
  const allPermissions = useTypedSelector((state) => state.rbacProvider.allPermissions);
  const dispatch = useTypedDispatch();
  React.useEffect(() => {
    dispatch(setPermissionsAction(permissions2));
    return () => {
      dispatch(resetStoreAction());
    };
  }, [permissions2, dispatch]);
  if (!allPermissions) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsx(RBACContext.Provider, { value: { allPermissions, refetchPermissions }, children });
};
const initialState$9 = {
  allPermissions: null,
  collectionTypesRelatedPermissions: {}
};
const RESET_STORE = "StrapiAdmin/RBACProvider/RESET_STORE";
const SET_PERMISSIONS$1 = "StrapiAdmin/RBACProvider/SET_PERMISSIONS";
const resetStoreAction = () => ({ type: RESET_STORE });
const setPermissionsAction = (permissions2) => ({
  type: SET_PERMISSIONS$1,
  permissions: permissions2
});
const RBACReducer = (state = initialState$9, action) => produce(state, (draftState) => {
  switch (action.type) {
    case SET_PERMISSIONS$1: {
      draftState.allPermissions = action.permissions;
      draftState.collectionTypesRelatedPermissions = action.permissions.filter((perm) => perm.subject).reduce((acc, current) => {
        const { subject, action: action2 } = current;
        if (!subject)
          return acc;
        if (!acc[subject]) {
          acc[subject] = {};
        }
        acc[subject] = acc[subject][action2] ? { ...acc[subject], [action2]: [...acc[subject][action2], current] } : { ...acc[subject], [action2]: [current] };
        return acc;
      }, {});
      break;
    }
    case RESET_STORE: {
      return initialState$9;
    }
    default:
      return state;
  }
});
const useSyncRbac = (query, collectionTypeUID, containerName = "listView") => {
  const dispatch = useTypedDispatch();
  const collectionTypesRelatedPermissions = useTypedSelector(
    (state) => state.rbacProvider.collectionTypesRelatedPermissions
  );
  const permissions2 = useTypedSelector((state) => state["content-manager_rbacManager"].permissions);
  const relatedPermissions = collectionTypesRelatedPermissions[collectionTypeUID];
  useEffect(() => {
    if (relatedPermissions) {
      dispatch({
        type: SET_PERMISSIONS,
        permissions: relatedPermissions,
        __meta__: {
          plugins: query ? query.plugins : null,
          containerName
        }
      });
      return () => {
        dispatch({ type: RESET_PERMISSIONS });
      };
    }
    return () => {
    };
  }, [relatedPermissions, dispatch, query, containerName]);
  const isPermissionMismatch = permissions2?.some((permission) => permission.subject !== collectionTypeUID) ?? true;
  return {
    isValid: Boolean(permissions2) && !isPermissionMismatch,
    permissions: permissions2
  };
};
const initialState$8 = {
  permissions: null
};
const SET_PERMISSIONS = "ContentManager/RBACManager/SET_PERMISSIONS";
const RESET_PERMISSIONS = "ContentManager/RBACManager/RESET_PERMISSIONS";
const reducer$7 = (state = initialState$8, action) => (
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    switch (action.type) {
      case SET_PERMISSIONS: {
        draftState.permissions = Object.entries(action.permissions).reduce((acc, current) => {
          return [...acc, ...current[1]];
        }, []);
        break;
      }
      case RESET_PERMISSIONS: {
        draftState.permissions = null;
        break;
      }
      default:
        return draftState;
    }
  })
);
function getStyle(initialOffset, currentOffset, mouseOffset) {
  if (!initialOffset || !currentOffset || !mouseOffset) {
    return { display: "none" };
  }
  const { x, y } = mouseOffset;
  return {
    transform: `translate(${x}px, ${y}px)`
  };
}
const DragLayer = ({ renderItem }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, mouseOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      mouseOffset: monitor.getClientOffset()
    })
  );
  if (!isDragging) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Box,
    {
      height: "100%",
      left: 0,
      position: "fixed",
      pointerEvents: "none",
      top: 0,
      zIndex: 100,
      width: "100%",
      children: /* @__PURE__ */ jsx(Box, { style: getStyle(initialOffset, currentOffset, mouseOffset), children: renderItem({ type: itemType, item }) })
    }
  );
};
const CardDragPreview = ({ labelField, isSibling = false }) => {
  return /* @__PURE__ */ jsxs(
    FieldContainer$1,
    {
      background: isSibling ? "neutral100" : "primary100",
      display: "inline-flex",
      gap: 3,
      hasRadius: true,
      justifyContent: "space-between",
      isSibling,
      "max-height": pxToRem(32),
      maxWidth: "min-content",
      children: [
        /* @__PURE__ */ jsxs(Flex, { gap: 3, children: [
          /* @__PURE__ */ jsx(DragButton$2, { alignItems: "center", cursor: "all-scroll", padding: 3, children: /* @__PURE__ */ jsx(Drag, {}) }),
          /* @__PURE__ */ jsx(
            TypographyMaxWidth$6,
            {
              textColor: isSibling ? void 0 : "primary600",
              fontWeight: "bold",
              ellipsis: true,
              children: labelField
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { children: [
          /* @__PURE__ */ jsx(ActionBox, { alignItems: "center", children: /* @__PURE__ */ jsx(Pencil, {}) }),
          /* @__PURE__ */ jsx(ActionBox, { alignItems: "center", children: /* @__PURE__ */ jsx(Cross, {}) })
        ] })
      ]
    }
  );
};
const ActionBox = styled(Flex)`
  height: ${({ theme }) => theme.spaces[7]};

  &:last-child {
    padding: 0 ${({ theme }) => theme.spaces[3]};
  }
`;
const DragButton$2 = styled(ActionBox)`
  border-right: 1px solid ${({ theme }) => theme.colors.primary200};

  svg {
    width: ${12 / 16}rem;
    height: ${12 / 16}rem;
  }
`;
const FieldContainer$1 = styled(Flex)`
  border: 1px solid
    ${({ theme, isSibling }) => isSibling ? theme.colors.neutral150 : theme.colors.primary200};

  svg {
    width: ${10 / 16}rem;
    height: ${10 / 16}rem;

    path {
      fill: ${({ theme, isSibling }) => isSibling ? void 0 : theme.colors.primary600};
    }
  }
`;
const TypographyMaxWidth$6 = styled(Typography)`
  max-width: ${72 / 16}rem;
`;
const ComponentDragPreview = ({ displayedValue }) => {
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      background: "neutral0",
      borderColor: "neutral200",
      justifyContent: "space-between",
      gap: 3,
      padding: 3,
      width: pxToRem(300),
      children: [
        /* @__PURE__ */ jsx(ToggleButton, { type: "button", children: /* @__PURE__ */ jsxs(Flex, { gap: 6, children: [
          /* @__PURE__ */ jsx(
            DropdownIconWrapper,
            {
              alignItems: "center",
              justifyContent: "center",
              background: "neutral200",
              height: pxToRem(32),
              width: pxToRem(32),
              children: /* @__PURE__ */ jsx(CarretDown, {})
            }
          ),
          /* @__PURE__ */ jsx(Flex, { maxWidth: pxToRem(150), children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral700", ellipsis: true, children: displayedValue }) })
        ] }) }),
        /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
          /* @__PURE__ */ jsx(IconButton, { "aria-label": "", borderWidth: 0, children: /* @__PURE__ */ jsx(Trash, {}) }),
          /* @__PURE__ */ jsx(IconButton, { "aria-label": "", borderWidth: 0, children: /* @__PURE__ */ jsx(Drag, {}) })
        ] })
      ]
    }
  );
};
const DropdownIconWrapper = styled(Flex)`
  border-radius: 50%;

  svg {
    height: ${6 / 16}rem;
    width: ${11 / 16}rem;
    > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
const ToggleButton = styled.button`
  border: none;
  background: transparent;
  display: block;
  width: 100%;
  text-align: unset;
  padding: 0;
`;
const getTranslation = (id) => `content-manager.${id}`;
const useKeyboardDragAndDrop = (active, index, { onCancel, onDropItem, onGrabItem, onMoveItem }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const handleMove = (movement) => {
    if (!isSelected) {
      return;
    }
    if (movement === "UP") {
      onMoveItem(index - 1, index);
    } else if (movement === "DOWN") {
      onMoveItem(index + 1, index);
    }
  };
  const handleDragClick = () => {
    if (isSelected) {
      if (onDropItem) {
        onDropItem(index);
      }
      setIsSelected(false);
    } else {
      if (onGrabItem) {
        onGrabItem(index);
      }
      setIsSelected(true);
    }
  };
  const handleCancel = () => {
    if (isSelected) {
      setIsSelected(false);
      if (onCancel) {
        onCancel(index);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (!active) {
      return;
    }
    if (e.key === "Tab" && !isSelected) {
      return;
    }
    e.preventDefault();
    switch (e.key) {
      case " ":
      case "Enter":
        handleDragClick();
        break;
      case "Escape":
        handleCancel();
        break;
      case "ArrowDown":
      case "ArrowRight":
        handleMove("DOWN");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        handleMove("UP");
        break;
    }
  };
  return handleKeyDown;
};
const useDragAndDrop = (active, {
  type = "STRAPI_DND",
  index,
  item,
  onStart,
  onEnd,
  onGrabItem,
  onDropItem,
  onCancel,
  onMoveItem,
  dropSensitivity = "regular"
}) => {
  const objectRef = React.useRef(null);
  const [{ handlerId }, dropRef] = useDrop({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item2, monitor) {
      if (!objectRef.current) {
        return;
      }
      const dragIndex = item2.index;
      const newInd = index;
      if (dragIndex === newInd) {
        return;
      }
      if (dropSensitivity === "regular") {
        const hoverBoundingRect = objectRef.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < newInd && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > newInd && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      onMoveItem(newInd, dragIndex);
      item2.index = newInd;
    }
  });
  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type,
    item() {
      if (onStart) {
        onStart();
      }
      const { width } = objectRef.current?.getBoundingClientRect() ?? {};
      return { index, width, ...item };
    },
    end() {
      if (onEnd) {
        onEnd();
      }
    },
    canDrag: active,
    /**
     * This is for useful when the item is in a virtualized list.
     * However, if we don't have an ID then we want the libraries
     * defaults to take care of this.
     */
    isDragging: item?.id ? (monitor) => {
      return item?.id === monitor.getItem().id;
    } : void 0,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const handleKeyDown = useKeyboardDragAndDrop(active, index, {
    onGrabItem,
    onDropItem,
    onCancel,
    onMoveItem
  });
  return [{ handlerId, isDragging, handleKeyDown }, objectRef, dropRef, dragRef, dragPreviewRef];
};
const usePrev = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
const ItemTypes = {
  COMPONENT: "component",
  EDIT_FIELD: "editField",
  FIELD: "field",
  DYNAMIC_ZONE: "dynamicZone",
  RELATION: "relation"
};
const setRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
};
const composeRefs = (...refs) => {
  return (node) => refs.forEach((ref) => setRef(ref, node));
};
const RELATION_ITEM_HEIGHT = 50;
const RELATION_GUTTER = 4;
const RelationInput = ({
  canReorder,
  description,
  disabled,
  error,
  iconButtonAriaLabel,
  id,
  name,
  numberOfRelationsToDisplay,
  label,
  labelAction,
  labelLoadMore,
  labelDisconnectRelation,
  listAriaDescription,
  liveText,
  loadingMessage,
  onCancel,
  onDropItem,
  onGrabItem,
  noRelationsMessage,
  onRelationConnect,
  onRelationLoadMore,
  onRelationDisconnect,
  onRelationReorder,
  onSearchNextPage,
  onSearch,
  placeholder,
  publicationStateTranslations,
  required,
  relations: paginatedRelations,
  searchResults,
  size: size2
}) => {
  const [textValue, setTextValue] = React.useState("");
  const [overflow, setOverflow] = React.useState();
  const listRef = React.useRef(null);
  const outerListRef = React.useRef(null);
  const fieldRef = useFocusInputField(name);
  const { data } = searchResults;
  const relations = paginatedRelations.data;
  const totalNumberOfRelations = relations.length ?? 0;
  const dynamicListHeight = React.useMemo(
    () => totalNumberOfRelations > numberOfRelationsToDisplay ? Math.min(totalNumberOfRelations, numberOfRelationsToDisplay) * (RELATION_ITEM_HEIGHT + RELATION_GUTTER) + RELATION_ITEM_HEIGHT / 2 : Math.min(totalNumberOfRelations, numberOfRelationsToDisplay) * (RELATION_ITEM_HEIGHT + RELATION_GUTTER),
    [totalNumberOfRelations, numberOfRelationsToDisplay]
  );
  const shouldDisplayLoadMoreButton = !!labelLoadMore && paginatedRelations.hasNextPage;
  const options2 = React.useMemo(
    () => data.flat().filter(Boolean).map((result) => ({
      ...result,
      value: result.id,
      label: result.mainField
    })),
    [data]
  );
  React.useEffect(() => {
    if (totalNumberOfRelations <= numberOfRelationsToDisplay) {
      return setOverflow(void 0);
    }
    const handleNativeScroll = (e) => {
      const el = e.target;
      const parentScrollContainerHeight = el.parentNode.scrollHeight;
      const maxScrollBottom = el.scrollHeight - el.scrollTop;
      if (el.scrollTop === 0) {
        return setOverflow("bottom");
      }
      if (maxScrollBottom === parentScrollContainerHeight) {
        return setOverflow("top");
      }
      return setOverflow("top-bottom");
    };
    const outerListRefCurrent = outerListRef?.current;
    if (!paginatedRelations.isLoading && relations.length > 0 && outerListRefCurrent) {
      outerListRef.current.addEventListener("scroll", handleNativeScroll);
    }
    return () => {
      if (outerListRefCurrent) {
        outerListRefCurrent.removeEventListener("scroll", handleNativeScroll);
      }
    };
  }, [paginatedRelations, relations, numberOfRelationsToDisplay, totalNumberOfRelations]);
  const handleMenuOpen = (isOpen) => {
    if (isOpen) {
      onSearch();
    }
  };
  const handleUpdatePositionOfRelation = (newIndex, currentIndex) => {
    if (onRelationReorder && newIndex >= 0 && newIndex < relations.length) {
      onRelationReorder(currentIndex, newIndex);
    }
  };
  const previewRelationsLength = usePrev(relations.length);
  const updatedRelationsWith = React.useRef();
  const handleLoadMore = () => {
    updatedRelationsWith.current = "loadMore";
    onRelationLoadMore();
  };
  React.useEffect(() => {
    if (updatedRelationsWith.current === "onChange") {
      setTextValue("");
    }
    if (updatedRelationsWith.current === "onChange" && relations.length !== previewRelationsLength) {
      listRef.current?.scrollToItem(relations.length, "end");
      updatedRelationsWith.current = void 0;
    } else if (updatedRelationsWith.current === "loadMore" && relations.length !== previewRelationsLength) {
      listRef.current?.scrollToItem(0, "start");
      updatedRelationsWith.current = void 0;
    }
  }, [previewRelationsLength, relations]);
  const ariaDescriptionId = `${name}-item-instructions`;
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      direction: "column",
      gap: 3,
      justifyContent: "space-between",
      alignItems: "stretch",
      wrap: "wrap",
      children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "row", alignItems: "end", justifyContent: "end", gap: 2, width: "100%", children: [
          /* @__PURE__ */ jsx(ComboboxWrapper, { marginRight: "auto", maxWidth: size2 <= 6 ? "100%" : "70%", width: "100%", children: /* @__PURE__ */ jsx(
            Combobox,
            {
              ref: fieldRef,
              autocomplete: "list",
              error,
              name,
              hint: description,
              id,
              required,
              label,
              labelAction,
              disabled,
              placeholder,
              hasMoreItems: searchResults.hasNextPage,
              loading: searchResults.isLoading,
              onOpenChange: handleMenuOpen,
              noOptionsMessage: () => noRelationsMessage,
              loadingMessage,
              onLoadMore: () => {
                onSearchNextPage();
              },
              textValue,
              onChange: (relationId) => {
                if (!relationId) {
                  return;
                }
                onRelationConnect(data.flat().find((opt) => opt.id.toString() === relationId));
                updatedRelationsWith.current = "onChange";
              },
              onTextValueChange: (text) => {
                setTextValue(text);
              },
              onInputChange: (event) => {
                onSearch(event.currentTarget.value);
              },
              children: options2.map((opt) => {
                return /* @__PURE__ */ jsx(Option, { ...opt }, opt.id);
              })
            }
          ) }),
          shouldDisplayLoadMoreButton && /* @__PURE__ */ jsx(
            TextButton,
            {
              disabled: paginatedRelations.isLoading || paginatedRelations.isFetchingNextPage,
              onClick: handleLoadMore,
              loading: paginatedRelations.isLoading || paginatedRelations.isFetchingNextPage,
              startIcon: /* @__PURE__ */ jsx(Refresh, {}),
              shrink: 0,
              children: labelLoadMore
            }
          )
        ] }),
        relations.length > 0 && /* @__PURE__ */ jsxs(ShadowBox, { overflowDirection: overflow, children: [
          /* @__PURE__ */ jsx(VisuallyHidden, { id: ariaDescriptionId, children: listAriaDescription }),
          /* @__PURE__ */ jsx(VisuallyHidden, { "aria-live": "assertive", children: liveText }),
          /* @__PURE__ */ jsx(
            FixedSizeList,
            {
              height: dynamicListHeight,
              ref: listRef,
              outerRef: outerListRef,
              itemCount: totalNumberOfRelations,
              itemSize: RELATION_ITEM_HEIGHT + RELATION_GUTTER,
              itemData: {
                name,
                ariaDescribedBy: ariaDescriptionId,
                canDrag: canReorder,
                disabled,
                handleCancel: onCancel,
                handleDropItem: onDropItem,
                handleGrabItem: onGrabItem,
                iconButtonAriaLabel,
                labelDisconnectRelation,
                onRelationDisconnect,
                publicationStateTranslations,
                relations,
                updatePositionOfRelation: handleUpdatePositionOfRelation
              },
              itemKey: (index) => `${relations[index].mainField}_${relations[index].id}`,
              innerElementType: "ol",
              children: ListItem
            }
          )
        ] })
      ]
    }
  );
};
const ComboboxWrapper = styled(Box)`
  align-self: flex-start;
`;
const ShadowBox = styled(Box)`
  position: relative;
  overflow: hidden;
  flex: 1;

  &:before,
  &:after {
    position: absolute;
    width: 100%;
    height: 4px;
    z-index: 1;
  }

  &:before {
    /* TODO: as for DS Table component we would need this to be handled by the DS theme */
    content: '';
    background: linear-gradient(rgba(3, 3, 5, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    top: 0;
    opacity: ${({ overflowDirection }) => overflowDirection === "top-bottom" || overflowDirection === "top" ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
  }

  &:after {
    /* TODO: as for DS Table component we would need this to be handled by the DS theme */
    content: '';
    background: linear-gradient(0deg, rgba(3, 3, 5, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    bottom: 0;
    opacity: ${({ overflowDirection }) => overflowDirection === "top-bottom" || overflowDirection === "bottom" ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
  }
`;
const Option = ({
  publicationState,
  mainField,
  id
}) => {
  const { formatMessage } = useIntl();
  const stringifiedDisplayValue = (mainField ?? id).toString();
  if (publicationState) {
    const isDraft = publicationState === "draft";
    const draftMessage = {
      id: getTranslation("components.Select.draft-info-title"),
      defaultMessage: "State: Draft"
    };
    const publishedMessage = {
      id: getTranslation("components.Select.publish-info-title"),
      defaultMessage: "State: Published"
    };
    const title = isDraft ? formatMessage(draftMessage) : formatMessage(publishedMessage);
    return /* @__PURE__ */ jsx(ComboboxOption, { value: id.toString(), textValue: stringifiedDisplayValue, children: /* @__PURE__ */ jsxs(Flex, { children: [
      /* @__PURE__ */ jsx(StyledBullet, { title, isDraft }),
      /* @__PURE__ */ jsx(Typography, { ellipsis: true, children: stringifiedDisplayValue })
    ] }) });
  }
  return /* @__PURE__ */ jsx(ComboboxOption, { value: id.toString(), textValue: stringifiedDisplayValue, children: stringifiedDisplayValue });
};
const StyledBullet = styled.div`
  flex-shrink: 0;
  width: ${pxToRem(6)};
  height: ${pxToRem(6)};
  margin-right: ${({ theme }) => theme.spaces[2]};
  background-color: ${({ theme, isDraft }) => theme.colors[isDraft ? "secondary600" : "success600"]};
  border-radius: 50%;
`;
const ListItem = ({ data, index, style }) => {
  const {
    ariaDescribedBy,
    canDrag,
    disabled,
    handleCancel,
    handleDropItem,
    handleGrabItem,
    iconButtonAriaLabel,
    name,
    labelDisconnectRelation,
    onRelationDisconnect,
    publicationStateTranslations,
    relations,
    updatePositionOfRelation
  } = data;
  const { publicationState, href, mainField, id } = relations[index];
  const statusColor = publicationState === "draft" ? "secondary" : "success";
  return /* @__PURE__ */ jsxs(
    RelationItem,
    {
      ariaDescribedBy,
      canDrag,
      disabled,
      displayValue: String(mainField ?? id),
      iconButtonAriaLabel,
      id,
      index,
      name,
      endAction: /* @__PURE__ */ jsx(
        DisconnectButton,
        {
          "data-testid": `remove-relation-${id}`,
          disabled,
          type: "button",
          onClick: () => onRelationDisconnect(relations[index]),
          "aria-label": labelDisconnectRelation,
          children: /* @__PURE__ */ jsx(Icon, { width: "12px", as: Cross })
        }
      ),
      onCancel: handleCancel,
      onDropItem: handleDropItem,
      onGrabItem: handleGrabItem,
      status: publicationState || void 0,
      style: {
        ...style,
        bottom: style.bottom ?? 0 + RELATION_GUTTER,
        height: style.height ?? 0 - RELATION_GUTTER
      },
      updatePositionOfRelation,
      children: [
        /* @__PURE__ */ jsx(Box, { minWidth: 0, paddingTop: 1, paddingBottom: 1, paddingRight: 4, children: /* @__PURE__ */ jsx(Tooltip, { description: mainField ?? `${id}`, children: href ? /* @__PURE__ */ jsx(LinkEllipsis, { to: href, children: mainField ?? id }) : /* @__PURE__ */ jsx(Typography, { textColor: disabled ? "neutral600" : "primary600", ellipsis: true, children: mainField ?? id }) }) }),
        publicationState && /* @__PURE__ */ jsx(Status, { variant: statusColor, showBullet: false, size: "S", children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: `${statusColor}700`, children: publicationStateTranslations[publicationState] }) })
      ]
    }
  );
};
const DisconnectButton = styled.button`
  svg path {
    fill: ${({ theme, disabled }) => disabled ? theme.colors.neutral600 : theme.colors.neutral500};
  }

  &:hover svg path,
  &:focus svg path {
    fill: ${({ theme, disabled }) => !disabled && theme.colors.neutral600};
  }
`;
const LinkEllipsis = styled(Link$2)`
  display: block;

  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
`;
const RelationItem = ({
  ariaDescribedBy,
  children,
  displayValue,
  canDrag,
  disabled,
  endAction,
  iconButtonAriaLabel,
  style,
  id,
  index,
  name,
  onCancel,
  onDropItem,
  onGrabItem,
  status,
  updatePositionOfRelation,
  ...props
}) => {
  const [{ handlerId, isDragging, handleKeyDown }, relationRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(canDrag && !disabled, {
    type: `${ItemTypes.RELATION}_${name}`,
    index,
    item: {
      displayedValue: displayValue,
      status,
      id,
      index
    },
    onGrabItem,
    onDropItem,
    onCancel,
    onMoveItem: updatePositionOfRelation,
    dropSensitivity: "immediate"
  });
  const composedRefs = composeRefs(relationRef, dragRef);
  React.useEffect(() => {
    dragPreviewRef(getEmptyImage());
  }, [dragPreviewRef]);
  return /* @__PURE__ */ jsx(
    Box,
    {
      style,
      as: "li",
      ref: dropRef,
      "aria-describedby": ariaDescribedBy,
      cursor: canDrag ? "all-scroll" : "default",
      children: isDragging ? /* @__PURE__ */ jsx(RelationItemPlaceholder, {}) : /* @__PURE__ */ jsxs(
        Flex,
        {
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: canDrag ? 2 : 4,
          paddingRight: 4,
          hasRadius: true,
          borderColor: "neutral200",
          background: disabled ? "neutral150" : "neutral0",
          justifyContent: "space-between",
          ref: canDrag ? composedRefs : void 0,
          "data-handler-id": handlerId,
          ...props,
          children: [
            /* @__PURE__ */ jsxs(FlexWrapper, { gap: 1, children: [
              canDrag ? /* @__PURE__ */ jsx(
                IconButton,
                {
                  forwardedAs: "div",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": iconButtonAriaLabel,
                  borderWidth: 0,
                  onKeyDown: handleKeyDown,
                  disabled,
                  children: /* @__PURE__ */ jsx(Drag, {})
                }
              ) : null,
              /* @__PURE__ */ jsx(ChildrenWrapper, { justifyContent: "space-between", children })
            ] }),
            endAction && /* @__PURE__ */ jsx(Box, { paddingLeft: 4, children: endAction })
          ]
        }
      )
    }
  );
};
const RelationItemPlaceholder = () => /* @__PURE__ */ jsx(
  Box,
  {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    hasRadius: true,
    borderStyle: "dashed",
    borderColor: "primary600",
    borderWidth: "1px",
    background: "primary100",
    height: `calc(100% - ${RELATION_GUTTER}px)`
  }
);
const FlexWrapper = styled(Flex)`
  width: 100%;
  /* Used to prevent endAction to be pushed out of container */
  min-width: 0;

  & > div[role='button'] {
    cursor: all-scroll;
  }
`;
const ChildrenWrapper = styled(Flex)`
  width: 100%;
  /* Used to prevent endAction to be pushed out of container */
  min-width: 0;
`;
const getInitialDataPathUsingTempKeys = (initialData, modifiedData) => (currentPath) => {
  const splitPath = currentPath.split(".");
  return splitPath.reduce((acc, currentValue, index) => {
    const initialDataParent = get(initialData, acc);
    const modifiedDataTempKey = get(modifiedData, [
      ...splitPath.slice(0, index),
      currentValue,
      "__temp_key__"
    ]);
    if (Array.isArray(initialDataParent) && typeof modifiedDataTempKey === "number") {
      const initialDataIndex = initialDataParent.findIndex(
        (entry) => entry.__temp_key__ === modifiedDataTempKey
      );
      acc.push(initialDataIndex.toString());
      return acc;
    }
    acc.push(currentValue);
    return acc;
  }, []);
};
function getRelationLink(targetModel, id) {
  return `/content-manager/collectionType/${targetModel}/${id ?? ""}`;
}
const normalizeRelation = (relation, { shouldAddLink, mainFieldName, targetModel }) => {
  const nextRelation = {
    ...relation,
    // @ts-expect-error – TODO: fix why this want's it to be an attribute as opposed to a string.
    mainField: relation[mainFieldName]
  };
  if (shouldAddLink) {
    nextRelation.href = getRelationLink(targetModel, nextRelation.id);
  }
  nextRelation.publicationState = false;
  if (nextRelation?.publishedAt !== void 0) {
    nextRelation.publicationState = nextRelation.publishedAt ? PUBLICATION_STATES.PUBLISHED : PUBLICATION_STATES.DRAFT;
  }
  return nextRelation;
};
const normalizeRelations = (relations, args) => {
  return [...relations].map((relation) => normalizeRelation(relation, args));
};
const useRelation = (cacheKey = [], { relation, search }) => {
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const { get: get2 } = useFetchClient();
  const { onLoad: onLoadRelations, normalizeArguments } = relation;
  const relationsRes = useInfiniteQuery(
    ["relation", ...cacheKey],
    async ({ pageParam = 1 }) => {
      try {
        const { data: data2 } = await get2(relation?.endpoint, {
          params: {
            ...relation.pageParams ?? {},
            page: pageParam
          }
        });
        setCurrentPage(pageParam);
        return data2;
      } catch (err) {
        return null;
      }
    },
    {
      cacheTime: 0,
      enabled: relation.enabled,
      getNextPageParam(lastPage) {
        const isXToOneRelation = lastPage && !("pagination" in lastPage);
        if (!lastPage || // the API may send an empty 204 response
        isXToOneRelation || // xToOne relations do not have a pagination
        lastPage?.pagination.page >= lastPage?.pagination.pageCount) {
          return void 0;
        }
        return lastPage.pagination.page + 1;
      },
      select: (data2) => ({
        ...data2,
        pages: data2.pages.map((page) => {
          if (!page) {
            return page;
          }
          let normalizedResults = [];
          if ("data" in page && page.data) {
            normalizedResults = [page.data];
          } else if ("results" in page && page.results) {
            normalizedResults = [...page.results].reverse();
          }
          return {
            pagination: "pagination" in page ? page.pagination : void 0,
            results: normalizedResults
          };
        })
      })
    }
  );
  const { pageGoal } = relation;
  const { status, data, fetchNextPage, hasNextPage } = relationsRes;
  useEffect(() => {
    if (pageGoal && pageGoal > currentPage && hasNextPage && status === "success") {
      fetchNextPage({
        pageParam: currentPage + 1
      });
    }
  }, [pageGoal, currentPage, fetchNextPage, hasNextPage, status]);
  const onLoadRelationsCallback = useCallbackRef(onLoadRelations);
  useEffect(() => {
    if (status === "success" && data && data.pages?.at(-1)?.results && onLoadRelationsCallback) {
      const normalizedResults = normalizeRelations(
        data.pages.at(-1)?.results ?? [],
        normalizeArguments
      );
      onLoadRelationsCallback(normalizedResults);
    }
  }, [status, onLoadRelationsCallback, data]);
  const searchRes = useInfiniteQuery(
    ["relation", ...cacheKey, "search", JSON.stringify(searchParams)],
    async ({ pageParam = 1 }) => {
      try {
        const { data: data2 } = await get2(search.endpoint, {
          params: {
            ...search.pageParams ?? {},
            ...searchParams,
            page: pageParam
          }
        });
        return data2;
      } catch (err) {
        return null;
      }
    },
    {
      enabled: Object.keys(searchParams).length > 0,
      getNextPageParam(lastPage) {
        if (!lastPage?.pagination || lastPage.pagination && lastPage.pagination.page >= lastPage.pagination.pageCount) {
          return void 0;
        }
        return lastPage.pagination.page + 1;
      }
    }
  );
  const searchFor = (term, options2 = {}) => {
    setSearchParams({
      ...options2,
      _q: term,
      _filter: "$startsWithi"
    });
  };
  return { relations: relationsRes, search: searchRes, searchFor };
};
const diffRelations = (browserStateRelations = [], serverStateRelations = []) => {
  const connected = browserStateRelations.reduce((acc, relation) => {
    if (!serverStateRelations.find((oldRelation) => oldRelation.id === relation.id)) {
      return [...acc, relation.id];
    }
    return acc;
  }, []);
  const disconnected = serverStateRelations.reduce((acc, relation) => {
    if (!browserStateRelations.find((oldRelation) => oldRelation.id === relation.id)) {
      return [...acc, relation.id];
    }
    return acc;
  }, []);
  return [connected, disconnected];
};
const normalizeSearchResults = (relations, { mainFieldName }) => {
  const { data } = relations;
  const { pages = [] } = data ?? {};
  return {
    ...relations,
    data: pages.map(
      (page) => (page?.results ?? []).map(
        (relation) => normalizeRelation(relation, { mainFieldName, shouldAddLink: false, targetModel: "" })
      )
    ).filter(Boolean).flat()
  };
};
const PUBLICATION_STATES = {
  DRAFT: "draft",
  PUBLISHED: "published"
};
const RELATIONS_TO_DISPLAY = 5;
const SEARCH_RESULTS_TO_DISPLAY = 10;
const RelationInputDataManager = ({
  componentUid,
  name,
  error,
  editable,
  description,
  intlLabel,
  isUserAllowedToEditField,
  isUserAllowedToReadField,
  labelAction,
  mainField,
  placeholder,
  queryInfos: { defaultParams, shouldDisplayRelationLink: shouldDisplayRelationLink2 = false },
  required,
  relationType,
  size: size2,
  targetModel
}) => {
  const {
    isCreatingEntry,
    createActionAllowedFields,
    readActionAllowedFields,
    updateActionAllowedFields,
    slug,
    modifiedData,
    initialData,
    relationConnect,
    relationDisconnect,
    relationLoad,
    relationReorder
  } = useCMEditViewDataManager();
  const { params } = useRouteMatch(
    "/content-manager/collectionType/:collectionType/create/clone/:origin"
  ) ?? {};
  const { origin } = params ?? {};
  const isCloningEntry = Boolean(origin);
  const isComponentRelation = Boolean(componentUid);
  const isFieldAllowed = React.useMemo(() => {
    if (isUserAllowedToEditField === true) {
      return true;
    }
    const allowedFields = isCreatingEntry ? createActionAllowedFields : updateActionAllowedFields;
    return allowedFields.includes(name);
  }, [
    isCreatingEntry,
    createActionAllowedFields,
    name,
    isUserAllowedToEditField,
    updateActionAllowedFields
  ]);
  const isFieldReadable = React.useMemo(() => {
    if (isUserAllowedToReadField) {
      return true;
    }
    const allowedFields = isCreatingEntry ? [] : readActionAllowedFields;
    return allowedFields.includes(name);
  }, [isCreatingEntry, isUserAllowedToReadField, name, readActionAllowedFields]);
  const fieldNameKeys = name.split(".");
  const componentId = componentUid ? get(modifiedData, fieldNameKeys.slice(0, -1))?.id : void 0;
  const entityId = origin || modifiedData.id;
  const relationFetchEndpoint = React.useMemo(() => {
    if (isCreatingEntry && !origin) {
      return null;
    }
    if (componentUid) {
      return componentId ? `/content-manager/relations/${componentUid}/${componentId}/${fieldNameKeys.at(-1)}` : null;
    }
    return `/content-manager/relations/${slug}/${entityId}/${name.split(".").at(-1)}`;
  }, [isCreatingEntry, origin, componentUid, slug, entityId, name, componentId, fieldNameKeys]);
  const relationSearchEndpoint = React.useMemo(() => {
    if (componentUid) {
      return `/content-manager/relations/${componentUid}/${name.split(".").at(-1)}`;
    }
    return `/content-manager/relations/${slug}/${name.split(".").at(-1)}`;
  }, [componentUid, slug, name]);
  const [liveText, setLiveText] = React.useState("");
  const { formatMessage } = useIntl();
  const nameSplit = name.split(".");
  const initialDataPath = getInitialDataPathUsingTempKeys(initialData, modifiedData)(name);
  const relationsFromModifiedData = get(modifiedData, name, []);
  const currentLastPage = Math.ceil(get(initialData, name, []).length / RELATIONS_TO_DISPLAY);
  const { relations, search, searchFor } = useRelation(
    [slug, initialDataPath.join("."), modifiedData.id, defaultParams],
    {
      relation: {
        enabled: !!relationFetchEndpoint,
        endpoint: relationFetchEndpoint,
        pageGoal: currentLastPage,
        pageParams: {
          ...defaultParams,
          pageSize: RELATIONS_TO_DISPLAY
        },
        onLoad(value) {
          relationLoad?.({
            target: {
              initialDataPath: ["initialData", ...initialDataPath],
              modifiedDataPath: ["modifiedData", ...nameSplit],
              value
            }
          });
        },
        normalizeArguments: {
          mainFieldName: mainField.name,
          shouldAddLink: shouldDisplayRelationLink2,
          targetModel
        }
      },
      search: {
        endpoint: relationSearchEndpoint,
        pageParams: {
          ...defaultParams,
          // eslint-disable-next-line no-nested-ternary
          entityId: isCreatingEntry || isCloningEntry ? void 0 : isComponentRelation ? componentId : entityId,
          pageSize: SEARCH_RESULTS_TO_DISPLAY
        }
      }
    }
  );
  const isMorph = relationType.toLowerCase().includes("morph");
  const toOneRelation = [
    "oneWay",
    "oneToOne",
    "manyToOne",
    "oneToManyMorph",
    "oneToOneMorph"
  ].includes(relationType);
  const isDisabled = React.useMemo(() => {
    if (isMorph) {
      return true;
    }
    if (!isCreatingEntry) {
      return !isFieldAllowed && isFieldReadable || !editable;
    }
    return !editable;
  }, [isMorph, isCreatingEntry, editable, isFieldAllowed, isFieldReadable]);
  const handleRelationConnect = (relation) => {
    const normalizedRelation = normalizeRelation(relation, {
      mainFieldName: mainField.name,
      shouldAddLink: shouldDisplayRelationLink2,
      targetModel
    });
    relationConnect?.({ name, value: normalizedRelation, toOneRelation });
  };
  const handleRelationDisconnect = (relation) => {
    relationDisconnect?.({ name, id: relation.id });
  };
  const handleRelationLoadMore = () => {
    relations.fetchNextPage();
  };
  const handleSearch = (term = "") => {
    const [connected, disconnected] = diffRelations(
      relationsFromModifiedData,
      get(initialData, name)
    );
    searchFor(term, {
      idsToInclude: disconnected,
      idsToOmit: connected
    });
  };
  const handleSearchMore = () => {
    search.fetchNextPage();
  };
  const getItemPos = (index) => `${index + 1} of ${relationsFromModifiedData.length}`;
  const handleRelationReorder = (oldIndex, newIndex) => {
    const item = relationsFromModifiedData[oldIndex];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: item.mainField ?? item.id,
          position: getItemPos(newIndex)
        }
      )
    );
    relationReorder?.({
      name,
      newIndex,
      oldIndex
    });
  };
  const handleGrabItem = (index) => {
    const item = relationsFromModifiedData[index];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: item.mainField ?? item.id,
          position: getItemPos(index)
        }
      )
    );
  };
  const handleDropItem = (index) => {
    const item = relationsFromModifiedData[index];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: item.mainField ?? item.id,
          position: getItemPos(index)
        }
      )
    );
  };
  const handleCancel = (index) => {
    const item = relationsFromModifiedData[index];
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: item.mainField ?? item.id
        }
      )
    );
  };
  if (!isFieldAllowed && isCreatingEntry || !isCreatingEntry && !isFieldAllowed && !isFieldReadable) {
    return /* @__PURE__ */ jsx(NotAllowedInput, { name, intlLabel, labelAction });
  }
  const browserRelationsCount = relationsFromModifiedData.length;
  const serverRelationsCount = (get(initialData, initialDataPath) ?? []).length;
  const realServerRelationsCount = relations.data?.pages[0]?.pagination?.total ?? 0;
  const totalRelations = !relations.data && browserRelationsCount === serverRelationsCount ? browserRelationsCount : browserRelationsCount - serverRelationsCount + realServerRelationsCount;
  return /* @__PURE__ */ jsx(
    RelationInput,
    {
      error,
      canReorder: !toOneRelation,
      description,
      disabled: isDisabled,
      iconButtonAriaLabel: formatMessage({
        id: getTranslation("components.RelationInput.icon-button-aria-label"),
        defaultMessage: "Drag"
      }),
      id: name,
      label: `${formatMessage({
        id: intlLabel.id,
        defaultMessage: intlLabel.defaultMessage
      })} ${totalRelations > 0 ? `(${totalRelations})` : ""}`,
      labelAction,
      labelLoadMore: !isCreatingEntry || isCloningEntry ? formatMessage({
        id: getTranslation("relation.loadMore"),
        defaultMessage: "Load More"
      }) : void 0,
      labelDisconnectRelation: formatMessage({
        id: getTranslation("relation.disconnect"),
        defaultMessage: "Remove"
      }),
      listAriaDescription: formatMessage({
        id: getTranslation("dnd.instructions"),
        defaultMessage: `Press spacebar to grab and re-order`
      }),
      liveText,
      loadingMessage: formatMessage({
        id: getTranslation("relation.isLoading"),
        defaultMessage: "Relations are loading"
      }),
      name,
      noRelationsMessage: formatMessage({
        id: getTranslation("relation.notAvailable"),
        defaultMessage: "No relations available"
      }),
      numberOfRelationsToDisplay: RELATIONS_TO_DISPLAY,
      onDropItem: handleDropItem,
      onGrabItem: handleGrabItem,
      onCancel: handleCancel,
      onRelationConnect: handleRelationConnect,
      onRelationDisconnect: handleRelationDisconnect,
      onRelationLoadMore: handleRelationLoadMore,
      onRelationReorder: handleRelationReorder,
      onSearch: (term) => handleSearch(term),
      onSearchNextPage: () => handleSearchMore(),
      placeholder: formatMessage(
        placeholder || {
          id: getTranslation("relation.add"),
          defaultMessage: "Add relation"
        }
      ),
      publicationStateTranslations: {
        [PUBLICATION_STATES.DRAFT]: formatMessage({
          id: getTranslation("relation.publicationState.draft"),
          defaultMessage: "Draft"
        }),
        [PUBLICATION_STATES.PUBLISHED]: formatMessage({
          id: getTranslation("relation.publicationState.published"),
          defaultMessage: "Published"
        })
      },
      relations: pick$1(
        { ...relations, data: relationsFromModifiedData },
        "data",
        "hasNextPage",
        "isFetchingNextPage",
        "isLoading",
        "isSuccess"
      ),
      required,
      searchResults: normalizeSearchResults(search, {
        mainFieldName: mainField.name
      }),
      size: size2
    }
  );
};
const RelationDragPreview = ({ status, displayedValue, width }) => {
  const { formatMessage } = useIntl();
  const stateMessage = {
    [PUBLICATION_STATES.DRAFT]: formatMessage({
      id: getTranslation("relation.publicationState.draft"),
      defaultMessage: "Draft"
    }),
    [PUBLICATION_STATES.PUBLISHED]: formatMessage({
      id: getTranslation("relation.publicationState.published"),
      defaultMessage: "Published"
    })
  };
  const statusColor = status === PUBLICATION_STATES.DRAFT ? "secondary" : "success";
  return /* @__PURE__ */ jsx(Box, { style: { width }, children: /* @__PURE__ */ jsxs(
    Flex,
    {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingRight: 4,
      hasRadius: true,
      borderWidth: 1,
      background: "neutral0",
      borderColor: "neutral200",
      justifyContent: "space-between",
      children: [
        /* @__PURE__ */ jsxs(FlexWrapper, { gap: 1, children: [
          /* @__PURE__ */ jsx(IconButton, { "aria-label": "", borderWidth: 0, children: /* @__PURE__ */ jsx(Drag, {}) }),
          /* @__PURE__ */ jsxs(ChildrenWrapper, { maxWidth: "100%", justifyContent: "space-between", children: [
            /* @__PURE__ */ jsx(Box, { minWidth: 0, paddingTop: 1, paddingBottom: 1, paddingRight: 4, children: /* @__PURE__ */ jsx(LinkEllipsis, { href: "", children: /* @__PURE__ */ jsx(Typography, { textColor: "primary600", ellipsis: true, children: displayedValue }) }) }),
            status && /* @__PURE__ */ jsx(Status, { variant: statusColor, showBullet: false, size: "S", children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: `${statusColor}700`, children: stateMessage[status] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Box, { paddingLeft: 4, children: /* @__PURE__ */ jsx(DisconnectButton, { type: "button", children: /* @__PURE__ */ jsx(Icon, { width: "12px", as: Cross }) }) })
      ]
    }
  ) });
};
const LeftMenu = () => {
  const [search, setSearch] = React.useState("");
  const { formatMessage, locale } = useIntl();
  const collectionTypeLinks = useTypedSelector(
    (state) => state["content-manager_app"].collectionTypeLinks
  );
  const singleTypeLinks = useTypedSelector((state) => state["content-manager_app"].singleTypeLinks);
  const { startsWith } = useFilter(locale, {
    sensitivity: "base"
  });
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const menu = React.useMemo(
    () => [
      {
        id: "collectionTypes",
        title: formatMessage({
          id: getTranslation("components.LeftMenu.collection-types"),
          defaultMessage: "Collection Types"
        }),
        searchable: true,
        links: collectionTypeLinks
      },
      {
        id: "singleTypes",
        title: formatMessage({
          id: getTranslation("components.LeftMenu.single-types"),
          defaultMessage: "Single Types"
        }),
        searchable: true,
        links: singleTypeLinks
      }
    ].map((section) => ({
      ...section,
      links: section.links.filter((link) => startsWith(link.title, search)).sort((a, b) => formatter.compare(a.title, b.title)).map((link) => {
        return {
          ...link,
          title: formatMessage({ id: link.title, defaultMessage: link.title })
        };
      })
    })),
    [collectionTypeLinks, search, singleTypeLinks, startsWith, formatMessage, formatter]
  );
  const handleClear = () => {
    setSearch("");
  };
  const handleChangeSearch = ({ target: { value } }) => {
    setSearch(value);
  };
  const label = formatMessage({
    id: getTranslation("header.name"),
    defaultMessage: "Content"
  });
  return /* @__PURE__ */ jsxs(SubNav, { ariaLabel: label, children: [
    /* @__PURE__ */ jsx(
      SubNavHeader,
      {
        label,
        searchable: true,
        value: search,
        onChange: handleChangeSearch,
        onClear: handleClear,
        searchLabel: formatMessage({
          id: "content-manager.components.LeftMenu.Search.label",
          defaultMessage: "Search for a content type"
        })
      }
    ),
    /* @__PURE__ */ jsx(SubNavSections, { children: menu.map((section) => {
      return /* @__PURE__ */ jsx(
        SubNavSection,
        {
          label: section.title,
          badgeLabel: section.links.length.toString(),
          children: section.links.map((link) => {
            const search2 = link.search ? `?${link.search}` : "";
            return (
              // @ts-expect-error – DS inference does not work with the `as` prop.
              /* @__PURE__ */ jsx(SubNavLink, { as: NavLink, to: `${link.to}${search2}`, children: link.title }, link.uid)
            );
          })
        },
        section.id
      );
    }) })
  ] });
};
const ModelsContext = React.createContext({
  refetchData: () => Promise.resolve()
});
const { MUTATE_COLLECTION_TYPES_LINKS: MUTATE_COLLECTION_TYPES_LINKS$1, MUTATE_SINGLE_TYPES_LINKS: MUTATE_SINGLE_TYPES_LINKS$1 } = HOOKS;
const useContentManagerInitData = () => {
  const dispatch = useTypedDispatch();
  const toggleNotification = useNotification();
  const state = useTypedSelector((state2) => state2["content-manager_app"]);
  const { allPermissions } = useRBACProvider();
  const { runHookWaterfall } = useStrapiApp();
  const { notifyStatus } = useNotifyAT();
  const { formatMessage } = useIntl();
  const { get: get2 } = useFetchClient();
  const fetchDataRef = useRef(async () => {
    dispatch({
      type: "ContentManager/App/GET_INIT_DATA"
    });
    try {
      const {
        data: {
          data: { components, contentTypes: models, fieldSizes }
        }
      } = await get2("/content-manager/init");
      notifyStatus(
        formatMessage({
          id: getTranslation("App.schemas.data-loaded"),
          defaultMessage: "The schemas have been successfully loaded."
        })
      );
      const {
        data: { data: contentTypeConfigurations }
      } = await get2(
        "/content-manager/content-types-settings"
      );
      const { collectionType: collectionTypeLinks, singleType: singleTypeLinks } = models.reduce(
        (acc, model) => {
          acc[model.kind].push(model);
          return acc;
        },
        {
          collectionType: [],
          singleType: []
        }
      );
      const collectionTypeSectionLinks = generateLinks(
        collectionTypeLinks,
        "collectionTypes",
        contentTypeConfigurations
      );
      const singleTypeSectionLinks = generateLinks(singleTypeLinks, "singleTypes");
      const collectionTypeLinksPermissions = await Promise.all(
        collectionTypeSectionLinks.map(
          ({ permissions: permissions2 }) => hasPermissions(allPermissions, permissions2)
        )
      );
      const authorizedCollectionTypeLinks = collectionTypeSectionLinks.filter(
        (_, index) => collectionTypeLinksPermissions[index]
      );
      const singleTypeLinksPermissions = await Promise.all(
        singleTypeSectionLinks.map(({ permissions: permissions2 }) => hasPermissions(allPermissions, permissions2))
      );
      const authorizedSingleTypeLinks = singleTypeSectionLinks.filter(
        (_, index) => singleTypeLinksPermissions[index]
      );
      const { ctLinks } = runHookWaterfall(MUTATE_COLLECTION_TYPES_LINKS$1, {
        ctLinks: authorizedCollectionTypeLinks,
        models
      });
      const { stLinks } = runHookWaterfall(MUTATE_SINGLE_TYPES_LINKS$1, {
        stLinks: authorizedSingleTypeLinks,
        models
      });
      dispatch({
        type: "ContentManager/App/SET_INIT_DATA",
        data: {
          authorizedCollectionTypeLinks: ctLinks,
          authorizedSingleTypeLinks: stLinks,
          contentTypeSchemas: models,
          components,
          fieldSizes
        }
      });
    } catch (err) {
      console.error(err);
      toggleNotification({ type: "warning", message: { id: "notification.error" } });
    }
  });
  useEffect(() => {
    fetchDataRef.current();
    return () => {
      dispatch({
        type: "ContentManager/App/RESET_INIT_DATA"
      });
    };
  }, [dispatch, toggleNotification]);
  return { ...state, refetchData: fetchDataRef.current };
};
const generateLinks = (links, type, configurations = []) => {
  return links.filter((link) => link.isDisplayed).map((link) => {
    const collectionTypesPermissions = [
      { action: "plugin::content-manager.explorer.create", subject: link.uid },
      { action: "plugin::content-manager.explorer.read", subject: link.uid }
    ];
    const singleTypesPermissions = [
      { action: "plugin::content-manager.explorer.read", subject: link.uid }
    ];
    const permissions2 = type === "collectionTypes" ? collectionTypesPermissions : singleTypesPermissions;
    const currentContentTypeConfig = configurations.find(({ uid }) => uid === link.uid);
    let search = null;
    if (currentContentTypeConfig) {
      const searchParams = {
        page: 1,
        pageSize: currentContentTypeConfig.settings.pageSize,
        sort: `${currentContentTypeConfig.settings.defaultSortBy}:${currentContentTypeConfig.settings.defaultSortOrder}`
      };
      search = stringify(searchParams, { encode: false });
    }
    return {
      permissions: permissions2,
      search,
      kind: link.kind,
      title: link.info.displayName,
      to: `/content-manager/${link.kind}/${link.uid}`,
      uid: link.uid,
      // Used for the list item key in the helper plugin
      name: link.uid,
      isDisplayed: link.isDisplayed
    };
  });
};
const mergeMetasWithSchema = (data, schemas, mainSchemaKey) => {
  const findSchema = (uid2) => schemas.find((obj) => obj.uid === uid2);
  const merged = Object.assign({}, data);
  const { uid } = data[mainSchemaKey];
  const schema = findSchema(uid);
  merged[mainSchemaKey] = merge({}, schema, data[mainSchemaKey]);
  Object.keys(data.components).forEach((compoUID) => {
    const compoSchema = findSchema(compoUID);
    merged.components[compoUID] = {
      ...data.components[compoUID],
      ...compoSchema
    };
  });
  return merged;
};
const getRelationModel = (targetModel, models) => models.find((model) => model.uid === targetModel);
const formatLayouts = (initialData, models) => {
  const data = createMetasSchema(initialData, models);
  const contentType = {
    ...data.contentType,
    layouts: {
      ...data.contentType.layouts,
      edit: formatLayoutWithMetas(data.contentType, models),
      list: formatListLayoutWithMetas(data.contentType, data.components)
    }
  };
  const components = Object.keys(data.components).reduce(
    (acc, componentUid) => {
      const formattedComponentEditLayout = formatLayoutWithMetas(
        data.components[componentUid],
        models
      );
      acc[componentUid] = {
        ...data.components[componentUid],
        layouts: {
          ...data.components[componentUid].layouts,
          edit: formattedComponentEditLayout
        }
      };
      return acc;
    },
    {}
  );
  return {
    contentType,
    components
  };
};
const createMetasSchema = (initialData, models) => {
  const data = mergeMetasWithSchema(cloneDeep(initialData), models, "contentType");
  const { components, contentType } = data;
  const formatMetadatas = (targetSchema) => {
    return Object.keys(targetSchema.metadatas).reduce((acc, current) => {
      const schema = targetSchema.attributes[current] ?? {};
      let metadatas = targetSchema.metadatas[current];
      if (schema.type === "relation" && "target" in schema) {
        const relationModel = getRelationModel(schema.target, models);
        const mainFieldName = metadatas.edit.mainField;
        const mainField = {
          name: mainFieldName,
          schema: relationModel.attributes[mainFieldName]
        };
        metadatas = {
          list: {
            ...metadatas.list,
            mainField
          },
          edit: {
            ...metadatas.edit,
            mainField
          }
        };
      }
      acc[current] = metadatas;
      return acc;
    }, {});
  };
  data.contentType.metadatas = formatMetadatas(contentType);
  Object.keys(components).forEach((compoUID) => {
    data.components[compoUID].metadatas = formatMetadatas(components[compoUID]);
  });
  return data;
};
const formatLayoutWithMetas = (contentTypeConfiguration, models) => contentTypeConfiguration.layouts.edit.reduce((acc, current) => {
  const row = current.map((attribute) => {
    const fieldSchema = contentTypeConfiguration.attributes[attribute.name] ?? {};
    const data = {
      ...attribute,
      fieldSchema,
      metadatas: contentTypeConfiguration.metadatas[attribute.name].edit ?? {}
    };
    if (fieldSchema.type === "relation") {
      const targetModelSchema = getRelationModel(fieldSchema.target, models);
      const targetModelPluginOptions = targetModelSchema.pluginOptions || {};
      data.targetModelPluginOptions = targetModelPluginOptions;
      data.queryInfos = {
        shouldDisplayRelationLink: shouldDisplayRelationLink(
          contentTypeConfiguration,
          attribute.name,
          models
        )
      };
    }
    return data;
  });
  acc.push(row);
  return acc;
}, []);
const formatListLayoutWithMetas = (contentTypeConfiguration, components) => {
  const formatted = contentTypeConfiguration.layouts.list.reduce(
    (acc, current) => {
      const fieldSchema = contentTypeConfiguration.attributes[current] ?? {};
      const metadatas = contentTypeConfiguration.metadatas[current].list ?? {};
      if (fieldSchema.type === "component") {
        const component = components[fieldSchema.component];
        const mainFieldName = component.settings.mainField;
        const mainFieldAttribute = component.attributes[mainFieldName];
        acc.push({
          key: `__${current}_key__`,
          name: current,
          fieldSchema,
          metadatas: {
            ...metadatas,
            mainField: {
              ...mainFieldAttribute,
              name: mainFieldName
            }
          }
        });
        return acc;
      }
      acc.push({ key: `__${current}_key__`, name: current, fieldSchema, metadatas });
      return acc;
    },
    []
  );
  return formatted;
};
const shouldDisplayRelationLink = (contentTypeConfiguration, fieldName, models) => {
  const targetModel = contentTypeConfiguration.attributes[fieldName].targetModel ?? "";
  return models.some((model) => model.uid === targetModel && model.isDisplayed);
};
const formatLayoutForSettingsView = ({
  layouts,
  metadatas,
  ...rest
}) => {
  return {
    ...rest,
    layouts: {
      edit: layouts.edit.map(
        (row) => row.map(({ name, size: size2 }) => ({
          name,
          size: size2
        }))
      ),
      list: layouts.list.map((obj) => {
        if (typeof obj === "object" && "name" in obj) {
          return obj.name;
        }
        return obj;
      })
    },
    metadatas: Object.keys(metadatas).reduce(
      (acc, current) => {
        const currentMetadatas = metadatas[current] ?? {};
        if (currentMetadatas.edit.mainField) {
          return {
            ...acc,
            [current]: {
              edit: {
                ...currentMetadatas.edit,
                mainField: currentMetadatas.edit.mainField.name
              },
              list: omit(currentMetadatas.list, ["mainField"])
            }
          };
        } else {
          return {
            ...acc,
            [current]: {
              edit: currentMetadatas.edit,
              list: omit(currentMetadatas.list, ["mainField"])
            }
          };
        }
      },
      {}
    )
  };
};
const useContentTypeLayout$1 = (contentTypeUID) => {
  const schemas = useTypedSelector(selectSchemas);
  const { get: get2 } = useFetchClient();
  const { data, isLoading, refetch } = useQuery(
    ["content-manager", "content-types", contentTypeUID, "configuration"],
    async () => {
      const {
        data: { data: data2 }
      } = await get2(
        `/content-manager/content-types/${contentTypeUID}/configuration`
      );
      return data2;
    }
  );
  const layout = React.useMemo(() => data ? formatLayouts(data, schemas) : null, [data, schemas]);
  return {
    isLoading,
    layout,
    updateLayout: refetch
  };
};
const LayoutDndContext = React__default.createContext();
function LayoutDndProvider({
  attributes,
  buttonData,
  children,
  goTo,
  layout,
  metadatas,
  moveItem,
  moveRow,
  onAddData,
  relationsLayout,
  removeField,
  selectedItemName,
  setEditFieldToSelect,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    LayoutDndContext.Provider,
    {
      value: {
        attributes,
        buttonData,
        goTo,
        layout,
        metadatas,
        moveItem,
        moveRow,
        onAddData,
        relationsLayout,
        removeField,
        selectedItemName,
        setEditFieldToSelect,
        ...rest
      },
      children
    }
  );
}
LayoutDndProvider.defaultProps = {
  attributes: {},
  buttonData: [],
  goTo() {
  },
  layout: [],
  metadatas: {},
  moveItem() {
  },
  moveRow() {
  },
  onAddData() {
  },
  relationsLayout: [],
  removeField() {
  },
  selectedItemName: null,
  setEditFieldToSelect() {
  }
};
LayoutDndProvider.propTypes = {
  attributes: PropTypes.object,
  buttonData: PropTypes.array,
  children: PropTypes.node.isRequired,
  goTo: PropTypes.func,
  layout: PropTypes.array,
  metadatas: PropTypes.object,
  moveItem: PropTypes.func,
  moveRow: PropTypes.func,
  onAddData: PropTypes.func,
  relationsLayout: PropTypes.array,
  removeField: PropTypes.func,
  selectedItemName: PropTypes.string,
  setEditFieldToSelect: PropTypes.func
};
function useLayoutDnd() {
  return React.useContext(LayoutDndContext);
}
const permissions = [{ action: "plugin::content-type-builder.read", subject: null }];
const LinkToCTB = () => {
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { slug, modifiedData, isContentTypeView } = useLayoutDnd();
  const type = isContentTypeView ? "content-types" : "components";
  const baseUrl = `/plugins/content-type-builder/${type === "content-types" ? type : "component-categories"}`;
  const category = get(modifiedData, "category", "");
  const suffixUrl = type === "content-types" ? slug : `${category}/${slug}`;
  const handleClick = () => {
    trackUsage("willEditEditLayout");
  };
  if (slug === "strapi::administrator") {
    return null;
  }
  return /* @__PURE__ */ jsx(CheckPermissions, { permissions, children: /* @__PURE__ */ jsx(
    LinkButton$2,
    {
      to: `${baseUrl}/${suffixUrl}`,
      onClick: handleClick,
      size: "S",
      startIcon: /* @__PURE__ */ jsx(Pencil, {}),
      variant: "secondary",
      children: formatMessage({
        id: getTranslation(`edit-settings-view.link-to-ctb.${type}`),
        defaultMessage: "Edit the content type"
      })
    }
  ) });
};
const ComponentFieldList = ({ componentUid }) => {
  const { componentLayouts } = useLayoutDnd();
  const { formatMessage } = useIntl();
  const componentData = get(componentLayouts, [componentUid], {});
  const componentLayout = get(componentData, ["layouts", "edit"], []);
  return /* @__PURE__ */ jsxs(Box, { padding: 3, children: [
    componentLayout.map((row, index) => (
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ jsx(Grid$1, { gap: 4, children: row.map((rowContent) => /* @__PURE__ */ jsx(GridItem, { col: rowContent.size, children: /* @__PURE__ */ jsx(Box, { paddingTop: 2, children: /* @__PURE__ */ jsx(
        Flex,
        {
          alignItems: "center",
          background: "neutral0",
          paddingLeft: 3,
          paddingRight: 3,
          height: `${32 / 16}rem`,
          hasRadius: true,
          borderColor: "neutral200",
          children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: rowContent.name })
        }
      ) }) }, rowContent.name)) }, index)
    )),
    /* @__PURE__ */ jsx(Box, { paddingTop: 2, children: /* @__PURE__ */ jsx(
      Link$3,
      {
        startIcon: /* @__PURE__ */ jsx(Cog, {}),
        to: `/content-manager/components/${componentUid}/configurations/edit`,
        children: formatMessage({
          id: getTranslation("components.FieldItem.linkToComponentLayout"),
          defaultMessage: "Set the component's layout"
        })
      }
    ) })
  ] });
};
ComponentFieldList.propTypes = {
  componentUid: PropTypes.string.isRequired
};
const ComponentIcon = ({ showBackground = true, icon = "cube" }) => {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      alignItems: "center",
      background: showBackground ? "neutral200" : void 0,
      justifyContent: "center",
      height: 8,
      width: 8,
      color: "neutral600",
      borderRadius: showBackground ? "50%" : 0,
      children: /* @__PURE__ */ jsx(
        Icon,
        {
          as: COMPONENT_ICONS[icon] || COMPONENT_ICONS.cube,
          height: 5,
          width: 5
        }
      )
    }
  );
};
const COMPONENT_ICONS = {
  alien: Icons.Alien,
  apps: Icons.Apps,
  archive: Icons.Archive,
  arrowDown: Icons.ArrowDown,
  arrowLeft: Icons.ArrowLeft,
  arrowRight: Icons.ArrowRight,
  arrowUp: Icons.ArrowUp,
  attachment: Icons.Attachment,
  bell: Icons.Bell,
  bold: Icons.Bold,
  book: Icons.Book,
  briefcase: Icons.Briefcase,
  brush: Icons.Brush,
  bulletList: Icons.BulletList,
  calendar: Icons.Calendar,
  car: Icons.Car,
  cast: Icons.Cast,
  chartBubble: Icons.ChartBubble,
  chartCircle: Icons.ChartCircle,
  chartPie: Icons.ChartPie,
  check: Icons.Check,
  clock: Icons.Clock,
  cloud: Icons.Cloud,
  code: Icons.Code,
  cog: Icons.Cog,
  collapse: Icons.Collapse,
  command: Icons.Command,
  connector: Icons.Connector,
  crop: Icons.Crop,
  crown: Icons.Crown,
  cube: Icons.Cube,
  cup: Icons.Cup,
  cursor: Icons.Cursor,
  dashboard: Icons.Dashboard,
  database: Icons.Database,
  discuss: Icons.Discuss,
  doctor: Icons.Doctor,
  earth: Icons.Earth,
  emotionHappy: Icons.EmotionHappy,
  emotionUnhappy: Icons.EmotionUnhappy,
  envelop: Icons.Envelop,
  exit: Icons.Exit,
  expand: Icons.Expand,
  eye: Icons.Eye,
  feather: Icons.Feather,
  file: Icons.File,
  fileError: Icons.FileError,
  filePdf: Icons.FilePdf,
  filter: Icons.Filter,
  folder: Icons.Folder,
  gate: Icons.Gate,
  gift: Icons.Gift,
  globe: Icons.Globe,
  grid: Icons.Grid,
  handHeart: Icons.HandHeart,
  hashtag: Icons.Hashtag,
  headphone: Icons.Headphone,
  heart: Icons.Heart,
  house: Icons.House,
  information: Icons.Information,
  italic: Icons.Italic,
  key: Icons.Key,
  landscape: Icons.Landscape,
  layer: Icons.Layer,
  layout: Icons.Layout,
  lightbulb: Icons.Lightbulb,
  link: Icons.Link,
  lock: Icons.Lock,
  magic: Icons.Magic,
  manyToMany: Icons.ManyToMany,
  manyToOne: Icons.ManyToOne,
  manyWays: Icons.ManyWays,
  medium: Icons.Medium,
  message: Icons.Message,
  microphone: Icons.Microphone,
  monitor: Icons.Monitor,
  moon: Icons.Moon,
  music: Icons.Music,
  oneToMany: Icons.OneToMany,
  oneToOne: Icons.OneToOne,
  oneWay: Icons.OneWay,
  paint: Icons.Paint,
  paintBrush: Icons.PaintBrush,
  paperPlane: Icons.PaperPlane,
  pencil: Icons.Pencil,
  phone: Icons.Phone,
  picture: Icons.Picture,
  pin: Icons.Pin,
  pinMap: Icons.PinMap,
  plane: Icons.Plane,
  play: Icons.Play,
  plus: Icons.Plus,
  priceTag: Icons.PriceTag,
  puzzle: Icons.Puzzle,
  question: Icons.Question,
  quote: Icons.Quote,
  refresh: Icons.Refresh,
  repeat: Icons.Repeat,
  restaurant: Icons.Restaurant,
  rocket: Icons.Rocket,
  rotate: Icons.Rotate,
  scissors: Icons.Scissors,
  search: Icons.Search,
  seed: Icons.Seed,
  server: Icons.Server,
  shield: Icons.Shield,
  shirt: Icons.Shirt,
  shoppingCart: Icons.ShoppingCart,
  slideshow: Icons.Slideshow,
  stack: Icons.Stack,
  star: Icons.Star,
  store: Icons.Store,
  strikeThrough: Icons.StrikeThrough,
  sun: Icons.Sun,
  television: Icons.Television,
  thumbDown: Icons.ThumbDown,
  thumbUp: Icons.ThumbUp,
  train: Icons.Train,
  twitter: Icons.Twitter,
  typhoon: Icons.Typhoon,
  underline: Icons.Underline,
  user: Icons.User,
  volumeMute: Icons.VolumeMute,
  volumeUp: Icons.VolumeUp,
  walk: Icons.Walk,
  wheelchair: Icons.Wheelchair,
  write: Icons.Write
};
const CustomLink = styled(Flex)`
  text-decoration: none;

  &:focus,
  &:hover {
    ${({ theme }) => `
      background-color: ${theme.colors.primary100};
      border-color: ${theme.colors.primary200};

      ${Typography} {
          color: ${theme.colors.primary600};
      }
    `}

    /* > ComponentIcon */
    > div:first-child {
      background: ${({ theme }) => theme.colors.primary200};
      color: ${({ theme }) => theme.colors.primary600};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary600};
        }
      }
    }
  }
`;
const DynamicZoneList = ({ components }) => {
  const { componentLayouts } = useLayoutDnd();
  return /* @__PURE__ */ jsx(Flex, { gap: 2, overflow: "scroll hidden", padding: 3, children: components.map((componentUid) => /* @__PURE__ */ jsxs(
    CustomLink,
    {
      hasRadius: true,
      background: "neutral0",
      justifyContent: "center",
      alignItems: "center",
      height: `${84 / 16}rem`,
      minWidth: `${140 / 16}rem`,
      padding: 2,
      direction: "column",
      borderColor: "neutral200",
      as: Link$4,
      to: `/content-manager/components/${componentUid}/configurations/edit`,
      children: [
        /* @__PURE__ */ jsx(ComponentIcon, { icon: componentLayouts?.[componentUid]?.info?.icon }),
        /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(Typography, { fontSize: 1, textColor: "neutral600", fontWeight: "bold", children: componentLayouts?.[componentUid]?.info?.displayName ?? "" }) })
      ]
    },
    componentUid
  )) });
};
DynamicZoneList.propTypes = {
  components: PropTypes.arrayOf(PropTypes.string).isRequired
};
const CustomIconButton$2 = styled(IconButton)`
  background-color: transparent;
  path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const FieldButtonContent = ({ attribute, onEditField, onDeleteField, children }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Box, { overflow: "hidden", width: "100%", children: [
    /* @__PURE__ */ jsxs(Flex, { paddingLeft: 3, alignItems: "center", justifyContent: "space-between", children: [
      /* @__PURE__ */ jsx(Typography, { fontWeight: "semiBold", textColor: "neutral800", ellipsis: true, children }),
      /* @__PURE__ */ jsxs(Flex, { children: [
        /* @__PURE__ */ jsx(
          CustomIconButton$2,
          {
            label: formatMessage(
              {
                id: getTranslation("containers.ListSettingsView.modal-form.edit-label"),
                defaultMessage: `Edit {fieldName}`
              },
              { fieldName: children }
            ),
            onClick: onEditField,
            icon: /* @__PURE__ */ jsx(Pencil, {}),
            noBorder: true
          }
        ),
        /* @__PURE__ */ jsx(
          CustomIconButton$2,
          {
            label: formatMessage(
              {
                id: "global.delete-target",
                defaultMessage: `Delete {target}`
              },
              {
                target: children
              }
            ),
            "data-testid": "delete-field",
            onClick: onDeleteField,
            icon: /* @__PURE__ */ jsx(Trash, {}),
            noBorder: true
          }
        )
      ] })
    ] }),
    attribute?.type === "component" && /* @__PURE__ */ jsx(ComponentFieldList, { componentUid: attribute.component }),
    attribute?.type === "dynamiczone" && /* @__PURE__ */ jsx(DynamicZoneList, { components: attribute.components })
  ] });
};
FieldButtonContent.defaultProps = {
  attribute: void 0
};
FieldButtonContent.propTypes = {
  attribute: PropTypes.shape({
    components: PropTypes.array,
    component: PropTypes.string,
    type: PropTypes.string
  }),
  onEditField: PropTypes.func.isRequired,
  onDeleteField: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};
const Wrapper$2 = styled(Flex)`
  position: relative;
  ${({ isFirst, isLast, hasHorizontalPadding }) => {
  if (isFirst) {
    return `
        padding-right: 4px;
      `;
  }
  if (isLast) {
    return `
        padding-left: 4px;
      `;
  }
  if (hasHorizontalPadding) {
    return `
        padding: 0 4px;
      `;
  }
  return "";
}}
  ${({ showRightCarret, showLeftCarret, theme }) => {
  if (showRightCarret) {
    return `
        &:after {
          content: '';
          position: absolute;
          right: -1px;
          background-color: ${theme.colors.primary600};
          width: 2px;
          height: 100%;
          align-self: stretch;
          z-index: 1;
        }
      `;
  }
  if (showLeftCarret) {
    return `
        &:before {
          content: '';
          position: absolute;
          left: -1px;
          background-color: ${theme.colors.primary600};
          width: 2px;
          height: 100%;
          align-self: stretch;
          z-index: 1;
        }
      `;
  }
  return "";
}};
`;
const CustomDragIcon = styled(Drag)`
  height: ${12 / 16}rem;
  width: ${12 / 16}rem;
  path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const CustomFlex = styled(Flex)`
  display: ${({ dragStart }) => dragStart ? "none" : "flex"};
  opacity: ${({ isDragging, isFullSize, isHidden }) => {
  if (isDragging && !isFullSize) {
    return 0.2;
  }
  if (isDragging && isFullSize || isHidden) {
    return 0;
  }
  return 1;
}};
`;
const DragButton$1 = styled(Flex)`
  cursor: all-scroll;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
`;
const DisplayedFieldButton = ({
  attribute,
  children,
  index,
  lastIndex,
  moveItem,
  moveRow,
  name,
  onDeleteField,
  onEditField,
  rowIndex,
  size: size2
}) => {
  const [dragStart, setDragStart] = useState(false);
  const isHidden = name === "_TEMP_";
  const { setIsDraggingSibling } = useLayoutDnd();
  const isFullSize = size2 === 12;
  const dragRef = useRef(null);
  const dropRef = useRef(null);
  const [{ clientOffset, isOver }, drop] = useDrop({
    accept: ItemTypes.EDIT_FIELD,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      if (item.size !== 12) {
        return;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = index;
      const dragRow = monitor.getItem().rowIndex;
      const targetRow = rowIndex;
      if (dragIndex === hoverIndex && dragRow === targetRow) {
        return;
      }
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset2 = monitor.getClientOffset();
      const hoverClientY = clientOffset2.y - hoverBoundingRect.top;
      if (dragRow < targetRow && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragRow > targetRow && hoverClientY > hoverMiddleY) {
        return;
      }
      moveRow(dragRow, targetRow);
      item.rowIndex = targetRow;
      item.itemIndex = hoverIndex;
    },
    drop(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = index;
      const dragRow = monitor.getItem().rowIndex;
      const targetRow = rowIndex;
      if (item.size === 12) {
        return;
      }
      if (dragIndex === hoverIndex && dragRow === targetRow) {
        return;
      }
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      if (Math.abs(monitor.getClientOffset().x - hoverBoundingRect.left) > hoverBoundingRect.width / 1.8) {
        moveItem(dragIndex, hoverIndex + 1, dragRow, targetRow);
        item.itemIndex = hoverIndex + 1;
        item.rowIndex = targetRow;
        return;
      }
      moveItem(dragIndex, hoverIndex, dragRow, targetRow);
      item.itemIndex = hoverIndex;
      item.rowIndex = targetRow;
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      clientOffset: monitor.getClientOffset(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      itemType: monitor.getItemType()
    })
  });
  const [{ isDragging, getItem }, drag, dragPreview] = useDrag({
    type: ItemTypes.EDIT_FIELD,
    item() {
      setIsDraggingSibling(true);
      return {
        index,
        labelField: children,
        rowIndex,
        name,
        size: size2
      };
    },
    canDrag() {
      return name !== "_TEMP_";
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      getItem: monitor.getItem()
    }),
    end() {
      setIsDraggingSibling(false);
    }
  });
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);
  const refs = {
    dragRef: drag(dragRef),
    dropRef: drop(dropRef)
  };
  let showLeftCarret = false;
  let showRightCarret = false;
  if (dropRef.current && clientOffset) {
    const hoverBoundingRect = dropRef.current.getBoundingClientRect();
    showLeftCarret = isOver && getItem.size !== 12 && Math.abs(clientOffset.x - hoverBoundingRect.left) < hoverBoundingRect.width / 2;
    showRightCarret = isOver && getItem.size !== 12 && Math.abs(clientOffset.x - hoverBoundingRect.left) > hoverBoundingRect.width / 2;
    if (name === "_TEMP_") {
      showLeftCarret = isOver && getItem.size !== 12;
      showRightCarret = false;
    }
  }
  const getHeight = () => {
    if (attribute && isFullSize) {
      return `${74 / 16}rem`;
    }
    return `${32 / 16}rem`;
  };
  const isFirst = index === 0 && !isFullSize;
  const isLast = index === lastIndex && !isFullSize;
  const hasHorizontalPadding = index !== 0 && !isFullSize;
  return /* @__PURE__ */ jsx(GridItem, { col: size2, children: /* @__PURE__ */ jsxs(
    Wrapper$2,
    {
      ref: refs.dropRef,
      showLeftCarret,
      showRightCarret,
      isFirst,
      isLast,
      hasHorizontalPadding,
      onDrag: () => {
        if (isFullSize && !dragStart) {
          setDragStart(true);
        }
      },
      onDragEnd: () => {
        if (isFullSize) {
          setDragStart(false);
        }
      },
      children: [
        dragStart && isFullSize && /* @__PURE__ */ jsx(
          Box,
          {
            width: "100%",
            height: "2px",
            background: "primary600"
          }
        ),
        /* @__PURE__ */ jsxs(
          CustomFlex,
          {
            width: isFullSize && dragStart ? 0 : "100%",
            borderColor: "neutral150",
            hasRadius: true,
            background: "neutral100",
            minHeight: getHeight(),
            alignItems: "stretch",
            isDragging,
            dragStart,
            isFullSize,
            isHidden,
            children: [
              /* @__PURE__ */ jsx(
                DragButton$1,
                {
                  as: "span",
                  type: "button",
                  ref: refs.dragRef,
                  onClick: (e) => e.stopPropagation(),
                  alignItems: "center",
                  paddingLeft: 3,
                  paddingRight: 3,
                  tabIndex: -1,
                  children: /* @__PURE__ */ jsx(CustomDragIcon, {})
                }
              ),
              !isHidden && /* @__PURE__ */ jsx(
                FieldButtonContent,
                {
                  attribute,
                  onEditField,
                  onDeleteField,
                  children
                }
              )
            ]
          }
        )
      ]
    }
  ) });
};
DisplayedFieldButton.defaultProps = {
  attribute: void 0
};
DisplayedFieldButton.propTypes = {
  attribute: PropTypes.shape({
    components: PropTypes.array,
    component: PropTypes.string,
    type: PropTypes.string
  }),
  children: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
  moveRow: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onDeleteField: PropTypes.func.isRequired,
  onEditField: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
  lastIndex: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};
const RowItemsLayout = ({ rowItem, onRemoveField, rowId, rowIndex, index, lastIndex }) => {
  const { setEditFieldToSelect, attributes, modifiedData, moveRow, moveItem } = useLayoutDnd();
  const attribute = get(attributes, [rowItem.name], {});
  const attributeLabel = get(modifiedData, ["metadatas", rowItem.name, "edit", "label"], "");
  return /* @__PURE__ */ jsx(
    DisplayedFieldButton,
    {
      onEditField: () => setEditFieldToSelect(rowItem.name),
      onDeleteField: () => onRemoveField(rowId, index),
      attribute,
      index,
      lastIndex,
      rowIndex,
      name: rowItem.name,
      size: rowItem.size,
      moveRow,
      moveItem,
      children: attributeLabel || rowItem.name
    }
  );
};
RowItemsLayout.propTypes = {
  index: PropTypes.number.isRequired,
  lastIndex: PropTypes.number.isRequired,
  onRemoveField: PropTypes.func.isRequired,
  rowId: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  rowItem: PropTypes.object.isRequired
};
const RowsLayout = ({ row, onRemoveField, rowIndex }) => {
  return /* @__PURE__ */ jsx(Grid$1, { children: row.rowContent.map((rowItem, index) => {
    return /* @__PURE__ */ jsx(
      RowItemsLayout,
      {
        rowItem,
        index,
        rowId: row.rowId,
        onRemoveField,
        rowIndex,
        lastIndex: row.rowContent.length - 1
      },
      rowItem.name
    );
  }) });
};
RowsLayout.propTypes = {
  onRemoveField: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired
};
const DisplayedFields = ({ editLayout, fields, onRemoveField, onAddField }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: formatMessage({
          id: getTranslation("containers.ListPage.displayedFields"),
          defaultMessage: "Displayed fields"
        }) }) }),
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
          id: "containers.SettingPage.editSettings.description",
          defaultMessage: "Drag & drop the fields to build the layout"
        }) }) })
      ] }),
      /* @__PURE__ */ jsx(LinkToCTB, {})
    ] }),
    /* @__PURE__ */ jsx(Box, { padding: 4, hasRadius: true, borderStyle: "dashed", borderWidth: "1px", borderColor: "neutral300", children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
      editLayout.map((row, index) => /* @__PURE__ */ jsx(RowsLayout, { row, rowIndex: index, onRemoveField }, row.rowId)),
      /* @__PURE__ */ jsxs(Menu.Root, { children: [
        /* @__PURE__ */ jsx(
          Menu.Trigger,
          {
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            endIcon: null,
            disabled: fields.length === 0,
            fullWidth: true,
            variant: "secondary",
            children: formatMessage({
              id: getTranslation("containers.SettingPage.add.field"),
              defaultMessage: "Insert another field"
            })
          }
        ),
        /* @__PURE__ */ jsx(Menu.Content, { children: fields.map((field) => /* @__PURE__ */ jsx(Menu.Item, { onSelect: () => onAddField(field), children: field }, field)) })
      ] })
    ] }) })
  ] });
};
DisplayedFields.propTypes = {
  editLayout: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  onAddField: PropTypes.func.isRequired,
  onRemoveField: PropTypes.func.isRequired
};
const iconByTypes = {
  biginteger: /* @__PURE__ */ jsx(Number$1, {}),
  boolean: /* @__PURE__ */ jsx(Boolean$1, {}),
  date: /* @__PURE__ */ jsx(Date$1, {}),
  datetime: /* @__PURE__ */ jsx(Date$1, {}),
  decimal: /* @__PURE__ */ jsx(Number$1, {}),
  email: /* @__PURE__ */ jsx(Email, {}),
  enum: /* @__PURE__ */ jsx(Enumeration, {}),
  enumeration: /* @__PURE__ */ jsx(Enumeration, {}),
  file: /* @__PURE__ */ jsx(Media$1, {}),
  files: /* @__PURE__ */ jsx(Media$1, {}),
  float: /* @__PURE__ */ jsx(Number$1, {}),
  integer: /* @__PURE__ */ jsx(Number$1, {}),
  media: /* @__PURE__ */ jsx(Media$1, {}),
  number: /* @__PURE__ */ jsx(Number$1, {}),
  relation: /* @__PURE__ */ jsx(Relation, {}),
  string: /* @__PURE__ */ jsx(Text, {}),
  text: /* @__PURE__ */ jsx(Text, {}),
  richtext: /* @__PURE__ */ jsx(Text, {}),
  time: /* @__PURE__ */ jsx(Date$1, {}),
  timestamp: /* @__PURE__ */ jsx(Date$1, {}),
  json: /* @__PURE__ */ jsx(Json, {}),
  uid: /* @__PURE__ */ jsx(Uid, {}),
  component: /* @__PURE__ */ jsx(Component$1, {}),
  dynamiczone: /* @__PURE__ */ jsx(DynamicZone$1, {})
};
const FieldTypeIcon = ({ type, customFieldUid }) => {
  const customFieldsRegistry = useCustomFields();
  let Compo = iconByTypes[type];
  if (customFieldUid) {
    const customField = customFieldsRegistry.get(customFieldUid);
    const CustomFieldIcon = customField.icon;
    if (CustomFieldIcon) {
      Compo = /* @__PURE__ */ jsx(Box, { marginRight: 3, width: 7, height: 6, children: /* @__PURE__ */ jsx(CustomFieldIcon, {}) });
    }
  }
  if (!iconByTypes[type]) {
    return null;
  }
  return Compo;
};
FieldTypeIcon.defaultProps = {
  customFieldUid: null
};
FieldTypeIcon.propTypes = {
  type: PropTypes.string.isRequired,
  customFieldUid: PropTypes.string
};
const createPossibleMainFieldsForModelsAndComponents = (array) => {
  return array.reduce((acc, current) => {
    const attributes = current?.attributes ?? {};
    const possibleMainFields = Object.keys(attributes).filter((attr) => {
      return ![
        "boolean",
        "component",
        "dynamiczone",
        "json",
        "media",
        "password",
        "relation",
        "text",
        "richtext",
        "blocks"
      ].includes(attributes?.[attr]?.type ?? "");
    });
    acc[current.uid] = possibleMainFields;
    return acc;
  }, {});
};
const getInputProps = (fieldName) => {
  let type;
  switch (fieldName) {
    case "description":
    case "label":
    case "placeholder":
      type = "text";
      break;
    case "mainField":
      type = "select";
      break;
    case "editable":
      type = "bool";
      break;
    default:
      type = "";
  }
  const labelId = fieldName === "mainField" ? getTranslation("containers.SettingPage.editSettings.entry.title") : getTranslation(`form.Input.${fieldName}`);
  return { type, label: { id: labelId } };
};
const GenericInput = ({ type, options: options2, onChange, value, name, ...inputProps }) => {
  const { formatMessage } = useIntl();
  switch (type) {
    case "text": {
      return /* @__PURE__ */ jsx(TextInput, { onChange, value, name, ...inputProps });
    }
    case "bool": {
      return /* @__PURE__ */ jsx(
        ToggleInput,
        {
          onChange: (e) => {
            onChange({ target: { name, value: e.target.checked } });
          },
          checked: value,
          name,
          onLabel: formatMessage({
            id: "app.components.ToggleCheckbox.on-label",
            defaultMessage: "On"
          }),
          offLabel: formatMessage({
            id: "app.components.ToggleCheckbox.off-label",
            defaultMessage: "Off"
          }),
          ...inputProps
        }
      );
    }
    case "select": {
      return /* @__PURE__ */ jsx(
        Select,
        {
          value,
          name,
          onChange: (value2) => onChange({ target: { name, value: value2 } }),
          ...inputProps,
          children: options2.map((option) => /* @__PURE__ */ jsx(Option$1, { value: option, children: option }, option))
        }
      );
    }
    default:
      return null;
  }
};
GenericInput.defaultProps = {
  options: void 0
};
GenericInput.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  name: PropTypes.string.isRequired
};
const FIELD_SIZES = [
  [4, "33%"],
  [6, "50%"],
  [8, "66%"],
  [12, "100%"]
];
const ModalForm = ({ onMetaChange, onSizeChange }) => {
  const { formatMessage } = useIntl();
  const { modifiedData, selectedField, attributes, fieldForm } = useLayoutDnd();
  const schemas = useSelector(selectSchemas);
  const fieldSizes = useTypedSelector((state) => state["content-manager_app"].fieldSizes);
  const formToDisplay = useMemo(() => {
    if (!selectedField) {
      return [];
    }
    const associatedMetas = get(modifiedData, ["metadatas", selectedField, "edit"], {});
    return Object.keys(associatedMetas).filter((meta) => meta !== "visible");
  }, [selectedField, modifiedData]);
  const componentsAndModelsPossibleMainFields = useMemo(() => {
    return createPossibleMainFieldsForModelsAndComponents(schemas);
  }, [schemas]);
  const getSelectedItemSelectOptions = useCallback(
    (formType) => {
      if (formType !== "relation" && formType !== "component") {
        return [];
      }
      const targetKey = formType === "component" ? "component" : "targetModel";
      const key = get(modifiedData, ["attributes", selectedField, targetKey], "");
      return get(componentsAndModelsPossibleMainFields, [key], []);
    },
    [selectedField, componentsAndModelsPossibleMainFields, modifiedData]
  );
  const metaFields = formToDisplay.map((meta) => {
    const formType = get(attributes, [selectedField, "type"]);
    if (["component", "dynamiczone"].includes(formType) && !["label", "description"].includes(meta)) {
      return null;
    }
    if (formType === "component" && meta !== "label") {
      return null;
    }
    if (["media", "json", "boolean"].includes(formType) && meta === "placeholder") {
      return null;
    }
    if (meta === "step") {
      return null;
    }
    return /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
      GenericInput,
      {
        type: getInputProps(meta).type,
        hint: meta === "mainField" ? formatMessage({
          id: getTranslation(
            "containers.SettingPage.editSettings.relation-field.description"
          )
        }) : "",
        label: formatMessage({
          id: get(getInputProps(meta), "label.id", "app.utils.defaultMessage")
        }),
        name: meta,
        onChange: onMetaChange,
        value: get(fieldForm, ["metadata", meta], ""),
        options: getSelectedItemSelectOptions(formType)
      }
    ) }, meta);
  });
  const { type, customField } = attributes[selectedField];
  const { isResizable } = fieldSizes[customField] ?? fieldSizes[type];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    metaFields,
    isResizable && /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
      Select,
      {
        value: fieldForm?.size,
        name: "size",
        onChange: (value) => {
          onSizeChange({ name: selectedField, value });
        },
        label: formatMessage({
          id: getTranslation("containers.SettingPage.editSettings.size.label"),
          defaultMessage: "Size"
        }),
        children: FIELD_SIZES.map(([value, label]) => /* @__PURE__ */ jsx(Option$1, { value, children: label }, value))
      }
    ) }, "size")
  ] });
};
ModalForm.propTypes = {
  onMetaChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired
};
const HeaderContainer$1 = styled(Flex)`
  svg {
    width: ${32 / 16}rem;
    height: ${24 / 16}rem;
    margin-right: ${({ theme }) => theme.spaces[3]};
  }
`;
const FormModal = ({ onToggle, onMetaChange, onSizeChange, onSubmit, type, customFieldUid }) => {
  const { selectedField } = useLayoutDnd();
  const { formatMessage } = useIntl();
  const getAttrType = () => {
    if (type === "timestamp") {
      return "date";
    }
    if (["decimal", "float", "integer", "biginter"].includes(type)) {
      return "number";
    }
    return type;
  };
  return /* @__PURE__ */ jsx(ModalLayout, { onClose: onToggle, labelledBy: "title", children: /* @__PURE__ */ jsxs("form", { onSubmit, children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsxs(HeaderContainer$1, { children: [
      /* @__PURE__ */ jsx(FieldTypeIcon, { type: getAttrType(), customFieldUid }),
      /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage(
        {
          id: getTranslation("containers.ListSettingsView.modal-form.edit-label"),
          defaultMessage: "Edit {fieldName}"
        },
        { fieldName: upperFirst(selectedField) }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(Grid$1, { gap: 4, children: /* @__PURE__ */ jsx(ModalForm, { onMetaChange, onSizeChange }) }) }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: onToggle, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
        endActions: /* @__PURE__ */ jsx(Button, { type: "submit", children: formatMessage({ id: "global.finish", defaultMessage: "Finish" }) })
      }
    )
  ] }) });
};
FormModal.defaultProps = {
  customFieldUid: null
};
FormModal.propTypes = {
  customFieldUid: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onMetaChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};
const getRowSize = (arr) => arr.reduce((sum, value) => sum + value.size, 0);
const createLayout = (arr) => {
  return arr.reduce((acc, current, index) => {
    const row = { rowId: index, rowContent: current };
    return acc.concat(row);
  }, []);
};
const formatLayout = (arr) => {
  return arr.reduce((acc, current) => {
    let toPush = [];
    const currentRow = current.rowContent.reduce((acc2, curr) => {
      const acc2Size = getRowSize(acc2);
      if (curr.name === "_TEMP_") {
        return acc2;
      }
      if (acc2Size + curr.size <= 12) {
        acc2.push(curr);
      } else {
        toPush.push(curr);
      }
      return acc2;
    }, []);
    const rowId = acc.length === 0 ? 0 : Math.max.apply(
      Math,
      acc.map((o) => o.rowId)
    ) + 1;
    const currentRowSize = getRowSize(currentRow);
    if (currentRowSize < 12) {
      currentRow.push({ name: "_TEMP_", size: 12 - currentRowSize });
    }
    acc.push({ rowId, rowContent: currentRow });
    if (toPush.length > 0) {
      const toPushSize = getRowSize(toPush);
      if (toPushSize < 12) {
        toPush.push({ name: "_TEMP_", size: 12 - toPushSize });
      }
      acc.push({ rowId: rowId + 1, rowContent: toPush });
      toPush = [];
    }
    return acc;
  }, []).filter((row) => row.rowContent.length > 0).filter((row) => {
    if (row.rowContent.length === 1) {
      return row.rowContent[0].name !== "_TEMP_";
    }
    return true;
  });
};
const unformatLayout = (arr) => {
  return arr.reduce((acc, current) => {
    const currentRow = current.rowContent.filter((content) => content.name !== "_TEMP_");
    return acc.concat([currentRow]);
  }, []);
};
const getFieldSize = (name, layouts = []) => {
  return layouts.reduce((acc, { rowContent }) => {
    const size2 = rowContent.find((row) => row.name === name)?.size ?? null;
    if (size2) {
      acc = size2;
    }
    return acc;
  }, null);
};
const setFieldSize = (name, size2, layouts = []) => {
  return layouts.map((row) => {
    row.rowContent = row.rowContent.map((column) => {
      if (column.name === name) {
        return {
          ...column,
          size: size2
        };
      }
      return column;
    });
    return row;
  });
};
const init = (initialState2, mainLayout, components) => {
  let initialData = cloneDeep(mainLayout);
  set(initialData, ["layouts", "edit"], formatLayout(createLayout(mainLayout.layouts.edit)));
  return {
    ...initialState2,
    initialData,
    modifiedData: initialData,
    componentLayouts: components
  };
};
const arrayMoveItem = (arr, from, to) => {
  if (Array.isArray(arr) && from >= 0 && to >= 0 && from <= arr.length - 1 && to <= arr.length - 1) {
    const newArray = cloneDeep(arr);
    const item = newArray.splice(from, 1);
    newArray.splice(to, 0, item[0]);
    return newArray;
  }
  return arr;
};
const checkIfAttributeIsDisplayable = (attribute) => {
  const { type } = attribute;
  if (type === "relation") {
    return !(attribute?.relationType ?? "").toLowerCase().includes("morph");
  }
  return !["json", "dynamiczone", "richtext", "password", "blocks"].includes(type) && !!type;
};
const DEFAULT_FIELD_SIZE = 6;
const initialState$7 = {
  fieldForm: {},
  componentLayouts: {},
  metaToEdit: "",
  initialData: {},
  metaForm: {},
  modifiedData: {}
};
const reducer$6 = (state = initialState$7, action) => (
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    const layoutPathEdit = ["modifiedData", "layouts", "edit"];
    switch (action.type) {
      case "MOVE_ROW": {
        const editFieldLayoutValue = get(state, layoutPathEdit, []);
        const { fromIndex, toIndex } = action;
        set(draftState, layoutPathEdit, arrayMoveItem(editFieldLayoutValue, fromIndex, toIndex));
        break;
      }
      case "ON_ADD_FIELD": {
        const newState = cloneDeep(state);
        const attribute = get(newState, ["modifiedData", "attributes", action.name], {});
        const size2 = action.fieldSizes[attribute?.customField]?.default ?? action.fieldSizes[attribute?.type]?.default ?? DEFAULT_FIELD_SIZE;
        const listSize = get(newState, layoutPathEdit, []).length;
        const actualRowContentPath = [...layoutPathEdit, listSize - 1, "rowContent"];
        const rowContentToSet = get(newState, actualRowContentPath, []);
        let newList = get(newState, layoutPathEdit, []);
        if (Array.isArray(rowContentToSet)) {
          set(
            newList,
            [listSize > 0 ? listSize - 1 : 0, "rowContent"],
            [...rowContentToSet, { name: action.name, size: size2 }]
          );
        } else {
          set(
            newList,
            [listSize > 0 ? listSize - 1 : 0, "rowContent"],
            [{ name: action.name, size: size2 }]
          );
        }
        const formattedList = formatLayout(newList);
        set(draftState, layoutPathEdit, formattedList);
        break;
      }
      case "ON_CHANGE": {
        set(draftState, ["modifiedData", ...action.keys], action.value);
        break;
      }
      case "ON_CHANGE_META": {
        set(draftState, ["metaForm", "metadata", ...action.keys], action.value);
        break;
      }
      case "ON_CHANGE_SIZE": {
        set(draftState, ["metaForm", "size"], action.value);
        break;
      }
      case "ON_RESET": {
        draftState.modifiedData = state.initialData;
        break;
      }
      case "REMOVE_FIELD": {
        const row = get(state, [...layoutPathEdit, action.rowIndex, "rowContent"], []);
        let newState = cloneDeep(state);
        if (row.length === 1 || row.length === 2 && get(row, [1, "name"], "") === "_TEMP_") {
          const currentRowFieldList = get(state, layoutPathEdit, []);
          set(
            newState,
            layoutPathEdit,
            currentRowFieldList.filter((_, index) => action.rowIndex !== index)
          );
        } else {
          set(
            newState,
            [...layoutPathEdit, action.rowIndex, "rowContent"],
            row.filter((_, index) => index !== action.fieldIndex)
          );
        }
        const updatedList = formatLayout(get(newState, layoutPathEdit, []));
        set(draftState, layoutPathEdit, updatedList);
        break;
      }
      case "REORDER_DIFF_ROW": {
        const actualRowContent = get(
          state,
          [...layoutPathEdit, action.dragRowIndex, "rowContent"],
          []
        );
        const targetRowContent = get(
          state,
          [...layoutPathEdit, action.hoverRowIndex, "rowContent"],
          []
        );
        const itemToInsert = get(
          state,
          [...layoutPathEdit, action.dragRowIndex, "rowContent", action.dragIndex],
          {}
        );
        const rowContent = [...targetRowContent, itemToInsert];
        let newState = cloneDeep(state);
        set(
          newState,
          [...layoutPathEdit, action.dragRowIndex, "rowContent"],
          actualRowContent.filter((_, index) => action.dragIndex !== index)
        );
        set(
          newState,
          [...layoutPathEdit, action.hoverRowIndex, "rowContent"],
          arrayMoveItem(rowContent, rowContent.length - 1, action.hoverIndex)
        );
        const updatedList = formatLayout(get(newState, layoutPathEdit, []));
        set(draftState, layoutPathEdit, updatedList);
        break;
      }
      case "REORDER_ROW": {
        const newState = cloneDeep(state);
        const rowContent = get(
          newState,
          [...layoutPathEdit, action.dragRowIndex, "rowContent"],
          []
        );
        set(
          newState,
          [...layoutPathEdit, action.dragRowIndex, "rowContent"],
          arrayMoveItem(rowContent, action.dragIndex, action.hoverIndex)
        );
        const updatedList = formatLayout(get(newState, layoutPathEdit, []));
        set(draftState, layoutPathEdit, updatedList);
        break;
      }
      case "SET_FIELD_TO_EDIT": {
        draftState.metaToEdit = action.name;
        draftState.metaForm = {
          metadata: get(state, ["modifiedData", "metadatas", action.name, "edit"], {}),
          size: getFieldSize(action.name, state.modifiedData?.layouts?.edit) ?? DEFAULT_FIELD_SIZE
        };
        break;
      }
      case "SUBMIT_META_FORM": {
        set(
          draftState,
          ["modifiedData", "metadatas", state.metaToEdit, "edit"],
          state.metaForm.metadata
        );
        const layoutsCopy = cloneDeep(get(state, layoutPathEdit, []));
        const nextLayoutValue = setFieldSize(state.metaToEdit, state.metaForm.size, layoutsCopy);
        if (nextLayoutValue.length > 0) {
          set(draftState, layoutPathEdit, formatLayout(nextLayoutValue));
        }
        break;
      }
      case "SUBMIT_SUCCEEDED": {
        draftState.initialData = state.modifiedData;
        break;
      }
      case "UNSET_FIELD_TO_EDIT": {
        draftState.metaToEdit = "";
        draftState.metaForm = {};
        break;
      }
      default:
        return draftState;
    }
  })
);
const EditSettingsView = ({ mainLayout, components, isContentTypeView, slug, updateLayout }) => {
  const [reducerState, dispatch] = useReducer(
    reducer$6,
    initialState$7,
    () => init(initialState$7, mainLayout, components)
  );
  const [isDraggingSibling, setIsDraggingSibling] = useState(false);
  const { trackUsage } = useTracking();
  const toggleNotification = useNotification();
  const { goBack } = useHistory();
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { componentLayouts, initialData, modifiedData, metaToEdit, metaForm } = reducerState;
  const { formatMessage } = useIntl();
  const modelName = mainLayout.info.displayName;
  const attributes = modifiedData?.attributes ?? {};
  const fieldSizes = useTypedSelector((state) => state["content-manager_app"].fieldSizes);
  const { put } = useFetchClient();
  const entryTitleOptions = Object.keys(attributes).filter((attr) => {
    const type = attributes?.[attr]?.type ?? "";
    return ![
      "dynamiczone",
      "json",
      "text",
      "relation",
      "component",
      "boolean",
      "media",
      "password",
      "richtext",
      "timestamp",
      "blocks"
    ].includes(type) && !!type;
  });
  const editLayout = modifiedData.layouts.edit;
  const displayedFields = editLayout.flatMap((layout) => layout.rowContent);
  const editLayoutFields = Object.keys(modifiedData.attributes).filter((attr) => (modifiedData?.metadatas?.[attr]?.edit?.visible ?? false) === true).filter((attr) => displayedFields.findIndex((el) => el.name === attr) === -1).sort();
  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "ON_CHANGE",
      keys: name.split("."),
      value
    });
  };
  const handleToggleModal = () => {
    setIsModalFormOpen((prev) => !prev);
  };
  const toggleConfirmDialog = () => {
    setIsConfirmDialogOpen((prev) => !prev);
  };
  const handleMetaChange = ({ target: { name, value } }) => {
    dispatch({
      type: "ON_CHANGE_META",
      keys: name.split("."),
      value
    });
  };
  const handleSizeChange = ({ name, value }) => {
    dispatch({
      type: "ON_CHANGE_SIZE",
      name,
      value
    });
  };
  const handleMetaSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMIT_META_FORM"
    });
    handleToggleModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleConfirmDialog();
  };
  const submitMutation = useMutation(
    (body) => {
      return put(
        isContentTypeView ? `/content-manager/content-types/${slug}/configuration` : `/content-manager/components/${slug}/configuration`,
        body
      );
    },
    {
      onSuccess({ data }) {
        if (updateLayout) {
          updateLayout(data.data);
        }
        dispatch({
          type: "SUBMIT_SUCCEEDED"
        });
        toggleConfirmDialog();
        trackUsage("didEditEditSettings");
      },
      onError() {
        toggleNotification({ type: "warning", message: { id: "notification.error" } });
      }
    }
  );
  const { isLoading: isSubmittingForm } = submitMutation;
  const handleConfirm = () => {
    const { layouts, metadatas, settings } = cloneDeep(modifiedData);
    submitMutation.mutate({
      layouts: {
        ...layouts,
        edit: unformatLayout(layouts.edit)
      },
      metadatas,
      settings
    });
  };
  const handleMoveRelation = (fromIndex, toIndex) => {
    dispatch({
      type: "MOVE_RELATION",
      fromIndex,
      toIndex
    });
  };
  const handleMoveField = (fromIndex, toIndex) => {
    dispatch({
      type: "MOVE_FIELD",
      fromIndex,
      toIndex
    });
  };
  const moveItem = (dragIndex, hoverIndex, dragRowIndex, hoverRowIndex) => {
    if (dragRowIndex === hoverRowIndex) {
      dispatch({
        type: "REORDER_ROW",
        dragRowIndex,
        dragIndex,
        hoverIndex
      });
    } else {
      dispatch({
        type: "REORDER_DIFF_ROW",
        dragIndex,
        hoverIndex,
        dragRowIndex,
        hoverRowIndex
      });
    }
  };
  const moveRow = (fromIndex, toIndex) => {
    dispatch({
      type: "MOVE_ROW",
      fromIndex,
      toIndex
    });
  };
  return /* @__PURE__ */ jsx(
    LayoutDndProvider,
    {
      isContentTypeView,
      attributes,
      modifiedData,
      slug,
      componentLayouts,
      selectedField: metaToEdit,
      fieldForm: metaForm,
      onMoveRelation: handleMoveRelation,
      onMoveField: handleMoveField,
      moveRow,
      moveItem,
      setEditFieldToSelect: (name) => {
        dispatch({
          type: "SET_FIELD_TO_EDIT",
          name
        });
        handleToggleModal();
      },
      isDraggingSibling,
      setIsDraggingSibling,
      children: /* @__PURE__ */ jsxs(Main, { children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(
            HeaderLayout,
            {
              title: formatMessage(
                {
                  id: getTranslation("components.SettingsViewWrapper.pluginHeader.title"),
                  defaultMessage: `Configure the view - ${upperFirst(modelName)}`
                },
                { name: upperFirst(modelName) }
              ),
              subtitle: formatMessage({
                id: getTranslation(
                  "components.SettingsViewWrapper.pluginHeader.description.edit-settings"
                ),
                defaultMessage: "Customize how the edit view will look like."
              }),
              navigationAction: /* @__PURE__ */ jsx(
                Link$3,
                {
                  startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}),
                  onClick: (e) => {
                    e.preventDefault();
                    goBack();
                  },
                  to: "/",
                  children: formatMessage({
                    id: "global.back",
                    defaultMessage: "Back"
                  })
                }
              ),
              primaryAction: /* @__PURE__ */ jsx(
                Button,
                {
                  disabled: isEqual(initialData, modifiedData),
                  startIcon: /* @__PURE__ */ jsx(Check, {}),
                  type: "submit",
                  children: formatMessage({ id: "global.save", defaultMessage: "Save" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(
            Box,
            {
              background: "neutral0",
              hasRadius: true,
              shadow: "filterShadow",
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 7,
              paddingRight: 7,
              children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h2", children: formatMessage({
                  id: getTranslation("containers.SettingPage.settings"),
                  defaultMessage: "Settings"
                }) }),
                /* @__PURE__ */ jsx(Grid$1, { children: /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                  Select,
                  {
                    label: formatMessage({
                      id: getTranslation("containers.SettingPage.editSettings.entry.title"),
                      defaultMessage: "Entry title"
                    }),
                    hint: formatMessage({
                      id: getTranslation(
                        "containers.SettingPage.editSettings.entry.title.description"
                      ),
                      defaultMessage: "Set the display field of your entry"
                    }),
                    onChange: (value) => {
                      handleChange({
                        target: {
                          name: "settings.mainField",
                          value: value === "" ? null : value
                        }
                      });
                    },
                    value: modifiedData.settings.mainField,
                    children: entryTitleOptions.map((attribute) => /* @__PURE__ */ jsx(Option$1, { value: attribute, children: attribute }, attribute))
                  }
                ) }) }),
                /* @__PURE__ */ jsx(Box, { paddingTop: 2, paddingBottom: 2, children: /* @__PURE__ */ jsx(Divider, {}) }),
                /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h3", children: formatMessage({
                  id: getTranslation("containers.SettingPage.view"),
                  defaultMessage: "View"
                }) }),
                /* @__PURE__ */ jsx(
                  DisplayedFields,
                  {
                    attributes,
                    editLayout,
                    fields: editLayoutFields,
                    onAddField: (field) => {
                      dispatch({
                        type: "ON_ADD_FIELD",
                        name: field,
                        fieldSizes
                      });
                    },
                    onRemoveField: (rowId, index) => {
                      dispatch({
                        type: "REMOVE_FIELD",
                        rowIndex: rowId,
                        fieldIndex: index
                      });
                    }
                  }
                )
              ] })
            }
          ) }),
          /* @__PURE__ */ jsx(
            ConfirmDialog,
            {
              bodyText: {
                id: getTranslation("popUpWarning.warning.updateAllSettings"),
                defaultMessage: "This will modify all your settings"
              },
              iconRightButton: /* @__PURE__ */ jsx(Check, {}),
              isConfirmButtonLoading: isSubmittingForm,
              isOpen: isConfirmDialogOpen,
              onToggleDialog: toggleConfirmDialog,
              onConfirm: handleConfirm,
              variantRightButton: "success-light"
            }
          )
        ] }),
        isModalFormOpen && /* @__PURE__ */ jsx(
          FormModal,
          {
            onSubmit: handleMetaSubmit,
            onToggle: handleToggleModal,
            onMetaChange: handleMetaChange,
            onSizeChange: handleSizeChange,
            type: attributes?.[metaToEdit]?.type ?? "",
            customFieldUid: attributes?.[metaToEdit]?.customField ?? ""
          }
        )
      ] })
    }
  );
};
EditSettingsView.defaultProps = {
  isContentTypeView: false,
  updateLayout: null
};
EditSettingsView.propTypes = {
  components: PropTypes.object.isRequired,
  isContentTypeView: PropTypes.bool,
  mainLayout: PropTypes.shape({
    attributes: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    layouts: PropTypes.shape({
      list: PropTypes.array.isRequired,
      edit: PropTypes.array.isRequired
    }).isRequired,
    metadatas: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
  }).isRequired,
  slug: PropTypes.string.isRequired,
  updateLayout: PropTypes.func
};
const selectAdminPermissions = createTypedSelector((state) => state.admin_app.permissions);
const useInjectionZone = (area) => {
  const { getAdminInjectedComponents } = useAdmin();
  const [moduleName, page, position] = area.split(".");
  return getAdminInjectedComponents(moduleName, page, position);
};
const INJECTION_ZONES = {
  admin: {
    // Temporary injection zone, support for the react-tour plugin in foodadvisor
    tutorials: {
      links: []
    }
  },
  contentManager: {
    editView: { informations: [], "right-links": [] },
    listView: {
      actions: [],
      deleteModalAdditionalInfos: [],
      publishModalAdditionalInfos: [],
      unpublishModalAdditionalInfos: []
    }
  }
};
const InjectionZone = ({ area, ...props }) => {
  const components = useInjectionZone(area);
  return /* @__PURE__ */ jsx(Fragment, { children: components.map((component) => /* @__PURE__ */ jsx(component.Component, { ...props }, component.name)) });
};
const isObject = (obj) => {
  return typeof obj === "object" && obj !== null && Array.isArray(obj) === false;
};
const useFindRedirectionLink = (slug) => {
  const [{ rawQuery }] = useQueryParams();
  const collectionTypesMenuLinks = useTypedSelector(
    (state) => state["content-manager_app"].collectionTypeLinks
  );
  const redirectionLink = getRedirectionLink(collectionTypesMenuLinks, slug, rawQuery);
  return redirectionLink;
};
const mergeParams = (initialParams, params) => {
  return Object.keys(initialParams).reduce((acc, current) => {
    const initialValue = initialParams[current];
    const nextValue = params[current] ?? initialValue;
    if (isObject(initialValue)) {
      return { ...acc, [current]: mergeParams(initialValue, nextValue) };
    }
    acc[current] = nextValue;
    return acc;
  }, {});
};
const getRedirectionLink = (links, slug, rawQuery) => {
  const matchingLink = links.find(({ to: to2 }) => to2.includes(slug));
  if (!matchingLink) {
    return "/";
  }
  const { to, search } = matchingLink;
  const searchQueryParams = parse(search ?? "");
  const currentQueryParams = parse(rawQuery.substring(1));
  const mergedParams = mergeParams(searchQueryParams, currentQueryParams);
  const link = `${to}?${stringify(mergedParams, { encode: false })}`;
  return link;
};
const GET_DATA$1 = "ContentManager/CrudReducer/GET_DATA";
const GET_DATA_SUCCEEDED$1 = "ContentManager/CrudReducer/GET_DATA_SUCCEEDED";
const INIT_FORM = "ContentManager/CrudReducer/INIT_FORM";
const RESET_PROPS$2 = "ContentManager/CrudReducer/RESET_PROPS";
const SET_DATA_STRUCTURES = "ContentManager/CrudReducer/SET_DATA_STRUCTURES";
const SET_STATUS = "ContentManager/CrudReducer/SET_STATUS";
const SUBMIT_SUCCEEDED = "ContentManager/CrudReducer/SUBMIT_SUCCEEDED";
const CLEAR_SET_MODIFIED_DATA_ONLY = "ContentManager/CrudReducer/CLEAR_SET_MODIFIED_DATA_ONLY";
const getData$1 = () => {
  return {
    type: GET_DATA$1
  };
};
const getDataSucceeded$1 = (data) => ({
  type: GET_DATA_SUCCEEDED$1,
  data
});
const initForm = (rawQuery, isSingleType = false) => ({
  type: INIT_FORM,
  rawQuery,
  isSingleType
});
const resetProps$2 = () => ({ type: RESET_PROPS$2 });
const setDataStructures = (componentsDataStructure, contentTypeDataStructure) => ({
  type: SET_DATA_STRUCTURES,
  componentsDataStructure,
  contentTypeDataStructure
});
const setStatus = (status) => ({
  type: SET_STATUS,
  status
});
const submitSucceeded = (data) => ({
  type: SUBMIT_SUCCEEDED,
  data
});
const clearSetModifiedDataOnly = () => ({
  type: CLEAR_SET_MODIFIED_DATA_ONLY
});
const createDefaultDataStructure = (attributes, allComponentsSchema = {}) => {
  return Object.keys(attributes).reduce(
    (acc, current) => {
      const attribute = attributes[current] ?? {};
      const { type, required } = attribute;
      if ("default" in attribute) {
        acc[current] = attribute.default;
      }
      if (type === "component") {
        const currentComponentSchema = allComponentsSchema[attribute.component]?.attributes ?? {};
        const currentComponentDefaultForm = createDefaultDataStructure(
          currentComponentSchema,
          allComponentsSchema
        );
        if (required === true) {
          acc[current] = attribute.repeatable === true ? [] : currentComponentDefaultForm;
        }
        if (attribute.min && attribute.repeatable === true && required) {
          acc[current] = [];
          for (let i = 0; i < attribute.min; i += 1) {
            acc[current].push(currentComponentDefaultForm);
          }
        }
      }
      if (type === "dynamiczone") {
        if (required === true) {
          acc[current] = [];
        }
      }
      return acc;
    },
    {}
  );
};
const removePasswordFieldsFromData = (data, contentTypeSchema, componentSchema) => {
  const recursiveCleanData = (datum, schema) => {
    return Object.keys(datum).reduce(
      (acc, current) => {
        const attribute = schema.attributes[current];
        const value = datum[current];
        if (!attribute) {
          acc[current] = value;
          return acc;
        }
        if (attribute.type === "dynamiczone" && Array.isArray(value)) {
          acc[current] = value.map(
            (componentValue) => {
              const subCleanedData = recursiveCleanData(
                componentValue,
                componentSchema[componentValue.__component]
              );
              return subCleanedData;
            }
          );
          return acc;
        }
        if (attribute.type === "component") {
          if (attribute.repeatable) {
            acc[current] = value && Array.isArray(value) ? value.map((compoData) => {
              const subCleanedData = recursiveCleanData(
                compoData,
                componentSchema[attribute.component]
              );
              return subCleanedData;
            }) : value;
          } else {
            acc[current] = value ? recursiveCleanData(value, componentSchema[attribute.component]) : value;
          }
          return acc;
        }
        if (attribute.type !== "password") {
          acc[current] = value;
        }
        return acc;
      },
      {}
    );
  };
  return recursiveCleanData(data, contentTypeSchema);
};
const CollectionTypeFormWrapper = ({
  children,
  slug,
  id,
  origin
}) => {
  const allLayoutData = useTypedSelector(
    (state) => state["content-manager_editViewLayoutManager"].currentLayout
  );
  const queryClient2 = useQueryClient();
  const toggleNotification = useNotification();
  const { setCurrentStep } = useGuidedTour();
  const { trackUsage } = useTracking();
  const { push, replace } = useHistory();
  const [{ query, rawQuery }] = useQueryParams();
  const dispatch = useTypedDispatch();
  const { componentsDataStructure, contentTypeDataStructure, data, isLoading, status } = useTypedSelector((state) => state["content-manager_editViewCrudReducer"]);
  const redirectionLink = useFindRedirectionLink(slug);
  const { formatAPIError } = useAPIErrorHandler(getTranslation);
  const isMounted = React.useRef(true);
  const fetchClient = useFetchClient();
  const { put, post, del } = fetchClient;
  const isCreatingEntry = !id;
  const requestURL = isCreatingEntry && !origin ? null : `/content-manager/collection-types/${slug}/${origin || id}`;
  const cleanReceivedData = React.useCallback(
    (data2) => {
      const cleaned = removePasswordFieldsFromData(
        data2,
        allLayoutData.contentType,
        allLayoutData.components
      );
      return formatContentTypeData(cleaned, allLayoutData.contentType, allLayoutData.components);
    },
    [allLayoutData]
  );
  React.useEffect(() => {
    const componentsDataStructure2 = Object.keys(allLayoutData.components).reduce((acc, current) => {
      const defaultComponentForm = createDefaultDataStructure(
        allLayoutData.components[current].attributes,
        allLayoutData.components
      );
      acc[current] = formatContentTypeData(
        defaultComponentForm,
        // @ts-expect-error – the helper-plugin doesn't (and can't) know about the types we have in the admin. TODO: fix this.
        allLayoutData.components[current],
        allLayoutData.components
      );
      return acc;
    }, {});
    const contentTypeDataStructure2 = createDefaultDataStructure(
      allLayoutData.contentType.attributes,
      allLayoutData.components
    );
    const contentTypeDataStructureFormatted = formatContentTypeData(
      contentTypeDataStructure2,
      allLayoutData.contentType,
      allLayoutData.components
    );
    dispatch(setDataStructures(componentsDataStructure2, contentTypeDataStructureFormatted));
  }, [allLayoutData, dispatch]);
  React.useEffect(() => {
    return () => {
      dispatch(resetProps$2());
    };
  }, [dispatch]);
  React.useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchData = async (source2) => {
      if (!requestURL) {
        return;
      }
      dispatch(getData$1());
      try {
        const { data: data2 } = await fetchClient.get(requestURL, { cancelToken: source2.token });
        dispatch(getDataSucceeded$1(cleanReceivedData(data2)));
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        const resStatus = get(err, "response.status", null);
        if (resStatus === 404) {
          push(redirectionLink);
          return;
        }
        if (resStatus === 403) {
          toggleNotification({
            type: "info",
            message: { id: getTranslation("permissions.not-allowed.update") }
          });
          push(redirectionLink);
        }
      }
    };
    const init2 = async () => {
      dispatch(getData$1());
      dispatch(initForm(rawQuery));
    };
    if (!isMounted.current) {
      return () => {
      };
    }
    if (requestURL) {
      fetchData(source);
    } else {
      init2();
    }
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [
    fetchClient,
    cleanReceivedData,
    push,
    requestURL,
    dispatch,
    rawQuery,
    redirectionLink,
    toggleNotification
  ]);
  const displayErrors = React.useCallback(
    (err) => {
      toggleNotification({ type: "warning", message: formatAPIError(err) });
    },
    [toggleNotification, formatAPIError]
  );
  const onDelete = React.useCallback(
    async (trackerProperty) => {
      try {
        trackUsage("willDeleteEntry", trackerProperty);
        const { data: data2 } = await del(
          `/content-manager/collection-types/${slug}/${id}`
        );
        toggleNotification({
          type: "success",
          message: { id: getTranslation("success.record.delete") }
        });
        trackUsage("didDeleteEntry", trackerProperty);
        replace(redirectionLink);
        return Promise.resolve(data2);
      } catch (err) {
        trackUsage("didNotDeleteEntry", { error: err, ...trackerProperty });
        return Promise.reject(err);
      }
    },
    [trackUsage, del, slug, id, toggleNotification, replace, redirectionLink]
  );
  const onPost = React.useCallback(
    async (body, trackerProperty) => {
      const isCloning = typeof origin === "string";
      try {
        dispatch(setStatus("submit-pending"));
        const { id: _id, ...restBody } = body;
        const { data: data2 } = await post(
          isCloning ? `/content-manager/collection-types/${slug}/clone/${origin}` : `/content-manager/collection-types/${slug}`,
          isCloning ? restBody : body,
          {
            params: query
          }
        );
        trackUsage("didCreateEntry", trackerProperty);
        toggleNotification({
          type: "success",
          message: { id: getTranslation("success.record.save") }
        });
        setCurrentStep("contentManager.success");
        queryClient2.invalidateQueries(["relation"]);
        dispatch(submitSucceeded(cleanReceivedData(data2)));
        dispatch(setStatus("resolved"));
        replace(`/content-manager/collectionType/${slug}/${data2.id}${rawQuery}`);
        return Promise.resolve(data2);
      } catch (err) {
        if (err instanceof AxiosError) {
          displayErrors(err);
        }
        trackUsage("didNotCreateEntry", { error: err, ...trackerProperty });
        dispatch(setStatus("resolved"));
        return Promise.reject(err);
      }
    },
    [
      origin,
      slug,
      dispatch,
      post,
      query,
      trackUsage,
      toggleNotification,
      setCurrentStep,
      queryClient2,
      cleanReceivedData,
      replace,
      rawQuery,
      displayErrors
    ]
  );
  const onDraftRelationCheck = React.useCallback(async () => {
    try {
      trackUsage("willCheckDraftRelations");
      dispatch(setStatus("draft-relation-check-pending"));
      const {
        data: { data: data2 }
      } = await fetchClient.get(
        `/content-manager/collection-types/${slug}/${id}/actions/countDraftRelations`
      );
      trackUsage("didCheckDraftRelations");
      dispatch(setStatus("resolved"));
      return data2;
    } catch (err) {
      if (err instanceof AxiosError) {
        displayErrors(err);
      }
      dispatch(setStatus("resolved"));
      return Promise.reject(err);
    }
  }, [trackUsage, slug, id, dispatch, fetchClient, displayErrors]);
  const onPublish = React.useCallback(async () => {
    try {
      trackUsage("willPublishEntry");
      dispatch(setStatus("publish-pending"));
      const { data: data2 } = await post(
        `/content-manager/collection-types/${slug}/${id}/actions/publish`
      );
      trackUsage("didPublishEntry");
      dispatch(submitSucceeded(cleanReceivedData(data2)));
      dispatch(setStatus("resolved"));
      toggleNotification({
        type: "success",
        message: { id: getTranslation("success.record.publish") }
      });
      return Promise.resolve(data2);
    } catch (err) {
      if (err instanceof AxiosError) {
        displayErrors(err);
      }
      dispatch(setStatus("resolved"));
      return Promise.reject(err);
    }
  }, [trackUsage, slug, id, dispatch, post, cleanReceivedData, toggleNotification, displayErrors]);
  const onPut = React.useCallback(
    async (body, trackerProperty) => {
      try {
        trackUsage("willEditEntry", trackerProperty);
        dispatch(setStatus("submit-pending"));
        const { data: data2 } = await put(`/content-manager/collection-types/${slug}/${id}`, body);
        trackUsage("didEditEntry", trackerProperty);
        toggleNotification({
          type: "success",
          message: { id: getTranslation("success.record.save") }
        });
        queryClient2.invalidateQueries(["relation"]);
        dispatch(submitSucceeded(cleanReceivedData(data2)));
        dispatch(setStatus("resolved"));
        return Promise.resolve(data2);
      } catch (err) {
        trackUsage("didNotEditEntry", { error: err, ...trackerProperty });
        if (err instanceof AxiosError) {
          displayErrors(err);
        }
        dispatch(setStatus("resolved"));
        return Promise.reject(err);
      }
    },
    [
      trackUsage,
      dispatch,
      put,
      slug,
      id,
      toggleNotification,
      queryClient2,
      cleanReceivedData,
      displayErrors
    ]
  );
  const onUnpublish = React.useCallback(async () => {
    dispatch(setStatus("unpublish-pending"));
    try {
      trackUsage("willUnpublishEntry");
      const { data: data2 } = await post(
        `/content-manager/collection-types/${slug}/${id}/actions/unpublish`
      );
      trackUsage("didUnpublishEntry");
      toggleNotification({
        type: "success",
        message: { id: getTranslation("success.record.unpublish") }
      });
      dispatch(submitSucceeded(cleanReceivedData(data2)));
      dispatch(setStatus("resolved"));
    } catch (err) {
      dispatch(setStatus("resolved"));
      if (err instanceof AxiosError) {
        displayErrors(err);
      }
      return Promise.reject(err);
    }
  }, [slug, id, dispatch, trackUsage, post, toggleNotification, cleanReceivedData, displayErrors]);
  return children({
    componentsDataStructure,
    contentTypeDataStructure,
    data,
    isCreatingEntry,
    isLoadingForData: isLoading,
    onDelete,
    onPost,
    onPublish,
    onDraftRelationCheck,
    onPut,
    onUnpublish,
    status,
    redirectionLink
  });
};
const useContentTypeLayout = () => {
  const currentLayout = useTypedSelector(
    (state) => state["content-manager_editViewLayoutManager"].currentLayout
  );
  const getComponentLayout = useCallback(
    (componentUid) => {
      return currentLayout?.components?.[componentUid] ?? {};
    },
    [currentLayout]
  );
  return { ...currentLayout, getComponentLayout };
};
const AddComponentButton = ({
  hasError,
  isDisabled,
  isOpen,
  children,
  onClick
}) => {
  return /* @__PURE__ */ jsx(
    StyledButton,
    {
      type: "button",
      onClick,
      disabled: isDisabled,
      background: "neutral0",
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4,
      style: { cursor: isDisabled ? "not-allowed" : "pointer" },
      children: /* @__PURE__ */ jsxs(Flex, { as: "span", gap: 2, children: [
        /* @__PURE__ */ jsx(StyledAddIcon, { "aria-hidden": true, $isOpen: isOpen, $hasError: hasError && !isOpen }),
        /* @__PURE__ */ jsx(
          Typography,
          {
            variant: "pi",
            fontWeight: "bold",
            textColor: hasError && !isOpen ? "danger600" : "neutral500",
            children
          }
        )
      ] })
    }
  );
};
const StyledAddIcon = styled(PlusCircle)`
  height: ${({ theme }) => theme.spaces[6]};
  width: ${({ theme }) => theme.spaces[6]};
  transform: ${({ $isOpen }) => $isOpen ? "rotate(45deg)" : "rotate(0deg)"};

  > circle {
    fill: ${({ theme, $hasError }) => $hasError ? theme.colors.danger200 : theme.colors.neutral150};
  }
  > path {
    fill: ${({ theme, $hasError }) => $hasError ? theme.colors.danger600 : theme.colors.neutral600};
  }
`;
const StyledButton = styled(BaseButton)`
  border-radius: 26px;
  border-color: ${({ theme }) => theme.colors.neutral150};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};

  &:hover {
    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
    }

    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.neutral100};
      }
    }
  }
  &:active {
    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
    }
    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.neutral100};
      }
    }
  }
`;
const ComponentCategory = ({
  category,
  components = [],
  variant = "primary",
  isOpen,
  onAddComponent,
  onToggle
}) => {
  const { formatMessage } = useIntl();
  const handleToggle = () => {
    onToggle(category);
  };
  return /* @__PURE__ */ jsxs(Accordion, { expanded: isOpen, onToggle: handleToggle, size: "S", children: [
    /* @__PURE__ */ jsx(
      AccordionToggle,
      {
        variant,
        title: formatMessage({ id: category, defaultMessage: category }),
        togglePosition: "left"
      }
    ),
    /* @__PURE__ */ jsx(AccordionContent$1, { children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, paddingBottom: 4, paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsx(Grid, { children: components.map(({ componentUid, info: { displayName, icon } }) => /* @__PURE__ */ jsx(
      ComponentBox,
      {
        as: "button",
        type: "button",
        background: "neutral100",
        justifyContent: "center",
        onClick: onAddComponent(componentUid),
        hasRadius: true,
        height: pxToRem(84),
        shrink: 0,
        borderColor: "neutral200",
        children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, alignItems: "center", justifyContent: "center", children: [
          /* @__PURE__ */ jsx(ComponentIcon, { icon }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral600", children: formatMessage({ id: displayName, defaultMessage: displayName }) })
        ] })
      },
      componentUid
    )) }) }) })
  ] });
};
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, ${140 / 16}rem);
  grid-gap: ${({ theme }) => theme.spaces[1]};
`;
const ComponentBox = styled(Flex)`
  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    background: ${({ theme }) => theme.colors.primary100};

    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
    }

    /* > Flex > ComponentIcon */
    > div > div:first-child {
      background: ${({ theme }) => theme.colors.primary200};
      color: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const ComponentPicker = ({
  dynamicComponentsByCategory = {},
  isOpen,
  onClickAddComponent
}) => {
  const { formatMessage } = useIntl();
  const [categoryToOpen, setCategoryToOpen] = React.useState("");
  React.useEffect(() => {
    const categoryKeys = Object.keys(dynamicComponentsByCategory);
    if (isOpen && categoryKeys.length > 0) {
      setCategoryToOpen(categoryKeys[0]);
    }
  }, [isOpen, dynamicComponentsByCategory]);
  const handleAddComponentToDz = (componentUid) => () => {
    onClickAddComponent(componentUid);
    setCategoryToOpen("");
  };
  const handleClickToggle = (categoryName) => {
    setCategoryToOpen((currentCat) => currentCat === categoryName ? "" : categoryName);
  };
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    Box,
    {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 5,
      paddingRight: 5,
      background: "neutral0",
      shadow: "tableShadow",
      borderColor: "neutral150",
      hasRadius: true,
      children: [
        /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral600", children: formatMessage({
          id: getTranslation("components.DynamicZone.ComponentPicker-label"),
          defaultMessage: "Pick one component"
        }) }) }),
        /* @__PURE__ */ jsx(Box, { paddingTop: 2, children: /* @__PURE__ */ jsx(KeyboardNavigable, { attributeName: "data-strapi-accordion-toggle", children: Object.entries(dynamicComponentsByCategory).map(([category, components], index) => /* @__PURE__ */ jsx(
          ComponentCategory,
          {
            category,
            components,
            onAddComponent: handleAddComponentToDz,
            isOpen: category === categoryToOpen,
            onToggle: handleClickToggle,
            variant: index % 2 === 1 ? "primary" : "secondary"
          },
          category
        )) }) })
      ]
    }
  );
};
const getFieldName = (stringName) => stringName.split(".").filter((string) => isNaN$1(parseInt(string, 10)));
const getMaxTempKey = (arr) => {
  if (arr.length === 0) {
    return -1;
  }
  const maxTempKey = Math.max(...arr.map((o) => o.__temp_key__ ?? 0));
  return Number.isNaN(maxTempKey) ? -1 : maxTempKey;
};
const isFieldTypeNumber = (type) => {
  return ["integer", "biginteger", "decimal", "float", "number"].includes(type);
};
const ComponentInitializer = ({ error, isReadOnly, onClick }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Box,
      {
        as: "button",
        background: "neutral100",
        borderColor: error ? "danger600" : "neutral200",
        disabled: isReadOnly,
        hasRadius: true,
        onClick,
        paddingTop: 9,
        paddingBottom: 9,
        type: "button",
        children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, children: [
          /* @__PURE__ */ jsx(Flex, { justifyContent: "center", style: { cursor: isReadOnly ? "not-allowed" : "inherit" }, children: /* @__PURE__ */ jsx(CircleIcon, {}) }),
          /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Typography, { textColor: "primary600", variant: "pi", fontWeight: "bold", children: formatMessage({
            id: getTranslation("components.empty-repeatable"),
            defaultMessage: "No entry yet. Click on the button below to add one."
          }) }) })
        ] })
      }
    ),
    error?.id && /* @__PURE__ */ jsx(Typography, { textColor: "danger600", variant: "pi", children: formatMessage(error, { ...error.values }) })
  ] });
};
const CircleIcon = styled(PlusCircle)`
  width: ${pxToRem(24)};
  height: ${pxToRem(24)};
  > circle {
    fill: ${({ theme }) => theme.colors.primary200};
  }
  > path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;
const componentStore = /* @__PURE__ */ new Map();
const useLazyComponents = (componentUids = []) => {
  const [lazyComponentStore, setLazyComponentStore] = useState(Object.fromEntries(componentStore));
  const newUids = componentUids.filter((uid) => !componentStore.get(uid));
  const [loading, setLoading] = useState(() => !!newUids.length);
  const customFieldsRegistry = useCustomFields();
  useEffect(() => {
    const setStore = (store) => {
      setLazyComponentStore(store);
      setLoading(false);
    };
    const lazyLoadComponents = async (uids, components) => {
      const modules = await Promise.all(components);
      uids.forEach((uid, index) => {
        componentStore.set(uid, modules[index].default);
      });
      setStore(Object.fromEntries(componentStore));
    };
    if (newUids.length > 0) {
      setLoading(true);
      const componentPromises = newUids.reduce((arrayOfPromises, uid) => {
        const customField = customFieldsRegistry.get(uid);
        if (customField) {
          arrayOfPromises.push(customField.components.Input());
        }
        return arrayOfPromises;
      }, []);
      if (componentPromises.length > 0) {
        lazyLoadComponents(newUids, componentPromises);
      }
    }
  }, [newUids, customFieldsRegistry]);
  const cleanup = useCallback(() => {
    componentStore.clear();
    setLazyComponentStore({});
  }, []);
  return { isLazyLoading: loading, lazyComponentStore, cleanup };
};
const Hint = ({ id, error, name, hint = "" }) => {
  if (hint.length === 0 || error) {
    return null;
  }
  return /* @__PURE__ */ jsx(Typography, { as: "p", variant: "pi", id: `${id || name}-hint`, textColor: "neutral600", children: hint });
};
const baseHandleConvert = (editor, attributesToSet) => {
  Transforms.unwrapNodes(editor, {
    match: (node) => !Editor$1.isEditor(node) && node.type === "list",
    split: true
  });
  const entry = Editor$1.above(editor, {
    match: (node) => !Editor$1.isEditor(node) && node.type !== "text" && node.type !== "link"
  });
  if (!entry || Editor$1.isEditor(entry[0])) {
    return;
  }
  const [element, elementPath] = entry;
  Transforms.setNodes(
    editor,
    {
      ...getAttributesToClear(element),
      ...attributesToSet
    },
    { at: elementPath }
  );
  return elementPath;
};
const getAttributesToClear = (element) => {
  const { children: _children, type: _type, ...extra } = element;
  const attributesToClear = Object.keys(extra).reduce(
    (currentAttributes, key) => ({ ...currentAttributes, [key]: null }),
    {}
  );
  return attributesToClear;
};
const isText$2 = (node) => {
  return Node.isNode(node) && !Editor$1.isEditor(node) && node.type === "text";
};
const pressEnterTwiceToExit = (editor) => {
  const nodeEntry = Editor$1.above(editor, {
    match: (node2) => !Editor$1.isEditor(node2) && !["link", "text"].includes(node2.type)
  });
  if (!nodeEntry || !editor.selection) {
    return;
  }
  const [node, nodePath] = nodeEntry;
  const isNodeEnd = Editor$1.isEnd(editor, editor.selection.anchor, nodePath);
  const lastTextNode = node.children.at(-1);
  const isEmptyLine = isText$2(lastTextNode) && lastTextNode.text.endsWith("\n");
  if (isNodeEnd && isEmptyLine) {
    Transforms.delete(editor, { distance: 1, unit: "character", reverse: true });
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ type: "text", text: "" }]
    });
    return;
  }
  Transforms.insertText(editor, "\n");
  if (isNodeEnd) {
    ["bold", "italic", "underline", "strikethrough", "code"].forEach((modifier) => {
      Editor$1.removeMark(editor, modifier);
    });
  }
};
const CodeBlock = styled.pre.attrs({ role: "code" })`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.neutral100};
  max-width: 100%;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  flex-shrink: 0;
  & > code {
    font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas,
      monospace;
    color: ${({ theme }) => theme.colors.neutral800};
    overflow: auto;
    max-width: 100%;
  }
`;
const codeBlocks = {
  code: {
    renderElement: (props) => /* @__PURE__ */ jsx(CodeBlock, { ...props.attributes, children: /* @__PURE__ */ jsx("code", { children: props.children }) }),
    icon: Code,
    label: {
      id: "components.Blocks.blocks.code",
      defaultMessage: "Code block"
    },
    matchNode: (node) => node.type === "code",
    isInBlocksSelector: true,
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "code" });
    },
    handleEnterKey(editor) {
      pressEnterTwiceToExit(editor);
    },
    snippets: ["```"]
  }
};
const H1 = styled(Typography).attrs({ as: "h1" })`
  font-size: ${42 / 16}rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H2 = styled(Typography).attrs({ as: "h2" })`
  font-size: ${35 / 16}rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H3 = styled(Typography).attrs({ as: "h3" })`
  font-size: ${29 / 16}rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H4 = styled(Typography).attrs({ as: "h4" })`
  font-size: ${24 / 16}rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H5 = styled(Typography).attrs({ as: "h5" })`
  font-size: ${20 / 16}rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H6 = styled(Typography).attrs({ as: "h6" })`
  font-size: 1rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const handleConvertToHeading = (editor, level) => {
  baseHandleConvert(editor, { type: "heading", level });
};
const headingBlocks = {
  "heading-one": {
    renderElement: (props) => /* @__PURE__ */ jsx(H1, { ...props.attributes, children: props.children }),
    icon: HeadingOne,
    label: {
      id: "components.Blocks.blocks.heading1",
      defaultMessage: "Heading 1"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 1),
    matchNode: (node) => node.type === "heading" && node.level === 1,
    isInBlocksSelector: true,
    snippets: ["#"]
  },
  "heading-two": {
    renderElement: (props) => /* @__PURE__ */ jsx(H2, { ...props.attributes, children: props.children }),
    icon: HeadingTwo,
    label: {
      id: "components.Blocks.blocks.heading2",
      defaultMessage: "Heading 2"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 2),
    matchNode: (node) => node.type === "heading" && node.level === 2,
    isInBlocksSelector: true,
    snippets: ["##"]
  },
  "heading-three": {
    renderElement: (props) => /* @__PURE__ */ jsx(H3, { ...props.attributes, children: props.children }),
    icon: HeadingThree,
    label: {
      id: "components.Blocks.blocks.heading3",
      defaultMessage: "Heading 3"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 3),
    matchNode: (node) => node.type === "heading" && node.level === 3,
    isInBlocksSelector: true,
    snippets: ["###"]
  },
  "heading-four": {
    renderElement: (props) => /* @__PURE__ */ jsx(H4, { ...props.attributes, children: props.children }),
    icon: HeadingFour,
    label: {
      id: "components.Blocks.blocks.heading4",
      defaultMessage: "Heading 4"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 4),
    matchNode: (node) => node.type === "heading" && node.level === 4,
    isInBlocksSelector: true,
    snippets: ["####"]
  },
  "heading-five": {
    renderElement: (props) => /* @__PURE__ */ jsx(H5, { ...props.attributes, children: props.children }),
    icon: HeadingFive,
    label: {
      id: "components.Blocks.blocks.heading5",
      defaultMessage: "Heading 5"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 5),
    matchNode: (node) => node.type === "heading" && node.level === 5,
    isInBlocksSelector: true,
    snippets: ["#####"]
  },
  "heading-six": {
    renderElement: (props) => /* @__PURE__ */ jsx(H6, { ...props.attributes, children: props.children }),
    icon: HeadingSix,
    label: {
      id: "components.Blocks.blocks.heading6",
      defaultMessage: "Heading 6"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 6),
    matchNode: (node) => node.type === "heading" && node.level === 6,
    isInBlocksSelector: true,
    snippets: ["######"]
  }
};
const ImageWrapper = styled(Flex)`
  transition-property: box-shadow;
  transition-duration: 0.2s;
  ${(props) => props.isFocused && css`
      box-shadow: ${props.theme.colors.primary600} 0px 0px 0px 3px;
    `}

  & > img {
    height: auto;
    // The max-height is decided with the design team, the 56px is the height of the toolbar
    max-height: calc(512px - 56px);
    max-width: 100%;
    object-fit: contain;
  }
`;
const IMAGE_SCHEMA_FIELDS = [
  "name",
  "alternativeText",
  "url",
  "caption",
  "width",
  "height",
  "formats",
  "hash",
  "ext",
  "mime",
  "size",
  "previewUrl",
  "provider",
  "provider_metadata",
  "createdAt",
  "updatedAt"
];
const pick = (object, keys) => {
  const entries = keys.map((key) => [key, object[key]]);
  return Object.fromEntries(entries);
};
const isImage = (element) => {
  return element.type === "image";
};
const Image = ({ attributes, children, element }) => {
  const editorIsFocused = useFocused();
  const imageIsSelected = useSelected();
  if (!isImage(element)) {
    return null;
  }
  const { url, alternativeText, width, height } = element.image;
  return /* @__PURE__ */ jsxs(Box, { ...attributes, children: [
    children,
    /* @__PURE__ */ jsx(
      ImageWrapper,
      {
        background: "neutral100",
        contentEditable: false,
        justifyContent: "center",
        isFocused: editorIsFocused && imageIsSelected,
        hasRadius: true,
        children: /* @__PURE__ */ jsx("img", { src: url, alt: alternativeText, width, height })
      }
    )
  ] });
};
const ImageDialog = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { editor } = useBlocksEditorContext("ImageDialog");
  const { components } = useLibrary();
  if (!components || !isOpen)
    return null;
  const MediaLibraryDialog = components["media-library"];
  const insertImages = (images) => {
    Transforms.unwrapNodes(editor, {
      match: (node) => !Editor$1.isEditor(node) && node.type === "list",
      split: true
    });
    const nodeEntryBeingReplaced = Editor$1.above(editor, {
      match(node) {
        if (Editor$1.isEditor(node))
          return false;
        const isInlineNode = ["text", "link"].includes(node.type);
        return !isInlineNode;
      }
    });
    if (!nodeEntryBeingReplaced)
      return;
    const [, pathToInsert] = nodeEntryBeingReplaced;
    Transforms.removeNodes(editor);
    const nodesToInsert = images.map((image) => {
      const imageNode = {
        type: "image",
        image,
        children: [{ type: "text", text: "" }]
      };
      return imageNode;
    });
    Transforms.insertNodes(editor, nodesToInsert, { at: pathToInsert });
    Transforms.select(editor, pathToInsert);
  };
  const handleSelectAssets = (images) => {
    const formattedImages = images.map((image) => {
      const expectedImage = pick(image, IMAGE_SCHEMA_FIELDS);
      const nodeImage = {
        ...expectedImage,
        alternativeText: expectedImage.alternativeText || expectedImage.name,
        url: prefixFileUrlWithBackendUrl(image.url)
      };
      return nodeImage;
    });
    insertImages(formattedImages);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsx(
    MediaLibraryDialog,
    {
      allowedTypes: ["images"],
      onClose: () => setIsOpen(false),
      onSelectAssets: handleSelectAssets
    }
  );
};
const imageBlocks = {
  image: {
    renderElement: (props) => /* @__PURE__ */ jsx(Image, { ...props }),
    icon: Picture,
    label: {
      id: "components.Blocks.blocks.image",
      defaultMessage: "Image"
    },
    matchNode: (node) => node.type === "image",
    isInBlocksSelector: true,
    handleBackspaceKey(editor) {
      if (editor.children.length === 1) {
        Transforms.setNodes(editor, {
          type: "paragraph",
          // @ts-expect-error we're only setting image as null so that Slate deletes it
          image: null,
          children: [{ type: "text", text: "" }]
        });
      } else {
        Transforms.removeNodes(editor);
      }
    },
    handleEnterKey(editor) {
      Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      });
    },
    handleConvert: () => {
      return () => /* @__PURE__ */ jsx(ImageDialog, {});
    },
    snippets: ["!["]
  }
};
const addProtocol = (url, protocol = "https://") => {
  const allowedProtocols = ["http://", "https://", "mailto:", "tel:"];
  if (allowedProtocols.some((allowedProtocol) => url.startsWith(allowedProtocol))) {
    return url;
  }
  return `${protocol}${url}`;
};
const removeLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (node) => !Editor$1.isEditor(node) && Element.isElement(node) && node.type === "link"
  });
};
const insertLink = (editor, { url }) => {
  if (editor.selection) {
    const linkNodes = Array.from(
      Editor$1.nodes(editor, {
        at: editor.selection,
        match: (node) => !Editor$1.isEditor(node) && node.type === "link"
      })
    );
    linkNodes.forEach(([, path]) => {
      Transforms.unwrapNodes(editor, { at: path });
    });
    if (Range.isCollapsed(editor.selection)) {
      const link = {
        type: "link",
        url: url ? addProtocol(url) : "",
        children: [{ type: "text", text: url }]
      };
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(
        editor,
        { type: "link", url: url ? addProtocol(url) : "" },
        { split: true }
      );
    }
  }
};
const editLink = (editor, link) => {
  const { url, text } = link;
  if (!editor.selection) {
    return;
  }
  const linkEntry = Editor$1.above(editor, {
    match: (node) => !Editor$1.isEditor(node) && node.type === "link"
  });
  if (linkEntry) {
    const [, linkPath] = linkEntry;
    Transforms.setNodes(editor, { url: addProtocol(url) }, { at: linkPath });
    if (text !== "" && text !== Editor$1.string(editor, linkPath)) {
      const linkNodeChildrens = Array.from(Node.children(editor, linkPath, { reverse: true }));
      linkNodeChildrens.forEach(([, childPath]) => {
        Transforms.removeNodes(editor, { at: childPath });
      });
      Transforms.insertNodes(editor, [{ type: "text", text }], { at: linkPath.concat(0) });
    }
  }
};
const StyledBaseLink = styled(BaseLink)`
  text-decoration: none;
`;
const TooltipCustom = styled(Tooltip)`
  z-index: 6;
`;
const CustomButton = styled(Button)`
  & > span {
    line-height: normal;
  }
`;
const LinkContent = React.forwardRef(
  ({ link, children, attributes }, forwardedRef) => {
    const { formatMessage } = useIntl();
    const { editor } = useBlocksEditorContext("Link");
    const path = ReactEditor.findPath(editor, link);
    const [popoverOpen, setPopoverOpen] = React.useState(
      editor.lastInsertedLinkPath ? Path.equals(path, editor.lastInsertedLinkPath) : false
    );
    const [isEditing, setIsEditing] = React.useState(link.url === "");
    const linkRef = React.useRef(null);
    const elementText = link.children.map((child) => child.text).join("");
    const [linkText, setLinkText] = React.useState(elementText);
    const [linkUrl, setLinkUrl] = React.useState(link.url);
    const handleOpenEditPopover = (e) => {
      e.preventDefault();
      setPopoverOpen(true);
    };
    const handleSave = (e) => {
      e.stopPropagation();
      if (editor.selection && Range.isCollapsed(editor.selection)) {
        const [, parentPath] = Editor$1.parent(editor, editor.selection.focus?.path);
        Transforms.select(editor, parentPath);
      }
      editLink(editor, { url: linkUrl, text: linkText });
      setIsEditing(false);
    };
    const handleCancel = () => {
      setIsEditing(false);
      if (link.url === "") {
        removeLink(editor);
      }
    };
    const handleDismiss = () => {
      setPopoverOpen(false);
      if (link.url === "") {
        removeLink(editor);
      }
      ReactEditor.focus(editor);
    };
    const composedRefs = composeRefs(linkRef, forwardedRef);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        StyledBaseLink,
        {
          ...attributes,
          ref: composedRefs,
          href: link.url,
          onClick: handleOpenEditPopover,
          color: "primary600",
          children
        }
      ),
      popoverOpen && /* @__PURE__ */ jsx(Popover, { source: linkRef, onDismiss: handleDismiss, padding: 4, contentEditable: false, children: isEditing ? /* @__PURE__ */ jsxs(Flex, { as: "form", onSubmit: handleSave, direction: "column", gap: 4, children: [
        /* @__PURE__ */ jsxs(Field, { width: "300px", children: [
          /* @__PURE__ */ jsx(FieldLabel, { children: formatMessage({
            id: "components.Blocks.popover.text",
            defaultMessage: "Text"
          }) }),
          /* @__PURE__ */ jsx(
            FieldInput,
            {
              name: "text",
              placeholder: formatMessage({
                id: "components.Blocks.popover.text.placeholder",
                defaultMessage: "Enter link text"
              }),
              value: linkText,
              onChange: (e) => setLinkText(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Field, { width: "300px", children: [
          /* @__PURE__ */ jsx(FieldLabel, { children: formatMessage({
            id: "components.Blocks.popover.link",
            defaultMessage: "Link"
          }) }),
          /* @__PURE__ */ jsx(
            FieldInput,
            {
              name: "url",
              placeholder: "https://strapi.io",
              value: linkUrl,
              onChange: (e) => setLinkUrl(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "end", width: "100%", gap: 2, children: [
          /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: handleCancel, children: formatMessage({
            id: "components.Blocks.popover.cancel",
            defaultMessage: "Cancel"
          }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !linkText || !linkUrl, children: formatMessage({
            id: "components.Blocks.popover.save",
            defaultMessage: "Save"
          }) })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 4, alignItems: "start", width: "400px", children: [
        /* @__PURE__ */ jsx(Typography, { children: elementText }),
        /* @__PURE__ */ jsx(Typography, { children: /* @__PURE__ */ jsx(StyledBaseLink, { href: link.url, target: "_blank", color: "primary600", children: link.url }) }),
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "end", width: "100%", gap: 2, children: [
          /* @__PURE__ */ jsx(
            TooltipCustom,
            {
              description: formatMessage({
                id: "components.Blocks.popover.delete",
                defaultMessage: "Delete"
              }),
              children: /* @__PURE__ */ jsx(
                CustomButton,
                {
                  size: "S",
                  width: "2rem",
                  variant: "danger-light",
                  onClick: () => removeLink(editor),
                  "aria-label": formatMessage({
                    id: "components.Blocks.popover.delete",
                    defaultMessage: "Delete"
                  }),
                  type: "button",
                  justifyContent: "center",
                  children: /* @__PURE__ */ jsx(Icon, { width: 3, height: 3, as: Trash })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            TooltipCustom,
            {
              description: formatMessage({
                id: "components.Blocks.popover.edit",
                defaultMessage: "Edit"
              }),
              children: /* @__PURE__ */ jsx(
                CustomButton,
                {
                  size: "S",
                  width: "2rem",
                  variant: "tertiary",
                  onClick: () => setIsEditing(true),
                  "aria-label": formatMessage({
                    id: "components.Blocks.popover.edit",
                    defaultMessage: "Edit"
                  }),
                  type: "button",
                  justifyContent: "center",
                  children: /* @__PURE__ */ jsx(Icon, { width: 3, height: 3, as: Pencil })
                }
              )
            }
          )
        ] })
      ] }) })
    ] });
  }
);
const isLink = (element) => {
  return element.type === "link";
};
const Link = React.forwardRef((props, forwardedRef) => {
  if (!isLink(props.element)) {
    return null;
  }
  return /* @__PURE__ */ jsx(LinkContent, { ...props, link: props.element, ref: forwardedRef });
});
const linkBlocks = {
  link: {
    renderElement: (props) => /* @__PURE__ */ jsx(Link, { element: props.element, attributes: props.attributes, children: props.children }),
    // No handleConvert here, links are created via the link button in the toolbar
    matchNode: (node) => node.type === "link",
    isInBlocksSelector: false
  }
};
const listStyle = css`
  margin-block-start: ${({ theme }) => theme.spaces[4]};
  margin-block-end: ${({ theme }) => theme.spaces[4]};
  margin-inline-start: ${({ theme }) => theme.spaces[0]};
  margin-inline-end: ${({ theme }) => theme.spaces[0]};
  padding-inline-start: ${({ theme }) => theme.spaces[4]};

  ol,
  ul {
    margin-block-start: ${({ theme }) => theme.spaces[0]};
    margin-block-end: ${({ theme }) => theme.spaces[0]};
  }
`;
const Orderedlist = styled.ol`
  list-style-type: decimal;
  ${listStyle}
`;
const Unorderedlist = styled.ul`
  list-style-type: disc;
  ${listStyle}
`;
const isListNode$1 = (node) => {
  return Node.isNode(node) && !Editor$1.isEditor(node) && node.type === "list";
};
const List = ({ attributes, children, element }) => {
  if (!isListNode$1(element)) {
    return null;
  }
  if (element.format === "ordered") {
    return /* @__PURE__ */ jsx(Orderedlist, { ...attributes, children });
  }
  return /* @__PURE__ */ jsx(Unorderedlist, { ...attributes, children });
};
const replaceListWithEmptyBlock = (editor, currentListPath) => {
  Transforms.removeNodes(editor, { at: currentListPath });
  if (currentListPath[0] === 0) {
    Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      },
      { at: currentListPath }
    );
    Transforms.select(editor, currentListPath);
  }
};
const isText$1 = (node) => {
  return Node.isNode(node) && !Editor$1.isEditor(node) && node.type === "text";
};
const handleBackspaceKeyOnList = (editor, event) => {
  if (!editor.selection)
    return;
  const [currentListItem, currentListItemPath] = Editor$1.parent(editor, editor.selection.anchor);
  const [currentList, currentListPath] = Editor$1.parent(editor, currentListItemPath);
  const isListEmpty = currentList.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isNodeStart = Editor$1.isStart(editor, editor.selection.anchor, currentListItemPath);
  const isFocusAtTheBeginningOfAChild = editor.selection.focus.offset === 0 && editor.selection.focus.path.at(-1) === 0;
  if (isListEmpty) {
    event.preventDefault();
    replaceListWithEmptyBlock(editor, currentListPath);
  } else if (isNodeStart) {
    Transforms.liftNodes(editor, {
      match: (node) => !Editor$1.isEditor(node) && node.type === "list-item"
    });
    Transforms.setNodes(
      editor,
      { type: "paragraph" },
      {
        hanging: true
      }
    );
  } else if (isFocusAtTheBeginningOfAChild) {
    Transforms.liftNodes(editor, {
      match: (node) => !Editor$1.isEditor(node) && node.type === "list-item"
    });
    Transforms.setNodes(editor, { type: "paragraph" });
  }
};
const handleEnterKeyOnList = (editor) => {
  const currentListItemEntry = Editor$1.above(editor, {
    match: (node) => !Editor$1.isEditor(node) && node.type === "list-item"
  });
  if (!currentListItemEntry || !editor.selection) {
    return;
  }
  const [currentListItem, currentListItemPath] = currentListItemEntry;
  const [currentList, currentListPath] = Editor$1.parent(editor, currentListItemPath);
  const isListEmpty = currentList.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isListItemEmpty = currentListItem.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  if (isListEmpty) {
    replaceListWithEmptyBlock(editor, currentListPath);
  } else if (isListItemEmpty) {
    Transforms.removeNodes(editor, { at: currentListItemPath });
    const listNodeEntry = Editor$1.above(editor, {
      match: (node) => !Editor$1.isEditor(node) && node.type === "list"
    });
    if (!listNodeEntry) {
      return;
    }
    const createdParagraphPath = Path.next(listNodeEntry[1]);
    Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      },
      { at: createdParagraphPath }
    );
    Transforms.select(editor, createdParagraphPath);
  } else {
    const isNodeEnd = Editor$1.isEnd(editor, editor.selection.anchor, currentListItemPath);
    if (isNodeEnd) {
      Transforms.insertNodes(editor, { type: "list-item", children: [{ type: "text", text: "" }] });
    } else {
      Transforms.splitNodes(editor);
    }
  }
};
const handleConvertToList = (editor, format) => {
  const convertedPath = baseHandleConvert(editor, { type: "list-item" });
  if (!convertedPath)
    return;
  Transforms.wrapNodes(editor, { type: "list", format, children: [] }, { at: convertedPath });
};
const listBlocks = {
  "list-ordered": {
    renderElement: (props) => /* @__PURE__ */ jsx(List, { ...props }),
    label: {
      id: "components.Blocks.blocks.orderedList",
      defaultMessage: "Numbered list"
    },
    icon: NumberList,
    matchNode: (node) => node.type === "list" && node.format === "ordered",
    isInBlocksSelector: true,
    handleConvert: (editor) => handleConvertToList(editor, "ordered"),
    handleEnterKey: handleEnterKeyOnList,
    handleBackspaceKey: handleBackspaceKeyOnList,
    snippets: ["1."]
  },
  "list-unordered": {
    renderElement: (props) => /* @__PURE__ */ jsx(List, { ...props }),
    label: {
      id: "components.Blocks.blocks.unorderedList",
      defaultMessage: "Bulleted list"
    },
    icon: BulletList,
    matchNode: (node) => node.type === "list" && node.format === "unordered",
    isInBlocksSelector: true,
    handleConvert: (editor) => handleConvertToList(editor, "unordered"),
    handleEnterKey: handleEnterKeyOnList,
    handleBackspaceKey: handleBackspaceKeyOnList,
    snippets: ["-", "*", "+"]
  },
  "list-item": {
    renderElement: (props) => /* @__PURE__ */ jsx(Typography, { as: "li", ...props.attributes, children: props.children }),
    // No handleConvert, list items are created when converting to the parent list
    matchNode: (node) => node.type === "list-item",
    isInBlocksSelector: false
  }
};
const paragraphBlocks = {
  paragraph: {
    renderElement: (props) => /* @__PURE__ */ jsx(Typography, { as: "p", variant: "omega", ...props.attributes, children: props.children }),
    icon: Paragraph,
    label: {
      id: "components.Blocks.blocks.text",
      defaultMessage: "Text"
    },
    matchNode: (node) => node.type === "paragraph",
    isInBlocksSelector: true,
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "paragraph" });
    },
    handleEnterKey(editor) {
      if (!editor.selection) {
        return;
      }
      const anchorPathInitialPosition = editor.selection.anchor.path;
      Transforms.splitNodes(editor, {
        // Makes sure we always create a new node,
        // even if there's nothing to the right of the cursor in the node.
        always: true
      });
      const parentBlockEntry = Editor$1.above(editor, {
        match: (node) => !Editor$1.isEditor(node) && node.type !== "text"
      });
      if (!parentBlockEntry) {
        return;
      }
      const [, parentBlockPath] = parentBlockEntry;
      const isNodeEnd = Editor$1.isEnd(editor, editor.selection.anchor, parentBlockPath);
      const [fragmentedNode] = Editor$1.parent(editor, editor.selection.anchor.path);
      Transforms.removeNodes(editor);
      const hasNextNode = editor.children.length - anchorPathInitialPosition[0] > 1;
      Transforms.insertNodes(
        editor,
        {
          type: "paragraph",
          // Don't carry over the modifiers from the previous node if there was no text after the cursor
          children: isNodeEnd ? [{ type: "text", text: "" }] : fragmentedNode.children
        },
        {
          at: hasNextNode ? [anchorPathInitialPosition[0] + 1] : [editor.children.length]
        }
      );
      Transforms.select(editor, editor.start([anchorPathInitialPosition[0] + 1]));
    }
  }
};
const Blockquote = styled.blockquote.attrs({ role: "blockquote" })`
  margin: ${({ theme }) => `${theme.spaces[4]} 0`};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  border-left: ${({ theme }) => `${theme.spaces[1]} solid ${theme.colors.neutral200}`};
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[5]};
  color: ${({ theme }) => theme.colors.neutral600};
`;
const quoteBlocks = {
  quote: {
    renderElement: (props) => (
      // The div is needed to make sure the padding bottom from BlocksContent is applied properly
      // when the quote is the last block in the editor
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Blockquote, { ...props.attributes, children: props.children }) })
    ),
    icon: Quote,
    label: {
      id: "components.Blocks.blocks.quote",
      defaultMessage: "Quote"
    },
    matchNode: (node) => node.type === "quote",
    isInBlocksSelector: true,
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "quote" });
    },
    handleEnterKey(editor) {
      pressEnterTwiceToExit(editor);
    },
    snippets: [">"]
  }
};
const getEntries = (object) => Object.entries(object);
const getKeys = (object) => Object.keys(object);
const ToolbarWrapper = styled(Flex)`
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;
const Separator = styled(Toolbar.Separator)`
  background: ${({ theme }) => theme.colors.neutral150};
  width: 1px;
  height: ${pxToRem(24)};
`;
const FlexButton = styled(Flex)`
  // Inherit the not-allowed cursor from ToolbarWrapper when disabled
  &[aria-disabled] {
    cursor: inherit;
  }

  &[aria-disabled='false'] {
    cursor: pointer;

    // Only apply hover styles if the button is enabled
    &:hover {
      background: ${({ theme }) => theme.colors.primary100};
    }
  }
`;
const SelectWrapper = styled(Box)`
  // Styling changes to SingleSelect component don't work, so adding wrapper to target SingleSelect
  div[role='combobox'] {
    border: none;
    cursor: pointer;
    min-height: unset;
    padding-top: 6px;
    padding-bottom: 6px;

    &[aria-disabled='false']:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.colors.primary100};
    }

    &[aria-disabled] {
      background: transparent;
      cursor: inherit;

      // Select text and icons should also have disabled color
      span {
        color: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
`;
function useConversionModal() {
  const [modalElement, setModalComponent] = React.useState(null);
  const handleConversionResult = (renderModal) => {
    if (renderModal) {
      setModalComponent(React.cloneElement(renderModal(), { key: Date.now() }));
    }
  };
  return { modalElement, handleConversionResult };
}
const ToolbarButton = ({
  icon,
  name,
  label,
  isActive,
  disabled,
  handleClick
}) => {
  const { editor } = useBlocksEditorContext("ToolbarButton");
  const { formatMessage } = useIntl();
  const labelMessage = formatMessage(label);
  const enabledColor = isActive ? "primary600" : "neutral600";
  return /* @__PURE__ */ jsx(Tooltip, { description: labelMessage, children: /* @__PURE__ */ jsx(
    Toolbar.ToggleItem,
    {
      value: name,
      "data-state": isActive ? "on" : "off",
      onMouseDown: (e) => {
        e.preventDefault();
        handleClick();
        ReactEditor.focus(editor);
      },
      "aria-disabled": disabled,
      disabled,
      "aria-label": labelMessage,
      asChild: true,
      children: /* @__PURE__ */ jsx(
        FlexButton,
        {
          as: "button",
          background: isActive ? "primary100" : "",
          alignItems: "center",
          justifyContent: "center",
          width: 7,
          height: 7,
          hasRadius: true,
          children: /* @__PURE__ */ jsx(Icon, { width: 3, height: 3, as: icon, color: disabled ? "neutral300" : enabledColor })
        }
      )
    }
  ) });
};
const BlocksDropdown = () => {
  const { editor, blocks, disabled } = useBlocksEditorContext("BlocksDropdown");
  const { formatMessage } = useIntl();
  const { modalElement, handleConversionResult } = useConversionModal();
  const blockKeysToInclude = getEntries(blocks).reduce((currentKeys, entry) => {
    const [key, block] = entry;
    return block.isInBlocksSelector ? [...currentKeys, key] : currentKeys;
  }, []);
  const [blockSelected, setBlockSelected] = React.useState("paragraph");
  const selectOption = (optionKey) => {
    if (!isSelectorBlockKey(optionKey)) {
      return;
    }
    const editorIsEmpty = editor.children.length === 1 && Editor$1.isEmpty(editor, editor.children[0]);
    if (!editor.selection && !editorIsEmpty) {
      Transforms.insertNodes(
        editor,
        {
          type: "quote",
          children: [{ type: "text", text: "" }]
        },
        {
          select: true
          // Since there's no selection, Slate will automatically insert the node at the end
        }
      );
    } else if (!editor.selection && editorIsEmpty) {
      Transforms.select(editor, Editor$1.start(editor, [0, 0]));
    }
    const maybeRenderModal = blocks[optionKey].handleConvert?.(editor);
    handleConversionResult(maybeRenderModal);
    setBlockSelected(optionKey);
    ReactEditor.focus(editor);
  };
  const preventSelectFocus = (e) => e.preventDefault();
  React.useEffect(() => {
    if (editor.selection) {
      const [anchorNode] = Editor$1.parent(editor, editor.selection.anchor, {
        edge: "start",
        depth: 2
      });
      const anchorBlockKey = getKeys(blocks).find(
        (blockKey) => !Editor$1.isEditor(anchorNode) && blocks[blockKey].matchNode(anchorNode)
      );
      if (anchorBlockKey && anchorBlockKey !== blockSelected) {
        setBlockSelected(anchorBlockKey);
      }
    }
  }, [editor.selection, editor, blocks, blockSelected]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SelectWrapper, { children: /* @__PURE__ */ jsx(
      SingleSelect,
      {
        startIcon: /* @__PURE__ */ jsx(Icon, { as: blocks[blockSelected].icon }),
        onChange: selectOption,
        placeholder: formatMessage(blocks[blockSelected].label),
        value: blockSelected,
        onCloseAutoFocus: preventSelectFocus,
        "aria-label": formatMessage({
          id: "components.Blocks.blocks.selectBlock",
          defaultMessage: "Select a block"
        }),
        disabled,
        children: blockKeysToInclude.map((key) => /* @__PURE__ */ jsx(
          BlockOption,
          {
            value: key,
            label: blocks[key].label,
            icon: blocks[key].icon,
            blockSelected
          },
          key
        ))
      }
    ) }),
    modalElement
  ] });
};
const BlockOption = ({ value, icon, label, blockSelected }) => {
  const { formatMessage } = useIntl();
  const isSelected = value === blockSelected;
  return /* @__PURE__ */ jsx(
    SingleSelectOption,
    {
      startIcon: /* @__PURE__ */ jsx(Icon, { as: icon, color: isSelected ? "primary600" : "neutral600" }),
      value,
      children: formatMessage(label)
    }
  );
};
const isListNode = (node) => {
  return Node.isNode(node) && !Editor$1.isEditor(node) && node.type === "list";
};
const isListActive = (editor, matchNode) => {
  const { selection } = editor;
  if (!selection)
    return false;
  const [match] = Array.from(
    Editor$1.nodes(editor, {
      at: Editor$1.unhangRange(editor, selection),
      match: matchNode
    })
  );
  return Boolean(match);
};
const toggleList = (editor, isActive, format) => {
  if (editor.selection) {
    Transforms.unwrapNodes(editor, {
      match: (node) => isListNode(node) && ["ordered", "unordered"].includes(node.format),
      split: true
    });
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : "list-item"
    });
    if (!isActive) {
      const block = { type: "list", format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  } else {
    const [, lastNodePath] = Editor$1.last(editor, []);
    const [parentNode] = Editor$1.parent(editor, lastNodePath);
    Transforms.removeNodes(editor, {
      voids: true,
      hanging: true,
      at: {
        anchor: { path: lastNodePath, offset: 0 },
        focus: { path: lastNodePath, offset: 0 }
      }
    });
    Transforms.insertNodes(
      editor,
      {
        type: isActive ? "paragraph" : "list-item",
        children: [...parentNode.children]
      },
      {
        at: [lastNodePath[0]],
        select: true
      }
    );
    if (!isActive) {
      const block = { type: "list", format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  }
};
const ListButton = ({ block, format }) => {
  const { editor, disabled } = useBlocksEditorContext("ListButton");
  const { icon, matchNode, label } = block;
  const isActive = isListActive(
    editor,
    (node) => !Editor$1.isEditor(node) && node.type !== "text" && matchNode(node)
  );
  return /* @__PURE__ */ jsx(
    ToolbarButton,
    {
      icon,
      name: format,
      label,
      isActive,
      disabled,
      handleClick: () => toggleList(editor, isActive, format)
    }
  );
};
const LinkButton = ({ disabled }) => {
  const { editor } = useBlocksEditorContext("LinkButton");
  const isLinkActive = () => {
    const { selection } = editor;
    if (!selection)
      return false;
    const [match] = Array.from(
      Editor$1.nodes(editor, {
        at: Editor$1.unhangRange(editor, selection),
        match: (node) => Element.isElement(node) && node.type === "link"
      })
    );
    return Boolean(match);
  };
  const isLinkDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const anchorNodeEntry = Editor$1.above(editor, {
      at: editor.selection.anchor,
      match: (node) => !Editor$1.isEditor(node) && node.type !== "text"
    });
    const focusNodeEntry = Editor$1.above(editor, {
      at: editor.selection.focus,
      match: (node) => !Editor$1.isEditor(node) && node.type !== "text"
    });
    if (!anchorNodeEntry || !focusNodeEntry) {
      return false;
    }
    return anchorNodeEntry[0] !== focusNodeEntry[0];
  };
  const addLink = () => {
    insertLink(editor, { url: "" });
  };
  return /* @__PURE__ */ jsx(
    ToolbarButton,
    {
      icon: Link$5,
      name: "link",
      label: {
        id: "components.Blocks.link",
        defaultMessage: "Link"
      },
      isActive: isLinkActive(),
      handleClick: addLink,
      disabled: isLinkDisabled()
    }
  );
};
const BlocksToolbar = () => {
  const { editor, blocks, modifiers: modifiers2, disabled } = useBlocksEditorContext("BlocksToolbar");
  const checkButtonDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    if (["image", "code"].includes(selectedNode.type)) {
      return true;
    }
    return false;
  };
  const isButtonDisabled = checkButtonDisabled();
  return /* @__PURE__ */ jsx(Toolbar.Root, { "aria-disabled": disabled, asChild: true, children: /* @__PURE__ */ jsxs(ToolbarWrapper, { gap: 2, padding: 2, children: [
    /* @__PURE__ */ jsx(BlocksDropdown, {}),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsx(Toolbar.ToggleGroup, { type: "multiple", asChild: true, children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
      Object.entries(modifiers2).map(([name, modifier]) => /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          name,
          icon: modifier.icon,
          label: modifier.label,
          isActive: modifier.checkIsActive(editor),
          handleClick: () => modifier.handleToggle(editor),
          disabled: isButtonDisabled
        },
        name
      )),
      /* @__PURE__ */ jsx(LinkButton, { disabled: isButtonDisabled })
    ] }) }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsx(Toolbar.ToggleGroup, { type: "single", asChild: true, children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
      /* @__PURE__ */ jsx(ListButton, { block: blocks["list-unordered"], format: "unordered" }),
      /* @__PURE__ */ jsx(ListButton, { block: blocks["list-ordered"], format: "ordered" })
    ] }) })
  ] }) });
};
const StyledEditable = styled(Editable)`
  // The outline style is set on the wrapper with :focus-within
  outline: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces[2]};
  height: 100%;

  > *:last-child {
    padding-bottom: ${({ theme }) => theme.spaces[3]};
  }
`;
const baseRenderLeaf = (props, modifiers2) => {
  const wrappedChildren = getEntries(modifiers2).reduce((currentChildren, modifierEntry) => {
    const [name, modifier] = modifierEntry;
    if (props.leaf[name]) {
      return modifier.renderLeaf(currentChildren);
    }
    return currentChildren;
  }, props.children);
  return /* @__PURE__ */ jsx("span", { ...props.attributes, children: wrappedChildren });
};
const baseRenderElement = (props, blocks) => {
  const blockMatch = Object.values(blocks).find((block2) => block2.matchNode(props.element));
  const block = blockMatch || blocks.paragraph;
  return block.renderElement(props);
};
const BlocksContent = ({ placeholder }) => {
  const { editor, disabled, blocks, modifiers: modifiers2 } = useBlocksEditorContext("BlocksContent");
  const blocksRef = React.useRef(null);
  const { modalElement, handleConversionResult } = useConversionModal();
  const renderLeaf = React.useCallback(
    (props) => baseRenderLeaf(props, modifiers2),
    [modifiers2]
  );
  const renderElement = React.useCallback(
    (props) => baseRenderElement(props, blocks),
    [blocks]
  );
  const checkSnippet = (event) => {
    if (!editor.selection) {
      return;
    }
    const [textNode, textNodePath] = Editor$1.node(editor, editor.selection.anchor.path);
    if (Editor$1.isEditor(textNode) || textNode.type !== "text") {
      return;
    }
    if (textNodePath.at(-1) !== 0) {
      return;
    }
    const blockMatchingSnippet = Object.values(blocks).find((block) => {
      return block.snippets?.includes(textNode.text);
    });
    if (blockMatchingSnippet?.handleConvert) {
      event.preventDefault();
      Transforms.delete(editor, {
        distance: textNode.text.length,
        unit: "character",
        reverse: true
      });
      const maybeRenderModal = blockMatchingSnippet.handleConvert(editor);
      handleConversionResult(maybeRenderModal);
    }
  };
  const handleEnter = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (event.shiftKey && selectedNode.type !== "image") {
      Transforms.insertText(editor, "\n");
      return;
    }
    if (selectedBlock.handleEnterKey) {
      selectedBlock.handleEnterKey(editor);
    } else {
      blocks.paragraph.handleEnterKey(editor);
    }
  };
  const handleBackspaceEvent = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (selectedBlock.handleBackspaceKey) {
      selectedBlock.handleBackspaceKey(editor, event);
    }
  };
  const handleModifierShortcuts = (event) => {
    const isCtrlOrCmd = event.metaKey || event.ctrlKey;
    if (isCtrlOrCmd) {
      Object.values(modifiers2).forEach((value) => {
        if (value.isValidEventKey(event)) {
          value.handleToggle(editor);
        }
      });
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      return handleEnter(event);
    }
    if (event.key === "Backspace") {
      return handleBackspaceEvent(event);
    }
    handleModifierShortcuts(event);
    if (event.key === " ") {
      checkSnippet(event);
    }
  };
  const handleScrollSelectionIntoView = (_, domRange) => {
    const domRect = domRange.getBoundingClientRect();
    const blocksInput = blocksRef.current;
    if (!blocksInput) {
      return;
    }
    const editorRect = blocksInput.getBoundingClientRect();
    if (domRect.top < editorRect.top || domRect.bottom > editorRect.bottom) {
      blocksInput.scrollBy({
        top: 28,
        // 20px is the line-height + 8px line gap
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    Box,
    {
      ref: blocksRef,
      grow: 1,
      width: "100%",
      overflow: "auto",
      fontSize: 2,
      background: "neutral0",
      color: "neutral800",
      lineHeight: 6,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 3,
      paddingBottom: 3,
      children: [
        /* @__PURE__ */ jsx(
          StyledEditable,
          {
            readOnly: disabled,
            placeholder,
            renderElement,
            renderLeaf,
            onKeyDown: handleKeyDown,
            scrollSelectionIntoView: handleScrollSelectionIntoView
          }
        ),
        modalElement
      ]
    }
  );
};
const stylesToInherit = css`
  font-size: inherit;
  color: inherit;
  line-height: inherit;
`;
const BoldText = styled(Typography).attrs({ fontWeight: "bold" })`
  ${stylesToInherit}
`;
const ItalicText = styled(Typography)`
  font-style: italic;
  ${stylesToInherit}
`;
const UnderlineText = styled(Typography).attrs({ textDecoration: "underline" })`
  ${stylesToInherit}
`;
const StrikeThroughText = styled(Typography).attrs({ textDecoration: "line-through" })`
  ${stylesToInherit}
`;
const InlineCode = styled.code`
  background-color: ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => `0 ${theme.spaces[2]}`};
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas,
    monospace;
  color: inherit;
`;
const baseCheckIsActive = (editor, name) => {
  const marks = Editor$1.marks(editor);
  if (!marks)
    return false;
  return Boolean(marks[name]);
};
const baseHandleToggle = (editor, name) => {
  const marks = Editor$1.marks(editor);
  if (!editor.selection) {
    const endOfEditor = Editor$1.end(editor, []);
    Transforms.select(editor, endOfEditor);
  }
  if (marks?.[name]) {
    Editor$1.removeMark(editor, name);
  } else {
    Editor$1.addMark(editor, name, true);
  }
};
const modifiers = {
  bold: {
    icon: Bold,
    isValidEventKey: (event) => event.key === "b",
    label: { id: "components.Blocks.modifiers.bold", defaultMessage: "Bold" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "bold"),
    handleToggle: (editor) => baseHandleToggle(editor, "bold"),
    renderLeaf: (children) => /* @__PURE__ */ jsx(BoldText, { children })
  },
  italic: {
    icon: Italic,
    isValidEventKey: (event) => event.key === "i",
    label: { id: "components.Blocks.modifiers.italic", defaultMessage: "Italic" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "italic"),
    handleToggle: (editor) => baseHandleToggle(editor, "italic"),
    renderLeaf: (children) => /* @__PURE__ */ jsx(ItalicText, { children })
  },
  underline: {
    icon: Underline,
    isValidEventKey: (event) => event.key === "u",
    label: { id: "components.Blocks.modifiers.underline", defaultMessage: "Underline" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "underline"),
    handleToggle: (editor) => baseHandleToggle(editor, "underline"),
    renderLeaf: (children) => /* @__PURE__ */ jsx(UnderlineText, { children })
  },
  strikethrough: {
    icon: StrikeThrough,
    isValidEventKey: (event) => event.key === "S" && event.shiftKey,
    label: { id: "components.Blocks.modifiers.strikethrough", defaultMessage: "Strikethrough" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "strikethrough"),
    handleToggle: (editor) => baseHandleToggle(editor, "strikethrough"),
    renderLeaf: (children) => /* @__PURE__ */ jsx(StrikeThroughText, { children })
  },
  code: {
    icon: Code,
    isValidEventKey: (event) => event.key === "e",
    label: { id: "components.Blocks.modifiers.code", defaultMessage: "Inline code" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "code"),
    handleToggle: (editor) => baseHandleToggle(editor, "code"),
    renderLeaf: (children) => /* @__PURE__ */ jsx(InlineCode, { children })
  }
};
const withImages = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };
  return editor;
};
const withLinks = (editor) => {
  const { isInline, apply, insertText: insertText2, insertData } = editor;
  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };
  editor.lastInsertedLinkPath = null;
  editor.apply = (operation) => {
    if (operation.type === "insert_node") {
      if (!Editor$1.isEditor(operation.node) && operation.node.type === "link") {
        editor.lastInsertedLinkPath = operation.path;
      }
    } else if (operation.type === "move_node") {
      if (Path.hasPrevious(operation.path) && editor.lastInsertedLinkPath) {
        editor.lastInsertedLinkPath = Path.transform(editor.lastInsertedLinkPath, operation);
      }
    }
    apply(operation);
  };
  editor.insertText = (text) => {
    if (editor.selection && Range.isCollapsed(editor.selection) && text === " ") {
      const linksInSelection = Array.from(
        Editor$1.nodes(editor, {
          at: editor.selection,
          match: (node) => !Editor$1.isEditor(node) && node.type === "link"
        })
      );
      const selectionIsInLink = editor.selection && linksInSelection.length > 0;
      const selectionIsAtEndOfLink = selectionIsInLink && Point.equals(editor.selection.anchor, Editor$1.end(editor, linksInSelection[0][1]));
      if (selectionIsAtEndOfLink) {
        Transforms.insertNodes(
          editor,
          { text: " ", type: "text" },
          { at: Path.next(linksInSelection[0][1]), select: true }
        );
        return;
      }
    }
    insertText2(text);
  };
  editor.insertData = (data) => {
    const pastedText = data.getData("text/plain");
    if (pastedText) {
      try {
        new URL(pastedText);
        insertLink(editor, { url: pastedText });
        return;
      } catch (error) {
      }
    }
    insertData(data);
  };
  return editor;
};
const isText = (node) => {
  return Node.isNode(node) && !Editor$1.isEditor(node) && node.type === "text";
};
const withStrapiSchema = (editor) => {
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (!Element.isElement(node) && !isText(node)) {
      Transforms.setNodes(editor, { type: "text" }, { at: path });
      return;
    }
    normalizeNode(entry);
  };
  return editor;
};
const selectorBlockKeys = [
  "paragraph",
  "heading-one",
  "heading-two",
  "heading-three",
  "heading-four",
  "heading-five",
  "heading-six",
  "list-ordered",
  "list-unordered",
  "image",
  "quote",
  "code"
];
const isSelectorBlockKey = (key) => {
  return typeof key === "string" && selectorBlockKeys.includes(key);
};
const [BlocksEditorProvider, usePartialBlocksEditorContext] = createContext("BlocksEditor");
function useBlocksEditorContext(consumerName) {
  const context = usePartialBlocksEditorContext(consumerName);
  const editor = useSlate();
  return {
    ...context,
    editor
  };
}
const EditorDivider = styled(Divider)`
  background: ${({ theme }) => theme.colors.neutral200};
`;
function useResetKey(value) {
  const slateUpdatesCount = React.useRef(0);
  const valueUpdatesCount = React.useRef(0);
  const [key, setKey] = React.useState(0);
  React.useEffect(() => {
    valueUpdatesCount.current += 1;
    if (valueUpdatesCount.current !== slateUpdatesCount.current) {
      setKey((previousKey) => previousKey + 1);
      slateUpdatesCount.current = valueUpdatesCount.current;
    }
  }, [value]);
  return { key, incrementSlateUpdatesCount: () => slateUpdatesCount.current += 1 };
}
const pipe = (...fns) => (value) => fns.reduce((prev, fn) => fn(prev), value);
const BlocksEditor = React.forwardRef(
  ({ disabled = false, name, placeholder, onChange, value, error }, forwardedRef) => {
    const { formatMessage } = useIntl();
    const [editor] = React.useState(
      () => pipe(withHistory, withImages, withStrapiSchema, withReact, withLinks)(createEditor())
    );
    const formattedPlaceholder = placeholder && formatMessage({ id: placeholder.id, defaultMessage: placeholder.defaultMessage });
    React.useImperativeHandle(
      forwardedRef,
      () => ({
        focus() {
          ReactEditor.focus(editor);
        }
      }),
      [editor]
    );
    const { key, incrementSlateUpdatesCount } = useResetKey(value);
    const handleSlateChange = (state) => {
      const isAstChange = editor.operations.some((op) => op.type !== "set_selection");
      if (isAstChange) {
        incrementSlateUpdatesCount();
        onChange({
          // Casting is needed because Slate's onChange type doesn't take into consideration
          // that we set Editor['children'] to Attribute.BlocksValue in custom.d.ts
          target: { name, value: state, type: "blocks" }
        });
      }
    };
    const blocks = {
      ...paragraphBlocks,
      ...headingBlocks,
      ...listBlocks,
      ...linkBlocks,
      ...imageBlocks,
      ...quoteBlocks,
      ...codeBlocks
    };
    return /* @__PURE__ */ jsx(
      Slate,
      {
        editor,
        initialValue: value || [{ type: "paragraph", children: [{ type: "text", text: "" }] }],
        onChange: handleSlateChange,
        children: /* @__PURE__ */ jsx(BlocksEditorProvider, { blocks, modifiers, disabled, children: /* @__PURE__ */ jsxs(
          InputWrapper,
          {
            direction: "column",
            alignItems: "flex-start",
            height: "512px",
            disabled,
            hasError: Boolean(error),
            style: { overflow: "hidden" },
            children: [
              /* @__PURE__ */ jsx(BlocksToolbar, {}),
              /* @__PURE__ */ jsx(EditorDivider, { width: "100%" }),
              /* @__PURE__ */ jsx(BlocksContent, { placeholder: formattedPlaceholder })
            ]
          }
        ) })
      },
      key
    );
  }
);
const LabelAction$2 = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
const BlocksInput = React.forwardRef(
  ({ intlLabel, labelAction, name, required = false, error = "", hint, ...editorProps }, forwardedRef) => {
    const { formatMessage } = useIntl();
    const label = intlLabel.id ? formatMessage(intlLabel) : name;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: [
            label,
            required && /* @__PURE__ */ jsx(Typography, { textColor: "danger600", lineHeight: "0px", children: "*" })
          ] }),
          labelAction && /* @__PURE__ */ jsx(LabelAction$2, { paddingLeft: 1, children: labelAction })
        ] }),
        /* @__PURE__ */ jsx(BlocksEditor, { name, error, ref: forwardedRef, ...editorProps }),
        /* @__PURE__ */ jsx(Hint, { hint, name, error })
      ] }),
      error && /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "danger600", "data-strapi-field-error": true, children: error }) })
    ] });
  }
);
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
const UID_REGEX = /^[A-Za-z0-9-_.~]*$/;
const InputUID = React.forwardRef(
  ({
    contentTypeUID,
    hint,
    disabled,
    error,
    intlLabel,
    labelAction,
    name,
    onChange,
    value = "",
    placeholder,
    required
  }, forwardedRef) => {
    const [availability, setAvailability] = React.useState();
    const [showRegenerate, setShowRegenerate] = React.useState(false);
    const debouncedValue = useDebounce(value, 300);
    const { modifiedData, initialData } = useCMEditViewDataManager();
    const toggleNotification = useNotification();
    const { formatAPIError } = useAPIErrorHandler();
    const { formatMessage } = useIntl();
    const { post } = useFetchClient();
    const label = intlLabel.id ? formatMessage(
      { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
      { ...intlLabel.values }
    ) : name;
    const formattedPlaceholder = placeholder ? formatMessage(
      { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
      { ...placeholder.values }
    ) : "";
    const { data: defaultGeneratedUID, isLoading: isGeneratingDefaultUID } = useQuery({
      queryKey: ["uid", { contentTypeUID, field: name, data: modifiedData }],
      async queryFn({ queryKey }) {
        const [, body] = queryKey;
        const {
          data: { data }
        } = await post("/content-manager/uid/generate", body);
        return data;
      },
      onError(err) {
        if (err instanceof AxiosError) {
          toggleNotification({
            type: "warning",
            message: formatAPIError(err)
          });
        }
      },
      enabled: !value && required
    });
    React.useEffect(() => {
      if (defaultGeneratedUID) {
        onChange({ target: { name, value: defaultGeneratedUID, type: "text" } }, true);
      }
    }, [defaultGeneratedUID, name, onChange]);
    const { mutate: generateUID, isLoading: isGeneratingUID } = useMutation({
      async mutationFn(body) {
        const {
          data: { data }
        } = await post("/content-manager/uid/generate", body);
        return data;
      },
      onSuccess(data) {
        onChange({ target: { name, value: data, type: "text" } });
      },
      onError(err) {
        if (err instanceof AxiosError) {
          toggleNotification({
            type: "warning",
            message: formatAPIError(err)
          });
        }
      }
    });
    const { data: availabilityData, isLoading: isCheckingAvailability } = useQuery({
      queryKey: [
        "uid",
        { contentTypeUID, field: name, value: debouncedValue ? debouncedValue.trim() : "" }
      ],
      async queryFn({ queryKey }) {
        const [, body] = queryKey;
        const { data } = await post("/content-manager/uid/check-availability", body);
        return data;
      },
      enabled: Boolean(
        debouncedValue !== initialData[name] && debouncedValue && UID_REGEX.test(debouncedValue.trim())
      ),
      onError(err) {
        if (err instanceof AxiosError) {
          toggleNotification({
            type: "warning",
            message: formatAPIError(err)
          });
        }
      }
    });
    React.useEffect(() => {
      setAvailability(availabilityData);
      let timer;
      if (availabilityData?.isAvailable) {
        timer = window.setTimeout(() => {
          setAvailability(void 0);
        }, 4e3);
      }
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [availabilityData]);
    const isLoading = isGeneratingDefaultUID || isGeneratingUID || isCheckingAvailability;
    return /* @__PURE__ */ jsx(
      TextInput,
      {
        ref: forwardedRef,
        disabled,
        error,
        endAction: /* @__PURE__ */ jsxs(Flex, { position: "relative", gap: 1, children: [
          availability && !showRegenerate && /* @__PURE__ */ jsxs(
            TextValidation,
            {
              alignItems: "center",
              gap: 1,
              justifyContent: "flex-end",
              available: !!availability?.isAvailable,
              "data-not-here-outer": true,
              position: "absolute",
              pointerEvents: "none",
              right: 6,
              width: "100px",
              children: [
                availability?.isAvailable ? /* @__PURE__ */ jsx(CheckCircle, {}) : /* @__PURE__ */ jsx(ExclamationMarkCircle, {}),
                /* @__PURE__ */ jsx(
                  Typography,
                  {
                    textColor: availability.isAvailable ? "success600" : "danger600",
                    variant: "pi",
                    children: formatMessage(
                      availability.isAvailable ? {
                        id: "content-manager.components.uid.available",
                        defaultMessage: "Available"
                      } : {
                        id: "content-manager.components.uid.unavailable",
                        defaultMessage: "Unavailable"
                      }
                    )
                  }
                )
              ]
            }
          ),
          !disabled && /* @__PURE__ */ jsxs(Fragment, { children: [
            showRegenerate && /* @__PURE__ */ jsx(TextValidation, { alignItems: "center", justifyContent: "flex-end", gap: 1, children: /* @__PURE__ */ jsx(Typography, { textColor: "primary600", variant: "pi", children: formatMessage({
              id: "content-manager.components.uid.regenerate",
              defaultMessage: "Regenerate"
            }) }) }),
            /* @__PURE__ */ jsx(
              FieldActionWrapper,
              {
                onClick: () => generateUID({ contentTypeUID, field: name, data: modifiedData }),
                label: formatMessage({
                  id: "content-manager.components.uid.regenerate",
                  defaultMessage: "Regenerate"
                }),
                onMouseEnter: () => setShowRegenerate(true),
                onMouseLeave: () => setShowRegenerate(false),
                children: isLoading ? /* @__PURE__ */ jsx(LoadingWrapper, { "data-testid": "loading-wrapper", children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsx(Refresh, {})
              }
            )
          ] })
        ] }),
        hint,
        label,
        labelAction,
        name,
        onChange,
        placeholder: formattedPlaceholder,
        value,
        required
      }
    );
  }
);
const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const TextValidation = styled(Flex)`
  svg {
    height: ${12 / 16}rem;
    width: ${12 / 16}rem;

    path {
      fill: ${({ theme, available }) => available ? theme.colors.success600 : theme.colors.danger600};
    }
  }
`;
const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoadingWrapper = styled(Flex)`
  animation: ${rotation} 2s infinite linear;
`;
const loadCss = async () => {
  await import("highlight.js/styles/solarized-dark.css?used");
};
loadCss();
const md = new Markdown({
  html: true,
  // Enable HTML tags in source
  xhtmlOut: false,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  // Code from: https://github.com/markdown-it/markdown-it/blob/master/support/demo_template/index.js#L83
  highlight(str, lang) {
    if (lang && lang !== "auto" && getLanguage(lang)) {
      return '<pre class="hljs language-' + md.utils.escapeHtml(lang.toLowerCase()) + '"><code>' + highlight(lang, str, true).value + "</code></pre>";
    }
    if (lang === "auto") {
      const result = highlightAuto(str);
      return '<pre class="hljs language-' + md.utils.escapeHtml(result.language) + '"><code>' + result.value + "</code></pre>";
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>";
  }
}).use(abbr).use(container, "warning").use(container, "tip").use(deflist).use(emoji).use(footnote).use(ins).use(mark).use(sub).use(sup);
md.renderer.rules.footnote_ref = (tokens, idx, options2, env, slf) => {
  const caption = slf.rules.footnote_caption?.(tokens, idx, options2, env, slf);
  return '<sup class="footnote-ref"><span>' + caption + "</span></sup>";
};
md.renderer.rules.footnote_anchor = () => {
  return ' <span class="footnote-backref">↩︎</span>';
};
const PreviewWysiwyg = ({ data = "" }) => {
  const html = React.useMemo(
    () => sanitizeHtml(md.render(data.replaceAll("\\n", "\n") || ""), {
      ...sanitizeHtml.defaults,
      allowedTags: false,
      allowedAttributes: {
        "*": ["href", "align", "alt", "center", "width", "height", "type", "controls", "target"],
        img: ["src", "alt"],
        source: ["src", "type"]
      }
    }),
    [data]
  );
  return /* @__PURE__ */ jsx(Wrapper$1, { children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: html } }) });
};
const Wrapper$1 = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  font-size: ${14 / 16}rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral800};
  line-height: ${({ theme }) => theme.lineHeights[6]};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: ${({ theme }) => theme.spaces[2]};
    margin-block-end: ${({ theme }) => theme.spaces[2]};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spaces[2]};
  }

  h1 {
    font-size: ${36 / 16}rem;
    font-weight: 600;
  }

  h2 {
    font-size: ${30 / 16}rem;
    font-weight: 500;
  }

  h3 {
    font-size: ${24 / 16}rem;
    font-weight: 500;
  }

  h4 {
    font-size: ${20 / 16}rem;
    font-weight: 500;
  }

  strong {
    font-weight: 800;
  }

  em {
    font-style: italic;
  }

  blockquote {
    margin-top: ${({ theme }) => theme.spaces[8]};
    margin-bottom: ${({ theme }) => theme.spaces[7]};
    font-size: ${14 / 16}rem;
    font-weight: 400;
    border-left: 4px solid ${({ theme }) => theme.colors.neutral150};
    font-style: italic;
    padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[5]};
  }

  img {
    max-width: 100%;
  }

  table {
    thead {
      background: ${({ theme }) => theme.colors.neutral150};

      th {
        padding: ${({ theme }) => theme.spaces[4]};
      }
    }
    tr {
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
    }
    th,
    td {
      padding: ${({ theme }) => theme.spaces[4]};
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
      border-bottom: 0;
      border-top: 0;
    }
  }

  pre,
  code {
    font-size: ${14 / 16}rem;
    border-radius: 4px;
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral800 changes between themes.

      Matches the color of the JSON Input component.
    */
    background-color: #32324d;
    max-width: 100%;
    overflow: auto;
    padding: ${({ theme }) => theme.spaces[2]};
  }

  /* Inline code */
  p,
  pre,
  td {
    > code {
      color: #839496;
    }
  }

  ol {
    list-style-type: decimal;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ol,
    ul {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }

  ul {
    list-style-type: disc;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ul,
    ol {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }
`;
var listRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/, emptyListRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/, unorderedListRE = /[*+-]\s/;
function newlineAndIndentContinueMarkdownList(cm) {
  if (cm.getOption("disableInput"))
    return CodeMirror.Pass;
  var ranges = cm.listSelections(), replacements = [];
  for (var i = 0; i < ranges.length; i++) {
    var pos = ranges[i].head;
    var eolState = cm.getStateAfter(pos.line);
    var inList = eolState.list !== false;
    var inQuote = eolState.quote !== 0;
    var line = cm.getLine(pos.line), match = listRE.exec(line);
    var cursorBeforeBullet = /^\s*$/.test(line.slice(0, pos.ch));
    if (!ranges[i].empty() || !inList && !inQuote || !match || cursorBeforeBullet) {
      cm.execCommand("newlineAndIndent");
      return;
    }
    if (emptyListRE.test(line)) {
      var endOfQuote = inQuote && />\s*$/.test(line);
      var endOfList = !/>\s*$/.test(line);
      if (endOfQuote || endOfList)
        cm.replaceRange(
          "",
          {
            line: pos.line,
            ch: 0
          },
          {
            line: pos.line,
            ch: pos.ch + 1
          }
        );
      replacements[i] = "\n";
    } else {
      var indent = match[1], after = match[5];
      var numbered = !(unorderedListRE.test(match[2]) || match[2].indexOf(">") >= 0);
      var bullet = numbered ? parseInt(match[3], 10) + 1 + match[4] : match[2].replace("x", " ");
      replacements[i] = "\n" + indent + bullet + after;
      if (numbered)
        incrementRemainingMarkdownListNumbers(cm, pos);
    }
  }
  cm.replaceSelections(replacements);
}
function incrementRemainingMarkdownListNumbers(cm, pos) {
  var startLine = pos.line, lookAhead = 0, skipCount = 0;
  var startItem = listRE.exec(cm.getLine(startLine)), startIndent = startItem[1];
  do {
    lookAhead += 1;
    var nextLineNumber = startLine + lookAhead;
    var nextLine = cm.getLine(nextLineNumber);
    var nextItem = listRE.exec(nextLine);
    if (nextItem) {
      var nextIndent = nextItem[1];
      var newNumber = parseInt(startItem[3], 10) + lookAhead - skipCount;
      var nextNumber = parseInt(nextItem[3], 10), itemNumber = nextNumber;
      if (startIndent === nextIndent && !isNaN(nextNumber)) {
        if (newNumber === nextNumber)
          itemNumber = nextNumber + 1;
        if (newNumber > nextNumber)
          itemNumber = newNumber + 1;
        cm.replaceRange(
          nextLine.replace(listRE, nextIndent + itemNumber + nextItem[4] + nextItem[5]),
          {
            line: nextLineNumber,
            ch: 0
          },
          {
            line: nextLineNumber,
            ch: nextLine.length
          }
        );
      } else {
        if (startIndent.length > nextIndent.length)
          return;
        if (startIndent.length < nextIndent.length && lookAhead === 1)
          return;
        skipCount += 1;
      }
    }
  } while (nextItem);
}
const Editor = React.forwardRef(
  ({
    disabled,
    editorRef,
    error,
    isPreviewMode,
    isExpandMode,
    name,
    onChange,
    placeholder,
    textareaRef,
    value
  }, forwardedRef) => {
    const onChangeRef = React.useRef(onChange);
    React.useEffect(() => {
      editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
        lineWrapping: true,
        extraKeys: {
          Enter: "newlineAndIndentContinueMarkdownList",
          Tab: false,
          "Shift-Tab": false
        },
        readOnly: false,
        smartIndent: false,
        placeholder,
        spellcheck: true,
        inputStyle: "contenteditable"
      });
      CodeMirror.commands.newlineAndIndentContinueMarkdownList = newlineAndIndentContinueMarkdownList;
      editorRef.current.on("change", (doc) => {
        onChangeRef.current({ target: { name, value: doc.getValue(), type: "wysiwyg" } });
      });
    }, [editorRef, textareaRef, name, placeholder]);
    React.useEffect(() => {
      if (value && !editorRef.current.hasFocus()) {
        editorRef.current.setValue(value);
      }
    }, [editorRef, value]);
    React.useEffect(() => {
      if (isPreviewMode || disabled) {
        editorRef.current.setOption("readOnly", "nocursor");
      } else {
        editorRef.current.setOption("readOnly", false);
      }
    }, [disabled, isPreviewMode, editorRef]);
    React.useEffect(() => {
      if (error) {
        editorRef.current.setOption("screenReaderLabel", error);
      } else {
        editorRef.current.setOption("screenReaderLabel", "Editor");
      }
    }, [editorRef, error]);
    React.useImperativeHandle(
      forwardedRef,
      () => ({
        focus() {
          editorRef.current.getInputField().focus();
        },
        scrollIntoView(args) {
          editorRef.current.getInputField().scrollIntoView(args);
        }
      }),
      [editorRef]
    );
    return /* @__PURE__ */ jsxs(EditorAndPreviewWrapper, { children: [
      /* @__PURE__ */ jsx(EditorStylesContainer, { isExpandMode, disabled: disabled || isPreviewMode, children: /* @__PURE__ */ jsx("textarea", { ref: textareaRef }) }),
      isPreviewMode && /* @__PURE__ */ jsx(PreviewWysiwyg, { data: value })
    ] });
  }
);
const EditorAndPreviewWrapper = styled.div`
  position: relative;
  height: calc(100% - 48px);
`;
const EditorStylesContainer = styled.div`
  cursor: ${({ disabled }) => disabled ? "not-allowed !important" : "auto"};
  height: 100%;
  /* BASICS */
  .CodeMirror-placeholder {
    color: ${({ theme }) => theme.colors.neutral600} !important;
  }

  .CodeMirror {
    /* Set height, width, borders, and global font properties here */
    font-size: ${14 / 16}rem;
    height: ${({ isExpandMode }) => isExpandMode ? "100%" : "410px"}; //  512px(total height) - 48px (header) - 52px(footer) - 2px border
    color: ${({ theme }) => theme.colors.neutral800};
    direction: ltr;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* PADDING */

  .CodeMirror-lines {
    padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
    /* Vertical padding around content */
  }

  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    /* The little square between H and V scrollbars */
    background-color: ${({ theme }) => `${theme.colors.neutral0}`};
  }

  /* GUTTER */

  .CodeMirror-gutters {
    border-right: 1px solid #ddd;
    background-color: #f7f7f7;
    white-space: nowrap;
  }
  .CodeMirror-linenumbers {
  }
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }

  .CodeMirror-guttermarker {
    color: black;
  }
  .CodeMirror-guttermarker-subtle {
    color: #999;
  }

  /* CURSOR */

  .CodeMirror-cursor {
    border-left: 1px solid black;
    border-right: none;
    width: 0;
  }
  /* Shown when moving in bi-directional text */
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    /* z-index: 1; */
  }

  .cm-fat-cursor-mark {
    background-color: rgba(20, 255, 20, 0.5);
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7;
  }

  /* Can style cursor different in overwrite (non-insert) mode */
  .CodeMirror-overwrite .CodeMirror-cursor {
  }

  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }

  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: 0;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }

  /* DEFAULT THEME */

  .cm-header,
  .cm-strong {
    font-weight: bold;
  }
  .cm-em {
    font-style: italic;
  }
  .cm-link {
    text-decoration: underline;
  }
  .cm-strikethrough {
    text-decoration: line-through;
  }

  .CodeMirror-composing {
    border-bottom: 2px solid;
  }

  /* Default styles for common addons */

  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0;
  }
  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22;
  }
  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }
  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }

  /* STOP */

  /* The rest of this file contains styles related to the mechanics of
    the editor. You probably shouldn't touch them. */

  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: ${({ theme }) => `${theme.colors.neutral0}`};
  }

  .CodeMirror-scroll {
    overflow: scroll !important; /* Things will break if this is overridden */
    /* 50px is the magic margin used to hide the element's real scrollbars */
    /* See overflow: hidden in .CodeMirror */
    margin-bottom: -50px;
    margin-right: -50px;
    padding-bottom: 50px;
    height: 100%;
    outline: none; /* Prevent dragging from highlighting the element */
    position: relative;
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 50px solid transparent;
  }

  /* The fake, visible scrollbars. Used to force redraw during scrolling
    before actual scrolling happens, thus preventing shaking and
    flickering artifacts. */
  .CodeMirror-vscrollbar,
  .CodeMirror-hscrollbar,
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    position: absolute;
    z-index: 1;
    display: none;
    outline: none;
  }

  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0;
  }

  .CodeMirror-lines {
    cursor: text;
    min-height: 1px; /* prevents collapsing before first draw */
  }
  /* Reset some styles that the rest of the page might have set */
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: 1.5;
    color: inherit;
    /* z-index: 2; */
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }

  .CodeMirror pre.CodeMirror-line-like {
    z-index: 2;
  }

  .CodeMirror-wrap pre.CodeMirror-line,
  .CodeMirror-wrap pre.CodeMirror-line-like {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }

  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }

  .CodeMirror-linewidget {
    position: relative;
    /* z-index: 2; */
    padding: 0.1px; /* Force widget margins to stay inside of the container */
  }

  .CodeMirror-widget {
  }

  .CodeMirror-rtl pre {
    direction: rtl;
  }

  .CodeMirror-code {
    outline: none;
  }

  /* Force content-box sizing for the elements where we expect it */
  .CodeMirror-scroll,
  .CodeMirror-sizer,
  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
    border-color: ${({ theme }) => `${theme.colors.neutral800}`};
  }
  .CodeMirror-measure pre {
    position: static;
  }

  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    + div {
      z-index: 0 !important;
    }
  }

  div.CodeMirror-dragcursors {
    visibility: visible;
  }

  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }

  .CodeMirror-selected {
    background: ${({ theme }) => theme.colors.neutral200};
    /* z-index: -10; */
  }
  .CodeMirror-crosshair {
    cursor: crosshair;
  }

  /* Used to force a border model for a node */
  .cm-force-border {
    padding-right: 0.1px;
  }

  /* See issue #2901 */
  .cm-tab-wrap-hack:after {
    content: '';
  }

  /* Help users use markselection to safely style text background */
  span.CodeMirror-selectedtext {
    background: none;
  }

  span {
    color: ${({ theme }) => theme.colors.neutral800} !important;
  }
`;
const EditorLayout = ({
  children,
  isExpandMode,
  error,
  previewContent = "",
  onCollapse
}) => {
  const { formatMessage } = useIntl();
  useLockScroll({ lockScroll: isExpandMode });
  if (isExpandMode) {
    return /* @__PURE__ */ jsx(Portal, { role: "dialog", "aria-modal": false, children: /* @__PURE__ */ jsx(FocusTrap, { onEscape: onCollapse, children: /* @__PURE__ */ jsx(
      ExpandWrapper,
      {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 4,
        justifyContent: "center",
        onClick: onCollapse,
        children: /* @__PURE__ */ jsx(
          Box,
          {
            background: "neutral0",
            hasRadius: true,
            shadow: "popupShadow",
            overflow: "hidden",
            width: "90%",
            height: "90%",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxs(Flex, { height: "100%", alignItems: "flex-start", children: [
              /* @__PURE__ */ jsx(BoxWithBorder, { flex: "1", height: "100%", children }),
              /* @__PURE__ */ jsxs(Flex, { alignItems: "start", direction: "column", flex: 1, height: "100%", width: "100%", children: [
                /* @__PURE__ */ jsx(
                  Flex,
                  {
                    height: pxToRem(48),
                    background: "neutral100",
                    justifyContent: "flex-end",
                    shrink: 0,
                    width: "100%",
                    children: /* @__PURE__ */ jsxs(ExpandButton$1, { onClick: onCollapse, children: [
                      /* @__PURE__ */ jsx(Typography, { children: formatMessage({
                        id: "components.Wysiwyg.collapse",
                        defaultMessage: "Collapse"
                      }) }),
                      /* @__PURE__ */ jsx(Collapse, {})
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(Box, { position: "relative", height: "100%", width: "100%", children: /* @__PURE__ */ jsx(PreviewWysiwyg, { data: previewContent }) })
              ] })
            ] })
          }
        )
      }
    ) }) });
  }
  return /* @__PURE__ */ jsx(
    Box,
    {
      borderColor: error ? "danger600" : "neutral200",
      borderStyle: "solid",
      borderWidth: "1px",
      hasRadius: true,
      children
    }
  );
};
const ExpandWrapper = styled(Flex)`
  background: ${({ theme }) => `${theme.colors.neutral800}${Math.floor(0.2 * 255).toString(16).padStart(2, "0")}`};
`;
const BoxWithBorder = styled(Box)`
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
`;
const ExpandButton$1 = styled(BaseButton)`
  background-color: transparent;
  border: none;
  align-items: center;

  svg {
    margin-left: ${({ theme }) => `${theme.spaces[2]}`};

    path {
      fill: ${({ theme }) => theme.colors.neutral700};
      width: ${12 / 16}rem;
      height: ${12 / 16}rem;
    }
  }
`;
const replaceText = (markdownName, textToChange) => {
  let editedText;
  switch (markdownName) {
    case "Strikethrough":
      editedText = `~~${textToChange}~~`;
      break;
    case "Bold":
      editedText = `**${textToChange}**`;
      break;
    case "Italic":
      editedText = `_${textToChange}_`;
      break;
    case "Underline":
      editedText = `<u>${textToChange}</u>`;
      break;
    case "Code":
      editedText = `\`\`\`
${textToChange}
\`\`\``;
      break;
    case "Link":
      editedText = `[${textToChange}](link)`;
      break;
    case "Quote":
      editedText = `>${textToChange}`;
      break;
    default:
      editedText = textToChange;
  }
  return editedText;
};
const insertText = (markdownName) => {
  let editedText;
  const selection = { start: markdownName.length, end: 0 };
  switch (markdownName) {
    case "Strikethrough":
      editedText = `~~${markdownName}~~`;
      selection.end = 2;
      break;
    case "Bold":
      editedText = `**${markdownName}**`;
      selection.end = 2;
      break;
    case "Italic":
      editedText = `_${markdownName}_`;
      selection.end = 1;
      break;
    case "alt":
      editedText = `[${markdownName}]()`;
      selection.end = 3;
      break;
    case "Underline":
      editedText = `<u>${markdownName}</u>`;
      selection.end = 4;
      break;
    case "Code":
      editedText = `\`\`\`
${markdownName}
\`\`\``;
      selection.end = 3;
      break;
    case "Link":
      editedText = `[${markdownName}](link)`;
      selection.end = 7;
      break;
    case "Quote":
      editedText = `>${markdownName}`;
      selection.end = 0;
      break;
    default:
      editedText = "";
  }
  return { editedText, selection };
};
const insertListOrTitle = (markdown) => {
  let textToInsert;
  switch (markdown) {
    case "BulletList":
      textToInsert = "- ";
      break;
    case "NumberList":
      textToInsert = "1. ";
      break;
    case "h1":
      textToInsert = "# ";
      break;
    case "h2":
      textToInsert = "## ";
      break;
    case "h3":
      textToInsert = "### ";
      break;
    case "h4":
      textToInsert = "#### ";
      break;
    case "h5":
      textToInsert = "##### ";
      break;
    case "h6":
      textToInsert = "###### ";
      break;
    default:
      return "";
  }
  return textToInsert;
};
const markdownHandler = (editor, markdownType) => {
  const textToEdit = editor.current.getSelection();
  let textToInsert;
  if (textToEdit) {
    const editedText = replaceText(markdownType, textToEdit);
    editor.current.replaceSelection(editedText);
    editor.current.focus();
  } else {
    textToInsert = insertText(markdownType);
    editor.current.replaceSelection(textToInsert.editedText);
    editor.current.focus();
    const { line, ch } = editor.current.getCursor();
    const endSelection = ch - textToInsert.selection.end;
    const startSelection = ch - textToInsert.selection.end - textToInsert.selection.start;
    editor.current.setSelection({ line, ch: startSelection }, { line, ch: endSelection });
  }
};
const listHandler = (editor, listType) => {
  const doc = editor.current.getDoc();
  const insertion = listType === "BulletList" ? "- " : "1. ";
  if (doc.somethingSelected()) {
    const selections = doc.listSelections();
    let remove = null;
    editor.current.operation(function() {
      selections.forEach(function(selection) {
        const pos = [selection.head.line, selection.anchor.line].sort();
        if (remove == null) {
          remove = doc.getLine(pos[0]).startsWith(insertion);
        }
        for (let i = pos[0]; i <= pos[1]; i++) {
          if (remove) {
            if (doc.getLine(i).startsWith(insertion)) {
              doc.replaceRange("", { line: i, ch: 0 }, { line: i, ch: insertion.length });
            }
          } else {
            const lineInsertion = listType === "BulletList" ? "- " : `${i + 1}. `;
            doc.replaceRange(lineInsertion, { line: i, ch: 0 });
          }
        }
      });
    });
  } else {
    const { line: currentLine } = doc.getCursor();
    const listToInsert = insertListOrTitle(listType);
    const lineContent = editor.current.getLine(currentLine);
    const textToInsert = listToInsert + lineContent;
    editor.current.setSelection(
      { line: currentLine, ch: 0 },
      { line: currentLine, ch: lineContent.length }
    );
    editor.current.replaceSelection(textToInsert);
  }
  editor.current.focus();
};
const titleHandler = (editor, titleType) => {
  const { line: currentLine } = editor.current.getCursor();
  const titleToInsert = insertListOrTitle(titleType);
  const lineContent = editor.current.getLine(currentLine);
  const lineWithNoTitle = lineContent.replace(/#{1,6}\s/g, "").trim();
  const textToInsert = titleToInsert + lineWithNoTitle;
  editor.current.setSelection(
    { line: currentLine, ch: 0 },
    { line: currentLine, ch: lineContent.length }
  );
  editor.current.replaceSelection(textToInsert);
  setTimeout(() => {
    const newLastLineLength = editor.current.getLine(currentLine).length;
    editor.current.focus();
    editor.current.setCursor({ line: currentLine, ch: newLastLineLength });
  }, 0);
};
const insertFile = (editor, files) => {
  let { line } = editor.current.getCursor();
  const { ch } = editor.current.getCursor();
  files.forEach((file, i) => {
    let contentLength = editor.current.getLine(line).length;
    editor.current.setCursor({ line, ch: contentLength });
    if (i > 0 || i === 0 && ch !== 0) {
      contentLength = editor.current.getLine(line).length;
      editor.current.setCursor({ line, ch: contentLength });
      line++;
      editor.current.replaceSelection("\n");
    }
    if (file.mime.includes("image")) {
      editor.current.replaceSelection(`![${file.alt}](${file.url})`);
    } else {
      editor.current.replaceSelection(`[${file.alt}](${file.url})`);
    }
  });
  setTimeout(() => editor.current.focus(), 0);
};
const insertWithTextToEdit = (editor, markdownType, line, contentLength, textToEdit) => {
  const textToInsert = replaceText(markdownType, textToEdit);
  const contentToMove = editor.current.getRange(
    { line: line + 1, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.replaceRange("", { line: line + 1, ch: 0 }, { line: Infinity, ch: Infinity });
  editor.current.replaceSelection("");
  editor.current.setCursor({ line, ch: contentLength });
  editor.current.replaceSelection("\n");
  editor.current.replaceSelection(textToInsert);
  if (markdownType === "Code") {
    const { line: newLine } = editor.current.getCursor();
    editor.current.setCursor({ line: newLine - 1, ch: textToEdit.length });
  }
  editor.current.replaceRange(
    contentToMove,
    { line: line + 4, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.focus();
};
const insertWithoutTextToEdit = (editor, markdownType, line, contentLength) => {
  const textToInsert = insertText(markdownType);
  const contentToMove = editor.current.getRange(
    { line: line + 1, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.replaceRange("", { line: line + 1, ch: 0 }, { line: Infinity, ch: Infinity });
  editor.current.setCursor({ line, ch: contentLength });
  editor.current.replaceSelection("\n");
  editor.current.replaceSelection(textToInsert.editedText);
  if (markdownType === "Code") {
    line += 2;
    editor.current.setSelection({ line, ch: 0 }, { line, ch: 4 });
  } else {
    line += 1;
    const { ch } = editor.current.getCursor();
    const endSelection = ch - textToInsert.selection.end;
    const startSelection = ch - textToInsert.selection.end - textToInsert.selection.start;
    editor.current.setSelection({ line, ch: startSelection }, { line, ch: endSelection });
  }
  editor.current.replaceRange(
    contentToMove,
    { line: line + 2, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.focus();
};
const quoteAndCodeHandler = (editor, markdownType) => {
  const textToEdit = editor.current.getSelection();
  const { line } = editor.current.getCursor();
  const contentLength = editor.current.getLine(line).length;
  if (textToEdit) {
    insertWithTextToEdit(editor, markdownType, line, contentLength, textToEdit);
  } else {
    insertWithoutTextToEdit(editor, markdownType, line, contentLength);
  }
};
const CustomIconButton$1 = styled(IconButton)`
  padding: ${({ theme }) => theme.spaces[2]};
  /* Trick to prevent the outline from overflowing because of the general outline-offset */
  outline-offset: -2px !important;

  svg {
    width: ${18 / 16}rem;
    height: ${18 / 16}rem;
  }
`;
const CustomLinkIconButton = styled(CustomIconButton$1)`
  svg {
    width: ${8 / 16}rem;
    height: ${8 / 16}rem;
  }
`;
const MainButtons = styled(IconButtonGroup)`
  margin-left: ${({ theme }) => theme.spaces[4]};
`;
const MoreButton = styled(IconButton)`
  margin: ${({ theme }) => `0 ${theme.spaces[2]}`};
  padding: ${({ theme }) => theme.spaces[2]};

  svg {
    width: ${18 / 16}rem;
    height: ${18 / 16}rem;
  }
`;
const IconButtonGroupMargin = styled(IconButtonGroup)`
  margin-right: ${({ theme }) => `${theme.spaces[2]}`};
`;
const ExpandButton = styled(BaseButton)`
  background-color: transparent;
  border: none;
  align-items: center;

  svg {
    margin-left: ${({ theme }) => `${theme.spaces[2]}`};
    path {
      fill: ${({ theme }) => theme.colors.neutral700};
      width: ${12 / 16}rem;
      height: ${12 / 16}rem;
    }
  }
`;
const WysiwygFooter = ({ onToggleExpand }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Box, { padding: 2, background: "neutral100", borderRadius: `0 0 ${4 / 16}rem ${4 / 16}rem`, children: /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", alignItems: "flex-end", children: /* @__PURE__ */ jsxs(ExpandButton, { id: "expand", onClick: onToggleExpand, children: [
    /* @__PURE__ */ jsx(Typography, { children: formatMessage({
      id: "components.WysiwygBottomControls.fullscreen",
      defaultMessage: "Expand"
    }) }),
    /* @__PURE__ */ jsx(Expand, {})
  ] }) }) });
};
const WysiwygNav = ({
  disabled,
  editorRef,
  isExpandMode,
  isPreviewMode,
  onActionClick,
  onToggleMediaLib,
  onTogglePreviewMode
}) => {
  const [visiblePopover, setVisiblePopover] = React.useState(false);
  const { formatMessage } = useIntl();
  const selectPlaceholder = formatMessage({
    id: "components.Wysiwyg.selectOptions.title",
    defaultMessage: "Add a title"
  });
  const buttonMoreRef = React.useRef(null);
  const handleTogglePopover = () => {
    setVisiblePopover((prev) => !prev);
  };
  if (disabled || isPreviewMode) {
    return /* @__PURE__ */ jsxs(
      Flex,
      {
        padding: 2,
        background: "neutral100",
        justifyContent: "space-between",
        borderRadius: `${4 / 16}rem ${4 / 16}rem 0 0`,
        children: [
          /* @__PURE__ */ jsxs(StyledFlex, { children: [
            /* @__PURE__ */ jsxs(SingleSelect, { disabled: true, placeholder: selectPlaceholder, size: "S", label: selectPlaceholder, children: [
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "h1", children: "h1" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "h2", children: "h2" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "h3", children: "h3" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "h4", children: "h4" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "h5", children: "h5" }),
              /* @__PURE__ */ jsx(SingleSelectOption, { value: "h6", children: "h6" })
            ] }),
            /* @__PURE__ */ jsxs(MainButtons, { children: [
              /* @__PURE__ */ jsx(CustomIconButton$1, { disabled: true, label: "Bold", name: "Bold", icon: /* @__PURE__ */ jsx(Bold, {}) }),
              /* @__PURE__ */ jsx(CustomIconButton$1, { disabled: true, label: "Italic", name: "Italic", icon: /* @__PURE__ */ jsx(Italic, {}) }),
              /* @__PURE__ */ jsx(CustomIconButton$1, { disabled: true, label: "Underline", name: "Underline", icon: /* @__PURE__ */ jsx(Underline, {}) })
            ] }),
            /* @__PURE__ */ jsx(MoreButton, { disabled: true, label: "More", icon: /* @__PURE__ */ jsx(More, {}) })
          ] }),
          !isExpandMode && /* @__PURE__ */ jsx(Button, { onClick: onTogglePreviewMode, variant: "tertiary", children: formatMessage({
            id: "components.Wysiwyg.ToggleMode.markdown-mode",
            defaultMessage: "Markdown mode"
          }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      padding: 2,
      background: "neutral100",
      justifyContent: "space-between",
      borderRadius: `${4 / 16}rem ${4 / 16}rem 0 0`,
      children: [
        /* @__PURE__ */ jsxs(StyledFlex, { children: [
          /* @__PURE__ */ jsxs(
            SingleSelect,
            {
              placeholder: selectPlaceholder,
              label: selectPlaceholder,
              size: "S",
              onChange: (value) => onActionClick(value, editorRef),
              children: [
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "h1", children: "h1" }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "h2", children: "h2" }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "h3", children: "h3" }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "h4", children: "h4" }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "h5", children: "h5" }),
                /* @__PURE__ */ jsx(SingleSelectOption, { value: "h6", children: "h6" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(MainButtons, { children: [
            /* @__PURE__ */ jsx(
              CustomIconButton$1,
              {
                onClick: () => onActionClick("Bold", editorRef),
                label: "Bold",
                name: "Bold",
                icon: /* @__PURE__ */ jsx(Bold, {})
              }
            ),
            /* @__PURE__ */ jsx(
              CustomIconButton$1,
              {
                onClick: () => onActionClick("Italic", editorRef),
                label: "Italic",
                name: "Italic",
                icon: /* @__PURE__ */ jsx(Italic, {})
              }
            ),
            /* @__PURE__ */ jsx(
              CustomIconButton$1,
              {
                onClick: () => onActionClick("Underline", editorRef),
                label: "Underline",
                name: "Underline",
                icon: /* @__PURE__ */ jsx(Underline, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            MoreButton,
            {
              ref: buttonMoreRef,
              onClick: handleTogglePopover,
              label: "More",
              icon: /* @__PURE__ */ jsx(More, {})
            }
          ),
          visiblePopover && /* @__PURE__ */ jsx(Popover, { onDismiss: handleTogglePopover, centered: true, source: buttonMoreRef, spacing: 4, children: /* @__PURE__ */ jsxs(Flex, { children: [
            /* @__PURE__ */ jsxs(IconButtonGroupMargin, { children: [
              /* @__PURE__ */ jsx(
                CustomIconButton$1,
                {
                  onClick: () => onActionClick("Strikethrough", editorRef, handleTogglePopover),
                  label: "Strikethrough",
                  name: "Strikethrough",
                  icon: /* @__PURE__ */ jsx(StrikeThrough, {})
                }
              ),
              /* @__PURE__ */ jsx(
                CustomIconButton$1,
                {
                  onClick: () => onActionClick("BulletList", editorRef, handleTogglePopover),
                  label: "BulletList",
                  name: "BulletList",
                  icon: /* @__PURE__ */ jsx(BulletList, {})
                }
              ),
              /* @__PURE__ */ jsx(
                CustomIconButton$1,
                {
                  onClick: () => onActionClick("NumberList", editorRef, handleTogglePopover),
                  label: "NumberList",
                  name: "NumberList",
                  icon: /* @__PURE__ */ jsx(NumberList, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(IconButtonGroup, { children: [
              /* @__PURE__ */ jsx(
                CustomIconButton$1,
                {
                  onClick: () => onActionClick("Code", editorRef, handleTogglePopover),
                  label: "Code",
                  name: "Code",
                  icon: /* @__PURE__ */ jsx(Code, {})
                }
              ),
              /* @__PURE__ */ jsx(
                CustomIconButton$1,
                {
                  onClick: () => {
                    handleTogglePopover();
                    onToggleMediaLib();
                  },
                  label: "Image",
                  name: "Image",
                  icon: /* @__PURE__ */ jsx(Picture, {})
                }
              ),
              /* @__PURE__ */ jsx(
                CustomLinkIconButton,
                {
                  onClick: () => onActionClick("Link", editorRef, handleTogglePopover),
                  label: "Link",
                  name: "Link",
                  icon: /* @__PURE__ */ jsx(Link$5, {})
                }
              ),
              /* @__PURE__ */ jsx(
                CustomIconButton$1,
                {
                  onClick: () => onActionClick("Quote", editorRef, handleTogglePopover),
                  label: "Quote",
                  name: "Quote",
                  icon: /* @__PURE__ */ jsx(Quote, {})
                }
              )
            ] })
          ] }) })
        ] }),
        onTogglePreviewMode && /* @__PURE__ */ jsx(Button, { onClick: onTogglePreviewMode, variant: "tertiary", children: formatMessage({
          id: "components.Wysiwyg.ToggleMode.preview-mode",
          defaultMessage: "Preview mode"
        }) })
      ]
    }
  );
};
const StyledFlex = styled(Flex)`
  /* Hide the label, every input needs a label. */
  label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
const Wysiwyg = React.forwardRef(
  ({ hint, disabled, error, intlLabel, labelAction, name, onChange, placeholder, value, required }, forwardedRef) => {
    const { formatMessage } = useIntl();
    const textareaRef = React.useRef(null);
    const editorRef = React.useRef(
      null
    );
    const [isPreviewMode, setIsPreviewMode] = React.useState(false);
    const [mediaLibVisible, setMediaLibVisible] = React.useState(false);
    const [isExpandMode, setIsExpandMode] = React.useState(false);
    const { components = {} } = useLibrary();
    const MediaLibraryDialog = components["media-library"];
    const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
    const handleTogglePreviewMode = () => setIsPreviewMode((prev) => !prev);
    const handleToggleExpand = () => {
      setIsPreviewMode(false);
      setIsExpandMode((prev) => !prev);
    };
    const handleActionClick = (value2, currentEditorRef, togglePopover) => {
      switch (value2) {
        case "Link":
        case "Strikethrough": {
          markdownHandler(currentEditorRef, value2);
          togglePopover?.();
          break;
        }
        case "Code":
        case "Quote": {
          quoteAndCodeHandler(currentEditorRef, value2);
          togglePopover?.();
          break;
        }
        case "Bold":
        case "Italic":
        case "Underline": {
          markdownHandler(currentEditorRef, value2);
          break;
        }
        case "BulletList":
        case "NumberList": {
          listHandler(currentEditorRef, value2);
          togglePopover?.();
          break;
        }
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6": {
          titleHandler(currentEditorRef, value2);
          break;
        }
      }
    };
    const handleSelectAssets = (files) => {
      const formattedFiles = files.map((f) => ({
        alt: f.alternativeText || f.name,
        url: prefixFileUrlWithBackendUrl(f.url),
        mime: f.mime
      }));
      insertFile(editorRef, formattedFiles);
      setMediaLibVisible(false);
    };
    const formattedPlaceholder = placeholder ? formatMessage(
      { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
      { ...placeholder.values }
    ) : "";
    const label = intlLabel.id ? formatMessage(
      { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
      { ...intlLabel.values }
    ) : name;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: [
            label,
            required && /* @__PURE__ */ jsx(TypographyAsterisk, { textColor: "danger600", children: "*" })
          ] }),
          labelAction && /* @__PURE__ */ jsx(LabelAction$1, { paddingLeft: 1, children: labelAction })
        ] }),
        /* @__PURE__ */ jsxs(
          EditorLayout,
          {
            isExpandMode,
            error,
            previewContent: value,
            onCollapse: handleToggleExpand,
            children: [
              /* @__PURE__ */ jsx(
                WysiwygNav,
                {
                  isExpandMode,
                  editorRef,
                  isPreviewMode,
                  onActionClick: handleActionClick,
                  onToggleMediaLib: handleToggleMediaLib,
                  onTogglePreviewMode: isExpandMode ? void 0 : handleTogglePreviewMode,
                  disabled
                }
              ),
              /* @__PURE__ */ jsx(
                Editor,
                {
                  disabled,
                  isExpandMode,
                  editorRef,
                  error,
                  isPreviewMode,
                  name,
                  onChange,
                  placeholder: formattedPlaceholder,
                  textareaRef,
                  value,
                  ref: forwardedRef
                }
              ),
              !isExpandMode && /* @__PURE__ */ jsx(WysiwygFooter, { onToggleExpand: handleToggleExpand })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Hint, { hint, name, error })
      ] }),
      error && /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "danger600", "data-strapi-field-error": true, children: error }) }),
      mediaLibVisible && // @ts-expect-error – TODO: fix this way of injecting because it's not really typeable without a registry.
      /* @__PURE__ */ jsx(MediaLibraryDialog, { onClose: handleToggleMediaLib, onSelectAssets: handleSelectAssets })
    ] });
  }
);
const LabelAction$1 = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
const TypographyAsterisk = styled(Typography)`
  line-height: 0;
`;
const VALIDATIONS_TO_OMIT = [
  "type",
  "model",
  "via",
  "collection",
  "default",
  "plugin",
  "enum",
  "regex",
  "pluginOptions"
];
const Inputs = ({
  componentUid,
  fieldSchema,
  keys,
  labelAction,
  metadatas,
  queryInfos,
  size: size2,
  customFieldInputs
}) => {
  const {
    createActionAllowedFields,
    formErrors,
    isCreatingEntry,
    modifiedData,
    onChange,
    readActionAllowedFields,
    shouldNotRunValidations,
    updateActionAllowedFields
  } = useCMEditViewDataManager();
  const { fields } = useLibrary();
  const { formatMessage } = useIntl();
  const { contentType: currentContentTypeLayout } = useContentTypeLayout();
  const allowedFields = React.useMemo(() => {
    return isCreatingEntry ? createActionAllowedFields : updateActionAllowedFields;
  }, [isCreatingEntry, createActionAllowedFields, updateActionAllowedFields]);
  const readableFields = React.useMemo(() => {
    return isCreatingEntry ? [] : readActionAllowedFields;
  }, [isCreatingEntry, readActionAllowedFields]);
  const value = get(modifiedData, keys, null);
  const disabled = React.useMemo(() => !get(metadatas, "editable", true), [metadatas]);
  const { type, customField: customFieldUid } = fieldSchema;
  const error = get(formErrors, [keys], void 0);
  const fieldName = getFieldName(keys);
  const validations = React.useMemo(() => {
    const inputValidations = omit(
      fieldSchema,
      shouldNotRunValidations ? [...VALIDATIONS_TO_OMIT, "required", "minLength"] : VALIDATIONS_TO_OMIT
    );
    const regexpString = "regex" in fieldSchema ? fieldSchema.regex : null;
    if (regexpString) {
      const regexp = new RegExp(regexpString);
      if (regexp) {
        inputValidations.regex = regexp;
      }
    }
    return inputValidations;
  }, [fieldSchema, shouldNotRunValidations]);
  const isRequired = React.useMemo(() => get(validations, ["required"], false), [validations]);
  const isChildOfDynamicZone = React.useMemo(() => {
    const attributes = get(currentContentTypeLayout, ["attributes"], {});
    const foundAttributeType = get(attributes, [fieldName[0], "type"], null);
    return foundAttributeType === "dynamiczone";
  }, [currentContentTypeLayout, fieldName]);
  const inputType = getInputType(type);
  const inputValue = type === "media" && !value ? [] : value;
  const isUserAllowedToEditField = React.useMemo(() => {
    const joinedName = fieldName.join(".");
    if (allowedFields.includes(joinedName)) {
      return true;
    }
    if (isChildOfDynamicZone) {
      return allowedFields.includes(fieldName[0]);
    }
    const isChildOfComponent = fieldName.length > 1;
    if (isChildOfComponent) {
      const parentFieldName = take(fieldName, fieldName.length - 1).join(".");
      return allowedFields.includes(parentFieldName);
    }
    return false;
  }, [allowedFields, fieldName, isChildOfDynamicZone]);
  const isUserAllowedToReadField = React.useMemo(() => {
    const joinedName = fieldName.join(".");
    if (readableFields.includes(joinedName)) {
      return true;
    }
    if (isChildOfDynamicZone) {
      return readableFields.includes(fieldName[0]);
    }
    const isChildOfComponent = fieldName.length > 1;
    if (isChildOfComponent) {
      const parentFieldName = take(fieldName, fieldName.length - 1).join(".");
      return readableFields.includes(parentFieldName);
    }
    return false;
  }, [readableFields, fieldName, isChildOfDynamicZone]);
  const shouldDisplayNotAllowedInput = isUserAllowedToReadField || isUserAllowedToEditField;
  const shouldDisableField = React.useMemo(() => {
    if (!isCreatingEntry) {
      const doesNotHaveRight = isUserAllowedToReadField && !isUserAllowedToEditField;
      if (doesNotHaveRight) {
        return true;
      }
      return disabled;
    }
    return disabled;
  }, [disabled, isCreatingEntry, isUserAllowedToEditField, isUserAllowedToReadField]);
  const options2 = [
    {
      metadatas: {
        intlLabel: {
          id: "components.InputSelect.option.placeholder",
          defaultMessage: "Choose here"
        },
        disabled: isRequired,
        hidden: isRequired
      },
      key: "__enum_option_null",
      value: ""
    },
    // @ts-expect-error – TODO: fix me
    ...(fieldSchema.enum ?? []).map((option) => {
      return {
        metadatas: {
          intlLabel: {
            id: option,
            defaultMessage: option
          },
          hidden: false,
          disabled: false
        },
        key: option,
        value: option
      };
    })
  ];
  const { label, description, placeholder, visible } = metadatas;
  if (visible === false) {
    return null;
  }
  if (!shouldDisplayNotAllowedInput) {
    return /* @__PURE__ */ jsx(
      NotAllowedInput,
      {
        description: description ? { id: description, defaultMessage: description } : void 0,
        intlLabel: { id: label, defaultMessage: label },
        labelAction,
        error: error ? formatMessage(error) : void 0,
        name: keys
      }
    );
  }
  if (type === "relation") {
    return (
      // @ts-expect-error – TODO: fix this, it won't work because you assume too much based off it's type so you can't narrow everything else down.
      /* @__PURE__ */ jsx(
        RelationInputDataManager,
        {
          ...metadatas,
          ...fieldSchema,
          componentUid,
          description: metadatas.description ? formatMessage({
            id: metadatas.description,
            defaultMessage: metadatas.description
          }) : void 0,
          intlLabel: {
            id: metadatas.label,
            defaultMessage: metadatas.label
          },
          labelAction,
          isUserAllowedToEditField,
          isUserAllowedToReadField,
          name: keys,
          placeholder: metadatas.placeholder ? {
            id: metadatas.placeholder,
            defaultMessage: metadatas.placeholder
          } : void 0,
          queryInfos: queryInfos ?? {},
          size: size2,
          error: error ? formatMessage(error) : void 0
        }
      )
    );
  }
  const customInputs = {
    uid: InputUID,
    media: fields.media,
    wysiwyg: Wysiwyg,
    blocks: BlocksInput,
    ...fields,
    ...customFieldInputs
  };
  return /* @__PURE__ */ jsx(
    GenericInput$1,
    {
      attribute: fieldSchema,
      autoComplete: "new-password",
      intlLabel: { id: label, defaultMessage: label },
      isNullable: inputType === "bool" && "default" in fieldSchema && (fieldSchema.default === null || fieldSchema.default === void 0),
      description: description ? { id: description, defaultMessage: description } : void 0,
      disabled: shouldDisableField,
      error,
      labelAction,
      contentTypeUID: currentContentTypeLayout.uid,
      customInputs,
      multiple: "multiple" in fieldSchema ? fieldSchema.multiple : false,
      name: keys,
      onChange,
      options: options2,
      placeholder: placeholder ? { id: placeholder, defaultMessage: placeholder } : void 0,
      required: fieldSchema.required || false,
      step: getStep(type),
      type: customFieldUid || inputType,
      value: inputValue,
      withDefaultValue: false
    }
  );
};
const getStep = (type) => {
  switch (type) {
    case "float":
    case "decimal":
      return 0.01;
    default:
      return 1;
  }
};
const getInputType = (type = "") => {
  switch (type.toLowerCase()) {
    case "blocks":
      return "blocks";
    case "boolean":
      return "bool";
    case "biginteger":
      return "text";
    case "decimal":
    case "float":
    case "integer":
      return "number";
    case "date":
    case "datetime":
    case "time":
      return type;
    case "email":
      return "email";
    case "enumeration":
      return "select";
    case "password":
      return "password";
    case "string":
      return "text";
    case "text":
      return "textarea";
    case "media":
    case "file":
    case "files":
      return "media";
    case "json":
      return "json";
    case "wysiwyg":
    case "WYSIWYG":
    case "richtext":
      return "wysiwyg";
    case "uid":
      return "uid";
    default:
      return type || "text";
  }
};
const NonRepeatableComponent = ({
  componentUid,
  isFromDynamicZone,
  isNested,
  name
}) => {
  const { getComponentLayout } = useContentTypeLayout();
  const componentLayoutData = getComponentLayout(componentUid);
  const fields = componentLayoutData.layouts.edit;
  const { lazyComponentStore } = useLazyComponents();
  return /* @__PURE__ */ jsx(
    Box,
    {
      background: isFromDynamicZone ? "" : "neutral100",
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6,
      paddingBottom: 6,
      hasRadius: isNested,
      borderColor: isNested ? "neutral200" : void 0,
      children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: fields.map((fieldRow, key) => {
        return /* @__PURE__ */ jsx(Grid$1, { gap: 4, children: fieldRow.map(({ name: fieldName, size: size2, metadatas, fieldSchema, queryInfos }) => {
          const isComponent = fieldSchema.type === "component";
          const keys = `${name}.${fieldName}`;
          if (isComponent) {
            const compoUid = fieldSchema.component;
            return /* @__PURE__ */ jsx(GridItem, { col: size2, s: 12, xs: 12, children: /* @__PURE__ */ jsx(
              FieldComponent,
              {
                componentUid: compoUid,
                intlLabel: {
                  id: metadatas.label,
                  defaultMessage: metadatas.label
                },
                isNested: true,
                isRepeatable: fieldSchema.repeatable,
                max: fieldSchema.max,
                min: fieldSchema.min,
                name: keys,
                required: fieldSchema.required || false
              }
            ) }, fieldName);
          }
          return /* @__PURE__ */ jsx(GridItem, { col: size2, s: 12, xs: 12, children: /* @__PURE__ */ jsx(
            Inputs,
            {
              componentUid,
              keys,
              fieldSchema,
              metadatas,
              queryInfos,
              size: size2,
              customFieldInputs: lazyComponentStore
            }
          ) }, fieldName);
        }) }, key);
      }) })
    }
  );
};
const RepeatableComponent = ({
  componentUid,
  componentValue = [],
  componentValueLength = 0,
  isReadOnly,
  max = Infinity,
  min = -Infinity,
  name
}) => {
  const { addRepeatableComponentToField, formErrors, moveComponentField } = useCMEditViewDataManager();
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const [collapseToOpen, setCollapseToOpen] = React.useState(null);
  const [liveText, setLiveText] = React.useState("");
  const { getComponentLayout, components } = useContentTypeLayout();
  const componentLayoutData = getComponentLayout(componentUid);
  const search = useQuery$1();
  const componentTmpKeyWithFocussedField = React.useMemo(() => {
    if (search.has("field")) {
      const field = search.get("field");
      if (!field) {
        return void 0;
      }
      const [, path] = field.split(`${name}.`);
      if (get(componentValue, path, void 0) !== void 0) {
        const [subpath] = path.split(".");
        return componentValue[parseInt(subpath, 10)]?.__temp_key__;
      }
    }
    return void 0;
  }, [componentValue, search, name]);
  React.useEffect(() => {
    if (typeof componentTmpKeyWithFocussedField === "number") {
      setCollapseToOpen(componentTmpKeyWithFocussedField);
    }
  }, [componentTmpKeyWithFocussedField]);
  const nextTempKey = getMaxTempKey(componentValue) + 1;
  const componentErrorKeys = getComponentErrorKeys(name, formErrors);
  const missingComponentsValue = min - componentValueLength;
  const hasMinError = formErrors[name]?.id?.includes("min") ?? false;
  const toggleCollapses = () => {
    setCollapseToOpen(null);
  };
  const handleClick = () => {
    if (!isReadOnly) {
      if (componentValueLength < max) {
        const shouldCheckErrors = hasMinError;
        addRepeatableComponentToField?.(name, componentLayoutData, components, shouldCheckErrors);
        setCollapseToOpen(nextTempKey);
      } else if (componentValueLength >= max) {
        toggleNotification({
          type: "info",
          message: { id: getTranslation("components.notification.info.maximum-requirement") }
        });
      }
    }
  };
  const handleMoveComponentField = (newIndex, currentIndex) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: `${name}.${currentIndex}`,
          position: getItemPos(newIndex)
        }
      )
    );
    moveComponentField?.({
      name,
      newIndex,
      currentIndex
    });
  };
  const mainField = "settings" in componentLayoutData ? componentLayoutData.settings.mainField ?? "id" : "id";
  const handleToggle = (key) => () => {
    if (collapseToOpen === key) {
      setCollapseToOpen(null);
    } else {
      setCollapseToOpen(key);
    }
  };
  const getItemPos = (index) => `${index + 1} of ${componentValueLength}`;
  const handleCancel = (index) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: `${name}.${index}`
        }
      )
    );
  };
  const handleGrabItem = (index) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: `${name}.${index}`,
          position: getItemPos(index)
        }
      )
    );
  };
  const handleDropItem = (index) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: `${name}.${index}`,
          position: getItemPos(index)
        }
      )
    );
  };
  let errorMessage = formErrors[name];
  if (hasMinError) {
    errorMessage = {
      id: getTranslation("components.DynamicZone.missing-components"),
      defaultMessage: "There {number, plural, =0 {are # missing components} one {is # missing component} other {are # missing components}}",
      values: { number: missingComponentsValue }
    };
  } else if (componentErrorKeys.some((error) => error.split(".").length > 1) && !hasMinError) {
    errorMessage = {
      id: getTranslation("components.RepeatableComponent.error-message"),
      defaultMessage: "The component(s) contain error(s)"
    };
  }
  if (componentValueLength === 0) {
    return /* @__PURE__ */ jsx(ComponentInitializer, { error: errorMessage, isReadOnly, onClick: handleClick });
  }
  const ariaDescriptionId = `${name}-item-instructions`;
  return /* @__PURE__ */ jsxs(Box, { hasRadius: true, children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
      id: getTranslation("dnd.instructions"),
      defaultMessage: `Press spacebar to grab and re-order`
    }) }),
    /* @__PURE__ */ jsx(VisuallyHidden, { "aria-live": "assertive", children: liveText }),
    /* @__PURE__ */ jsxs(AccordionGroup, { error: errorMessage, children: [
      /* @__PURE__ */ jsx(AccordionContent, { "aria-describedby": ariaDescriptionId, children: componentValue.map(({ __temp_key__: key }, index) => /* @__PURE__ */ jsx(
        Component,
        {
          componentFieldName: `${name}.${index}`,
          componentUid,
          fields: componentLayoutData.layouts.edit,
          index,
          isOpen: collapseToOpen === key,
          isReadOnly,
          mainField,
          moveComponentField: handleMoveComponentField,
          onClickToggle: handleToggle(key),
          toggleCollapses,
          onCancel: handleCancel,
          onDropItem: handleDropItem,
          onGrabItem: handleGrabItem
        },
        key
      )) }),
      /* @__PURE__ */ jsx(AccordionFooter, { children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", height: "48px", background: "neutral0", children: /* @__PURE__ */ jsx(TextButtonCustom, { disabled: isReadOnly, onClick: handleClick, startIcon: /* @__PURE__ */ jsx(Plus, {}), children: formatMessage({
        id: getTranslation("containers.EditView.add.new-entry"),
        defaultMessage: "Add an entry"
      }) }) }) })
    ] })
  ] });
};
const TextButtonCustom = styled(TextButton)`
  height: 100%;
  width: 100%;
  border-radius: 0 0 4px 4px;
  display: flex;
  justify-content: center;
  span {
    font-weight: 600;
    font-size: 14px;
  }
`;
const AccordionFooter = styled(Box)`
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
`;
const AccordionContent = styled(Box)`
  border-bottom: none;

  /* add the borders and make sure the top is transparent to avoid jumping with the hover effect  */
  & > div > div {
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-top-color: transparent;
  }

  /* the top accordion _does_ need a border though */
  & > div:first-child > div {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
  }

  /* Reset all the border-radius' */
  & > div > div,
  & > div > div > div {
    border-radius: unset;
  }

  /* Give the border radius back to the first accordion */
  & > div:first-child > div,
  & > div:first-child > div > div {
    border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  }

  & > div > div[data-strapi-expanded='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary600};
  }
`;
const AccordionGroup = ({ children, error }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(KeyboardNavigable, { attributeName: "data-strapi-accordion-toggle", children: [
    children,
    error && /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "danger600", children: formatMessage(
      { id: error.id, defaultMessage: error.defaultMessage },
      { ...error.values }
    ) }) })
  ] });
};
const CustomIconButton = styled(IconButton)`
  background-color: transparent;

  svg {
    path {
      fill: ${({ theme, expanded }) => expanded ? theme.colors.primary600 : theme.colors.neutral600};
    }
  }

  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }
`;
const ActionsFlex$1 = styled(Flex)`
  & .drag-handle {
    background: unset;

    svg {
      path {
        fill: ${({ theme, expanded }) => expanded ? theme.colors.primary600 : void 0};
      }
    }

    &:hover {
      svg {
        path {
          /* keeps the hover style of the accordion */
          fill: ${({ theme }) => theme.colors.primary600};
        }
      }
    }
  }
`;
const Component = ({
  componentFieldName,
  componentUid,
  fields = [],
  index,
  isOpen,
  isReadOnly,
  mainField,
  moveComponentField,
  onClickToggle,
  toggleCollapses,
  onGrabItem,
  onDropItem,
  onCancel
}) => {
  const { modifiedData, removeRepeatableField, triggerFormValidation } = useCMEditViewDataManager();
  const displayedValue = toString(
    get(modifiedData, [...componentFieldName.split("."), mainField], "")
  );
  const accordionRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const componentKey = componentFieldName.split(".").slice(0, -1).join(".");
  const [{ handlerId, isDragging, handleKeyDown }, boxRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(!isReadOnly, {
    type: `${ItemTypes.COMPONENT}_${componentKey}`,
    index,
    item: {
      index,
      displayedValue
    },
    onMoveItem: moveComponentField,
    onStart() {
      toggleCollapses();
    },
    onEnd() {
      triggerFormValidation();
    },
    onGrabItem,
    onDropItem,
    onCancel
  });
  React.useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index]);
  const composedAccordionRefs = composeRefs(accordionRef, dragRef);
  const composedBoxRefs = composeRefs(boxRef, dropRef);
  const { lazyComponentStore } = useLazyComponents();
  return /* @__PURE__ */ jsx(Box, { ref: (ref) => composedBoxRefs(ref), children: isDragging ? /* @__PURE__ */ jsx(Preview$1, {}) : /* @__PURE__ */ jsxs(Accordion, { expanded: isOpen, onToggle: onClickToggle, id: componentFieldName, size: "S", children: [
    /* @__PURE__ */ jsx(
      AccordionToggle,
      {
        action: isReadOnly ? null : /* @__PURE__ */ jsxs(ActionsFlex$1, { gap: 0, expanded: isOpen, children: [
          /* @__PURE__ */ jsx(
            CustomIconButton,
            {
              expanded: isOpen,
              noBorder: true,
              onClick: () => {
                removeRepeatableField?.(componentFieldName);
                toggleCollapses();
              },
              label: formatMessage({
                id: getTranslation("containers.Edit.delete"),
                defaultMessage: "Delete"
              }),
              icon: /* @__PURE__ */ jsx(Trash, {})
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              className: "drag-handle",
              ref: composedAccordionRefs,
              forwardedAs: "div",
              role: "button",
              noBorder: true,
              tabIndex: 0,
              onClick: (e) => e.stopPropagation(),
              "data-handler-id": handlerId,
              label: formatMessage({
                id: getTranslation("components.DragHandle-label"),
                defaultMessage: "Drag"
              }),
              onKeyDown: handleKeyDown,
              children: /* @__PURE__ */ jsx(Drag, {})
            }
          )
        ] }),
        title: displayedValue,
        togglePosition: "left"
      }
    ),
    /* @__PURE__ */ jsx(AccordionContent$1, { children: /* @__PURE__ */ jsx(
      Flex,
      {
        direction: "column",
        alignItems: "stretch",
        background: "neutral100",
        padding: 6,
        gap: 6,
        children: fields.map((fieldRow, key) => {
          return /* @__PURE__ */ jsx(Grid$1, { gap: 4, children: fieldRow.map(({ name, fieldSchema, metadatas, queryInfos, size: size2 }) => {
            const isComponent = fieldSchema.type === "component";
            const keys = `${componentFieldName}.${name}`;
            if (isComponent) {
              const componentUid2 = fieldSchema.component;
              return /* @__PURE__ */ jsx(GridItem, { col: size2, s: 12, xs: 12, children: /* @__PURE__ */ jsx(
                FieldComponent,
                {
                  componentUid: componentUid2,
                  intlLabel: {
                    id: metadatas.label,
                    defaultMessage: metadatas.label
                  },
                  isRepeatable: fieldSchema.repeatable,
                  isNested: true,
                  name: keys,
                  max: fieldSchema.max,
                  min: fieldSchema.min,
                  required: fieldSchema.required
                }
              ) }, name);
            }
            return /* @__PURE__ */ jsx(GridItem, { col: size2, s: 12, xs: 12, children: /* @__PURE__ */ jsx(
              Inputs,
              {
                componentUid,
                fieldSchema,
                keys,
                metadatas,
                queryInfos,
                size: size2,
                customFieldInputs: lazyComponentStore
              }
            ) }, keys);
          }) }, key);
        })
      }
    ) })
  ] }) });
};
const Preview$1 = () => {
  return /* @__PURE__ */ jsx(StyledSpan, { as: "span", padding: 6, background: "primary100" });
};
const StyledSpan = styled(Box)`
  display: block;
  outline: 1px dashed ${({ theme }) => theme.colors.primary500};
  outline-offset: -1px;
`;
function getComponentErrorKeys(name, formErrors = {}) {
  return Object.keys(formErrors).filter((errorKey) => errorKey.startsWith(name)).map(
    (errorKey) => errorKey.split(".").slice(0, name.split(".").length + 1).join(".")
  );
}
const FieldComponent = ({
  componentUid,
  intlLabel,
  isFromDynamicZone,
  isRepeatable,
  isNested,
  labelAction,
  max = Infinity,
  min = -Infinity,
  name,
  required
}) => {
  const { formatMessage } = useIntl();
  const {
    addNonRepeatableComponentToField,
    createActionAllowedFields,
    isCreatingEntry,
    modifiedData,
    removeComponentFromField,
    readActionAllowedFields,
    updateActionAllowedFields
  } = useCMEditViewDataManager();
  const { contentType } = useContentTypeLayout();
  const allDynamicZoneFields = React.useMemo(() => {
    const attributes = contentType?.attributes ?? {};
    return Object.keys(attributes).filter(
      (attrName) => attributes[attrName].type === "dynamiczone"
    );
  }, [contentType]);
  const allowedFields = isCreatingEntry ? createActionAllowedFields : updateActionAllowedFields;
  const componentValue = modifiedData[name] ?? null;
  const compoName = getFieldName(name);
  const hasChildrenAllowedFields = React.useMemo(() => {
    if (isFromDynamicZone && isCreatingEntry) {
      return true;
    }
    const includedDynamicZoneFields = allowedFields.filter((name2) => name2 === compoName[0]);
    if (includedDynamicZoneFields.length > 0) {
      return true;
    }
    const relatedChildrenAllowedFields = allowedFields.map((fieldName) => {
      return fieldName.split(".");
    }).filter((fieldName) => {
      if (fieldName.length < compoName.length) {
        return false;
      }
      return fieldName.slice(0, compoName.length).join(".") === compoName.join(".");
    });
    return relatedChildrenAllowedFields.length > 0;
  }, [isFromDynamicZone, isCreatingEntry, allowedFields, compoName]);
  const hasChildrenReadableFields = React.useMemo(() => {
    if (isFromDynamicZone) {
      return true;
    }
    if (allDynamicZoneFields.includes(compoName[0])) {
      return true;
    }
    const allowedFields2 = isCreatingEntry ? [] : readActionAllowedFields;
    const relatedChildrenAllowedFields = allowedFields2.map((fieldName) => {
      return fieldName.split(".");
    }).filter((fieldName) => {
      if (fieldName.length < compoName.length) {
        return false;
      }
      return fieldName.slice(0, compoName.length).join(".") === compoName.join(".");
    });
    return relatedChildrenAllowedFields.length > 0;
  }, [
    isFromDynamicZone,
    allDynamicZoneFields,
    compoName,
    isCreatingEntry,
    readActionAllowedFields
  ]);
  const isReadOnly = isCreatingEntry ? false : hasChildrenAllowedFields ? false : hasChildrenReadableFields;
  const componentValueLength = size(componentValue);
  const isInitialized = componentValue !== null || isFromDynamicZone;
  const showResetComponent = !isRepeatable && isInitialized && !isFromDynamicZone && hasChildrenAllowedFields;
  const { getComponentLayout, components } = useContentTypeLayout();
  const componentLayoutData = getComponentLayout(componentUid);
  if (!hasChildrenAllowedFields && isCreatingEntry) {
    return /* @__PURE__ */ jsx(NotAllowedInput, { labelAction, intlLabel, name });
  }
  if (!hasChildrenAllowedFields && !isCreatingEntry && !hasChildrenReadableFields) {
    return /* @__PURE__ */ jsx(NotAllowedInput, { labelAction, intlLabel, name });
  }
  const handleClickAddNonRepeatableComponentToField = () => {
    addNonRepeatableComponentToField?.(name, componentLayoutData, components);
  };
  return /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
      intlLabel && /* @__PURE__ */ jsxs(Flex, { paddingBottom: 1, children: [
        /* @__PURE__ */ jsxs(
          Typography,
          {
            textColor: "neutral800",
            htmlFor: name,
            variant: "pi",
            fontWeight: "bold",
            as: "label",
            children: [
              formatMessage(intlLabel),
              isRepeatable && /* @__PURE__ */ jsxs(Fragment, { children: [
                " (",
                componentValueLength,
                ")"
              ] }),
              required && /* @__PURE__ */ jsx(Typography, { textColor: "danger600", children: "*" })
            ]
          }
        ),
        labelAction && /* @__PURE__ */ jsx(LabelAction, { paddingLeft: 1, children: labelAction })
      ] }),
      showResetComponent && /* @__PURE__ */ jsx(
        IconButton,
        {
          label: formatMessage({
            id: getTranslation("components.reset-entry"),
            defaultMessage: "Reset Entry"
          }),
          icon: /* @__PURE__ */ jsx(Trash, {}),
          noBorder: true,
          onClick: () => {
            removeComponentFromField?.(name, componentUid);
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
      !isRepeatable && !isInitialized && /* @__PURE__ */ jsx(
        ComponentInitializer,
        {
          isReadOnly,
          onClick: handleClickAddNonRepeatableComponentToField
        }
      ),
      !isRepeatable && isInitialized && /* @__PURE__ */ jsx(
        NonRepeatableComponent,
        {
          componentUid,
          isFromDynamicZone,
          isNested,
          name
        }
      ),
      isRepeatable && /* @__PURE__ */ jsx(
        RepeatableComponent,
        {
          componentValue: componentValue ?? void 0,
          componentValueLength,
          componentUid,
          isReadOnly,
          max,
          min,
          name
        }
      )
    ] })
  ] });
};
const LabelAction = styled(Box)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }
`;
const DynamicComponent = ({
  componentUid,
  formErrors = {},
  index = 0,
  isFieldAllowed = false,
  name,
  onRemoveComponentClick,
  onMoveComponent,
  onGrabItem,
  onDropItem,
  onCancel,
  dynamicComponentsByCategory = {},
  onAddComponent
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { formatMessage } = useIntl();
  const { getComponentLayout } = useContentTypeLayout();
  const { modifiedData } = useCMEditViewDataManager();
  const { icon, friendlyName, mainValue } = React.useMemo(() => {
    const componentLayoutData = getComponentLayout(componentUid);
    const {
      info: { icon: icon2, displayName }
    } = componentLayoutData;
    const mainFieldKey = get(componentLayoutData, ["settings", "mainField"], "id");
    const mainField = get(modifiedData, [name, index, mainFieldKey]) ?? "";
    const displayedValue = mainFieldKey === "id" ? "" : String(mainField).trim();
    const mainValue2 = displayedValue.length > 0 ? ` - ${displayedValue}` : displayedValue;
    return { friendlyName: displayName, icon: icon2, mainValue: mainValue2 };
  }, [componentUid, getComponentLayout, modifiedData, name, index]);
  const fieldsErrors = Object.keys(formErrors).filter((errorKey) => {
    const errorKeysArray = errorKey.split(".");
    if (`${errorKeysArray[0]}.${errorKeysArray[1]}` === `${name}.${index}`) {
      return true;
    }
    return false;
  });
  let errorMessage;
  if (fieldsErrors.length > 0) {
    errorMessage = formatMessage({
      id: getTranslation("components.DynamicZone.error-message"),
      defaultMessage: "The component contains error(s)"
    });
  }
  const handleToggle = () => {
    setIsOpen((s) => !s);
  };
  const [{ handlerId, isDragging, handleKeyDown }, boxRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(isFieldAllowed, {
    type: `${ItemTypes.DYNAMIC_ZONE}_${name}`,
    index,
    item: {
      index,
      displayedValue: `${friendlyName}${mainValue}`,
      icon
    },
    onMoveItem: onMoveComponent,
    onGrabItem,
    onDropItem,
    onCancel
  });
  React.useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index]);
  const composedBoxRefs = composeRefs(boxRef, dropRef);
  const accordionActions = !isFieldAllowed ? null : /* @__PURE__ */ jsxs(ActionsFlex, { gap: 0, children: [
    /* @__PURE__ */ jsx(
      IconButtonCustom,
      {
        noBorder: true,
        label: formatMessage(
          {
            id: getTranslation("components.DynamicZone.delete-label"),
            defaultMessage: "Delete {name}"
          },
          { name: friendlyName }
        ),
        onClick: onRemoveComponentClick,
        children: /* @__PURE__ */ jsx(Trash, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        forwardedAs: "div",
        role: "button",
        noBorder: true,
        tabIndex: 0,
        onClick: (e) => e.stopPropagation(),
        "data-handler-id": handlerId,
        ref: dragRef,
        label: formatMessage({
          id: getTranslation("components.DragHandle-label"),
          defaultMessage: "Drag"
        }),
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsx(Drag, {})
      }
    ),
    /* @__PURE__ */ jsxs(Menu.Root, { children: [
      /* @__PURE__ */ jsxs(Menu.Trigger, { size: "S", endIcon: null, paddingLeft: 2, paddingRight: 2, children: [
        /* @__PURE__ */ jsx(More, { "aria-hidden": true, focusable: false }),
        /* @__PURE__ */ jsx(VisuallyHidden, { as: "span", children: formatMessage({
          id: getTranslation("components.DynamicZone.more-actions"),
          defaultMessage: "More actions"
        }) })
      ] }),
      /* @__PURE__ */ jsxs(Menu.Content, { children: [
        /* @__PURE__ */ jsxs(Menu.SubRoot, { children: [
          /* @__PURE__ */ jsx(Menu.SubTrigger, { children: formatMessage({
            id: getTranslation("components.DynamicZone.add-item-above"),
            defaultMessage: "Add component above"
          }) }),
          /* @__PURE__ */ jsx(Menu.SubContent, { children: Object.entries(dynamicComponentsByCategory).map(([category, components]) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsx(Menu.Label, { children: category }),
            components.map(({ componentUid: componentUid2, info: { displayName } }) => /* @__PURE__ */ jsx(
              MenuItem,
              {
                onSelect: () => onAddComponent?.(componentUid2, index),
                children: displayName
              },
              componentUid2
            ))
          ] }, category)) })
        ] }),
        /* @__PURE__ */ jsxs(Menu.SubRoot, { children: [
          /* @__PURE__ */ jsx(Menu.SubTrigger, { children: formatMessage({
            id: getTranslation("components.DynamicZone.add-item-below"),
            defaultMessage: "Add component below"
          }) }),
          /* @__PURE__ */ jsx(Menu.SubContent, { children: Object.entries(dynamicComponentsByCategory).map(([category, components]) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsx(Menu.Label, { children: category }),
            components.map(({ componentUid: componentUid2, info: { displayName } }) => /* @__PURE__ */ jsx(
              MenuItem,
              {
                onSelect: () => onAddComponent?.(componentUid2, index + 1),
                children: displayName
              },
              componentUid2
            ))
          ] }, category)) })
        ] })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(ComponentContainer, { as: "li", width: "100%", children: [
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Rectangle, { background: "neutral200" }) }),
    /* @__PURE__ */ jsx(StyledBox, { ref: composedBoxRefs, hasRadius: true, children: isDragging ? /* @__PURE__ */ jsx(Preview, {}) : /* @__PURE__ */ jsxs(Accordion, { expanded: isOpen, onToggle: handleToggle, size: "S", error: errorMessage, children: [
      /* @__PURE__ */ jsx(
        AccordionToggle,
        {
          startIcon: /* @__PURE__ */ jsx(ComponentIcon, { icon, showBackground: false, size: "S" }),
          action: accordionActions,
          title: `${friendlyName}${mainValue}`,
          togglePosition: "left"
        }
      ),
      /* @__PURE__ */ jsx(AccordionContent$1, { children: /* @__PURE__ */ jsx(AccordionContentRadius, { background: "neutral0", children: /* @__PURE__ */ jsx(
        FieldComponent,
        {
          componentUid,
          name: `${name}.${index}`,
          isFromDynamicZone: true
        }
      ) }) })
    ] }) })
  ] });
};
const ActionsFlex = styled(Flex)`
  /* 
    we need to remove the background from the button but we can't 
    wrap the element in styled because it breaks the forwardedAs which
    we need for drag handler to work on firefox
  */
  div[role='button'] {
    background: transparent;
  }
`;
const IconButtonCustom = styled(IconButton)`
  background-color: transparent;

  svg path {
    fill: ${({ theme, expanded }) => expanded ? theme.colors.primary600 : theme.colors.neutral600};
  }
`;
const StyledBox = styled(Box)`
  > div:first-child {
    box-shadow: ${({ theme }) => theme.shadows.tableShadow};
  }
`;
const AccordionContentRadius = styled(Box)`
  border-radius: 0 0 ${({ theme }) => theme.spaces[1]} ${({ theme }) => theme.spaces[1]};
`;
const Rectangle = styled(Box)`
  width: ${({ theme }) => theme.spaces[2]};
  height: ${({ theme }) => theme.spaces[4]};
`;
const Preview = styled.span`
  display: block;
  background-color: ${({ theme }) => theme.colors.primary100};
  outline: 1px dashed ${({ theme }) => theme.colors.primary500};
  outline-offset: -1px;
  padding: ${({ theme }) => theme.spaces[6]};
`;
const ComponentContainer = styled(Box)`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const DynamicZoneLabel = ({
  label,
  labelAction,
  name,
  numberOfComponents = 0,
  required,
  intlDescription
}) => {
  const { formatMessage } = useIntl();
  const intlLabel = formatMessage({ id: label || name, defaultMessage: label || name });
  return /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(
    Box,
    {
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: 4,
      paddingLeft: 4,
      borderRadius: "26px",
      background: "neutral0",
      shadow: "filterShadow",
      color: "neutral500",
      children: /* @__PURE__ */ jsxs(Flex, { direction: "column", justifyContent: "center", children: [
        /* @__PURE__ */ jsxs(Flex, { maxWidth: pxToRem(356), children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", ellipsis: true, children: [
            intlLabel,
            " "
          ] }),
          /* @__PURE__ */ jsxs(Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: [
            "(",
            numberOfComponents,
            ")"
          ] }),
          required && /* @__PURE__ */ jsx(Typography, { textColor: "danger600", children: "*" }),
          labelAction && /* @__PURE__ */ jsx(Box, { paddingLeft: 1, children: labelAction })
        ] }),
        intlDescription && /* @__PURE__ */ jsx(Box, { paddingTop: 1, maxWidth: pxToRem(356), children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", ellipsis: true, children: formatMessage(intlDescription) }) })
      ] })
    }
  ) });
};
const DynamicZone = ({ name, labelAction, fieldSchema, metadatas }) => {
  const { max = Infinity, min = -Infinity, components = [], required = false } = fieldSchema ?? {};
  const [addComponentIsOpen, setAddComponentIsOpen] = React.useState(false);
  const [liveText, setLiveText] = React.useState("");
  const {
    addComponentToDynamicZone,
    createActionAllowedFields,
    isCreatingEntry,
    formErrors,
    modifiedData,
    moveComponentField,
    removeComponentFromDynamicZone,
    readActionAllowedFields,
    updateActionAllowedFields
  } = useCMEditViewDataManager();
  const dynamicDisplayedComponents = React.useMemo(
    () => (modifiedData?.[name] ?? []).map(
      (data) => {
        return {
          componentUid: data.__component,
          id: data.id ?? data.__temp_key__
        };
      }
    ),
    [modifiedData, name]
  );
  const { getComponentLayout, components: allComponents } = useContentTypeLayout();
  const dynamicComponentsByCategory = React.useMemo(() => {
    return components.reduce(
      (acc, componentUid) => {
        const layout = getComponentLayout(componentUid);
        const { category, info, attributes } = layout;
        const component = { componentUid, info, attributes };
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category] = [...acc[category], component];
        return acc;
      },
      {}
    );
  }, [components, getComponentLayout]);
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const isFieldAllowed = (isCreatingEntry ? createActionAllowedFields : updateActionAllowedFields).includes(name);
  const isFieldReadable = (isCreatingEntry ? [] : readActionAllowedFields).includes(name);
  const dynamicDisplayedComponentsLength = dynamicDisplayedComponents.length;
  const intlDescription = metadatas.description ? { id: metadatas.description, defaultMessage: metadatas.description } : void 0;
  const dynamicZoneError = formErrors[name];
  const missingComponentNumber = min - dynamicDisplayedComponentsLength;
  const hasError = !!dynamicZoneError;
  const handleAddComponent = (componentUid, position) => {
    setAddComponentIsOpen(false);
    const componentLayoutData = getComponentLayout(componentUid);
    addComponentToDynamicZone?.(name, componentLayoutData, allComponents, hasError, position);
  };
  const handleClickOpenPicker = () => {
    if (dynamicDisplayedComponentsLength < max) {
      setAddComponentIsOpen((prev) => !prev);
    } else {
      toggleNotification({
        type: "info",
        message: { id: getTranslation("components.notification.info.maximum-requirement") }
      });
    }
  };
  const handleMoveComponent = (newIndex, currentIndex) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: `${name}.${currentIndex}`,
          position: getItemPos(newIndex)
        }
      )
    );
    moveComponentField?.({
      name,
      newIndex,
      currentIndex
    });
  };
  const getItemPos = (index) => `${index + 1} of ${dynamicDisplayedComponents.length}`;
  const handleCancel = (index) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: `${name}.${index}`
        }
      )
    );
  };
  const handleGrabItem = (index) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: `${name}.${index}`,
          position: getItemPos(index)
        }
      )
    );
  };
  const handleDropItem = (index) => {
    setLiveText(
      formatMessage(
        {
          id: getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: `${name}.${index}`,
          position: getItemPos(index)
        }
      )
    );
  };
  const handleRemoveComponent = (name2, currentIndex) => () => {
    removeComponentFromDynamicZone?.(name2, currentIndex);
  };
  const renderButtonLabel = () => {
    if (addComponentIsOpen) {
      return formatMessage({ id: "app.utils.close-label", defaultMessage: "Close" });
    }
    if (hasError && dynamicZoneError.id?.includes("max")) {
      return formatMessage({
        id: "components.Input.error.validation.max",
        defaultMessage: "The value is too high."
      });
    }
    if (hasError && dynamicZoneError.id?.includes("min")) {
      return formatMessage(
        {
          id: getTranslation(`components.DynamicZone.missing-components`),
          defaultMessage: "There {number, plural, =0 {are # missing components} one {is # missing component} other {are # missing components}}"
        },
        { number: missingComponentNumber }
      );
    }
    return formatMessage(
      {
        id: getTranslation("components.DynamicZone.add-component"),
        defaultMessage: "Add a component to {componentName}"
      },
      { componentName: metadatas.label || name }
    );
  };
  if (!isFieldAllowed && (isCreatingEntry || !isFieldReadable && !isCreatingEntry)) {
    return /* @__PURE__ */ jsx(
      NotAllowedInput,
      {
        description: intlDescription,
        intlLabel: { id: metadatas.label, defaultMessage: metadatas.label },
        labelAction,
        name
      }
    );
  }
  const ariaDescriptionId = `${name}-item-instructions`;
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
    dynamicDisplayedComponentsLength > 0 && /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(
        DynamicZoneLabel,
        {
          intlDescription,
          label: metadatas.label,
          labelAction,
          name,
          numberOfComponents: dynamicDisplayedComponentsLength,
          required
        }
      ),
      /* @__PURE__ */ jsx(VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
        id: getTranslation("dnd.instructions"),
        defaultMessage: `Press spacebar to grab and re-order`
      }) }),
      /* @__PURE__ */ jsx(VisuallyHidden, { "aria-live": "assertive", children: liveText }),
      /* @__PURE__ */ jsx("ol", { "aria-describedby": ariaDescriptionId, children: dynamicDisplayedComponents.map(({ componentUid, id }, index) => /* @__PURE__ */ jsx(
        DynamicComponent,
        {
          componentUid,
          formErrors,
          index,
          isFieldAllowed,
          name,
          onMoveComponent: handleMoveComponent,
          onRemoveComponentClick: handleRemoveComponent(name, index),
          onCancel: handleCancel,
          onDropItem: handleDropItem,
          onGrabItem: handleGrabItem,
          onAddComponent: handleAddComponent,
          dynamicComponentsByCategory
        },
        `${componentUid}-${id}`
      )) })
    ] }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(
      AddComponentButton,
      {
        hasError,
        isDisabled: !isFieldAllowed,
        isOpen: addComponentIsOpen,
        onClick: handleClickOpenPicker,
        children: renderButtonLabel()
      }
    ) }),
    /* @__PURE__ */ jsx(
      ComponentPicker,
      {
        dynamicComponentsByCategory,
        isOpen: addComponentIsOpen,
        onClickAddComponent: handleAddComponent
      }
    )
  ] });
};
DynamicZone.defaultProps = {
  fieldSchema: {},
  labelAction: null
};
DynamicZone.propTypes = {
  fieldSchema: PropTypes.shape({
    components: PropTypes.array,
    max: PropTypes.number,
    min: PropTypes.number,
    required: PropTypes.bool
  }),
  labelAction: PropTypes.element,
  metadatas: PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string
  }).isRequired,
  name: PropTypes.string.isRequired
};
const createYupSchema = (model, { components }, options2 = {
  isCreatingEntry: true,
  isDraft: true,
  isFromComponent: false,
  isJSONTestDisabled: false
}) => {
  const { attributes } = model;
  return yup.object().shape(
    Object.keys(attributes).reduce((acc, current) => {
      const attribute = attributes[current];
      if (attribute.type !== "relation" && attribute.type !== "component" && attribute.type !== "dynamiczone") {
        const formatted = createYupSchemaAttribute(attribute.type, attribute, options2);
        acc[current] = formatted;
      }
      if (attribute.type === "relation") {
        acc[current] = [
          "oneWay",
          "oneToOne",
          "manyToOne",
          "oneToManyMorph",
          "oneToOneMorph"
          // @ts-expect-error – see comment at top of file
        ].includes(attribute.relationType) ? yup.object().nullable() : yup.array().nullable();
      }
      if (attribute.type === "component") {
        const componentFieldSchema = createYupSchema(
          components[attribute.component],
          {
            components
          },
          { ...options2, isFromComponent: true }
        );
        if (attribute.repeatable === true) {
          const { min, max, required } = attribute;
          const componentSchema2 = yup.lazy((value) => {
            let baseSchema = yup.array().of(componentFieldSchema);
            if (min) {
              if (required) {
                baseSchema = baseSchema.min(min, translatedErrors.min);
              } else if (required !== true && isEmpty(value)) {
                baseSchema = baseSchema.nullable();
              } else {
                baseSchema = baseSchema.min(min, translatedErrors.min);
              }
            } else if (required && !options2.isDraft) {
              baseSchema = baseSchema.min(1, translatedErrors.required);
            }
            if (max) {
              baseSchema = baseSchema.max(max, translatedErrors.max);
            }
            return baseSchema;
          });
          acc[current] = componentSchema2;
          return acc;
        }
        const componentSchema = yup.lazy((obj) => {
          if (obj !== void 0) {
            return attribute.required === true && !options2.isDraft ? componentFieldSchema.defined() : componentFieldSchema.nullable();
          }
          return attribute.required === true ? yup.object().defined() : yup.object().nullable();
        });
        acc[current] = componentSchema;
        return acc;
      }
      if (attribute.type === "dynamiczone") {
        let dynamicZoneSchema = yup.array().of(
          // @ts-expect-error – see comment at top of file
          yup.lazy(({ __component }) => {
            return createYupSchema(
              components[__component],
              { components },
              { ...options2, isFromComponent: true }
            );
          })
        );
        const { max, min } = attribute;
        if (min) {
          if (attribute.required) {
            dynamicZoneSchema = dynamicZoneSchema.test("min", translatedErrors.min, (value) => {
              if (options2.isCreatingEntry) {
                return value && value.length >= min;
              }
              if (value === void 0) {
                return true;
              }
              return value !== null && value.length >= min;
            }).test("required", translatedErrors.required, (value) => {
              if (options2.isCreatingEntry) {
                return value !== null || value !== void 0;
              }
              if (value === void 0) {
                return true;
              }
              return value !== null;
            });
          } else {
            dynamicZoneSchema = dynamicZoneSchema.notEmptyMin(min);
          }
        } else if (attribute.required && !options2.isDraft) {
          dynamicZoneSchema = dynamicZoneSchema.test("required", translatedErrors.required, (value) => {
            if (options2.isCreatingEntry) {
              return value !== null || value !== void 0;
            }
            if (value === void 0) {
              return true;
            }
            return value !== null;
          });
        }
        if (max) {
          dynamicZoneSchema = dynamicZoneSchema.max(max, translatedErrors.max);
        }
        acc[current] = dynamicZoneSchema;
      }
      return acc;
    }, {})
  );
};
const createYupSchemaAttribute = (type, validations, options2) => {
  let schema = yup.mixed();
  if (["string", "uid", "text", "richtext", "email", "password", "enumeration"].includes(type)) {
    schema = yup.string();
  }
  if (type === "blocks") {
    schema = yup.mixed().test("isJSON", translatedErrors.json, (value) => {
      if (options2.isJSONTestDisabled) {
        return true;
      }
      if (options2.isDraft) {
        return true;
      }
      if (value && !Array.isArray(value)) {
        return false;
      }
      return true;
    });
  }
  if (type === "json") {
    schema = yup.mixed(translatedErrors.json).test("isJSON", translatedErrors.json, (value) => {
      if (options2.isJSONTestDisabled) {
        return true;
      }
      if (!value || !value.length) {
        return true;
      }
      try {
        JSON.parse(value);
        return true;
      } catch (err) {
        return false;
      }
    }).nullable().test("required", translatedErrors.required, (value) => {
      if (validations.required && (!value || !value.length)) {
        return false;
      }
      return true;
    });
  }
  if (type === "email") {
    schema = schema.email(translatedErrors.email);
  }
  if (["number", "integer", "float", "decimal"].includes(type)) {
    schema = yup.number().transform((cv) => isNaN$1(cv) ? void 0 : cv).typeError();
  }
  if (type === "biginteger") {
    schema = yup.string().matches(/^-?\d*$/);
  }
  if (["date", "datetime"].includes(type)) {
    schema = yup.date();
  }
  Object.keys(validations).forEach((validation) => {
    const validationValue = validations[validation];
    if (!!validationValue || // @ts-expect-error – see comment at top of file
    !isBoolean(validationValue) && Number.isInteger(Math.floor(validationValue)) || // @ts-expect-error – see comment at top of file
    validationValue === 0) {
      switch (validation) {
        case "required": {
          if (!options2.isDraft) {
            if (type === "password" && options2.isCreatingEntry) {
              schema = schema.required(translatedErrors.required);
            }
            if (type !== "password") {
              if (options2.isCreatingEntry) {
                schema = schema.required(translatedErrors.required);
              } else {
                schema = schema.test("required", translatedErrors.required, (value) => {
                  if (value === void 0 && !options2.isFromComponent) {
                    return true;
                  }
                  if (isFieldTypeNumber(type)) {
                    if (value === 0) {
                      return true;
                    }
                    return !!value;
                  }
                  if (type === "boolean") {
                    return value !== null && value !== void 0;
                  }
                  if (type === "date" || type === "datetime") {
                    if (typeof value === "string") {
                      return !isEmpty(value);
                    }
                    return !isEmpty(value?.toString());
                  }
                  return !isEmpty(value);
                });
              }
            }
          }
          break;
        }
        case "max": {
          if (type === "biginteger") {
            schema = schema.isInferior(translatedErrors.max, validationValue);
          } else {
            schema = schema.max(validationValue, translatedErrors.max);
          }
          break;
        }
        case "maxLength":
          schema = schema.max(validationValue, translatedErrors.maxLength);
          break;
        case "min": {
          if (type === "biginteger") {
            schema = schema.isSuperior(translatedErrors.min, validationValue);
          } else {
            schema = schema.min(validationValue, translatedErrors.min);
          }
          break;
        }
        case "minLength": {
          if (!options2.isDraft) {
            schema = schema.min(validationValue, translatedErrors.minLength);
          }
          break;
        }
        case "regex":
          schema = schema.matches(new RegExp(validationValue), {
            message: translatedErrors.regex,
            excludeEmptyString: !validations.required
          });
          break;
        case "lowercase":
          if (["text", "textarea", "email", "string"].includes(type)) {
            schema = schema.strict().lowercase();
          }
          break;
        case "uppercase":
          if (["text", "textarea", "email", "string"].includes(type)) {
            schema = schema.strict().uppercase();
          }
          break;
        case "positive":
          if (isFieldTypeNumber(type)) {
            schema = schema.positive();
          }
          break;
        case "negative":
          if (isFieldTypeNumber(type)) {
            schema = schema.negative();
          }
          break;
        default:
          schema = schema.nullable();
      }
    }
  });
  return schema;
};
yup.addMethod(yup.mixed, "defined", function() {
  return this.test("defined", translatedErrors.required, (value) => value !== void 0);
});
yup.addMethod(yup.array, "notEmptyMin", function(min) {
  return this.test("notEmptyMin", translatedErrors.min, (value) => {
    if (!value || !value.length) {
      return true;
    }
    return value.length >= min;
  });
});
yup.addMethod(yup.string, "isInferior", function(message, max) {
  return this.test("isInferior", message, function(value) {
    if (!value) {
      return true;
    }
    if (Number.isNaN(toNumber(value))) {
      return true;
    }
    return toNumber(max) >= toNumber(value);
  });
});
yup.addMethod(yup.string, "isSuperior", function(message, min) {
  return this.test("isSuperior", message, function(value) {
    if (!value) {
      return true;
    }
    if (Number.isNaN(toNumber(value))) {
      return true;
    }
    return toNumber(value) >= toNumber(min);
  });
});
const CREATOR_FIELDS = ["createdBy", "updatedBy"];
const findAllAndReplaceSetup = (components, predicate = () => false, replacement) => {
  const findAllAndReplace = (data, attributes, {
    ignoreFalseyValues = false,
    path = [],
    parent = attributes
  } = {}) => {
    return Object.entries(attributes).reduce(
      (acc, [key, value]) => {
        if (ignoreFalseyValues && (acc === null || acc === void 0 || acc[key] === void 0 || acc[key] === null)) {
          return acc;
        }
        if (predicate(value, { path: [...path, key], parent })) {
          acc[key] = typeof replacement === "function" ? (
            // @ts-expect-error – TODO: Fix this.
            replacement(acc[key], { path: [...path, key], parent: acc })
          ) : replacement;
        }
        if (value.type === "component") {
          const componentAttributes = components[value.component].attributes;
          if (!value.repeatable && acc[key] && typeof acc[key] === "object") {
            acc[key] = findAllAndReplace(acc[key], componentAttributes, {
              ignoreFalseyValues,
              path: [...path, key],
              parent: attributes[key]
            });
          } else if (value.repeatable && Array.isArray(acc[key])) {
            acc[key] = acc[key].map((datum, index) => {
              const data2 = findAllAndReplace(datum, componentAttributes, {
                ignoreFalseyValues,
                path: [...path, key, index.toString()],
                parent: attributes[key]
              });
              return data2;
            });
          }
        } else if (value.type === "dynamiczone" && Array.isArray(acc[key])) {
          acc[key] = acc[key].map((datum, index) => {
            const componentAttributes = components[datum.__component].attributes;
            const data2 = findAllAndReplace(datum, componentAttributes, {
              ignoreFalseyValues,
              path: [...path, key, index.toString()],
              parent: attributes[key]
            });
            return data2;
          });
        }
        return acc;
      },
      { ...data }
    );
  };
  return findAllAndReplace;
};
const moveFields = (initialValue, from, to, value) => {
  const returnedValue = initialValue.slice();
  returnedValue.splice(from, 1);
  returnedValue.splice(to, 0, value);
  return returnedValue;
};
const initialState$6 = {
  componentsDataStructure: {},
  contentTypeDataStructure: {},
  formErrors: {},
  initialData: {},
  modifiedData: {},
  shouldCheckErrors: false,
  modifiedDZName: null,
  publishConfirmation: {
    show: false,
    draftCount: 0
  }
};
const reducer$5 = (state, action) => (
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    switch (action.type) {
      case "ADD_NON_REPEATABLE_COMPONENT_TO_FIELD": {
        const { componentLayoutData, allComponents } = action;
        const defaultDataStructure = {
          ...state.componentsDataStructure[componentLayoutData.uid]
        };
        const findAllRelationsAndReplaceWithEmptyArray = findAllAndReplaceSetup(
          allComponents,
          (value) => value.type === "relation",
          []
        );
        const componentDataStructure = findAllRelationsAndReplaceWithEmptyArray(
          defaultDataStructure,
          componentLayoutData.attributes
        );
        set(draftState, ["modifiedData", ...action.keys], componentDataStructure);
        break;
      }
      case "ADD_COMPONENT_TO_DYNAMIC_ZONE":
      case "ADD_REPEATABLE_COMPONENT_TO_FIELD": {
        const {
          keys,
          allComponents,
          componentLayoutData,
          shouldCheckErrors,
          position = void 0
        } = action;
        if (shouldCheckErrors) {
          draftState.shouldCheckErrors = !state.shouldCheckErrors;
        }
        if (action.type === "ADD_COMPONENT_TO_DYNAMIC_ZONE") {
          draftState.modifiedDZName = keys[0];
        }
        const currentValue = [...get(state, ["modifiedData", ...keys], [])];
        let actualPosition = position;
        if (actualPosition === void 0) {
          actualPosition = currentValue.length;
        } else if (actualPosition < 0) {
          actualPosition = 0;
        }
        const defaultDataStructure = action.type === "ADD_COMPONENT_TO_DYNAMIC_ZONE" ? {
          ...state.componentsDataStructure[componentLayoutData.uid],
          __component: componentLayoutData.uid,
          __temp_key__: getMaxTempKey(currentValue) + 1
        } : {
          ...state.componentsDataStructure[componentLayoutData.uid],
          __temp_key__: getMaxTempKey(currentValue) + 1
        };
        const findAllRelationsAndReplaceWithEmptyArray = findAllAndReplaceSetup(
          allComponents,
          (value) => value.type === "relation",
          []
        );
        const componentDataStructure = findAllRelationsAndReplaceWithEmptyArray(
          defaultDataStructure,
          componentLayoutData.attributes
        );
        currentValue.splice(actualPosition, 0, componentDataStructure);
        set(draftState, ["modifiedData", ...keys], currentValue);
        break;
      }
      case "LOAD_RELATION": {
        const { initialDataPath, modifiedDataPath, value } = action;
        const initialDataRelations = get(state, initialDataPath) ?? [];
        const modifiedDataRelations = get(state, modifiedDataPath);
        const valuesToLoad = value.filter((relation) => {
          return !initialDataRelations.some((initialDataRelation) => {
            return initialDataRelation.id === relation.id;
          });
        });
        const keys = generateNKeysBetween(
          null,
          modifiedDataRelations[0]?.__temp_key__,
          valuesToLoad.length
        );
        const valuesWithKeys = valuesToLoad.map((relation, index) => ({
          ...relation,
          __temp_key__: keys[index]
        }));
        set(
          draftState,
          initialDataPath,
          uniqBy([...valuesWithKeys, ...initialDataRelations], "id")
        );
        set(
          draftState,
          modifiedDataPath,
          uniqBy([...valuesWithKeys, ...modifiedDataRelations], "id")
        );
        break;
      }
      case "CONNECT_RELATION": {
        const path = ["modifiedData", ...action.keys];
        const { value, toOneRelation } = action;
        if (toOneRelation) {
          set(draftState, path, [value]);
        } else {
          const modifiedDataRelations = get(state, path);
          const [key] = generateNKeysBetween(modifiedDataRelations.at(-1)?.__temp_key__, null, 1);
          const newRelations = [...modifiedDataRelations, { ...value, __temp_key__: key }];
          set(draftState, path, newRelations);
        }
        break;
      }
      case "DISCONNECT_RELATION": {
        const path = ["modifiedData", ...action.keys];
        const { id } = action;
        const modifiedDataRelation = get(state, [...path]);
        const newRelations = modifiedDataRelation.filter((rel) => rel.id !== id);
        set(draftState, path, newRelations);
        break;
      }
      case "MOVE_COMPONENT_FIELD":
      case "REORDER_RELATION": {
        const { oldIndex, newIndex, keys } = action;
        const path = ["modifiedData", ...keys];
        const modifiedDataRelations = get(state, [...path]);
        const currentItem = modifiedDataRelations[oldIndex];
        const newRelations = [...modifiedDataRelations];
        if (action.type === "REORDER_RELATION") {
          const startKey = oldIndex > newIndex ? modifiedDataRelations[newIndex - 1]?.__temp_key__ : modifiedDataRelations[newIndex]?.__temp_key__;
          const endKey = oldIndex > newIndex ? modifiedDataRelations[newIndex]?.__temp_key__ : modifiedDataRelations[newIndex + 1]?.__temp_key__;
          const [newKey] = generateNKeysBetween(startKey, endKey, 1);
          newRelations.splice(oldIndex, 1);
          newRelations.splice(newIndex, 0, { ...currentItem, __temp_key__: newKey });
        } else {
          newRelations.splice(oldIndex, 1);
          newRelations.splice(newIndex, 0, currentItem);
        }
        set(draftState, path, newRelations);
        break;
      }
      case "INIT_FORM": {
        const { initialValues, components = {}, attributes = {}, setModifiedDataOnly } = action;
        const data = cloneDeep(initialValues);
        const findAllRelationsAndReplaceWithEmptyArray = findAllAndReplaceSetup(
          components,
          (value, { path }) => {
            const fieldName = path[path.length - 1];
            const isCreatorField = CREATOR_FIELDS.includes(fieldName);
            return value.type === "relation" && !isCreatorField;
          },
          (_, { path }) => {
            if (state.modifiedData?.id === data.id && get(state.modifiedData, path)) {
              return get(state.modifiedData, path);
            }
            return [];
          }
        );
        const mergedDataWithPreparedRelations = findAllRelationsAndReplaceWithEmptyArray(
          data,
          attributes
        );
        const findComponentsAndReplaceWithTempKey = findAllAndReplaceSetup(
          components,
          (value) => value.type === "dynamiczone" || value.type === "component" && !value.repeatable,
          (data2) => {
            return Array.isArray(data2) ? data2.map((datum, index) => ({
              ...datum,
              __temp_key__: index
            })) : {
              ...data2,
              __temp_key__: 0
            };
          }
        );
        const mergedDataWithTmpKeys = findComponentsAndReplaceWithTempKey(
          mergedDataWithPreparedRelations,
          attributes,
          { ignoreFalseyValues: true }
        );
        if (!setModifiedDataOnly) {
          draftState.initialData = mergedDataWithTmpKeys;
        }
        draftState.modifiedData = mergedDataWithTmpKeys;
        draftState.formErrors = {};
        draftState.modifiedDZName = null;
        draftState.shouldCheckErrors = false;
        break;
      }
      case "MOVE_COMPONENT_UP":
      case "MOVE_COMPONENT_DOWN": {
        const { currentIndex, dynamicZoneName, shouldCheckErrors } = action;
        if (shouldCheckErrors) {
          draftState.shouldCheckErrors = !state.shouldCheckErrors;
        }
        const currentValue = state.modifiedData[dynamicZoneName];
        const nextIndex = action.type === "MOVE_COMPONENT_UP" ? currentIndex - 1 : currentIndex + 1;
        const valueToInsert = state.modifiedData[dynamicZoneName][currentIndex];
        const updatedValue = moveFields(currentValue, currentIndex, nextIndex, valueToInsert);
        set(draftState, ["modifiedData", action.dynamicZoneName], updatedValue);
        break;
      }
      case "MOVE_FIELD": {
        const currentValue = get(state, ["modifiedData", ...action.keys], []).slice();
        const valueToInsert = get(state, ["modifiedData", ...action.keys, action.dragIndex]);
        const updatedValue = moveFields(
          currentValue,
          action.dragIndex,
          action.overIndex,
          valueToInsert
        );
        set(draftState, ["modifiedData", ...action.keys], updatedValue);
        break;
      }
      case "ON_CHANGE": {
        const [nonRepeatableComponentKey] = action.keys;
        if (action.shouldSetInitialValue) {
          set(draftState, ["initialData", ...action.keys], action.value);
        }
        if (action.keys.length === 2 && get(state, ["modifiedData", nonRepeatableComponentKey]) === null) {
          set(draftState, ["modifiedData", nonRepeatableComponentKey], {
            [action.keys[1]]: action.value
          });
          break;
        }
        set(draftState, ["modifiedData", ...action.keys], action.value);
        break;
      }
      case "REMOVE_COMPONENT_FROM_DYNAMIC_ZONE": {
        if (action.shouldCheckErrors) {
          draftState.shouldCheckErrors = !state.shouldCheckErrors;
        }
        draftState.modifiedData[action.dynamicZoneName].splice(action.index, 1);
        break;
      }
      case "REMOVE_COMPONENT_FROM_FIELD": {
        const componentPathToRemove = ["modifiedData", ...action.keys];
        set(draftState, componentPathToRemove, null);
        break;
      }
      case "REMOVE_PASSWORD_FIELD": {
        unset(draftState, ["modifiedData", ...action.keys]);
        break;
      }
      case "REMOVE_REPEATABLE_FIELD": {
        const keysLength = action.keys.length - 1;
        const pathToComponentData = ["modifiedData", ...take(action.keys, keysLength)];
        const hasErrors = Object.keys(state.formErrors).length > 0;
        if (hasErrors) {
          draftState.shouldCheckErrors = !state.shouldCheckErrors;
        }
        const currentValue = get(state, pathToComponentData).slice();
        currentValue.splice(parseInt(action.keys[keysLength], 10), 1);
        set(draftState, pathToComponentData, currentValue);
        break;
      }
      case "SET_DEFAULT_DATA_STRUCTURES": {
        draftState.componentsDataStructure = action.componentsDataStructure;
        draftState.contentTypeDataStructure = action.contentTypeDataStructure;
        break;
      }
      case "SET_FORM_ERRORS": {
        draftState.modifiedDZName = null;
        draftState.formErrors = action.errors;
        break;
      }
      case "TRIGGER_FORM_VALIDATION": {
        const hasErrors = Object.keys(state.formErrors).length > 0;
        if (hasErrors) {
          draftState.shouldCheckErrors = !state.shouldCheckErrors;
        }
        break;
      }
      case "SET_PUBLISH_CONFIRMATION": {
        draftState.publishConfirmation = { ...action.publishConfirmation };
        break;
      }
      case "RESET_PUBLISH_CONFIRMATION": {
        draftState.publishConfirmation = { ...state.publishConfirmation, show: false };
        break;
      }
      default:
        return draftState;
    }
  })
);
const cleanData = ({
  browserState,
  // the modifiedData from REDUX
  serverState
  // the initialData from REDUX
}, currentSchema, componentsSchema) => {
  const rootServerState = serverState;
  const rootBrowserState = browserState;
  const recursiveCleanData = (browserState2, serverState2, schema, pathToParent) => {
    return Object.keys(browserState2).reduce((acc, current) => {
      if (CREATOR_FIELDS.includes(current)) {
        return acc;
      }
      const path = pathToParent ? `${pathToParent}.${current}` : current;
      const attribute = schema.attributes[current] ?? {};
      const { type } = attribute;
      const value = get(browserState2, current);
      const oldValue = get(serverState2, current);
      let cleanedData;
      switch (type) {
        case "json":
          cleanedData = JSON.parse(value);
          break;
        case "time": {
          cleanedData = value;
          if (value && value.split(":").length < 3) {
            cleanedData = `${value}:00`;
          }
          break;
        }
        case "media":
          if (attribute.multiple === true) {
            cleanedData = value ? value.filter((file) => !(file instanceof File)) : null;
          } else {
            cleanedData = get(value, 0) instanceof File ? null : get(value, "id", null);
          }
          break;
        case "component":
          if (attribute.repeatable) {
            cleanedData = value ? value.map(
              (data, index) => {
                const subCleanedData = recursiveCleanData(
                  data,
                  (oldValue ?? [])[index],
                  componentsSchema[attribute.component],
                  `${path}.${index}`
                );
                return subCleanedData;
              }
            ) : value;
          } else {
            cleanedData = value ? recursiveCleanData(value, oldValue, componentsSchema[attribute.component], path) : value;
          }
          break;
        case "relation": {
          const trueInitialDataPath = getInitialDataPathUsingTempKeys(
            rootServerState,
            rootBrowserState
          )(path);
          const actualOldValue = get(rootServerState, trueInitialDataPath, []);
          const connectedRelations = value.reduce(
            (acc2, relation, currentIndex, array) => {
              const relationOnServer = actualOldValue.find(
                (oldRelation) => oldRelation.id === relation.id
              );
              const relationInFront = array[currentIndex + 1];
              if (!relationOnServer || relationOnServer.__temp_key__ !== relation.__temp_key__) {
                const position = relationInFront ? { before: relationInFront.id } : { end: true };
                return [...acc2, { id: relation.id, position }];
              }
              return acc2;
            },
            []
          );
          const disconnectedRelations = actualOldValue.reduce(
            (acc2, relation) => {
              if (!value.find((newRelation) => newRelation.id === relation.id)) {
                return [...acc2, { id: relation.id }];
              }
              return acc2;
            },
            []
          );
          cleanedData = {
            disconnect: disconnectedRelations,
            /**
             * Reverse the array because the API sequentially goes through the list
             * so in an instance where you add two to the end it would fail because index0
             * would want to attach itself to index1 which doesn't exist yet.
             */
            connect: connectedRelations.reverse()
          };
          break;
        }
        case "dynamiczone":
          cleanedData = value.map(
            (componentData, index) => {
              const subCleanedData = recursiveCleanData(
                componentData,
                (oldValue ?? [])[index],
                componentsSchema[componentData.__component],
                `${path}.${index}`
              );
              return subCleanedData;
            }
          );
          break;
        default:
          cleanedData = helperCleanData(value, "id");
      }
      acc[current] = cleanedData;
      return acc;
    }, {});
  };
  return recursiveCleanData(browserState, serverState, currentSchema, "");
};
const helperCleanData = (value, key) => {
  if (isArray(value)) {
    return value.map((obj) => obj[key] ? obj[key] : obj);
  }
  if (isObject(value)) {
    return value[key];
  }
  return value;
};
const EditViewDataManagerProvider = ({
  allowedActions: { canRead, canUpdate },
  children,
  componentsDataStructure,
  contentTypeDataStructure,
  createActionAllowedFields,
  from,
  initialValues,
  isCreatingEntry,
  isLoadingForData,
  isSingleType,
  onPost,
  onPublish,
  onDraftRelationCheck,
  onPut,
  onUnpublish,
  readActionAllowedFields,
  // Not sure this is needed anymore
  redirectToPreviousPage,
  slug,
  status,
  updateActionAllowedFields
}) => {
  const allLayoutData = useTypedSelector(
    (state) => state["content-manager_editViewLayoutManager"].currentLayout
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [reducerState, dispatch] = React.useReducer(reducer$5, initialState$6);
  const {
    formErrors,
    initialData,
    modifiedData,
    modifiedDZName,
    shouldCheckErrors,
    publishConfirmation
  } = reducerState;
  const { setModifiedDataOnly } = useTypedSelector(
    (state) => state["content-manager_editViewCrudReducer"]
  );
  const reduxDispatch = useTypedDispatch();
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const currentContentTypeLayout = allLayoutData.contentType;
  const hasDraftAndPublish = React.useMemo(() => {
    return get(currentContentTypeLayout, ["options", "draftAndPublish"], false);
  }, [currentContentTypeLayout]);
  const shouldNotRunValidations = React.useMemo(() => {
    return hasDraftAndPublish && !initialData.publishedAt;
  }, [hasDraftAndPublish, initialData.publishedAt]);
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const shouldRedirectToHomepageWhenEditingEntry = React.useMemo(() => {
    if (isLoadingForData) {
      return false;
    }
    if (isCreatingEntry) {
      return false;
    }
    if (canRead === false && canUpdate === false) {
      return true;
    }
    return false;
  }, [isLoadingForData, isCreatingEntry, canRead, canUpdate]);
  React.useEffect(() => {
    if (status === "resolved") {
      unlockApp();
    } else {
      lockApp();
    }
  }, [lockApp, unlockApp, status]);
  React.useEffect(() => {
    if (!isLoadingForData) {
      checkFormErrors();
    }
  }, [shouldCheckErrors]);
  React.useEffect(() => {
    const errorsInForm = Object.keys(formErrors);
    if (errorsInForm.length > 0) {
      const firstError = errorsInForm[0];
      const el = document.getElementById(firstError);
      if (el) {
        el.focus();
      }
    }
  }, [formErrors]);
  React.useEffect(() => {
    if (shouldRedirectToHomepageWhenEditingEntry) {
      toggleNotification({
        type: "info",
        message: { id: getTranslation("permissions.not-allowed.update") }
      });
    }
  }, [shouldRedirectToHomepageWhenEditingEntry, toggleNotification]);
  React.useEffect(() => {
    dispatch({
      type: "SET_DEFAULT_DATA_STRUCTURES",
      componentsDataStructure,
      contentTypeDataStructure
    });
  }, [componentsDataStructure, contentTypeDataStructure]);
  const { components } = allLayoutData;
  const previousInitialValues = usePrev(initialValues);
  React.useEffect(() => {
    if (initialValues && currentContentTypeLayout?.attributes && !isEqual(previousInitialValues, initialValues)) {
      dispatch({
        type: "INIT_FORM",
        initialValues,
        components,
        attributes: currentContentTypeLayout.attributes,
        setModifiedDataOnly
      });
      if (setModifiedDataOnly) {
        reduxDispatch(clearSetModifiedDataOnly());
      }
    }
  }, [
    initialValues,
    currentContentTypeLayout,
    components,
    setModifiedDataOnly,
    reduxDispatch,
    previousInitialValues
  ]);
  const dispatchAddComponent = React.useCallback(
    (type) => (keys, componentLayoutData, allComponents, shouldCheckErrors2 = false, position = void 0) => {
      trackUsage("didAddComponentToDynamicZone");
      dispatch({
        type,
        keys: keys.split("."),
        position,
        componentLayoutData,
        allComponents,
        shouldCheckErrors: shouldCheckErrors2
      });
    },
    [trackUsage]
  );
  const addComponentToDynamicZone = dispatchAddComponent("ADD_COMPONENT_TO_DYNAMIC_ZONE");
  const addNonRepeatableComponentToField = React.useCallback(
    (keys, componentLayoutData, allComponents) => {
      dispatch({
        type: "ADD_NON_REPEATABLE_COMPONENT_TO_FIELD",
        keys: keys.split("."),
        componentLayoutData,
        allComponents
      });
    },
    []
  );
  const relationConnect = React.useCallback(
    ({
      name,
      value,
      toOneRelation
    }) => {
      dispatch({
        type: "CONNECT_RELATION",
        keys: name.split("."),
        value,
        toOneRelation
      });
    },
    []
  );
  const relationLoad = React.useCallback(
    ({
      target: { initialDataPath, modifiedDataPath, value }
    }) => {
      dispatch({
        type: "LOAD_RELATION",
        modifiedDataPath,
        initialDataPath,
        value
      });
    },
    []
  );
  const addRepeatableComponentToField = dispatchAddComponent("ADD_REPEATABLE_COMPONENT_TO_FIELD");
  const yupSchema = React.useMemo(() => {
    const options2 = { isCreatingEntry, isDraft: shouldNotRunValidations, isFromComponent: false };
    return createYupSchema(
      currentContentTypeLayout,
      {
        components: allLayoutData.components
      },
      options2
    );
  }, [
    allLayoutData.components,
    currentContentTypeLayout,
    isCreatingEntry,
    shouldNotRunValidations
  ]);
  const checkFormErrors = React.useCallback(
    async (dataToSet = {}) => {
      let errors = {};
      const updatedData = cloneDeep(modifiedData);
      if (!isEmpty(updatedData) && dataToSet.path) {
        set(updatedData, dataToSet.path, dataToSet.value);
      }
      try {
        await yupSchema.validate(updatedData, { abortEarly: false });
      } catch (err) {
        if (err instanceof ValidationError) {
          errors = getYupInnerErrors(err);
        }
        if (modifiedDZName) {
          errors = Object.keys(errors).reduce(
            (acc, current) => {
              const dzName = current.split(".")[0];
              if (dzName !== modifiedDZName) {
                acc[current] = errors[current];
              }
              return acc;
            },
            {}
          );
        }
      }
      dispatch({
        type: "SET_FORM_ERRORS",
        errors
      });
    },
    [modifiedDZName, modifiedData, yupSchema]
  );
  const handleChange = React.useCallback(
    ({
      target
    }, shouldSetInitialValue = false) => {
      const { name, value, type } = target;
      let inputValue = value;
      if (["text", "textarea", "string", "email", "uid", "select", "select-one", "number"].includes(
        type
      ) && !value && value !== 0) {
        inputValue = null;
      }
      if (type === "password" && !value) {
        dispatch({
          type: "REMOVE_PASSWORD_FIELD",
          keys: name.split(".")
        });
        return;
      }
      dispatch({
        type: "ON_CHANGE",
        keys: name.split("."),
        value: inputValue,
        shouldSetInitialValue
      });
    },
    []
  );
  const createFormData = React.useCallback(
    (modifiedData2, initialData2) => {
      const cleanedData = cleanData(
        { browserState: modifiedData2, serverState: initialData2 },
        currentContentTypeLayout,
        allLayoutData.components
      );
      return cleanedData;
    },
    [allLayoutData.components, currentContentTypeLayout]
  );
  const trackerProperty = React.useMemo(() => {
    if (!hasDraftAndPublish) {
      return {};
    }
    return shouldNotRunValidations ? { status: "draft" } : {};
  }, [hasDraftAndPublish, shouldNotRunValidations]);
  const handlePublishPromptDismissal = React.useCallback(async (e) => {
    e.preventDefault();
    return dispatch({
      type: "RESET_PUBLISH_CONFIRMATION"
    });
  }, []);
  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      let errors = {};
      try {
        await yupSchema.validate(modifiedData, { abortEarly: false });
      } catch (err) {
        if (err instanceof ValidationError) {
          errors = getYupInnerErrors(err);
        } else {
          console.error(err);
        }
      }
      try {
        if (isEmpty(errors)) {
          const formData = createFormData(modifiedData, initialData);
          flushSync(() => {
            setIsSaving(true);
          });
          if (isCreatingEntry) {
            await onPost(formData, trackerProperty);
          } else {
            await onPut(formData, trackerProperty);
          }
          setIsSaving(false);
        }
      } catch (err) {
        setIsSaving(false);
        errors = {
          ...errors,
          // @ts-expect-error – remove the function later.
          ...getAPIInnerErrors(err, { getTranslation })
        };
      }
      dispatch({
        type: "SET_FORM_ERRORS",
        errors
      });
    },
    [
      createFormData,
      isCreatingEntry,
      modifiedData,
      initialData,
      onPost,
      onPut,
      trackerProperty,
      yupSchema
    ]
  );
  const handlePublish = React.useCallback(async () => {
    const schema = createYupSchema(
      currentContentTypeLayout,
      {
        components: get(allLayoutData, "components", {})
      },
      { isCreatingEntry, isDraft: false, isFromComponent: false }
    );
    const draftCount = await onDraftRelationCheck();
    if (!publishConfirmation.show && draftCount > 0) {
      dispatch({
        type: "SET_PUBLISH_CONFIRMATION",
        publishConfirmation: {
          show: true,
          draftCount
        }
      });
      return;
    }
    dispatch({
      type: "RESET_PUBLISH_CONFIRMATION"
    });
    let errors = {};
    try {
      await schema.validate(modifiedData, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        errors = getYupInnerErrors(err);
      }
    }
    try {
      if (isEmpty(errors)) {
        flushSync(() => {
          setIsSaving(true);
        });
        await onPublish();
        setIsSaving(false);
      }
    } catch (err) {
      setIsSaving(false);
      errors = {
        ...errors,
        // @ts-expect-error – we'll remove this deprecated function later anyway.
        ...getAPIInnerErrors(err, { getTranslation })
      };
    }
    dispatch({
      type: "SET_FORM_ERRORS",
      errors
    });
  }, [
    allLayoutData,
    currentContentTypeLayout,
    isCreatingEntry,
    modifiedData,
    publishConfirmation.show,
    onPublish,
    onDraftRelationCheck
  ]);
  const shouldCheckDZErrors = React.useCallback(
    (dzName) => {
      const doesDZHaveError = Object.keys(formErrors).some((key) => key.split(".")[0] === dzName);
      const shouldCheckErrors2 = !isEmpty(formErrors) && doesDZHaveError;
      return shouldCheckErrors2;
    },
    [formErrors]
  );
  const moveComponentDown = React.useCallback(
    (dynamicZoneName, currentIndex) => {
      trackUsage("changeComponentsOrder");
      dispatch({
        type: "MOVE_COMPONENT_DOWN",
        dynamicZoneName,
        currentIndex,
        shouldCheckErrors: shouldCheckDZErrors(dynamicZoneName)
      });
    },
    [shouldCheckDZErrors, trackUsage]
  );
  const moveComponentUp = React.useCallback(
    (dynamicZoneName, currentIndex) => {
      trackUsage("changeComponentsOrder");
      dispatch({
        type: "MOVE_COMPONENT_UP",
        dynamicZoneName,
        currentIndex,
        shouldCheckErrors: shouldCheckDZErrors(dynamicZoneName)
      });
    },
    [shouldCheckDZErrors, trackUsage]
  );
  const moveComponentField = React.useCallback(
    ({
      name,
      newIndex,
      currentIndex
    }) => {
      dispatch({
        type: "MOVE_COMPONENT_FIELD",
        keys: name.split("."),
        newIndex,
        oldIndex: currentIndex
      });
    },
    []
  );
  const relationDisconnect = React.useCallback(({ name, id }) => {
    dispatch({
      type: "DISCONNECT_RELATION",
      keys: name.split("."),
      id
    });
  }, []);
  const relationReorder = React.useCallback(
    ({ name, oldIndex, newIndex }) => {
      dispatch({
        type: "REORDER_RELATION",
        keys: name.split("."),
        oldIndex,
        newIndex
      });
    },
    []
  );
  const removeComponentFromDynamicZone = React.useCallback(
    (dynamicZoneName, index) => {
      trackUsage("removeComponentFromDynamicZone");
      dispatch({
        type: "REMOVE_COMPONENT_FROM_DYNAMIC_ZONE",
        dynamicZoneName,
        index,
        shouldCheckErrors: shouldCheckDZErrors(dynamicZoneName)
      });
    },
    [shouldCheckDZErrors, trackUsage]
  );
  const removeComponentFromField = React.useCallback((keys) => {
    dispatch({
      type: "REMOVE_COMPONENT_FROM_FIELD",
      keys: keys.split(".")
    });
  }, []);
  const removeRepeatableField = React.useCallback((keys) => {
    dispatch({
      type: "REMOVE_REPEATABLE_FIELD",
      keys: keys.split(".")
    });
  }, []);
  const triggerFormValidation = React.useCallback(() => {
    dispatch({
      type: "TRIGGER_FORM_VALIDATION"
    });
  }, []);
  if (shouldRedirectToHomepageWhenEditingEntry) {
    return /* @__PURE__ */ jsx(Redirect, { to: from });
  }
  if (!modifiedData) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ContentManagerEditViewDataManagerContext.Provider,
    {
      value: {
        // @ts-expect-error – issue with the provider being in the helper-plugin and not having access to the "unique" layout type
        addComponentToDynamicZone,
        // @ts-expect-error – issue with the provider being in the helper-plugin and not having access to the "unique" layout type
        addNonRepeatableComponentToField,
        // @ts-expect-error – issue with the provider being in the helper-plugin and not having access to the "unique" layout type
        addRepeatableComponentToField,
        // @ts-expect-error – issue with the provider being in the helper-plugin and not having access to the "unique" layout type
        allLayoutData,
        checkFormErrors,
        createActionAllowedFields,
        formErrors,
        hasDraftAndPublish,
        initialData,
        isCreatingEntry,
        isSingleType,
        shouldNotRunValidations,
        status,
        // @ts-expect-error – issue with the provider being in the helper-plugin and not having access to the "unique" layout type
        layout: currentContentTypeLayout,
        modifiedData,
        moveComponentField,
        /**
         * @deprecated use `moveComponentField` instead. This will be removed in v5.
         */
        moveComponentDown,
        /**
         * @deprecated use `moveComponentField` instead. This will be removed in v5.
         */
        moveComponentUp,
        onChange: handleChange,
        onPublish: handlePublish,
        onUnpublish,
        readActionAllowedFields,
        redirectToPreviousPage,
        removeComponentFromDynamicZone,
        removeComponentFromField,
        removeRepeatableField,
        relationConnect,
        relationDisconnect,
        relationLoad,
        relationReorder,
        slug,
        triggerFormValidation,
        updateActionAllowedFields,
        onPublishPromptDismissal: handlePublishPromptDismissal,
        publishConfirmation
      },
      children: isLoadingForData || !isCreatingEntry && !initialData.id ? /* @__PURE__ */ jsx(Main, { "aria-busy": "true", children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        !isSaving ? /* @__PURE__ */ jsx(
          Prompt,
          {
            when: !isEqual(modifiedData, initialData),
            message: formatMessage({ id: "global.prompt.unsaved" })
          }
        ) : null,
        /* @__PURE__ */ jsx("form", { noValidate: true, onSubmit: handleSubmit, children })
      ] })
    }
  );
};
const buildValidGetParams = (query = {}) => {
  const {
    plugins: _,
    _q: searchQuery,
    ...validQueryParams
  } = {
    ...query,
    ...Object.values(query?.plugins ?? {}).reduce(
      (acc, current) => Object.assign(acc, current),
      {}
    )
  };
  if (searchQuery) {
    validQueryParams._q = encodeURIComponent(searchQuery);
  }
  return validQueryParams;
};
const SingleTypeFormWrapper = ({ children, slug }) => {
  const allLayoutData = useTypedSelector(
    (state) => state["content-manager_editViewLayoutManager"].currentLayout
  );
  const queryClient2 = useQueryClient();
  const { trackUsage } = useTracking();
  const { push } = useHistory();
  const { setCurrentStep } = useGuidedTour();
  const [isCreatingEntry, setIsCreatingEntry] = React.useState(true);
  const [{ query, rawQuery }] = useQueryParams();
  const params = React.useMemo(() => buildValidGetParams(query), [query]);
  const toggleNotification = useNotification();
  const dispatch = useTypedDispatch();
  const { formatAPIError } = useAPIErrorHandler(getTranslation);
  const fetchClient = useFetchClient();
  const { post, put, del } = fetchClient;
  const { componentsDataStructure, contentTypeDataStructure, data, isLoading, status } = useTypedSelector((state) => state["content-manager_editViewCrudReducer"]);
  const cleanReceivedData = React.useCallback(
    (data2) => {
      const cleaned = removePasswordFieldsFromData(
        data2,
        allLayoutData.contentType,
        allLayoutData.components
      );
      return formatContentTypeData(cleaned, allLayoutData.contentType, allLayoutData.components);
    },
    [allLayoutData]
  );
  React.useEffect(() => {
    return () => {
      dispatch(resetProps$2());
    };
  }, [dispatch]);
  React.useEffect(() => {
    if (!allLayoutData) {
      return;
    }
    const componentsDataStructure2 = Object.keys(allLayoutData.components).reduce((acc, current) => {
      const defaultComponentForm = createDefaultDataStructure(
        allLayoutData.components[current].attributes,
        allLayoutData.components
      );
      acc[current] = formatContentTypeData(
        defaultComponentForm,
        // @ts-expect-error – the helper-plugin doesn't (and can't) know about the types we have in the admin. TODO: fix this.
        allLayoutData.components[current],
        allLayoutData.components
      );
      return acc;
    }, {});
    const contentTypeDataStructure2 = createDefaultDataStructure(
      allLayoutData.contentType.attributes,
      allLayoutData.components
    );
    const contentTypeDataStructureFormatted = formatContentTypeData(
      contentTypeDataStructure2,
      allLayoutData.contentType,
      allLayoutData.components
    );
    dispatch(setDataStructures(componentsDataStructure2, contentTypeDataStructureFormatted));
  }, [allLayoutData, dispatch]);
  React.useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchData = async (source2) => {
      dispatch(getData$1());
      setIsCreatingEntry(true);
      try {
        const { data: data2 } = await fetchClient.get(`/content-manager/single-types/${slug}`, {
          cancelToken: source2.token,
          params
        });
        dispatch(getDataSucceeded$1(cleanReceivedData(data2)));
        setIsCreatingEntry(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        const responseStatus = get(err, "response.status", null);
        if (responseStatus === 404) {
          dispatch(initForm(rawQuery, true));
        }
        if (responseStatus === 403) {
          toggleNotification({
            type: "info",
            message: { id: getTranslation("permissions.not-allowed.update") }
          });
          push("/");
        }
      }
    };
    fetchData(source);
    return () => source.cancel("Operation canceled by the user.");
  }, [fetchClient, cleanReceivedData, push, slug, dispatch, params, rawQuery, toggleNotification]);
  const displayErrors = React.useCallback(
    (err) => {
      toggleNotification({ type: "warning", message: formatAPIError(err) });
    },
    [toggleNotification, formatAPIError]
  );
  const onDelete = React.useCallback(
    async (trackerProperty) => {
      try {
        trackUsage("willDeleteEntry", trackerProperty);
        const { data: data2 } = await del(
          `/content-manager/single-types/${slug}`,
          {
            params
          }
        );
        toggleNotification({
          type: "success",
          message: { id: getTranslation("success.record.delete") }
        });
        trackUsage("didDeleteEntry", trackerProperty);
        setIsCreatingEntry(true);
        dispatch(initForm(rawQuery, true));
        return Promise.resolve(data2);
      } catch (err) {
        trackUsage("didNotDeleteEntry", { error: err, ...trackerProperty });
        if (err instanceof AxiosError) {
          displayErrors(err);
        }
        return Promise.reject(err);
      }
    },
    [trackUsage, del, slug, params, toggleNotification, dispatch, rawQuery, displayErrors]
  );
  const onPost = React.useCallback(
    async (body, trackerProperty) => {
      try {
        dispatch(setStatus("submit-pending"));
        const { data: data2 } = await put(`/content-manager/single-types/${slug}`, body, {
          params: query
        });
        trackUsage("didCreateEntry", trackerProperty);
        toggleNotification({
          type: "success",
          message: { id: getTranslation("success.record.save") }
        });
        setCurrentStep("contentManager.success");
        queryClient2.invalidateQueries(["relation"]);
        dispatch(submitSucceeded(cleanReceivedData(data2)));
        setIsCreatingEntry(false);
        dispatch(setStatus("resolved"));
        return Promise.resolve(data2);
      } catch (err) {
        trackUsage("didNotCreateEntry", { error: err, ...trackerProperty });
        if (err instanceof AxiosError) {
          displayErrors(err);
        }
        dispatch(setStatus("resolved"));
        return Promise.reject(err);
      }
    },
    [
      slug,
      dispatch,
      put,
      query,
      trackUsage,
      toggleNotification,
      setCurrentStep,
      queryClient2,
      cleanReceivedData,
      displayErrors
    ]
  );
  const onDraftRelationCheck = React.useCallback(async () => {
    try {
      trackUsage("willCheckDraftRelations");
      dispatch(setStatus("draft-relation-check-pending"));
      const {
        data: { data: data2 }
      } = await fetchClient.get(
        `/content-manager/single-types/${slug}/actions/countDraftRelations`
      );
      trackUsage("didCheckDraftRelations");
      dispatch(setStatus("resolved"));
      return data2;
    } catch (err) {
      if (err instanceof AxiosError) {
        displayErrors(err);
      }
      dispatch(setStatus("resolved"));
      return Promise.reject(err);
    }
  }, [trackUsage, slug, dispatch, fetchClient, displayErrors]);
  const onPublish = React.useCallback(async () => {
    try {
      trackUsage("willPublishEntry");
      dispatch(setStatus("publish-pending"));
      const { data: data2 } = await post(
        `/content-manager/single-types/${slug}/actions/publish`,
        {},
        {
          params
        }
      );
      trackUsage("didPublishEntry");
      toggleNotification({
        type: "success",
        message: { id: getTranslation("success.record.publish") }
      });
      dispatch(submitSucceeded(cleanReceivedData(data2)));
      dispatch(setStatus("resolved"));
      return Promise.resolve(data2);
    } catch (err) {
      if (err instanceof AxiosError) {
        displayErrors(err);
      }
      dispatch(setStatus("resolved"));
      return Promise.reject(err);
    }
  }, [
    trackUsage,
    slug,
    dispatch,
    post,
    params,
    toggleNotification,
    cleanReceivedData,
    displayErrors
  ]);
  const onPut = React.useCallback(
    async (body, trackerProperty) => {
      try {
        trackUsage("willEditEntry", trackerProperty);
        dispatch(setStatus("submit-pending"));
        const { data: data2 } = await put(`/content-manager/single-types/${slug}`, body, {
          params: query
        });
        toggleNotification({
          type: "success",
          message: { id: getTranslation("success.record.save") }
        });
        trackUsage("didEditEntry", trackerProperty);
        queryClient2.invalidateQueries(["relation"]);
        dispatch(submitSucceeded(cleanReceivedData(data2)));
        dispatch(setStatus("resolved"));
        return Promise.resolve(data2);
      } catch (err) {
        if (err instanceof AxiosError) {
          displayErrors(err);
        }
        trackUsage("didNotEditEntry", { error: err, ...trackerProperty });
        dispatch(setStatus("resolved"));
        return Promise.reject(err);
      }
    },
    [
      slug,
      trackUsage,
      dispatch,
      put,
      query,
      toggleNotification,
      queryClient2,
      cleanReceivedData,
      displayErrors
    ]
  );
  const onUnpublish = React.useCallback(async () => {
    dispatch(setStatus("unpublish-pending"));
    try {
      trackUsage("willUnpublishEntry");
      const { data: data2 } = await post(
        `/content-manager/single-types/${slug}/actions/unpublish`,
        {},
        {
          params
        }
      );
      trackUsage("didUnpublishEntry");
      toggleNotification({
        type: "success",
        message: { id: getTranslation("success.record.unpublish") }
      });
      dispatch(submitSucceeded(cleanReceivedData(data2)));
      dispatch(setStatus("resolved"));
    } catch (err) {
      dispatch(setStatus("resolved"));
      if (err instanceof AxiosError) {
        displayErrors(err);
      }
    }
  }, [
    slug,
    dispatch,
    trackUsage,
    post,
    params,
    toggleNotification,
    cleanReceivedData,
    displayErrors
  ]);
  return children({
    componentsDataStructure,
    contentTypeDataStructure,
    data,
    isCreatingEntry,
    isLoadingForData: isLoading,
    onDelete,
    onPost,
    onDraftRelationCheck,
    onPublish,
    onPut,
    onUnpublish,
    redirectionLink: "/",
    status
  });
};
const generatePermissionsObject = (uid) => {
  const permissions2 = {
    create: [{ action: "plugin::content-manager.explorer.create", subject: null }],
    delete: [{ action: "plugin::content-manager.explorer.delete", subject: null }],
    publish: [{ action: "plugin::content-manager.explorer.publish", subject: null }],
    read: [{ action: "plugin::content-manager.explorer.read", subject: null }],
    update: [{ action: "plugin::content-manager.explorer.update", subject: null }]
  };
  return Object.entries(permissions2).reduce((acc, [key, value]) => {
    acc[key] = value.map((perm) => ({ ...perm, subject: uid }));
    return acc;
  }, {});
};
const getFieldsActionMatchingPermissions = (userPermissions, slug) => {
  const getMatchingPermissions = (action) => {
    const matched = findMatchingPermissions(userPermissions, [
      {
        action: `plugin::content-manager.explorer.${action}`,
        subject: slug
      }
    ]);
    return matched.flatMap((perm) => perm.properties?.fields).filter(
      (field, index, arr) => arr.indexOf(field) === index && typeof field === "string"
    );
  };
  return {
    createActionAllowedFields: getMatchingPermissions("create"),
    readActionAllowedFields: getMatchingPermissions("read"),
    updateActionAllowedFields: getMatchingPermissions("update")
  };
};
const DeleteLink = ({ onDelete }) => {
  const { hasDraftAndPublish, modifiedData } = useCMEditViewDataManager();
  const trackerProperty = hasDraftAndPublish ? typeof modifiedData.publishedAt === "string" ? { status: "draft" } : { status: "published" } : {};
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = React.useState(false);
  const [isModalConfirmButtonLoading, setIsModalConfirmButtonLoading] = React.useState(false);
  const { formatMessage } = useIntl();
  const { formatAPIError } = useAPIErrorHandler(getTranslation);
  const toggleNotification = useNotification();
  const toggleWarningDelete = () => setDisplayDeleteConfirmation((prevState) => !prevState);
  const handleConfirmDelete = async () => {
    try {
      setIsModalConfirmButtonLoading(true);
      await onDelete(trackerProperty);
      setIsModalConfirmButtonLoading(false);
      toggleWarningDelete();
    } catch (err) {
      setIsModalConfirmButtonLoading(false);
      toggleWarningDelete();
      if (isAxiosError(err)) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(err)
        });
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { onClick: toggleWarningDelete, size: "S", startIcon: /* @__PURE__ */ jsx(Trash, {}), variant: "danger-light", children: formatMessage({
      id: getTranslation("containers.Edit.delete-entry"),
      defaultMessage: "Delete this entry"
    }) }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isConfirmButtonLoading: isModalConfirmButtonLoading,
        isOpen: displayDeleteConfirmation,
        onConfirm: handleConfirmDelete,
        onToggleDialog: toggleWarningDelete
      }
    )
  ] });
};
const DraftAndPublishBadge = () => {
  const { initialData, hasDraftAndPublish } = useCMEditViewDataManager();
  const { formatMessage } = useIntl();
  if (!hasDraftAndPublish) {
    return null;
  }
  const isPublished = typeof initialData.publishedAt === "string";
  const colors = {
    draft: {
      textColor: "secondary700",
      bulletColor: "secondary600",
      box: {
        background: "secondary100",
        borderColor: "secondary200"
      }
    },
    published: {
      textColor: "success700",
      bulletColor: "success600",
      box: {
        background: "success100",
        borderColor: "success200"
      }
    }
  };
  const colorProps = isPublished ? colors.published : colors.draft;
  return /* @__PURE__ */ jsx(
    Box,
    {
      hasRadius: true,
      as: "aside",
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 5,
      paddingRight: 5,
      ...colorProps.box,
      children: /* @__PURE__ */ jsxs(Box, { as: Flex, children: [
        /* @__PURE__ */ jsx(CustomBullet, { $bulletColor: colorProps.bulletColor }),
        /* @__PURE__ */ jsxs(Box, { paddingLeft: 3, children: [
          /* @__PURE__ */ jsxs(Typography, { textColor: colorProps.textColor, children: [
            formatMessage({
              id: getTranslation("containers.Edit.information.editing"),
              defaultMessage: "Editing"
            }),
            " "
          ] }),
          /* @__PURE__ */ jsxs(Typography, { fontWeight: "bold", textColor: colorProps.textColor, children: [
            isPublished && formatMessage({
              id: getTranslation("containers.Edit.information.publishedVersion"),
              defaultMessage: "published version"
            }),
            !isPublished && formatMessage({
              id: getTranslation("containers.Edit.information.draftVersion"),
              defaultMessage: "draft version"
            })
          ] })
        ] })
      ] })
    }
  );
};
const CustomBullet = styled(Dot)`
  width: ${pxToRem(6)};
  height: ${pxToRem(6)};
  * {
    fill: ${({ theme, $bulletColor }) => theme.colors[$bulletColor]};
  }
`;
const Header = ({ allowedActions: { canUpdate, canCreate, canPublish } }) => {
  const {
    initialData,
    isCreatingEntry,
    isSingleType,
    status,
    layout,
    hasDraftAndPublish,
    modifiedData,
    onPublish,
    onUnpublish,
    publishConfirmation: { show: showPublishConfirmation, draftCount } = {},
    onPublishPromptDismissal
  } = useCMEditViewDataManager();
  const { goBack } = useHistory();
  const [showWarningUnpublish, setWarningUnpublish] = React.useState(false);
  const { formatMessage } = useIntl();
  const currentContentTypeMainField = get(layout, ["settings", "mainField"], "id");
  const currentContentTypeName = get(layout, ["info", "displayName"], "NOT FOUND");
  const didChangeData = !isEqual(initialData, modifiedData) || isCreatingEntry && Object.keys(modifiedData).length > 0;
  const createEntryIntlTitle = formatMessage({
    id: getTranslation("containers.Edit.pluginHeader.title.new"),
    defaultMessage: "Create an entry"
  });
  let title = createEntryIntlTitle;
  if (!isCreatingEntry && !isSingleType) {
    title = initialData[currentContentTypeMainField] || currentContentTypeName;
  }
  if (isSingleType) {
    title = currentContentTypeName;
  }
  let primaryAction = null;
  if (isCreatingEntry && canCreate) {
    primaryAction = /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      hasDraftAndPublish && /* @__PURE__ */ jsx(Button, { disabled: true, startIcon: /* @__PURE__ */ jsx(Check, {}), variant: "secondary", children: formatMessage({ id: "app.utils.publish", defaultMessage: "Publish" }) }),
      /* @__PURE__ */ jsx(Button, { disabled: !didChangeData, loading: status === "submit-pending", type: "submit", children: formatMessage({
        id: getTranslation("containers.Edit.submit"),
        defaultMessage: "Save"
      }) })
    ] });
  }
  if (!isCreatingEntry && canUpdate) {
    const shouldShowPublishButton = hasDraftAndPublish && canPublish;
    const isPublished = typeof initialData.publishedAt === "string";
    const isPublishButtonLoading = isPublished ? status === "unpublish-pending" : status === "publish-pending";
    const pubishButtonLabel = isPublished ? { id: "app.utils.unpublish", defaultMessage: "Unpublish" } : { id: "app.utils.publish", defaultMessage: "Publish" };
    const onClick = isPublished ? () => setWarningUnpublish(true) : () => onPublish?.();
    primaryAction = /* @__PURE__ */ jsxs(Flex, { children: [
      shouldShowPublishButton && /* @__PURE__ */ jsx(
        Button,
        {
          disabled: didChangeData,
          loading: isPublishButtonLoading,
          onClick,
          startIcon: /* @__PURE__ */ jsx(Check, {}),
          variant: "secondary",
          children: formatMessage(pubishButtonLabel)
        }
      ),
      /* @__PURE__ */ jsx(Box, { paddingLeft: shouldShowPublishButton ? 2 : 0, children: /* @__PURE__ */ jsx(Button, { disabled: !didChangeData, loading: status === "submit-pending", type: "submit", children: formatMessage({
        id: getTranslation("containers.Edit.submit"),
        defaultMessage: "Save"
      }) }) })
    ] });
  }
  const toggleWarningUnpublish = () => setWarningUnpublish((prevState) => !prevState);
  const handleUnpublish = () => {
    toggleWarningUnpublish();
    onUnpublish?.();
  };
  const subtitle = `${formatMessage({
    id: getTranslation("api.id"),
    defaultMessage: "API ID "
    // @ts-expect-error – issue comes from the context not having the correct layout from the admin.
  })} : ${layout?.apiID}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        title: title.toString(),
        primaryAction,
        subtitle,
        navigationAction: /* @__PURE__ */ jsx(
          Link$1,
          {
            startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}),
            onClick: (e) => {
              e.preventDefault();
              goBack();
            },
            as: NavLink,
            to: "/",
            children: formatMessage({
              id: "global.back",
              defaultMessage: "Back"
            })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      Dialog,
      {
        onClose: toggleWarningUnpublish,
        title: "Confirmation",
        "aria-labelledby": "confirmation",
        "aria-describedby": "confirm-description",
        isOpen: showWarningUnpublish,
        children: [
          /* @__PURE__ */ jsx(DialogBody, { icon: /* @__PURE__ */ jsx(ExclamationMarkCircle, {}), children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
            /* @__PURE__ */ jsx(Flex, { justifyContent: "center", style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Typography, { id: "confirm-description", children: formatMessage({
              id: getTranslation("popUpWarning.warning.unpublish"),
              defaultMessage: "Unpublish this content will automatically change it to a draft."
            }) }) }),
            /* @__PURE__ */ jsx(Flex, { justifyContent: "center", style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Typography, { id: "confirm-description", children: formatMessage({
              id: getTranslation("popUpWarning.warning.unpublish-question"),
              defaultMessage: "Are you sure you want to unpublish it?"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsx(
            DialogFooter,
            {
              startAction: /* @__PURE__ */ jsx(Button, { onClick: toggleWarningUnpublish, variant: "tertiary", children: formatMessage({
                id: "components.popUpWarning.button.cancel",
                defaultMessage: "Cancel"
              }) }),
              endAction: /* @__PURE__ */ jsx(Button, { variant: "danger-light", onClick: handleUnpublish, children: formatMessage({
                id: "components.popUpWarning.button.confirm",
                defaultMessage: "Confirm"
              }) })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Dialog,
      {
        onClose: onPublishPromptDismissal,
        title: formatMessage({
          id: getTranslation(`popUpWarning.warning.has-draft-relations.title`),
          defaultMessage: "Confirmation"
        }),
        labelledBy: "confirmation",
        describedBy: "confirm-description",
        isOpen: showPublishConfirmation,
        children: [
          /* @__PURE__ */ jsx(DialogBody, { icon: /* @__PURE__ */ jsx(ExclamationMarkCircle, {}), children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
            /* @__PURE__ */ jsxs(Typography, { textAlign: "center", id: "confirm-description", children: [
              draftCount,
              formatMessage(
                {
                  id: getTranslation(`popUpwarning.warning.has-draft-relations.message`),
                  defaultMessage: "<b>{count, plural, one { relation is} other { relations are}}</b> not published yet and might lead to unexpected behavior."
                },
                {
                  b: (chunks) => /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: chunks }),
                  count: draftCount
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Typography, { textAlign: "center", id: "confirm-description", children: formatMessage({
              id: getTranslation("popUpWarning.warning.publish-question"),
              defaultMessage: "Do you still want to publish?"
            }) })
          ] }) }),
          /* @__PURE__ */ jsx(
            DialogFooter,
            {
              startAction: /* @__PURE__ */ jsx(Button, { onClick: onPublishPromptDismissal, variant: "tertiary", children: formatMessage({
                id: "components.popUpWarning.button.cancel",
                defaultMessage: "Cancel"
              }) }),
              endAction: /* @__PURE__ */ jsx(Button, { variant: "success", onClick: onPublish, children: formatMessage({
                id: getTranslation("popUpwarning.warning.has-draft-relations.button-confirm"),
                defaultMessage: "Publish"
              }) })
            }
          )
        ]
      }
    )
  ] });
};
const getDisplayName = ({
  firstname,
  lastname,
  username,
  email
}, formatMessage) => {
  if (username) {
    return username;
  }
  if (firstname) {
    return formatMessage(
      {
        id: "global.fullname",
        defaultMessage: "{firstname} {lastname}"
      },
      {
        firstname,
        lastname
      }
    ).trim();
  }
  return email;
};
const Root$1 = ({ children }) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 4, children });
};
const Title = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", id: "additional-information", children: formatMessage({
      id: getTranslation("containers.Edit.information"),
      defaultMessage: "Information"
    }) }),
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Divider, {}) })
  ] });
};
const Body$1 = () => {
  const { formatMessage, formatRelativeTime } = useIntl();
  const { initialData, isCreatingEntry } = useCMEditViewDataManager();
  const currentTime = React.useRef(Date.now());
  const getFieldInfo = (atField, byField) => {
    const user = initialData[byField];
    const at = initialData[atField];
    const displayName = user ? getDisplayName(user, formatMessage) : "-";
    const timestamp = at ? new Date(at).getTime() : Date.now();
    const elapsed = timestamp - currentTime.current;
    const { unit, value } = getUnits(-elapsed);
    return {
      at: formatRelativeTime(value, unit, { numeric: "auto" }),
      by: isCreatingEntry ? "-" : displayName
    };
  };
  const updated = getFieldInfo("updatedAt", "updatedBy");
  const created = getFieldInfo("createdAt", "createdBy");
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, as: "dl", children: [
      /* @__PURE__ */ jsx(
        KeyValuePair,
        {
          label: formatMessage({
            id: getTranslation("containers.Edit.information.created"),
            defaultMessage: "Created"
          }),
          value: created.at
        }
      ),
      /* @__PURE__ */ jsx(
        KeyValuePair,
        {
          label: formatMessage({
            id: getTranslation("containers.Edit.information.by"),
            defaultMessage: "By"
          }),
          value: created.by
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, as: "dl", children: [
      /* @__PURE__ */ jsx(
        KeyValuePair,
        {
          label: formatMessage({
            id: getTranslation("containers.Edit.information.lastUpdate"),
            defaultMessage: "Last update"
          }),
          value: updated.at
        }
      ),
      /* @__PURE__ */ jsx(
        KeyValuePair,
        {
          label: formatMessage({
            id: getTranslation("containers.Edit.information.by"),
            defaultMessage: "By"
          }),
          value: updated.by
        }
      )
    ] })
  ] });
};
const KeyValuePair = ({ label, value = "-" }) => {
  return /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
    /* @__PURE__ */ jsx(Typography, { as: "dt", fontWeight: "bold", textColor: "neutral800", variant: "pi", children: label }),
    /* @__PURE__ */ jsx(Typography, { as: "dd", variant: "pi", textColor: "neutral600", children: value })
  ] });
};
const MINUTE = 60 * 1e3;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
const getUnits = (value) => {
  if (value < MINUTE) {
    return { unit: "second", value: -Math.round(value / 1e3) };
  }
  if (value < HOUR) {
    return { unit: "minute", value: -Math.round(value / MINUTE) };
  }
  if (value < DAY) {
    return { unit: "hour", value: -Math.round(value / HOUR) };
  }
  if (value < MONTH) {
    return { unit: "day", value: -Math.round(value / DAY) };
  }
  if (value < YEAR) {
    return { unit: "month", value: -Math.round(value / MONTH) };
  }
  return { unit: "year", value: -Math.round(value / YEAR) };
};
const Information = {
  Root: Root$1,
  Title,
  Body: Body$1
};
const InformationBoxCE = () => {
  return /* @__PURE__ */ jsxs(Information.Root, { children: [
    /* @__PURE__ */ jsx(Information.Title, {}),
    /* @__PURE__ */ jsx(Information.Body, {})
  ] });
};
const useOnce = (effect) => React.useEffect(effect, emptyDeps);
const emptyDeps = [];
const CTB_PERMISSIONS = [{ action: "plugin::content-type-builder.read", subject: null }];
const EditViewPage = ({
  allowedActions,
  isSingleType = false,
  goBack,
  slug,
  id,
  origin,
  userPermissions = []
}) => {
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const permissions2 = useSelector(selectAdminPermissions);
  const location = useLocation();
  const toggleNotification = useNotification();
  const Information2 = useEnterprise(
    InformationBoxCE,
    async () => (await import("./InformationBoxEE-fcaa878b.mjs")).InformationBoxEE
  );
  useOnce(() => {
    if (location?.state && "error" in location.state) {
      toggleNotification({
        type: "warning",
        message: location.state.error,
        timeout: 5e3
      });
    }
  });
  const formattedContentTypeLayout = useTypedSelector(selectAttributesLayout);
  const customFieldUids = useTypedSelector(selectCustomFieldUids);
  const { isLazyLoading, lazyComponentStore } = useLazyComponents(customFieldUids);
  const { createActionAllowedFields, readActionAllowedFields, updateActionAllowedFields } = getFieldsActionMatchingPermissions(userPermissions, slug);
  const configurationPermissions = (isSingleType ? permissions2.contentManager?.singleTypesConfigurations : permissions2.contentManager?.collectionTypesConfigurations) ?? [];
  const configurationsURL = `/content-manager/${isSingleType ? "singleType" : "collectionType"}/${slug}/configurations/edit`;
  const DataManagementWrapper = isSingleType ? SingleTypeFormWrapper : CollectionTypeFormWrapper;
  const isDynamicZone = (block) => {
    return block.every((subBlock) => {
      return subBlock.every((obj) => obj.fieldSchema.type === "dynamiczone");
    });
  };
  if (isLazyLoading) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  if (!Information2) {
    return null;
  }
  return /* @__PURE__ */ jsx(DataManagementWrapper, { slug, id, origin, children: ({
    componentsDataStructure,
    contentTypeDataStructure,
    data,
    isCreatingEntry,
    isLoadingForData,
    onDelete,
    onPost,
    onPublish,
    onDraftRelationCheck,
    onPut,
    onUnpublish,
    redirectionLink,
    status
  }) => {
    return /* @__PURE__ */ jsx(
      EditViewDataManagerProvider,
      {
        allowedActions,
        createActionAllowedFields,
        componentsDataStructure,
        contentTypeDataStructure,
        from: redirectionLink,
        initialValues: data,
        isCreatingEntry,
        isLoadingForData,
        isSingleType,
        onPost,
        onPublish,
        onDraftRelationCheck,
        onPut,
        onUnpublish,
        readActionAllowedFields,
        redirectToPreviousPage: goBack,
        slug,
        status,
        updateActionAllowedFields,
        children: /* @__PURE__ */ jsxs(Main, { "aria-busy": status !== "resolved", children: [
          /* @__PURE__ */ jsx(Header, { allowedActions }),
          /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(Grid$1, { gap: 4, children: [
            /* @__PURE__ */ jsx(GridItem, { col: 9, s: 12, children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: formattedContentTypeLayout.map((row, index) => {
              if (isDynamicZone(row)) {
                const [[{ name, fieldSchema, metadatas, ...restProps }]] = row;
                return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Grid$1, { gap: 4, children: /* @__PURE__ */ jsx(GridItem, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ jsx(
                  DynamicZone,
                  {
                    name,
                    fieldSchema,
                    metadatas,
                    ...restProps
                  }
                ) }) }) }, index);
              }
              return /* @__PURE__ */ jsx(
                Box,
                {
                  hasRadius: true,
                  background: "neutral0",
                  shadow: "tableShadow",
                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingTop: 6,
                  paddingBottom: 6,
                  borderColor: "neutral150",
                  children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: row.map((columns, gridRowIndex) => /* @__PURE__ */ jsx(Grid$1, { gap: 4, children: columns.map(
                    ({
                      fieldSchema,
                      metadatas,
                      name,
                      size: size2,
                      queryInfos,
                      ...restProps
                    }) => {
                      const isComponent = fieldSchema.type === "component";
                      if (isComponent) {
                        const {
                          component,
                          max,
                          min,
                          repeatable = false,
                          required = false
                        } = fieldSchema;
                        return /* @__PURE__ */ jsx(GridItem, { col: size2, s: 12, xs: 12, children: /* @__PURE__ */ jsx(
                          FieldComponent,
                          {
                            componentUid: component,
                            isRepeatable: repeatable,
                            intlLabel: {
                              id: metadatas.label,
                              defaultMessage: metadatas.label
                            },
                            max,
                            min,
                            name,
                            required,
                            ...restProps
                          }
                        ) }, component);
                      }
                      return /* @__PURE__ */ jsx(GridItem, { col: size2, s: 12, xs: 12, children: /* @__PURE__ */ jsx(
                        Inputs,
                        {
                          size: size2,
                          fieldSchema,
                          keys: name,
                          metadatas,
                          queryInfos,
                          customFieldInputs: lazyComponentStore,
                          ...restProps
                        }
                      ) }, name);
                    }
                  ) }, gridRowIndex)) })
                },
                index
              );
            }) }) }),
            /* @__PURE__ */ jsx(GridItem, { col: 3, s: 12, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
              /* @__PURE__ */ jsx(DraftAndPublishBadge, {}),
              /* @__PURE__ */ jsxs(
                Box,
                {
                  as: "aside",
                  "aria-labelledby": "additional-information",
                  background: "neutral0",
                  borderColor: "neutral150",
                  hasRadius: true,
                  paddingBottom: 4,
                  paddingLeft: 4,
                  paddingRight: 4,
                  paddingTop: 6,
                  shadow: "tableShadow",
                  children: [
                    /* @__PURE__ */ jsx(Information2, {}),
                    /* @__PURE__ */ jsx(InjectionZone, { area: "contentManager.editView.informations" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Box, { as: "aside", "aria-labelledby": "links", children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
                /* @__PURE__ */ jsx(InjectionZone, { area: "contentManager.editView.right-links", slug }),
                slug !== "strapi::administrator" && /* @__PURE__ */ jsx(CheckPermissions, { permissions: CTB_PERMISSIONS, children: /* @__PURE__ */ jsx(
                  LinkButton$2,
                  {
                    onClick: () => {
                      trackUsage("willEditEditLayout");
                    },
                    size: "S",
                    startIcon: /* @__PURE__ */ jsx(Pencil, {}),
                    style: { width: "100%" },
                    to: `/plugins/content-type-builder/content-types/${slug}`,
                    variant: "secondary",
                    children: formatMessage({
                      id: getTranslation("link-to-ctb"),
                      defaultMessage: "Edit the model"
                    })
                  }
                ) }),
                /* @__PURE__ */ jsx(CheckPermissions, { permissions: configurationPermissions, children: /* @__PURE__ */ jsx(
                  LinkButton$2,
                  {
                    size: "S",
                    startIcon: /* @__PURE__ */ jsx(Layer, {}),
                    style: { width: "100%" },
                    to: configurationsURL,
                    variant: "secondary",
                    children: formatMessage({
                      id: "app.links.configure-view",
                      defaultMessage: "Configure the view"
                    })
                  }
                ) }),
                allowedActions.canDelete && !isCreatingEntry && /* @__PURE__ */ jsx(DeleteLink, { onDelete })
              ] }) })
            ] }) })
          ] }) })
        ] })
      }
    );
  } });
};
const selectAttributesLayout = createSelector(
  (state) => state["content-manager_editViewLayoutManager"].currentLayout,
  (layout) => {
    const currentContentTypeLayoutData = layout?.contentType;
    if (!currentContentTypeLayoutData) {
      return [];
    }
    const currentLayout = currentContentTypeLayoutData.layouts.edit;
    let currentRowIndex = 0;
    const newLayout = [];
    currentLayout.forEach((row) => {
      const hasDynamicZone = row.some(
        ({ name }) => currentContentTypeLayoutData.attributes[name]["type"] === "dynamiczone"
      );
      if (!newLayout[currentRowIndex]) {
        newLayout[currentRowIndex] = [];
      }
      if (hasDynamicZone) {
        currentRowIndex = currentRowIndex === 0 && newLayout[0].length === 0 ? 0 : currentRowIndex + 1;
        if (!newLayout[currentRowIndex]) {
          newLayout[currentRowIndex] = [];
        }
        newLayout[currentRowIndex].push(row);
        currentRowIndex += 1;
      } else {
        newLayout[currentRowIndex].push(row);
      }
    });
    return newLayout.filter((arr) => arr.length > 0);
  }
);
const selectCustomFieldUids = createSelector(
  (state) => state["content-manager_editViewLayoutManager"].currentLayout,
  (layout) => {
    if (!layout.contentType)
      return [];
    const allFields = [
      ...layout.contentType.layouts.edit,
      ...Object.values(layout.components).flatMap((component) => component.layouts.edit)
    ].flat();
    const customFieldUids = allFields.filter((field) => field.fieldSchema.customField).map((customField) => customField.fieldSchema.customField);
    const uniqueCustomFieldUids = [...new Set(customFieldUids)];
    return uniqueCustomFieldUids;
  }
);
const ProtectedEditViewPage = ({
  slug,
  userPermissions = [],
  ...restProps
}) => {
  const viewPermissions = React.useMemo(() => generatePermissionsObject(slug), [slug]);
  const { isLoading, allowedActions } = useRBAC(
    viewPermissions,
    // TODO: just make usePermissions undefined by default in the reducer?
    userPermissions
  );
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsx(
    EditViewPage,
    {
      ...restProps,
      allowedActions,
      slug,
      userPermissions
    }
  );
};
const { MUTATE_EDIT_VIEW_LAYOUT: MUTATE_EDIT_VIEW_LAYOUT$1 } = HOOKS;
const EditViewLayoutManager = ({ layout, ...rest }) => {
  const currentLayout = useTypedSelector(
    (state) => state["content-manager_editViewLayoutManager"].currentLayout
  );
  const dispatch = useTypedDispatch();
  const [{ query }] = useQueryParams();
  const { runHookWaterfall } = useStrapiApp();
  const { permissions: permissions2, isValid: isValidPermissions } = useSyncRbac(query, rest.slug, "editView");
  React.useEffect(() => {
    const mutatedLayout = runHookWaterfall(MUTATE_EDIT_VIEW_LAYOUT$1, { layout, query });
    dispatch(setLayout$1(mutatedLayout.layout, query));
    return () => {
      dispatch(resetProps$1());
    };
  }, [layout, dispatch, query, runHookWaterfall]);
  if (!currentLayout.contentType || !isValidPermissions) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsx(ProtectedEditViewPage, { ...rest, userPermissions: permissions2 ?? [] });
};
const RESET_PROPS$1 = "ContentManager/EditViewLayoutManager/RESET_PROPS";
const resetProps$1 = () => ({ type: RESET_PROPS$1 });
const SET_LAYOUT = "ContentManager/EditViewLayoutManager/SET_LAYOUT";
const setLayout$1 = (layout, query) => ({
  type: SET_LAYOUT,
  layout,
  query
});
const initialState$5 = {
  currentLayout: {
    components: {},
    contentType: null
  }
};
const reducer$4 = (state = initialState$5, action) => produce(state, (draftState) => {
  switch (action.type) {
    case RESET_PROPS$1: {
      draftState.currentLayout = initialState$5.currentLayout;
      break;
    }
    case SET_LAYOUT: {
      draftState.currentLayout = action.layout;
      break;
    }
    default:
      return draftState;
  }
});
const usePluginsQueryParams = () => {
  const { search } = useLocation();
  const query = search ? parse(search.substring(1)) : {};
  return query.plugins ? stringify({ plugins: query.plugins }, { encode: false }) : "";
};
const HeaderContainer = styled(Flex)`
  svg {
    width: ${32 / 16}rem;
    height: ${24 / 16}rem;
    margin-right: ${({ theme }) => theme.spaces[3]};
  }
`;
const EditFieldForm = ({
  attributes,
  fieldForm,
  fieldToEdit,
  onCloseModal,
  onChangeEditLabel,
  onSubmit,
  type
}) => {
  const { formatMessage } = useIntl();
  const relationType = attributes[fieldToEdit].relationType;
  let shouldDisplaySortToggle = !["media", "relation"].includes(type);
  if (["oneWay", "oneToOne", "manyToOne"].includes(relationType)) {
    shouldDisplaySortToggle = true;
  }
  return /* @__PURE__ */ jsx(ModalLayout, { onClose: onCloseModal, labelledBy: "title", children: /* @__PURE__ */ jsxs("form", { onSubmit, children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsxs(HeaderContainer, { children: [
      /* @__PURE__ */ jsx(FieldTypeIcon, { type }),
      /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage(
        {
          id: getTranslation("containers.ListSettingsView.modal-form.edit-label"),
          defaultMessage: "Edit {fieldName}"
        },
        { fieldName: upperFirst(fieldToEdit) }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsxs(Grid$1, { gap: 4, children: [
      /* @__PURE__ */ jsx(GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "label-input",
          label: formatMessage({
            id: getTranslation("form.Input.label"),
            defaultMessage: "Label"
          }),
          name: "label",
          onChange: (e) => onChangeEditLabel(e),
          value: fieldForm.label,
          hint: formatMessage({
            id: getTranslation("form.Input.label.inputDescription"),
            defaultMessage: "This value overrides the label displayed in the table's head"
          })
        }
      ) }),
      shouldDisplaySortToggle && /* @__PURE__ */ jsx(GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsx(
        ToggleInput,
        {
          "data-testid": "Enable sort on this field",
          checked: fieldForm.sortable,
          label: formatMessage({
            id: getTranslation("form.Input.sort.field"),
            defaultMessage: "Enable sort on this field"
          }),
          name: "sortable",
          onChange: (e) => onChangeEditLabel({ target: { name: "sortable", value: e.target.checked } }),
          onLabel: formatMessage({
            id: "app.components.ToggleCheckbox.on-label",
            defaultMessage: "on"
          }),
          offLabel: formatMessage({
            id: "app.components.ToggleCheckbox.off-label",
            defaultMessage: "off"
          })
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: onCloseModal, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
        endActions: /* @__PURE__ */ jsx(Button, { type: "submit", children: formatMessage({ id: "global.finish", defaultMessage: "Finish" }) })
      }
    )
  ] }) });
};
EditFieldForm.propTypes = {
  attributes: PropTypes.objectOf(
    PropTypes.shape({
      relationType: PropTypes.string
    })
  ).isRequired,
  fieldForm: PropTypes.shape({
    label: PropTypes.string,
    sortable: PropTypes.bool
  }).isRequired,
  fieldToEdit: PropTypes.string.isRequired,
  onChangeEditLabel: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};
const Settings = ({
  contentTypeOptions,
  modifiedData,
  onChange,
  sortOptions: sortOptionsCE
}) => {
  const { formatMessage, locale } = useIntl();
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const sortOptions = useEnterprise(
    sortOptionsCE,
    async () => (await import("./constants-2a8f4e41.mjs")).REVIEW_WORKFLOW_STAGE_SORT_OPTION_NAME,
    {
      combine(ceOptions, eeOption) {
        return [...ceOptions, { ...eeOption, label: formatMessage(eeOption.label) }];
      },
      defaultValue: sortOptionsCE,
      enabled: !!contentTypeOptions?.reviewWorkflows
    }
  );
  const sortOptionsSorted = sortOptions.sort((a, b) => formatter.compare(a.label, b.label));
  const { settings } = modifiedData;
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h2", children: formatMessage({
      id: getTranslation("containers.SettingPage.settings"),
      defaultMessage: "Settings"
    }) }),
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 4, children: [
      /* @__PURE__ */ jsx(Box, { width: "100%", children: /* @__PURE__ */ jsx(
        ToggleInput,
        {
          label: formatMessage({
            id: getTranslation("form.Input.search"),
            defaultMessage: "Enable search"
          }),
          onChange: (e) => {
            onChange({ target: { name: "settings.searchable", value: e.target.checked } });
          },
          onLabel: formatMessage({
            id: "app.components.ToggleCheckbox.on-label",
            defaultMessage: "on"
          }),
          offLabel: formatMessage({
            id: "app.components.ToggleCheckbox.off-label",
            defaultMessage: "off"
          }),
          name: "settings.searchable",
          checked: settings.searchable
        }
      ) }),
      /* @__PURE__ */ jsx(Box, { width: "100%", children: /* @__PURE__ */ jsx(
        ToggleInput,
        {
          label: formatMessage({
            id: getTranslation("form.Input.filters"),
            defaultMessage: "Enable filters"
          }),
          onChange: (e) => {
            onChange({ target: { name: "settings.filterable", value: e.target.checked } });
          },
          onLabel: formatMessage({
            id: "app.components.ToggleCheckbox.on-label",
            defaultMessage: "on"
          }),
          offLabel: formatMessage({
            id: "app.components.ToggleCheckbox.off-label",
            defaultMessage: "off"
          }),
          name: "settings.filterable",
          checked: settings.filterable
        }
      ) }),
      /* @__PURE__ */ jsx(Box, { width: "100%", children: /* @__PURE__ */ jsx(
        ToggleInput,
        {
          label: formatMessage({
            id: getTranslation("form.Input.bulkActions"),
            defaultMessage: "Enable bulk actions"
          }),
          onChange: (e) => {
            onChange({ target: { name: "settings.bulkable", value: e.target.checked } });
          },
          onLabel: formatMessage({
            id: "app.components.ToggleCheckbox.on-label",
            defaultMessage: "on"
          }),
          offLabel: formatMessage({
            id: "app.components.ToggleCheckbox.off-label",
            defaultMessage: "off"
          }),
          name: "settings.bulkable",
          checked: settings.bulkable
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Grid$1, { gap: 4, children: [
      /* @__PURE__ */ jsx(GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsx(
        Select,
        {
          label: formatMessage({
            id: getTranslation("form.Input.pageEntries"),
            defaultMessage: "Entries per page"
          }),
          hint: formatMessage({
            id: getTranslation("form.Input.pageEntries.inputDescription"),
            defaultMessage: "Note: You can override this value in the Collection Type settings page."
          }),
          onChange: (value) => onChange({ target: { name: "settings.pageSize", value } }),
          name: "settings.pageSize",
          value: modifiedData.settings.pageSize || "",
          children: [10, 20, 50, 100].map((pageSize) => /* @__PURE__ */ jsx(Option$1, { value: pageSize, children: pageSize }, pageSize))
        }
      ) }),
      /* @__PURE__ */ jsx(GridItem, { s: 12, col: 3, children: /* @__PURE__ */ jsx(
        Select,
        {
          label: formatMessage({
            id: getTranslation("form.Input.defaultSort"),
            defaultMessage: "Default sort attribute"
          }),
          onChange: (value) => onChange({ target: { name: "settings.defaultSortBy", value } }),
          name: "settings.defaultSortBy",
          value: modifiedData.settings.defaultSortBy || "",
          children: sortOptionsSorted.map(({ value, label }) => /* @__PURE__ */ jsx(Option$1, { value, children: label }, value))
        }
      ) }),
      /* @__PURE__ */ jsx(GridItem, { s: 12, col: 3, children: /* @__PURE__ */ jsx(
        Select,
        {
          label: formatMessage({
            id: getTranslation("form.Input.sort.order"),
            defaultMessage: "Default sort order"
          }),
          onChange: (value) => onChange({ target: { name: "settings.defaultSortOrder", value } }),
          name: "settings.defaultSortOrder",
          value: modifiedData.settings.defaultSortOrder || "",
          children: ["ASC", "DESC"].map((order) => /* @__PURE__ */ jsx(Option$1, { value: order, children: order }, order))
        }
      ) })
    ] })
  ] });
};
Settings.defaultProps = {
  modifiedData: {},
  sortOptions: []
};
Settings.propTypes = {
  contentTypeOptions: PropTypes.object.isRequired,
  modifiedData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    }).isRequired
  )
};
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.spaces[7]};

  &:last-child {
    padding: 0 ${({ theme }) => theme.spaces[3]};
  }
`;
const DragButton = styled(ActionButton)`
  padding: 0 ${({ theme }) => theme.spaces[3]};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
  cursor: all-scroll;

  svg {
    width: ${12 / 16}rem;
    height: ${12 / 16}rem;
  }
`;
const FieldContainer = styled(Flex)`
  max-height: ${32 / 16}rem;
  cursor: pointer;

  svg {
    width: ${10 / 16}rem;
    height: ${10 / 16}rem;

    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary100};
    border-color: ${({ theme }) => theme.colors.primary200};

    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }

    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
    }

    ${DragButton} {
      border-right: 1px solid ${({ theme }) => theme.colors.primary200};
    }
  }
`;
const FieldWrapper = styled(Box)`
  &:last-child {
    padding-right: ${({ theme }) => theme.spaces[3]};
  }
`;
const DraggableCard = ({
  index,
  isDraggingSibling,
  labelField,
  onClickEditField,
  onMoveField,
  onRemoveField,
  name,
  setIsDraggingSibling
}) => {
  const { formatMessage } = useIntl();
  const dragRef = useRef(null);
  const dropRef = useRef(null);
  const [, forceRerenderAfterDnd] = useState(false);
  const editButtonRef = useRef();
  const handleClickEditRow = () => {
    if (editButtonRef.current) {
      editButtonRef.current.click();
    }
  };
  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      onMoveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.FIELD,
    item() {
      return { index, labelField, name };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end() {
      setIsDraggingSibling(false);
    }
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, [preview]);
  useEffect(() => {
    if (isDragging) {
      setIsDraggingSibling(true);
    }
  }, [isDragging, setIsDraggingSibling]);
  useEffect(() => {
    if (!isDraggingSibling) {
      forceRerenderAfterDnd((prev) => !prev);
    }
  }, [isDraggingSibling]);
  const refs = {
    dragRef: drag(dragRef),
    dropRef: drop(dropRef)
  };
  return /* @__PURE__ */ jsxs(FieldWrapper, { ref: refs ? refs.dropRef : null, children: [
    isDragging && /* @__PURE__ */ jsx(CardDragPreview, { labelField }),
    !isDragging && isDraggingSibling && /* @__PURE__ */ jsx(CardDragPreview, { isSibling: true, labelField }),
    !isDragging && !isDraggingSibling && /* @__PURE__ */ jsxs(
      FieldContainer,
      {
        borderColor: "neutral150",
        background: "neutral100",
        hasRadius: true,
        justifyContent: "space-between",
        onClick: handleClickEditRow,
        isDragging,
        children: [
          /* @__PURE__ */ jsxs(Flex, { gap: 3, children: [
            /* @__PURE__ */ jsx(
              DragButton,
              {
                as: "span",
                "aria-label": formatMessage(
                  {
                    id: getTranslation("components.DraggableCard.move.field"),
                    defaultMessage: "Move {item}"
                  },
                  { item: labelField }
                ),
                onClick: (e) => e.stopPropagation(),
                ref: refs.dragRef,
                type: "button",
                children: /* @__PURE__ */ jsx(Drag, {})
              }
            ),
            /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: labelField })
          ] }),
          /* @__PURE__ */ jsxs(Flex, { paddingLeft: 3, children: [
            /* @__PURE__ */ jsx(
              ActionButton,
              {
                ref: editButtonRef,
                onClick: (e) => {
                  e.stopPropagation();
                  onClickEditField(name);
                },
                "aria-label": formatMessage(
                  {
                    id: getTranslation("components.DraggableCard.edit.field"),
                    defaultMessage: "Edit {item}"
                  },
                  { item: labelField }
                ),
                type: "button",
                children: /* @__PURE__ */ jsx(Pencil, {})
              }
            ),
            /* @__PURE__ */ jsx(
              ActionButton,
              {
                onClick: onRemoveField,
                "data-testid": `delete-${name}`,
                "aria-label": formatMessage(
                  {
                    id: getTranslation("components.DraggableCard.delete.field"),
                    defaultMessage: "Delete {item}"
                  },
                  { item: labelField }
                ),
                type: "button",
                children: /* @__PURE__ */ jsx(Cross, {})
              }
            )
          ] })
        ]
      }
    )
  ] });
};
DraggableCard.propTypes = {
  index: PropTypes.number.isRequired,
  isDraggingSibling: PropTypes.bool.isRequired,
  labelField: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClickEditField: PropTypes.func.isRequired,
  onMoveField: PropTypes.func.isRequired,
  onRemoveField: PropTypes.func.isRequired,
  setIsDraggingSibling: PropTypes.func.isRequired
};
const SortDisplayedFields = ({
  displayedFields,
  listRemainingFields,
  metadatas,
  onAddField,
  onClickEditField,
  onMoveField,
  onRemoveField
}) => {
  const { formatMessage } = useIntl();
  const [isDraggingSibling, setIsDraggingSibling] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const scrollableContainerRef = useRef();
  function handleAddField(...args) {
    setLastAction("add");
    onAddField(...args);
  }
  function handleRemoveField(...args) {
    setLastAction("remove");
    onRemoveField(...args);
  }
  useEffect(() => {
    if (lastAction === "add" && scrollableContainerRef?.current) {
      scrollableContainerRef.current.scrollLeft = scrollableContainerRef.current.scrollWidth;
    }
  }, [displayedFields, lastAction]);
  return /* @__PURE__ */ jsxs(Flex, { alignItems: "stretch", direction: "column", gap: 4, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h2", children: formatMessage({
      id: getTranslation("containers.SettingPage.view"),
      defaultMessage: "View"
    }) }),
    /* @__PURE__ */ jsxs(Flex, { padding: 4, borderColor: "neutral300", borderStyle: "dashed", borderWidth: "1px", hasRadius: true, children: [
      /* @__PURE__ */ jsx(Box, { flex: "1", overflow: "scroll hidden", ref: scrollableContainerRef, children: /* @__PURE__ */ jsx(Flex, { gap: 3, children: displayedFields.map((field, index) => /* @__PURE__ */ jsx(
        DraggableCard,
        {
          index,
          isDraggingSibling,
          onMoveField,
          onClickEditField,
          onRemoveField: (e) => handleRemoveField(e, index),
          name: field,
          labelField: metadatas[field].list.label || field,
          setIsDraggingSibling
        },
        field
      )) }) }),
      /* @__PURE__ */ jsxs(Menu.Root, { children: [
        /* @__PURE__ */ jsxs(
          Menu.Trigger,
          {
            paddingLeft: 2,
            paddingRight: 2,
            justifyContent: "center",
            endIcon: null,
            disabled: listRemainingFields.length <= 0,
            variant: "tertiary",
            children: [
              /* @__PURE__ */ jsx(VisuallyHidden, { as: "span", children: formatMessage({
                id: getTranslation("components.FieldSelect.label"),
                defaultMessage: "Add a field"
              }) }),
              /* @__PURE__ */ jsx(Plus, { "aria-hidden": true, focusable: false, style: { position: "relative", top: 2 } })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Menu.Content, { children: listRemainingFields.map((field) => /* @__PURE__ */ jsx(Menu.Item, { onSelect: () => handleAddField(field), children: metadatas[field].list.label || field }, field)) })
      ] })
    ] })
  ] });
};
SortDisplayedFields.propTypes = {
  displayedFields: PropTypes$1.array.isRequired,
  listRemainingFields: PropTypes$1.array.isRequired,
  metadatas: PropTypes$1.objectOf(
    PropTypes$1.shape({
      list: PropTypes$1.shape({
        label: PropTypes$1.string
      })
    })
  ).isRequired,
  onAddField: PropTypes$1.func.isRequired,
  onClickEditField: PropTypes$1.func.isRequired,
  onMoveField: PropTypes$1.func.isRequired,
  onRemoveField: PropTypes$1.func.isRequired
};
const EXCLUDED_SORT_ATTRIBUTE_TYPES = [
  "media",
  "richtext",
  "dynamiczone",
  "relation",
  "component",
  "json",
  "blocks"
];
const initialState$4 = {
  fieldForm: {},
  fieldToEdit: "",
  initialData: {},
  modifiedData: {}
};
const reducer$3 = (state = initialState$4, action) => (
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    const layoutFieldListPath = ["modifiedData", "layouts", "list"];
    switch (action.type) {
      case "ADD_FIELD": {
        const layoutFieldList = get(state, layoutFieldListPath, []);
        set(draftState, layoutFieldListPath, [...layoutFieldList, action.item]);
        break;
      }
      case "MOVE_FIELD": {
        const layoutFieldList = get(state, layoutFieldListPath, []);
        const { originalIndex, atIndex } = action;
        set(
          draftState,
          layoutFieldListPath,
          arrayMoveItem(layoutFieldList, originalIndex, atIndex)
        );
        break;
      }
      case "ON_CHANGE": {
        set(draftState, ["modifiedData", ...action.keys.split(".")], action.value);
        break;
      }
      case "ON_CHANGE_FIELD_METAS": {
        set(draftState, ["fieldForm", action.name], action.value);
        break;
      }
      case "REMOVE_FIELD": {
        const layoutFieldList = get(state, layoutFieldListPath, []);
        set(
          draftState,
          layoutFieldListPath,
          layoutFieldList.filter((_, index) => action.index !== index)
        );
        break;
      }
      case "SET_FIELD_TO_EDIT": {
        const { fieldToEdit } = action;
        draftState.fieldToEdit = fieldToEdit;
        draftState.fieldForm.label = get(
          draftState,
          ["modifiedData", "metadatas", fieldToEdit, "list", "label"],
          ""
        );
        draftState.fieldForm.sortable = get(
          draftState,
          ["modifiedData", "metadatas", fieldToEdit, "list", "sortable"],
          ""
        );
        break;
      }
      case "UNSET_FIELD_TO_EDIT": {
        draftState.fieldForm = {};
        draftState.fieldToEdit = "";
        break;
      }
      case "SUBMIT_FIELD_FORM": {
        const fieldMetadataPath = ["modifiedData", "metadatas", state.fieldToEdit, "list"];
        set(draftState, [...fieldMetadataPath, "label"], state.fieldForm.label);
        set(draftState, [...fieldMetadataPath, "sortable"], state.fieldForm.sortable);
        break;
      }
      default:
        return draftState;
    }
  })
);
const ListSettingsView = ({ layout, slug }) => {
  const { put } = useFetchClient();
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const pluginsQueryParams = usePluginsQueryParams();
  const toggleNotification = useNotification();
  const { refetchData } = React.useContext(ModelsContext);
  const [{ fieldToEdit, fieldForm, initialData, modifiedData }, dispatch] = React.useReducer(
    reducer$3,
    initialState$4,
    () => ({
      ...initialState$4,
      initialData: layout,
      modifiedData: layout
    })
  );
  const isModalFormOpen = Object.keys(fieldForm).length !== 0;
  const { attributes, options: options2 } = layout;
  const displayedFields = modifiedData.layouts.list;
  const goBackUrl = () => {
    const {
      settings: { pageSize, defaultSortBy, defaultSortOrder },
      kind,
      uid
    } = initialData;
    const sort = `${defaultSortBy}:${defaultSortOrder}`;
    const goBackSearch = `${stringify(
      {
        page: 1,
        pageSize,
        sort
      },
      { encode: false }
    )}${pluginsQueryParams ? `&${pluginsQueryParams}` : ""}`;
    return `/content-manager/${kind}/${uid}?${goBackSearch}`;
  };
  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "ON_CHANGE",
      keys: name,
      value: name === "settings.pageSize" ? parseInt(value, 10) : value
    });
  };
  const { isLoading: isSubmittingForm, mutate } = useMutation(
    (body) => put(`/content-manager/content-types/${slug}/configuration`, body),
    {
      onSuccess() {
        trackUsage("didEditListSettings");
        refetchData();
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error" }
        });
      }
    }
  );
  const handleAddField = (item) => {
    dispatch({
      type: "ADD_FIELD",
      item
    });
  };
  const handleRemoveField = (e, index) => {
    e.stopPropagation();
    if (displayedFields.length === 1) {
      toggleNotification({
        type: "info",
        message: { id: getTranslation("notification.info.minimumFields") }
      });
    } else {
      dispatch({
        type: "REMOVE_FIELD",
        index
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { layouts, settings, metadatas } = modifiedData;
    mutate({
      layouts,
      settings,
      metadatas
    });
    trackUsage("willSaveContentTypeLayout");
  };
  const handleClickEditField = (fieldToEdit2) => {
    dispatch({
      type: "SET_FIELD_TO_EDIT",
      fieldToEdit: fieldToEdit2
    });
  };
  const handleCloseModal = () => {
    dispatch({
      type: "UNSET_FIELD_TO_EDIT"
    });
  };
  const handleSubmitFieldEdit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMIT_FIELD_FORM"
    });
    handleCloseModal();
  };
  const handleChangeEditLabel = ({ target: { name, value } }) => {
    dispatch({
      type: "ON_CHANGE_FIELD_METAS",
      name,
      value
    });
  };
  const listRemainingFields = Object.entries(attributes).filter(
    ([name, attribute]) => checkIfAttributeIsDisplayable(attribute) && !displayedFields.includes(name)
  ).map(([name]) => name).sort();
  const sortOptions = Object.entries(attributes).filter(([, attribute]) => !EXCLUDED_SORT_ATTRIBUTE_TYPES.includes(attribute.type)).map(([name]) => ({
    value: name,
    label: layout.metadatas[name].list.label
  }));
  const move = (originalIndex, atIndex) => {
    dispatch({
      type: "MOVE_FIELD",
      originalIndex,
      atIndex
    });
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Main, { "aria-busy": isSubmittingForm, children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          navigationAction: /* @__PURE__ */ jsx(Link$3, { startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: goBackUrl, id: "go-back", children: formatMessage({ id: "global.back", defaultMessage: "Back" }) }),
          primaryAction: /* @__PURE__ */ jsx(
            Button,
            {
              size: "S",
              startIcon: /* @__PURE__ */ jsx(Check, {}),
              disabled: isEqual(modifiedData, initialData),
              type: "submit",
              children: formatMessage({ id: "global.save", defaultMessage: "Save" })
            }
          ),
          subtitle: formatMessage({
            id: getTranslation(
              "components.SettingsViewWrapper.pluginHeader.description.list-settings"
            ),
            defaultMessage: "Define the settings of the list view."
          }),
          title: formatMessage(
            {
              id: getTranslation("components.SettingsViewWrapper.pluginHeader.title"),
              defaultMessage: "Configure the view - {name}"
            },
            { name: upperFirst(modifiedData.info.displayName) }
          )
        }
      ),
      /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(
        Flex,
        {
          alignItems: "stretch",
          background: "neutral0",
          direction: "column",
          gap: 6,
          hasRadius: true,
          shadow: "tableShadow",
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 7,
          paddingRight: 7,
          children: [
            /* @__PURE__ */ jsx(
              Settings,
              {
                contentTypeOptions: options2,
                modifiedData,
                onChange: handleChange,
                sortOptions
              }
            ),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsx(
              SortDisplayedFields,
              {
                listRemainingFields,
                displayedFields,
                onAddField: handleAddField,
                onClickEditField: handleClickEditField,
                onMoveField: move,
                onRemoveField: handleRemoveField,
                metadatas: modifiedData.metadatas
              }
            )
          ]
        }
      ) })
    ] }),
    isModalFormOpen && /* @__PURE__ */ jsx(
      EditFieldForm,
      {
        attributes,
        fieldForm,
        fieldToEdit,
        onChangeEditLabel: handleChangeEditLabel,
        onCloseModal: handleCloseModal,
        onSubmit: handleSubmitFieldEdit,
        type: attributes?.[fieldToEdit]?.type ?? "text"
      }
    )
  ] }) });
};
ListSettingsView.propTypes = {
  layout: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    settings: PropTypes.shape({
      bulkable: PropTypes.bool,
      defaultSortBy: PropTypes.string,
      defaultSortOrder: PropTypes.string,
      filterable: PropTypes.bool,
      pageSize: PropTypes.number,
      searchable: PropTypes.bool
    }).isRequired,
    metadatas: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    attributes: PropTypes.objectOf(
      PropTypes.shape({
        type: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  slug: PropTypes.string.isRequired
};
const GET_DATA = "ContentManager/ListView/GET_DATA";
const GET_DATA_SUCCEEDED = "ContentManager/ListView/GET_DATA_SUCCEEDED";
const RESET_PROPS = "ContentManager/ListView/RESET_PROPS";
const ON_CHANGE_LIST_HEADERS = "ContentManager/ListView/ON_CHANGE_LIST_HEADERS ";
const ON_RESET_LIST_HEADERS = "ContentManager/ListView/ON_RESET_LIST_HEADERS ";
const SET_LIST_LAYOUT = "ContentManager/ListView/SET_LIST_LAYOUT ";
const getData = () => ({ type: GET_DATA });
const getDataSucceeded = (pagination, data) => ({
  type: GET_DATA_SUCCEEDED,
  pagination,
  data
});
const onResetListHeaders = () => ({ type: ON_RESET_LIST_HEADERS });
function resetProps() {
  return { type: RESET_PROPS };
}
const setLayout = ({ components, contentType }) => {
  const { layouts } = contentType;
  return {
    contentType,
    components,
    displayedHeaders: layouts.list,
    type: SET_LIST_LAYOUT
  };
};
const onChangeListHeaders = (target) => ({ type: ON_CHANGE_LIST_HEADERS, target });
function useAdminUsers(params = {}, queryOptions = {}) {
  const { id = "", ...queryParams } = params;
  const { get: get2 } = useFetchClient();
  const { data, isError, isLoading, refetch } = useQuery(
    ["users", id, queryParams],
    async () => {
      const {
        data: { data: data2 }
      } = await get2(`/admin/users/${id}`, {
        params: queryParams
      });
      return data2;
    },
    queryOptions
  );
  const users = React.useMemo(() => {
    let users2 = [];
    if (data) {
      if ("results" in data) {
        if (Array.isArray(data.results)) {
          users2 = data.results;
        }
      } else {
        users2 = [data];
      }
    }
    return users2;
  }, [data]);
  return {
    users,
    pagination: React.useMemo(
      () => data && "pagination" in data ? data.pagination ?? null : null,
      [data]
    ),
    isLoading,
    isError,
    refetch
  };
}
const Filter = ({ displayedFilters }) => {
  const [isVisible, setIsVisible] = React__default.useState(false);
  const { formatMessage } = useIntl();
  const buttonRef = React__default.useRef();
  const { trackUsage } = useTracking();
  const handleToggle = () => {
    if (!isVisible) {
      trackUsage("willFilterEntries");
    }
    setIsVisible((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "tertiary",
        ref: buttonRef,
        startIcon: /* @__PURE__ */ jsx(Filter$1, {}),
        onClick: handleToggle,
        size: "S",
        children: formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" })
      }
    ),
    isVisible && /* @__PURE__ */ jsx(
      FilterPopoverURLQuery,
      {
        displayedFilters,
        isVisible,
        onToggle: handleToggle,
        source: buttonRef
      }
    ),
    /* @__PURE__ */ jsx(FilterListURLQuery, { filtersSchema: displayedFilters })
  ] });
};
Filter.propTypes = {
  displayedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({ type: PropTypes.string })
    })
  ).isRequired
};
const AdminUsersFilter = ({ value, onChange }) => {
  const { formatMessage } = useIntl();
  const { users, isLoading } = useAdminUsers();
  return /* @__PURE__ */ jsx(
    Combobox,
    {
      value,
      "aria-label": formatMessage({
        id: "content-manager.components.Filters.usersSelect.label",
        defaultMessage: "Search and select an user to filter"
      }),
      onChange,
      loading: isLoading,
      children: users.map((user) => {
        return /* @__PURE__ */ jsx(ComboboxOption, { value: user.id.toString(), children: getDisplayName(user, formatMessage) }, user.id);
      })
    }
  );
};
AdminUsersFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};
AdminUsersFilter.defaultProps = {
  value: ""
};
const NOT_ALLOWED_FILTERS = [
  "json",
  "component",
  "media",
  "richtext",
  "dynamiczone",
  "password",
  "blocks"
];
const TIMESTAMPS = ["createdAt", "updatedAt"];
const useAllowedAttributes = (contentType, slug) => {
  const { allPermissions } = useRBACProvider();
  const readPermissionsForSlug = findMatchingPermissions(allPermissions, [
    {
      action: "plugin::content-manager.explorer.read",
      subject: slug
    }
  ]);
  const canReadAdminUsers = findMatchingPermissions(allPermissions, [
    {
      action: "admin::users.read",
      subject: null
    }
  ]).length > 0;
  const attributesWithReadPermissions = readPermissionsForSlug?.[0]?.properties?.fields ?? [];
  const allowedAttributes = attributesWithReadPermissions.filter((attr) => {
    const current = contentType?.attributes?.[attr] ?? {};
    if (!current.type) {
      return false;
    }
    if (NOT_ALLOWED_FILTERS.includes(current.type)) {
      return false;
    }
    return true;
  });
  return ["id", ...allowedAttributes, ...TIMESTAMPS, ...canReadAdminUsers ? CREATOR_FIELDS : []];
};
const InjectionZoneList = ({ area, ...props }) => {
  const compos = useInjectionZone(area);
  if (!compos) {
    return null;
  }
  return /* @__PURE__ */ jsx("ul", { children: compos.map((compo) => {
    const component = compo.Component(props);
    if (component) {
      return /* @__PURE__ */ jsx(Box, { padding: 3, style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(compo.Component, { ...props }) }, compo.name);
    }
    return null;
  }) });
};
InjectionZoneList.propTypes = {
  area: PropTypes.string.isRequired
};
const ConfirmDialogDelete = ({
  isConfirmButtonLoading,
  isOpen,
  onToggleDialog,
  onConfirm
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      onClose: onToggleDialog,
      title: formatMessage({
        id: "app.components.ConfirmDialog.title",
        defaultMessage: "Confirmation"
      }),
      labelledBy: "confirmation",
      describedBy: "confirm-description",
      isOpen,
      children: [
        /* @__PURE__ */ jsx(DialogBody, { icon: /* @__PURE__ */ jsx(ExclamationMarkCircle, {}), children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
          /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Typography, { id: "confirm-description", children: formatMessage({
            id: "components.popUpWarning.message",
            defaultMessage: "Are you sure you want to delete this?"
          }) }) }),
          /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(InjectionZoneList, { area: "contentManager.listView.deleteModalAdditionalInfos" }) })
        ] }) }),
        /* @__PURE__ */ jsx(
          DialogFooter,
          {
            startAction: /* @__PURE__ */ jsx(Button, { onClick: onToggleDialog, variant: "tertiary", children: formatMessage({
              id: "app.components.Button.cancel",
              defaultMessage: "Cancel"
            }) }),
            endAction: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: onConfirm,
                variant: "danger-light",
                startIcon: /* @__PURE__ */ jsx(Trash, {}),
                id: "confirm-delete",
                loading: isConfirmButtonLoading,
                children: formatMessage({
                  id: "app.components.Button.confirm",
                  defaultMessage: "Confirm"
                })
              }
            )
          }
        )
      ]
    }
  );
};
ConfirmDialogDelete.propTypes = {
  isConfirmButtonLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onToggleDialog: PropTypes.func.isRequired
};
const stopPropagation = (e) => e.stopPropagation();
const CheckboxDataCell = ({ rowId, index }) => {
  const { selectedEntries, onSelectRow } = useTableContext();
  const { formatMessage } = useIntl();
  const isChecked = selectedEntries.findIndex((id) => id === rowId) !== -1;
  const ariaLabel = formatMessage(
    {
      id: "app.component.table.select.one-entry",
      defaultMessage: `Select {target}`
    },
    { target: index + 1 }
  );
  return /* @__PURE__ */ jsx(
    BaseCheckbox,
    {
      "aria-label": ariaLabel,
      checked: isChecked,
      onClick: stopPropagation,
      onChange: () => {
        onSelectRow({ name: rowId, value: !isChecked });
      }
    }
  );
};
CheckboxDataCell.propTypes = {
  rowId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};
const EntityActionsDataCell = ({
  rowId,
  index,
  canCreate,
  canDelete,
  setIsConfirmDeleteRowOpen,
  handleCloneClick
}) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { setSelectedEntries } = useTableContext();
  const pluginsQueryParams = usePluginsQueryParams();
  const {
    location: { pathname }
  } = useHistory();
  const itemLineText = formatMessage(
    {
      id: "content-manager.components.ListViewTable.row-line",
      defaultMessage: "item line {number}"
    },
    { number: index + 1 }
  );
  return /* @__PURE__ */ jsxs(Flex, { gap: 1, justifyContent: "end", onClick: stopPropagation, children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        forwardedAs: Link$4,
        onClick: () => {
          trackUsage("willEditEntryFromButton");
        },
        to: {
          pathname: `${pathname}/${rowId}`,
          state: { from: pathname },
          search: pluginsQueryParams
        },
        label: formatMessage(
          { id: "app.component.table.edit", defaultMessage: "Edit {target}" },
          { target: itemLineText }
        ),
        noBorder: true,
        children: /* @__PURE__ */ jsx(Pencil, {})
      }
    ),
    canCreate && /* @__PURE__ */ jsx(
      IconButton,
      {
        onClick: handleCloneClick(rowId),
        label: formatMessage(
          {
            id: "app.component.table.duplicate",
            defaultMessage: "Duplicate {target}"
          },
          { target: itemLineText }
        ),
        noBorder: true,
        children: /* @__PURE__ */ jsx(Duplicate, {})
      }
    ),
    canDelete && /* @__PURE__ */ jsx(
      IconButton,
      {
        onClick: () => {
          trackUsage("willDeleteEntryFromList");
          setSelectedEntries([rowId]);
          setIsConfirmDeleteRowOpen(true);
        },
        label: formatMessage(
          { id: "global.delete-target", defaultMessage: "Delete {target}" },
          { target: itemLineText }
        ),
        noBorder: true,
        children: /* @__PURE__ */ jsx(Trash, {})
      }
    )
  ] });
};
EntityActionsDataCell.defaultProps = {
  canCreate: false,
  canDelete: false
};
EntityActionsDataCell.propTypes = {
  rowId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setIsConfirmDeleteRowOpen: PropTypes.func.isRequired,
  handleCloneClick: PropTypes.func.isRequired,
  canCreate: PropTypes.bool,
  canDelete: PropTypes.bool
};
const Root = ({ children, onConfirmDelete, isConfirmDeleteRowOpen, setIsConfirmDeleteRowOpen }) => {
  const [isLoading, setIsLoading] = React__default.useState(false);
  const { selectedEntries, setSelectedEntries } = useTableContext();
  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      await onConfirmDelete(selectedEntries[0]);
      setIsConfirmDeleteRowOpen(false);
      setIsLoading(false);
      setSelectedEntries([]);
    } catch (error) {
      setIsLoading(false);
      setIsConfirmDeleteRowOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs(Table.Body, { children: [
    children,
    /* @__PURE__ */ jsx(
      ConfirmDialogDelete,
      {
        isConfirmButtonLoading: isLoading,
        onConfirm: handleConfirmDelete,
        onToggleDialog: () => setIsConfirmDeleteRowOpen(!isConfirmDeleteRowOpen),
        isOpen: isConfirmDeleteRowOpen
      }
    )
  ] });
};
Root.propTypes = {
  children: PropTypes.node.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  isConfirmDeleteRowOpen: PropTypes.bool.isRequired,
  setIsConfirmDeleteRowOpen: PropTypes.func.isRequired
};
const Body = { CheckboxDataCell, EntityActionsDataCell, Root };
const initialState$3 = {
  data: [],
  isLoading: true,
  contentType: {},
  components: [],
  initialDisplayedHeaders: [],
  displayedHeaders: [],
  pagination: {
    total: 0
  }
};
const listViewReducer = (state = initialState$3, action) => (
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    switch (action.type) {
      case GET_DATA: {
        return {
          ...initialState$3,
          contentType: state.contentType,
          components: state.components,
          initialDisplayedHeaders: state.initialDisplayedHeaders,
          displayedHeaders: state.displayedHeaders
        };
      }
      case GET_DATA_SUCCEEDED: {
        draftState.pagination = action.pagination;
        draftState.data = action.data;
        draftState.isLoading = false;
        break;
      }
      case ON_CHANGE_LIST_HEADERS: {
        const {
          target: { name, value }
        } = action;
        if (!value) {
          const { metadatas, attributes, uid } = state.contentType;
          const metas = metadatas[name].list;
          const header = {
            name,
            fieldSchema: attributes[name],
            metadatas: metas,
            key: `__${name}_key__`
          };
          switch (attributes[name].type) {
            case "component": {
              const componentName = attributes[name].component;
              const mainFieldName = get(
                state,
                ["components", componentName, "settings", "mainField"],
                null
              );
              const mainFieldAttribute = get(state, [
                "components",
                componentName,
                "attributes",
                mainFieldName
              ]);
              draftState.displayedHeaders.push({
                ...header,
                metadatas: {
                  ...metas,
                  mainField: {
                    ...mainFieldAttribute,
                    name: mainFieldName
                  }
                }
              });
              break;
            }
            case "relation":
              draftState.displayedHeaders.push({
                ...header,
                queryInfos: {
                  defaultParams: {},
                  endPoint: `collection-types/${uid}`
                }
              });
              break;
            default:
              draftState.displayedHeaders.push(header);
          }
        } else {
          draftState.displayedHeaders = state.displayedHeaders.filter(
            (header) => header.name !== name
          );
        }
        break;
      }
      case ON_RESET_LIST_HEADERS: {
        draftState.displayedHeaders = state.initialDisplayedHeaders;
        break;
      }
      case RESET_PROPS: {
        return initialState$3;
      }
      case SET_LIST_LAYOUT: {
        const { contentType, components, displayedHeaders } = action;
        draftState.contentType = contentType;
        draftState.components = components;
        draftState.displayedHeaders = displayedHeaders;
        draftState.initialDisplayedHeaders = displayedHeaders;
        break;
      }
      default:
        return draftState;
    }
  })
);
const listViewDomain = () => (state) => state["content-manager_listView"] || initialState$3;
const makeSelectListView = () => createSelector(listViewDomain(), (substate) => {
  return substate;
});
const selectDisplayedHeaders = (state) => {
  const { displayedHeaders } = state["content-manager_listView"];
  return displayedHeaders;
};
const ConfirmBulkActionDialog = ({ onToggleDialog, isOpen, dialogBody, endAction }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      onClose: onToggleDialog,
      title: formatMessage({
        id: "app.components.ConfirmDialog.title",
        defaultMessage: "Confirmation"
      }),
      isOpen,
      children: [
        /* @__PURE__ */ jsx(DialogBody, { icon: /* @__PURE__ */ jsx(ExclamationMarkCircle, {}), children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: dialogBody }) }),
        /* @__PURE__ */ jsx(
          DialogFooter,
          {
            startAction: /* @__PURE__ */ jsx(Button, { onClick: onToggleDialog, variant: "tertiary", children: formatMessage({
              id: "app.components.Button.cancel",
              defaultMessage: "Cancel"
            }) }),
            endAction
          }
        )
      ]
    }
  );
};
ConfirmBulkActionDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggleDialog: PropTypes.func.isRequired,
  dialogBody: PropTypes.node.isRequired,
  endAction: PropTypes.node.isRequired
};
const confirmDialogsPropTypes = {
  isConfirmButtonLoading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onToggleDialog: PropTypes.func.isRequired
};
const BoldChunk$1 = (chunks) => /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: chunks });
const ConfirmDialogPublishAll = ({ isOpen, onToggleDialog, isConfirmButtonLoading, onConfirm }) => {
  const { formatMessage } = useIntl();
  const { get: get2 } = useFetchClient();
  const { selectedEntries } = useTableContext();
  const toggleNotification = useNotification();
  const { formatAPIError } = useAPIErrorHandler(getTranslation);
  const {
    contentType: { uid: slug }
  } = useSelector(listViewDomain());
  const [{ query }] = useQueryParams();
  const {
    data: countDraftRelations,
    isLoading,
    isError
  } = useQuery(
    ["content-manager", "draft-relations", slug, selectedEntries],
    async () => {
      const {
        data: { data }
      } = await get2(
        `/content-manager/collection-types/${slug}/actions/countManyEntriesDraftRelations`,
        {
          params: {
            ids: selectedEntries,
            locale: query?.plugins?.i18n?.locale
          }
        }
      );
      return data;
    },
    {
      // The API is called everytime you select/deselect an entry, this check avoids us sending a query with bad data
      enabled: selectedEntries.length > 0,
      onError(error) {
        toggleNotification({ type: "warning", message: formatAPIError(error) });
      }
    }
  );
  if (isError) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ConfirmBulkActionDialog,
    {
      isOpen: isOpen && !isLoading,
      onToggleDialog,
      dialogBody: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(Typography, { id: "confirm-description", textAlign: "center", children: [
          countDraftRelations > 0 && formatMessage(
            {
              id: getTranslation(`popUpwarning.warning.bulk-has-draft-relations.message`),
              defaultMessage: "<b>{count} {count, plural, one { relation } other { relations } } out of {entities} { entities, plural, one { entry } other { entries } } {count, plural, one { is } other { are } }</b> not published yet and might lead to unexpected behavior. "
            },
            {
              b: BoldChunk$1,
              count: countDraftRelations,
              entities: selectedEntries.length
            }
          ),
          formatMessage({
            id: getTranslation("popUpWarning.bodyMessage.contentType.publish.all"),
            defaultMessage: "Are you sure you want to publish these entries?"
          })
        ] }),
        /* @__PURE__ */ jsx(InjectionZoneList, { area: "contentManager.listView.publishModalAdditionalInfos" })
      ] }),
      endAction: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onConfirm,
          variant: "secondary",
          startIcon: /* @__PURE__ */ jsx(Check, {}),
          loading: isConfirmButtonLoading,
          children: formatMessage({
            id: "app.utils.publish",
            defaultMessage: "Publish"
          })
        }
      )
    }
  );
};
ConfirmDialogPublishAll.propTypes = confirmDialogsPropTypes;
const formatAPIErrors = ({ data }) => {
  try {
    return Object.keys(data).reduce(
      (acc, current) => {
        const errorMessage = data[current][0];
        acc[current] = {
          id: errorMessage,
          defaultMessage: errorMessage
        };
        return acc;
      },
      {}
    );
  } catch (err) {
    return {};
  }
};
const TypographyMaxWidth$5 = styled(Typography)`
  max-width: 300px;
`;
const EntryValidationText = ({ validationErrors, isPublished }) => {
  const { formatMessage } = useIntl();
  if (validationErrors) {
    const validationErrorsMessages = Object.entries(validationErrors).map(
      ([key, value]) => formatMessage(
        { id: `${value.id}.withField`, defaultMessage: value.defaultMessage },
        { field: key }
      )
    ).join(" ");
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(Icon, { color: "danger600", as: CrossCircle }),
      /* @__PURE__ */ jsx(Tooltip, { description: validationErrorsMessages, children: /* @__PURE__ */ jsx(TypographyMaxWidth$5, { textColor: "danger600", variant: "omega", fontWeight: "semiBold", ellipsis: true, children: validationErrorsMessages }) })
    ] });
  }
  if (isPublished) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(Icon, { color: "success600", as: CheckCircle }),
      /* @__PURE__ */ jsx(Typography, { textColor: "success600", fontWeight: "bold", children: formatMessage({
        id: "content-manager.bulk-publish.already-published",
        defaultMessage: "Already Published"
      }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
    /* @__PURE__ */ jsx(Icon, { color: "success600", as: CheckCircle }),
    /* @__PURE__ */ jsx(Typography, { children: formatMessage({
      id: "app.utils.ready-to-publish",
      defaultMessage: "Ready to publish"
    }) })
  ] });
};
EntryValidationText.defaultProps = {
  validationErrors: void 0,
  isPublished: false
};
EntryValidationText.propTypes = {
  validationErrors: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      id: PropTypes.string,
      defaultMessage: PropTypes.string
    })
  }),
  isPublished: PropTypes.bool
};
const SelectedEntriesTableContent = ({
  isPublishing,
  rowsToDisplay,
  entriesToPublish,
  validationErrors
}) => {
  const {
    location: { pathname }
  } = useHistory();
  const { formatMessage } = useIntl();
  const listViewStore = useSelector(listViewDomain());
  const { mainField } = listViewStore.contentType.settings;
  const shouldDisplayMainField = mainField != null && mainField !== "id";
  const getItemLineText = (count) => formatMessage(
    {
      id: "content-manager.components.ListViewTable.row-line",
      defaultMessage: "item line {number}"
    },
    { number: count + 1 }
  );
  return /* @__PURE__ */ jsxs(Table.Content, { children: [
    /* @__PURE__ */ jsxs(Table.Head, { children: [
      /* @__PURE__ */ jsx(Table.HeaderCheckboxCell, {}),
      /* @__PURE__ */ jsx(Table.HeaderCell, { fieldSchemaType: "number", label: "id", name: "id" }),
      shouldDisplayMainField && /* @__PURE__ */ jsx(Table.HeaderCell, { fieldSchemaType: "string", label: "name", name: "name" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { fieldSchemaType: "string", label: "status", name: "status" })
    ] }),
    /* @__PURE__ */ jsx(Table.LoadingBody, {}),
    /* @__PURE__ */ jsx(Table.Body, { children: rowsToDisplay.map((row, index) => /* @__PURE__ */ jsxs(Tr, { children: [
      /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Body.CheckboxDataCell, { rowId: row.id, index }) }),
      /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { children: row.id }) }),
      shouldDisplayMainField && /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { children: row[mainField] }) }),
      /* @__PURE__ */ jsx(Td, { children: isPublishing && entriesToPublish.includes(row.id) ? /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        /* @__PURE__ */ jsx(Typography, { children: formatMessage({
          id: "content-manager.success.record.publishing",
          defaultMessage: "Publishing..."
        }) }),
        /* @__PURE__ */ jsx(Loader$1, { small: true })
      ] }) : /* @__PURE__ */ jsx(
        EntryValidationText,
        {
          validationErrors: validationErrors[row.id],
          isPublished: row.publishedAt !== null
        }
      ) }),
      /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(
        IconButton,
        {
          forwardedAs: Link$4,
          to: {
            pathname: `${pathname}/${row.id}`,
            state: { from: pathname }
          },
          label: formatMessage(
            { id: "app.component.table.edit", defaultMessage: "Edit {target}" },
            { target: getItemLineText(index) }
          ),
          noBorder: true,
          target: "_blank",
          marginLeft: "auto",
          children: /* @__PURE__ */ jsx(Pencil, {})
        }
      ) })
    ] }, row.id)) })
  ] });
};
SelectedEntriesTableContent.defaultProps = {
  isPublishing: false,
  rowsToDisplay: [],
  entriesToPublish: [],
  validationErrors: {}
};
SelectedEntriesTableContent.propTypes = {
  isPublishing: PropTypes.bool,
  rowsToDisplay: PropTypes.arrayOf(PropTypes.object),
  entriesToPublish: PropTypes.arrayOf(PropTypes.number),
  validationErrors: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      id: PropTypes.string,
      defaultMessage: PropTypes.string
    })
  })
};
const BoldChunk = (chunks) => /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: chunks });
const SelectedEntriesModalContent = ({
  toggleModal,
  refetchModalData,
  setEntriesToFetch,
  setSelectedListViewEntries,
  validationErrors
}) => {
  const { formatMessage } = useIntl();
  const { selectedEntries, rows, onSelectRow, isLoading, isFetching } = useTableContext();
  const [isDialogOpen, setIsDialogOpen] = React__default.useState(false);
  const [rowsToDisplay, setRowsToDisplay] = React__default.useState([]);
  const [publishedCount, setPublishedCount] = React__default.useState(0);
  const entriesToPublish = rows.filter(({ id }) => selectedEntries.includes(id) && !validationErrors[id]).map(({ id }) => id);
  const { post } = useFetchClient();
  const toggleNotification = useNotification();
  const { contentType } = useSelector(listViewDomain());
  const selectedEntriesWithErrorsCount = rowsToDisplay.filter(
    ({ id }) => selectedEntries.includes(id) && validationErrors[id]
  ).length;
  const selectedEntriesPublished = rowsToDisplay.filter(
    ({ id, publishedAt }) => selectedEntries.includes(id) && publishedAt
  ).length;
  const selectedEntriesWithNoErrorsCount = selectedEntries.length - selectedEntriesWithErrorsCount - selectedEntriesPublished;
  const bulkPublishMutation = useMutation(
    (data) => post(`/content-manager/collection-types/${contentType.uid}/actions/bulkPublish`, data),
    {
      onSuccess() {
        const update = rowsToDisplay.filter((row) => {
          if (entriesToPublish.includes(row.id)) {
            onSelectRow({ name: row.id, value: false });
          }
          return !entriesToPublish.includes(row.id);
        });
        setRowsToDisplay(update);
        const publishedIds = update.map(({ id }) => id);
        setEntriesToFetch(publishedIds);
        setSelectedListViewEntries(publishedIds);
        if (update.length === 0) {
          toggleModal();
        }
        toggleNotification({
          type: "success",
          message: { id: "content-manager.success.record.publish", defaultMessage: "Published" }
        });
      },
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIErrors(error)
        });
      }
    }
  );
  const toggleDialog = () => setIsDialogOpen((prev) => !prev);
  const handleConfirmBulkPublish = async () => {
    toggleDialog();
    const { data } = await bulkPublishMutation.mutateAsync({ ids: entriesToPublish });
    setPublishedCount(data.count);
  };
  const getFormattedCountMessage = () => {
    if (publishedCount) {
      return formatMessage(
        {
          id: getTranslation("containers.ListPage.selectedEntriesModal.publishedCount"),
          defaultMessage: "<b>{publishedCount}</b> {publishedCount, plural, =0 {entries} one {entry} other {entries}} published. <b>{withErrorsCount}</b> {withErrorsCount, plural, =0 {entries} one {entry} other {entries}} waiting for action."
        },
        {
          publishedCount,
          withErrorsCount: selectedEntriesWithErrorsCount,
          b: BoldChunk
        }
      );
    }
    return formatMessage(
      {
        id: getTranslation("containers.ListPage.selectedEntriesModal.selectedCount"),
        defaultMessage: "<b>{alreadyPublishedCount}</b> {alreadyPublishedCount, plural, =0 {entries} one {entry} other {entries}} already published. <b>{readyToPublishCount}</b> {readyToPublishCount, plural, =0 {entries} one {entry} other {entries}} ready to publish. <b>{withErrorsCount}</b> {withErrorsCount, plural, =0 {entries} one {entry} other {entries}} waiting for action."
      },
      {
        readyToPublishCount: selectedEntriesWithNoErrorsCount,
        withErrorsCount: selectedEntriesWithErrorsCount,
        alreadyPublishedCount: selectedEntriesPublished,
        b: BoldChunk
      }
    );
  };
  React__default.useEffect(() => {
    if (rows.length > 0) {
      setRowsToDisplay(rows);
    }
  }, [rows]);
  return /* @__PURE__ */ jsxs(ModalLayout, { onClose: toggleModal, labelledBy: "title", children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage({
      id: getTranslation("containers.ListPage.selectedEntriesModal.title"),
      defaultMessage: "Publish entries"
    }) }) }),
    /* @__PURE__ */ jsxs(ModalBody, { children: [
      /* @__PURE__ */ jsx(Typography, { children: getFormattedCountMessage() }),
      /* @__PURE__ */ jsx(Box, { marginTop: 5, children: /* @__PURE__ */ jsx(
        SelectedEntriesTableContent,
        {
          isPublishing: bulkPublishMutation.isLoading,
          rowsToDisplay,
          entriesToPublish,
          validationErrors
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: toggleModal, variant: "tertiary", children: formatMessage({
          id: "app.components.Button.cancel",
          defaultMessage: "Cancel"
        }) }),
        endActions: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
          /* @__PURE__ */ jsx(Button, { onClick: refetchModalData, variant: "tertiary", loading: isFetching, children: formatMessage({ id: "app.utils.refresh", defaultMessage: "Refresh" }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: toggleDialog,
              disabled: selectedEntries.length === 0 || selectedEntries.length === selectedEntriesWithErrorsCount || isLoading,
              loading: bulkPublishMutation.isLoading,
              children: formatMessage({ id: "app.utils.publish", defaultMessage: "Publish" })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialogPublishAll,
      {
        isOpen: isDialogOpen,
        onToggleDialog: toggleDialog,
        isConfirmButtonLoading: bulkPublishMutation.isLoading,
        onConfirm: handleConfirmBulkPublish
      }
    )
  ] });
};
SelectedEntriesModalContent.defaultProps = {
  validationErrors: {}
};
SelectedEntriesModalContent.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  refetchModalData: PropTypes.func.isRequired,
  setEntriesToFetch: PropTypes.func.isRequired,
  setSelectedListViewEntries: PropTypes.func.isRequired,
  validationErrors: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      id: PropTypes.string,
      defaultMessage: PropTypes.string
    })
  })
};
const SelectedEntriesModal = ({ onToggle }) => {
  const {
    selectedEntries: selectedListViewEntries,
    setSelectedEntries: setSelectedListViewEntries
  } = useTableContext();
  const { contentType, components } = useSelector(listViewDomain());
  const [entriesToFetch, setEntriesToFetch] = React__default.useState(selectedListViewEntries);
  const [
    {
      query: { sort, plugins }
    }
  ] = useQueryParams();
  const queryParams = {
    page: 1,
    pageSize: entriesToFetch.length,
    sort,
    filters: {
      id: {
        $in: entriesToFetch
      }
    },
    locale: plugins?.i18n?.locale
  };
  const { get: get2 } = useFetchClient();
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["entries", contentType.uid, queryParams],
    async () => {
      const { data: data2 } = await get2(`content-manager/collection-types/${contentType.uid}`, {
        params: queryParams
      });
      if (data2.results) {
        const schema = createYupSchema(
          contentType,
          { components },
          { isDraft: false, isJSONTestDisabled: true }
        );
        const validationErrors = {};
        const rows = data2.results.map((entry) => {
          try {
            schema.validateSync(entry, { abortEarly: false });
            return entry;
          } catch (e) {
            validationErrors[entry.id] = getYupInnerErrors(e);
            return entry;
          }
        });
        return { rows, validationErrors };
      }
      return {
        rows: [],
        validationErrors: {}
      };
    }
  );
  return /* @__PURE__ */ jsx(
    Table.Root,
    {
      rows: data?.rows,
      defaultSelectedEntries: selectedListViewEntries,
      colCount: 4,
      isLoading,
      isFetching,
      children: /* @__PURE__ */ jsx(
        SelectedEntriesModalContent,
        {
          setSelectedListViewEntries,
          setEntriesToFetch,
          toggleModal: onToggle,
          refetchModalData: refetch,
          validationErrors: data?.validationErrors
        }
      )
    }
  );
};
SelectedEntriesModal.propTypes = {
  onToggle: PropTypes.func.isRequired
};
const ConfirmDialogUnpublishAll = ({
  isOpen,
  onToggleDialog,
  isConfirmButtonLoading,
  onConfirm
}) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    ConfirmBulkActionDialog,
    {
      isOpen,
      onToggleDialog,
      dialogBody: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Typography, { id: "confirm-description", textAlign: "center", children: formatMessage({
          id: getTranslation("popUpWarning.bodyMessage.contentType.unpublish.all"),
          defaultMessage: "Are you sure you want to unpublish these entries?"
        }) }),
        /* @__PURE__ */ jsx(InjectionZoneList, { area: "contentManager.listView.unpublishModalAdditionalInfos" })
      ] }),
      endAction: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onConfirm,
          variant: "secondary",
          startIcon: /* @__PURE__ */ jsx(Check, {}),
          loading: isConfirmButtonLoading,
          children: formatMessage({
            id: "app.utils.unpublish",
            defaultMessage: "Unpublish"
          })
        }
      )
    }
  );
};
ConfirmDialogUnpublishAll.propTypes = confirmDialogsPropTypes;
const ConfirmDialogDeleteAll = ({ isOpen, onToggleDialog, isConfirmButtonLoading, onConfirm }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    ConfirmBulkActionDialog,
    {
      isOpen,
      onToggleDialog,
      dialogBody: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Typography, { id: "confirm-description", textAlign: "center", children: formatMessage({
          id: getTranslation("popUpWarning.bodyMessage.contentType.delete.all"),
          defaultMessage: "Are you sure you want to delete these entries?"
        }) }),
        /* @__PURE__ */ jsx(InjectionZoneList, { area: "contentManager.listView.deleteModalAdditionalInfos" })
      ] }),
      endAction: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onConfirm,
          variant: "danger-light",
          startIcon: /* @__PURE__ */ jsx(Trash, {}),
          id: "confirm-delete",
          loading: isConfirmButtonLoading,
          children: formatMessage({
            id: "app.components.Button.confirm",
            defaultMessage: "Confirm"
          })
        }
      )
    }
  );
};
ConfirmDialogDeleteAll.propTypes = confirmDialogsPropTypes;
const BulkActionButtons = ({
  showPublish,
  showDelete,
  onConfirmDeleteAll,
  onConfirmUnpublishAll,
  refetchData
}) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { data } = useSelector(listViewDomain());
  const { selectedEntries, setSelectedEntries } = useTableContext();
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = React.useState(false);
  const [isSelectedEntriesModalOpen, setIsSelectedEntriesModalOpen] = React.useState(false);
  const [dialogToOpen, setDialogToOpen] = React.useState(null);
  const selectedEntriesObjects = data.filter((entry) => selectedEntries.includes(entry.id));
  const publishButtonIsShown = showPublish && selectedEntriesObjects.some((entry) => !entry.publishedAt);
  const unpublishButtonIsShown = showPublish && selectedEntriesObjects.some((entry) => entry.publishedAt);
  const toggleDeleteDialog = () => {
    if (dialogToOpen === "delete") {
      setDialogToOpen(null);
    } else {
      setDialogToOpen("delete");
      trackUsage("willBulkDeleteEntries");
    }
  };
  const toggleUnpublishDialog = () => {
    if (dialogToOpen === "unpublish") {
      setDialogToOpen(null);
    } else {
      setDialogToOpen("unpublish");
      trackUsage("willBulkUnpublishEntries");
    }
  };
  const handleBulkAction = async (confirmAction, toggleDialog) => {
    try {
      setIsConfirmButtonLoading(true);
      await confirmAction(selectedEntries);
      setIsConfirmButtonLoading(false);
      toggleDialog();
      setSelectedEntries([]);
    } catch (error) {
      setIsConfirmButtonLoading(false);
      toggleDialog();
    }
  };
  const handleBulkDelete = () => handleBulkAction(onConfirmDeleteAll, toggleDeleteDialog);
  const handleBulkUnpublish = () => handleBulkAction(onConfirmUnpublishAll, toggleUnpublishDialog);
  const handleToggleSelectedEntriesModal = () => {
    setIsSelectedEntriesModalOpen((prev) => {
      if (prev) {
        refetchData();
      }
      return !prev;
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    publishButtonIsShown && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: handleToggleSelectedEntriesModal, children: formatMessage({ id: "app.utils.publish", defaultMessage: "Publish" }) }),
      isSelectedEntriesModalOpen && /* @__PURE__ */ jsx(SelectedEntriesModal, { onToggle: handleToggleSelectedEntriesModal })
    ] }),
    unpublishButtonIsShown && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: toggleUnpublishDialog, children: formatMessage({ id: "app.utils.unpublish", defaultMessage: "Unpublish" }) }),
      /* @__PURE__ */ jsx(
        ConfirmDialogUnpublishAll,
        {
          isOpen: dialogToOpen === "unpublish",
          onToggleDialog: toggleUnpublishDialog,
          isConfirmButtonLoading,
          onConfirm: handleBulkUnpublish
        }
      )
    ] }),
    showDelete && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "danger-light", onClick: toggleDeleteDialog, children: formatMessage({ id: "global.delete", defaultMessage: "Delete" }) }),
      /* @__PURE__ */ jsx(
        ConfirmDialogDeleteAll,
        {
          isOpen: dialogToOpen === "delete",
          onToggleDialog: toggleDeleteDialog,
          isConfirmButtonLoading,
          onConfirm: handleBulkDelete
        }
      )
    ] })
  ] });
};
BulkActionButtons.defaultProps = {
  showPublish: false,
  showDelete: false,
  onConfirmDeleteAll() {
  },
  onConfirmUnpublishAll() {
  },
  refetchData() {
  }
};
BulkActionButtons.propTypes = {
  showPublish: PropTypes.bool,
  showDelete: PropTypes.bool,
  onConfirmDeleteAll: PropTypes.func,
  onConfirmUnpublishAll: PropTypes.func,
  refetchData: PropTypes.func
};
const CellValue = ({ type, value }) => {
  const { formatDate, formatTime, formatNumber } = useIntl();
  let formattedValue = value;
  if (type === "date") {
    formattedValue = formatDate(parseISO(value), { dateStyle: "full" });
  }
  if (type === "datetime") {
    formattedValue = formatDate(value, { dateStyle: "full", timeStyle: "short" });
  }
  if (type === "time") {
    const [hour, minute, second] = value.split(":");
    const date = /* @__PURE__ */ new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    formattedValue = formatTime(date, {
      numeric: "auto",
      style: "short"
    });
  }
  if (["float", "decimal"].includes(type)) {
    formattedValue = formatNumber(value, {
      // Should be kept in sync with the corresponding value
      // in the design-system/NumberInput: https://github.com/strapi/design-system/blob/main/packages/strapi-design-system/src/NumberInput/NumberInput.js#L53
      maximumFractionDigits: 20
    });
  }
  if (["integer", "biginteger"].includes(type)) {
    formattedValue = formatNumber(value, { maximumFractionDigits: 0 });
  }
  return toString(formattedValue);
};
CellValue.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};
const Wrapper = styled(Flex)`
  position: relative;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background: ${({ theme }) => theme.colors.neutral150};
  padding-left: 1px;

  span {
    line-height: 0.6rem;
    font-size: 0.6rem;
  }
`;
const FileWrapper = ({ children, ...props }) => {
  return /* @__PURE__ */ jsx(Wrapper, { justifyContent: "center", alignItems: "center", as: "span", ...props, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children }) });
};
FileWrapper.propTypes = {
  children: PropTypes.string.isRequired
};
const Media = ({ url, mime, alternativeText, name, ext, formats }) => {
  const fileURL = prefixFileUrlWithBackendUrl(url);
  if (mime.includes("image")) {
    const thumbnail = formats?.thumbnail?.url || null;
    const mediaURL = prefixFileUrlWithBackendUrl(thumbnail) || fileURL;
    return /* @__PURE__ */ jsx(Avatar, { src: mediaURL, alt: alternativeText || name, preview: true });
  }
  const fileExtension = getFileExtension(ext);
  const fileName = name.length > 100 ? `${name.substring(0, 100)}...` : name;
  return /* @__PURE__ */ jsx(Tooltip, { description: fileName, children: /* @__PURE__ */ jsx(FileWrapper, { children: fileExtension }) });
};
Media.defaultProps = {
  alternativeText: null,
  formats: null
};
Media.propTypes = {
  alternativeText: PropTypes.string,
  ext: PropTypes.string.isRequired,
  formats: PropTypes.object,
  mime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
const MultipleMedia = ({ value }) => {
  return /* @__PURE__ */ jsx(AvatarGroup, { children: value.map((file, index) => {
    const key = `${file.id}${index}`;
    if (index === 3) {
      const remainingFiles = `+${value.length - 3}`;
      return /* @__PURE__ */ jsx(FileWrapper, { preview: false, children: remainingFiles }, key);
    }
    if (index > 3) {
      return null;
    }
    return /* @__PURE__ */ jsx(Media, { ...file }, key);
  }) });
};
MultipleMedia.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      alternativeText: PropTypes.string,
      ext: PropTypes.string.isRequired,
      formats: PropTypes.object,
      mime: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};
const RelationMultiple = ({ fieldSchema, metadatas, name, entityId, value, contentType }) => {
  const { formatMessage } = useIntl();
  const { notifyStatus } = useNotifyAT();
  const [isOpen, setIsOpen] = useState(false);
  const { get: get2 } = useFetchClient();
  const { data, status } = useQuery(
    [fieldSchema.targetModel, entityId],
    async () => {
      const {
        data: { results, pagination }
      } = await get2(
        `/content-manager/relations/${contentType.uid}/${entityId}/${name.split(".")[0]}`
      );
      return { results, pagination };
    },
    {
      enabled: isOpen,
      staleTime: 0,
      select: (data2) => ({
        ...data2,
        results: [...data2.results].reverse()
      })
    }
  );
  useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: getTranslation("DynamicTable.relation-loaded"),
          defaultMessage: "Relations have been loaded"
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  return /* @__PURE__ */ jsxs(Menu.Root, { onOpenChange: (isOpen2) => setIsOpen(isOpen2), children: [
    /* @__PURE__ */ jsx(MenuTrigger$1, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxs(Flex, { gap: 1, wrap: "nowrap", children: [
      /* @__PURE__ */ jsx(Badge, { children: value.count }),
      formatMessage(
        {
          id: "content-manager.containers.ListPage.items",
          defaultMessage: "{number, plural, =0 {items} one {item} other {items}}"
        },
        { number: value.count }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(Menu.Content, { children: [
      status !== "success" && /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(Loader$1, { small: true, children: formatMessage({
        id: getTranslation("ListViewTable.relation-loading"),
        defaultMessage: "Relations are loading"
      }) }) }),
      status === "success" && /* @__PURE__ */ jsxs(Fragment, { children: [
        data?.results.map((entry) => /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(TypographyMaxWidth$4, { ellipsis: true, children: /* @__PURE__ */ jsx(
          CellValue,
          {
            type: metadatas.mainField.schema.type,
            value: entry[metadatas.mainField.name] || entry.id
          }
        ) }) }, entry.id)),
        data?.pagination.total > 10 && /* @__PURE__ */ jsx(
          Menu.Item,
          {
            "aria-disabled": true,
            "aria-label": formatMessage({
              id: getTranslation("ListViewTable.relation-more"),
              defaultMessage: "This relation contains more entities than displayed"
            }),
            children: /* @__PURE__ */ jsx(Typography, { children: "…" })
          }
        )
      ] })
    ] })
  ] });
};
RelationMultiple.propTypes = {
  contentType: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired,
  fieldSchema: PropTypes.shape({
    relation: PropTypes.string,
    targetModel: PropTypes.string,
    type: PropTypes.string.isRequired
  }).isRequired,
  metadatas: PropTypes.shape({
    mainField: PropTypes.shape({
      name: PropTypes.string.isRequired,
      schema: PropTypes.shape({ type: PropTypes.string.isRequired }).isRequired
    })
  }).isRequired,
  name: PropTypes.string.isRequired,
  entityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.object.isRequired
};
const TypographyMaxWidth$4 = styled(Typography)`
  max-width: 500px;
`;
const MenuTrigger$1 = styled(Menu.Trigger)`
  svg {
    width: ${6 / 16}rem;
    height: ${4 / 16}rem;
  }
`;
const TypographyMaxWidth$3 = styled(Typography)`
  max-width: 500px;
`;
const RelationSingle = ({ metadatas, value }) => {
  return /* @__PURE__ */ jsx(TypographyMaxWidth$3, { textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsx(
    CellValue,
    {
      type: metadatas.mainField.schema.type,
      value: value[metadatas.mainField.name] ?? value.id
    }
  ) });
};
RelationSingle.propTypes = {
  metadatas: PropTypes.shape({
    mainField: PropTypes.shape({
      name: PropTypes.string.isRequired,
      schema: PropTypes.shape({ type: PropTypes.string.isRequired }).isRequired
    })
  }).isRequired,
  value: PropTypes.object.isRequired
};
const TypographyMaxWidth$2 = styled(Typography)`
  max-width: 500px;
`;
const RepeatableComponentCell = ({ value, metadatas }) => {
  const { formatMessage } = useIntl();
  const {
    mainField: { type: mainFieldType, name: mainFieldName }
  } = metadatas;
  return /* @__PURE__ */ jsxs(Menu.Root, { children: [
    /* @__PURE__ */ jsxs(MenuTrigger, { onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(Badge, { children: value.length }),
      " ",
      formatMessage(
        {
          id: "content-manager.containers.ListPage.items",
          defaultMessage: "{number, plural, =0 {items} one {item} other {items}}"
        },
        { number: value.length }
      )
    ] }),
    /* @__PURE__ */ jsx(Menu.Content, { children: value.map((item) => /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(TypographyMaxWidth$2, { ellipsis: true, children: /* @__PURE__ */ jsx(CellValue, { type: mainFieldType, value: item[mainFieldName] || item.id }) }) }, item.id)) })
  ] });
};
RepeatableComponentCell.propTypes = {
  metadatas: PropTypes.shape({
    mainField: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string
    })
  }).isRequired,
  value: PropTypes.array.isRequired
};
const MenuTrigger = styled(Menu.Trigger)`
  svg {
    width: ${6 / 16}rem;
    height: ${4 / 16}rem;
  }
`;
const TypographyMaxWidth$1 = styled(Typography)`
  max-width: 250px;
`;
const SingleComponentCell = ({ value, metadatas }) => {
  const { mainField } = metadatas;
  const content = value[mainField.name];
  return /* @__PURE__ */ jsx(Tooltip, { label: content, children: /* @__PURE__ */ jsx(TypographyMaxWidth$1, { textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsx(CellValue, { type: mainField.type, value: content }) }) });
};
SingleComponentCell.propTypes = {
  metadatas: PropTypes.shape({
    mainField: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string
    })
  }).isRequired,
  value: PropTypes.object.isRequired
};
function isSingleRelation(type) {
  return ["oneToOne", "manyToOne", "oneToOneMorph"].includes(type);
}
function hasContent(type, content, metadatas, fieldSchema) {
  if (type === "component") {
    const {
      mainField: { name: mainFieldName, type: mainFieldType }
    } = metadatas;
    if (fieldSchema?.repeatable) {
      return content.length > 0;
    }
    const value = content?.[mainFieldName];
    if (mainFieldName === "id" && ![void 0, null].includes(value)) {
      return true;
    }
    if (isFieldTypeNumber(mainFieldType) && mainFieldType !== "biginteger" && mainFieldName !== "id") {
      return isNumber(value);
    }
    return !isEmpty(value);
  }
  if (type === "relation") {
    if (isSingleRelation(fieldSchema.relation)) {
      return !isEmpty(content);
    }
    return content?.count > 0;
  }
  if (isFieldTypeNumber(type) && type !== "biginteger") {
    return isNumber(content);
  }
  if (type === "boolean") {
    return content !== null;
  }
  return !isEmpty(content);
}
const TypographyMaxWidth = styled(Typography)`
  max-width: 300px;
`;
const CellContent = ({ content, fieldSchema, metadatas, name, rowId, contentType }) => {
  const { type } = fieldSchema;
  if (!hasContent(type, content, metadatas, fieldSchema)) {
    return /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: "-" });
  }
  switch (type) {
    case "media":
      if (!fieldSchema.multiple) {
        return /* @__PURE__ */ jsx(Media, { ...content });
      }
      return /* @__PURE__ */ jsx(MultipleMedia, { value: content });
    case "relation": {
      if (isSingleRelation(fieldSchema.relation)) {
        return /* @__PURE__ */ jsx(RelationSingle, { metadatas, value: content });
      }
      return /* @__PURE__ */ jsx(
        RelationMultiple,
        {
          fieldSchema,
          metadatas,
          value: content,
          name,
          entityId: rowId,
          contentType
        }
      );
    }
    case "component":
      if (fieldSchema.repeatable === true) {
        return /* @__PURE__ */ jsx(RepeatableComponentCell, { value: content, metadatas });
      }
      return /* @__PURE__ */ jsx(SingleComponentCell, { value: content, metadatas });
    case "string":
      return /* @__PURE__ */ jsx(Tooltip, { description: content, children: /* @__PURE__ */ jsx(TypographyMaxWidth, { ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsx(CellValue, { type, value: content }) }) });
    default:
      return /* @__PURE__ */ jsx(TypographyMaxWidth, { ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsx(CellValue, { type, value: content }) });
  }
};
CellContent.defaultProps = {
  content: void 0
};
CellContent.propTypes = {
  content: PropTypes.any,
  contentType: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired,
  fieldSchema: PropTypes.shape({
    component: PropTypes.string,
    multiple: PropTypes.bool,
    type: PropTypes.string.isRequired,
    repeatable: PropTypes.bool,
    relation: PropTypes.string
  }).isRequired,
  metadatas: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
const ChackboxWrapper = styled(Flex)`
  :hover {
    background-color: ${(props) => props.theme.colors.primary100};
  }
`;
const FieldPicker = ({ layout }) => {
  const dispatch = useDispatch();
  const displayedHeaders = useSelector(selectDisplayedHeaders);
  const { trackUsage } = useTracking();
  const { formatMessage, locale } = useIntl();
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const columns = Object.keys(layout.contentType.attributes).filter((name) => checkIfAttributeIsDisplayable(layout.contentType.attributes[name])).map((name) => ({
    name,
    label: layout.contentType.metadatas[name].list.label
  })).sort((a, b) => formatter.compare(a.label, b.label));
  const displayedHeaderKeys = displayedHeaders.map(({ name }) => name);
  const handleChange = (name) => {
    trackUsage("didChangeDisplayedFields");
    dispatch(onChangeListHeaders({ name, value: displayedHeaderKeys.includes(name) }));
  };
  const handleReset = () => {
    dispatch(onResetListHeaders());
  };
  return /* @__PURE__ */ jsxs(Flex, { as: "fieldset", direction: "column", alignItems: "stretch", gap: 3, children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsx(Typography, { as: "legend", variant: "pi", fontWeight: "bold", children: formatMessage({
        id: "containers.ListPage.displayedFields",
        defaultMessage: "Displayed fields"
      }) }),
      /* @__PURE__ */ jsx(TextButton, { onClick: handleReset, children: formatMessage({
        id: "app.components.Button.reset",
        defaultMessage: "Reset"
      }) })
    ] }),
    /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", children: columns.map((header) => {
      const isActive = displayedHeaderKeys.includes(header.name);
      return /* @__PURE__ */ jsxs(
        ChackboxWrapper,
        {
          wrap: "wrap",
          gap: 2,
          as: "label",
          background: isActive ? "primary100" : "transparent",
          hasRadius: true,
          padding: 2,
          children: [
            /* @__PURE__ */ jsx(
              BaseCheckbox,
              {
                onChange: () => handleChange(header.name),
                value: isActive,
                name: header.name
              }
            ),
            /* @__PURE__ */ jsx(Typography, { fontSize: 1, children: header.label })
          ]
        },
        header.name
      );
    }) })
  ] });
};
FieldPicker.propTypes = {
  layout: PropTypes.shape({
    contentType: PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      metadatas: PropTypes.object.isRequired,
      layouts: PropTypes.shape({
        list: PropTypes.array.isRequired
      }).isRequired,
      options: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};
const ViewSettingsMenu = ({ slug, layout }) => {
  const [isVisible, setIsVisible] = React__default.useState(false);
  const cogButtonRef = React__default.useRef();
  const permissions2 = useSelector(selectAdminPermissions);
  const { formatMessage } = useIntl();
  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        icon: /* @__PURE__ */ jsx(Cog, {}),
        label: formatMessage({
          id: "components.ViewSettings.tooltip",
          defaultMessage: "View Settings"
        }),
        ref: cogButtonRef,
        onClick: handleToggle
      }
    ),
    isVisible && /* @__PURE__ */ jsx(
      Popover,
      {
        placement: "bottom-end",
        source: cogButtonRef,
        onDismiss: handleToggle,
        spacing: 4,
        padding: 3,
        children: /* @__PURE__ */ jsxs(Flex, { alignItems: "stretch", direction: "column", gap: 3, children: [
          /* @__PURE__ */ jsx(
            CheckPermissions,
            {
              permissions: permissions2.contentManager.collectionTypesConfigurations,
              children: /* @__PURE__ */ jsx(
                LinkButton$2,
                {
                  size: "S",
                  startIcon: /* @__PURE__ */ jsx(Layer, {}),
                  to: `${slug}/configurations/list`,
                  variant: "secondary",
                  children: formatMessage({
                    id: "app.links.configure-view",
                    defaultMessage: "Configure the view"
                  })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(FieldPicker, { layout })
        ] })
      }
    )
  ] });
};
ViewSettingsMenu.propTypes = {
  slug: PropTypes.string.isRequired,
  layout: PropTypes.shape({
    contentType: PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      metadatas: PropTypes.object.isRequired,
      layouts: PropTypes.shape({
        list: PropTypes.array.isRequired
      }).isRequired,
      options: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};
const { INJECT_COLUMN_IN_TABLE: INJECT_COLUMN_IN_TABLE$1 } = HOOKS;
const REVIEW_WORKFLOW_COLUMNS_CE = null;
const REVIEW_WORKFLOW_COLUMNS_CELL_CE = () => null;
const REVIEW_WORKFLOW_FILTER_CE = [];
const USER_FILTER_ATTRIBUTES = [...CREATOR_FIELDS, "strapi_assignee"];
function ListView({ canCreate, canDelete, canRead, canPublish, layout, slug }) {
  const dispatch = useDispatch();
  const { getData: getData$12, getDataSucceeded: getDataSucceeded$12 } = React.useMemo(
    () => bindActionCreators(
      { getData, getDataSucceeded },
      dispatch
    ),
    [dispatch]
  );
  const { pagination, isLoading, data } = useTypedSelector(makeSelectListView());
  const { total } = pagination;
  const { contentType } = layout;
  const {
    info,
    options: options2,
    metadatas,
    settings: { bulkable: isBulkable, filterable: isFilterable, searchable: isSearchable }
  } = contentType;
  const [isConfirmDeleteRowOpen, setIsConfirmDeleteRowOpen] = React.useState(false);
  const toggleNotification = useNotification();
  const { trackUsage } = useTracking();
  const { allPermissions, refetchPermissions } = useRBACProvider();
  const trackUsageRef = React.useRef(trackUsage);
  const fetchPermissionsRef = React.useRef(refetchPermissions);
  const { notifyStatus } = useNotifyAT();
  const { formatAPIError } = useAPIErrorHandler(getTranslation);
  const allowedAttributes = useAllowedAttributes(contentType, slug);
  const [{ query }] = useQueryParams();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const { formatMessage, locale } = useIntl();
  const fetchClient = useFetchClient();
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const selectedUserIds = query?.filters?.$and?.reduce((acc, filter) => {
    const [key, value] = Object.entries(filter)[0];
    const id = value.id?.$eq || value.id?.$ne;
    if (USER_FILTER_ATTRIBUTES.includes(key) && !acc.includes(id)) {
      acc.push(id);
    }
    return acc;
  }, []) ?? [];
  const { users, isLoading: isLoadingAdminUsers } = useAdminUsers(
    { filter: { id: { in: selectedUserIds } } },
    {
      // fetch the list of admin users only if the filter contains users and the
      // current user has permissions to display users
      enabled: selectedUserIds.length > 0 && findMatchingPermissions(allPermissions, [
        {
          action: "admin::users.read",
          subject: null
        }
      ]).length > 0
    }
  );
  useFocusWhenNavigate();
  const params = React.useMemo(() => buildValidGetParams(query), [query]);
  const pluginsQueryParams = stringify({ plugins: query.plugins }, { encode: false });
  const displayedAttributeFilters = allowedAttributes.map((name) => {
    const attribute = contentType.attributes[name];
    const { type, enum: options22 } = attribute;
    const trackedEvent = {
      name: "didFilterEntries",
      properties: { useRelation: type === "relation" }
    };
    const { mainField, label } = metadatas[name].list;
    const filter = {
      name,
      metadatas: { label: formatMessage({ id: label, defaultMessage: label }) },
      fieldSchema: { type, options: options22, mainField },
      trackedEvent
    };
    if (attribute.type === "relation" && attribute.target === "admin::user") {
      filter.metadatas = {
        ...filter.metadatas,
        customOperators: [
          {
            intlLabel: {
              id: "components.FilterOptions.FILTER_TYPES.$eq",
              defaultMessage: "is"
            },
            value: "$eq"
          },
          {
            intlLabel: {
              id: "components.FilterOptions.FILTER_TYPES.$ne",
              defaultMessage: "is not"
            },
            value: "$ne"
          }
        ],
        customInput: AdminUsersFilter,
        options: users.map((user) => ({
          label: getDisplayName(user, formatMessage),
          customValue: user.id.toString()
        }))
      };
      filter.fieldSchema.mainField = {
        ...mainField,
        name: "id"
      };
    }
    return filter;
  });
  const hasDraftAndPublish = options2?.draftAndPublish ?? false;
  const hasReviewWorkflows = options2?.reviewWorkflows ?? false;
  const reviewWorkflowColumns = useEnterprise(
    REVIEW_WORKFLOW_COLUMNS_CE,
    async () => (await import("./constants-3c86c8fc.mjs")).REVIEW_WORKFLOW_COLUMNS_EE,
    {
      enabled: !!options2?.reviewWorkflows
    }
  );
  const ReviewWorkflowsColumns = useEnterprise(
    REVIEW_WORKFLOW_COLUMNS_CELL_CE,
    async () => {
      const { ReviewWorkflowsStageEE, ReviewWorkflowsAssigneeEE } = await import("./index-5800e73f.mjs");
      return { ReviewWorkflowsStageEE, ReviewWorkflowsAssigneeEE };
    },
    {
      enabled: hasReviewWorkflows
    }
  );
  const reviewWorkflowFilter = useEnterprise(
    REVIEW_WORKFLOW_FILTER_CE,
    async () => (await import("./constants-16599dd6.mjs")).REVIEW_WORKFLOW_FILTERS,
    {
      combine(ceFilters, eeFilters) {
        return [
          ...ceFilters,
          ...eeFilters.filter((eeFilter) => {
            if (eeFilter.name === "strapi_assignee") {
              return findMatchingPermissions(allPermissions, [
                {
                  action: "admin::users.read",
                  subject: null
                }
              ]).length > 0;
            }
            return true;
          }).map((eeFilter) => ({
            ...eeFilter,
            metadatas: {
              ...eeFilter.metadatas,
              // the stage filter needs the current content-type uid to fetch
              // the list of stages that can be assigned to this content-type
              ...eeFilter.name === "strapi_stage" ? { uid: contentType.uid } : {},
              // translate the filter label
              label: formatMessage(eeFilter.metadatas.label),
              // `options` allows the filter-tag to render the displayname
              // of a user over a plain id
              options: eeFilter.name === "strapi_assignee" && users.map((user) => ({
                label: getDisplayName(user, formatMessage),
                customValue: user.id.toString()
              }))
            }
          }))
        ];
      },
      defaultValue: [],
      // we have to wait for admin users to be fully loaded, because otherwise
      // combine is called to early and does not contain the latest state of
      // the users array
      enabled: hasReviewWorkflows && !isLoadingAdminUsers
    }
  );
  const { post, del } = fetchClient;
  const bulkUnpublishMutation = useMutation(
    (data2) => post(`/content-manager/collection-types/${contentType.uid}/actions/bulkUnpublish`, data2),
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: {
            id: "content-manager.success.record.unpublish",
            defaultMessage: "Unpublished"
          }
        });
        fetchData(`/content-manager/collection-types/${slug}`, { params });
      },
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
    }
  );
  const requestUrlRef = React.useRef("");
  const fetchData = React.useCallback(
    async (endPoint, options22) => {
      getData$12();
      try {
        const {
          data: { results, pagination: paginationResult }
        } = await fetchClient.get(endPoint, options22);
        if (paginationResult.page > paginationResult.pageCount && paginationResult.pageCount > 0) {
          const query2 = {
            ...params,
            page: paginationResult.pageCount
          };
          push({
            pathname,
            state: { from: pathname },
            search: stringify(query2)
          });
          return;
        }
        notifyStatus(
          formatMessage(
            {
              id: getTranslation("utils.data-loaded"),
              defaultMessage: "{number, plural, =1 {# entry has} other {# entries have}} successfully been loaded"
            },
            // Using the plural form
            { number: paginationResult.count }
          )
        );
        getDataSucceeded$12(paginationResult, results);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        const resStatus = err?.response?.status ?? null;
        if (resStatus === 403) {
          await fetchPermissionsRef.current();
          toggleNotification({
            type: "info",
            message: { id: getTranslation("permissions.not-allowed.update") }
          });
          push("/");
          return;
        }
        toggleNotification({
          type: "warning",
          message: { id: getTranslation("error.model.fetch") }
        });
      }
    },
    [
      formatMessage,
      getData$12,
      getDataSucceeded$12,
      notifyStatus,
      push,
      toggleNotification,
      fetchClient,
      params,
      pathname
    ]
  );
  const handleConfirmDeleteAllData = React.useCallback(
    async (ids) => {
      try {
        await post(`/content-manager/collection-types/${slug}/actions/bulkDelete`, {
          ids
        });
        fetchData(`/content-manager/collection-types/${slug}`, { params });
        trackUsageRef.current("didBulkDeleteEntries");
      } catch (err) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(err)
        });
      }
    },
    [slug, toggleNotification, formatAPIError, post, fetchData, params]
  );
  const handleConfirmDeleteData = React.useCallback(
    async (idToDelete) => {
      try {
        await del(`/content-manager/collection-types/${slug}/${idToDelete}`);
        const requestUrl = `/content-manager/collection-types/${slug}`;
        fetchData(requestUrl, { params });
        toggleNotification({
          type: "success",
          message: { id: getTranslation("success.record.delete") }
        });
      } catch (err) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(err)
        });
      }
    },
    [slug, toggleNotification, formatAPIError, del, fetchData, params]
  );
  const handleConfirmUnpublishAllData = (selectedEntries) => {
    return bulkUnpublishMutation.mutateAsync({ ids: selectedEntries });
  };
  React.useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const shouldSendRequest = canRead;
    const requestUrl = `/content-manager/collection-types/${slug}`;
    if (shouldSendRequest && requestUrl.includes(requestUrlRef.current)) {
      fetchData(requestUrl, { cancelToken: source.token, params });
    }
    return () => {
      requestUrlRef.current = slug;
      source.cancel("Operation canceled by the user.");
    };
  }, [canRead, getData$12, slug, params, getDataSucceeded$12, fetchData]);
  const defaultHeaderLayoutTitle = formatMessage({
    id: getTranslation("header.name"),
    defaultMessage: "Content"
  });
  const headerLayoutTitle = formatMessage({
    id: info.displayName,
    defaultMessage: info.displayName || defaultHeaderLayoutTitle
  });
  const { runHookWaterfall } = useStrapiApp();
  const displayedHeaders = useTypedSelector(selectDisplayedHeaders);
  const tableHeaders = React.useMemo(() => {
    const headers = runHookWaterfall(INJECT_COLUMN_IN_TABLE$1, {
      displayedHeaders,
      layout
    });
    const formattedHeaders = headers.displayedHeaders.map((header) => {
      const { metadatas: metadatas2 } = header;
      if (header.fieldSchema.type === "relation") {
        const sortFieldValue = `${header.name}.${header.metadatas.mainField.name}`;
        return {
          ...header,
          metadatas: {
            ...metadatas2,
            label: formatMessage({
              id: getTranslation(`containers.ListPage.table-headers.${header.name}`),
              defaultMessage: metadatas2.label
            })
          },
          name: sortFieldValue
        };
      }
      return {
        ...header,
        metadatas: {
          ...metadatas2,
          label: formatMessage({
            id: getTranslation(`containers.ListPage.table-headers.${header.name}`),
            defaultMessage: metadatas2.label
          })
        }
      };
    });
    if (hasDraftAndPublish) {
      formattedHeaders.push({
        key: "__published_at_temp_key__",
        name: "publishedAt",
        fieldSchema: {
          type: "custom"
        },
        metadatas: {
          label: formatMessage({
            id: getTranslation(`containers.ListPage.table-headers.publishedAt`),
            defaultMessage: "publishedAt"
          }),
          searchable: false,
          sortable: true
        }
      });
    }
    if (reviewWorkflowColumns) {
      reviewWorkflowColumns.map((column) => {
        if (typeof column.metadatas.label !== "string") {
          column.metadatas.label = formatMessage(column.metadatas.label);
        }
        return column;
      });
      formattedHeaders.push(...reviewWorkflowColumns);
    }
    return formattedHeaders;
  }, [
    runHookWaterfall,
    displayedHeaders,
    layout,
    reviewWorkflowColumns,
    hasDraftAndPublish,
    formatMessage
  ]);
  const subtitle = canRead ? formatMessage(
    {
      id: getTranslation("pages.ListView.header-subtitle"),
      defaultMessage: "{number, plural, =0 {# entries} one {# entry} other {# entries}} found"
    },
    { number: total }
  ) : null;
  const getCreateAction = (props) => canCreate ? /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      forwardedAs: Link$4,
      onClick: () => {
        const trackerProperty = hasDraftAndPublish ? { status: "draft" } : {};
        trackUsageRef.current("willCreateEntry", trackerProperty);
      },
      to: {
        pathname: `${pathname}/create`,
        search: query.plugins ? pluginsQueryParams : ""
      },
      startIcon: /* @__PURE__ */ jsx(Plus, {}),
      style: { textDecoration: "none" },
      children: formatMessage({
        id: getTranslation("HeaderLayout.button.label-add-entry"),
        defaultMessage: "Create new entry"
      })
    }
  ) : null;
  const handleRowClick = (id) => () => {
    trackUsage("willEditEntryFromList");
    push({
      pathname: `${pathname}/${id}`,
      state: { from: pathname },
      search: pluginsQueryParams
    });
  };
  const handleCloneClick = (id) => async () => {
    try {
      const { data: data2 } = await post(
        `/content-manager/collection-types/${contentType.uid}/auto-clone/${id}?${pluginsQueryParams}`
      );
      if ("id" in data2) {
        push({
          pathname: `${pathname}/${data2.id}`,
          state: { from: pathname },
          search: pluginsQueryParams
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        push({
          pathname: `${pathname}/create/clone/${id}`,
          state: { from: pathname, error: formatAPIError(err) },
          search: pluginsQueryParams
        });
      }
    }
  };
  const colCount = tableHeaders.length + 2;
  const refetchData = () => {
    fetchData(`/content-manager/collection-types/${slug}`, { params });
  };
  if (!ReviewWorkflowsColumns) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        primaryAction: getCreateAction(),
        subtitle,
        title: headerLayoutTitle,
        navigationAction: /* @__PURE__ */ jsx(Link$3, { startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: "/content-manager/", children: formatMessage({
          id: "global.back",
          defaultMessage: "Back"
        }) })
      }
    ),
    !canRead && /* @__PURE__ */ jsx(ActionLayout, { endActions: /* @__PURE__ */ jsx(InjectionZone, { area: "contentManager.listView.actions" }) }),
    canRead && /* @__PURE__ */ jsx(
      ActionLayout,
      {
        endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(InjectionZone, { area: "contentManager.listView.actions" }),
          /* @__PURE__ */ jsx(ViewSettingsMenu, { slug, layout })
        ] }),
        startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          isSearchable && /* @__PURE__ */ jsx(
            SearchURLQuery,
            {
              label: formatMessage(
                { id: "app.component.search.label", defaultMessage: "Search for {target}" },
                { target: headerLayoutTitle }
              ),
              placeholder: formatMessage({
                id: "global.search",
                defaultMessage: "Search"
              }),
              trackedEvent: "didSearch"
            }
          ),
          isFilterable && !isLoadingAdminUsers && /* @__PURE__ */ jsx(
            Filter,
            {
              displayedFilters: [...displayedAttributeFilters, ...reviewWorkflowFilter].sort(
                (a, b) => formatter.compare(a.metadatas.label, b.metadatas.label)
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: canRead ? /* @__PURE__ */ jsxs(Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Table.Root, { rows: data, isLoading, colCount, children: [
        /* @__PURE__ */ jsx(Table.ActionBar, { children: /* @__PURE__ */ jsx(
          BulkActionButtons,
          {
            showPublish: canPublish && hasDraftAndPublish,
            showDelete: canDelete,
            onConfirmDeleteAll: handleConfirmDeleteAllData,
            onConfirmUnpublishAll: handleConfirmUnpublishAllData,
            refetchData
          }
        ) }),
        /* @__PURE__ */ jsxs(Table.Content, { children: [
          /* @__PURE__ */ jsxs(Table.Head, { children: [
            /* @__PURE__ */ jsx(Table.HeaderCheckboxCell, {}),
            tableHeaders.map(({ fieldSchema, key, name, metadatas: metadatas2 }) => /* @__PURE__ */ jsx(
              Table.HeaderCell,
              {
                name,
                fieldSchemaType: fieldSchema.type,
                relationFieldName: metadatas2.mainField?.name,
                isSortable: metadatas2.sortable,
                label: metadatas2.label
              },
              key
            )),
            /* @__PURE__ */ jsx(Table.HeaderHiddenActionsCell, {})
          ] }),
          /* @__PURE__ */ jsx(Table.LoadingBody, {}),
          /* @__PURE__ */ jsx(
            Table.EmptyBody,
            {
              contentType: headerLayoutTitle,
              action: getCreateAction({ variant: "secondary" })
            }
          ),
          /* @__PURE__ */ jsx(
            Body.Root,
            {
              onConfirmDelete: handleConfirmDeleteData,
              isConfirmDeleteRowOpen,
              setIsConfirmDeleteRowOpen,
              children: data.map((rowData, index) => {
                return /* @__PURE__ */ jsxs(Tr, { cursor: "pointer", onClick: handleRowClick(rowData.id), children: [
                  /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Body.CheckboxDataCell, { rowId: rowData.id, index }) }),
                  tableHeaders.map(({ key, name, cellFormatter, ...rest }) => {
                    if (hasDraftAndPublish && name === "publishedAt") {
                      return /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(
                        Status,
                        {
                          width: "min-content",
                          showBullet: false,
                          variant: rowData.publishedAt ? "success" : "secondary",
                          size: "S",
                          children: /* @__PURE__ */ jsx(
                            Typography,
                            {
                              fontWeight: "bold",
                              textColor: `${rowData.publishedAt ? "success" : "secondary"}700`,
                              children: formatMessage({
                                id: getTranslation(
                                  `containers.List.${rowData.publishedAt ? "published" : "draft"}`
                                ),
                                defaultMessage: rowData.publishedAt ? "Published" : "Draft"
                              })
                            }
                          )
                        }
                      ) }, key);
                    }
                    if (hasReviewWorkflows) {
                      if (name === "strapi_stage") {
                        return /* @__PURE__ */ jsx(Td, { children: rowData.strapi_stage ? /* @__PURE__ */ jsx(
                          ReviewWorkflowsColumns.ReviewWorkflowsStageEE,
                          {
                            color: rowData.strapi_stage.color ?? lightTheme.colors.primary600,
                            name: rowData.strapi_stage.name
                          }
                        ) : /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: "-" }) }, key);
                      }
                      if (name === "strapi_assignee") {
                        return /* @__PURE__ */ jsx(Td, { children: rowData.strapi_assignee ? /* @__PURE__ */ jsx(
                          ReviewWorkflowsColumns.ReviewWorkflowsAssigneeEE,
                          {
                            user: rowData.strapi_assignee
                          }
                        ) : /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: "-" }) }, key);
                      }
                    }
                    if (["createdBy", "updatedBy"].includes(name.split(".")[0])) {
                      return /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: rowData[name.split(".")[0]] ? getDisplayName(rowData[name.split(".")[0]], formatMessage) : "-" }) }, key);
                    }
                    if (typeof cellFormatter === "function") {
                      return /* @__PURE__ */ jsx(Td, { children: cellFormatter(rowData, { key, name, ...rest }) }, key);
                    }
                    return /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(
                      CellContent,
                      {
                        content: rowData[name.split(".")[0]],
                        name,
                        contentType: layout.contentType,
                        ...rest,
                        rowId: rowData.id
                      }
                    ) }, key);
                  }),
                  (canDelete || canPublish) && isBulkable && /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(
                    Body.EntityActionsDataCell,
                    {
                      rowId: rowData.id,
                      index,
                      setIsConfirmDeleteRowOpen,
                      canCreate,
                      canDelete,
                      handleCloneClick
                    }
                  ) })
                ] }, rowData.id);
              })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { alignItems: "flex-end", justifyContent: "space-between", children: [
        /* @__PURE__ */ jsx(PageSizeURLQuery, { trackedEvent: "willChangeNumberOfEntriesPerPage" }),
        /* @__PURE__ */ jsx(PaginationURLQuery, { pagination: { pageCount: pagination?.pageCount || 1 } })
      ] })
    ] }) : /* @__PURE__ */ jsx(NoPermissions$1, {}) })
  ] });
}
ListView.propTypes = {
  canCreate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  canRead: PropTypes.bool.isRequired,
  canPublish: PropTypes.bool.isRequired,
  layout: PropTypes.exact({
    components: PropTypes.object.isRequired,
    contentType: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      attributes: PropTypes.object.isRequired,
      metadatas: PropTypes.object.isRequired,
      info: PropTypes.shape({ displayName: PropTypes.string.isRequired }).isRequired,
      layouts: PropTypes.shape({
        list: PropTypes.array.isRequired
      }).isRequired,
      options: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired
    }).isRequired
  }).isRequired,
  slug: PropTypes.string.isRequired
};
const ListView$1 = React.memo(ListView, isEqual);
const Permissions = (props) => {
  const viewPermissions = useMemo(() => generatePermissionsObject(props.slug), [props.slug]);
  const { isLoading, allowedActions } = useRBAC(viewPermissions, props.permissions);
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsx(ListView$1, { ...props, ...allowedActions });
};
Permissions.defaultProps = {
  permissions: []
};
Permissions.propTypes = {
  permissions: PropTypes.array,
  slug: PropTypes.string.isRequired
};
const Permissions$1 = memo(Permissions, (prev, next) => {
  const differenceBetweenRerenders = difference(prev, next);
  const propNamesThatHaveChanged = Object.keys(differenceBetweenRerenders).filter(
    (propName) => propName !== "state"
  );
  return propNamesThatHaveChanged.length > 0;
});
const ListViewLayout = ({ layout, ...props }) => {
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const [{ query, rawQuery }] = useQueryParams();
  const { permissions: permissions2, isValid: isValidPermissions } = useSyncRbac(query, props.slug, "listView");
  const redirectionLink = useFindRedirectionLink(props.slug);
  useEffect(() => {
    if (!rawQuery) {
      replace(redirectionLink);
    }
  }, [rawQuery, replace, redirectionLink]);
  useEffect(() => {
    dispatch(setLayout(layout));
  }, [dispatch, layout]);
  useEffect(() => {
    return () => {
      dispatch(resetProps());
    };
  }, [dispatch]);
  if (!isValidPermissions) {
    return null;
  }
  return /* @__PURE__ */ jsx(Permissions$1, { ...props, layout, permissions: permissions2 });
};
ListViewLayout.propTypes = {
  layout: PropTypes.exact({
    components: PropTypes.object.isRequired,
    contentType: PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      metadatas: PropTypes.object.isRequired,
      layouts: PropTypes.shape({
        list: PropTypes.array.isRequired
      }).isRequired,
      options: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired,
      pluginOptions: PropTypes.object
    }).isRequired
  }).isRequired,
  slug: PropTypes.string.isRequired
};
const CollectionTypeRecursivePath = ({
  match: {
    params: { slug },
    url
  }
}) => {
  const permissions2 = useTypedSelector((state) => state.admin_app.permissions);
  const { isLoading, layout, updateLayout } = useContentTypeLayout$1(slug);
  const { rawContentTypeLayout, rawComponentsLayouts } = React.useMemo(() => {
    let rawContentTypeLayout2 = null;
    let rawComponentsLayouts2 = null;
    if (layout?.contentType) {
      rawContentTypeLayout2 = formatLayoutForSettingsView(layout.contentType);
    }
    if (layout?.components) {
      rawComponentsLayouts2 = Object.keys(layout.components).reduce((acc, current) => {
        acc[current] = formatLayoutForSettingsView(layout.components[current]);
        return acc;
      }, {});
    }
    return { rawContentTypeLayout: rawContentTypeLayout2, rawComponentsLayouts: rawComponentsLayouts2 };
  }, [layout]);
  const uid = layout?.contentType?.uid ?? null;
  if (uid !== slug || isLoading || !layout) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsx(
    ErrorBoundary,
    {
      FallbackComponent: () => /* @__PURE__ */ jsx(Box, { padding: 8, children: /* @__PURE__ */ jsx(AnErrorOccurred, {}) }),
      children: /* @__PURE__ */ jsxs(Switch, { children: [
        /* @__PURE__ */ jsx(Route, { path: `${url}/configurations/list`, children: /* @__PURE__ */ jsx(
          CheckPagePermissions,
          {
            permissions: permissions2.contentManager?.collectionTypesConfigurations,
            children: /* @__PURE__ */ jsx(
              ListSettingsView,
              {
                layout: rawContentTypeLayout,
                slug,
                updateLayout
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx(Route, { path: `${url}/configurations/edit`, children: /* @__PURE__ */ jsx(
          CheckPagePermissions,
          {
            permissions: permissions2.contentManager?.collectionTypesConfigurations,
            children: /* @__PURE__ */ jsx(
              EditSettingsView,
              {
                components: rawComponentsLayouts,
                isContentTypeView: true,
                mainLayout: rawContentTypeLayout,
                slug,
                updateLayout
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: `${url}/create/clone/:origin`,
            render: ({
              history: { goBack },
              match: {
                params: { origin }
              }
            }) => /* @__PURE__ */ jsx(EditViewLayoutManager, { slug, layout, goBack, origin })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: `${url}/create`,
            render: ({ history: { goBack } }) => /* @__PURE__ */ jsx(EditViewLayoutManager, { slug, layout, goBack })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: `${url}/:id`,
            render: ({
              history: { goBack },
              match: {
                params: { id }
              }
            }) => /* @__PURE__ */ jsx(EditViewLayoutManager, { slug, layout, goBack, id })
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: `${url}`,
            render: ({ location: { state }, history: { goBack } }) => /* @__PURE__ */ jsx(ListViewLayout, { slug, layout, state, goBack })
          }
        )
      ] })
    }
  );
};
const initialState$2 = {
  componentsDataStructure: {},
  contentTypeDataStructure: {},
  isLoading: true,
  data: null,
  status: "resolved",
  setModifiedDataOnly: false
};
const reducer$2 = (state = initialState$2, action) => produce(state, (draftState) => {
  switch (action.type) {
    case GET_DATA$1: {
      draftState.isLoading = true;
      draftState.data = null;
      break;
    }
    case GET_DATA_SUCCEEDED$1: {
      draftState.isLoading = false;
      draftState.data = action.data;
      draftState.setModifiedDataOnly = action.setModifiedDataOnly ?? false;
      break;
    }
    case INIT_FORM: {
      if (action.data) {
        draftState.isLoading = false;
        draftState.data = action.data;
        break;
      }
      draftState.isLoading = false;
      draftState.data = state.contentTypeDataStructure;
      break;
    }
    case RESET_PROPS$2: {
      return initialState$2;
    }
    case SET_DATA_STRUCTURES: {
      draftState.componentsDataStructure = action.componentsDataStructure;
      draftState.contentTypeDataStructure = action.contentTypeDataStructure;
      break;
    }
    case SET_STATUS: {
      draftState.status = action.status;
      break;
    }
    case SUBMIT_SUCCEEDED: {
      draftState.data = action.data;
      break;
    }
    case CLEAR_SET_MODIFIED_DATA_ONLY: {
      draftState.setModifiedDataOnly = false;
      break;
    }
    default:
      return draftState;
  }
});
const ComponentSettingsView = () => {
  const [{ isLoading, data: layout }, dispatch] = React.useReducer(reducer$2, initialState$2);
  const schemas = useTypedSelector(selectSchemas);
  const permissions2 = useTypedSelector((state) => state.admin_app.permissions);
  const { uid } = useParams();
  const { get: get2 } = useFetchClient();
  React.useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchData = async (source2) => {
      try {
        dispatch(getData$1());
        const {
          data: { data }
        } = await get2(`/content-manager/components/${uid}/configuration`, {
          cancelToken: source2.token
        });
        dispatch(getDataSucceeded$1(mergeMetasWithSchema(data, schemas, "component")));
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error(err);
      }
    };
    fetchData(source);
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [uid, schemas, get2]);
  if (isLoading || !layout) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions2.contentManager?.componentsConfigurations, children: /* @__PURE__ */ jsx(EditSettingsView, { components: layout.components, mainLayout: layout.component, slug: uid }) });
};
const NoContentType = () => {
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        title: formatMessage({
          id: getTranslation("header.name"),
          defaultMessage: "Content"
        })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        action: /* @__PURE__ */ jsx(
          LinkButton$3,
          {
            as: NavLink,
            variant: "secondary",
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            to: "/plugins/content-type-builder/content-types/create-content-type",
            children: formatMessage({
              id: "app.components.HomePage.create",
              defaultMessage: "Create your first Content-type"
            })
          }
        ),
        content: formatMessage({
          id: "content-manager.pages.NoContentType.text",
          defaultMessage: "You don't have any content yet, we recommend you to create your first Content-Type."
        }),
        hasRadius: true,
        icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "10rem" }),
        shadow: "tableShadow"
      }
    ) })
  ] });
};
const NoPermissions = () => {
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        title: formatMessage({
          id: getTranslation("header.name"),
          defaultMessage: "Content"
        })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(NoPermissions$1, {}) })
  ] });
};
const SingleTypeRecursivePath = ({
  match: {
    params: { slug },
    url
  }
}) => {
  const permissions2 = useTypedSelector((state) => state.admin_app.permissions);
  const { isLoading, layout, updateLayout } = useContentTypeLayout$1(slug);
  const { rawContentTypeLayout, rawComponentsLayouts } = React.useMemo(() => {
    let rawContentTypeLayout2 = null;
    let rawComponentsLayouts2 = null;
    if (layout?.contentType) {
      rawContentTypeLayout2 = formatLayoutForSettingsView(layout.contentType);
    }
    if (layout?.components) {
      rawComponentsLayouts2 = Object.keys(layout.components).reduce((acc, current) => {
        acc[current] = formatLayoutForSettingsView(layout.components[current]);
        return acc;
      }, {});
    }
    return { rawContentTypeLayout: rawContentTypeLayout2, rawComponentsLayouts: rawComponentsLayouts2 };
  }, [layout]);
  if (isLoading || !layout) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsxs(Switch, { children: [
    /* @__PURE__ */ jsx(Route, { path: `${url}/configurations/edit`, children: /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions2.contentManager?.singleTypesConfigurations, children: /* @__PURE__ */ jsx(
      EditSettingsView,
      {
        components: rawComponentsLayouts,
        isContentTypeView: true,
        mainLayout: rawContentTypeLayout,
        slug,
        updateLayout
      }
    ) }) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: url,
        render: ({ history }) => /* @__PURE__ */ jsx(EditViewLayoutManager, { layout, slug, isSingleType: true, goBack: history.goBack })
      }
    )
  ] });
};
const App = () => {
  const contentTypeMatch = useRouteMatch(`/content-manager/:kind/:uid`);
  const { status, collectionTypeLinks, singleTypeLinks, models, refetchData } = useContentManagerInitData();
  const authorisedModels = [...collectionTypeLinks, ...singleTypeLinks].sort(
    (a, b) => a.title.localeCompare(b.title)
  );
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();
  const { startSection } = useGuidedTour();
  const startSectionRef = React.useRef(startSection);
  const permissions2 = useTypedSelector((state) => state.admin_app.permissions);
  React.useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("contentManager");
    }
  }, []);
  if (status === "loading") {
    return /* @__PURE__ */ jsxs(Main, { "aria-busy": "true", children: [
      /* @__PURE__ */ jsx(
        Helmet,
        {
          title: formatMessage({
            id: getTranslation("plugin.name"),
            defaultMessage: "Content Manager"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title: formatMessage({
            id: getTranslation("header.name"),
            defaultMessage: "Content"
          })
        }
      ),
      /* @__PURE__ */ jsx(LoadingIndicatorPage, {})
    ] });
  }
  const supportedModelsToDisplay = models.filter(({ isDisplayed }) => isDisplayed);
  if (authorisedModels.length === 0 && supportedModelsToDisplay.length > 0 && pathname !== "/content-manager/403") {
    return /* @__PURE__ */ jsx(Redirect, { to: "/content-manager/403" });
  }
  if (supportedModelsToDisplay.length === 0 && pathname !== "/content-manager/no-content-types") {
    return /* @__PURE__ */ jsx(Redirect, { to: "/content-manager/no-content-types" });
  }
  if (!contentTypeMatch && authorisedModels.length > 0) {
    return /* @__PURE__ */ jsx(
      Redirect,
      {
        to: {
          pathname: authorisedModels[0].to,
          search: authorisedModels[0].search ?? ""
        }
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Helmet,
      {
        title: formatMessage({
          id: getTranslation("plugin.name"),
          defaultMessage: "Content Manager"
        })
      }
    ),
    /* @__PURE__ */ jsxs(Layout, { sideNav: /* @__PURE__ */ jsx(LeftMenu, {}), children: [
      /* @__PURE__ */ jsx(DragLayer, { renderItem: renderDraglayerItem }),
      /* @__PURE__ */ jsx(ModelsContext.Provider, { value: { refetchData }, children: /* @__PURE__ */ jsxs(Switch, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/content-manager/components/:uid/configurations/edit", children: /* @__PURE__ */ jsx(
          CheckPagePermissions,
          {
            permissions: permissions2.contentManager?.componentsConfigurations,
            children: /* @__PURE__ */ jsx(ComponentSettingsView, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/content-manager/collectionType/:slug",
            component: CollectionTypeRecursivePath
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "/content-manager/singleType/:slug", component: SingleTypeRecursivePath }),
        /* @__PURE__ */ jsx(Route, { path: "/content-manager/403", children: /* @__PURE__ */ jsx(NoPermissions, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/content-manager/no-content-types", children: /* @__PURE__ */ jsx(NoContentType, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "", component: AnErrorOccurred })
      ] }) })
    ] })
  ] });
};
function renderDraglayerItem({ type, item }) {
  if (!type || type && typeof type !== "string") {
    return null;
  }
  const [actualType] = type.split("_");
  switch (actualType) {
    case ItemTypes.EDIT_FIELD:
    case ItemTypes.FIELD:
      return /* @__PURE__ */ jsx(CardDragPreview, { labelField: item.labelField });
    case ItemTypes.COMPONENT:
    case ItemTypes.DYNAMIC_ZONE:
      return /* @__PURE__ */ jsx(ComponentDragPreview, { displayedValue: item.displayedValue });
    case ItemTypes.RELATION:
      return /* @__PURE__ */ jsx(
        RelationDragPreview,
        {
          displayedValue: item.displayedValue,
          status: item.status,
          width: item.width
        }
      );
    default:
      return null;
  }
}
const GET_INIT_DATA = "ContentManager/App/GET_INIT_DATA";
const RESET_INIT_DATA = "ContentManager/App/RESET_INIT_DATA";
const SET_INIT_DATA = "ContentManager/App/SET_INIT_DATA";
const initialState$1 = {
  collectionTypeLinks: [],
  components: [],
  fieldSizes: {},
  models: [],
  singleTypeLinks: [],
  status: "loading"
};
const selectSchemas = createSelector(
  (state) => state["content-manager_app"],
  ({ components, models }) => {
    return [...components, ...models];
  }
);
const reducer$1 = (state = initialState$1, action) => produce(state, (draftState) => {
  switch (action.type) {
    case GET_INIT_DATA: {
      draftState.status = "loading";
      break;
    }
    case RESET_INIT_DATA: {
      return initialState$1;
    }
    case SET_INIT_DATA: {
      draftState.collectionTypeLinks = action.data.authorizedCollectionTypeLinks.filter(
        ({ isDisplayed }) => isDisplayed
      );
      draftState.singleTypeLinks = action.data.authorizedSingleTypeLinks.filter(
        ({ isDisplayed }) => isDisplayed
      );
      draftState.components = action.data.components;
      draftState.models = action.data.contentTypeSchemas;
      draftState.fieldSizes = action.data.fieldSizes;
      draftState.status = "resolved";
      break;
    }
    default:
      return draftState;
  }
});
const App$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  App,
  reducer: reducer$1,
  selectSchemas
}, Symbol.toStringTag, { value: "Module" }));
const initialState = {
  permissions: {},
  status: "init"
};
const reducer = (state = initialState, action) => (
  /* eslint-disable-next-line consistent-return */
  produce(state, (draftState) => {
    switch (action.type) {
      case ACTION_SET_APP_RUNTIME_STATUS: {
        draftState.status = "runtime";
        break;
      }
      case ACTION_SET_ADMIN_PERMISSIONS: {
        draftState.permissions = action.payload;
        break;
      }
      default:
        return draftState;
    }
  })
);
const staticReducers = {
  admin_app: reducer,
  rbacProvider: RBACReducer,
  "content-manager_app": reducer$1,
  "content-manager_listView": listViewReducer,
  "content-manager_rbacManager": reducer$7,
  "content-manager_editViewLayoutManager": reducer$4,
  "content-manager_editViewCrudReducer": reducer$2
};
const injectReducerStoreEnhancer = (appReducers) => (next) => (...args) => {
  const store = next(...args);
  const asyncReducers = {};
  return {
    ...store,
    asyncReducers,
    injectReducer: (key, asyncReducer) => {
      asyncReducers[key] = asyncReducer;
      store.replaceReducer(
        // @ts-expect-error we dynamically add reducers which makes the types uncomfortable.
        combineReducers({
          ...appReducers,
          ...asyncReducers
        })
      );
    }
  };
};
const configureStoreImpl = (appMiddlewares = [], injectedReducers = {}) => {
  const coreReducers = { ...staticReducers, ...injectedReducers };
  const store = configureStore({
    reducer: coreReducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      ...appMiddlewares.map((m) => m())
    ],
    enhancers: [injectReducerStoreEnhancer(coreReducers)]
  });
  return store;
};
const getBasename = () => (process.env.ADMIN_PATH ?? "").replace(window.location.origin, "");
const createHook = () => {
  const _handlers = [];
  return {
    register(fn) {
      _handlers.push(fn);
    },
    delete(handler) {
      _handlers.splice(_handlers.indexOf(handler), 1);
    },
    runWaterfall(args, store) {
      return _handlers.reduce((acc, fn) => fn(acc, store), args);
    },
    async runWaterfallAsync(args, store) {
      let result = args;
      for (const fn of _handlers) {
        result = await fn(result, store);
      }
      return result;
    },
    runSeries(...args) {
      return _handlers.map((fn) => fn(...args));
    },
    async runSeriesAsync(...args) {
      const result = [];
      for (const fn of _handlers) {
        result.push(await fn(...args));
      }
      return result;
    },
    runParallel(...args) {
      return Promise.all(
        _handlers.map((fn) => {
          return fn(...args);
        })
      );
    }
  };
};
const languageNativeNames = {
  ar: "العربية",
  ca: "Català",
  cs: "Čeština",
  de: "Deutsch",
  dk: "Dansk",
  en: "English",
  es: "Español",
  eu: "Euskara",
  fr: "Français",
  gu: "Gujarati",
  he: "עברית",
  hu: "Magyar",
  id: "Indonesian",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  ml: "Malayalam",
  ms: "Melayu",
  nl: "Nederlands",
  no: "Norwegian",
  pl: "Polski",
  "pt-BR": "Português (Brasil)",
  pt: "Português (Portugal)",
  ru: "Русский",
  sk: "Slovenčina",
  sv: "Swedish",
  th: "ไทย",
  tr: "Türkçe",
  uk: "Українська",
  vi: "Tiếng Việt",
  "zh-Hans": "中文 (简体)",
  zh: "中文 (繁體)",
  sa: "संस्कृत",
  hi: "हिन्दी"
};
const {
  INJECT_COLUMN_IN_TABLE,
  MUTATE_COLLECTION_TYPES_LINKS,
  MUTATE_EDIT_VIEW_LAYOUT,
  MUTATE_SINGLE_TYPES_LINKS
} = HOOKS;
class StrapiApp {
  admin;
  appPlugins;
  configurations;
  customBootstrapConfiguration;
  customConfigurations;
  customFields;
  hooksDict;
  library;
  menu;
  middlewares;
  plugins;
  reducers;
  settings;
  translations;
  constructor({ adminConfig, appPlugins } = {}) {
    this.customConfigurations = adminConfig?.config ?? {};
    this.customBootstrapConfiguration = adminConfig?.bootstrap;
    this.configurations = {
      authLogo: StrapiLogo,
      head: { favicon: "" },
      locales: ["en"],
      menuLogo: StrapiLogo,
      notifications: { releases: true },
      themes: { light: lightTheme, dark: darkTheme },
      translations: {},
      tutorials: true
    };
    this.appPlugins = appPlugins || {};
    this.library = {
      components: new Components(),
      fields: new Fields()
    };
    this.middlewares = new Middlewares();
    this.plugins = {};
    this.reducers = new Reducers();
    this.translations = {};
    this.hooksDict = {};
    this.admin = {
      injectionZones: INJECTION_ZONES
    };
    this.customFields = new CustomFields();
    this.menu = [];
    this.settings = {
      global: {
        id: "global",
        intlLabel: {
          id: "Settings.global",
          defaultMessage: "Global Settings"
        },
        links: []
      }
    };
  }
  addComponents = (components) => {
    if (Array.isArray(components)) {
      components.map((compo) => this.library.components.add(compo));
    } else {
      this.library.components.add(components);
    }
  };
  addCorePluginMenuLink = (link) => {
    const stringifiedLink = JSON.stringify(link);
    invariant(link.to, `link.to should be defined for ${stringifiedLink}`);
    invariant(
      typeof link.to === "string",
      `Expected link.to to be a string instead received ${typeof link.to}`
    );
    invariant(
      ["/plugins/content-type-builder", "/plugins/upload"].includes(link.to),
      "This method is not available for your plugin"
    );
    invariant(
      link.intlLabel?.id && link.intlLabel?.defaultMessage,
      `link.intlLabel.id & link.intlLabel.defaultMessage for ${stringifiedLink}`
    );
    this.menu.push(link);
  };
  addFields = (fields) => {
    if (Array.isArray(fields)) {
      fields.map((field) => this.library.fields.add(field));
    } else {
      this.library.fields.add(fields);
    }
  };
  addMenuLink = (link) => {
    const stringifiedLink = JSON.stringify(link);
    invariant(link.to, `link.to should be defined for ${stringifiedLink}`);
    invariant(
      typeof link.to === "string",
      `Expected link.to to be a string instead received ${typeof link.to}`
    );
    invariant(
      link.intlLabel?.id && link.intlLabel?.defaultMessage,
      `link.intlLabel.id & link.intlLabel.defaultMessage for ${stringifiedLink}`
    );
    invariant(
      link.Component && typeof link.Component === "function",
      `link.Component should be a valid React Component`
    );
    invariant(
      link.icon && typeof link.icon === "function",
      `link.Icon should be a valid React Component`
    );
    this.menu.push(link);
  };
  addMiddlewares = (middlewares) => {
    middlewares.forEach((middleware) => {
      this.middlewares.add(middleware);
    });
  };
  addReducers = (reducers) => {
    Object.keys(reducers).forEach((reducerName) => {
      this.reducers.add(reducerName, reducers[reducerName]);
    });
  };
  addSettingsLink = (sectionId, link) => {
    invariant(this.settings[sectionId], "The section does not exist");
    const stringifiedLink = JSON.stringify(link);
    invariant(link.id, `link.id should be defined for ${stringifiedLink}`);
    invariant(
      link.intlLabel?.id && link.intlLabel?.defaultMessage,
      `link.intlLabel.id & link.intlLabel.defaultMessage for ${stringifiedLink}`
    );
    invariant(link.to, `link.to should be defined for ${stringifiedLink}`);
    invariant(
      link.Component && typeof link.Component === "function",
      `link.Component should be a valid React Component`
    );
    this.settings[sectionId].links.push(link);
  };
  addSettingsLinks = (sectionId, links) => {
    invariant(this.settings[sectionId], "The section does not exist");
    invariant(Array.isArray(links), "TypeError expected links to be an array");
    links.forEach((link) => {
      this.addSettingsLink(sectionId, link);
    });
  };
  async bootstrap() {
    Object.keys(this.appPlugins).forEach((plugin) => {
      const bootstrap = this.appPlugins[plugin].bootstrap;
      if (bootstrap) {
        bootstrap({
          addSettingsLink: this.addSettingsLink,
          addSettingsLinks: this.addSettingsLinks,
          getPlugin: this.getPlugin,
          injectContentManagerComponent: this.injectContentManagerComponent,
          injectAdminComponent: this.injectAdminComponent,
          registerHook: this.registerHook
        });
      }
    });
    if (isFunction(this.customBootstrapConfiguration)) {
      this.customBootstrapConfiguration({
        addComponents: this.addComponents,
        addFields: this.addFields,
        addMenuLink: this.addMenuLink,
        addReducers: this.addReducers,
        addSettingsLink: this.addSettingsLink,
        addSettingsLinks: this.addSettingsLinks,
        getPlugin: this.getPlugin,
        injectContentManagerComponent: this.injectContentManagerComponent,
        injectAdminComponent: this.injectAdminComponent,
        registerHook: this.registerHook
      });
    }
  }
  bootstrapAdmin = async () => {
    await this.createCustomConfigurations();
    this.createHook(INJECT_COLUMN_IN_TABLE);
    this.createHook(MUTATE_COLLECTION_TYPES_LINKS);
    this.createHook(MUTATE_SINGLE_TYPES_LINKS);
    this.createHook(MUTATE_EDIT_VIEW_LAYOUT);
    return Promise.resolve();
  };
  createCustomConfigurations = async () => {
    if (this.customConfigurations?.locales) {
      this.configurations.locales = [
        "en",
        ...this.customConfigurations.locales?.filter((loc) => loc !== "en") || []
      ];
    }
    if (this.customConfigurations?.auth?.logo) {
      this.configurations.authLogo = this.customConfigurations.auth.logo;
    }
    if (this.customConfigurations?.menu?.logo) {
      this.configurations.menuLogo = this.customConfigurations.menu.logo;
    }
    if (this.customConfigurations?.head?.favicon) {
      this.configurations.head.favicon = this.customConfigurations.head.favicon;
    }
    if (this.customConfigurations?.theme) {
      const darkTheme2 = this.customConfigurations.theme.dark;
      const lightTheme2 = this.customConfigurations.theme.light;
      if (!darkTheme2 && !lightTheme2) {
        console.warn(
          `[deprecated] In future versions, Strapi will stop supporting this theme customization syntax. The theme configuration accepts a light and a dark key to customize each theme separately. See https://docs.strapi.io/developer-docs/latest/development/admin-customization.html#theme-extension.`
        );
        merge(this.configurations.themes.light, this.customConfigurations.theme);
      }
      if (lightTheme2)
        merge(this.configurations.themes.light, lightTheme2);
      if (darkTheme2)
        merge(this.configurations.themes.dark, darkTheme2);
    }
    if (this.customConfigurations?.notifications?.releases !== void 0) {
      this.configurations.notifications.releases = this.customConfigurations.notifications.releases;
    }
    if (this.customConfigurations?.tutorials !== void 0) {
      this.configurations.tutorials = this.customConfigurations.tutorials;
    }
  };
  createHook = (name) => {
    this.hooksDict[name] = createHook();
  };
  createSettingSection = (section, links) => {
    invariant(section.id, "section.id should be defined");
    invariant(
      section.intlLabel?.id && section.intlLabel?.defaultMessage,
      "section.intlLabel should be defined"
    );
    invariant(Array.isArray(links), "TypeError expected links to be an array");
    invariant(this.settings[section.id] === void 0, "A similar section already exists");
    this.settings[section.id] = { ...section, links: [] };
    links.forEach((link) => {
      this.addSettingsLink(section.id, link);
    });
  };
  createStore = () => {
    const store = configureStoreImpl(this.middlewares.middlewares, this.reducers.reducers);
    return store;
  };
  getAdminInjectedComponents = (moduleName, containerName, blockName) => {
    try {
      return this.admin.injectionZones[moduleName][containerName][blockName] || [];
    } catch (err) {
      console.error("Cannot get injected component", err);
      return [];
    }
  };
  getPlugin = (pluginId) => {
    return this.plugins[pluginId];
  };
  async initialize() {
    Object.keys(this.appPlugins).forEach((plugin) => {
      this.appPlugins[plugin].register(this);
    });
  }
  injectContentManagerComponent = (containerName, blockName, component) => {
    invariant(
      this.admin.injectionZones.contentManager[containerName]?.[blockName],
      `The ${containerName} ${String(blockName)} zone is not defined in the content manager`
    );
    invariant(component, "A Component must be provided");
    this.admin.injectionZones.contentManager[containerName][blockName].push(component);
  };
  injectAdminComponent = (containerName, blockName, component) => {
    invariant(
      this.admin.injectionZones.admin[containerName]?.[blockName],
      `The ${containerName} ${String(blockName)} zone is not defined in the admin`
    );
    invariant(component, "A Component must be provided");
    this.admin.injectionZones.admin[containerName][blockName].push(component);
  };
  /**
   * Load the admin translations
   * @returns {Object} The imported admin translations
   */
  async loadAdminTrads() {
    const arrayOfPromises = this.configurations.locales.map((locale) => {
      return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-62e5e2b3.mjs"), "./translations/ca.json": () => import("./ca-e99de225.mjs"), "./translations/cs.json": () => import("./cs-2fa881a2.mjs"), "./translations/de.json": () => import("./de-28f8bc28.mjs"), "./translations/dk.json": () => import("./dk-0b759a56.mjs"), "./translations/en.json": () => import("./en-33878ca8.mjs"), "./translations/es.json": () => import("./es-18b29db2.mjs"), "./translations/eu.json": () => import("./eu-8fd773c2.mjs"), "./translations/fr.json": () => import("./fr-f37df086.mjs"), "./translations/gu.json": () => import("./gu-69f0e13a.mjs"), "./translations/he.json": () => import("./he-bd769d7e.mjs"), "./translations/hi.json": () => import("./hi-d397a24b.mjs"), "./translations/hu.json": () => import("./hu-eb88bd0c.mjs"), "./translations/id.json": () => import("./id-f47699e6.mjs"), "./translations/it.json": () => import("./it-4006227c.mjs"), "./translations/ja.json": () => import("./ja-db43ca3d.mjs"), "./translations/ko.json": () => import("./ko-a7826e25.mjs"), "./translations/ml.json": () => import("./ml-90131768.mjs"), "./translations/ms.json": () => import("./ms-f4f16a83.mjs"), "./translations/nl.json": () => import("./nl-887ce2c3.mjs"), "./translations/no.json": () => import("./no-f0b02541.mjs"), "./translations/pl.json": () => import("./pl-9ccd35d9.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-fd73cb13.mjs"), "./translations/pt.json": () => import("./pt-8acb6ac1.mjs"), "./translations/ru.json": () => import("./ru-9aad40c5.mjs"), "./translations/sa.json": () => import("./sa-6bf4c20e.mjs"), "./translations/sk.json": () => import("./sk-58d31b17.mjs"), "./translations/sv.json": () => import("./sv-d80ad633.mjs"), "./translations/th.json": () => import("./th-e72c6a22.mjs"), "./translations/tr.json": () => import("./tr-e35ecfe8.mjs"), "./translations/uk.json": () => import("./uk-de367ec1.mjs"), "./translations/vi.json": () => import("./vi-096bccbb.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-ccf4be4b.mjs"), "./translations/zh.json": () => import("./zh-ba29b2e1.mjs") }), `./translations/${locale}.json`).then(({ default: data }) => {
        return { data, locale };
      }).catch(() => {
        return { data: null, locale };
      });
    });
    const adminLocales = await Promise.all(arrayOfPromises);
    const translations = adminLocales.reduce(
      (acc, current) => {
        if (current.data) {
          acc[current.locale] = current.data;
        }
        return acc;
      },
      {}
    );
    return translations;
  }
  /**
   * Load the application's translations and merged the custom translations
   * with the default ones.
   *
   */
  async loadTrads() {
    const adminTranslations = await this.loadAdminTrads();
    const arrayOfPromises = Object.keys(this.appPlugins).map((plugin) => {
      const registerTrads = this.appPlugins[plugin].registerTrads;
      if (registerTrads) {
        return registerTrads({ locales: this.configurations.locales });
      }
      return null;
    }).filter((a) => a);
    const pluginsTrads = await Promise.all(arrayOfPromises);
    const mergedTrads = pluginsTrads.reduce(
      (acc, currentPluginTrads) => {
        const pluginTrads = currentPluginTrads.reduce(
          (acc1, current) => {
            acc1[current.locale] = current.data;
            return acc1;
          },
          {}
        );
        Object.keys(pluginTrads).forEach((locale) => {
          acc[locale] = { ...acc[locale], ...pluginTrads[locale] };
        });
        return acc;
      },
      {}
    );
    const translations = this.configurations.locales.reduce((acc, current) => {
      acc[current] = {
        ...adminTranslations[current],
        ...mergedTrads[current] || {},
        ...this.customConfigurations?.translations?.[current] ?? {}
      };
      return acc;
    }, {});
    this.configurations.translations = translations;
    return Promise.resolve();
  }
  registerHook = (name, fn) => {
    invariant(
      this.hooksDict[name],
      `The hook ${name} is not defined. You are trying to register a hook that does not exist in the application.`
    );
    this.hooksDict[name].register(fn);
  };
  registerPlugin = (pluginConf) => {
    const plugin = new Plugin(pluginConf);
    this.plugins[plugin.pluginId] = plugin;
  };
  runHookSeries = (name, asynchronous = false) => asynchronous ? this.hooksDict[name].runSeriesAsync() : this.hooksDict[name].runSeries();
  runHookWaterfall = (name, initialValue, asynchronous = false, store) => {
    return asynchronous ? this.hooksDict[name].runWaterfallAsync(initialValue, store) : this.hooksDict[name].runWaterfall(initialValue, store);
  };
  runHookParallel = (name) => this.hooksDict[name].runParallel();
  render() {
    const store = this.createStore();
    const localeNames = pick$1(languageNativeNames, this.configurations.locales || []);
    const {
      components: { components },
      fields: { fields }
    } = this.library;
    return /* @__PURE__ */ jsxs(
      Providers,
      {
        components,
        fields,
        customFields: this.customFields,
        localeNames,
        getAdminInjectedComponents: this.getAdminInjectedComponents,
        getPlugin: this.getPlugin,
        messages: this.configurations.translations,
        menu: this.menu,
        plugins: this.plugins,
        runHookParallel: this.runHookParallel,
        runHookWaterfall: (name, initialValue, async = false) => {
          return this.runHookWaterfall(name, initialValue, async, store);
        },
        runHookSeries: this.runHookSeries,
        themes: this.configurations.themes,
        settings: this.settings,
        store,
        children: [
          /* @__PURE__ */ jsx(
            Helmet,
            {
              htmlAttributes: { lang: localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY) || "en" }
            }
          ),
          /* @__PURE__ */ jsx(BrowserRouter, { basename: getBasename(), children: /* @__PURE__ */ jsx(
            App$2,
            {
              authLogo: this.configurations.authLogo,
              menuLogo: this.configurations.menuLogo,
              showTutorials: this.configurations.tutorials,
              showReleaseNotification: this.configurations.notifications.releases
            }
          ) })
        ]
      }
    );
  }
}
const renderAdmin = async (mountNode, { plugins, customisations }) => {
  if (!mountNode) {
    throw new Error("[@strapi/admin]: Could not find the root element to mount the admin app");
  }
  window.strapi = {
    /**
     * This ENV variable is passed from the strapi instance, by default no url is set
     * in the config and therefore the instance returns you an empty string so URLs are relative.
     *
     * To ensure that the backendURL is always set, we use the window.location.origin as a fallback.
     */
    backendURL: process.env.STRAPI_ADMIN_BACKEND_URL || window.location.origin,
    isEE: false,
    telemetryDisabled: process.env.STRAPI_TELEMETRY_DISABLED === "true" ? true : false,
    features: {
      SSO: "sso",
      AUDIT_LOGS: "audit-logs",
      REVIEW_WORKFLOWS: "review-workflows",
      /**
       * If we don't get the license then we know it's not EE
       * so no feature is enabled.
       */
      isEnabled: () => false
    },
    projectType: "Community",
    flags: {
      nps: false,
      promoteEE: true
    }
  };
  const { get: get2 } = getFetchClient();
  try {
    const {
      data: {
        data: { isEE, features, flags }
      }
    } = await get2("/admin/project-type");
    window.strapi.isEE = isEE;
    window.strapi.flags = flags;
    window.strapi.features = {
      ...window.strapi.features,
      isEnabled: (featureName) => features.some((feature) => feature.name === featureName)
    };
    window.strapi.projectType = isEE ? "Enterprise" : "Community";
  } catch (err) {
    console.error(err);
  }
  const app = new StrapiApp({
    adminConfig: customisations,
    appPlugins: plugins
  });
  await app.bootstrapAdmin();
  await app.initialize();
  await app.bootstrap();
  await app.loadTrads();
  createRoot(mountNode).render(app.render());
  if (typeof module !== "undefined" && module && "hot" in module && typeof module.hot === "object" && module.hot !== null && "accept" in module.hot && typeof module.hot.accept === "function") {
    module.hot.accept();
  }
};
export {
  ACTION_SET_APP_RUNTIME_STATUS as A,
  Column as C,
  DragLayer as D,
  Information as I,
  Login as L,
  NotFoundPage$1 as N,
  RBACProvider as R,
  StrapiLogo as S,
  UnauthenticatedLayout as U,
  useTypedDispatch as a,
  useTypedSelector as b,
  createRoute as c,
  LayoutContent as d,
  Logo as e,
  useAdminUsers as f,
  getDisplayName as g,
  getTranslation as h,
  useEnterprise as i,
  useDebounce as j,
  useLocales as k,
  useThemeToggle as l,
  SETTINGS_LINKS_CE as m,
  isObject as n,
  getBasename as o,
  formatAPIErrors as p,
  useTypedStore as q,
  useDragAndDrop as r,
  selectAdminPermissions as s,
  composeRefs as t,
  useConfiguration as u,
  DefaultDocument as v,
  renderAdmin as w,
  App$1 as x
};
//# sourceMappingURL=index-90ba4fba.mjs.map
