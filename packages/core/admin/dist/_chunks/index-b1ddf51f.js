"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const helperPlugin = require("@strapi/helper-plugin");
const reactRedux = require("react-redux");
const index = require("./index-be8080e3.js");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const Filters = require("./Filters-4d67a6ca.js");
const reactQuery = require("react-query");
const reactRouterDom = require("react-router-dom");
const v2 = require("@strapi/design-system/v2");
const PropTypes = require("prop-types");
const parseISO = require("date-fns/parseISO");
const Icons = require("@strapi/icons");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react");
require("@radix-ui/react-context");
require("formik");
require("lodash/camelCase");
require("styled-components");
require("yup");
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
require("lodash/upperFirst");
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
require("lodash/isNumber");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const parseISO__default = /* @__PURE__ */ _interopDefault(parseISO);
const useAuditLogsData = ({ canReadAuditLogs, canReadUsers }) => {
  const { get } = helperPlugin.useFetchClient();
  const { search } = reactRouterDom.useLocation();
  const toggleNotification = helperPlugin.useNotification();
  const [{ query }] = helperPlugin.useQueryParams();
  const queryOptions = {
    keepPreviousData: true,
    retry: false,
    staleTime: 1e3 * 20,
    // 20 seconds
    onError: (error) => toggleNotification({ type: "warning", message: error.message })
  };
  const {
    users,
    isError: isUsersError,
    isLoading: isLoadingUsers
  } = index.useAdminUsers(
    {},
    {
      ...queryOptions,
      enabled: canReadUsers,
      staleTime: 2 * (1e3 * 60)
      // 2 minutes
    }
  );
  const {
    data: auditLogs,
    isLoading: isLoadingAuditLogs,
    isError: isAuditLogsError
  } = reactQuery.useQuery(
    ["auditLogs", search],
    async () => {
      const { data } = await get(`/admin/audit-logs`, {
        params: query
      });
      return data;
    },
    {
      ...queryOptions,
      enabled: canReadAuditLogs
    }
  );
  return {
    auditLogs,
    users,
    isLoading: isLoadingUsers || isLoadingAuditLogs,
    hasError: isAuditLogsError || isUsersError
  };
};
const useFormatTimeStamp = () => {
  const { formatDate } = reactIntl.useIntl();
  const formatTimeStamp = (value) => {
    const date = parseISO__default.default(value);
    const formattedDate = formatDate(date, {
      dateStyle: "long"
    });
    const formattedTime = formatDate(date, {
      timeStyle: "medium",
      hourCycle: "h24"
    });
    return `${formattedDate}, ${formattedTime}`;
  };
  return formatTimeStamp;
};
const actionTypes = {
  "entry.create": "Create entry{model, select, undefined {} other { ({model})}}",
  "entry.update": "Update entry{model, select, undefined {} other { ({model})}}",
  "entry.delete": "Delete entry{model, select, undefined {} other { ({model})}}",
  "entry.publish": "Publish entry{model, select, undefined {} other { ({model})}}",
  "entry.unpublish": "Unpublish entry{model, select, undefined {} other { ({model})}}",
  "media.create": "Create media",
  "media.update": "Update media",
  "media.delete": "Delete media",
  "media-folder.create": "Create media folder",
  "media-folder.update": "Update media folder",
  "media-folder.delete": "Delete media folder",
  "user.create": "Create user",
  "user.update": "Update user",
  "user.delete": "Delete user",
  "admin.auth.success": "Admin login",
  "admin.logout": "Admin logout",
  "content-type.create": "Create content type",
  "content-type.update": "Update content type",
  "content-type.delete": "Delete content type",
  "component.create": "Create component",
  "component.update": "Update component",
  "component.delete": "Delete component",
  "role.create": "Create role",
  "role.update": "Update role",
  "role.delete": "Delete role",
  "permission.create": "Create permission",
  "permission.update": "Update permission",
  "permission.delete": "Delete permission"
};
const getDefaultMessage = (value) => {
  return actionTypes[value] || value;
};
const ActionItem = ({ actionLabel, actionName }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "baseline", gap: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", variant: "sigma", children: actionLabel }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", children: actionName })
  ] });
};
ActionItem.propTypes = {
  actionLabel: PropTypes__default.default.string.isRequired,
  actionName: PropTypes__default.default.string.isRequired
};
const ActionBody = ({ status, data, formattedDate }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { padding: 7, justifyContent: "center", alignItems: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: "Loading content..." }) });
  }
  const { action, user, payload } = data;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", id: "title", children: formatMessage({
      id: "Settings.permissions.auditLogs.details",
      defaultMessage: "Log Details"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Grid,
      {
        gap: 4,
        gridCols: 2,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6,
        marginBottom: 4,
        background: "neutral100",
        hasRadius: true,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.action",
                defaultMessage: "Action"
              }),
              actionName: formatMessage(
                {
                  id: `Settings.permissions.auditLogs.${action}`,
                  defaultMessage: getDefaultMessage(action)
                },
                { model: payload?.model }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.date",
                defaultMessage: "Date"
              }),
              actionName: formattedDate
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.user",
                defaultMessage: "User"
              }),
              actionName: user?.displayName || "-"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.userId",
                defaultMessage: "User ID"
              }),
              actionName: user?.id.toString() || "-"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.JSONInput,
      {
        value: JSON.stringify(payload, null, 2),
        disabled: true,
        label: formatMessage({
          id: "Settings.permissions.auditLogs.payload",
          defaultMessage: "Payload"
        })
      }
    )
  ] });
};
ActionBody.defaultProps = {
  data: {}
};
ActionBody.propTypes = {
  status: PropTypes__default.default.oneOf(["idle", "loading", "error", "success"]).isRequired,
  data: PropTypes__default.default.shape({
    action: PropTypes__default.default.string,
    date: PropTypes__default.default.string,
    payload: PropTypes__default.default.object,
    user: PropTypes__default.default.object
  }),
  formattedDate: PropTypes__default.default.string.isRequired
};
const Modal = ({ handleClose, logId }) => {
  const { get } = helperPlugin.useFetchClient();
  const toggleNotification = helperPlugin.useNotification();
  const fetchAuditLog = async (id) => {
    const { data: data2 } = await get(`/admin/audit-logs/${id}`);
    if (!data2) {
      throw new Error("Audit log not found");
    }
    return data2;
  };
  const { data, status } = reactQuery.useQuery(["audit-log", logId], () => fetchAuditLog(logId), {
    onError() {
      toggleNotification({
        type: "warning",
        message: { id: "notification.error", defaultMessage: "An error occured" }
      });
      handleClose();
    }
  });
  const formatTimeStamp = useFormatTimeStamp();
  const formattedDate = data ? formatTimeStamp(data.date) : "";
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ModalLayout, { onClose: handleClose, labelledBy: "title", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(v2.Breadcrumbs, { label: formattedDate, id: "title", children: /* @__PURE__ */ jsxRuntime.jsx(v2.Crumb, { isCurrent: true, children: formattedDate }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalBody, { children: /* @__PURE__ */ jsxRuntime.jsx(ActionBody, { status, data, formattedDate }) })
  ] });
};
Modal.propTypes = {
  handleClose: PropTypes__default.default.func.isRequired,
  logId: PropTypes__default.default.string.isRequired
};
const PaginationFooter = ({ pagination }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-end", justifyContent: "space-between", children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.PageSizeURLQuery, {}),
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.PaginationURLQuery, { pagination })
  ] }) });
};
PaginationFooter.defaultProps = {
  pagination: {
    pageCount: 0,
    pageSize: 50,
    total: 0
  }
};
PaginationFooter.propTypes = {
  pagination: PropTypes__default.default.shape({
    page: PropTypes__default.default.number,
    pageCount: PropTypes__default.default.number,
    pageSize: PropTypes__default.default.number,
    total: PropTypes__default.default.number
  })
};
const TableRows = ({ headers, rows, onOpenModal }) => {
  const { formatMessage } = reactIntl.useIntl();
  const formatTimeStamp = useFormatTimeStamp();
  const getCellValue = ({ type, value, model }) => {
    if (type === "date") {
      return formatTimeStamp(value);
    }
    if (type === "action") {
      return formatMessage(
        {
          id: `Settings.permissions.auditLogs.${value}`,
          defaultMessage: getDefaultMessage(value)
        },
        { model }
      );
    }
    return value || "-";
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: rows.map((data) => {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Tr,
      {
        ...helperPlugin.onRowClick({
          fn: () => onOpenModal(data.id)
        }),
        children: [
          headers.map(({ key, name, cellFormatter }) => {
            return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: getCellValue({
              type: key,
              value: cellFormatter ? cellFormatter(data[name]) : data[name],
              model: data.payload?.model
            }) }) }, key);
          }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { ...helperPlugin.stopPropagation, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "end", children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.IconButton,
            {
              onClick: () => onOpenModal(data.id),
              "aria-label": formatMessage(
                { id: "app.component.table.view", defaultMessage: "{target} details" },
                { target: `${data.action} action` }
              ),
              noBorder: true,
              icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Eye, {})
            }
          ) }) })
        ]
      },
      data.id
    );
  }) });
};
TableRows.defaultProps = {
  rows: []
};
TableRows.propTypes = {
  headers: PropTypes__default.default.array.isRequired,
  rows: PropTypes__default.default.array,
  onOpenModal: PropTypes__default.default.func.isRequired
};
const ComboboxFilter = ({ value, options, onChange }) => {
  const { formatMessage } = reactIntl.useIntl();
  const ariaLabel = formatMessage({
    id: "Settings.permissions.auditLogs.filter.aria-label",
    defaultMessage: "Search and select an option to filter"
  });
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Combobox, { "aria-label": ariaLabel, value, onChange, children: options.map(({ label, customValue }) => {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: customValue, children: label }, customValue);
  }) });
};
ComboboxFilter.defaultProps = {
  value: null
};
ComboboxFilter.propTypes = {
  value: PropTypes__default.default.string,
  options: PropTypes__default.default.arrayOf(
    PropTypes__default.default.shape({
      label: PropTypes__default.default.string.isRequired,
      customValue: PropTypes__default.default.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes__default.default.func.isRequired
};
const customOperators = [
  {
    intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
    value: "$eq"
  },
  {
    intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
    value: "$ne"
  }
];
const getDisplayedFilters = ({ formatMessage, users, canReadUsers }) => {
  const actionOptions = Object.keys(actionTypes).map((action) => {
    return {
      label: formatMessage(
        {
          id: `Settings.permissions.auditLogs.${action}`,
          defaultMessage: getDefaultMessage(action)
        },
        { model: void 0 }
      ),
      customValue: action
    };
  });
  const filters = [
    {
      name: "action",
      metadatas: {
        customOperators,
        label: formatMessage({
          id: "Settings.permissions.auditLogs.action",
          defaultMessage: "Action"
        }),
        customInput: ComboboxFilter,
        options: actionOptions
      },
      fieldSchema: { type: "enumeration" }
    },
    {
      name: "date",
      metadatas: {
        label: formatMessage({
          id: "Settings.permissions.auditLogs.date",
          defaultMessage: "Date"
        })
      },
      fieldSchema: { type: "datetime" }
    }
  ];
  if (canReadUsers && users) {
    const getDisplayNameFromUser = (user) => {
      if (user.username) {
        return user.username;
      }
      if (user.firstname && user.lastname) {
        return formatMessage(
          {
            id: "Settings.permissions.auditLogs.user.fullname",
            defaultMessage: "{firstname} {lastname}"
          },
          {
            firstname: user.firstname,
            lastname: user.lastname
          }
        );
      }
      return user.email;
    };
    const userOptions = users.map((user) => {
      return {
        label: getDisplayNameFromUser(user),
        // Combobox expects a string value
        customValue: user.id.toString()
      };
    });
    return [
      ...filters,
      {
        name: "user",
        metadatas: {
          customOperators,
          label: formatMessage({
            id: "Settings.permissions.auditLogs.user",
            defaultMessage: "User"
          }),
          options: userOptions,
          customInput: ComboboxFilter
        },
        fieldSchema: { type: "relation", mainField: { name: "id" } }
      }
    ];
  }
  return filters;
};
const tableHeaders = [
  {
    name: "action",
    key: "action",
    metadatas: {
      label: {
        id: "Settings.permissions.auditLogs.action",
        defaultMessage: "Action"
      },
      sortable: true
    }
  },
  {
    name: "date",
    key: "date",
    metadatas: {
      label: {
        id: "Settings.permissions.auditLogs.date",
        defaultMessage: "Date"
      },
      sortable: true
    }
  },
  {
    key: "user",
    name: "user",
    metadatas: {
      label: {
        id: "Settings.permissions.auditLogs.user",
        defaultMessage: "User"
      },
      sortable: false
    },
    cellFormatter: (user) => user ? user.displayName : ""
  }
];
const ListView = () => {
  const { formatMessage } = reactIntl.useIntl();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const {
    allowedActions: { canRead: canReadAuditLogs, canReadUsers }
  } = helperPlugin.useRBAC({
    ...permissions.settings.auditLogs,
    readUsers: permissions.settings.users.read
  });
  const [{ query }, setQuery] = helperPlugin.useQueryParams();
  const { auditLogs, users, isLoading, hasError } = useAuditLogsData({
    canReadAuditLogs,
    canReadUsers
  });
  helperPlugin.useFocusWhenNavigate();
  const displayedFilters = getDisplayedFilters({ formatMessage, users, canReadUsers });
  const title = formatMessage({
    id: "global.auditLogs",
    defaultMessage: "Audit Logs"
  });
  const headers = tableHeaders.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label)
    }
  }));
  if (hasError) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Layout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 8, children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.AnErrorOccurred, {}) }) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: title }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        title,
        subtitle: formatMessage({
          id: "Settings.permissions.auditLogs.listview.header.subtitle",
          defaultMessage: "Logs of all the activities that happened in your environment"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ActionLayout, { startActions: /* @__PURE__ */ jsxRuntime.jsx(Filters.Filters, { displayedFilters }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { canRead: canReadAuditLogs, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.DynamicTable,
        {
          contentType: "Audit logs",
          headers,
          rows: auditLogs?.results || [],
          withBulkActions: true,
          isLoading,
          children: /* @__PURE__ */ jsxRuntime.jsx(
            TableRows,
            {
              headers,
              rows: auditLogs?.results || [],
              onOpenModal: (id) => setQuery({ id })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(PaginationFooter, { pagination: auditLogs?.pagination })
    ] }),
    query?.id && /* @__PURE__ */ jsxRuntime.jsx(Modal, { handleClose: () => setQuery({ id: null }, "remove"), logId: query.id })
  ] });
};
const ProtectedListPage = () => {
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings.auditLogs.main, children: /* @__PURE__ */ jsxRuntime.jsx(ListView, {}) });
};
exports.default = ProtectedListPage;
//# sourceMappingURL=index-b1ddf51f.js.map
