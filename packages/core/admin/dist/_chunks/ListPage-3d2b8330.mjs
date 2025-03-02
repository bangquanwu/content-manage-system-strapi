import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useNotifyAT, Layout, Main, HeaderLayout, ActionLayout, Typography, Button, ContentLayout, Box, Table, TFooter, Thead, Tr, Th, BaseCheckbox, VisuallyHidden, Tbody, Td, Flex, Switch, IconButton, EmptyStateLayout } from "@strapi/design-system";
import { LinkButton } from "@strapi/design-system/v2";
import { CheckPagePermissions, useAPIErrorHandler, useNotification, useFocusWhenNavigate, useRBAC, useFetchClient, SettingsPageTitle, LoadingIndicatorPage, ConfirmDialog } from "@strapi/helper-plugin";
import { Plus, Trash, Pencil, EmptyDocuments } from "@strapi/icons";
import { useIntl } from "react-intl";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import { s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
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
import "prop-types";
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
import "date-fns/parseISO";
import "lodash/isNumber";
const ListPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [webhooksToDelete, setWebhooksToDelete] = React.useState([]);
  const permissions = useSelector(selectAdminPermissions);
  const { formatMessage } = useIntl();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  useFocusWhenNavigate();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const {
    isLoading: isRBACLoading,
    allowedActions: { canCreate, canUpdate, canDelete }
  } = useRBAC(permissions.settings?.webhooks ?? {});
  const { get, post, put } = useFetchClient();
  const { notifyStatus } = useNotifyAT();
  const {
    isLoading: isWebhooksLoading,
    data: webhooks = [],
    error: webhooksError,
    refetch: refetchWebhooks
  } = useQuery("webhooks", async () => {
    const {
      data: { data }
    } = await get("/admin/webhooks");
    return data;
  });
  React.useEffect(() => {
    if (webhooksError) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(webhooksError)
      });
      return;
    }
    if (webhooks) {
      notifyStatus(
        formatMessage({
          id: "Settings.webhooks.list.loading.success",
          defaultMessage: "Webhooks have been loaded"
        })
      );
    }
  }, [webhooks, webhooksError, toggleNotification, formatMessage, notifyStatus, formatAPIError]);
  const deleteMutation = useMutation(
    () => post("/admin/webhooks/batch-delete", {
      ids: webhooksToDelete
    }),
    {
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
        setShowModal(false);
      },
      onSuccess() {
        setWebhooksToDelete([]);
        setShowModal(false);
        refetchWebhooks();
      }
    }
  );
  const enabledMutation = useMutation(({ id, ...webhook }) => put(`/admin/webhooks/${id}`, webhook), {
    onError(error) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
    },
    onSuccess() {
      refetchWebhooks();
    }
  });
  const confirmDelete = () => deleteMutation.mutate();
  const selectAllCheckbox = (selected) => selected ? setWebhooksToDelete(webhooks.map((webhook) => webhook.id)) : setWebhooksToDelete([]);
  const selectOneCheckbox = (selected, id) => selected ? setWebhooksToDelete((prev) => [...prev, id]) : setWebhooksToDelete((prev) => prev.filter((webhookId) => webhookId !== id));
  const goTo = (to) => () => push(`${pathname}/${to}`);
  const isLoading = isRBACLoading || isWebhooksLoading;
  const numberOfWebhooks = webhooks?.length ?? 0;
  const webhooksToDeleteLength = webhooksToDelete.length;
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Webhooks" }),
    /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title: formatMessage({ id: "Settings.webhooks.title", defaultMessage: "Webhooks" }),
          subtitle: formatMessage({
            id: "Settings.webhooks.list.description",
            defaultMessage: "Get POST changes notifications"
          }),
          primaryAction: canCreate && !isLoading && /* @__PURE__ */ jsx(
            LinkButton,
            {
              as: NavLink,
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              variant: "default",
              to: `${pathname}/create`,
              size: "S",
              children: formatMessage({
                id: "Settings.webhooks.list.button.add",
                defaultMessage: "Create new webhook"
              })
            }
          )
        }
      ),
      webhooksToDeleteLength > 0 && canDelete && /* @__PURE__ */ jsx(
        ActionLayout,
        {
          startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.webhooks.to.delete",
                defaultMessage: "{webhooksToDeleteLength, plural, one {# webhook} other {# webhooks}} selected"
              },
              { webhooksToDeleteLength }
            ) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => setShowModal(true),
                startIcon: /* @__PURE__ */ jsx(Trash, {}),
                size: "L",
                variant: "danger-light",
                children: formatMessage({
                  id: "global.delete",
                  defaultMessage: "Delete"
                })
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsx(ContentLayout, { children: isLoading ? /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) }) : numberOfWebhooks > 0 ? /* @__PURE__ */ jsxs(
        Table,
        {
          colCount: 5,
          rowCount: numberOfWebhooks + 1,
          footer: /* @__PURE__ */ jsx(TFooter, { onClick: canCreate ? goTo("create") : void 0, icon: /* @__PURE__ */ jsx(Plus, {}), children: formatMessage({
            id: "Settings.webhooks.list.button.add",
            defaultMessage: "Create new webhook"
          }) }),
          children: [
            /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
              /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(
                BaseCheckbox,
                {
                  "aria-label": formatMessage({
                    id: "global.select-all-entries",
                    defaultMessage: "Select all entries"
                  }),
                  indeterminate: webhooksToDeleteLength > 0 && webhooksToDeleteLength < numberOfWebhooks,
                  value: webhooksToDeleteLength === numberOfWebhooks,
                  onValueChange: selectAllCheckbox
                }
              ) }),
              /* @__PURE__ */ jsx(Th, { width: "20%", children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
                id: "global.name",
                defaultMessage: "Name"
              }) }) }),
              /* @__PURE__ */ jsx(Th, { width: "60%", children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
                id: "Settings.webhooks.form.url",
                defaultMessage: "URL"
              }) }) }),
              /* @__PURE__ */ jsx(Th, { width: "20%", children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
                id: "Settings.webhooks.list.th.status",
                defaultMessage: "Status"
              }) }) }),
              /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
                id: "Settings.webhooks.list.th.actions",
                defaultMessage: "Actions"
              }) }) })
            ] }) }),
            /* @__PURE__ */ jsx(Tbody, { children: webhooks.map((webhook) => /* @__PURE__ */ jsxs(
              Tr,
              {
                onClick: canUpdate ? goTo(webhook.id) : void 0,
                style: { cursor: canUpdate ? "pointer" : "default" },
                children: [
                  /* @__PURE__ */ jsx(Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(
                    BaseCheckbox,
                    {
                      "aria-label": `${formatMessage({
                        id: "global.select",
                        defaultMessage: "Select"
                      })} ${webhook.name}`,
                      value: webhooksToDelete?.includes(webhook.id),
                      onValueChange: (selected) => selectOneCheckbox(selected, webhook.id),
                      name: "select"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "semiBold", textColor: "neutral800", children: webhook.name }) }),
                  /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: webhook.url }) }),
                  /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(
                    Switch,
                    {
                      onLabel: formatMessage({
                        id: "global.enabled",
                        defaultMessage: "Enabled"
                      }),
                      offLabel: formatMessage({
                        id: "global.disabled",
                        defaultMessage: "Disabled"
                      }),
                      label: `${webhook.name} ${formatMessage({
                        id: "Settings.webhooks.list.th.status",
                        defaultMessage: "Status"
                      })}`,
                      selected: webhook.isEnabled,
                      onChange: (e) => {
                        e.stopPropagation();
                        enabledMutation.mutate({
                          ...webhook,
                          isEnabled: !webhook.isEnabled
                        });
                      },
                      visibleLabels: true
                    }
                  ) }) }),
                  /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
                    canUpdate && /* @__PURE__ */ jsx(
                      IconButton,
                      {
                        label: formatMessage({
                          id: "Settings.webhooks.events.update",
                          defaultMessage: "Update"
                        }),
                        icon: /* @__PURE__ */ jsx(Pencil, {}),
                        noBorder: true
                      }
                    ),
                    canDelete && /* @__PURE__ */ jsx(
                      IconButton,
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          setWebhooksToDelete([webhook.id]);
                          setShowModal(true);
                        },
                        label: formatMessage({
                          id: "Settings.webhooks.events.delete",
                          defaultMessage: "Delete webhook"
                        }),
                        icon: /* @__PURE__ */ jsx(Trash, {}),
                        noBorder: true
                      }
                    )
                  ] }) })
                ]
              },
              webhook.id
            )) })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "160px" }),
          content: formatMessage({
            id: "Settings.webhooks.list.empty.description",
            defaultMessage: "No webhooks found"
          }),
          action: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "secondary",
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              onClick: () => canCreate ? goTo("create") : {},
              children: formatMessage({
                id: "Settings.webhooks.list.button.add",
                defaultMessage: "Create new webhook"
              })
            }
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: showModal,
        onToggleDialog: () => setShowModal((prev) => !prev),
        onConfirm: confirmDelete,
        isConfirmButtonLoading: deleteMutation.isLoading
      }
    )
  ] });
};
const ProtectedListPage = () => {
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.webhooks.main, children: /* @__PURE__ */ jsx(ListPage, {}) });
};
export {
  ListPage,
  ProtectedListPage
};
//# sourceMappingURL=ListPage-3d2b8330.mjs.map
