import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Box, Flex, Typography, Grid, GridItem, Main, HeaderLayout, Button, ContentLayout, Accordion, AccordionToggle, AccordionContent, Checkbox } from "@strapi/design-system";
import { useFocusWhenNavigate, SettingsPageTitle, LoadingIndicatorPage, translatedErrors, CheckPagePermissions, useOverlayBlocker, useNotification, useTracking, useGuidedTour, useRBAC, useFetchClient, Form } from "@strapi/helper-plugin";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { createContext } from "@radix-ui/react-context";
import { s as selectAdminPermissions, p as formatAPIErrors } from "./index-90ba4fba.mjs";
import { A as API_TOKEN_TYPE } from "./constants-d3dd8ed6.mjs";
import { T as TokenName, a as TokenDescription, L as LifeSpanInput, b as TokenTypeSelect, F as FormHead, c as TokenBox } from "./TokenTypeSelect-3e46ae6e.mjs";
import { Check, Cog } from "@strapi/icons";
import map from "lodash/map";
import tail from "lodash/tail";
import styled, { css } from "styled-components";
import capitalize from "lodash/capitalize";
import * as yup from "yup";
import produce from "immer";
import pull from "lodash/pull";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "@strapi/design-system/v2";
import "lodash/camelCase";
import "lodash/defaultsDeep";
import "lodash/omit";
import "qs";
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
import "date-fns";
import "date-fns/locale";
const [ApiTokenPermissionsContextProvider, useApiTokenPermissionsContext] = createContext("ApiTokenPermissionsContext");
const ApiTokenPermissionsProvider = ({
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsx(ApiTokenPermissionsContextProvider, { ...rest, children });
};
const useApiTokenPermissions = () => useApiTokenPermissionsContext("useApiTokenPermissions");
const FormApiTokenContainer = ({
  errors = {},
  onChange,
  canEditInputs,
  isCreating,
  values = {},
  apiToken = {},
  onDispatch,
  setHasChangedPermissions
}) => {
  const { formatMessage } = useIntl();
  const handleChangeSelectApiTokenType = ({ target: { value } }) => {
    setHasChangedPermissions(false);
    if (value === "full-access") {
      onDispatch({
        type: "SELECT_ALL_ACTIONS"
      });
    }
    if (value === "read-only") {
      onDispatch({
        type: "ON_CHANGE_READ_ONLY"
      });
    }
  };
  const typeOptions = [
    {
      value: "read-only",
      label: {
        id: "Settings.tokens.types.read-only",
        defaultMessage: "Read-only"
      }
    },
    {
      value: "full-access",
      label: {
        id: "Settings.tokens.types.full-access",
        defaultMessage: "Full access"
      }
    },
    {
      value: "custom",
      label: {
        id: "Settings.tokens.types.custom",
        defaultMessage: "Custom"
      }
    }
  ];
  return /* @__PURE__ */ jsx(
    Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "filterShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: "global.details",
          defaultMessage: "Details"
        }) }),
        /* @__PURE__ */ jsxs(Grid, { gap: 5, children: [
          /* @__PURE__ */ jsx(GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsx(
            TokenName,
            {
              error: errors["name"],
              value: values["name"],
              canEditInputs,
              onChange
            }
          ) }, "name"),
          /* @__PURE__ */ jsx(GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsx(
            TokenDescription,
            {
              error: errors["description"],
              value: values["description"],
              canEditInputs,
              onChange
            }
          ) }, "description"),
          /* @__PURE__ */ jsx(GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsx(
            LifeSpanInput,
            {
              isCreating,
              error: errors["lifespan"],
              value: values["lifespan"],
              onChange,
              token: apiToken
            }
          ) }, "lifespan"),
          /* @__PURE__ */ jsx(GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsx(
            TokenTypeSelect,
            {
              value: values["type"],
              error: errors["type"],
              label: {
                id: "Settings.tokens.form.type",
                defaultMessage: "Token type"
              },
              onChange: (value) => {
                handleChangeSelectApiTokenType({ target: { value } });
                onChange({ target: { name: "type", value } });
              },
              options: typeOptions,
              canEditInputs
            }
          ) }, "type")
        ] })
      ] })
    }
  );
};
const LoadingView = ({ apiTokenName = null }) => {
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": "true", children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "API Tokens" }),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        primaryAction: /* @__PURE__ */ jsx(Button, { disabled: true, startIcon: /* @__PURE__ */ jsx(Check, {}), type: "button", size: "L", children: formatMessage({ id: "global.save", defaultMessage: "Save" }) }),
        title: apiTokenName || formatMessage({
          id: "Settings.apiTokens.createPage.title",
          defaultMessage: "Create API Token"
        })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) })
  ] });
};
const getMethodColor = (verb) => {
  switch (verb) {
    case "POST": {
      return {
        text: "success600",
        border: "success200",
        background: "success100"
      };
    }
    case "GET": {
      return {
        text: "secondary600",
        border: "secondary200",
        background: "secondary100"
      };
    }
    case "PUT": {
      return {
        text: "warning600",
        border: "warning200",
        background: "warning100"
      };
    }
    case "DELETE": {
      return {
        text: "danger600",
        border: "danger200",
        background: "danger100"
      };
    }
    default: {
      return {
        text: "neutral600",
        border: "neutral200",
        background: "neutral100"
      };
    }
  }
};
const MethodBox = styled(Box)`
  margin: -1px;
  border-radius: ${({ theme }) => theme.spaces[1]} 0 0 ${({ theme }) => theme.spaces[1]};
`;
const BoundRoute = ({
  route = {
    handler: "Nocontroller.error",
    method: "GET",
    path: "/there-is-no-path"
  }
}) => {
  const { formatMessage } = useIntl();
  const { method, handler: title, path } = route;
  const formattedRoute = path ? tail(path.split("/")) : [];
  const [controller = "", action = ""] = title ? title.split(".") : [];
  const colors = getMethodColor(route.method);
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsxs(Typography, { variant: "delta", as: "h3", children: [
      formatMessage({
        id: "Settings.apiTokens.createPage.BoundRoute.title",
        defaultMessage: "Bound route to"
      }),
      " ",
      /* @__PURE__ */ jsx("span", { children: controller }),
      /* @__PURE__ */ jsxs(Typography, { variant: "delta", textColor: "primary600", children: [
        ".",
        action
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { hasRadius: true, background: "neutral0", borderColor: "neutral200", gap: 0, children: [
      /* @__PURE__ */ jsx(MethodBox, { background: colors.background, borderColor: colors.border, padding: 2, children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: colors.text, children: method }) }),
      /* @__PURE__ */ jsx(Box, { paddingLeft: 2, paddingRight: 2, children: map(formattedRoute, (value) => /* @__PURE__ */ jsxs(Typography, { textColor: value.includes(":") ? "neutral600" : "neutral900", children: [
        "/",
        value
      ] }, value)) })
    ] })
  ] });
};
const ActionBoundRoutes = () => {
  const {
    value: { selectedAction, routes }
  } = useApiTokenPermissions();
  const { formatMessage } = useIntl();
  const actionSection = selectedAction?.split(".")[0];
  return /* @__PURE__ */ jsx(
    GridItem,
    {
      col: 5,
      background: "neutral150",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      style: { minHeight: "100%" },
      children: selectedAction ? /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: actionSection && actionSection in routes && routes[actionSection].map((route) => {
        return route.config.auth?.scope?.includes(selectedAction) || route.handler === selectedAction ? /* @__PURE__ */ jsx(BoundRoute, { route }, route.handler) : null;
      }) }) : /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h3", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.title",
          defaultMessage: "Advanced settings"
        }) }),
        /* @__PURE__ */ jsx(Typography, { as: "p", textColor: "neutral600", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.hint",
          defaultMessage: "Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"
        }) })
      ] })
    }
  );
};
const activeCheckboxWrapperStyles = css`
  background: ${(props) => props.theme.colors.primary100};
  svg {
    opacity: 1;
  }
`;
const CheckboxWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    opacity: 0;
    path {
      fill: ${(props) => props.theme.colors.primary600};
    }
  }

  /* Show active style both on hover and when the action is selected */
  ${(props) => props.isActive && activeCheckboxWrapperStyles}
  &:hover {
    ${activeCheckboxWrapperStyles}
  }
`;
const Border = styled.div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const CollapsableContentType = ({
  controllers = [],
  label,
  orderNumber = 0,
  disabled = false,
  onExpanded = () => null,
  indexExpandendCollapsedContent = null
}) => {
  const {
    value: { onChangeSelectAll, onChange, selectedActions, setSelectedAction, selectedAction }
  } = useApiTokenPermissions();
  const [expanded, setExpanded] = React.useState(false);
  const { formatMessage } = useIntl();
  const handleExpandedAccordion = () => {
    setExpanded((s) => !s);
    onExpanded(orderNumber);
  };
  React.useEffect(() => {
    if (indexExpandendCollapsedContent !== null && indexExpandendCollapsedContent !== orderNumber && expanded) {
      setExpanded(false);
    }
  }, [indexExpandendCollapsedContent, orderNumber, expanded]);
  const isActionSelected = (actionId) => actionId === selectedAction;
  return /* @__PURE__ */ jsxs(
    Accordion,
    {
      expanded,
      onToggle: handleExpandedAccordion,
      variant: orderNumber % 2 ? "primary" : "secondary",
      children: [
        /* @__PURE__ */ jsx(AccordionToggle, { title: capitalize(label) }),
        /* @__PURE__ */ jsx(AccordionContent, { children: controllers?.map((controller) => {
          const allActionsSelected = controller.actions.every(
            (action) => selectedActions.includes(action.actionId)
          );
          const someActionsSelected = controller.actions.some(
            (action) => selectedActions.includes(action.actionId)
          );
          return /* @__PURE__ */ jsxs(Box, { children: [
            /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "center", padding: 4, children: [
              /* @__PURE__ */ jsx(Box, { paddingRight: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: controller?.controller }) }),
              /* @__PURE__ */ jsx(Border, {}),
              /* @__PURE__ */ jsx(Box, { paddingLeft: 4, children: /* @__PURE__ */ jsx(
                Checkbox,
                {
                  value: allActionsSelected,
                  indeterminate: !allActionsSelected && someActionsSelected,
                  onValueChange: () => {
                    onChangeSelectAll({ target: { value: [...controller.actions] } });
                  },
                  disabled,
                  children: formatMessage({ id: "app.utils.select-all", defaultMessage: "Select all" })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Grid, { gap: 4, padding: 4, children: controller?.actions && controller?.actions.map((action) => {
              return /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsxs(
                CheckboxWrapper,
                {
                  isActive: isActionSelected(action.actionId),
                  padding: 2,
                  hasRadius: true,
                  children: [
                    /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        value: selectedActions.includes(action.actionId),
                        name: action.actionId,
                        onValueChange: () => {
                          onChange({ target: { value: action.actionId } });
                        },
                        disabled,
                        children: action.action
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        "data-testid": "action-cog",
                        onClick: () => setSelectedAction({ target: { value: action.actionId } }),
                        style: { display: "inline-flex", alignItems: "center" },
                        children: /* @__PURE__ */ jsx(Cog, {})
                      }
                    )
                  ]
                }
              ) }, action.actionId);
            }) })
          ] }, `${label}.${controller?.controller}`);
        }) })
      ]
    }
  );
};
const ContentTypesSection = ({ section = null, ...props }) => {
  const [indexExpandedCollpsedContent, setIndexExpandedCollpsedContent] = React.useState(null);
  const handleExpandedCollpsedContentIndex = (index) => setIndexExpandedCollpsedContent(index);
  return /* @__PURE__ */ jsx(Box, { padding: 4, background: "neutral0", children: section && section.map((api, index) => /* @__PURE__ */ jsx(
    CollapsableContentType,
    {
      label: api.label,
      controllers: api.controllers,
      orderNumber: index,
      indexExpandendCollapsedContent: indexExpandedCollpsedContent,
      onExpanded: handleExpandedCollpsedContentIndex,
      ...props
    },
    api.apiId
  )) });
};
const Permissions = ({ ...props }) => {
  const {
    value: { data }
  } = useApiTokenPermissions();
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Grid, { gap: 0, shadow: "filterShadow", hasRadius: true, background: "neutral0", children: [
    /* @__PURE__ */ jsxs(GridItem, { col: 7, paddingTop: 6, paddingBottom: 6, paddingLeft: 7, paddingRight: 7, children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.title",
          defaultMessage: "Permissions"
        }) }),
        /* @__PURE__ */ jsx(Typography, { as: "p", textColor: "neutral600", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.description",
          defaultMessage: "Only actions bound by a route are listed below."
        }) })
      ] }),
      data?.permissions && /* @__PURE__ */ jsx(ContentTypesSection, { section: data?.permissions, ...props })
    ] }),
    /* @__PURE__ */ jsx(ActionBoundRoutes, {})
  ] });
};
const schema = yup.object().shape({
  name: yup.string().max(100).required(translatedErrors.required),
  type: yup.string().oneOf(["read-only", "full-access", "custom"]).required(translatedErrors.required),
  description: yup.string().nullable(),
  lifespan: yup.number().integer().min(0).nullable().defined(translatedErrors.required)
});
const transformPermissionsData = (data) => {
  const layout = {
    allActionsIds: [],
    permissions: []
  };
  layout.permissions = Object.entries(data).map(([apiId, permission]) => ({
    apiId,
    label: apiId.split("::")[1],
    controllers: Object.keys(permission.controllers).map((controller) => ({
      controller,
      actions: controller in permission.controllers ? permission.controllers[controller].map((action) => {
        const actionId = `${apiId}.${controller}.${action}`;
        if (apiId.includes("api::")) {
          layout.allActionsIds.push(actionId);
        }
        return {
          action,
          actionId
        };
      }).flat() : []
    })).flat()
  }));
  return layout;
};
const initialState = {
  data: {
    allActionsIds: [],
    permissions: []
  },
  routes: {},
  selectedAction: "",
  selectedActions: []
};
const reducer = (state, action) => produce(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      if (draftState.selectedActions.includes(action.value)) {
        pull(draftState.selectedActions, action.value);
      } else {
        draftState.selectedActions.push(action.value);
      }
      break;
    }
    case "SELECT_ALL_IN_PERMISSION": {
      const areAllSelected = action.value.every(
        (item) => draftState.selectedActions.includes(item.actionId)
      );
      if (areAllSelected) {
        action.value.forEach((item) => {
          pull(draftState.selectedActions, item.actionId);
        });
      } else {
        action.value.forEach((item) => {
          draftState.selectedActions.push(item.actionId);
        });
      }
      break;
    }
    case "SELECT_ALL_ACTIONS": {
      draftState.selectedActions = [...draftState.data.allActionsIds];
      break;
    }
    case "ON_CHANGE_READ_ONLY": {
      const onlyReadOnlyActions = draftState.data.allActionsIds.filter(
        (actionId) => actionId.includes("find") || actionId.includes("findOne")
      );
      draftState.selectedActions = [...onlyReadOnlyActions];
      break;
    }
    case "UPDATE_PERMISSIONS_LAYOUT": {
      draftState.data = transformPermissionsData(action.value);
      break;
    }
    case "UPDATE_ROUTES": {
      draftState.routes = { ...action.value };
      break;
    }
    case "UPDATE_PERMISSIONS": {
      draftState.selectedActions = [...action.value];
      break;
    }
    case "SET_SELECTED_ACTION": {
      draftState.selectedAction = action.value;
      break;
    }
    default:
      return draftState;
  }
});
const MSG_ERROR_NAME_TAKEN = "Name already taken";
const EditView = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const toggleNotification = useNotification();
  const { state: locationState } = useLocation();
  const permissions = useSelector(selectAdminPermissions);
  const [apiToken, setApiToken] = React.useState(
    locationState?.apiToken?.accessKey ? {
      ...locationState.apiToken
    } : null
  );
  const { trackUsage } = useTracking();
  const { setCurrentStep } = useGuidedTour();
  const {
    allowedActions: { canCreate, canUpdate, canRegenerate }
  } = useRBAC(permissions.settings?.["api-tokens"]);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const match = useRouteMatch("/settings/api-tokens/:id");
  const id = match?.params?.id;
  const { get, post, put } = useFetchClient();
  const history = useHistory();
  const isCreating = id === "create";
  useQuery(
    "content-api-permissions",
    async () => {
      await Promise.all(
        ["/admin/content-api/permissions", "/admin/content-api/routes"].map(async (url) => {
          if (url === "/admin/content-api/permissions") {
            const {
              data: { data }
            } = await get(url);
            dispatch({
              type: "UPDATE_PERMISSIONS_LAYOUT",
              value: data
            });
            return data;
          } else if (url === "/admin/content-api/routes") {
            const {
              data: { data }
            } = await get(url);
            dispatch({
              type: "UPDATE_ROUTES",
              value: data
            });
            return data;
          }
        })
      );
      if (apiToken) {
        if (apiToken?.type === "read-only") {
          dispatch({
            type: "ON_CHANGE_READ_ONLY"
          });
        }
        if (apiToken?.type === "full-access") {
          dispatch({
            type: "SELECT_ALL_ACTIONS"
          });
        }
        if (apiToken?.type === "custom") {
          dispatch({
            type: "UPDATE_PERMISSIONS",
            value: apiToken?.permissions
          });
        }
      }
    },
    {
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error", defaultMessage: "An error occured" }
        });
      }
    }
  );
  React.useEffect(() => {
    trackUsage(isCreating ? "didAddTokenFromList" : "didEditTokenFromList", {
      tokenType: API_TOKEN_TYPE
    });
  }, [isCreating, trackUsage]);
  const { status } = useQuery(
    ["api-token", id],
    async () => {
      const {
        data: { data }
      } = await get(`/admin/api-tokens/${id}`);
      setApiToken({
        ...data
      });
      if (data?.type === "read-only") {
        dispatch({
          type: "ON_CHANGE_READ_ONLY"
        });
      }
      if (data?.type === "full-access") {
        dispatch({
          type: "SELECT_ALL_ACTIONS"
        });
      }
      if (data?.type === "custom") {
        dispatch({
          type: "UPDATE_PERMISSIONS",
          value: data?.permissions
        });
      }
      return data;
    },
    {
      enabled: !isCreating && !apiToken,
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error", defaultMessage: "An error occured" }
        });
      }
    }
  );
  const handleSubmit = async (body, actions) => {
    trackUsage(isCreating ? "willCreateToken" : "willEditToken", {
      tokenType: API_TOKEN_TYPE
    });
    lockApp();
    try {
      const {
        data: { data: response }
      } = isCreating ? await post(
        `/admin/api-tokens`,
        {
          ...body,
          // in case a token has a lifespan of "unlimited" the API only accepts zero as a number
          lifespan: body.lifespan === "0" ? parseInt(body.lifespan) : null,
          permissions: body.type === "custom" ? state.selectedActions : null
        }
      ) : await put(
        `/admin/api-tokens/${id}`,
        {
          name: body.name,
          description: body.description,
          type: body.type,
          permissions: body.type === "custom" ? state.selectedActions : null
        }
      );
      if (isCreating) {
        history.replace(`/settings/api-tokens/${response.id}`, { apiToken: response });
        setCurrentStep("apiTokens.success");
      }
      unlockApp();
      setApiToken({
        ...response
      });
      toggleNotification({
        type: "success",
        message: isCreating ? formatMessage({
          id: "notification.success.apitokencreated",
          defaultMessage: "API Token successfully created"
        }) : formatMessage({
          id: "notification.success.apitokenedited",
          defaultMessage: "API Token successfully edited"
        })
      });
      if (apiToken?.type) {
        trackUsage(isCreating ? "didCreateToken" : "didEditToken", {
          type: apiToken.type,
          tokenType: API_TOKEN_TYPE
        });
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const errors = formatAPIErrors(err.response.data);
        actions.setErrors(errors);
        if (err?.response?.data?.error?.message === MSG_ERROR_NAME_TAKEN) {
          toggleNotification({
            type: "warning",
            message: err.response.data.message || "notification.error.tokennamenotunique"
          });
        } else {
          toggleNotification({
            type: "warning",
            message: err?.response?.data?.message || "notification.error"
          });
        }
      }
      unlockApp();
    }
  };
  const [hasChangedPermissions, setHasChangedPermissions] = React.useState(false);
  const handleChangeCheckbox = ({
    target: { value }
  }) => {
    setHasChangedPermissions(true);
    dispatch({
      type: "ON_CHANGE",
      value
    });
  };
  const handleChangeSelectAllCheckbox = ({
    target: { value }
  }) => {
    setHasChangedPermissions(true);
    dispatch({
      type: "SELECT_ALL_IN_PERMISSION",
      value
    });
  };
  const setSelectedAction = ({
    target: { value }
  }) => {
    dispatch({
      type: "SET_SELECTED_ACTION",
      value
    });
  };
  const providerValue = {
    ...state,
    onChange: handleChangeCheckbox,
    onChangeSelectAll: handleChangeSelectAllCheckbox,
    setSelectedAction
  };
  const canEditInputs = canUpdate && !isCreating || canCreate && isCreating;
  const isLoading = !isCreating && !apiToken && status !== "success";
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingView, { apiTokenName: apiToken?.name });
  }
  return /* @__PURE__ */ jsx(ApiTokenPermissionsProvider, { value: providerValue, children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "API Tokens" }),
    /* @__PURE__ */ jsx(
      Formik,
      {
        validationSchema: schema,
        validateOnChange: false,
        initialValues: {
          name: apiToken?.name || "",
          description: apiToken?.description || "",
          type: apiToken?.type,
          lifespan: apiToken?.lifespan ? apiToken.lifespan.toString() : apiToken?.lifespan
        },
        enableReinitialize: true,
        onSubmit: (body, actions) => handleSubmit(body, actions),
        children: ({ errors, handleChange, isSubmitting, values, setFieldValue }) => {
          if (hasChangedPermissions && values?.type !== "custom") {
            setFieldValue("type", "custom");
          }
          return /* @__PURE__ */ jsxs(Form, { children: [
            /* @__PURE__ */ jsx(
              FormHead,
              {
                backUrl: "/settings/api-tokens",
                title: {
                  id: "Settings.apiTokens.createPage.title",
                  defaultMessage: "Create API Token"
                },
                token: apiToken,
                setToken: setApiToken,
                canEditInputs,
                canRegenerate,
                isSubmitting,
                regenerateUrl: "/admin/api-tokens/"
              }
            ),
            /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              Boolean(apiToken?.name) && /* @__PURE__ */ jsx(TokenBox, { token: apiToken?.accessKey, tokenType: API_TOKEN_TYPE }),
              /* @__PURE__ */ jsx(
                FormApiTokenContainer,
                {
                  errors,
                  onChange: handleChange,
                  canEditInputs,
                  isCreating,
                  values,
                  apiToken,
                  onDispatch: dispatch,
                  setHasChangedPermissions
                }
              ),
              /* @__PURE__ */ jsx(
                Permissions,
                {
                  disabled: !canEditInputs || values?.type === "read-only" || values?.type === "full-access"
                }
              )
            ] }) })
          ] });
        }
      }
    )
  ] }) });
};
const ProtectedEditView = () => {
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.["api-tokens"].read, children: /* @__PURE__ */ jsx(EditView, {}) });
};
export {
  EditView,
  ProtectedEditView
};
//# sourceMappingURL=EditViewPage-d84e2b08.mjs.map
