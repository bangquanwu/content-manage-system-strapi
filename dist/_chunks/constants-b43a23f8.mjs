import { jsx, jsxs } from "react/jsx-runtime";
import { Divider, Main, Box, Typography, Flex, Loader, Button } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
import { useFetchClient } from "@strapi/helper-plugin";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { useHistory, Redirect, NavLink } from "react-router-dom";
import styled from "styled-components";
import { U as UnauthenticatedLayout, d as LayoutContent, C as Column, e as Logo } from "./index-90ba4fba.mjs";
import { S as SSOProviders } from "./SSOProviders-62bfad92.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react";
import "react-redux";
import "@radix-ui/react-context";
import "@strapi/icons";
import "formik";
import "lodash/camelCase";
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
import "prop-types";
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
const Providers = () => {
  const { push } = useHistory();
  const { formatMessage } = useIntl();
  const { get } = useFetchClient();
  const { isLoading, data: providers = [] } = useQuery(
    ["ee", "providers"],
    async () => {
      const { data } = await get("/admin/providers");
      return data;
    },
    {
      enabled: window.strapi.features.isEnabled(window.strapi.features.SSO)
    }
  );
  const handleClick = () => {
    push("/auth/login");
  };
  if (!window.strapi.features.isEnabled(window.strapi.features.SSO) || !isLoading && providers.length === 0) {
    return /* @__PURE__ */ jsx(Redirect, { to: "/auth/login" });
  }
  return /* @__PURE__ */ jsx(UnauthenticatedLayout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsxs(LayoutContent, { children: [
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(Logo, {}),
        /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 1, children: /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", children: formatMessage({ id: "Auth.form.welcome.title" }) }) }),
        /* @__PURE__ */ jsx(Box, { paddingBottom: 7, children: /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage({ id: "Auth.login.sso.subtitle" }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
        isLoading ? /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({ id: "Auth.login.sso.loading" }) }) }) : /* @__PURE__ */ jsx(SSOProviders, { providers }),
        /* @__PURE__ */ jsxs(Flex, { children: [
          /* @__PURE__ */ jsx(DividerFull, {}),
          /* @__PURE__ */ jsx(Box, { paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "or" }) }) }),
          /* @__PURE__ */ jsx(DividerFull, {})
        ] }),
        /* @__PURE__ */ jsx(Button, { fullWidth: true, size: "L", onClick: handleClick, children: formatMessage({ id: "Auth.form.button.login.strapi" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Link, { as: NavLink, to: "/auth/forgot-password", children: /* @__PURE__ */ jsx(Typography, { variant: "pi", children: formatMessage({ id: "Auth.link.forgot-password" }) }) }) }) })
  ] }) });
};
const DividerFull = styled(Divider)`
  flex: 1;
`;
const FORMS = {
  providers: Providers
};
export {
  FORMS
};
//# sourceMappingURL=constants-b43a23f8.mjs.map
