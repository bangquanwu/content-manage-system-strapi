"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const helperPlugin = require("@strapi/helper-plugin");
const reactRouterDom = require("react-router-dom");
const index = require("./index-00c72e10.js");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const formik = require("formik");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const PropTypes = require("prop-types");
const upperFirst = require("lodash/upperFirst");
const sortBy = require("lodash/sortBy");
const get = require("lodash/get");
const styled = require("styled-components");
const produce = require("immer");
const isEmpty = require("lodash/isEmpty");
const without = require("lodash/without");
const map = require("lodash/map");
const tail = require("lodash/tail");
const set = require("lodash/set");
const take = require("lodash/take");
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
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const upperFirst__default = /* @__PURE__ */ _interopDefault(upperFirst);
const sortBy__default = /* @__PURE__ */ _interopDefault(sortBy);
const get__default = /* @__PURE__ */ _interopDefault(get);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const produce__default = /* @__PURE__ */ _interopDefault(produce);
const isEmpty__default = /* @__PURE__ */ _interopDefault(isEmpty);
const without__default = /* @__PURE__ */ _interopDefault(without);
const map__default = /* @__PURE__ */ _interopDefault(map);
const tail__default = /* @__PURE__ */ _interopDefault(tail);
const set__default = /* @__PURE__ */ _interopDefault(set);
const take__default = /* @__PURE__ */ _interopDefault(take);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const UsersPermissions$2 = React.createContext({});
const UsersPermissionsProvider = ({ children, value }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(UsersPermissions$2.Provider, { value, children });
};
const useUsersPermissions = () => React.useContext(UsersPermissions$2);
UsersPermissionsProvider.propTypes = {
  children: PropTypes__default.default.node.isRequired,
  value: PropTypes__default.default.object.isRequired
};
function formatPluginName(pluginSlug) {
  switch (pluginSlug) {
    case "application":
      return "Application";
    case "plugin::content-manager":
      return "Content manager";
    case "plugin::content-type-builder":
      return "Content types builder";
    case "plugin::documentation":
      return "Documentation";
    case "plugin::email":
      return "Email";
    case "plugin::i18n":
      return "i18n";
    case "plugin::upload":
      return "Upload";
    case "plugin::users-permissions":
      return "Users-permissions";
    default:
      return upperFirst__default.default(pluginSlug.replace("api::", "").replace("plugin::", ""));
  }
}
const init$1 = (initialState2, permissions) => {
  const collapses = Object.keys(permissions).sort().map((name) => ({ name, isOpen: false }));
  return { ...initialState2, collapses };
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
const SubCategory = ({ subCategory }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { onChange, onChangeSelectAll, onSelectedAction, selectedAction, modifiedData } = useUsersPermissions();
  const currentScopedModifiedData = React.useMemo(() => {
    return get__default.default(modifiedData, subCategory.name, {});
  }, [modifiedData, subCategory]);
  const hasAllActionsSelected = React.useMemo(() => {
    return Object.values(currentScopedModifiedData).every((action) => action.enabled === true);
  }, [currentScopedModifiedData]);
  const hasSomeActionsSelected = React.useMemo(() => {
    return Object.values(currentScopedModifiedData).some((action) => action.enabled === true) && !hasAllActionsSelected;
  }, [currentScopedModifiedData, hasAllActionsSelected]);
  const handleChangeSelectAll = React.useCallback(
    ({ target: { name } }) => {
      onChangeSelectAll({ target: { name, value: !hasAllActionsSelected } });
    },
    [hasAllActionsSelected, onChangeSelectAll]
  );
  const isActionSelected = React.useCallback(
    (actionName) => {
      return selectedAction === actionName;
    },
    [selectedAction]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingRight: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: subCategory.label }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Border, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Checkbox,
        {
          name: subCategory.name,
          value: hasAllActionsSelected,
          onValueChange: (value) => handleChangeSelectAll({ target: { name: subCategory.name, value } }),
          indeterminate: hasSomeActionsSelected,
          children: formatMessage({ id: "app.utils.select-all", defaultMessage: "Select all" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid, { gap: 2, style: { flex: 1 }, children: subCategory.actions.map((action) => {
      const name = `${action.name}.enabled`;
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(CheckboxWrapper, { isActive: isActionSelected(action.name), padding: 2, hasRadius: true, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Checkbox,
          {
            value: get__default.default(modifiedData, name, false),
            name,
            onValueChange: (value) => onChange({ target: { name, value } }),
            children: action.label
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelectedAction(action.name),
            style: { display: "inline-flex", alignItems: "center" },
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { as: "span", children: formatMessage(
                {
                  id: "app.utils.show-bound-route",
                  defaultMessage: "Show bound route for {route}"
                },
                {
                  route: action.name
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(icons.Cog, {})
            ]
          }
        )
      ] }) }, action.name);
    }) }) })
  ] });
};
SubCategory.propTypes = {
  subCategory: PropTypes__default.default.object.isRequired
};
const PermissionRow = ({ name, permissions }) => {
  const subCategories = React.useMemo(() => {
    return sortBy__default.default(
      Object.values(permissions.controllers).reduce((acc, curr, index2) => {
        const currentName = `${name}.controllers.${Object.keys(permissions.controllers)[index2]}`;
        const actions = sortBy__default.default(
          Object.keys(curr).reduce((acc2, current) => {
            return [
              ...acc2,
              {
                ...curr[current],
                label: current,
                name: `${currentName}.${current}`
              }
            ];
          }, []),
          "label"
        );
        return [
          ...acc,
          {
            actions,
            label: Object.keys(permissions.controllers)[index2],
            name: currentName
          }
        ];
      }, []),
      "label"
    );
  }, [name, permissions]);
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 6, children: subCategories.map((subCategory) => /* @__PURE__ */ jsxRuntime.jsx(SubCategory, { subCategory }, subCategory.name)) });
};
PermissionRow.propTypes = {
  name: PropTypes__default.default.string.isRequired,
  permissions: PropTypes__default.default.object.isRequired
};
const initialState$1 = {
  collapses: []
};
const reducer$1 = (state, action) => (
  // eslint-disable-next-line consistent-return
  produce__default.default(state, (draftState) => {
    switch (action.type) {
      case "TOGGLE_COLLAPSE": {
        draftState.collapses = state.collapses.map((collapse, index2) => {
          if (index2 === action.index) {
            return { ...collapse, isOpen: !collapse.isOpen };
          }
          return { ...collapse, isOpen: false };
        });
        break;
      }
      default:
        return draftState;
    }
  })
);
const Permissions = () => {
  const { modifiedData } = useUsersPermissions();
  const { formatMessage } = reactIntl.useIntl();
  const [{ collapses }, dispatch] = React.useReducer(
    reducer$1,
    initialState$1,
    (state) => init$1(state, modifiedData)
  );
  const handleToggle = (index2) => dispatch({
    type: "TOGGLE_COLLAPSE",
    index: index2
  });
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: collapses.map((collapse, index2) => /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Accordion,
    {
      expanded: collapse.isOpen,
      onToggle: () => handleToggle(index2),
      variant: index2 % 2 === 0 ? "secondary" : void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.AccordionToggle,
          {
            title: formatPluginName(collapse.name),
            description: formatMessage(
              {
                id: "users-permissions.Plugin.permissions.plugins.description",
                defaultMessage: "Define all allowed actions for the {name} plugin."
              },
              { name: collapse.name }
            ),
            variant: index2 % 2 ? "primary" : "secondary"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.AccordionContent, { children: /* @__PURE__ */ jsxRuntime.jsx(PermissionRow, { permissions: modifiedData[collapse.name], name: collapse.name }) })
      ]
    },
    collapse.name
  )) });
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
function BoundRoute({ route }) {
  const { formatMessage } = reactIntl.useIntl();
  const { method, handler: title, path } = route;
  const formattedRoute = path ? tail__default.default(path.split("/")) : [];
  const [controller = "", action = ""] = title ? title.split(".") : [];
  const colors = getMethodColor(route.method);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "delta", as: "h3", children: [
      formatMessage({
        id: "users-permissions.BoundRoute.title",
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
}
BoundRoute.defaultProps = {
  route: {
    handler: "Nocontroller.error",
    method: "GET",
    path: "/there-is-no-path"
  }
};
BoundRoute.propTypes = {
  route: PropTypes__default.default.shape({
    handler: PropTypes__default.default.string,
    method: PropTypes__default.default.string,
    path: PropTypes__default.default.string
  })
};
const Policies = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { selectedAction, routes } = useUsersPermissions();
  const path = without__default.default(selectedAction.split("."), "controllers");
  const controllerRoutes = get__default.default(routes, path[0]);
  const pathResolved = path.slice(1).join(".");
  const displayedRoutes = isEmpty__default.default(controllerRoutes) ? [] : controllerRoutes.filter((o) => o.handler.endsWith(pathResolved));
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
      children: selectedAction ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: displayedRoutes.map((route, key) => (
        // eslint-disable-next-line react/no-array-index-key
        /* @__PURE__ */ jsxRuntime.jsx(BoundRoute, { route }, key)
      )) }) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h3", children: formatMessage({
          id: "users-permissions.Policies.header.title",
          defaultMessage: "Advanced settings"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { as: "p", textColor: "neutral600", children: formatMessage({
          id: "users-permissions.Policies.header.hint",
          defaultMessage: "Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"
        }) })
      ] })
    }
  );
};
const init = (state, permissions, routes) => {
  return {
    ...state,
    initialData: permissions,
    modifiedData: permissions,
    routes
  };
};
const initialState = {
  initialData: {},
  modifiedData: {},
  routes: {},
  selectedAction: "",
  policies: []
};
const reducer = (state, action) => produce__default.default(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      const keysLength = action.keys.length;
      const isChangingCheckbox = action.keys[keysLength - 1] === "enabled";
      if (action.value && isChangingCheckbox) {
        const selectedAction = take__default.default(action.keys, keysLength - 1).join(".");
        draftState.selectedAction = selectedAction;
      }
      set__default.default(draftState, ["modifiedData", ...action.keys], action.value);
      break;
    }
    case "ON_CHANGE_SELECT_ALL": {
      const pathToValue = ["modifiedData", ...action.keys];
      const oldValues = get__default.default(state, pathToValue, {});
      const updatedValues = Object.keys(oldValues).reduce((acc, current) => {
        acc[current] = { ...oldValues[current], enabled: action.value };
        return acc;
      }, {});
      set__default.default(draftState, pathToValue, updatedValues);
      break;
    }
    case "ON_RESET": {
      draftState.modifiedData = state.initialData;
      break;
    }
    case "ON_SUBMIT_SUCCEEDED": {
      draftState.initialData = state.modifiedData;
      break;
    }
    case "SELECT_ACTION": {
      const { actionToSelect } = action;
      draftState.selectedAction = actionToSelect === state.selectedAction ? "" : actionToSelect;
      break;
    }
    default:
      return draftState;
  }
});
const UsersPermissions = React.forwardRef(({ permissions, routes }, ref) => {
  const { formatMessage } = reactIntl.useIntl();
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState,
    (state2) => init(state2, permissions, routes)
  );
  React.useImperativeHandle(ref, () => ({
    getPermissions() {
      return {
        permissions: state.modifiedData
      };
    },
    resetForm() {
      dispatch({ type: "ON_RESET" });
    },
    setFormAfterSubmit() {
      dispatch({ type: "ON_SUBMIT_SUCCEEDED" });
    }
  }));
  const handleChange = ({ target: { name, value } }) => dispatch({
    type: "ON_CHANGE",
    keys: name.split("."),
    value: value === "empty__string_value" ? "" : value
  });
  const handleChangeSelectAll = ({ target: { name, value } }) => dispatch({
    type: "ON_CHANGE_SELECT_ALL",
    keys: name.split("."),
    value
  });
  const handleSelectedAction = (actionToSelect) => dispatch({
    type: "SELECT_ACTION",
    actionToSelect
  });
  const providerValue = {
    ...state,
    onChange: handleChange,
    onChangeSelectAll: handleChangeSelectAll,
    onSelectedAction: handleSelectedAction
  };
  return /* @__PURE__ */ jsxRuntime.jsx(UsersPermissionsProvider, { value: providerValue, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 0, shadow: "filterShadow", hasRadius: true, background: "neutral0", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 7, paddingTop: 6, paddingBottom: 6, paddingLeft: 7, paddingRight: 7, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: index.getTrad("Plugins.header.title"),
          defaultMessage: "Permissions"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { as: "p", textColor: "neutral600", children: formatMessage({
          id: index.getTrad("Plugins.header.description"),
          defaultMessage: "Only actions bound by a route are listed below."
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(Permissions, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(Policies, {})
  ] }) });
});
UsersPermissions.propTypes = {
  permissions: PropTypes__default.default.object.isRequired,
  routes: PropTypes__default.default.object.isRequired
};
const UsersPermissions$1 = React.memo(UsersPermissions);
const createRoleSchema = yup__namespace.object().shape({
  name: yup__namespace.string().required(helperPlugin.translatedErrors.required),
  description: yup__namespace.string().required(helperPlugin.translatedErrors.required)
});
const cleanPermissions = (permissions) => Object.keys(permissions).reduce((acc, current) => {
  const currentPermission = permissions[current].controllers;
  const cleanedControllers = Object.keys(currentPermission).reduce((acc2, curr) => {
    if (isEmpty__default.default(currentPermission[curr])) {
      return acc2;
    }
    acc2[curr] = currentPermission[curr];
    return acc2;
  }, {});
  if (isEmpty__default.default(cleanedControllers)) {
    return acc;
  }
  acc[current] = { controllers: cleanedControllers };
  return acc;
}, {});
const usePlugins = () => {
  const toggleNotification = helperPlugin.useNotification();
  const { get: get2 } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler(index.getTrad);
  const [
    {
      data: permissions,
      isLoading: isLoadingPermissions,
      error: permissionsError,
      refetch: refetchPermissions
    },
    { data: routes, isLoading: isLoadingRoutes, error: routesError, refetch: refetchRoutes }
  ] = reactQuery.useQueries([
    {
      queryKey: ["users-permissions", "permissions"],
      async queryFn() {
        const {
          data: { permissions: permissions2 }
        } = await get2(`/users-permissions/permissions`);
        return permissions2;
      }
    },
    {
      queryKey: ["users-permissions", "routes"],
      async queryFn() {
        const {
          data: { routes: routes2 }
        } = await get2(`/users-permissions/routes`);
        return routes2;
      }
    }
  ]);
  const refetchQueries = async () => {
    await Promise.all([refetchPermissions(), refetchRoutes()]);
  };
  React.useEffect(() => {
    if (permissionsError) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(permissionsError)
      });
    }
  }, [toggleNotification, permissionsError, formatAPIError]);
  React.useEffect(() => {
    if (routesError) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(routesError)
      });
    }
  }, [toggleNotification, routesError, formatAPIError]);
  const isLoading = isLoadingPermissions || isLoadingRoutes;
  return {
    // TODO: these return values need to be memoized, otherwise
    // they will create infinite rendering loops when used as
    // effect dependencies
    permissions: permissions ? cleanPermissions(permissions) : {},
    routes: routes ?? {},
    getData: refetchQueries,
    isLoading
  };
};
const CreatePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const { goBack } = reactRouterDom.useHistory();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const { isLoading: isLoadingPlugins, permissions, routes } = usePlugins();
  const { trackUsage } = helperPlugin.useTracking();
  const permissionsRef = React__namespace.useRef();
  const { post } = helperPlugin.useFetchClient();
  const mutation = reactQuery.useMutation((body) => post(`/users-permissions/roles`, body), {
    onError() {
      toggleNotification({
        type: "warning",
        message: {
          id: "notification.error",
          defaultMessage: "An error occurred"
        }
      });
    },
    onSuccess() {
      trackUsage("didCreateRole");
      toggleNotification({
        type: "success",
        message: {
          id: index.getTrad("Settings.roles.created"),
          defaultMessage: "Role created"
        }
      });
      goBack();
    }
  });
  const handleCreateRoleSubmit = async (data) => {
    lockApp();
    const permissions2 = permissionsRef.current.getPermissions();
    await mutation.mutate({ ...data, ...permissions2, users: [] });
    unlockApp();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Roles" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        enableReinitialize: true,
        initialValues: { name: "", description: "" },
        onSubmit: handleCreateRoleSubmit,
        validationSchema: createRoleSchema,
        children: ({ handleSubmit, values, handleChange, errors }) => /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.HeaderLayout,
            {
              primaryAction: !isLoadingPlugins && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", loading: mutation.isLoading, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}), children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              }) }),
              title: formatMessage({
                id: "Settings.roles.create.title",
                defaultMessage: "Create a role"
              }),
              subtitle: formatMessage({
                id: "Settings.roles.create.description",
                defaultMessage: "Define the rights given to the role"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Flex,
            {
              background: "neutral0",
              direction: "column",
              alignItems: "stretch",
              gap: 7,
              hasRadius: true,
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 7,
              paddingRight: 7,
              shadow: "filterShadow",
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
                    id: index.getTrad("EditPage.form.roles"),
                    defaultMessage: "Role details"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.TextInput,
                      {
                        name: "name",
                        value: values.name || "",
                        onChange: handleChange,
                        label: formatMessage({
                          id: "global.name",
                          defaultMessage: "Name"
                        }),
                        error: errors?.name ? formatMessage({ id: errors.name, defaultMessage: "Name is required" }) : false,
                        required: true
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Textarea,
                      {
                        id: "description",
                        value: values.description || "",
                        onChange: handleChange,
                        label: formatMessage({
                          id: "global.description",
                          defaultMessage: "Description"
                        }),
                        error: errors?.description ? formatMessage({
                          id: errors.description,
                          defaultMessage: "Description is required"
                        }) : false,
                        required: true
                      }
                    ) })
                  ] })
                ] }),
                !isLoadingPlugins && /* @__PURE__ */ jsxRuntime.jsx(
                  UsersPermissions$1,
                  {
                    ref: permissionsRef,
                    permissions,
                    routes
                  }
                )
              ]
            }
          ) })
        ] })
      }
    )
  ] });
};
const ProtectedRolesCreatePage = () => /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.createRole, children: /* @__PURE__ */ jsxRuntime.jsx(CreatePage, {}) });
const EditPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const {
    params: { id }
  } = reactRouterDom.useRouteMatch(`/settings/users-permissions/roles/:id`);
  const { get: get2 } = helperPlugin.useFetchClient();
  const { isLoading: isLoadingPlugins, routes } = usePlugins();
  const {
    data: role,
    isLoading: isLoadingRole,
    refetch: refetchRole
  } = reactQuery.useQuery(["users-permissions", "role", id], async () => {
    const {
      data: { role: role2 }
    } = await get2(`/users-permissions/roles/${id}`);
    return role2;
  });
  const permissionsRef = React__namespace.useRef();
  const { put } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const mutation = reactQuery.useMutation((body) => put(`/users-permissions/roles/${id}`, body), {
    onError(error) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
    },
    async onSuccess() {
      toggleNotification({
        type: "success",
        message: {
          id: index.getTrad("Settings.roles.created"),
          defaultMessage: "Role edited"
        }
      });
      await refetchRole();
    }
  });
  const handleEditRoleSubmit = async (data) => {
    lockApp();
    const permissions = permissionsRef.current.getPermissions();
    await mutation.mutate({ ...data, ...permissions, users: [] });
    unlockApp();
  };
  if (isLoadingRole) {
    return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Roles" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        enableReinitialize: true,
        initialValues: { name: role.name, description: role.description },
        onSubmit: handleEditRoleSubmit,
        validationSchema: createRoleSchema,
        children: ({ handleSubmit, values, handleChange, errors }) => /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.HeaderLayout,
            {
              primaryAction: !isLoadingPlugins && /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  disabled: role.code === "strapi-super-admin",
                  type: "submit",
                  loading: mutation.isLoading,
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              ),
              title: role.name,
              subtitle: role.description,
              navigationAction: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.Link, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}), to: "/settings/users-permissions/roles", children: formatMessage({
                id: "global.back",
                defaultMessage: "Back"
              }) })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Flex,
            {
              background: "neutral0",
              direction: "column",
              alignItems: "stretch",
              gap: 7,
              hasRadius: true,
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 7,
              paddingRight: 7,
              shadow: "filterShadow",
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
                    id: index.getTrad("EditPage.form.roles"),
                    defaultMessage: "Role details"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.TextInput,
                      {
                        name: "name",
                        value: values.name || "",
                        onChange: handleChange,
                        label: formatMessage({
                          id: "global.name",
                          defaultMessage: "Name"
                        }),
                        error: errors?.name ? formatMessage({ id: errors.name, defaultMessage: "Name is required" }) : false,
                        required: true
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Textarea,
                      {
                        id: "description",
                        value: values.description || "",
                        onChange: handleChange,
                        label: formatMessage({
                          id: "global.description",
                          defaultMessage: "Description"
                        }),
                        error: errors?.description ? formatMessage({
                          id: errors.description,
                          defaultMessage: "Description is required"
                        }) : false,
                        required: true
                      }
                    ) })
                  ] })
                ] }),
                !isLoadingPlugins && /* @__PURE__ */ jsxRuntime.jsx(
                  UsersPermissions$1,
                  {
                    ref: permissionsRef,
                    permissions: role.permissions,
                    routes
                  }
                )
              ]
            }
          ) })
        ] })
      }
    )
  ] });
};
const ProtectedRolesEditPage = () => /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.updateRole, children: /* @__PURE__ */ jsxRuntime.jsx(EditPage, {}) });
const EditLink = styled__default.default(designSystem.Link)`
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
const TableBody = ({ sortedRoles, canDelete, permissions, setRoleToDelete, onDelete }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { push } = reactRouterDom.useHistory();
  const [showConfirmDelete, setShowConfirmDelete] = onDelete;
  const checkCanDeleteRole = (role) => canDelete && !["public", "authenticated"].includes(role.type);
  const handleClickDelete = (id) => {
    setRoleToDelete(id);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const handleClickEdit = (id) => {
    push(`/settings/users-permissions/roles/${id}`);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: sortedRoles?.map((role) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { ...helperPlugin.onRowClick({ fn: () => handleClickEdit(role.id) }), children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "20%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: role.name }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "50%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: role.description }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "30%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage(
      {
        id: "Roles.RoleRow.user-count",
        defaultMessage: "{number, plural, =0 {# user} one {# user} other {# users}}"
      },
      { number: role.nb_users }
    ) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", ...helperPlugin.stopPropagation, children: [
      /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPermissions, { permissions: permissions.updateRole, children: /* @__PURE__ */ jsxRuntime.jsx(
        EditLink,
        {
          to: `/settings/users-permissions/roles/${role.id}`,
          "aria-label": formatMessage(
            { id: "app.component.table.edit", defaultMessage: "Edit {target}" },
            { target: `${role.name}` }
          ),
          children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
        }
      ) }),
      checkCanDeleteRole(role) && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPermissions, { permissions: permissions.deleteRole, children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          onClick: () => handleClickDelete(role.id),
          noBorder: true,
          icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}),
          label: formatMessage(
            { id: "global.delete-target", defaultMessage: "Delete {target}" },
            { target: `${role.name}` }
          )
        }
      ) })
    ] }) })
  ] }, role.name)) });
};
TableBody.defaultProps = {
  canDelete: false
};
TableBody.propTypes = {
  onDelete: PropTypes__default.default.array.isRequired,
  permissions: PropTypes__default.default.object.isRequired,
  setRoleToDelete: PropTypes__default.default.func.isRequired,
  sortedRoles: PropTypes__default.default.array.isRequired,
  canDelete: PropTypes__default.default.bool
};
const fetchData = async (toggleNotification, notifyStatus) => {
  try {
    const { get: get2 } = helperPlugin.getFetchClient();
    const { data } = await get2("/users-permissions/roles");
    notifyStatus("The roles have loaded successfully");
    return data;
  } catch (err) {
    toggleNotification({
      type: "warning",
      message: { id: "notification.error" }
    });
    throw new Error(err);
  }
};
const deleteData = async (id, toggleNotification) => {
  try {
    const { del } = helperPlugin.getFetchClient();
    await del(`/users-permissions/roles/${id}`);
  } catch (error) {
    toggleNotification({
      type: "warning",
      message: { id: "notification.error", defaultMessage: "An error occured" }
    });
  }
};
const RolesListPage = () => {
  const { trackUsage } = helperPlugin.useTracking();
  const { formatMessage, locale } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const { notifyStatus } = designSystem.useNotifyAT();
  const [{ query }] = helperPlugin.useQueryParams();
  const _q = query?._q || "";
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = React.useState(false);
  const [roleToDelete, setRoleToDelete] = React.useState();
  helperPlugin.useFocusWhenNavigate();
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canRead, canDelete }
  } = helperPlugin.useRBAC({
    create: index.PERMISSIONS.createRole,
    read: index.PERMISSIONS.readRoles,
    update: index.PERMISSIONS.updateRole,
    delete: index.PERMISSIONS.deleteRole
  });
  const {
    isLoading: isLoadingForData,
    data: { roles },
    isFetching,
    refetch
  } = reactQuery.useQuery("get-roles", () => fetchData(toggleNotification, notifyStatus), {
    initialData: {},
    enabled: canRead
  });
  const { includes } = helperPlugin.useFilter(locale, {
    sensitivity: "base"
  });
  const formatter = helperPlugin.useCollator(locale, {
    sensitivity: "base"
  });
  const isLoading = isLoadingForData || isFetching;
  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };
  const emptyLayout = {
    roles: {
      id: index.getTrad("Roles.empty"),
      defaultMessage: "You don't have any roles yet."
    },
    search: {
      id: index.getTrad("Roles.empty.search"),
      defaultMessage: "No roles match the search."
    }
  };
  const pageTitle = formatMessage({
    id: "global.roles",
    defaultMessage: "Roles"
  });
  const deleteMutation = reactQuery.useMutation((id) => deleteData(id, toggleNotification), {
    async onSuccess() {
      await refetch();
    }
  });
  const handleConfirmDelete = async () => {
    setIsConfirmButtonLoading(true);
    await deleteMutation.mutateAsync(roleToDelete);
    setShowConfirmDelete(!showConfirmDelete);
    setIsConfirmButtonLoading(false);
  };
  const sortedRoles = (roles || []).filter((role) => includes(role.name, _q) || includes(role.description, _q)).sort(
    (a, b) => formatter.compare(a.name, b.name) || formatter.compare(a.description, b.description)
  );
  const emptyContent = _q && !sortedRoles.length ? "search" : "roles";
  const colCount = 4;
  const rowCount = (roles?.length || 0) + 1;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Layout, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: pageTitle }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title: formatMessage({
            id: "global.roles",
            defaultMessage: "Roles"
          }),
          subtitle: formatMessage({
            id: "Settings.roles.list.description",
            defaultMessage: "List of roles"
          }),
          primaryAction: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPermissions, { permissions: index.PERMISSIONS.createRole, children: /* @__PURE__ */ jsxRuntime.jsx(
            helperPlugin.LinkButton,
            {
              to: "/settings/users-permissions/roles/new",
              onClick: () => trackUsage("willCreateRole"),
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
              size: "S",
              children: formatMessage({
                id: index.getTrad("List.button.roles"),
                defaultMessage: "Add new role"
              })
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.ActionLayout,
        {
          startActions: /* @__PURE__ */ jsxRuntime.jsx(
            helperPlugin.SearchURLQuery,
            {
              label: formatMessage({
                id: "app.component.search.label",
                defaultMessage: "Search"
              })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { children: [
        !canRead && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.NoPermissions, {}),
        (isLoading || isLoadingForPermissions) && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}),
        canRead && sortedRoles && sortedRoles?.length ? /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount, rowCount, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.name", defaultMessage: "Name" }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.description",
              defaultMessage: "Description"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: "global.users",
              defaultMessage: "Users"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
              id: "global.actions",
              defaultMessage: "Actions"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            TableBody,
            {
              sortedRoles,
              canDelete,
              permissions: index.PERMISSIONS,
              setRoleToDelete,
              onDelete: [showConfirmDelete, setShowConfirmDelete]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.EmptyStateLayout, { content: emptyLayout[emptyContent] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.ConfirmDialog,
        {
          isConfirmButtonLoading,
          onConfirm: handleConfirmDelete,
          onToggleDialog: handleShowConfirmDelete,
          isOpen: showConfirmDelete
        }
      )
    ] })
  ] });
};
const ProtectedRolesListPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.accessRoles, children: /* @__PURE__ */ jsxRuntime.jsx(RolesListPage, {}) });
};
const Roles = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.accessRoles, children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Switch, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Route,
      {
        path: "/settings/users-permissions/roles/new",
        component: ProtectedRolesCreatePage,
        exact: true
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Route,
      {
        path: "/settings/users-permissions/roles/:id",
        component: ProtectedRolesEditPage,
        exact: true
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/settings/users-permissions/roles", component: ProtectedRolesListPage, exact: true }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "", component: helperPlugin.AnErrorOccurred })
  ] }) });
};
exports.default = Roles;
//# sourceMappingURL=index-50ce8bcd.js.map
