import { prefixPluginTranslations } from "@strapi/helper-plugin";
import { jsx } from "react/jsx-runtime";
import { Layout } from "@strapi/icons";
import produce, { current } from "immer";
import get from "lodash/get";
import set from "lodash/set";
import snakeCase from "lodash/snakeCase";
import pluralize from "pluralize";
import slugify from "@sindresorhus/slugify";
import cloneDeep from "lodash/cloneDeep";
import * as yup from "yup";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const name$1 = "@strapi/plugin-content-type-builder";
const version = "4.15.5";
const description = "Strapi plugin to create content type";
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
const exports = {
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    types: "./dist/server/src/index.d.ts",
    source: "./server/src/index.ts",
    "import": "./dist/server/index.mjs",
    require: "./dist/server/index.js",
    "default": "./dist/server/index.js"
  },
  "./package.json": "./package.json"
};
const types = "./dist/index.d.ts";
const files = [
  "./dist",
  "strapi-server.js"
];
const scripts = {
  build: "pack-up build",
  clean: "run -T rimraf ./dist",
  lint: "run -T eslint .",
  prepublishOnly: "yarn clean && yarn build",
  "test:front": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js",
  "test:front:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js",
  "test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watchAll",
  "test:front:watch:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js --watchAll",
  "test:ts:back": "run -T tsc -p server/tsconfig.eslint.json",
  "test:ts:front": "run -T tsc -p admin/tsconfig.json",
  "test:unit": "run -T jest",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@reduxjs/toolkit": "1.9.7",
  "@sindresorhus/slugify": "1.1.0",
  "@strapi/design-system": "1.13.2",
  "@strapi/generators": "4.15.5",
  "@strapi/helper-plugin": "4.15.5",
  "@strapi/icons": "1.13.2",
  "@strapi/utils": "4.15.5",
  "fs-extra": "10.0.0",
  immer: "9.0.19",
  "koa-bodyparser": "4.4.1",
  lodash: "4.17.21",
  pluralize: "8.0.0",
  "prop-types": "^15.8.1",
  qs: "6.11.1",
  "react-helmet": "^6.1.0",
  "react-intl": "6.4.1",
  "react-redux": "8.1.1",
  yup: "0.32.9"
};
const devDependencies = {
  "@strapi/pack-up": "4.15.5",
  "@strapi/strapi": "4.15.5",
  "@strapi/types": "4.15.5",
  "@testing-library/react": "14.0.0",
  "@testing-library/react-hooks": "8.0.1",
  "@testing-library/user-event": "14.4.3",
  "@types/pluralize": "0.0.30",
  history: "^4.9.0",
  koa: "2.13.4",
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "5.3.4",
  "styled-components": "5.3.3"
};
const peerDependencies = {
  "@strapi/strapi": "^4.0.0",
  react: "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "react-router-dom": "^5.2.0",
  "styled-components": "^5.2.1"
};
const engines = {
  node: ">=18.0.0 <=20.x.x",
  npm: ">=6.0.0"
};
const strapi = {
  name: "content-type-builder",
  displayName: "Content Type Builder",
  description: "Modelize the data structure of your API. Create new fields and relations in just a minute. The files are automatically created and updated in your project.",
  kind: "plugin",
  required: true
};
const pluginPkg = {
  name: name$1,
  version,
  description,
  repository,
  license,
  author,
  maintainers,
  exports,
  types,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi
};
const PluginIcon = () => /* @__PURE__ */ jsx(Layout, {});
const PERMISSIONS = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  main: [{ action: "plugin::content-type-builder.read", subject: null }]
};
const pluginId = pluginPkg.name.replace(/^@strapi\/plugin-/i, "");
const getRelationType = (relation, targetAttribute) => {
  const hasNotTargetAttribute = targetAttribute === void 0 || targetAttribute === null;
  if (relation === "oneToOne" && hasNotTargetAttribute) {
    return "oneWay";
  }
  if (relation === "oneToMany" && hasNotTargetAttribute) {
    return "manyWay";
  }
  return relation;
};
const makeUnique = (array) => [...new Set(array)];
const ADD_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/ADD_ATTRIBUTE";
const ADD_CUSTOM_FIELD_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/ADD_CUSTOM_FIELD_ATTRIBUTE";
const ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE = "ContentTypeBuilder/DataManagerProvider/ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE";
const CHANGE_DYNAMIC_ZONE_COMPONENTS = "ContentTypeBuilder/DataManagerProvider/CHANGE_DYNAMIC_ZONE_COMPONENTS";
const CREATE_SCHEMA = "ContentTypeBuilder/DataManagerProvider/CREATE_SCHEMA";
const CREATE_COMPONENT_SCHEMA = "ContentTypeBuilder/DataManagerProvider/CREATE_COMPONENT_SCHEMA";
const DELETE_NOT_SAVED_TYPE = "ContentTypeBuilder/DataManagerProvider/DELETE_NOT_SAVED_TYPE";
const EDIT_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/EDIT_ATTRIBUTE";
const EDIT_CUSTOM_FIELD_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/EDIT_CUSTOM_FIELD_ATTRIBUTE";
const GET_DATA_SUCCEEDED = "ContentTypeBuilder/DataManagerProvider/GET_DATA_SUCCEEDED";
const RELOAD_PLUGIN = "ContentTypeBuilder/DataManagerProvider/RELOAD_PLUGIN";
const REMOVE_FIELD_FROM_DISPLAYED_COMPONENT = "ContentTypeBuilder/DataManagerProvider/REMOVE_FIELD_FROM_DISPLAYED_COMPONENT";
const REMOVE_COMPONENT_FROM_DYNAMIC_ZONE = "ContentTypeBuilder/DataManagerProvider/REMOVE_COMPONENT_FROM_DYNAMIC_ZONE";
const REMOVE_FIELD = "ContentTypeBuilder/DataManagerProvider/REMOVE_FIELD";
const SET_MODIFIED_DATA = "ContentTypeBuilder/DataManagerProvider/SET_MODIFIED_DATA";
const UPDATE_SCHEMA = "ContentTypeBuilder/DataManagerProvider/UPDATE_SCHEMA";
const retrieveComponentsFromSchema = (attributes, allComponentsData) => {
  const allComponents = attributes.reduce((acc, current2) => {
    const type = current2.type;
    if (type === "component") {
      const currentComponentName = current2.component;
      acc.push(currentComponentName);
      const currentComponentAttributes = get(
        allComponentsData,
        [currentComponentName, "schema", "attributes"],
        []
      );
      acc.push(...retrieveComponentsFromSchema(currentComponentAttributes, allComponentsData));
    }
    if (type === "dynamiczone") {
      const dynamicZoneComponents = current2.components;
      const componentsFromDZComponents = dynamicZoneComponents.reduce((acc2, currentUid) => {
        const compoAttrs = get(allComponentsData, [currentUid, "schema", "attributes"], []);
        return [...acc2, ...retrieveComponentsFromSchema(compoAttrs, allComponentsData)];
      }, []);
      return [...acc, ...dynamicZoneComponents, ...componentsFromDZComponents];
    }
    return acc;
  }, []);
  return makeUnique(allComponents);
};
const initialState$1 = {
  components: {},
  contentTypes: {},
  initialComponents: {},
  initialContentTypes: {},
  initialData: {},
  modifiedData: {
    components: {},
    contentTypes: {}
  },
  reservedNames: {},
  isLoading: true,
  isLoadingForDataToBeSet: true
};
const ONE_SIDE_RELATIONS = ["oneWay", "manyWay"];
const getOppositeRelation = (originalRelation) => {
  if (originalRelation === "manyToOne") {
    return "oneToMany";
  }
  if (originalRelation === "oneToMany") {
    return "manyToOne";
  }
  return originalRelation;
};
const findAttributeIndex = (schema, attributeToFind) => {
  return schema.schema.attributes.findIndex(
    ({ name: name2 }) => name2 === attributeToFind
  );
};
const reducer$1 = (state = initialState$1, action) => produce(state, (draftState) => {
  switch (action.type) {
    case ADD_ATTRIBUTE: {
      const {
        attributeToSet: { name: name2, ...rest },
        forTarget,
        targetUid
      } = action;
      delete rest.createComponent;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const currentAttributes = get(
        state,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        []
      ).slice();
      const updatedAttributes = [...currentAttributes, { ...rest, name: name2 }];
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        updatedAttributes
      );
      if (action.shouldAddComponentToData) {
        const componentToAddUID = rest.component;
        const componentToAdd = state.components[componentToAddUID];
        const isTemporaryComponent = componentToAdd?.isTemporary;
        const hasComponentAlreadyBeenAdded = state.modifiedData.components?.[componentToAddUID] !== void 0;
        if (isTemporaryComponent || hasComponentAlreadyBeenAdded) {
          break;
        }
        if (!draftState.modifiedData.components) {
          draftState.modifiedData.components = {};
        }
        draftState.modifiedData.components[componentToAddUID] = componentToAdd;
        const nestedComponents = retrieveComponentsFromSchema(
          componentToAdd.schema.attributes,
          state.components
        );
        const nestedComponentsToAddInModifiedData = nestedComponents.filter(
          (compoUID) => {
            return get(state, ["modifiedData", "components", compoUID]) === void 0;
          }
        );
        nestedComponentsToAddInModifiedData.forEach((compoUID) => {
          const compoSchema = get(state, ["components", compoUID], {});
          const isTemporary = compoSchema.isTemporary || false;
          if (!isTemporary) {
            if (!draftState.modifiedData.components) {
              draftState.modifiedData.components = {};
            }
            draftState.modifiedData.components[compoUID] = compoSchema;
          }
        });
        break;
      }
      const isCreatingRelationAttribute = rest.type === "relation";
      if (isCreatingRelationAttribute) {
        const target = rest.target;
        const targetAttribute = rest.targetAttribute || null;
        const relation = rest.relation;
        const relationType = getRelationType(relation, targetAttribute);
        const currentUid = get(state, ["modifiedData", ...pathToDataToEdit, "uid"]);
        if (rest.type === "relation" && relationType !== "oneWay" && relationType !== "manyWay" && target === currentUid) {
          const oppositeAttribute = {
            name: targetAttribute,
            relation: getOppositeRelation(relationType),
            target,
            targetAttribute: name2,
            type: "relation"
          };
          if (rest.private) {
            oppositeAttribute.private = rest.private;
          }
          const attributesToSet = [...updatedAttributes, oppositeAttribute];
          set(
            draftState,
            ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
            attributesToSet
          );
        }
      }
      break;
    }
    case ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE: {
      const { dynamicZoneTarget, componentsToAdd } = action;
      const dzAttributeIndex = findAttributeIndex(
        state.modifiedData.contentType,
        dynamicZoneTarget
      );
      componentsToAdd.forEach((componentUid) => {
        if (!draftState.modifiedData.contentType?.schema.attributes[dzAttributeIndex].components) {
          draftState.modifiedData.contentType.schema.attributes[dzAttributeIndex].components = [];
        }
        draftState.modifiedData.contentType.schema.attributes[dzAttributeIndex].components.push(
          componentUid
        );
      });
      break;
    }
    case ADD_CUSTOM_FIELD_ATTRIBUTE: {
      const {
        attributeToSet: { name: name2, ...rest },
        forTarget,
        targetUid
      } = action;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const currentAttributes = get(
        state,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        []
      ).slice();
      const updatedAttributes = [...currentAttributes, { ...rest, name: name2 }];
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        updatedAttributes
      );
      break;
    }
    case CHANGE_DYNAMIC_ZONE_COMPONENTS: {
      const { dynamicZoneTarget, newComponents } = action;
      const dzAttributeIndex = findAttributeIndex(
        state.modifiedData.contentType,
        dynamicZoneTarget
      );
      const currentDZComponents = (state.modifiedData.contentType?.schema.attributes[dzAttributeIndex]).components;
      const updatedComponents = makeUnique([...currentDZComponents, ...newComponents]);
      (draftState.modifiedData.contentType?.schema.attributes[dzAttributeIndex]).components = updatedComponents;
      const nestedComponents = retrieveComponentsFromSchema(
        current(draftState.modifiedData.contentType.schema.attributes),
        state.components
      );
      const nestedComponentsToAddInModifiedData = nestedComponents.filter((compoUID) => {
        return get(state, ["modifiedData", "components", compoUID]) === void 0;
      });
      nestedComponentsToAddInModifiedData.forEach((compoUID) => {
        const compoSchema = get(state, ["components", compoUID], {});
        const isTemporary = compoSchema.isTemporary || false;
        if (!isTemporary) {
          if (!draftState.modifiedData.components) {
            draftState.modifiedData.components = {};
          }
          draftState.modifiedData.components[compoUID] = compoSchema;
        }
      });
      break;
    }
    case CREATE_COMPONENT_SCHEMA: {
      const newSchema = {
        uid: action.uid,
        isTemporary: true,
        category: action.componentCategory,
        schema: {
          ...action.data,
          attributes: []
        }
      };
      draftState.components[action.uid] = newSchema;
      if (action.shouldAddComponentToData) {
        draftState.modifiedData.components[action.uid] = newSchema;
      }
      break;
    }
    case CREATE_SCHEMA: {
      const newSchema = {
        uid: action.uid,
        isTemporary: true,
        schema: {
          ...action.data,
          attributes: []
        }
      };
      draftState.contentTypes[action.uid] = newSchema;
      break;
    }
    case EDIT_ATTRIBUTE: {
      const {
        attributeToSet: { name: name2, ...rest },
        forTarget,
        targetUid,
        initialAttribute
      } = action;
      const initialAttributeName = initialAttribute.name;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const initialAttributeIndex = findAttributeIndex(
        get(state, ["modifiedData", ...pathToDataToEdit]),
        initialAttributeName
      );
      const isEditingRelation = rest.type === "relation";
      if (!isEditingRelation) {
        set(
          draftState,
          ["modifiedData", ...pathToDataToEdit, "schema", "attributes", initialAttributeIndex],
          action.attributeToSet
        );
        break;
      }
      const updatedAttributes = get(state, [
        "modifiedData",
        ...pathToDataToEdit,
        "schema",
        "attributes"
      ]).slice();
      const toSet = {
        name: name2,
        relation: rest.relation,
        target: rest.target,
        targetAttribute: rest.targetAttribute,
        type: "relation"
      };
      if (rest.private) {
        toSet.private = rest.private;
      }
      if (rest.pluginOptions) {
        toSet.pluginOptions = rest.pluginOptions;
      }
      const currentAttributeIndex = updatedAttributes.findIndex((value) => {
        return value.name !== void 0 && value.name === initialAttribute.name;
      });
      if (currentAttributeIndex !== -1) {
        updatedAttributes.splice(currentAttributeIndex, 1, toSet);
      }
      let oppositeAttributeNameToRemove = null;
      let oppositeAttributeNameToUpdate = null;
      let oppositeAttributeToCreate = null;
      let initialOppositeAttribute = null;
      const currentUid = get(state, ["modifiedData", ...pathToDataToEdit, "uid"]);
      const didChangeTargetRelation = initialAttribute.target !== rest.target;
      const didCreateInternalRelation = rest.target === currentUid;
      const relationType = getRelationType(rest.relation, rest.targetAttribute);
      const initialRelationType = getRelationType(
        initialAttribute.relation,
        initialAttribute.targetAttribute
      );
      const hadInternalRelation = initialAttribute.target === currentUid;
      const didChangeRelationType = initialRelationType !== relationType;
      const shouldRemoveOppositeAttributeBecauseOfTargetChange = didChangeTargetRelation && !didCreateInternalRelation && hadInternalRelation && isEditingRelation;
      const shouldRemoveOppositeAttributeBecauseOfRelationTypeChange = didChangeRelationType && hadInternalRelation && ["oneWay", "manyWay"].includes(relationType) && isEditingRelation;
      const shouldUpdateOppositeAttributeBecauseOfRelationTypeChange = !ONE_SIDE_RELATIONS.includes(initialRelationType) && !ONE_SIDE_RELATIONS.includes(relationType) && hadInternalRelation && didCreateInternalRelation && isEditingRelation;
      const shouldCreateOppositeAttributeBecauseOfRelationTypeChange = ONE_SIDE_RELATIONS.includes(initialRelationType) && !ONE_SIDE_RELATIONS.includes(relationType) && hadInternalRelation && didCreateInternalRelation && isEditingRelation;
      const shouldCreateOppositeAttributeBecauseOfTargetChange = didChangeTargetRelation && didCreateInternalRelation && !ONE_SIDE_RELATIONS.includes(relationType);
      if (shouldRemoveOppositeAttributeBecauseOfTargetChange || shouldRemoveOppositeAttributeBecauseOfRelationTypeChange) {
        oppositeAttributeNameToRemove = initialAttribute.targetAttribute;
      }
      if (oppositeAttributeNameToRemove) {
        const indexToRemove = updatedAttributes.findIndex(
          (value) => value.name === oppositeAttributeNameToRemove
        );
        updatedAttributes.splice(indexToRemove, 1);
      }
      if (!shouldRemoveOppositeAttributeBecauseOfTargetChange) {
        const initialTargetContentType = get(state, [
          "initialContentTypes",
          initialAttribute.target
        ]);
        if (initialTargetContentType) {
          const oppositeAttributeIndex = findAttributeIndex(
            initialTargetContentType,
            initialAttribute.targetAttribute
          );
          initialOppositeAttribute = get(state, [
            "initialContentTypes",
            initialAttribute.target,
            "schema",
            "attributes",
            oppositeAttributeIndex
          ]);
        }
      }
      if (shouldCreateOppositeAttributeBecauseOfRelationTypeChange || shouldCreateOppositeAttributeBecauseOfTargetChange) {
        oppositeAttributeToCreate = {
          name: rest.targetAttribute,
          relation: getOppositeRelation(relationType),
          target: rest.target,
          targetAttribute: name2,
          type: "relation"
        };
        if (rest.private) {
          oppositeAttributeToCreate.private = rest.private;
        }
        if (initialOppositeAttribute && initialOppositeAttribute.pluginOptions) {
          oppositeAttributeToCreate.pluginOptions = initialOppositeAttribute.pluginOptions;
        }
        const indexOfInitialAttribute = updatedAttributes.findIndex(
          ({ name: name22 }) => name22 === initialAttribute.name
        );
        const indexOfUpdatedAttribute = updatedAttributes.findIndex(
          ({ name: attrName }) => name2 === attrName
        );
        const indexToInsert = (indexOfInitialAttribute === -1 ? indexOfUpdatedAttribute : indexOfInitialAttribute) + 1;
        updatedAttributes.splice(indexToInsert, 0, oppositeAttributeToCreate);
      }
      if (shouldUpdateOppositeAttributeBecauseOfRelationTypeChange) {
        oppositeAttributeNameToUpdate = initialAttribute.targetAttribute;
        oppositeAttributeToCreate = {
          name: rest.targetAttribute,
          relation: getOppositeRelation(relationType),
          target: rest.target,
          targetAttribute: name2,
          type: "relation"
        };
        if (rest.private) {
          oppositeAttributeToCreate.private = rest.private;
        }
        if (initialOppositeAttribute && initialOppositeAttribute.pluginOptions) {
          oppositeAttributeToCreate.pluginOptions = initialOppositeAttribute.pluginOptions;
        }
        if (oppositeAttributeNameToUpdate) {
          const indexToUpdate = updatedAttributes.findIndex(
            ({ name: name22 }) => name22 === oppositeAttributeNameToUpdate
          );
          updatedAttributes.splice(indexToUpdate, 1, oppositeAttributeToCreate);
        }
      }
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        updatedAttributes
      );
      break;
    }
    case EDIT_CUSTOM_FIELD_ATTRIBUTE: {
      const { forTarget, targetUid, initialAttribute, attributeToSet } = action;
      const initialAttributeName = initialAttribute.name;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const initialAttributeIndex = findAttributeIndex(
        get(state, ["modifiedData", ...pathToDataToEdit]),
        initialAttributeName
      );
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes", initialAttributeIndex],
        attributeToSet
      );
      break;
    }
    case GET_DATA_SUCCEEDED: {
      draftState.components = action.components;
      draftState.initialComponents = action.components;
      draftState.initialContentTypes = action.contentTypes;
      draftState.contentTypes = action.contentTypes;
      draftState.reservedNames = action.reservedNames;
      draftState.isLoading = false;
      break;
    }
    case DELETE_NOT_SAVED_TYPE: {
      draftState.contentTypes = state.initialContentTypes;
      draftState.components = state.initialComponents;
      break;
    }
    case RELOAD_PLUGIN: {
      return initialState$1;
    }
    case REMOVE_COMPONENT_FROM_DYNAMIC_ZONE: {
      const dzAttributeIndex = findAttributeIndex(state.modifiedData.contentType, action.dzName);
      draftState.modifiedData.contentType.schema.attributes[dzAttributeIndex].components.splice(
        action.componentToRemoveIndex,
        1
      );
      break;
    }
    case REMOVE_FIELD: {
      const { mainDataKey, attributeToRemoveName } = action;
      const pathToAttributes = ["modifiedData", mainDataKey, "schema", "attributes"];
      const attributeToRemoveIndex = findAttributeIndex(
        state.modifiedData[mainDataKey],
        attributeToRemoveName
      );
      const pathToAttributeToRemove = [...pathToAttributes, attributeToRemoveIndex];
      const attributeToRemoveData = get(state, pathToAttributeToRemove);
      const isRemovingRelationAttribute = attributeToRemoveData.type === "relation";
      const canTheAttributeToRemoveHaveARelationWithItself = mainDataKey === "contentType";
      if (isRemovingRelationAttribute && canTheAttributeToRemoveHaveARelationWithItself) {
        const { target, relation, targetAttribute } = attributeToRemoveData;
        const relationType = getRelationType(relation, targetAttribute);
        const uid = state.modifiedData.contentType?.uid;
        const shouldRemoveOppositeAttribute = target === uid && !ONE_SIDE_RELATIONS.includes(relationType);
        if (shouldRemoveOppositeAttribute) {
          const attributes = state.modifiedData[mainDataKey]?.schema.attributes.slice();
          const nextAttributes = attributes.filter((attribute) => {
            if (attribute.name === attributeToRemoveName) {
              return false;
            }
            if (attribute.target === uid && attribute.targetAttribute === attributeToRemoveName) {
              return false;
            }
            return true;
          });
          draftState.modifiedData[mainDataKey].schema.attributes = nextAttributes;
          break;
        }
      }
      const uidFieldsToUpdate = state.modifiedData[mainDataKey].schema.attributes.slice().reduce((acc, current2) => {
        if (current2.type !== "uid") {
          return acc;
        }
        if (current2.targetField !== attributeToRemoveName) {
          return acc;
        }
        acc.push(current2.name);
        return acc;
      }, []);
      uidFieldsToUpdate.forEach((fieldName) => {
        const fieldIndex = findAttributeIndex(state.modifiedData[mainDataKey], fieldName);
        delete draftState.modifiedData[mainDataKey]?.schema.attributes[fieldIndex].targetField;
      });
      draftState.modifiedData[mainDataKey]?.schema.attributes.splice(attributeToRemoveIndex, 1);
      break;
    }
    case REMOVE_FIELD_FROM_DISPLAYED_COMPONENT: {
      const { attributeToRemoveName, componentUid } = action;
      const attributeToRemoveIndex = findAttributeIndex(
        state.modifiedData.components?.[componentUid],
        attributeToRemoveName
      );
      draftState.modifiedData.components?.[componentUid]?.schema?.attributes?.splice(
        attributeToRemoveIndex,
        1
      );
      break;
    }
    case SET_MODIFIED_DATA: {
      draftState.isLoadingForDataToBeSet = false;
      draftState.initialData = action.schemaToSet;
      draftState.modifiedData = action.schemaToSet;
      if (!action.hasJustCreatedSchema) {
        draftState.components = state.initialComponents;
        draftState.contentTypes = state.initialContentTypes;
      }
      break;
    }
    case UPDATE_SCHEMA: {
      const {
        data: { displayName, category, icon, kind },
        schemaType,
        uid
      } = action;
      draftState.modifiedData[schemaType].schema.displayName = displayName;
      if (action.schemaType === "component") {
        draftState.modifiedData.component.category = category;
        draftState.modifiedData.component.schema.icon = icon;
        const addedComponent = current(draftState.modifiedData.component);
        draftState.components[uid] = addedComponent;
        break;
      }
      draftState.modifiedData.contentType.schema.kind = kind;
      break;
    }
    default:
      return draftState;
  }
});
const nameToSlug = (name2) => slugify(name2, { separator: "-" });
const ON_CHANGE = "ContentTypeBuilder/FormModal/ON_CHANGE";
const ON_CHANGE_RELATION_TARGET = "ContentTypeBuilder/FormModal/ON_CHANGE_RELATION_TARGET";
const ON_CHANGE_RELATION_TYPE = "ContentTypeBuilder/FormModal/ON_CHANGE_RELATION_TYPE";
const RESET_PROPS = "ContentTypeBuilder/FormModal/RESET_PROPS";
const RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO = "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO";
const RESET_PROPS_AND_SAVE_CURRENT_DATA = "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SAVE_CURRENT_DATA";
const RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ = "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ";
const SET_DATA_TO_EDIT = "ContentTypeBuilder/FormModal/SET_DATA_TO_EDIT";
const SET_ATTRIBUTE_DATA_SCHEMA = "ContentTypeBuilder/FormModal/SET_ATTRIBUTE_DATA_SCHEMA";
const SET_CUSTOM_FIELD_DATA_SCHEMA = "ContentTypeBuilder/FormModal/SET_CUSTOM_FIELD_DATA_SCHEMA";
const SET_DYNAMIC_ZONE_DATA_SCHEMA = "ContentTypeBuilder/FormModal/SET_DYNAMIC_ZONE_DATA_SCHEMA";
const SET_ERRORS = "ContentTypeBuilder/FormModal/SET_ERRORS";
const createUid = (name2) => {
  const modelName = nameToSlug(name2);
  const uid = `api::${modelName}.${modelName}`;
  return uid;
};
const createComponentUid = (name2, category) => {
  return `${nameToSlug(category)}.${nameToSlug(name2)}`;
};
const customFieldDefaultOptionsReducer = (acc, option) => {
  if (option.items) {
    return option.items.reduce(customFieldDefaultOptionsReducer, acc);
  }
  if ("defaultValue" in option) {
    const { name: name2, defaultValue } = option;
    acc.push({ name: name2, defaultValue });
  }
  return acc;
};
const shouldPluralizeName = (nature) => ["manyToMany", "oneToMany", "manyWay"].includes(nature) ? 2 : 1;
const shouldPluralizeTargetAttribute = (nature) => ["manyToMany", "manyToOne"].includes(nature) ? 2 : 1;
const initialState = {
  formErrors: {},
  modifiedData: {},
  initialData: {},
  componentToCreate: {},
  isCreatingComponentWhileAddingAField: false
};
const reducer = (state = initialState, action) => (
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    switch (action.type) {
      case ON_CHANGE: {
        const { keys, value } = action;
        const obj = state.modifiedData;
        const hasDefaultValue = Boolean(obj.default);
        if (hasDefaultValue && keys.length === 1 && keys.includes("type")) {
          const previousType = obj.type;
          if (previousType && ["date", "datetime", "time"].includes(previousType)) {
            delete draftState.modifiedData.default;
          }
        }
        set(draftState, ["modifiedData", ...keys], value);
        break;
      }
      case ON_CHANGE_RELATION_TARGET: {
        const {
          target: {
            oneThatIsCreatingARelationWithAnother,
            selectedContentTypeFriendlyName,
            targetContentTypeAllowedRelations,
            value
          }
        } = action;
        let didChangeRelationTypeBecauseOfRestrictedRelation = false;
        let changedRelationType = null;
        set(draftState, ["modifiedData", "target"], value);
        const modifiedData = state.modifiedData;
        if (Array.isArray(targetContentTypeAllowedRelations)) {
          const currentRelationType = getRelationType(
            modifiedData.relation,
            modifiedData.targetAttribute
          );
          if (!targetContentTypeAllowedRelations.includes(currentRelationType)) {
            const relationToSet = targetContentTypeAllowedRelations[0];
            didChangeRelationTypeBecauseOfRestrictedRelation = true;
            changedRelationType = relationToSet;
            if (relationToSet === "oneWay") {
              set(draftState, ["modifiedData", "relation"], "oneToOne");
            } else if (relationToSet === "manyWay") {
              set(draftState, ["modifiedData", "relation"], "oneToMany");
            } else {
              set(draftState, ["modifiedData", "relation"], relationToSet);
            }
          }
        }
        let nameToSet;
        if (didChangeRelationTypeBecauseOfRestrictedRelation) {
          nameToSet = pluralize(
            snakeCase(nameToSlug(selectedContentTypeFriendlyName)),
            shouldPluralizeName(changedRelationType)
          );
        } else {
          nameToSet = pluralize(
            snakeCase(nameToSlug(selectedContentTypeFriendlyName)),
            shouldPluralizeName(modifiedData.relation)
          );
        }
        set(draftState, ["modifiedData", "name"], nameToSet);
        const currentTargetAttribute = state.modifiedData.targetAttribute;
        if (currentTargetAttribute === null) {
          break;
        }
        if (didChangeRelationTypeBecauseOfRestrictedRelation && ["oneWay", "manyWay"].includes(changedRelationType)) {
          set(draftState, ["modifiedData", "targetAttribute"], null);
          break;
        }
        const targetAttributeToSet = pluralize(
          snakeCase(nameToSlug(oneThatIsCreatingARelationWithAnother)),
          shouldPluralizeTargetAttribute(modifiedData.relation)
        );
        set(draftState, ["modifiedData", "targetAttribute"], targetAttributeToSet);
        break;
      }
      case ON_CHANGE_RELATION_TYPE: {
        const {
          target: { oneThatIsCreatingARelationWithAnother, value }
        } = action;
        const currentName = state.modifiedData.name;
        if (!["oneWay", "manyWay"].includes(value)) {
          set(draftState, ["modifiedData", "relation"], value);
          const currentTargetAttribute = state.modifiedData.targetAttribute;
          set(
            draftState,
            ["modifiedData", "name"],
            pluralize(snakeCase(nameToSlug(currentName)), shouldPluralizeName(value))
          );
          set(
            draftState,
            ["modifiedData", "targetAttribute"],
            pluralize(
              currentTargetAttribute || snakeCase(nameToSlug(oneThatIsCreatingARelationWithAnother)),
              shouldPluralizeTargetAttribute(value)
            )
          );
          break;
        }
        if (value === "oneWay") {
          set(draftState, ["modifiedData", "relation"], "oneToOne");
          set(draftState, ["modifiedData", "targetAttribute"], null);
          set(draftState, ["modifiedData", "name"], pluralize(snakeCase(currentName), 1));
          break;
        }
        set(draftState, ["modifiedData", "relation"], "oneToMany");
        set(draftState, ["modifiedData", "targetAttribute"], null);
        set(draftState, ["modifiedData", "name"], pluralize(snakeCase(currentName), 2));
        break;
      }
      case RESET_PROPS:
        return initialState;
      case RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO: {
        const nextState = {
          ...initialState,
          modifiedData: {
            type: "component",
            repeatable: true,
            ...action.options
          }
        };
        return nextState;
      }
      case RESET_PROPS_AND_SAVE_CURRENT_DATA: {
        const componentToCreate = state.modifiedData.componentToCreate;
        const modifiedData = {
          displayName: componentToCreate.displayName,
          type: "component",
          repeatable: false,
          ...action.options,
          component: createComponentUid(componentToCreate.displayName, componentToCreate.category)
        };
        const nextState = {
          ...initialState,
          componentToCreate,
          modifiedData,
          isCreatingComponentWhileAddingAField: state.modifiedData.createComponent
        };
        return nextState;
      }
      case RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ: {
        const createdDZ = state.modifiedData;
        const dataToSet = {
          ...createdDZ,
          createComponent: true,
          componentToCreate: { type: "component" }
        };
        return { ...initialState, modifiedData: dataToSet };
      }
      case SET_DATA_TO_EDIT: {
        draftState.modifiedData = action.data;
        draftState.initialData = action.data;
        break;
      }
      case SET_ATTRIBUTE_DATA_SCHEMA: {
        const {
          attributeType,
          isEditing,
          modifiedDataToSetForEditing,
          nameToSetForRelation,
          targetUid,
          step,
          options = {}
        } = action;
        if (isEditing) {
          draftState.modifiedData = modifiedDataToSetForEditing;
          draftState.initialData = modifiedDataToSetForEditing;
          break;
        }
        let dataToSet;
        if (attributeType === "component") {
          if (step === "1") {
            dataToSet = {
              type: "component",
              createComponent: true,
              componentToCreate: { type: "component" }
            };
          } else {
            dataToSet = {
              ...options,
              type: "component",
              repeatable: true
            };
          }
        } else if (attributeType === "dynamiczone") {
          dataToSet = {
            ...options,
            type: "dynamiczone",
            components: []
          };
        } else if (attributeType === "text") {
          dataToSet = { ...options, type: "string" };
        } else if (attributeType === "number" || attributeType === "date") {
          dataToSet = options;
        } else if (attributeType === "media") {
          dataToSet = {
            allowedTypes: ["images", "files", "videos", "audios"],
            type: "media",
            multiple: true,
            ...options
          };
        } else if (attributeType === "enumeration") {
          dataToSet = { ...options, type: "enumeration", enum: [] };
        } else if (attributeType === "relation") {
          dataToSet = {
            name: snakeCase(nameToSetForRelation),
            relation: "oneToOne",
            targetAttribute: null,
            target: targetUid,
            type: "relation"
          };
        } else {
          dataToSet = { ...options, type: attributeType, default: null };
        }
        draftState.modifiedData = dataToSet;
        break;
      }
      case SET_CUSTOM_FIELD_DATA_SCHEMA: {
        const { customField, isEditing, modifiedDataToSetForEditing, options = {} } = action;
        if (isEditing) {
          draftState.modifiedData = modifiedDataToSetForEditing;
          draftState.initialData = modifiedDataToSetForEditing;
          break;
        }
        draftState.modifiedData = { ...options, type: customField.type };
        const allOptions = [
          ...customField?.options?.base || [],
          ...customField?.options?.advanced || []
        ];
        const optionDefaults = allOptions.reduce(customFieldDefaultOptionsReducer, []);
        if (optionDefaults.length) {
          optionDefaults.forEach(
            ({ name: name2, defaultValue }) => set(draftState.modifiedData, name2, defaultValue)
          );
        }
        break;
      }
      case SET_DYNAMIC_ZONE_DATA_SCHEMA: {
        draftState.modifiedData = action.attributeToEdit;
        draftState.initialData = action.attributeToEdit;
        break;
      }
      case SET_ERRORS: {
        draftState.formErrors = action.errors;
        break;
      }
      default:
        return draftState;
    }
  })
);
const reducers = {
  [`${pluginId}_formModal`]: reducer,
  [`${pluginId}_dataManagerProvider`]: reducer$1
};
const formsAPI = {
  components: {
    inputs: {},
    add({ id, component }) {
      if (!this.inputs[id]) {
        this.inputs[id] = component;
      }
    }
  },
  types: {
    attribute: {
      // test: {
      //   validators: [],
      //   form: {
      //     advanced: [
      //       /* cb */
      //     ],
      //     base: [
      //       /* cb */
      //     ],
      //   },
      // },
    },
    contentType: {
      validators: [],
      form: {
        advanced: [],
        base: []
      }
    },
    component: {
      validators: [],
      form: {
        advanced: [],
        base: []
      }
    }
  },
  contentTypeSchemaMutations: [],
  addContentTypeSchemaMutation(cb) {
    this.contentTypeSchemaMutations.push(cb);
  },
  extendContentType({ validator, form: { advanced, base } }) {
    const { contentType } = this.types;
    contentType.validators.push(validator);
    contentType.form.advanced.push(advanced);
    contentType.form.base.push(base);
  },
  extendFields(fields, { validator, form: { advanced, base } }) {
    const formType = this.types.attribute;
    fields.forEach((field) => {
      if (!formType[field]) {
        formType[field] = {
          validators: [],
          form: {
            advanced: [
              /* cb */
            ],
            base: [
              /* cb */
            ]
          }
        };
      }
      formType[field].validators.push(validator);
      formType[field].form.advanced.push(advanced);
      formType[field].form.base.push(base);
    });
  },
  getAdvancedForm(target, props = null) {
    const sectionsToAdd = get(this.types, [...target, "form", "advanced"], []).reduce(
      (acc, current2) => {
        const sections = current2(props);
        return [...acc, ...sections];
      },
      []
    );
    return sectionsToAdd;
  },
  makeCustomFieldValidator(attributeShape, validator, ...validatorArgs) {
    if (!validator)
      return attributeShape;
    return attributeShape.shape({ options: yup.object().shape(validator(validatorArgs)) });
  },
  makeValidator(target, initShape, ...args) {
    const validators = get(this.types, [...target, "validators"], []);
    const pluginOptionsShape = validators.reduce((acc, current2) => {
      const pluginOptionShape = current2(args);
      return { ...acc, ...pluginOptionShape };
    }, {});
    return initShape.shape({ pluginOptions: yup.object().shape(pluginOptionsShape) });
  },
  mutateContentTypeSchema(data, initialData) {
    let enhancedData = cloneDeep(data);
    const refData = cloneDeep(initialData);
    this.contentTypeSchemaMutations.forEach((cb) => {
      enhancedData = cb(enhancedData, refData);
    });
    return enhancedData;
  }
};
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.addReducers(reducers);
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Content Types Builder"
      },
      permissions: PERMISSIONS.main,
      async Component() {
        const component = await import("./index-4fc4178e.mjs").then((n) => n.i);
        return component;
      }
    });
    app.registerPlugin({
      id: pluginId,
      name,
      // Internal APIs exposed by the CTB for the other plugins to use
      apis: {
        forms: formsAPI
      }
    });
  },
  bootstrap() {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-bb33b114.mjs"), "./translations/cs.json": () => import("./cs-40089391.mjs"), "./translations/de.json": () => import("./de-5e1d0634.mjs"), "./translations/dk.json": () => import("./dk-f1335e60.mjs"), "./translations/en.json": () => import("./en-6859e631.mjs"), "./translations/es.json": () => import("./es-2120a673.mjs"), "./translations/fr.json": () => import("./fr-4fc96351.mjs"), "./translations/id.json": () => import("./id-7b88ff44.mjs"), "./translations/it.json": () => import("./it-30c6b2cd.mjs"), "./translations/ja.json": () => import("./ja-b1c533a0.mjs"), "./translations/ko.json": () => import("./ko-3df45026.mjs"), "./translations/ms.json": () => import("./ms-0111e1c9.mjs"), "./translations/nl.json": () => import("./nl-c3e2cfec.mjs"), "./translations/pl.json": () => import("./pl-f9341098.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-7ea0eaa3.mjs"), "./translations/pt.json": () => import("./pt-755549ee.mjs"), "./translations/ru.json": () => import("./ru-7f120c30.mjs"), "./translations/sk.json": () => import("./sk-b39fb9c6.mjs"), "./translations/sv.json": () => import("./sv-2e0fbe80.mjs"), "./translations/th.json": () => import("./th-ae622ece.mjs"), "./translations/tr.json": () => import("./tr-c58959a7.mjs"), "./translations/uk.json": () => import("./uk-59ac14dc.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-b3678a18.mjs"), "./translations/zh.json": () => import("./zh-88b382c5.mjs") }), `./translations/${locale}.json`).then(({ default: data }) => {
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
  ADD_CUSTOM_FIELD_ATTRIBUTE as A,
  REMOVE_FIELD_FROM_DISPLAYED_COMPONENT as B,
  CHANGE_DYNAMIC_ZONE_COMPONENTS as C,
  DELETE_NOT_SAVED_TYPE as D,
  EDIT_CUSTOM_FIELD_ATTRIBUTE as E,
  REMOVE_FIELD as F,
  GET_DATA_SUCCEEDED as G,
  index as H,
  ON_CHANGE_RELATION_TARGET as O,
  PERMISSIONS as P,
  RESET_PROPS as R,
  SET_DATA_TO_EDIT as S,
  UPDATE_SCHEMA as U,
  ON_CHANGE_RELATION_TYPE as a,
  createUid as b,
  createComponentUid as c,
  SET_DYNAMIC_ZONE_DATA_SCHEMA as d,
  SET_CUSTOM_FIELD_DATA_SCHEMA as e,
  SET_ATTRIBUTE_DATA_SCHEMA as f,
  getRelationType as g,
  SET_ERRORS as h,
  initialState as i,
  ON_CHANGE as j,
  RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ as k,
  RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO as l,
  RESET_PROPS_AND_SAVE_CURRENT_DATA as m,
  nameToSlug as n,
  initialState$1 as o,
  pluginId as p,
  makeUnique as q,
  RELOAD_PLUGIN as r,
  retrieveComponentsFromSchema as s,
  SET_MODIFIED_DATA as t,
  ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE as u,
  REMOVE_COMPONENT_FROM_DYNAMIC_ZONE as v,
  EDIT_ATTRIBUTE as w,
  ADD_ATTRIBUTE as x,
  CREATE_SCHEMA as y,
  CREATE_COMPONENT_SCHEMA as z
};
//# sourceMappingURL=index-19cae9a3.mjs.map
