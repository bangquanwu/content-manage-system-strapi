import { prefixPluginTranslations } from "@strapi/helper-plugin";
import { jsx } from "react/jsx-runtime";
import { Flex, Icon } from "@strapi/design-system";
import { Paint } from "@strapi/icons";
import styled from "styled-components";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const IconBox = styled(Flex)`
  /* Hard code color values */
  /* to stay consistent between themes */
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;
const ColorPickerIcon = () => {
  return /* @__PURE__ */ jsx(IconBox, { justifyContent: "center", alignItems: "center", width: 7, height: 6, hasRadius: true, "aria-hidden": true, children: /* @__PURE__ */ jsx(Icon, { as: Paint }) });
};
const pluginId = "color-picker";
const getTrad = (id) => `${pluginId}.${id}`;
const index = {
  /**
   * TODO: we need to have the type for StrapiApp done from `@strapi/admin` package.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(app) {
    app.customFields.register({
      name: "color",
      pluginId: "color-picker",
      type: "string",
      icon: ColorPickerIcon,
      intlLabel: {
        id: getTrad("color-picker.label"),
        defaultMessage: "Color"
      },
      intlDescription: {
        id: getTrad("color-picker.description"),
        defaultMessage: "Select any color"
      },
      components: {
        Input: async () => import("./ColorPickerInput-ee59d80f.mjs").then((module) => ({
          default: module.ColorPickerInput
        }))
      },
      options: {
        advanced: [
          {
            intlLabel: {
              id: getTrad("color-picker.options.advanced.regex"),
              defaultMessage: "RegExp pattern"
            },
            name: "regex",
            type: "text",
            defaultValue: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
            description: {
              id: getTrad("color-picker.options.advanced.regex.description"),
              defaultMessage: "The text of the regular expression"
            }
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings"
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: getTrad("color-picker.options.advanced.requiredField"),
                  defaultMessage: "Required field"
                },
                description: {
                  id: getTrad("color-picker.options.advanced.requiredField.description"),
                  defaultMessage: "You won't be able to create an entry if this field is empty"
                }
              }
            ]
          }
        ]
      }
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/cs.json": () => import("./cs-32e5b75a.mjs"), "./translations/en.json": () => import("./en-2230584b.mjs"), "./translations/ru.json": () => import("./ru-0bf57448.mjs"), "./translations/sv.json": () => import("./sv-de6a785a.mjs"), "./translations/tr.json": () => import("./tr-4d632eac.mjs"), "./translations/zh.json": () => import("./zh-5ba3e025.mjs") }), `./translations/${locale}.json`).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
export {
  getTrad as g,
  index as i
};
//# sourceMappingURL=index-10d18ad6.mjs.map
