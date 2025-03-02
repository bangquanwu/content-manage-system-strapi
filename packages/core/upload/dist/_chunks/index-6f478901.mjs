import { jsxs, jsx } from "react/jsx-runtime";
import React__default, { useReducer } from "react";
import { Main, HeaderLayout, Button, ContentLayout, Layout, Flex, Box, Typography, Grid, GridItem, ToggleInput } from "@strapi/design-system";
import { useOverlayBlocker, useNotification, useFetchClient, useFocusWhenNavigate, LoadingIndicatorPage, CheckPagePermissions } from "@strapi/helper-plugin";
import { Check } from "@strapi/icons";
import isEqual from "lodash/isEqual";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { useQuery, useMutation } from "react-query";
import { g as getTrad, P as PERMISSIONS } from "./index-43dc04cc.mjs";
import "byte-size";
import "date-fns";
import "qs";
import produce from "immer";
import set from "lodash/set";
import "prop-types";
import "styled-components";
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
  produce(state, (drafState) => {
    switch (action.type) {
      case "GET_DATA_SUCCEEDED": {
        drafState.initialData = action.data;
        drafState.modifiedData = action.data;
        break;
      }
      case "ON_CHANGE": {
        set(drafState, ["modifiedData", ...action.keys.split(".")], action.value);
        break;
      }
      default:
        return state;
    }
  })
);
const SettingsPage = () => {
  const { formatMessage } = useIntl();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const toggleNotification = useNotification();
  const { get, put } = useFetchClient();
  useFocusWhenNavigate();
  const [{ initialData, modifiedData }, dispatch] = useReducer(reducer, initialState, init);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["upload", "settings"],
    async queryFn() {
      const {
        data: { data: data2 }
      } = await get("/upload/settings");
      return data2;
    }
  });
  React__default.useEffect(() => {
    if (data) {
      dispatch({
        type: "GET_DATA_SUCCEEDED",
        data
      });
    }
  }, [data]);
  const isSaveButtonDisabled = isEqual(initialData, modifiedData);
  const { mutateAsync, isLoading: isSubmiting } = useMutation({
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
  return /* @__PURE__ */ jsxs(Main, { tabIndex: -1, children: [
    /* @__PURE__ */ jsx(
      Helmet,
      {
        title: formatMessage({
          id: getTrad("page.title"),
          defaultMessage: "Settings - Media Libray"
        })
      }
    ),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title: formatMessage({
            id: getTrad("settings.header.label"),
            defaultMessage: "Media Library"
          }),
          primaryAction: /* @__PURE__ */ jsx(
            Button,
            {
              disabled: isSaveButtonDisabled,
              loading: isSubmiting,
              type: "submit",
              startIcon: /* @__PURE__ */ jsx(Check, {}),
              size: "S",
              children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              })
            }
          ),
          subtitle: formatMessage({
            id: getTrad("settings.sub-header.label"),
            defaultMessage: "Configure the settings for the Media Library"
          })
        }
      ),
      /* @__PURE__ */ jsx(ContentLayout, { children: isLoading ? /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) : /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 12, children: /* @__PURE__ */ jsx(Box, { background: "neutral0", padding: 6, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
        /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h2", children: formatMessage({
          id: getTrad("settings.blockTitle"),
          defaultMessage: "Asset management"
        }) }) }),
        /* @__PURE__ */ jsxs(Grid, { gap: 6, children: [
          /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
            ToggleInput,
            {
              "aria-label": "responsiveDimensions",
              checked: modifiedData.responsiveDimensions,
              hint: formatMessage({
                id: getTrad("settings.form.responsiveDimensions.description"),
                defaultMessage: "Enabling this option will generate multiple formats (small, medium and large) of the uploaded asset."
              }),
              label: formatMessage({
                id: getTrad("settings.form.responsiveDimensions.label"),
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
          /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
            ToggleInput,
            {
              "aria-label": "sizeOptimization",
              checked: modifiedData.sizeOptimization,
              hint: formatMessage({
                id: getTrad("settings.form.sizeOptimization.description"),
                defaultMessage: "Enabling this option will reduce the image size and slightly reduce its quality."
              }),
              label: formatMessage({
                id: getTrad("settings.form.sizeOptimization.label"),
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
          /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
            ToggleInput,
            {
              "aria-label": "autoOrientation",
              checked: modifiedData.autoOrientation,
              hint: formatMessage({
                id: getTrad("settings.form.autoOrientation.description"),
                defaultMessage: "Enabling this option will automatically rotate the image according to EXIF orientation tag."
              }),
              label: formatMessage({
                id: getTrad("settings.form.autoOrientation.label"),
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
const ProtectedSettingsPage = () => /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: PERMISSIONS.settings, children: /* @__PURE__ */ jsx(SettingsPage, {}) });
export {
  SettingsPage,
  ProtectedSettingsPage as default
};
//# sourceMappingURL=index-6f478901.mjs.map
