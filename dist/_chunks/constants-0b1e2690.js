"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index-be8080e3.js");
const constants = require("./constants-d5d67ca8.js");
require("react/jsx-runtime");
require("@strapi/helper-plugin");
require("react-dom/client");
require("@strapi/design-system");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-router-dom");
require("react");
require("react-intl");
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
const REVIEW_WORKFLOW_COLUMNS_EE = [
  {
    key: `__${constants.STAGE_ATTRIBUTE_NAME}_temp_key__`,
    name: constants.STAGE_ATTRIBUTE_NAME,
    fieldSchema: {
      type: "relation"
    },
    metadatas: {
      // formatMessage() will be applied when the column is rendered
      label: {
        id: index.getTranslation(`containers.ListPage.table-headers.reviewWorkflows.stage`),
        defaultMessage: "Review stage"
      },
      searchable: false,
      sortable: true,
      mainField: {
        name: "name",
        schema: {
          type: "string"
        }
      }
    }
  },
  {
    key: `__${constants.ASSIGNEE_ATTRIBUTE_NAME}_temp_key__`,
    name: constants.ASSIGNEE_ATTRIBUTE_NAME,
    fieldSchema: {
      type: "relation"
    },
    metadatas: {
      label: {
        id: index.getTranslation(`containers.ListPage.table-headers.reviewWorkflows.assignee`),
        defaultMessage: "Assignee"
      },
      searchable: false,
      sortable: true,
      mainField: {
        name: "firstname",
        schema: {
          type: "string"
        }
      }
    }
  }
];
exports.REVIEW_WORKFLOW_COLUMNS_EE = REVIEW_WORKFLOW_COLUMNS_EE;
//# sourceMappingURL=constants-0b1e2690.js.map
