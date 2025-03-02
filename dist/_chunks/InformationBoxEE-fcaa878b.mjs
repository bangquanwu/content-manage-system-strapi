import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useCMEditViewDataManager, useAPIErrorHandler, useNotification, useFetchClient, useRBAC } from "@strapi/helper-plugin";
import { s as selectAdminPermissions, f as useAdminUsers, g as getDisplayName, I as Information } from "./index-90ba4fba.mjs";
import { Field, Flex, Combobox, ComboboxOption, SingleSelect, Typography, Loader, SingleSelectOption, FieldHint, FieldError } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { A as ASSIGNEE_ATTRIBUTE_NAME, S as STAGE_ATTRIBUTE_NAME } from "./constants-a92ce583.mjs";
import * as React from "react";
import { u as useLicenseLimits } from "./useLicenseLimits-497c0f5f.mjs";
import { L as LimitsModal } from "./LimitsModal-d438f513.mjs";
import { C as CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME, a as CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME } from "./constants-8092eeb5.mjs";
import { g as getStageColorByHex } from "./colors-bda951e9.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-router-dom";
import "@radix-ui/react-context";
import "@strapi/design-system/v2";
import "@strapi/icons";
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
function AssigneeSelect() {
  const {
    initialData,
    layout: { uid },
    isSingleType,
    onChange
  } = useCMEditViewDataManager();
  const permissions = useSelector(selectAdminPermissions);
  const { formatMessage } = useIntl();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  const { put } = useFetchClient();
  const {
    allowedActions: { canReadUsers },
    isLoading: isLoadingPermissions
  } = useRBAC({
    readUsers: permissions.settings.users.read
  });
  const { users, isLoading, isError } = useAdminUsers(
    {},
    {
      enabled: !isLoadingPermissions && canReadUsers
    }
  );
  const currentAssignee = initialData?.[ASSIGNEE_ATTRIBUTE_NAME] ?? null;
  const handleChange = async ({ value: assigneeId }) => {
    mutation.mutate({
      entityId: initialData.id,
      assigneeId: parseInt(assigneeId, 10),
      uid
    });
  };
  const mutation = useMutation(
    async ({ entityId, assigneeId, uid: uid2 }) => {
      const typeSlug = isSingleType ? "single-types" : "collection-types";
      const {
        data: { data: createdEntity }
      } = await put(`/admin/content-manager/${typeSlug}/${uid2}/${entityId}/assignee`, {
        data: { id: assigneeId }
      });
      onChange(
        {
          target: { name: ASSIGNEE_ATTRIBUTE_NAME, value: createdEntity[ASSIGNEE_ATTRIBUTE_NAME] }
        },
        true
      );
      return createdEntity;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: {
            id: "content-manager.reviewWorkflows.assignee.notification.saved",
            defaultMessage: "Assignee updated"
          }
        });
      }
    }
  );
  return /* @__PURE__ */ jsx(Field, { name: ASSIGNEE_ATTRIBUTE_NAME, id: ASSIGNEE_ATTRIBUTE_NAME, children: /* @__PURE__ */ jsx(Flex, { direction: "column", gap: 2, alignItems: "stretch", children: /* @__PURE__ */ jsx(
    Combobox,
    {
      clearLabel: formatMessage({
        id: "content-manager.reviewWorkflows.assignee.clear",
        defaultMessage: "Clear assignee"
      }),
      error: isError && canReadUsers && formatMessage({
        id: "content-manager.reviewWorkflows.assignee.error",
        defaultMessage: "An error occurred while fetching users"
      }) || mutation.error && formatAPIError(mutation.error),
      disabled: !isLoadingPermissions && !isLoading && users.length === 0,
      name: ASSIGNEE_ATTRIBUTE_NAME,
      id: ASSIGNEE_ATTRIBUTE_NAME,
      value: currentAssignee ? currentAssignee.id : null,
      onChange: (value) => handleChange({ value }),
      onClear: () => handleChange({ value: null }),
      placeholder: formatMessage({
        id: "content-manager.reviewWorkflows.assignee.placeholder",
        defaultMessage: "Select …"
      }),
      label: formatMessage({
        id: "content-manager.reviewWorkflows.assignee.label",
        defaultMessage: "Assignee"
      }),
      loading: isLoading || isLoadingPermissions || mutation.isLoading,
      children: users.map((user) => {
        return /* @__PURE__ */ jsx(
          ComboboxOption,
          {
            value: user.id,
            textValue: getDisplayName(user, formatMessage),
            children: getDisplayName(user, formatMessage)
          },
          user.id
        );
      })
    }
  ) }) });
}
function useReviewWorkflowsStages({ id, layout } = {}, queryOptions = {}) {
  const { kind, uid } = layout;
  const slug = kind === "collectionType" ? "collection-types" : "single-types";
  const { get } = useFetchClient();
  const { data, isLoading, refetch } = useQuery(
    ["content-manager", slug, layout.uid, id, "stages"],
    async () => {
      const { data: data2 } = await get(`/admin/content-manager/${slug}/${uid}/${id}/stages`);
      return data2;
    },
    queryOptions
  );
  const meta = React.useMemo(() => data?.meta ?? {}, [data?.meta]);
  const stages = React.useMemo(() => data?.data ?? [], [data?.data]);
  return {
    // meta contains e.g. the total of all workflows. we can not use
    // the pagination object here, because the list is not paginated.
    meta,
    stages,
    isLoading,
    refetch
  };
}
function StageSelect() {
  const { initialData, layout: contentType, isSingleType, onChange } = useCMEditViewDataManager();
  const { put } = useFetchClient();
  const { formatMessage } = useIntl();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  const { meta, stages, isLoading, refetch } = useReviewWorkflowsStages(
    { id: initialData.id, layout: contentType },
    {
      enabled: !!initialData?.id
    }
  );
  const { getFeature } = useLicenseLimits();
  const [showLimitModal, setShowLimitModal] = React.useState(false);
  const limits = getFeature("review-workflows");
  const activeWorkflowStage = initialData?.[STAGE_ATTRIBUTE_NAME] ?? null;
  const mutation = useMutation(
    async ({ entityId, stageId, uid }) => {
      const typeSlug = isSingleType ? "single-types" : "collection-types";
      const {
        data: { data: createdEntity }
      } = await put(`/admin/content-manager/${typeSlug}/${uid}/${entityId}/stage`, {
        data: { id: stageId }
      });
      onChange(
        { target: { name: STAGE_ATTRIBUTE_NAME, value: createdEntity[STAGE_ATTRIBUTE_NAME] } },
        true
      );
      await refetch();
      return createdEntity;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: {
            id: "content-manager.reviewWorkflows.stage.notification.saved",
            defaultMessage: "Review stage updated"
          }
        });
      }
    }
  );
  const handleChange = async ({ value: stageId }) => {
    try {
      if (limits?.[CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME] && parseInt(limits[CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME], 10) < meta.workflowCount) {
        setShowLimitModal("workflow");
      } else if (limits?.[CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME] && parseInt(limits[CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME], 10) < stages.length) {
        setShowLimitModal("stage");
      } else {
        mutation.mutateAsync({
          entityId: initialData.id,
          stageId,
          uid: contentType.uid
        });
      }
    } catch (error) {
    }
  };
  const { themeColorName } = activeWorkflowStage?.color ? getStageColorByHex(activeWorkflowStage?.color) : {};
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Field,
      {
        hint: stages.length === 0 && formatMessage({
          id: "content-manager.reviewWorkflows.stages.no-transition",
          defaultMessage: "You don’t have the permission to update this stage."
        }),
        name: STAGE_ATTRIBUTE_NAME,
        id: STAGE_ATTRIBUTE_NAME,
        children: /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 2, alignItems: "stretch", children: [
          /* @__PURE__ */ jsx(
            SingleSelect,
            {
              disabled: stages.length === 0,
              error: mutation.error && formatAPIError(mutation.error) || null,
              name: STAGE_ATTRIBUTE_NAME,
              id: STAGE_ATTRIBUTE_NAME,
              value: activeWorkflowStage?.id,
              onChange: (value) => handleChange({ value }),
              label: formatMessage({
                id: "content-manager.reviewWorkflows.stage.label",
                defaultMessage: "Review stage"
              }),
              startIcon: activeWorkflowStage && /* @__PURE__ */ jsx(
                Flex,
                {
                  as: "span",
                  height: 2,
                  background: activeWorkflowStage?.color,
                  borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
                  hasRadius: true,
                  shrink: 0,
                  width: 2,
                  marginRight: "-3px"
                }
              ),
              customizeContent: () => /* @__PURE__ */ jsxs(Flex, { as: "span", justifyContent: "space-between", alignItems: "center", width: "100%", children: [
                /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", ellipsis: true, children: activeWorkflowStage?.name ?? "" }),
                isLoading ? /* @__PURE__ */ jsx(Loader, { small: true, style: { display: "flex" }, "data-testid": "loader" }) : null
              ] }),
              children: stages.map(({ id, color, name }) => {
                const { themeColorName: themeColorName2 } = getStageColorByHex(color);
                return /* @__PURE__ */ jsx(
                  SingleSelectOption,
                  {
                    startIcon: /* @__PURE__ */ jsx(
                      Flex,
                      {
                        height: 2,
                        background: color,
                        borderColor: themeColorName2 === "neutral0" ? "neutral150" : "transparent",
                        hasRadius: true,
                        shrink: 0,
                        width: 2
                      }
                    ),
                    value: id,
                    textValue: name,
                    children: name
                  },
                  id
                );
              })
            }
          ),
          /* @__PURE__ */ jsx(FieldHint, {}),
          /* @__PURE__ */ jsx(FieldError, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      LimitsModal.Root,
      {
        isOpen: showLimitModal === "workflow",
        onClose: () => setShowLimitModal(false),
        children: [
          /* @__PURE__ */ jsx(LimitsModal.Title, { children: formatMessage({
            id: "content-manager.reviewWorkflows.workflows.limit.title",
            defaultMessage: "You’ve reached the limit of workflows in your plan"
          }) }),
          /* @__PURE__ */ jsx(LimitsModal.Body, { children: formatMessage({
            id: "content-manager.reviewWorkflows.workflows.limit.body",
            defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      LimitsModal.Root,
      {
        isOpen: showLimitModal === "stage",
        onClose: () => setShowLimitModal(false),
        children: [
          /* @__PURE__ */ jsx(LimitsModal.Title, { children: formatMessage({
            id: "content-manager.reviewWorkflows.stages.limit.title",
            defaultMessage: "You have reached the limit of stages for this workflow in your plan"
          }) }),
          /* @__PURE__ */ jsx(LimitsModal.Body, { children: formatMessage({
            id: "content-manager.reviewWorkflows.stages.limit.body",
            defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
          }) })
        ]
      }
    )
  ] });
}
const InformationBoxEE = () => {
  const { isCreatingEntry, layout } = useCMEditViewDataManager();
  const hasReviewWorkflowsEnabled = layout?.options?.reviewWorkflows ?? false;
  return /* @__PURE__ */ jsxs(Information.Root, { children: [
    /* @__PURE__ */ jsx(Information.Title, {}),
    hasReviewWorkflowsEnabled && !isCreatingEntry && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(StageSelect, {}),
      /* @__PURE__ */ jsx(AssigneeSelect, {})
    ] }),
    /* @__PURE__ */ jsx(Information.Body, {})
  ] });
};
export {
  InformationBoxEE
};
//# sourceMappingURL=InformationBoxEE-fcaa878b.mjs.map
