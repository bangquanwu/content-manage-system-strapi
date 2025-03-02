"use strict";
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const helperPlugin = require("@strapi/helper-plugin");
const reactQuery = require("react-query");
const lt = require("semver/functions/lt");
const valid = require("semver/functions/valid");
const index = require("./index-be8080e3.js");
const produce = require("immer");
const set = require("lodash/set");
const reactDnd = require("react-dnd");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const v2 = require("@strapi/design-system/v2");
const Icons = require("@strapi/icons");
const get = require("lodash/get");
const reactIntl = require("react-intl");
const styled = require("styled-components");
const cloneDeep = require("lodash/cloneDeep");
const reactRedux = require("react-redux");
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
const lt__default = /* @__PURE__ */ _interopDefault(lt);
const valid__default = /* @__PURE__ */ _interopDefault(valid);
const produce__default = /* @__PURE__ */ _interopDefault(produce);
const set__default = /* @__PURE__ */ _interopDefault(set);
const get__default = /* @__PURE__ */ _interopDefault(get);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const cloneDeep__default = /* @__PURE__ */ _interopDefault(cloneDeep);
const name = "@strapi/admin";
const version = "4.15.5";
const description = "Strapi Admin";
const repository = {
  type: "git",
  url: "git://github.com/strapi/strapi.git"
};
const license = "SEE LICENSE IN LICENSE";
const author = {
  name: "Strapi Solutions SAS",
  email: "hi@strapi.io",
  url: "https://strapi.io"
};
const maintainers = [
  {
    name: "Strapi Solutions SAS",
    email: "hi@strapi.io",
    url: "https://strapi.io"
  }
];
const exports$1 = {
  ".": {
    types: "./index.d.ts",
    source: "./index.js",
    require: "./index.js",
    "default": "./index.js"
  },
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    types: "./dist/server/src/index.d.ts",
    source: "./server/src/index.js",
    require: "./strapi-server.js",
    "default": "./strapi-server.js"
  },
  "./cli": {
    source: "./_internal/index.ts",
    "import": "./dist/cli.mjs",
    require: "./dist/cli.js",
    "default": "./dist/cli.js"
  },
  "./package.json": "./package.json"
};
const files = [
  "./dist",
  "strapi-server.js",
  "index.js",
  "index.d.ts"
];
const scripts = {
  build: "pack-up build",
  clean: "run -T rimraf ./dist",
  lint: "run -T eslint .",
  prepublishOnly: "yarn build",
  "test:front": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js",
  "test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watchAll",
  "test:ts": "run -T tsc -p tsconfig.json",
  "test:ts:back": "run -T tsc --noEmit -p server/tsconfig.json",
  "test:ts:front": "run -T tsc -p admin/tsconfig.json",
  "test:unit": "run -T jest",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@casl/ability": "6.5.0",
  "@pmmmwh/react-refresh-webpack-plugin": "0.5.10",
  "@radix-ui/react-context": "1.0.1",
  "@radix-ui/react-toolbar": "1.0.4",
  "@reduxjs/toolkit": "1.9.7",
  "@strapi/data-transfer": "4.15.5",
  "@strapi/design-system": "1.13.2",
  "@strapi/helper-plugin": "4.15.5",
  "@strapi/icons": "1.13.2",
  "@strapi/permissions": "4.15.5",
  "@strapi/provider-audit-logs-local": "4.15.5",
  "@strapi/types": "4.15.5",
  "@strapi/typescript-utils": "4.15.5",
  "@strapi/utils": "4.15.5",
  axios: "1.6.0",
  bcryptjs: "2.4.3",
  boxen: "5.1.2",
  browserslist: "^4.22.1",
  "browserslist-to-esbuild": "1.2.0",
  chalk: "^4.1.2",
  chokidar: "3.5.3",
  codemirror5: "npm:codemirror@^5.65.11",
  "cross-env": "^7.0.3",
  "css-loader": "^6.8.1",
  "date-fns": "2.30.0",
  dotenv: "14.2.0",
  esbuild: "0.19.2",
  "esbuild-loader": "^2.21.0",
  "esbuild-register": "3.5.0",
  execa: "5.1.1",
  "fast-deep-equal": "3.1.3",
  "find-root": "1.1.0",
  "fork-ts-checker-webpack-plugin": "8.0.0",
  formik: "2.4.0",
  "fractional-indexing": "3.2.0",
  "fs-extra": "10.0.0",
  "highlight.js": "^10.4.1",
  history: "^4.9.0",
  "html-webpack-plugin": "5.5.0",
  immer: "9.0.19",
  inquirer: "8.2.5",
  invariant: "^2.2.4",
  "js-cookie": "2.2.1",
  jsonwebtoken: "9.0.0",
  koa: "2.13.4",
  "koa-bodyparser": "4.4.1",
  "koa-compose": "4.1.0",
  "koa-passport": "5.0.0",
  "koa-static": "5.0.0",
  "koa2-ratelimit": "^1.1.2",
  lodash: "4.17.21",
  "markdown-it": "^12.3.2",
  "markdown-it-abbr": "^1.0.4",
  "markdown-it-container": "^3.0.0",
  "markdown-it-deflist": "^2.1.0",
  "markdown-it-emoji": "^2.0.0",
  "markdown-it-footnote": "^3.0.3",
  "markdown-it-ins": "^3.0.1",
  "markdown-it-mark": "^3.0.1",
  "markdown-it-sub": "^1.0.0",
  "markdown-it-sup": "1.0.0",
  "mini-css-extract-plugin": "2.7.6",
  "node-schedule": "2.1.0",
  ora: "5.4.1",
  outdent: "0.8.0",
  "p-map": "4.0.0",
  "passport-local": "1.0.0",
  pluralize: "8.0.0",
  prettier: "2.8.4",
  "prop-types": "^15.8.1",
  qs: "6.11.1",
  react: "^18.2.0",
  "react-dnd": "15.1.2",
  "react-dnd-html5-backend": "15.1.3",
  "react-dom": "^18.2.0",
  "react-error-boundary": "3.1.4",
  "react-helmet": "^6.1.0",
  "react-intl": "6.4.1",
  "react-is": "^18.2.0",
  "react-query": "3.39.3",
  "react-redux": "8.1.1",
  "react-refresh": "0.14.0",
  "react-router-dom": "5.3.4",
  "react-select": "5.7.0",
  "react-window": "1.8.8",
  "read-pkg-up": "7.0.1",
  "resolve-from": "5.0.0",
  rimraf: "3.0.2",
  "sanitize-html": "2.11.0",
  semver: "7.5.4",
  sift: "16.0.1",
  slate: "0.94.1",
  "slate-history": "0.93.0",
  "slate-react": "0.98.3",
  "style-loader": "3.3.1",
  "styled-components": "5.3.3",
  typescript: "5.2.2",
  webpack: "^5.88.1",
  "webpack-bundle-analyzer": "^4.9.0",
  "webpack-dev-middleware": "6.1.1",
  "webpack-hot-middleware": "2.25.4",
  yup: "0.32.9"
};
const devDependencies = {
  "@strapi/admin-test-utils": "4.15.5",
  "@strapi/pack-up": "4.15.5",
  "@strapi/plugin-content-manager": "4.15.5",
  "@strapi/strapi": "4.15.5",
  "@testing-library/dom": "9.2.0",
  "@testing-library/react": "14.0.0",
  "@testing-library/user-event": "14.4.3",
  "@types/codemirror5": "npm:@types/codemirror@^5.60.15",
  "@types/find-root": "1.1.3",
  "@types/invariant": "2.2.36",
  "@types/jest": "29.5.2",
  "@types/js-cookie": "3.0.5",
  "@types/jsonwebtoken": "9.0.3",
  "@types/koa-passport": "6.0.1",
  "@types/lodash": "^4.14.191",
  "@types/markdown-it": "13.0.7",
  "@types/markdown-it-container": "2.0.9",
  "@types/markdown-it-emoji": "2.0.4",
  "@types/markdown-it-footnote": "3.0.3",
  "@types/passport-local": "1.0.36",
  "@types/pluralize": "0.0.32",
  "@types/react-window": "1.8.8",
  "@types/sanitize-html": "2.9.5",
  "@types/webpack-bundle-analyzer": "4.6.2",
  "@types/webpack-hot-middleware": "2.25.8",
  msw: "1.3.0",
  vite: "4.4.9"
};
const peerDependencies = {
  "@strapi/data-transfer": "4.15.5",
  "@strapi/strapi": "^4.3.4",
  react: "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "react-router-dom": "^5.2.0",
  "styled-components": "^5.2.1"
};
const engines = {
  node: ">=18.0.0 <=20.x.x",
  npm: ">=6.0.0"
};
const nx = {
  targets: {
    build: {
      outputs: [
        "{projectRoot}/build"
      ]
    }
  }
};
const packageJSON = {
  name,
  version,
  description,
  repository,
  license,
  author,
  maintainers,
  exports: exports$1,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  nx
};
function getFullName(firstname, lastname = "") {
  return [firstname, lastname].filter((str) => str).join(" ");
}
const utils = {
  bufferToHex(buffer) {
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
  },
  async digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    return this.bufferToHex(hashBuffer);
  }
};
async function hashAdminUserEmail(payload) {
  if (!payload) {
    return null;
  }
  try {
    return await utils.digestMessage(payload.email);
  } catch (error) {
    return null;
  }
}
const LAYOUT_DATA = {
  contentTypeBuilder: {
    home: {
      title: {
        id: "app.components.GuidedTour.home.CTB.title",
        defaultMessage: "🧠 Build the content structure"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.home.CTB.cta.title",
          defaultMessage: "Go to the Content type Builder"
        },
        type: "REDIRECT",
        target: "/plugins/content-type-builder"
      },
      trackingEvent: "didClickGuidedTourHomepageContentTypeBuilder"
    },
    create: {
      title: {
        id: "app.components.GuidedTour.CTB.create.title",
        defaultMessage: "🧠 Create a first Collection type"
      },
      content: {
        id: "app.components.GuidedTour.CTB.create.content",
        defaultMessage: "<p>Collection types help you manage several entries, Single types are suitable to manage only one entry.</p> <p>Ex: For a Blog website, Articles would be a Collection type whereas a Homepage would be a Single type.</p>"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.CTB.create.cta.title",
          defaultMessage: "Build a Collection type"
        },
        type: "CLOSE"
      },
      trackingEvent: "didClickGuidedTourStep1CollectionType"
    },
    success: {
      title: {
        id: "app.components.GuidedTour.CTB.success.title",
        defaultMessage: "Step 1: Completed ✅"
      },
      content: {
        id: "app.components.GuidedTour.CTB.success.content",
        defaultMessage: "<p>Good going!</p><b>⚡️ What would you like to share with the world?</b>"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.create-content",
          defaultMessage: "Create content"
        },
        type: "REDIRECT",
        target: "/content-manager"
      },
      trackingEvent: "didCreateGuidedTourCollectionType"
    }
  },
  contentManager: {
    home: {
      title: {
        id: "app.components.GuidedTour.home.CM.title",
        defaultMessage: "⚡️ What would you like to share with the world?"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.create-content",
          defaultMessage: "Create content"
        },
        type: "REDIRECT",
        target: "/content-manager"
      },
      trackingEvent: "didClickGuidedTourHomepageContentManager"
    },
    create: {
      title: {
        id: "app.components.GuidedTour.CM.create.title",
        defaultMessage: "⚡️ Create content"
      },
      content: {
        id: "app.components.GuidedTour.CM.create.content",
        defaultMessage: "<p>Create and manage all the content here in the Content Manager.</p><p>Ex: Taking the Blog website example further, one can write an Article, save and publish it as they like.</p><p>💡 Quick tip - Don't forget to hit publish on the content you create.</p>"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.create-content",
          defaultMessage: "Create content"
        },
        type: "CLOSE"
      },
      trackingEvent: "didClickGuidedTourStep2ContentManager"
    },
    success: {
      title: {
        id: "app.components.GuidedTour.CM.success.title",
        defaultMessage: "Step 2: Completed ✅"
      },
      content: {
        id: "app.components.GuidedTour.CM.success.content",
        defaultMessage: "<p>Awesome, one last step to go!</p><b>🚀  See content in action</b>"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.CM.success.cta.title",
          defaultMessage: "Test the API"
        },
        type: "REDIRECT",
        target: "/settings/api-tokens"
      },
      trackingEvent: "didCreateGuidedTourEntry"
    }
  },
  apiTokens: {
    home: {
      title: {
        id: "app.components.GuidedTour.apiTokens.create.title",
        defaultMessage: "🚀 See content in action"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.home.apiTokens.cta.title",
          defaultMessage: "Test the API"
        },
        type: "REDIRECT",
        target: "/settings/api-tokens"
      },
      trackingEvent: "didClickGuidedTourHomepageApiTokens"
    },
    create: {
      title: {
        id: "app.components.GuidedTour.apiTokens.create.title",
        defaultMessage: "🚀 See content in action"
      },
      content: {
        id: "app.components.GuidedTour.apiTokens.create.content",
        defaultMessage: "<p>Generate an authentication token here and retrieve the content you just created.</p>"
      },
      cta: {
        title: {
          id: "app.components.GuidedTour.apiTokens.create.cta.title",
          defaultMessage: "Generate an API Token"
        },
        type: "CLOSE"
      },
      trackingEvent: "didClickGuidedTourStep3ApiTokens"
    },
    success: {
      title: {
        id: "app.components.GuidedTour.apiTokens.success.title",
        defaultMessage: "Step 3: Completed ✅"
      },
      content: {
        id: "app.components.GuidedTour.apiTokens.success.content",
        defaultMessage: "<p>See content in action by making an HTTP request:</p><ul><li><p>To this URL: <light>https://'<'YOUR_DOMAIN'>'/api/'<'YOUR_CT'>'</light></p></li><li><p>With the header: <light>Authorization: bearer '<'YOUR_API_TOKEN'>'</light></p></li></ul><p>For more ways to interact with content, see the <documentationLink>documentation</documentationLink>.</p>"
      },
      trackingEvent: "didGenerateGuidedTourApiTokens"
    }
  }
};
const STATES = {
  IS_DONE: "IS_DONE",
  IS_ACTIVE: "IS_ACTIVE",
  IS_NOT_DONE: "IS_NOT_DONE"
};
const Number = ({ children, state, ...props }) => {
  return state === STATES.IS_DONE || state === STATES.IS_ACTIVE ? /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
    {
      background: "primary600",
      padding: 2,
      borderRadius: "50%",
      width: helperPlugin.pxToRem(30),
      height: helperPlugin.pxToRem(30),
      justifyContent: "center",
      ...props,
      children: state === STATES.IS_DONE ? /* @__PURE__ */ jsxRuntime.jsx(Icons.Check, { "aria-hidden": true, width: helperPlugin.pxToRem(16), color: "neutral0" }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "neutral0", children })
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
    {
      borderColor: "neutral500",
      borderWidth: "1px",
      borderStyle: "solid",
      padding: 2,
      borderRadius: "50%",
      width: helperPlugin.pxToRem(30),
      height: helperPlugin.pxToRem(30),
      justifyContent: "center",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "neutral600", children })
    }
  );
};
const VerticalDivider = ({ state, ...props }) => /* @__PURE__ */ jsxRuntime.jsx(
  designSystem.Box,
  {
    width: helperPlugin.pxToRem(2),
    height: "100%",
    background: state === STATES.IS_NOT_DONE ? "neutral300" : "primary500",
    hasRadius: true,
    minHeight: state === STATES.IS_ACTIVE ? helperPlugin.pxToRem(85) : helperPlugin.pxToRem(65),
    ...props
  }
);
const GuidedTourModal = () => {
  const {
    currentStep,
    guidedTourState,
    setCurrentStep,
    setStepState,
    isGuidedTourVisible,
    setSkipped
  } = helperPlugin.useGuidedTour();
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = helperPlugin.useTracking();
  if (!currentStep || !isGuidedTourVisible) {
    return null;
  }
  const stepData = get__default.default(LAYOUT_DATA, currentStep);
  const sectionKeys = Object.keys(guidedTourState);
  const [sectionName, stepName] = currentStep.split(".");
  const sectionIndex = sectionKeys.indexOf(sectionName);
  const stepIndex = Object.keys(guidedTourState[sectionName]).indexOf(stepName);
  const hasSectionAfter = sectionIndex < sectionKeys.length - 1;
  const hasStepAfter = stepIndex < Object.keys(guidedTourState[sectionName]).length - 1;
  const handleCtaClick = () => {
    setStepState(currentStep, true);
    if (stepData) {
      trackUsage(stepData.trackingEvent);
    }
    setCurrentStep(null);
  };
  const handleSkip = () => {
    setSkipped(true);
    setCurrentStep(null);
    trackUsage("didSkipGuidedtour");
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(ModalWrapper, { onClick: handleCtaClick, padding: 8, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.FocusTrap, { onEscape: handleCtaClick, children: /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      direction: "column",
      alignItems: "stretch",
      background: "neutral0",
      width: helperPlugin.pxToRem(660),
      shadow: "popupShadow",
      hasRadius: true,
      padding: 4,
      gap: 8,
      role: "dialog",
      "aria-modal": true,
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            onClick: handleCtaClick,
            "aria-label": formatMessage({
              id: "app.utils.close-label",
              defaultMessage: "Close"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cross, {})
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            paddingLeft: 7,
            paddingRight: 7,
            paddingBottom: !hasStepAfter && !hasSectionAfter ? 8 : 0,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              GuidedTourStepper,
              {
                title: stepData && "title" in stepData ? stepData.title : void 0,
                cta: stepData && "cta" in stepData ? stepData.cta : void 0,
                onCtaClick: handleCtaClick,
                sectionIndex,
                stepIndex,
                hasSectionAfter,
                children: stepData && "content" in stepData && /* @__PURE__ */ jsxRuntime.jsx(GuidedTourContent, { ...stepData.content })
              }
            )
          }
        ),
        !(!hasStepAfter && !hasSectionAfter) && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: handleSkip, children: formatMessage({
          id: "app.components.GuidedTour.skip",
          defaultMessage: "Skip the tour"
        }) }) })
      ]
    }
  ) }) }) });
};
const ModalWrapper = styled__default.default(designSystem.Flex)`
  position: fixed;
  z-index: 4;
  inset: 0;
  /* this is theme.colors.neutral800 with opacity */
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
`;
const GuidedTourStepper = ({
  title,
  children,
  cta,
  onCtaClick,
  sectionIndex,
  stepIndex,
  hasSectionAfter
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const hasSectionBefore = sectionIndex > 0;
  const hasStepsBefore = stepIndex > 0;
  const nextSectionIndex = sectionIndex + 1;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, justifyContent: "center", minWidth: helperPlugin.pxToRem(30), children: hasSectionBefore && /* @__PURE__ */ jsxRuntime.jsx(VerticalDivider, { state: STATES.IS_DONE, minHeight: helperPlugin.pxToRem(24) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "primary600", children: formatMessage({
        id: "app.components.GuidedTour.title",
        defaultMessage: "3 steps to get started"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, minWidth: helperPlugin.pxToRem(30), children: /* @__PURE__ */ jsxRuntime.jsx(
        Number,
        {
          state: hasStepsBefore ? STATES.IS_DONE : STATES.IS_ACTIVE,
          paddingTop: 3,
          paddingBottom: 3,
          children: sectionIndex + 1
        }
      ) }),
      title && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontWeight: "bold", textColor: "neutral800", as: "h3", id: "title", children: formatMessage(title) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, direction: "column", justifyContent: "center", minWidth: helperPlugin.pxToRem(30), children: hasSectionAfter && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(VerticalDivider, { state: STATES.IS_DONE }),
        hasStepsBefore && /* @__PURE__ */ jsxRuntime.jsx(Number, { state: STATES.IS_ACTIVE, paddingTop: 3, children: nextSectionIndex + 1 })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
        children,
        cta && (cta.target ? /* @__PURE__ */ jsxRuntime.jsx(
          v2.LinkButton,
          {
            as: reactRouterDom.NavLink,
            endIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowRight, {}),
            onClick: onCtaClick,
            to: cta.target,
            children: formatMessage(cta.title)
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { endIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowRight, {}), onClick: onCtaClick, children: formatMessage(cta.title) }))
      ] })
    ] }),
    hasStepsBefore && hasSectionAfter && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, justifyContent: "center", width: helperPlugin.pxToRem(30), children: /* @__PURE__ */ jsxRuntime.jsx(VerticalDivider, { state: STATES.IS_DONE, minHeight: helperPlugin.pxToRem(24) }) }) })
  ] });
};
const GuidedTourContent = ({ id, defaultMessage }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, paddingBottom: 6, children: formatMessage(
    { id, defaultMessage },
    {
      documentationLink: DocumentationLink,
      b: Bold,
      p: Paragraph,
      light: Light,
      ul: List,
      li: ListItem
    }
  ) });
};
const DocumentationLink = (children) => /* @__PURE__ */ jsxRuntime.jsx(
  designSystem.Typography,
  {
    as: "a",
    textColor: "primary600",
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#api-parameters",
    children
  }
);
const Bold = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children });
const Paragraph = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children });
const Light = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", children });
const List = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 6, children: /* @__PURE__ */ jsxRuntime.jsx("ul", { children }) });
const LiStyled = styled__default.default.li`
  list-style: disc;
  &::marker {
    color: ${({ theme }) => theme.colors.neutral800};
  }
`;
const ListItem = (children) => /* @__PURE__ */ jsxRuntime.jsx(LiStyled, { children });
const LinkUserWrapper = styled__default.default(designSystem.Box)`
  width: ${150 / 16}rem;
  position: absolute;
  bottom: ${({ theme }) => theme.spaces[9]};
  left: ${({ theme }) => theme.spaces[5]};
`;
const LinkUser = styled__default.default(reactRouterDom.NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  border-radius: ${({ theme }) => theme.spaces[1]};

  &:hover {
    background: ${({ theme, logout }) => logout ? theme.colors.danger100 : theme.colors.primary100};
    text-decoration: none;
  }

  svg {
    path {
      fill: ${({ theme }) => theme.colors.danger600};
    }
  }
`;
const LeftMenu = ({ generalSectionLinks, pluginsSectionLinks }) => {
  const navUserRef = React__namespace.useRef(null);
  const [userLinksVisible, setUserLinksVisible] = React__namespace.useState(false);
  const {
    logos: { menu }
  } = index.useConfiguration();
  const [condensed, setCondensed] = helperPlugin.usePersistentState("navbar-condensed", false);
  const { userDisplayName } = helperPlugin.useAppInfo();
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = helperPlugin.useTracking();
  const { pathname } = reactRouterDom.useLocation();
  const history = reactRouterDom.useHistory();
  const { post } = helperPlugin.getFetchClient();
  const initials = userDisplayName.split(" ").map((name2) => name2.substring(0, 1)).join("").substring(0, 2);
  const handleToggleUserLinks = () => setUserLinksVisible((prev) => !prev);
  const handleLogout = async () => {
    await post("/admin/logout");
    helperPlugin.auth.clearAppStorage();
    handleToggleUserLinks();
    history.push("/auth/login");
  };
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && /**
    * TODO: can we replace this by just using the navUserRef?
    */
    e.relatedTarget?.parentElement?.id !== "main-nav-user-button") {
      setUserLinksVisible(false);
    }
  };
  const handleClickOnLink = (destination) => {
    trackUsage("willNavigate", { from: pathname, to: destination });
  };
  const menuTitle = formatMessage({
    id: "app.components.LeftMenu.navbrand.title",
    defaultMessage: "Strapi Dashboard"
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(v2.MainNav, { condensed, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      v2.NavBrand,
      {
        as: reactRouterDom.NavLink,
        workplace: formatMessage({
          id: "app.components.LeftMenu.navbrand.workplace",
          defaultMessage: "Workplace"
        }),
        title: menuTitle,
        icon: /* @__PURE__ */ jsxRuntime.jsx(
          "img",
          {
            src: menu.custom?.url || menu.default,
            alt: formatMessage({
              id: "app.components.LeftMenu.logo.alt",
              defaultMessage: "Application logo"
            })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(v2.NavSections, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        v2.NavLink,
        {
          as: reactRouterDom.NavLink,
          to: "/content-manager",
          icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Write, {}),
          onClick: () => handleClickOnLink("/content-manager"),
          children: formatMessage({ id: "global.content-manager", defaultMessage: "Content manager" })
        }
      ),
      pluginsSectionLinks.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(
        v2.NavSection,
        {
          label: formatMessage({
            id: "app.components.LeftMenu.plugins",
            defaultMessage: "Plugins"
          }),
          children: pluginsSectionLinks.map((link) => {
            const Icon = link.icon;
            return /* @__PURE__ */ jsxRuntime.jsx(
              v2.NavLink,
              {
                as: reactRouterDom.NavLink,
                to: link.to,
                icon: /* @__PURE__ */ jsxRuntime.jsx(Icon, {}),
                onClick: () => handleClickOnLink(link.to),
                children: formatMessage(link.intlLabel)
              },
              link.to
            );
          })
        }
      ) : null,
      generalSectionLinks.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(
        v2.NavSection,
        {
          label: formatMessage({
            id: "app.components.LeftMenu.general",
            defaultMessage: "General"
          }),
          children: generalSectionLinks.map((link) => {
            const LinkIcon = link.icon;
            return /* @__PURE__ */ jsxRuntime.jsx(
              v2.NavLink,
              {
                as: reactRouterDom.NavLink,
                badgeContent: link.notificationsCount && link.notificationsCount > 0 ? link.notificationsCount.toString() : void 0,
                to: link.to,
                icon: /* @__PURE__ */ jsxRuntime.jsx(LinkIcon, {}),
                onClick: () => handleClickOnLink(link.to),
                children: formatMessage(link.intlLabel)
              },
              link.to
            );
          })
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(v2.NavFooter, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        v2.NavUser,
        {
          id: "main-nav-user-button",
          ref: navUserRef,
          onClick: handleToggleUserLinks,
          initials,
          children: userDisplayName
        }
      ),
      userLinksVisible && /* @__PURE__ */ jsxRuntime.jsx(
        LinkUserWrapper,
        {
          onBlur: handleBlur,
          padding: 1,
          shadow: "tableShadow",
          background: "neutral0",
          hasRadius: true,
          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.FocusTrap, { onEscape: handleToggleUserLinks, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 0, children: [
            /* @__PURE__ */ jsxRuntime.jsx(LinkUser, { tabIndex: 0, onClick: handleToggleUserLinks, to: "/me", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
              id: "global.profile",
              defaultMessage: "Profile"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(LinkUser, { tabIndex: 0, onClick: handleLogout, to: "/auth/login", children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "danger600", children: formatMessage({
                id: "app.components.LeftMenu.logout",
                defaultMessage: "Logout"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(Icons.Exit, {})
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(v2.NavCondense, { onClick: () => setCondensed((s) => !s), children: condensed ? formatMessage({
        id: "app.components.LeftMenu.expand",
        defaultMessage: "Expand the navbar"
      }) : formatMessage({
        id: "app.components.LeftMenu.collapse",
        defaultMessage: "Collapse the navbar"
      }) })
    ] })
  ] });
};
const onboardingPreview = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABQCAMAAAD2kgFPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAL9UExURff3+fv7+/X19/Pz9/n5+fv7/f39//////39/UdwTPn5+/X1+fHx++/v8fn5/fHx8/Pz9eTk6e/v8/Hx9fHx/e3u7/X19e3t8evr7+fn6YuR96Gl+OLi59LS2dTU2uvr++nq7ff39+Tk697e4ufn6+vr7enq69ra3tDQ1uDg5/nv7+Dg5Nzc4Nzd4tTU2OTk5+fn7djY3tzc5M/Q1NjY3NLS1tbX3MzM0u/w9crK0unp7+np+/37+8rK0MjIzu/v78PEy9ra4djY4eLi6t7e5NbW2s7O1OLk5+/v/Ojp/dra5MPF9+3u89bX3mxz99DQ2fj4+OLi5PHx8dvb29ze+/f3/7C1+t7e5+vr69PX2OPk/Jydl/T09/f393R7+Gdw96ytuNTU3M7O2ODg6a6vumJq9+3u/dTW/PP19cXGzd7e4O3t7cnK+/f3+uLk683O+Z2h+dLU+9/h++no3/j39bq0pu/v7fv7+fHz9XF4911l93V8+bm5waGirffr7Kqrtq+z9qentF9o93mA+fj4+vr6++/v7/f3++vt+83N0/Pz8+vr8dbY+sjJ98zO1crM0vn5//Pz/ra6n/n59d/g4quvp9fa2OTn66Shm8C2prCuq+/r67Gxr9LLvbCwrcfEwK+vqZSahtPVw5WafKiknff5+ZqapvHw7fv4+YGH9dnb++Tn/Ly8xvfo6Oq5v////6WlsNrc3vPz+dLU2Ovr/eTn+drc4JWXo6Wp+cLE++nr74+T+enr4s7Q1m5098bArefk5Nze0ODc1Pf3/MC8tuDi0KWrh/n39+Tk4qmv+77Cqdjc3PX1/c7S0vv7/7ixo/Px7Z+jh62x+8rMtrS6pZebjY+Rn9bayKuvm+vp5+np6aWrjVJa9fX38bi895+fm1pk9620oevp6bS0r+fp6fv19VZg9fn19X6F+fnz89LS3MDAyPXi4uextvX1+vPW2OCVnYmJl9zc4Xh4iff3+mdy97y8xPf3977C96mpsbS29YeHlamv84qS87i89VXx8BYAAAD/dFJOU319fX19fX19fQB9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19bX19fX19fX19fX19Lwd9fX19fX19fX19fX19fX1lfX19fX19fX19fX19fX19fX19fX19fW1dED59fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX0PfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1mfX19bX1eXn0/fX19fX0/fSWruQsAAAbiSURBVGje7VkFcBtHFD2SbnXO9UA56dRIiiRbFFlmiO3asWKIE0MYGrQbZmjDDA1T06RJ03DSJA2XMaWUmZmZmWm6ki3lTie59kTSlJ40p5nV//tud//b/28P0WiG/PgdkhBMHKzRaBDNyWXSRoqi4ki57CQk/MZsKna58pqa0N4gnoNcNgQZzBV8ml9aYMYaW4DQRKjvDC8MG7TkG0ff+gmobifD78gXYQZE0++8b08tXFg/4uf6H46VLh5Rf/P8TERtXG1ykkmtI7zmtZFLhtW9NWfOnCUjhy0Z+T2CJOFYJMOS+YtPzV884teDX8879sKIhfUHSxG1AzH0ajXhB3UjPxpaVzd37uyls5cunRv30Fx0vhxRDfXdLLbhZWU2W1mGGNtbEPuXdStz+2ycu/+kbmv4YLOWZ3merdEyNSweW0KMxXkW1+J4RwxeMeRfCIbhMsu7/LUd0QgkSYkW8TS5wznVlg93W8LnEiUooAIqFYBQkxBnSIxkMStJVLUPoah90cCqlSurWkSI6ijdGGv0v0Wv3iaIa1i9KLJ+QoR0Wk0l2YCo6jO5unpq9dTJkyesW7uu+oZp09q0iLDXvOQNG0r9uxbtNdU2hIcidV4YELTpt40C17WIsMk9oAyapxMbNxiCR4uRWAP2TNOZ3S/KCmdEyfggEORQ9Xh4kKPkM8O6AjbIS/BWfZLED+N5StmbisEZRttRTzVD2LZtUdW09gPbFx0tatuE0Y2E/YYeVYlI0E7ELYjET68vJJS9nZdRc1shq7dgzRIeKfrtj0W//LTojTDCOE2pMsjb3BiQhSo+gF3jOJNhKQwPUgqcBdqhER+Cc4efUOvL8nFKwhxn/tjKtNLTY12HO3z15ecnTiz4ODaEkUEBgoKqIRAdgR3u8NmC4wuOd3g/noSoWoILGgHU5w7/jGpxbQ28dJRl3/AoPfR6jKIUqcnKstkm2fpnZOlZGSFBqUgQtLt6/9vvSf0Y/19qENYbgIpHSQBvFk6ekgy2NZO9SIqk1Pag7Ttvvttb6pu3Ps9lTtvsqsiTtmLpnC83L8fpyjXlmpMVhDYS+IKbN6YkBNINaubunWiMphTh9d0L1tcqMj6IDwKdszgeYYR9u6old/bsi1SsRohhs3heVBK2mz1QLQTthOe3Xyj1q8xJ3uwZZ/A5jbI17GlPyUlNTk31jHN6DQoyhgLuQNVm7l7bWZkPb719FBnKCIcOTJ8h9bVi8GO16hCdLAxR1N9E6HSsDlOmDGjLNBOlcnR6KlY6RFitODzFlrCM799qyt1eZV1KEqhU+E+/5EiE8EML/8qgXVdIfbPHZhfkrrp2bL5J2sqmJptL8nOzi9fnFxekKgjLUOB/rub58obMCEGjVoGzI7x8986Z5zydsDcQkMXWQguPJG4No25tslXYt08Vs62N8TaYvUnKNVSh6tVBuxl798iE7/QYuRSO5jhB2koYGCHZ4PBwKV2MnF5BhlPqxsqC1uJshKChUDIk3qsOPPmy1LeXIIgMzToYWtqK6nS0vRNNC+P1gqgUPrwFfYuFP+DiWK5hCwhjFzSF/WuzOnd2uwt9fEcZ4dp+l52VxSWvPueQb4ugMc7lcY8GhA+iC5+CETqLhV8Ww5iwmmbKsD4glPHtg3bIhJ/mMpucuelpabK8jqVyqdkVOea0nOtzTR4FYQoKvM1MadcJfSUjvO+uB2MlfP+hgrtLAoUf5VAhzPCe++MepVD4gAmlw71bZMLvnZ5ucBhpe0+ZDokuUPgpnJETofDtkYSfEjhUKP8ks0G5eaOoVPjbpt8t9XUYOU+6gfZYZIUEytMOzmB39OzJGThaQZgBv1EPFeIr/AiHCnEMmmiHCgMnnJHI4oFNjGzySEBGVDZsD2g+ovChX3DzjpCeptT1AaEdf8CgHbKgcbnSXBUmoykvRyb8ZKMnrSIzz2Q2myKV+iHhY0laJeGRfhLhW/dcqWulxqOOkOFNp7v78IRm/BZkiztiF6WRDxX85zRFIKTDGfu3PCr1SxcEmGd1jMDKhD9+jE6kRZHWdrILSh3CTsVAXZqa5eWUhA8P7UqGuuu0bfpDso3fuJXjDILHIBc+LQgp6XaHMd1o4HpFyvgZzUzpE49Jn5563wv+qRk/ej6culFSCG96RBc74UcmnHJnH2A5K/xdj0t9S0oLirMrvSWrKmSlvvMmZ3GBuTI/u7IkX1nqW1BQ2wzh6FskNY11eyuFH2kC4DJRf581/B+tQHzfK4e9ZsIQBkFHbURgLQMfX9x4vAlh1sMhIYnAhxhYxVgSNE6C+E+F0KWJpZuIrEgs4WBkSI9E8vXQIJrlCWTssRwSajSDJyYoXFYM0Wj+BNjsk7mwYOwbAAAAAElFTkSuQmCC";
const Onboarding = () => {
  const triggerRef = React__namespace.useRef(null);
  const [isOpen, setIsOpen] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const { communityEdition } = helperPlugin.useAppInfo();
  const handlePopoverVisibility = () => {
    setIsOpen((prev) => !prev);
  };
  const docLinks = [
    ...DOCUMENTATION_LINKS,
    {
      label: { id: "Settings.application.get-help", defaultMessage: "Get help" },
      icon: Icons.Message,
      href: communityEdition ? "https://discord.strapi.io" : "https://support.strapi.io/support/home"
    }
  ];
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { as: "aside", position: "fixed", bottom: 2, right: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      HelperButton,
      {
        "aria-label": formatMessage(
          isOpen ? {
            id: "app.components.Onboarding.help.button-close",
            defaultMessage: "Close help menu"
          } : {
            id: "app.components.Onboarding.help.button",
            defaultMessage: "Open help menu"
          }
        ),
        onClick: handlePopoverVisibility,
        ref: triggerRef,
        children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Icon, { as: isOpen ? Icons.Cross : Icons.Question, color: "buttonNeutral0" })
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.PopoverPrimitives.Content,
      {
        padding: 0,
        onDismiss: handlePopoverVisibility,
        source: triggerRef,
        placement: "top-end",
        spacing: 12,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Flex,
            {
              justifyContent: "space-between",
              paddingBottom: 5,
              paddingRight: 6,
              paddingLeft: 6,
              paddingTop: 6,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(TypographyLineHeight, { fontWeight: "bold", children: formatMessage({
                  id: "app.components.Onboarding.title",
                  defaultMessage: "Get started videos"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  TextLink,
                  {
                    as: "a",
                    href: WATCH_MORE.href,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    variant: "pi",
                    textColor: "primary600",
                    children: formatMessage(WATCH_MORE.label)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
          VIDEO_LINKS.map(({ href, duration, label }, index2) => /* @__PURE__ */ jsxRuntime.jsxs(
            VideoLinkWrapper,
            {
              as: "a",
              href,
              target: "_blank",
              rel: "noreferrer noopener",
              hasRadius: true,
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 6,
              paddingRight: 11,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingRight: 5, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral200", variant: "alpha", children: index2 + 1 }) }),
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "relative", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(Preview, { src: onboardingPreview, alt: "" }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    IconWrapper,
                    {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      background: "primary600",
                      borderRadius: "50%",
                      justifyContent: "center",
                      width: 6,
                      height: 6,
                      children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Icon, { as: Icons.Play, color: "buttonNeutral0", width: 3, height: 3 })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "start", paddingLeft: 4, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children: formatMessage(label) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: ":" }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", variant: "pi", children: duration })
                ] })
              ]
            },
            href
          )),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Flex,
            {
              direction: "column",
              alignItems: "stretch",
              gap: 2,
              paddingLeft: 5,
              paddingTop: 2,
              paddingBottom: 5,
              children: docLinks.map(({ label, href, icon }) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Icon, { as: icon, color: "primary600" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  TextLink,
                  {
                    as: "a",
                    href,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    variant: "sigma",
                    textColor: "primary700",
                    children: formatMessage(label)
                  }
                )
              ] }, href))
            }
          )
        ]
      }
    ) })
  ] });
};
const HelperButton = styled__default.default(designSystem.Button)`
  border-radius: 50%;
  padding: ${({ theme }) => theme.spaces[3]};
  /* Resetting 2rem height defined by Button component */
  height: 100%;
`;
const IconWrapper = styled__default.default(designSystem.Flex)`
  transform: translate(-50%, -50%);
`;
const VideoLinkWrapper = styled__default.default(designSystem.Flex)`
  text-decoration: none;

  :focus-visible {
    outline-offset: ${({ theme }) => `-${theme.spaces[1]}`};
  }

  :hover {
    background: ${({ theme }) => theme.colors.primary100};

    /* Hover style for the number displayed */
    ${designSystem.Typography}:first-child {
      color: ${({ theme }) => theme.colors.primary500};
    }

    /* Hover style for the label */
    ${designSystem.Typography}:nth-child(1) {
      color: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const Preview = styled__default.default.img`
  width: ${({ theme }) => theme.spaces[10]};
  height: ${({ theme }) => theme.spaces[8]};
  /* Same overlay used in ModalLayout */
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
  border-radius: ${({ theme }) => theme.borderRadius};
`;
const TypographyLineHeight = styled__default.default(designSystem.Typography)`
  /* line height of label and watch more to 1 so they can be better aligned visually */
  line-height: 1;
`;
const TextLink = styled__default.default(TypographyLineHeight)`
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;
const VIDEO_LINKS = [
  {
    label: {
      id: "app.components.Onboarding.link.build-content",
      defaultMessage: "Build a content architecture"
    },
    href: "https://www.youtube.com/watch?v=G9GjN0RxhkE",
    duration: "5:48"
  },
  {
    label: {
      id: "app.components.Onboarding.link.manage-content",
      defaultMessage: "Add & manage content"
    },
    href: "https://www.youtube.com/watch?v=DEZw4KbybAI",
    duration: "3:18"
  },
  {
    label: { id: "app.components.Onboarding.link.manage-media", defaultMessage: "Manage media" },
    href: "https://www.youtube.com/watch?v=-61MuiMQb38",
    duration: "3:41"
  }
];
const WATCH_MORE = {
  href: "https://www.youtube.com/playlist?list=PL7Q0DQYATmvidz6lEmwE5nIcOAYagxWqq",
  label: {
    id: "app.components.Onboarding.link.more-videos",
    defaultMessage: "Watch more videos"
  }
};
const DOCUMENTATION_LINKS = [
  {
    label: { id: "global.documentation", defaultMessage: "documentation" },
    href: "https://docs.strapi.io",
    icon: Icons.Book
  },
  {
    label: { id: "app.static.links.cheatsheet", defaultMessage: "cheatsheet" },
    href: "https://strapi-showcase.s3-us-west-2.amazonaws.com/CheatSheet.pdf",
    icon: Icons.PaperPlane
  }
];
const useMenu = () => {
  const { allPermissions: userPermissions } = helperPlugin.useRBACProvider();
  const { shouldUpdateStrapi } = helperPlugin.useAppInfo();
  const { menu } = helperPlugin.useStrapiApp();
  const permissions = reactRedux.useSelector(index.selectAdminPermissions);
  const [menuWithUserPermissions, setMenuWithUserPermissions] = React__namespace.useState({
    generalSectionLinks: [
      {
        icon: Icons.Puzzle,
        intlLabel: {
          id: "global.plugins",
          defaultMessage: "Plugins"
        },
        to: "/list-plugins",
        permissions: permissions.marketplace?.main ?? []
      },
      {
        icon: Icons.ShoppingCart,
        intlLabel: {
          id: "global.marketplace",
          defaultMessage: "Marketplace"
        },
        to: "/marketplace",
        permissions: permissions.marketplace?.main ?? []
      },
      {
        icon: Icons.Cog,
        intlLabel: {
          id: "global.settings",
          defaultMessage: "Settings"
        },
        to: "/settings",
        // Permissions of this link are retrieved in the init phase
        // using the settings menu
        permissions: permissions.marketplace?.main ?? [],
        notificationsCount: 0
      }
    ],
    pluginsSectionLinks: [],
    isLoading: true
  });
  const generalSectionLinksRef = React__namespace.useRef(menuWithUserPermissions.generalSectionLinks);
  React__namespace.useEffect(() => {
    async function applyMenuPermissions() {
      const authorizedPluginSectionLinks = await getPluginSectionLinks(userPermissions, menu);
      const authorizedGeneralSectionLinks = await getGeneralLinks(
        userPermissions,
        generalSectionLinksRef.current,
        shouldUpdateStrapi
      );
      setMenuWithUserPermissions((state) => ({
        ...state,
        generalSectionLinks: authorizedGeneralSectionLinks,
        pluginsSectionLinks: authorizedPluginSectionLinks,
        isLoading: false
      }));
    }
    applyMenuPermissions();
  }, [
    setMenuWithUserPermissions,
    generalSectionLinksRef,
    userPermissions,
    menu,
    permissions,
    shouldUpdateStrapi
  ]);
  return menuWithUserPermissions;
};
const getGeneralLinks = async (userPermissions, generalSectionRawLinks, shouldUpdateStrapi = false) => {
  const generalSectionLinksPermissions = await Promise.all(
    generalSectionRawLinks.map(({ permissions }) => helperPlugin.hasPermissions(userPermissions, permissions))
  );
  const authorizedGeneralSectionLinks = generalSectionRawLinks.filter(
    (_, index2) => generalSectionLinksPermissions[index2]
  );
  const settingsLinkIndex = authorizedGeneralSectionLinks.findIndex(
    (obj) => obj.to === "/settings"
  );
  if (settingsLinkIndex === -1) {
    return [];
  }
  const authorizedGeneralLinksClone = cloneDeep__default.default(authorizedGeneralSectionLinks);
  authorizedGeneralLinksClone[settingsLinkIndex].notificationsCount = shouldUpdateStrapi ? 1 : 0;
  return authorizedGeneralLinksClone;
};
const getPluginSectionLinks = async (userPermissions, pluginsSectionRawLinks) => {
  const pluginSectionLinksPermissions = await Promise.all(
    pluginsSectionRawLinks.map(({ permissions }) => helperPlugin.hasPermissions(userPermissions, permissions))
  );
  const authorizedPluginSectionLinks = pluginsSectionRawLinks.filter(
    (_, index2) => pluginSectionLinksPermissions[index2]
  );
  return authorizedPluginSectionLinks;
};
const FlexBox = styled__default.default(designSystem.Box)`
  flex: 1;
`;
const AppLayout = ({ children, sideNav }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { background: "neutral100", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.SkipToContent, { children: formatMessage({ id: "skipToContent", defaultMessage: "Skip to content" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-start", children: [
      sideNav,
      /* @__PURE__ */ jsxRuntime.jsx(FlexBox, { children })
    ] })
  ] });
};
const CM = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./index-be8080e3.js")).then((n) => n.App).then((mod) => ({ default: mod.App }))
);
const HomePage = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./HomePage-03a7b50f.js")).then((mod) => ({
    default: mod.HomePage
  }))
);
const InstalledPluginsPage = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./InstalledPluginsPage-506c157a.js")).then((mod) => ({
    default: mod.ProtectedInstalledPluginsPage
  }))
);
const MarketplacePage = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./MarketplacePage-bb657dc8.js")).then((mod) => ({ default: mod.ProtectedMarketplacePage }))
);
const NotFoundPage = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./index-be8080e3.js")).then((n) => n.NotFoundPage).then(({ NotFoundPage: NotFoundPage2 }) => ({ default: NotFoundPage2 }))
);
const InternalErrorPage = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./InternalErrorPage-d0e51ac2.js")).then(({ InternalErrorPage: InternalErrorPage2 }) => ({
    default: InternalErrorPage2
  }))
);
const ProfilePage = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./ProfilePage-74366d25.js")).then((mod) => ({
    default: mod.ProfilePage
  }))
);
const SettingsPage = React__namespace.lazy(
  () => Promise.resolve().then(() => require("./SettingsPage-31c4952a.js")).then((mod) => ({
    default: mod.SettingsPage
  }))
);
const Admin = () => {
  const { trackUsage } = helperPlugin.useTracking();
  const dispatch = index.useTypedDispatch();
  const appStatus = index.useTypedSelector((state) => state.admin_app.status);
  const { isLoading, generalSectionLinks, pluginsSectionLinks } = useMenu();
  const { menu } = helperPlugin.useStrapiApp();
  const { showTutorials } = index.useConfiguration();
  React__namespace.useEffect(() => {
    if (appStatus === "init") {
      trackUsage("didAccessAuthenticatedAdministration");
      dispatch({ type: index.ACTION_SET_APP_RUNTIME_STATUS });
    }
  }, [appStatus, dispatch, trackUsage]);
  const routes = React__namespace.useMemo(() => {
    return menu.filter((link) => link.Component).map(({ to, Component, exact }) => index.createRoute(Component, to, exact));
  }, [menu]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(reactDnd.DndProvider, { backend: reactDndHtml5Backend.HTML5Backend, children: /* @__PURE__ */ jsxRuntime.jsxs(
    AppLayout,
    {
      sideNav: /* @__PURE__ */ jsxRuntime.jsx(
        LeftMenu,
        {
          generalSectionLinks,
          pluginsSectionLinks
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(React__namespace.Suspense, { fallback: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}), children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Switch, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/", component: HomePage, exact: true }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/me", component: ProfilePage, exact: true }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/content-manager", component: CM }),
          routes,
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/settings/:settingId", component: SettingsPage }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/settings", component: SettingsPage, exact: true }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/marketplace", children: /* @__PURE__ */ jsxRuntime.jsx(MarketplacePage, {}) }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/list-plugins", exact: true, children: /* @__PURE__ */ jsxRuntime.jsx(InstalledPluginsPage, {}) }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/404", component: NotFoundPage }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/500", component: InternalErrorPage }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "", component: NotFoundPage })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(GuidedTourModal, {}),
        showTutorials && /* @__PURE__ */ jsxRuntime.jsx(Onboarding, {})
      ]
    }
  ) });
};
const PluginsInitializer = () => {
  const { plugins: appPlugins } = helperPlugin.useStrapiApp();
  const [{ plugins }, dispatch] = React__namespace.useReducer(
    reducer,
    initialState,
    () => init(appPlugins)
  );
  const setPlugin = React__namespace.useRef((pluginId) => {
    dispatch({ type: "SET_PLUGIN_READY", pluginId });
  });
  const hasApluginNotReady = Object.keys(plugins).some(
    (plugin) => plugins[plugin].isReady === false
  );
  if (hasApluginNotReady) {
    const initializers = Object.keys(plugins).reduce((acc, current) => {
      const InitializerComponent = plugins[current].initializer;
      if (InitializerComponent) {
        const key = plugins[current].pluginId;
        acc.push(/* @__PURE__ */ jsxRuntime.jsx(InitializerComponent, { setPlugin: setPlugin.current }, key));
      }
      return acc;
    }, []);
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      initializers,
      /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Admin, {});
};
const initialState = {
  plugins: {}
};
const reducer = (state = initialState, action) => produce__default.default(state, (draftState) => {
  switch (action.type) {
    case "SET_PLUGIN_READY": {
      set__default.default(draftState, ["plugins", action.pluginId, "isReady"], true);
      break;
    }
    default:
      return draftState;
  }
});
const init = (plugins) => {
  return {
    plugins: Object.keys(plugins).reduce((acc, current) => {
      acc[current] = { ...plugins[current] };
      return acc;
    }, {})
  };
};
const strapiVersion = packageJSON.version;
const AuthenticatedApp = () => {
  const { setGuidedTourVisibility } = helperPlugin.useGuidedTour();
  const userInfo = helperPlugin.auth.get("userInfo");
  const [userDisplayName, setUserDisplayName] = React__namespace.useState(
    () => userInfo ? userInfo.username || getFullName(userInfo.firstname ?? "", userInfo.lastname) : ""
  );
  const [userId, setUserId] = React__namespace.useState();
  const { showReleaseNotification } = index.useConfiguration();
  const { get: get2 } = helperPlugin.useFetchClient();
  const [
    { data: appInfos, status },
    { data: tagName, isLoading },
    { data: permissions, status: fetchPermissionsStatus, refetch, isFetching },
    { data: userRoles }
  ] = reactQuery.useQueries([
    {
      queryKey: "app-infos",
      async queryFn() {
        const { data } = await get2("/admin/information");
        return data.data;
      }
    },
    {
      queryKey: "strapi-release",
      async queryFn() {
        try {
          const res = await fetch("https://api.github.com/repos/strapi/strapi/releases/latest");
          if (!res.ok) {
            throw new Error();
          }
          const response = await res.json();
          if (!response.tag_name) {
            throw new Error();
          }
          return response.tag_name;
        } catch (err) {
          return strapiVersion;
        }
      },
      enabled: showReleaseNotification,
      initialData: strapiVersion
    },
    {
      queryKey: "admin-users-permission",
      async queryFn() {
        const { data } = await get2("/admin/users/me/permissions");
        return data.data;
      },
      initialData: []
    },
    {
      queryKey: "user-roles",
      async queryFn() {
        const {
          data: {
            data: { roles }
          }
        } = await get2("/admin/users/me");
        return roles;
      }
    }
  ]);
  const shouldUpdateStrapi = checkLatestStrapiVersion(strapiVersion, tagName);
  React__namespace.useEffect(() => {
    if (userRoles) {
      const isUserSuperAdmin = userRoles.find(({ code }) => code === "strapi-super-admin");
      if (isUserSuperAdmin && appInfos?.autoReload) {
        setGuidedTourVisibility(true);
      }
    }
  }, [userRoles, appInfos, setGuidedTourVisibility]);
  React__namespace.useEffect(() => {
    const getUserId = async () => {
      if (userInfo) {
        const userId2 = await hashAdminUserEmail(userInfo);
        if (userId2) {
          setUserId(userId2);
        }
      }
    };
    getUserId();
  }, [userInfo]);
  const shouldShowNotDependentQueriesLoader = isFetching || status === "loading" || fetchPermissionsStatus === "loading";
  const shouldShowLoader = isLoading || shouldShowNotDependentQueriesLoader;
  if (shouldShowLoader) {
    return /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {});
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "error..." });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    helperPlugin.AppInfoProvider,
    {
      ...appInfos,
      userId,
      latestStrapiReleaseTag: tagName,
      setUserDisplayName,
      shouldUpdateStrapi,
      userDisplayName,
      children: /* @__PURE__ */ jsxRuntime.jsx(index.RBACProvider, { permissions: permissions ?? [], refetchPermissions: refetch, children: /* @__PURE__ */ jsxRuntime.jsx(PluginsInitializer, {}) })
    }
  );
};
const checkLatestStrapiVersion = (currentPackageVersion, latestPublishedVersion = "") => {
  if (!valid__default.default(currentPackageVersion) || !valid__default.default(latestPublishedVersion)) {
    return false;
  }
  return lt__default.default(currentPackageVersion, latestPublishedVersion);
};
const AuthenticatedApp$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AuthenticatedApp
}, Symbol.toStringTag, { value: "Module" }));
exports.AuthenticatedApp = AuthenticatedApp$1;
exports.getFullName = getFullName;
//# sourceMappingURL=AuthenticatedApp-87c49d74.js.map
