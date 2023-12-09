import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Layout, Main, Box, Grid, GridItem, Flex, Typography } from "@strapi/design-system";
import { LinkButton } from "@strapi/design-system/v2";
import { useGuidedTour, LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Discord, Reddit, Strapi, Twitter, Discourse } from "@strapi/icons";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { u as useContentTypes } from "./useContentTypes-53b449bb.mjs";
import { i as useEnterprise } from "./index-90ba4fba.mjs";
import "axios";
import "react-query";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-redux";
import "@radix-ui/react-context";
import "formik";
import "lodash/camelCase";
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
const cornerOrnamentPath = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ4IiBoZWlnaHQ9IjE0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIG9wYWNpdHk9Ii44IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggb3BhY2l0eT0iLjE1IiBkPSJNMTEwLjgxIDM3SDczLjk3Vjc0LjFoMzYuODRWMzdaIiBmaWxsPSJ1cmwoI2EpIi8+CiAgICAgICAgPHBhdGggb3BhY2l0eT0iLjA3IiBkPSJNMzYuODQgMEgwdjM3LjA4aDM2Ljg0VjBaIiBmaWxsPSJ1cmwoI2IpIi8+CiAgICAgICAgPHBhdGggb3BhY2l0eT0iLjA3IiBkPSJNNzMuOTIgNzMuOTVIMzcuMDh2MzcuMDhoMzYuODRWNzMuOTVaIiBmaWxsPSJ1cmwoI2MpIi8+CiAgICAgICAgPHBhdGggb3BhY2l0eT0iLjA3IiBkPSJNMTQ3Ljk5IDExMC45MmgtMzcuM1YxNDhIMTQ4di0zNy4wOFoiIGZpbGw9InVybCgjZCkiLz4KICAgICAgICA8cGF0aCBvcGFjaXR5PSIuMTUiIGQ9Ik03My44MyAzN0gzNi44NEw3My44MyAwdjM3WiIgZmlsbD0idXJsKCNlKSIvPgogICAgICAgIDxwYXRoIG9wYWNpdHk9Ii4xNSIgZD0iTTExMC42IDExMS4wMnYtMzdoMzYuOThsLTM2Ljk5IDM3WiIgZmlsbD0idXJsKCNmKSIvPgogICAgICAgIDxwYXRoIG9wYWNpdHk9Ii40IiBkPSJNNzMuODMgMHYzN2gzNi45OHYzNy4wMWgzN1YzYTMgMyAwIDAgMC0zLTNINzMuODJaIiBmaWxsPSJ1cmwoI2cpIi8+CiAgICA8L2c+CiAgICAKICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjkxLjMxIiB5MT0iODMuMzEiIHgyPSIxMTguMjQiIHkyPSI1Ni41OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjN0E5MkZGIi8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMyNTNFQSIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgCiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iNDAuOTkiIHkxPSIxMy44OCIgeDI9Ii4wMSIgeTI9IjExLjY0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNBOEI4RkYiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzI1M0VBIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICAKICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSI1NC40MSIgeTE9IjEyMC4yNSIgeDI9IjgxLjM1IiB5Mj0iOTMuNTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0E4QjhGRiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzMjUzRUEiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIAogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZCIgeDE9IjEyOC4yNCIgeTE9IjE1Ny4yMiIgeDI9IjE1NS4xNyIgeTI9IjEzMC4xNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQThCOEZGIi8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMyNTNFQSIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgCiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJlIiB4MT0iNTQuMjQiIHkxPSI0Ni4yMSIgeDI9IjgxLjEyIiB5Mj0iMTkuMzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzdBOTJGRiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzMjUzRUEiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIAogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZiIgeDE9IjEyNi4yOCIgeTE9Ijc0LjA1IiB4Mj0iMTI0Ljk0IiB5Mj0iMTExLjA3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM3QTkyRkYiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzI1M0VBIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICAKICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSI3My4zNyIgeTE9IjM2Ljg3IiB4Mj0iMTMyLjg3IiB5Mj0iNjYuNzQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzdBOTJGRiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzODU4RUEiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgo8L3N2Zz4K";
const cloudIconBackgroundImage = "data:image/png;base64,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";
const HomePageCE = () => {
  const { formatMessage } = useIntl();
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useContentTypes();
  const { guidedTourState, isGuidedTourVisible, isSkipped } = useGuidedTour();
  !Object.values(guidedTourState).every(
    (section) => Object.values(section).every((step) => step)
  ) && isGuidedTourVisible && !isSkipped;
  useHistory();
  const hasAlreadyCreatedContentTypes = React.useMemo(() => {
    const filterContentTypes = (contentTypes) => contentTypes.filter((c) => c.isDisplayed);
    return filterContentTypes(collectionTypes).length > 1 || filterContentTypes(singleTypes).length > 0;
  }, [collectionTypes, singleTypes]);
  if (isLoadingForModels) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      Helmet,
      {
        title: formatMessage({
          id: "HomePage.helmet.title",
          defaultMessage: "Homepage"
        })
      }
    ),
    /* @__PURE__ */ jsxs(Main, { children: [
      /* @__PURE__ */ jsx(LogoContainer, { children: /* @__PURE__ */ jsx("img", { alt: "", "aria-hidden": true, src: cornerOrnamentPath }) }),
      /* @__PURE__ */ jsx(Box, { padding: 10, children: /* @__PURE__ */ jsx(Grid, { children: /* @__PURE__ */ jsx(GridItem, { col: 8, s: 12, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Box, { paddingLeft: 6, paddingBottom: 10, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "flex-start", gap: 5, children: [
        /* @__PURE__ */ jsx(Typography, { as: "h1", variant: "alpha", children: hasAlreadyCreatedContentTypes ? formatMessage({
          id: "app.components.HomePage.welcome.again",
          defaultMessage: "Welcome 👋"
        }) : formatMessage({
          id: "app.components.HomePage.welcome",
          defaultMessage: "Welcome on board!"
        }) }),
        /* @__PURE__ */ jsx(WordWrap, { textColor: "neutral600", variant: "epsilon", children: hasAlreadyCreatedContentTypes ? formatMessage({
          id: "app.components.HomePage.welcomeBlock.content.again",
          defaultMessage: "We hope you are making progress on your project! Feel free to read the latest news about Strapi. We are giving our best to improve the product based on your feedback."
        }) : formatMessage({
          id: "app.components.HomePage.welcomeBlock.content",
          defaultMessage: "Congrats! You are logged as the first administrator. To discover the powerful features provided by Strapi, we recommend you to create your first Content type!"
        }) })
      ] }) }) }) }) }) })
    ] })
  ] });
};
const LogoContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: ${150 / 16}rem;
  }
`;
const WordWrap = styled(Typography)`
  word-break: break-word;
`;
styled.a`
  text-decoration: none;
`;
styled(Box)`
  background-image: url(${cloudIconBackgroundImage});
`;
styled(Flex)`
  background: rgba(255, 255, 255, 0.3);
`;
styled(Discord)`
  path {
    fill: #7289da !important;
  }
`;
styled(Reddit)`
  > path:first-child {
    fill: #ff4500;
  }
`;
styled(Strapi)`
  > path:first-child {
    fill: #4945ff;
  }
  > path:nth-child(2) {
    fill: #fff;
  }
  > path:nth-child(4) {
    fill: #9593ff;
  }
`;
styled(Twitter)`
  path {
    fill: #1da1f2 !important;
  }
`;
styled(Discourse)`
  > path:first-child {
    fill: #231f20;
  }
  > path:nth-child(2) {
    fill: #fff9ae;
  }
  > path:nth-child(3) {
    fill: #00aeef;
  }
  > path:nth-child(4) {
    fill: #00a94f;
  }
  > path:nth-child(5) {
    fill: #f15d22;
  }
  > path:nth-child(6) {
    fill: #e31b23;
  }
`;
styled(LinkButton)`
  display: flex;
  align-items: center;
  border: none;

  svg {
    width: ${({ theme }) => theme.spaces[6]};
    height: ${({ theme }) => theme.spaces[6]};
  }

  span {
    word-break: keep-all;
  }
`;
styled(Grid)`
  row-gap: ${({ theme }) => theme.spaces[2]};
  column-gap: ${({ theme }) => theme.spaces[4]};
`;
const HomePage = () => {
  const Page = useEnterprise(
    HomePageCE,
    // eslint-disable-next-line import/no-cycle
    async () => (await import("./HomePage-af0dfeef.mjs")).HomePageEE
  );
  if (!Page) {
    return null;
  }
  return /* @__PURE__ */ jsx(Page, {});
};
export {
  HomePage,
  HomePageCE
};
//# sourceMappingURL=HomePage-f50fe8ab.mjs.map
