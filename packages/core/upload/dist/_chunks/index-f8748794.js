"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const icons = require("@strapi/icons");
const isEqual = require("lodash/isEqual");
const reactHelmet = require("react-helmet");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const index = require("./index-24c87e32.js");
require("byte-size");
require("date-fns");
require("qs");
const produce = require("immer");
const set = require("lodash/set");
require("prop-types");
require("styled-components");
require("formik");
require("yup");
require("axios");
require("react-select");
require("cropperjs");
require("@strapi/design-system/v2");
require("cropperjs/dist/cropper.css");
require("lodash/isEmpty");
require("react-dnd");
require("react-router-dom");
require("date-fns/parseISO");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const React__default = /* @__PURE__ */ _interopDefault(React);
const isEqual__default = /* @__PURE__ */ _interopDefault(isEqual);
const produce__default = /* @__PURE__ */ _interopDefault(produce);
const set__default = /* @__PURE__ */ _interopDefault(set);
const init = (initialState2) => {
  return initialState2;
};
const initialState = {
  initialData: {
    responsiveDimensions: true,
    sizeOptimization: true,
    autoOrientation: false,
    videoPreview: false
  },
  modifiedData: {
    responsiveDimensions: true,
    sizeOptimization: true,
    autoOrientation: false,
    videoPreview: false
  }
};
const reducer = (state, action) => (
  // eslint-disable-next-line consistent-return
  produce__default.default(state, (drafState) => {
    switch (action.type) {
      case "GET_DATA_SUCCEEDED": {
        drafState.initialData = action.data;
        drafState.modifiedData = action.data;
        break;
      }
      case "ON_CHANGE": {
        set__default.default(drafState, ["modifiedData", ...action.keys.split(".")], action.value);
        break;
      }
      default:
        return state;
    }
  })
);
const SettingsPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const toggleNotification = helperPlugin.useNotification();
  const { get, put } = helperPlugin.useFetchClient();
  helperPlugin.useFocusWhenNavigate();
  const [{ initialData, modifiedData }, dispatch] = React.useReducer(reducer, initialState, init);
  const { data, isLoading, refetch } = reactQuery.useQuery({
    queryKey: ["upload", "settings"],
    async queryFn() {
      const {
        data: { data: data2 }
      } = await get("/upload/settings");
      return data2;
    }
  });
  React__default.default.useEffect(() => {
    if (data) {
      dispatch({
        type: "GET_DATA_SUCCEEDED",
        data
      });
    }
  }, [data]);
  const isSaveButtonDisabled = isEqual__default.default(initialData, modifiedData);
  const { mutateAsync, isLoading: isSubmiting } = reactQuery.useMutation({
    async mutationFn(body) {
      return put("/upload/settings", body);
    },
    onSuccess() {
      refetch();
      toggleNotification({
        type: "success",
        message: { id: "notification.form.success.fields" }
      });
    },
    onError(err) {
      console.error(err);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaveButtonDisabled) {
      return;
    }
    lockApp();
    await mutateAsync(modifiedData);
    unlockApp();
  };
  const handleChange = ({ target: { name, value } }) => {
    dispatch({
      type: "ON_CHANGE",
      keys: name,
      value
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { tabIndex: -1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      reactHelmet.Helmet,
      {
        title: formatMessage({
          id: index.getTrad("page.title"),
          defaultMessage: "Settings - Media Libray"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title: formatMessage({
            id: index.getTrad("settings.header.label"),
            defaultMessage: "Media Library"
          }),
          primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              disabled: isSaveButtonDisabled,
              loading: isSubmiting,
              type: "submit",
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
              size: "S",
              children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              })
            }
          ),
          subtitle: formatMessage({
            id: index.getTrad("settings.sub-header.label"),
            defaultMessage: "Configure the settings for the Media Library"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Layout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 12, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: index.getTrad("settings.blockTitle"),
          defaultMessage: "Asset management"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 6, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.ToggleInput,
            {
              "aria-label": "responsiveDimensions",
              checked: modifiedData.responsiveDimensions,
              hint: formatMessage({
                id: index.getTrad("settings.form.responsiveDimensions.description"),
                defaultMessage: "Enabling this option will generate multiple formats (small, medium and large) of the uploaded asset."
              }),
              label: formatMessage({
                id: index.getTrad("settings.form.responsiveDimensions.label"),
                defaultMessage: "Responsive friendly upload"
              }),
              name: "responsiveDimensions",
              offLabel: formatMessage({
                id: "app.components.ToggleCheckbox.off-label",
                defaultMessage: "Off"
              }),
              onLabel: formatMessage({
                id: "app.components.ToggleCheckbox.on-label",
                defaultMessage: "On"
              }),
              onChange: (e) => {
                handleChange({
                  target: { name: "responsiveDimensions", value: e.target.checked }
                });
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.ToggleInput,
            {
              "aria-label": "sizeOptimization",
              checked: modifiedData.sizeOptimization,
              hint: formatMessage({
                id: index.getTrad("settings.form.sizeOptimization.description"),
                defaultMessage: "Enabling this option will reduce the image size and slightly reduce its quality."
              }),
              label: formatMessage({
                id: index.getTrad("settings.form.sizeOptimization.label"),
                defaultMessage: "Size optimization"
              }),
              name: "sizeOptimization",
              offLabel: formatMessage({
                id: "app.components.ToggleCheckbox.off-label",
                defaultMessage: "Off"
              }),
              onLabel: formatMessage({
                id: "app.components.ToggleCheckbox.on-label",
                defaultMessage: "On"
              }),
              onChange: (e) => {
                handleChange({
                  target: { name: "sizeOptimization", value: e.target.checked }
                });
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.ToggleInput,
            {
              "aria-label": "autoOrientation",
              checked: modifiedData.autoOrientation,
              hint: formatMessage({
                id: index.getTrad("settings.form.autoOrientation.description"),
                defaultMessage: "Enabling this option will automatically rotate the image according to EXIF orientation tag."
              }),
              label: formatMessage({
                id: index.getTrad("settings.form.autoOrientation.label"),
                defaultMessage: "Auto orientation"
              }),
              name: "autoOrientation",
              offLabel: formatMessage({
                id: "app.components.ToggleCheckbox.off-label",
                defaultMessage: "Off"
              }),
              onLabel: formatMessage({
                id: "app.components.ToggleCheckbox.on-label",
                defaultMessage: "On"
              }),
              onChange: (e) => {
                handleChange({
                  target: { name: "autoOrientation", value: e.target.checked }
                });
              }
            }
          ) })
        ] })
      ] }) }) }) }) })
    ] })
  ] });
};
const ProtectedSettingsPage = () => /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.settings, children: /* @__PURE__ */ jsxRuntime.jsx(SettingsPage, {}) });
exports.SettingsPage = SettingsPage;
exports.default = ProtectedSettingsPage;
//# sourceMappingURL=index-f8748794.js.map
