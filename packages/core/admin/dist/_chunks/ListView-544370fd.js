"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const axios = require("axios");
const qs = require("qs");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const reactRouterDom = require("react-router-dom");
const index = require("./index-be8080e3.js");
const constants = require("./constants-da2542a3.js");
const Table = require("./Table-69c2c269.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("formik");
require("lodash/camelCase");
require("styled-components");
require("yup");
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
const qs__default = /* @__PURE__ */ _interopDefault(qs);
const tableHeaders = [
  {
    name: "name",
    key: "name",
    metadatas: {
      label: {
        id: "Settings.tokens.ListView.headers.name",
        defaultMessage: "Name"
      },
      sortable: true
    }
  },
  {
    name: "description",
    key: "description",
    metadatas: {
      label: {
        id: "Settings.tokens.ListView.headers.description",
        defaultMessage: "Description"
      },
      sortable: false
    }
  },
  {
    name: "createdAt",
    key: "createdAt",
    metadatas: {
      label: {
        id: "Settings.tokens.ListView.headers.createdAt",
        defaultMessage: "Created at"
      },
      sortable: false
    }
  },
  {
    name: "lastUsedAt",
    key: "lastUsedAt",
    metadatas: {
      label: {
        id: "Settings.tokens.ListView.headers.lastUsedAt",
        defaultMessage: "Last used"
      },
      sortable: false
    }
  }
];
const ListView = () => {
  helperPlugin.useFocusWhenNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const {
    allowedActions: { canCreate, canDelete, canUpdate, canRead }
    // @ts-expect-error this is fine
  } = helperPlugin.useRBAC(permissions.settings["transfer-tokens"]);
  const { push } = reactRouterDom.useHistory();
  const { trackUsage } = helperPlugin.useTracking();
  const { startSection } = helperPlugin.useGuidedTour();
  const startSectionRef = React__namespace.useRef(startSection);
  const { get, del } = helperPlugin.useFetchClient();
  React__namespace.useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("transferTokens");
    }
  }, []);
  React__namespace.useEffect(() => {
    push({ search: qs__default.default.stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [push]);
  const headers = tableHeaders.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label)
    }
  }));
  const {
    data: transferTokens,
    status,
    isFetching,
    refetch
  } = reactQuery.useQuery(
    ["transfer-tokens"],
    async () => {
      trackUsage("willAccessTokenList", {
        tokenType: constants.TRANSFER_TOKEN_TYPE
      });
      const {
        data: { data }
      } = await get(`/admin/transfer/tokens`);
      trackUsage("didAccessTokenList", { number: data.length, tokenType: constants.TRANSFER_TOKEN_TYPE });
      return data;
    },
    {
      enabled: canRead,
      onError(err) {
        if (err instanceof axios.AxiosError) {
          if (err?.response?.data?.error?.details?.code === "INVALID_TOKEN_SALT") {
            toggleNotification({
              type: "warning",
              message: {
                id: "notification.error.invalid.configuration",
                defaultMessage: "You have an invalid configuration, check your server log for more information."
              }
            });
          } else {
            toggleNotification({
              type: "warning",
              message: { id: "notification.error", defaultMessage: "An error occured" }
            });
          }
        }
      }
    }
  );
  const isLoading = canRead && (status !== "success" && status !== "error" || status === "success" && isFetching);
  const deleteMutation = reactQuery.useMutation(
    async (id) => {
      await del(`/admin/transfer/tokens/${id}`);
    },
    {
      async onSuccess() {
        await refetch(["transfer-tokens"]);
      },
      onError(err) {
        if (err instanceof axios.AxiosError) {
          if (err?.response?.data?.data) {
            toggleNotification({ type: "warning", message: err.response.data.data });
          } else if (err?.response?.data?.error?.details?.code === "INVALID_TOKEN_SALT") {
            toggleNotification({
              type: "warning",
              message: {
                id: "notification.error.invalid.configuration",
                defaultMessage: "You have an invalid configuration, check your server log for more information."
              }
            });
          } else {
            toggleNotification({
              type: "warning",
              message: { id: "notification.error", defaultMessage: "An error occured" }
            });
          }
        }
      }
    }
  );
  const hasTransferTokens = transferTokens && transferTokens?.length > 0;
  const shouldDisplayDynamicTable = canRead && hasTransferTokens;
  const shouldDisplayNoContent = canRead && !hasTransferTokens && !canCreate;
  const shouldDisplayNoContentWithCreationButton = canRead && !hasTransferTokens && canCreate;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Transfer Tokens" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        title: formatMessage({
          id: "Settings.transferTokens.title",
          defaultMessage: "Transfer Tokens"
        }),
        subtitle: formatMessage({
          id: "Settings.transferTokens.description",
          defaultMessage: '"List of generated transfer tokens"'
          // TODO change this message
        }),
        primaryAction: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            "data-testid": "create-transfer-token-button",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: constants.TRANSFER_TOKEN_TYPE
            }),
            to: "/settings/transfer-tokens/create",
            children: formatMessage({
              id: "Settings.transferTokens.create",
              defaultMessage: "Create new Transfer Token"
            })
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { children: [
      !canRead && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.NoPermissions, {}),
      shouldDisplayDynamicTable && /* @__PURE__ */ jsxRuntime.jsx(
        Table.Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          contentType: "trasfer-tokens",
          isLoading,
          onConfirmDelete: (id) => deleteMutation.mutateAsync(id),
          tokens: transferTokens,
          tokenType: constants.TRANSFER_TOKEN_TYPE
        }
      ),
      shouldDisplayNoContentWithCreationButton && /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.NoContent,
        {
          content: {
            id: "Settings.transferTokens.addFirstToken",
            defaultMessage: "Add your first Transfer Token"
          },
          action: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.LinkButton,
            {
              variant: "secondary",
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
              to: "/settings/transfer-tokens/create",
              children: formatMessage({
                id: "Settings.transferTokens.addNewToken",
                defaultMessage: "Add new Transfer Token"
              })
            }
          )
        }
      ),
      shouldDisplayNoContent && /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.NoContent,
        {
          content: {
            id: "Settings.transferTokens.emptyStateLayout",
            defaultMessage: "You don’t have any content yet..."
          }
        }
      )
    ] })
  ] });
};
const ProtectedListView = () => {
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.["transfer-tokens"].main, children: /* @__PURE__ */ jsxRuntime.jsx(ListView, {}) });
};
exports.ListView = ListView;
exports.ProtectedListView = ProtectedListView;
//# sourceMappingURL=ListView-544370fd.js.map
