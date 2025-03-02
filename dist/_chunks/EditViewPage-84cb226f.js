"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const axios = require("axios");
const formik = require("formik");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const reactRouterDom = require("react-router-dom");
const reactContext = require("@radix-ui/react-context");
const index = require("./index-be8080e3.js");
const constants = require("./constants-da2542a3.js");
const TokenTypeSelect = require("./TokenTypeSelect-c75581af.js");
const Icons = require("@strapi/icons");
const map = require("lodash/map");
const tail = require("lodash/tail");
const styled = require("styled-components");
const capitalize = require("lodash/capitalize");
const yup = require("yup");
const produce = require("immer");
const pull = require("lodash/pull");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("@strapi/design-system/v2");
require("lodash/camelCase");
require("lodash/defaultsDeep");
require("lodash/omit");
require("qs");
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
require("date-fns");
require("date-fns/locale");
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
const map__default = /* @__PURE__ */ _interopDefault(map);
const tail__default = /* @__PURE__ */ _interopDefault(tail);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const capitalize__default = /* @__PURE__ */ _interopDefault(capitalize);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const produce__default = /* @__PURE__ */ _interopDefault(produce);
const pull__default = /* @__PURE__ */ _interopDefault(pull);
const [ApiTokenPermissionsContextProvider, useApiTokenPermissionsContext] = reactContext.createContext("ApiTokenPermissionsContext");
const ApiTokenPermissionsProvider = ({
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(ApiTokenPermissionsContextProvider, { ...rest, children });
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
  const { formatMessage } = reactIntl.useIntl();
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "filterShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: "global.details",
          defaultMessage: "Details"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 5, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.TokenName,
            {
              error: errors["name"],
              value: values["name"],
              canEditInputs,
              onChange
            }
          ) }, "name"),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.TokenDescription,
            {
              error: errors["description"],
              value: values["description"],
              canEditInputs,
              onChange
            }
          ) }, "description"),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.LifeSpanInput,
            {
              isCreating,
              error: errors["lifespan"],
              value: values["lifespan"],
              onChange,
              token: apiToken
            }
          ) }, "lifespan"),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.TokenTypeSelect,
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
  const { formatMessage } = reactIntl.useIntl();
  helperPlugin.useFocusWhenNavigate();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": "true", children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "API Tokens" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: true, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}), type: "button", size: "L", children: formatMessage({ id: "global.save", defaultMessage: "Save" }) }),
        title: apiTokenName || formatMessage({
          id: "Settings.apiTokens.createPage.title",
          defaultMessage: "Create API Token"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) })
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
const MethodBox = styled__default.default(designSystem.Box)`
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
  const { formatMessage } = reactIntl.useIntl();
  const { method, handler: title, path } = route;
  const formattedRoute = path ? tail__default.default(path.split("/")) : [];
  const [controller = "", action = ""] = title ? title.split(".") : [];
  const colors = getMethodColor(route.method);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "delta", as: "h3", children: [
      formatMessage({
        id: "Settings.apiTokens.createPage.BoundRoute.title",
        defaultMessage: "Bound route to"
      }),
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: controller }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "delta", textColor: "primary600", children: [
        ".",
        action
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { hasRadius: true, background: "neutral0", borderColor: "neutral200", gap: 0, children: [
      /* @__PURE__ */ jsxRuntime.jsx(MethodBox, { background: colors.background, borderColor: colors.border, padding: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", textColor: colors.text, children: method }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 2, paddingRight: 2, children: map__default.default(formattedRoute, (value) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { textColor: value.includes(":") ? "neutral600" : "neutral900", children: [
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
  const { formatMessage } = reactIntl.useIntl();
  const actionSection = selectedAction?.split(".")[0];
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.GridItem,
    {
      col: 5,
      background: "neutral150",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      style: { minHeight: "100%" },
      children: selectedAction ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: actionSection && actionSection in routes && routes[actionSection].map((route) => {
        return route.config.auth?.scope?.includes(selectedAction) || route.handler === selectedAction ? /* @__PURE__ */ jsxRuntime.jsx(BoundRoute, { route }, route.handler) : null;
      }) }) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h3", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.title",
          defaultMessage: "Advanced settings"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { as: "p", textColor: "neutral600", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.hint",
          defaultMessage: "Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"
        }) })
      ] })
    }
  );
};
const activeCheckboxWrapperStyles = styled.css`
  background: ${(props) => props.theme.colors.primary100};
  svg {
    opacity: 1;
  }
`;
const CheckboxWrapper = styled__default.default(designSystem.Box)`
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
const Border = styled__default.default.div`
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
  const [expanded, setExpanded] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const handleExpandedAccordion = () => {
    setExpanded((s) => !s);
    onExpanded(orderNumber);
  };
  React__namespace.useEffect(() => {
    if (indexExpandendCollapsedContent !== null && indexExpandendCollapsedContent !== orderNumber && expanded) {
      setExpanded(false);
    }
  }, [indexExpandendCollapsedContent, orderNumber, expanded]);
  const isActionSelected = (actionId) => actionId === selectedAction;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Accordion,
    {
      expanded,
      onToggle: handleExpandedAccordion,
      variant: orderNumber % 2 ? "primary" : "secondary",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.AccordionToggle, { title: capitalize__default.default(label) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.AccordionContent, { children: controllers?.map((controller) => {
          const allActionsSelected = controller.actions.every(
            (action) => selectedActions.includes(action.actionId)
          );
          const someActionsSelected = controller.actions.some(
            (action) => selectedActions.includes(action.actionId)
          );
          return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", padding: 4, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingRight: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: controller?.controller }) }),
              /* @__PURE__ */ jsxRuntime.jsx(Border, {}),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Checkbox,
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
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid, { gap: 4, padding: 4, children: controller?.actions && controller?.actions.map((action) => {
              return /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(
                CheckboxWrapper,
                {
                  isActive: isActionSelected(action.actionId),
                  padding: 2,
                  hasRadius: true,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Checkbox,
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
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        "data-testid": "action-cog",
                        onClick: () => setSelectedAction({ target: { value: action.actionId } }),
                        style: { display: "inline-flex", alignItems: "center" },
                        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cog, {})
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
  const [indexExpandedCollpsedContent, setIndexExpandedCollpsedContent] = React__namespace.useState(null);
  const handleExpandedCollpsedContentIndex = (index2) => setIndexExpandedCollpsedContent(index2);
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 4, background: "neutral0", children: section && section.map((api, index2) => /* @__PURE__ */ jsxRuntime.jsx(
    CollapsableContentType,
    {
      label: api.label,
      controllers: api.controllers,
      orderNumber: index2,
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
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 0, shadow: "filterShadow", hasRadius: true, background: "neutral0", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.GridItem, { col: 7, paddingTop: 6, paddingBottom: 6, paddingLeft: 7, paddingRight: 7, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.title",
          defaultMessage: "Permissions"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { as: "p", textColor: "neutral600", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.description",
          defaultMessage: "Only actions bound by a route are listed below."
        }) })
      ] }),
      data?.permissions && /* @__PURE__ */ jsxRuntime.jsx(ContentTypesSection, { section: data?.permissions, ...props })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(ActionBoundRoutes, {})
  ] });
};
const schema = yup__namespace.object().shape({
  name: yup__namespace.string().max(100).required(helperPlugin.translatedErrors.required),
  type: yup__namespace.string().oneOf(["read-only", "full-access", "custom"]).required(helperPlugin.translatedErrors.required),
  description: yup__namespace.string().nullable(),
  lifespan: yup__namespace.number().integer().min(0).nullable().defined(helperPlugin.translatedErrors.required)
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
const reducer = (state, action) => produce__default.default(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      if (draftState.selectedActions.includes(action.value)) {
        pull__default.default(draftState.selectedActions, action.value);
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
          pull__default.default(draftState.selectedActions, item.actionId);
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
  helperPlugin.useFocusWhenNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const toggleNotification = helperPlugin.useNotification();
  const { state: locationState } = reactRouterDom.useLocation();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const [apiToken, setApiToken] = React__namespace.useState(
    locationState?.apiToken?.accessKey ? {
      ...locationState.apiToken
    } : null
  );
  const { trackUsage } = helperPlugin.useTracking();
  const { setCurrentStep } = helperPlugin.useGuidedTour();
  const {
    allowedActions: { canCreate, canUpdate, canRegenerate }
  } = helperPlugin.useRBAC(permissions.settings?.["api-tokens"]);
  const [state, dispatch] = React__namespace.useReducer(reducer, initialState);
  const match = reactRouterDom.useRouteMatch("/settings/api-tokens/:id");
  const id = match?.params?.id;
  const { get, post, put } = helperPlugin.useFetchClient();
  const history = reactRouterDom.useHistory();
  const isCreating = id === "create";
  reactQuery.useQuery(
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
  React__namespace.useEffect(() => {
    trackUsage(isCreating ? "didAddTokenFromList" : "didEditTokenFromList", {
      tokenType: constants.API_TOKEN_TYPE
    });
  }, [isCreating, trackUsage]);
  const { status } = reactQuery.useQuery(
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
      tokenType: constants.API_TOKEN_TYPE
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
          tokenType: constants.API_TOKEN_TYPE
        });
      }
    } catch (err) {
      if (err instanceof axios.AxiosError && err.response) {
        const errors = index.formatAPIErrors(err.response.data);
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
  const [hasChangedPermissions, setHasChangedPermissions] = React__namespace.useState(false);
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
    return /* @__PURE__ */ jsxRuntime.jsx(LoadingView, { apiTokenName: apiToken?.name });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ApiTokenPermissionsProvider, { value: providerValue, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "API Tokens" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
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
          return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              TokenTypeSelect.FormHead,
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
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              Boolean(apiToken?.name) && /* @__PURE__ */ jsxRuntime.jsx(TokenTypeSelect.TokenBox, { token: apiToken?.accessKey, tokenType: constants.API_TOKEN_TYPE }),
              /* @__PURE__ */ jsxRuntime.jsx(
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
              /* @__PURE__ */ jsxRuntime.jsx(
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
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.["api-tokens"].read, children: /* @__PURE__ */ jsxRuntime.jsx(EditView, {}) });
};
exports.EditView = EditView;
exports.ProtectedEditView = ProtectedEditView;
//# sourceMappingURL=EditViewPage-84cb226f.js.map
