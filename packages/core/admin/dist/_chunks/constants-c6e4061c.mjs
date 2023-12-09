import { h as getTranslation } from "./index-5878762d.mjs";
import { S as STAGE_ATTRIBUTE_NAME, A as ASSIGNEE_ATTRIBUTE_NAME } from "./constants-a92ce583.mjs";
import "react/jsx-runtime";
import "@strapi/helper-plugin";
import "react-dom/client";
import "@strapi/design-system";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-router-dom";
import "react";
import "react-intl";
import "react-redux";
import "react-query";
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
const REVIEW_WORKFLOW_COLUMNS_EE = [
  {
    key: `__${STAGE_ATTRIBUTE_NAME}_temp_key__`,
    name: STAGE_ATTRIBUTE_NAME,
    fieldSchema: {
      type: "relation"
    },
    metadatas: {
      // formatMessage() will be applied when the column is rendered
      label: {
        id: getTranslation(`containers.ListPage.table-headers.reviewWorkflows.stage`),
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
    key: `__${ASSIGNEE_ATTRIBUTE_NAME}_temp_key__`,
    name: ASSIGNEE_ATTRIBUTE_NAME,
    fieldSchema: {
      type: "relation"
    },
    metadatas: {
      label: {
        id: getTranslation(`containers.ListPage.table-headers.reviewWorkflows.assignee`),
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
export {
  REVIEW_WORKFLOW_COLUMNS_EE
};
//# sourceMappingURL=constants-c6e4061c.mjs.map
