"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const EditPage = require("./EditPage-11674462.js");
require("react");
require("@strapi/design-system");
require("@strapi/helper-plugin");
require("react-query");
require("react-router-dom");
require("./index-be8080e3.js");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-intl");
require("react-redux");
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
require("./useContentTypes-7da293cc.js");
const events = {
  "review-workflows": ["review-workflows.updateEntryStage"]
};
const getHeaders = () => {
  return [{ id: "review-workflows.updateEntryStage", defaultMessage: "Stage Change" }];
};
const EventsTableEE = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(EditPage.Events.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(EditPage.Events.Headers, {}),
    /* @__PURE__ */ jsxRuntime.jsx(EditPage.Events.Body, {}),
    /* @__PURE__ */ jsxRuntime.jsx(EditPage.Events.Headers, { getHeaders }),
    /* @__PURE__ */ jsxRuntime.jsx(EditPage.Events.Body, { providedEvents: events })
  ] });
};
exports.EventsTableEE = EventsTableEE;
//# sourceMappingURL=EventsTable-7c4b60a7.js.map
