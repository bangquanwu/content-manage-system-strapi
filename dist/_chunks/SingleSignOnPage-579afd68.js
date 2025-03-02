"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const axios = require("axios");
const formik = require("formik");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const yup = require("yup");
const useAdminRoles = require("./useAdminRoles-485a39e5.js");
const index = require("./index-be8080e3.js");
require("react");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-router-dom");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("lodash/camelCase");
require("styled-components");
require("lodash/defaultsDeep");
require("lodash/omit");
require("qs");
require("immer");
require("lodash/get");
require("lodash/set");
require("@reduxjs/toolkit");
require("react-dnd");
require("react-dnd-html5-backend");
require("react-window");
require("react-error-boundary");
require("lodash/cloneDeep");
require("lodash/isEqual");
require("lodash/upperFirst");
require("prop-types");
require("lodash/size");
require("lodash/isNaN");
require("lodash/take");
require("slate");
require("slate-history");
require("slate-react");
require("@radix-ui/react-toolbar");
require("codemirror5");
require("sanitize-html");
require("highlight.js");
require("markdown-it");
require("markdown-it-abbr");
require("markdown-it-container");
require("markdown-it-deflist");
require("markdown-it-emoji");
require("markdown-it-footnote");
require("markdown-it-ins");
require("markdown-it-mark");
require("markdown-it-sub");
require("markdown-it-sup");
require("codemirror5/addon/display/placeholder");
require("lodash/toString");
require("lodash/isEmpty");
require("react-dom");
require("lodash/isBoolean");
require("lodash/toNumber");
require("fractional-indexing");
require("lodash/uniqBy");
require("lodash/unset");
require("lodash/isArray");
require("date-fns/parseISO");
require("lodash/isNumber");
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const schema = yup__namespace.object().shape({
  autoRegister: yup__namespace.bool().required(helperPlugin.translatedErrors.required),
  defaultRole: yup__namespace.mixed().when("autoRegister", (value, initSchema) => {
    return value ? initSchema.required(helperPlugin.translatedErrors.required) : initSchema.nullable();
  }),
  ssoLockedRoles: yup__namespace.array().nullable().of(
    yup__namespace.mixed().when("ssoLockedRoles", (value, initSchema) => {
      return value ? initSchema.required(helperPlugin.translatedErrors.required) : initSchema.nullable();
    })
  )
});
const SingleSignOnPage = () => {
  helperPlugin.useFocusWhenNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const toggleNotification = helperPlugin.useNotification();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const { get, put } = helperPlugin.useFetchClient();
  const { isLoading: isLoadingProviderOptions, data } = reactQuery.useQuery(
    ["providers", "options"],
    async () => {
      const { data: data2 } = await get("/admin/providers/options");
      return data2.data;
    },
    {
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error", defaultMessage: "An error occured" }
        });
      }
    }
  );
  const submitMutation = reactQuery.useMutation(
    async (body) => {
      const { autoRegister, defaultRole, ssoLockedRoles } = body;
      const { data: data2 } = await put("/admin/providers/options", {
        autoRegister,
        defaultRole,
        ssoLockedRoles
      });
      return data2.data;
    },
    {
      async onSettled() {
        unlockApp();
      }
    }
  );
  const {
    isLoading: isLoadingPermissions,
    allowedActions: { canUpdate, canReadRoles }
  } = helperPlugin.useRBAC({
    ...permissions.settings?.sso,
    readRoles: permissions.settings?.roles.read ?? []
  });
  const { roles, isLoading: isLoadingRoles } = useAdminRoles.useAdminRoles(void 0, {
    enabled: canReadRoles
  });
  const handleSubmit = async (body, { resetForm, setErrors }) => {
    lockApp();
    submitMutation.mutate(body, {
      onSuccess(data2) {
        resetForm({ values: data2 });
        toggleNotification({
          type: "success",
          message: { id: "notification.success.saved" }
        });
      },
      onError(err) {
        if (err instanceof axios.AxiosError && err.response) {
          const errors = index.formatAPIErrors(err.response.data);
          const fieldsErrors = Object.keys(errors).reduce((acc, current) => {
            acc[current] = errors[current].id;
            return acc;
          }, {});
          setErrors(fieldsErrors);
          toggleNotification({
            type: "warning",
            // @ts-expect-error formatAPIError is waiting for "err" to be AxiosError<{ error: ApiError }> while few lines above we need error.data there's a conflict between these two functions
            message: formatAPIError(err)
          });
        }
      }
    });
  };
  const { isLoading: isSubmittingForm } = submitMutation;
  const initialValues = {
    autoRegister: false,
    defaultRole: null,
    ssoLockedRoles: null
  };
  const isLoadingData = isLoadingRoles || isLoadingPermissions || isLoadingProviderOptions;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Layout, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "SSO" }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { "aria-busy": isSubmittingForm || isLoadingData, tabIndex: -1, children: /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        onSubmit: handleSubmit,
        initialValues: data || initialValues,
        validationSchema: schema,
        validateOnChange: false,
        enableReinitialize: true,
        children: ({ handleChange, isSubmitting, values, setFieldValue, dirty, errors }) => /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.HeaderLayout,
            {
              primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  "data-testid": "save-button",
                  disabled: !dirty,
                  loading: isSubmitting,
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}),
                  type: "submit",
                  size: "L",
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              ),
              title: formatMessage({
                id: "Settings.sso.title",
                defaultMessage: "Single Sign-On"
              }),
              subtitle: formatMessage({
                id: "Settings.sso.description",
                defaultMessage: "Configure the settings for the Single Sign-On feature."
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: isSubmitting || isLoadingData ? /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) : /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Flex,
            {
              direction: "column",
              alignItems: "stretch",
              gap: 4,
              background: "neutral0",
              padding: 6,
              shadow: "filterShadow",
              hasRadius: true,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
                  id: "global.settings",
                  defaultMessage: "Settings"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.ToggleInput,
                    {
                      "data-testid": "autoRegister",
                      disabled: !canUpdate,
                      checked: values.autoRegister,
                      hint: formatMessage({
                        id: "Settings.sso.form.registration.description",
                        defaultMessage: "Create new user on SSO login if no account exists"
                      }),
                      label: formatMessage({
                        id: "Settings.sso.form.registration.label",
                        defaultMessage: "Auto-registration"
                      }),
                      name: "autoRegister",
                      offLabel: formatMessage({
                        id: "app.components.ToggleCheckbox.off-label",
                        defaultMessage: "Off"
                      }),
                      onLabel: formatMessage({
                        id: "app.components.ToggleCheckbox.on-label",
                        defaultMessage: "On"
                      }),
                      onChange: handleChange
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Select,
                    {
                      disabled: !canUpdate,
                      hint: formatMessage({
                        id: "Settings.sso.form.defaultRole.description",
                        defaultMessage: "It will attach the new authenticated user to the selected role"
                      }),
                      error: errors.defaultRole ? formatMessage({
                        id: errors.defaultRole,
                        defaultMessage: errors.defaultRole
                      }) : "",
                      label: formatMessage({
                        id: "Settings.sso.form.defaultRole.label",
                        defaultMessage: "Default role"
                      }),
                      name: "defaultRole",
                      onChange: (value) => handleChange({ target: { name: "defaultRole", value } }),
                      placeholder: formatMessage({
                        id: "components.InputSelect.option.placeholder",
                        defaultMessage: "Choose here"
                      }),
                      value: values.defaultRole,
                      children: roles.map(({ id, name }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Option, { value: id.toString(), children: name }, id))
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.MultiSelect,
                    {
                      disabled: !canUpdate,
                      hint: formatMessage({
                        id: "Settings.sso.form.localAuthenticationLock.description",
                        defaultMessage: "Select the roles for which you want to disable the local authentication"
                      }),
                      error: errors.ssoLockedRoles ? formatMessage({
                        id: errors.ssoLockedRoles,
                        defaultMessage: errors.ssoLockedRoles
                      }) : "",
                      label: formatMessage({
                        id: "Settings.sso.form.localAuthenticationLock.label",
                        defaultMessage: "Local authentication lock-out"
                      }),
                      name: "ssoLockedRoles",
                      onChange: (value) => handleChange({
                        target: {
                          value,
                          name: "ssoLockedRoles"
                        }
                      }),
                      placeholder: formatMessage({
                        id: "components.InputSelect.option.placeholder",
                        defaultMessage: "Choose here"
                      }),
                      onClear: () => setFieldValue("ssoLockedRoles", []),
                      value: values.ssoLockedRoles || [],
                      withTags: true,
                      children: roles.map(({ id, name }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.MultiSelectOption, { value: id.toString(), children: name }, id))
                    }
                  ) })
                ] })
              ]
            }
          ) })
        ] })
      }
    ) })
  ] });
};
const ProtectedSSO = () => {
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.sso.main, children: /* @__PURE__ */ jsxRuntime.jsx(SingleSignOnPage, {}) });
};
exports.ProtectedSSO = ProtectedSSO;
exports.SingleSignOnPage = SingleSignOnPage;
//# sourceMappingURL=SingleSignOnPage-579afd68.js.map
