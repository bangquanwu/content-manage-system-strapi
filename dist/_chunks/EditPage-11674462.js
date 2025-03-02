"use strict";
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const reactQuery = require("react-query");
const reactRouterDom = require("react-router-dom");
const index = require("./index-be8080e3.js");
const useContentTypes = require("./useContentTypes-7da293cc.js");
const v2 = require("@strapi/design-system/v2");
const Icons = require("@strapi/icons");
const formik = require("formik");
const reactIntl = require("react-intl");
const yup = require("yup");
const reactContext = require("@radix-ui/react-context");
const styled = require("styled-components");
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
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const [WebhookEventProvider, useWebhookEvent] = reactContext.createContext("WebhookEvent");
const EventsRoot = ({ children }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { collectionTypes, isLoading } = useContentTypes.useContentTypes();
  const isDraftAndPublish = React__namespace.useMemo(
    () => collectionTypes.some((ct) => ct.options?.draftAndPublish === true),
    [collectionTypes]
  );
  const label = formatMessage({
    id: "Settings.webhooks.form.events",
    defaultMessage: "Events"
  });
  return /* @__PURE__ */ jsxRuntime.jsx(WebhookEventProvider, { isDraftAndPublish, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.FieldLabel, { "aria-hidden": true, children: label }),
    isLoading && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
      id: "Settings.webhooks.events.isLoading",
      defaultMessage: "Events loading"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(StyledTable, { "aria-label": label, children })
  ] }) });
};
const StyledTable = styled__default.default(designSystem.RawTable)`
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
  const { formatMessage } = reactIntl.useIntl();
  const headers = getHeaders(isDraftAndPublish);
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawThead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.RawTr, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTh, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
      id: "Settings.webhooks.event.select",
      defaultMessage: "Select event"
    }) }) }),
    headers.map((header) => {
      if (["app.utils.publish", "app.utils.unpublish"].includes(header?.id ?? "")) {
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.RawTh,
          {
            title: formatMessage({
              id: "Settings.webhooks.event.publish-tooltip",
              defaultMessage: "This event only exists for content with draft & publish enabled"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) })
          },
          header.id
        );
      }
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTh, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) }) }, header.id);
    })
  ] }) });
};
const EventsBody = ({ providedEvents }) => {
  const { isDraftAndPublish } = useWebhookEvent("Body");
  const events = providedEvents || getCEEvents(isDraftAndPublish);
  const { values, handleChange: onChange } = formik.useFormikContext();
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTbody, { children: Object.entries(events).map(([event, value]) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
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
  const { formatMessage } = reactIntl.useIntl();
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
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.RawTr, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTd, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Checkbox,
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
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTd, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.BaseCheckbox,
        {
          disabled: disabledEvents.includes(event),
          "aria-label": event,
          name: event,
          value: inputValue.includes(event),
          onValueChange: (value) => handleSelect({ target: { name: event, value } })
        }
      ) }, event);
    }),
    events.length < targetColumns && /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTd, { colSpan: targetColumns - events.length })
  ] });
};
const removeHyphensAndTitleCase = (str) => str.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
const Events = { Root: EventsRoot, Headers: EventsHeaders, Body: EventsBody, Row: EventsRow };
const EventTableCE = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(Events.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Events.Headers, {}),
    /* @__PURE__ */ jsxRuntime.jsx(Events.Body, {})
  ] });
};
const HeadersInput = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { values, errors } = formik.useFormikContext();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.FieldLabel, { children: formatMessage({
      id: "Settings.webhooks.form.headers",
      defaultMessage: "Headers"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 8, background: "neutral100", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      formik.FieldArray,
      {
        validateOnChange: false,
        name: "headers",
        render: ({ push, remove }) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, children: [
          values.headers.map((header, index2) => {
            const formikError = errors.headers?.[index2];
            const comboboxError = typeof formikError === "object" ? formikError.key : void 0;
            const textInputError = typeof formikError === "object" ? formikError.value : void 0;
            return /* @__PURE__ */ jsxRuntime.jsxs(React__namespace.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
                formik.Field,
                {
                  as: HeaderCombobox,
                  name: `headers.${index2}.key`,
                  "aria-label": `row ${index2 + 1} key`,
                  label: formatMessage({
                    id: "Settings.webhooks.key",
                    defaultMessage: "Key"
                  }),
                  error: comboboxError
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-end", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { style: { flex: 1 }, children: /* @__PURE__ */ jsxRuntime.jsx(
                  formik.Field,
                  {
                    as: designSystem.TextInput,
                    name: `headers.${index2}.value`,
                    "aria-label": `row ${index2 + 1} value`,
                    label: formatMessage({
                      id: "Settings.webhooks.value",
                      defaultMessage: "Value"
                    }),
                    error: textInputError
                  }
                ) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Flex,
                  {
                    paddingLeft: 2,
                    style: { alignSelf: "center" },
                    paddingTop: textInputError ? 0 : 5,
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      helperPlugin.RemoveRoundedButton,
                      {
                        disabled: values.headers.length === 1,
                        onClick: () => remove(index2),
                        label: formatMessage(
                          {
                            id: "Settings.webhooks.headers.remove",
                            defaultMessage: "Remove header row {number}"
                          },
                          { number: index2 + 1 }
                        )
                      }
                    )
                  }
                )
              ] }) })
            ] }, `${index2}.${header.key}`);
          }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.TextButton,
            {
              type: "button",
              onClick: () => {
                push({ key: "", value: "" });
              },
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
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
  } = formik.useFormikContext();
  const [options, setOptions] = React__namespace.useState([...HTTP_HEADERS]);
  React__namespace.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.CreatableCombobox,
    {
      ...restProps,
      onClear: () => handleChange(""),
      onChange: handleChange,
      onCreateOption: handleCreateOption,
      placeholder: "",
      value,
      children: options.map((key) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: key, children: key }, key))
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
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", padding: 5, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
      id: "Settings.webhooks.trigger.test",
      defaultMessage: "Test-trigger"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 3, children: /* @__PURE__ */ jsxRuntime.jsx(Status, { isPending, statusCode }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: !isPending ? /* @__PURE__ */ jsxRuntime.jsx(Message, { statusCode, message }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: onCancel, type: "button", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral400", children: formatMessage({
        id: "Settings.webhooks.trigger.cancel",
        defaultMessage: "cancel"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Icon, { as: Icons.Cross, color: "neutral400" })
    ] }) }) }) })
  ] }) });
};
const Icon = styled__default.default.svg(
  ({ theme, color }) => `
  width: ${12 / 16}rem;
  height: ${12 / 16}rem;


  ${color ? styled.css`
          path {
            fill: ${theme.colors[color]};
          }
        ` : ""}
`
);
const Status = ({ isPending, statusCode }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (isPending || !statusCode) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Icon, { as: Icons.Loader }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.pending", defaultMessage: "pending" }) })
    ] });
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Icon, { as: Icons.Check, color: "success700" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.success", defaultMessage: "success" }) })
    ] });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Icon, { as: Icons.Cross, color: "danger700" }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { children: [
        formatMessage({ id: "Settings.error", defaultMessage: "error" }),
        " ",
        statusCode
      ] })
    ] });
  }
  return null;
};
const Message = ({ statusCode, message }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (!statusCode) {
    return null;
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", ellipsis: true, children: formatMessage({
      id: "Settings.webhooks.trigger.success.label",
      defaultMessage: "Trigger succeeded"
    }) }) });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { maxWidth: helperPlugin.pxToRem(250), justifyContent: "flex-end", title: message, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, textColor: "neutral600", children: message }) }) });
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
  const { formatMessage } = reactIntl.useIntl();
  const [showTriggerResponse, setShowTriggerResponse] = React__namespace.useState(false);
  const EventTable = index.useEnterprise(
    EventTableCE,
    async () => (await Promise.resolve().then(() => require("./EventsTable-7c4b60a7.js"))).EventsTableEE
  );
  const mapHeaders = (headers) => {
    if (!Object.keys(headers).length) {
      return [{ key: "", value: "" }];
    }
    return Object.entries(headers).map(([key, value]) => ({ key, value }));
  };
  const formik$1 = formik.useFormik({
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
  return /* @__PURE__ */ jsxRuntime.jsx(formik.FormikProvider, { value: formik$1, children: /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        primaryAction: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              onClick: () => {
                triggerWebhook();
                setShowTriggerResponse(true);
              },
              variant: "tertiary",
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Play, {}),
              disabled: isCreating || isTriggering,
              size: "L",
              children: formatMessage({
                id: "Settings.webhooks.trigger",
                defaultMessage: "Trigger"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}),
              type: "submit",
              size: "L",
              disabled: !formik$1.dirty,
              loading: formik$1.isSubmitting,
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
          /* @__PURE__ */ jsxRuntime.jsx(v2.Link, { as: reactRouterDom.NavLink, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowLeft, {}), to: "/settings/webhooks", children: formatMessage({
            id: "global.back",
            defaultMessage: "Back"
          }) })
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
      showTriggerResponse && /* @__PURE__ */ jsxRuntime.jsx(
        TriggerContainer,
        {
          isPending: isTriggering,
          response: triggerResponse,
          onCancel: () => setShowTriggerResponse(false)
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", padding: 8, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 6, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
            formik.Field,
            {
              as: designSystem.TextInput,
              name: "name",
              error: formik$1.errors.name,
              label: formatMessage({
                id: "global.name",
                defaultMessage: "Name"
              }),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            formik.Field,
            {
              as: designSystem.TextInput,
              name: "url",
              error: formik$1.errors.url,
              label: formatMessage({
                id: "Settings.roles.form.input.url",
                defaultMessage: "Url"
              }),
              required: true
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(HeadersInput, {}),
        /* @__PURE__ */ jsxRuntime.jsx(EventTable, {})
      ] }) })
    ] }) })
  ] }) });
};
const NAME_REGEX = /(^$)|(^[A-Za-z][_0-9A-Za-z ]*$)/;
const URL_REGEX = /(^$)|((https?:\/\/.*)(d*)\/?(.*))/;
const makeWebhookValidationSchema = ({ formatMessage }) => yup__namespace.object().shape({
  name: yup__namespace.string().required(
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
  url: yup__namespace.string().required(
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
  headers: yup__namespace.lazy((array) => {
    const baseSchema = yup__namespace.array();
    if (array.length === 1) {
      const { key, value } = array[0];
      if (!key && !value) {
        return baseSchema;
      }
    }
    return baseSchema.of(
      yup__namespace.object().shape({
        key: yup__namespace.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.key",
            defaultMessage: "Key is required"
          })
        ),
        value: yup__namespace.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.value",
            defaultMessage: "Value is required"
          })
        )
      })
    );
  }),
  events: yup__namespace.array()
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
  const match = reactRouterDom.useRouteMatch("/settings/webhooks/:id");
  const id = match?.params.id;
  const isCreating = id === "create";
  const { replace } = reactRouterDom.useHistory();
  const toggleNotification = helperPlugin.useNotification();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const { isLoading: isLoadingForModels } = useContentTypes.useContentTypes();
  const { put, get, post } = helperPlugin.useFetchClient();
  const {
    isLoading,
    data: webhookData,
    error: webhookError,
    refetch: refetchWebhook
  } = reactQuery.useQuery(
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
  React__namespace.useEffect(() => {
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
  } = reactQuery.useMutation(
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
  const createWebhookMutation = reactQuery.useMutation((body) => post("/admin/webhooks", body), {
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
  const updateWebhookMutation = reactQuery.useMutation(({ id: id2, body }) => put(`/admin/webhooks/${id2}`, body), {
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
    return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: "Webhooks" }),
    /* @__PURE__ */ jsxRuntime.jsx(
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
  const permissions = index.useTypedSelector(index.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: permissions.settings?.webhooks.update, children: /* @__PURE__ */ jsxRuntime.jsx(EditPage, {}) });
};
const EditPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EditPage,
  ProtectedEditPage
}, Symbol.toStringTag, { value: "Module" }));
exports.EditPage = EditPage;
exports.EditPage$1 = EditPage$1;
exports.Events = Events;
//# sourceMappingURL=EditPage-11674462.js.map
