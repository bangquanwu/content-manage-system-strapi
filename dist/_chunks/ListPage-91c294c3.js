"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const qs = require("qs");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const reactRouterDom = require("react-router-dom");
const index = require("./index-be8080e3.js");
const Filters = require("./Filters-4d67a6ca.js");
const Icons = require("@strapi/icons");
const v2 = require("@strapi/design-system/v2");
const axios = require("axios");
const formik = require("formik");
const yup = require("yup");
const SelectRoles = require("./SelectRoles-3b39c97c.js");
const AuthenticatedApp = require("./AuthenticatedApp-87c49d74.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("@radix-ui/react-context");
require("lodash/camelCase");
require("styled-components");
require("lodash/defaultsDeep");
require("lodash/omit");
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
require("semver/functions/lt");
require("semver/functions/valid");
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
const qs__namespace = /* @__PURE__ */ _interopNamespace(qs);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const CreateActionCE = ({ onClick }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Envelop, {}), size: "S", children: formatMessage({
    id: "Settings.permissions.users.create",
    defaultMessage: "Invite new user"
  }) });
};
const ModalForm = ({ onSuccess, onToggle }) => {
  const [currentStep, setStep] = React__namespace.useState("create");
  const [isSubmitting, setIsSubmitting] = React__namespace.useState(false);
  const [registrationToken, setRegistrationToken] = React__namespace.useState("");
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const { post } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const roleLayout = index.useEnterprise(
    ROLE_LAYOUT,
    async () => (await Promise.resolve().then(() => require("./ModalForm-715b963e.js"))).ROLE_LAYOUT,
    {
      combine(ceRoles, eeRoles) {
        return [...ceRoles, ...eeRoles];
      },
      defaultValue: []
    }
  );
  const initialValues = index.useEnterprise(
    FORM_INITIAL_VALUES,
    async () => (await Promise.resolve().then(() => require("./ModalForm-715b963e.js"))).FORM_INITIAL_VALUES,
    {
      combine(ceValues, eeValues) {
        return {
          ...ceValues,
          ...eeValues
        };
      },
      defaultValue: FORM_INITIAL_VALUES
    }
  );
  const MagicLink = index.useEnterprise(
    SelectRoles.MagicLinkCE,
    async () => (await Promise.resolve().then(() => require("./MagicLinkEE-75499605.js"))).MagicLinkEE
  );
  const postMutation = reactQuery.useMutation(
    (body) => post(
      "/admin/users",
      body
    ),
    {
      onMutate() {
        if (lockApp) {
          lockApp();
        }
        setIsSubmitting(true);
      },
      async onSuccess({ data: { data } }) {
        if (data.registrationToken) {
          setRegistrationToken(data.registrationToken);
          await onSuccess();
          goNext();
        } else {
          toggleNotification({
            type: "warning",
            message: { id: "notification.error", defaultMessage: "An error occured" }
          });
        }
      },
      onError(err) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(err)
        });
        throw err;
      },
      onSettled() {
        if (unlockApp) {
          unlockApp();
        }
        setIsSubmitting(false);
      }
    }
  );
  const headerTitle = formatMessage({
    id: "Settings.permissions.users.create",
    defaultMessage: "Invite new user"
  });
  const handleSubmit = async (body, { setErrors }) => {
    try {
      await postMutation.mutateAsync({
        ...body,
        roles: body.roles ?? []
      });
    } catch (err) {
      if (err instanceof axios.AxiosError && err.response?.data?.error.message === "Email already taken") {
        setErrors({ email: err.response.data.error.message });
      }
    }
  };
  const goNext = () => {
    if (next) {
      setStep(next);
    } else {
      onToggle();
    }
  };
  const { buttonSubmitLabel, isDisabled, next } = STEPPER[currentStep];
  const endActions = currentStep === "create" ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", loading: isSubmitting, children: formatMessage(buttonSubmitLabel) }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "button", loading: isSubmitting, onClick: onToggle, children: formatMessage(buttonSubmitLabel) });
  if (!MagicLink) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ModalLayout, { onClose: onToggle, labelledBy: "title", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(v2.Breadcrumbs, { label: headerTitle, children: /* @__PURE__ */ jsxRuntime.jsx(v2.Crumb, { isCurrent: true, children: headerTitle }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        enableReinitialize: true,
        initialValues: initialValues ?? {},
        onSubmit: handleSubmit,
        validationSchema: FORM_SCHEMA,
        validateOnChange: false,
        children: ({ errors, handleChange, values }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalBody, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              currentStep !== "create" && /* @__PURE__ */ jsxRuntime.jsx(MagicLink, { registrationToken }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: formatMessage({
                  id: "app.components.Users.ModalCreateBody.block-title.details",
                  defaultMessage: "User details"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid, { gap: 5, children: FORM_LAYOUT.map((row) => {
                  return row.map((input) => {
                    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { ...input.size, children: /* @__PURE__ */ jsxRuntime.jsx(
                      helperPlugin.GenericInput,
                      {
                        ...input,
                        disabled: isDisabled,
                        error: errors[input.name],
                        onChange: handleChange,
                        value: values[input.name]
                      }
                    ) }, input.name);
                  });
                }) }) }) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", children: formatMessage({
                  id: "global.roles",
                  defaultMessage: "User's role"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 5, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    SelectRoles.SelectRoles,
                    {
                      disabled: isDisabled,
                      error: errors.roles,
                      onChange: handleChange,
                      value: values.roles ?? []
                    }
                  ) }),
                  roleLayout.map((row) => {
                    return row.map((input) => {
                      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { ...input.size, children: /* @__PURE__ */ jsxRuntime.jsx(
                        helperPlugin.GenericInput,
                        {
                          ...input,
                          disabled: isDisabled,
                          onChange: handleChange,
                          value: values[input.name]
                        }
                      ) }, input.name);
                    });
                  })
                ] }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.ModalFooter,
              {
                startActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: onToggle, type: "button", children: formatMessage({
                  id: "app.components.Button.cancel",
                  defaultMessage: "Cancel"
                }) }),
                endActions
              }
            )
          ] });
        }
      }
    )
  ] });
};
const FORM_INITIAL_VALUES = {
  firstname: "",
  lastname: "",
  email: "",
  roles: []
};
const ROLE_LAYOUT = [];
const FORM_LAYOUT = [
  [
    {
      intlLabel: {
        id: "Auth.form.firstname.label",
        defaultMessage: "First name"
      },
      name: "firstname",
      placeholder: {
        id: "Auth.form.firstname.placeholder",
        defaultMessage: "e.g. Kai"
      },
      type: "text",
      size: {
        col: 6,
        xs: 12
      },
      required: true
    },
    {
      intlLabel: {
        id: "Auth.form.lastname.label",
        defaultMessage: "Last name"
      },
      name: "lastname",
      placeholder: {
        id: "Auth.form.lastname.placeholder",
        defaultMessage: "e.g. Doe"
      },
      type: "text",
      size: {
        col: 6,
        xs: 12
      }
    }
  ],
  [
    {
      intlLabel: {
        id: "Auth.form.email.label",
        defaultMessage: "Email"
      },
      name: "email",
      placeholder: {
        id: "Auth.form.email.placeholder",
        defaultMessage: "e.g. kai.doe@strapi.io"
      },
      type: "email",
      size: {
        col: 6,
        xs: 12
      },
      required: true
    }
  ]
];
const FORM_SCHEMA = yup__namespace.object().shape({
  firstname: yup__namespace.string().trim().required(helperPlugin.translatedErrors.required),
  lastname: yup__namespace.string(),
  email: yup__namespace.string().email(helperPlugin.translatedErrors.email).required(helperPlugin.translatedErrors.required),
  roles: yup__namespace.array().min(1, helperPlugin.translatedErrors.required).required(helperPlugin.translatedErrors.required)
});
const STEPPER = {
  create: {
    buttonSubmitLabel: {
      id: "app.containers.Users.ModalForm.footer.button-success",
      defaultMessage: "Invite user"
    },
    isDisabled: false,
    next: "magic-link"
  },
  "magic-link": {
    buttonSubmitLabel: { id: "global.finish", defaultMessage: "Finish" },
    isDisabled: true,
    next: null
  }
};
const TableRows = ({
  canDelete,
  headers = [],
  entriesToDelete = [],
  onClickDelete,
  onSelectRow,
  withMainAction,
  withBulkActions,
  rows = []
}) => {
  const {
    push,
    location: { pathname }
  } = reactRouterDom.useHistory();
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: rows.map((data) => {
    const isChecked = entriesToDelete.findIndex((id) => id === data.id) !== -1;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Tr,
      {
        ...helperPlugin.onRowClick({
          fn: () => push(`${pathname}/${data.id}`),
          condition: withBulkActions
        }),
        children: [
          withMainAction && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { ...helperPlugin.stopPropagation, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.BaseCheckbox,
            {
              "aria-label": formatMessage(
                {
                  id: "app.component.table.select.one-entry",
                  defaultMessage: `Select {target}`
                },
                { target: AuthenticatedApp.getFullName(data?.firstname ?? "", data.lastname) }
              ),
              checked: isChecked,
              onChange: () => {
                if (onSelectRow) {
                  onSelectRow({ name: data.id, value: !isChecked });
                }
              }
            }
          ) }),
          headers.map(({ key, cellFormatter, name, ...rest }) => {
            return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: typeof cellFormatter === "function" ? cellFormatter(data, { key, name, formatMessage, ...rest }) : (
              // @ts-expect-error – name === "roles" has the data value of `AdminRole[]` but the header has a cellFormatter value so this shouldn't be called.
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: data[name] || "-" })
            ) }, key);
          }),
          withBulkActions && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => push(`${pathname}/${data.id}`),
                label: formatMessage(
                  { id: "app.component.table.edit", defaultMessage: "Edit {target}" },
                  { target: AuthenticatedApp.getFullName(data.firstname ?? "", data.lastname) }
                ),
                noBorder: true,
                icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Pencil, {})
              }
            ),
            canDelete && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 1, ...helperPlugin.stopPropagation, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => {
                  if (onClickDelete) {
                    onClickDelete(data.id);
                  }
                },
                label: formatMessage(
                  { id: "global.delete-target", defaultMessage: "Delete {target}" },
                  { target: AuthenticatedApp.getFullName(data.firstname ?? "", data.lastname) }
                ),
                noBorder: true,
                icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
              }
            ) })
          ] }) })
        ]
      },
      data.id
    );
  }) });
};
const EE_LICENSE_LIMIT_QUERY_KEY = ["ee", "license-limit-info"];
const ListPageCE = () => {
  const { post } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const [isModalOpened, setIsModalOpen] = React__namespace.useState(false);
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const {
    allowedActions: { canCreate, canDelete, canRead }
  } = helperPlugin.useRBAC(permissions.settings?.users);
  const queryClient = reactQuery.useQueryClient();
  const toggleNotification = helperPlugin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { search } = reactRouterDom.useLocation();
  helperPlugin.useFocusWhenNavigate();
  const {
    users,
    pagination,
    isError,
    isLoading,
    refetch: refetchAdminUsers
  } = index.useAdminUsers(qs__namespace.parse(search, { ignoreQueryPrefix: true }), {
    cacheTime: 0,
    enabled: canRead
  });
  const CreateAction = index.useEnterprise(
    CreateActionCE,
    async () => (await Promise.resolve().then(() => require("./CreateActionEE-42bd2b19.js"))).CreateActionEE
  );
  const headers = TABLE_HEADERS.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label)
    }
  }));
  const title = formatMessage({
    id: "global.users",
    defaultMessage: "Users"
  });
  const handleToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  const deleteAllMutation = reactQuery.useMutation(
    async (ids) => post(
      "/admin/users/batch-delete",
      { ids }
    ),
    {
      async onSuccess() {
        await refetchAdminUsers();
        await queryClient.refetchQueries(EE_LICENSE_LIMIT_QUERY_KEY);
      },
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
    }
  );
  if (!CreateAction) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Users" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        primaryAction: canCreate && /* @__PURE__ */ jsxRuntime.jsx(CreateAction, { onClick: handleToggle }),
        title,
        subtitle: formatMessage({
          id: "Settings.permissions.users.listview.header.subtitle",
          defaultMessage: "All the users who have access to the Strapi admin panel"
        })
      }
    ),
    canRead && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.ActionLayout,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            helperPlugin.SearchURLQuery,
            {
              label: formatMessage(
                { id: "app.component.search.label", defaultMessage: "Search for {target}" },
                { target: title }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(Filters.Filters, { displayedFilters: DISPLAYED_HEADERS })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { children: [
      !canRead && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.NoPermissions, {}),
      isError && /* @__PURE__ */ jsxRuntime.jsx("div", { children: "TODO: An error occurred" }),
      canRead && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          helperPlugin.DynamicTable,
          {
            contentType: "Users",
            isLoading,
            onConfirmDeleteAll: async (ids) => {
              await deleteAllMutation.mutateAsync(ids);
            },
            onConfirmDelete: async (id) => {
              await deleteAllMutation.mutateAsync([id]);
            },
            headers,
            rows: users,
            withBulkActions: true,
            withMainAction: canDelete,
            children: /* @__PURE__ */ jsxRuntime.jsx(TableRows, { canDelete })
          }
        ),
        pagination && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-end", justifyContent: "space-between", children: [
          /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.PageSizeURLQuery, {}),
          /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.PaginationURLQuery, { pagination })
        ] }) })
      ] })
    ] }),
    isModalOpened && /* @__PURE__ */ jsxRuntime.jsx(
      ModalForm,
      {
        onSuccess: async () => {
          await refetchAdminUsers();
          await queryClient.refetchQueries(EE_LICENSE_LIMIT_QUERY_KEY);
        },
        onToggle: handleToggle
      }
    )
  ] });
};
const TABLE_HEADERS = [
  {
    name: "firstname",
    key: "firstname",
    metadatas: {
      label: {
        id: "Settings.permissions.users.firstname",
        defaultMessage: "Firstname"
      },
      sortable: true
    }
  },
  {
    name: "lastname",
    key: "lastname",
    metadatas: {
      label: {
        id: "Settings.permissions.users.lastname",
        defaultMessage: "Lastname"
      },
      sortable: true
    }
  },
  {
    key: "email",
    name: "email",
    metadatas: {
      label: { id: "Settings.permissions.users.email", defaultMessage: "Email" },
      sortable: true
    }
  },
  {
    key: "roles",
    name: "roles",
    metadatas: {
      label: {
        id: "Settings.permissions.users.roles",
        defaultMessage: "Roles"
      },
      sortable: false
    },
    cellFormatter({ roles }, { formatMessage }) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: roles.map(
        (role) => formatMessage({
          id: `Settings.permissions.users.${role.code}`,
          defaultMessage: role.name
        })
      ).join(",\n") });
    }
  },
  {
    key: "username",
    name: "username",
    metadatas: {
      label: {
        id: "Settings.permissions.users.username",
        defaultMessage: "Username"
      },
      sortable: true
    }
  },
  {
    key: "isActive",
    name: "isActive",
    metadatas: {
      label: {
        id: "Settings.permissions.users.user-status",
        defaultMessage: "User status"
      },
      sortable: false
    },
    cellFormatter({ isActive }, { formatMessage }) {
      return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.Status, { variant: isActive ? "success" : "danger" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: formatMessage({
          id: isActive ? "Settings.permissions.users.active" : "Settings.permissions.users.inactive",
          defaultMessage: isActive ? "Active" : "Inactive"
        }) })
      ] });
    }
  }
];
const DISPLAYED_HEADERS = [
  {
    name: "firstname",
    metadatas: { label: "Firstname" },
    fieldSchema: { type: "string" }
  },
  {
    name: "lastname",
    metadatas: { label: "Lastname" },
    fieldSchema: { type: "string" }
  },
  {
    name: "email",
    metadatas: { label: "Email" },
    fieldSchema: { type: "email" }
  },
  {
    name: "username",
    metadatas: { label: "Username" },
    fieldSchema: { type: "string" }
  },
  {
    name: "isActive",
    metadatas: { label: "Active user" },
    fieldSchema: { type: "boolean" }
  }
];
const ListPage = () => {
  const UsersListPage = index.useEnterprise(
    ListPageCE,
    async () => (
      // eslint-disable-next-line import/no-cycle
      (await Promise.resolve().then(() => require("./ListPage-117d16bf.js"))).UserListPageEE
    )
  );
  if (!UsersListPage) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(UsersListPage, {});
};
const ProtectedListPage = () => {
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.users.main, children: /* @__PURE__ */ jsxRuntime.jsx(ListPage, {}) });
};
exports.ListPage = ListPage;
exports.ListPageCE = ListPageCE;
exports.ProtectedListPage = ProtectedListPage;
//# sourceMappingURL=ListPage-91c294c3.js.map
