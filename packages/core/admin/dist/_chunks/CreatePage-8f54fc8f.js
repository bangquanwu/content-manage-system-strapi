"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const axios = require("axios");
const formik = require("formik");
const set = require("lodash/set");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const reactRouterDom = require("react-router-dom");
const useAdminRoles = require("./useAdminRoles-485a39e5.js");
const useContentTypes = require("./useContentTypes-7da293cc.js");
const validateWorkflow = require("./validateWorkflow-eb4bc61e.js");
const useLicenseLimits = require("./useLicenseLimits-e60a01b1.js");
const Layout = require("./Layout-a88f34e2.js");
const LimitsModal = require("./LimitsModal-3327be54.js");
const constants = require("./constants-85da8cc4.js");
const useReviewWorkflows = require("./useReviewWorkflows-26f7e558.js");
require("./index-be8080e3.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("lodash/camelCase");
require("styled-components");
require("yup");
require("lodash/defaultsDeep");
require("lodash/omit");
require("qs");
require("immer");
require("lodash/get");
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
require("./colors-c17c9c3c.js");
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
const set__default = /* @__PURE__ */ _interopDefault(set);
const ReviewWorkflowsCreatePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { post } = helperPlugin.useFetchClient();
  const { push } = reactRouterDom.useHistory();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const dispatch = reactRedux.useDispatch();
  const toggleNotification = helperPlugin.useNotification();
  const { collectionTypes, singleTypes, isLoading: isLoadingContentTypes } = useContentTypes.useContentTypes();
  const { isLoading: isLoadingWorkflow, meta, workflows } = useReviewWorkflows.useReviewWorkflows();
  const { isLoading: isLoadingRoles, roles: serverRoles } = useAdminRoles.useAdminRoles(void 0, {
    retry: false
  });
  const isLoading = reactRedux.useSelector(validateWorkflow.selectIsLoading);
  const currentWorkflowIsDirty = reactRedux.useSelector(validateWorkflow.selectIsWorkflowDirty);
  const currentWorkflow = reactRedux.useSelector(validateWorkflow.selectCurrentWorkflow);
  const roles = reactRedux.useSelector(validateWorkflow.selectRoles);
  const [showLimitModal, setShowLimitModal] = React__namespace.useState(null);
  const { isLoading: isLicenseLoading, getFeature } = useLicenseLimits.useLicenseLimits();
  const [initialErrors, setInitialErrors] = React__namespace.useState();
  const [savePrompts, setSavePrompts] = React__namespace.useState({});
  const limits = getFeature("review-workflows");
  const numberOfWorkflows = limits?.[constants.CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME];
  const stagesPerWorkflow = limits?.[constants.CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME];
  const contentTypesFromOtherWorkflows = workflows?.flatMap((workflow) => workflow.contentTypes);
  const { mutateAsync } = reactQuery.useMutation(
    async ({ workflow }) => {
      const {
        data: { data }
      } = await post(`/admin/review-workflows/workflows`, {
        data: workflow
      });
      return data;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: {
            id: "Settings.review-workflows.create.page.notification.success",
            defaultMessage: "Workflow successfully created"
          }
        });
      }
    }
  );
  const submitForm = async () => {
    setSavePrompts({});
    try {
      const workflow = await mutateAsync({ workflow: currentWorkflow });
      push(`/settings/review-workflows/${workflow.id}`);
      return workflow;
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        if (error.response?.data?.error?.name === "ValidationError" && error.response?.data?.error?.details?.errors?.length > 0) {
          setInitialErrors(
            (error.response?.data?.error?.details?.errors).reduce(
              (acc, error2) => {
                if (error2.path)
                  set__default.default(acc, error2.path, error2.message);
                return acc;
              },
              {}
            )
          );
        }
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
        return null;
      }
    }
  };
  const handleConfirmDeleteDialog = async () => {
    await submitForm();
  };
  const handleConfirmClose = () => {
    setSavePrompts({});
  };
  const formik$1 = formik.useFormik({
    enableReinitialize: true,
    initialErrors,
    initialValues: currentWorkflow,
    async onSubmit() {
      const isContentTypeReassignment = currentWorkflow.contentTypes?.some(
        (contentType) => contentTypesFromOtherWorkflows?.includes(contentType)
      );
      if (meta && numberOfWorkflows && meta?.workflowCount >= parseInt(numberOfWorkflows, 10)) {
        setShowLimitModal("workflow");
      } else if (currentWorkflow.stages && stagesPerWorkflow && currentWorkflow.stages.length >= parseInt(stagesPerWorkflow, 10)) {
        setShowLimitModal("stage");
      } else if (isContentTypeReassignment) {
        setSavePrompts((prev) => ({ ...prev, hasReassignedContentTypes: true }));
      } else {
        submitForm();
      }
    },
    validate(values) {
      return validateWorkflow.validateWorkflow({ values, formatMessage });
    }
  });
  validateWorkflow.useInjectReducer(constants.REDUX_NAMESPACE, validateWorkflow.reducer);
  React__namespace.useEffect(() => {
    dispatch(validateWorkflow.resetWorkflow());
    if (!isLoadingWorkflow && workflows) {
      dispatch(validateWorkflow.setWorkflows({ workflows }));
    }
    if (!isLoadingContentTypes) {
      dispatch(validateWorkflow.setContentTypes({ collectionTypes, singleTypes }));
    }
    if (!isLoadingRoles) {
      dispatch(validateWorkflow.setRoles(serverRoles));
    }
    dispatch(validateWorkflow.setIsLoading(isLoadingContentTypes || isLoadingRoles));
    dispatch(
      validateWorkflow.addStage({
        name: ""
      })
    );
  }, [
    collectionTypes,
    dispatch,
    isLoadingContentTypes,
    isLoadingRoles,
    isLoadingWorkflow,
    serverRoles,
    singleTypes,
    workflows
  ]);
  React__namespace.useEffect(() => {
    if (!isLoadingWorkflow && !isLicenseLoading) {
      if (currentWorkflow.stages && limits?.[constants.CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME] && stagesPerWorkflow && currentWorkflow.stages.length >= parseInt(stagesPerWorkflow, 10)) {
        setShowLimitModal("stage");
      }
    }
  }, [isLicenseLoading, isLoadingWorkflow, limits, currentWorkflow.stages, stagesPerWorkflow]);
  React__namespace.useEffect(() => {
    if (!isLoading && roles?.length === 0) {
      toggleNotification({
        blockTransition: true,
        type: "warning",
        message: formatMessage({
          id: "Settings.review-workflows.stage.permissions.noPermissions.description",
          defaultMessage: "You don’t have the permission to see roles"
        })
      });
    }
  }, [formatMessage, isLoading, roles, toggleNotification]);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Layout.DragLayerRendered, {}),
    /* @__PURE__ */ jsxRuntime.jsx(formik.FormikProvider, { value: formik$1, children: /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { onSubmit: formik$1.handleSubmit, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Layout.Header,
        {
          navigationAction: /* @__PURE__ */ jsxRuntime.jsx(Layout.Back, { href: "/settings/review-workflows" }),
          primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}),
              type: "submit",
              size: "M",
              disabled: !currentWorkflowIsDirty,
              children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              })
            }
          ),
          title: formatMessage({
            id: "Settings.review-workflows.create.page.title",
            defaultMessage: "Create Review Workflow"
          }),
          subtitle: formatMessage(
            {
              id: "Settings.review-workflows.page.subtitle",
              defaultMessage: "{count, plural, one {# stage} other {# stages}}"
            },
            { count: currentWorkflow?.stages?.length ?? 0 }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(Layout.Root, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { alignItems: "stretch", direction: "column", gap: 7, children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
        id: "Settings.review-workflows.page.isLoading",
        defaultMessage: "Workflow is loading"
      }) }) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", direction: "column", gap: 7, children: [
        /* @__PURE__ */ jsxRuntime.jsx(validateWorkflow.WorkflowAttributes, {}),
        /* @__PURE__ */ jsxRuntime.jsx(validateWorkflow.Stages, { stages: formik$1.values?.stages })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.ConfirmDialog.Root,
      {
        isConfirmButtonLoading: isLoading,
        isOpen: Object.keys(savePrompts).length > 0,
        onToggleDialog: handleConfirmClose,
        onConfirm: handleConfirmDeleteDialog,
        children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.ConfirmDialog.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 5, children: [
          savePrompts.hasReassignedContentTypes && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textAlign: "center", variant: "omega", children: formatMessage(
            {
              id: "Settings.review-workflows.page.delete.confirm.contentType.body",
              defaultMessage: "{count} {count, plural, one {content-type} other {content-types}} {count, plural, one {is} other {are}} already mapped to {count, plural, one {another workflow} other {other workflows}}. If you save changes, {count, plural, one {this} other {these}} {count, plural, one {content-type} other {{count} content-types}} will no more be mapped to the {count, plural, one {another workflow} other {other workflows}} and all corresponding information will be removed."
            },
            {
              count: contentTypesFromOtherWorkflows?.filter(
                (contentType) => currentWorkflow.contentTypes?.includes(contentType)
              ).length
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textAlign: "center", variant: "omega", children: formatMessage({
            id: "Settings.review-workflows.page.delete.confirm.confirm",
            defaultMessage: "Are you sure you want to save?"
          }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      LimitsModal.LimitsModal.Root,
      {
        isOpen: showLimitModal === "workflow",
        onClose: () => setShowLimitModal(null),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Title, { children: formatMessage({
            id: "Settings.review-workflows.create.page.workflows.limit.title",
            defaultMessage: "You’ve reached the limit of workflows in your plan"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Body, { children: formatMessage({
            id: "Settings.review-workflows.create.page.workflows.limit.body",
            defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(LimitsModal.LimitsModal.Root, { isOpen: showLimitModal === "stage", onClose: () => setShowLimitModal(null), children: [
      /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Title, { children: formatMessage({
        id: "Settings.review-workflows.create.page.stages.limit.title",
        defaultMessage: "You have reached the limit of stages for this workflow in your plan"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Body, { children: formatMessage({
        id: "Settings.review-workflows.create.page.stages.limit.body",
        defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
      }) })
    ] })
  ] });
};
exports.ReviewWorkflowsCreatePage = ReviewWorkflowsCreatePage;
//# sourceMappingURL=CreatePage-8f54fc8f.js.map
