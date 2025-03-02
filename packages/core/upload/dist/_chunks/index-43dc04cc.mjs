import { prefixFileUrlWithBackendUrl, useNotification, useFetchClient, useRBAC, useTracking, pxToRem, ReactSelect, useClipboard, getFetchClient, ConfirmDialog, usePersistentState, Form, getFileExtension, getAPIInnerErrors, useQueryParams, onRowClick, stopPropagation, useSelectionState, AnErrorOccurred, NoPermissions, translatedErrors, prefixPluginTranslations } from "@strapi/helper-plugin";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useEffect, useState, useRef, useMemo, forwardRef, createElement, createContext, useContext, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useNotifyAT, Box, Grid, GridItem, Flex, Typography, Icon, ModalHeader, IconButton, ProgressBar, Badge, FocusTrap, VisuallyHidden, Button, ModalLayout, Loader, ModalFooter, ModalBody, TextInput, FieldLabel, CardAction, Card as Card$1, CardHeader, CardCheckbox, CardBody, CardContent, CardTitle, CardSubtitle, CardBadge, CardAsset as CardAsset$2, CardTimer, KeyboardNavigable, SingleSelect, SingleSelectOption, Initials, Avatar, Tbody, Tr, Td, BaseCheckbox, Table, Thead, Th, Tooltip, Tag, DateTimePicker, Select, Option as Option$1, Popover, buttonFocusStyle, SearchForm, Searchbar, Divider, TabGroup, Tabs, Tab, TabPanels, TabPanel, Textarea, CarouselActions, CarouselInput, CarouselSlide } from "@strapi/design-system";
import { useIntl } from "react-intl";
import styled from "styled-components";
import byteSize from "byte-size";
import { intervalToDuration } from "date-fns";
import { stringify } from "qs";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Formik } from "formik";
import isEqual from "lodash/isEqual";
import * as yup from "yup";
import axios from "axios";
import { ChevronUp, ChevronDown, Link, Cross, FilePdf, File as File$1, Check, Trash, Download, Crop, Pencil, EmptyDocuments, Folder, Eye, CarretUp, CarretDown, Plus, Filter, ChevronLeft, ChevronRight, Search, List, Grid as Grid$1, PicturePlus, Landscape } from "@strapi/icons";
import { components } from "react-select";
import Cropper from "cropperjs";
import { Menu, CrumbSimpleMenu, MenuItem, Breadcrumbs as Breadcrumbs$1, CrumbLink, Crumb } from "@strapi/design-system/v2";
import "cropperjs/dist/cropper.css";
import isEmpty from "lodash/isEmpty";
import { useDrop, useDrag } from "react-dnd";
import { useLocation, NavLink, Link as Link$1 } from "react-router-dom";
import parseISO from "date-fns/parseISO";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const name$1 = "@strapi/plugin-upload";
const version = "4.15.5";
const description = "Makes it easy to upload images and files to your Strapi Application.";
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
    source: "./admin/src/index.js",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    source: "./strapi-server.js",
    require: "./strapi-server.js",
    "default": "./strapi-server.js"
  },
  "./package.json": "./package.json"
};
const scripts = {
  build: "pack-up build",
  clean: "run -T rimraf dist",
  lint: "run -T eslint .",
  prepublishOnly: "yarn clean && yarn build",
  "test:front": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js",
  "test:front:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js",
  "test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watchAll",
  "test:front:watch:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js --watchAll",
  "test:unit": "run -T jest",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@strapi/design-system": "1.13.2",
  "@strapi/helper-plugin": "4.15.5",
  "@strapi/icons": "1.13.2",
  "@strapi/provider-upload-local": "4.15.5",
  "@strapi/utils": "4.15.5",
  axios: "1.6.0",
  "byte-size": "7.0.1",
  cropperjs: "1.6.0",
  "date-fns": "2.30.0",
  formik: "2.4.0",
  "fs-extra": "10.0.0",
  immer: "9.0.19",
  "koa-range": "0.3.0",
  "koa-static": "5.0.0",
  lodash: "4.17.21",
  "mime-types": "2.1.35",
  "prop-types": "^15.8.1",
  qs: "6.11.1",
  "react-dnd": "15.1.2",
  "react-helmet": "^6.1.0",
  "react-intl": "6.4.1",
  "react-query": "3.39.3",
  "react-redux": "8.1.1",
  "react-select": "5.7.0",
  sharp: "0.32.6",
  yup: "0.32.9"
};
const devDependencies = {
  "@strapi/pack-up": "4.15.5",
  "@strapi/strapi": "4.15.5",
  "@testing-library/dom": "9.2.0",
  "@testing-library/react": "14.0.0",
  "@testing-library/user-event": "14.4.3",
  msw: "1.3.0",
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
  displayName: "Media Library",
  name: "upload",
  description: "Media file management.",
  required: true,
  kind: "plugin"
};
const pluginPkg = {
  name: name$1,
  version,
  description,
  license,
  author,
  maintainers,
  exports,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi
};
const appendSearchParamsToUrl = ({ url, params }) => {
  if (url === void 0 || typeof params !== "object") {
    return url;
  }
  const urlObj = new URL(url, window.strapi.backendURL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== void 0) {
      urlObj.searchParams.append(key, value);
    }
  });
  return urlObj.toString();
};
const containsMimeTypeFilter = (query) => {
  const filters = query?.filters?.$and;
  if (!filters) {
    return false;
  }
  const result = filters.find((filter) => {
    return Object.keys(filter).includes("mime");
  });
  return !!result;
};
const containsAssetFilter = (query) => {
  return containsMimeTypeFilter(query);
};
const createAssetUrl = (asset, forThumbnail = true) => {
  if (asset.isLocal) {
    return asset.url;
  }
  const assetUrl = forThumbnail ? asset?.formats?.thumbnail?.url || asset.url : asset.url;
  return prefixFileUrlWithBackendUrl(assetUrl);
};
function findRecursiveFolderByValue(data, value) {
  let result;
  function iter(a) {
    if (a.value === value) {
      result = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  }
  data.some(iter);
  return result;
}
function formatBytes(receivedBytes, decimals = 0) {
  const { value, unit } = byteSize(receivedBytes * 1e3, { precision: decimals });
  if (!unit) {
    return "0B";
  }
  return `${value}${unit.toUpperCase()}`;
}
const zeroPad = (num) => String(num).padStart(2, "0");
const formatDuration = (durationInSecond) => {
  const duration = intervalToDuration({ start: 0, end: durationInSecond * 1e3 });
  return `${zeroPad(duration.hours)}:${zeroPad(duration.minutes)}:${zeroPad(duration.seconds)}`;
};
const pluginId = pluginPkg.name.replace(/^@strapi\/plugin-/i, "");
const getTrad = (id2) => `${pluginId}.${id2}`;
const getBreadcrumbDataML = (folder) => {
  let data = [
    {
      id: null,
      label: { id: getTrad("plugin.name"), defaultMessage: "Media Library" }
    }
  ];
  if (folder?.parent?.parent) {
    data.push([]);
  }
  if (folder?.parent) {
    data.push({
      id: folder.parent.id,
      label: folder.parent.name,
      path: folder.parent.path
    });
  }
  if (folder) {
    data.push({
      id: folder.id,
      label: folder.name,
      path: folder.path
    });
  }
  return data;
};
const getFolderURL = (pathname, currentQuery, { folder, folderPath } = {}) => {
  const { _q, ...queryParamsWithoutQ } = currentQuery;
  const queryParamsString = stringify(
    {
      ...queryParamsWithoutQ,
      folder,
      folderPath
    },
    { encode: false }
  );
  return `${pathname}${queryParamsString ? `?${queryParamsString}` : ""}`;
};
function flattenTree(tree, parent, depth = 0) {
  return tree.flatMap(
    (item) => item.children ? [{ ...item, parent: parent?.value, depth }, ...flattenTree(item.children, item, depth + 1)] : { ...item, depth, parent: parent?.value }
  );
}
const getFolderParents = (folders, currentFolderId) => {
  const parents = [];
  const flatFolders = flattenTree(folders);
  const currentFolder = flatFolders.find((folder) => folder.value === currentFolderId);
  if (!currentFolder) {
    return [];
  }
  let { parent } = currentFolder;
  while (parent !== void 0) {
    let parentToStore = flatFolders.find(({ value }) => value === parent);
    parents.push({ id: parentToStore.value, label: parentToStore.label });
    parent = parentToStore.parent;
  }
  return parents.reverse();
};
const toSingularTypes = (types) => {
  if (!types) {
    return [];
  }
  return types.map((type) => type.substring(0, type.length - 1));
};
const AssetType = {
  Video: "video",
  Image: "image",
  Document: "doc",
  Audio: "audio"
};
const AssetSource = {
  Url: "url",
  Computer: "computer"
};
const ParentFolderShape = {
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  pathId: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired
};
ParentFolderShape.parent = PropTypes.shape(ParentFolderShape);
const FolderShape = {
  id: PropTypes.number.isRequired,
  children: PropTypes.shape({
    count: PropTypes.number.isRequired
  }),
  createdAt: PropTypes.string.isRequired,
  createdBy: PropTypes.shape(),
  files: PropTypes.shape({
    count: PropTypes.number.isRequired
  }),
  name: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  updatedBy: PropTypes.shape(),
  pathId: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired
};
FolderShape.parent = PropTypes.shape(ParentFolderShape);
const FolderDefinition = PropTypes.shape(FolderShape);
const FolderStructure = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
  children: PropTypes.array
});
FolderStructure.children = PropTypes.arrayOf(PropTypes.shape(FolderStructure));
FolderStructure.defaultProps = {
  children: void 0
};
PropTypes.arrayOf(FolderStructure);
const AssetDefinition = PropTypes.shape({
  id: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  size: PropTypes.number,
  createdAt: PropTypes.string,
  ext: PropTypes.string,
  mime: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  updatedAt: PropTypes.string,
  alternativeText: PropTypes.string,
  caption: PropTypes.string,
  folder: PropTypes.shape(FolderDefinition),
  formats: PropTypes.shape({
    thumbnail: PropTypes.shape({
      url: PropTypes.string
    })
  })
});
const CrumbDefinition = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired
    })
  ]).isRequired,
  href: PropTypes.string
});
const CrumbMenuDefinition = PropTypes.arrayOf(CrumbDefinition);
const BreadcrumbsDefinition = PropTypes.arrayOf(
  PropTypes.oneOfType([CrumbDefinition, CrumbMenuDefinition])
);
const viewOptions = {
  GRID: 0,
  LIST: 1
};
const tableHeaders = [
  {
    name: "preview",
    key: "preview",
    metadatas: {
      label: { id: getTrad("list.table.header.preview"), defaultMessage: "preview" },
      isSortable: false
    },
    type: "image"
  },
  {
    name: "name",
    key: "name",
    metadatas: {
      label: { id: getTrad("list.table.header.name"), defaultMessage: "name" },
      isSortable: true
    },
    type: "text"
  },
  {
    name: "ext",
    key: "extension",
    metadatas: {
      label: { id: getTrad("list.table.header.ext"), defaultMessage: "extension" },
      isSortable: false
    },
    type: "ext"
  },
  {
    name: "size",
    key: "size",
    metadatas: {
      label: { id: getTrad("list.table.header.size"), defaultMessage: "size" },
      isSortable: false
    },
    type: "size"
  },
  {
    name: "createdAt",
    key: "createdAt",
    metadatas: {
      label: { id: getTrad("list.table.header.createdAt"), defaultMessage: "created" },
      isSortable: true
    },
    type: "date"
  },
  {
    name: "updatedAt",
    key: "updatedAt",
    metadatas: {
      label: { id: getTrad("list.table.header.updatedAt"), defaultMessage: "last update" },
      isSortable: true
    },
    type: "date"
  }
];
const pageSizes = [10, 20, 50, 100];
const sortOptions = [
  { key: "sort.created_at_desc", value: "createdAt:DESC" },
  { key: "sort.created_at_asc", value: "createdAt:ASC" },
  { key: "sort.name_asc", value: "name:ASC" },
  { key: "sort.name_desc", value: "name:DESC" },
  { key: "sort.updated_at_desc", value: "updatedAt:DESC" },
  { key: "sort.updated_at_asc", value: "updatedAt:ASC" }
];
const localStorageKeys = {
  modalView: `STRAPI_UPLOAD_MODAL_VIEW`,
  view: `STRAPI_UPLOAD_LIBRARY_VIEW`
};
const PERMISSIONS = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  main: [
    { action: "plugin::upload.read", subject: null },
    {
      action: "plugin::upload.assets.create",
      subject: null
    },
    {
      action: "plugin::upload.assets.update",
      subject: null
    }
  ],
  copyLink: [
    {
      action: "plugin::upload.assets.copy-link",
      subject: null
    }
  ],
  create: [
    {
      action: "plugin::upload.assets.create",
      subject: null
    }
  ],
  download: [
    {
      action: "plugin::upload.assets.download",
      subject: null
    }
  ],
  read: [{ action: "plugin::upload.read", subject: null }],
  configureView: [{ action: "plugin::upload.configure-view", subject: null }],
  settings: [{ action: "plugin::upload.settings.read", subject: null }],
  update: [{ action: "plugin::upload.assets.update", subject: null, fields: null }]
};
const useAssets = ({ skipWhen = false, query = {} } = {}) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const { notifyStatus } = useNotifyAT();
  const { get } = useFetchClient();
  const { folderPath, _q, ...paramsExceptFolderAndQ } = query;
  let params;
  if (_q) {
    params = {
      ...paramsExceptFolderAndQ,
      _q: encodeURIComponent(_q)
    };
  } else {
    params = {
      ...paramsExceptFolderAndQ,
      filters: {
        $and: [
          ...paramsExceptFolderAndQ?.filters?.$and ?? [],
          {
            folderPath: { $eq: folderPath ?? "/" }
          }
        ]
      }
    };
  }
  const { data, error, isLoading } = useQuery(
    [pluginId, "assets", params],
    async () => {
      const { data: data2 } = await get("/upload/files", { params });
      return data2;
    },
    {
      enabled: !skipWhen,
      staleTime: 0,
      cacheTime: 0,
      select(data2) {
        if (data2?.results && Array.isArray(data2.results)) {
          return {
            ...data2,
            results: data2.results.filter((asset) => asset.name).map((asset) => ({
              ...asset,
              /**
               * Mime and ext cannot be null in the front-end because
               * we expect them to be strings and use the `includes` method.
               */
              mime: asset.mime ?? "",
              ext: asset.ext ?? ""
            }))
          };
        }
        return data2;
      }
    }
  );
  useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: "list.asset.at.finished",
          defaultMessage: "The assets have finished loading."
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  useEffect(() => {
    if (error) {
      toggleNotification({
        type: "warning",
        message: { id: "notification.error" }
      });
    }
  }, [error, toggleNotification]);
  return { data, error, isLoading };
};
const useFolders = ({ enabled = true, query = {} } = {}) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const { notifyStatus } = useNotifyAT();
  const { folder, _q, ...paramsExceptFolderAndQ } = query;
  const { get } = useFetchClient();
  let params;
  if (_q) {
    params = {
      ...paramsExceptFolderAndQ,
      pagination: {
        pageSize: -1
      },
      _q
    };
  } else {
    params = {
      ...paramsExceptFolderAndQ,
      pagination: {
        pageSize: -1
      },
      filters: {
        $and: [
          ...paramsExceptFolderAndQ?.filters?.$and ?? [],
          {
            parent: {
              id: folder ?? {
                $null: true
              }
            }
          }
        ]
      }
    };
  }
  const { data, error, isLoading } = useQuery(
    [pluginId, "folders", stringify(params)],
    async () => {
      const {
        data: { data: data2 }
      } = await get("/upload/folders", { params });
      return data2;
    },
    {
      enabled,
      staleTime: 0,
      cacheTime: 0,
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error" }
        });
      }
    }
  );
  React.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: "list.asset.at.finished",
          defaultMessage: "The folders have finished loading."
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  return { data, error, isLoading };
};
const { main, ...restPermissions } = PERMISSIONS;
const useMediaLibraryPermissions = () => {
  const { allowedActions, isLoading } = useRBAC(restPermissions);
  return { ...allowedActions, isLoading };
};
const endpoint$1 = `/${pluginId}/configuration`;
const queryKey = [pluginId, "configuration"];
const useConfig = () => {
  const { trackUsage } = useTracking();
  const toggleNotification = useNotification();
  const { get, put } = useFetchClient();
  const config = useQuery(
    queryKey,
    async () => {
      const res = await get(endpoint$1);
      return res.data.data;
    },
    {
      onError() {
        return toggleNotification({
          type: "warning",
          message: { id: "notification.error" }
        });
      },
      /**
       * We're cementing that we always expect an object to be returned.
       */
      select: (data) => !data ? {} : data
    }
  );
  const putMutation = useMutation(
    async (body) => {
      await put(endpoint$1, body);
    },
    {
      onSuccess() {
        trackUsage("didEditMediaLibraryConfig");
        config.refetch();
      },
      onError() {
        return toggleNotification({
          type: "warning",
          message: { id: "notification.error" }
        });
      }
    }
  );
  return {
    config,
    mutateConfig: putMutation
  };
};
const useModalQueryParams = (initialState) => {
  const { trackUsage } = useTracking();
  const {
    config: { data: config }
  } = useConfig();
  const [queryObject, setQueryObject] = useState({
    page: 1,
    sort: "updatedAt:DESC",
    pageSize: 10,
    filters: {
      $and: []
    },
    ...initialState
  });
  useEffect(() => {
    if (config) {
      setQueryObject((prevQuery) => ({
        ...prevQuery,
        sort: config.sort,
        pageSize: config.pageSize
      }));
    }
  }, [config]);
  const handleChangeFilters = (nextFilters) => {
    trackUsage("didFilterMediaLibraryElements", {
      location: "content-manager",
      filter: Object.keys(nextFilters[nextFilters.length - 1])[0]
    });
    setQueryObject((prev) => ({ ...prev, page: 1, filters: { $and: nextFilters } }));
  };
  const handleChangePageSize = (pageSize) => {
    setQueryObject((prev) => ({ ...prev, pageSize: parseInt(pageSize, 10), page: 1 }));
  };
  const handeChangePage = (page) => {
    setQueryObject((prev) => ({ ...prev, page }));
  };
  const handleChangeSort = (sort) => {
    trackUsage("didSortMediaLibraryElements", {
      location: "content-manager",
      sort
    });
    setQueryObject((prev) => ({ ...prev, sort }));
  };
  const handleChangeSearch = (_q) => {
    if (_q) {
      setQueryObject((prev) => ({ ...prev, _q, page: 1 }));
    } else {
      const newState = { page: 1 };
      Object.keys(queryObject).forEach((key) => {
        if (!["page", "_q"].includes(key)) {
          newState[key] = queryObject[key];
        }
      });
      setQueryObject(newState);
    }
  };
  const handleChangeFolder = (folder, folderPath) => {
    setQueryObject((prev) => ({ ...prev, folder: folder ?? null, folderPath }));
  };
  return [
    { queryObject, rawQuery: stringify(queryObject, { encode: false }) },
    {
      onChangeFilters: handleChangeFilters,
      onChangeFolder: handleChangeFolder,
      onChangePage: handeChangePage,
      onChangePageSize: handleChangePageSize,
      onChangeSort: handleChangeSort,
      onChangeSearch: handleChangeSearch
    }
  ];
};
const getAllowedFiles = (pluralTypes, files) => {
  const singularTypes = toSingularTypes(pluralTypes);
  const allowedFiles = files.filter((file) => {
    const fileType = file.mime.split("/")[0];
    if (singularTypes.includes("file") && !["video", "image", "audio"].includes(fileType)) {
      return true;
    }
    return singularTypes.includes(fileType);
  });
  return allowedFiles;
};
const move = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
};
const moveElement = (array, index2, offset) => {
  const newIndex = index2 + offset;
  return move(array, index2, newIndex);
};
const editAssetRequest = (asset, file, cancelToken, onProgress, post) => {
  const endpoint2 = `/${pluginId}?id=${asset.id}`;
  const formData = new FormData();
  if (file) {
    formData.append("files", file);
  }
  formData.append(
    "fileInfo",
    JSON.stringify({
      alternativeText: asset.alternativeText,
      caption: asset.caption,
      folder: asset.folder,
      name: asset.name
    })
  );
  return post(endpoint2, formData, {
    cancelToken: cancelToken.token,
    onUploadProgress({ total, loaded }) {
      onProgress(loaded / total * 100);
    },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((res) => res.data);
};
const useEditAsset = () => {
  const [progress, setProgress] = useState(0);
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();
  const queryClient = useQueryClient();
  const tokenRef = useRef(axios.CancelToken.source());
  const { post } = useFetchClient();
  const mutation = useMutation(
    ({ asset, file }) => editAssetRequest(asset, file, tokenRef.current, setProgress, post),
    {
      onSuccess() {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
        queryClient.refetchQueries([pluginId, "folders"], { active: true });
      },
      onError(reason) {
        if (reason.response.status === 403) {
          toggleNotification({
            type: "info",
            message: { id: getTrad("permissions.not-allowed.update") }
          });
        } else {
          toggleNotification({ type: "warning", message: reason.message });
        }
      }
    }
  );
  const editAsset = (asset, file) => mutation.mutateAsync({ asset, file });
  const cancel = () => tokenRef.current.cancel(
    formatMessage({ id: getTrad("modal.upload.cancelled"), defaultMessage: "" })
  );
  return { ...mutation, cancel, editAsset, progress, status: mutation.status };
};
const recursiveRenameKeys = (obj, fn) => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => {
    const getValue = (v) => typeof v === "object" && v !== null ? recursiveRenameKeys(v, fn) : v;
    return [fn(key), Array.isArray(value) ? value.map((val) => getValue(val)) : getValue(value)];
  })
);
const FIELD_MAPPING = {
  name: "label",
  id: "value"
};
const useFolderStructure = ({ enabled = true } = {}) => {
  const { formatMessage } = useIntl();
  const { get } = useFetchClient();
  const fetchFolderStructure = async () => {
    const {
      data: { data: data2 }
    } = await get("/upload/folder-structure");
    const children = data2.map((f) => recursiveRenameKeys(f, (key) => FIELD_MAPPING?.[key] ?? key));
    return [
      {
        value: null,
        label: formatMessage({
          id: getTrad("form.input.label.folder-location-default-label"),
          defaultMessage: "Media Library"
        }),
        children
      }
    ];
  };
  const { data, error, isLoading } = useQuery(
    [pluginId, "folder", "structure"],
    fetchFolderStructure,
    {
      enabled,
      staleTime: 0,
      cacheTime: 0
    }
  );
  return { data, error, isLoading };
};
const ContextInfo = ({ blocks }) => {
  return /* @__PURE__ */ jsx(
    Box,
    {
      hasRadius: true,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 4,
      paddingBottom: 4,
      background: "neutral100",
      children: /* @__PURE__ */ jsx(Grid, { gap: 4, children: blocks.map(({ label, value }) => /* @__PURE__ */ jsx(GridItem, { col: 6, xs: 12, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: label }),
        /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral700", children: value })
      ] }) }, label)) })
    }
  );
};
ContextInfo.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired
};
const ToggleButton = styled(Flex)`
  align-self: flex-end;
  height: ${pxToRem(22)};
  width: ${pxToRem(28)};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.primary200};
  }
`;
const Option = ({ children, data, selectProps, ...props }) => {
  const { formatMessage } = useIntl();
  const { depth, value, children: options } = data;
  const { maxDisplayDepth, openValues, onOptionToggle } = selectProps;
  const isOpen = openValues.includes(value);
  return /* @__PURE__ */ jsx(components.Option, { ...props, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "start", children: [
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsx("span", { style: { paddingLeft: `${Math.min(depth, maxDisplayDepth) * 14}px` }, children }) }),
    options?.length > 0 && /* @__PURE__ */ jsx(
      ToggleButton,
      {
        "aria-label": formatMessage({
          id: "app.utils.toggle",
          defaultMessage: "Toggle"
        }),
        as: "button",
        alignItems: "center",
        hasRadius: true,
        justifyContent: "center",
        marginLeft: "auto",
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          onOptionToggle(value);
        },
        children: /* @__PURE__ */ jsx(Icon, { width: pxToRem(14), color: "neutral500", as: isOpen ? ChevronUp : ChevronDown })
      }
    )
  ] }) });
};
Option.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  selectProps: PropTypes.shape({
    maxDisplayDepth: PropTypes.number,
    openValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onOptionToggle: PropTypes.func
  }).isRequired
};
function getOpenValues(options, defaultValue = {}) {
  let values = [];
  const { value } = defaultValue;
  const option = options.find((option2) => option2.value === value);
  if (!option) {
    return values;
  }
  values.push(option.value);
  let { parent } = option;
  while (parent !== void 0) {
    const option2 = options.find(({ value: value2 }) => value2 === parent);
    values.push(option2.value);
    parent = option2.parent;
  }
  return values.reverse();
}
function getValuesToClose(options, value) {
  const optionForValue = options.find((option) => option.value === value);
  return options.filter((option) => option.depth >= optionForValue.depth).map((option) => option.value);
}
const hasParent = (option) => !option.parent;
const SelectTree = ({ options: defaultOptions, maxDisplayDepth, defaultValue, ...props }) => {
  const flatDefaultOptions = useMemo(() => flattenTree(defaultOptions), [defaultOptions]);
  const optionsFiltered = useMemo(() => flatDefaultOptions.filter(hasParent), [flatDefaultOptions]);
  const [options, setOptions] = useState(optionsFiltered);
  const [openValues, setOpenValues] = useState(getOpenValues(flatDefaultOptions, defaultValue));
  useEffect(() => {
    if (openValues.length === 0) {
      setOptions(flatDefaultOptions.filter((option) => option.parent === void 0));
    } else {
      const allOpenValues = openValues.reduce((acc, value) => {
        const options2 = flatDefaultOptions.filter(
          (option) => option.value === value || option.parent === value
        );
        options2.forEach((option) => {
          const values = getOpenValues(flatDefaultOptions, option);
          acc = [...acc, ...values];
        });
        return acc;
      }, []);
      const nextOptions = flatDefaultOptions.filter(
        (option) => allOpenValues.includes(option.value)
      );
      setOptions(nextOptions);
    }
  }, [openValues, flatDefaultOptions, optionsFiltered]);
  const handleToggle = (value) => {
    if (openValues.includes(value)) {
      const valuesToClose = getValuesToClose(flatDefaultOptions, value);
      setOpenValues((prev) => prev.filter((prevData) => !valuesToClose.includes(prevData)));
    } else {
      setOpenValues((prev) => [...prev, value]);
    }
  };
  return /* @__PURE__ */ jsx(
    ReactSelect,
    {
      components: { Option },
      options,
      defaultValue,
      isSearchable: false,
      maxDisplayDepth,
      openValues,
      onOptionToggle: handleToggle,
      ...props
    }
  );
};
const OptionShape = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string.isRequired,
  children: PropTypes.array
});
OptionShape.children = PropTypes.arrayOf(PropTypes.shape(OptionShape));
OptionShape.defaultProps = {
  children: void 0
};
SelectTree.defaultProps = {
  defaultValue: void 0,
  maxDisplayDepth: 5
};
SelectTree.propTypes = {
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  maxDisplayDepth: PropTypes.number,
  options: PropTypes.arrayOf(OptionShape).isRequired
};
const DialogHeader = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage({ id: "global.details", defaultMessage: "Details" }) }) });
};
const QUALITY = 1;
const useCropImg = () => {
  const cropperRef = useRef();
  const [isCropping, setIsCropping] = useState(false);
  const [size, setSize] = useState({ width: void 0, height: void 0 });
  useEffect(() => {
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, []);
  const handleResize = ({ detail: { height, width } }) => {
    const roundedDataWidth = Math.round(width);
    const roundedDataHeight = Math.round(height);
    setSize({ width: roundedDataWidth, height: roundedDataHeight });
  };
  const crop = (image) => {
    if (!cropperRef.current) {
      cropperRef.current = new Cropper(image, {
        modal: true,
        initialAspectRatio: 16 / 9,
        movable: true,
        zoomable: false,
        cropBoxResizable: true,
        background: false,
        crop: handleResize
      });
      setIsCropping(true);
    }
  };
  const stopCropping = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = void 0;
      setIsCropping(false);
    }
  };
  const produceFile = (name2, mimeType, lastModifiedDate) => new Promise((resolve, reject) => {
    if (!cropperRef.current) {
      reject(
        new Error(
          "The cropper has not been instantiated: make sure to call the crop() function before calling produceFile()."
        )
      );
    } else {
      const canvas = cropperRef.current.getCroppedCanvas();
      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob], name2, {
              type: mimeType,
              lastModifiedDate
            })
          );
        },
        mimeType,
        QUALITY
      );
    }
  });
  return {
    crop,
    produceFile,
    stopCropping,
    isCropping,
    isCropperReady: Boolean(cropperRef.current),
    ...size
  };
};
const endpoint = `/${pluginId}`;
const uploadAsset = (asset, folderId, cancelToken, onProgress, post) => {
  const { rawFile, caption, name: name2, alternativeText } = asset;
  const formData = new FormData();
  formData.append("files", rawFile);
  formData.append(
    "fileInfo",
    JSON.stringify({
      name: name2,
      caption,
      alternativeText,
      folder: folderId
    })
  );
  return post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    cancelToken: cancelToken.token,
    onUploadProgress({ total, loaded }) {
      onProgress(loaded / total * 100);
    }
  }).then((res) => res.data);
};
const useUpload = () => {
  const [progress, setProgress] = useState(0);
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const tokenRef = useRef(axios.CancelToken.source());
  const { post } = useFetchClient();
  const mutation = useMutation(
    ({ asset, folderId }) => {
      return uploadAsset(asset, folderId, tokenRef.current, setProgress, post);
    },
    {
      onSuccess() {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      }
    }
  );
  const upload = (asset, folderId) => mutation.mutateAsync({ asset, folderId });
  const cancel = () => tokenRef.current.cancel(
    formatMessage({ id: getTrad("modal.upload.cancelled"), defaultMessage: "" })
  );
  return {
    upload,
    cancel,
    error: mutation.error,
    progress,
    status: mutation.status
  };
};
const downloadFile = async (url, fileName) => {
  const fileBlob = await fetch(url).then((res) => res.blob());
  const urlDownload = window.URL.createObjectURL(fileBlob);
  const link = document.createElement("a");
  link.href = urlDownload;
  link.setAttribute("download", fileName);
  link.click();
};
const CopyLinkButton = ({ url }) => {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const { copy } = useClipboard();
  const handleClick = async () => {
    const didCopy = await copy(url);
    if (didCopy) {
      toggleNotification({
        type: "success",
        message: {
          id: "notification.link-copied",
          defaultMessage: "Link copied into the clipboard"
        }
      });
    }
  };
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      label: formatMessage({
        id: getTrad("control-card.copy-link"),
        defaultMessage: "Copy link"
      }),
      onClick: handleClick,
      children: /* @__PURE__ */ jsx(Link, {})
    }
  );
};
CopyLinkButton.propTypes = {
  url: PropTypes.string.isRequired
};
const BoxWrapper = styled(Flex)`
  border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
  width: 100%;
  height: 100%;

  svg {
    path {
      fill: ${({ theme, error }) => error ? theme.colors.danger600 : void 0};
    }
  }
`;
const CancelButton = styled.button`
  border: none;
  background: none;
  width: min-content;
  color: ${({ theme }) => theme.colors.neutral600};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.neutral700};
  }

  svg {
    height: 10px;
    width: 10px;

    path {
      fill: currentColor;
    }
  }
`;
const UploadProgress = ({ onCancel, progress, error }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(BoxWrapper, { alignItems: "center", background: error ? "danger100" : "neutral150", error, children: error ? /* @__PURE__ */ jsx(Cross, { "aria-label": error?.message }) : /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "center", gap: 2, width: "100%", children: [
    /* @__PURE__ */ jsx(ProgressBar, { value: progress, children: `${progress}/100%` }),
    /* @__PURE__ */ jsx(CancelButton, { type: "button", onClick: onCancel, children: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "pi", as: "span", textColor: "inherit", children: formatMessage({
        id: "app.components.Button.cancel",
        defaultMessage: "Cancel"
      }) }),
      /* @__PURE__ */ jsx(Cross, { "aria-hidden": true })
    ] }) })
  ] }) });
};
UploadProgress.defaultProps = {
  error: void 0,
  progress: 0
};
UploadProgress.propTypes = {
  error: PropTypes.instanceOf(Error),
  onCancel: PropTypes.func.isRequired,
  progress: PropTypes.number
};
const deleteRequest = (type, id2) => {
  const { del } = getFetchClient();
  return del(`/upload/${type}/${id2}`);
};
const useRemoveAsset = (onSuccess) => {
  const toggleNotification = useNotification();
  const queryClient = useQueryClient();
  const mutation = useMutation((assetId) => deleteRequest("files", assetId), {
    onSuccess() {
      queryClient.refetchQueries([pluginId, "assets"], { active: true });
      queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      toggleNotification({
        type: "success",
        message: {
          id: "modal.remove.success-label",
          defaultMessage: "Elements have been successfully deleted."
        }
      });
      onSuccess();
    },
    onError(error) {
      toggleNotification({ type: "warning", message: error.message });
    }
  });
  const removeAsset = (assetId) => mutation.mutate(assetId);
  return { ...mutation, removeAsset };
};
const RemoveAssetDialog = ({ onClose, asset }) => {
  const { isLoading, removeAsset } = useRemoveAsset(() => onClose(null));
  const handleConfirm = () => {
    removeAsset(asset.id);
  };
  return /* @__PURE__ */ jsx(
    ConfirmDialog,
    {
      isConfirmButtonLoading: isLoading,
      isOpen: true,
      onToggleDialog: onClose,
      onConfirm: handleConfirm
    }
  );
};
RemoveAssetDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  asset: PropTypes.shape({
    id: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    size: PropTypes.number,
    createdAt: PropTypes.string,
    ext: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};
const CardAsset$1 = styled(Flex)`
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f9 121.48%);
`;
const AssetPreview = forwardRef(({ mime, url, name: name2, ...props }, ref) => {
  const [lang] = usePersistentState("strapi-admin-language", "en");
  if (mime.includes(AssetType.Image)) {
    return /* @__PURE__ */ jsx("img", { ref, src: url, alt: name2, ...props });
  }
  if (mime.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsx("video", { controls: true, src: url, ref, ...props, children: /* @__PURE__ */ jsx("track", { label: name2, default: true, kind: "captions", srcLang: lang, src: "" }) });
  }
  if (mime.includes(AssetType.Audio)) {
    return /* @__PURE__ */ jsx("audio", { controls: true, src: url, ref, ...props, children: name2 });
  }
  if (mime.includes("pdf")) {
    return /* @__PURE__ */ jsx(CardAsset$1, { justifyContent: "center", ...props, children: /* @__PURE__ */ jsx(FilePdf, { "aria-label": name2 }) });
  }
  return /* @__PURE__ */ jsx(CardAsset$1, { justifyContent: "center", ...props, children: /* @__PURE__ */ jsx(File$1, { "aria-label": name2 }) });
});
AssetPreview.displayName = "AssetPreview";
AssetPreview.propTypes = {
  mime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
const RelativeBox = styled(Box)`
  position: relative;
`;
const Wrapper$1 = styled.div`
  position: relative;
  text-align: center;
  background: repeating-conic-gradient(
      ${({ theme }) => theme.colors.neutral100} 0% 25%,
      transparent 0% 50%
    )
    50% / 20px 20px;

  svg {
    font-size: 3rem;
    height: ${264 / 16}rem;
  }

  img,
  video {
    margin: 0;
    padding: 0;
    max-height: ${264 / 16}rem;
    max-width: 100%;
  }
`;
const ActionRow = styled(Flex)`
  height: ${52 / 16}rem;
  background-color: ${({ blurry }) => blurry ? `rgba(33, 33, 52, 0.4)` : void 0};
`;
const CroppingActionRow = styled(Flex)`
  z-index: 1;
  height: ${52 / 16}rem;
  position: absolute;
  background-color: rgba(33, 33, 52, 0.4);
  width: 100%;
`;
const BadgeOverride = styled(Badge)`
  span {
    color: inherit;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;
const UploadProgressWrapper$1 = styled.div`
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
`;
const CroppingActions = ({ onCancel, onValidate, onDuplicate }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(FocusTrap, { onEscape: onCancel, children: /* @__PURE__ */ jsx(CroppingActionRow, { justifyContent: "flex-end", paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        label: formatMessage({
          id: getTrad("control-card.stop-crop"),
          defaultMessage: "Stop cropping"
        }),
        icon: /* @__PURE__ */ jsx(Cross, {}),
        onClick: onCancel
      }
    ),
    /* @__PURE__ */ jsxs(Menu.Root, { children: [
      /* @__PURE__ */ jsxs(Trigger, { variant: "tertiary", paddingLeft: 2, paddingRight: 2, endIcon: null, children: [
        /* @__PURE__ */ jsx(VisuallyHidden, { as: "span", children: formatMessage({
          id: getTrad("control-card.crop"),
          defaultMessage: "Crop"
        }) }),
        /* @__PURE__ */ jsx(
          Check,
          {
            "aria-hidden": true,
            focusable: false,
            style: { position: "relative", top: 2 },
            fill: "#C0C0D0"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Menu.Content, { zIndex: 5, children: [
        /* @__PURE__ */ jsx(Menu.Item, { onSelect: onValidate, children: formatMessage({
          id: getTrad("checkControl.crop-original"),
          defaultMessage: "Crop the original asset"
        }) }),
        onDuplicate && /* @__PURE__ */ jsx(Menu.Item, { onSelect: onDuplicate, children: formatMessage({
          id: getTrad("checkControl.crop-duplicate"),
          defaultMessage: "Duplicate & crop the asset"
        }) })
      ] })
    ] })
  ] }) }) });
};
const Trigger = styled(Menu.Trigger)`
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }

  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }

  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
      }
    }
  }
`;
CroppingActions.defaultProps = {
  onDuplicate: void 0
};
CroppingActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func,
  onValidate: PropTypes.func.isRequired
};
const PreviewBox = ({
  asset,
  canUpdate,
  canCopyLink,
  canDownload,
  onDelete,
  onCropFinish,
  onCropStart,
  onCropCancel,
  replacementFile,
  trackedLocation
}) => {
  const { trackUsage } = useTracking();
  const previewRef = useRef(null);
  const [isCropImageReady, setIsCropImageReady] = useState(false);
  const [hasCropIntent, setHasCropIntent] = useState(null);
  const [assetUrl, setAssetUrl] = useState(createAssetUrl(asset, false));
  const [thumbnailUrl, setThumbnailUrl] = useState(createAssetUrl(asset, true));
  const { formatMessage } = useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { crop, produceFile, stopCropping, isCropping, isCropperReady, width, height } = useCropImg();
  const { editAsset, error, isLoading, progress, cancel } = useEditAsset();
  const {
    upload,
    isLoading: isLoadingUpload,
    cancel: cancelUpload,
    error: uploadError,
    progress: progressUpload
  } = useUpload();
  useEffect(() => {
    if (replacementFile) {
      const fileLocalUrl = URL.createObjectURL(replacementFile);
      if (asset.isLocal) {
        asset.url = fileLocalUrl;
      }
      setAssetUrl(fileLocalUrl);
      setThumbnailUrl(fileLocalUrl);
    }
  }, [replacementFile, asset]);
  useEffect(() => {
    if (hasCropIntent === false) {
      stopCropping();
      onCropCancel();
    }
  }, [hasCropIntent, stopCropping, onCropCancel, onCropFinish]);
  useEffect(() => {
    if (hasCropIntent && isCropImageReady) {
      crop(previewRef.current);
      onCropStart();
    }
  }, [isCropImageReady, hasCropIntent, onCropStart, crop]);
  const handleCropping = async () => {
    const nextAsset = { ...asset, width, height, folder: asset.folder?.id };
    const file = await produceFile(nextAsset.name, nextAsset.mime, nextAsset.updatedAt);
    let optimizedCachingImage;
    let optimizedCachingThumbnailImage;
    if (asset.isLocal) {
      optimizedCachingImage = URL.createObjectURL(file);
      optimizedCachingThumbnailImage = optimizedCachingImage;
      asset.url = optimizedCachingImage;
      asset.rawFile = file;
      trackUsage("didCropFile", { duplicatedFile: null, location: trackedLocation });
    } else {
      const updatedAsset = await editAsset(nextAsset, file);
      optimizedCachingImage = createAssetUrl(updatedAsset, false);
      optimizedCachingThumbnailImage = createAssetUrl(updatedAsset, true);
      trackUsage("didCropFile", { duplicatedFile: false, location: trackedLocation });
    }
    setAssetUrl(optimizedCachingImage);
    setThumbnailUrl(optimizedCachingThumbnailImage);
    setHasCropIntent(false);
  };
  const isInCroppingMode = isCropping && !isLoading;
  const handleDuplication = async () => {
    const nextAsset = { ...asset, width, height };
    const file = await produceFile(nextAsset.name, nextAsset.mime, nextAsset.updatedAt);
    await upload({ name: file.name, rawFile: file }, asset.folder?.id);
    trackUsage("didCropFile", { duplicatedFile: true, location: trackedLocation });
    setHasCropIntent(false);
    onCropFinish();
  };
  const handleCropCancel = () => {
    setHasCropIntent(false);
  };
  const handleCropStart = () => {
    setHasCropIntent(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(RelativeBox, { hasRadius: true, background: "neutral150", borderColor: "neutral200", children: [
      isCropperReady && isInCroppingMode && /* @__PURE__ */ jsx(
        CroppingActions,
        {
          onValidate: handleCropping,
          onDuplicate: asset.isLocal ? void 0 : handleDuplication,
          onCancel: handleCropCancel
        }
      ),
      /* @__PURE__ */ jsx(ActionRow, { paddingLeft: 3, paddingRight: 3, justifyContent: "flex-end", children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
        canUpdate && !asset.isLocal && /* @__PURE__ */ jsx(
          IconButton,
          {
            label: formatMessage({
              id: "global.delete",
              defaultMessage: "Delete"
            }),
            icon: /* @__PURE__ */ jsx(Trash, {}),
            onClick: () => setShowConfirmDialog(true)
          }
        ),
        canDownload && /* @__PURE__ */ jsx(
          IconButton,
          {
            label: formatMessage({
              id: getTrad("control-card.download"),
              defaultMessage: "Download"
            }),
            icon: /* @__PURE__ */ jsx(Download, {}),
            onClick: () => downloadFile(assetUrl, asset.name)
          }
        ),
        canCopyLink && /* @__PURE__ */ jsx(CopyLinkButton, { url: assetUrl }),
        canUpdate && asset.mime.includes(AssetType.Image) && /* @__PURE__ */ jsx(
          IconButton,
          {
            label: formatMessage({ id: getTrad("control-card.crop"), defaultMessage: "Crop" }),
            icon: /* @__PURE__ */ jsx(Crop, {}),
            onClick: handleCropStart
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(Wrapper$1, { children: [
        isLoading && /* @__PURE__ */ jsx(UploadProgressWrapper$1, { children: /* @__PURE__ */ jsx(UploadProgress, { error, onCancel: cancel, progress }) }),
        isLoadingUpload && /* @__PURE__ */ jsx(UploadProgressWrapper$1, { children: /* @__PURE__ */ jsx(
          UploadProgress,
          {
            error: uploadError,
            onCancel: cancelUpload,
            progress: progressUpload
          }
        ) }),
        /* @__PURE__ */ jsx(
          AssetPreview,
          {
            ref: previewRef,
            mime: asset.mime,
            name: asset.name,
            url: hasCropIntent ? assetUrl : thumbnailUrl,
            onLoad: () => {
              if (asset.isLocal || hasCropIntent) {
                setIsCropImageReady(true);
              }
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        ActionRow,
        {
          paddingLeft: 2,
          paddingRight: 2,
          justifyContent: "flex-end",
          blurry: isInCroppingMode,
          children: isInCroppingMode && width && height && /* @__PURE__ */ jsx(BadgeOverride, { background: "neutral900", color: "neutral0", children: width && height ? `${height}✕${width}` : "N/A" })
        }
      )
    ] }),
    showConfirmDialog && /* @__PURE__ */ jsx(
      RemoveAssetDialog,
      {
        onClose: () => {
          setShowConfirmDialog(false);
          onDelete(null);
        },
        asset
      }
    )
  ] });
};
PreviewBox.defaultProps = {
  replacementFile: void 0,
  trackedLocation: void 0
};
PreviewBox.propTypes = {
  canUpdate: PropTypes.bool.isRequired,
  canCopyLink: PropTypes.bool.isRequired,
  canDownload: PropTypes.bool.isRequired,
  replacementFile: PropTypes.instanceOf(File),
  asset: AssetDefinition.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCropFinish: PropTypes.func.isRequired,
  onCropStart: PropTypes.func.isRequired,
  onCropCancel: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
const ReplaceMediaButton = ({ onSelectMedia, acceptedMime, trackedLocation, ...props }) => {
  const { formatMessage } = useIntl();
  const inputRef = useRef(null);
  const { trackUsage } = useTracking();
  const handleClick = (e) => {
    e.preventDefault();
    if (trackedLocation) {
      trackUsage("didReplaceMedia", { location: trackedLocation });
    }
    inputRef.current.click();
  };
  const handleChange = () => {
    const file = inputRef.current.files[0];
    onSelectMedia(file);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: handleClick, ...props, children: formatMessage({
      id: getTrad("control-card.replace-media"),
      defaultMessage: "Replace media"
    }) }),
    /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsx(
      "input",
      {
        accept: acceptedMime,
        type: "file",
        name: "file",
        tabIndex: -1,
        ref: inputRef,
        onChange: handleChange,
        "aria-hidden": true
      }
    ) })
  ] });
};
ReplaceMediaButton.defaultProps = {
  trackedLocation: void 0
};
ReplaceMediaButton.propTypes = {
  acceptedMime: PropTypes.string.isRequired,
  onSelectMedia: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
const LoadingBody$1 = styled(Flex)`
  /* 80px are coming from the Tabs component that is not included in the ModalBody */
  min-height: ${() => `calc(60vh + ${pxToRem(80)})`};
`;
const fileInfoSchema = yup.object({
  name: yup.string().required(),
  alternativeText: yup.string(),
  caption: yup.string(),
  folder: yup.number()
});
const EditAssetDialog = ({
  onClose,
  asset,
  canUpdate,
  canCopyLink,
  canDownload,
  trackedLocation
}) => {
  const { formatMessage, formatDate } = useIntl();
  const { trackUsage } = useTracking();
  const submitButtonRef = useRef(null);
  const [isCropping, setIsCropping] = useState(false);
  const [replacementFile, setReplacementFile] = useState();
  const { editAsset, isLoading } = useEditAsset();
  const { data: folderStructure, isLoading: folderStructureIsLoading } = useFolderStructure({
    enabled: true
  });
  const handleSubmit = async (values) => {
    const nextAsset = { ...asset, ...values, folder: values.parent.value };
    if (asset.isLocal) {
      onClose(nextAsset);
    } else {
      const editedAsset = await editAsset(nextAsset, replacementFile);
      const assetType = asset?.mime.split("/")[0];
      const didChangeLocation = asset?.folder?.id ? asset.folder.id !== values.parent.value : asset.folder === null && !!values.parent.value;
      trackUsage("didEditMediaLibraryElements", {
        location: trackedLocation,
        type: assetType,
        changeLocation: didChangeLocation
      });
      onClose(editedAsset);
    }
  };
  const handleStartCropping = () => {
    setIsCropping(true);
  };
  const handleCancelCropping = () => {
    setIsCropping(false);
  };
  const handleFinishCropping = () => {
    setIsCropping(false);
    onClose();
  };
  const formDisabled = !canUpdate || isCropping;
  const handleConfirmClose = () => {
    const confirm = window.confirm(
      formatMessage({
        id: "window.confirm.close-modal.file",
        defaultMessage: "Are you sure? Your changes will be lost."
      })
    );
    if (confirm) {
      onClose();
    }
  };
  const activeFolderId = asset?.folder?.id;
  const initialFormData = !folderStructureIsLoading && {
    name: asset.name,
    alternativeText: asset.alternativeText ?? void 0,
    caption: asset.caption ?? void 0,
    parent: {
      value: activeFolderId ?? void 0,
      label: findRecursiveFolderByValue(folderStructure, activeFolderId)?.label ?? folderStructure[0].label
    }
  };
  const handleClose = (values) => {
    if (!isEqual(initialFormData, values)) {
      handleConfirmClose();
    } else {
      onClose();
    }
  };
  if (folderStructureIsLoading) {
    return /* @__PURE__ */ jsxs(ModalLayout, { onClose: () => handleClose(), labelledBy: "title", children: [
      /* @__PURE__ */ jsx(DialogHeader, {}),
      /* @__PURE__ */ jsx(LoadingBody$1, { minHeight: "60vh", justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({
        id: getTrad("content.isLoading"),
        defaultMessage: "Content is loading."
      }) }) }),
      /* @__PURE__ */ jsx(
        ModalFooter,
        {
          startActions: /* @__PURE__ */ jsx(Button, { onClick: () => handleClose(), variant: "tertiary", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx(
    Formik,
    {
      validationSchema: fileInfoSchema,
      validateOnChange: false,
      onSubmit: handleSubmit,
      initialValues: initialFormData,
      children: ({ values, errors, handleChange, setFieldValue }) => /* @__PURE__ */ jsxs(ModalLayout, { onClose: () => handleClose(values), labelledBy: "title", children: [
        /* @__PURE__ */ jsx(DialogHeader, {}),
        /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
          /* @__PURE__ */ jsx(GridItem, { xs: 12, col: 6, children: /* @__PURE__ */ jsx(
            PreviewBox,
            {
              asset,
              canUpdate,
              canCopyLink,
              canDownload,
              onDelete: onClose,
              onCropFinish: handleFinishCropping,
              onCropStart: handleStartCropping,
              onCropCancel: handleCancelCropping,
              replacementFile,
              trackedLocation
            }
          ) }),
          /* @__PURE__ */ jsx(GridItem, { xs: 12, col: 6, children: /* @__PURE__ */ jsxs(Form, { noValidate: true, children: [
            /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 3, children: [
              /* @__PURE__ */ jsx(
                ContextInfo,
                {
                  blocks: [
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.size"),
                        defaultMessage: "Size"
                      }),
                      value: formatBytes(asset.size)
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.dimensions"),
                        defaultMessage: "Dimensions"
                      }),
                      value: asset.height && asset.width ? `${asset.width}✕${asset.height}` : null
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.date"),
                        defaultMessage: "Date"
                      }),
                      value: formatDate(new Date(asset.createdAt))
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.extension"),
                        defaultMessage: "Extension"
                      }),
                      value: getFileExtension(asset.ext)
                    },
                    {
                      label: formatMessage({
                        id: getTrad("modal.file-details.id"),
                        defaultMessage: "Asset ID"
                      }),
                      value: asset.id
                    }
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  label: formatMessage({
                    id: getTrad("form.input.label.file-name"),
                    defaultMessage: "File name"
                  }),
                  name: "name",
                  value: values.name,
                  error: errors.name,
                  onChange: handleChange,
                  disabled: formDisabled
                }
              ),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  label: formatMessage({
                    id: getTrad("form.input.label.file-alt"),
                    defaultMessage: "Alternative text"
                  }),
                  name: "alternativeText",
                  hint: formatMessage({
                    id: getTrad("form.input.decription.file-alt"),
                    defaultMessage: "This text will be displayed if the asset can’t be shown."
                  }),
                  value: values.alternativeText,
                  error: errors.alternativeText,
                  onChange: handleChange,
                  disabled: formDisabled
                }
              ),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  label: formatMessage({
                    id: getTrad("form.input.label.file-caption"),
                    defaultMessage: "Caption"
                  }),
                  name: "caption",
                  value: values.caption,
                  error: errors.caption,
                  onChange: handleChange,
                  disabled: formDisabled
                }
              ),
              /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
                /* @__PURE__ */ jsx(FieldLabel, { htmlFor: "asset-folder", children: formatMessage({
                  id: getTrad("form.input.label.file-location"),
                  defaultMessage: "Location"
                }) }),
                /* @__PURE__ */ jsx(
                  SelectTree,
                  {
                    name: "parent",
                    defaultValue: values.parent,
                    options: folderStructure,
                    onChange: (value) => {
                      setFieldValue("parent", value);
                    },
                    menuPortalTarget: document.querySelector("body"),
                    inputId: "asset-folder",
                    isDisabled: formDisabled,
                    error: errors?.parent,
                    ariaErrorMessage: "folder-parent-error"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                tabIndex: -1,
                ref: submitButtonRef,
                disabled: formDisabled,
                children: formatMessage({ id: "submit", defaultMessage: "Submit" })
              }
            ) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx(
          ModalFooter,
          {
            startActions: /* @__PURE__ */ jsx(Button, { onClick: () => handleClose(values), variant: "tertiary", children: formatMessage({ id: "global.cancel", defaultMessage: "Cancel" }) }),
            endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                ReplaceMediaButton,
                {
                  onSelectMedia: setReplacementFile,
                  acceptedMime: asset.mime,
                  disabled: formDisabled,
                  trackedLocation
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => submitButtonRef.current.click(),
                  loading: isLoading,
                  disabled: formDisabled,
                  children: formatMessage({ id: "global.finish", defaultMessage: "Finish" })
                }
              )
            ] })
          }
        )
      ] })
    }
  );
};
EditAssetDialog.defaultProps = {
  trackedLocation: void 0
};
EditAssetDialog.propTypes = {
  asset: AssetDefinition.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  canCopyLink: PropTypes.bool.isRequired,
  canDownload: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
const useBulkRemove = () => {
  const toggleNotification = useNotification();
  const queryClient = useQueryClient();
  const { post } = useFetchClient();
  const bulkRemoveQuery = (filesAndFolders) => {
    const payload = filesAndFolders.reduce((acc, selected) => {
      const { id: id2, type } = selected;
      const key = type === "asset" ? "fileIds" : "folderIds";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(id2);
      return acc;
    }, {});
    return post("/upload/actions/bulk-delete", payload);
  };
  const mutation = useMutation(bulkRemoveQuery, {
    onSuccess(res) {
      const {
        data: { data }
      } = res;
      if (data?.files?.length > 0) {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      }
      if (data?.folders?.length > 0) {
        queryClient.refetchQueries([pluginId, "folders"], { active: true });
      }
      toggleNotification({
        type: "success",
        message: {
          id: getTrad("modal.remove.success-label"),
          defaultMessage: "Elements have been successfully deleted."
        }
      });
    },
    onError(error) {
      toggleNotification({ type: "warning", message: error.message });
    }
  });
  const remove = (...args) => mutation.mutateAsync(...args);
  return { ...mutation, remove };
};
const editFolderRequest = (put, post, { attrs, id: id2 }) => {
  const isEditing = !!id2;
  const method = isEditing ? put : post;
  return method(`/upload/folders/${id2 ?? ""}`, attrs).then((res) => res.data);
};
const useEditFolder = () => {
  const queryClient = useQueryClient();
  const { put, post } = useFetchClient();
  const mutation = useMutation((...args) => editFolderRequest(put, post, ...args), {
    onSuccess() {
      queryClient.refetchQueries([pluginId, "folders"], { active: true });
      queryClient.refetchQueries([pluginId, "folder", "structure"], { active: true });
    }
  });
  const editFolder = (attrs, id2) => mutation.mutateAsync({ attrs, id: id2 });
  return { ...mutation, editFolder, status: mutation.status };
};
const EditFolderModalHeader = ({ isEditing }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage(
    isEditing ? {
      id: getTrad("modal.folder.edit.title"),
      defaultMessage: "Edit folder"
    } : {
      id: getTrad("modal.folder.create.title"),
      defaultMessage: "Add new folder"
    }
  ) }) });
};
EditFolderModalHeader.defaultProps = {
  isEditing: false
};
EditFolderModalHeader.propTypes = {
  isEditing: PropTypes.bool
};
const RemoveFolderDialog = ({ onClose, onConfirm }) => {
  return /* @__PURE__ */ jsx(
    ConfirmDialog,
    {
      isConfirmButtonLoading: false,
      isOpen: true,
      onToggleDialog: onClose,
      onConfirm
    }
  );
};
RemoveFolderDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};
const folderSchema = yup.object({
  name: yup.string().required(),
  parent: yup.object({
    label: yup.string(),
    value: yup.number().nullable(true)
  }).nullable(true)
});
const EditFolderDialog = ({ onClose, folder, location, parentFolderId }) => {
  const { data: folderStructure, isLoading: folderStructureIsLoading } = useFolderStructure({
    enabled: true
  });
  const { canCreate, isLoading: isLoadingPermissions, canUpdate } = useMediaLibraryPermissions();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { formatMessage, formatDate } = useIntl();
  const { trackUsage } = useTracking();
  const { editFolder, isLoading: isEditFolderLoading } = useEditFolder();
  const { remove } = useBulkRemove();
  const toggleNotification = useNotification();
  const isLoading = isLoadingPermissions || folderStructureIsLoading;
  const isEditing = !!folder;
  const formDisabled = folder && !canUpdate || !folder && !canCreate;
  const initialFormData = !folderStructureIsLoading && {
    name: folder?.name ?? "",
    parent: {
      /* ideally we would use folderStructure[0].value, but since it is null
         react complains about rendering null as field value */
      value: parentFolderId ? parseInt(parentFolderId, 10) : void 0,
      label: parentFolderId ? findRecursiveFolderByValue(folderStructure, parseInt(parentFolderId, 10))?.label : folderStructure[0].label
    }
  };
  const handleSubmit = async (values, { setErrors }) => {
    try {
      await editFolder(
        {
          ...values,
          parent: values.parent.value ?? null
        },
        folder?.id
      );
      toggleNotification({
        type: "success",
        message: isEditing ? formatMessage({
          id: getTrad("modal.folder-notification-edited-success"),
          defaultMessage: "Folder successfully edited"
        }) : formatMessage({
          id: getTrad("modal.folder-notification-created-success"),
          defaultMessage: "Folder successfully created"
        })
      });
      if (isEditing) {
        const didChangeLocation = parentFolderId ? parseInt(parentFolderId, 10) !== values.parent.value : parentFolderId === null && !!values.parent.value;
        trackUsage("didEditMediaLibraryElements", {
          location,
          type: "folder",
          changeLocation: didChangeLocation
        });
      } else {
        trackUsage("didAddMediaLibraryFolders", { location });
      }
      onClose({ created: true });
    } catch (err) {
      const errors = getAPIInnerErrors(err, { getTrad });
      const formikErrors = Object.entries(errors).reduce((acc, [key, error]) => {
        acc[key] = error.defaultMessage;
        return acc;
      }, {});
      if (!isEmpty(formikErrors)) {
        setErrors(formikErrors);
      }
    }
  };
  const handleDelete = async () => {
    await remove([folder]);
    setShowConfirmDialog(false);
    onClose();
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs(ModalLayout, { onClose: () => onClose(), labelledBy: "title", children: [
      /* @__PURE__ */ jsx(EditFolderModalHeader, { isEditing }),
      /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({
        id: getTrad("content.isLoading"),
        defaultMessage: "Content is loading."
      }) }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(ModalLayout, { onClose: () => onClose(), labelledBy: "title", children: [
    /* @__PURE__ */ jsx(
      Formik,
      {
        validationSchema: folderSchema,
        validateOnChange: false,
        onSubmit: handleSubmit,
        initialValues: initialFormData,
        children: ({ values, errors, handleChange, setFieldValue }) => /* @__PURE__ */ jsxs(Form, { noValidate: true, children: [
          /* @__PURE__ */ jsx(EditFolderModalHeader, { isEditing }),
          /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsxs(Grid, { gap: 4, children: [
            isEditing && /* @__PURE__ */ jsx(GridItem, { xs: 12, col: 12, children: /* @__PURE__ */ jsx(
              ContextInfo,
              {
                blocks: [
                  {
                    label: formatMessage({
                      id: getTrad("modal.folder.create.elements"),
                      defaultMessage: "Elements"
                    }),
                    value: formatMessage(
                      {
                        id: getTrad("modal.folder.elements.count"),
                        defaultMessage: "{folderCount} folders, {assetCount} assets"
                      },
                      {
                        assetCount: folder?.files?.count ?? 0,
                        folderCount: folder?.children?.count ?? 0
                      }
                    )
                  },
                  {
                    label: formatMessage({
                      id: getTrad("modal.folder.create.creation-date"),
                      defaultMessage: "Creation Date"
                    }),
                    value: formatDate(new Date(folder.createdAt))
                  }
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(GridItem, { xs: 12, col: 6, children: /* @__PURE__ */ jsx(
              TextInput,
              {
                label: formatMessage({
                  id: getTrad("form.input.label.folder-name"),
                  defaultMessage: "Name"
                }),
                name: "name",
                value: values.name,
                error: errors.name,
                onChange: handleChange,
                disabled: formDisabled
              }
            ) }),
            /* @__PURE__ */ jsx(GridItem, { xs: 12, col: 6, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
              /* @__PURE__ */ jsx(FieldLabel, { htmlFor: "folder-parent", children: formatMessage({
                id: getTrad("form.input.label.folder-location"),
                defaultMessage: "Location"
              }) }),
              /* @__PURE__ */ jsx(
                SelectTree,
                {
                  options: folderStructure,
                  onChange: (value) => {
                    setFieldValue("parent", value);
                  },
                  isDisabled: formDisabled,
                  defaultValue: values.parent,
                  name: "parent",
                  menuPortalTarget: document.querySelector("body"),
                  inputId: "folder-parent",
                  disabled: formDisabled,
                  error: errors?.parent,
                  ariaErrorMessage: "folder-parent-error"
                }
              ),
              errors.parent && /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "pi",
                  as: "p",
                  id: "folder-parent-error",
                  textColor: "danger600",
                  children: errors.parent
                }
              )
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx(
            ModalFooter,
            {
              startActions: /* @__PURE__ */ jsx(Button, { onClick: () => onClose(), variant: "tertiary", name: "cancel", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }),
              endActions: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
                isEditing && canUpdate && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "danger-light",
                    onClick: () => setShowConfirmDialog(true),
                    name: "delete",
                    disabled: !canUpdate || isEditFolderLoading,
                    children: formatMessage({
                      id: getTrad("modal.folder.create.delete"),
                      defaultMessage: "Delete folder"
                    })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    name: "submit",
                    loading: isEditFolderLoading,
                    disabled: formDisabled,
                    type: "submit",
                    children: formatMessage(
                      isEditing ? { id: getTrad("modal.folder.edit.submit"), defaultMessage: "Save" } : { id: getTrad("modal.folder.create.submit"), defaultMessage: "Create" }
                    )
                  }
                )
              ] })
            }
          )
        ] })
      }
    ),
    showConfirmDialog && /* @__PURE__ */ jsx(RemoveFolderDialog, { onClose: () => setShowConfirmDialog(false), onConfirm: handleDelete })
  ] });
};
EditFolderDialog.defaultProps = {
  folder: void 0,
  location: void 0,
  parentFolderId: null
};
EditFolderDialog.propTypes = {
  folder: FolderDefinition,
  location: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  parentFolderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
const useFolder = (id2, { enabled = true } = {}) => {
  const toggleNotification = useNotification();
  const { get } = useFetchClient();
  const { data, error, isLoading } = useQuery(
    [pluginId, "folder", id2],
    async () => {
      const {
        data: { data: data2 }
      } = await get(`/upload/folders/${id2}`, {
        params: {
          populate: {
            parent: {
              populate: {
                parent: "*"
              }
            }
          }
        }
      });
      return data2;
    },
    {
      retry: false,
      enabled,
      staleTime: 0,
      cacheTime: 0,
      onError() {
        toggleNotification({
          type: "warning",
          message: {
            id: getTrad("notification.warning.404"),
            defaultMessage: "Not found"
          }
        });
      }
    }
  );
  return { data, error, isLoading };
};
const Extension$1 = styled.span`
  text-transform: uppercase;
`;
const CardActionsContainer = styled(CardAction)`
  opacity: 0;

  &:focus-within {
    opacity: 1;
  }
`;
const CardContainer = styled(Card$1)`
  cursor: pointer;

  &:hover {
    ${CardActionsContainer} {
      opacity: 1;
    }
  }
`;
const AssetCardBase = ({
  children,
  extension,
  isSelectable: isSelectable2,
  name: name2,
  onSelect,
  onRemove,
  onEdit,
  selected,
  subtitle,
  variant
}) => {
  const { formatMessage } = useIntl();
  const handleClick = (e) => {
    if (onEdit) {
      onEdit(e);
    }
  };
  const handlePropagationClick = (e) => {
    e.stopPropagation();
  };
  return /* @__PURE__ */ jsxs(CardContainer, { role: "button", height: "100%", tabIndex: -1, onClick: handleClick, children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      isSelectable2 && // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      /* @__PURE__ */ jsx("div", { onClick: handlePropagationClick, children: /* @__PURE__ */ jsx(CardCheckbox, { value: selected, onValueChange: onSelect }) }),
      (onRemove || onEdit) && /* @__PURE__ */ jsxs(CardActionsContainer, { onClick: handlePropagationClick, position: "end", children: [
        onRemove && /* @__PURE__ */ jsx(
          IconButton,
          {
            label: formatMessage({
              id: getTrad("control-card.remove-selection"),
              defaultMessage: "Remove from selection"
            }),
            icon: /* @__PURE__ */ jsx(Trash, {}),
            onClick: onRemove
          }
        ),
        onEdit && /* @__PURE__ */ jsx(
          IconButton,
          {
            label: formatMessage({ id: getTrad("control-card.edit"), defaultMessage: "Edit" }),
            icon: /* @__PURE__ */ jsx(Pencil, {}),
            onClick: onEdit
          }
        )
      ] }),
      children
    ] }),
    /* @__PURE__ */ jsxs(CardBody, { children: [
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(CardTitle, { as: "h2", children: name2 }) }),
        /* @__PURE__ */ jsxs(CardSubtitle, { children: [
          /* @__PURE__ */ jsx(Extension$1, { children: extension }),
          subtitle
        ] })
      ] }),
      /* @__PURE__ */ jsx(Flex, { paddingTop: 1, grow: 1, children: /* @__PURE__ */ jsx(CardBadge, { children: formatMessage({
        id: getTrad(`settings.section.${variant.toLowerCase()}.label`),
        defaultMessage: variant
      }) }) })
    ] })
  ] });
};
AssetCardBase.defaultProps = {
  children: void 0,
  isSelectable: true,
  onEdit: void 0,
  onSelect: void 0,
  onRemove: void 0,
  selected: false,
  subtitle: "",
  variant: "Image"
};
AssetCardBase.propTypes = {
  children: PropTypes.node,
  extension: PropTypes.string.isRequired,
  isSelectable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  selected: PropTypes.bool,
  subtitle: PropTypes.string,
  variant: PropTypes.oneOf(["Image", "Video", "Audio", "Doc"])
};
const AudioPreview = ({ url, alt }) => {
  return /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx("audio", { controls: true, src: url, children: alt }) });
};
AudioPreview.defaultProps = {};
AudioPreview.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
const AudioPreviewWrapper$1 = styled(Box)`
  canvas,
  audio {
    display: block;
    max-width: 100%;
    max-height: ${({ size }) => size === "M" ? 164 / 16 : 88 / 16}rem;
  }
`;
const AudioAssetCard = ({ name: name2, url, size, ...restProps }) => {
  return /* @__PURE__ */ jsx(AssetCardBase, { name: name2, ...restProps, variant: "Audio", children: /* @__PURE__ */ jsx(CardAsset$2, { size, children: /* @__PURE__ */ jsx(AudioPreviewWrapper$1, { size, children: /* @__PURE__ */ jsx(AudioPreview, { url, alt: name2 }) }) }) });
};
AudioAssetCard.defaultProps = {
  onSelect: void 0,
  onEdit: void 0,
  onRemove: void 0,
  selected: false,
  size: "M"
};
AudioAssetCard.propTypes = {
  extension: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  url: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(["S", "M"])
};
const IconWrapper$1 = styled.span`
  svg {
    font-size: 3rem;
  }
`;
const CardAsset = styled(Flex)`
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f9 121.48%);
`;
const DocAssetCard = ({ name: name2, extension, size, ...restProps }) => {
  return /* @__PURE__ */ jsx(AssetCardBase, { name: name2, extension, ...restProps, variant: "Doc", children: /* @__PURE__ */ jsx(
    CardAsset,
    {
      width: "100%",
      height: size === "S" ? pxToRem(88) : pxToRem(164),
      justifyContent: "center",
      children: /* @__PURE__ */ jsx(IconWrapper$1, { children: extension === "pdf" ? /* @__PURE__ */ jsx(FilePdf, { "aria-label": name2 }) : /* @__PURE__ */ jsx(File$1, { "aria-label": name2 }) })
    }
  ) });
};
DocAssetCard.defaultProps = {
  selected: false,
  onEdit: void 0,
  onSelect: void 0,
  onRemove: void 0,
  size: "M"
};
DocAssetCard.propTypes = {
  extension: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["S", "M"])
};
const ImageAssetCard = ({ height, width, thumbnail, size, alt, isUrlSigned, ...props }) => {
  const thumbnailUrl = isUrlSigned ? thumbnail : appendSearchParamsToUrl({
    url: thumbnail,
    params: { updatedAt: props.updatedAt }
  });
  return /* @__PURE__ */ jsx(AssetCardBase, { ...props, subtitle: height && width && ` - ${width}✕${height}`, variant: "Image", children: /* @__PURE__ */ jsx(CardAsset$2, { src: thumbnailUrl, size, alt }) });
};
ImageAssetCard.defaultProps = {
  height: void 0,
  width: void 0,
  selected: false,
  onEdit: void 0,
  onSelect: void 0,
  onRemove: void 0,
  size: "M",
  updatedAt: void 0
};
ImageAssetCard.propTypes = {
  alt: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
  height: PropTypes.number,
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  width: PropTypes.number,
  thumbnail: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(["S", "M"]),
  updatedAt: PropTypes.string,
  isUrlSigned: PropTypes.bool.isRequired
};
const HAVE_FUTURE_DATA = 3;
const VideoPreview = ({ url, mime, onLoadDuration, alt, ...props }) => {
  const handleTimeUpdate = (e) => {
    if (e.target.currentTime > 0) {
      const video = e.target;
      const canvas = document.createElement("canvas");
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.replaceWith(canvas);
      onLoadDuration(video.duration);
    }
  };
  const handleThumbnailVisibility = (e) => {
    const video = e.target;
    if (video.readyState < HAVE_FUTURE_DATA)
      return;
    video.play();
  };
  return /* @__PURE__ */ createElement(Box, { as: "figure", ...props, key: url }, /* @__PURE__ */ jsx(
    "video",
    {
      muted: true,
      onLoadedData: handleThumbnailVisibility,
      src: url,
      crossOrigin: "anonymous",
      onTimeUpdate: handleTimeUpdate,
      children: /* @__PURE__ */ jsx("source", { type: mime })
    }
  ), /* @__PURE__ */ jsx(VisuallyHidden, { as: "figcaption", children: alt }));
};
VideoPreview.defaultProps = {
  onLoadDuration() {
  },
  size: "M"
};
VideoPreview.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  mime: PropTypes.string.isRequired,
  onLoadDuration: PropTypes.func,
  size: PropTypes.oneOf(["S", "M"])
};
const VideoPreviewWrapper$2 = styled(Box)`
  canvas,
  video {
    display: block;
    pointer-events: none;
    max-width: 100%;
    max-height: ${({ size }) => size === "M" ? 164 / 16 : 88 / 16}rem;
  }
`;
const VideoAssetCard = ({ name: name2, url, mime, size, ...props }) => {
  const [duration, setDuration] = useState();
  const formattedDuration = duration && formatDuration(duration);
  return /* @__PURE__ */ jsxs(AssetCardBase, { name: name2, ...props, variant: "Video", children: [
    /* @__PURE__ */ jsx(CardAsset$2, { size, children: /* @__PURE__ */ jsx(VideoPreviewWrapper$2, { size, children: /* @__PURE__ */ jsx(VideoPreview, { url, mime, onLoadDuration: setDuration, alt: name2 }) }) }),
    /* @__PURE__ */ jsx(CardTimer, { children: formattedDuration || "..." })
  ] });
};
VideoAssetCard.defaultProps = {
  onSelect: void 0,
  onEdit: void 0,
  onRemove: void 0,
  selected: false,
  size: "M"
};
VideoAssetCard.propTypes = {
  extension: PropTypes.string.isRequired,
  mime: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  url: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(["S", "M"])
};
const AssetCard = ({ asset, isSelected, onSelect, onEdit, onRemove, size, local }) => {
  const handleSelect = onSelect ? () => onSelect(asset) : void 0;
  const commonAssetCardProps = {
    id: asset.id,
    isSelectable: asset.isSelectable,
    extension: getFileExtension(asset.ext),
    key: asset.id,
    name: asset.name,
    url: local ? asset.url : createAssetUrl(asset, true),
    mime: asset.mime,
    onEdit: onEdit ? () => onEdit(asset) : void 0,
    onSelect: handleSelect,
    onRemove: onRemove ? () => onRemove(asset) : void 0,
    selected: isSelected,
    size
  };
  if (asset.mime.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsx(VideoAssetCard, { ...commonAssetCardProps });
  }
  if (asset.mime.includes(AssetType.Image)) {
    return /* @__PURE__ */ jsx(
      ImageAssetCard,
      {
        ...commonAssetCardProps,
        alt: asset.alternativeText || asset.name,
        height: asset.height,
        thumbnail: prefixFileUrlWithBackendUrl(asset?.formats?.thumbnail?.url || asset.url),
        width: asset.width,
        updatedAt: asset.updatedAt,
        isUrlSigned: asset?.isUrlSigned || false
      }
    );
  }
  if (asset.mime.includes(AssetType.Audio)) {
    return /* @__PURE__ */ jsx(AudioAssetCard, { ...commonAssetCardProps });
  }
  return /* @__PURE__ */ jsx(DocAssetCard, { ...commonAssetCardProps });
};
AssetCard.defaultProps = {
  isSelected: false,
  // Determine if the asset is loaded locally or from a remote resource
  local: false,
  onSelect: void 0,
  onEdit: void 0,
  onRemove: void 0,
  size: "M"
};
AssetCard.propTypes = {
  asset: AssetDefinition.isRequired,
  local: PropTypes.bool,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  isSelected: PropTypes.bool,
  size: PropTypes.oneOf(["S", "M"])
};
const Draggable = ({ children, id: id2, index: index2, moveItem }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "draggable",
    hover(hoveredOverItem) {
      if (!ref.current) {
        return;
      }
      if (hoveredOverItem.id !== id2) {
        moveItem(hoveredOverItem.index, index2);
        hoveredOverItem.index = index2;
      }
    }
  });
  const [{ isDragging }, drag] = useDrag({
    type: "draggable",
    item() {
      return { index: index2, id: id2 };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.2 : 1;
  drag(drop(ref));
  return /* @__PURE__ */ jsx("div", { ref, style: { opacity, cursor: "move" }, children });
};
Draggable.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  moveItem: PropTypes.func.isRequired
};
const AssetGridList = ({
  allowedTypes,
  assets,
  onEditAsset,
  onSelectAsset,
  selectedAssets,
  size,
  onReorderAsset,
  title
}) => {
  return /* @__PURE__ */ jsxs(KeyboardNavigable, { tagName: "article", children: [
    title && /* @__PURE__ */ jsx(Box, { paddingTop: 2, paddingBottom: 2, children: /* @__PURE__ */ jsx(Typography, { as: "h2", variant: "delta", fontWeight: "semiBold", children: title }) }),
    /* @__PURE__ */ jsx(Grid, { gap: 4, children: assets.map((asset, index2) => {
      const isSelected = !!selectedAssets.find((currentAsset) => currentAsset.id === asset.id);
      if (onReorderAsset) {
        return /* @__PURE__ */ jsx(GridItem, { col: 3, height: "100%", children: /* @__PURE__ */ jsx(Draggable, { index: index2, moveItem: onReorderAsset, id: asset.id, children: /* @__PURE__ */ jsx(
          AssetCard,
          {
            allowedTypes,
            asset,
            isSelected,
            onEdit: onEditAsset ? () => onEditAsset(asset) : void 0,
            onSelect: () => onSelectAsset(asset),
            size
          }
        ) }) }, asset.id);
      }
      return /* @__PURE__ */ jsx(GridItem, { col: 3, height: "100%", children: /* @__PURE__ */ jsx(
        AssetCard,
        {
          allowedTypes,
          asset,
          isSelected,
          onEdit: onEditAsset ? () => onEditAsset(asset) : void 0,
          onSelect: () => onSelectAsset(asset),
          size
        },
        asset.id
      ) }, asset.id);
    }) })
  ] });
};
AssetGridList.defaultProps = {
  allowedTypes: ["images", "files", "videos", "audios"],
  onEditAsset: void 0,
  size: "M",
  onReorderAsset: void 0,
  title: null
};
AssetGridList.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  assets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onEditAsset: PropTypes.func,
  onSelectAsset: PropTypes.func.isRequired,
  selectedAssets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  size: PropTypes.oneOf(["S", "M"]),
  onReorderAsset: PropTypes.func,
  title: PropTypes.string
};
const CrumbSimpleMenuAsync = ({ parentsToOmit, currentFolderId, onChangeFolder }) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, isLoading } = useFolderStructure({ enabled: shouldFetch });
  const { pathname } = useLocation();
  const [{ query }] = useQueryParams();
  const { formatMessage } = useIntl();
  const allAscendants = data && getFolderParents(data, currentFolderId);
  const filteredAscendants = allAscendants && allAscendants.filter(
    (ascendant) => !parentsToOmit.includes(ascendant.id) && ascendant.id !== null
  );
  return /* @__PURE__ */ jsxs(
    CrumbSimpleMenu,
    {
      onOpen: () => setShouldFetch(true),
      onClose: () => setShouldFetch(false),
      "aria-label": formatMessage({
        id: getTrad("header.breadcrumbs.menu.label"),
        defaultMessage: "Get more ascendants folders"
      }),
      label: "...",
      children: [
        isLoading && /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(Loader, { small: true, children: formatMessage({
          id: getTrad("content.isLoading"),
          defaultMessage: "Content is loading."
        }) }) }),
        filteredAscendants && filteredAscendants.map((ascendant) => {
          if (onChangeFolder) {
            return /* @__PURE__ */ jsx(
              MenuItem,
              {
                as: "button",
                type: "button",
                onClick: () => onChangeFolder(ascendant.id, ascendant.path),
                children: ascendant.label
              },
              ascendant.id
            );
          }
          const url = getFolderURL(pathname, query, {
            folder: ascendant?.id,
            folderPath: ascendant?.path
          });
          return /* @__PURE__ */ jsx(MenuItem, { isLink: true, as: NavLink, to: url, children: ascendant.label }, ascendant.id);
        })
      ]
    }
  );
};
CrumbSimpleMenuAsync.defaultProps = {
  currentFolderId: void 0,
  onChangeFolder: void 0,
  parentsToOmit: []
};
CrumbSimpleMenuAsync.propTypes = {
  currentFolderId: PropTypes.number,
  onChangeFolder: PropTypes.func,
  parentsToOmit: PropTypes.arrayOf(PropTypes.number)
};
const Breadcrumbs = ({ breadcrumbs, onChangeFolder, currentFolderId, ...props }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Breadcrumbs$1, { ...props, children: breadcrumbs.map((crumb, index2) => {
    if (Array.isArray(crumb)) {
      return /* @__PURE__ */ jsx(
        CrumbSimpleMenuAsync,
        {
          parentsToOmit: [...breadcrumbs].splice(index2 + 1, breadcrumbs.length - 1).map((parent) => parent.id),
          currentFolderId,
          onChangeFolder
        },
        `breadcrumb-${crumb?.id ?? "menu"}`
      );
    }
    const isCurrentFolderMediaLibrary = crumb.id === null && currentFolderId === void 0;
    if (currentFolderId !== crumb.id && !isCurrentFolderMediaLibrary) {
      return /* @__PURE__ */ jsx(
        CrumbLink,
        {
          as: onChangeFolder ? "button" : NavLink,
          type: onChangeFolder && "button",
          to: onChangeFolder ? void 0 : crumb.href,
          onClick: onChangeFolder && (() => onChangeFolder(crumb.id, crumb.path)),
          children: crumb.label?.id ? formatMessage(crumb.label) : crumb.label
        },
        `breadcrumb-${crumb?.id ?? "root"}`
      );
    }
    return /* @__PURE__ */ jsx(
      Crumb,
      {
        isCurrent: index2 + 1 === breadcrumbs.length,
        children: crumb.label?.id ? formatMessage(crumb.label) : crumb.label
      },
      `breadcrumb-${crumb?.id ?? "root"}`
    );
  }) });
};
Breadcrumbs.defaultProps = {
  currentFolderId: void 0,
  onChangeFolder: void 0
};
Breadcrumbs.propTypes = {
  breadcrumbs: BreadcrumbsDefinition.isRequired,
  currentFolderId: PropTypes.number,
  onChangeFolder: PropTypes.func
};
const EmptyAssetCard = styled(Box)`
  background: linear-gradient(
    180deg,
    rgba(234, 234, 239, 0) 0%,
    ${({ theme }) => theme.colors.neutral200} 100%
  );
  opacity: 0.33;
`;
const GridColSize = {
  S: 180,
  M: 250
};
const PlaceholderSize = {
  S: 138,
  M: 234
};
const GridLayout = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${({ size }) => `${GridColSize[size]}px`}, 1fr));
  grid-gap: ${({ theme }) => theme.spaces[4]};
`;
const EmptyAssetGrid = ({ count, size }) => {
  return /* @__PURE__ */ jsx(GridLayout, { size, children: Array(count).fill(null).map((_, idx) => /* @__PURE__ */ jsx(
    EmptyAssetCard,
    {
      height: `${PlaceholderSize[size]}px`,
      hasRadius: true
    },
    `empty-asset-card-${idx}`
  )) });
};
EmptyAssetGrid.propTypes = {
  count: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired
};
const EmptyAssets = ({ icon, content, action, size, count }) => {
  return /* @__PURE__ */ jsxs(Box, { position: "relative", children: [
    /* @__PURE__ */ jsx(EmptyAssetGrid, { size, count }),
    /* @__PURE__ */ jsx(Box, { position: "absolute", top: 11, width: "100%", children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "center", gap: 4, textAlign: "center", children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "center", gap: 6, children: [
        /* @__PURE__ */ jsx(Icon, { as: icon || EmptyDocuments, color: "", width: "160px", height: "88px" }),
        /* @__PURE__ */ jsx(Typography, { variant: "delta", as: "p", textColor: "neutral600", children: content })
      ] }),
      action
    ] }) })
  ] });
};
EmptyAssets.defaultProps = {
  action: void 0,
  icon: void 0,
  size: "M",
  count: 12
};
EmptyAssets.propTypes = {
  action: PropTypes.node,
  icon: PropTypes.func,
  content: PropTypes.string.isRequired,
  size: PropTypes.string,
  count: PropTypes.number
};
const FolderCardContext = createContext({});
function useFolderCard() {
  return useContext(FolderCardContext);
}
let id = 0;
const genId = () => ++id;
const useId = (initialId) => {
  const idRef = useRef(`${initialId}-${genId()}`);
  return idRef.current;
};
const FauxClickWrapper = styled.button`
  height: 100%;
  left: 0;
  position: absolute;
  opacity: 0;
  top: 0;
  width: 100%;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;
const StyledFolder = styled(Folder)`
  path {
    fill: currentColor;
  }
`;
const CardActionDisplay = styled(Box)`
  display: none;
`;
const Card = styled(Box)`
  &:hover,
  &:focus-within {
    ${CardActionDisplay} {
      display: ${({ isCardActions }) => isCardActions ? "block" : ""};
    }
  }
`;
const FolderCard = forwardRef(
  ({ children, id: id2, startAction, cardActions, ariaLabel, onClick, to, ...props }, ref) => {
    const generatedId = useId(id2);
    const fodlerCtxValue = useMemo(() => ({ id: generatedId }), [generatedId]);
    return /* @__PURE__ */ jsx(FolderCardContext.Provider, { value: fodlerCtxValue, children: /* @__PURE__ */ jsxs(Card, { position: "relative", tabIndex: 0, isCardActions: !!cardActions, ref, ...props, children: [
      /* @__PURE__ */ jsx(
        FauxClickWrapper,
        {
          to: to || void 0,
          as: to ? NavLink : "button",
          type: to ? void 0 : "button",
          onClick,
          tabIndex: -1,
          "aria-label": ariaLabel,
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsxs(
        Flex,
        {
          hasRadius: true,
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "neutral150",
          background: "neutral0",
          shadow: "tableShadow",
          padding: 3,
          gap: 2,
          cursor: "pointer",
          children: [
            startAction,
            /* @__PURE__ */ jsx(
              Box,
              {
                hasRadius: true,
                background: "secondary100",
                color: "secondary500",
                paddingBottom: 2,
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 2,
                children: /* @__PURE__ */ jsx(StyledFolder, { width: pxToRem(24), height: pxToRem(24) })
              }
            ),
            children,
            /* @__PURE__ */ jsx(CardActionDisplay, { children: /* @__PURE__ */ jsx(CardAction, { right: 4, children: cardActions }) })
          ]
        }
      )
    ] }) });
  }
);
FolderCard.defaultProps = {
  id: void 0,
  cardActions: null,
  startAction: null,
  to: void 0,
  onClick: void 0
};
FolderCard.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  onClick: PropTypes.func,
  startAction: PropTypes.element,
  cardActions: PropTypes.element,
  to: PropTypes.string
};
const StyledBox = styled(Flex)`
  user-select: none;
`;
const FolderCardBody = (props) => {
  const { id: id2 } = useFolderCard();
  return /* @__PURE__ */ jsx(
    StyledBox,
    {
      ...props,
      id: `${id2}-title`,
      alignItems: "flex-start",
      direction: "column",
      maxWidth: "100%",
      overflow: "hidden",
      position: "relative"
    }
  );
};
const BoxOutline = styled(Box)`
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: -2px;
  }
`;
const BoxTextDecoration = styled(BoxOutline)`
  text-decoration: none;
`;
const FolderCardBodyAction = ({ to, ...props }) => {
  if (to) {
    return /* @__PURE__ */ jsx(
      BoxTextDecoration,
      {
        padding: 1,
        as: NavLink,
        maxWidth: "100%",
        to,
        ...props
      }
    );
  }
  return /* @__PURE__ */ jsx(BoxOutline, { padding: 1, as: "button", type: "button", maxWidth: "100%", ...props });
};
FolderCardBodyAction.defaultProps = {
  to: void 0
};
FolderCardBodyAction.propTypes = {
  to: PropTypes.string
};
const FolderGridList = ({ title, children }) => {
  return /* @__PURE__ */ jsxs(KeyboardNavigable, { tagName: "article", children: [
    title && /* @__PURE__ */ jsx(Box, { paddingBottom: 2, children: /* @__PURE__ */ jsx(Typography, { as: "h2", variant: "delta", fontWeight: "semiBold", children: title }) }),
    /* @__PURE__ */ jsx(Grid, { gap: 4, children })
  ] });
};
FolderGridList.defaultProps = {
  title: null
};
FolderGridList.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};
const SortPicker = ({ onChangeSort, value }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    SingleSelect,
    {
      size: "S",
      value,
      onChange: (value2) => onChangeSort(value2),
      "aria-label": formatMessage({
        id: getTrad("sort.label"),
        defaultMessage: "Sort by"
      }),
      placeholder: formatMessage({
        id: getTrad("sort.label"),
        defaultMessage: "Sort by"
      }),
      children: sortOptions.map((filter) => /* @__PURE__ */ jsx(SingleSelectOption, { value: filter.value, children: formatMessage({ id: getTrad(filter.key), defaultMessage: `${filter.value}` }) }, filter.key))
    }
  );
};
SortPicker.defaultProps = {
  value: void 0
};
SortPicker.propTypes = {
  onChangeSort: PropTypes.func.isRequired,
  value: PropTypes.string
};
const VideoPreviewWrapper$1 = styled(Box)`
  figure {
    width: ${({ theme }) => theme.spaces[7]};
    height: ${({ theme }) => theme.spaces[7]};
  }

  canvas,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const PreviewCell = ({ type, content }) => {
  if (type === "folder") {
    return /* @__PURE__ */ jsx(Initials, { background: "secondary100", textColor: "secondary600", children: /* @__PURE__ */ jsx(Icon, { color: "secondary500", width: pxToRem(16), height: pxToRem(16), as: Folder }) });
  }
  const { alternativeText, ext, formats, mime, name: name2, url } = content;
  if (mime.includes(AssetType.Image)) {
    const mediaURL = prefixFileUrlWithBackendUrl(formats?.thumbnail?.url) ?? prefixFileUrlWithBackendUrl(url);
    return /* @__PURE__ */ jsx(Avatar, { src: mediaURL, alt: alternativeText, preview: true });
  }
  if (mime.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsx(VideoPreviewWrapper$1, { children: /* @__PURE__ */ jsx(
      VideoPreview,
      {
        url: createAssetUrl(content, true),
        mime,
        alt: alternativeText ?? name2
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Initials, { background: "secondary100", textColor: "secondary600", children: getFileExtension(ext) });
};
PreviewCell.propTypes = {
  content: PropTypes.shape({
    alternativeText: PropTypes.string,
    ext: PropTypes.string,
    formats: PropTypes.shape({
      thumbnail: PropTypes.shape({
        url: PropTypes.string
      })
    }),
    mime: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  type: PropTypes.string.isRequired
};
const CellContent = ({ cellType, contentType, content, name: name2 }) => {
  const { formatDate, formatMessage } = useIntl();
  switch (cellType) {
    case "image":
      return /* @__PURE__ */ jsx(PreviewCell, { type: contentType, content });
    case "date":
      return /* @__PURE__ */ jsx(Typography, { children: formatDate(parseISO(content[name2]), { dateStyle: "full" }) });
    case "size":
      if (contentType === "folder")
        return /* @__PURE__ */ jsx(
          Typography,
          {
            "aria-label": formatMessage({
              id: "list.table.content.empty-label",
              defaultMessage: "This field is empty"
            }),
            children: "-"
          }
        );
      return /* @__PURE__ */ jsx(Typography, { children: formatBytes(content[name2]) });
    case "ext":
      if (contentType === "folder")
        return /* @__PURE__ */ jsx(
          Typography,
          {
            "aria-label": formatMessage({
              id: "list.table.content.empty-label",
              defaultMessage: "This field is empty"
            }),
            children: "-"
          }
        );
      return /* @__PURE__ */ jsx(Typography, { children: getFileExtension(content[name2]).toUpperCase() });
    case "text":
      return /* @__PURE__ */ jsx(Typography, { children: content[name2] });
    default:
      return /* @__PURE__ */ jsx(
        Typography,
        {
          "aria-label": formatMessage({
            id: "list.table.content.empty-label",
            defaultMessage: "This field is empty"
          }),
          children: "-"
        }
      );
  }
};
CellContent.propTypes = {
  cellType: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  content: PropTypes.shape({
    alternativeText: PropTypes.string,
    ext: PropTypes.string,
    formats: PropTypes.shape({
      thumbnail: PropTypes.shape({
        url: PropTypes.string
      })
    }),
    mime: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  name: PropTypes.string.isRequired
};
const TableRows = ({
  onChangeFolder,
  onEditAsset,
  onEditFolder,
  onSelectOne,
  rows,
  selected
}) => {
  const { formatMessage } = useIntl();
  const handleRowClickFn = (element, elementType, id2, path) => {
    if (elementType === "asset") {
      onEditAsset(element);
    } else {
      onChangeFolder(id2, path);
    }
  };
  return /* @__PURE__ */ jsx(Tbody, { children: rows.map((element) => {
    const { path, id: id2, isSelectable: isSelectable2, name: name2, folderURL, type: contentType } = element;
    const isSelected = !!selected.find(
      (currentRow) => currentRow.id === id2 && currentRow.type === contentType
    );
    return /* @__PURE__ */ jsxs(
      Tr,
      {
        ...onRowClick({
          fn: () => handleRowClickFn(element, contentType, id2, path)
        }),
        children: [
          /* @__PURE__ */ jsx(Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(
            BaseCheckbox,
            {
              "aria-label": formatMessage(
                {
                  id: contentType === "asset" ? "list-assets-select" : "list.folder.select",
                  defaultMessage: contentType === "asset" ? "Select {name} asset" : "Select {name} folder"
                },
                { name: name2 }
              ),
              disabled: !isSelectable2,
              onValueChange: () => onSelectOne(element),
              checked: isSelected
            }
          ) }),
          tableHeaders.map(({ name: name22, type: cellType }) => {
            return /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(
              CellContent,
              {
                content: element,
                cellType,
                contentType,
                name: name22
              }
            ) }, name22);
          }),
          /* @__PURE__ */ jsx(Td, { ...stopPropagation, children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "flex-end", children: [
            contentType === "folder" && /* @__PURE__ */ jsx(
              IconButton,
              {
                as: folderURL ? Link$1 : void 0,
                label: formatMessage({
                  id: getTrad("list.folders.link-label"),
                  defaultMessage: "Access folder"
                }),
                to: folderURL,
                onClick: () => !folderURL && onChangeFolder(id2),
                noBorder: true,
                children: /* @__PURE__ */ jsx(Eye, {})
              }
            ),
            /* @__PURE__ */ jsx(
              IconButton,
              {
                label: formatMessage({
                  id: getTrad("control-card.edit"),
                  defaultMessage: "Edit"
                }),
                onClick: () => contentType === "asset" ? onEditAsset(element) : onEditFolder(element),
                noBorder: true,
                children: /* @__PURE__ */ jsx(Pencil, {})
              }
            )
          ] }) })
        ]
      },
      id2
    );
  }) });
};
TableRows.defaultProps = {
  onChangeFolder: null,
  rows: [],
  selected: []
};
TableRows.propTypes = {
  onChangeFolder: PropTypes.func,
  onEditAsset: PropTypes.func.isRequired,
  onEditFolder: PropTypes.func.isRequired,
  onSelectOne: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(AssetDefinition, FolderDefinition),
  selected: PropTypes.arrayOf(AssetDefinition, FolderDefinition)
};
const TableList = ({
  assetCount,
  folderCount,
  indeterminate,
  onChangeSort,
  onChangeFolder,
  onEditAsset,
  onEditFolder,
  onSelectAll,
  onSelectOne,
  rows,
  selected,
  shouldDisableBulkSelect,
  sortQuery
}) => {
  const { formatMessage } = useIntl();
  const [sortBy, sortOrder] = sortQuery.split(":");
  const handleClickSort = (isSorted, name2) => {
    const nextSortOrder = isSorted && sortOrder === "ASC" ? "DESC" : "ASC";
    const nextSort = `${name2}:${nextSortOrder}`;
    onChangeSort(nextSort);
  };
  return /* @__PURE__ */ jsxs(Table, { colCount: tableHeaders.length + 2, rowCount: assetCount + folderCount + 1, children: [
    /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(
        BaseCheckbox,
        {
          "aria-label": formatMessage({
            id: getTrad("bulk.select.label"),
            defaultMessage: "Select all folders & assets"
          }),
          disabled: shouldDisableBulkSelect,
          indeterminate: indeterminate && !shouldDisableBulkSelect,
          onChange: (e) => onSelectAll(e, rows),
          value: (assetCount > 0 || folderCount > 0) && selected.length === assetCount + folderCount
        }
      ) }),
      tableHeaders.map(({ metadatas: { label, isSortable }, name: name2, key }) => {
        const isSorted = sortBy === name2;
        const isUp = sortOrder === "ASC";
        const tableHeaderLabel = formatMessage(label);
        const sortLabel = formatMessage(
          { id: "list.table.header.sort", defaultMessage: "Sort on {label}" },
          { label: tableHeaderLabel }
        );
        return /* @__PURE__ */ jsx(
          Th,
          {
            action: isSorted && /* @__PURE__ */ jsx(
              IconButton,
              {
                label: sortLabel,
                onClick: () => handleClickSort(isSorted, name2),
                noBorder: true,
                children: isUp ? /* @__PURE__ */ jsx(CarretUp, {}) : /* @__PURE__ */ jsx(CarretDown, {})
              }
            ),
            children: /* @__PURE__ */ jsx(Tooltip, { label: isSortable ? sortLabel : tableHeaderLabel, children: isSortable ? /* @__PURE__ */ jsx(
              Typography,
              {
                onClick: () => handleClickSort(isSorted, name2),
                as: isSorted ? "span" : "button",
                label: !isSorted ? sortLabel : "",
                textColor: "neutral600",
                variant: "sigma",
                children: tableHeaderLabel
              }
            ) : /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", variant: "sigma", children: tableHeaderLabel }) })
          },
          key
        );
      }),
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
        id: getTrad("list.table.header.actions"),
        defaultMessage: "actions"
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      TableRows,
      {
        onChangeFolder,
        onEditAsset,
        onEditFolder,
        rows,
        onSelectOne,
        selected
      }
    )
  ] });
};
TableList.defaultProps = {
  assetCount: 0,
  folderCount: 0,
  indeterminate: false,
  onChangeSort: null,
  onChangeFolder: null,
  onEditAsset: null,
  onEditFolder: null,
  rows: [],
  selected: [],
  shouldDisableBulkSelect: false,
  sortQuery: ""
};
TableList.propTypes = {
  assetCount: PropTypes.number,
  folderCount: PropTypes.number,
  indeterminate: PropTypes.bool,
  onChangeSort: PropTypes.func,
  onChangeFolder: PropTypes.func,
  onEditAsset: PropTypes.func,
  onEditFolder: PropTypes.func,
  onSelectAll: PropTypes.func.isRequired,
  onSelectOne: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(AssetDefinition, FolderDefinition),
  selected: PropTypes.arrayOf(AssetDefinition, FolderDefinition),
  shouldDisableBulkSelect: PropTypes.bool,
  sortQuery: PropTypes.string
};
const displayedFilters = [
  {
    name: "createdAt",
    fieldSchema: {
      type: "date"
    },
    metadatas: { label: "createdAt" }
  },
  {
    name: "updatedAt",
    fieldSchema: {
      type: "date"
    },
    metadatas: { label: "updatedAt" }
  },
  {
    name: "mime",
    fieldSchema: {
      type: "enumeration",
      options: [
        { label: "audio", value: "audio" },
        { label: "file", value: "file" },
        { label: "image", value: "image" },
        { label: "video", value: "video" }
      ]
    },
    metadatas: { label: "type" }
  }
];
const FilterTag = ({ attribute, filter, onClick, operator, value }) => {
  const { formatMessage, formatDate, formatTime } = useIntl();
  const handleClick = () => {
    onClick(filter);
  };
  const { fieldSchema } = attribute;
  const type = fieldSchema.type;
  let formattedValue = value;
  if (type === "date") {
    formattedValue = formatDate(value, { dateStyle: "full" });
  }
  if (type === "datetime") {
    formattedValue = formatDate(value, { dateStyle: "full", timeStyle: "short" });
  }
  if (type === "time") {
    const [hour, minute] = value.split(":");
    const date = /* @__PURE__ */ new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    formattedValue = formatTime(date, {
      numeric: "auto",
      style: "short"
    });
  }
  const content = `${attribute.metadatas.label} ${formatMessage({
    id: `components.FilterOptions.FILTER_TYPES.${operator}`,
    defaultMessage: operator
  })} ${formattedValue}`;
  return /* @__PURE__ */ jsx(Box, { padding: 1, children: /* @__PURE__ */ jsx(Tag, { onClick: handleClick, icon: /* @__PURE__ */ jsx(Cross, {}), children: content }) });
};
FilterTag.propTypes = {
  attribute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fieldSchema: PropTypes.object.isRequired,
    metadatas: PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired
  }).isRequired,
  filter: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  operator: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
const FilterList = ({ appliedFilters, filtersSchema, onRemoveFilter }) => {
  const handleClick = (filter) => {
    const nextFilters = appliedFilters.filter((prevFilter) => {
      const name2 = Object.keys(filter)[0];
      const filterType = Object.keys(filter[name2])[0];
      const value = filter[name2][filterType];
      return prevFilter[name2]?.[filterType] !== value;
    });
    onRemoveFilter(nextFilters);
  };
  return appliedFilters.map((filter, i) => {
    const attributeName = Object.keys(filter)[0];
    const attribute = filtersSchema.find(({ name: name2 }) => name2 === attributeName);
    const filterObj = filter[attributeName];
    const operator = Object.keys(filterObj)[0];
    let value = filterObj[operator];
    let displayedOperator = operator;
    if (attribute.name === "mime") {
      displayedOperator = operator === "$contains" ? "$eq" : "$ne";
      if (operator === "$not") {
        value = "file";
        displayedOperator = "$eq";
      }
      if (["image", "video"].includes(value[0]) && ["image", "video"].includes(value[1])) {
        value = "file";
        displayedOperator = "$ne";
      }
    }
    return /* @__PURE__ */ jsx(
      FilterTag,
      {
        attribute,
        filter,
        onClick: handleClick,
        operator: displayedOperator,
        value
      },
      `${attributeName}-${i}`
    );
  });
};
FilterList.defaultProps = {
  filtersSchema: []
};
FilterList.propTypes = {
  appliedFilters: PropTypes.array.isRequired,
  filtersSchema: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({
        type: PropTypes.string,
        mainField: PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.string
        })
      })
    })
  ),
  onRemoveFilter: PropTypes.func.isRequired
};
const FilterValueInput = ({ label, onChange, options, type, value }) => {
  const { formatMessage } = useIntl();
  if (type === "date") {
    return /* @__PURE__ */ jsx(
      DateTimePicker,
      {
        clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" }),
        ariaLabel: label,
        name: "datetimepicker",
        onChange: (date) => {
          const formattedDate = date ? new Date(date).toISOString() : "";
          onChange(formattedDate);
        },
        onClear: () => onChange(""),
        value: value ? new Date(value) : void 0,
        selectedDateLabel: (formattedDate) => `Date picker, current is ${formattedDate}`,
        selectButtonTitle: formatMessage({ id: "selectButtonTitle", defaultMessage: "Select" })
      }
    );
  }
  return /* @__PURE__ */ jsx(Select, { "aria-label": label, onChange, value, children: options.map((option) => {
    return /* @__PURE__ */ jsx(Option$1, { value: option.value, children: option.label }, option.value);
  }) });
};
FilterValueInput.defaultProps = {
  label: "",
  options: [],
  value: ""
};
FilterValueInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string.isRequired })
  ),
  type: PropTypes.string.isRequired,
  value: PropTypes.any
};
const getFilterList = ({ fieldSchema: { type: fieldType, mainField } }) => {
  const type = mainField?.schema.type ? mainField.schema.type : fieldType;
  switch (type) {
    case "enumeration": {
      return [
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$eq",
            defaultMessage: "is"
          },
          value: "$contains"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$ne",
            defaultMessage: "is not"
          },
          value: "$notContains"
        }
      ];
    }
    case "date": {
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gt",
            defaultMessage: "is greater than"
          },
          value: "$gt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$gte",
            defaultMessage: "is greater than or equal to"
          },
          value: "$gte"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lt",
            defaultMessage: "is less than"
          },
          value: "$lt"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$lte",
            defaultMessage: "is less than or equal to"
          },
          value: "$lte"
        }
      ];
    }
    default:
      return [
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$eq", defaultMessage: "is" },
          value: "$eq"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$eqi",
            defaultMessage: "is (case insensitive)"
          },
          value: "$eqi"
        },
        {
          intlLabel: { id: "components.FilterOptions.FILTER_TYPES.$ne", defaultMessage: "is not" },
          value: "$ne"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$null",
            defaultMessage: "is null"
          },
          value: "$null"
        },
        {
          intlLabel: {
            id: "components.FilterOptions.FILTER_TYPES.$notNull",
            defaultMessage: "is not null"
          },
          value: "$notNull"
        }
      ];
  }
};
const FilterPopover = ({ displayedFilters: displayedFilters2, filters, onSubmit, onToggle, source }) => {
  const { formatMessage } = useIntl();
  const [modifiedData, setModifiedData] = useState({
    name: "createdAt",
    filter: "$eq",
    value: ""
  });
  const handleChangeFilterField = (value) => {
    const nextField = displayedFilters2.find((f) => f.name === value);
    const {
      fieldSchema: { type, options }
    } = nextField;
    let filterValue = "";
    if (type === "enumeration") {
      filterValue = options[0].value;
    }
    const filter = getFilterList(nextField)[0].value;
    setModifiedData({ name: value, filter, value: filterValue });
  };
  const handleChangeOperator = (operator) => {
    if (modifiedData.name === "mime") {
      setModifiedData((prev) => ({ ...prev, filter: operator, value: "image" }));
    } else {
      setModifiedData((prev) => ({ ...prev, filter: operator, value: "" }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (modifiedData.value) {
      if (modifiedData.name === "mime") {
        const alreadyAppliedFilters = filters.filter((filter) => {
          return Object.keys(filter)[0] === "mime";
        });
        if (modifiedData.value === "file") {
          const filtersWithoutMimeType = filters.filter((filter) => {
            return Object.keys(filter)[0] !== "mime";
          });
          let hasCurrentFilter = false;
          let filterToAdd2;
          if (modifiedData.filter === "$contains") {
            hasCurrentFilter = alreadyAppliedFilters.find((filter) => {
              return filter.mime?.$not?.$contains !== void 0;
            }) !== void 0;
            filterToAdd2 = {
              mime: {
                $not: {
                  $contains: ["image", "video"]
                }
              }
            };
          } else {
            hasCurrentFilter = alreadyAppliedFilters.find((filter) => {
              return Array.isArray(filter.mime?.$contains);
            }) !== void 0;
            filterToAdd2 = {
              mime: {
                $contains: ["image", "video"]
              }
            };
          }
          if (hasCurrentFilter) {
            onToggle();
            return;
          }
          const nextFilters = [...filtersWithoutMimeType, filterToAdd2];
          onSubmit(nextFilters);
          onToggle();
          return;
        }
        const hasFilter2 = alreadyAppliedFilters.find((filter) => {
          return filter.mime[modifiedData.filter] === modifiedData.value;
        }) !== void 0;
        if (hasFilter2) {
          onToggle();
          return;
        }
        const filtersWithoutFile = filters.filter((filter) => {
          const filterType = Object.keys(filter)[0];
          if (filterType !== "mime") {
            return true;
          }
          if (filter.mime?.$not?.$contains !== void 0) {
            return false;
          }
          if (Array.isArray(filter?.mime?.$contains)) {
            return false;
          }
          return true;
        });
        const oppositeFilter = modifiedData.filter === "$contains" ? "$notContains" : "$contains";
        const oppositeFilterIndex = filtersWithoutFile.findIndex((filter) => {
          return filter.mime?.[oppositeFilter] === modifiedData.value;
        });
        const hasOppositeFilter = oppositeFilterIndex !== -1;
        let filterToAdd = { [modifiedData.name]: { [modifiedData.filter]: modifiedData.value } };
        if (!hasOppositeFilter) {
          const nextFilters = [...filtersWithoutFile, filterToAdd];
          onSubmit(nextFilters);
          onToggle();
          return;
        }
        if (hasOppositeFilter) {
          const nextFilters = filtersWithoutFile.slice();
          nextFilters.splice(oppositeFilterIndex, 1, filterToAdd);
          onSubmit(nextFilters);
          onToggle();
        }
        return;
      }
      const hasFilter = filters.find((filter) => {
        return filter[modifiedData.name] && filter[modifiedData.name]?.[modifiedData.filter] === modifiedData.value;
      }) !== void 0;
      if (!hasFilter) {
        let filterToAdd = { [modifiedData.name]: { [modifiedData.filter]: modifiedData.value } };
        const nextFilters = [...filters, filterToAdd];
        onSubmit(nextFilters);
      }
    }
    onToggle();
  };
  const appliedFilter = displayedFilters2.find((filter) => filter.name === modifiedData.name);
  return /* @__PURE__ */ jsx(Popover, { onDismiss: onToggle, source, padding: 3, spacing: 4, children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, style: { minWidth: 184 }, children: [
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
      Select,
      {
        "aria-label": formatMessage({
          id: "app.utils.select-field",
          defaultMessage: "Select field"
        }),
        name: "name",
        size: "M",
        onChange: handleChangeFilterField,
        value: modifiedData.name,
        children: displayedFilters2.map((filter) => {
          return /* @__PURE__ */ jsx(Option$1, { value: filter.name, children: filter.metadatas.label }, filter.name);
        })
      }
    ) }),
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
      Select,
      {
        "aria-label": formatMessage({
          id: "app.utils.select-filter",
          defaultMessage: "Select filter"
        }),
        name: "filter",
        size: "M",
        value: modifiedData.filter,
        onChange: handleChangeOperator,
        children: getFilterList(appliedFilter).map((option) => {
          return /* @__PURE__ */ jsx(Option$1, { value: option.value, children: formatMessage(option.intlLabel) }, option.value);
        })
      }
    ) }),
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
      FilterValueInput,
      {
        ...appliedFilter.metadatas,
        ...appliedFilter.fieldSchema,
        value: modifiedData.value,
        onChange: (value) => setModifiedData((prev) => ({ ...prev, value }))
      }
    ) }),
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Button, { size: "L", variant: "secondary", startIcon: /* @__PURE__ */ jsx(Plus, {}), type: "submit", fullWidth: true, children: formatMessage({ id: "app.utils.add-filter", defaultMessage: "Add filter" }) }) })
  ] }) }) });
};
FilterPopover.propTypes = {
  displayedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({ type: PropTypes.string })
    })
  ).isRequired,
  filters: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  source: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired
};
const Filters = ({ appliedFilters, onChangeFilters }) => {
  const buttonRef = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const { formatMessage } = useIntl();
  const toggleFilter = () => setVisible((prev) => !prev);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "tertiary",
        ref: buttonRef,
        startIcon: /* @__PURE__ */ jsx(Filter, {}),
        onClick: toggleFilter,
        size: "S",
        children: formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" })
      }
    ),
    isVisible && /* @__PURE__ */ jsx(
      FilterPopover,
      {
        displayedFilters,
        filters: appliedFilters,
        onSubmit: onChangeFilters,
        onToggle: toggleFilter,
        source: buttonRef
      }
    ),
    appliedFilters && /* @__PURE__ */ jsx(
      FilterList,
      {
        appliedFilters,
        filtersSchema: displayedFilters,
        onRemoveFilter: onChangeFilters
      }
    )
  ] });
};
Filters.propTypes = {
  appliedFilters: PropTypes.array.isRequired,
  onChangeFilters: PropTypes.func.isRequired
};
const PageSize = ({ onChangePageSize, pageSize }) => {
  const { formatMessage } = useIntl();
  const handleChange = (value) => {
    onChangePageSize(value);
  };
  return /* @__PURE__ */ jsxs(Flex, { children: [
    /* @__PURE__ */ jsxs(
      Select,
      {
        size: "S",
        "aria-label": formatMessage({
          id: "components.PageFooter.select",
          defaultMessage: "Entries per page"
        }),
        onChange: handleChange,
        value: pageSize.toString(),
        children: [
          /* @__PURE__ */ jsx(Option$1, { value: "10", children: "10" }),
          /* @__PURE__ */ jsx(Option$1, { value: "20", children: "20" }),
          /* @__PURE__ */ jsx(Option$1, { value: "50", children: "50" }),
          /* @__PURE__ */ jsx(Option$1, { value: "100", children: "100" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Box, { paddingLeft: 2, children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", as: "label", htmlFor: "page-size", children: formatMessage({
      id: "components.PageFooter.select",
      defaultMessage: "Entries per page"
    }) }) })
  ] });
};
PageSize.propTypes = {
  onChangePageSize: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired
};
const PaginationContext = createContext({ activePage: 1, pageCount: 1 });
const usePagination = () => useContext(PaginationContext);
const PaginationText = styled(Typography)`
  line-height: revert;
`;
const LinkWrapper = styled.button`
  padding: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ active, theme }) => active ? theme.shadows.filterShadow : void 0};
  text-decoration: none;
  display: flex;

  ${buttonFocusStyle}
`;
LinkWrapper.defaultProps = { type: "button" };
const PageLinkWrapper = styled(LinkWrapper)`
  color: ${({ theme, active }) => active ? theme.colors.primary700 : theme.colors.neutral800};
  background: ${({ theme, active }) => active ? theme.colors.neutral0 : void 0};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  }
`;
const ActionLinkWrapper = styled(LinkWrapper)`
  font-size: 0.7rem;
  svg path {
    fill: ${(p) => p["aria-disabled"] ? p.theme.colors.neutral300 : p.theme.colors.neutral600};
  }

  &:focus,
  &:hover {
    svg path {
      fill: ${(p) => p["aria-disabled"] ? p.theme.colors.neutral300 : p.theme.colors.neutral700};
    }
  }

  ${(p) => p["aria-disabled"] ? `
  pointer-events: none;
    ` : void 0}
`;
const DotsWrapper = styled(LinkWrapper)`
  color: ${({ theme }) => theme.colors.neutral800};
`;
const PreviousLink = ({ children, ...props }) => {
  const { activePage } = usePagination();
  const disabled = activePage === 1;
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(ActionLinkWrapper, { "aria-disabled": disabled, tabIndex: disabled ? -1 : void 0, ...props, children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { children }),
    /* @__PURE__ */ jsx(ChevronLeft, { "aria-hidden": true })
  ] }) });
};
const NextLink = ({ children, ...props }) => {
  const { activePage, pageCount } = usePagination();
  const disabled = activePage === pageCount;
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(ActionLinkWrapper, { "aria-disabled": disabled, tabIndex: disabled ? -1 : void 0, ...props, children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { children }),
    /* @__PURE__ */ jsx(ChevronRight, { "aria-hidden": true })
  ] }) });
};
const PageLink = ({ number, children, ...props }) => {
  const { activePage } = usePagination();
  const isActive = activePage === number;
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(PageLinkWrapper, { ...props, active: isActive, children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { children }),
    /* @__PURE__ */ jsx(PaginationText, { "aria-hidden": true, variant: "pi", fontWeight: isActive ? "bold" : "", children: number })
  ] }) });
};
const Dots = ({ children, ...props }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(DotsWrapper, { ...props, as: "div", children: [
  /* @__PURE__ */ jsx(VisuallyHidden, { children }),
  /* @__PURE__ */ jsx(PaginationText, { "aria-hidden": true, small: true, children: "…" })
] }) });
PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  number: PropTypes.number.isRequired
};
const sharedPropTypes = {
  children: PropTypes.node.isRequired
};
NextLink.propTypes = sharedPropTypes;
PreviousLink.propTypes = sharedPropTypes;
Dots.propTypes = {
  children: PropTypes.node.isRequired
};
const Pagination = ({ children, label, activePage, pageCount }) => {
  const paginationValue = useMemo(() => ({ activePage, pageCount }), [activePage, pageCount]);
  return /* @__PURE__ */ jsx(PaginationContext.Provider, { value: paginationValue, children: /* @__PURE__ */ jsx(Box, { as: "nav", "aria-label": label, children: /* @__PURE__ */ jsx(Flex, { as: "ul", gap: 1, children }) }) });
};
Pagination.defaultProps = {
  label: "pagination"
};
Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  pageCount: PropTypes.number.isRequired
};
const PaginationFooter = ({ activePage, onChangePage, pagination: { pageCount } }) => {
  const { formatMessage } = useIntl();
  const previousActivePage = activePage - 1;
  const nextActivePage = activePage + 1;
  const firstLinks = [
    /* @__PURE__ */ jsx(
      PageLink,
      {
        number: 1,
        onClick: () => {
          onChangePage(1);
        },
        children: formatMessage(
          { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
          { page: 1 }
        )
      },
      1
    )
  ];
  if (pageCount <= 4) {
    const links = Array.from({ length: pageCount }).map((_, i) => i + 1).map((number) => {
      return /* @__PURE__ */ jsx(PageLink, { number, onClick: () => onChangePage(number), children: formatMessage(
        { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
        { page: number }
      ) }, number);
    });
    return /* @__PURE__ */ jsxs(Pagination, { activePage, pageCount, children: [
      /* @__PURE__ */ jsx(PreviousLink, { onClick: () => onChangePage(previousActivePage), children: formatMessage({
        id: "components.pagination.go-to-previous",
        defaultMessage: "Go to previous page"
      }) }),
      links,
      /* @__PURE__ */ jsx(NextLink, { onClick: () => onChangePage(nextActivePage), children: formatMessage({
        id: "components.pagination.go-to-next",
        defaultMessage: "Go to next page"
      }) })
    ] });
  }
  let firstLinksToCreate = [];
  let lastLinks = [];
  let lastLinksToCreate = [];
  const middleLinks = [];
  if (pageCount > 1) {
    lastLinks.push(
      /* @__PURE__ */ jsx(PageLink, { number: pageCount, onClick: () => onChangePage(pageCount), children: formatMessage(
        { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
        { page: pageCount }
      ) }, pageCount)
    );
  }
  if (activePage === 1 && pageCount >= 3) {
    firstLinksToCreate = [2];
  }
  if (activePage === 2 && pageCount >= 3) {
    if (pageCount === 5) {
      firstLinksToCreate = [2, 3, 4];
    } else if (pageCount === 3) {
      firstLinksToCreate = [2];
    } else {
      firstLinksToCreate = [2, 3];
    }
  }
  if (activePage === 4 && pageCount >= 3) {
    firstLinksToCreate = [2];
  }
  if (activePage === pageCount && pageCount >= 3) {
    lastLinksToCreate = [pageCount - 1];
  }
  if (activePage === pageCount - 2 && pageCount > 3) {
    lastLinksToCreate = [activePage + 1, activePage, activePage - 1];
  }
  if (activePage === pageCount - 3 && pageCount > 3 && activePage > 5) {
    lastLinksToCreate = [activePage + 2, activePage + 1, activePage, activePage - 1];
  }
  if (activePage === pageCount - 1 && pageCount > 3) {
    lastLinksToCreate = [activePage, activePage - 1];
  }
  lastLinksToCreate.forEach((number) => {
    lastLinks.unshift(
      /* @__PURE__ */ jsxs(PageLink, { number, onClick: () => onChangePage(number), children: [
        "Go to page ",
        number
      ] }, number)
    );
  });
  firstLinksToCreate.forEach((number) => {
    firstLinks.push(
      /* @__PURE__ */ jsx(PageLink, { number, onClick: () => onChangePage(number), children: formatMessage(
        { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
        { page: number }
      ) }, number)
    );
  });
  if (![1, 2].includes(activePage) && activePage <= pageCount - 3 && firstLinks.length + lastLinks.length < 6) {
    const middleLinksToCreate = [activePage - 1, activePage, activePage + 1];
    middleLinksToCreate.forEach((number) => {
      middleLinks.push(
        /* @__PURE__ */ jsx(PageLink, { number, onClick: () => onChangePage(number), children: formatMessage(
          { id: "components.pagination.go-to", defaultMessage: "Go to page {page}" },
          { page: number }
        ) }, number)
      );
    });
  }
  const shouldShowDotsAfterFirstLink = pageCount > 5 || pageCount === 5 && (activePage === 1 || activePage === 5);
  const shouldShowMiddleDots = middleLinks.length > 2 && activePage > 4 && pageCount > 5;
  const beforeDotsLinksLength = shouldShowMiddleDots ? pageCount - activePage - 1 : pageCount - firstLinks.length - lastLinks.length;
  const afterDotsLength = shouldShowMiddleDots ? pageCount - firstLinks.length - lastLinks.length : pageCount - activePage - 1;
  return /* @__PURE__ */ jsxs(Pagination, { activePage, pageCount, children: [
    /* @__PURE__ */ jsx(PreviousLink, { onClick: () => onChangePage(previousActivePage), children: formatMessage({
      id: "components.pagination.go-to-previous",
      defaultMessage: "Go to previous page"
    }) }),
    firstLinks,
    shouldShowMiddleDots && /* @__PURE__ */ jsx(Dots, { children: formatMessage(
      {
        id: "components.pagination.remaining-links",
        defaultMessage: "And {number} other links"
      },
      { number: beforeDotsLinksLength }
    ) }),
    middleLinks,
    shouldShowDotsAfterFirstLink && /* @__PURE__ */ jsx(Dots, { children: formatMessage(
      {
        id: "components.pagination.remaining-links",
        defaultMessage: "And {number} other links"
      },
      { number: afterDotsLength }
    ) }),
    lastLinks,
    /* @__PURE__ */ jsx(NextLink, { onClick: () => onChangePage(nextActivePage), children: formatMessage({
      id: "components.pagination.go-to-next",
      defaultMessage: "Go to next page"
    }) })
  ] });
};
PaginationFooter.propTypes = {
  activePage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pagination: PropTypes.shape({ pageCount: PropTypes.number.isRequired }).isRequired
};
const SearchAsset = ({ onChangeSearch, queryValue }) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const [isOpen, setIsOpen] = useState(!!queryValue);
  const [value, setValue] = useState(queryValue || "");
  const wrapperRef = useRef(null);
  useLayoutEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        wrapperRef.current.querySelector("input").focus();
      }, 0);
    }
  }, [isOpen]);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClear = () => {
    handleToggle();
    onChangeSearch(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    trackUsage("didSearchMediaLibraryElements", { location: "content-manager" });
    onChangeSearch(value);
  };
  if (isOpen) {
    return /* @__PURE__ */ jsx("div", { ref: wrapperRef, children: /* @__PURE__ */ jsx(SearchForm, { onSubmit: handleSubmit, children: /* @__PURE__ */ jsx(
      Searchbar,
      {
        name: "search",
        onClear: handleClear,
        onChange: (e) => setValue(e.target.value),
        clearLabel: formatMessage({
          id: getTrad("search.clear.label"),
          defaultMessage: "Clear the search"
        }),
        size: "S",
        value,
        placeholder: formatMessage({
          id: getTrad("search.placeholder"),
          defaultMessage: "e.g: the first dog on the moon"
        }),
        children: formatMessage({ id: getTrad("search.label"), defaultMessage: "Search for an asset" })
      }
    ) }) });
  }
  return /* @__PURE__ */ jsx(IconButton, { icon: /* @__PURE__ */ jsx(Search, {}), label: "Search", onClick: handleToggle });
};
SearchAsset.defaultProps = {
  queryValue: null
};
SearchAsset.propTypes = {
  onChangeSearch: PropTypes.func.isRequired,
  queryValue: PropTypes.string
};
const isSelectable = (allowedTypes, mime = "") => {
  if (!mime)
    return false;
  const fileType = mime.split("/")[0];
  return allowedTypes.includes(fileType) || allowedTypes.includes("file") && !["video", "image", "audio"].includes(fileType);
};
const TypographyMaxWidth = styled(Typography)`
  max-width: 100%;
`;
const ActionContainer = styled(Box)`
  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const BrowseStep = ({
  allowedTypes,
  assets: rawAssets,
  canCreate,
  canRead,
  folders,
  multiple,
  onAddAsset,
  onChangeFilters,
  onChangePage,
  onChangePageSize,
  onChangeSearch,
  onChangeSort,
  onChangeFolder,
  onEditAsset,
  onEditFolder,
  onSelectAllAsset,
  onSelectAsset,
  pagination,
  queryObject,
  selectedAssets
}) => {
  const { formatMessage } = useIntl();
  const [view, setView] = usePersistentState(localStorageKeys.modalView, viewOptions.GRID);
  const isGridView = view === viewOptions.GRID;
  const { data: currentFolder, isLoading: isCurrentFolderLoading } = useFolder(
    queryObject?.folder,
    {
      enabled: canRead && !!queryObject?.folder
    }
  );
  const singularTypes = toSingularTypes(allowedTypes);
  const assets = rawAssets.map((asset) => ({
    ...asset,
    isSelectable: isSelectable(singularTypes, asset?.mime),
    type: "asset"
  }));
  const breadcrumbs = !isCurrentFolderLoading && getBreadcrumbDataML(currentFolder);
  const allAllowedAsset = getAllowedFiles(allowedTypes, assets);
  const areAllAssetSelected = allAllowedAsset.length > 0 && selectedAssets.length > 0 && allAllowedAsset.every(
    (asset) => selectedAssets.findIndex((currAsset) => currAsset.id === asset.id) !== -1
  );
  const hasSomeAssetSelected = allAllowedAsset.some(
    (asset) => selectedAssets.findIndex((currAsset) => currAsset.id === asset.id) !== -1
  );
  const isSearching = !!queryObject?._q;
  const isFiltering = queryObject?.filters?.$and?.length > 0;
  const isSearchingOrFiltering = isSearching || isFiltering;
  const assetCount = assets.length;
  const folderCount = folders.length;
  const handleClickFolderCard = (...args) => {
    onChangeSearch("");
    onChangeFolder(...args);
  };
  return /* @__PURE__ */ jsxs(Box, { children: [
    onSelectAllAsset && /* @__PURE__ */ jsx(Box, { paddingBottom: 4, children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "flex-start", children: [
      (assetCount > 0 || folderCount > 0 || isFiltering) && /* @__PURE__ */ jsxs(Flex, { gap: 2, wrap: "wrap", children: [
        multiple && isGridView && /* @__PURE__ */ jsx(
          Flex,
          {
            paddingLeft: 2,
            paddingRight: 2,
            background: "neutral0",
            hasRadius: true,
            borderColor: "neutral200",
            height: `${32 / 16}rem`,
            children: /* @__PURE__ */ jsx(
              BaseCheckbox,
              {
                "aria-label": formatMessage({
                  id: getTrad("bulk.select.label"),
                  defaultMessage: "Select all assets"
                }),
                indeterminate: !areAllAssetSelected && hasSomeAssetSelected,
                value: areAllAssetSelected,
                onChange: onSelectAllAsset
              }
            )
          }
        ),
        isGridView && /* @__PURE__ */ jsx(SortPicker, { onChangeSort, value: queryObject?.sort }),
        /* @__PURE__ */ jsx(
          Filters,
          {
            appliedFilters: queryObject?.filters?.$and,
            onChangeFilters
          }
        )
      ] }),
      (assetCount > 0 || folderCount > 0 || isSearching) && /* @__PURE__ */ jsxs(Flex, { marginLeft: "auto", shrink: 0, children: [
        /* @__PURE__ */ jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsx(
          IconButton,
          {
            icon: isGridView ? /* @__PURE__ */ jsx(List, {}) : /* @__PURE__ */ jsx(Grid$1, {}),
            label: isGridView ? formatMessage({
              id: "view-switch.list",
              defaultMessage: "List View"
            }) : formatMessage({
              id: "view-switch.grid",
              defaultMessage: "Grid View"
            }),
            onClick: () => setView(isGridView ? viewOptions.LIST : viewOptions.GRID)
          }
        ) }),
        /* @__PURE__ */ jsx(SearchAsset, { onChangeSearch, queryValue: queryObject._q || "" })
      ] })
    ] }) }),
    canRead && breadcrumbs?.length > 0 && currentFolder && /* @__PURE__ */ jsx(Box, { paddingTop: 3, children: /* @__PURE__ */ jsx(
      Breadcrumbs,
      {
        onChangeFolder,
        as: "nav",
        label: formatMessage({
          id: getTrad("header.breadcrumbs.nav.label"),
          defaultMessage: "Folders navigation"
        }),
        breadcrumbs,
        currentFolderId: queryObject?.folder
      }
    ) }),
    assetCount === 0 && folderCount === 0 && /* @__PURE__ */ jsx(Box, { paddingBottom: 6, children: /* @__PURE__ */ jsx(
      EmptyAssets,
      {
        size: "S",
        count: 6,
        action: canCreate && !isFiltering && !isSearching && /* @__PURE__ */ jsx(Button, { variant: "secondary", startIcon: /* @__PURE__ */ jsx(Plus, {}), onClick: onAddAsset, children: formatMessage({
          id: getTrad("header.actions.add-assets"),
          defaultMessage: "Add new assets"
        }) }),
        content: (
          // eslint-disable-next-line no-nested-ternary
          isSearchingOrFiltering ? formatMessage({
            id: getTrad("list.assets-empty.title-withSearch"),
            defaultMessage: "There are no assets with the applied filters"
          }) : canCreate && !isSearching ? formatMessage({
            id: getTrad("list.assets.empty"),
            defaultMessage: "Upload your first assets..."
          }) : formatMessage({
            id: getTrad("list.assets.empty.no-permissions"),
            defaultMessage: "The asset list is empty"
          })
        )
      }
    ) }),
    !isGridView && (folderCount > 0 || assetCount > 0) && /* @__PURE__ */ jsx(
      TableList,
      {
        allowedTypes,
        assetCount,
        folderCount,
        indeterminate: !areAllAssetSelected && hasSomeAssetSelected,
        isFolderSelectionAllowed: false,
        onChangeSort,
        onChangeFolder: handleClickFolderCard,
        onEditAsset,
        onEditFolder,
        onSelectOne: onSelectAsset,
        onSelectAll: onSelectAllAsset,
        rows: [...folders.map((folder) => ({ ...folder, type: "folder" })), ...assets],
        selected: selectedAssets,
        shouldDisableBulkSelect: !multiple,
        sortQuery: queryObject?.sort ?? ""
      }
    ),
    isGridView && /* @__PURE__ */ jsxs(Fragment, { children: [
      folderCount > 0 && /* @__PURE__ */ jsx(
        FolderGridList,
        {
          title: (isSearchingOrFiltering && assetCount > 0 || !isSearchingOrFiltering) && formatMessage(
            {
              id: getTrad("list.folders.title"),
              defaultMessage: "Folders ({count})"
            },
            { count: folderCount }
          ) || "",
          children: folders.map((folder) => {
            return /* @__PURE__ */ jsx(GridItem, { col: 3, children: /* @__PURE__ */ jsx(
              FolderCard,
              {
                ariaLabel: folder.name,
                id: `folder-${folder.id}`,
                onClick: () => handleClickFolderCard(folder.id, folder.path),
                cardActions: onEditFolder && /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    icon: /* @__PURE__ */ jsx(Pencil, {}),
                    "aria-label": formatMessage({
                      id: getTrad("list.folder.edit"),
                      defaultMessage: "Edit folder"
                    }),
                    onClick: () => onEditFolder(folder)
                  }
                ),
                children: /* @__PURE__ */ jsx(FolderCardBody, { children: /* @__PURE__ */ jsx(
                  FolderCardBodyAction,
                  {
                    onClick: () => handleClickFolderCard(folder.id, folder.path),
                    children: /* @__PURE__ */ jsxs(Flex, { as: "h2", direction: "column", alignItems: "start", maxWidth: "100%", children: [
                      /* @__PURE__ */ jsxs(TypographyMaxWidth, { fontWeight: "semiBold", ellipsis: true, children: [
                        folder.name,
                        /* @__PURE__ */ jsx(VisuallyHidden, { children: "-" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        TypographyMaxWidth,
                        {
                          as: "span",
                          textColor: "neutral600",
                          variant: "pi",
                          ellipsis: true,
                          children: formatMessage(
                            {
                              id: getTrad("list.folder.subtitle"),
                              defaultMessage: "{folderCount, plural, =0 {# folder} one {# folder} other {# folders}}, {filesCount, plural, =0 {# asset} one {# asset} other {# assets}}"
                            },
                            {
                              folderCount: folder.children.count,
                              filesCount: folder.files.count
                            }
                          )
                        }
                      )
                    ] })
                  }
                ) })
              }
            ) }, `folder-${folder.id}`);
          })
        }
      ),
      assetCount > 0 && folderCount > 0 && /* @__PURE__ */ jsx(Box, { paddingTop: 6, children: /* @__PURE__ */ jsx(Divider, {}) }),
      assetCount > 0 && /* @__PURE__ */ jsx(Box, { paddingTop: 6, children: /* @__PURE__ */ jsx(
        AssetGridList,
        {
          allowedTypes,
          size: "S",
          assets,
          onSelectAsset,
          selectedAssets,
          onEditAsset,
          title: (!isSearchingOrFiltering || isSearchingOrFiltering && folderCount > 0) && queryObject.page === 1 && formatMessage(
            {
              id: getTrad("list.assets.title"),
              defaultMessage: "Assets ({count})"
            },
            { count: assetCount }
          ) || ""
        }
      ) })
    ] }),
    pagination.pageCount > 0 && /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", paddingTop: 4, children: [
      /* @__PURE__ */ jsx(PageSize, { pageSize: queryObject.pageSize, onChangePageSize }),
      /* @__PURE__ */ jsx(
        PaginationFooter,
        {
          activePage: queryObject.page,
          onChangePage,
          pagination
        }
      )
    ] })
  ] });
};
BrowseStep.defaultProps = {
  allowedTypes: [],
  folders: [],
  multiple: false,
  onSelectAllAsset: void 0
};
BrowseStep.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  assets: PropTypes.arrayOf(AssetDefinition).isRequired,
  canCreate: PropTypes.bool.isRequired,
  canRead: PropTypes.bool.isRequired,
  folders: PropTypes.arrayOf(FolderDefinition),
  multiple: PropTypes.bool,
  onAddAsset: PropTypes.func.isRequired,
  onChangeFilters: PropTypes.func.isRequired,
  onChangeFolder: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangePageSize: PropTypes.func.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func.isRequired,
  onEditAsset: PropTypes.func.isRequired,
  onEditFolder: PropTypes.func.isRequired,
  onSelectAsset: PropTypes.func.isRequired,
  onSelectAllAsset: PropTypes.func,
  queryObject: PropTypes.shape({
    filters: PropTypes.object,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    _q: PropTypes.string,
    sort: PropTypes.string,
    folder: PropTypes.number
  }).isRequired,
  pagination: PropTypes.shape({ pageCount: PropTypes.number.isRequired }).isRequired,
  selectedAssets: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
const DialogFooter = ({ onClose, onValidate }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    ModalFooter,
    {
      startActions: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
      endActions: onValidate && /* @__PURE__ */ jsx(Button, { onClick: onValidate, children: formatMessage({ id: "global.finish", defaultMessage: "Finish" }) })
    }
  );
};
DialogFooter.defaultProps = {
  onValidate: void 0
};
DialogFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onValidate: PropTypes.func
};
const SelectedStep = ({ selectedAssets, onSelectAsset, onReorderAsset }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
    /* @__PURE__ */ jsxs(Flex, { gap: 0, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: formatMessage(
        {
          id: getTrad("list.assets.to-upload"),
          defaultMessage: "{number, plural, =0 {No asset} one {1 asset} other {# assets}} ready to upload"
        },
        { number: selectedAssets.length }
      ) }),
      /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
        id: getTrad("modal.upload-list.sub-header-subtitle"),
        defaultMessage: "Manage the assets before adding them to the Media Library"
      }) })
    ] }),
    /* @__PURE__ */ jsx(
      AssetGridList,
      {
        size: "S",
        assets: selectedAssets,
        onSelectAsset,
        selectedAssets,
        onReorderAsset
      }
    )
  ] });
};
SelectedStep.defaultProps = {
  onReorderAsset: void 0
};
SelectedStep.propTypes = {
  onSelectAsset: PropTypes.func.isRequired,
  selectedAssets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onReorderAsset: PropTypes.func
};
const LoadingBody = styled(Flex)`
  /* 80px are coming from the Tabs component that is not included in the ModalBody */
  min-height: ${() => `calc(60vh + ${pxToRem(80)})`};
`;
const AssetDialog = ({
  allowedTypes,
  folderId,
  onClose,
  onAddAsset,
  onAddFolder,
  onChangeFolder,
  onValidate,
  multiple,
  initiallySelectedAssets,
  trackedLocation
}) => {
  const [assetToEdit, setAssetToEdit] = useState(void 0);
  const [folderToEdit, setFolderToEdit] = useState(void 0);
  const { formatMessage } = useIntl();
  const {
    canRead,
    canCreate,
    isLoading: isLoadingPermissions,
    canUpdate,
    canCopyLink,
    canDownload
  } = useMediaLibraryPermissions();
  const [
    { queryObject },
    {
      onChangeFilters,
      onChangePage,
      onChangePageSize,
      onChangeSort,
      onChangeSearch,
      onChangeFolder: onChangeFolderParam
    }
  ] = useModalQueryParams({ folder: folderId });
  const {
    data: { pagination, results: assets } = {},
    isLoading: isLoadingAssets,
    error: errorAssets
  } = useAssets({ skipWhen: !canRead, query: queryObject });
  const {
    data: folders,
    isLoading: isLoadingFolders,
    error: errorFolders
  } = useFolders({
    enabled: canRead && !containsAssetFilter(queryObject) && pagination?.page === 1,
    query: queryObject
  });
  const [
    selectedAssets,
    { selectOne, selectOnly, setSelections, selectMultiple, deselectMultiple }
  ] = useSelectionState(["id"], initiallySelectedAssets);
  const [initialSelectedTabIndex, setInitialSelectedTabIndex] = useState(
    selectedAssets.length > 0 ? 1 : 0
  );
  const handleSelectAllAssets = () => {
    const allowedAssets = getAllowedFiles(allowedTypes, assets);
    if (!multiple) {
      return void 0;
    }
    const alreadySelected = allowedAssets.filter(
      (asset) => selectedAssets.findIndex((selectedAsset) => selectedAsset.id === asset.id) !== -1
    );
    if (alreadySelected.length > 0) {
      deselectMultiple(alreadySelected);
    } else {
      selectMultiple(allowedAssets);
    }
  };
  const handleSelectAsset = (asset) => {
    return multiple ? selectOne(asset) : selectOnly(asset);
  };
  const isLoading = isLoadingPermissions || isLoadingAssets || isLoadingFolders;
  const hasError = errorAssets || errorFolders;
  if (isLoading) {
    return /* @__PURE__ */ jsxs(ModalLayout, { onClose, labelledBy: "asset-dialog-title", "aria-busy": true, children: [
      /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }) }),
      /* @__PURE__ */ jsx(LoadingBody, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({
        id: getTrad("content.isLoading"),
        defaultMessage: "Content is loading."
      }) }) }),
      /* @__PURE__ */ jsx(DialogFooter, { onClose })
    ] });
  }
  if (hasError) {
    return /* @__PURE__ */ jsxs(ModalLayout, { onClose, labelledBy: "asset-dialog-title", children: [
      /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }) }),
      /* @__PURE__ */ jsx(AnErrorOccurred, {}),
      /* @__PURE__ */ jsx(DialogFooter, { onClose })
    ] });
  }
  if (!canRead) {
    return /* @__PURE__ */ jsxs(ModalLayout, { onClose, labelledBy: "asset-dialog-title", children: [
      /* @__PURE__ */ jsx(ModalHeader, { fontWeight: "bold", children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }) }),
      /* @__PURE__ */ jsx(NoPermissions, {}),
      /* @__PURE__ */ jsx(DialogFooter, { onClose })
    ] });
  }
  if (assetToEdit) {
    return /* @__PURE__ */ jsx(
      EditAssetDialog,
      {
        onClose: () => setAssetToEdit(void 0),
        asset: assetToEdit,
        canUpdate,
        canCopyLink,
        canDownload,
        trackedLocation
      }
    );
  }
  if (folderToEdit) {
    return /* @__PURE__ */ jsx(
      EditFolderDialog,
      {
        folder: folderToEdit,
        onClose: () => setFolderToEdit(void 0),
        location: "content-manager",
        parentFolderId: queryObject?.folder
      }
    );
  }
  const handleMoveItem = (hoverIndex, destIndex) => {
    const offset = destIndex - hoverIndex;
    const orderedAssetsClone = selectedAssets.slice();
    const nextAssets = moveElement(orderedAssetsClone, hoverIndex, offset);
    setSelections(nextAssets);
  };
  const handleFolderChange = (folderId2, folderPath) => {
    onChangeFolder(folderId2);
    onChangeFolderParam(folderId2, folderPath);
  };
  return /* @__PURE__ */ jsxs(ModalLayout, { onClose, labelledBy: "asset-dialog-title", "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: formatMessage({
      id: getTrad("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    }) }) }),
    /* @__PURE__ */ jsxs(
      TabGroup,
      {
        label: formatMessage({
          id: getTrad("tabs.title"),
          defaultMessage: "How do you want to upload your assets?"
        }),
        variant: "simple",
        initialSelectedTabIndex,
        onTabChange: () => setInitialSelectedTabIndex(0),
        children: [
          /* @__PURE__ */ jsxs(Flex, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, justifyContent: "space-between", children: [
            /* @__PURE__ */ jsxs(Tabs, { children: [
              /* @__PURE__ */ jsx(Tab, { children: formatMessage({
                id: getTrad("modal.nav.browse"),
                defaultMessage: "Browse"
              }) }),
              /* @__PURE__ */ jsxs(Tab, { children: [
                formatMessage({
                  id: getTrad("modal.header.select-files"),
                  defaultMessage: "Selected files"
                }),
                /* @__PURE__ */ jsx(Badge, { marginLeft: 2, children: selectedAssets.length })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "secondary",
                  onClick: () => onAddFolder({ folderId: queryObject?.folder }),
                  children: formatMessage({
                    id: getTrad("modal.upload-list.sub-header.add-folder"),
                    defaultMessage: "Add folder"
                  })
                }
              ),
              /* @__PURE__ */ jsx(Button, { onClick: () => onAddAsset({ folderId: queryObject?.folder }), children: formatMessage({
                id: getTrad("modal.upload-list.sub-header.button"),
                defaultMessage: "Add more assets"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsxs(TabPanels, { children: [
            /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(
              BrowseStep,
              {
                allowedTypes,
                assets,
                canCreate,
                canRead,
                folders,
                onSelectAsset: handleSelectAsset,
                selectedAssets,
                multiple,
                onSelectAllAsset: handleSelectAllAssets,
                onEditAsset: setAssetToEdit,
                onEditFolder: setFolderToEdit,
                pagination,
                queryObject,
                onAddAsset,
                onChangeFilters,
                onChangeFolder: handleFolderChange,
                onChangePage,
                onChangePageSize,
                onChangeSort,
                onChangeSearch
              }
            ) }) }),
            /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(
              SelectedStep,
              {
                selectedAssets,
                onSelectAsset: handleSelectAsset,
                onReorderAsset: handleMoveItem
              }
            ) }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(DialogFooter, { onClose, onValidate: () => onValidate(selectedAssets) })
  ] });
};
AssetDialog.defaultProps = {
  allowedTypes: [],
  folderId: null,
  initiallySelectedAssets: [],
  multiple: false,
  trackedLocation: void 0
};
AssetDialog.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  folderId: PropTypes.number,
  initiallySelectedAssets: PropTypes.arrayOf(AssetDefinition),
  multiple: PropTypes.bool,
  onAddAsset: PropTypes.func.isRequired,
  onAddFolder: PropTypes.func.isRequired,
  onChangeFolder: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
const typeFromMime = (mime) => {
  if (mime.includes(AssetType.Image)) {
    return AssetType.Image;
  }
  if (mime.includes(AssetType.Video)) {
    return AssetType.Video;
  }
  if (mime.includes(AssetType.Audio)) {
    return AssetType.Audio;
  }
  return AssetType.Document;
};
const rawFileToAsset = (rawFile, assetSource) => {
  return {
    size: rawFile.size / 1e3,
    createdAt: new Date(rawFile.lastModified).toISOString(),
    name: rawFile.name,
    source: assetSource,
    type: typeFromMime(rawFile.type),
    url: URL.createObjectURL(rawFile),
    ext: rawFile.name.split(".").pop(),
    mime: rawFile.type,
    rawFile,
    isLocal: true
  };
};
const Wrapper = styled(Flex)`
  flex-direction: column;
`;
const IconWrapper = styled.div`
  font-size: ${60 / 16}rem;

  svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;
const MediaBox = styled(Box)`
  border-style: dashed;
`;
const OpaqueBox = styled(Box)`
  opacity: 0;
  cursor: pointer;
`;
const FromComputerForm = ({ onClose, onAddAssets, trackedLocation }) => {
  const { formatMessage } = useIntl();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const { trackUsage } = useTracking();
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const handleChange = () => {
    const files = inputRef.current.files;
    const assets = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const asset = rawFileToAsset(file, AssetSource.Computer);
      assets.push(asset);
    }
    if (trackedLocation) {
      trackUsage("didSelectFile", { source: "computer", location: trackedLocation });
    }
    onAddAssets(assets);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files) {
      const files = e.dataTransfer.files;
      const assets = [];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const asset = rawFileToAsset(file, AssetSource.Computer);
        assets.push(asset);
      }
      onAddAssets(assets);
    }
    setDragOver(false);
  };
  return /* @__PURE__ */ jsxs("form", { children: [
    /* @__PURE__ */ jsx(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsx("label", { children: /* @__PURE__ */ jsx(
      MediaBox,
      {
        paddingTop: 11,
        paddingBottom: 11,
        hasRadius: true,
        justifyContent: "center",
        borderColor: dragOver ? "primary500" : "neutral300",
        background: dragOver ? "primary100" : "neutral100",
        position: "relative",
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxs(Wrapper, { children: [
          /* @__PURE__ */ jsx(IconWrapper, { children: /* @__PURE__ */ jsx(PicturePlus, { "aria-hidden": true }) }),
          /* @__PURE__ */ jsx(Box, { paddingTop: 3, paddingBottom: 5, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", textColor: "neutral600", as: "span", children: formatMessage({
            id: getTrad("input.label"),
            defaultMessage: "Drag & Drop here or"
          }) }) }),
          /* @__PURE__ */ jsx(
            OpaqueBox,
            {
              as: "input",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              width: "100%",
              type: "file",
              multiple: true,
              name: "files",
              tabIndex: -1,
              ref: inputRef,
              zIndex: 1,
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsx(Box, { position: "relative", children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleClick, children: formatMessage({
            id: getTrad("input.button.label"),
            defaultMessage: "Browse files"
          }) }) })
        ] }) })
      }
    ) }) }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
          id: "app.components.Button.cancel",
          defaultMessage: "cancel"
        }) })
      }
    )
  ] });
};
FromComputerForm.defaultProps = {
  trackedLocation: void 0
};
FromComputerForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddAssets: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
function getFilenameFromURL(url) {
  return new URL(url).pathname.split("/").pop();
}
const urlsToAssets = async (urls) => {
  const assetPromises = urls.map(
    (url) => fetch(url).then(async (res) => {
      const blob = await res.blob();
      const loadedFile = new File([blob], getFilenameFromURL(res.url), {
        type: res.headers.get("content-type")
      });
      return {
        name: loadedFile.name,
        url: res.url,
        mime: res.headers.get("content-type"),
        rawFile: loadedFile
      };
    })
  );
  const assetsResults = await Promise.all(assetPromises);
  const assets = assetsResults.map((fullFilledAsset) => ({
    source: AssetSource.Url,
    name: fullFilledAsset.name,
    type: typeFromMime(fullFilledAsset.mime),
    url: fullFilledAsset.url,
    ext: fullFilledAsset.url.split(".").pop(),
    mime: fullFilledAsset.mime,
    rawFile: fullFilledAsset.rawFile
  }));
  return assets;
};
const urlSchema = yup.object().shape({
  urls: yup.string().test({
    name: "isUrlValid",
    message: "${path}",
    test(values = "") {
      const urls = values.split(/\r?\n/);
      if (urls.length === 0) {
        return this.createError({
          path: this.path,
          message: translatedErrors.min
        });
      }
      if (urls.length > 20) {
        return this.createError({
          path: this.path,
          message: translatedErrors.max
        });
      }
      const filtered = urls.filter((val) => {
        try {
          new URL(val);
          return false;
        } catch (err) {
          return true;
        }
      });
      const filteredLength = filtered.length;
      if (filteredLength === 0) {
        return true;
      }
      const errorMessage = filteredLength > 1 ? "form.upload-url.error.url.invalids" : "form.upload-url.error.url.invalid";
      return this.createError({
        path: this.path,
        message: getTrad(errorMessage),
        params: { number: filtered.length }
      });
    }
  })
});
const FromUrlForm = ({ onClose, onAddAsset, trackedLocation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(void 0);
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const handleSubmit = async ({ urls }) => {
    setLoading(true);
    const urlArray = urls.split(/\r?\n/);
    try {
      const assets = await urlsToAssets(urlArray);
      if (trackedLocation) {
        trackUsage("didSelectFile", { source: "url", location: trackedLocation });
      }
      onAddAsset(assets);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(
    Formik,
    {
      enableReinitialize: true,
      initialValues: {
        urls: ""
      },
      onSubmit: handleSubmit,
      validationSchema: urlSchema,
      validateOnChange: false,
      children: ({ values, errors, handleChange }) => /* @__PURE__ */ jsxs(Form, { noValidate: true, children: [
        /* @__PURE__ */ jsx(Box, { paddingLeft: 8, paddingRight: 8, paddingBottom: 6, paddingTop: 6, children: /* @__PURE__ */ jsx(
          Textarea,
          {
            label: formatMessage({ id: getTrad("input.url.label"), defaultMessage: "URL" }),
            id: "urls",
            hint: formatMessage({
              id: getTrad("input.url.description"),
              defaultMessage: "Separate your URL links by a carriage return."
            }),
            error: error?.message || (errors.urls ? formatMessage({ id: errors.urls, defaultMessage: "An error occured" }) : void 0),
            onChange: handleChange,
            value: values.urls
          }
        ) }),
        /* @__PURE__ */ jsx(
          ModalFooter,
          {
            startActions: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "cancel" }) }),
            endActions: /* @__PURE__ */ jsx(Button, { type: "submit", loading, children: formatMessage({
              id: getTrad("button.next"),
              defaultMessage: "Next"
            }) })
          }
        )
      ] })
    }
  );
};
FromUrlForm.defaultProps = {
  trackedLocation: void 0
};
FromUrlForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddAsset: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
const AddAssetStep = ({ onClose, onAddAsset, trackedLocation }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage({
      id: getTrad("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    }) }) }),
    /* @__PURE__ */ jsxs(
      TabGroup,
      {
        label: formatMessage({
          id: getTrad("tabs.title"),
          defaultMessage: "How do you want to upload your assets?"
        }),
        variant: "simple",
        children: [
          /* @__PURE__ */ jsxs(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, children: [
            /* @__PURE__ */ jsxs(Tabs, { children: [
              /* @__PURE__ */ jsx(Tab, { children: formatMessage({
                id: getTrad("modal.nav.computer"),
                defaultMessage: "From computer"
              }) }),
              /* @__PURE__ */ jsx(Tab, { children: formatMessage({
                id: getTrad("modal.nav.url"),
                defaultMessage: "From URL"
              }) })
            ] }),
            /* @__PURE__ */ jsx(Divider, {})
          ] }),
          /* @__PURE__ */ jsxs(TabPanels, { children: [
            /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
              FromComputerForm,
              {
                onClose,
                onAddAssets: onAddAsset,
                trackedLocation
              }
            ) }),
            /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
              FromUrlForm,
              {
                onClose,
                onAddAsset,
                trackedLocation
              }
            ) })
          ] })
        ]
      }
    )
  ] });
};
AddAssetStep.defaultProps = {
  trackedLocation: void 0
};
AddAssetStep.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddAsset: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
const UploadProgressWrapper = styled.div`
  height: ${88 / 16}rem;
  width: 100%;
`;
const Extension = styled.span`
  text-transform: uppercase;
`;
const UploadingAssetCard = ({
  asset,
  onCancel,
  onStatusChange,
  addUploadedFiles,
  folderId
}) => {
  const { upload, cancel, error, progress, status } = useUpload();
  const { formatMessage } = useIntl();
  let badgeContent = formatMessage({
    id: getTrad("settings.section.doc.label"),
    defaultMessage: "Doc"
  });
  if (asset.type === AssetType.Image) {
    badgeContent = formatMessage({
      id: getTrad("settings.section.image.label"),
      defaultMessage: "Image"
    });
  } else if (asset.type === AssetType.Video) {
    badgeContent = formatMessage({
      id: getTrad("settings.section.video.label"),
      defaultMessage: "Video"
    });
  } else if (asset.type === AssetType.Audio) {
    badgeContent = formatMessage({
      id: getTrad("settings.section.audio.label"),
      defaultMessage: "Audio"
    });
  }
  useEffect(() => {
    const uploadFile = async () => {
      const files = await upload(asset, folderId);
      if (addUploadedFiles) {
        addUploadedFiles(files);
      }
    };
    uploadFile();
  }, []);
  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);
  const handleCancel = () => {
    cancel();
    onCancel(asset.rawFile);
  };
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsxs(Card$1, { borderColor: error ? "danger600" : "neutral150", children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(UploadProgressWrapper, { children: /* @__PURE__ */ jsx(UploadProgress, { error, onCancel: handleCancel, progress }) }) }),
      /* @__PURE__ */ jsxs(CardBody, { children: [
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx(Box, { paddingTop: 1, children: /* @__PURE__ */ jsx(CardTitle, { as: "h2", children: asset.name }) }),
          /* @__PURE__ */ jsx(CardSubtitle, { children: /* @__PURE__ */ jsx(Extension, { children: asset.ext }) })
        ] }),
        /* @__PURE__ */ jsx(Flex, { paddingTop: 1, grow: 1, children: /* @__PURE__ */ jsx(CardBadge, { children: badgeContent }) })
      ] })
    ] }),
    error ? /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "danger600", children: formatMessage(
      error?.response?.data?.error?.message ? {
        id: getTrad(`apiError.${error.response.data.error.message}`),
        defaultMessage: error.response.data.error.message
        /* See issue: https://github.com/strapi/strapi/issues/13867
           A proxy might return an error, before the request reaches Strapi
           and therefore we need to handle errors gracefully.
        */
      } : {
        id: getTrad("upload.generic-error"),
        defaultMessage: "An error occured while uploading the file."
      }
    ) }) : void 0
  ] });
};
UploadingAssetCard.defaultProps = {
  addUploadedFiles: void 0,
  folderId: null
};
UploadingAssetCard.propTypes = {
  addUploadedFiles: PropTypes.func,
  asset: PropTypes.shape({
    name: PropTypes.string,
    ext: PropTypes.string,
    rawFile: PropTypes.instanceOf(File),
    type: PropTypes.oneOf(Object.values(AssetType))
  }).isRequired,
  folderId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onCancel: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired
};
const Status = {
  Idle: "IDLE",
  Uploading: "UPLOADING",
  Intermediate: "INTERMEDIATE"
};
const PendingAssetStep = ({
  addUploadedFiles,
  folderId,
  onClose,
  onEditAsset,
  onRemoveAsset,
  assets,
  onClickAddAsset,
  onCancelUpload,
  onUploadSucceed,
  trackedLocation
}) => {
  const assetCountRef = useRef(0);
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const [uploadStatus, setUploadStatus] = useState(Status.Idle);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const assetsCountByType = assets.reduce((acc, asset) => {
      const { type } = asset;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] = `${parseInt(acc[type], 10) + 1}`;
      return acc;
    }, {});
    trackUsage("willAddMediaLibraryAssets", {
      location: trackedLocation,
      ...assetsCountByType
    });
    setUploadStatus(Status.Uploading);
  };
  const handleStatusChange = (status, file) => {
    if (status === "success" || status === "error") {
      assetCountRef.current++;
      if (assetCountRef.current === assets.length) {
        assetCountRef.current = 0;
        setUploadStatus(Status.Intermediate);
      }
    }
    if (status === "success") {
      onUploadSucceed(file);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage({
      id: getTrad("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    }) }) }),
    /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 0, children: [
          /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: formatMessage(
            {
              id: getTrad("list.assets.to-upload"),
              defaultMessage: "{number, plural, =0 {No asset} one {1 asset} other {# assets}} ready to upload"
            },
            { number: assets.length }
          ) }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage({
            id: getTrad("modal.upload-list.sub-header-subtitle"),
            defaultMessage: "Manage the assets before adding them to the Media Library"
          }) })
        ] }),
        /* @__PURE__ */ jsx(Button, { size: "S", onClick: onClickAddAsset, children: formatMessage({
          id: getTrad("header.actions.add-assets"),
          defaultMessage: "Add new assets"
        }) })
      ] }),
      /* @__PURE__ */ jsx(KeyboardNavigable, { tagName: "article", children: /* @__PURE__ */ jsx(Grid, { gap: 4, children: assets.map((asset) => {
        const assetKey = asset.url;
        if (uploadStatus === Status.Uploading || uploadStatus === Status.Intermediate) {
          return /* @__PURE__ */ jsx(GridItem, { col: 4, children: /* @__PURE__ */ jsx(
            UploadingAssetCard,
            {
              addUploadedFiles,
              asset,
              id: assetKey,
              onCancel: onCancelUpload,
              onStatusChange: (status) => handleStatusChange(status, asset.rawFile),
              size: "S",
              folderId
            }
          ) }, assetKey);
        }
        return /* @__PURE__ */ jsx(GridItem, { col: 4, children: /* @__PURE__ */ jsx(
          AssetCard,
          {
            asset,
            size: "S",
            local: true,
            alt: asset.name,
            onEdit: onEditAsset,
            onRemove: onRemoveAsset
          },
          assetKey
        ) }, assetKey);
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "cancel" }) }),
        endActions: /* @__PURE__ */ jsx(Button, { type: "submit", loading: uploadStatus === Status.Uploading, children: formatMessage(
          {
            id: getTrad("modal.upload-list.footer.button"),
            defaultMessage: "Upload {number, plural, one {# asset} other {# assets}} to the library"
          },
          { number: assets.length }
        ) })
      }
    )
  ] });
};
PendingAssetStep.defaultProps = {
  addUploadedFiles: void 0,
  folderId: null,
  trackedLocation: void 0
};
PendingAssetStep.propTypes = {
  addUploadedFiles: PropTypes.func,
  assets: PropTypes.arrayOf(AssetDefinition).isRequired,
  folderId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func.isRequired,
  onEditAsset: PropTypes.func.isRequired,
  onRemoveAsset: PropTypes.func.isRequired,
  onClickAddAsset: PropTypes.func.isRequired,
  onUploadSucceed: PropTypes.func.isRequired,
  onCancelUpload: PropTypes.func.isRequired,
  trackedLocation: PropTypes.string
};
const Steps = {
  AddAsset: "AddAsset",
  PendingAsset: "PendingAsset"
};
const UploadAssetDialog = ({
  initialAssetsToAdd,
  folderId,
  onClose,
  addUploadedFiles,
  trackedLocation,
  validateAssetsTypes = (_, cb) => cb()
}) => {
  const { formatMessage } = useIntl();
  const [step, setStep] = useState(initialAssetsToAdd ? Steps.PendingAsset : Steps.AddAsset);
  const [assets, setAssets] = useState(initialAssetsToAdd || []);
  const [assetToEdit, setAssetToEdit] = useState(void 0);
  const handleAddToPendingAssets = (nextAssets) => {
    validateAssetsTypes(nextAssets, () => {
      setAssets((prevAssets) => prevAssets.concat(nextAssets));
      setStep(Steps.PendingAsset);
    });
  };
  const moveToAddAsset = () => {
    setStep(Steps.AddAsset);
  };
  const handleCancelUpload = (file) => {
    const nextAssets = assets.filter((asset) => asset.rawFile !== file);
    setAssets(nextAssets);
    if (nextAssets.length === 0) {
      moveToAddAsset();
    }
  };
  const handleUploadSuccess = (file) => {
    const nextAssets = assets.filter((asset) => asset.rawFile !== file);
    setAssets(nextAssets);
    if (nextAssets.length === 0) {
      onClose();
    }
  };
  const handleAssetEditValidation = (nextAsset) => {
    if (nextAsset) {
      const nextAssets = assets.map((asset) => asset === assetToEdit ? nextAsset : asset);
      setAssets(nextAssets);
    }
    setAssetToEdit(void 0);
  };
  const handleClose = () => {
    if (step === Steps.PendingAsset && assets.length > 0) {
      const confirm = window.confirm(
        formatMessage({
          id: "window.confirm.close-modal.files",
          defaultMessage: "Are you sure? You have some files that have not been uploaded yet."
        })
      );
      if (confirm) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  const handleRemoveAsset = (assetToRemove) => {
    const nextAssets = assets.filter((asset) => asset !== assetToRemove);
    setAssets(nextAssets);
  };
  return /* @__PURE__ */ jsxs(ModalLayout, { onClose: handleClose, labelledBy: "title", children: [
    step === Steps.AddAsset && /* @__PURE__ */ jsx(
      AddAssetStep,
      {
        onClose,
        onAddAsset: handleAddToPendingAssets,
        trackedLocation
      }
    ),
    step === Steps.PendingAsset && /* @__PURE__ */ jsx(
      PendingAssetStep,
      {
        onClose: handleClose,
        assets,
        onEditAsset: setAssetToEdit,
        onRemoveAsset: handleRemoveAsset,
        onClickAddAsset: moveToAddAsset,
        onCancelUpload: handleCancelUpload,
        onUploadSucceed: handleUploadSuccess,
        initialAssetsToAdd,
        addUploadedFiles,
        folderId,
        trackedLocation
      }
    ),
    assetToEdit && /* @__PURE__ */ jsx(
      EditAssetDialog,
      {
        onClose: handleAssetEditValidation,
        asset: assetToEdit,
        canUpdate: true,
        canCopyLink: false,
        canDownload: false,
        trackedLocation
      }
    )
  ] });
};
UploadAssetDialog.defaultProps = {
  addUploadedFiles: void 0,
  folderId: null,
  initialAssetsToAdd: void 0,
  onClose() {
  },
  trackedLocation: void 0,
  validateAssetsTypes: void 0
};
UploadAssetDialog.propTypes = {
  addUploadedFiles: PropTypes.func,
  folderId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  initialAssetsToAdd: PropTypes.arrayOf(AssetDefinition),
  onClose: PropTypes.func,
  trackedLocation: PropTypes.string,
  validateAssetsTypes: PropTypes.func
};
const STEPS$1 = {
  AssetSelect: "SelectAsset",
  AssetUpload: "UploadAsset",
  FolderCreate: "FolderCreate"
};
const MediaLibraryDialog = ({ onClose, onSelectAssets, allowedTypes }) => {
  const [step, setStep] = useState(STEPS$1.AssetSelect);
  const [folderId, setFolderId] = useState(null);
  switch (step) {
    case STEPS$1.AssetSelect:
      return /* @__PURE__ */ jsx(
        AssetDialog,
        {
          allowedTypes,
          folderId,
          onClose: () => {
            setStep(void 0);
            setFolderId(null);
            onClose();
          },
          onValidate: onSelectAssets,
          onAddAsset: () => setStep(STEPS$1.AssetUpload),
          onAddFolder: () => setStep(STEPS$1.FolderCreate),
          onChangeFolder: (folderId2) => setFolderId(folderId2),
          multiple: true
        }
      );
    case STEPS$1.FolderCreate:
      return /* @__PURE__ */ jsx(EditFolderDialog, { onClose: () => setStep(STEPS$1.AssetSelect), parentFolderId: folderId });
    default:
      return /* @__PURE__ */ jsx(UploadAssetDialog, { onClose: () => setStep(STEPS$1.AssetSelect), folderId });
  }
};
MediaLibraryDialog.defaultProps = {
  allowedTypes: ["files", "images", "videos", "audios"]
};
MediaLibraryDialog.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
  onSelectAssets: PropTypes.func.isRequired
};
const DocAsset = styled(Flex)`
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f9 121.48%);
`;
const VideoPreviewWrapper = styled(Box)`
  canvas,
  video {
    max-width: 100%;
    height: 124px;
  }
`;
const AudioPreviewWrapper = styled(Box)`
  canvas,
  audio {
    max-width: 100%;
  }
`;
const CarouselAsset = ({ asset }) => {
  if (asset.mime.includes(AssetType.Video)) {
    return /* @__PURE__ */ jsx(VideoPreviewWrapper, { height: "100%", children: /* @__PURE__ */ jsx(
      VideoPreview,
      {
        url: createAssetUrl(asset, true),
        mime: asset.mime,
        alt: asset.alternativeText || asset.name
      }
    ) });
  }
  if (asset.mime.includes(AssetType.Audio)) {
    return /* @__PURE__ */ jsx(AudioPreviewWrapper, { children: /* @__PURE__ */ jsx(AudioPreview, { url: createAssetUrl(asset, true), alt: asset.alternativeText || asset.name }) });
  }
  if (asset.mime.includes(AssetType.Image)) {
    return /* @__PURE__ */ jsx(
      Box,
      {
        as: "img",
        maxHeight: "100%",
        maxWidth: "100%",
        src: createAssetUrl(asset, true),
        alt: asset.alternativeText || asset.name
      }
    );
  }
  return /* @__PURE__ */ jsx(DocAsset, { width: "100%", height: "100%", justifyContent: "center", hasRadius: true, children: asset.ext.includes("pdf") ? /* @__PURE__ */ jsx(FilePdf, { "aria-label": asset.alternativeText || asset.name, width: "24px", height: "32px" }) : /* @__PURE__ */ jsx(File$1, { "aria-label": asset.alternativeText || asset.name, width: "24px", height: "32px" }) });
};
CarouselAsset.propTypes = {
  asset: AssetDefinition.isRequired
};
const CarouselAssetActions = ({ asset, onDeleteAsset, onAddAsset, onEditAsset }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(CarouselActions, { children: [
    onAddAsset && /* @__PURE__ */ jsx(
      IconButton,
      {
        label: formatMessage({
          id: getTrad("control-card.add"),
          defaultMessage: "Add"
        }),
        icon: /* @__PURE__ */ jsx(Plus, {}),
        onClick: () => onAddAsset(asset)
      }
    ),
    /* @__PURE__ */ jsx(CopyLinkButton, { url: prefixFileUrlWithBackendUrl(asset.url) }),
    onDeleteAsset && /* @__PURE__ */ jsx(
      IconButton,
      {
        label: formatMessage({
          id: "global.delete",
          defaultMessage: "Delete"
        }),
        icon: /* @__PURE__ */ jsx(Trash, {}),
        onClick: () => onDeleteAsset(asset)
      }
    ),
    onEditAsset && /* @__PURE__ */ jsx(
      IconButton,
      {
        label: formatMessage({
          id: getTrad("control-card.edit"),
          defaultMessage: "edit"
        }),
        icon: /* @__PURE__ */ jsx(Pencil, {}),
        onClick: onEditAsset
      }
    )
  ] });
};
CarouselAssetActions.defaultProps = {
  onAddAsset: void 0,
  onDeleteAsset: void 0,
  onEditAsset: void 0
};
CarouselAssetActions.propTypes = {
  asset: AssetDefinition.isRequired,
  onAddAsset: PropTypes.func,
  onEditAsset: PropTypes.func,
  onDeleteAsset: PropTypes.func
};
const TextAlignTypography = styled(Typography)`
  align-items: center;
`;
const EmptyStateAsset = ({ disabled, onClick, onDropAsset }) => {
  const { formatMessage } = useIntl();
  const [dragOver, setDragOver] = useState(false);
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOver(false);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files) {
      const files = e.dataTransfer.files;
      const assets = [];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const asset = rawFileToAsset(file, AssetSource.Computer);
        assets.push(asset);
      }
      onDropAsset(assets);
    }
    setDragOver(false);
  };
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      borderStyle: dragOver ? "dashed" : void 0,
      borderWidth: dragOver ? "1px" : void 0,
      borderColor: dragOver ? "primary600" : void 0,
      direction: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      as: "button",
      type: "button",
      disabled,
      onClick,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      style: { cursor: disabled ? "not-allowed" : "pointer" },
      children: [
        /* @__PURE__ */ jsx(
          Icon,
          {
            as: PicturePlus,
            "aria-hidden": true,
            width: "30px",
            height: "24px",
            color: disabled ? "neutral400" : "primary600",
            marginBottom: 3
          }
        ),
        /* @__PURE__ */ jsx(
          TextAlignTypography,
          {
            variant: "pi",
            fontWeight: "bold",
            textColor: "neutral600",
            style: { textAlign: "center" },
            as: "span",
            children: formatMessage({
              id: getTrad("mediaLibraryInput.placeholder"),
              defaultMessage: "Click to add an asset or drag and drop one in this area"
            })
          }
        )
      ]
    }
  );
};
EmptyStateAsset.defaultProps = {
  disabled: false,
  onDropAsset: void 0
};
EmptyStateAsset.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onDropAsset: PropTypes.func
};
const CarouselAssets = forwardRef(
  ({
    assets,
    disabled,
    error,
    hint,
    label,
    labelAction,
    onAddAsset,
    onDeleteAsset,
    onDeleteAssetFromMediaLibrary,
    onDropAsset,
    onEditAsset,
    onNext,
    onPrevious,
    required,
    selectedAssetIndex,
    trackedLocation
  }, forwardedRef) => {
    const { formatMessage } = useIntl();
    const [isEditingAsset, setIsEditingAsset] = useState(false);
    const currentAsset = assets[selectedAssetIndex];
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        CarouselInput,
        {
          ref: forwardedRef,
          label,
          labelAction,
          secondaryLabel: currentAsset?.name,
          selectedSlide: selectedAssetIndex,
          previousLabel: formatMessage({
            id: getTrad("mediaLibraryInput.actions.previousSlide"),
            defaultMessage: "Previous slide"
          }),
          nextLabel: formatMessage({
            id: getTrad("mediaLibraryInput.actions.nextSlide"),
            defaultMessage: "Next slide"
          }),
          onNext,
          onPrevious,
          hint,
          error,
          required,
          actions: currentAsset ? /* @__PURE__ */ jsx(
            CarouselAssetActions,
            {
              asset: currentAsset,
              onDeleteAsset: disabled ? void 0 : onDeleteAsset,
              onAddAsset: disabled ? void 0 : onAddAsset,
              onEditAsset: onEditAsset ? () => setIsEditingAsset(true) : void 0
            }
          ) : void 0,
          children: assets.length === 0 ? /* @__PURE__ */ jsx(
            CarouselSlide,
            {
              label: formatMessage(
                {
                  id: getTrad("mediaLibraryInput.slideCount"),
                  defaultMessage: "{n} of {m} slides"
                },
                { n: 1, m: 1 }
              ),
              children: /* @__PURE__ */ jsx(EmptyStateAsset, { disabled, onClick: onAddAsset, onDropAsset })
            }
          ) : assets.map((asset, index2) => /* @__PURE__ */ jsx(
            CarouselSlide,
            {
              label: formatMessage(
                {
                  id: getTrad("mediaLibraryInput.slideCount"),
                  defaultMessage: "{n} of {m} slides"
                },
                { n: index2 + 1, m: assets.length }
              ),
              children: /* @__PURE__ */ jsx(CarouselAsset, { asset })
            },
            asset.id
          ))
        }
      ),
      isEditingAsset && /* @__PURE__ */ jsx(
        EditAssetDialog,
        {
          onClose: (editedAsset) => {
            setIsEditingAsset(false);
            if (editedAsset === null) {
              onDeleteAssetFromMediaLibrary();
            }
            if (editedAsset) {
              onEditAsset(editedAsset);
            }
          },
          asset: currentAsset,
          canUpdate: true,
          canCopyLink: true,
          canDownload: true,
          trackedLocation
        }
      )
    ] });
  }
);
CarouselAssets.defaultProps = {
  disabled: false,
  error: void 0,
  hint: void 0,
  labelAction: void 0,
  onDropAsset: void 0,
  required: false,
  trackedLocation: void 0
};
CarouselAssets.propTypes = {
  assets: PropTypes.arrayOf(AssetDefinition).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelAction: PropTypes.node,
  onAddAsset: PropTypes.func.isRequired,
  onDeleteAsset: PropTypes.func.isRequired,
  onDeleteAssetFromMediaLibrary: PropTypes.func.isRequired,
  onDropAsset: PropTypes.func,
  onEditAsset: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  required: PropTypes.bool,
  selectedAssetIndex: PropTypes.number.isRequired,
  trackedLocation: PropTypes.string
};
const STEPS = {
  AssetSelect: "SelectAsset",
  AssetUpload: "UploadAsset",
  FolderCreate: "FolderCreate"
};
const MediaLibraryInput = forwardRef(
  ({
    attribute: { allowedTypes },
    intlLabel,
    description: description2,
    disabled,
    error,
    labelAction,
    multiple,
    name: name2,
    onChange,
    value,
    required
  }, forwardedRef) => {
    const fieldAllowedTypes = allowedTypes || ["files", "images", "videos", "audios"];
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [step, setStep] = useState(void 0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [droppedAssets, setDroppedAssets] = useState();
    const [folderId, setFolderId] = useState(null);
    const { formatMessage } = useIntl();
    const toggleNotification = useNotification();
    useEffect(() => {
      if (step === void 0) {
        setUploadedFiles([]);
      }
    }, [step]);
    const selectedAssets = Array.isArray(value) ? value : [value];
    const handleValidation = (nextSelectedAssets) => {
      onChange({
        target: { name: name2, value: multiple ? nextSelectedAssets : nextSelectedAssets[0] }
      });
      setStep(void 0);
    };
    const handleDeleteAssetFromMediaLibrary = () => {
      let nextValue;
      if (multiple) {
        const nextSelectedAssets = selectedAssets.filter(
          (_, assetIndex) => assetIndex !== selectedIndex
        );
        nextValue = nextSelectedAssets.length > 0 ? nextSelectedAssets : null;
      } else {
        nextValue = null;
      }
      onChange({
        target: { name: name2, value: nextValue }
      });
      setSelectedIndex(0);
    };
    const handleDeleteAsset = (asset) => {
      let nextValue;
      if (multiple) {
        const nextSelectedAssets = selectedAssets.filter((prevAsset) => prevAsset.id !== asset.id);
        nextValue = nextSelectedAssets.length > 0 ? nextSelectedAssets : null;
      } else {
        nextValue = null;
      }
      onChange({
        target: { name: name2, value: nextValue }
      });
      setSelectedIndex(0);
    };
    const handleAssetEdit = (asset) => {
      const nextSelectedAssets = selectedAssets.map(
        (prevAsset) => prevAsset.id === asset.id ? asset : prevAsset
      );
      onChange({
        target: { name: name2, value: multiple ? nextSelectedAssets : nextSelectedAssets[0] }
      });
    };
    const validateAssetsTypes = (assets, callback) => {
      const allowedAssets = getAllowedFiles(fieldAllowedTypes, assets);
      if (allowedAssets.length > 0) {
        callback(allowedAssets);
      } else {
        toggleNotification({
          type: "warning",
          timeout: 4e3,
          message: {
            id: getTrad("input.notification.not-supported"),
            defaultMessage: `You can't upload this type of file.`,
            values: {
              fileTypes: fieldAllowedTypes.join(",")
            }
          }
        });
      }
    };
    const handleAssetDrop = (assets) => {
      validateAssetsTypes(assets, (allowedAssets) => {
        setDroppedAssets(allowedAssets);
        setStep(STEPS.AssetUpload);
      });
    };
    let label = intlLabel.id ? formatMessage(intlLabel) : "";
    if (multiple && selectedAssets.length > 0) {
      label = `${label} (${selectedIndex + 1} / ${selectedAssets.length})`;
    }
    const handleNext = () => {
      setSelectedIndex((current) => current < selectedAssets.length - 1 ? current + 1 : 0);
    };
    const handlePrevious = () => {
      setSelectedIndex((current) => current > 0 ? current - 1 : selectedAssets.length - 1);
    };
    const handleFilesUploadSucceeded = (uploadedFiles2) => {
      setUploadedFiles((prev) => [...prev, ...uploadedFiles2]);
    };
    const hint = description2 ? formatMessage(
      { id: description2.id, defaultMessage: description2.defaultMessage },
      { ...description2.values }
    ) : "";
    let initiallySelectedAssets = selectedAssets;
    if (uploadedFiles.length > 0) {
      const allowedUploadedFiles = getAllowedFiles(fieldAllowedTypes, uploadedFiles);
      initiallySelectedAssets = multiple ? [...allowedUploadedFiles, ...selectedAssets] : [allowedUploadedFiles[0]];
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        CarouselAssets,
        {
          ref: forwardedRef,
          assets: selectedAssets,
          disabled,
          label,
          labelAction,
          onDeleteAsset: handleDeleteAsset,
          onDeleteAssetFromMediaLibrary: handleDeleteAssetFromMediaLibrary,
          onAddAsset: () => setStep(STEPS.AssetSelect),
          onDropAsset: handleAssetDrop,
          onEditAsset: handleAssetEdit,
          onNext: handleNext,
          onPrevious: handlePrevious,
          error,
          hint,
          required,
          selectedAssetIndex: selectedIndex,
          trackedLocation: "content-manager"
        }
      ),
      step === STEPS.AssetSelect && /* @__PURE__ */ jsx(
        AssetDialog,
        {
          allowedTypes: fieldAllowedTypes,
          initiallySelectedAssets,
          folderId,
          onClose: () => {
            setStep(void 0);
            setFolderId(null);
          },
          onValidate: handleValidation,
          multiple,
          onAddAsset: () => setStep(STEPS.AssetUpload),
          onAddFolder: () => setStep(STEPS.FolderCreate),
          onChangeFolder: (folder) => setFolderId(folder),
          trackedLocation: "content-manager"
        }
      ),
      step === STEPS.AssetUpload && /* @__PURE__ */ jsx(
        UploadAssetDialog,
        {
          onClose: () => setStep(STEPS.AssetSelect),
          initialAssetsToAdd: droppedAssets,
          addUploadedFiles: handleFilesUploadSucceeded,
          trackedLocation: "content-manager",
          folderId,
          validateAssetsTypes
        }
      ),
      step === STEPS.FolderCreate && /* @__PURE__ */ jsx(EditFolderDialog, { onClose: () => setStep(STEPS.AssetSelect), parentFolderId: folderId })
    ] });
  }
);
MediaLibraryInput.defaultProps = {
  attribute: { allowedTypes: ["videos", "files", "images", "audios"] },
  disabled: false,
  description: void 0,
  error: void 0,
  intlLabel: void 0,
  labelAction: void 0,
  multiple: false,
  required: false,
  value: []
};
MediaLibraryInput.propTypes = {
  attribute: PropTypes.shape({ allowedTypes: PropTypes.arrayOf(PropTypes.string) }),
  disabled: PropTypes.bool,
  description: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
    values: PropTypes.shape({})
  }),
  error: PropTypes.string,
  intlLabel: PropTypes.shape({ id: PropTypes.string, defaultMessage: PropTypes.string }),
  labelAction: PropTypes.node,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.arrayOf(AssetDefinition), AssetDefinition])
};
const PluginIcon = () => /* @__PURE__ */ jsx(Landscape, {});
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Media Library"
      },
      permissions: PERMISSIONS.main,
      async Component() {
        const component = await import("./index-552f6585.mjs");
        return component;
      }
    });
    app.addFields({ type: "media", Component: MediaLibraryInput });
    app.addComponents([{ name: "media-library", Component: MediaLibraryDialog }]);
    app.registerPlugin({
      id: pluginId,
      name
    });
  },
  bootstrap(app) {
    app.addSettingsLink("global", {
      id: "media-library-settings",
      intlLabel: {
        id: getTrad("plugin.name"),
        defaultMessage: "Media Library"
      },
      to: "/settings/media-library",
      async Component() {
        const component = await import("./index-6f478901.mjs");
        return component;
      },
      permissions: PERMISSIONS.settings
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ca.json": () => import("./ca-ee44141f.mjs"), "./translations/de.json": () => import("./de-3e4f2232.mjs"), "./translations/dk.json": () => import("./dk-fd85a4aa.mjs"), "./translations/en.json": () => import("./en-7b7b3c7b.mjs"), "./translations/es.json": () => import("./es-bf2ab95e.mjs"), "./translations/fr.json": () => import("./fr-1d780b81.mjs"), "./translations/he.json": () => import("./he-0746c64b.mjs"), "./translations/it.json": () => import("./it-a3870aa5.mjs"), "./translations/ja.json": () => import("./ja-194fcae6.mjs"), "./translations/ko.json": () => import("./ko-aed28f4b.mjs"), "./translations/ms.json": () => import("./ms-f4d344aa.mjs"), "./translations/pl.json": () => import("./pl-38cf6e6c.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-993e6ce6.mjs"), "./translations/pt.json": () => import("./pt-c5d5f7ad.mjs"), "./translations/ru.json": () => import("./ru-701981da.mjs"), "./translations/sk.json": () => import("./sk-210f53ed.mjs"), "./translations/th.json": () => import("./th-e8b3f18d.mjs"), "./translations/tr.json": () => import("./tr-4fb5f575.mjs"), "./translations/uk.json": () => import("./uk-ae49f4cc.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-0663dab6.mjs"), "./translations/zh.json": () => import("./zh-91e8327a.mjs") }), `./translations/${locale}.json`).then(({ default: data }) => {
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
  AssetDefinition as A,
  BreadcrumbsDefinition as B,
  pageSizes as C,
  sortOptions as D,
  EmptyAssets as E,
  FolderDefinition as F,
  index as G,
  PERMISSIONS as P,
  SelectTree as S,
  TableList as T,
  UploadAssetDialog as U,
  getFolderURL as a,
  useBulkRemove as b,
  useFolderStructure as c,
  FilterPopover as d,
  displayedFilters as e,
  FilterList as f,
  getTrad as g,
  Breadcrumbs as h,
  useMediaLibraryPermissions as i,
  useAssets as j,
  useFolders as k,
  localStorageKeys as l,
  containsAssetFilter as m,
  useFolder as n,
  SortPicker as o,
  pluginId as p,
  FolderGridList as q,
  FolderCard as r,
  FolderCardBody as s,
  FolderCardBodyAction as t,
  useFolderCard as u,
  viewOptions as v,
  AssetGridList as w,
  EditFolderDialog as x,
  EditAssetDialog as y,
  useConfig as z
};
//# sourceMappingURL=index-43dc04cc.mjs.map
