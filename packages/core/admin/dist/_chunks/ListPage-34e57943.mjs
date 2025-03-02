import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { createElement } from "react";
import { Flex, Loader, Table, TFooter, Thead, Tr, Th, Typography, VisuallyHidden, Tbody, Td, IconButton } from "@strapi/design-system";
import { Link, pxToRem, CheckPagePermissions, useTracking, useFetchClient, useAPIErrorHandler, useNotification, useRBAC, LinkButton, onRowClick, ConfirmDialog } from "@strapi/helper-plugin";
import { Plus, Pencil, Trash } from "@strapi/icons";
import { AxiosError } from "axios";
import { useIntl } from "react-intl";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { u as useContentTypes } from "./useContentTypes-53b449bb.mjs";
import { s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { u as useLicenseLimits } from "./useLicenseLimits-497c0f5f.mjs";
import { H as Header, R as Root } from "./Layout-a1e7600f.mjs";
import { L as LimitsModal } from "./LimitsModal-d438f513.mjs";
import { C as CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME } from "./constants-8092eeb5.mjs";
import { u as useReviewWorkflows } from "./useReviewWorkflows-3e0bcb69.mjs";
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
const ActionLink = styled(Link)`
  align-items: center;
  height: ${pxToRem(32)};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spaces[2]}}`};
  width: ${pxToRem(32)};

  svg {
    height: ${pxToRem(12)};
    width: ${pxToRem(12)};

    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }

  &:hover,
  &:focus {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral800};
      }
    }
  }
`;
const ReviewWorkflowsListView = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const { trackUsage } = useTracking();
  const [workflowToDelete, setWorkflowToDelete] = React__default.useState(null);
  const [showLimitModal, setShowLimitModal] = React__default.useState(false);
  const { collectionTypes, singleTypes, isLoading: isLoadingModels } = useContentTypes();
  const { meta, workflows, isLoading, refetch } = useReviewWorkflows();
  const { del } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  const { getFeature, isLoading: isLicenseLoading } = useLicenseLimits();
  const permissions = useSelector(selectAdminPermissions);
  const {
    allowedActions: { canCreate, canDelete }
  } = useRBAC(permissions.settings?.["review-workflows"]);
  const limits = getFeature("review-workflows");
  const numberOfWorkflows = limits?.[CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME];
  const { mutateAsync, isLoading: isLoadingMutation } = useMutation(
    async ({ workflowId, stages }) => {
      const {
        data: { data }
      } = await del(`/admin/review-workflows/workflows/${workflowId}`, {
        data: stages
      });
      return data;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: { id: "notification.success.deleted", defaultMessage: "Deleted" }
        });
      }
    }
  );
  const getContentTypeDisplayName = (uid) => {
    const contentType = [...collectionTypes, ...singleTypes].find(
      (contentType2) => contentType2.uid === uid
    );
    return contentType?.info.displayName;
  };
  const handleDeleteWorkflow = (workflowId) => {
    setWorkflowToDelete(workflowId);
  };
  const toggleConfirmDeleteDialog = () => {
    setWorkflowToDelete(null);
  };
  const handleConfirmDeleteDialog = async () => {
    if (!workflowToDelete)
      return;
    try {
      const res = await mutateAsync({ workflowId: workflowToDelete });
      await refetch();
      setWorkflowToDelete(null);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
      return null;
    }
  };
  React__default.useEffect(() => {
    if (!isLoading && !isLicenseLoading) {
      if (numberOfWorkflows && meta && meta?.workflowCount > parseInt(numberOfWorkflows, 10)) {
        setShowLimitModal(true);
      }
    }
  }, [isLicenseLoading, isLoading, meta, meta?.workflowCount, numberOfWorkflows]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Header,
      {
        primaryAction: canCreate && /* @__PURE__ */ jsx(
          LinkButton,
          {
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            size: "S",
            to: "/settings/review-workflows/create",
            onClick: (event) => {
              if (numberOfWorkflows && meta && meta?.workflowCount >= parseInt(numberOfWorkflows, 10)) {
                event.preventDefault();
                setShowLimitModal(true);
              } else {
                trackUsage("willCreateWorkflow");
              }
            },
            children: formatMessage({
              id: "Settings.review-workflows.list.page.create",
              defaultMessage: "Create new workflow"
            })
          }
        ),
        subtitle: formatMessage({
          id: "Settings.review-workflows.list.page.subtitle",
          defaultMessage: "Manage your content review process"
        }),
        title: formatMessage({
          id: "Settings.review-workflows.list.page.title",
          defaultMessage: "Review Workflows"
        })
      }
    ),
    /* @__PURE__ */ jsxs(Root, { children: [
      isLoading || isLoadingModels ? /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({
        id: "Settings.review-workflows.page.list.isLoading",
        defaultMessage: "Workflows are loading"
      }) }) }) : /* @__PURE__ */ jsxs(
        Table,
        {
          colCount: 3,
          footer: (
            // TODO: we should be able to use a link here instead of an (inaccessible onClick) handler
            canCreate && /* @__PURE__ */ jsx(
              TFooter,
              {
                icon: /* @__PURE__ */ jsx(Plus, {}),
                onClick: () => {
                  if (numberOfWorkflows && meta && meta?.workflowCount >= parseInt(numberOfWorkflows, 10)) {
                    setShowLimitModal(true);
                  } else {
                    push("/settings/review-workflows/create");
                    trackUsage("willCreateWorkflow");
                  }
                },
                children: formatMessage({
                  id: "Settings.review-workflows.list.page.create",
                  defaultMessage: "Create new workflow"
                })
              }
            )
          ),
          rowCount: 1,
          children: [
            /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
              /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.name.title",
                defaultMessage: "Name"
              }) }) }),
              /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.stages.title",
                defaultMessage: "Stages"
              }) }) }),
              /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.contentTypes.title",
                defaultMessage: "Content Types"
              }) }) }),
              /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.actions.title",
                defaultMessage: "Actions"
              }) }) })
            ] }) }),
            /* @__PURE__ */ jsx(Tbody, { children: workflows?.map((workflow) => /* @__PURE__ */ createElement(
              Tr,
              {
                ...onRowClick({
                  fn(event) {
                    const el = event.target;
                    if (el.nodeName === "BUTTON") {
                      return;
                    }
                    push(`/settings/review-workflows/${workflow.id}`);
                  }
                }),
                key: `workflow-${workflow.id}`
              },
              /* @__PURE__ */ jsx(Td, { width: pxToRem(250), children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", fontWeight: "bold", ellipsis: true, children: workflow.name }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: workflow.stages.length }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: (workflow?.contentTypes ?? []).map(getContentTypeDisplayName).join(", ") }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", justifyContent: "end", children: [
                /* @__PURE__ */ jsx(
                  ActionLink,
                  {
                    to: `/settings/review-workflows/${workflow.id}`,
                    "aria-label": formatMessage(
                      {
                        id: "Settings.review-workflows.list.page.list.column.actions.edit.label",
                        defaultMessage: "Edit {name}"
                      },
                      { name: workflow.name }
                    ),
                    children: /* @__PURE__ */ jsx(Pencil, {})
                  }
                ),
                workflows.length > 1 && canDelete && /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    "aria-label": formatMessage(
                      {
                        id: "Settings.review-workflows.list.page.list.column.actions.delete.label",
                        defaultMessage: "Delete {name}"
                      },
                      { name: "Default workflow" }
                    ),
                    icon: /* @__PURE__ */ jsx(Trash, {}),
                    noBorder: true,
                    onClick: () => {
                      handleDeleteWorkflow(String(workflow.id));
                    }
                  }
                )
              ] }) })
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        ConfirmDialog,
        {
          bodyText: {
            id: "Settings.review-workflows.list.page.delete.confirm.body",
            defaultMessage: "If you remove this worfklow, all stage-related information will be removed for this content-type. Are you sure you want to remove it?"
          },
          isConfirmButtonLoading: isLoadingMutation,
          isOpen: !!workflowToDelete,
          onToggleDialog: toggleConfirmDeleteDialog,
          onConfirm: handleConfirmDeleteDialog
        }
      ),
      /* @__PURE__ */ jsxs(LimitsModal.Root, { isOpen: showLimitModal, onClose: () => setShowLimitModal(false), children: [
        /* @__PURE__ */ jsx(LimitsModal.Title, { children: formatMessage({
          id: "Settings.review-workflows.list.page.workflows.limit.title",
          defaultMessage: "You’ve reached the limit of workflows in your plan"
        }) }),
        /* @__PURE__ */ jsx(LimitsModal.Body, { children: formatMessage({
          id: "Settings.review-workflows.list.page.workflows.limit.body",
          defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
        }) })
      ] })
    ] })
  ] });
};
const ProtectedReviewWorkflowsPage = () => {
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.["review-workflows"].main, children: /* @__PURE__ */ jsx(ReviewWorkflowsListView, {}) });
};
export {
  ProtectedReviewWorkflowsPage,
  ReviewWorkflowsListView
};
//# sourceMappingURL=ListPage-34e57943.mjs.map
