import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ToggleInput, TextInput, ModalLayout, ModalHeader, ModalBody, Flex, Grid, GridItem, ModalFooter, Button, Layout, Main, HeaderLayout, ContentLayout, Table, Thead, Tr, Th, Typography, VisuallyHidden, Tbody, Td, IconButton } from "@strapi/design-system";
import { Form, translatedErrors, useTracking, useNotification, useOverlayBlocker, useFetchClient, useAPIErrorHandler, useCollator, useFocusWhenNavigate, useRBAC, SettingsPageTitle, LoadingIndicatorPage, onRowClick, stopPropagation, CheckPagePermissions } from "@strapi/helper-plugin";
import { Pencil } from "@strapi/icons";
import upperFirst from "lodash/upperFirst";
import { useIntl } from "react-intl";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { Breadcrumbs, Crumb } from "@strapi/design-system/v2";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { g as getTrad, P as PERMISSIONS } from "./index-079fd23d.mjs";
import "lodash/isEmpty";
import * as yup from "yup";
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
  const { formatMessage } = useIntl();
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
    return /* @__PURE__ */ jsx(
      ToggleInput,
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
  return /* @__PURE__ */ jsx(
    TextInput,
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
  description: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object
  }).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object
  }),
  providerToEditName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
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
  const { formatMessage } = useIntl();
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxs(ModalLayout, { onClose: onToggle, labelledBy: "title", children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Breadcrumbs, { label: headerBreadcrumbs.join(", "), children: headerBreadcrumbs.map((crumb, index, arr) => /* @__PURE__ */ jsx(Crumb, { isCurrent: index === arr.length - 1, children: crumb }, crumb)) }) }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        onSubmit: (values) => onSubmit(values),
        initialValues: initialData,
        validationSchema: layout.schema,
        validateOnChange: false,
        children: ({ errors, handleChange, values }) => {
          return /* @__PURE__ */ jsxs(Form, { children: [
            /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: /* @__PURE__ */ jsx(Grid, { gap: 5, children: layout.form.map((row) => {
              return row.map((input) => {
                return /* @__PURE__ */ jsx(GridItem, { col: input.size, xs: 12, children: /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(
              ModalFooter,
              {
                startActions: /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: onToggle, type: "button", children: formatMessage({
                  id: "app.components.Button.cancel",
                  defaultMessage: "Cancel"
                }) }),
                endActions: /* @__PURE__ */ jsx(Button, { type: "submit", loading: isSubmiting, children: formatMessage({ id: "global.save", defaultMessage: "Save" }) })
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
  headerBreadcrumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialData: PropTypes.object,
  layout: PropTypes.shape({
    form: PropTypes.arrayOf(PropTypes.array),
    schema: PropTypes.object
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  providerToEditName: PropTypes.string
};
const callbackLabel = {
  id: getTrad("PopUpForm.Providers.redirectURL.front-end.label"),
  defaultMessage: "The redirect URL to your front-end app"
};
const callbackPlaceholder = {
  id: "http://www.client-app.com",
  defaultMessage: "http://www.client-app.com"
};
const enabledDescription = {
  id: getTrad("PopUpForm.Providers.enabled.description"),
  defaultMessage: "If disabled, users won't be able to use this provider."
};
const enabledLabel = {
  id: getTrad("PopUpForm.Providers.enabled.label"),
  defaultMessage: "Enable"
};
const keyLabel = { id: getTrad("PopUpForm.Providers.key.label"), defaultMessage: "Client ID" };
const hintLabel = {
  id: getTrad("PopUpForm.Providers.redirectURL.label"),
  defaultMessage: "The redirect URL to add in your {provider} application configurations"
};
const textPlaceholder = {
  id: getTrad("PopUpForm.Providers.key.placeholder"),
  defaultMessage: "TEXT"
};
const secretLabel = {
  id: getTrad("PopUpForm.Providers.secret.label"),
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
    schema: yup.object().shape({
      enabled: yup.bool().required(translatedErrors.required)
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
    schema: yup.object().shape({
      enabled: yup.bool().required(translatedErrors.required),
      key: yup.string().when("enabled", {
        is: true,
        then: yup.string().required(translatedErrors.required),
        otherwise: yup.string()
      }),
      secret: yup.string().when("enabled", {
        is: true,
        then: yup.string().required(translatedErrors.required),
        otherwise: yup.string()
      }),
      callback: yup.string().when("enabled", {
        is: true,
        then: yup.string().required(translatedErrors.required),
        otherwise: yup.string()
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
            id: getTrad({ id: "PopUpForm.Providers.jwksurl.label" }),
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
            id: getTrad("PopUpForm.Providers.subdomain.label"),
            defaultMessage: "Host URI (Subdomain)"
          },
          name: "subdomain",
          type: "text",
          placeholder: {
            id: getTrad("PopUpForm.Providers.subdomain.placeholder"),
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
    schema: yup.object().shape({
      enabled: yup.bool().required(translatedErrors.required),
      key: yup.string().when("enabled", {
        is: true,
        then: yup.string().required(translatedErrors.required),
        otherwise: yup.string()
      }),
      secret: yup.string().when("enabled", {
        is: true,
        then: yup.string().required(translatedErrors.required),
        otherwise: yup.string()
      }),
      subdomain: yup.string().when("enabled", {
        is: true,
        then: yup.string().required(translatedErrors.required),
        otherwise: yup.string()
      }),
      callback: yup.string().when("enabled", {
        is: true,
        then: yup.string().required(translatedErrors.required),
        otherwise: yup.string()
      })
    })
  }
};
const ProvidersPage = () => {
  const { formatMessage, locale } = useIntl();
  const queryClient = useQueryClient();
  const { trackUsage } = useTracking();
  const [isOpen, setIsOpen] = React.useState(false);
  const [providerToEditName, setProviderToEditName] = React.useState(null);
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const { get, put } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  useFocusWhenNavigate();
  const {
    isLoading: isLoadingPermissions,
    allowedActions: { canUpdate }
  } = useRBAC({ update: PERMISSIONS.updateProviders });
  const { isLoading: isLoadingData, data } = useQuery(
    ["users-permissions", "get-providers"],
    async () => {
      const { data: data2 } = await get("/users-permissions/providers");
      return data2;
    },
    {
      initialData: {}
    }
  );
  const submitMutation = useMutation((body) => put("/users-permissions/providers", body), {
    async onSuccess() {
      await queryClient.invalidateQueries(["users-permissions", "providers"]);
      toggleNotification({
        type: "success",
        message: { id: getTrad("notification.success.submit") }
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
  const isProviderWithSubdomain = React.useMemo(() => {
    if (!providerToEditName) {
      return false;
    }
    const providerToEdit = providers.find((obj) => obj.name === providerToEditName);
    return !!providerToEdit?.subdomain;
  }, [providers, providerToEditName]);
  const layoutToRender = React.useMemo(() => {
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
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SettingsPageTitle,
      {
        name: formatMessage({
          id: getTrad("HeaderNav.link.providers"),
          defaultMessage: "Providers"
        })
      }
    ),
    /* @__PURE__ */ jsxs(Main, { children: [
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title: formatMessage({
            id: getTrad("HeaderNav.link.providers"),
            defaultMessage: "Providers"
          })
        }
      ),
      isLoading ? /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) : /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(Table, { colCount: 3, rowCount: providers.length + 1, children: [
        /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.name", defaultMessage: "Name" }) }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: getTrad("Providers.status"), defaultMessage: "Status" }) }) }),
          /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
            id: "global.settings",
            defaultMessage: "Settings"
          }) }) }) })
        ] }) }),
        /* @__PURE__ */ jsx(Tbody, { children: providers.map((provider) => /* @__PURE__ */ jsxs(
          Tr,
          {
            ...onRowClick({
              fn: () => handleClickEdit(provider),
              condition: canUpdate
            }),
            children: [
              /* @__PURE__ */ jsx(Td, { width: "45%", children: /* @__PURE__ */ jsx(Typography, { fontWeight: "semiBold", textColor: "neutral800", children: provider.name }) }),
              /* @__PURE__ */ jsx(Td, { width: "65%", children: /* @__PURE__ */ jsx(
                Typography,
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
              /* @__PURE__ */ jsx(Td, { ...stopPropagation, children: canUpdate && /* @__PURE__ */ jsx(
                IconButton,
                {
                  onClick: () => handleClickEdit(provider),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsx(Pencil, {}),
                  label: "Edit"
                }
              ) })
            ]
          },
          provider.name
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      FormModal,
      {
        initialData: data[providerToEditName],
        isOpen,
        isSubmiting: submitMutation.isLoading,
        layout: layoutToRender,
        headerBreadcrumbs: [
          formatMessage({
            id: getTrad("PopUpForm.header.edit.providers"),
            defaultMessage: "Edit Provider"
          }),
          upperFirst(providerToEditName)
        ],
        onToggle: handleToggleModal,
        onSubmit: handleSubmit,
        providerToEditName
      }
    )
  ] });
};
const ProtectedProvidersPage = () => /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: PERMISSIONS.readProviders, children: /* @__PURE__ */ jsx(ProvidersPage, {}) });
export {
  ProvidersPage,
  ProtectedProvidersPage as default
};
//# sourceMappingURL=index-6ac22f91.mjs.map
