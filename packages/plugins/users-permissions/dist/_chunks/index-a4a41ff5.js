"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const icons = require("@strapi/icons");
const formik = require("formik");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const index = require("./index-00c72e10.js");
require("lodash/isEmpty");
const yup = require("yup");
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
const layout = [
  {
    intlLabel: {
      id: index.getTrad("EditForm.inputToggle.label.email"),
      defaultMessage: "One account per email address"
    },
    description: {
      id: index.getTrad("EditForm.inputToggle.description.email"),
      defaultMessage: "Disallow the user to create multiple accounts using the same email address with different authentication providers."
    },
    name: "unique_email",
    type: "bool",
    size: {
      col: 12,
      xs: 12
    }
  },
  {
    intlLabel: {
      id: index.getTrad("EditForm.inputToggle.label.sign-up"),
      defaultMessage: "Enable sign-ups"
    },
    description: {
      id: index.getTrad("EditForm.inputToggle.description.sign-up"),
      defaultMessage: "When disabled (OFF), the registration process is forbidden. No one can subscribe anymore no matter the used provider."
    },
    name: "allow_register",
    type: "bool",
    size: {
      col: 12,
      xs: 12
    }
  },
  {
    intlLabel: {
      id: index.getTrad("EditForm.inputToggle.label.email-reset-password"),
      defaultMessage: "Reset password page"
    },
    description: {
      id: index.getTrad("EditForm.inputToggle.description.email-reset-password"),
      defaultMessage: "URL of your application's reset password page."
    },
    placeholder: {
      id: index.getTrad("EditForm.inputToggle.placeholder.email-reset-password"),
      defaultMessage: "ex: https://youtfrontend.com/reset-password"
    },
    name: "email_reset_password",
    type: "text",
    size: {
      col: 6,
      xs: 12
    }
  },
  {
    intlLabel: {
      id: index.getTrad("EditForm.inputToggle.label.email-confirmation"),
      defaultMessage: "Enable email confirmation"
    },
    description: {
      id: index.getTrad("EditForm.inputToggle.description.email-confirmation"),
      defaultMessage: "When enabled (ON), new registered users receive a confirmation email."
    },
    name: "email_confirmation",
    type: "bool",
    size: {
      col: 12,
      xs: 12
    }
  },
  {
    intlLabel: {
      id: index.getTrad("EditForm.inputToggle.label.email-confirmation-redirection"),
      defaultMessage: "Redirection url"
    },
    description: {
      id: index.getTrad("EditForm.inputToggle.description.email-confirmation-redirection"),
      defaultMessage: "After you confirmed your email, choose where you will be redirected."
    },
    placeholder: {
      id: index.getTrad("EditForm.inputToggle.placeholder.email-confirmation-redirection"),
      defaultMessage: "ex: https://youtfrontend.com/email-confirmation"
    },
    name: "email_confirmation_redirection",
    type: "text",
    size: {
      col: 6,
      xs: 12
    }
  }
];
const URL_REGEX = new RegExp("(^$)|((.+:\\/\\/.*)(d*)\\/?(.*))");
const schema = yup__namespace.object().shape({
  email_confirmation_redirection: yup__namespace.mixed().when("email_confirmation", {
    is: true,
    then: yup__namespace.string().matches(URL_REGEX).required(),
    otherwise: yup__namespace.string().nullable()
  }),
  email_reset_password: yup__namespace.string(helperPlugin.translatedErrors.string).matches(URL_REGEX, helperPlugin.translatedErrors.regex).nullable()
});
const ProtectedAdvancedSettingsPage = () => /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.readAdvancedSettings, children: /* @__PURE__ */ jsxRuntime.jsx(AdvancedSettingsPage, {}) });
const AdvancedSettingsPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const { notifyStatus } = designSystem.useNotifyAT();
  const queryClient = reactQuery.useQueryClient();
  const { get, put } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  helperPlugin.useFocusWhenNavigate();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate }
  } = helperPlugin.useRBAC({ update: index.PERMISSIONS.updateAdvancedSettings });
  const { isLoading: isLoadingData, data } = reactQuery.useQuery(
    ["users-permissions", "advanced"],
    async () => {
      const { data: data2 } = await get("/users-permissions/advanced");
      return data2;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: index.getTrad("Form.advancedSettings.data.loaded"),
            defaultMessage: "Advanced settings data has been loaded"
          })
        );
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: index.getTrad("notification.error"), defaultMessage: "An error occured" }
        });
      }
    }
  );
  const isLoading = isLoadingForPermissions || isLoadingData;
  const submitMutation = reactQuery.useMutation((body) => put("/users-permissions/advanced", body), {
    async onSuccess() {
      await queryClient.invalidateQueries(["users-permissions", "advanced"]);
      toggleNotification({
        type: "success",
        message: { id: index.getTrad("notification.success.saved"), defaultMessage: "Saved" }
      });
      unlockApp();
    },
    onError(error) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
      unlockApp();
    },
    refetchActive: true
  });
  const { isLoading: isSubmittingForm } = submitMutation;
  const handleSubmit = async (body) => {
    lockApp();
    submitMutation.mutate({
      ...body,
      email_confirmation_redirection: body.email_confirmation ? body.email_confirmation_redirection : ""
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": "true", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.SettingsPageTitle,
        {
          name: formatMessage({
            id: index.getTrad("HeaderNav.link.advancedSettings"),
            defaultMessage: "Advanced Settings"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title: formatMessage({
            id: index.getTrad("HeaderNav.link.advancedSettings"),
            defaultMessage: "Advanced Settings"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isSubmittingForm, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.SettingsPageTitle,
      {
        name: formatMessage({
          id: index.getTrad("HeaderNav.link.advancedSettings"),
          defaultMessage: "Advanced Settings"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        onSubmit: handleSubmit,
        initialValues: data.settings,
        validateOnChange: false,
        validationSchema: schema,
        enableReinitialize: true,
        children: ({ errors, values, handleChange, isSubmitting, dirty }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.HeaderLayout,
              {
                title: formatMessage({
                  id: index.getTrad("HeaderNav.link.advancedSettings"),
                  defaultMessage: "Advanced Settings"
                }),
                primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Button,
                  {
                    loading: isSubmitting,
                    type: "submit",
                    disabled: canUpdate ? !dirty : !canUpdate,
                    startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                    size: "S",
                    children: formatMessage({ id: "global.save", defaultMessage: "Save" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Box,
              {
                background: "neutral0",
                hasRadius: true,
                shadow: "filterShadow",
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 7,
                paddingRight: 7,
                children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
                    id: "global.settings",
                    defaultMessage: "Settings"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 6, children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Select,
                      {
                        label: formatMessage({
                          id: index.getTrad("EditForm.inputSelect.label.role"),
                          defaultMessage: "Default role for authenticated users"
                        }),
                        value: values.default_role,
                        hint: formatMessage({
                          id: index.getTrad("EditForm.inputSelect.description.role"),
                          defaultMessage: "It will attach the new authenticated user to the selected role."
                        }),
                        onChange: (e) => handleChange({ target: { name: "default_role", value: e } }),
                        children: data.roles.map((role) => {
                          return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Option, { value: role.type, children: role.name }, role.type);
                        })
                      }
                    ) }),
                    layout.map((input) => {
                      let value = values[input.name];
                      if (!value) {
                        value = input.type === "bool" ? false : "";
                      }
                      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { ...input.size, children: /* @__PURE__ */ jsxRuntime.jsx(
                        helperPlugin.GenericInput,
                        {
                          ...input,
                          value,
                          error: errors[input.name],
                          disabled: input.name === "email_confirmation_redirection" && values.email_confirmation === false,
                          onChange: handleChange
                        }
                      ) }, input.name);
                    })
                  ] })
                ] })
              }
            ) })
          ] });
        }
      }
    )
  ] });
};
exports.default = ProtectedAdvancedSettingsPage;
//# sourceMappingURL=index-a4a41ff5.js.map
