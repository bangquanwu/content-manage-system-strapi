import { jsxs, jsx } from "react/jsx-runtime";
import { a as Events } from "./EditPage-d64d3bd7.mjs";
import "react";
import "@strapi/design-system";
import "@strapi/helper-plugin";
import "react-query";
import "react-router-dom";
import "./index-90ba4fba.mjs";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-intl";
import "react-redux";
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
import "./useContentTypes-53b449bb.mjs";
const events = {
  "review-workflows": ["review-workflows.updateEntryStage"]
};
const getHeaders = () => {
  return [{ id: "review-workflows.updateEntryStage", defaultMessage: "Stage Change" }];
};
const EventsTableEE = () => {
  return /* @__PURE__ */ jsxs(Events.Root, { children: [
    /* @__PURE__ */ jsx(Events.Headers, {}),
    /* @__PURE__ */ jsx(Events.Body, {}),
    /* @__PURE__ */ jsx(Events.Headers, { getHeaders }),
    /* @__PURE__ */ jsx(Events.Body, { providedEvents: events })
  ] });
};
export {
  EventsTableEE
};
//# sourceMappingURL=EventsTable-0e19c5c4.mjs.map
