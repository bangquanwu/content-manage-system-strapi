import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useReducer } from "react";
import { Box, Grid, GridItem, Select, Option, Layout, Main, HeaderLayout, Button, ContentLayout } from "@strapi/design-system";
import { useTracking, useNotification, useFocusWhenNavigate, Link, ConfirmDialog } from "@strapi/helper-plugin";
import { ArrowLeft, Check } from "@strapi/icons";
import isEqual from "lodash/isEqual";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { g as getTrad, C as pageSizes, D as sortOptions, p as pluginId, z as useConfig } from "./index-43dc04cc.mjs";
import produce from "immer";
import get from "lodash/get";
import set from "lodash/set";
import "styled-components";
import "byte-size";
import "date-fns";
import "qs";
import "react-query";
import "formik";
import "yup";
import "axios";
import "react-select";
import "cropperjs";
import "@strapi/design-system/v2";
import "cropperjs/dist/cropper.css";
import "lodash/isEmpty";
import "react-dnd";
import "react-router-dom";
import "date-fns/parseISO";
const Settings = ({ sort = "", pageSize = 10, onChange: onChange2 }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "tableShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
        /* @__PURE__ */ jsx(GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsx(
          Select,
          {
            label: formatMessage({
              id: getTrad("config.entries.title"),
              defaultMessage: "Entries per page"
            }),
            hint: formatMessage({
              id: getTrad("config.entries.note"),
              defaultMessage: "Number of assets displayed by default in the Media Library"
            }),
            onChange: (value) => onChange2({ target: { name: "pageSize", value } }),
            name: "pageSize",
            value: pageSize,
            children: pageSizes.map((pageSize2) => /* @__PURE__ */ jsx(Option, { value: pageSize2, children: pageSize2 }, pageSize2))
          }
        ) }),
        /* @__PURE__ */ jsx(GridItem, { s: 12, col: 6, children: /* @__PURE__ */ jsx(
          Select,
          {
            label: formatMessage({
              id: getTrad("config.sort.title"),
              defaultMessage: "Default sort order"
            }),
            hint: formatMessage({
              id: getTrad("config.note"),
              defaultMessage: "Note: You can override this value in the media library."
            }),
            onChange: (value) => onChange2({ target: { name: "sort", value } }),
            name: "sort",
            value: sort,
            "test-sort": sort,
            "data-testid": "sort-select",
            children: sortOptions.map((filter) => /* @__PURE__ */ jsx(
              Option,
              {
                "data-testid": `sort-option-${filter.value}`,
                value: filter.value,
                children: formatMessage({ id: getTrad(filter.key), defaultMessage: `${filter.value}` })
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
  sort: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
const ON_CHANGE = `${pluginId}/ON_CHANGE`;
const SET_LOADED = `${pluginId}/SET_LOADED`;
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
  produce(state, (draftState) => {
    switch (action.type) {
      case ON_CHANGE: {
        set(draftState, ["modifiedData", ...action.keys.split(".")], action.value);
        break;
      }
      case SET_LOADED: {
        const reInitialise = init(get(draftState, ["modifiedData"], {}));
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
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const { mutateConfig } = useConfig();
  const { isLoading: isSubmittingForm } = mutateConfig;
  const [showWarningSubmit, setWarningSubmit] = useState(false);
  const toggleWarningSubmit = () => setWarningSubmit((prevState) => !prevState);
  const [reducerState, dispatch] = useReducer(reducer, initialState, () => init(config));
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
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Main, { "aria-busy": isSubmittingForm, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        navigationAction: /* @__PURE__ */ jsx(Link, { startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: `/plugins/${pluginId}`, id: "go-back", children: formatMessage({ id: getTrad("config.back"), defaultMessage: "Back" }) }),
        primaryAction: /* @__PURE__ */ jsx(
          Button,
          {
            size: "S",
            startIcon: /* @__PURE__ */ jsx(Check, {}),
            disabled: isEqual(modifiedData, initialData),
            type: "submit",
            children: formatMessage({ id: "global.save", defaultMessage: "Save" })
          }
        ),
        subtitle: formatMessage({
          id: getTrad("config.subtitle"),
          defaultMessage: "Define the view settings of the media library."
        }),
        title: formatMessage({
          id: getTrad("config.title"),
          defaultMessage: "Configure the view - Media Library"
        })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(
      Settings,
      {
        "data-testid": "settings",
        pageSize: modifiedData.pageSize || "",
        sort: modifiedData.sort || "",
        onChange: handleChange
      }
    ) }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        bodyText: {
          id: getTrad("config.popUpWarning.warning.updateAllSettings"),
          defaultMessage: "This will modify all your settings"
        },
        iconRightButton: /* @__PURE__ */ jsx(Check, {}),
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
  config: PropTypes.shape({
    pageSize: PropTypes.number,
    sort: PropTypes.string
  }).isRequired
};
export {
  ConfigureTheView as default
};
//# sourceMappingURL=index-bdf561a3.mjs.map
