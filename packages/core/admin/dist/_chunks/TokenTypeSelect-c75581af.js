"use strict";
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const v2 = require("@strapi/design-system/v2");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const axios = require("axios");
const dateFns = require("date-fns");
const locales = require("date-fns/locale");
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
const locales__namespace = /* @__PURE__ */ _interopNamespace(locales);
const useRegenerate = (url, id, onRegenerate, onError) => {
  const [isLoadingConfirmation, setIsLoadingConfirmation] = React.useState(false);
  const toggleNotification = helperPlugin.useNotification();
  const { post } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const regenerateData = async () => {
    try {
      const {
        data: {
          data: { accessKey }
        }
      } = await post(`${url}${id}/regenerate`);
      setIsLoadingConfirmation(false);
      onRegenerate(accessKey);
    } catch (error) {
      setIsLoadingConfirmation(false);
      if (onError) {
        onError(error);
      } else {
        if (error instanceof axios.AxiosError) {
          toggleNotification({
            type: "warning",
            message: formatAPIError(error)
          });
        }
      }
    }
  };
  return {
    regenerateData,
    isLoadingConfirmation
  };
};
const Regenerate = ({
  onRegenerate = () => {
  },
  idToRegenerate,
  backUrl,
  onError
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React__namespace.useState(false);
  const { regenerateData, isLoadingConfirmation } = useRegenerate(
    backUrl,
    idToRegenerate,
    onRegenerate,
    onError
  );
  const handleConfirmRegeneration = async () => {
    regenerateData();
    setShowConfirmDialog(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Refresh, {}),
        type: "button",
        size: "S",
        variant: "tertiary",
        onClick: () => setShowConfirmDialog(true),
        name: "regenerate",
        children: formatMessage({
          id: "Settings.tokens.regenerate",
          defaultMessage: "Regenerate"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.ConfirmDialog,
      {
        bodyText: {
          id: "Settings.tokens.popUpWarning.message",
          defaultMessage: "Are you sure you want to regenerate this token?"
        },
        iconRightButton: /* @__PURE__ */ jsxRuntime.jsx(Icons.Refresh, {}),
        isConfirmButtonLoading: isLoadingConfirmation,
        isOpen: showConfirmDialog,
        onToggleDialog: () => setShowConfirmDialog(false),
        onConfirm: handleConfirmRegeneration,
        leftButtonText: {
          id: "Settings.tokens.Button.cancel",
          defaultMessage: "Cancel"
        },
        rightButtonText: {
          id: "Settings.tokens.Button.regenerate",
          defaultMessage: "Regenerate"
        },
        title: {
          id: "Settings.tokens.RegenerateDialog.title",
          defaultMessage: "Regenerate token"
        }
      }
    )
  ] });
};
const FormHead = ({
  title,
  token,
  setToken,
  canEditInputs,
  canRegenerate,
  isSubmitting,
  backUrl,
  regenerateUrl,
  onErrorRegenerate
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleRegenerate = (newKey) => {
    setToken({
      ...token,
      accessKey: newKey
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.HeaderLayout,
    {
      title: token?.name || formatMessage(title),
      primaryAction: canEditInputs ? /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        canRegenerate && token?.id && /* @__PURE__ */ jsxRuntime.jsx(
          Regenerate,
          {
            backUrl: regenerateUrl,
            onRegenerate: handleRegenerate,
            idToRegenerate: token?.id,
            onError: onErrorRegenerate
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            disabled: isSubmitting,
            loading: isSubmitting,
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}),
            type: "submit",
            size: "S",
            children: formatMessage({
              id: "global.save",
              defaultMessage: "Save"
            })
          }
        )
      ] }) : canRegenerate && token?.id && /* @__PURE__ */ jsxRuntime.jsx(
        Regenerate,
        {
          onRegenerate: handleRegenerate,
          idToRegenerate: token?.id,
          backUrl: regenerateUrl
        }
      ),
      navigationAction: /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(v2.Link, { as: reactRouterDom.NavLink, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowLeft, {}), to: backUrl, children: formatMessage({
        id: "global.back",
        defaultMessage: "Back"
      }) }) }),
      ellipsis: true
    }
  );
};
const TokenBox = ({ token, tokenType }) => {
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const { trackUsage } = helperPlugin.useTracking();
  const { copy } = helperPlugin.useClipboard();
  const handleClick = (token2) => async () => {
    if (token2) {
      const didCopy = await copy(token2);
      if (didCopy) {
        trackUsage("didCopyTokenKey", {
          tokenType
        });
        toggleNotification({
          type: "success",
          message: { id: "Settings.tokens.notification.copied" }
        });
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    helperPlugin.ContentBox,
    {
      endAction: token && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { alignSelf: "start" }, children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          label: formatMessage({
            id: "app.component.CopyToClipboard.label",
            defaultMessage: "Copy to clipboard"
          }),
          onClick: handleClick(token),
          borderWidth: 0,
          icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Duplicate, {}),
          style: { padding: 0, height: "1rem" }
        }
      ) }),
      title: token || formatMessage({
        id: "Settings.tokens.copy.editTitle",
        defaultMessage: "This token isn’t accessible anymore."
      }),
      subtitle: token ? formatMessage({
        id: "Settings.tokens.copy.lastWarning",
        defaultMessage: "Make sure to copy this token, you won’t be able to see it again!"
      }) : formatMessage({
        id: "Settings.tokens.copy.editMessage",
        defaultMessage: "For security reasons, you can only see your token once."
      }),
      icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Key, {}),
      iconBackground: "neutral100"
    }
  );
};
const getDateOfExpiration = (createdAt, duration, language = "en") => {
  if (duration && typeof duration === "number") {
    const durationInDays = duration / 24 / 60 / 60 / 1e3;
    return dateFns.format(dateFns.addDays(new Date(createdAt), durationInDays), "PPP", {
      // @ts-expect-error I don't know how to fix this
      locale: locales__namespace[language]
    });
  }
  return "Unlimited";
};
const isErrorMessageMessageDescriptor = (message) => {
  return typeof message === "object" && message !== null && "id" in message;
};
const LifeSpanInput = ({
  token,
  error,
  value,
  onChange,
  isCreating
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.SingleSelect,
      {
        name: "lifespan",
        label: formatMessage({
          id: "Settings.tokens.form.duration",
          defaultMessage: "Token duration"
        }),
        value,
        error: error ? formatMessage(
          isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
        ) : void 0,
        onChange: (value2) => {
          onChange({ target: { name: "lifespan", value: value2 } });
        },
        required: true,
        disabled: !isCreating,
        placeholder: "Select",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "604800000", children: formatMessage({
            id: "Settings.tokens.duration.7-days",
            defaultMessage: "7 days"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "2592000000", children: formatMessage({
            id: "Settings.tokens.duration.30-days",
            defaultMessage: "30 days"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "7776000000", children: formatMessage({
            id: "Settings.tokens.duration.90-days",
            defaultMessage: "90 days"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "0", children: formatMessage({
            id: "Settings.tokens.duration.unlimited",
            defaultMessage: "Unlimited"
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: !isCreating && `${formatMessage({
      id: "Settings.tokens.duration.expiration-date",
      defaultMessage: "Expiration date"
      // @ts-expect-error – TODO: fix this.
    })}: ${getDateOfExpiration(token?.createdAt, parseInt(value ?? "", 10))}` })
  ] });
};
const TokenDescription = ({
  error,
  value,
  onChange,
  canEditInputs
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Textarea,
    {
      label: formatMessage({
        id: "Settings.tokens.form.description",
        defaultMessage: "Description"
      }),
      id: "description",
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : {
          id: error,
          defaultMessage: error
        }
      ) : void 0,
      onChange,
      disabled: !canEditInputs,
      children: value
    }
  );
};
const TokenName = ({ error, value, onChange, canEditInputs }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.TextInput,
    {
      name: "name",
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
      ) : void 0,
      label: formatMessage({
        id: "Settings.tokens.form.name",
        defaultMessage: "Name"
      }),
      onChange,
      value,
      disabled: !canEditInputs,
      required: true
    }
  );
};
const TokenTypeSelect = ({
  name = "type",
  error,
  value,
  onChange,
  canEditInputs,
  options = [],
  label
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.SingleSelect,
    {
      name,
      label: formatMessage({
        id: label.id,
        defaultMessage: label.defaultMessage
      }),
      value,
      error: error ? formatMessage(
        isErrorMessageMessageDescriptor(error) ? error : { id: error, defaultMessage: error }
      ) : void 0,
      onChange,
      placeholder: "Select",
      required: true,
      disabled: !canEditInputs,
      children: options && options.map(({ value: value2, label: label2 }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: value2, children: formatMessage(label2) }, value2))
    }
  );
};
exports.FormHead = FormHead;
exports.LifeSpanInput = LifeSpanInput;
exports.TokenBox = TokenBox;
exports.TokenDescription = TokenDescription;
exports.TokenName = TokenName;
exports.TokenTypeSelect = TokenTypeSelect;
//# sourceMappingURL=TokenTypeSelect-c75581af.js.map
