"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const styled = require("styled-components");
const index = require("./index-be8080e3.js");
const SSOProviders = require("./SSOProviders-b395a4e6.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-router-dom");
require("react");
require("react-redux");
require("@radix-ui/react-context");
require("@strapi/design-system/v2");
require("@strapi/icons");
require("formik");
require("lodash/camelCase");
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
require("prop-types");
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
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const DividerFull = styled__default.default(designSystem.Divider)`
  flex: 1;
`;
const LoginEE = (loginProps) => {
  const { formatMessage } = reactIntl.useIntl();
  const { get } = helperPlugin.useFetchClient();
  const { isLoading, data: providers = [] } = reactQuery.useQuery(
    ["ee", "providers"],
    async () => {
      const { data } = await get("/admin/providers");
      return data;
    },
    {
      enabled: window.strapi.features.isEnabled(window.strapi.features.SSO)
    }
  );
  if (!window.strapi.features.isEnabled(window.strapi.features.SSO) || !isLoading && providers.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(index.Login, { ...loginProps });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(index.Login, { ...loginProps, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 7, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(DividerFull, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "Auth.login.sso.divider" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(DividerFull, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(SSOProviders.SSOProviders, { providers, displayAllProviders: false })
  ] }) }) });
};
exports.LoginEE = LoginEE;
//# sourceMappingURL=Login-0fefba0d.js.map
