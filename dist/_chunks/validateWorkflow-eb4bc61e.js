"use strict";
const React = require("react");
const index = require("./index-be8080e3.js");
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const reactIntl = require("react-intl");
const reactRedux = require("react-redux");
const styled = require("styled-components");
const Icons = require("@strapi/icons");
const PropTypes = require("prop-types");
const v2 = require("@strapi/design-system/v2");
const formik = require("formik");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
const constants = require("./constants-85da8cc4.js");
const colors = require("./colors-c17c9c3c.js");
const toolkit = require("@reduxjs/toolkit");
const isEqual = require("lodash/isEqual");
const produce = require("immer");
const set = require("lodash/set");
const yup = require("yup");
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
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const isEqual__default = /* @__PURE__ */ _interopDefault(isEqual);
const set__default = /* @__PURE__ */ _interopDefault(set);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
function useInjectReducer(namespace, reducer2) {
  const store = index.useTypedStore();
  React.useEffect(() => {
    store.injectReducer(namespace, reducer2);
  }, [store, namespace, reducer2]);
}
function cloneStage(id) {
  return {
    type: constants.ACTION_CLONE_STAGE,
    payload: { id }
  };
}
function setWorkflow({ workflow }) {
  return {
    type: constants.ACTION_SET_WORKFLOW,
    payload: workflow
  };
}
function setWorkflows({ workflows }) {
  return {
    type: constants.ACTION_SET_WORKFLOWS,
    payload: workflows
  };
}
function deleteStage(stageId) {
  return {
    type: constants.ACTION_DELETE_STAGE,
    payload: {
      stageId
    }
  };
}
function addStage(stage) {
  return {
    type: constants.ACTION_ADD_STAGE,
    payload: stage
  };
}
function updateStage(stageId, payload) {
  return {
    type: constants.ACTION_UPDATE_STAGE,
    payload: {
      stageId,
      ...payload
    }
  };
}
function updateStages(payload) {
  return {
    type: constants.ACTION_UPDATE_STAGES,
    payload
  };
}
function updateStagePosition(oldIndex, newIndex) {
  return {
    type: constants.ACTION_UPDATE_STAGE_POSITION,
    payload: {
      newIndex,
      oldIndex
    }
  };
}
function updateWorkflow(payload) {
  return {
    type: constants.ACTION_UPDATE_WORKFLOW,
    payload
  };
}
function resetWorkflow() {
  return {
    type: constants.ACTION_RESET_WORKFLOW
  };
}
function setContentTypes(payload) {
  return {
    type: constants.ACTION_SET_CONTENT_TYPES,
    payload
  };
}
function setRoles(payload) {
  return {
    type: constants.ACTION_SET_ROLES,
    payload
  };
}
function setIsLoading(isLoading) {
  return {
    type: constants.ACTION_SET_IS_LOADING,
    payload: isLoading
  };
}
const StyledAddIcon = styled__default.default(Icons.PlusCircle)`
  > circle {
    fill: ${({ theme }) => theme.colors.neutral150};
  }
  > path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const StyledButton = styled__default.default(designSystem.Box)`
  border-radius: 26px;

  svg {
    height: ${({ theme }) => theme.spaces[6]};
    width: ${({ theme }) => theme.spaces[6]};

    > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary600} !important;
    ${designSystem.Typography} {
      color: ${({ theme }) => theme.colors.primary600} !important;
    }

    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.neutral100};
      }
    }
  }

  &:active {
    ${designSystem.Typography} {
      color: ${({ theme }) => theme.colors.primary600};
    }

    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.neutral100};
      }
    }
  }
`;
const AddStage = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledButton,
    {
      as: "button",
      background: "neutral0",
      border: "neutral150",
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 3,
      shadow: "filterShadow",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(StyledAddIcon, { "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral500", children })
      ] })
    }
  );
};
AddStage.propTypes = {
  children: PropTypes__default.default.node.isRequired
};
const initialState = {
  serverState: {
    contentTypes: {
      collectionTypes: [],
      singleTypes: []
    },
    roles: [],
    workflow: null,
    workflows: []
  },
  clientState: {
    currentWorkflow: {
      data: {
        name: "",
        contentTypes: [],
        stages: [],
        permissions: void 0
      }
    },
    isLoading: true
  }
};
function reducer(state = initialState, action) {
  return produce.produce(state, (draft) => {
    const { payload } = action;
    switch (action.type) {
      case constants.ACTION_SET_CONTENT_TYPES: {
        draft.serverState.contentTypes = payload;
        break;
      }
      case constants.ACTION_SET_IS_LOADING: {
        draft.clientState.isLoading = payload;
        break;
      }
      case constants.ACTION_SET_ROLES: {
        draft.serverState.roles = payload;
        break;
      }
      case constants.ACTION_SET_WORKFLOW: {
        const workflow = payload;
        if (workflow) {
          draft.serverState.workflow = workflow;
          draft.clientState.currentWorkflow.data = {
            ...workflow,
            stages: workflow.stages.map((stage) => ({
              ...stage,
              // A safety net in case a stage does not have a color assigned;
              // this should not happen
              color: stage?.color ?? constants.STAGE_COLOR_DEFAULT
            }))
          };
        }
        break;
      }
      case constants.ACTION_SET_WORKFLOWS: {
        draft.serverState.workflows = payload;
        break;
      }
      case constants.ACTION_RESET_WORKFLOW: {
        draft.clientState = initialState.clientState;
        draft.serverState = produce.createDraft(initialState.serverState);
        break;
      }
      case constants.ACTION_DELETE_STAGE: {
        const { stageId } = payload;
        const { currentWorkflow } = state.clientState;
        draft.clientState.currentWorkflow.data.stages = currentWorkflow.data.stages?.filter(
          (stage) => (stage?.id ?? stage.__temp_key__) !== stageId
        );
        break;
      }
      case constants.ACTION_ADD_STAGE: {
        const { currentWorkflow } = state.clientState;
        if (!currentWorkflow.data) {
          draft.clientState.currentWorkflow.data = {
            stages: []
          };
        }
        const newTempKey = getMaxTempKey(draft.clientState.currentWorkflow.data.stages);
        draft.clientState.currentWorkflow.data.stages?.push({
          ...payload,
          color: payload?.color ?? constants.STAGE_COLOR_DEFAULT,
          __temp_key__: newTempKey
        });
        break;
      }
      case constants.ACTION_CLONE_STAGE: {
        const { currentWorkflow } = state.clientState;
        const { id } = payload;
        const sourceStageIndex = currentWorkflow.data.stages?.findIndex(
          (stage) => (stage?.id ?? stage?.__temp_key__) === id
        );
        if (sourceStageIndex !== void 0 && sourceStageIndex !== -1) {
          const sourceStage = currentWorkflow.data.stages?.[sourceStageIndex];
          draft.clientState.currentWorkflow.data.stages?.splice(sourceStageIndex + 1, 0, {
            ...sourceStage,
            // @ts-expect-error - We are handling temporary (unsaved) duplicated stages with temporary keys and undefined ids. It should be revamp imo
            id: void 0,
            __temp_key__: getMaxTempKey(draft.clientState.currentWorkflow.data.stages)
          });
        }
        break;
      }
      case constants.ACTION_UPDATE_STAGE: {
        const { currentWorkflow } = state.clientState;
        const { stageId, ...modified } = payload;
        draft.clientState.currentWorkflow.data.stages = currentWorkflow.data.stages?.map(
          (stage) => (stage.id ?? stage.__temp_key__) === stageId ? {
            ...stage,
            ...modified
          } : stage
        );
        break;
      }
      case constants.ACTION_UPDATE_STAGES: {
        const { currentWorkflow } = state.clientState;
        draft.clientState.currentWorkflow.data.stages = currentWorkflow.data.stages?.map(
          (stage) => ({
            ...stage,
            ...payload
          })
        );
        break;
      }
      case constants.ACTION_UPDATE_STAGE_POSITION: {
        const {
          currentWorkflow: {
            data: { stages }
          }
        } = state.clientState;
        const { newIndex, oldIndex } = payload;
        if (stages && newIndex >= 0 && newIndex < stages.length) {
          const stage = stages[oldIndex];
          const newStages = [...stages];
          newStages.splice(oldIndex, 1);
          newStages.splice(newIndex, 0, stage);
          draft.clientState.currentWorkflow.data.stages = newStages;
        }
        break;
      }
      case constants.ACTION_UPDATE_WORKFLOW: {
        draft.clientState.currentWorkflow.data = {
          ...draft.clientState.currentWorkflow.data,
          ...payload
        };
        break;
      }
    }
  });
}
const getMaxTempKey = (stages = []) => {
  const ids = stages.map((stage) => Number(stage.id ?? stage.__temp_key__));
  return Math.max(...ids, -1) + 1;
};
const selectNamespace = (state) => state[constants.REDUX_NAMESPACE] ?? initialState;
const selectContentTypes = toolkit.createSelector(
  selectNamespace,
  ({ serverState: { contentTypes } }) => contentTypes
);
const selectRoles = toolkit.createSelector(selectNamespace, ({ serverState: { roles } }) => roles);
const selectCurrentWorkflow = toolkit.createSelector(
  selectNamespace,
  ({ clientState: { currentWorkflow } }) => currentWorkflow.data
);
const selectWorkflows = toolkit.createSelector(
  selectNamespace,
  ({ serverState: { workflows } }) => workflows
);
const selectIsWorkflowDirty = toolkit.createSelector(
  selectNamespace,
  ({ serverState, clientState: { currentWorkflow } }) => !isEqual__default.default(serverState.workflow, currentWorkflow.data)
);
const selectHasDeletedServerStages = toolkit.createSelector(
  selectNamespace,
  ({ serverState, clientState: { currentWorkflow } }) => !(serverState.workflow?.stages ?? []).every(
    (stage) => !!currentWorkflow.data.stages?.find(({ id }) => id === stage.id)
  )
);
const selectIsLoading = toolkit.createSelector(
  selectNamespace,
  ({ clientState: { isLoading } }) => isLoading
);
const selectServerState = toolkit.createSelector(selectNamespace, ({ serverState }) => serverState);
const NestedOption$1 = styled__default.default(designSystem.MultiSelectOption)`
  padding-left: ${({ theme }) => theme.spaces[7]};
`;
const PermissionWrapper = styled__default.default(designSystem.Flex)`
  > * {
    flex-grow: 1;
  }
`;
const DeleteMenuItem = styled__default.default(v2.MenuItem)`
  color: ${({ theme }) => theme.colors.danger600};
`;
const ContextMenuTrigger = styled__default.default(v2.Menu.Trigger)`
  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }

  > span {
    font-size: 0;
  }
`;
const DragIconButton = styled__default.default(designSystem.IconButton)`
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  justify-content: center;

  :hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }

  svg {
    height: auto;
    width: ${({ theme }) => theme.spaces[3]}};
  }
`;
const AVAILABLE_COLORS = colors.getAvailableStageColors();
const StageDropPreview = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      background: "primary100",
      borderStyle: "dashed",
      borderColor: "primary600",
      borderWidth: "1px",
      display: "block",
      hasRadius: true,
      padding: 6,
      shadow: "tableShadow"
    }
  );
};
const Stage = ({
  id,
  index: index$1,
  canDelete,
  canReorder,
  canUpdate,
  isOpen: isOpenDefault = false,
  stagesCount
}) => {
  const getItemPos = (index2) => `${index2 + 1} of ${stagesCount}`;
  const handleGrabStage = (index2) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.grab-item",
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: nameField.value,
          position: getItemPos(index2)
        }
      )
    );
  };
  const handleDropStage = (index2) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.drop-item",
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: nameField.value,
          position: getItemPos(index2)
        }
      )
    );
  };
  const handleCancelDragStage = () => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.cancel-item",
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: nameField.value
        }
      )
    );
  };
  const handleMoveStage = (newIndex, oldIndex) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.reorder",
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: nameField.value,
          position: getItemPos(newIndex)
        }
      )
    );
    dispatch(updateStagePosition(oldIndex, newIndex));
  };
  const handleApplyPermissionsToAllStages = () => {
    setIsApplyAllConfirmationOpen(true);
  };
  const [liveText, setLiveText] = React__namespace.useState(null);
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = helperPlugin.useTracking();
  const dispatch = reactRedux.useDispatch();
  const toggleNotification = helperPlugin.useNotification();
  const [isOpen, setIsOpen] = React__namespace.useState(isOpenDefault);
  const [isApplyAllConfirmationOpen, setIsApplyAllConfirmationOpen] = React__namespace.useState(false);
  const [nameField, nameMeta, nameHelper] = formik.useField(`stages.${index$1}.name`);
  const [colorField, colorMeta, colorHelper] = formik.useField(`stages.${index$1}.color`);
  const [permissionsField, permissionsMeta, permissionsHelper] = formik.useField(`stages.${index$1}.permissions`);
  const roles = reactRedux.useSelector(selectRoles);
  const [{ handlerId, isDragging, handleKeyDown }, stageRef, dropRef, dragRef, dragPreviewRef] = index.useDragAndDrop(canReorder, {
    index: index$1,
    item: {
      index: index$1,
      name: nameField.value
    },
    onGrabItem: handleGrabStage,
    onDropItem: handleDropStage,
    onMoveItem: handleMoveStage,
    onCancel: handleCancelDragStage,
    type: constants.DRAG_DROP_TYPES.STAGE
  });
  const composedRef = index.composeRefs(stageRef, dropRef);
  const colorOptions = AVAILABLE_COLORS.map(({ hex, name }) => ({
    value: hex,
    label: formatMessage(
      {
        id: "Settings.review-workflows.stage.color.name",
        defaultMessage: "{name}"
      },
      { name }
    ),
    color: hex
  }));
  const { themeColorName } = colors.getStageColorByHex(colorField.value) ?? {};
  const filteredRoles = roles?.filter((role) => role.code !== "strapi-super-admin");
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index$1]);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { ref: (ref) => composedRef(ref), children: [
    liveText && /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
    isDragging ? /* @__PURE__ */ jsxRuntime.jsx(StageDropPreview, {}) : /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Accordion,
      {
        size: "S",
        variant: "primary",
        onToggle: () => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            trackUsage("willEditStage");
          }
        },
        expanded: isOpen,
        shadow: "tableShadow",
        error: nameMeta.error ?? colorMeta?.error ?? permissionsMeta?.error,
        hasErrorMessage: false,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.AccordionToggle,
            {
              title: nameField.value,
              togglePosition: "left",
              action: (canDelete || canUpdate) && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
                /* @__PURE__ */ jsxRuntime.jsxs(v2.Menu.Root, { children: [
                  /* @__PURE__ */ jsxRuntime.jsxs(ContextMenuTrigger, { size: "S", endIcon: null, paddingLeft: 2, paddingRight: 2, children: [
                    /* @__PURE__ */ jsxRuntime.jsx(Icons.More, { "aria-hidden": true, focusable: false }),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { as: "span", children: formatMessage({
                      id: "[tbdb].components.DynamicZone.more-actions",
                      defaultMessage: "More actions"
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(v2.Menu.Content, { popoverPlacement: "bottom-end", zIndex: 2, children: /* @__PURE__ */ jsxRuntime.jsxs(v2.Menu.SubRoot, { children: [
                    canUpdate && /* @__PURE__ */ jsxRuntime.jsx(v2.MenuItem, { onClick: () => dispatch(cloneStage(id)), children: formatMessage({
                      id: "Settings.review-workflows.stage.delete",
                      defaultMessage: "Duplicate stage"
                    }) }),
                    canDelete && /* @__PURE__ */ jsxRuntime.jsx(DeleteMenuItem, { onClick: () => dispatch(deleteStage(id)), children: formatMessage({
                      id: "Settings.review-workflows.stage.delete",
                      defaultMessage: "Delete"
                    }) })
                  ] }) })
                ] }),
                canUpdate && /* @__PURE__ */ jsxRuntime.jsx(
                  DragIconButton,
                  {
                    background: "transparent",
                    forwardedAs: "div",
                    hasRadius: true,
                    role: "button",
                    noBorder: true,
                    tabIndex: 0,
                    "data-handler-id": handlerId,
                    ref: dragRef,
                    label: formatMessage({
                      id: "Settings.review-workflows.stage.drag",
                      defaultMessage: "Drag"
                    }),
                    onClick: (e) => e.stopPropagation(),
                    onKeyDown: handleKeyDown,
                    children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.AccordionContent, { padding: 6, background: "neutral0", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                ...nameField,
                id: nameField.name,
                disabled: !canUpdate,
                label: formatMessage({
                  id: "Settings.review-workflows.stage.name.label",
                  defaultMessage: "Stage name"
                }),
                error: nameMeta.error ?? false,
                onChange: (event) => {
                  nameHelper.setValue(event.target.value);
                  dispatch(updateStage(id, { name: event.target.value }));
                },
                required: true
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.SingleSelect,
              {
                disabled: !canUpdate,
                error: colorMeta?.error ?? false,
                id: colorField.name,
                required: true,
                label: formatMessage({
                  id: "content-manager.reviewWorkflows.stage.color",
                  defaultMessage: "Color"
                }),
                onChange: (value) => {
                  colorHelper.setValue(value);
                  dispatch(updateStage(id, { color: String(value) }));
                },
                value: colorField.value.toUpperCase(),
                startIcon: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Flex,
                  {
                    as: "span",
                    height: 2,
                    background: colorField.value,
                    borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
                    hasRadius: true,
                    shrink: 0,
                    width: 2
                  }
                ),
                children: colorOptions.map(({ value, label, color }) => {
                  const { themeColorName: themeColorName2 } = colors.getStageColorByHex(color) || {};
                  return /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.SingleSelectOption,
                    {
                      value,
                      startIcon: /* @__PURE__ */ jsxRuntime.jsx(
                        designSystem.Flex,
                        {
                          as: "span",
                          height: 2,
                          background: color,
                          borderColor: themeColorName2 === "neutral0" ? "neutral150" : "transparent",
                          hasRadius: true,
                          shrink: 0,
                          width: 2
                        }
                      ),
                      children: label
                    },
                    value
                  );
                })
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: filteredRoles?.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(
              helperPlugin.NotAllowedInput,
              {
                description: {
                  id: "Settings.review-workflows.stage.permissions.noPermissions.description",
                  defaultMessage: "You don’t have the permission to see roles"
                },
                intlLabel: {
                  id: "Settings.review-workflows.stage.permissions.label",
                  defaultMessage: "Roles that can change this stage"
                },
                name: permissionsField.name
              }
            ) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-end", gap: 3, children: [
              /* @__PURE__ */ jsxRuntime.jsx(PermissionWrapper, { grow: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.MultiSelect,
                {
                  ...permissionsField,
                  disabled: !canUpdate,
                  error: permissionsMeta.error ?? false,
                  id: permissionsField.name,
                  label: formatMessage({
                    id: "Settings.review-workflows.stage.permissions.label",
                    defaultMessage: "Roles that can change this stage"
                  }),
                  onChange: (values) => {
                    const permissions = values.map((value) => ({
                      role: parseInt(value, 10),
                      action: "admin::review-workflows.stage.transition"
                    }));
                    permissionsHelper.setValue(permissions);
                    dispatch(updateStage(id, { permissions }));
                  },
                  placeholder: formatMessage({
                    id: "Settings.review-workflows.stage.permissions.placeholder",
                    defaultMessage: "Select a role"
                  }),
                  required: true,
                  value: (permissionsField.value ?? []).map(
                    (permission) => `${permission.role}`
                  ),
                  withTags: true,
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.MultiSelectGroup,
                    {
                      label: formatMessage({
                        id: "Settings.review-workflows.stage.permissions.allRoles.label",
                        defaultMessage: "All roles"
                      }),
                      values: filteredRoles?.map((r) => `${r.id}`),
                      children: filteredRoles?.map((role) => {
                        return /* @__PURE__ */ jsxRuntime.jsx(NestedOption$1, { value: `${role.id}`, children: role.name }, role.id);
                      })
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  disabled: !canUpdate,
                  icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Duplicate, {}),
                  label: formatMessage({
                    id: "Settings.review-workflows.stage.permissions.apply.label",
                    defaultMessage: "Apply to all stages"
                  }),
                  size: "L",
                  variant: "secondary",
                  onClick: () => handleApplyPermissionsToAllStages()
                }
              )
            ] }) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.ConfirmDialog.Root,
      {
        iconRightButton: null,
        isOpen: isApplyAllConfirmationOpen,
        onToggleDialog: () => setIsApplyAllConfirmationOpen(false),
        onConfirm: () => {
          dispatch(updateStages({ permissions: permissionsField.value }));
          setIsApplyAllConfirmationOpen(false);
          toggleNotification({
            type: "success",
            message: formatMessage({
              id: "Settings.review-workflows.page.edit.confirm.stages.permissions.copy.success",
              defaultMessage: "Applied roles to all other stages of the workflow"
            })
          });
        },
        variantRightButton: "default",
        children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.ConfirmDialog.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textAlign: "center", variant: "omega", children: formatMessage({
          id: "Settings.review-workflows.page.edit.confirm.stages.permissions.copy",
          defaultMessage: "Roles that can change that stage will be applied to all the other stages."
        }) }) })
      }
    )
  ] });
};
const Background = styled__default.default(designSystem.Box)`
  transform: translateX(-50%);
`;
const Stages = ({ canDelete = true, canUpdate = true, stages = [] }) => {
  const { formatMessage } = reactIntl.useIntl();
  const dispatch = reactRedux.useDispatch();
  const { trackUsage } = helperPlugin.useTracking();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 6, width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "relative", width: "100%", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Background,
        {
          background: "neutral200",
          height: "100%",
          left: "50%",
          position: "absolute",
          top: "0",
          width: 2,
          zIndex: 1
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Flex,
        {
          direction: "column",
          alignItems: "stretch",
          gap: 6,
          zIndex: 2,
          position: "relative",
          as: "ol",
          children: stages.map((stage, index2) => {
            const id = Number(stage?.id ?? stage.__temp_key__);
            return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { as: "li", children: /* @__PURE__ */ jsxRuntime.jsx(
              Stage,
              {
                id,
                index: index2,
                isOpen: !stage.id,
                canDelete: stages.length > 1 && canDelete,
                canReorder: stages.length > 1,
                canUpdate,
                stagesCount: stages.length
              }
            ) }, `stage-${id}`);
          })
        }
      )
    ] }),
    canUpdate && /* @__PURE__ */ jsxRuntime.jsx(
      AddStage,
      {
        type: "button",
        onClick: () => {
          dispatch(addStage({ name: "" }));
          trackUsage("willCreateStage");
        },
        children: formatMessage({
          id: "Settings.review-workflows.stage.add",
          defaultMessage: "Add new stage"
        })
      }
    )
  ] });
};
const NestedOption = styled__default.default(designSystem.MultiSelectOption)`
  padding-left: ${({ theme }) => theme.spaces[7]};
`;
const ContentTypeTakeNotice = styled__default.default(designSystem.Typography)`
  font-style: italic;
`;
const WorkflowAttributes = ({ canUpdate = true }) => {
  const { formatMessage, locale } = reactIntl.useIntl();
  const dispatch = reactRedux.useDispatch();
  const contentTypes = reactRedux.useSelector(selectContentTypes);
  const currentWorkflow = reactRedux.useSelector(selectCurrentWorkflow);
  const workflows = reactRedux.useSelector(selectWorkflows);
  const [nameField, nameMeta, nameHelper] = formik.useField("name");
  const [contentTypesField, contentTypesMeta, contentTypesHelper] = formik.useField("contentTypes");
  const formatter = helperPlugin.useCollator(locale, {
    sensitivity: "base"
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { background: "neutral0", hasRadius: true, gap: 4, padding: 6, shadow: "tableShadow", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.TextInput,
      {
        ...nameField,
        id: nameField.name,
        disabled: !canUpdate,
        label: formatMessage({
          id: "Settings.review-workflows.workflow.name.label",
          defaultMessage: "Workflow Name"
        }),
        error: nameMeta.error ?? false,
        onChange: (event) => {
          dispatch(updateWorkflow({ name: event.target.value }));
          nameHelper.setValue(event.target.value);
        },
        required: true
      }
    ) }),
    contentTypes && /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.MultiSelect,
      {
        ...contentTypesField,
        customizeContent: (value) => formatMessage(
          {
            id: "Settings.review-workflows.workflow.contentTypes.displayValue",
            defaultMessage: "{count} {count, plural, one {content type} other {content types}} selected"
          },
          { count: value?.length }
        ),
        disabled: !canUpdate,
        error: contentTypesMeta.error ?? false,
        id: contentTypesField.name,
        label: formatMessage({
          id: "Settings.review-workflows.workflow.contentTypes.label",
          defaultMessage: "Associated to"
        }),
        onChange: (values) => {
          dispatch(updateWorkflow({ contentTypes: values }));
          contentTypesHelper.setValue(values);
        },
        placeholder: formatMessage({
          id: "Settings.review-workflows.workflow.contentTypes.placeholder",
          defaultMessage: "Select"
        }),
        children: [
          ...contentTypes.collectionTypes.length > 0 ? [
            {
              label: formatMessage({
                id: "Settings.review-workflows.workflow.contentTypes.collectionTypes.label",
                defaultMessage: "Collection Types"
              }),
              children: [...contentTypes.collectionTypes].sort((a, b) => formatter.compare(a.info.displayName, b.info.displayName)).map((contentType) => ({
                label: contentType.info.displayName,
                value: contentType.uid
              }))
            }
          ] : [],
          ...contentTypes.singleTypes.length > 0 ? [
            {
              label: formatMessage({
                id: "Settings.review-workflows.workflow.contentTypes.singleTypes.label",
                defaultMessage: "Single Types"
              }),
              children: [...contentTypes.singleTypes].map((contentType) => ({
                label: contentType.info.displayName,
                value: contentType.uid
              }))
            }
          ] : []
        ].map((opt) => {
          if ("children" in opt) {
            return /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.MultiSelectGroup,
              {
                label: opt.label,
                values: opt.children.map((child) => child.value.toString()),
                children: opt.children.map((child) => {
                  const { name: assignedWorkflowName } = workflows?.find(
                    (workflow) => (currentWorkflow && workflow.id !== currentWorkflow.id || !currentWorkflow) && workflow.contentTypes.includes(child.value)
                  ) ?? {};
                  return /* @__PURE__ */ jsxRuntime.jsx(NestedOption, { value: child.value, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, {
                    // @ts-expect-error - formatMessage options doesn't expect to be a React component but that's what we need actually for the <i> and <em> components
                    children: formatMessage(
                      {
                        id: "Settings.review-workflows.workflow.contentTypes.assigned.notice",
                        defaultMessage: "{label} {name, select, undefined {} other {<i>(assigned to <em>{name}</em> workflow)</i>}}"
                      },
                      {
                        label: child.label,
                        name: assignedWorkflowName,
                        em: (...children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { as: "em", fontWeight: "bold", children }),
                        i: (...children) => /* @__PURE__ */ jsxRuntime.jsx(ContentTypeTakeNotice, { children })
                      }
                    )
                  }) }, child.value);
                })
              },
              opt.label
            );
          }
        })
      }
    ) })
  ] });
};
async function validateWorkflow({
  values,
  formatMessage
}) {
  const schema = yup__namespace.object({
    contentTypes: yup__namespace.array().of(yup__namespace.string()),
    name: yup__namespace.string().max(
      255,
      formatMessage({
        id: "Settings.review-workflows.validation.name.max-length",
        defaultMessage: "Name can not be longer than 255 characters"
      })
    ).required(),
    stages: yup__namespace.array().of(
      yup__namespace.object().shape({
        name: yup__namespace.string().required(
          formatMessage({
            id: "Settings.review-workflows.validation.stage.name",
            defaultMessage: "Name is required"
          })
        ).max(
          255,
          formatMessage({
            id: "Settings.review-workflows.validation.stage.max-length",
            defaultMessage: "Name can not be longer than 255 characters"
          })
        ).test(
          "unique-name",
          formatMessage({
            id: "Settings.review-workflows.validation.stage.duplicate",
            defaultMessage: "Stage name must be unique"
          }),
          function(stageName) {
            const {
              options: { context }
            } = this;
            return context?.stages.filter((stage) => stage.name === stageName).length === 1;
          }
        ),
        color: yup__namespace.string().required(
          formatMessage({
            id: "Settings.review-workflows.validation.stage.color",
            defaultMessage: "Color is required"
          })
        ).matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/i),
        permissions: yup__namespace.array(
          yup__namespace.object({
            role: yup__namespace.number().strict().typeError(
              formatMessage({
                id: "Settings.review-workflows.validation.stage.permissions.role.number",
                defaultMessage: "Role must be of type number"
              })
            ).required(),
            action: yup__namespace.string().required({
              id: "Settings.review-workflows.validation.stage.permissions.action.required",
              defaultMessage: "Action is a required argument"
            })
          })
        ).strict()
      })
    ).min(1)
  });
  try {
    await schema.validate(values, { abortEarly: false, context: values });
    return true;
  } catch (error) {
    const errors = {};
    if (error instanceof yup__namespace.ValidationError) {
      error.inner.forEach((error2) => {
        if (error2.path)
          set__default.default(errors, error2.path, error2.message);
      });
    }
    return errors;
  }
}
exports.Stages = Stages;
exports.WorkflowAttributes = WorkflowAttributes;
exports.addStage = addStage;
exports.reducer = reducer;
exports.resetWorkflow = resetWorkflow;
exports.selectCurrentWorkflow = selectCurrentWorkflow;
exports.selectHasDeletedServerStages = selectHasDeletedServerStages;
exports.selectIsLoading = selectIsLoading;
exports.selectIsWorkflowDirty = selectIsWorkflowDirty;
exports.selectRoles = selectRoles;
exports.selectServerState = selectServerState;
exports.setContentTypes = setContentTypes;
exports.setIsLoading = setIsLoading;
exports.setRoles = setRoles;
exports.setWorkflow = setWorkflow;
exports.setWorkflows = setWorkflows;
exports.useInjectReducer = useInjectReducer;
exports.validateWorkflow = validateWorkflow;
//# sourceMappingURL=validateWorkflow-eb4bc61e.js.map
