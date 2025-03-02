import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Icon, FieldInput, CarouselInput, CarouselActions, IconButton, CarouselSlide, Box, ModalLayout, ModalHeader, Typography, TabGroup, Tabs, Tab, Divider, TabPanels, TabPanel, TextInput, ModalFooter, Button, Field, Flex, FieldError, Card, CardHeader, CardAsset, CardBody, CardContent, CardTitle, CardSubtitle, CardBadge, Layout, Main, HeaderLayout, ContentLayout, Grid, GridItem } from "@strapi/design-system";
import { useRBACProvider, useAppInfo, useStrapiApp, hasPermissions, useTracking, pxToRem, useRBAC, useFocusWhenNavigate, SettingsPageTitle, LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { useLocation, NavLink, useParams, Redirect, Switch, Route } from "react-router-dom";
import { s as selectAdminPermissions, m as SETTINGS_LINKS_CE, i as useEnterprise, u as useConfiguration, c as createRoute } from "./index-90ba4fba.mjs";
import sortBy from "lodash/sortBy";
import { useSelector } from "react-redux";
import { SubNav, SubNavHeader, SubNavSections, SubNavSection, SubNavLink } from "@strapi/design-system/v2";
import { Lock, Plus, Refresh, PicturePlus, Check } from "@strapi/icons";
import styled from "styled-components";
import { createContext } from "@radix-ui/react-context";
import axios, { AxiosError } from "axios";
import "react-dom/client";
import "invariant";
import "lodash/isFunction";
import "lodash/merge";
import "lodash/pick";
import "react-query";
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
const formatLinks = (menu) => menu.map((menuSection) => {
  const formattedLinks = menuSection.links.map((link) => ({
    ...link,
    isDisplayed: false
  }));
  return { ...menuSection, links: formattedLinks };
});
const useSettingsMenu = () => {
  const [{ isLoading, menu }, setData] = React.useState({
    isLoading: true,
    menu: []
  });
  const { allPermissions: userPermissions } = useRBACProvider();
  const { shouldUpdateStrapi } = useAppInfo();
  const { settings } = useStrapiApp();
  const permissions = useSelector(selectAdminPermissions);
  const ceLinks = React.useMemo(() => SETTINGS_LINKS_CE(), []);
  const { admin: adminLinks, global: globalLinks } = useEnterprise(
    ceLinks,
    async () => (await import("./constants-6ecddc43.mjs")).SETTINGS_LINKS_EE(),
    {
      combine(ceLinks2, eeLinks) {
        return {
          admin: [...eeLinks.admin, ...ceLinks2.admin],
          global: [...ceLinks2.global, ...eeLinks.global]
        };
      },
      defaultValue: {
        admin: [],
        global: []
      }
    }
  );
  const addPermissions = React.useCallback(
    (link) => {
      if (!link.id) {
        throw new Error("The settings menu item must have an id attribute.");
      }
      return {
        ...link,
        permissions: permissions.settings?.[link.id]?.main ?? []
      };
    },
    [permissions.settings]
  );
  React.useEffect(() => {
    const getData = async () => {
      const buildMenuPermissions = (sections2) => Promise.all(
        sections2.reduce((acc, section, sectionIndex) => {
          const linksWithPermissions = section.links.map(async (link, linkIndex) => ({
            hasPermission: await hasPermissions(userPermissions, link.permissions),
            sectionIndex,
            linkIndex
          }));
          return [...acc, ...linksWithPermissions];
        }, [])
      );
      const menuPermissions = await buildMenuPermissions(sections);
      setData((prev) => {
        return {
          ...prev,
          isLoading: false,
          menu: sections.map((section, sectionIndex) => ({
            ...section,
            links: section.links.map((link, linkIndex) => {
              const permission = menuPermissions.find(
                (permission2) => permission2.sectionIndex === sectionIndex && permission2.linkIndex === linkIndex
              );
              return {
                ...link,
                isDisplayed: Boolean(permission?.hasPermission)
              };
            })
          }))
        };
      });
    };
    const { global, ...otherSections } = settings;
    const sections = formatLinks([
      {
        ...global,
        links: sortBy([...global.links, ...globalLinks.map(addPermissions)], (link) => link.id).map(
          (link) => ({
            ...link,
            hasNotification: link.id === "000-application-infos" && shouldUpdateStrapi
          })
        )
      },
      {
        id: "permissions",
        intlLabel: { id: "Settings.permissions", defaultMessage: "Administration Panel" },
        links: adminLinks.map(addPermissions)
      },
      ...Object.values(otherSections)
    ]);
    getData();
  }, [adminLinks, globalLinks, userPermissions, settings, shouldUpdateStrapi, addPermissions]);
  return {
    isLoading,
    menu: menu.map((menuItem) => ({
      ...menuItem,
      links: menuItem.links.filter((link) => link.isDisplayed)
    }))
  };
};
const CustomIcon = styled(Icon)`
  right: 15px;
  position: absolute;
`;
const SettingsNav = ({ menu }) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { pathname } = useLocation();
  const filteredMenu = menu.filter(
    (section) => !section.links.every((link) => link.isDisplayed === false)
  );
  const sections = filteredMenu.map((section) => {
    return {
      ...section,
      title: section.intlLabel,
      links: section.links.map((link) => {
        return {
          ...link,
          title: link.intlLabel,
          name: link.id
        };
      })
    };
  });
  const label = formatMessage({
    id: "global.settings",
    defaultMessage: "Settings"
  });
  const handleClickOnLink = (destination) => () => {
    trackUsage("willNavigate", { from: pathname, to: destination });
  };
  return /* @__PURE__ */ jsxs(SubNav, { ariaLabel: label, children: [
    /* @__PURE__ */ jsx(SubNavHeader, { label }),
    /* @__PURE__ */ jsx(SubNavSections, { children: sections.map((section) => /* @__PURE__ */ jsx(SubNavSection, { label: formatMessage(section.intlLabel), children: section.links.map((link) => {
      return /* @__PURE__ */ jsxs(
        SubNavLink,
        {
          as: NavLink,
          withBullet: link.hasNotification,
          to: link.to,
          onClick: handleClickOnLink(link.to),
          children: [
            formatMessage(link.intlLabel),
            link?.lockIcon && /* @__PURE__ */ jsx(CustomIcon, { width: `${15 / 16}rem`, height: `${15 / 16}rem`, as: Lock })
          ]
        },
        link.id
      );
    }) }, section.id)) })
  ] });
};
const ROUTES_CE = [
  {
    async Component() {
      const { ProtectedListPage } = await import("./ListPage-96ea2cbe.mjs");
      return ProtectedListPage;
    },
    to: "/settings/roles",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreatePage } = await import("./CreatePage-7d38bec7.mjs");
      return ProtectedCreatePage;
    },
    to: "/settings/roles/duplicate/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreatePage } = await import("./CreatePage-7d38bec7.mjs");
      return ProtectedCreatePage;
    },
    to: "/settings/roles/new",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditPage } = await import("./EditPage-1bb753c7.mjs");
      return ProtectedEditPage;
    },
    to: "/settings/roles/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListPage } = await import("./ListPage-9ffbba4e.mjs");
      return ProtectedListPage;
    },
    to: "/settings/users",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditPage } = await import("./EditPage-88c5d745.mjs");
      return ProtectedEditPage;
    },
    to: "/settings/users/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreatePage } = await import("./CreatePage-d1dd9ba8.mjs");
      return ProtectedCreatePage;
    },
    to: "/settings/webhooks/create",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditPage } = await import("./EditPage-d64d3bd7.mjs").then((n) => n.b);
      return ProtectedEditPage;
    },
    to: "/settings/webhooks/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListPage } = await import("./ListPage-3d2b8330.mjs");
      return ProtectedListPage;
    },
    to: "/settings/webhooks",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListView } = await import("./ListView-b2087f3a.mjs");
      return ProtectedListView;
    },
    to: "/settings/api-tokens",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreateView } = await import("./CreateView-450e2197.mjs");
      return ProtectedCreateView;
    },
    to: "/settings/api-tokens/create",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditView } = await import("./EditViewPage-d84e2b08.mjs");
      return ProtectedEditView;
    },
    to: "/settings/api-tokens/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreateView } = await import("./CreateView-ccb4b5d8.mjs");
      return ProtectedCreateView;
    },
    to: "/settings/transfer-tokens/create",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListView } = await import("./ListView-a9702658.mjs");
      return ProtectedListView;
    },
    to: "/settings/transfer-tokens",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditView } = await import("./EditView-c627b52f.mjs");
      return ProtectedEditView;
    },
    to: "/settings/transfer-tokens/:id",
    exact: true
  },
  {
    async Component() {
      const { PurchaseAuditLogs } = await import("./PurchaseAuditLogs-e50bb68e.mjs");
      return PurchaseAuditLogs;
    },
    to: "/settings/purchase-audit-logs",
    exact: true
  },
  {
    async Component() {
      const { PurchaseReviewWorkflows } = await import("./PurchaseReviewWorkflows-72d34d9b.mjs");
      return PurchaseReviewWorkflows;
    },
    to: "/settings/purchase-review-workflows",
    exact: true
  },
  {
    async Component() {
      const { PurchaseSingleSignOn } = await import("./PurchaseSingleSignOn-70c10e60.mjs");
      return PurchaseSingleSignOn;
    },
    to: "/settings/purchase-single-sign-on",
    exact: true
  }
];
const DIMENSION = 750;
const SIZE = 100;
const ACCEPTED_FORMAT = ["image/jpeg", "image/png", "image/svg+xml"];
const FILE_FORMAT_ERROR_MESSAGE = {
  id: "Settings.application.customization.modal.upload.error-format",
  defaultMessage: "Wrong format uploaded (accepted formats only: jpeg, jpg, png, svg)."
};
const FILE_SIZING_ERROR_MESSAGE = {
  id: "Settings.application.customization.modal.upload.error-size",
  defaultMessage: "The file uploaded is too large (max dimension: {dimension}x{dimension}, max file size: {size}KB)"
};
const parseFileMetadatas = async (file) => {
  const isFormatAuthorized = ACCEPTED_FORMAT.includes(file.type);
  if (!isFormatAuthorized) {
    throw new ParsingFileError("File format", FILE_FORMAT_ERROR_MESSAGE);
  }
  const fileDimensions = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  const areDimensionsAuthorized = fileDimensions.width <= DIMENSION && fileDimensions.height <= DIMENSION;
  if (!areDimensionsAuthorized) {
    throw new ParsingFileError("File sizing", FILE_SIZING_ERROR_MESSAGE);
  }
  const asset = {
    ext: file.name.split(".").pop(),
    size: file.size / 1e3,
    name: file.name,
    url: URL.createObjectURL(file),
    rawFile: file,
    width: fileDimensions.width,
    height: fileDimensions.height
  };
  const isSizeAuthorized = asset.size <= SIZE;
  if (!isSizeAuthorized) {
    throw new ParsingFileError("File sizing", FILE_SIZING_ERROR_MESSAGE);
  }
  return asset;
};
class ParsingFileError extends Error {
  displayMessage;
  constructor(message, displayMessage, options) {
    super(message, options);
    this.displayMessage = displayMessage;
  }
}
const [LogoInputContextProvider, useLogoInputContext] = createContext("LogoInput");
const LogoInput = ({
  canUpdate,
  customLogo,
  defaultLogo,
  hint,
  label,
  onChangeLogo
}) => {
  const [localImage, setLocalImage] = React.useState();
  const [currentStep, setCurrentStep] = React.useState();
  const { formatMessage } = useIntl();
  const handleClose = () => {
    setLocalImage(void 0);
    setCurrentStep(void 0);
  };
  return /* @__PURE__ */ jsxs(
    LogoInputContextProvider,
    {
      setLocalImage,
      localImage,
      goToStep: setCurrentStep,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsx(
          CarouselInput,
          {
            label,
            selectedSlide: 0,
            hint,
            previousLabel: "",
            nextLabel: "",
            onNext: () => {
            },
            onPrevious: () => {
            },
            secondaryLabel: customLogo?.name || "logo.png",
            actions: /* @__PURE__ */ jsxs(CarouselActions, { children: [
              /* @__PURE__ */ jsx(
                IconButton,
                {
                  disabled: !canUpdate,
                  onClick: () => setCurrentStep("upload"),
                  label: formatMessage({
                    id: "Settings.application.customization.carousel.change-action",
                    defaultMessage: "Change logo"
                  }),
                  icon: /* @__PURE__ */ jsx(Plus, {})
                }
              ),
              customLogo?.url && /* @__PURE__ */ jsx(
                IconButton,
                {
                  disabled: !canUpdate,
                  onClick: () => onChangeLogo(null),
                  label: formatMessage({
                    id: "Settings.application.customization.carousel.reset-action",
                    defaultMessage: "Reset logo"
                  }),
                  icon: /* @__PURE__ */ jsx(Refresh, {})
                }
              )
            ] }),
            children: /* @__PURE__ */ jsx(
              CarouselSlide,
              {
                label: formatMessage({
                  id: "Settings.application.customization.carousel-slide.label",
                  defaultMessage: "Logo slide"
                }),
                children: /* @__PURE__ */ jsx(
                  Box,
                  {
                    maxHeight: "40%",
                    maxWidth: "40%",
                    as: "img",
                    src: customLogo?.url || defaultLogo,
                    alt: formatMessage({
                      id: "Settings.application.customization.carousel.title",
                      defaultMessage: "Logo"
                    })
                  }
                )
              }
            )
          }
        ),
        currentStep ? /* @__PURE__ */ jsxs(ModalLayout, { labelledBy: "modal", onClose: handleClose, children: [
          /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", as: "h2", id: "modal", children: formatMessage(
            currentStep === "upload" ? {
              id: "Settings.application.customization.modal.upload",
              defaultMessage: "Upload logo"
            } : {
              id: "Settings.application.customization.modal.pending",
              defaultMessage: "Pending logo"
            }
          ) }) }),
          currentStep === "upload" ? /* @__PURE__ */ jsx(AddLogoDialog, {}) : /* @__PURE__ */ jsx(PendingLogoDialog, { onChangeLogo })
        ] }) : null
      ]
    }
  );
};
const AddLogoDialog = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    TabGroup,
    {
      label: formatMessage({
        id: "Settings.application.customization.modal.tab.label",
        defaultMessage: "How do you want to upload your assets?"
      }),
      variant: "simple",
      children: [
        /* @__PURE__ */ jsxs(Box, { paddingLeft: 8, paddingRight: 8, children: [
          /* @__PURE__ */ jsxs(Tabs, { children: [
            /* @__PURE__ */ jsx(Tab, { children: formatMessage({
              id: "Settings.application.customization.modal.upload.from-computer",
              defaultMessage: "From computer"
            }) }),
            /* @__PURE__ */ jsx(Tab, { children: formatMessage({
              id: "Settings.application.customization.modal.upload.from-url",
              defaultMessage: "From url"
            }) })
          ] }),
          /* @__PURE__ */ jsx(Divider, {})
        ] }),
        /* @__PURE__ */ jsxs(TabPanels, { children: [
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ComputerForm, {}) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(URLForm, {}) })
        ] })
      ]
    }
  );
};
const URLForm = () => {
  const { formatMessage } = useIntl();
  const [logoUrl, setLogoUrl] = React.useState("");
  const [error, setError] = React.useState();
  const { setLocalImage, goToStep, onClose } = useLogoInputContext("URLForm");
  const handleChange = (e) => {
    setLogoUrl(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const url = data.get("logo-url");
    if (!url) {
      return;
    }
    try {
      const res = await axios.get(url.toString(), { responseType: "blob", timeout: 8e3 });
      const file = new File([res.data], res.config.url ?? "", {
        type: res.headers["content-type"]
      });
      const asset = await parseFileMetadatas(file);
      setLocalImage(asset);
      goToStep("pending");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          formatMessage({
            id: "Settings.application.customization.modal.upload.error-network",
            defaultMessage: "Network error"
          })
        );
      } else if (err instanceof ParsingFileError) {
        setError(formatMessage(err.displayMessage, { size: SIZE, dimension: DIMENSION }));
      } else {
        throw err;
      }
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsx(
      TextInput,
      {
        label: formatMessage({
          id: "Settings.application.customization.modal.upload.from-url.input-label",
          defaultMessage: "URL"
        }),
        error,
        onChange: handleChange,
        value: logoUrl,
        name: "logo-url"
      }
    ) }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
        endActions: /* @__PURE__ */ jsx(Button, { type: "submit", children: formatMessage({
          id: "Settings.application.customization.modal.upload.next",
          defaultMessage: "Next"
        }) })
      }
    )
  ] });
};
const ComputerForm = () => {
  const { formatMessage } = useIntl();
  const [dragOver, setDragOver] = React.useState(false);
  const [fileError, setFileError] = React.useState();
  const inputRef = React.useRef(null);
  const id = React.useId();
  const { setLocalImage, goToStep, onClose } = useLogoInputContext("ComputerForm");
  const handleDragEnter = () => setDragOver(true);
  const handleDragLeave = () => setDragOver(false);
  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const handleChange = async () => {
    handleDragLeave();
    if (!inputRef.current.files) {
      return;
    }
    const [file] = inputRef.current.files;
    try {
      const asset = await parseFileMetadatas(file);
      setLocalImage(asset);
      goToStep("pending");
    } catch (err) {
      if (err instanceof ParsingFileError) {
        setFileError(formatMessage(err.displayMessage, { size: SIZE, dimension: DIMENSION }));
        inputRef.current.focus();
      } else {
        throw err;
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsx(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsx(Field, { name: id, error: fileError, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
      /* @__PURE__ */ jsxs(
        Flex,
        {
          paddingTop: 9,
          paddingBottom: 7,
          hasRadius: true,
          justifyContent: "center",
          direction: "column",
          background: dragOver ? "primary100" : "neutral100",
          borderColor: dragOver ? "primary500" : fileError ? "danger600" : "neutral300",
          borderStyle: "dashed",
          borderWidth: "1px",
          position: "relative",
          onDragEnter: handleDragEnter,
          onDragLeave: handleDragLeave,
          children: [
            /* @__PURE__ */ jsx(
              Icon,
              {
                color: "primary600",
                width: pxToRem(60),
                height: pxToRem(60),
                as: PicturePlus,
                "aria-hidden": true
              }
            ),
            /* @__PURE__ */ jsx(Box, { paddingTop: 3, paddingBottom: 5, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "label", htmlFor: id, children: formatMessage({
              id: "Settings.application.customization.modal.upload.drag-drop",
              defaultMessage: "Drag and Drop here or"
            }) }) }),
            /* @__PURE__ */ jsx(
              FileInput,
              {
                accept: ACCEPTED_FORMAT.join(", "),
                type: "file",
                name: "files",
                tabIndex: -1,
                onChange: handleChange,
                ref: inputRef,
                id
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleClick, children: formatMessage({
              id: "Settings.application.customization.modal.upload.cta.browse",
              defaultMessage: "Browse files"
            }) }),
            /* @__PURE__ */ jsx(Box, { paddingTop: 6, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.application.customization.modal.upload.file-validation",
                defaultMessage: "Max dimension: {dimension}x{dimension}, Max size: {size}KB"
              },
              { size: SIZE, dimension: DIMENSION }
            ) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(FieldError, {})
    ] }) }) }) }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
          id: "Settings.application.customization.modal.cancel",
          defaultMessage: "Cancel"
        }) })
      }
    )
  ] });
};
const FileInput = styled(FieldInput)`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const PendingLogoDialog = ({ onChangeLogo }) => {
  const { formatMessage } = useIntl();
  const { localImage, setLocalImage, goToStep, onClose } = useLogoInputContext("PendingLogoDialog");
  const handleGoBack = () => {
    setLocalImage(void 0);
    goToStep("upload");
  };
  const handleUpload = () => {
    if (localImage) {
      onChangeLogo(localImage);
    }
    onClose();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", paddingBottom: 6, children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "Settings.application.customization.modal.pending.title",
            defaultMessage: "Logo ready to upload"
          }) }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral500", children: formatMessage({
            id: "Settings.application.customization.modal.pending.subtitle",
            defaultMessage: "Manage the chosen logo before uploading it"
          }) })
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: handleGoBack, variant: "secondary", children: formatMessage({
          id: "Settings.application.customization.modal.pending.choose-another",
          defaultMessage: "Choose another logo"
        }) })
      ] }),
      /* @__PURE__ */ jsx(Box, { maxWidth: pxToRem(180), children: localImage?.url ? /* @__PURE__ */ jsx(ImageCardAsset, { asset: localImage }) : null })
    ] }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
          id: "Settings.application.customization.modal.cancel",
          defaultMessage: "Cancel"
        }) }),
        endActions: /* @__PURE__ */ jsx(Button, { onClick: handleUpload, children: formatMessage({
          id: "Settings.application.customization.modal.pending.upload",
          defaultMessage: "Upload logo"
        }) })
      }
    )
  ] });
};
const ImageCardAsset = ({ asset }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardAsset, { size: "S", src: asset.url }) }),
    /* @__PURE__ */ jsxs(CardBody, { children: [
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: asset.name }),
        /* @__PURE__ */ jsx(CardSubtitle, { children: `${asset.ext?.toUpperCase()} - ${asset.width}✕${asset.height}` })
      ] }),
      /* @__PURE__ */ jsx(CardBadge, { children: formatMessage({
        id: "Settings.application.customization.modal.pending.card-badge",
        defaultMessage: "image"
      }) })
    ] })
  ] });
};
const AdminSeatInfoCE = () => null;
const ApplicationInfoPage = () => {
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { logos: serverLogos, updateProjectSettings } = useConfiguration();
  const [logos, setLogos] = React.useState({ menu: serverLogos.menu, auth: serverLogos.auth });
  const { settings } = useSelector(selectAdminPermissions);
  useAppInfo();
  const AdminSeatInfo = useEnterprise(
    AdminSeatInfoCE,
    async () => (await import("./AdminSeatInfo-10ada68d.mjs")).AdminSeatInfoEE
  );
  const {
    allowedActions: { canRead, canUpdate }
  } = useRBAC(settings ? settings["project-settings"] : {});
  useFocusWhenNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProjectSettings({
      authLogo: logos.auth.custom ?? null,
      menuLogo: logos.menu.custom ?? null
    });
  };
  const handleChangeLogo = (logo) => (newLogo) => {
    if (newLogo === null) {
      trackUsage("didClickResetLogo", {
        logo
      });
    }
    setLogos((prev) => ({
      ...prev,
      [logo]: {
        ...prev[logo],
        custom: newLogo
      }
    }));
  };
  React.useEffect(() => {
    setLogos({
      menu: serverLogos.menu,
      auth: serverLogos.auth
    });
  }, [serverLogos]);
  if (!AdminSeatInfo) {
    return null;
  }
  const isSaveDisabled = logos.auth.custom === serverLogos.auth.custom && logos.menu.custom === serverLogos.menu.custom;
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SettingsPageTitle,
      {
        name: formatMessage({
          id: "Settings.application.header",
          defaultMessage: "Application"
        })
      }
    ),
    /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title: formatMessage({
            id: "Settings.application.title",
            defaultMessage: "Overview"
          }),
          subtitle: formatMessage({
            id: "Settings.application.description",
            defaultMessage: "Administration panel’s global information"
          }),
          primaryAction: canUpdate && /* @__PURE__ */ jsx(Button, { disabled: isSaveDisabled, type: "submit", startIcon: /* @__PURE__ */ jsx(Check, {}), children: formatMessage({ id: "global.save", defaultMessage: "Save" }) })
        }
      ),
      /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: canRead && /* @__PURE__ */ jsxs(
        Box,
        {
          hasRadius: true,
          background: "neutral0",
          shadow: "tableShadow",
          paddingTop: 6,
          paddingBottom: 6,
          paddingRight: 7,
          paddingLeft: 7,
          children: [
            /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "h3", children: formatMessage({
              id: "Settings.application.customization",
              defaultMessage: "Customization"
            }) }),
            /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.application.customization.size-details",
                defaultMessage: "Max dimension: {dimension}×{dimension}, Max file size: {size}KB"
              },
              { dimension: DIMENSION, size: SIZE }
            ) }),
            /* @__PURE__ */ jsxs(Grid, { paddingTop: 4, gap: 4, children: [
              /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                LogoInput,
                {
                  canUpdate,
                  customLogo: logos.menu.custom,
                  defaultLogo: logos.menu.default,
                  hint: formatMessage({
                    id: "Settings.application.customization.menu-logo.carousel-hint",
                    defaultMessage: "Replace the logo in the main navigation"
                  }),
                  label: formatMessage({
                    id: "Settings.application.customization.carousel.menu-logo.title",
                    defaultMessage: "Menu logo"
                  }),
                  onChangeLogo: handleChangeLogo("menu")
                }
              ) }),
              /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                LogoInput,
                {
                  canUpdate,
                  customLogo: logos.auth.custom,
                  defaultLogo: logos.auth.default,
                  hint: formatMessage({
                    id: "Settings.application.customization.auth-logo.carousel-hint",
                    defaultMessage: "Replace the logo in the authentication pages"
                  }),
                  label: formatMessage({
                    id: "Settings.application.customization.carousel.auth-logo.title",
                    defaultMessage: "Auth logo"
                  }),
                  onChangeLogo: handleChangeLogo("auth")
                }
              ) })
            ] })
          ]
        }
      ) }) })
    ] }) })
  ] });
};
const SettingsPage = () => {
  const { settingId } = useParams();
  const { settings } = useStrapiApp();
  const { formatMessage } = useIntl();
  const { isLoading, menu } = useSettingsMenu();
  const routes = useEnterprise(
    ROUTES_CE,
    async () => (await import("./constants-5dfd7f18.mjs")).ROUTES_EE,
    {
      combine(ceRoutes, eeRoutes) {
        return [...ceRoutes, ...eeRoutes];
      },
      defaultValue: []
    }
  );
  const adminRoutes = React.useMemo(() => {
    return makeUniqueRoutes(routes).map(
      ({ to, Component, exact }) => createRoute(Component, to, exact)
    );
  }, [routes]);
  const pluginsRoutes = Object.values(settings).flatMap((section) => {
    const { links } = section;
    return links.map((link) => createRoute(link.Component, link.to, link.exact || false));
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx(LoadingIndicatorPage, {});
  }
  if (!settingId) {
    return /* @__PURE__ */ jsx(Redirect, { to: "/settings/application-infos" });
  }
  return /* @__PURE__ */ jsxs(Layout, { sideNav: /* @__PURE__ */ jsx(SettingsNav, { menu }), children: [
    /* @__PURE__ */ jsx(
      Helmet,
      {
        title: formatMessage({
          id: "global.settings",
          defaultMessage: "Settings"
        })
      }
    ),
    /* @__PURE__ */ jsxs(Switch, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/settings/application-infos", component: ApplicationInfoPage, exact: true }),
      adminRoutes,
      pluginsRoutes
    ] })
  ] });
};
const makeUniqueRoutes = (routes) => routes.filter(
  (route, index, refArray) => refArray.findIndex((obj) => obj.to === route.to) === index
);
export {
  SettingsPage,
  makeUniqueRoutes
};
//# sourceMappingURL=SettingsPage-2a690884.mjs.map
