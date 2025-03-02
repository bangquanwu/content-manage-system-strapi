"use strict";
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const index = require("./index-be8080e3.js");
const constants = require("./constants-85da8cc4.js");
const styled = require("styled-components");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const Toggle = styled__default.default(designSystem.Flex)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const StageDragPreview = ({ name }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      background: "primary100",
      borderStyle: "dashed",
      borderColor: "primary600",
      borderWidth: "1px",
      gap: 3,
      hasRadius: true,
      padding: 3,
      shadow: "tableShadow",
      width: helperPlugin.pxToRem(300),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Toggle,
          {
            alignItems: "center",
            background: "neutral200",
            borderRadius: "50%",
            height: 6,
            justifyContent: "center",
            width: 6,
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.CarretDown, { width: `${8 / 16}rem` })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children: name })
      ]
    }
  );
};
const DragLayerRendered = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.DragLayer,
    {
      renderItem: (item) => {
        if (item.type === constants.DRAG_DROP_TYPES.STAGE) {
          return /* @__PURE__ */ jsxRuntime.jsx(StageDragPreview, { name: typeof item.item === "string" ? item.item : null });
        }
      }
    }
  );
};
const Root = ({ children }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Layout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { tabIndex: -1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children }) }) });
};
const Back = ({ href }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.Link, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowLeft, {}), to: href, children: formatMessage({
    id: "global.back",
    defaultMessage: "Back"
  }) });
};
const Header = ({ title, subtitle, navigationAction, primaryAction }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.SettingsPageTitle, { name: title }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        navigationAction,
        primaryAction,
        title,
        subtitle
      }
    )
  ] });
};
exports.Back = Back;
exports.DragLayerRendered = DragLayerRendered;
exports.Header = Header;
exports.Root = Root;
//# sourceMappingURL=Layout-a88f34e2.js.map
