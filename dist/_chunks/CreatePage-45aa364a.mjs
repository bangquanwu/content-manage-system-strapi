import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Button, Flex, Loader, Typography } from "@strapi/design-system";
import { useFetchClient, useAPIErrorHandler, useNotification, ConfirmDialog } from "@strapi/helper-plugin";
import { Check } from "@strapi/icons";
import { AxiosError } from "axios";
import { useFormik, FormikProvider, Form } from "formik";
import set from "lodash/set";
import { useIntl } from "react-intl";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { u as useAdminRoles } from "./useAdminRoles-501e111a.mjs";
import { u as useContentTypes } from "./useContentTypes-53b449bb.mjs";
import { s as selectIsLoading, a as selectIsWorkflowDirty, b as selectCurrentWorkflow, c as selectRoles, v as validateWorkflow, u as useInjectReducer, r as resetWorkflow, d as setWorkflows, e as setContentTypes, f as setRoles, g as setIsLoading, h as addStage, W as WorkflowAttributes, S as Stages, i as reducer } from "./validateWorkflow-d798108d.mjs";
import { u as useLicenseLimits } from "./useLicenseLimits-497c0f5f.mjs";
import { D as DragLayerRendered, H as Header, B as Back, R as Root } from "./Layout-a1e7600f.mjs";
import { L as LimitsModal } from "./LimitsModal-d438f513.mjs";
import { C as CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME, a as CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME, R as REDUX_NAMESPACE } from "./constants-8092eeb5.mjs";
import { u as useReviewWorkflows } from "./useReviewWorkflows-3e0bcb69.mjs";
import "./index-90ba4fba.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "@radix-ui/react-context";
import "@strapi/design-system/v2";
import "lodash/camelCase";
import "styled-components";
import "yup";
import "lodash/defaultsDeep";
import "lodash/omit";
import "qs";
import "immer";
import "lodash/get";
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
import "./colors-bda951e9.mjs";
const ReviewWorkflowsCreatePage = () => {
  const { formatMessage } = useIntl();
  const { post } = useFetchClient();
  const { push } = useHistory();
  const { formatAPIError } = useAPIErrorHandler();
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const { collectionTypes, singleTypes, isLoading: isLoadingContentTypes } = useContentTypes();
  const { isLoading: isLoadingWorkflow, meta, workflows } = useReviewWorkflows();
  const { isLoading: isLoadingRoles, roles: serverRoles } = useAdminRoles(void 0, {
    retry: false
  });
  const isLoading = useSelector(selectIsLoading);
  const currentWorkflowIsDirty = useSelector(selectIsWorkflowDirty);
  const currentWorkflow = useSelector(selectCurrentWorkflow);
  const roles = useSelector(selectRoles);
  const [showLimitModal, setShowLimitModal] = React.useState(null);
  const { isLoading: isLicenseLoading, getFeature } = useLicenseLimits();
  const [initialErrors, setInitialErrors] = React.useState();
  const [savePrompts, setSavePrompts] = React.useState({});
  const limits = getFeature("review-workflows");
  const numberOfWorkflows = limits?.[CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME];
  const stagesPerWorkflow = limits?.[CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME];
  const contentTypesFromOtherWorkflows = workflows?.flatMap((workflow) => workflow.contentTypes);
  const { mutateAsync } = useMutation(
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
      if (error instanceof AxiosError) {
        if (error.response?.data?.error?.name === "ValidationError" && error.response?.data?.error?.details?.errors?.length > 0) {
          setInitialErrors(
            (error.response?.data?.error?.details?.errors).reduce(
              (acc, error2) => {
                if (error2.path)
                  set(acc, error2.path, error2.message);
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
  const formik = useFormik({
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
      return validateWorkflow({ values, formatMessage });
    }
  });
  useInjectReducer(REDUX_NAMESPACE, reducer);
  React.useEffect(() => {
    dispatch(resetWorkflow());
    if (!isLoadingWorkflow && workflows) {
      dispatch(setWorkflows({ workflows }));
    }
    if (!isLoadingContentTypes) {
      dispatch(setContentTypes({ collectionTypes, singleTypes }));
    }
    if (!isLoadingRoles) {
      dispatch(setRoles(serverRoles));
    }
    dispatch(setIsLoading(isLoadingContentTypes || isLoadingRoles));
    dispatch(
      addStage({
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
  React.useEffect(() => {
    if (!isLoadingWorkflow && !isLicenseLoading) {
      if (currentWorkflow.stages && limits?.[CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME] && stagesPerWorkflow && currentWorkflow.stages.length >= parseInt(stagesPerWorkflow, 10)) {
        setShowLimitModal("stage");
      }
    }
  }, [isLicenseLoading, isLoadingWorkflow, limits, currentWorkflow.stages, stagesPerWorkflow]);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DragLayerRendered, {}),
    /* @__PURE__ */ jsx(FormikProvider, { value: formik, children: /* @__PURE__ */ jsxs(Form, { onSubmit: formik.handleSubmit, children: [
      /* @__PURE__ */ jsx(
        Header,
        {
          navigationAction: /* @__PURE__ */ jsx(Back, { href: "/settings/review-workflows" }),
          primaryAction: /* @__PURE__ */ jsx(
            Button,
            {
              startIcon: /* @__PURE__ */ jsx(Check, {}),
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
      /* @__PURE__ */ jsx(Root, { children: /* @__PURE__ */ jsx(Flex, { alignItems: "stretch", direction: "column", gap: 7, children: isLoading ? /* @__PURE__ */ jsx(Loader, { children: formatMessage({
        id: "Settings.review-workflows.page.isLoading",
        defaultMessage: "Workflow is loading"
      }) }) : /* @__PURE__ */ jsxs(Flex, { alignItems: "stretch", direction: "column", gap: 7, children: [
        /* @__PURE__ */ jsx(WorkflowAttributes, {}),
        /* @__PURE__ */ jsx(Stages, { stages: formik.values?.stages })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      ConfirmDialog.Root,
      {
        isConfirmButtonLoading: isLoading,
        isOpen: Object.keys(savePrompts).length > 0,
        onToggleDialog: handleConfirmClose,
        onConfirm: handleConfirmDeleteDialog,
        children: /* @__PURE__ */ jsx(ConfirmDialog.Body, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 5, children: [
          savePrompts.hasReassignedContentTypes && /* @__PURE__ */ jsx(Typography, { textAlign: "center", variant: "omega", children: formatMessage(
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
          /* @__PURE__ */ jsx(Typography, { textAlign: "center", variant: "omega", children: formatMessage({
            id: "Settings.review-workflows.page.delete.confirm.confirm",
            defaultMessage: "Are you sure you want to save?"
          }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxs(
      LimitsModal.Root,
      {
        isOpen: showLimitModal === "workflow",
        onClose: () => setShowLimitModal(null),
        children: [
          /* @__PURE__ */ jsx(LimitsModal.Title, { children: formatMessage({
            id: "Settings.review-workflows.create.page.workflows.limit.title",
            defaultMessage: "You’ve reached the limit of workflows in your plan"
          }) }),
          /* @__PURE__ */ jsx(LimitsModal.Body, { children: formatMessage({
            id: "Settings.review-workflows.create.page.workflows.limit.body",
            defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(LimitsModal.Root, { isOpen: showLimitModal === "stage", onClose: () => setShowLimitModal(null), children: [
      /* @__PURE__ */ jsx(LimitsModal.Title, { children: formatMessage({
        id: "Settings.review-workflows.create.page.stages.limit.title",
        defaultMessage: "You have reached the limit of stages for this workflow in your plan"
      }) }),
      /* @__PURE__ */ jsx(LimitsModal.Body, { children: formatMessage({
        id: "Settings.review-workflows.create.page.stages.limit.body",
        defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
      }) })
    ] })
  ] });
};
export {
  ReviewWorkflowsCreatePage
};
//# sourceMappingURL=CreatePage-45aa364a.mjs.map
