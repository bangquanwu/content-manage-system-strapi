"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const icons = require("@strapi/icons");
const upperFirst = require("lodash/upperFirst");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const v2 = require("@strapi/design-system/v2");
const formik = require("formik");
const PropTypes = require("prop-types");
const index = require("./index-00c72e10.js");
require("lodash/isEmpty");
const yup = require("yup");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
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
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const upperFirst__default = /* @__PURE__ */ _interopDefault(upperFirst);
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const Input = ({
  description,
  disabled,
  intlLabel,
  error,
  name,
  onChange,
  placeholder,
  providerToEditName,
  type,
  value
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const inputValue = name === "noName" ? `${window.strapi.backendURL}/api/connect/${providerToEditName}/callback` : value;
  const label = formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { provider: providerToEditName, ...intlLabel.values }
  );
  const hint = description ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { provider: providerToEditName, ...description.values }
  ) : "";
  if (type === "bool") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.ToggleInput,
      {
        "aria-label": name,
        checked: value,
        disabled,
        hint,
        label,
        name,
        offLabel: formatMessage({
          id: "app.components.ToggleCheckbox.off-label",
          defaultMessage: "Off"
        }),
        onLabel: formatMessage({
          id: "app.components.ToggleCheckbox.on-label",
          defaultMessage: "On"
        }),
        onChange: (e) => {
          onChange({ target: { name, value: e.target.checked } });
        }
      }
    );
  }
  const formattedPlaceholder = placeholder ? formatMessage(
    { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
    { ...placeholder.values }
  ) : "";
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.TextInput,
    {
      "aria-label": name,
      disabled,
      error: errorMessage,
      label,
      name,
      onChange,
      placeholder: formattedPlaceholder,
      type,
      value: inputValue
    }
  );
};
Input.defaultProps = {
  description: null,
  disabled: false,
  error: "",
  placeholder: null,
  value: ""
};
Input.propTypes = {
  description: PropTypes__default.default.shape({
    id: PropTypes__default.default.string.isRequired,
    defaultMessage: PropTypes__default.default.string.isRequired,
    values: PropTypes__default.default.object
  }),
  disabled: PropTypes__default.default.bool,
  error: PropTypes__default.default.string,
  intlLabel: PropTypes__default.default.shape({
    id: PropTypes__default.default.string.isRequired,
    defaultMessage: PropTypes__default.default.string.isRequired,
    values: PropTypes__default.default.object
  }).isRequired,
  name: PropTypes__default.default.string.isRequired,
  onChange: PropTypes__default.default.func.isRequired,
  placeholder: PropTypes__default.default.shape({
    id: PropTypes__default.default.string.isRequired,
    defaultMessage: PropTypes__default.default.string.isRequired,
    values: PropTypes__default.default.object
  }),
  providerToEditName: PropTypes__default.default.string.isRequired,
  type: PropTypes__default.default.string.isRequired,
  value: PropTypes__default.default.oneOfType([PropTypes__default.default.bool, PropTypes__default.default.string])
};
const FormModal = ({
  headerBreadcrumbs,
  initialData,
  isSubmiting,
  layout,
  isOpen,
  onSubmit,
  onToggle,
  providerToEditName
}) => {
  const { formatMessage } = reactIntl.useIntl();
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ModalLayout, { onClose: onToggle, labelledBy: "title", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(v2.Breadcrumbs, { label: headerBreadcrumbs.join(", "), children: headerBreadcrumbs.map((crumb, index2, arr) => /* @__PURE__ */ jsxRuntime.jsx(v2.Crumb, { isCurrent: index2 === arr.length - 1, children: crumb }, crumb)) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        onSubmit: (values) => onSubmit(values),
        initialValues: initialData,
        validationSchema: layout.schema,
        validateOnChange: false,
        children: ({ errors, handleChange, values }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalBody, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid, { gap: 5, children: layout.form.map((row) => {
              return row.map((input) => {
                return /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: input.size, xs: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                  Input,
                  {
                    ...input,
                    error: errors[input.name],
                    onChange: handleChange,
                    value: values[input.name],
                    providerToEditName
                  }
                ) }, input.name);
              });
            }) }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.ModalFooter,
              {
                startActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: onToggle, type: "button", children: formatMessage({
                  id: "app.components.Button.cancel",
                  defaultMessage: "Cancel"
                }) }),
                endActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", loading: isSubmiting, children: formatMessage({ id: "global.save", defaultMessage: "Save" }) })
              }
            )
          ] });
        }
      }
    )
  ] });
};
FormModal.defaultProps = {
  initialData: null,
  providerToEditName: null
};
FormModal.propTypes = {
  headerBreadcrumbs: PropTypes__default.default.arrayOf(PropTypes__default.default.string).isRequired,
  initialData: PropTypes__default.default.object,
  layout: PropTypes__default.default.shape({
    form: PropTypes__default.default.arrayOf(PropTypes__default.default.array),
    schema: PropTypes__default.default.object
  }).isRequired,
  isOpen: PropTypes__default.default.bool.isRequired,
  isSubmiting: PropTypes__default.default.bool.isRequired,
  onSubmit: PropTypes__default.default.func.isRequired,
  onToggle: PropTypes__default.default.func.isRequired,
  providerToEditName: PropTypes__default.default.string
};
const callbackLabel = {
  id: index.getTrad("PopUpForm.Providers.redirectURL.front-end.label"),
  defaultMessage: "The redirect URL to your front-end app"
};
const callbackPlaceholder = {
  id: "http://www.client-app.com",
  defaultMessage: "http://www.client-app.com"
};
const enabledDescription = {
  id: index.getTrad("PopUpForm.Providers.enabled.description"),
  defaultMessage: "If disabled, users won't be able to use this provider."
};
const enabledLabel = {
  id: index.getTrad("PopUpForm.Providers.enabled.label"),
  defaultMessage: "Enable"
};
const keyLabel = { id: index.getTrad("PopUpForm.Providers.key.label"), defaultMessage: "Client ID" };
const hintLabel = {
  id: index.getTrad("PopUpForm.Providers.redirectURL.label"),
  defaultMessage: "The redirect URL to add in your {provider} application configurations"
};
const textPlaceholder = {
  id: index.getTrad("PopUpForm.Providers.key.placeholder"),
  defaultMessage: "TEXT"
};
const secretLabel = {
  id: index.getTrad("PopUpForm.Providers.secret.label"),
  defaultMessage: "Client Secret"
};
const forms = {
  email: {
    form: [
      [
        {
          intlLabel: enabledLabel,
          name: "enabled",
          type: "bool",
          description: enabledDescription,
          size: 6
          // TODO check if still needed
          // validations: {
          //   required: true,
          // },
        }
      ]
    ],
    schema: yup__namespace.object().shape({
      enabled: yup__namespace.bool().required(helperPlugin.translatedErrors.required)
    })
  },
  providers: {
    form: [
      [
        {
          intlLabel: enabledLabel,
          name: "enabled",
          type: "bool",
          description: enabledDescription,
          size: 6,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: keyLabel,
          name: "key",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: secretLabel,
          name: "secret",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: callbackLabel,
          placeholder: callbackPlaceholder,
          name: "callback",
          type: "text",
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: hintLabel,
          name: "noName",
          type: "text",
          validations: {},
          size: 12,
          disabled: true
        }
      ]
    ],
    schema: yup__namespace.object().shape({
      enabled: yup__namespace.bool().required(helperPlugin.translatedErrors.required),
      key: yup__namespace.string().when("enabled", {
        is: true,
        then: yup__namespace.string().required(helperPlugin.translatedErrors.required),
        otherwise: yup__namespace.string()
      }),
      secret: yup__namespace.string().when("enabled", {
        is: true,
        then: yup__namespace.string().required(helperPlugin.translatedErrors.required),
        otherwise: yup__namespace.string()
      }),
      callback: yup__namespace.string().when("enabled", {
        is: true,
        then: yup__namespace.string().required(helperPlugin.translatedErrors.required),
        otherwise: yup__namespace.string()
      })
    })
  },
  providersWithSubdomain: {
    form: [
      [
        {
          intlLabel: enabledLabel,
          name: "enabled",
          type: "bool",
          description: enabledDescription,
          size: 6,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: keyLabel,
          name: "key",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: secretLabel,
          name: "secret",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: {
            id: index.getTrad({ id: "PopUpForm.Providers.jwksurl.label" }),
            defaultMessage: "JWKS URL"
          },
          name: "jwksurl",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: false
          }
        }
      ],
      [
        {
          intlLabel: {
            id: index.getTrad("PopUpForm.Providers.subdomain.label"),
            defaultMessage: "Host URI (Subdomain)"
          },
          name: "subdomain",
          type: "text",
          placeholder: {
            id: index.getTrad("PopUpForm.Providers.subdomain.placeholder"),
            defaultMessage: "my.subdomain.com"
          },
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: callbackLabel,
          placeholder: callbackPlaceholder,
          name: "callback",
          type: "text",
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: hintLabel,
          name: "noName",
          type: "text",
          validations: {},
          size: 12,
          disabled: true
        }
      ]
    ],
    schema: yup__namespace.object().shape({
      enabled: yup__namespace.bool().required(helperPlugin.translatedErrors.required),
      key: yup__namespace.string().when("enabled", {
        is: true,
        then: yup__namespace.string().required(helperPlugin.translatedErrors.required),
        otherwise: yup__namespace.string()
      }),
      secret: yup__namespace.string().when("enabled", {
        is: true,
        then: yup__namespace.string().required(helperPlugin.translatedErrors.required),
        otherwise: yup__namespace.string()
      }),
      subdomain: yup__namespace.string().when("enabled", {
        is: true,
        then: yup__namespace.string().required(helperPlugin.translatedErrors.required),
        otherwise: yup__namespace.string()
      }),
      callback: yup__namespace.string().when("enabled", {
        is: true,
        then: yup__namespace.string().required(helperPlugin.translatedErrors.required),
        otherwise: yup__namespace.string()
      })
    })
  }
};
const ProvidersPage = () => {
  const { formatMessage, locale } = reactIntl.useIntl();
  const queryClient = reactQuery.useQueryClient();
  const { trackUsage } = helperPlugin.useTracking();
  const [isOpen, setIsOpen] = React__namespace.useState(false);
  const [providerToEditName, setProviderToEditName] = React__namespace.useState(null);
  const toggleNotification = helperPlugin.useNotification();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const { get, put } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const formatter = helperPlugin.useCollator(locale, {
    sensitivity: "base"
  });
  helperPlugin.useFocusWhenNavigate();
  const {
    isLoading: isLoadingPermissions,
    allowedActions: { canUpdate }
  } = helperPlugin.useRBAC({ update: index.PERMISSIONS.updateProviders });
  const { isLoading: isLoadingData, data } = reactQuery.useQuery(
    ["users-permissions", "get-providers"],
    async () => {
      const { data: data2 } = await get("/users-permissions/providers");
      return data2;
    },
    {
      initialData: {}
    }
  );
  const submitMutation = reactQuery.useMutation((body) => put("/users-permissions/providers", body), {
    async onSuccess() {
      await queryClient.invalidateQueries(["users-permissions", "providers"]);
      toggleNotification({
        type: "success",
        message: { id: index.getTrad("notification.success.submit") }
      });
      trackUsage("didEditAuthenticationProvider");
      handleToggleModal();
      unlockApp();
    },
    onError(error) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
      unlockApp();
    },
    refetchActive: false
  });
  const providers = Object.entries(data).reduce((acc, [name, provider]) => {
    const { icon, enabled, subdomain } = provider;
    acc.push({
      name,
      icon: icon === "envelope" ? ["fas", "envelope"] : ["fab", icon],
      enabled,
      subdomain
    });
    return acc;
  }, []).sort((a, b) => formatter.compare(a.name, b.name));
  const isLoading = isLoadingData || isLoadingPermissions;
  const isProviderWithSubdomain = React__namespace.useMemo(() => {
    if (!providerToEditName) {
      return false;
    }
    const providerToEdit = providers.find((obj) => obj.name === providerToEditName);
    return !!providerToEdit?.subdomain;
  }, [providers, providerToEditName]);
  const layoutToRender = React__namespace.useMemo(() => {
    if (providerToEditName === "email") {
      return forms.email;
    }
    if (isProviderWithSubdomain) {
      return forms.providersWithSubdomain;
    }
    return forms.providers;
  }, [providerToEditName, isProviderWithSubdomain]);
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClickEdit = (provider) => {
    if (canUpdate) {
      setProviderToEditName(provider.name);
      handleToggleModal();
    }
  };
  const handleSubmit = async (values) => {
    lockApp();
    trackUsage("willEditAuthenticationProvider");
    submitMutation.mutate({ providers: { ...data, [providerToEditName]: values } });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Layout, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.SettingsPageTitle,
      {
        name: formatMessage({
          id: index.getTrad("HeaderNav.link.providers"),
          defaultMessage: "Providers"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title: formatMessage({
            id: index.getTrad("HeaderNav.link.providers"),
            defaultMessage: "Providers"
          })
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 3, rowCount: providers.length + 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.name", defaultMessage: "Name" }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: index.getTrad("Providers.status"), defaultMessage: "Status" }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
            id: "global.settings",
            defaultMessage: "Settings"
          }) }) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: providers.map((provider) => /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Tr,
          {
            ...helperPlugin.onRowClick({
              fn: () => handleClickEdit(provider),
              condition: canUpdate
            }),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "45%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "neutral800", children: provider.name }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "65%", children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Typography,
                {
                  textColor: provider.enabled ? "success600" : "danger600",
                  "data-testid": `enable-${provider.name}`,
                  children: provider.enabled ? formatMessage({
                    id: "global.enabled",
                    defaultMessage: "Enabled"
                  }) : formatMessage({
                    id: "global.disabled",
                    defaultMessage: "Disabled"
                  })
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { ...helperPlugin.stopPropagation, children: canUpdate && /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  onClick: () => handleClickEdit(provider),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}),
                  label: "Edit"
                }
              ) })
            ]
          },
          provider.name
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      FormModal,
      {
        initialData: data[providerToEditName],
        isOpen,
        isSubmiting: submitMutation.isLoading,
        layout: layoutToRender,
        headerBreadcrumbs: [
          formatMessage({
            id: index.getTrad("PopUpForm.header.edit.providers"),
            defaultMessage: "Edit Provider"
          }),
          upperFirst__default.default(providerToEditName)
        ],
        onToggle: handleToggleModal,
        onSubmit: handleSubmit,
        providerToEditName
      }
    )
  ] });
};
const ProtectedProvidersPage = () => /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.readProviders, children: /* @__PURE__ */ jsxRuntime.jsx(ProvidersPage, {}) });
exports.ProvidersPage = ProvidersPage;
exports.default = ProtectedProvidersPage;
//# sourceMappingURL=index-b5fc72d9.js.map
