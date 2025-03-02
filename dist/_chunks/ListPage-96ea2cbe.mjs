import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Tr, Td, Typography, Flex, Box, IconButton, Main, HeaderLayout, Button, ActionLayout, ContentLayout, Table, TFooter, Thead, Th, VisuallyHidden, Tbody } from "@strapi/design-system";
import { onRowClick, pxToRem, stopPropagation, CheckPagePermissions, useFocusWhenNavigate, useAPIErrorHandler, useNotification, useQueryParams, useRBAC, getFetchClient, LoadingIndicatorPage, SettingsPageTitle, SearchURLQuery, ConfirmDialog } from "@strapi/helper-plugin";
import { Plus, Duplicate, Pencil, Trash } from "@strapi/icons";
import { AxiosError } from "axios";
import produce from "immer";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { b as useTypedSelector, s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { u as useAdminRoles } from "./useAdminRoles-501e111a.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-redux";
import "react-query";
import "@radix-ui/react-context";
import "@strapi/design-system/v2";
import "formik";
import "lodash/camelCase";
import "styled-components";
import "yup";
import "lodash/defaultsDeep";
import "lodash/omit";
import "qs";
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
const RoleRow = ({
  id,
  name,
  description,
  usersCount,
  icons,
  rowIndex,
  canUpdate
}) => {
  const { formatMessage } = useIntl();
  const [, editObject] = icons;
  const usersCountText = formatMessage(
    {
      id: `Roles.RoleRow.user-count`,
      defaultMessage: "{number, plural, =0 {#  user} one {#  user} other {# users}}"
    },
    { number: usersCount }
  );
  return /* @__PURE__ */ jsxs(
    Tr,
    {
      "aria-rowindex": rowIndex,
      ...canUpdate ? onRowClick({
        // @ts-expect-error – the prop uses `HTMLButtonElement` but we just specify `HTMLElement`
        fn: editObject.onClick
      }) : {},
      children: [
        /* @__PURE__ */ jsx(Td, { maxWidth: pxToRem(130), children: /* @__PURE__ */ jsx(Typography, { ellipsis: true, textColor: "neutral800", children: name }) }),
        /* @__PURE__ */ jsx(Td, { maxWidth: pxToRem(250), children: /* @__PURE__ */ jsx(Typography, { ellipsis: true, textColor: "neutral800", children: description }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: usersCountText }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", ...stopPropagation, children: icons.map(
          (icon, i) => icon ? /* @__PURE__ */ jsx(Box, { paddingLeft: i === 0 ? 0 : 1, children: /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: icon.onClick,
              label: icon.label,
              borderWidth: 0,
              icon: icon.icon
            }
          ) }, icon.label) : null
        ) }) })
      ]
    },
    id
  );
};
const ListPage = () => {
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  const permissions = useTypedSelector(selectAdminPermissions);
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  const [isWarningDeleteAllOpened, setIsWarningDeleteAllOpenend] = React.useState(false);
  const [{ query }] = useQueryParams();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canCreate, canDelete, canRead, canUpdate }
  } = useRBAC(permissions.settings?.roles);
  const { roles, refetch: refetchRoles } = useAdminRoles(
    { filters: query?._q ? { name: { $containsi: query._q } } : void 0 },
    {
      cacheTime: 0,
      enabled: !isLoadingForPermissions && canRead
    }
  );
  const { push } = useHistory();
  const [{ showModalConfirmButtonLoading, roleToDelete }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  const { post } = getFetchClient();
  const handleDeleteData = async () => {
    try {
      dispatch({
        type: "ON_REMOVE_ROLES"
      });
      await post("/admin/roles/batch-delete", {
        ids: [roleToDelete]
      });
      await refetchRoles();
      dispatch({
        type: "RESET_DATA_TO_DELETE"
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
    }
    handleToggleModal();
  };
  const handleNewRoleClick = () => push("/settings/roles/new");
  const handleToggleModal = () => setIsWarningDeleteAllOpenend((prev) => !prev);
  const handleClickDelete = (role) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (role.usersCount) {
      toggleNotification({
        type: "info",
        message: { id: "Roles.ListPage.notification.delete-not-allowed" }
      });
    } else {
      dispatch({
        type: "SET_ROLE_TO_DELETE",
        id: role.id
      });
      handleToggleModal();
    }
  };
  const handleClickDuplicate = (role) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    push(`/settings/roles/duplicate/${role.id}`);
  };
  const rowCount = roles.length + 1;
  const colCount = 6;
  if (isLoadingForPermissions) {
    return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) });
  }
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Roles" }),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        primaryAction: canCreate ? /* @__PURE__ */ jsx(Button, { onClick: handleNewRoleClick, startIcon: /* @__PURE__ */ jsx(Plus, {}), size: "S", children: formatMessage({
          id: "Settings.roles.list.button.add",
          defaultMessage: "Add new role"
        }) }) : null,
        title: formatMessage({
          id: "global.roles",
          defaultMessage: "roles"
        }),
        subtitle: formatMessage({
          id: "Settings.roles.list.description",
          defaultMessage: "List of roles"
        }),
        as: "h2"
      }
    ),
    canRead && /* @__PURE__ */ jsx(
      ActionLayout,
      {
        startActions: /* @__PURE__ */ jsx(
          SearchURLQuery,
          {
            label: formatMessage(
              { id: "app.component.search.label", defaultMessage: "Search for {target}" },
              {
                target: formatMessage({
                  id: "global.roles",
                  defaultMessage: "roles"
                })
              }
            )
          }
        )
      }
    ),
    canRead && /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(
      Table,
      {
        colCount,
        rowCount,
        footer: canCreate ? /* @__PURE__ */ jsx(TFooter, { onClick: handleNewRoleClick, icon: /* @__PURE__ */ jsx(Plus, {}), children: formatMessage({
          id: "Settings.roles.list.button.add",
          defaultMessage: "Add new role"
        }) }) : null,
        children: [
          /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { "aria-rowindex": 1, children: [
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.name",
              defaultMessage: "Name"
            }) }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.description",
              defaultMessage: "Description"
            }) }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.users",
              defaultMessage: "Users"
            }) }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
              id: "global.actions",
              defaultMessage: "Actions"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsx(Tbody, { children: roles?.map((role, index) => /* @__PURE__ */ jsx(
            RoleRow,
            {
              id: role.id,
              name: role.name,
              description: role.description,
              usersCount: role.usersCount,
              icons: [
                canCreate && {
                  onClick: handleClickDuplicate(role),
                  label: formatMessage({
                    id: "app.utils.duplicate",
                    defaultMessage: "Duplicate"
                  }),
                  icon: /* @__PURE__ */ jsx(Duplicate, {})
                },
                canUpdate && {
                  onClick: () => push(`/settings/roles/${role.id}`),
                  label: formatMessage({ id: "app.utils.edit", defaultMessage: "Edit" }),
                  icon: /* @__PURE__ */ jsx(Pencil, {})
                },
                canDelete && {
                  onClick: handleClickDelete(role),
                  label: formatMessage({ id: "global.delete", defaultMessage: "Delete" }),
                  icon: /* @__PURE__ */ jsx(Trash, {})
                }
              ].filter(Boolean),
              rowIndex: index + 2,
              canUpdate
            },
            role.id
          )) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: isWarningDeleteAllOpened,
        onConfirm: handleDeleteData,
        isConfirmButtonLoading: showModalConfirmButtonLoading,
        onToggleDialog: handleToggleModal
      }
    )
  ] });
};
const initialState = {
  roleToDelete: null,
  showModalConfirmButtonLoading: false,
  shouldRefetchData: false
};
const reducer = (state, action) => produce(state, (draftState) => {
  switch (action.type) {
    case "ON_REMOVE_ROLES": {
      draftState.showModalConfirmButtonLoading = true;
      break;
    }
    case "ON_REMOVE_ROLES_SUCCEEDED": {
      draftState.shouldRefetchData = true;
      draftState.roleToDelete = null;
      break;
    }
    case "RESET_DATA_TO_DELETE": {
      draftState.shouldRefetchData = false;
      draftState.roleToDelete = null;
      draftState.showModalConfirmButtonLoading = false;
      break;
    }
    case "SET_ROLE_TO_DELETE": {
      draftState.roleToDelete = action.id;
      break;
    }
    default:
      return draftState;
  }
});
const ProtectedListPage = () => {
  const permissions = useTypedSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.roles.main, children: /* @__PURE__ */ jsx(ListPage, {}) });
};
export {
  ListPage,
  ProtectedListPage
};
//# sourceMappingURL=ListPage-96ea2cbe.mjs.map
