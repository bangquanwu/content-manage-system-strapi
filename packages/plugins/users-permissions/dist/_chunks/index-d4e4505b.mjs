import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { ModalLayout, ModalHeader, ModalBody, Grid, GridItem, Textarea, ModalFooter, Button, Table, Thead, Tr, Th, VisuallyHidden, Typography, Tbody, Td, Icon, IconButton, useNotifyAT, Main, HeaderLayout, ContentLayout } from "@strapi/design-system";
import { translatedErrors, Form, GenericInput, onRowClick, stopPropagation, CheckPagePermissions, useTracking, useNotification, useOverlayBlocker, useFetchClient, useAPIErrorHandler, useFocusWhenNavigate, useRBAC, SettingsPageTitle, LoadingIndicatorPage } from "@strapi/helper-plugin";
import { useIntl } from "react-intl";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { g as getTrad, P as PERMISSIONS } from "./index-079fd23d.mjs";
import "lodash/isEmpty";
import { Breadcrumbs, Crumb } from "@strapi/design-system/v2";
import { Formik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Refresh, Pencil, Check } from "@strapi/icons";
const schema = yup.object().shape({
  options: yup.object().shape({
    from: yup.object().shape({
      name: yup.string().required(translatedErrors.required),
      email: yup.string().email(translatedErrors.email).required(translatedErrors.required)
    }).required(),
    response_email: yup.string().email(translatedErrors.email),
    object: yup.string().required(translatedErrors.required),
    message: yup.string().required(translatedErrors.required)
  }).required(translatedErrors.required)
});
const EmailForm = ({ template, onToggle, onSubmit }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(
    ModalLayout,
    {
      onClose: onToggle,
      labelledBy: `${formatMessage({
        id: getTrad("PopUpForm.header.edit.email-templates"),
        defaultMessage: "Edit email template"
      })}, ${formatMessage({ id: getTrad(template.display), defaultMessage: template.display })}`,
      children: [
        /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsxs(
          Breadcrumbs,
          {
            label: `${formatMessage({
              id: getTrad("PopUpForm.header.edit.email-templates"),
              defaultMessage: "Edit email template"
            })}, ${formatMessage({
              id: getTrad(template.display),
              defaultMessage: template.display
            })}`,
            children: [
              /* @__PURE__ */ jsx(Crumb, { children: formatMessage({
                id: getTrad("PopUpForm.header.edit.email-templates"),
                defaultMessage: "Edit email template"
              }) }),
              /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: formatMessage({ id: getTrad(template.display), defaultMessage: template.display }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          Formik,
          {
            onSubmit,
            initialValues: template,
            validateOnChange: false,
            validationSchema: schema,
            enableReinitialize: true,
            children: ({ errors, values, handleChange, isSubmitting }) => {
              return /* @__PURE__ */ jsxs(Form, { children: [
                /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsxs(Grid, { gap: 5, children: [
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    GenericInput,
                    {
                      intlLabel: {
                        id: getTrad("PopUpForm.Email.options.from.name.label"),
                        defaultMessage: "Shipper name"
                      },
                      name: "options.from.name",
                      onChange: handleChange,
                      value: values.options.from.name,
                      error: errors?.options?.from?.name,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    GenericInput,
                    {
                      intlLabel: {
                        id: getTrad("PopUpForm.Email.options.from.email.label"),
                        defaultMessage: "Shipper email"
                      },
                      name: "options.from.email",
                      onChange: handleChange,
                      value: values.options.from.email,
                      error: errors?.options?.from?.email,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    GenericInput,
                    {
                      intlLabel: {
                        id: getTrad("PopUpForm.Email.options.response_email.label"),
                        defaultMessage: "Response email"
                      },
                      name: "options.response_email",
                      onChange: handleChange,
                      value: values.options.response_email,
                      error: errors?.options?.response_email,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(GridItem, { col: 6, s: 12, children: /* @__PURE__ */ jsx(
                    GenericInput,
                    {
                      intlLabel: {
                        id: getTrad("PopUpForm.Email.options.object.label"),
                        defaultMessage: "Subject"
                      },
                      name: "options.object",
                      onChange: handleChange,
                      value: values.options.object,
                      error: errors?.options?.object,
                      type: "text"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(GridItem, { col: 12, s: 12, children: /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      label: formatMessage({
                        id: getTrad("PopUpForm.Email.options.message.label"),
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
                /* @__PURE__ */ jsx(
                  ModalFooter,
                  {
                    startActions: /* @__PURE__ */ jsx(Button, { onClick: onToggle, variant: "tertiary", children: "Cancel" }),
                    endActions: /* @__PURE__ */ jsx(Button, { loading: isSubmitting, type: "submit", children: "Finish" })
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
  template: PropTypes.shape({
    display: PropTypes.string,
    icon: PropTypes.string,
    options: PropTypes.shape({
      from: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string
      }),
      message: PropTypes.string,
      object: PropTypes.string,
      response_email: PropTypes.string
    })
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};
const EmailTable = ({ canUpdate, onEditClick }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Table, { colCount: 3, rowCount: 3, children: [
    /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
      /* @__PURE__ */ jsx(Th, { width: "1%", children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
        id: getTrad("Email.template.table.icon.label"),
        defaultMessage: "icon"
      }) }) }),
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: getTrad("Email.template.table.name.label"),
        defaultMessage: "name"
      }) }) }),
      /* @__PURE__ */ jsx(Th, { width: "1%", children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
        id: getTrad("Email.template.table.action.label"),
        defaultMessage: "action"
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Tbody, { children: [
      /* @__PURE__ */ jsxs(Tr, { ...onRowClick({ fn: () => onEditClick("reset_password") }), children: [
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(
          Refresh,
          {
            "aria-label": formatMessage({
              id: "global.reset-password",
              defaultMessage: "Reset password"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
          id: "global.reset-password",
          defaultMessage: "Reset password"
        }) }) }),
        /* @__PURE__ */ jsx(Td, { ...stopPropagation, children: /* @__PURE__ */ jsx(
          IconButton,
          {
            onClick: () => onEditClick("reset_password"),
            label: formatMessage({
              id: getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            noBorder: true,
            icon: canUpdate && /* @__PURE__ */ jsx(Pencil, {})
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Tr, { ...onRowClick({ fn: () => onEditClick("email_confirmation") }), children: [
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(
          Check,
          {
            "aria-label": formatMessage({
              id: getTrad("Email.template.email_confirmation"),
              defaultMessage: "Email address confirmation"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
          id: getTrad("Email.template.email_confirmation"),
          defaultMessage: "Email address confirmation"
        }) }) }),
        /* @__PURE__ */ jsx(Td, { ...stopPropagation, children: /* @__PURE__ */ jsx(
          IconButton,
          {
            onClick: () => onEditClick("email_confirmation"),
            label: formatMessage({
              id: getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            noBorder: true,
            icon: canUpdate && /* @__PURE__ */ jsx(Pencil, {})
          }
        ) })
      ] })
    ] })
  ] });
};
EmailTable.propTypes = {
  canUpdate: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired
};
const ProtectedEmailTemplatesPage = () => /* @__PURE__ */ jsx(CheckPagePermissions, { permissions: PERMISSIONS.readEmailTemplates, children: /* @__PURE__ */ jsx(EmailTemplatesPage, {}) });
const EmailTemplatesPage = () => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { notifyStatus } = useNotifyAT();
  const toggleNotification = useNotification();
  const { lockApp, unlockApp } = useOverlayBlocker();
  const queryClient = useQueryClient();
  const { get, put } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  useFocusWhenNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [templateToEdit, setTemplateToEdit] = React.useState(null);
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate }
  } = useRBAC({ update: PERMISSIONS.updateEmailTemplates });
  const { isLoading: isLoadingData, data } = useQuery(
    ["users-permissions", "email-templates"],
    async () => {
      const { data: data2 } = await get("/users-permissions/email-templates");
      return data2;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: getTrad("Email.template.data.loaded"),
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
  const submitMutation = useMutation(
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
    return /* @__PURE__ */ jsxs(Main, { "aria-busy": "true", children: [
      /* @__PURE__ */ jsx(
        SettingsPageTitle,
        {
          name: formatMessage({
            id: getTrad("HeaderNav.link.emailTemplates"),
            defaultMessage: "Email templates"
          })
        }
      ),
      /* @__PURE__ */ jsx(
        HeaderLayout,
        {
          title: formatMessage({
            id: getTrad("HeaderNav.link.emailTemplates"),
            defaultMessage: "Email templates"
          })
        }
      ),
      /* @__PURE__ */ jsx(ContentLayout, { children: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": submitMutation.isLoading, children: [
    /* @__PURE__ */ jsx(
      SettingsPageTitle,
      {
        name: formatMessage({
          id: getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ),
    /* @__PURE__ */ jsx(
      HeaderLayout,
      {
        title: formatMessage({
          id: getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ),
    /* @__PURE__ */ jsxs(ContentLayout, { children: [
      /* @__PURE__ */ jsx(EmailTable, { onEditClick: handleEditClick, canUpdate }),
      isModalOpen && /* @__PURE__ */ jsx(
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
export {
  ProtectedEmailTemplatesPage as default
};
//# sourceMappingURL=index-d4e4505b.mjs.map
