import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Main, HeaderLayout, LinkButton, ContentLayout } from "@strapi/design-system";
import { CheckPagePermissions, useFocusWhenNavigate, useNotification, useRBAC, useTracking, useGuidedTour, useFetchClient, useAPIErrorHandler, SettingsPageTitle, NoPermissions, NoContent } from "@strapi/helper-plugin";
import { Plus } from "@strapi/icons";
import { AxiosError } from "axios";
import qs__default from "qs";
import { useIntl } from "react-intl";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { A as API_TOKEN_TYPE } from "./constants-d3dd8ed6.mjs";
import { T as Table } from "./Table-3f09118e.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "@radix-ui/react-context";
import "@strapi/design-system/v2";
import "formik";
import "lodash/camelCase";
import "styled-components";
import "yup";
import "lodash/defaultsDeep";
import "lodash/omit";
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
  useFocusWhenNavigate();
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const permissions = useSelector(selectAdminPermissions);
  const {
    allowedActions: { canCreate, canDelete, canUpdate, canRead }
  } = useRBAC(permissions.settings?.["api-tokens"]);
  const { push } = useHistory();
  const { trackUsage } = useTracking();
  const { startSection } = useGuidedTour();
  const startSectionRef = React.useRef(startSection);
  const { get, del } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  React.useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("apiTokens");
    }
  }, []);
  React.useEffect(() => {
    push({ search: qs__default.stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [push]);
  const headers = TABLE_HEADERS.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label)
    }
  }));
  const { data: apiTokens, isLoading: isLoadingTokens } = useQuery(
    ["api-tokens"],
    async () => {
      trackUsage("willAccessTokenList", {
        tokenType: API_TOKEN_TYPE
      });
      const {
        data: { data }
      } = await get(`/admin/api-tokens`);
      trackUsage("didAccessTokenList", { number: data.length, tokenType: API_TOKEN_TYPE });
      return data;
    },
    {
      cacheTime: 0,
      enabled: canRead,
      onError(error) {
        if (error instanceof AxiosError) {
          toggleNotification({
            type: "warning",
            message: formatAPIError(error)
          });
        }
      }
    }
  );
  const isLoading = isLoadingTokens;
  const deleteMutation = useMutation(
    async (id) => {
      await del(`/admin/api-tokens/${id}`);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries(["api-tokens"]);
        trackUsage("didDeleteToken");
      },
      onError(error) {
        if (error instanceof AxiosError) {
          toggleNotification({ type: "warning", message: formatAPIError(error) });
        }
      }
    }
  );
  const hasApiTokens = apiTokens && apiTokens.length > 0;
  const shouldDisplayDynamicTable = canRead && hasApiTokens;
  const shouldDisplayNoContent = canRead && !hasApiTokens && !canCreate;
  const shouldDisplayNoContentWithCreationButton = canRead && !hasApiTokens && canCreate;
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "API Tokens" }),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        title: formatMessage({ id: "Settings.apiTokens.title", defaultMessage: "API Tokens" }),
        subtitle: formatMessage({
          id: "Settings.apiTokens.description",
          defaultMessage: "List of generated tokens to consume the API"
        }),
        primaryAction: canCreate && /* @__PURE__ */ jsx(
          LinkButton,
          {
            "data-testid": "create-api-token-button",
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: API_TOKEN_TYPE
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
    /* @__PURE__ */ jsxs(ContentLayout, { children: [
      !canRead && /* @__PURE__ */ jsx(NoPermissions, {}),
      shouldDisplayDynamicTable && /* @__PURE__ */ jsx(
        Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          contentType: "api-tokens",
          isLoading,
          onConfirmDelete: (id) => deleteMutation.mutateAsync(id),
          tokens: apiTokens,
          tokenType: API_TOKEN_TYPE
        }
      ),
      shouldDisplayNoContentWithCreationButton && /* @__PURE__ */ jsx(
        NoContent,
        {
          content: {
            id: "Settings.apiTokens.addFirstToken",
            defaultMessage: "Add your first API Token"
          },
          action: /* @__PURE__ */ jsx(LinkButton, { variant: "secondary", startIcon: /* @__PURE__ */ jsx(Plus, {}), to: "/settings/api-tokens/create", children: formatMessage({
            id: "Settings.apiTokens.addNewToken",
            defaultMessage: "Add new API Token"
          }) })
        }
      ),
      shouldDisplayNoContent && /* @__PURE__ */ jsx(
        NoContent,
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
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.["api-tokens"].main, children: /* @__PURE__ */ jsx(ListView, {}) });
};
export {
  ListView,
  ProtectedListView
};
//# sourceMappingURL=ListView-b2087f3a.mjs.map
