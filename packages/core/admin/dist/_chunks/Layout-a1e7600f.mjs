import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Flex, Typography, Layout, Main, ContentLayout, HeaderLayout } from "@strapi/design-system";
import { pxToRem, Link, SettingsPageTitle } from "@strapi/helper-plugin";
import { CarretDown, ArrowLeft } from "@strapi/icons";
import { useIntl } from "react-intl";
import { D as DragLayer } from "./index-90ba4fba.mjs";
import { D as DRAG_DROP_TYPES } from "./constants-8092eeb5.mjs";
import styled from "styled-components";
const Toggle = styled(Flex)`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const StageDragPreview = ({ name }) => {
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      background: "primary100",
      borderStyle: "dashed",
      borderColor: "primary600",
      borderWidth: "1px",
      gap: 3,
      hasRadius: true,
      padding: 3,
      shadow: "tableShadow",
      width: pxToRem(300),
      children: [
        /* @__PURE__ */ jsx(
          Toggle,
          {
            alignItems: "center",
            background: "neutral200",
            borderRadius: "50%",
            height: 6,
            justifyContent: "center",
            width: 6,
            children: /* @__PURE__ */ jsx(CarretDown, { width: `${8 / 16}rem` })
          }
        ),
        /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: name })
      ]
    }
  );
};
const DragLayerRendered = () => {
  return /* @__PURE__ */ jsx(
    DragLayer,
    {
      renderItem: (item) => {
        if (item.type === DRAG_DROP_TYPES.STAGE) {
          return /* @__PURE__ */ jsx(StageDragPreview, { name: typeof item.item === "string" ? item.item : null });
        }
      }
    }
  );
};
const Root = ({ children }) => {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Main, { tabIndex: -1, children: /* @__PURE__ */ jsx(ContentLayout, { children }) }) });
};
const Back = ({ href }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Link, { startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: href, children: formatMessage({
    id: "global.back",
    defaultMessage: "Back"
  }) });
};
const Header = ({ title, subtitle, navigationAction, primaryAction }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SettingsPageTitle, { name: title }),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        navigationAction,
        primaryAction,
        title,
        subtitle
      }
    )
  ] });
};
export {
  Back as B,
  DragLayerRendered as D,
  Header as H,
  Root as R
};
//# sourceMappingURL=Layout-a1e7600f.mjs.map
