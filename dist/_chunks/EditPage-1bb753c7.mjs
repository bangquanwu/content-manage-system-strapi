import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Box, Flex, Typography, Button, Grid, GridItem, TextInput, Textarea, Main, HeaderLayout, ContentLayout } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
import { translatedErrors, useRBAC, LoadingIndicatorPage, useNotification, useFetchClient, useOverlayBlocker, useTracking, useAPIErrorHandler, SettingsPageTitle } from "@strapi/helper-plugin";
import { ArrowLeft } from "@strapi/icons";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { Redirect, useRouteMatch, NavLink } from "react-router-dom";
import * as yup from "yup";
import { b as useTypedSelector, s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { u as useAdminRoles } from "./useAdminRoles-501e111a.mjs";
import { u as useAdminRolePermissions, P as Permissions } from "./useAdminRolePermissions-8ef3650b.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-redux";
import "@radix-ui/react-context";
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
import "lodash/has";
import "lodash/groupBy";
const RoleForm = ({ disabled, role, values, errors, onChange, onBlur }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: role ? role.name : formatMessage({
          id: "global.details",
          defaultMessage: "Details"
        }) }) }),
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral500", variant: "pi", children: role ? role.description : formatMessage({
          id: "Settings.roles.form.description",
          defaultMessage: "Name and description of the role"
        }) }) })
      ] }),
      /* @__PURE__ */ jsx(Button, { disabled: true, variant: "secondary", children: formatMessage(
        {
          id: "Settings.roles.form.button.users-with-role",
          defaultMessage: "{number, plural, =0 {# users} one {# user} other {# users}} with this role"
        },
        { number: role.usersCount }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
      /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
        TextInput,
        {
          disabled,
          name: "name",
          error: errors.name && formatMessage({ id: errors.name }),
          label: formatMessage({
            id: "global.name",
            defaultMessage: "Name"
          }),
          onChange,
          onBlur,
          required: true,
          value: values.name || ""
        }
      ) }),
      /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
        Textarea,
        {
          disabled,
          label: formatMessage({
            id: "global.description",
            defaultMessage: "Description"
          }),
          id: "description",
          error: errors.name && formatMessage({ id: errors.name }),
          onChange,
          onBlur,
          children: values.description || ""
        }
      ) })
    ] })
  ] }) });
};
const EDIT_ROLE_SCHEMA = yup.object().shape({
  name: yup.string().required(translatedErrors.required)
});
const EditPage = () => {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const match = useRouteMatch("/settings/roles/:id");
  const id = match?.params.id;
  const { put, get } = useFetchClient();
  const [isSubmitting, setIsSubmiting] = React.useState(false);
  const permissionsRef = React.useRef(null);
  const { lockApp, unlockApp } = useOverlayBlocker();
  const { trackUsage } = useTracking();
  const { formatAPIError } = useAPIErrorHandler();
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
  const {
    roles,
    isLoading: isRoleLoading,
    refetch: refetchRole
  } = useAdminRoles(
    { id },
    {
      cacheTime: 0
    }
  );
  const role = roles[0] ?? {};
  const { permissions, isLoading: isLoadingPermissions } = useAdminRolePermissions(
    { id: id ?? null },
    {
      cacheTime: 0
    }
  );
  const handleEditRoleSubmit = async (data) => {
    try {
      lockApp?.();
      setIsSubmiting(true);
      const { permissionsToSend, didUpdateConditions } = permissionsRef.current?.getPermissions() ?? {};
      await put(`/admin/roles/${id}`, data);
      if (role.code !== "strapi-super-admin") {
        await put(`/admin/roles/${id}/permissions`, {
          permissions: permissionsToSend
        });
        if (didUpdateConditions) {
          trackUsage("didUpdateConditions");
        }
      }
      permissionsRef.current?.setFormAfterSubmit();
      await refetchRole();
      toggleNotification({
        type: "success",
        message: { id: "notification.success.saved" }
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
    } finally {
      setIsSubmiting(false);
      unlockApp?.();
    }
  };
  const isFormDisabled = !isRoleLoading && role.code === "strapi-super-admin";
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Roles" }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        enableReinitialize: true,
        initialValues: {
          name: role.name ?? "",
          description: role.description ?? ""
        },
        onSubmit: handleEditRoleSubmit,
        validationSchema: EDIT_ROLE_SCHEMA,
        validateOnChange: false,
        children: ({ handleSubmit, values, errors, handleChange, handleBlur }) => /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx(
            HeaderLayout,
            {
              primaryAction: /* @__PURE__ */ jsx(Flex, { gap: 2, children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: role.code === "strapi-super-admin",
                  onClick: handleSubmit,
                  loading: isSubmitting,
                  size: "L",
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              ) }),
              title: formatMessage({
                id: "Settings.roles.edit.title",
                defaultMessage: "Edit a role"
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
            /* @__PURE__ */ jsx(
              RoleForm,
              {
                disabled: isFormDisabled,
                errors,
                values,
                onChange: handleChange,
                onBlur: handleBlur,
                role
              }
            ),
            !isLoadingPermissionsLayout && !isRoleLoading && !isLoadingPermissions && permissionsLayout ? /* @__PURE__ */ jsx(Box, { shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(
              Permissions,
              {
                isFormDisabled,
                permissions,
                ref: permissionsRef,
                layout: permissionsLayout
              }
            ) }) : /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) })
          ] }) })
        ] })
      }
    )
  ] });
};
const ProtectedEditPage = () => {
  const permissions = useTypedSelector(selectAdminPermissions);
  const {
    isLoading,
    allowedActions: { canRead, canUpdate }
  } = useRBAC(permissions.settings?.roles);
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  if (!canRead && !canUpdate) {
    return /* @__PURE__ */ jsx(Redirect, { to: "/" });
  }
  return /* @__PURE__ */ jsx(EditPage, {});
};
export {
  EditPage,
  ProtectedEditPage
};
//# sourceMappingURL=EditPage-1bb753c7.mjs.map
