import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Main, HeaderLayout, Flex, Button, ContentLayout, Box, Typography, Grid, GridItem, TextInput, Textarea } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
import { translatedErrors, CheckPagePermissions, useNotification, useOverlayBlocker, useTracking, useFetchClient, SettingsPageTitle, Form, LoadingIndicatorPage } from "@strapi/helper-plugin";
import { ArrowLeft } from "@strapi/icons";
import { format } from "date-fns";
import { Formik } from "formik";
import isEmpty from "lodash/isEmpty";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useRouteMatch, useHistory, NavLink } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { u as useAdminRolePermissions, P as Permissions } from "./useAdminRolePermissions-8ef3650b.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "@radix-ui/react-context";
import "lodash/camelCase";
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
import "axios";
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
import "react-dom";
import "lodash/isBoolean";
import "lodash/toNumber";
import "fractional-indexing";
import "lodash/uniqBy";
import "lodash/unset";
import "lodash/isArray";
import "date-fns/parseISO";
import "lodash/isNumber";
import "lodash/has";
import "lodash/groupBy";
const CREATE_SCHEMA = yup.object().shape({
  name: yup.string().required(translatedErrors.required),
  description: yup.string().required(translatedErrors.required)
});
const CreatePage = () => {
  const match = useRouteMatch("/settings/roles/duplicate/:id");
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const { formatMessage } = useIntl();
  const [isSubmitting, setIsSubmiting] = React.useState(false);
  const { replace } = useHistory();
  const permissionsRef = React.useRef(null);
  const { trackUsage } = useTracking();
  const { post, put, get } = useFetchClient();
  const id = match?.params.id ?? null;
  const { isLoading: isLoadingPermissionsLayout, data: permissionsLayout } = useQuery(
    ["permissions", id],
    async () => {
      const {
        data: { data }
      } = await get("/admin/permissions", {
        // TODO: check with BE why we deviate from our usual admin API format here
        params: { role: id }
      });
      return data;
    },
    {
      cacheTime: 0
    }
  );
  const { permissions: rolePermissions, isLoading: isLoadingRole } = useAdminRolePermissions(
    { id },
    {
      cacheTime: 0,
      // only fetch permissions if a role is cloned
      enabled: !!id
    }
  );
  const handleCreateRoleSubmit = (data) => {
    lockApp?.();
    setIsSubmiting(true);
    if (id) {
      trackUsage("willDuplicateRole");
    } else {
      trackUsage("willCreateNewRole");
    }
    Promise.resolve(post("/admin/roles", data)).then(async ({ data: res }) => {
      const { permissionsToSend } = permissionsRef.current?.getPermissions() ?? {};
      if (id) {
        trackUsage("didDuplicateRole");
      } else {
        trackUsage("didCreateNewRole");
      }
      if (res.data.id && !isEmpty(permissionsToSend)) {
        await put(`/admin/roles/${res.data.id}/permissions`, { permissions: permissionsToSend });
      }
      return res;
    }).then((res) => {
      setIsSubmiting(false);
      toggleNotification({
        type: "success",
        message: { id: "Settings.roles.created", defaultMessage: "created" }
      });
      replace(`/settings/roles/${res.data.id}`);
    }).catch((err) => {
      console.error(err);
      setIsSubmiting(false);
      toggleNotification({
        type: "warning",
        message: { id: "notification.error" }
      });
    }).finally(() => {
      unlockApp?.();
    });
  };
  const defaultDescription = `${formatMessage({
    id: "Settings.roles.form.created",
    defaultMessage: "Created"
  })} ${format(/* @__PURE__ */ new Date(), "PPP")}`;
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Roles" }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        initialValues: { name: "", description: defaultDescription },
        onSubmit: handleCreateRoleSubmit,
        validationSchema: CREATE_SCHEMA,
        validateOnChange: false,
        children: ({ handleSubmit, values, errors, handleReset, handleChange }) => /* @__PURE__ */ jsx(Form, { children: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            HeaderLayout,
            {
              primaryAction: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "secondary",
                    onClick: () => {
                      handleReset();
                      permissionsRef.current?.resetForm();
                    },
                    size: "L",
                    children: formatMessage({
                      id: "app.components.Button.reset",
                      defaultMessage: "Reset"
                    })
                  }
                ),
                /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, loading: isSubmitting, size: "L", children: formatMessage({
                  id: "global.save",
                  defaultMessage: "Save"
                }) })
              ] }),
              title: formatMessage({
                id: "Settings.roles.create.title",
                defaultMessage: "Create a role"
              }),
              subtitle: formatMessage({
                id: "Settings.roles.create.description",
                defaultMessage: "Define the rights given to the role"
              }),
              navigationAction: (
                // @ts-expect-error – the props from the component passed as `as` are not correctly inferred.
                /* @__PURE__ */ jsx(Link, { as: NavLink, startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: "/settings/roles", children: formatMessage({
                  id: "global.back",
                  defaultMessage: "Back"
                }) })
              )
            }
          ),
          /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
              /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
                /* @__PURE__ */ jsxs(Box, { children: [
                  /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: formatMessage({
                    id: "global.details",
                    defaultMessage: "Details"
                  }) }) }),
                  /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
                    id: "Settings.roles.form.description",
                    defaultMessage: "Name and description of the role"
                  }) }) })
                ] }),
                /* @__PURE__ */ jsx(UsersRoleNumber, { children: formatMessage(
                  {
                    id: "Settings.roles.form.button.users-with-role",
                    defaultMessage: "{number, plural, =0 {# users} one {# user} other {# users}} with this role"
                  },
                  { number: 0 }
                ) })
              ] }),
              /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
                /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    name: "name",
                    error: errors.name && formatMessage({ id: errors.name }),
                    label: formatMessage({
                      id: "global.name",
                      defaultMessage: "Name"
                    }),
                    onChange: handleChange,
                    required: true,
                    value: values.name
                  }
                ) }),
                /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    label: formatMessage({
                      id: "global.description",
                      defaultMessage: "Description"
                    }),
                    id: "description",
                    error: errors.description && formatMessage({ id: errors.description }),
                    onChange: handleChange,
                    children: values.description
                  }
                ) })
              ] })
            ] }) }),
            !isLoadingPermissionsLayout && !isLoadingRole && permissionsLayout ? /* @__PURE__ */ jsx(Box, { shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(
              Permissions,
              {
                isFormDisabled: false,
                ref: permissionsRef,
                permissions: rolePermissions,
                layout: permissionsLayout
              }
            ) }) : /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) })
          ] }) })
        ] }) })
      }
    )
  ] });
};
const UsersRoleNumber = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary200};
  background: ${({ theme }) => theme.colors.primary100};
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  color: ${({ theme }) => theme.colors.primary600};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${12 / 16}rem;
  font-weight: bold;
`;
const ProtectedCreatePage = () => {
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.roles.create, children: /* @__PURE__ */ jsx(CreatePage, {}) });
};
export {
  CreatePage,
  ProtectedCreatePage
};
//# sourceMappingURL=CreatePage-7d38bec7.mjs.map
