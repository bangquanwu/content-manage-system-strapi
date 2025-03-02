"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const icons = require("@strapi/icons");
const isEqual = require("lodash/isEqual");
const PropTypes = require("prop-types");
const reactIntl = require("react-intl");
const index = require("./index-24c87e32.js");
const produce = require("immer");
const get = require("lodash/get");
const set = require("lodash/set");
require("styled-components");
require("byte-size");
require("date-fns");
require("qs");
require("react-query");
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
const isEqual__default = /* @__PURE__ */ _interopDefault(isEqual);
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const produce__default = /* @__PURE__ */ _interopDefault(produce);
const get__default = /* @__PURE__ */ _interopDefault(get);
const set__default = /* @__PURE__ */ _interopDefault(set);
const Settings = ({ sort = "", pageSize = 10, onChange: onChange2 }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "tableShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Select,
          {
            label: formatMessage({
              id: index.getTrad("config.entries.title"),
              defaultMessage: "Entries per page"
            }),
            hint: formatMessage({
              id: index.getTrad("config.entries.note"),
              defaultMessage: "Number of assets displayed by default in the Media Library"
            }),
            onChange: (value) => onChange2({ target: { name: "pageSize", value } }),
            name: "pageSize",
            value: pageSize,
            children: index.pageSizes.map((pageSize2) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Option, { value: pageSize2, children: pageSize2 }, pageSize2))
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Select,
          {
            label: formatMessage({
              id: index.getTrad("config.sort.title"),
              defaultMessage: "Default sort order"
            }),
            hint: formatMessage({
              id: index.getTrad("config.note"),
              defaultMessage: "Note: You can override this value in the media library."
            }),
            onChange: (value) => onChange2({ target: { name: "sort", value } }),
            name: "sort",
            value: sort,
            "test-sort": sort,
            "data-testid": "sort-select",
            children: index.sortOptions.map((filter) => /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Option,
              {
                "data-testid": `sort-option-${filter.value}`,
                value: filter.value,
                children: formatMessage({ id: index.getTrad(filter.key), defaultMessage: `${filter.value}` })
              },
              filter.key
            ))
          }
        ) })
      ] })
    }
  );
};
Settings.propTypes = {
  sort: PropTypes__default.default.string.isRequired,
  pageSize: PropTypes__default.default.number.isRequired,
  onChange: PropTypes__default.default.func.isRequired
};
const ON_CHANGE = `${index.pluginId}/ON_CHANGE`;
const SET_LOADED = `${index.pluginId}/SET_LOADED`;
const onChange = ({ name, value }) => ({
  type: ON_CHANGE,
  keys: name,
  value
});
const setLoaded = () => ({
  type: SET_LOADED
});
const initialState = {
  initialData: {},
  modifiedData: {}
};
const init = (configData) => {
  return {
    ...initialState,
    initialData: configData,
    modifiedData: configData
  };
};
const reducer = (state = initialState, action) => (
  // eslint-disable-next-line consistent-return
  produce__default.default(state, (draftState) => {
    switch (action.type) {
      case ON_CHANGE: {
        set__default.default(draftState, ["modifiedData", ...action.keys.split(".")], action.value);
        break;
      }
      case SET_LOADED: {
        const reInitialise = init(get__default.default(draftState, ["modifiedData"], {}));
        draftState.initialData = reInitialise.initialData;
        draftState.modifiedData = reInitialise.modifiedData;
        break;
      }
      default:
        return draftState;
    }
  })
);
const ConfigureTheView = ({ config }) => {
  const { trackUsage } = helperPlugin.useTracking();
  const { formatMessage } = reactIntl.useIntl();
  const toggleNotification = helperPlugin.useNotification();
  const { mutateConfig } = index.useConfig();
  const { isLoading: isSubmittingForm } = mutateConfig;
  const [showWarningSubmit, setWarningSubmit] = React.useState(false);
  const toggleWarningSubmit = () => setWarningSubmit((prevState) => !prevState);
  const [reducerState, dispatch] = React.useReducer(reducer, initialState, () => init(config));
  const { initialData, modifiedData } = reducerState;
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleWarningSubmit();
  };
  const handleConfirm = async () => {
    trackUsage("willEditMediaLibraryConfig");
    await mutateConfig.mutateAsync(modifiedData);
    toggleWarningSubmit();
    dispatch(setLoaded());
    toggleNotification({
      type: "success",
      message: {
        id: "notification.form.success.fields",
        defaultMessage: "Changes saved"
      }
    });
  };
  const handleChange = ({ target: { name, value } }) => {
    dispatch(onChange({ name, value }));
  };
  helperPlugin.useFocusWhenNavigate();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Layout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { "aria-busy": isSubmittingForm, children: /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        navigationAction: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.Link, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}), to: `/plugins/${index.pluginId}`, id: "go-back", children: formatMessage({ id: index.getTrad("config.back"), defaultMessage: "Back" }) }),
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            size: "S",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
            disabled: isEqual__default.default(modifiedData, initialData),
            type: "submit",
            children: formatMessage({ id: "global.save", defaultMessage: "Save" })
          }
        ),
        subtitle: formatMessage({
          id: index.getTrad("config.subtitle"),
          defaultMessage: "Define the view settings of the media library."
        }),
        title: formatMessage({
          id: index.getTrad("config.title"),
          defaultMessage: "Configure the view - Media Library"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(
      Settings,
      {
        "data-testid": "settings",
        pageSize: modifiedData.pageSize || "",
        sort: modifiedData.sort || "",
        onChange: handleChange
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.ConfirmDialog,
      {
        bodyText: {
          id: index.getTrad("config.popUpWarning.warning.updateAllSettings"),
          defaultMessage: "This will modify all your settings"
        },
        iconRightButton: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
        isConfirmButtonLoading: isSubmittingForm,
        isOpen: showWarningSubmit,
        onToggleDialog: toggleWarningSubmit,
        onConfirm: handleConfirm,
        variantRightButton: "success-light"
      }
    )
  ] }) }) });
};
ConfigureTheView.propTypes = {
  config: PropTypes__default.default.shape({
    pageSize: PropTypes__default.default.number,
    sort: PropTypes__default.default.string
  }).isRequired
};
exports.default = ConfigureTheView;
//# sourceMappingURL=index-488d112b.js.map
