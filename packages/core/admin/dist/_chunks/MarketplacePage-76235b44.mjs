import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Button, Flex, Box, Popover, Tag, MultiSelect, MultiSelectOption, Typography, Divider, Tooltip, Icon, Loader, GridLayout, Grid, GridItem, HeaderLayout, Layout, Main, SingleSelect, SingleSelectOption, useNotifyAT, ContentLayout, TabGroup, Tabs, Tab, Searchbar, TabPanels, TabPanel } from "@strapi/design-system";
import { pxToRem, useTracking, useNotification, useClipboard, AnErrorOccurred, useQueryParams, useAppInfo, useFocusWhenNavigate, PageSizeURLQuery, PaginationURLQuery, ContentBox, CheckPagePermissions } from "@strapi/helper-plugin";
import { Filter, Cross, CheckCircle, ExternalLink, Check, Duplicate, Github, Star, Download, EmptyDocuments, Upload, GlassesSquare } from "@strapi/icons";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { S as StrapiLogo, j as useDebounce, s as selectAdminPermissions } from "./index-90ba4fba.mjs";
import styled from "styled-components";
import { LinkButton } from "@strapi/design-system/v2";
import pluralize from "pluralize";
import * as semver from "semver";
import * as qs from "qs";
import { useQuery } from "react-query";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-router-dom";
import "@radix-ui/react-context";
import "formik";
import "lodash/camelCase";
import "yup";
import "lodash/defaultsDeep";
import "lodash/omit";
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
const NpmPackagesFilters = ({
  handleSelectClear,
  handleSelectChange,
  npmPackageType,
  possibleCategories,
  possibleCollections,
  query
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const buttonRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const handleToggle = () => setIsVisible((prev) => !prev);
  const handleTagRemove = (tagToRemove, filterType) => {
    const update = {
      [filterType]: (query[filterType] ?? []).filter((previousTag) => previousTag !== tagToRemove)
    };
    handleSelectChange(update);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { paddingTop: 1, paddingBottom: 1, children: [
      /* @__PURE__ */ jsx(
        ButtonToggle,
        {
          variant: "tertiary",
          ref: buttonRef,
          startIcon: /* @__PURE__ */ jsx(Filter, {}),
          onClick: handleToggle,
          size: "S",
          children: formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" })
        }
      ),
      isVisible && /* @__PURE__ */ jsx(Popover, { source: buttonRef, onDismiss: handleToggle, padding: 3, spacing: 4, children: /* @__PURE__ */ jsxs(FiltersFlex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsx(
          FilterSelect,
          {
            message: formatMessage({
              id: "admin.pages.MarketPlacePage.filters.collections",
              defaultMessage: "Collections"
            }),
            value: query?.collections || [],
            onChange: (newCollections) => {
              const update = { collections: newCollections };
              handleSelectChange(update);
            },
            onClear: () => handleSelectClear("collections"),
            possibleFilters: possibleCollections,
            customizeContent: (values) => formatMessage(
              {
                id: "admin.pages.MarketPlacePage.filters.collectionsSelected",
                defaultMessage: "{count, plural, =0 {No collections} one {# collection} other {# collections}} selected"
              },
              { count: values?.length ?? 0 }
            )
          }
        ),
        npmPackageType === "plugin" && /* @__PURE__ */ jsx(
          FilterSelect,
          {
            message: formatMessage({
              id: "admin.pages.MarketPlacePage.filters.categories",
              defaultMessage: "Categories"
            }),
            value: query?.categories || [],
            onChange: (newCategories) => {
              const update = { categories: newCategories };
              handleSelectChange(update);
            },
            onClear: () => handleSelectClear("categories"),
            possibleFilters: possibleCategories,
            customizeContent: (values) => formatMessage(
              {
                id: "admin.pages.MarketPlacePage.filters.categoriesSelected",
                defaultMessage: "{count, plural, =0 {No categories} one {# category} other {# categories}} selected"
              },
              { count: values?.length ?? 0 }
            )
          }
        )
      ] }) })
    ] }),
    query.collections?.map((collection) => /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsx(Tag, { icon: /* @__PURE__ */ jsx(Cross, {}), onClick: () => handleTagRemove(collection, "collections"), children: collection }) }, collection)),
    npmPackageType === "plugin" && query.categories?.map((category) => /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsx(Tag, { icon: /* @__PURE__ */ jsx(Cross, {}), onClick: () => handleTagRemove(category, "categories"), children: category }) }, category))
  ] });
};
const ButtonToggle = styled(Button)`
  height: ${({ theme }) => theme.sizes.input.S};
`;
const FiltersFlex = styled(Flex)`
  /* Hide the label, every input needs a label. */
  label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
const FilterSelect = ({
  message,
  value,
  onChange,
  possibleFilters,
  onClear,
  customizeContent
}) => {
  return /* @__PURE__ */ jsx(
    MultiSelect,
    {
      "data-testid": `${message}-button`,
      label: message,
      placeholder: message,
      size: "M",
      onChange,
      onClear,
      value,
      customizeContent,
      children: Object.entries(possibleFilters).map(([filterName, count]) => {
        return /* @__PURE__ */ jsx(
          MultiSelectOption,
          {
            "data-testid": `${filterName}-${count}`,
            value: filterName,
            children: `${filterName} (${count})`
          },
          filterName
        );
      })
    }
  );
};
const EllipsisText = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
const NpmPackageCard = ({
  npmPackage,
  isInstalled,
  useYarn,
  isInDevelopmentMode,
  npmPackageType,
  strapiAppVersion
}) => {
  const { attributes } = npmPackage;
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const commandToCopy = useYarn ? `yarn add ${attributes.npmPackageName}` : `npm install ${attributes.npmPackageName}`;
  const madeByStrapiMessage = formatMessage({
    id: "admin.pages.MarketPlacePage.plugin.tooltip.madeByStrapi",
    defaultMessage: "Made by Strapi"
  });
  const npmPackageHref = `https://market.strapi.io/${pluralize.plural(npmPackageType)}/${attributes.slug}`;
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      direction: "column",
      justifyContent: "space-between",
      paddingTop: 4,
      paddingRight: 4,
      paddingBottom: 4,
      paddingLeft: 4,
      hasRadius: true,
      background: "neutral0",
      shadow: "tableShadow",
      height: "100%",
      alignItems: "normal",
      "data-testid": "npm-package-card",
      children: [
        /* @__PURE__ */ jsxs(Box, { children: [
          /* @__PURE__ */ jsxs(Flex, { direction: "row", justifyContent: "space-between", alignItems: "flex-start", children: [
            /* @__PURE__ */ jsx(
              Box,
              {
                as: "img",
                src: attributes.logo.url,
                alt: `${attributes.name} logo`,
                hasRadius: true,
                width: 11,
                height: 11
              }
            ),
            /* @__PURE__ */ jsx(
              PackageStats,
              {
                githubStars: attributes.githubStars,
                npmDownloads: attributes.npmDownloads,
                npmPackageType
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsx(Typography, { as: "h3", variant: "delta", children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", children: [
            attributes.name,
            attributes.validated && !attributes.madeByStrapi && /* @__PURE__ */ jsx(
              Tooltip,
              {
                description: formatMessage({
                  id: "admin.pages.MarketPlacePage.plugin.tooltip.verified",
                  defaultMessage: "Plugin verified by Strapi"
                }),
                children: /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(Icon, { as: CheckCircle, marginLeft: 2, color: "success600" }) })
              }
            ),
            attributes.madeByStrapi && /* @__PURE__ */ jsx(Tooltip, { description: madeByStrapiMessage, children: /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(
              Box,
              {
                as: "img",
                src: StrapiLogo,
                alt: madeByStrapiMessage,
                marginLeft: 1,
                width: 6,
                height: "auto"
              }
            ) }) })
          ] }) }) }),
          /* @__PURE__ */ jsx(Box, { paddingTop: 2, children: /* @__PURE__ */ jsx(EllipsisText, { as: "p", variant: "omega", textColor: "neutral600", children: attributes.description }) })
        ] }),
        /* @__PURE__ */ jsxs(Flex, { gap: 2, style: { alignSelf: "flex-end" }, paddingTop: 6, children: [
          /* @__PURE__ */ jsx(
            LinkButton,
            {
              size: "S",
              href: npmPackageHref,
              isExternal: true,
              endIcon: /* @__PURE__ */ jsx(ExternalLink, {}),
              "aria-label": formatMessage(
                {
                  id: "admin.pages.MarketPlacePage.plugin.info.label",
                  defaultMessage: "Learn more about {pluginName}"
                },
                { pluginName: attributes.name }
              ),
              variant: "tertiary",
              onClick: () => trackUsage("didPluginLearnMore"),
              children: formatMessage({
                id: "admin.pages.MarketPlacePage.plugin.info.text",
                defaultMessage: "More"
              })
            }
          ),
          /* @__PURE__ */ jsx(
            InstallPluginButton,
            {
              isInstalled,
              isInDevelopmentMode,
              commandToCopy,
              strapiAppVersion,
              strapiPeerDepVersion: attributes.strapiVersion,
              pluginName: attributes.name
            }
          )
        ] })
      ]
    }
  );
};
const InstallPluginButton = ({
  isInstalled,
  isInDevelopmentMode,
  commandToCopy,
  strapiAppVersion,
  strapiPeerDepVersion,
  pluginName
}) => {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { copy } = useClipboard();
  const handleCopy = async () => {
    const didCopy = await copy(commandToCopy);
    if (didCopy) {
      trackUsage("willInstallPlugin");
      toggleNotification({
        type: "success",
        message: { id: "admin.pages.MarketPlacePage.plugin.copy.success" }
      });
    }
  };
  if (isInstalled) {
    return /* @__PURE__ */ jsxs(Box, { paddingLeft: 4, children: [
      /* @__PURE__ */ jsx(Icon, { as: Check, marginRight: 2, width: 12, height: 12, color: "success600" }),
      /* @__PURE__ */ jsx(Typography, { variant: "omega", textColor: "success600", fontWeight: "bold", children: formatMessage({
        id: "admin.pages.MarketPlacePage.plugin.installed",
        defaultMessage: "Installed"
      }) })
    ] });
  }
  if (isInDevelopmentMode) {
    return /* @__PURE__ */ jsx(
      CardButton,
      {
        strapiAppVersion,
        strapiPeerDepVersion,
        handleCopy,
        pluginName
      }
    );
  }
  return null;
};
const CardButton = ({
  strapiPeerDepVersion,
  strapiAppVersion,
  handleCopy,
  pluginName
}) => {
  const { formatMessage } = useIntl();
  const versionRange = semver.validRange(strapiPeerDepVersion);
  const isCompatible = semver.satisfies(strapiAppVersion ?? "", versionRange ?? "");
  const installMessage = formatMessage({
    id: "admin.pages.MarketPlacePage.plugin.copy",
    defaultMessage: "Copy install command"
  });
  if (strapiAppVersion) {
    if (!versionRange || !isCompatible) {
      return /* @__PURE__ */ jsx(
        Tooltip,
        {
          "data-testid": `tooltip-${pluginName}`,
          description: !versionRange ? formatMessage(
            {
              id: "admin.pages.MarketPlacePage.plugin.version.null",
              defaultMessage: 'Unable to verify compatibility with your Strapi version: "{strapiAppVersion}"'
            },
            { strapiAppVersion }
          ) : formatMessage(
            {
              id: "admin.pages.MarketPlacePage.plugin.version",
              defaultMessage: 'Update your Strapi version: "{strapiAppVersion}" to: "{versionRange}"'
            },
            {
              strapiAppVersion,
              versionRange
            }
          ),
          children: /* @__PURE__ */ jsx(
            Button,
            {
              size: "S",
              startIcon: /* @__PURE__ */ jsx(Duplicate, {}),
              variant: "secondary",
              onClick: handleCopy,
              disabled: !isCompatible,
              children: installMessage
            }
          )
        }
      );
    }
  }
  return /* @__PURE__ */ jsx(Button, { size: "S", startIcon: /* @__PURE__ */ jsx(Duplicate, {}), variant: "secondary", onClick: handleCopy, children: installMessage });
};
const PackageStats = ({ githubStars = 0, npmDownloads = 0, npmPackageType }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
    !!githubStars && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Icon, { as: Github, height: pxToRem(12), width: pxToRem(12), "aria-hidden": true }),
      /* @__PURE__ */ jsx(Icon, { as: Star, height: pxToRem(12), width: pxToRem(12), color: "warning500", "aria-hidden": true }),
      /* @__PURE__ */ jsx(
        "p",
        {
          "aria-label": formatMessage(
            {
              id: `admin.pages.MarketPlacePage.${npmPackageType}.githubStars`,
              defaultMessage: `This {package} was starred {starsCount} on GitHub`
            },
            {
              starsCount: githubStars,
              package: npmPackageType
            }
          ),
          children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral800", children: githubStars })
        }
      ),
      /* @__PURE__ */ jsx(VerticalDivider, { unsetMargin: false })
    ] }),
    /* @__PURE__ */ jsx(Icon, { as: Download, height: pxToRem(12), width: pxToRem(12), "aria-hidden": true }),
    /* @__PURE__ */ jsx(
      "p",
      {
        "aria-label": formatMessage(
          {
            id: `admin.pages.MarketPlacePage.${npmPackageType}.downloads`,
            defaultMessage: `This {package} has {downloadsCount} weekly downloads`
          },
          {
            downloadsCount: npmDownloads,
            package: npmPackageType
          }
        ),
        children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral800", children: npmDownloads })
      }
    )
  ] });
};
const VerticalDivider = styled(Divider)`
  width: ${pxToRem(12)};
  transform: rotate(90deg);
`;
const NpmPackagesGrid = ({
  status,
  npmPackages = [],
  installedPackageNames = [],
  useYarn,
  isInDevelopmentMode,
  npmPackageType,
  strapiAppVersion,
  debouncedSearch
}) => {
  const { formatMessage } = useIntl();
  if (status === "error") {
    return /* @__PURE__ */ jsx(Flex, { paddingTop: 8, children: /* @__PURE__ */ jsx(AnErrorOccurred, {}) });
  }
  if (status === "loading") {
    return /* @__PURE__ */ jsx(Flex, { justifyContent: "center", paddingTop: 8, children: /* @__PURE__ */ jsx(Loader, { children: "Loading content..." }) });
  }
  const emptySearchMessage = formatMessage(
    {
      id: "admin.pages.MarketPlacePage.search.empty",
      defaultMessage: 'No result for "{target}"'
    },
    { target: debouncedSearch }
  );
  if (npmPackages.length === 0) {
    return /* @__PURE__ */ jsxs(Box, { position: "relative", children: [
      /* @__PURE__ */ jsx(GridLayout, { children: Array(12).fill(null).map((_, idx) => /* @__PURE__ */ jsx(EmptyPluginCard, { height: "234px", hasRadius: true }, idx)) }),
      /* @__PURE__ */ jsx(Box, { position: "absolute", top: 11, width: "100%", children: /* @__PURE__ */ jsxs(Flex, { alignItems: "center", justifyContent: "center", direction: "column", children: [
        /* @__PURE__ */ jsx(Icon, { as: EmptyDocuments, color: void 0, width: "160px", height: "88px" }),
        /* @__PURE__ */ jsx(Box, { paddingTop: 6, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "p", textColor: "neutral600", children: emptySearchMessage }) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsx(Grid, { gap: 4, children: npmPackages.map((npmPackage) => /* @__PURE__ */ jsx(GridItem, { col: 4, s: 6, xs: 12, style: { height: "100%" }, children: /* @__PURE__ */ jsx(
    NpmPackageCard,
    {
      npmPackage,
      isInstalled: installedPackageNames.includes(npmPackage.attributes.npmPackageName),
      useYarn,
      isInDevelopmentMode,
      npmPackageType,
      strapiAppVersion
    }
  ) }, npmPackage.id)) });
};
const EmptyPluginCard = styled(Box)`
  background: ${({ theme }) => `linear-gradient(180deg, rgba(234, 234, 239, 0) 0%, ${theme.colors.neutral150} 100%)`};
  opacity: 0.33;
`;
const PageHeader = ({ isOnline, npmPackageType = "plugin" }) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const tracking = npmPackageType === "provider" ? "didSubmitProvider" : "didSubmitPlugin";
  return /* @__PURE__ */ jsx(
    HeaderLayout,
    {
      title: formatMessage({
        id: "global.marketplace",
        defaultMessage: "Marketplace"
      }),
      subtitle: formatMessage({
        id: "admin.pages.MarketPlacePage.subtitle",
        defaultMessage: "Get more out of Strapi"
      }),
      primaryAction: isOnline && /* @__PURE__ */ jsx(
        LinkButton,
        {
          startIcon: /* @__PURE__ */ jsx(Upload, {}),
          variant: "tertiary",
          href: `https://market.strapi.io/submit-${npmPackageType}`,
          onClick: () => trackUsage(tracking),
          isExternal: true,
          children: formatMessage({
            id: `admin.pages.MarketPlacePage.submit.${npmPackageType}.link`,
            defaultMessage: `Submit ${npmPackageType}`
          })
        }
      )
    }
  );
};
const OfflineLayout = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(PageHeader, {}),
    /* @__PURE__ */ jsxs(
      Flex,
      {
        width: "100%",
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: pxToRem(120),
        children: [
          /* @__PURE__ */ jsx(Box, { paddingBottom: 2, children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral700", variant: "alpha", children: formatMessage({
            id: "admin.pages.MarketPlacePage.offline.title",
            defaultMessage: "You are offline"
          }) }) }),
          /* @__PURE__ */ jsx(Box, { paddingBottom: 6, children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral700", variant: "epsilon", children: formatMessage({
            id: "admin.pages.MarketPlacePage.offline.subtitle",
            defaultMessage: "You need to be connected to the Internet to access Strapi Market."
          }) }) }),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              width: "88",
              height: "88",
              viewBox: "0 0 88 88",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ jsx("rect", { x: ".5", y: ".5", width: "87", height: "87", rx: "43.5", fill: "#F0F0FF" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M34 39.3h-4c-2.6 0-4.7 1-6.6 2.8a9 9 0 0 0-2.7 6.6 9 9 0 0 0 2.7 6.6A9 9 0 0 0 30 58h22.8L34 39.3Zm-11-11 3-3 39 39-3 3-4.7-4.6H30a13.8 13.8 0 0 1-14-14c0-3.8 1.3-7 4-9.7 2.6-2.7 5.7-4.2 9.5-4.3L23 28.2Zm38.2 11.1c3 .2 5.5 1.5 7.6 3.7A11 11 0 0 1 72 51c0 4-1.6 7.2-5 9.5l-3.3-3.4a6.5 6.5 0 0 0 3.6-6.1c0-1.9-.7-3.5-2-5-1.5-1.3-3.1-2-5-2h-3.5v-1.2c0-3.6-1.2-6.6-3.7-9a13 13 0 0 0-15-2.3L34.6 28a17 17 0 0 1 20.3 1.5c3.5 2.7 5.5 6 6.3 10Z",
                    fill: "#4945FF"
                  }
                ),
                /* @__PURE__ */ jsx("rect", { x: ".5", y: ".5", width: "87", height: "87", rx: "43.5", stroke: "#D9D8FF" })
              ]
            }
          )
        ]
      }
    )
  ] }) });
};
const SORT_TYPES = {
  "name:asc": {
    selected: {
      id: "admin.pages.MarketPlacePage.sort.alphabetical.selected",
      defaultMessage: "Sort by alphabetical order"
    },
    option: {
      id: "admin.pages.MarketPlacePage.sort.alphabetical",
      defaultMessage: "Alphabetical order"
    }
  },
  "submissionDate:desc": {
    selected: {
      id: "admin.pages.MarketPlacePage.sort.newest.selected",
      defaultMessage: "Sort by newest"
    },
    option: {
      id: "admin.pages.MarketPlacePage.sort.newest",
      defaultMessage: "Newest"
    }
  },
  "githubStars:desc": {
    selected: {
      id: "admin.pages.MarketPlacePage.sort.githubStars.selected",
      defaultMessage: "Sort by GitHub stars"
    },
    option: {
      id: "admin.pages.MarketPlacePage.sort.githubStars",
      defaultMessage: "Number of GitHub stars"
    }
  },
  "npmDownloads:desc": {
    selected: {
      id: "admin.pages.MarketPlacePage.sort.npmDownloads.selected",
      defaultMessage: "Sort by npm downloads"
    },
    option: {
      id: "admin.pages.MarketPlacePage.sort.npmDownloads",
      defaultMessage: "Number of downloads"
    }
  }
};
const SortSelect = ({ sortQuery, handleSelectChange }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(SelectWrapper, { children: /* @__PURE__ */ jsx(
    SingleSelect,
    {
      size: "S",
      id: "sort-by-select",
      value: sortQuery,
      customizeContent: () => formatMessage(SORT_TYPES[sortQuery].selected),
      onChange: (sortName) => {
        handleSelectChange({ sort: sortName });
      },
      label: formatMessage({
        id: "admin.pages.MarketPlacePage.sort.label",
        defaultMessage: "Sort by"
      }),
      children: Object.entries(SORT_TYPES).map(([sortName, messages]) => {
        return /* @__PURE__ */ jsx(SingleSelectOption, { value: sortName, children: formatMessage(messages.option) }, sortName);
      })
    }
  ) });
};
const SelectWrapper = styled(Box)`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  span {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  /* Hide the label, every input needs a label. */
  label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;
const MARKETPLACE_API_URL = "https://market-api.strapi.io";
function useMarketplaceData({
  npmPackageType,
  debouncedSearch,
  query,
  tabQuery
}) {
  const { notifyStatus } = useNotifyAT();
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const marketplaceTitle = formatMessage({
    id: "global.marketplace",
    defaultMessage: "Marketplace"
  });
  const notifyMarketplaceLoad = () => {
    notifyStatus(
      formatMessage(
        {
          id: "app.utils.notify.data-loaded",
          defaultMessage: "The {target} has loaded"
        },
        { target: marketplaceTitle }
      )
    );
  };
  const paginationParams = {
    page: query?.page || 1,
    pageSize: query?.pageSize || 24
  };
  const pluginParams = {
    ...tabQuery.plugin,
    pagination: paginationParams,
    search: debouncedSearch
  };
  const { data: pluginsResponse, status: pluginsStatus } = useQuery(
    ["marketplace", "plugins", pluginParams],
    async () => {
      try {
        const queryString = qs.stringify(pluginParams);
        const res = await fetch(`${MARKETPLACE_API_URL}/plugins?${queryString}`);
        if (!res.ok) {
          throw new Error("Failed to fetch marketplace plugins.");
        }
        const data = await res.json();
        return data;
      } catch (error) {
      }
      return null;
    },
    {
      onSuccess() {
        notifyMarketplaceLoad();
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error", defaultMessage: "An error occured" }
        });
      }
    }
  );
  const providerParams = {
    ...tabQuery.provider,
    pagination: paginationParams,
    search: debouncedSearch
  };
  const { data: providersResponse, status: providersStatus } = useQuery(
    ["marketplace", "providers", providerParams],
    async () => {
      const queryString = qs.stringify(providerParams);
      const res = await fetch(`${MARKETPLACE_API_URL}/providers?${queryString}`);
      if (!res.ok) {
        throw new Error("Failed to fetch marketplace providers.");
      }
      const data = await res.json();
      return data;
    },
    {
      onSuccess() {
        notifyMarketplaceLoad();
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error", defaultMessage: "An error occured" }
        });
      }
    }
  );
  const npmPackageTypeResponse = npmPackageType === "plugin" ? pluginsResponse : providersResponse;
  const possibleCollections = npmPackageTypeResponse?.meta.collections ?? {};
  const possibleCategories = pluginsResponse?.meta.categories ?? {};
  const { pagination } = npmPackageTypeResponse?.meta ?? {};
  return {
    pluginsResponse,
    providersResponse,
    pluginsStatus,
    providersStatus,
    possibleCollections,
    possibleCategories,
    pagination
  };
}
const useNavigatorOnline = () => {
  const onlineStatus = typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
  const [isOnline, setIsOnline] = React.useState(onlineStatus);
  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);
  React.useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  return isOnline;
};
const MarketplacePage = () => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const toggleNotification = useNotification();
  const [{ query }, setQuery] = useQueryParams();
  const debouncedSearch = useDebounce(query?.search, 500) || "";
  const { autoReload: isInDevelopmentMode, dependencies, useYarn, strapiVersion } = useAppInfo();
  const isOnline = useNavigatorOnline();
  const npmPackageType = query?.npmPackageType || "plugin";
  const [tabQuery, setTabQuery] = React.useState({
    plugin: npmPackageType === "plugin" ? { ...query } : {},
    provider: npmPackageType === "provider" ? { ...query } : {}
  });
  useFocusWhenNavigate();
  React.useEffect(() => {
    trackUsage("didGoToMarketplace");
  }, [trackUsage]);
  React.useEffect(() => {
    if (!isInDevelopmentMode) {
      toggleNotification({
        type: "info",
        message: {
          id: "admin.pages.MarketPlacePage.production",
          defaultMessage: "Manage plugins from the development environment"
        }
      });
    }
  }, [toggleNotification, isInDevelopmentMode]);
  const {
    pluginsResponse,
    providersResponse,
    pluginsStatus,
    providersStatus,
    possibleCollections,
    possibleCategories,
    pagination
  } = useMarketplaceData({ npmPackageType, debouncedSearch, query, tabQuery });
  if (!isOnline) {
    return /* @__PURE__ */ jsx(OfflineLayout, {});
  }
  const handleTabChange = (selected) => {
    const selectedTab = selected === 0 ? "plugin" : "provider";
    const hasTabQuery = tabQuery[selectedTab] && Object.keys(tabQuery[selectedTab]).length;
    if (hasTabQuery) {
      setQuery({
        // Keep filters and search
        ...tabQuery[selectedTab],
        search: query?.search || "",
        // Set tab and reset page
        npmPackageType: selectedTab,
        page: 1
      });
    } else {
      setQuery({
        // Set tab
        npmPackageType: selectedTab,
        // Clear filters
        collections: [],
        categories: [],
        sort: "name:asc",
        page: 1,
        // Keep search
        search: query?.search || ""
      });
    }
  };
  const handleSelectChange = (update) => {
    setQuery({ ...update, page: 1 });
    setTabQuery((prev) => ({
      ...prev,
      [npmPackageType]: { ...prev[npmPackageType], ...update }
    }));
  };
  const handleSelectClear = (filterType) => {
    setQuery({ [filterType]: [], page: void 0 }, "remove");
    setTabQuery((prev) => ({ ...prev, [npmPackageType]: {} }));
  };
  const handleSortSelectChange = ({ sort }) => (
    // @ts-expect-error - this is a narrowing issue.
    handleSelectChange({ sort })
  );
  const installedPackageNames = Object.keys(dependencies ?? {});
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(
      Helmet,
      {
        title: formatMessage({
          id: "admin.pages.MarketPlacePage.helmet",
          defaultMessage: "Marketplace - Plugins"
        })
      }
    ),
    /* @__PURE__ */ jsx(PageHeader, { isOnline, npmPackageType }),
    /* @__PURE__ */ jsxs(ContentLayout, { children: [
      /* @__PURE__ */ jsxs(
        TabGroup,
        {
          label: formatMessage({
            id: "admin.pages.MarketPlacePage.tab-group.label",
            defaultMessage: "Plugins and Providers for Strapi"
          }),
          id: "tabs",
          variant: "simple",
          initialSelectedTabIndex: ["plugin", "provider"].indexOf(npmPackageType),
          onTabChange: handleTabChange,
          children: [
            /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", paddingBottom: 4, children: [
              /* @__PURE__ */ jsxs(Tabs, { children: [
                /* @__PURE__ */ jsxs(Tab, { children: [
                  formatMessage({
                    id: "admin.pages.MarketPlacePage.plugins",
                    defaultMessage: "Plugins"
                  }),
                  " ",
                  pluginsResponse ? `(${pluginsResponse.meta.pagination.total})` : "..."
                ] }),
                /* @__PURE__ */ jsxs(Tab, { children: [
                  formatMessage({
                    id: "admin.pages.MarketPlacePage.providers",
                    defaultMessage: "Providers"
                  }),
                  " ",
                  providersResponse ? `(${providersResponse.meta.pagination.total})` : "..."
                ] })
              ] }),
              /* @__PURE__ */ jsx(Box, { width: "25%", children: /* @__PURE__ */ jsx(
                Searchbar,
                {
                  name: "searchbar",
                  onClear: () => setQuery({ search: "", page: 1 }),
                  value: query?.search,
                  onChange: (e) => setQuery({ search: e.target.value, page: 1 }),
                  clearLabel: formatMessage({
                    id: "admin.pages.MarketPlacePage.search.clear",
                    defaultMessage: "Clear the search"
                  }),
                  placeholder: formatMessage({
                    id: "admin.pages.MarketPlacePage.search.placeholder",
                    defaultMessage: "Search"
                  }),
                  children: formatMessage({
                    id: "admin.pages.MarketPlacePage.search.placeholder",
                    defaultMessage: "Search"
                  })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs(Flex, { paddingBottom: 4, gap: 2, children: [
              /* @__PURE__ */ jsx(
                SortSelect,
                {
                  sortQuery: query?.sort || "name:asc",
                  handleSelectChange: handleSortSelectChange
                }
              ),
              /* @__PURE__ */ jsx(
                NpmPackagesFilters,
                {
                  npmPackageType,
                  possibleCollections,
                  possibleCategories,
                  query: query || {},
                  handleSelectChange,
                  handleSelectClear
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(TabPanels, { children: [
              /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
                NpmPackagesGrid,
                {
                  npmPackages: pluginsResponse?.data,
                  status: pluginsStatus,
                  installedPackageNames,
                  useYarn,
                  isInDevelopmentMode,
                  npmPackageType: "plugin",
                  strapiAppVersion: strapiVersion,
                  debouncedSearch
                }
              ) }),
              /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
                NpmPackagesGrid,
                {
                  npmPackages: providersResponse?.data,
                  status: providersStatus,
                  installedPackageNames,
                  useYarn,
                  isInDevelopmentMode,
                  npmPackageType: "provider",
                  debouncedSearch
                }
              ) })
            ] })
          ]
        }
      ),
      pagination ? /* @__PURE__ */ jsx(Box, { paddingTop: 4, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "flex-end", justifyContent: "space-between", children: [
        /* @__PURE__ */ jsx(PageSizeURLQuery, { options: ["12", "24", "50", "100"], defaultValue: "24" }),
        /* @__PURE__ */ jsx(PaginationURLQuery, { pagination })
      ] }) }) : null,
      /* @__PURE__ */ jsx(Box, { paddingTop: 8, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://strapi.canny.io/plugin-requests",
          target: "_blank",
          rel: "noopener noreferrer nofollow",
          style: { textDecoration: "none" },
          onClick: () => trackUsage("didMissMarketplacePlugin"),
          children: /* @__PURE__ */ jsx(
            ContentBox,
            {
              title: formatMessage({
                id: "admin.pages.MarketPlacePage.missingPlugin.title",
                defaultMessage: "Documentation"
              }),
              subtitle: formatMessage({
                id: "admin.pages.MarketPlacePage.missingPlugin.description",
                defaultMessage: "Tell us what plugin you are looking for and we'll let our community plugin developers know in case they are in search for inspiration!"
              }),
              icon: /* @__PURE__ */ jsx(GlassesSquare, {}),
              iconBackground: "alternative100",
              endAction: /* @__PURE__ */ jsx(Icon, { as: ExternalLink, color: "neutral600", width: 3, height: 3, marginLeft: 2 })
            }
          )
        }
      ) })
    ] })
  ] }) });
};
const ProtectedMarketplacePage = () => {
  const permissions = useSelector(selectAdminPermissions);
  return (
    // @ts-expect-error – the selector is not typed.
    /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: permissions.marketplace.main, children: /* @__PURE__ */ jsx(MarketplacePage, {}) })
  );
};
export {
  MarketplacePage,
  ProtectedMarketplacePage
};
//# sourceMappingURL=MarketplacePage-76235b44.mjs.map
