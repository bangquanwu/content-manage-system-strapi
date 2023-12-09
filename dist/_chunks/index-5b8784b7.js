"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const PropTypes = require("prop-types");
const constants = require("./constants-85da8cc4.js");
const colors = require("./colors-c17c9c3c.js");
const reactIntl = require("react-intl");
const index = require("./index-af49f8af.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-router-dom");
require("react");
require("react-redux");
require("react-query");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("@strapi/icons");
require("formik");
require("lodash/camelCase");
require("styled-components");
require("yup");
require("lodash/defaultsDeep");
require("lodash/omit");
require("qs");
require("immer");
require("lodash/get");
require("lodash/set");
require("@reduxjs/toolkit");
require("react-dnd");
require("react-dnd-html5-backend");
require("react-window");
require("react-error-boundary");
require("lodash/cloneDeep");
require("lodash/isEqual");
require("lodash/upperFirst");
require("axios");
require("lodash/size");
require("lodash/isNaN");
require("lodash/take");
require("slate");
require("slate-history");
require("slate-react");
require("@radix-ui/react-toolbar");
require("codemirror5");
require("sanitize-html");
require("highlight.js");
require("markdown-it");
require("markdown-it-abbr");
require("markdown-it-container");
require("markdown-it-deflist");
require("markdown-it-emoji");
require("markdown-it-footnote");
require("markdown-it-ins");
require("markdown-it-mark");
require("markdown-it-sub");
require("markdown-it-sup");
require("codemirror5/addon/display/placeholder");
require("lodash/toString");
require("lodash/isEmpty");
require("react-dom");
require("lodash/isBoolean");
require("lodash/toNumber");
require("fractional-indexing");
require("lodash/uniqBy");
require("lodash/unset");
require("lodash/isArray");
require("date-fns/parseISO");
require("lodash/isNumber");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
function ReviewWorkflowsStageEE({ color, name }) {
  const { themeColorName } = colors.getStageColorByHex(color);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", gap: 2, maxWidth: helperPlugin.pxToRem(300), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        height: 2,
        background: color,
        borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
        hasRadius: true,
        shrink: 0,
        width: 2
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "regular", textColor: "neutral700", ellipsis: true, children: name })
  ] });
}
ReviewWorkflowsStageEE.defaultProps = {
  color: constants.STAGE_COLOR_DEFAULT
};
ReviewWorkflowsStageEE.propTypes = {
  color: PropTypes__default.default.string,
  name: PropTypes__default.default.string.isRequired
};
function ReviewWorkflowsAssigneeEE({ user }) {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: index.getDisplayName(user, formatMessage) });
}
ReviewWorkflowsAssigneeEE.propTypes = {
  user: PropTypes__default.default.shape({
    firstname: PropTypes__default.default.string,
    lastname: PropTypes__default.default.string,
    username: PropTypes__default.default.string
  }).isRequired
};
exports.ReviewWorkflowsAssigneeEE = ReviewWorkflowsAssigneeEE;
exports.ReviewWorkflowsStageEE = ReviewWorkflowsStageEE;
//# sourceMappingURL=index-5b8784b7.js.map
