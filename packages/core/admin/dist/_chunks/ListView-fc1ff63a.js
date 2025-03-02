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
const TABLE_HEADERS = [
  {
    name: "name",
    key: "name",
    metadatas: {
      label: {
        id: "Settings.apiTokens.ListView.headers.name",
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
        id: "Settings.apiTokens.ListView.headers.description",
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
        id: "Settings.apiTokens.ListView.headers.createdAt",
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
        id: "Settings.apiTokens.ListView.headers.lastUsedAt",
        defaultMessage: "Last used"
      },
      sortable: false
    }
  }
];
const ListView = () => {
  helperPlugin.useFocusWhenNavigate();
  const queryClient = reactQuery.useQueryClient();
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const {
    allowedActions: { canCreate, canDelete, canUpdate, canRead }
  } = helperPlugin.useRBAC(permissions.settings?.["api-tokens"]);
  const { push } = reactRouterDom.useHistory();
  const { trackUsage } = helperPlugin.useTracking();
  const { startSection } = helperPlugin.useGuidedTour();
  const startSectionRef = React__namespace.useRef(startSection);
  const { get, del } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  React__namespace.useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("apiTokens");
    }
  }, []);
  React__namespace.useEffect(() => {
    push({ search: qs__default.default.stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [push]);
  const headers = TABLE_HEADERS.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label)
    }
  }));
  const { data: apiTokens, isLoading: isLoadingTokens } = reactQuery.useQuery(
    ["api-tokens"],
    async () => {
      trackUsage("willAccessTokenList", {
        tokenType: constants.API_TOKEN_TYPE
      });
      const {
        data: { data }
      } = await get(`/admin/api-tokens`);
      trackUsage("didAccessTokenList", { number: data.length, tokenType: constants.API_TOKEN_TYPE });
      return data;
    },
    {
      cacheTime: 0,
      enabled: canRead,
      onError(error) {
        if (error instanceof axios.AxiosError) {
          toggleNotification({
            type: "warning",
            message: formatAPIError(error)
          });
        }
      }
    }
  );
  const isLoading = isLoadingTokens;
  const deleteMutation = reactQuery.useMutation(
    async (id) => {
      await del(`/admin/api-tokens/${id}`);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries(["api-tokens"]);
        trackUsage("didDeleteToken");
      },
      onError(error) {
        if (error instanceof axios.AxiosError) {
          toggleNotification({ type: "warning", message: formatAPIError(error) });
        }
      }
    }
  );
  const hasApiTokens = apiTokens && apiTokens.length > 0;
  const shouldDisplayDynamicTable = canRead && hasApiTokens;
  const shouldDisplayNoContent = canRead && !hasApiTokens && !canCreate;
  const shouldDisplayNoContentWithCreationButton = canRead && !hasApiTokens && canCreate;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "API Tokens" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        title: formatMessage({ id: "Settings.apiTokens.title", defaultMessage: "API Tokens" }),
        subtitle: formatMessage({
          id: "Settings.apiTokens.description",
          defaultMessage: "List of generated tokens to consume the API"
        }),
        primaryAction: canCreate && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            "data-testid": "create-api-token-button",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: constants.API_TOKEN_TYPE
            }),
            to: "/settings/api-tokens/create",
            children: formatMessage({
              id: "Settings.apiTokens.create",
              defaultMessage: "Create new API Token"
            })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { children: [
      !canRead && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.NoPermissions, {}),
      shouldDisplayDynamicTable && /* @__PURE__ */ jsxRuntime.jsx(
        Table.Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          contentType: "api-tokens",
          isLoading,
          onConfirmDelete: (id) => deleteMutation.mutateAsync(id),
          tokens: apiTokens,
          tokenType: constants.API_TOKEN_TYPE
        }
      ),
      shouldDisplayNoContentWithCreationButton && /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.NoContent,
        {
          content: {
            id: "Settings.apiTokens.addFirstToken",
            defaultMessage: "Add your first API Token"
          },
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.LinkButton, { variant: "secondary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}), to: "/settings/api-tokens/create", children: formatMessage({
            id: "Settings.apiTokens.addNewToken",
            defaultMessage: "Add new API Token"
          }) })
        }
      ),
      shouldDisplayNoContent && /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.NoContent,
        {
          content: {
            id: "Settings.apiTokens.emptyStateLayout",
            defaultMessage: "You don’t have any content yet..."
          }
        }
      )
    ] })
  ] });
};
const ProtectedListView = () => {
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.["api-tokens"].main, children: /* @__PURE__ */ jsxRuntime.jsx(ListView, {}) });
};
exports.ListView = ListView;
exports.ProtectedListView = ProtectedListView;
//# sourceMappingURL=ListView-fc1ff63a.js.map
