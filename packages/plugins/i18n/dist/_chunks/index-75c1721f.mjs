import { contentManagementUtilRemoveFieldsFromData, formatContentTypeData, useNotification, useCMEditViewDataManager, useFetchClient, pxToRem, useQueryParams, SortIcon, getFetchClient, prefixPluginTranslations } from "@strapi/helper-plugin";
import get from "lodash/get";
import * as yup from "yup";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useMemo, useEffect, useState } from "react";
import { Typography, Checkbox, Dialog, DialogBody, Flex, DialogFooter, Button as Button$1, Box, SingleSelect, SingleSelectOption, Divider, Tooltip, VisuallyHidden, Popover } from "@strapi/design-system";
import { ExclamationMarkCircle, Duplicate, Earth, EarthStriked } from "@strapi/icons";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { stringify, parse } from "qs";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import produce from "immer";
import set from "lodash/set";
import omit from "lodash/omit";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const pluginId = "i18n";
const getTranslation = (id) => `${pluginId}.${id}`;
const TextAlignTypography = styled(Typography)`
  text-align: center;
`;
const CheckboxConfirmation = ({
  description,
  isCreating = false,
  intlLabel,
  name,
  onChange,
  value
}) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleChange = (value2) => {
    if (isCreating || value2) {
      return onChange({ target: { name, value: value2, type: "checkbox" } });
    }
    if (!value2) {
      return setIsOpen(true);
    }
    return null;
  };
  const handleConfirm = () => {
    onChange({ target: { name, value: false, type: "checkbox" } });
    setIsOpen(false);
  };
  const handleToggle = () => setIsOpen((prev) => !prev);
  const label = intlLabel.id ? formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { ...intlLabel.values }
  ) : name;
  const hint = description ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { ...description.values }
  ) : "";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        hint,
        id: name,
        name,
        onValueChange: handleChange,
        value,
        type: "checkbox",
        children: label
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(Dialog, { onClose: handleToggle, title: "Confirmation", isOpen, children: [
      /* @__PURE__ */ jsx(DialogBody, { icon: /* @__PURE__ */ jsx(ExclamationMarkCircle, {}), children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(TextAlignTypography, { id: "confirm-description", children: formatMessage({
          id: getTranslation("CheckboxConfirmation.Modal.content"),
          defaultMessage: "Disabling localization will engender the deletion of all your content but the one associated to your default locale (if existing)."
        }) }) }),
        /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Typography, { fontWeight: "semiBold", id: "confirm-description", children: formatMessage({
          id: getTranslation("CheckboxConfirmation.Modal.body"),
          defaultMessage: "Do you want to disable it?"
        }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        DialogFooter,
        {
          startAction: /* @__PURE__ */ jsx(Button$1, { onClick: handleToggle, variant: "tertiary", children: formatMessage({
            id: "components.popUpWarning.button.cancel",
            defaultMessage: "No, cancel"
          }) }),
          endAction: /* @__PURE__ */ jsx(Button$1, { variant: "danger-light", onClick: handleConfirm, children: formatMessage({
            id: getTranslation("CheckboxConfirmation.Modal.button-confirm"),
            defaultMessage: "Yes, disable"
          }) })
        }
      )
    ] })
  ] });
};
const useTypedDispatch = useDispatch;
const useTypedSelector = useSelector;
const makeSelectContentTypePermissions = () => (
  // @ts-expect-error – I have no idea why this fails like this.
  createSelector(
    (state) => state.rbacProvider.collectionTypesRelatedPermissions,
    (_, slug) => slug,
    (state, slug) => {
      const currentCTRelatedPermissions = slug ? state[slug] : {};
      if (!currentCTRelatedPermissions) {
        return { createPermissions: [], readPermissions: [] };
      }
      const readPermissions = currentCTRelatedPermissions["plugin::content-manager.explorer.read"] || [];
      const createPermissions = currentCTRelatedPermissions["plugin::content-manager.explorer.create"] || [];
      return { createPermissions, readPermissions };
    }
  )
);
const useContentTypePermissions = (slug) => {
  const selectContentTypePermissions = useMemo(makeSelectContentTypePermissions, []);
  return useTypedSelector((state) => selectContentTypePermissions(state, slug));
};
const cleanData = (data, { contentType, components }, initialLocalizations) => {
  const dataWithoutPasswordsAndRelations = removePasswordAndRelationsFieldFromData(
    data,
    contentType,
    components
  );
  const dataWithLocalizations = {
    ...dataWithoutPasswordsAndRelations,
    localizations: initialLocalizations
  };
  const cleanedClonedData = contentManagementUtilRemoveFieldsFromData(
    dataWithLocalizations,
    contentType,
    components,
    ["createdBy", "updatedBy", "publishedAt", "id", "updatedAt", "createdAt"]
  );
  return formatContentTypeData(cleanedClonedData, contentType, components);
};
const removePasswordAndRelationsFieldFromData = (data, contentTypeSchema, componentSchema) => {
  const recursiveCleanData = (datum, schemum) => {
    return Object.keys(datum).reduce((acc, current) => {
      const attribute = schemum.attributes[current] ?? { type: void 0 };
      if (attribute.type === "dynamiczone") {
        const value = datum[current];
        acc[current] = value.map((componentValue) => {
          const subCleanedData = recursiveCleanData(
            componentValue,
            componentSchema[componentValue.__component]
          );
          return subCleanedData;
        });
        return acc;
      } else if (attribute.type === "component") {
        const { repeatable, component } = attribute;
        if (repeatable) {
          const value = datum[current] ?? [];
          acc[current] = value.map((compoData) => {
            const subCleanedData = recursiveCleanData(compoData, componentSchema[component]);
            return subCleanedData;
          });
        } else {
          const value = datum[current] ?? {};
          acc[current] = recursiveCleanData(value, componentSchema[component]);
        }
        return acc;
      } else if (attribute.type !== "password" && attribute.type !== "relation") {
        acc[current] = datum[current];
      }
      return acc;
    }, {});
  };
  return recursiveCleanData(data, contentTypeSchema);
};
const getLocalizationsFromData = (entity) => typeof entity === "object" && entity !== null && "localizations" in entity && Array.isArray(entity.localizations) ? entity.localizations : [];
const CMEditViewCopyLocale = ({
  appLocales = [],
  currentLocale,
  localizations = [],
  readPermissions = []
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const dispatch = useTypedDispatch();
  const { allLayoutData, initialData, slug } = useCMEditViewDataManager();
  const { get: get2 } = useFetchClient();
  const options = React.useMemo(
    () => appLocales.filter(({ code }) => {
      return code !== currentLocale && localizations.findIndex(({ locale }) => locale === code) !== -1;
    }).filter(({ code }) => {
      return readPermissions.some(
        ({ properties }) => (properties?.locales ?? []).includes(code)
      );
    }).map((locale) => {
      const localization = localizations.find((loc) => locale.code === loc.locale);
      return {
        label: locale.name,
        value: localization.id
      };
    }),
    [appLocales, currentLocale, localizations, readPermissions]
  );
  const [value, setValue] = React.useState(options[0]?.value || "");
  if (localizations.length === 0) {
    return null;
  }
  const handleConfirmCopyLocale = async () => {
    if (!value) {
      handleToggle();
      return;
    }
    setIsLoading(true);
    try {
      const { data: response } = await get2(`/content-manager/collection-types/${slug}/${value}`);
      const cleanedData = cleanData(response, allLayoutData, localizations);
      ["createdBy", "updatedBy", "publishedAt", "id", "createdAt"].forEach((key) => {
        if (!initialData[key])
          return;
        cleanedData[key] = initialData[key];
      });
      dispatch({
        // @ts-expect-error – we've not added the CRUD reducer the redux store types yet.
        type: "ContentManager/CrudReducer/GET_DATA_SUCCEEDED",
        data: cleanedData,
        setModifiedDataOnly: true
      });
      toggleNotification({
        type: "success",
        message: {
          id: getTranslation("CMEditViewCopyLocale.copy-success"),
          defaultMessage: "Locale copied!"
        }
      });
    } catch (err) {
      console.error(err);
      toggleNotification({
        type: "warning",
        message: {
          id: getTranslation("CMEditViewCopyLocale.copy-failure"),
          defaultMessage: "Failed to copy locale"
        }
      });
    } finally {
      setIsLoading(false);
      handleToggle();
    }
  };
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      StyledTypography,
      {
        fontSize: 2,
        textColor: "primary600",
        as: "button",
        type: "button",
        onClick: handleToggle,
        children: /* @__PURE__ */ jsxs(Flex, { children: [
          /* @__PURE__ */ jsx(Duplicate, { width: "12px", height: "12px" }),
          formatMessage({
            id: getTranslation("CMEditViewCopyLocale.copy-text"),
            defaultMessage: "Fill in from another locale"
          })
        ] })
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(Dialog, { onClose: handleToggle, title: "Confirmation", isOpen, children: [
      /* @__PURE__ */ jsx(DialogBody, { icon: /* @__PURE__ */ jsx(ExclamationMarkCircle, {}), children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Typography, { textAlign: "center", id: "confirm-description", children: formatMessage({
          id: getTranslation("CMEditViewCopyLocale.ModalConfirm.content"),
          defaultMessage: "Your current content will be erased and filled by the content of the selected locale:"
        }) }) }),
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
          SingleSelect,
          {
            label: formatMessage({
              id: getTranslation("Settings.locales.modal.locales.label"),
              defaultMessage: "Locales"
            }),
            onChange: setValue,
            value,
            children: options.map(({ label, value: value2 }) => {
              return /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, children: label }, value2);
            })
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(
        DialogFooter,
        {
          startAction: /* @__PURE__ */ jsx(Button$1, { onClick: handleToggle, variant: "tertiary", children: formatMessage({
            id: "popUpWarning.button.cancel",
            defaultMessage: "No, cancel"
          }) }),
          endAction: /* @__PURE__ */ jsx(Button$1, { variant: "success", onClick: handleConfirmCopyLocale, loading: isLoading, children: formatMessage({
            id: getTranslation("CMEditViewCopyLocale.submit-text"),
            defaultMessage: "Yes, fill in"
          }) })
        }
      )
    ] })
  ] });
};
const StyledTypography = styled(Typography)`
  svg {
    margin-right: ${({ theme }) => theme.spaces[2]};
    fill: none;
    > g,
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const CMEditViewLocalePicker = ({
  appLocales = [],
  createPermissions = [],
  currentEntityId,
  currentLocale,
  localizations = [],
  readPermissions = []
}) => {
  const { formatMessage } = useIntl();
  const { hasDraftAndPublish, isSingleType, slug } = useCMEditViewDataManager();
  const [{ query }, setQuery] = useQueryParams({
    plugins: { i18n: { locale: currentLocale } }
  });
  const { push } = useHistory();
  const handleChange = (v) => {
    const value = String(v);
    if (value === currentLocale) {
      return;
    }
    const { status, id } = options.find((option) => {
      return option.value === value;
    });
    const defaultParams = {
      plugins: {
        ...query.plugins,
        i18n: { ...query.plugins?.i18n, locale: value }
      }
    };
    if (currentEntityId) {
      defaultParams.plugins.i18n.relatedEntityId = currentEntityId;
    }
    if (isSingleType) {
      setQuery(defaultParams);
      return;
    }
    if (status === "did-not-create-locale") {
      push({
        pathname: `/content-manager/collectionType/${slug}/create`,
        search: stringify(defaultParams, { encode: false })
      });
    } else {
      push({
        pathname: `/content-manager/collectionType/${slug}/${id}`,
        search: stringify(defaultParams, { encode: false })
      });
    }
  };
  const options = appLocales.map(({ name, code }) => {
    const matchingLocaleInData = localizations.find(({ locale }) => locale === code);
    let status = "did-not-create-locale";
    if (matchingLocaleInData) {
      status = matchingLocaleInData.publishedAt === null ? "draft" : "published";
    }
    return {
      id: matchingLocaleInData ? matchingLocaleInData.id : null,
      label: name,
      value: code,
      status
    };
  }).filter(({ status, value }) => {
    if (status === "did-not-create-locale") {
      return createPermissions.find(
        ({ properties }) => (properties?.locales ?? []).includes(value)
      );
    }
    return readPermissions.find(({ properties }) => (properties?.locales ?? []).includes(value));
  });
  if (!currentLocale) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    SingleSelect,
    {
      label: formatMessage({
        id: getTranslation("Settings.locales.modal.locales.label"),
        defaultMessage: "Locales"
      }),
      onChange: handleChange,
      value: currentLocale,
      children: options.map((option) => {
        return /* @__PURE__ */ jsx(
          SingleSelectOption,
          {
            value: option.value,
            startIcon: hasDraftAndPublish ? /* @__PURE__ */ jsx(Bullet, { status: option.status }) : null,
            children: option.label
          },
          option.value
        );
      })
    }
  );
};
const statusMap = {
  "did-not-create-locale": {
    backgroundColor: "neutral0",
    borderColor: "neutral500"
  },
  draft: {
    backgroundColor: "secondary700"
  },
  published: {
    backgroundColor: "success700"
  }
};
const statusToTitleMap = {
  draft: "content-manager.components.Select.draft-info-title",
  published: "content-manager.components.Select.publish-info-title",
  "did-not-create-locale": getTranslation("components.Select.locales.not-available")
};
const Bullet = ({ status }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(StyledBullet, { status, title: formatMessage({ id: statusToTitleMap[status] }) });
};
const StyledBullet = styled.div`
  width: ${pxToRem(6)};
  height: ${pxToRem(6)};
  border: ${({ theme, status }) => {
  const statusStyle = statusMap[status];
  if ("borderColor" in statusStyle) {
    return `1px solid ${theme.colors[statusStyle.borderColor]}`;
  }
  return "none";
}};
  background: ${({ theme, status }) => theme.colors[statusMap[status].backgroundColor]};
  border-radius: 50%;
  cursor: pointer;
`;
const CMEditViewInjectedComponents = () => {
  const { layout, modifiedData, slug } = useCMEditViewDataManager();
  const { createPermissions, readPermissions } = useContentTypePermissions(slug);
  const locales = useTypedSelector((state) => state.i18n_locales.locales);
  const params = useParams();
  const [{ query }] = useQueryParams();
  const { formatMessage } = useIntl();
  const currentEntityId = params.id ?? null;
  const defaultLocale = locales.find((loc) => loc.isDefault);
  const currentLocale = get(query, "plugins.i18n.locale", defaultLocale?.code);
  const hasI18nEnabled = get(layout, ["pluginOptions", "i18n", "localized"], false);
  if (!hasI18nEnabled) {
    return null;
  }
  if (!currentLocale) {
    return null;
  }
  const localizations = getLocalizationsFromData(modifiedData);
  return /* @__PURE__ */ jsxs(Box, { paddingTop: 6, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
      id: getTranslation("plugin.name"),
      defaultMessage: "Internationalization"
    }) }),
    /* @__PURE__ */ jsx(Divider, { unsetMargin: false, marginTop: 2, marginBottom: 4 }),
    /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
      /* @__PURE__ */ jsx(
        CMEditViewLocalePicker,
        {
          appLocales: locales,
          currentEntityId,
          createPermissions,
          localizations,
          readPermissions,
          currentLocale
        }
      ),
      /* @__PURE__ */ jsx(
        CMEditViewCopyLocale,
        {
          appLocales: locales,
          currentLocale,
          localizations,
          readPermissions
        }
      )
    ] })
  ] });
};
const useContentTypeHasI18n = () => {
  const pluginOptions = useTypedSelector(
    // @ts-expect-error – we've not typed the CM ListView yet.
    (state) => state["content-manager_listView"].contentType.pluginOptions
  );
  return pluginOptions?.i18n?.localized ?? false;
};
const Emphasis = (chunks) => {
  return /* @__PURE__ */ jsx(Typography, { fontWeight: "semiBold", textColor: "danger500", children: chunks });
};
const DeleteModalAdditionalInfo = () => {
  const hasI18nEnabled = useContentTypeHasI18n();
  const { formatMessage } = useIntl();
  if (!hasI18nEnabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(Typography, { textColor: "danger500", children: formatMessage(
    {
      id: getTranslation("Settings.list.actions.deleteAdditionalInfos"),
      defaultMessage: "This will delete the active locale versions <em>(from Internationalization)</em>"
    },
    {
      em: Emphasis
    }
  ) });
};
const PublishModalAdditionalInfo = () => {
  const hasI18nEnabled = useContentTypeHasI18n();
  const { formatMessage } = useIntl();
  if (!hasI18nEnabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(Typography, { textColor: "danger500", children: formatMessage(
    {
      id: getTranslation("Settings.list.actions.publishAdditionalInfos"),
      defaultMessage: "This will publish the active locale versions <em>(from Internationalization)</em>"
    },
    {
      em: Emphasis
    }
  ) });
};
const UnpublishModalAdditionalInfo = () => {
  const hasI18nEnabled = useContentTypeHasI18n();
  const { formatMessage } = useIntl();
  if (!hasI18nEnabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(Typography, { textColor: "danger500", children: formatMessage(
    {
      id: getTranslation("Settings.list.actions.unpublishAdditionalInfos"),
      defaultMessage: "This will unpublish the active locale versions <em>(from Internationalization)</em>"
    },
    {
      em: Emphasis
    }
  ) });
};
const RESOLVE_LOCALES = `${pluginId}/locales/resolve-locales`;
const ADD_LOCALE = `${pluginId}/locales/add`;
const DELETE_LOCALE = `${pluginId}/locales/delete`;
const UPDATE_LOCALE = `${pluginId}/locales/update`;
const useLocales = () => {
  const dispatch = useTypedDispatch();
  const toggleNotification = useNotification();
  const { isLoading, locales } = useTypedSelector((state) => state.i18n_locales);
  const { get: get2 } = useFetchClient();
  useEffect(() => {
    get2("/i18n/locales").then(({ data }) => {
      if (Array.isArray(data)) {
        dispatch({ type: RESOLVE_LOCALES, locales: data });
      }
    }).catch((err) => {
      if ("code" in err && err?.code === "ERR_CANCELED") {
        return;
      }
      toggleNotification({
        type: "warning",
        message: { id: "notification.error" }
      });
    });
  }, [dispatch, get2, toggleNotification]);
  return { locales, isLoading };
};
const Initializer = ({ setPlugin }) => {
  const { isLoading, locales } = useLocales();
  const ref = React.useRef();
  ref.current = setPlugin;
  React.useEffect(() => {
    if (!isLoading && locales.length > 0) {
      ref.current(pluginId);
    }
  }, [isLoading, locales]);
  return null;
};
function getLocaleFromQuery(query, defaultValue) {
  const locale = query?.plugins?.i18n?.locale;
  if (!locale && defaultValue) {
    return defaultValue;
  }
  return locale;
}
const getInitialLocale = (query, locales = []) => {
  const localeFromQuery = getLocaleFromQuery(query);
  if (localeFromQuery) {
    return locales.find((locale) => locale.code === localeFromQuery);
  }
  return locales.find((locale) => locale.isDefault);
};
const getDefaultLocale = (ctPermissions, locales = []) => {
  const defaultLocale = locales.find((locale) => locale.isDefault);
  if (!defaultLocale) {
    return null;
  }
  const readPermissions = ctPermissions["plugin::content-manager.explorer.read"] ?? [];
  const createPermissions = ctPermissions["plugin::content-manager.explorer.create"] ?? [];
  if (readPermissions.some(
    ({ properties }) => (properties?.locales ?? []).includes(defaultLocale.code)
  ) || createPermissions.some(
    ({ properties }) => (properties?.locales ?? []).includes(defaultLocale.code)
  )) {
    return defaultLocale.code;
  }
  return (readPermissions[0]?.properties?.locales?.[0] || createPermissions[0]?.properties?.locales?.[0]) ?? null;
};
const LocalePicker = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const locales = useTypedSelector((state) => state.i18n_locales.locales);
  const [{ query }, setQuery] = useQueryParams();
  const match = useRouteMatch("/content-manager/collectionType/:slug");
  const isContentTypeLocalized = useContentTypeHasI18n();
  const { createPermissions, readPermissions } = useContentTypePermissions(match?.params.slug);
  const initialLocale = getInitialLocale(query, locales);
  const [selected, setSelected] = useState(initialLocale?.code || "");
  if (!isContentTypeLocalized) {
    return null;
  }
  if (!locales || locales.length === 0) {
    return null;
  }
  const displayedLocales = locales.filter((locale) => {
    const canCreate = createPermissions.some(
      ({ properties }) => (properties?.locales ?? []).includes(locale.code)
    );
    const canRead = readPermissions.some(
      ({ properties }) => (properties?.locales ?? []).includes(locale.code)
    );
    return canCreate || canRead;
  });
  const handleChange = (code) => {
    if (code === selected) {
      return;
    }
    setSelected(code);
    dispatch({ type: "ContentManager/RBACManager/RESET_PERMISSIONS" });
    setQuery({
      page: 1,
      plugins: { ...query.plugins, i18n: { locale: code } }
    });
  };
  return /* @__PURE__ */ jsx(
    SingleSelect,
    {
      size: "S",
      "aria-label": formatMessage({
        id: getTranslation("actions.select-locale"),
        defaultMessage: "Select locale"
      }),
      value: selected,
      onChange: handleChange,
      children: displayedLocales.map((locale) => /* @__PURE__ */ jsx(SingleSelectOption, { value: locale.code, children: locale.name }, locale.id))
    }
  );
};
const PERMISSIONS = {
  accessMain: [{ action: "plugin::i18n.locale.read", subject: null }],
  create: [{ action: "plugin::i18n.locale.create", subject: null }],
  delete: [{ action: "plugin::i18n.locale.delete", subject: null }],
  update: [{ action: "plugin::i18n.locale.update", subject: null }],
  read: [{ action: "plugin::i18n.locale.read", subject: null }]
};
const LOCALIZED_FIELDS = [
  "biginteger",
  "boolean",
  "component",
  "date",
  "datetime",
  "decimal",
  "dynamiczone",
  "email",
  "enumeration",
  "float",
  "integer",
  "json",
  "media",
  "number",
  "password",
  "richtext",
  "blocks",
  "string",
  "text",
  "time"
];
const doesPluginOptionsHaveI18nLocalized = (opts) => typeof opts === "object" && opts !== null && "i18n" in opts && typeof opts.i18n === "object" && opts.i18n !== null && "localized" in opts.i18n && typeof opts.i18n.localized === "boolean";
const addLocaleToLinksHook = (type) => (args, store) => {
  const links = type === "collectionType" ? args.ctLinks : args.stLinks;
  if (links.length === 0) {
    return args;
  }
  const storeState = store.getState();
  const { locales } = storeState.i18n_locales;
  const { collectionTypesRelatedPermissions } = storeState.rbacProvider;
  const mutatedLinks = addLocaleToLinksSearch(
    links,
    type,
    args.models,
    locales,
    collectionTypesRelatedPermissions
  );
  return type === "collectionType" ? { ctLinks: mutatedLinks, models: args.models } : { stLinks: mutatedLinks, models: args.models };
};
const addLocaleToLinksSearch = (links, kind, contentTypeSchemas, locales, permissions) => {
  return links.map((link) => {
    const contentTypeUID = link.to.split(`/${kind}/`)[1];
    const contentTypeSchema = contentTypeSchemas.find(({ uid }) => uid === contentTypeUID);
    const hasI18nEnabled = doesPluginOptionsHaveI18nLocalized(contentTypeSchema?.pluginOptions) ? contentTypeSchema?.pluginOptions.i18n.localized : false;
    if (!hasI18nEnabled) {
      return link;
    }
    const contentTypePermissions = permissions[contentTypeUID];
    const requiredPermissionsToViewALink = kind === "collectionType" ? ["plugin::content-manager.explorer.read", "plugin::content-manager.explorer.create"] : ["plugin::content-manager.explorer.read"];
    const contentTypeNeededPermissions = Object.keys(contentTypePermissions).reduce((acc, current) => {
      if (requiredPermissionsToViewALink.includes(current)) {
        acc[current] = contentTypePermissions[current];
        return acc;
      }
      acc[current] = [];
      return acc;
    }, {});
    const defaultLocale = getDefaultLocale(contentTypeNeededPermissions, locales);
    if (!defaultLocale) {
      return { ...link, isDisplayed: false };
    }
    const linkParams = link.search ? parse(link.search) : {};
    const params = linkParams ? {
      ...linkParams,
      plugins: {
        // TODO: can this be made "prettier"?
        ...typeof linkParams.plugins === "object" && linkParams.plugins !== null ? linkParams.plugins : {},
        i18n: { locale: defaultLocale }
      }
    } : { plugins: { i18n: { locale: defaultLocale } } };
    const search = stringify(params, { encode: false });
    return { ...link, search };
  });
};
const mutateEditViewLayoutHook = ({ layout, query }) => {
  const { contentType, components } = layout;
  const hasI18nEnabled = doesPluginOptionsHaveI18nLocalized(contentType.pluginOptions) ? contentType.pluginOptions.i18n.localized : false;
  if (!hasI18nEnabled) {
    return { layout, query };
  }
  const currentLocale = query?.plugins?.i18n?.locale ?? null;
  if (!currentLocale) {
    return { layout, query };
  }
  return {
    query,
    layout: {
      ...layout,
      contentType: {
        ...layout.contentType,
        layouts: {
          ...contentType.layouts,
          edit: enhanceEditLayout(contentType.layouts.edit, currentLocale)
        }
      },
      components: enhanceComponentsLayout(components, currentLocale)
    }
  };
};
const enhanceEditLayout = (layout, currentLocale) => layout.map(
  (row) => row.map((field) => {
    const type = field?.fieldSchema?.type ?? null;
    const hasI18nEnabled = isFieldLocalized(field) ?? ["uid", "relation"].includes(type);
    const labelActionProps = {
      title: {
        id: hasI18nEnabled ? getTranslation("Field.localized") : getTranslation("Field.not-localized"),
        defaultMessage: hasI18nEnabled ? "This value is unique for the selected locale" : "This value is common to all locales"
      },
      icon: hasI18nEnabled ? /* @__PURE__ */ jsx(Earth, {}) : /* @__PURE__ */ jsx(EarthStriked, {})
    };
    const labelAction = /* @__PURE__ */ jsx(LabelAction, { ...labelActionProps });
    if (isFieldRelation(field) && isFieldLocalized(field)) {
      return {
        ...field,
        labelAction,
        queryInfos: {
          ...field.queryInfos,
          defaultParams: { ...field.queryInfos.defaultParams, locale: currentLocale },
          paramsToKeep: ["plugins.i18n.locale"]
        }
      };
    }
    return { ...field, labelAction };
  }, [])
);
const isFieldRelation = (field) => field.fieldSchema.type === "relation";
const isFieldLocalized = (field) => {
  if (isFieldRelation(field)) {
    return doesPluginOptionsHaveI18nLocalized(field.targetModelPluginOptions) ? field.targetModelPluginOptions.i18n.localized : false;
  } else {
    return doesPluginOptionsHaveI18nLocalized(field.fieldSchema.pluginOptions) ? field.fieldSchema.pluginOptions.i18n.localized : false;
  }
};
const enhanceComponentsLayout = (components, locale) => {
  return Object.keys(components).reduce((acc, current) => {
    const currentComponentLayout = components[current];
    const enhancedEditLayout = enhanceComponentLayoutForRelations(
      currentComponentLayout.layouts.edit,
      locale
    );
    acc[current] = {
      ...currentComponentLayout,
      layouts: { ...currentComponentLayout.layouts, edit: enhancedEditLayout }
    };
    return acc;
  }, {});
};
const enhanceComponentLayoutForRelations = (layout, locale) => layout.map(
  (row) => row.map((field) => {
    if (isFieldRelation(field) && isFieldLocalized(field)) {
      return {
        ...field,
        queryInfos: {
          ...field.queryInfos,
          defaultParams: { ...field.queryInfos.defaultParams, locale },
          paramsToKeep: ["plugins.i18n.locale"]
        }
      };
    }
    return field;
  })
);
const LabelAction = ({ title, icon }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Tooltip, { description: formatMessage(title), children: /* @__PURE__ */ jsxs(Span, { as: "span", children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { as: "span", children: `(${formatMessage(title)})` }),
    React.cloneElement(icon, {
      "aria-hidden": true,
      focusable: false
      // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
    })
  ] }) });
};
const Span = styled(Flex)`
  svg {
    width: 12px;
    height: 12px;

    fill: ${({ theme }) => theme.colors.neutral500};

    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const LocaleListCell = ({
  localizations = [],
  locale: currentLocaleCode,
  id
}) => {
  const [visible, setVisible] = React.useState(false);
  const buttonRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const locales = useTypedSelector((state) => state.i18n_locales.locales);
  const defaultLocale = locales.find((locale) => locale.isDefault);
  const allLocalizations = [{ locale: currentLocaleCode }, ...localizations];
  const localizationNames = allLocalizations.map((locale) => locale.locale);
  const hasDefaultLocale = defaultLocale ? localizationNames.includes(defaultLocale.code) : false;
  const ctLocales = hasDefaultLocale ? localizationNames.filter((locale) => locale !== defaultLocale?.code) : localizationNames;
  const ctLocalesAsNames = ctLocales.map(
    (locale) => locales.find(({ code }) => code === locale)?.name ?? locale
  );
  ctLocalesAsNames.sort();
  const ctLocalesNamesWithDefault = hasDefaultLocale ? [`${defaultLocale?.name} (default)`, ...ctLocalesAsNames] : ctLocalesAsNames;
  const localesArray = ctLocalesNamesWithDefault;
  const handleTogglePopover = () => setVisible((prev) => !prev);
  const elId = `entry-${id}__locale`;
  const localesNames = localesArray.join(", ");
  return /* @__PURE__ */ jsx(Flex, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(
    Tooltip,
    {
      label: formatMessage({
        id: getTranslation("CMListView.popover.display-locales.label"),
        defaultMessage: "Display translated locales"
      }),
      children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleTogglePopover, ref: buttonRef, children: /* @__PURE__ */ jsxs(ActionWrapper, { alignItems: "center", justifyContent: "center", height: "2rem", width: "2rem", children: [
        /* @__PURE__ */ jsx(
          Typography,
          {
            style: { maxWidth: "252px", cursor: "pointer" },
            "data-for": elId,
            "data-tip": localesNames,
            textColor: "neutral800",
            ellipsis: true,
            children: localesNames
          }
        ),
        /* @__PURE__ */ jsxs(Flex, { children: [
          /* @__PURE__ */ jsx(SortIcon, {}),
          visible && /* @__PURE__ */ jsx(
            Popover,
            {
              onDismiss: handleTogglePopover,
              source: buttonRef,
              spacing: 16,
              centered: true,
              children: /* @__PURE__ */ jsx("ul", { children: localesArray.map((name) => /* @__PURE__ */ jsx(Box, { padding: 3, as: "li", children: /* @__PURE__ */ jsx(Typography, { children: name }) }, name)) })
            }
          )
        ] })
      ] }) })
    }
  ) });
};
const Button = styled.button`
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
      }
    }
  }
`;
const ActionWrapper = styled(Flex)`
  svg {
    height: ${4 / 16}rem;
  }
`;
const addColumnToTableHook = ({ displayedHeaders, layout }) => {
  const { contentType } = layout;
  const isFieldLocalized2 = doesPluginOptionsHaveI18nLocalized(contentType.pluginOptions) ? contentType.pluginOptions.i18n.localized : false;
  if (!isFieldLocalized2) {
    return { displayedHeaders, layout };
  }
  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        key: "__locale_key__",
        fieldSchema: { type: "string" },
        metadatas: { label: "Content available in", searchable: false, sortable: false },
        name: "locales",
        cellFormatter: (props) => /* @__PURE__ */ jsx(LocaleListCell, { ...props })
      }
    ],
    layout
  };
};
const addCommonFieldsToInitialDataMiddleware = () => ({ getState, dispatch }) => (next) => (action) => {
  if (action.type !== "ContentManager/CrudReducer/INIT_FORM") {
    return next(action);
  }
  if (!action.rawQuery) {
    return next(action);
  }
  const search = action.rawQuery.substring(1);
  const query = parse(search);
  const relatedEntityId = get(query, "plugins.i18n.relatedEntityId", void 0);
  const locale = get(query, "plugins.i18n.locale", void 0);
  const isSingleType = action.isSingleType;
  if (!relatedEntityId && !isSingleType) {
    return next(action);
  }
  const store = getState();
  const cmDataStore = store["content-manager_editViewCrudReducer"];
  const cmLayoutStore = store["content-manager_editViewLayoutManager"];
  const { contentTypeDataStructure } = cmDataStore;
  const { currentLayout } = cmLayoutStore;
  const getData = async () => {
    if (!isParsedParamUndefinedOrString(relatedEntityId) || !isParsedParamUndefinedOrString(locale)) {
      return;
    }
    dispatch({ type: "ContentManager/CrudReducer/GET_DATA" });
    const defaultDataStructure = cloneDeep(contentTypeDataStructure);
    try {
      const { data } = await getFetchClient().post(`/${pluginId}/content-manager/actions/get-non-localized-fields`, {
        model: currentLayout.contentType.uid,
        id: relatedEntityId,
        locale
      });
      const { nonLocalizedFields, localizations } = data;
      const merged = merge(defaultDataStructure, nonLocalizedFields);
      const fieldsToRemove = [
        "createdBy",
        "updatedBy",
        "publishedAt",
        "id",
        "_id",
        "updatedAt",
        "createdAt"
      ];
      const cleanedMerged = contentManagementUtilRemoveFieldsFromData(
        merged,
        currentLayout.contentType,
        currentLayout.components,
        fieldsToRemove
      );
      cleanedMerged.localizations = localizations;
      action.data = formatContentTypeData(
        cleanedMerged,
        currentLayout.contentType,
        currentLayout.components
      );
    } catch (err) {
    }
    return next(action);
  };
  return getData();
};
const isParsedParamUndefinedOrString = (param) => typeof param === "string" || param === void 0;
const extendCTBAttributeInitialDataMiddleware = () => {
  return ({ getState }) => (next) => (action) => {
    const enhanceAction = () => {
      try {
        const store = getState();
        const hasi18nEnabled = get(
          store,
          [
            "content-type-builder_dataManagerProvider",
            "modifiedData",
            "contentType",
            "schema",
            "pluginOptions",
            "i18n",
            "localized"
          ],
          false
        );
        if (hasi18nEnabled) {
          const pluginOptions = action.options ? { ...action.options.pluginOptions, i18n: { localized: true } } : { i18n: { localized: true } };
          return next({
            ...action,
            options: {
              pluginOptions
            }
          });
        }
        return next(action);
      } catch (err) {
        return next(action);
      }
    };
    if (action.type === "ContentTypeBuilder/FormModal/SET_ATTRIBUTE_DATA_SCHEMA" && action.forTarget === "contentType" && !["relation", "component"].includes(action.attributeType) && !action.isEditing) {
      return enhanceAction();
    }
    if (action.type === "ContentTypeBuilder/FormModal/SET_CUSTOM_FIELD_DATA_SCHEMA" && action.forTarget === "contentType" && !action.isEditing) {
      return enhanceAction();
    }
    if ((action.type === "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO" || action.type === "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SAVE_CURRENT_DATA") && action.forTarget === "contentType") {
      return enhanceAction();
    }
    return next(action);
  };
};
const extendCTBInitialDataMiddleware = () => {
  return () => (next) => (action) => {
    if (action.type === "ContentTypeBuilder/FormModal/SET_DATA_TO_EDIT" && action.modalType === "contentType") {
      const i18n = { localized: false };
      const pluginOptions = action.data.pluginOptions ? { ...action.data.pluginOptions, i18n } : { i18n };
      const data = { ...action.data, pluginOptions };
      if (action.actionType === "create") {
        return next({ ...action, data });
      }
      if (!action.data.pluginOptions?.i18n?.localized) {
        return next({ ...action, data });
      }
    }
    return next(action);
  };
};
const localePermissionMiddleware = () => () => (next) => (action) => {
  if (action.type !== "ContentManager/RBACManager/SET_PERMISSIONS") {
    return next(action);
  }
  const containerName = get(action, "__meta__.containerName", null);
  if (!["editView", "listView"].includes(containerName)) {
    return next(action);
  }
  const locale = get(action, "__meta__.plugins.i18n.locale", null);
  if (!locale) {
    return next(action);
  }
  const permissions = action.permissions;
  const nextPermissions = Object.keys(permissions).reduce(
    (acc, key) => {
      const currentPermission = permissions[key];
      const filteredPermissions = currentPermission.filter(
        (permission) => (permission.properties?.locales ?? []).indexOf(locale) !== -1
      );
      if (filteredPermissions.length) {
        acc[key] = filteredPermissions;
      }
      return acc;
    },
    {}
  );
  return next({ ...action, permissions: nextPermissions });
};
const initialState = {
  isLoading: true,
  locales: []
};
const localeReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case RESOLVE_LOCALES: {
      draftState.isLoading = false;
      draftState.locales = action.locales;
      break;
    }
    case ADD_LOCALE: {
      if (action.newLocale.isDefault) {
        draftState.locales.forEach((locale) => {
          locale.isDefault = false;
        });
      }
      draftState.locales.push(action.newLocale);
      break;
    }
    case DELETE_LOCALE: {
      const locales = draftState.locales.filter((locale) => locale.id !== action.id);
      set(draftState, "locales", locales);
      break;
    }
    case UPDATE_LOCALE: {
      if (action.editedLocale.isDefault) {
        draftState.locales.forEach((locale) => {
          locale.isDefault = false;
        });
      }
      const indexToEdit = draftState.locales.findIndex(
        (locale) => locale.id === action.editedLocale.id
      );
      set(draftState.locales, indexToEdit, action.editedLocale);
      break;
    }
    default:
      return draftState;
  }
  return draftState;
});
const reducers = {
  [`${pluginId}_locales`]: localeReducer
};
const mutateCTBContentTypeSchema = (nextSchema, prevSchema) => {
  if (!doesPluginOptionsHaveI18nLocalized(nextSchema.pluginOptions)) {
    return nextSchema;
  }
  const isNextSchemaLocalized = nextSchema.pluginOptions.i18n.localized;
  const isPrevSchemaLocalized = doesPluginOptionsHaveI18nLocalized(
    prevSchema?.schema?.pluginOptions
  ) ? prevSchema?.schema?.pluginOptions.i18n.localized : false;
  if (isNextSchemaLocalized && isPrevSchemaLocalized) {
    return nextSchema;
  }
  if (isNextSchemaLocalized) {
    const attributes = addLocalisationToFields(nextSchema.attributes);
    return { ...nextSchema, attributes };
  }
  if (!isNextSchemaLocalized) {
    const pluginOptions = omit(nextSchema.pluginOptions, "i18n");
    const attributes = disableAttributesLocalisation(nextSchema.attributes);
    return { ...nextSchema, pluginOptions, attributes };
  }
  return nextSchema;
};
const addLocalisationToFields = (attributes) => Object.keys(attributes).reduce((acc, current) => {
  const currentAttribute = attributes[current];
  if (LOCALIZED_FIELDS.includes(currentAttribute.type)) {
    const i18n = { localized: true };
    const pluginOptions = currentAttribute.pluginOptions ? { ...currentAttribute.pluginOptions, i18n } : { i18n };
    acc[current] = { ...currentAttribute, pluginOptions };
    return acc;
  }
  acc[current] = currentAttribute;
  return acc;
}, {});
const disableAttributesLocalisation = (attributes) => Object.keys(attributes).reduce((acc, current) => {
  acc[current] = omit(attributes[current], "pluginOptions.i18n");
  return acc;
}, {});
const index = {
  register(app) {
    app.addMiddlewares([
      addCommonFieldsToInitialDataMiddleware,
      extendCTBAttributeInitialDataMiddleware,
      extendCTBInitialDataMiddleware,
      localePermissionMiddleware
    ]);
    app.addReducers(reducers);
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: pluginId
    });
  },
  bootstrap(app) {
    app.registerHook(
      "Admin/CM/pages/App/mutate-collection-types-links",
      addLocaleToLinksHook("collectionType")
    );
    app.registerHook(
      "Admin/CM/pages/App/mutate-single-types-links",
      addLocaleToLinksHook("singleType")
    );
    app.registerHook("Admin/CM/pages/ListView/inject-column-in-table", addColumnToTableHook);
    app.registerHook("Admin/CM/pages/EditView/mutate-edit-view-layout", mutateEditViewLayoutHook);
    app.addSettingsLink("global", {
      intlLabel: {
        id: getTranslation("plugin.name"),
        defaultMessage: "Internationalization"
      },
      id: "internationalization",
      to: "/settings/internationalization",
      async Component() {
        const { ProtectedSettingsPage } = await import("./SettingsPage-7e67da66.mjs");
        return ProtectedSettingsPage;
      },
      permissions: PERMISSIONS.accessMain
    });
    app.injectContentManagerComponent("editView", "informations", {
      name: "i18n-locale-filter-edit-view",
      Component: CMEditViewInjectedComponents
    });
    app.injectContentManagerComponent("listView", "actions", {
      name: "i18n-locale-filter",
      Component: LocalePicker
    });
    app.injectContentManagerComponent("listView", "deleteModalAdditionalInfos", {
      name: "i18n-delete-bullets-in-modal",
      Component: DeleteModalAdditionalInfo
    });
    app.injectContentManagerComponent("listView", "publishModalAdditionalInfos", {
      name: "i18n-publish-bullets-in-modal",
      Component: PublishModalAdditionalInfo
    });
    app.injectContentManagerComponent("listView", "unpublishModalAdditionalInfos", {
      name: "i18n-unpublish-bullets-in-modal",
      Component: UnpublishModalAdditionalInfo
    });
    const ctbPlugin = app.getPlugin("content-type-builder");
    if (ctbPlugin) {
      const ctbFormsAPI = ctbPlugin.apis.forms;
      ctbFormsAPI.addContentTypeSchemaMutation(mutateCTBContentTypeSchema);
      ctbFormsAPI.components.add({ id: "checkboxConfirmation", component: CheckboxConfirmation });
      ctbFormsAPI.extendContentType({
        validator: () => ({
          i18n: yup.object().shape({
            localized: yup.bool()
          })
        }),
        form: {
          advanced() {
            return [
              {
                name: "pluginOptions.i18n.localized",
                description: {
                  id: getTranslation("plugin.schema.i18n.localized.description-content-type"),
                  defaultMessage: "Allows translating an entry into different languages"
                },
                type: "checkboxConfirmation",
                intlLabel: {
                  id: getTranslation("plugin.schema.i18n.localized.label-content-type"),
                  defaultMessage: "Localization"
                }
              }
            ];
          }
        }
      });
      ctbFormsAPI.extendFields(LOCALIZED_FIELDS, {
        validator: (args) => ({
          i18n: yup.object().shape({
            localized: yup.bool().test({
              name: "ensure-unique-localization",
              message: getTranslation("plugin.schema.i18n.ensure-unique-localization"),
              test(value) {
                if (value === void 0 || value) {
                  return true;
                }
                const unique = get(args, ["3", "modifiedData", "unique"], null);
                if (unique && !value) {
                  return false;
                }
                return true;
              }
            })
          })
        }),
        form: {
          advanced({ contentTypeSchema, forTarget, type, step }) {
            if (forTarget !== "contentType") {
              return [];
            }
            const hasI18nEnabled = get(
              contentTypeSchema,
              ["schema", "pluginOptions", "i18n", "localized"],
              false
            );
            if (!hasI18nEnabled) {
              return [];
            }
            if (type === "component" && step === "1") {
              return [];
            }
            return [
              {
                name: "pluginOptions.i18n.localized",
                description: {
                  id: getTranslation("plugin.schema.i18n.localized.description-field"),
                  defaultMessage: "The field can have different values in each locale"
                },
                type: "checkbox",
                intlLabel: {
                  id: getTranslation("plugin.schema.i18n.localized.label-field"),
                  defaultMessage: "Enable localization for this field"
                }
              }
            ];
          }
        }
      });
    }
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/de.json": () => import("./de-69cc32ef.mjs"), "./translations/dk.json": () => import("./dk-2db8954e.mjs"), "./translations/en.json": () => import("./en-4364b792.mjs"), "./translations/es.json": () => import("./es-de0bd8b9.mjs"), "./translations/fr.json": () => import("./fr-83186589.mjs"), "./translations/ko.json": () => import("./ko-f7a8555f.mjs"), "./translations/pl.json": () => import("./pl-51b1a117.mjs"), "./translations/ru.json": () => import("./ru-936d7d35.mjs"), "./translations/tr.json": () => import("./tr-ed2c4614.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-5f3e882e.mjs"), "./translations/zh.json": () => import("./zh-188e99a9.mjs") }), `./translations/${locale}.json`).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
export {
  ADD_LOCALE as A,
  DELETE_LOCALE as D,
  PERMISSIONS as P,
  UPDATE_LOCALE as U,
  useTypedDispatch as a,
  getTranslation as g,
  index as i,
  useLocales as u
};
//# sourceMappingURL=index-75c1721f.mjs.map
