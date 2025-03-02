"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const icons = require("@strapi/icons");
const formik = require("formik");
const reactIntl = require("react-intl");
const styled = require("styled-components");
const yup = require("yup");
const index = require("./index-688ab74a.js");
const useDocumentation = require("./useDocumentation-0d618f15.js");
require("react-query");
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
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const schema = yup__namespace.object().shape({
  restrictedAccess: yup__namespace.boolean(),
  password: yup__namespace.string().when("restrictedAccess", (value, initSchema) => {
    return value ? initSchema.required(helperPlugin.translatedErrors.required) : initSchema;
  })
});
const SettingsPage = () => {
  helperPlugin.useFocusWhenNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const { submit, data, isLoading } = useDocumentation.useDocumentation();
  const [passwordShown, setPasswordShown] = react.useState(false);
  const { allowedActions } = helperPlugin.useRBAC(index.PERMISSIONS);
  const handleUpdateSettingsSubmit = (body) => {
    submit.mutate({
      prefix: data?.prefix,
      body
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, { children: "Plugin settings are loading" }) : /* @__PURE__ */ jsxRuntime.jsx(
    formik.Formik,
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
        return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.HeaderLayout,
            {
              title: formatMessage({
                id: useDocumentation.getTrad("plugin.name"),
                defaultMessage: "Documentation"
              }),
              subtitle: formatMessage({
                id: useDocumentation.getTrad("pages.SettingsPage.header.description"),
                defaultMessage: "Configure the documentation plugin"
              }),
              primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  type: "submit",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  disabled: !dirty && allowedActions.canUpdate,
                  children: formatMessage({
                    id: useDocumentation.getTrad("pages.SettingsPage.Button.save"),
                    defaultMessage: "Save"
                  })
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
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.ToggleInput,
                    {
                      name: "restrictedAccess",
                      label: formatMessage({
                        id: useDocumentation.getTrad("pages.SettingsPage.toggle.label"),
                        defaultMessage: "Restricted Access"
                      }),
                      hint: formatMessage({
                        id: useDocumentation.getTrad("pages.SettingsPage.toggle.hint"),
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
                  values.restrictedAccess && /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.TextInput,
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
                      endAction: /* @__PURE__ */ jsxRuntime.jsx(
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
                          children: passwordShown ? /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {}) : /* @__PURE__ */ jsxRuntime.jsx(icons.EyeStriked, {})
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
const FieldActionWrapper = styled__default.default(designSystem.FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
exports.default = SettingsPage;
//# sourceMappingURL=index-ddb7c40e.js.map
