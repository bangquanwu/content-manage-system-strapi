import { jsx, jsxs } from "react/jsx-runtime";
import { Layout, Main, HeaderLayout, Button, ContentLayout, Flex, Typography, Grid, GridItem, ToggleInput, Select, Option, MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { translatedErrors, CheckPagePermissions, useFocusWhenNavigate, useOverlayBlocker, useNotification, useAPIErrorHandler, useFetchClient, useRBAC, SettingsPageTitle, Form, LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Check } from "@strapi/icons";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { u as useAdminRoles } from "./useAdminRoles-501e111a.mjs";
import { s as selectAdminPermissions, p as formatAPIErrors } from "./index-90ba4fba.mjs";
import "react";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-router-dom";
import "@radix-ui/react-context";
import "@strapi/design-system/v2";
import "lodash/camelCase";
import "styled-components";
import "lodash/defaultsDeep";
import "lodash/omit";
import "qs";
import "immer";
import "lodash/get";
import "lodash/set";
import "@reduxjs/toolkit";
import "react-dnd";
import "react-dnd-html5-backend";
import "react-window";
import "react-error-boundary";
import "lodash/cloneDeep";
import "lodash/isEqual";
import "lodash/upperFirst";
import "prop-types";
import "lodash/size";
import "lodash/isNaN";
import "lodash/take";
import "slate";
import "slate-history";
import "slate-react";
import "@radix-ui/react-toolbar";
import "codemirror5";
import "sanitize-html";
import "highlight.js";
import "markdown-it";
import "markdown-it-abbr";
import "markdown-it-container";
import "markdown-it-deflist";
import "markdown-it-emoji";
import "markdown-it-footnote";
import "markdown-it-ins";
import "markdown-it-mark";
import "markdown-it-sub";
import "markdown-it-sup";
import "codemirror5/addon/display/placeholder";
import "lodash/toString";
import "lodash/isEmpty";
import "react-dom";
import "lodash/isBoolean";
import "lodash/toNumber";
import "fractional-indexing";
import "lodash/uniqBy";
import "lodash/unset";
import "lodash/isArray";
import "date-fns/parseISO";
import "lodash/isNumber";
const schema = yup.object().shape({
  autoRegister: yup.bool().required(translatedErrors.required),
  defaultRole: yup.mixed().when("autoRegister", (value, initSchema) => {
    return value ? initSchema.required(translatedErrors.required) : initSchema.nullable();
  }),
  ssoLockedRoles: yup.array().nullable().of(
    yup.mixed().when("ssoLockedRoles", (value, initSchema) => {
      return value ? initSchema.required(translatedErrors.required) : initSchema.nullable();
    })
  )
});
const SingleSignOnPage = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();
  const permissions = useSelector(selectAdminPermissions);
  const { lockApp, unlockApp } = useOverlayBlocker();
  const toggleNotification = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const { get, put } = useFetchClient();
  const { isLoading: isLoadingProviderOptions, data } = useQuery(
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
  const submitMutation = useMutation(
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
  } = useRBAC({
    ...permissions.settings?.sso,
    readRoles: permissions.settings?.roles.read ?? []
  });
  const { roles, isLoading: isLoadingRoles } = useAdminRoles(void 0, {
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
        if (err instanceof AxiosError && err.response) {
          const errors = formatAPIErrors(err.response.data);
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
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "SSO" }),
    /* @__PURE__ */ jsx(Main, { "aria-busy": isSubmittingForm || isLoadingData, tabIndex: -1, children: /* @__PURE__ */ jsx(
      Formik,
      {
        onSubmit: handleSubmit,
        initialValues: data || initialValues,
        validationSchema: schema,
        validateOnChange: false,
        enableReinitialize: true,
        children: ({ handleChange, isSubmitting, values, setFieldValue, dirty, errors }) => /* @__PURE__ */ jsxs(Form, { children: [
          /* @__PURE__ */ jsx(
            HeaderLayout,
            {
              primaryAction: /* @__PURE__ */ jsx(
                Button,
                {
                  "data-testid": "save-button",
                  disabled: !dirty,
                  loading: isSubmitting,
                  startIcon: /* @__PURE__ */ jsx(Check, {}),
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
          /* @__PURE__ */ jsx(ContentLayout, { children: isSubmitting || isLoadingData ? /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) : /* @__PURE__ */ jsxs(
            Flex,
            {
              direction: "column",
              alignItems: "stretch",
              gap: 4,
              background: "neutral0",
              padding: 6,
              shadow: "filterShadow",
              hasRadius: true,
              children: [
                /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h2", children: formatMessage({
                  id: "global.settings",
                  defaultMessage: "Settings"
                }) }),
                /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    ToggleInput,
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
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    Select,
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
                      children: roles.map(({ id, name }) => /* @__PURE__ */ jsx(Option, { value: id.toString(), children: name }, id))
                    }
                  ) }),
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    MultiSelect,
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
                      children: roles.map(({ id, name }) => /* @__PURE__ */ jsx(MultiSelectOption, { value: id.toString(), children: name }, id))
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
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.sso.main, children: /* @__PURE__ */ jsx(SingleSignOnPage, {}) });
};
export {
  ProtectedSSO,
  SingleSignOnPage
};
//# sourceMappingURL=SingleSignOnPage-fab0bcca.mjs.map
