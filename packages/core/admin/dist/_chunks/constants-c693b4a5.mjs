const ROUTES_EE = [
  ...window.strapi.features.isEnabled(window.strapi.features.AUDIT_LOGS) ? [
    {
      async Component() {
        const component = await import("./index-97b81b2e.mjs");
        return component;
      },
      to: "/settings/audit-logs",
      exact: true
    }
  ] : [],
  ...window.strapi.features.isEnabled(window.strapi.features.REVIEW_WORKFLOWS) ? [
    {
      async Component() {
        const { ProtectedReviewWorkflowsPage } = await import("./ListPage-e19c5bac.mjs");
        return ProtectedReviewWorkflowsPage;
      },
      to: "/settings/review-workflows",
      exact: true
    },
    {
      async Component() {
        const { ReviewWorkflowsCreatePage } = await import("./CreatePage-13a5b4d0.mjs");
        return ReviewWorkflowsCreatePage;
      },
      to: "/settings/review-workflows/create",
      exact: true
    },
    {
      async Component() {
        const { ReviewWorkflowsEditPage } = await import("./EditPage-5a37c5db.mjs");
        return ReviewWorkflowsEditPage;
      },
      to: "/settings/review-workflows/:workflowId",
      exact: true
    }
  ] : [],
  ...window.strapi.features.isEnabled(window.strapi.features.SSO) ? [
    {
      async Component() {
        const { ProtectedSSO } = await import("./SingleSignOnPage-18eed483.mjs");
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
//# sourceMappingURL=constants-c693b4a5.mjs.map
