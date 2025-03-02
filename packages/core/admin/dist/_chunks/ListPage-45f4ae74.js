"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const axios = require("axios");
const produce = require("immer");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-be8080e3.js");
const useAdminRoles = require("./useAdminRoles-485a39e5.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-redux");
require("react-query");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("formik");
require("lodash/camelCase");
require("styled-components");
require("yup");
require("lodash/defaultsDeep");
require("lodash/omit");
require("qs");
require("lodash/get");
require("lodash/set");
require("@reduxjs/toolkit");
require("react-dnd");
require("react-dnd-html5-backend");
require("react-window");
require("react-error-boundary");
require("lodash/cloneDeep");
require("lodash/isEqual");
require("lodash/upperFirst");
require("prop-types");
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
const produce__default = /* @__PURE__ */ _interopDefault(produce);
const RoleRow = ({
  id,
  name,
  description,
  usersCount,
  icons,
  rowIndex,
  canUpdate
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [, editObject] = icons;
  const usersCountText = formatMessage(
    {
      id: `Roles.RoleRow.user-count`,
      defaultMessage: "{number, plural, =0 {#  user} one {#  user} other {# users}}"
    },
    { number: usersCount }
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Tr,
    {
      "aria-rowindex": rowIndex,
      ...canUpdate ? helperPlugin.onRowClick({
        // @ts-expect-error – the prop uses `HTMLButtonElement` but we just specify `HTMLElement`
        fn: editObject.onClick
      }) : {},
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { maxWidth: helperPlugin.pxToRem(130), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, textColor: "neutral800", children: name }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { maxWidth: helperPlugin.pxToRem(250), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, textColor: "neutral800", children: description }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: usersCountText }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", ...helperPlugin.stopPropagation, children: icons.map(
          (icon, i) => icon ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: i === 0 ? 0 : 1, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.IconButton,
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
  const { formatMessage } = reactIntl.useIntl();
  helperPlugin.useFocusWhenNavigate();
  const permissions = index.useTypedSelector(index.selectAdminPermissions);
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const toggleNotification = helperPlugin.useNotification();
  const [isWarningDeleteAllOpened, setIsWarningDeleteAllOpenend] = React__namespace.useState(false);
  const [{ query }] = helperPlugin.useQueryParams();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canCreate, canDelete, canRead, canUpdate }
  } = helperPlugin.useRBAC(permissions.settings?.roles);
  const { roles, refetch: refetchRoles } = useAdminRoles.useAdminRoles(
    { filters: query?._q ? { name: { $containsi: query._q } } : void 0 },
    {
      cacheTime: 0,
      enabled: !isLoadingForPermissions && canRead
    }
  );
  const { push } = reactRouterDom.useHistory();
  const [{ showModalConfirmButtonLoading, roleToDelete }, dispatch] = React__namespace.useReducer(
    reducer,
    initialState
  );
  const { post } = helperPlugin.getFetchClient();
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
      if (error instanceof axios.AxiosError) {
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
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Roles" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        primaryAction: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleNewRoleClick, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}), size: "S", children: formatMessage({
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
    canRead && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.ActionLayout,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsx(
          helperPlugin.SearchURLQuery,
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
    canRead && /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Table,
      {
        colCount,
        rowCount,
        footer: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.TFooter, { onClick: handleNewRoleClick, icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}), children: formatMessage({
          id: "Settings.roles.list.button.add",
          defaultMessage: "Add new role"
        }) }) : null,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { "aria-rowindex": 1, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.name",
              defaultMessage: "Name"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.description",
              defaultMessage: "Description"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.users",
              defaultMessage: "Users"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
              id: "global.actions",
              defaultMessage: "Actions"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: roles?.map((role, index2) => /* @__PURE__ */ jsxRuntime.jsx(
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
                  icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Duplicate, {})
                },
                canUpdate && {
                  onClick: () => push(`/settings/roles/${role.id}`),
                  label: formatMessage({ id: "app.utils.edit", defaultMessage: "Edit" }),
                  icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Pencil, {})
                },
                canDelete && {
                  onClick: handleClickDelete(role),
                  label: formatMessage({ id: "global.delete", defaultMessage: "Delete" }),
                  icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
                }
              ].filter(Boolean),
              rowIndex: index2 + 2,
              canUpdate
            },
            role.id
          )) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.ConfirmDialog,
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
const reducer = (state, action) => produce__default.default(state, (draftState) => {
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
  const permissions = index.useTypedSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.roles.main, children: /* @__PURE__ */ jsxRuntime.jsx(ListPage, {}) });
};
exports.ListPage = ListPage;
exports.ProtectedListPage = ProtectedListPage;
//# sourceMappingURL=ListPage-45f4ae74.js.map
