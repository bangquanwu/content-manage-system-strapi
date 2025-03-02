import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { RawTable, Flex, FieldLabel, Loader, RawThead, RawTr, RawTh, VisuallyHidden, Typography, RawTbody, RawTd, Checkbox, BaseCheckbox, Box, Grid, GridItem, TextInput, TextButton, CreatableCombobox, ComboboxOption, HeaderLayout, Button, ContentLayout, Main } from "@strapi/design-system";
import { RemoveRoundedButton, pxToRem, Form, CheckPagePermissions, useNotification, useAPIErrorHandler, useFetchClient, LoadingIndicatorPage, SettingsPageTitle } from "@strapi/helper-plugin";
import { useQuery, useMutation } from "react-query";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { i as useEnterprise, b as useTypedSelector, s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { u as useContentTypes } from "./useContentTypes-53b449bb.mjs";
import { Link } from "@strapi/design-system/v2";
import { Plus, Cross, Loader as Loader$1, Check, Play, ArrowLeft } from "@strapi/icons";
import { useFormikContext, FieldArray, Field, useFormik, FormikProvider } from "formik";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { createContext } from "@radix-ui/react-context";
import styled, { css } from "styled-components";
const [WebhookEventProvider, useWebhookEvent] = createContext("WebhookEvent");
const EventsRoot = ({ children }) => {
  const { formatMessage } = useIntl();
  const { collectionTypes, isLoading } = useContentTypes();
  const isDraftAndPublish = React.useMemo(
    () => collectionTypes.some((ct) => ct.options?.draftAndPublish === true),
    [collectionTypes]
  );
  const label = formatMessage({
    id: "Settings.webhooks.form.events",
    defaultMessage: "Events"
  });
  return /* @__PURE__ */ jsx(WebhookEventProvider, { isDraftAndPublish, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsx(FieldLabel, { "aria-hidden": true, children: label }),
    isLoading && /* @__PURE__ */ jsx(Loader, { children: formatMessage({
      id: "Settings.webhooks.events.isLoading",
      defaultMessage: "Events loading"
    }) }),
    /* @__PURE__ */ jsx(StyledTable, { "aria-label": label, children })
  ] }) });
};
const StyledTable = styled(RawTable)`
  tbody tr:nth-child(odd) {
    background: ${({ theme }) => theme.colors.neutral100};
  }

  thead th span {
    color: ${({ theme }) => theme.colors.neutral500};
  }

  td,
  th {
    padding-block-start: ${({ theme }) => theme.spaces[3]};
    padding-block-end: ${({ theme }) => theme.spaces[3]};
    width: 10%;
    vertical-align: middle;
    text-align: center;
  }

  tbody tr td:first-child {
    /**
     * Add padding to the start of the first column to avoid the checkbox appearing
     * too close to the edge of the table
     */
    padding-inline-start: ${({ theme }) => theme.spaces[2]};
  }
`;
const getCEHeaders = (isDraftAndPublish) => {
  const headers = [
    { id: "Settings.webhooks.events.create", defaultMessage: "Create" },
    { id: "Settings.webhooks.events.update", defaultMessage: "Update" },
    { id: "app.utils.delete", defaultMessage: "Delete" }
  ];
  if (isDraftAndPublish) {
    headers.push({ id: "app.utils.publish", defaultMessage: "Publish" });
    headers.push({ id: "app.utils.unpublish", defaultMessage: "Unpublish" });
  }
  return headers;
};
const EventsHeaders = ({ getHeaders = getCEHeaders }) => {
  const { isDraftAndPublish } = useWebhookEvent("Headers");
  const { formatMessage } = useIntl();
  const headers = getHeaders(isDraftAndPublish);
  return /* @__PURE__ */ jsx(RawThead, { children: /* @__PURE__ */ jsxs(RawTr, { children: [
    /* @__PURE__ */ jsx(RawTh, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
      id: "Settings.webhooks.event.select",
      defaultMessage: "Select event"
    }) }) }),
    headers.map((header) => {
      if (["app.utils.publish", "app.utils.unpublish"].includes(header?.id ?? "")) {
        return /* @__PURE__ */ jsx(
          RawTh,
          {
            title: formatMessage({
              id: "Settings.webhooks.event.publish-tooltip",
              defaultMessage: "This event only exists for content with draft & publish enabled"
            }),
            children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) })
          },
          header.id
        );
      }
      return /* @__PURE__ */ jsx(RawTh, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) }) }, header.id);
    })
  ] }) });
};
const EventsBody = ({ providedEvents }) => {
  const { isDraftAndPublish } = useWebhookEvent("Body");
  const events = providedEvents || getCEEvents(isDraftAndPublish);
  const { values, handleChange: onChange } = useFormikContext();
  const inputName = "events";
  const inputValue = values.events;
  const disabledEvents = [];
  const formattedValue = inputValue.reduce((acc, curr) => {
    const key = curr.split(".")[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});
  const handleSelect = ({
    target: { name, value }
  }) => {
    const set = new Set(inputValue);
    if (value) {
      set.add(name);
    } else {
      set.delete(name);
    }
    onChange({ target: { name: inputName, value: Array.from(set) } });
  };
  const handleSelectAll = ({
    target: { name, value }
  }) => {
    const set = new Set(inputValue);
    if (value) {
      events[name].forEach((event) => {
        if (!disabledEvents.includes(event)) {
          set.add(event);
        }
      });
    } else {
      events[name].forEach((event) => set.delete(event));
    }
    onChange({ target: { name: inputName, value: Array.from(set) } });
  };
  return /* @__PURE__ */ jsx(RawTbody, { children: Object.entries(events).map(([event, value]) => {
    return /* @__PURE__ */ jsx(
      EventsRow,
      {
        disabledEvents,
        name: event,
        events: value,
        inputValue: formattedValue[event],
        handleSelect,
        handleSelectAll
      },
      event
    );
  }) });
};
const getCEEvents = (isDraftAndPublish) => {
  const entryEvents = [
    "entry.create",
    "entry.update",
    "entry.delete"
  ];
  if (isDraftAndPublish) {
    entryEvents.push("entry.publish", "entry.unpublish");
  }
  return {
    entry: entryEvents,
    media: ["media.create", "media.update", "media.delete"]
  };
};
const EventsRow = ({
  disabledEvents = [],
  name,
  events = [],
  inputValue = [],
  handleSelect,
  handleSelectAll
}) => {
  const { formatMessage } = useIntl();
  const enabledCheckboxes = events.filter((event) => !disabledEvents.includes(event));
  const hasSomeCheckboxSelected = inputValue.length > 0;
  const areAllCheckboxesSelected = inputValue.length === enabledCheckboxes.length;
  const onChangeAll = ({ target: { name: name2 } }) => {
    const valueToSet = !areAllCheckboxesSelected;
    handleSelectAll({
      target: { name: name2, value: valueToSet }
    });
  };
  const targetColumns = 5;
  return /* @__PURE__ */ jsxs(RawTr, { children: [
    /* @__PURE__ */ jsx(RawTd, { children: /* @__PURE__ */ jsx(
      Checkbox,
      {
        indeterminate: hasSomeCheckboxSelected && !areAllCheckboxesSelected,
        "aria-label": formatMessage({
          id: "global.select-all-entries",
          defaultMessage: "Select all entries"
        }),
        name,
        onChange: onChangeAll,
        value: areAllCheckboxesSelected,
        children: removeHyphensAndTitleCase(name)
      }
    ) }),
    events.map((event) => {
      return /* @__PURE__ */ jsx(RawTd, { children: /* @__PURE__ */ jsx(
        BaseCheckbox,
        {
          disabled: disabledEvents.includes(event),
          "aria-label": event,
          name: event,
          value: inputValue.includes(event),
          onValueChange: (value) => handleSelect({ target: { name: event, value } })
        }
      ) }, event);
    }),
    events.length < targetColumns && /* @__PURE__ */ jsx(RawTd, { colSpan: targetColumns - events.length })
  ] });
};
const removeHyphensAndTitleCase = (str) => str.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
const Events = { Root: EventsRoot, Headers: EventsHeaders, Body: EventsBody, Row: EventsRow };
const EventTableCE = () => {
  return /* @__PURE__ */ jsxs(Events.Root, { children: [
    /* @__PURE__ */ jsx(Events.Headers, {}),
    /* @__PURE__ */ jsx(Events.Body, {})
  ] });
};
const HeadersInput = () => {
  const { formatMessage } = useIntl();
  const { values, errors } = useFormikContext();
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsx(FieldLabel, { children: formatMessage({
      id: "Settings.webhooks.form.headers",
      defaultMessage: "Headers"
    }) }),
    /* @__PURE__ */ jsx(Box, { padding: 8, background: "neutral100", hasRadius: true, children: /* @__PURE__ */ jsx(
      FieldArray,
      {
        validateOnChange: false,
        name: "headers",
        render: ({ push, remove }) => /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
          values.headers.map((header, index) => {
            const formikError = errors.headers?.[index];
            const comboboxError = typeof formikError === "object" ? formikError.key : void 0;
            const textInputError = typeof formikError === "object" ? formikError.value : void 0;
            return /* @__PURE__ */ jsxs(React.Fragment, { children: [
              /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
                Field,
                {
                  as: HeaderCombobox,
                  name: `headers.${index}.key`,
                  "aria-label": `row ${index + 1} key`,
                  label: formatMessage({
                    id: "Settings.webhooks.key",
                    defaultMessage: "Key"
                  }),
                  error: comboboxError
                }
              ) }),
              /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "flex-end", children: [
                /* @__PURE__ */ jsx(Box, { style: { flex: 1 }, children: /* @__PURE__ */ jsx(
                  Field,
                  {
                    as: TextInput,
                    name: `headers.${index}.value`,
                    "aria-label": `row ${index + 1} value`,
                    label: formatMessage({
                      id: "Settings.webhooks.value",
                      defaultMessage: "Value"
                    }),
                    error: textInputError
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  Flex,
                  {
                    paddingLeft: 2,
                    style: { alignSelf: "center" },
                    paddingTop: textInputError ? 0 : 5,
                    children: /* @__PURE__ */ jsx(
                      RemoveRoundedButton,
                      {
                        disabled: values.headers.length === 1,
                        onClick: () => remove(index),
                        label: formatMessage(
                          {
                            id: "Settings.webhooks.headers.remove",
                            defaultMessage: "Remove header row {number}"
                          },
                          { number: index + 1 }
                        )
                      }
                    )
                  }
                )
              ] }) })
            ] }, `${index}.${header.key}`);
          }),
          /* @__PURE__ */ jsx(GridItem, { col: 12, children: /* @__PURE__ */ jsx(
            TextButton,
            {
              type: "button",
              onClick: () => {
                push({ key: "", value: "" });
              },
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              children: formatMessage({
                id: "Settings.webhooks.create.header",
                defaultMessage: "Create new header"
              })
            }
          ) })
        ] })
      }
    ) })
  ] });
};
const HeaderCombobox = ({ name, onChange, value, ...restProps }) => {
  const {
    values: { headers }
  } = useFormikContext();
  const [options, setOptions] = React.useState([...HTTP_HEADERS]);
  React.useEffect(() => {
    const headerOptions = HTTP_HEADERS.filter(
      (key) => !headers?.some((header) => header.key !== value && header.key === key)
    );
    setOptions(headerOptions);
  }, [headers, value]);
  const handleChange = (value2) => {
    onChange({ target: { name, value: value2 } });
  };
  const handleCreateOption = (value2) => {
    setOptions((prev) => [...prev, value2]);
    handleChange(value2);
  };
  return /* @__PURE__ */ jsx(
    CreatableCombobox,
    {
      ...restProps,
      onClear: () => handleChange(""),
      onChange: handleChange,
      onCreateOption: handleCreateOption,
      placeholder: "",
      value,
      children: options.map((key) => /* @__PURE__ */ jsx(ComboboxOption, { value: key, children: key }, key))
    }
  );
};
const HTTP_HEADERS = [
  "A-IM",
  "Accept",
  "Accept-Charset",
  "Accept-Encoding",
  "Accept-Language",
  "Accept-Datetime",
  "Access-Control-Request-Method",
  "Access-Control-Request-Headers",
  "Authorization",
  "Cache-Control",
  "Connection",
  "Content-Length",
  "Content-Type",
  "Cookie",
  "Date",
  "Expect",
  "Forwarded",
  "From",
  "Host",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Max-Forwards",
  "Origin",
  "Pragma",
  "Proxy-Authorization",
  "Range",
  "Referer",
  "TE",
  "User-Agent",
  "Upgrade",
  "Via",
  "Warning"
];
const TriggerContainer = ({ isPending, onCancel, response }) => {
  const { statusCode, message } = response ?? {};
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 5, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Grid, { gap: 4, style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsx(GridItem, { col: 3, children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
      id: "Settings.webhooks.trigger.test",
      defaultMessage: "Test-trigger"
    }) }) }),
    /* @__PURE__ */ jsx(GridItem, { col: 3, children: /* @__PURE__ */ jsx(Status, { isPending, statusCode }) }),
    /* @__PURE__ */ jsx(GridItem, { col: 6, children: !isPending ? /* @__PURE__ */ jsx(Message, { statusCode, message }) : /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx("button", { onClick: onCancel, type: "button", children: /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Typography, { textColor: "neutral400", children: formatMessage({
        id: "Settings.webhooks.trigger.cancel",
        defaultMessage: "cancel"
      }) }),
      /* @__PURE__ */ jsx(Icon, { as: Cross, color: "neutral400" })
    ] }) }) }) })
  ] }) });
};
const Icon = styled.svg(
  ({ theme, color }) => `
  width: ${12 / 16}rem;
  height: ${12 / 16}rem;


  ${color ? css`
          path {
            fill: ${theme.colors[color]};
          }
        ` : ""}
`
);
const Status = ({ isPending, statusCode }) => {
  const { formatMessage } = useIntl();
  if (isPending || !statusCode) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Icon, { as: Loader$1 }),
      /* @__PURE__ */ jsx(Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.pending", defaultMessage: "pending" }) })
    ] });
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Icon, { as: Check, color: "success700" }),
      /* @__PURE__ */ jsx(Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.success", defaultMessage: "success" }) })
    ] });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsx(Icon, { as: Cross, color: "danger700" }),
      /* @__PURE__ */ jsxs(Typography, { children: [
        formatMessage({ id: "Settings.error", defaultMessage: "error" }),
        " ",
        statusCode
      ] })
    ] });
  }
  return null;
};
const Message = ({ statusCode, message }) => {
  const { formatMessage } = useIntl();
  if (!statusCode) {
    return null;
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", ellipsis: true, children: formatMessage({
      id: "Settings.webhooks.trigger.success.label",
      defaultMessage: "Trigger succeeded"
    }) }) });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Flex, { maxWidth: pxToRem(250), justifyContent: "flex-end", title: message, children: /* @__PURE__ */ jsx(Typography, { ellipsis: true, textColor: "neutral600", children: message }) }) });
  }
  return null;
};
const WebhookForm = ({
  handleSubmit,
  triggerWebhook,
  isCreating,
  isTriggering,
  triggerResponse,
  data
}) => {
  const { formatMessage } = useIntl();
  const [showTriggerResponse, setShowTriggerResponse] = React.useState(false);
  const EventTable = useEnterprise(
    EventTableCE,
    async () => (await import("./EventsTable-0e19c5c4.mjs")).EventsTableEE
  );
  const mapHeaders = (headers) => {
    if (!Object.keys(headers).length) {
      return [{ key: "", value: "" }];
    }
    return Object.entries(headers).map(([key, value]) => ({ key, value }));
  };
  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      url: data?.url || "",
      headers: mapHeaders(data?.headers || {}),
      events: data?.events || []
    },
    onSubmit(values, { resetForm, setSubmitting }) {
      handleSubmit(values);
      resetForm({ values });
      setSubmitting(false);
    },
    validationSchema: makeWebhookValidationSchema({ formatMessage }),
    validateOnChange: false,
    validateOnBlur: false
  });
  if (!EventTable) {
    return null;
  }
  return /* @__PURE__ */ jsx(FormikProvider, { value: formik, children: /* @__PURE__ */ jsxs(Form, { children: [
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        primaryAction: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                triggerWebhook();
                setShowTriggerResponse(true);
              },
              variant: "tertiary",
              startIcon: /* @__PURE__ */ jsx(Play, {}),
              disabled: isCreating || isTriggering,
              size: "L",
              children: formatMessage({
                id: "Settings.webhooks.trigger",
                defaultMessage: "Trigger"
              })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              startIcon: /* @__PURE__ */ jsx(Check, {}),
              type: "submit",
              size: "L",
              disabled: !formik.dirty,
              loading: formik.isSubmitting,
              children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              })
            }
          )
        ] }),
        title: isCreating ? formatMessage({
          id: "Settings.webhooks.create",
          defaultMessage: "Create a webhook"
        }) : data?.name,
        navigationAction: (
          // @ts-expect-error – as components props are not inferred correctly.
          /* @__PURE__ */ jsx(Link, { as: NavLink, startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: "/settings/webhooks", children: formatMessage({
            id: "global.back",
            defaultMessage: "Back"
          }) })
        )
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
      showTriggerResponse && /* @__PURE__ */ jsx(
        TriggerContainer,
        {
          isPending: isTriggering,
          response: triggerResponse,
          onCancel: () => setShowTriggerResponse(false)
        }
      ),
      /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 8, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
        /* @__PURE__ */ jsxs(Grid, { gap: 6, children: [
          /* @__PURE__ */ jsx(GridItem, { col: 6, children: /* @__PURE__ */ jsx(
            Field,
            {
              as: TextInput,
              name: "name",
              error: formik.errors.name,
              label: formatMessage({
                id: "global.name",
                defaultMessage: "Name"
              }),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsx(GridItem, { col: 12, children: /* @__PURE__ */ jsx(
            Field,
            {
              as: TextInput,
              name: "url",
              error: formik.errors.url,
              label: formatMessage({
                id: "Settings.roles.form.input.url",
                defaultMessage: "Url"
              }),
              required: true
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(HeadersInput, {}),
        /* @__PURE__ */ jsx(EventTable, {})
      ] }) })
    ] }) })
  ] }) });
};
const NAME_REGEX = /(^$)|(^[A-Za-z][_0-9A-Za-z ]*$)/;
const URL_REGEX = /(^$)|((https?:\/\/.*)(d*)\/?(.*))/;
const makeWebhookValidationSchema = ({ formatMessage }) => yup.object().shape({
  name: yup.string().required(
    formatMessage({
      id: "Settings.webhooks.validation.name.required",
      defaultMessage: "Name is required"
    })
  ).matches(
    NAME_REGEX,
    formatMessage({
      id: "Settings.webhooks.validation.name.regex",
      defaultMessage: "The name must start with a letter and only contain letters, numbers, spaces and underscores"
    })
  ),
  url: yup.string().required(
    formatMessage({
      id: "Settings.webhooks.validation.url.required",
      defaultMessage: "Url is required"
    })
  ).matches(
    URL_REGEX,
    formatMessage({
      id: "Settings.webhooks.validation.url.regex",
      defaultMessage: "The value must be a valid Url"
    })
  ),
  headers: yup.lazy((array) => {
    const baseSchema = yup.array();
    if (array.length === 1) {
      const { key, value } = array[0];
      if (!key && !value) {
        return baseSchema;
      }
    }
    return baseSchema.of(
      yup.object().shape({
        key: yup.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.key",
            defaultMessage: "Key is required"
          })
        ),
        value: yup.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.value",
            defaultMessage: "Value is required"
          })
        )
      })
    );
  }),
  events: yup.array()
});
const cleanData = (data) => ({
  ...data,
  headers: data.headers.reduce((acc, { key, value }) => {
    if (key !== "") {
      acc[key] = value;
    }
    return acc;
  }, {})
});
const EditPage = () => {
  const match = useRouteMatch("/settings/webhooks/:id");
  const id = match?.params.id;
  const isCreating = id === "create";
  const { replace } = useHistory();
  const toggleNotification = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const { isLoading: isLoadingForModels } = useContentTypes();
  const { put, get, post } = useFetchClient();
  const {
    isLoading,
    data: webhookData,
    error: webhookError,
    refetch: refetchWebhook
  } = useQuery(
    ["webhooks", id],
    async () => {
      const {
        data: { data }
      } = await get(`/admin/webhooks/${id}`);
      return data;
    },
    {
      enabled: !isCreating
    }
  );
  React.useEffect(() => {
    if (webhookError) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(webhookError)
      });
    }
  }, [webhookError, toggleNotification, formatAPIError]);
  const {
    isLoading: isTriggering,
    data: triggerResponse,
    mutate
  } = useMutation(
    () => post(`/admin/webhooks/${id}/trigger`).then((res) => res.data.data),
    {
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
    }
  );
  const createWebhookMutation = useMutation((body) => post("/admin/webhooks", body), {
    onSuccess({ data: result }) {
      toggleNotification({
        type: "success",
        message: { id: "Settings.webhooks.created" }
      });
      replace(`/settings/webhooks/${result.data.id}`);
    },
    onError(error) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
    }
  });
  const updateWebhookMutation = useMutation(({ id: id2, body }) => put(`/admin/webhooks/${id2}`, body), {
    onSuccess() {
      refetchWebhook();
      toggleNotification({
        type: "success",
        message: { id: "notification.form.success.fields" }
      });
    },
    onError(error) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
    }
  });
  const handleSubmit = async (data) => {
    if (isCreating) {
      createWebhookMutation.mutate(cleanData(data));
      return;
    }
    updateWebhookMutation.mutate({ id, body: cleanData(data) });
  };
  if (isLoading || isLoadingForModels) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: "Webhooks" }),
    /* @__PURE__ */ jsx(
      WebhookForm,
      {
        data: webhookData,
        handleSubmit,
        triggerWebhook: mutate,
        isCreating,
        isTriggering,
        triggerResponse
      }
    )
  ] });
};
const ProtectedEditPage = () => {
  const permissions = useTypedSelector(selectAdminPermissions);
  return /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.settings?.webhooks.update, children: /* @__PURE__ */ jsx(EditPage, {}) });
};
const EditPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EditPage,
  ProtectedEditPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  EditPage as E,
  Events as a,
  EditPage$1 as b
};
//# sourceMappingURL=EditPage-d64d3bd7.mjs.map
