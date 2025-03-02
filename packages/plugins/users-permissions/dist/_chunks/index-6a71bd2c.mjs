import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { useNotifyAT, Main, HeaderLayout, ContentLayout, Button, Box, Flex, Typography, Grid, GridItem, Select, Option } from "@strapi/design-system";
import { translatedErrors, CheckPagePermissions, useNotification, useOverlayBlocker, useFetchClient, useAPIErrorHandler, useFocusWhenNavigate, useRBAC, SettingsPageTitle, LoadingIndicatorPage, Form, GenericInput } from "@strapi/helper-plugin";
import { Check } from "@strapi/icons";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { g as getTrad, P as PERMISSIONS } from "./index-079fd23d.mjs";
import "lodash/isEmpty";
import * as yup from "yup";
const layout = [
  {
    intlLabel: {
      id: getTrad("EditForm.inputToggle.label.email"),
      defaultMessage: "One account per email address"
    },
    description: {
      id: getTrad("EditForm.inputToggle.description.email"),
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
      id: getTrad("EditForm.inputToggle.label.sign-up"),
      defaultMessage: "Enable sign-ups"
    },
    description: {
      id: getTrad("EditForm.inputToggle.description.sign-up"),
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
      id: getTrad("EditForm.inputToggle.label.email-reset-password"),
      defaultMessage: "Reset password page"
    },
    description: {
      id: getTrad("EditForm.inputToggle.description.email-reset-password"),
      defaultMessage: "URL of your application's reset password page."
    },
    placeholder: {
      id: getTrad("EditForm.inputToggle.placeholder.email-reset-password"),
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
      id: getTrad("EditForm.inputToggle.label.email-confirmation"),
      defaultMessage: "Enable email confirmation"
    },
    description: {
      id: getTrad("EditForm.inputToggle.description.email-confirmation"),
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
      id: getTrad("EditForm.inputToggle.label.email-confirmation-redirection"),
      defaultMessage: "Redirection url"
    },
    description: {
      id: getTrad("EditForm.inputToggle.description.email-confirmation-redirection"),
      defaultMessage: "After you confirmed your email, choose where you will be redirected."
    },
    placeholder: {
      id: getTrad("EditForm.inputToggle.placeholder.email-confirmation-redirection"),
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
const schema = yup.object().shape({
  email_confirmation_redirection: yup.mixed().when("email_confirmation", {
    is: true,
    then: yup.string().matches(URL_REGEX).required(),
    otherwise: yup.string().nullable()
  }),
  email_reset_password: yup.string(translatedErrors.string).matches(URL_REGEX, translatedErrors.regex).nullable()
});
const ProtectedAdvancedSettingsPage = () => /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: PERMISSIONS.readAdvancedSettings, children: /* @__PURE__ */ jsx(AdvancedSettingsPage, {}) });
const AdvancedSettingsPage = () => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const { notifyStatus } = useNotifyAT();
  const queryClient = useQueryClient();
  const { get, put } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  useFocusWhenNavigate();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate }
  } = useRBAC({ update: PERMISSIONS.updateAdvancedSettings });
  const { isLoading: isLoadingData, data } = useQuery(
    ["users-permissions", "advanced"],
    async () => {
      const { data: data2 } = await get("/users-permissions/advanced");
      return data2;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: getTrad("Form.advancedSettings.data.loaded"),
            defaultMessage: "Advanced settings data has been loaded"
          })
        );
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: getTrad("notification.error"), defaultMessage: "An error occured" }
        });
      }
    }
  );
  const isLoading = isLoadingForPermissions || isLoadingData;
  const submitMutation = useMutation((body) => put("/users-permissions/advanced", body), {
    async onSuccess() {
      await queryClient.invalidateQueries(["users-permissions", "advanced"]);
      toggleNotification({
        type: "success",
        message: { id: getTrad("notification.success.saved"), defaultMessage: "Saved" }
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
    return /* @__PURE__ */ jsxs(Main, { "aria-busy": "true", children: [
      /* @__PURE__ */ jsx(
        SettingsPageTitle,
        {
          name: formatMessage({
            id: getTrad("HeaderNav.link.advancedSettings"),
            defaultMessage: "Advanced Settings"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title: formatMessage({
            id: getTrad("HeaderNav.link.advancedSettings"),
            defaultMessage: "Advanced Settings"
          })
        }
      ),
      /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": isSubmittingForm, children: [
    /* @__PURE__ */ jsx(
      SettingsPageTitle,
      {
        name: formatMessage({
          id: getTrad("HeaderNav.link.advancedSettings"),
          defaultMessage: "Advanced Settings"
        })
      }
    ),
    /* @__PURE__ */ jsx(
      Formik,
      {
        onSubmit: handleSubmit,
        initialValues: data.settings,
        validateOnChange: false,
        validationSchema: schema,
        enableReinitialize: true,
        children: ({ errors, values, handleChange, isSubmitting, dirty }) => {
          return /* @__PURE__ */ jsxs(Form, { children: [
            /* @__PURE__ */ jsx(
              HeaderLayout,
              {
                title: formatMessage({
                  id: getTrad("HeaderNav.link.advancedSettings"),
                  defaultMessage: "Advanced Settings"
                }),
                primaryAction: /* @__PURE__ */ jsx(
                  Button,
                  {
                    loading: isSubmitting,
                    type: "submit",
                    disabled: canUpdate ? !dirty : !canUpdate,
                    startIcon: /* @__PURE__ */ jsx(Check, {}),
                    size: "S",
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
                    id: "global.settings",
                    defaultMessage: "Settings"
                  }) }),
                  /* @__PURE__ */ jsxs(Grid, { gap: 6, children: [
                    /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                      Select,
                      {
                        label: formatMessage({
                          id: getTrad("EditForm.inputSelect.label.role"),
                          defaultMessage: "Default role for authenticated users"
                        }),
                        value: values.default_role,
                        hint: formatMessage({
                          id: getTrad("EditForm.inputSelect.description.role"),
                          defaultMessage: "It will attach the new authenticated user to the selected role."
                        }),
                        onChange: (e) => handleChange({ target: { name: "default_role", value: e } }),
                        children: data.roles.map((role) => {
                          return /* @__PURE__ */ jsx(Option, { value: role.type, children: role.name }, role.type);
                        })
                      }
                    ) }),
                    layout.map((input) => {
                      let value = values[input.name];
                      if (!value) {
                        value = input.type === "bool" ? false : "";
                      }
                      return /* @__PURE__ */ jsx(GridItem, { ...input.size, children: /* @__PURE__ */ jsx(
                        GenericInput,
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
export {
  ProtectedAdvancedSettingsPage as default
};
//# sourceMappingURL=index-6a71bd2c.mjs.map
