import { f as useAdminUsers, g as getDisplayName, h as getTranslation } from "./index-90ba4fba.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
import { Combobox, ComboboxOption, SingleSelect, Flex, Typography, Loader, SingleSelectOption } from "@strapi/design-system";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { u as useReviewWorkflows } from "./useReviewWorkflows-3e0bcb69.mjs";
import { g as getStageColorByHex } from "./colors-bda951e9.mjs";
import "@strapi/helper-plugin";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-helmet";
import "react-router-dom";
import "react";
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
import "./constants-8092eeb5.mjs";
const AssigneeFilter = ({ value, onChange }) => {
  const { formatMessage } = useIntl();
  const { users, isLoading } = useAdminUsers();
  return /* @__PURE__ */ jsx(
    Combobox,
    {
      value,
      "aria-label": formatMessage({
        id: "content-manager.components.Filters.usersSelect.label",
        defaultMessage: "Search and select an user to filter"
      }),
      onChange,
      loading: isLoading,
      children: users.map((user) => {
        return /* @__PURE__ */ jsx(ComboboxOption, { value: user.id.toString(), children: getDisplayName(user, formatMessage) }, user.id);
      })
    }
  );
};
AssigneeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};
AssigneeFilter.defaultProps = {
  value: ""
};
const StageFilter = ({ value, onChange, uid }) => {
  const { formatMessage } = useIntl();
  const {
    workflows: [workflow],
    isLoading
  } = useReviewWorkflows({ filters: { contentTypes: uid } });
  return /* @__PURE__ */ jsx(
    SingleSelect,
    {
      "aria-label": formatMessage({
        id: "content-manager.components.Filters.reviewWorkflows.label",
        defaultMessage: "Search and select an workflow stage to filter"
      }),
      value,
      onChange,
      loading: isLoading,
      customizeContent: () => /* @__PURE__ */ jsxs(Flex, { as: "span", justifyContent: "space-between", alignItems: "center", width: "100%", children: [
        /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", ellipsis: true, children: value }),
        isLoading ? /* @__PURE__ */ jsx(Loader, { small: true, style: { display: "flex" } }) : null
      ] }),
      children: (workflow?.stages ?? []).map(({ id, color, name }) => {
        const { themeColorName } = getStageColorByHex(color);
        return /* @__PURE__ */ jsx(
          SingleSelectOption,
          {
            startIcon: /* @__PURE__ */ jsx(
              Flex,
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
  onChange: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  value: PropTypes.string
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
        id: getTranslation(`containers.ListPage.table-headers.reviewWorkflows.stage`),
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
        id: getTranslation(`containers.ListPage.table-headers.reviewWorkflows.assignee.label`),
        defaultMessage: "Assignee"
      }
    },
    name: "strapi_assignee"
  }
];
export {
  REVIEW_WORKFLOW_FILTERS
};
//# sourceMappingURL=constants-16599dd6.mjs.map
