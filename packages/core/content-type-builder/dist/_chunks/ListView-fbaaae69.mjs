import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { Box, Flex, Icon, Typography, Table, Thead, Tr as Tr$1, Th, Button, TFooter, IconButton, HeaderLayout, ContentLayout } from "@strapi/design-system";
import { pxToRem, useTracking, EmptyBodyTable, onRowClick, stopPropagation, CheckPermissions, Link } from "@strapi/helper-plugin";
import { Cross, Plus, Pencil, Trash, Lock, Layer, Check, ArrowLeft } from "@strapi/icons";
import get from "lodash/get";
import has from "lodash/has";
import isEqual from "lodash/isEqual";
import upperFirst from "lodash/upperFirst";
import { useIntl } from "react-intl";
import { useHistory, useRouteMatch, Prompt } from "react-router-dom";
import { useState, createElement, Fragment, memo } from "react";
import { u as useDataManager, C as COMPONENT_ICONS, g as getTrad, a as useFormModalNavigation, A as AttributeIcon } from "./index-4fc4178e.mjs";
import styled from "styled-components";
import "react-helmet";
import "@strapi/design-system/v2";
import "./index-19cae9a3.mjs";
import "immer";
import "lodash/set";
import "lodash/snakeCase";
import "pluralize";
import "@sindresorhus/slugify";
import "lodash/cloneDeep";
import "yup";
import "lodash/groupBy";
import "lodash/size";
import "react-redux";
import "lodash/toLower";
import "qs";
import "lodash/truncate";
import "lodash/uniq";
import "lodash/toNumber";
import "@reduxjs/toolkit";
import "lodash/camelCase";
import "lodash/omit";
import "lodash/sortBy";
const BoxWrapper$1 = styled(Box)`
  table {
    width: 100%;
    white-space: nowrap;
  }

  thead {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};

    tr {
      border-top: 0;
    }
  }

  tr {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral150};

    & td,
    & th {
      padding: ${({ theme }) => theme.spaces[4]};
    }

    & td:first-of-type,
    & th:first-of-type {
      padding: 0 ${({ theme }) => theme.spaces[1]};
    }
  }

  th,
  td {
    vertical-align: middle;
    text-align: left;
    color: ${({ theme }) => theme.colors.neutral600};
    outline-offset: -4px;
  }
`;
const Tr = styled.tr`
  &.component-row,
  &.dynamiczone-row {
    position: relative;
    border-top: none !important;

    table tr:first-child {
      border-top: none;
    }

    > td:first-of-type {
      padding: 0 0 0 ${pxToRem(20)};
      position: relative;

      &::before {
        content: '';
        width: ${pxToRem(4)};
        height: calc(100% - 40px);
        position: absolute;
        top: -7px;
        left: 1.625rem;
        border-radius: 4px;

        ${({ isFromDynamicZone, isChildOfDynamicZone, theme }) => {
  if (isChildOfDynamicZone) {
    return `background-color: ${theme.colors.primary200};`;
  }
  if (isFromDynamicZone) {
    return `background-color: ${theme.colors.primary200};`;
  }
  return `background: ${theme.colors.neutral150};`;
}}
      }
    }
  }

  &.dynamiczone-row > td:first-of-type {
    padding: 0;
  }
`;
const ComponentList = ({
  customRowComponent,
  component,
  isFromDynamicZone = false,
  isNestedInDZComponent = false,
  firstLoopComponentUid
}) => {
  const { modifiedData } = useDataManager();
  const {
    schema: { attributes }
  } = get(modifiedData, ["components", component], {
    schema: { attributes: [] }
  });
  return /* @__PURE__ */ jsx(Tr, { isChildOfDynamicZone: isFromDynamicZone, className: "component-row", children: /* @__PURE__ */ jsx("td", { colSpan: 12, children: /* @__PURE__ */ jsx(
    List,
    {
      customRowComponent,
      items: attributes,
      targetUid: component,
      firstLoopComponentUid: firstLoopComponentUid || component,
      editTarget: "components",
      isFromDynamicZone,
      isNestedInDZComponent,
      isSub: true,
      secondLoopComponentUid: firstLoopComponentUid ? component : null
    }
  ) }) });
};
const ComponentIcon = ({ isActive = false, icon = "cube" }) => {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      alignItems: "center",
      background: isActive ? "primary200" : "neutral200",
      justifyContent: "center",
      height: 8,
      width: 8,
      borderRadius: "50%",
      children: /* @__PURE__ */ jsx(Icon, { as: COMPONENT_ICONS[icon] || COMPONENT_ICONS.cube, height: 5, width: 5 })
    }
  );
};
const CloseButton = styled(Box)`
  position: absolute;
  display: none;
  top: 5px;
  right: ${pxToRem(8)};

  svg {
    width: ${pxToRem(10)};
    height: ${pxToRem(10)};

    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const ComponentBox = styled(Flex)`
  width: ${pxToRem(140)};
  height: ${pxToRem(80)};
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: 100%;

  &.active,
  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    background: ${({ theme }) => theme.colors.primary100};

    ${CloseButton} {
      display: block;
    }

    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
    }

    /* > ComponentIcon */
    > div:first-child {
      background: ${({ theme }) => theme.colors.primary200};
      color: ${({ theme }) => theme.colors.primary600};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary600};
        }
      }
    }
  }
`;
const ComponentCard = ({
  component,
  dzName,
  index,
  isActive = false,
  isInDevelopmentMode = false,
  onClick
}) => {
  const { modifiedData, removeComponentFromDynamicZone } = useDataManager();
  const {
    schema: { icon, displayName }
  } = get(modifiedData, ["components", component], { schema: {} });
  const onClose = (e) => {
    e.stopPropagation();
    removeComponentFromDynamicZone(dzName, index);
  };
  return /* @__PURE__ */ jsxs(
    ComponentBox,
    {
      alignItems: "center",
      direction: "column",
      className: isActive ? "active" : "",
      borderRadius: "borderRadius",
      justifyContent: "center",
      paddingLeft: 4,
      paddingRight: 4,
      shrink: 0,
      onClick,
      role: "tab",
      tabIndex: isActive ? 0 : -1,
      cursor: "pointer",
      "aria-selected": isActive,
      "aria-controls": `dz-${dzName}-panel-${index}`,
      id: `dz-${dzName}-tab-${index}`,
      children: [
        /* @__PURE__ */ jsx(ComponentIcon, { icon, isActive }),
        /* @__PURE__ */ jsx(Box, { marginTop: 1, maxWidth: "100%", children: /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", ellipsis: true, children: displayName }) }),
        isInDevelopmentMode && /* @__PURE__ */ jsx(CloseButton, { as: "button", onClick: onClose, children: /* @__PURE__ */ jsx(Cross, {}) })
      ]
    }
  );
};
const StyledAddIcon = styled(Plus)`
  width: ${pxToRem(32)};
  height: ${pxToRem(32)};
  padding: ${pxToRem(9)};
  border-radius: ${pxToRem(64)};
  background: ${({ theme }) => theme.colors.primary100};
  path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;
const FixedBox = styled(Box)`
  height: ${pxToRem(90)};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;
const ScrollableStack = styled(Flex)`
  width: 100%;
  overflow-x: auto;
`;
const ComponentContentBox = styled(Box)`
  padding-top: ${pxToRem(90)};
`;
const ComponentStack = styled(Flex)`
  flex-shrink: 0;
  width: ${pxToRem(140)};
  height: ${pxToRem(80)};
  justify-content: center;
  align-items: center;
`;
const DynamicZoneList = ({
  customRowComponent,
  components = [],
  addComponent,
  name,
  targetUid
}) => {
  const { isInDevelopmentMode } = useDataManager();
  const [activeTab, setActiveTab] = useState(0);
  const { formatMessage } = useIntl();
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const handleClickAdd = () => {
    addComponent(name);
  };
  return /* @__PURE__ */ jsx(Tr, { className: "dynamiczone-row", isFromDynamicZone: true, children: /* @__PURE__ */ jsxs("td", { colSpan: 12, children: [
    /* @__PURE__ */ jsx(FixedBox, { paddingLeft: 8, children: /* @__PURE__ */ jsxs(ScrollableStack, { gap: 2, children: [
      isInDevelopmentMode && /* @__PURE__ */ jsx("button", { type: "button", onClick: handleClickAdd, children: /* @__PURE__ */ jsxs(ComponentStack, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsx(StyledAddIcon, {}),
        /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "primary600", children: formatMessage({
          id: getTrad("button.component.add"),
          defaultMessage: "Add a component"
        }) })
      ] }) }),
      /* @__PURE__ */ jsx(Flex, { role: "tablist", gap: 2, children: components.map((component, index) => {
        return /* @__PURE__ */ jsx(
          ComponentCard,
          {
            dzName: name || "",
            index,
            component,
            isActive: activeTab === index,
            isInDevelopmentMode,
            onClick: () => toggle(index)
          },
          component
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(ComponentContentBox, { children: components.map((component, index) => {
      const props = {
        customRowComponent,
        component
      };
      return /* @__PURE__ */ jsx(
        Box,
        {
          id: `dz-${name}-panel-${index}`,
          role: "tabpanel",
          "aria-labelledby": `dz-${name}-tab-${index}`,
          style: { display: activeTab === index ? "block" : "none" },
          children: /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ createElement(
            ComponentList,
            {
              ...props,
              isFromDynamicZone: true,
              component: targetUid,
              key: component
            }
          ) }) })
        },
        component
      );
    }) })
  ] }) });
};
const IconBox = styled(Box)`
  height: ${24 / 16}rem;
  width: ${24 / 16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10 / 16}rem;
    width: ${10 / 16}rem;
  }

  svg path {
    fill: ${({ theme, color }) => theme.colors[`${color}600`]};
  }
`;
const ButtonBox = styled(Box)`
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  display: block;
  width: 100%;
  border: none;
  position: relative;
  left: -0.25rem;
`;
const NestedTFooter = ({ children, icon, color, ...props }) => {
  return /* @__PURE__ */ jsx(ButtonBox, { paddingBottom: 4, paddingTop: 4, as: "button", type: "button", ...props, children: /* @__PURE__ */ jsxs(Flex, { children: [
    /* @__PURE__ */ jsx(IconBox, { color, "aria-hidden": true, background: `${color}200`, children: icon }),
    /* @__PURE__ */ jsx(Box, { paddingLeft: 3, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: `${color}600`, children }) })
  ] }) });
};
const List = ({
  addComponentToDZ,
  customRowComponent,
  editTarget,
  firstLoopComponentUid,
  isFromDynamicZone = false,
  isMain = false,
  isNestedInDZComponent = false,
  isSub = false,
  items = [],
  secondLoopComponentUid,
  targetUid
}) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { isInDevelopmentMode, modifiedData, isInContentTypeView } = useDataManager();
  const { onOpenModalAddField } = useFormModalNavigation();
  const onClickAddField = () => {
    trackUsage("hasClickedCTBAddFieldBanner");
    onOpenModalAddField({ forTarget: editTarget, targetUid });
  };
  if (!targetUid) {
    return /* @__PURE__ */ jsxs(Table, { colCount: 2, rowCount: 2, children: [
      /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr$1, { children: [
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.name", defaultMessage: "Name" }) }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.type", defaultMessage: "Type" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        EmptyBodyTable,
        {
          colSpan: 2,
          content: {
            id: getTrad("table.content.create-first-content-type"),
            defaultMessage: "Create your first Collection-Type"
          }
        }
      )
    ] });
  }
  if (items.length === 0 && isMain) {
    return /* @__PURE__ */ jsxs(Table, { colCount: 2, rowCount: 2, children: [
      /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr$1, { children: [
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.name", defaultMessage: "Name" }) }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.type", defaultMessage: "Type" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        EmptyBodyTable,
        {
          action: /* @__PURE__ */ jsx(Button, { onClick: onClickAddField, size: "L", startIcon: /* @__PURE__ */ jsx(Plus, {}), variant: "secondary", children: formatMessage({
            id: getTrad("table.button.no-fields"),
            defaultMessage: "Add new field"
          }) }),
          colSpan: 2,
          content: isInContentTypeView ? {
            id: getTrad("table.content.no-fields.collection-type"),
            defaultMessage: "Add your first field to this Collection-Type"
          } : {
            id: getTrad("table.content.no-fields.component"),
            defaultMessage: "Add your first field to this component"
          }
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(BoxWrapper$1, { children: [
    /* @__PURE__ */ jsx(
      Box,
      {
        paddingLeft: 6,
        paddingRight: isMain ? 6 : 0,
        ...isMain && { style: { overflowX: "auto" } },
        children: /* @__PURE__ */ jsxs("table", { children: [
          isMain && /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.name", defaultMessage: "Name" }) }) }),
            /* @__PURE__ */ jsx("th", { colSpan: 2, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "global.type", defaultMessage: "Type" }) }) })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: items.map((item) => {
            const { type } = item;
            const CustomRow = customRowComponent;
            return /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                CustomRow,
                {
                  ...item,
                  isNestedInDZComponent,
                  targetUid,
                  editTarget,
                  firstLoopComponentUid,
                  isFromDynamicZone,
                  secondLoopComponentUid
                }
              ),
              type === "component" && /* @__PURE__ */ jsx(
                ComponentList,
                {
                  ...item,
                  customRowComponent,
                  targetUid,
                  isNestedInDZComponent: isFromDynamicZone,
                  editTarget,
                  firstLoopComponentUid
                }
              ),
              type === "dynamiczone" && /* @__PURE__ */ jsx(
                DynamicZoneList,
                {
                  ...item,
                  customRowComponent,
                  addComponent: addComponentToDZ,
                  targetUid
                }
              )
            ] }, item.name);
          }) })
        ] })
      }
    ),
    isMain && isInDevelopmentMode && /* @__PURE__ */ jsx(TFooter, { icon: /* @__PURE__ */ jsx(Plus, {}), onClick: onClickAddField, children: formatMessage({
      id: getTrad(
        `form.button.add.field.to.${modifiedData.contentType ? modifiedData.contentType.schema.kind : editTarget || "collectionType"}`
      ),
      defaultMessage: "Add another field"
    }) }),
    isSub && isInDevelopmentMode && /* @__PURE__ */ jsx(
      NestedTFooter,
      {
        icon: /* @__PURE__ */ jsx(Plus, {}),
        onClick: onClickAddField,
        color: isFromDynamicZone ? "primary" : "neutral",
        children: formatMessage({
          id: getTrad(`form.button.add.field.to.component`),
          defaultMessage: "Add another field"
        })
      }
    )
  ] });
};
const StyledBox = styled(Box)`
  position: absolute;
  left: -1.125rem;
  top: 0px;

  &:before {
    content: '';
    width: ${4 / 16}rem;
    height: ${12 / 16}rem;
    background: ${({ theme, color }) => theme.colors[color]};
    display: block;
  }
`;
const Svg = styled.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({ theme, color }) => theme.colors[color]};
  }
`;
const Curve = (props) => /* @__PURE__ */ jsx(StyledBox, { children: /* @__PURE__ */ jsx(
  Svg,
  {
    width: "20",
    height: "23",
    viewBox: "0 0 20 23",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z"
      }
    )
  }
) });
const DisplayedType = ({
  type,
  customField = null,
  repeatable = false
}) => {
  const { formatMessage } = useIntl();
  let readableType = type;
  if (["integer", "biginteger", "float", "decimal"].includes(type)) {
    readableType = "number";
  } else if (["string"].includes(type)) {
    readableType = "text";
  }
  if (customField) {
    return /* @__PURE__ */ jsx(Typography, { children: formatMessage({
      id: getTrad("attribute.customField"),
      defaultMessage: "Custom field"
    }) });
  }
  return /* @__PURE__ */ jsxs(Typography, { children: [
    formatMessage({
      id: getTrad(`attribute.${readableType}`),
      defaultMessage: type
    }),
    " ",
    repeatable && formatMessage({
      id: getTrad("component.repeatable"),
      defaultMessage: "(repeatable)"
    })
  ] });
};
const UpperFirst = ({ content }) => /* @__PURE__ */ jsx(Fragment$1, { children: upperFirst(content) });
const BoxWrapper = styled(Box)`
  position: relative;
`;
const ListRow = memo(
  ({
    configurable = true,
    customField = null,
    editTarget,
    firstLoopComponentUid = null,
    isFromDynamicZone = false,
    name,
    onClick,
    relation = "",
    repeatable = false,
    secondLoopComponentUid = null,
    target = null,
    targetUid = null,
    type
  }) => {
    const { contentTypes, isInDevelopmentMode, removeAttribute } = useDataManager();
    const { formatMessage } = useIntl();
    const isMorph = type === "relation" && relation.includes("morph");
    const ico = ["integer", "biginteger", "float", "decimal"].includes(type) ? "number" : type;
    const contentType = get(contentTypes, [target], {});
    const contentTypeFriendlyName = get(contentType, ["schema", "displayName"], "");
    const isPluginContentType = get(contentType, "plugin");
    const src = target ? "relation" : ico;
    const handleClick = () => {
      if (isMorph) {
        return;
      }
      if (configurable !== false) {
        const attrType = type;
        onClick(
          // Tells where the attribute is located in the main modifiedData object : contentType, component or components
          editTarget,
          // main data type uid
          secondLoopComponentUid || firstLoopComponentUid || targetUid,
          // Name of the attribute
          name,
          // Type of the attribute
          attrType,
          customField
        );
      }
    };
    let loopNumber;
    if (secondLoopComponentUid && firstLoopComponentUid) {
      loopNumber = 2;
    } else if (firstLoopComponentUid) {
      loopNumber = 1;
    } else {
      loopNumber = 0;
    }
    return /* @__PURE__ */ jsxs(
      BoxWrapper,
      {
        as: "tr",
        ...onRowClick({
          fn: handleClick,
          condition: isInDevelopmentMode && configurable && !isMorph
        }),
        children: [
          /* @__PURE__ */ jsxs("td", { style: { position: "relative" }, children: [
            loopNumber !== 0 && /* @__PURE__ */ jsx(Curve, { color: isFromDynamicZone ? "primary200" : "neutral150" }),
            /* @__PURE__ */ jsxs(Flex, { paddingLeft: 2, gap: 4, children: [
              /* @__PURE__ */ jsx(AttributeIcon, { type: src, customField }),
              /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: name })
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { children: target ? /* @__PURE__ */ jsxs(Typography, { children: [
            formatMessage({
              id: getTrad(
                `modelPage.attribute.${isMorph ? "relation-polymorphic" : "relationWith"}`
              ),
              defaultMessage: "Relation with"
            }),
            " ",
            /* @__PURE__ */ jsxs("span", { style: { fontStyle: "italic" }, children: [
              /* @__PURE__ */ jsx(UpperFirst, { content: contentTypeFriendlyName }),
              " ",
              isPluginContentType && `(${formatMessage({
                id: getTrad(`from`),
                defaultMessage: "from"
              })}: ${isPluginContentType})`
            ] })
          ] }) : /* @__PURE__ */ jsx(DisplayedType, { type, customField, repeatable }) }),
          /* @__PURE__ */ jsx("td", { children: isInDevelopmentMode ? /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", ...stopPropagation, children: configurable ? /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
            !isMorph && /* @__PURE__ */ jsx(
              IconButton,
              {
                onClick: handleClick,
                label: `${formatMessage({
                  id: "app.utils.edit",
                  defaultMessage: "Edit"
                })} ${name}`,
                noBorder: true,
                icon: /* @__PURE__ */ jsx(Pencil, {})
              }
            ),
            /* @__PURE__ */ jsx(
              IconButton,
              {
                onClick: (e) => {
                  e.stopPropagation();
                  removeAttribute(
                    editTarget,
                    name,
                    secondLoopComponentUid || firstLoopComponentUid || ""
                  );
                },
                label: `${formatMessage({
                  id: "global.delete",
                  defaultMessage: "Delete"
                })} ${name}`,
                noBorder: true,
                icon: /* @__PURE__ */ jsx(Trash, {})
              }
            )
          ] }) : /* @__PURE__ */ jsx(Lock, {}) }) : (
            /*
              In production mode the edit icons aren't visible, therefore
              we need to reserve the same space, otherwise the height of the
              row might collapse, leading to bad positioned curve icons
            */
            /* @__PURE__ */ jsx(Box, { height: pxToRem(32) })
          ) })
        ]
      }
    );
  }
);
const getAttributeDisplayedType = (type) => {
  let displayedType;
  switch (type) {
    case "date":
    case "datetime":
    case "time":
    case "timestamp":
      displayedType = "date";
      break;
    case "integer":
    case "biginteger":
    case "decimal":
    case "float":
      displayedType = "number";
      break;
    case "string":
    case "text":
      displayedType = "text";
      break;
    case "":
      displayedType = "relation";
      break;
    default:
      displayedType = type;
  }
  return displayedType;
};
const cmPermissions = {
  collectionTypesConfigurations: [
    {
      action: "plugin::content-manager.collection-types.configure-view",
      subject: null
    }
  ],
  componentsConfigurations: [
    {
      action: "plugin::content-manager.components.configure-layout",
      subject: null
    }
  ],
  singleTypesConfigurations: [
    {
      action: "plugin::content-manager.single-types.configure-view",
      subject: null
    }
  ]
};
const LinkToCMSettingsView = memo(
  ({
    disabled,
    isTemporary = false,
    isInContentTypeView = true,
    contentTypeKind = "collectionType",
    targetUid = ""
  }) => {
    const { formatMessage } = useIntl();
    const { push } = useHistory();
    const { collectionTypesConfigurations, componentsConfigurations, singleTypesConfigurations } = cmPermissions;
    const label = formatMessage({
      id: "content-type-builder.form.button.configure-view",
      defaultMessage: "Configure the view"
    });
    let permissionsToApply = collectionTypesConfigurations;
    const handleClick = () => {
      if (isTemporary) {
        return false;
      }
      if (isInContentTypeView) {
        push(`/content-manager/collectionType/${targetUid}/configurations/edit`);
      } else {
        push(`/content-manager/components/${targetUid}/configurations/edit`);
      }
      return false;
    };
    if (isInContentTypeView && contentTypeKind === "singleType") {
      permissionsToApply = singleTypesConfigurations;
    }
    if (!isInContentTypeView) {
      permissionsToApply = componentsConfigurations;
    }
    return /* @__PURE__ */ jsx(CheckPermissions, { permissions: permissionsToApply, children: /* @__PURE__ */ jsx(
      Button,
      {
        startIcon: /* @__PURE__ */ jsx(Layer, {}),
        variant: "tertiary",
        onClick: handleClick,
        disabled: isTemporary || disabled,
        children: label
      }
    ) });
  }
);
const ListView = () => {
  const { initialData, modifiedData, isInDevelopmentMode, isInContentTypeView, submitData } = useDataManager();
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const match = useRouteMatch(
    "/plugins/content-type-builder/:kind/:currentUID"
  );
  const {
    onOpenModalAddComponentsToDZ,
    onOpenModalAddField,
    onOpenModalEditField,
    onOpenModalEditSchema,
    onOpenModalEditCustomField
  } = useFormModalNavigation();
  const firstMainDataPath = isInContentTypeView ? "contentType" : "component";
  const mainDataTypeAttributesPath = [firstMainDataPath, "schema", "attributes"];
  const targetUid = get(modifiedData, [firstMainDataPath, "uid"]);
  const isTemporary = get(modifiedData, [firstMainDataPath, "isTemporary"], false);
  const contentTypeKind = get(modifiedData, [firstMainDataPath, "schema", "kind"], null);
  const attributes = get(modifiedData, mainDataTypeAttributesPath, []);
  const isFromPlugin = has(initialData, [firstMainDataPath, "plugin"]);
  const hasModelBeenModified = !isEqual(modifiedData, initialData);
  const forTarget = isInContentTypeView ? "contentType" : "component";
  const handleClickAddComponentToDZ = (dynamicZoneTarget) => {
    onOpenModalAddComponentsToDZ({ dynamicZoneTarget, targetUid });
  };
  const handleClickEditField = async (forTarget2, targetUid2, attributeName, type, customField) => {
    const attributeType = getAttributeDisplayedType(type);
    const step = type === "component" ? "2" : null;
    if (customField) {
      onOpenModalEditCustomField({
        forTarget: forTarget2,
        targetUid: targetUid2,
        attributeName,
        attributeType,
        customFieldUid: customField
      });
    } else {
      onOpenModalEditField({
        forTarget: forTarget2,
        targetUid: targetUid2,
        attributeName,
        attributeType,
        step
      });
    }
  };
  let label = get(modifiedData, [firstMainDataPath, "schema", "displayName"], "");
  const kind = get(modifiedData, [firstMainDataPath, "schema", "kind"], "");
  const isCreatingFirstContentType = match?.params.currentUID === "create-content-type";
  if (!label && isCreatingFirstContentType) {
    label = formatMessage({
      id: getTrad("button.model.create"),
      defaultMessage: "Create new collection type"
    });
  }
  const onEdit = () => {
    const contentType = kind || firstMainDataPath;
    if (contentType === "collectionType") {
      trackUsage("willEditNameOfContentType");
    }
    if (contentType === "singleType") {
      trackUsage("willEditNameOfSingleType");
    }
    onOpenModalEditSchema({
      modalType: firstMainDataPath,
      forTarget: firstMainDataPath,
      targetUid,
      kind: contentType
    });
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      Prompt,
      {
        message: (location) => location.hash === "#back" ? false : formatMessage({ id: getTrad("prompt.unsaved") }),
        when: hasModelBeenModified
      }
    ),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        id: "title",
        primaryAction: isInDevelopmentMode && /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
          !isCreatingFirstContentType && /* @__PURE__ */ jsx(
            Button,
            {
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              variant: "secondary",
              onClick: () => {
                onOpenModalAddField({ forTarget, targetUid });
              },
              children: formatMessage({
                id: getTrad("button.attributes.add.another"),
                defaultMessage: "Add another field"
              })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              startIcon: /* @__PURE__ */ jsx(Check, {}),
              onClick: () => submitData(),
              type: "submit",
              disabled: isEqual(modifiedData, initialData),
              children: formatMessage({
                id: "global.save",
                defaultMessage: "Save"
              })
            }
          )
        ] }),
        secondaryAction: isInDevelopmentMode && !isFromPlugin && !isCreatingFirstContentType && /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(Pencil, {}), variant: "tertiary", onClick: onEdit, children: formatMessage({
          id: "app.utils.edit",
          defaultMessage: "Edit"
        }) }),
        title: upperFirst(label),
        subtitle: formatMessage({
          id: getTrad("listView.headerLayout.description"),
          defaultMessage: "Build the data architecture of your content"
        }),
        navigationAction: /* @__PURE__ */ jsx(Link, { startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), to: "/plugins/content-type-builder/", children: formatMessage({
          id: "global.back",
          defaultMessage: "Back"
        }) })
      }
    ),
    /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
      /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Flex, { gap: 2, children: /* @__PURE__ */ jsx(
        LinkToCMSettingsView,
        {
          targetUid,
          isTemporary,
          isInContentTypeView,
          contentTypeKind,
          disabled: isCreatingFirstContentType
        },
        "link-to-cm-settings-view"
      ) }) }),
      /* @__PURE__ */ jsx(Box, { background: "neutral0", shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(
        List,
        {
          items: attributes,
          customRowComponent: (props) => /* @__PURE__ */ jsx(ListRow, { ...props, onClick: handleClickEditField }),
          addComponentToDZ: handleClickAddComponentToDZ,
          targetUid,
          editTarget: forTarget,
          isMain: true
        }
      ) })
    ] }) })
  ] });
};
export {
  ListView as default
};
//# sourceMappingURL=ListView-fbaaae69.mjs.map
