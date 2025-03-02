import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Main, HeaderLayout, Button, ContentLayout, Box, Flex, Typography, Grid, GridItem, ToggleInput, TextInput, FieldAction } from "@strapi/design-system";
import { translatedErrors, useFocusWhenNavigate, useRBAC, LoadingIndicatorPage, Form } from "@strapi/helper-plugin";
import { Check, Eye, EyeStriked } from "@strapi/icons";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import styled from "styled-components";
import * as yup from "yup";
import { P as PERMISSIONS } from "./index-972b74ea.mjs";
import { u as useDocumentation, g as getTrad } from "./useDocumentation-b1901301.mjs";
import "react-query";
const schema = yup.object().shape({
  restrictedAccess: yup.boolean(),
  password: yup.string().when("restrictedAccess", (value, initSchema) => {
    return value ? initSchema.required(translatedErrors.required) : initSchema;
  })
});
const SettingsPage = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();
  const { submit, data, isLoading } = useDocumentation();
  const [passwordShown, setPasswordShown] = useState(false);
  const { allowedActions } = useRBAC(PERMISSIONS);
  const handleUpdateSettingsSubmit = (body) => {
    submit.mutate({
      prefix: data?.prefix,
      body
    });
  };
  return /* @__PURE__ */ jsx(Main, { children: isLoading ? /* @__PURE__ */ jsx(LoadingIndicatorPage, { children: "Plugin settings are loading" }) : /* @__PURE__ */ jsx(
    Formik,
    {
      initialValues: {
        restrictedAccess: data?.documentationAccess.restrictedAccess || false,
        password: ""
      },
      onSubmit: handleUpdateSettingsSubmit,
      validationSchema: schema,
      children: ({
        handleSubmit,
        values,
        handleChange,
        errors,
        setFieldTouched,
        setFieldValue,
        dirty
      }) => {
        return /* @__PURE__ */ jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(
            HeaderLayout,
            {
              title: formatMessage({
                id: getTrad("plugin.name"),
                defaultMessage: "Documentation"
              }),
              subtitle: formatMessage({
                id: getTrad("pages.SettingsPage.header.description"),
                defaultMessage: "Configure the documentation plugin"
              }),
              primaryAction: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  startIcon: /* @__PURE__ */ jsx(Check, {}),
                  disabled: !dirty && allowedActions.canUpdate,
                  children: formatMessage({
                    id: getTrad("pages.SettingsPage.Button.save"),
                    defaultMessage: "Save"
                  })
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
                /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    ToggleInput,
                    {
                      name: "restrictedAccess",
                      label: formatMessage({
                        id: getTrad("pages.SettingsPage.toggle.label"),
                        defaultMessage: "Restricted Access"
                      }),
                      hint: formatMessage({
                        id: getTrad("pages.SettingsPage.toggle.hint"),
                        defaultMessage: "Make the documentation endpoint private"
                      }),
                      checked: values.restrictedAccess,
                      onChange: () => {
                        if (values.restrictedAccess === true) {
                          setFieldValue("password", "", false);
                          setFieldTouched("password", false, false);
                        }
                        setFieldValue("restrictedAccess", !values.restrictedAccess, false);
                      },
                      onLabel: "On",
                      offLabel: "Off"
                    }
                  ) }),
                  values.restrictedAccess && /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      label: formatMessage({
                        id: "global.password",
                        defaultMessage: "Password"
                      }),
                      name: "password",
                      placeholder: "**********",
                      type: passwordShown ? "text" : "password",
                      value: values.password,
                      onChange: handleChange,
                      error: errors.password ? formatMessage({
                        id: errors.password,
                        defaultMessage: "Invalid value"
                      }) : null,
                      endAction: /* @__PURE__ */ jsx(
                        FieldActionWrapper,
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
                      )
                    }
                  ) })
                ] })
              ] })
            }
          ) })
        ] });
      }
    }
  ) });
};
const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
export {
  SettingsPage as default
};
//# sourceMappingURL=index-e92a8825.mjs.map
