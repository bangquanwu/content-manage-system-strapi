"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const v2 = require("@strapi/design-system/v2");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const reactRedux = require("react-redux");
const index = require("./index-be8080e3.js");
const useLicenseLimits = require("./useLicenseLimits-e60a01b1.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-router-dom");
require("react");
require("react-query");
require("@radix-ui/react-context");
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
const BILLING_STRAPI_CLOUD_URL = "https://cloud.strapi.io/profile/billing";
const BILLING_SELF_HOSTED_URL = "https://strapi.io/billing/request-seats";
const AdminSeatInfoEE = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { settings } = reactRedux.useSelector(index.selectAdminPermissions);
  const {
    isLoading: isRBACLoading,
    allowedActions: { canRead, canCreate, canUpdate, canDelete }
  } = helperPlugin.useRBAC(settings?.users ?? {});
  const {
    license,
    isError,
    isLoading: isLicenseLoading
  } = useLicenseLimits.useLicenseLimits({
    // TODO: this creates a waterfall which we should avoid to render earlier, but for that
    // we will have to move away from data-fetching hooks to query functions.
    // Short-term we could at least implement a loader, for the user to have visual feedback
    // in case the requests take a while
    enabled: !isRBACLoading && canRead && canCreate && canUpdate && canDelete
  });
  const isLoading = isRBACLoading || isLicenseLoading;
  if (isError || isLoading || !license) {
    return null;
  }
  const { licenseLimitStatus, enforcementUserCount, permittedSeats, isHostedOnStrapiCloud } = license;
  if (!permittedSeats) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.GridItem, { col: 6, s: 12, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
      id: "Settings.application.admin-seats",
      defaultMessage: "Admin seats"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { as: "p", children: formatMessage(
        {
          id: "Settings.application.ee.admin-seats.count",
          defaultMessage: "<text>{enforcementUserCount}</text>/{permittedSeats}"
        },
        {
          permittedSeats,
          enforcementUserCount,
          text: (chunks) => /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Typography,
            {
              fontWeight: "semiBold",
              textColor: enforcementUserCount > permittedSeats ? "danger500" : void 0,
              children: chunks
            }
          )
        }
      ) }) }),
      licenseLimitStatus === "OVER_LIMIT" && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Tooltip,
        {
          description: formatMessage({
            id: "Settings.application.ee.admin-seats.at-limit-tooltip",
            defaultMessage: "At limit: add seats to invite more users"
          }),
          children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Icon,
            {
              width: helperPlugin.pxToRem(14),
              height: helperPlugin.pxToRem(14),
              color: "danger500",
              as: Icons.ExclamationMarkCircle
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      v2.Link,
      {
        href: isHostedOnStrapiCloud ? BILLING_STRAPI_CLOUD_URL : BILLING_SELF_HOSTED_URL,
        isExternal: true,
        endIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ExternalLink, {}),
        children: formatMessage(
          {
            id: "Settings.application.ee.admin-seats.add-seats",
            defaultMessage: "{isHostedOnStrapiCloud, select, true {Add seats} other {Contact sales}}"
          },
          { isHostedOnStrapiCloud }
        )
      }
    )
  ] });
};
exports.AdminSeatInfoEE = AdminSeatInfoEE;
//# sourceMappingURL=AdminSeatInfo-d87c3c8c.js.map
