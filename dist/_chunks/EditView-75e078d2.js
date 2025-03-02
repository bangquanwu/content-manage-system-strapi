"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const axios = require("axios");
const formik = require("formik");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const reactRedux = require("react-redux");
const reactRouterDom = require("react-router-dom");
const yup = require("yup");
const index = require("./index-be8080e3.js");
const constants = require("./constants-da2542a3.js");
const TokenTypeSelect = require("./TokenTypeSelect-c75581af.js");
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
require("date-fns");
require("date-fns/locale");
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
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const schema = yup__namespace.object().shape({
  name: yup__namespace.string().max(100).required(helperPlugin.translatedErrors.required),
  description: yup__namespace.string().nullable(),
  lifespan: yup__namespace.number().integer().min(0).nullable().defined(helperPlugin.translatedErrors.required),
  permissions: yup__namespace.string().required(helperPlugin.translatedErrors.required)
});
const MSG_ERROR_NAME_TAKEN = "Name already taken";
const EditView = () => {
  helperPlugin.useFocusWhenNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const toggleNotification = helperPlugin.useNotification();
  const history = reactRouterDom.useHistory();
  const { state: locationState } = reactRouterDom.useLocation();
  const [transferToken, setTransferToken] = React__namespace.useState(
    locationState && "accessKey" in locationState.transferToken ? {
      ...locationState.transferToken
    } : null
  );
  const { trackUsage } = helperPlugin.useTracking();
  const { setCurrentStep } = helperPlugin.useGuidedTour();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const {
    allowedActions: { canCreate, canUpdate, canRegenerate }
    // @ts-expect-error this is fine
  } = helperPlugin.useRBAC(permissions.settings["transfer-tokens"]);
  const match = reactRouterDom.useRouteMatch("/settings/transfer-tokens/:id");
  const { get, post, put } = helperPlugin.useFetchClient();
  const id = match?.params?.id;
  const isCreating = id === "create";
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  React__namespace.useEffect(() => {
    trackUsage(isCreating ? "didAddTokenFromList" : "didEditTokenFromList", {
      tokenType: constants.TRANSFER_TOKEN_TYPE
    });
  }, [isCreating, trackUsage]);
  reactQuery.useQuery(
    ["transfer-token", id],
    async () => {
      const {
        data: { data }
      } = await get(`/admin/transfer/tokens/${id}`);
      setTransferToken({
        ...data
      });
      return data;
    },
    {
      enabled: !isCreating && !transferToken,
      onError(err) {
        if (err instanceof axios.AxiosError) {
          if (err.response.data.error.details?.code === "INVALID_TOKEN_SALT") {
            toggleNotification({
              type: "warning",
              message: {
                id: "notification.error.invalid.configuration",
                defaultMessage: "You have an invalid configuration, check your server log for more information."
              }
            });
          } else {
            toggleNotification({
              type: "warning",
              message: formatAPIError(err)
            });
          }
        }
      }
    }
  );
  const handleSubmit = async (body, actions) => {
    trackUsage(isCreating ? "willCreateToken" : "willEditToken", {
      tokenType: constants.TRANSFER_TOKEN_TYPE
    });
    lockApp();
    const permissions2 = body.permissions.split("-");
    const isPermissionsTransferPermission = (permission) => {
      if (permission.length === 1) {
        return permission[0] === "push" || permission[0] === "pull";
      }
      return permission[0] === "push" && permission[1] === "pull";
    };
    if (isPermissionsTransferPermission(permissions2)) {
      try {
        let response;
        if (isCreating) {
          const { data } = await post(`/admin/transfer/tokens`, {
            ...body,
            permissions: permissions2
          });
          response = data.data;
        } else {
          const { data } = await put(`/admin/transfer/tokens/${id}`, {
            name: body.name,
            description: body.description,
            permissions: permissions2
          });
          response = data.data;
        }
        unlockApp();
        if (isCreating) {
          history.replace(`/settings/transfer-tokens/${response.id}`, { transferToken: response });
          setCurrentStep("transferTokens.success");
        }
        setTransferToken({
          ...response
        });
        toggleNotification({
          type: "success",
          message: isCreating ? formatMessage({
            id: "notification.success.transfertokencreated",
            defaultMessage: "Transfer Token successfully created"
          }) : formatMessage({
            id: "notification.success.transfertokenedited",
            defaultMessage: "Transfer Token successfully edited"
          })
        });
        trackUsage(isCreating ? "didCreateToken" : "didEditToken", {
          type: transferToken?.permissions,
          tokenType: constants.TRANSFER_TOKEN_TYPE
        });
      } catch (err) {
        if (err instanceof axios.AxiosError) {
          const errors = index.formatAPIErrors(err.response.data);
          actions.setErrors(errors);
          if (err?.response?.data?.error?.message === MSG_ERROR_NAME_TAKEN) {
            toggleNotification({
              type: "warning",
              message: err.response.data.message || "notification.error.tokennamenotunique"
            });
          } else if (err?.response?.data?.error?.details?.code === "INVALID_TOKEN_SALT") {
            toggleNotification({
              type: "warning",
              message: {
                id: "notification.error.invalid.configuration",
                defaultMessage: "You have an invalid configuration, check your server log for more information."
              }
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
    }
  };
  const canEditInputs = canUpdate && !isCreating || canCreate && isCreating;
  const isLoading = !isCreating && !transferToken;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(LoadingView, {});
  }
  const handleErrorRegenerate = (err) => {
    if (err instanceof axios.AxiosError) {
      if (err?.response?.data?.error?.details?.code === "INVALID_TOKEN_SALT") {
        toggleNotification({
          type: "warning",
          message: {
            id: "notification.error.invalid.configuration",
            defaultMessage: "You have an invalid configuration, check your server log for more information."
          }
        });
      } else {
        toggleNotification({
          type: "warning",
          message: formatAPIError(err)
        });
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Transfer Tokens" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        validationSchema: schema,
        validateOnChange: false,
        initialValues: {
          name: transferToken?.name || "",
          description: transferToken?.description || "",
          lifespan: transferToken?.lifespan ?? null,
          /**
           * We need to cast the permissions to satisfy the type for `permissions`
           * in the request body incase we don't have a transferToken and instead
           * use an empty string.
           */
          permissions: transferToken?.permissions.join("-") ?? ""
        },
        enableReinitialize: true,
        onSubmit: (body, actions) => handleSubmit(body, actions),
        children: ({ errors, handleChange, isSubmitting, values }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              TokenTypeSelect.FormHead,
              {
                backUrl: "/settings/transfer-tokens",
                title: {
                  id: "Settings.transferTokens.createPage.title",
                  defaultMessage: "TokenCreate Transfer Token"
                },
                token: transferToken,
                setToken: setTransferToken,
                canEditInputs,
                canRegenerate,
                isSubmitting,
                regenerateUrl: "/admin/transfer/tokens/",
                onErrorRegenerate: handleErrorRegenerate
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              transferToken && Boolean(transferToken?.name) && "accessKey" in transferToken && /* @__PURE__ */ jsxRuntime.jsx(TokenTypeSelect.TokenBox, { token: transferToken.accessKey, tokenType: constants.TRANSFER_TOKEN_TYPE }),
              /* @__PURE__ */ jsxRuntime.jsx(
                FormTransferTokenContainer,
                {
                  errors,
                  onChange: handleChange,
                  canEditInputs,
                  isCreating,
                  values,
                  transferToken
                }
              )
            ] }) })
          ] });
        }
      }
    )
  ] });
};
const ProtectedEditView = () => {
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.["transfer-tokens"].read, children: /* @__PURE__ */ jsxRuntime.jsx(EditView, {}) });
};
const FormTransferTokenContainer = ({
  errors = {},
  onChange,
  canEditInputs,
  isCreating,
  values,
  transferToken = {}
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const typeOptions = [
    {
      value: "push",
      label: {
        id: "Settings.transferTokens.types.push",
        defaultMessage: "Push"
      }
    },
    {
      value: "pull",
      label: {
        id: "Settings.transferTokens.types.pull",
        defaultMessage: "Pull"
      }
    },
    {
      value: "push-pull",
      label: {
        id: "Settings.transferTokens.types.push-pull",
        defaultMessage: "Full Access"
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
              token: transferToken
            }
          ) }, "lifespan"),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.TokenTypeSelect,
            {
              name: "permissions",
              value: values["permissions"],
              error: errors["permissions"],
              label: {
                id: "Settings.tokens.form.type",
                defaultMessage: "Token type"
              },
              onChange: (value) => {
                onChange({ target: { name: "permissions", value } });
              },
              options: typeOptions,
              canEditInputs
            }
          ) }, "permissions")
        ] })
      ] })
    }
  );
};
const LoadingView = ({ transferTokenName }) => {
  const { formatMessage } = reactIntl.useIntl();
  helperPlugin.useFocusWhenNavigate();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": "true", children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Transfer Tokens" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: true, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}), type: "button", size: "L", children: formatMessage({ id: "global.save", defaultMessage: "Save" }) }),
        title: transferTokenName || formatMessage({
          id: "Settings.transferTokens.createPage.title",
          defaultMessage: "Create Transfer Token"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) })
  ] });
};
exports.EditView = EditView;
exports.LoadingView = LoadingView;
exports.ProtectedEditView = ProtectedEditView;
//# sourceMappingURL=EditView-75e078d2.js.map
