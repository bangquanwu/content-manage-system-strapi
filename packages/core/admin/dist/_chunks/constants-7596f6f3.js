"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const helperPlugin = require("@strapi/helper-plugin");
const Cookies = require("js-cookie");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const Cookies__default = /* @__PURE__ */ _interopDefault(Cookies);
const AuthResponse = () => {
  const match = reactRouterDom.useRouteMatch("/auth/login/:authResponse");
  const { formatMessage } = reactIntl.useIntl();
  const { push } = reactRouterDom.useHistory();
  const redirectToOops = React__namespace.useCallback(() => {
    push(
      `/auth/oops?info=${encodeURIComponent(
        formatMessage({
          id: "Auth.form.button.login.providers.error",
          defaultMessage: "We cannot connect you through the selected provider."
        })
      )}`
    );
  }, [push, formatMessage]);
  const { get } = helperPlugin.useFetchClient();
  const fetchUserInfo = React__namespace.useCallback(async () => {
    try {
      const jwtToken = Cookies__default.default.get("jwtToken");
      helperPlugin.auth.clearAppStorage();
      if (jwtToken) {
        helperPlugin.auth.setToken(jwtToken, true);
        const requestUrl = "/admin/users/me";
        const {
          data: { data }
        } = await get(requestUrl);
        helperPlugin.auth.setUserInfo(data, true);
        Cookies__default.default.remove("jwtToken");
        push("/auth/login");
      }
    } catch (e) {
      redirectToOops();
    }
  }, [get, push, redirectToOops]);
  React__namespace.useEffect(() => {
    if (match?.params.authResponse === "error") {
      redirectToOops();
    }
    if (match?.params.authResponse === "success") {
      fetchUserInfo();
    }
  }, [match, fetchUserInfo, redirectToOops]);
  return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {});
};
const ADMIN_PERMISSIONS_EE = {
  settings: {
    auditLogs: {
      main: [{ action: "admin::audit-logs.read", subject: null }],
      read: [{ action: "admin::audit-logs.read", subject: null }]
    },
    "review-workflows": {
      main: [{ action: "admin::review-workflows.read", subject: null }],
      create: [{ action: "admin::review-workflows.create", subject: null }],
      delete: [{ action: "admin::review-workflows.delete", subject: null }],
      update: [{ action: "admin::review-workflows.update", subject: null }]
    },
    sso: {
      main: [{ action: "admin::provider-login.read", subject: null }],
      read: [{ action: "admin::provider-login.read", subject: null }],
      update: [{ action: "admin::provider-login.update", subject: null }]
    }
  }
};
const ROUTES_EE = [
  {
    Component: () => ({ default: AuthResponse }),
    to: "/auth/login/:authResponse",
    exact: true
  }
];
const SETTINGS_LINKS_EE = () => ({
  global: [
    ...window.strapi.features.isEnabled(window.strapi.features.SSO) ? [
      {
        intlLabel: { id: "Settings.sso.title", defaultMessage: "Single Sign-On" },
        to: "/settings/single-sign-on",
        id: "sso"
      }
    ] : [],
    ...window.strapi.features.isEnabled(window.strapi.features.REVIEW_WORKFLOWS) ? [
      {
        intlLabel: {
          id: "Settings.review-workflows.page.title",
          defaultMessage: "Review Workflows"
        },
        to: "/settings/review-workflows",
        id: "review-workflows"
      }
    ] : []
  ],
  admin: [
    ...window.strapi.features.isEnabled(window.strapi.features.AUDIT_LOGS) ? [
      {
        intlLabel: { id: "global.auditLogs", defaultMessage: "Audit Logs" },
        to: "/settings/audit-logs?pageSize=50&page=1&sort=date:DESC",
        id: "auditLogs"
      }
    ] : []
  ]
});
exports.ADMIN_PERMISSIONS_EE = ADMIN_PERMISSIONS_EE;
exports.ROUTES_EE = ROUTES_EE;
exports.SETTINGS_LINKS_EE = SETTINGS_LINKS_EE;
//# sourceMappingURL=constants-7596f6f3.js.map
