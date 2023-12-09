"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index-be8080e3.js");
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const PropTypes = require("prop-types");
const reactIntl = require("react-intl");
const useReviewWorkflows = require("./useReviewWorkflows-26f7e558.js");
const colors = require("./colors-c17c9c3c.js");
require("@strapi/helper-plugin");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-helmet");
require("react-router-dom");
require("react");
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
require("./constants-85da8cc4.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const AssigneeFilter = ({ value, onChange }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { users, isLoading } = index.useAdminUsers();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Combobox,
    {
      value,
      "aria-label": formatMessage({
        id: "content-manager.components.Filters.usersSelect.label",
        defaultMessage: "Search and select an user to filter"
      }),
      onChange,
      loading: isLoading,
      children: users.map((user) => {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: user.id.toString(), children: index.getDisplayName(user, formatMessage) }, user.id);
      })
    }
  );
};
AssigneeFilter.propTypes = {
  onChange: PropTypes__default.default.func.isRequired,
  value: PropTypes__default.default.string
};
AssigneeFilter.defaultProps = {
  value: ""
};
const StageFilter = ({ value, onChange, uid }) => {
  const { formatMessage } = reactIntl.useIntl();
  const {
    workflows: [workflow],
    isLoading
  } = useReviewWorkflows.useReviewWorkflows({ filters: { contentTypes: uid } });
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.SingleSelect,
    {
      "aria-label": formatMessage({
        id: "content-manager.components.Filters.reviewWorkflows.label",
        defaultMessage: "Search and select an workflow stage to filter"
      }),
      value,
      onChange,
      loading: isLoading,
      customizeContent: () => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { as: "span", justifyContent: "space-between", alignItems: "center", width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", ellipsis: true, children: value }),
        isLoading ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { small: true, style: { display: "flex" } }) : null
      ] }),
      children: (workflow?.stages ?? []).map(({ id, color, name }) => {
        const { themeColorName } = colors.getStageColorByHex(color);
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.SingleSelectOption,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Flex,
              {
                height: 2,
                background: color,
                borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
                hasRadius: true,
                shrink: 0,
                width: 2
              }
            ),
            value: name,
            children: name
          },
          id
        );
      })
    }
  );
};
StageFilter.defaultProps = {
  value: ""
};
StageFilter.propTypes = {
  onChange: PropTypes__default.default.func.isRequired,
  uid: PropTypes__default.default.string.isRequired,
  value: PropTypes__default.default.string
};
const REVIEW_WORKFLOW_FILTERS = [
  {
    fieldSchema: {
      type: "relation",
      mainField: {
        name: "name",
        schema: {
          type: "string"
        }
      }
    },
    metadatas: {
      customInput: StageFilter,
      label: {
        id: index.getTranslation(`containers.ListPage.table-headers.reviewWorkflows.stage`),
        defaultMessage: "Review stage"
      }
    },
    name: "strapi_stage"
  },
  {
    fieldSchema: {
      type: "relation",
      mainField: {
        name: "id",
        schema: {
          type: "int"
        }
      }
    },
    metadatas: {
      customInput: AssigneeFilter,
      customOperators: [
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$eq",
            defaultMessage: "is"
          },
          value: "$eq"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$ne",
            defaultMessage: "is not"
          },
          value: "$ne"
        }
      ],
      label: {
        id: index.getTranslation(`containers.ListPage.table-headers.reviewWorkflows.assignee.label`),
        defaultMessage: "Assignee"
      }
    },
    name: "strapi_assignee"
  }
];
exports.REVIEW_WORKFLOW_FILTERS = REVIEW_WORKFLOW_FILTERS;
//# sourceMappingURL=constants-be82a4ce.js.map
