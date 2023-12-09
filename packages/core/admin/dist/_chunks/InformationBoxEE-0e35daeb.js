"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const helperPlugin = require("@strapi/helper-plugin");
const index = require("./index-be8080e3.js");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const constants = require("./constants-d5d67ca8.js");
const React = require("react");
const useLicenseLimits = require("./useLicenseLimits-e60a01b1.js");
const LimitsModal = require("./LimitsModal-3327be54.js");
const constants$1 = require("./constants-85da8cc4.js");
const colors = require("./colors-c17c9c3c.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-router-dom");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("@strapi/icons");
require("formik");
require("lodash/camelCase");
require("styled-components");
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
require("axios");
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
function AssigneeSelect() {
  const {
    initialData,
    layout: { uid },
    isSingleType,
    onChange
  } = helperPlugin.useCMEditViewDataManager();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const { formatMessage } = reactIntl.useIntl();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const toggleNotification = helperPlugin.useNotification();
  const { put } = helperPlugin.useFetchClient();
  const {
    allowedActions: { canReadUsers },
    isLoading: isLoadingPermissions
  } = helperPlugin.useRBAC({
    readUsers: permissions.settings.users.read
  });
  const { users, isLoading, isError } = index.useAdminUsers(
    {},
    {
      enabled: !isLoadingPermissions && canReadUsers
    }
  );
  const currentAssignee = initialData?.[constants.ASSIGNEE_ATTRIBUTE_NAME] ?? null;
  const handleChange = async ({ value: assigneeId }) => {
    mutation.mutate({
      entityId: initialData.id,
      assigneeId: parseInt(assigneeId, 10),
      uid
    });
  };
  const mutation = reactQuery.useMutation(
    async ({ entityId, assigneeId, uid: uid2 }) => {
      const typeSlug = isSingleType ? "single-types" : "collection-types";
      const {
        data: { data: createdEntity }
      } = await put(`/admin/content-manager/${typeSlug}/${uid2}/${entityId}/assignee`, {
        data: { id: assigneeId }
      });
      onChange(
        {
          target: { name: constants.ASSIGNEE_ATTRIBUTE_NAME, value: createdEntity[constants.ASSIGNEE_ATTRIBUTE_NAME] }
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field, { name: constants.ASSIGNEE_ATTRIBUTE_NAME, id: constants.ASSIGNEE_ATTRIBUTE_NAME, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", gap: 2, alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Combobox,
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
      name: constants.ASSIGNEE_ATTRIBUTE_NAME,
      id: constants.ASSIGNEE_ATTRIBUTE_NAME,
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
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.ComboboxOption,
          {
            value: user.id,
            textValue: index.getDisplayName(user, formatMessage),
            children: index.getDisplayName(user, formatMessage)
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
  const { get } = helperPlugin.useFetchClient();
  const { data, isLoading, refetch } = reactQuery.useQuery(
    ["content-manager", slug, layout.uid, id, "stages"],
    async () => {
      const { data: data2 } = await get(`/admin/content-manager/${slug}/${uid}/${id}/stages`);
      return data2;
    },
    queryOptions
  );
  const meta = React__namespace.useMemo(() => data?.meta ?? {}, [data?.meta]);
  const stages = React__namespace.useMemo(() => data?.data ?? [], [data?.data]);
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
  const { initialData, layout: contentType, isSingleType, onChange } = helperPlugin.useCMEditViewDataManager();
  const { put } = helperPlugin.useFetchClient();
  const { formatMessage } = reactIntl.useIntl();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const toggleNotification = helperPlugin.useNotification();
  const { meta, stages, isLoading, refetch } = useReviewWorkflowsStages(
    { id: initialData.id, layout: contentType },
    {
      enabled: !!initialData?.id
    }
  );
  const { getFeature } = useLicenseLimits.useLicenseLimits();
  const [showLimitModal, setShowLimitModal] = React__namespace.useState(false);
  const limits = getFeature("review-workflows");
  const activeWorkflowStage = initialData?.[constants.STAGE_ATTRIBUTE_NAME] ?? null;
  const mutation = reactQuery.useMutation(
    async ({ entityId, stageId, uid }) => {
      const typeSlug = isSingleType ? "single-types" : "collection-types";
      const {
        data: { data: createdEntity }
      } = await put(`/admin/content-manager/${typeSlug}/${uid}/${entityId}/stage`, {
        data: { id: stageId }
      });
      onChange(
        { target: { name: constants.STAGE_ATTRIBUTE_NAME, value: createdEntity[constants.STAGE_ATTRIBUTE_NAME] } },
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
      if (limits?.[constants$1.CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME] && parseInt(limits[constants$1.CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME], 10) < meta.workflowCount) {
        setShowLimitModal("workflow");
      } else if (limits?.[constants$1.CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME] && parseInt(limits[constants$1.CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME], 10) < stages.length) {
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
  const { themeColorName } = activeWorkflowStage?.color ? colors.getStageColorByHex(activeWorkflowStage?.color) : {};
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Field,
      {
        hint: stages.length === 0 && formatMessage({
          id: "content-manager.reviewWorkflows.stages.no-transition",
          defaultMessage: "You don’t have the permission to update this stage."
        }),
        name: constants.STAGE_ATTRIBUTE_NAME,
        id: constants.STAGE_ATTRIBUTE_NAME,
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.SingleSelect,
            {
              disabled: stages.length === 0,
              error: mutation.error && formatAPIError(mutation.error) || null,
              name: constants.STAGE_ATTRIBUTE_NAME,
              id: constants.STAGE_ATTRIBUTE_NAME,
              value: activeWorkflowStage?.id,
              onChange: (value) => handleChange({ value }),
              label: formatMessage({
                id: "content-manager.reviewWorkflows.stage.label",
                defaultMessage: "Review stage"
              }),
              startIcon: activeWorkflowStage && /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Flex,
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
              customizeContent: () => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { as: "span", justifyContent: "space-between", alignItems: "center", width: "100%", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", ellipsis: true, children: activeWorkflowStage?.name ?? "" }),
                isLoading ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { small: true, style: { display: "flex" }, "data-testid": "loader" }) : null
              ] }),
              children: stages.map(({ id, color, name }) => {
                const { themeColorName: themeColorName2 } = colors.getStageColorByHex(color);
                return /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.SingleSelectOption,
                  {
                    startIcon: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Flex,
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
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.FieldHint, {}),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.FieldError, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      LimitsModal.LimitsModal.Root,
      {
        isOpen: showLimitModal === "workflow",
        onClose: () => setShowLimitModal(false),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Title, { children: formatMessage({
            id: "content-manager.reviewWorkflows.workflows.limit.title",
            defaultMessage: "You’ve reached the limit of workflows in your plan"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Body, { children: formatMessage({
            id: "content-manager.reviewWorkflows.workflows.limit.body",
            defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(
      LimitsModal.LimitsModal.Root,
      {
        isOpen: showLimitModal === "stage",
        onClose: () => setShowLimitModal(false),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Title, { children: formatMessage({
            id: "content-manager.reviewWorkflows.stages.limit.title",
            defaultMessage: "You have reached the limit of stages for this workflow in your plan"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(LimitsModal.LimitsModal.Body, { children: formatMessage({
            id: "content-manager.reviewWorkflows.stages.limit.body",
            defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
          }) })
        ]
      }
    )
  ] });
}
const InformationBoxEE = () => {
  const { isCreatingEntry, layout } = helperPlugin.useCMEditViewDataManager();
  const hasReviewWorkflowsEnabled = layout?.options?.reviewWorkflows ?? false;
  return /* @__PURE__ */ jsxRuntime.jsxs(index.Information.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(index.Information.Title, {}),
    hasReviewWorkflowsEnabled && !isCreatingEntry && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(StageSelect, {}),
      /* @__PURE__ */ jsxRuntime.jsx(AssigneeSelect, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(index.Information.Body, {})
  ] });
};
exports.InformationBoxEE = InformationBoxEE;
//# sourceMappingURL=InformationBoxEE-0e35daeb.js.map
