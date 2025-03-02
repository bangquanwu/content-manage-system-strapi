"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const icons = require("@strapi/icons");
const reactHelmet = require("react-helmet");
const reactIntl = require("react-intl");
const styled = require("styled-components");
const index = require("./index-688ab74a.js");
const useDocumentation = require("./useDocumentation-0d618f15.js");
require("react-query");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const PluginPage = () => {
  helperPlugin.useFocusWhenNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const { data, isLoading, isError, remove, regenerate } = useDocumentation.useDocumentation();
  const [showConfirmDelete, setShowConfirmDelete] = react.useState(false);
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = react.useState(false);
  const [versionToDelete, setVersionToDelete] = react.useState();
  const { allowedActions } = helperPlugin.useRBAC(index.PERMISSIONS);
  const colCount = 4;
  const rowCount = (data?.docVersions?.length || 0) + 1;
  const handleRegenerateDoc = (version) => {
    regenerate.mutate({ version, prefix: data?.prefix });
  };
  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };
  const handleConfirmDelete = async () => {
    setIsConfirmButtonLoading(true);
    await remove.mutateAsync({ prefix: data?.prefix, version: versionToDelete });
    setShowConfirmDelete(!showConfirmDelete);
    setIsConfirmButtonLoading(false);
  };
  const handleClickDelete = (version) => {
    setVersionToDelete(version);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const title = formatMessage({
    id: useDocumentation.getTrad("plugin.name"),
    defaultMessage: "Documentation"
  });
  if (isError) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Layout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 8, children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.AnErrorOccurred, {}) }) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Layout, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactHelmet.Helmet, { title }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title,
          subtitle: formatMessage({
            id: useDocumentation.getTrad("pages.PluginPage.header.description"),
            defaultMessage: "Configure the documentation plugin"
          }),
          primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
            OpenDocLink,
            {
              disabled: !allowedActions.canOpen || !data?.currentVersion || !data?.prefix,
              href: createDocumentationHref(`${data?.prefix}/v${data?.currentVersion}`),
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {}),
              children: formatMessage({
                id: useDocumentation.getTrad("pages.PluginPage.Button.open"),
                defaultMessage: "Open Documentation"
              })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { children: [
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, { children: "Plugin is loading" }),
        data?.docVersions.length ? /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount, rowCount, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: useDocumentation.getTrad("pages.PluginPage.table.version"),
              defaultMessage: "Version"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: useDocumentation.getTrad("pages.PluginPage.table.generated"),
              defaultMessage: "Last Generated"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: data.docVersions.sort((a, b) => a.generatedDate < b.generatedDate ? 1 : -1).map((doc) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "50%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: doc.version }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "50%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: doc.generatedDate }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  forwardedAs: "a",
                  disabled: !allowedActions.canOpen,
                  href: createDocumentationHref(`${data.prefix}/v${doc.version}`),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {}),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  label: formatMessage(
                    {
                      id: useDocumentation.getTrad("pages.PluginPage.table.icon.show"),
                      defaultMessage: "Open {target}"
                    },
                    { target: `${doc.version}` }
                  )
                }
              ),
              allowedActions.canRegenerate ? /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  onClick: () => handleRegenerateDoc(doc.version),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Refresh, {}),
                  label: formatMessage(
                    {
                      id: useDocumentation.getTrad("pages.PluginPage.table.icon.regenerate"),
                      defaultMessage: "Regenerate {target}"
                    },
                    { target: `${doc.version}` }
                  )
                }
              ) : null,
              allowedActions.canUpdate && doc.version !== data.currentVersion ? /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  onClick: () => handleClickDelete(doc.version),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}),
                  label: formatMessage(
                    {
                      id: "global.delete-target",
                      defaultMessage: "Delete {target}"
                    },
                    { target: `${doc.version}` }
                  )
                }
              ) : null
            ] }) })
          ] }, doc.version)) })
        ] }) : /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.EmptyStateLayout, {})
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.ConfirmDialog,
        {
          isConfirmButtonLoading,
          onConfirm: handleConfirmDelete,
          onToggleDialog: handleShowConfirmDelete,
          isOpen: showConfirmDelete
        }
      )
    ] })
  ] });
};
const OpenDocLink = styled__default.default(designSystem.LinkButton)`
  text-decoration: none;
`;
const createDocumentationHref = (path) => {
  if (path.startsWith("http")) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${window.strapi.backendURL}${path}`;
  }
  return `${window.strapi.backendURL}/${path}`;
};
exports.default = PluginPage;
//# sourceMappingURL=index-201fd171.js.map
