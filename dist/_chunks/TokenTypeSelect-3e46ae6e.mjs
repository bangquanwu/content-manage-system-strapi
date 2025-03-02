import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { HeaderLayout, Flex, Button, IconButton, SingleSelect, SingleSelectOption, Typography, Textarea, TextInput } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
import { useNotification, useFetchClient, useAPIErrorHandler, ConfirmDialog, useTracking, useClipboard, ContentBox } from "@strapi/helper-plugin";
import { Check, ArrowLeft, Refresh, Duplicate, Key } from "@strapi/icons";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { AxiosError } from "axios";
import { format, addDays } from "date-fns";
import * as locales from "date-fns/locale";
const useRegenerate = (url, id, onRegenerate, onError) => {
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);
  const toggleNotification = useNotification();
  const { post } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
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
        if (error instanceof AxiosError) {
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
  const { formatMessage } = useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        startIcon: /* @__PURE__ */ jsx(Refresh, {}),
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
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        bodyText: {
          id: "Settings.tokens.popUpWarning.message",
          defaultMessage: "Are you sure you want to regenerate this token?"
        },
        iconRightButton: /* @__PURE__ */ jsx(Refresh, {}),
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
  const { formatMessage } = useIntl();
  const handleRegenerate = (newKey) => {
    setToken({
      ...token,
      accessKey: newKey
    });
  };
  return /* @__PURE__ */ jsx(
    HeaderLayout,
    {
      title: token?.name || formatMessage(title),
      primaryAction: canEditInputs ? /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        canRegenerate && token?.id && /* @__PURE__ */ jsx(
          Regenerate,
          {
            backUrl: regenerateUrl,
            onRegenerate: handleRegenerate,
            idToRegenerate: token?.id,
            onError: onErrorRegenerate
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: isSubmitting,
            loading: isSubmitting,
            startIcon: /* @__PURE__ */ jsx(Check, {}),
            type: "submit",
            size: "S",
            children: formatMessage({
              id: "global.save",
              defaultMessage: "Save"
            })
          }
        )
      ] }) : canRegenerate && token?.id && /* @__PURE__ */ jsx(
        Regenerate,
        {
          onRegenerate: handleRegenerate,
          idToRegenerate: token?.id,
          backUrl: regenerateUrl
        }
      ),
      navigationAction: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Link, { as: NavLink, startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: backUrl, children: formatMessage({
        id: "global.back",
        defaultMessage: "Back"
      }) }) }),
      ellipsis: true
    }
  );
};
const TokenBox = ({ token, tokenType }) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const { trackUsage } = useTracking();
  const { copy } = useClipboard();
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
  return /* @__PURE__ */ jsx(
    ContentBox,
    {
      endAction: token && /* @__PURE__ */ jsx("span", { style: { alignSelf: "start" }, children: /* @__PURE__ */ jsx(
        IconButton,
        {
          label: formatMessage({
            id: "app.component.CopyToClipboard.label",
            defaultMessage: "Copy to clipboard"
          }),
          onClick: handleClick(token),
          borderWidth: 0,
          icon: /* @__PURE__ */ jsx(Duplicate, {}),
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
      icon: /* @__PURE__ */ jsx(Key, {}),
      iconBackground: "neutral100"
    }
  );
};
const getDateOfExpiration = (createdAt, duration, language = "en") => {
  if (duration && typeof duration === "number") {
    const durationInDays = duration / 24 / 60 / 60 / 1e3;
    return format(addDays(new Date(createdAt), durationInDays), "PPP", {
      // @ts-expect-error I don't know how to fix this
      locale: locales[language]
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      SingleSelect,
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
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "604800000", children: formatMessage({
            id: "Settings.tokens.duration.7-days",
            defaultMessage: "7 days"
          }) }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "2592000000", children: formatMessage({
            id: "Settings.tokens.duration.30-days",
            defaultMessage: "30 days"
          }) }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "7776000000", children: formatMessage({
            id: "Settings.tokens.duration.90-days",
            defaultMessage: "90 days"
          }) }),
          /* @__PURE__ */ jsx(SingleSelectOption, { value: "0", children: formatMessage({
            id: "Settings.tokens.duration.unlimited",
            defaultMessage: "Unlimited"
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: !isCreating && `${formatMessage({
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    Textarea,
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    TextInput,
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    SingleSelect,
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
      children: options && options.map(({ value: value2, label: label2 }) => /* @__PURE__ */ jsx(SingleSelectOption, { value: value2, children: formatMessage(label2) }, value2))
    }
  );
};
export {
  FormHead as F,
  LifeSpanInput as L,
  TokenName as T,
  TokenDescription as a,
  TokenTypeSelect as b,
  TokenBox as c
};
//# sourceMappingURL=TokenTypeSelect-3e46ae6e.mjs.map
