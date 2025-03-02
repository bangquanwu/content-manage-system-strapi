import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Main, ContentLayout, Flex, Box, Typography, Grid, GridItem, HeaderLayout, Button } from "@strapi/design-system";
import { translatedErrors, CheckPagePermissions, useFocusWhenNavigate, useOverlayBlocker, useNotification, useTracking, useGuidedTour, useRBAC, useFetchClient, useAPIErrorHandler, SettingsPageTitle, Form, LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Check } from "@strapi/icons";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import { s as selectAdminPermissions, p as formatAPIErrors } from "./index-90ba4fba.mjs";
import { T as TRANSFER_TOKEN_TYPE } from "./constants-d3dd8ed6.mjs";
import { F as FormHead, c as TokenBox, T as TokenName, a as TokenDescription, L as LifeSpanInput, b as TokenTypeSelect } from "./TokenTypeSelect-3e46ae6e.mjs";
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
const schema = yup.object().shape({
  name: yup.string().max(100).required(translatedErrors.required),
  description: yup.string().nullable(),
  lifespan: yup.number().integer().min(0).nullable().defined(translatedErrors.required),
  permissions: yup.string().required(translatedErrors.required)
});
const MSG_ERROR_NAME_TAKEN = "Name already taken";
const EditView = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const toggleNotification = useNotification();
  const history = useHistory();
  const { state: locationState } = useLocation();
  const [transferToken, setTransferToken] = React.useState(
    locationState && "accessKey" in locationState.transferToken ? {
      ...locationState.transferToken
    } : null
  );
  const { trackUsage } = useTracking();
  const { setCurrentStep } = useGuidedTour();
  const permissions = useSelector(selectAdminPermissions);
  const {
    allowedActions: { canCreate, canUpdate, canRegenerate }
    // @ts-expect-error this is fine
  } = useRBAC(permissions.settings["transfer-tokens"]);
  const match = useRouteMatch("/settings/transfer-tokens/:id");
  const { get, post, put } = useFetchClient();
  const id = match?.params?.id;
  const isCreating = id === "create";
  const { formatAPIError } = useAPIErrorHandler();
  React.useEffect(() => {
    trackUsage(isCreating ? "didAddTokenFromList" : "didEditTokenFromList", {
      tokenType: TRANSFER_TOKEN_TYPE
    });
  }, [isCreating, trackUsage]);
  useQuery(
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
        if (err instanceof AxiosError) {
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
      tokenType: TRANSFER_TOKEN_TYPE
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
          tokenType: TRANSFER_TOKEN_TYPE
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          const errors = formatAPIErrors(err.response.data);
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
    return /* @__PURE__ */ jsx(LoadingView, {});
  }
  const handleErrorRegenerate = (err) => {
    if (err instanceof AxiosError) {
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
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Transfer Tokens" }),
    /* @__PURE__ */ jsx(
      Formik,
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
          return /* @__PURE__ */ jsxs(Form, { children: [
            /* @__PURE__ */ jsx(
              FormHead,
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
            /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              transferToken && Boolean(transferToken?.name) && "accessKey" in transferToken && /* @__PURE__ */ jsx(TokenBox, { token: transferToken.accessKey, tokenType: TRANSFER_TOKEN_TYPE }),
              /* @__PURE__ */ jsx(
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
  const permissions = useSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.["transfer-tokens"].read, children: /* @__PURE__ */ jsx(EditView, {}) });
};
const FormTransferTokenContainer = ({
  errors = {},
  onChange,
  canEditInputs,
  isCreating,
  values,
  transferToken = {}
}) => {
  const { formatMessage } = useIntl();
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
              token: transferToken
            }
          ) }, "lifespan"),
          /* @__PURE__ */ jsx(GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsx(
            TokenTypeSelect,
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
  const { formatMessage } = useIntl();
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": "true", children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Transfer Tokens" }),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        primaryAction: /* @__PURE__ */ jsx(Button, { disabled: true, startIcon: /* @__PURE__ */ jsx(Check, {}), type: "button", size: "L", children: formatMessage({ id: "global.save", defaultMessage: "Save" }) }),
        title: transferTokenName || formatMessage({
          id: "Settings.transferTokens.createPage.title",
          defaultMessage: "Create Transfer Token"
        })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) })
  ] });
};
export {
  EditView,
  LoadingView,
  ProtectedEditView
};
//# sourceMappingURL=EditView-c627b52f.mjs.map
