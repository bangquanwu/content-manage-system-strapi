"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const reactHelmet = require("react-helmet");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-be8080e3.js");
const sortBy = require("lodash/sortBy");
const reactRedux = require("react-redux");
const v2 = require("@strapi/design-system/v2");
const Icons = require("@strapi/icons");
const styled = require("styled-components");
const reactContext = require("@radix-ui/react-context");
const axios = require("axios");
require("react-dom/client");
require("invariant");
require("lodash/isFunction");
require("lodash/merge");
require("lodash/pick");
require("react-query");
require("formik");
require("lodash/camelCase");
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
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const sortBy__default = /* @__PURE__ */ _interopDefault(sortBy);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const axios__default = /* @__PURE__ */ _interopDefault(axios);
const formatLinks = (menu) => menu.map((menuSection) => {
  const formattedLinks = menuSection.links.map((link) => ({
    ...link,
    isDisplayed: false
  }));
  return { ...menuSection, links: formattedLinks };
});
const useSettingsMenu = () => {
  const [{ isLoading, menu }, setData] = React__namespace.useState({
    isLoading: true,
    menu: []
  });
  const { allPermissions: userPermissions } = helperPlugin.useRBACProvider();
  const { shouldUpdateStrapi } = helperPlugin.useAppInfo();
  const { settings } = helperPlugin.useStrapiApp();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const ceLinks = React__namespace.useMemo(() => index.SETTINGS_LINKS_CE(), []);
  const { admin: adminLinks, global: globalLinks } = index.useEnterprise(
    ceLinks,
    async () => (await Promise.resolve().then(() => require("./constants-7596f6f3.js"))).SETTINGS_LINKS_EE(),
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
  const addPermissions = React__namespace.useCallback(
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
  React__namespace.useEffect(() => {
    const getData = async () => {
      const buildMenuPermissions = (sections2) => Promise.all(
        sections2.reduce((acc, section, sectionIndex) => {
          const linksWithPermissions = section.links.map(async (link, linkIndex) => ({
            hasPermission: await helperPlugin.hasPermissions(userPermissions, link.permissions),
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
        links: sortBy__default.default([...global.links, ...globalLinks.map(addPermissions)], (link) => link.id).map(
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
const CustomIcon = styled__default.default(designSystem.Icon)`
  right: 15px;
  position: absolute;
`;
const SettingsNav = ({ menu }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = helperPlugin.useTracking();
  const { pathname } = reactRouterDom.useLocation();
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
  return /* @__PURE__ */ jsxRuntime.jsxs(v2.SubNav, { ariaLabel: label, children: [
    /* @__PURE__ */ jsxRuntime.jsx(v2.SubNavHeader, { label }),
    /* @__PURE__ */ jsxRuntime.jsx(v2.SubNavSections, { children: sections.map((section) => /* @__PURE__ */ jsxRuntime.jsx(v2.SubNavSection, { label: formatMessage(section.intlLabel), children: section.links.map((link) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        v2.SubNavLink,
        {
          as: reactRouterDom.NavLink,
          withBullet: link.hasNotification,
          to: link.to,
          onClick: handleClickOnLink(link.to),
          children: [
            formatMessage(link.intlLabel),
            link?.lockIcon && /* @__PURE__ */ jsxRuntime.jsx(CustomIcon, { width: `${15 / 16}rem`, height: `${15 / 16}rem`, as: Icons.Lock })
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
      const { ProtectedListPage } = await Promise.resolve().then(() => require("./ListPage-45f4ae74.js"));
      return ProtectedListPage;
    },
    to: "/settings/roles",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreatePage } = await Promise.resolve().then(() => require("./CreatePage-eed6afc7.js"));
      return ProtectedCreatePage;
    },
    to: "/settings/roles/duplicate/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreatePage } = await Promise.resolve().then(() => require("./CreatePage-eed6afc7.js"));
      return ProtectedCreatePage;
    },
    to: "/settings/roles/new",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditPage } = await Promise.resolve().then(() => require("./EditPage-5f372cca.js"));
      return ProtectedEditPage;
    },
    to: "/settings/roles/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListPage } = await Promise.resolve().then(() => require("./ListPage-91c294c3.js"));
      return ProtectedListPage;
    },
    to: "/settings/users",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditPage } = await Promise.resolve().then(() => require("./EditPage-f81955a7.js"));
      return ProtectedEditPage;
    },
    to: "/settings/users/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreatePage } = await Promise.resolve().then(() => require("./CreatePage-c9973934.js"));
      return ProtectedCreatePage;
    },
    to: "/settings/webhooks/create",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditPage } = await Promise.resolve().then(() => require("./EditPage-11674462.js")).then((n) => n.EditPage$1);
      return ProtectedEditPage;
    },
    to: "/settings/webhooks/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListPage } = await Promise.resolve().then(() => require("./ListPage-4d3cf108.js"));
      return ProtectedListPage;
    },
    to: "/settings/webhooks",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListView } = await Promise.resolve().then(() => require("./ListView-fc1ff63a.js"));
      return ProtectedListView;
    },
    to: "/settings/api-tokens",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreateView } = await Promise.resolve().then(() => require("./CreateView-82e4ec00.js"));
      return ProtectedCreateView;
    },
    to: "/settings/api-tokens/create",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditView } = await Promise.resolve().then(() => require("./EditViewPage-84cb226f.js"));
      return ProtectedEditView;
    },
    to: "/settings/api-tokens/:id",
    exact: true
  },
  {
    async Component() {
      const { ProtectedCreateView } = await Promise.resolve().then(() => require("./CreateView-b08e4e64.js"));
      return ProtectedCreateView;
    },
    to: "/settings/transfer-tokens/create",
    exact: true
  },
  {
    async Component() {
      const { ProtectedListView } = await Promise.resolve().then(() => require("./ListView-544370fd.js"));
      return ProtectedListView;
    },
    to: "/settings/transfer-tokens",
    exact: true
  },
  {
    async Component() {
      const { ProtectedEditView } = await Promise.resolve().then(() => require("./EditView-75e078d2.js"));
      return ProtectedEditView;
    },
    to: "/settings/transfer-tokens/:id",
    exact: true
  },
  {
    async Component() {
      const { PurchaseAuditLogs } = await Promise.resolve().then(() => require("./PurchaseAuditLogs-a9c1457c.js"));
      return PurchaseAuditLogs;
    },
    to: "/settings/purchase-audit-logs",
    exact: true
  },
  {
    async Component() {
      const { PurchaseReviewWorkflows } = await Promise.resolve().then(() => require("./PurchaseReviewWorkflows-afa3d8ae.js"));
      return PurchaseReviewWorkflows;
    },
    to: "/settings/purchase-review-workflows",
    exact: true
  },
  {
    async Component() {
      const { PurchaseSingleSignOn } = await Promise.resolve().then(() => require("./PurchaseSingleSignOn-b84a4ad2.js"));
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
const [LogoInputContextProvider, useLogoInputContext] = reactContext.createContext("LogoInput");
const LogoInput = ({
  canUpdate,
  customLogo,
  defaultLogo,
  hint,
  label,
  onChangeLogo
}) => {
  const [localImage, setLocalImage] = React__namespace.useState();
  const [currentStep, setCurrentStep] = React__namespace.useState();
  const { formatMessage } = reactIntl.useIntl();
  const handleClose = () => {
    setLocalImage(void 0);
    setCurrentStep(void 0);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    LogoInputContextProvider,
    {
      setLocalImage,
      localImage,
      goToStep: setCurrentStep,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.CarouselInput,
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
            actions: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CarouselActions, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  disabled: !canUpdate,
                  onClick: () => setCurrentStep("upload"),
                  label: formatMessage({
                    id: "Settings.application.customization.carousel.change-action",
                    defaultMessage: "Change logo"
                  }),
                  icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {})
                }
              ),
              customLogo?.url && /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  disabled: !canUpdate,
                  onClick: () => onChangeLogo(null),
                  label: formatMessage({
                    id: "Settings.application.customization.carousel.reset-action",
                    defaultMessage: "Reset logo"
                  }),
                  icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Refresh, {})
                }
              )
            ] }),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.CarouselSlide,
              {
                label: formatMessage({
                  id: "Settings.application.customization.carousel-slide.label",
                  defaultMessage: "Logo slide"
                }),
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Box,
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
        currentStep ? /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ModalLayout, { labelledBy: "modal", onClose: handleClose, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", as: "h2", id: "modal", children: formatMessage(
            currentStep === "upload" ? {
              id: "Settings.application.customization.modal.upload",
              defaultMessage: "Upload logo"
            } : {
              id: "Settings.application.customization.modal.pending",
              defaultMessage: "Pending logo"
            }
          ) }) }),
          currentStep === "upload" ? /* @__PURE__ */ jsxRuntime.jsx(AddLogoDialog, {}) : /* @__PURE__ */ jsxRuntime.jsx(PendingLogoDialog, { onChangeLogo })
        ] }) : null
      ]
    }
  );
};
const AddLogoDialog = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.TabGroup,
    {
      label: formatMessage({
        id: "Settings.application.customization.modal.tab.label",
        defaultMessage: "How do you want to upload your assets?"
      }),
      variant: "simple",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 8, paddingRight: 8, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tab, { children: formatMessage({
              id: "Settings.application.customization.modal.upload.from-computer",
              defaultMessage: "From computer"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tab, { children: formatMessage({
              id: "Settings.application.customization.modal.upload.from-url",
              defaultMessage: "From url"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {})
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.TabPanels, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.TabPanel, { children: /* @__PURE__ */ jsxRuntime.jsx(ComputerForm, {}) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.TabPanel, { children: /* @__PURE__ */ jsxRuntime.jsx(URLForm, {}) })
        ] })
      ]
    }
  );
};
const URLForm = () => {
  const { formatMessage } = reactIntl.useIntl();
  const [logoUrl, setLogoUrl] = React__namespace.useState("");
  const [error, setError] = React__namespace.useState();
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
      const res = await axios__default.default.get(url.toString(), { responseType: "blob", timeout: 8e3 });
      const file = new File([res.data], res.config.url ?? "", {
        type: res.headers["content-type"]
      });
      const asset = await parseFileMetadatas(file);
      setLocalImage(asset);
      goToStep("pending");
    } catch (err) {
      if (err instanceof axios.AxiosError) {
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
  return /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.TextInput,
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
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.ModalFooter,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
        endActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", children: formatMessage({
          id: "Settings.application.customization.modal.upload.next",
          defaultMessage: "Next"
        }) })
      }
    )
  ] });
};
const ComputerForm = () => {
  const { formatMessage } = reactIntl.useIntl();
  const [dragOver, setDragOver] = React__namespace.useState(false);
  const [fileError, setFileError] = React__namespace.useState();
  const inputRef = React__namespace.useRef(null);
  const id = React__namespace.useId();
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
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("form", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field, { name: id, error: fileError, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
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
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Icon,
              {
                color: "primary600",
                width: helperPlugin.pxToRem(60),
                height: helperPlugin.pxToRem(60),
                as: Icons.PicturePlus,
                "aria-hidden": true
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 3, paddingBottom: 5, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "label", htmlFor: id, children: formatMessage({
              id: "Settings.application.customization.modal.upload.drag-drop",
              defaultMessage: "Drag and Drop here or"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
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
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "button", onClick: handleClick, children: formatMessage({
              id: "Settings.application.customization.modal.upload.cta.browse",
              defaultMessage: "Browse files"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.application.customization.modal.upload.file-validation",
                defaultMessage: "Max dimension: {dimension}x{dimension}, Max size: {size}KB"
              },
              { size: SIZE, dimension: DIMENSION }
            ) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.FieldError, {})
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.ModalFooter,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
          id: "Settings.application.customization.modal.cancel",
          defaultMessage: "Cancel"
        }) })
      }
    )
  ] });
};
const FileInput = styled__default.default(designSystem.FieldInput)`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const PendingLogoDialog = ({ onChangeLogo }) => {
  const { formatMessage } = reactIntl.useIntl();
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
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", paddingBottom: 6, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "Settings.application.customization.modal.pending.title",
            defaultMessage: "Logo ready to upload"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral500", children: formatMessage({
            id: "Settings.application.customization.modal.pending.subtitle",
            defaultMessage: "Manage the chosen logo before uploading it"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleGoBack, variant: "secondary", children: formatMessage({
          id: "Settings.application.customization.modal.pending.choose-another",
          defaultMessage: "Choose another logo"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { maxWidth: helperPlugin.pxToRem(180), children: localImage?.url ? /* @__PURE__ */ jsxRuntime.jsx(ImageCardAsset, { asset: localImage }) : null })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.ModalFooter,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
          id: "Settings.application.customization.modal.cancel",
          defaultMessage: "Cancel"
        }) }),
        endActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleUpload, children: formatMessage({
          id: "Settings.application.customization.modal.pending.upload",
          defaultMessage: "Upload logo"
        }) })
      }
    )
  ] });
};
const ImageCardAsset = ({ asset }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardAsset, { size: "S", src: asset.url }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardBody, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardTitle, { children: asset.name }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardSubtitle, { children: `${asset.ext?.toUpperCase()} - ${asset.width}✕${asset.height}` })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardBadge, { children: formatMessage({
        id: "Settings.application.customization.modal.pending.card-badge",
        defaultMessage: "image"
      }) })
    ] })
  ] });
};
const AdminSeatInfoCE = () => null;
const ApplicationInfoPage = () => {
  const { trackUsage } = helperPlugin.useTracking();
  const { formatMessage } = reactIntl.useIntl();
  const { logos: serverLogos, updateProjectSettings } = index.useConfiguration();
  const [logos, setLogos] = React__namespace.useState({ menu: serverLogos.menu, auth: serverLogos.auth });
  const { settings } = reactRedux.useSelector(index.selectAdminPermissions);
  helperPlugin.useAppInfo();
  const AdminSeatInfo = index.useEnterprise(
    AdminSeatInfoCE,
    async () => (await Promise.resolve().then(() => require("./AdminSeatInfo-d87c3c8c.js"))).AdminSeatInfoEE
  );
  const {
    allowedActions: { canRead, canUpdate }
  } = helperPlugin.useRBAC(settings ? settings["project-settings"] : {});
  helperPlugin.useFocusWhenNavigate();
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
  React__namespace.useEffect(() => {
    setLogos({
      menu: serverLogos.menu,
      auth: serverLogos.auth
    });
  }, [serverLogos]);
  if (!AdminSeatInfo) {
    return null;
  }
  const isSaveDisabled = logos.auth.custom === serverLogos.auth.custom && logos.menu.custom === serverLogos.menu.custom;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Layout, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.SettingsPageTitle,
      {
        name: formatMessage({
          id: "Settings.application.header",
          defaultMessage: "Application"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title: formatMessage({
            id: "Settings.application.title",
            defaultMessage: "Overview"
          }),
          subtitle: formatMessage({
            id: "Settings.application.description",
            defaultMessage: "Administration panel’s global information"
          }),
          primaryAction: canUpdate && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: isSaveDisabled, type: "submit", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, {}), children: formatMessage({ id: "global.save", defaultMessage: "Save" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: canRead && /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Box,
        {
          hasRadius: true,
          background: "neutral0",
          shadow: "tableShadow",
          paddingTop: 6,
          paddingBottom: 6,
          paddingRight: 7,
          paddingLeft: 7,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", as: "h3", children: formatMessage({
              id: "Settings.application.customization",
              defaultMessage: "Customization"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.application.customization.size-details",
                defaultMessage: "Max dimension: {dimension}×{dimension}, Max file size: {size}KB"
              },
              { dimension: DIMENSION, size: SIZE }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { paddingTop: 4, gap: 4, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
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
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
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
  const { settingId } = reactRouterDom.useParams();
  const { settings } = helperPlugin.useStrapiApp();
  const { formatMessage } = reactIntl.useIntl();
  const { isLoading, menu } = useSettingsMenu();
  const routes = index.useEnterprise(
    ROUTES_CE,
    async () => (await Promise.resolve().then(() => require("./constants-07723d30.js"))).ROUTES_EE,
    {
      combine(ceRoutes, eeRoutes) {
        return [...ceRoutes, ...eeRoutes];
      },
      defaultValue: []
    }
  );
  const adminRoutes = React__namespace.useMemo(() => {
    return makeUniqueRoutes(routes).map(
      ({ to, Component, exact }) => index.createRoute(Component, to, exact)
    );
  }, [routes]);
  const pluginsRoutes = Object.values(settings).flatMap((section) => {
    const { links } = section;
    return links.map((link) => index.createRoute(link.Component, link.to, link.exact || false));
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {});
  }
  if (!settingId) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Redirect, { to: "/settings/application-infos" });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Layout, { sideNav: /* @__PURE__ */ jsxRuntime.jsx(SettingsNav, { menu }), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      reactHelmet.Helmet,
      {
        title: formatMessage({
          id: "global.settings",
          defaultMessage: "Settings"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Switch, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/settings/application-infos", component: ApplicationInfoPage, exact: true }),
      adminRoutes,
      pluginsRoutes
    ] })
  ] });
};
const makeUniqueRoutes = (routes) => routes.filter(
  (route, index2, refArray) => refArray.findIndex((obj) => obj.to === route.to) === index2
);
exports.SettingsPage = SettingsPage;
exports.makeUniqueRoutes = makeUniqueRoutes;
//# sourceMappingURL=SettingsPage-31c4952a.js.map
