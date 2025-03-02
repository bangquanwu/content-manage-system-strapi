"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const axios = require("axios");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const reactRouterDom = require("react-router-dom");
const styled = require("styled-components");
const useContentTypes = require("./useContentTypes-7da293cc.js");
const index = require("./index-be8080e3.js");
const useLicenseLimits = require("./useLicenseLimits-e60a01b1.js");
const Layout = require("./Layout-a88f34e2.js");
const LimitsModal = require("./LimitsModal-3327be54.js");
const constants = require("./constants-85da8cc4.js");
const useReviewWorkflows = require("./useReviewWorkflows-26f7e558.js");
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
const React__default = /* @__PURE__ */ _interopDefault(React);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const ActionLink = styled__default.default(helperPlugin.Link)`
  align-items: center;
  height: ${helperPlugin.pxToRem(32)};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spaces[2]}}`};
  width: ${helperPlugin.pxToRem(32)};

  svg {
    height: ${helperPlugin.pxToRem(12)};
    width: ${helperPlugin.pxToRem(12)};

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
  const { formatMessage } = reactIntl.useIntl();
  const { push } = reactRouterDom.useHistory();
  const { trackUsage } = helperPlugin.useTracking();
  const [workflowToDelete, setWorkflowToDelete] = React__default.default.useState(null);
  const [showLimitModal, setShowLimitModal] = React__default.default.useState(false);
  const { collectionTypes, singleTypes, isLoading: isLoadingModels } = useContentTypes.useContentTypes();
  const { meta, workflows, isLoading, refetch } = useReviewWorkflows.useReviewWorkflows();
  const { del } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const toggleNotification = helperPlugin.useNotification();
  const { getFeature, isLoading: isLicenseLoading } = useLicenseLimits.useLicenseLimits();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const {
    allowedActions: { canCreate, canDelete }
  } = helperPlugin.useRBAC(permissions.settings?.["review-workflows"]);
  const limits = getFeature("review-workflows");
  const numberOfWorkflows = limits?.[constants.CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME];
  const { mutateAsync, isLoading: isLoadingMutation } = reactQuery.useMutation(
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
      if (error instanceof axios.AxiosError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
      return null;
    }
  };
  React__default.default.useEffect(() => {
    if (!isLoading && !isLicenseLoading) {
      if (numberOfWorkflows && meta && meta?.workflowCount > parseInt(numberOfWorkflows, 10)) {
        setShowLimitModal(true);
      }
    }
  }, [isLicenseLoading, isLoading, meta, meta?.workflowCount, numberOfWorkflows]);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Layout.Header,
      {
        primaryAction: canCreate && /* @__PURE__ */ jsxRuntime.jsx(
          helperPlugin.LinkButton,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
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
    /* @__PURE__ */ jsxRuntime.jsxs(Layout.Root, { children: [
      isLoading || isLoadingModels ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
        id: "Settings.review-workflows.page.list.isLoading",
        defaultMessage: "Workflows are loading"
      }) }) }) : /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Table,
        {
          colCount: 3,
          footer: (
            // TODO: we should be able to use a link here instead of an (inaccessible onClick) handler
            canCreate && /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TFooter,
              {
                icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
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
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.name.title",
                defaultMessage: "Name"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.stages.title",
                defaultMessage: "Stages"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.contentTypes.title",
                defaultMessage: "Content Types"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
                id: "Settings.review-workflows.list.page.list.column.actions.title",
                defaultMessage: "Actions"
              }) }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: workflows?.map((workflow) => /* @__PURE__ */ React.createElement(
              designSystem.Tr,
              {
                ...helperPlugin.onRowClick({
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
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: helperPlugin.pxToRem(250), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", fontWeight: "bold", ellipsis: true, children: workflow.name }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: workflow.stages.length }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: (workflow?.contentTypes ?? []).map(getContentTypeDisplayName).join(", ") }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", justifyContent: "end", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
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
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Pencil, {})
                  }
                ),
                workflows.length > 1 && canDelete && /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.IconButton,
                  {
                    "aria-label": formatMessage(
                      {
                        id: "Settings.review-workflows.list.page.list.column.actions.delete.label",
                        defaultMessage: "Delete {name}"
                      },
                      { name: "Default workflow" }
                    ),
                    icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {}),
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
      /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.ConfirmDialog,
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
      /* @__PURE__ */ jsxRuntime.jsxs(LimitsModal.LimitsModal.Root, { isOpen: showLimitModal, onClose: () => setShowLimitModal(false), children: [
        /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Title, { children: formatMessage({
          id: "Settings.review-workflows.list.page.workflows.limit.title",
          defaultMessage: "You’ve reached the limit of workflows in your plan"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Body, { children: formatMessage({
          id: "Settings.review-workflows.list.page.workflows.limit.body",
          defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
        }) })
      ] })
    ] })
  ] });
};
const ProtectedReviewWorkflowsPage = () => {
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.["review-workflows"].main, children: /* @__PURE__ */ jsxRuntime.jsx(ReviewWorkflowsListView, {}) });
};
exports.ProtectedReviewWorkflowsPage = ProtectedReviewWorkflowsPage;
exports.ReviewWorkflowsListView = ReviewWorkflowsListView;
//# sourceMappingURL=ListPage-d5fdabb7.js.map
