import { jsxs, jsx } from "react/jsx-runtime";
import { Flex, Box, Typography } from "@strapi/design-system";
import { pxToRem } from "@strapi/helper-plugin";
import PropTypes from "prop-types";
import { b as STAGE_COLOR_DEFAULT } from "./constants-8092eeb5.mjs";
import { g as getStageColorByHex } from "./colors-bda951e9.mjs";
import { useIntl } from "react-intl";
import { g as getDisplayName } from "./index-90ba4fba.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-router-dom";
import "react";
import "react-redux";
import "react-query";
import "@radix-ui/react-context";
import "@strapi/design-system/v2";
import "@strapi/icons";
import "formik";
import "lodash/camelCase";
import "styled-components";
import "yup";
import "lodash/defaultsDeep";
import "lodash/omit";
import "qs";
import "immer";
import "lodash/get";
import "lodash/set";
import "@reduxjs/toolkit";
import "react-dnd";
import "react-dnd-html5-backend";
import "react-window";
import "react-error-boundary";
import "lodash/cloneDeep";
import "lodash/isEqual";
import "lodash/upperFirst";
import "axios";
import "lodash/size";
import "lodash/isNaN";
import "lodash/take";
import "slate";
import "slate-history";
import "slate-react";
import "@radix-ui/react-toolbar";
import "codemirror5";
import "sanitize-html";
import "highlight.js";
import "markdown-it";
import "markdown-it-abbr";
import "markdown-it-container";
import "markdown-it-deflist";
import "markdown-it-emoji";
import "markdown-it-footnote";
import "markdown-it-ins";
import "markdown-it-mark";
import "markdown-it-sub";
import "markdown-it-sup";
import "codemirror5/addon/display/placeholder";
import "lodash/toString";
import "lodash/isEmpty";
import "react-dom";
import "lodash/isBoolean";
import "lodash/toNumber";
import "fractional-indexing";
import "lodash/uniqBy";
import "lodash/unset";
import "lodash/isArray";
import "date-fns/parseISO";
import "lodash/isNumber";
function ReviewWorkflowsStageEE({ color, name }) {
  const { themeColorName } = getStageColorByHex(color);
  return /* @__PURE__ */ jsxs(Flex, { alignItems: "center", gap: 2, maxWidth: pxToRem(300), children: [
    /* @__PURE__ */ jsx(
      Box,
      {
        height: 2,
        background: color,
        borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
        hasRadius: true,
        shrink: 0,
        width: 2
      }
    ),
    /* @__PURE__ */ jsx(Typography, { fontWeight: "regular", textColor: "neutral700", ellipsis: true, children: name })
  ] });
}
ReviewWorkflowsStageEE.defaultProps = {
  color: STAGE_COLOR_DEFAULT
};
ReviewWorkflowsStageEE.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired
};
function ReviewWorkflowsAssigneeEE({ user }) {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: getDisplayName(user, formatMessage) });
}
ReviewWorkflowsAssigneeEE.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string
  }).isRequired
};
export {
  ReviewWorkflowsAssigneeEE,
  ReviewWorkflowsStageEE
};
//# sourceMappingURL=index-5800e73f.mjs.map
