import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Button, Flex, Loader, Typography } from "@strapi/design-system";
import { useFetchClient, useAPIErrorHandler, useNotification, useRBAC, ConfirmDialog } from "@strapi/helper-plugin";
import { Check } from "@strapi/icons";
import { AxiosError } from "axios";
import { useFormik, FormikProvider, Form } from "formik";
import set from "lodash/set";
import { useIntl } from "react-intl";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { u as useAdminRoles } from "./useAdminRoles-501e111a.mjs";
import { u as useContentTypes } from "./useContentTypes-53b449bb.mjs";
import { j as selectServerState, a as selectIsWorkflowDirty, b as selectCurrentWorkflow, k as selectHasDeletedServerStages, c as selectRoles, s as selectIsLoading, v as validateWorkflow, u as useInjectReducer, l as setWorkflow, d as setWorkflows, e as setContentTypes, f as setRoles, g as setIsLoading, r as resetWorkflow, W as WorkflowAttributes, S as Stages, i as reducer } from "./validateWorkflow-d798108d.mjs";
import { s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { u as useLicenseLimits } from "./useLicenseLimits-497c0f5f.mjs";
import { D as DragLayerRendered, H as Header, B as Back, R as Root } from "./Layout-a1e7600f.mjs";
import { L as LimitsModal } from "./LimitsModal-d438f513.mjs";
import { C as CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME, a as CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME, R as REDUX_NAMESPACE } from "./constants-8092eeb5.mjs";
import { u as useReviewWorkflows } from "./useReviewWorkflows-3e0bcb69.mjs";
import "styled-components";
import "prop-types";
import "@strapi/design-system/v2";
import "react-dnd-html5-backend";
import "./colors-bda951e9.mjs";
import "@reduxjs/toolkit";
import "lodash/isEqual";
import "immer";
import "yup";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "@radix-ui/react-context";
import "lodash/camelCase";
import "lodash/defaultsDeep";
import "lodash/omit";
import "qs";
import "lodash/get";
import "react-dnd";
import "react-window";
import "react-error-boundary";
import "lodash/cloneDeep";
import "lodash/upperFirst";
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
const ReviewWorkflowsEditPage = () => {
  const { workflowId } = useParams();
  const permissions = useSelector(selectAdminPermissions);
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { put } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  const { isLoading: isLoadingWorkflow, meta, workflows, refetch } = useReviewWorkflows();
  const { collectionTypes, singleTypes, isLoading: isLoadingContentTypes } = useContentTypes();
  const serverState = useSelector(selectServerState);
  const currentWorkflowIsDirty = useSelector(selectIsWorkflowDirty);
  const currentWorkflow = useSelector(selectCurrentWorkflow);
  const hasDeletedServerStages = useSelector(selectHasDeletedServerStages);
  const roles = useSelector(selectRoles);
  const isLoading = useSelector(selectIsLoading);
  const {
    allowedActions: { canDelete, canUpdate }
  } = useRBAC(permissions.settings?.["review-workflows"]);
  const [savePrompts, setSavePrompts] = React.useState({});
  const { getFeature, isLoading: isLicenseLoading } = useLicenseLimits();
  const { isLoading: isLoadingRoles, roles: serverRoles } = useAdminRoles(void 0, {
    retry: false
  });
  const [showLimitModal, setShowLimitModal] = React.useState(null);
  const [initialErrors, setInitialErrors] = React.useState();
  const workflow = workflows?.find((workflow2) => workflow2.id === parseInt(workflowId, 10));
  const contentTypesFromOtherWorkflows = workflows?.filter((workflow2) => workflow2.id !== parseInt(workflowId, 10)).flatMap((workflow2) => workflow2.contentTypes);
  const limits = getFeature("review-workflows");
  const numberOfWorkflows = limits?.[CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME];
  const stagesPerWorkflow = limits?.[CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME];
  const { mutateAsync, isLoading: isLoadingMutation } = useMutation(
    async ({ workflow: workflow2 }) => {
      const {
        data: { data }
      } = await put(`/admin/review-workflows/workflows/${workflow2.id}`, {
        data: workflow2
      });
      return data;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: { id: "notification.success.saved", defaultMessage: "Saved" }
        });
      }
    }
  );
  const updateWorkflow = async (workflow2) => {
    setInitialErrors(void 0);
    try {
      const res = await mutateAsync({
        workflow: {
          ...workflow2,
          // compare permissions of stages and only submit them if at least one has
          // changed; this enables partial updates e.g. for users who don't have
          // permissions to see roles
          stages: workflow2.stages?.map((stage) => {
            let hasUpdatedPermissions = true;
            const serverStage = serverState.workflow?.stages?.find(
              (serverStage2) => serverStage2.id === stage?.id
            );
            if (serverStage) {
              hasUpdatedPermissions = serverStage.permissions?.length !== stage.permissions?.length || !serverStage.permissions?.every(
                (serverPermission) => !!stage.permissions?.find(
                  (permission) => permission.role === serverPermission.role
                )
              );
            }
            return {
              ...stage,
              permissions: hasUpdatedPermissions ? stage.permissions : void 0
            };
          })
        }
      });
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data?.error?.name === "ValidationError" && error.response.data?.error?.details?.errors?.length > 0) {
          setInitialErrors(
            (error.response.data?.error?.details?.errors).reduce(
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
  const submitForm = async () => {
    await updateWorkflow(currentWorkflow);
    await refetch();
    setSavePrompts({});
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
      if (meta && numberOfWorkflows && meta?.workflowCount > parseInt(numberOfWorkflows, 10)) {
        setShowLimitModal("workflow");
      } else if (currentWorkflow.stages && stagesPerWorkflow && currentWorkflow.stages.length > parseInt(stagesPerWorkflow, 10)) {
        setShowLimitModal("stage");
      } else if (hasDeletedServerStages || isContentTypeReassignment) {
        if (hasDeletedServerStages) {
          setSavePrompts((prev) => ({ ...prev, hasDeletedServerStages: true }));
        }
        if (isContentTypeReassignment) {
          setSavePrompts((prev) => ({ ...prev, hasReassignedContentTypes: true }));
        }
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
    if (!isLoadingWorkflow && workflow && workflows) {
      dispatch(setWorkflow({ workflow }));
      dispatch(setWorkflows({ workflows }));
    }
    if (!isLoadingContentTypes) {
      dispatch(setContentTypes({ collectionTypes, singleTypes }));
    }
    if (!isLoadingRoles) {
      dispatch(setRoles(serverRoles));
    }
    dispatch(setIsLoading(isLoadingWorkflow || isLoadingContentTypes || isLoadingRoles));
    return () => {
      dispatch(resetWorkflow());
    };
  }, [
    collectionTypes,
    dispatch,
    isLoadingContentTypes,
    isLoadingWorkflow,
    isLoadingRoles,
    serverRoles,
    singleTypes,
    workflow,
    workflows
  ]);
  React.useEffect(() => {
    if (!isLoadingWorkflow && !isLicenseLoading) {
      if (meta && numberOfWorkflows && meta?.workflowCount > parseInt(numberOfWorkflows, 10)) {
        setShowLimitModal("workflow");
      } else if (currentWorkflow.stages && stagesPerWorkflow && currentWorkflow.stages.length > parseInt(stagesPerWorkflow, 10)) {
        setShowLimitModal("stage");
      }
    }
  }, [
    currentWorkflow.stages,
    isLicenseLoading,
    isLoadingWorkflow,
    limits,
    meta,
    numberOfWorkflows,
    stagesPerWorkflow
  ]);
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
          primaryAction: canUpdate && /* @__PURE__ */ jsx(
            Button,
            {
              startIcon: /* @__PURE__ */ jsx(Check, {}),
              type: "submit",
              size: "M",
              disabled: !currentWorkflowIsDirty,
              loading: !Boolean(Object.keys(savePrompts).length > 0) && isLoadingMutation,
              children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              })
            }
          ),
          subtitle: !isLoading && formatMessage(
            {
              id: "Settings.review-workflows.page.subtitle",
              defaultMessage: "{count, plural, one {# stage} other {# stages}}"
            },
            { count: currentWorkflow.stages?.length }
          ),
          title: currentWorkflow.name || ""
        }
      ),
      /* @__PURE__ */ jsx(Root, { children: isLoading ? /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({
        id: "Settings.review-workflows.page.isLoading",
        defaultMessage: "Workflow is loading"
      }) }) }) : /* @__PURE__ */ jsxs(Flex, { alignItems: "stretch", direction: "column", gap: 7, children: [
        /* @__PURE__ */ jsx(WorkflowAttributes, { canUpdate }),
        /* @__PURE__ */ jsx(
          Stages,
          {
            canDelete,
            canUpdate,
            stages: formik.values?.stages
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      ConfirmDialog.Root,
      {
        isConfirmButtonLoading: isLoading,
        isOpen: Object.keys(savePrompts).length > 0,
        onToggleDialog: handleConfirmClose,
        onConfirm: handleConfirmDeleteDialog,
        children: /* @__PURE__ */ jsx(ConfirmDialog.Body, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 5, children: [
          savePrompts.hasDeletedServerStages && /* @__PURE__ */ jsx(Typography, { textAlign: "center", variant: "omega", children: formatMessage({
            id: "Settings.review-workflows.page.delete.confirm.stages.body",
            defaultMessage: "All entries assigned to deleted stages will be moved to the previous stage."
          }) }),
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
            id: "Settings.review-workflows.edit.page.workflows.limit.title",
            defaultMessage: "You’ve reached the limit of workflows in your plan"
          }) }),
          /* @__PURE__ */ jsx(LimitsModal.Body, { children: formatMessage({
            id: "Settings.review-workflows.edit.page.workflows.limit.body",
            defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(LimitsModal.Root, { isOpen: showLimitModal === "stage", onClose: () => setShowLimitModal(null), children: [
      /* @__PURE__ */ jsx(LimitsModal.Title, { children: formatMessage({
        id: "Settings.review-workflows.edit.page.stages.limit.title",
        defaultMessage: "You have reached the limit of stages for this workflow in your plan"
      }) }),
      /* @__PURE__ */ jsx(LimitsModal.Body, { children: formatMessage({
        id: "Settings.review-workflows.edit.page.stages.limit.body",
        defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
      }) })
    ] })
  ] });
};
export {
  ReviewWorkflowsEditPage
};
//# sourceMappingURL=EditPage-37c5a40f.mjs.map
