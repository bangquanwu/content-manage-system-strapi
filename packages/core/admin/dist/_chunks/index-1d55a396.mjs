import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useFetchClient, useNotification, useQueryParams, PageSizeURLQuery, PaginationURLQuery, onRowClick, stopPropagation, useRBAC, useFocusWhenNavigate, AnErrorOccurred, SettingsPageTitle, DynamicTable, CheckPagePermissions } from "@strapi/helper-plugin";
import { useSelector } from "react-redux";
import { f as useAdminUsers, s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { Flex, Typography, Loader, Box, Grid, JSONInput, ModalLayout, ModalHeader, ModalBody, Tbody, Tr, Td, IconButton, Combobox, ComboboxOption, Layout, ContentLayout, Main, HeaderLayout, ActionLayout } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { F as Filters } from "./Filters-8f3c8fcf.mjs";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Breadcrumbs, Crumb } from "@strapi/design-system/v2";
import PropTypes from "prop-types";
import parseISO from "date-fns/parseISO";
import { Eye } from "@strapi/icons";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react";
import "@radix-ui/react-context";
import "formik";
import "lodash/camelCase";
import "styled-components";
import "yup";
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
import "lodash/isEmpty";
import "react-dom";
import "lodash/isBoolean";
import "lodash/toNumber";
import "fractional-indexing";
import "lodash/uniqBy";
import "lodash/unset";
import "lodash/isArray";
import "lodash/isNumber";
const useAuditLogsData = ({ canReadAuditLogs, canReadUsers }) => {
  const { get } = useFetchClient();
  const { search } = useLocation();
  const toggleNotification = useNotification();
  const [{ query }] = useQueryParams();
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
  } = useAdminUsers(
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
  } = useQuery(
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
  const { formatDate } = useIntl();
  const formatTimeStamp = (value) => {
    const date = parseISO(value);
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
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "baseline", gap: 1, children: [
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", variant: "sigma", children: actionLabel }),
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", children: actionName })
  ] });
};
ActionItem.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired
};
const ActionBody = ({ status, data, formattedDate }) => {
  const { formatMessage } = useIntl();
  if (status === "loading") {
    return /* @__PURE__ */ jsx(Flex, { padding: 7, justifyContent: "center", alignItems: "center", children: /* @__PURE__ */ jsx(Loader, { children: "Loading content..." }) });
  }
  const { action, user, payload } = data;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { marginBottom: 3, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", id: "title", children: formatMessage({
      id: "Settings.permissions.auditLogs.details",
      defaultMessage: "Log Details"
    }) }) }),
    /* @__PURE__ */ jsxs(
      Grid,
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
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.date",
                defaultMessage: "Date"
              }),
              actionName: formattedDate
            }
          ),
          /* @__PURE__ */ jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.user",
                defaultMessage: "User"
              }),
              actionName: user?.displayName || "-"
            }
          ),
          /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(
      JSONInput,
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
  status: PropTypes.oneOf(["idle", "loading", "error", "success"]).isRequired,
  data: PropTypes.shape({
    action: PropTypes.string,
    date: PropTypes.string,
    payload: PropTypes.object,
    user: PropTypes.object
  }),
  formattedDate: PropTypes.string.isRequired
};
const Modal = ({ handleClose, logId }) => {
  const { get } = useFetchClient();
  const toggleNotification = useNotification();
  const fetchAuditLog = async (id) => {
    const { data: data2 } = await get(`/admin/audit-logs/${id}`);
    if (!data2) {
      throw new Error("Audit log not found");
    }
    return data2;
  };
  const { data, status } = useQuery(["audit-log", logId], () => fetchAuditLog(logId), {
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
  return /* @__PURE__ */ jsxs(ModalLayout, { onClose: handleClose, labelledBy: "title", children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Breadcrumbs, { label: formattedDate, id: "title", children: /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: formattedDate }) }) }),
    /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(ActionBody, { status, data, formattedDate }) })
  ] });
};
Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  logId: PropTypes.string.isRequired
};
const PaginationFooter = ({ pagination }) => {
  return /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "flex-end", justifyContent: "space-between", children: [
    /* @__PURE__ */ jsx(PageSizeURLQuery, {}),
    /* @__PURE__ */ jsx(PaginationURLQuery, { pagination })
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
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageCount: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number
  })
};
const TableRows = ({ headers, rows, onOpenModal }) => {
  const { formatMessage } = useIntl();
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
  return /* @__PURE__ */ jsx(Tbody, { children: rows.map((data) => {
    return /* @__PURE__ */ jsxs(
      Tr,
      {
        ...onRowClick({
          fn: () => onOpenModal(data.id)
        }),
        children: [
          headers.map(({ key, name, cellFormatter }) => {
            return /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: getCellValue({
              type: key,
              value: cellFormatter ? cellFormatter(data[name]) : data[name],
              model: data.payload?.model
            }) }) }, key);
          }),
          /* @__PURE__ */ jsx(Td, { ...stopPropagation, children: /* @__PURE__ */ jsx(Flex, { justifyContent: "end", children: /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => onOpenModal(data.id),
              "aria-label": formatMessage(
                { id: "app.component.table.view", defaultMessage: "{target} details" },
                { target: `${data.action} action` }
              ),
              noBorder: true,
              icon: /* @__PURE__ */ jsx(Eye, {})
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
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array,
  onOpenModal: PropTypes.func.isRequired
};
const ComboboxFilter = ({ value, options, onChange }) => {
  const { formatMessage } = useIntl();
  const ariaLabel = formatMessage({
    id: "Settings.permissions.auditLogs.filter.aria-label",
    defaultMessage: "Search and select an option to filter"
  });
  return /* @__PURE__ */ jsx(Combobox, { "aria-label": ariaLabel, value, onChange, children: options.map(({ label, customValue }) => {
    return /* @__PURE__ */ jsx(ComboboxOption, { value: customValue, children: label }, customValue);
  }) });
};
ComboboxFilter.defaultProps = {
  value: null
};
ComboboxFilter.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      customValue: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired
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
  const { formatMessage } = useIntl();
  const permissions = useSelector(selectAdminPermissions);
  const {
    allowedActions: { canRead: canReadAuditLogs, canReadUsers }
  } = useRBAC({
    ...permissions.settings.auditLogs,
    readUsers: permissions.settings.users.read
  });
  const [{ query }, setQuery] = useQueryParams();
  const { auditLogs, users, isLoading, hasError } = useAuditLogsData({
    canReadAuditLogs,
    canReadUsers
  });
  useFocusWhenNavigate();
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
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(Box, { paddingTop: 8, children: /* @__PURE__ */ jsx(AnErrorOccurred, {}) }) }) });
  }
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: title }),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        title,
        subtitle: formatMessage({
          id: "Settings.permissions.auditLogs.listview.header.subtitle",
          defaultMessage: "Logs of all the activities that happened in your environment"
        })
      }
    ),
    /* @__PURE__ */ jsx(ActionLayout, { startActions: /* @__PURE__ */ jsx(Filters, { displayedFilters }) }),
    /* @__PURE__ */ jsxs(ContentLayout, { canRead: canReadAuditLogs, children: [
      /* @__PURE__ */ jsx(
        DynamicTable,
        {
          contentType: "Audit logs",
          headers,
          rows: auditLogs?.results || [],
          withBulkActions: true,
          isLoading,
          children: /* @__PURE__ */ jsx(
            TableRows,
            {
              headers,
              rows: auditLogs?.results || [],
              onOpenModal: (id) => setQuery({ id })
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(PaginationFooter, { pagination: auditLogs?.pagination })
    ] }),
    query?.id && /* @__PURE__ */ jsx(Modal, { handleClose: () => setQuery({ id: null }, "remove"), logId: query.id })
  ] });
};
const ProtectedListPage = () => {
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings.auditLogs.main, children: /* @__PURE__ */ jsx(ListView, {}) });
};
export {
  ProtectedListPage as default
};
//# sourceMappingURL=index-1d55a396.mjs.map
