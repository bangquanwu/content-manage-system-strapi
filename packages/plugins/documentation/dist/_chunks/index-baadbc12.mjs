import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Layout, ContentLayout, Box, Main, HeaderLayout, Table, Thead, Tr, Th, Typography, Tbody, Td, Flex, IconButton, LinkButton } from "@strapi/design-system";
import { useFocusWhenNavigate, useRBAC, AnErrorOccurred, LoadingIndicatorPage, EmptyStateLayout, ConfirmDialog } from "@strapi/helper-plugin";
import { Eye, Refresh, Trash } from "@strapi/icons";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { P as PERMISSIONS } from "./index-972b74ea.mjs";
import { u as useDocumentation, g as getTrad } from "./useDocumentation-b1901301.mjs";
import "react-query";
const PluginPage = () => {
  useFocusWhenNavigate();
  const { formatMessage } = useIntl();
  const { data, isLoading, isError, remove, regenerate } = useDocumentation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = useState(false);
  const [versionToDelete, setVersionToDelete] = useState();
  const { allowedActions } = useRBAC(PERMISSIONS);
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
    id: getTrad("plugin.name"),
    defaultMessage: "Documentation"
  });
  if (isError) {
    return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(Box, { paddingTop: 8, children: /* @__PURE__ */ jsx(AnErrorOccurred, {}) }) }) });
  }
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(Helmet, { title }),
    /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title,
          subtitle: formatMessage({
            id: getTrad("pages.PluginPage.header.description"),
            defaultMessage: "Configure the documentation plugin"
          }),
          primaryAction: /* @__PURE__ */ jsx(
            OpenDocLink,
            {
              disabled: !allowedActions.canOpen || !data?.currentVersion || !data?.prefix,
              href: createDocumentationHref(`${data?.prefix}/v${data?.currentVersion}`),
              startIcon: /* @__PURE__ */ jsx(Eye, {}),
              children: formatMessage({
                id: getTrad("pages.PluginPage.Button.open"),
                defaultMessage: "Open Documentation"
              })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(ContentLayout, { children: [
        isLoading && /* @__PURE__ */ jsx(LoadingIndicatorPage, { children: "Plugin is loading" }),
        data?.docVersions.length ? /* @__PURE__ */ jsxs(Table, { colCount, rowCount, children: [
          /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: getTrad("pages.PluginPage.table.version"),
              defaultMessage: "Version"
            }) }) }),
            /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
              id: getTrad("pages.PluginPage.table.generated"),
              defaultMessage: "Last Generated"
            }) }) })
          ] }) }),
          /* @__PURE__ */ jsx(Tbody, { children: data.docVersions.sort((a, b) => a.generatedDate < b.generatedDate ? 1 : -1).map((doc) => /* @__PURE__ */ jsxs(Tr, { children: [
            /* @__PURE__ */ jsx(Td, { width: "50%", children: /* @__PURE__ */ jsx(Typography, { children: doc.version }) }),
            /* @__PURE__ */ jsx(Td, { width: "50%", children: /* @__PURE__ */ jsx(Typography, { children: doc.generatedDate }) }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "end", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsx(
                IconButton,
                {
                  forwardedAs: "a",
                  disabled: !allowedActions.canOpen,
                  href: createDocumentationHref(`${data.prefix}/v${doc.version}`),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsx(Eye, {}),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  label: formatMessage(
                    {
                      id: getTrad("pages.PluginPage.table.icon.show"),
                      defaultMessage: "Open {target}"
                    },
                    { target: `${doc.version}` }
                  )
                }
              ),
              allowedActions.canRegenerate ? /* @__PURE__ */ jsx(
                IconButton,
                {
                  onClick: () => handleRegenerateDoc(doc.version),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsx(Refresh, {}),
                  label: formatMessage(
                    {
                      id: getTrad("pages.PluginPage.table.icon.regenerate"),
                      defaultMessage: "Regenerate {target}"
                    },
                    { target: `${doc.version}` }
                  )
                }
              ) : null,
              allowedActions.canUpdate && doc.version !== data.currentVersion ? /* @__PURE__ */ jsx(
                IconButton,
                {
                  onClick: () => handleClickDelete(doc.version),
                  noBorder: true,
                  icon: /* @__PURE__ */ jsx(Trash, {}),
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
        ] }) : /* @__PURE__ */ jsx(EmptyStateLayout, {})
      ] }),
      /* @__PURE__ */ jsx(
        ConfirmDialog,
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
const OpenDocLink = styled(LinkButton)`
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
export {
  PluginPage as default
};
//# sourceMappingURL=index-baadbc12.mjs.map
