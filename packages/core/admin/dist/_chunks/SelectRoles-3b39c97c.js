"use strict";
const jsxRuntime = require("react/jsx-runtime");
const reactIntl = require("react-intl");
const index = require("./index-be8080e3.js");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const Icons = require("@strapi/icons");
const reactQuery = require("react-query");
const styled = require("styled-components");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const MagicLinkWrapper = ({ children, target }) => {
  const toggleNotification = helperPlugin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { copy } = helperPlugin.useClipboard();
  const copyLabel = formatMessage({
    id: "app.component.CopyToClipboard.label",
    defaultMessage: "Copy to clipboard"
  });
  const handleClick = async () => {
    const didCopy = await copy(target);
    if (didCopy) {
      toggleNotification({ type: "info", message: { id: "notification.link-copied" } });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    helperPlugin.ContentBox,
    {
      endAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.IconButton, { label: copyLabel, noBorder: true, icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Duplicate, {}), onClick: handleClick }),
      title: target,
      titleEllipsis: true,
      subtitle: children,
      icon: /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: 32 }, children: "✉️" }),
      iconBackground: "neutral100"
    }
  );
};
const MagicLinkCE = ({ registrationToken }) => {
  const { formatMessage } = reactIntl.useIntl();
  const target = `${window.location.origin}${index.getBasename()}/auth/register?registrationToken=${registrationToken}`;
  return /* @__PURE__ */ jsxRuntime.jsx(MagicLinkWrapper, { target, children: formatMessage({
    id: "app.components.Users.MagicLink.connect",
    defaultMessage: "Copy and share this link to give access to this user"
  }) });
};
const SelectRoles = ({ disabled, error, onChange, value }) => {
  const { get } = helperPlugin.useFetchClient();
  const { isLoading, data } = reactQuery.useQuery(
    ["roles"],
    async () => {
      const {
        data: { data: data2 }
      } = await get("/admin/roles");
      return data2;
    },
    {
      staleTime: 5e4
    }
  );
  const { formatMessage } = reactIntl.useIntl();
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  const label = formatMessage({
    id: "app.components.Users.ModalCreateBody.block-title.roles",
    defaultMessage: "User's roles"
  });
  const hint = formatMessage({
    id: "app.components.Users.ModalCreateBody.block-title.roles.description",
    defaultMessage: "A user can have one or several roles"
  });
  const placeholder = formatMessage({
    id: "app.components.Select.placeholder",
    defaultMessage: "Select"
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.MultiSelect,
    {
      id: "roles",
      disabled,
      error: errorMessage,
      hint,
      label,
      name: "roles",
      onChange: (v) => {
        onChange({ target: { name: "roles", value: v } });
      },
      placeholder,
      startIcon: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(Loader, {}) : void 0,
      value: value.map((v) => v.toString()),
      withTags: true,
      required: true,
      children: (data ?? []).map((role) => {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.MultiSelectOption, { value: role.id.toString(), children: formatMessage({
          id: `global.${role.code}`,
          defaultMessage: role.name
        }) }, role.id);
      })
    }
  );
};
const rotation = styled.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoadingWrapper = styled__default.default.div`
  animation: ${rotation} 2s infinite linear;
`;
const Loader = () => /* @__PURE__ */ jsxRuntime.jsx(LoadingWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Loader, {}) });
exports.MagicLinkCE = MagicLinkCE;
exports.MagicLinkWrapper = MagicLinkWrapper;
exports.SelectRoles = SelectRoles;
//# sourceMappingURL=SelectRoles-3b39c97c.js.map
