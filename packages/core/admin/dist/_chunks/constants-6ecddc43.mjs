import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { useFetchClient, auth, LoadingIndicatorPage } from "@strapi/helper-plugin";
import Cookies from "js-cookie";
import { useIntl } from "react-intl";
import { useRouteMatch, useHistory } from "react-router-dom";
const AuthResponse = () => {
  const match = useRouteMatch("/auth/login/:authResponse");
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const redirectToOops = React.useCallback(() => {
    push(
      `/auth/oops?info=${encodeURIComponent(
        formatMessage({
          id: "Auth.form.button.login.providers.error",
          defaultMessage: "We cannot connect you through the selected provider."
        })
      )}`
    );
  }, [push, formatMessage]);
  const { get } = useFetchClient();
  const fetchUserInfo = React.useCallback(async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      auth.clearAppStorage();
      if (jwtToken) {
        auth.setToken(jwtToken, true);
        const requestUrl = "/admin/users/me";
        const {
          data: { data }
        } = await get(requestUrl);
        auth.setUserInfo(data, true);
        Cookies.remove("jwtToken");
        push("/auth/login");
      }
    } catch (e) {
      redirectToOops();
    }
  }, [get, push, redirectToOops]);
  React.useEffect(() => {
    if (match?.params.authResponse === "error") {
      redirectToOops();
    }
    if (match?.params.authResponse === "success") {
      fetchUserInfo();
    }
  }, [match, fetchUserInfo, redirectToOops]);
  return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
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
export {
  ADMIN_PERMISSIONS_EE,
  ROUTES_EE,
  SETTINGS_LINKS_EE
};
//# sourceMappingURL=constants-6ecddc43.mjs.map
