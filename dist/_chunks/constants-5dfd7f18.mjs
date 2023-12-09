const ROUTES_EE = [
  ...window.strapi.features.isEnabled(window.strapi.features.AUDIT_LOGS) ? [
    {
      async Component() {
        const component = await import("./index-1d55a396.mjs");
        return component;
      },
      to: "/settings/audit-logs",
      exact: true
    }
  ] : [],
  ...window.strapi.features.isEnabled(window.strapi.features.REVIEW_WORKFLOWS) ? [
    {
      async Component() {
        const { ProtectedReviewWorkflowsPage } = await import("./ListPage-34e57943.mjs");
        return ProtectedReviewWorkflowsPage;
      },
      to: "/settings/review-workflows",
      exact: true
    },
    {
      async Component() {
        const { ReviewWorkflowsCreatePage } = await import("./CreatePage-45aa364a.mjs");
        return ReviewWorkflowsCreatePage;
      },
      to: "/settings/review-workflows/create",
      exact: true
    },
    {
      async Component() {
        const { ReviewWorkflowsEditPage } = await import("./EditPage-37c5a40f.mjs");
        return ReviewWorkflowsEditPage;
      },
      to: "/settings/review-workflows/:workflowId",
      exact: true
    }
  ] : [],
  ...window.strapi.features.isEnabled(window.strapi.features.SSO) ? [
    {
      async Component() {
        const { ProtectedSSO } = await import("./SingleSignOnPage-fab0bcca.mjs");
        return ProtectedSSO;
      },
      to: "/settings/single-sign-on",
      exact: true
    }
  ] : []
];
export {
  ROUTES_EE
};
//# sourceMappingURL=constants-5dfd7f18.mjs.map
