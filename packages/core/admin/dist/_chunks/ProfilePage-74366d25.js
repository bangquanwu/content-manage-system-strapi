"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const formik = require("formik");
const upperFirst = require("lodash/upperFirst");
const reactHelmet = require("react-helmet");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const styled = require("styled-components");
const yup = require("yup");
const index = require("./index-be8080e3.js");
const AuthenticatedApp = require("./AuthenticatedApp-87c49d74.js");
const validation = require("./validation-fabd21cc.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-router-dom");
require("react-redux");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("lodash/camelCase");
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
require("prop-types");
require("axios");
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
require("semver/functions/lt");
require("semver/functions/valid");
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
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const PROFILE_VALIDTION_SCHEMA = yup__namespace.object().shape({
  ...validation.COMMON_USER_SCHEMA,
  currentPassword: yup__namespace.string().when(["password", "confirmPassword"], (password, confirmPassword, passSchema) => {
    return password || confirmPassword ? passSchema.required(helperPlugin.translatedErrors.required) : passSchema;
  }),
  preferedLanguage: yup__namespace.string().nullable()
});
const ProfilePage = () => {
  const { changeLocale, localeNames } = index.useLocales();
  const { setUserDisplayName } = helperPlugin.useAppInfo();
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = helperPlugin.useTracking();
  const toggleNotification = helperPlugin.useNotification();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const { notifyStatus } = designSystem.useNotifyAT();
  const { currentTheme, themes: allApplicationThemes, onChangeTheme } = index.useThemeToggle();
  const { get, put } = helperPlugin.useFetchClient();
  helperPlugin.useFocusWhenNavigate();
  const {
    isLoading: isLoadingUser,
    data,
    refetch
  } = reactQuery.useQuery(
    "user",
    async () => {
      const { data: data2 } = await get("/admin/users/me");
      return data2.data;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: "Settings.profile.form.notify.data.loaded",
            defaultMessage: "Your profile data has been loaded"
          })
        );
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error", defaultMessage: "An error occured" }
        });
      }
    }
  );
  const { isLoading: isLoadingSSO, data: dataSSO } = reactQuery.useQuery(
    ["providers", "isSSOLocked"],
    async () => {
      const {
        data: { data: data2 }
      } = await get("/admin/providers/isSSOLocked");
      return data2;
    },
    {
      enabled: window.strapi.isEE && window.strapi.features.isEnabled("sso"),
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "Settings.permissions.users.sso.provider.error" }
        });
      }
    }
  );
  const isLoading = isLoadingUser || isLoadingSSO;
  const submitMutation = reactQuery.useMutation(
    async (body) => {
      const { confirmPassword: _confirmPassword, currentTheme: currentTheme2, ...bodyRest } = body;
      let dataToSend = bodyRest;
      const isPasswordRequestBody = (data3) => {
        return "password" in data3;
      };
      if (isPasswordRequestBody(dataToSend) && dataToSend.password === "") {
        const {
          password: _password,
          currentPassword: _currentPassword,
          ...passwordRequestBodyRest
        } = dataToSend;
        dataToSend = passwordRequestBodyRest;
      }
      const { data: data2 } = await put("/admin/users/me", dataToSend);
      return { ...data2.data, currentTheme: currentTheme2 };
    },
    {
      async onSuccess(data2) {
        await refetch();
        const { email: email2, firstname: firstname2, lastname: lastname2, username: username2, preferedLanguage: preferedLanguage2 } = data2;
        helperPlugin.auth.setUserInfo({ email: email2, firstname: firstname2, lastname: lastname2, username: username2, preferedLanguage: preferedLanguage2 });
        const userDisplayName = data2.username || AuthenticatedApp.getFullName(data2.firstname ?? "", data2.lastname);
        setUserDisplayName(userDisplayName);
        if (data2.preferedLanguage) {
          changeLocale(data2.preferedLanguage);
        }
        onChangeTheme(data2.currentTheme);
        trackUsage("didChangeMode", { newMode: data2.currentTheme });
        toggleNotification({
          type: "success",
          message: { id: "notification.success.saved", defaultMessage: "Saved" }
        });
      },
      async onSettled() {
        unlockApp();
      }
    }
  );
  const { isLoading: isSubmittingForm } = submitMutation;
  const handleSubmit = async (body, { setErrors }) => {
    lockApp();
    const username2 = body.username;
    submitMutation.mutate(
      { ...body, username: username2 },
      {
        onError(error) {
          const res = error?.response?.data;
          if (res?.data) {
            return setErrors(res.data);
          }
          return toggleNotification({
            type: "warning",
            message: { id: "notification.error", defaultMessage: "An error occured" }
          });
        }
      }
    );
  };
  if (isLoading || !data) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": "true", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        reactHelmet.Helmet,
        {
          title: formatMessage({
            id: "Settings.profile.form.section.helmet.title",
            defaultMessage: "User profile"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title: formatMessage({
            id: "Settings.profile.form.section.profile.page.title",
            defaultMessage: "Profile page"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) })
    ] });
  }
  const hasLockedRole = dataSSO?.isSSOLocked ?? false;
  const { email, firstname, lastname, username, preferedLanguage } = data;
  const initialData = {
    email,
    firstname,
    lastname,
    username,
    preferedLanguage,
    currentTheme,
    confirmPassword: "",
    password: ""
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isSubmittingForm, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      reactHelmet.Helmet,
      {
        title: formatMessage({
          id: "Settings.profile.form.section.helmet.title",
          defaultMessage: "User profile"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        onSubmit: handleSubmit,
        initialValues: initialData,
        validateOnChange: false,
        validationSchema: PROFILE_VALIDTION_SCHEMA,
        enableReinitialize: true,
        children: ({
          errors,
          values: {
            email: email2,
            firstname: firstname2,
            lastname: lastname2,
            username: username2,
            preferedLanguage: preferedLanguage2,
            currentTheme: currentTheme2,
            ...passwordValues
          },
          handleChange,
          isSubmitting,
          dirty
        }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.HeaderLayout,
              {
                title: data.username || AuthenticatedApp.getFullName(data.firstname ?? "", data.lastname),
                primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Button,
                  {
                    startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}),
                    loading: isSubmitting,
                    type: "submit",
                    disabled: !dirty,
                    children: formatMessage({ id: "global.save", defaultMessage: "Save" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 10, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                UserInfoSection,
                {
                  errors,
                  onChange: handleChange,
                  values: {
                    firstname: firstname2,
                    lastname: lastname2,
                    username: username2,
                    email: email2
                  }
                }
              ),
              !hasLockedRole && /* @__PURE__ */ jsxRuntime.jsx(
                PasswordSection,
                {
                  errors,
                  onChange: handleChange,
                  values: passwordValues
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                PreferencesSection,
                {
                  allApplicationThemes,
                  onChange: handleChange,
                  values: {
                    preferedLanguage: preferedLanguage2,
                    currentTheme: currentTheme2
                  },
                  localeNames
                }
              )
            ] }) }) })
          ] });
        }
      }
    )
  ] });
};
const PasswordSection = ({ errors, onChange, values }) => {
  const { formatMessage } = reactIntl.useIntl();
  const [currentPasswordShown, setCurrentPasswordShown] = React__namespace.useState(false);
  const [passwordShown, setPasswordShown] = React__namespace.useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = React__namespace.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsx(
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
          id: "global.change-password",
          defaultMessage: "Change password"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid, { gap: 5, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.TextInput,
          {
            error: errors.currentPassword ? formatMessage({
              id: errors.currentPassword,
              defaultMessage: errors.currentPassword
            }) : "",
            onChange,
            value: values.currentPassword,
            label: formatMessage({
              id: "Auth.form.currentPassword.label",
              defaultMessage: "Current Password"
            }),
            name: "currentPassword",
            type: currentPasswordShown ? "text" : "password",
            endAction: /* @__PURE__ */ jsxRuntime.jsx(
              FieldActionWrapper,
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setCurrentPasswordShown((prev) => !prev);
                },
                label: formatMessage(
                  currentPasswordShown ? {
                    id: "Auth.form.password.show-password",
                    defaultMessage: "Show password"
                  } : {
                    id: "Auth.form.password.hide-password",
                    defaultMessage: "Hide password"
                  }
                ),
                children: currentPasswordShown ? /* @__PURE__ */ jsxRuntime.jsx(Icons.Eye, {}) : /* @__PURE__ */ jsxRuntime.jsx(Icons.EyeStriked, {})
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 5, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            PasswordInput,
            {
              error: errors.password ? formatMessage({
                id: errors.password,
                defaultMessage: errors.password
              }) : "",
              onChange,
              value: values.password,
              label: formatMessage({
                id: "global.password",
                defaultMessage: "Password"
              }),
              name: "password",
              type: passwordShown ? "text" : "password",
              autoComplete: "new-password",
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
                  children: passwordShown ? /* @__PURE__ */ jsxRuntime.jsx(Icons.Eye, {}) : /* @__PURE__ */ jsxRuntime.jsx(Icons.EyeStriked, {})
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            PasswordInput,
            {
              error: errors.confirmPassword ? formatMessage({
                id: errors.confirmPassword,
                defaultMessage: errors.confirmPassword
              }) : "",
              onChange,
              value: values.confirmPassword,
              label: formatMessage({
                id: "Auth.form.confirmPassword.label",
                defaultMessage: "Confirm Password"
              }),
              name: "confirmPassword",
              type: passwordConfirmShown ? "text" : "password",
              autoComplete: "new-password",
              endAction: /* @__PURE__ */ jsxRuntime.jsx(
                FieldActionWrapper,
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setPasswordConfirmShown((prev) => !prev);
                  },
                  label: formatMessage(
                    passwordConfirmShown ? {
                      id: "Auth.form.password.show-password",
                      defaultMessage: "Show password"
                    } : {
                      id: "Auth.form.password.hide-password",
                      defaultMessage: "Hide password"
                    }
                  ),
                  children: passwordConfirmShown ? /* @__PURE__ */ jsxRuntime.jsx(Icons.Eye, {}) : /* @__PURE__ */ jsxRuntime.jsx(Icons.EyeStriked, {})
                }
              )
            }
          ) })
        ] })
      ] })
    }
  );
};
const PasswordInput = styled__default.default(designSystem.TextInput)`
  ::-ms-reveal {
    display: none;
  }
`;
const FieldActionWrapper = styled__default.default(designSystem.FieldAction)`
  svg {
    height: ${helperPlugin.pxToRem(16)};
    width: ${helperPlugin.pxToRem(16)};
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
const PreferencesSection = ({
  onChange,
  values,
  localeNames,
  allApplicationThemes = {}
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const themesToDisplay = Object.keys(allApplicationThemes).filter(
    (themeName) => allApplicationThemes[themeName]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: "Settings.profile.form.section.experience.title",
          defaultMessage: "Experience"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 5, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.SingleSelect,
            {
              label: formatMessage({
                id: "Settings.profile.form.section.experience.interfaceLanguage",
                defaultMessage: "Interface language"
              }),
              placeholder: formatMessage({
                id: "global.select",
                defaultMessage: "Select"
              }),
              hint: formatMessage({
                id: "Settings.profile.form.section.experience.interfaceLanguage.hint",
                defaultMessage: "This will only display your own interface in the chosen language."
              }),
              onClear: () => {
                onChange({
                  target: { name: "preferedLanguage", value: null }
                });
              },
              clearLabel: formatMessage({
                id: "Settings.profile.form.section.experience.clear.select",
                defaultMessage: "Clear the interface language selected"
              }),
              value: values.preferedLanguage,
              onChange: (e) => {
                onChange({
                  target: { name: "preferedLanguage", value: e }
                });
              },
              children: Object.entries(localeNames).map(([language, langName]) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: language, children: langName }, language))
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.SingleSelect,
            {
              label: formatMessage({
                id: "Settings.profile.form.section.experience.mode.label",
                defaultMessage: "Interface mode"
              }),
              placeholder: formatMessage({
                id: "components.Select.placeholder",
                defaultMessage: "Select"
              }),
              hint: formatMessage({
                id: "Settings.profile.form.section.experience.mode.hint",
                defaultMessage: "Displays your interface in the chosen mode."
              }),
              value: values.currentTheme,
              onChange: (e) => {
                onChange({
                  target: { name: "currentTheme", value: e }
                });
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "system", children: formatMessage({
                  id: "Settings.profile.form.section.experience.mode.option-system-label",
                  defaultMessage: "Use system settings"
                }) }),
                themesToDisplay.map((theme) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: theme, children: formatMessage(
                  {
                    id: "Settings.profile.form.section.experience.mode.option-label",
                    defaultMessage: "{name} mode"
                  },
                  {
                    name: formatMessage({
                      id: theme,
                      defaultMessage: upperFirst__default.default(theme)
                    })
                  }
                ) }, theme))
              ]
            }
          ) })
        ] })
      ] })
    }
  );
};
const UserInfoSection = ({ errors, onChange, values }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
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
          id: "global.profile",
          defaultMessage: "Profile"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 5, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            helperPlugin.GenericInput,
            {
              intlLabel: {
                id: "Auth.form.firstname.label",
                defaultMessage: "First name"
              },
              error: errors.firstname,
              onChange,
              value: values.firstname,
              type: "text",
              name: "firstname",
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            helperPlugin.GenericInput,
            {
              intlLabel: {
                id: "Auth.form.lastname.label",
                defaultMessage: "Last name"
              },
              error: errors.lastname,
              onChange,
              value: values.lastname,
              type: "text",
              name: "lastname"
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            helperPlugin.GenericInput,
            {
              intlLabel: { id: "Auth.form.email.label", defaultMessage: "Email" },
              error: errors.email,
              onChange,
              value: values.email,
              type: "email",
              name: "email",
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            helperPlugin.GenericInput,
            {
              intlLabel: {
                id: "Auth.form.username.label",
                defaultMessage: "Username"
              },
              error: errors.username,
              onChange,
              value: values.username,
              type: "text",
              name: "username"
            }
          ) })
        ] })
      ] })
    }
  );
};
exports.ProfilePage = ProfilePage;
//# sourceMappingURL=ProfilePage-74366d25.js.map
