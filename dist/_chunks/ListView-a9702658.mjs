import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Main, HeaderLayout, LinkButton, ContentLayout } from "@strapi/design-system";
import { CheckPagePermissions, useFocusWhenNavigate, useNotification, useRBAC, useTracking, useGuidedTour, useFetchClient, SettingsPageTitle, NoPermissions, NoContent } from "@strapi/helper-plugin";
import { Plus } from "@strapi/icons";
import { AxiosError } from "axios";
import qs__default from "qs";
import { useIntl } from "react-intl";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { T as TRANSFER_TOKEN_TYPE } from "./constants-d3dd8ed6.mjs";
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
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const permissions = useSelector(selectAdminPermissions);
  const {
    allowedActions: { canCreate, canDelete, canUpdate, canRead }
    // @ts-expect-error this is fine
  } = useRBAC(permissions.settings["transfer-tokens"]);
  const { push } = useHistory();
  const { trackUsage } = useTracking();
  const { startSection } = useGuidedTour();
  const startSectionRef = React.useRef(startSection);
  const { get, del } = useFetchClient();
  React.useEffect(() => {
    if (startSectionRef.current) {
      startSectionRef.current("transferTokens");
    }
  }, []);
  React.useEffect(() => {
    push({ search: qs__default.stringify({ sort: "name:ASC" }, { encode: false }) });
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
  } = useQuery(
    ["transfer-tokens"],
    async () => {
      trackUsage("willAccessTokenList", {
        tokenType: TRANSFER_TOKEN_TYPE
      });
      const {
        data: { data }
      } = await get(`/admin/transfer/tokens`);
      trackUsage("didAccessTokenList", { number: data.length, tokenType: TRANSFER_TOKEN_TYPE });
      return data;
    },
    {
      enabled: canRead,
      onError(err) {
        if (err instanceof AxiosError) {
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
  const deleteMutation = useMutation(
    async (id) => {
      await del(`/admin/transfer/tokens/${id}`);
    },
    {
      async onSuccess() {
        await refetch(["transfer-tokens"]);
      },
      onError(err) {
        if (err instanceof AxiosError) {
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
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Transfer Tokens" }),
    /* @__PURE__ */ jsx(
      HeaderLayout,
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
        primaryAction: canCreate ? /* @__PURE__ */ jsx(
          LinkButton,
          {
            "data-testid": "create-transfer-token-button",
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: TRANSFER_TOKEN_TYPE
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
    /* @__PURE__ */ jsxs(ContentLayout, { children: [
      !canRead && /* @__PURE__ */ jsx(NoPermissions, {}),
      shouldDisplayDynamicTable && /* @__PURE__ */ jsx(
        Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          contentType: "trasfer-tokens",
          isLoading,
          onConfirmDelete: (id) => deleteMutation.mutateAsync(id),
          tokens: transferTokens,
          tokenType: TRANSFER_TOKEN_TYPE
        }
      ),
      shouldDisplayNoContentWithCreationButton && /* @__PURE__ */ jsx(
        NoContent,
        {
          content: {
            id: "Settings.transferTokens.addFirstToken",
            defaultMessage: "Add your first Transfer Token"
          },
          action: /* @__PURE__ */ jsx(
            LinkButton,
            {
              variant: "secondary",
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              to: "/settings/transfer-tokens/create",
              children: formatMessage({
                id: "Settings.transferTokens.addNewToken",
                defaultMessage: "Add new Transfer Token"
              })
            }
          )
        }
      ),
      shouldDisplayNoContent && /* @__PURE__ */ jsx(
        NoContent,
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
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.["transfer-tokens"].main, children: /* @__PURE__ */ jsx(ListView, {}) });
};
export {
  ListView,
  ProtectedListView
};
//# sourceMappingURL=ListView-a9702658.mjs.map
