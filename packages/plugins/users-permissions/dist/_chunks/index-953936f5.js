"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const index = require("./index-00c72e10.js");
require("lodash/isEmpty");
const v2 = require("@strapi/design-system/v2");
const formik = require("formik");
const PropTypes = require("prop-types");
const yup = require("yup");
const icons = require("@strapi/icons");
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
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const schema = yup__namespace.object().shape({
  options: yup__namespace.object().shape({
    from: yup__namespace.object().shape({
      name: yup__namespace.string().required(helperPlugin.translatedErrors.required),
      email: yup__namespace.string().email(helperPlugin.translatedErrors.email).required(helperPlugin.translatedErrors.required)
    }).required(),
    response_email: yup__namespace.string().email(helperPlugin.translatedErrors.email),
    object: yup__namespace.string().required(helperPlugin.translatedErrors.required),
    message: yup__namespace.string().required(helperPlugin.translatedErrors.required)
  }).required(helperPlugin.translatedErrors.required)
});
const EmailForm = ({ template, onToggle, onSubmit }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.ModalLayout,
    {
      onClose: onToggle,
      labelledBy: `${formatMessage({
        id: index.getTrad("PopUpForm.header.edit.email-templates"),
        defaultMessage: "Edit email template"
      })}, ${formatMessage({ id: index.getTrad(template.display), defaultMessage: template.display })}`,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(
          v2.Breadcrumbs,
          {
            label: `${formatMessage({
              id: index.getTrad("PopUpForm.header.edit.email-templates"),
              defaultMessage: "Edit email template"
            })}, ${formatMessage({
              id: index.getTrad(template.display),
              defaultMessage: template.display
            })}`,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(v2.Crumb, { children: formatMessage({
                id: index.getTrad("PopUpForm.header.edit.email-templates"),
                defaultMessage: "Edit email template"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(v2.Crumb, { isCurrent: true, children: formatMessage({ id: index.getTrad(template.display), defaultMessage: template.display }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          formik.Formik,
          {
            onSubmit,
            initialValues: template,
            validateOnChange: false,
            validationSchema: schema,
            enableReinitialize: true,
            children: ({ errors, values, handleChange, isSubmitting }) => {
              return /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalBody, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid, { gap: 5, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    helperPlugin.GenericInput,
                    {
                      intlLabel: {
                        id: index.getTrad("PopUpForm.Email.options.from.name.label"),
                        defaultMessage: "Shipper name"
                      },
                      name: "options.from.name",
                      onChange: handleChange,
                      value: values.options.from.name,
                      error: errors?.options?.from?.name,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    helperPlugin.GenericInput,
                    {
                      intlLabel: {
                        id: index.getTrad("PopUpForm.Email.options.from.email.label"),
                        defaultMessage: "Shipper email"
                      },
                      name: "options.from.email",
                      onChange: handleChange,
                      value: values.options.from.email,
                      error: errors?.options?.from?.email,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    helperPlugin.GenericInput,
                    {
                      intlLabel: {
                        id: index.getTrad("PopUpForm.Email.options.response_email.label"),
                        defaultMessage: "Response email"
                      },
                      name: "options.response_email",
                      onChange: handleChange,
                      value: values.options.response_email,
                      error: errors?.options?.response_email,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    helperPlugin.GenericInput,
                    {
                      intlLabel: {
                        id: index.getTrad("PopUpForm.Email.options.object.label"),
                        defaultMessage: "Subject"
                      },
                      name: "options.object",
                      onChange: handleChange,
                      value: values.options.object,
                      error: errors?.options?.object,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 12, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Textarea,
                    {
                      label: formatMessage({
                        id: index.getTrad("PopUpForm.Email.options.message.label"),
                        defaultMessage: "Message"
                      }),
                      id: "options.message",
                      onChange: handleChange,
                      value: values.options.message,
                      error: errors?.options?.message && formatMessage({
                        id: errors.options.message,
                        defaultMessage: errors.options.message
                      })
                    }
                  ) })
                ] }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.ModalFooter,
                  {
                    startActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onToggle, variant: "tertiary", children: "Cancel" }),
                    endActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { loading: isSubmitting, type: "submit", children: "Finish" })
                  }
                )
              ] });
            }
          }
        )
      ]
    }
  );
};
EmailForm.propTypes = {
  template: PropTypes__default.default.shape({
    display: PropTypes__default.default.string,
    icon: PropTypes__default.default.string,
    options: PropTypes__default.default.shape({
      from: PropTypes__default.default.shape({
        name: PropTypes__default.default.string,
        email: PropTypes__default.default.string
      }),
      message: PropTypes__default.default.string,
      object: PropTypes__default.default.string,
      response_email: PropTypes__default.default.string
    })
  }).isRequired,
  onSubmit: PropTypes__default.default.func.isRequired,
  onToggle: PropTypes__default.default.func.isRequired
};
const EmailTable = ({ canUpdate, onEditClick }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 3, rowCount: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "1%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
        id: index.getTrad("Email.template.table.icon.label"),
        defaultMessage: "icon"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: index.getTrad("Email.template.table.name.label"),
        defaultMessage: "name"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "1%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
        id: index.getTrad("Email.template.table.action.label"),
        defaultMessage: "action"
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tbody, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { ...helperPlugin.onRowClick({ fn: () => onEditClick("reset_password") }), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Icon, { children: /* @__PURE__ */ jsxRuntime.jsx(
          icons.Refresh,
          {
            "aria-label": formatMessage({
              id: "global.reset-password",
              defaultMessage: "Reset password"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
          id: "global.reset-password",
          defaultMessage: "Reset password"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { ...helperPlugin.stopPropagation, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            onClick: () => onEditClick("reset_password"),
            label: formatMessage({
              id: index.getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            noBorder: true,
            icon: canUpdate && /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { ...helperPlugin.onRowClick({ fn: () => onEditClick("email_confirmation") }), children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Icon, { children: /* @__PURE__ */ jsxRuntime.jsx(
          icons.Check,
          {
            "aria-label": formatMessage({
              id: index.getTrad("Email.template.email_confirmation"),
              defaultMessage: "Email address confirmation"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
          id: index.getTrad("Email.template.email_confirmation"),
          defaultMessage: "Email address confirmation"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { ...helperPlugin.stopPropagation, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            onClick: () => onEditClick("email_confirmation"),
            label: formatMessage({
              id: index.getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            noBorder: true,
            icon: canUpdate && /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
          }
        ) })
      ] })
    ] })
  ] });
};
EmailTable.propTypes = {
  canUpdate: PropTypes__default.default.bool.isRequired,
  onEditClick: PropTypes__default.default.func.isRequired
};
const ProtectedEmailTemplatesPage = () => /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPagePermissions, { permissions: index.PERMISSIONS.readEmailTemplates, children: /* @__PURE__ */ jsxRuntime.jsx(EmailTemplatesPage, {}) });
const EmailTemplatesPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = helperPlugin.useTracking();
  const { notifyStatus } = designSystem.useNotifyAT();
  const toggleNotification = helperPlugin.useNotification();
  const { lockApp, unlockApp } = helperPlugin.useOverlayBlocker();
  const queryClient = reactQuery.useQueryClient();
  const { get, put } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  helperPlugin.useFocusWhenNavigate();
  const [isModalOpen, setIsModalOpen] = React__namespace.useState(false);
  const [templateToEdit, setTemplateToEdit] = React__namespace.useState(null);
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate }
  } = helperPlugin.useRBAC({ update: index.PERMISSIONS.updateEmailTemplates });
  const { isLoading: isLoadingData, data } = reactQuery.useQuery(
    ["users-permissions", "email-templates"],
    async () => {
      const { data: data2 } = await get("/users-permissions/email-templates");
      return data2;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: index.getTrad("Email.template.data.loaded"),
            defaultMessage: "Email templates has been loaded"
          })
        );
      },
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
      }
    }
  );
  const isLoading = isLoadingForPermissions || isLoadingData;
  const handleToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleEditClick = (template) => {
    setTemplateToEdit(template);
    handleToggle();
  };
  const submitMutation = reactQuery.useMutation(
    (body) => put("/users-permissions/email-templates", { "email-templates": body }),
    {
      async onSuccess() {
        await queryClient.invalidateQueries(["users-permissions", "email-templates"]);
        toggleNotification({
          type: "success",
          message: { id: "notification.success.saved", defaultMessage: "Saved" }
        });
        trackUsage("didEditEmailTemplates");
        unlockApp();
        handleToggle();
      },
      onError(error) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(error)
        });
        unlockApp();
      },
      refetchActive: true
    }
  );
  const handleSubmit = (body) => {
    lockApp();
    trackUsage("willEditEmailTemplates");
    const editedTemplates = { ...data, [templateToEdit]: body };
    submitMutation.mutate(editedTemplates);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": "true", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        helperPlugin.SettingsPageTitle,
        {
          name: formatMessage({
            id: index.getTrad("HeaderNav.link.emailTemplates"),
            defaultMessage: "Email templates"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.HeaderLayout,
        {
          title: formatMessage({
            id: index.getTrad("HeaderNav.link.emailTemplates"),
            defaultMessage: "Email templates"
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.ContentLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": submitMutation.isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.SettingsPageTitle,
      {
        name: formatMessage({
          id: index.getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.HeaderLayout,
      {
        title: formatMessage({
          id: index.getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(EmailTable, { onEditClick: handleEditClick, canUpdate }),
      isModalOpen && /* @__PURE__ */ jsxRuntime.jsx(
        EmailForm,
        {
          template: data[templateToEdit],
          onToggle: handleToggle,
          onSubmit: handleSubmit
        }
      )
    ] })
  ] });
};
exports.default = ProtectedEmailTemplatesPage;
//# sourceMappingURL=index-953936f5.js.map
