import { jsxs, jsx } from "react/jsx-runtime";
import { GridItem, Typography, Flex, Tooltip, Icon } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
import { useRBAC, pxToRem } from "@strapi/helper-plugin";
import { ExclamationMarkCircle, ExternalLink } from "@strapi/icons";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import { u as useLicenseLimits } from "./useLicenseLimits-497c0f5f.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-router-dom";
import "react";
import "react-query";
import "@radix-ui/react-context";
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
const BILLING_STRAPI_CLOUD_URL = "https://cloud.strapi.io/profile/billing";
const BILLING_SELF_HOSTED_URL = "https://strapi.io/billing/request-seats";
const AdminSeatInfoEE = () => {
  const { formatMessage } = useIntl();
  const { settings } = useSelector(selectAdminPermissions);
  const {
    isLoading: isRBACLoading,
    allowedActions: { canRead, canCreate, canUpdate, canDelete }
  } = useRBAC(settings?.users ?? {});
  const {
    license,
    isError,
    isLoading: isLicenseLoading
  } = useLicenseLimits({
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
  return /* @__PURE__ */ jsxs(GridItem, { col: 6, s: 12, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
      id: "Settings.application.admin-seats",
      defaultMessage: "Admin seats"
    }) }),
    /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Typography, { as: "p", children: formatMessage(
        {
          id: "Settings.application.ee.admin-seats.count",
          defaultMessage: "<text>{enforcementUserCount}</text>/{permittedSeats}"
        },
        {
          permittedSeats,
          enforcementUserCount,
          text: (chunks) => /* @__PURE__ */ jsx(
            Typography,
            {
              fontWeight: "semiBold",
              textColor: enforcementUserCount > permittedSeats ? "danger500" : void 0,
              children: chunks
            }
          )
        }
      ) }) }),
      licenseLimitStatus === "OVER_LIMIT" && /* @__PURE__ */ jsx(
        Tooltip,
        {
          description: formatMessage({
            id: "Settings.application.ee.admin-seats.at-limit-tooltip",
            defaultMessage: "At limit: add seats to invite more users"
          }),
          children: /* @__PURE__ */ jsx(
            Icon,
            {
              width: pxToRem(14),
              height: pxToRem(14),
              color: "danger500",
              as: ExclamationMarkCircle
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: isHostedOnStrapiCloud ? BILLING_STRAPI_CLOUD_URL : BILLING_SELF_HOSTED_URL,
        isExternal: true,
        endIcon: /* @__PURE__ */ jsx(ExternalLink, {}),
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
export {
  AdminSeatInfoEE
};
//# sourceMappingURL=AdminSeatInfo-10ada68d.mjs.map
