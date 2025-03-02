"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const helperPlugin = require("@strapi/helper-plugin");
const reactHelmet = require("react-helmet");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-24c87e32.js");
require("byte-size");
require("date-fns");
const qs = require("qs");
const icons = require("@strapi/icons");
const styled = require("styled-components");
const PropTypes = require("prop-types");
const formik = require("formik");
const isEmpty = require("lodash/isEmpty");
const reactQuery = require("react-query");
require("lodash/isEqual");
require("yup");
require("axios");
require("react-select");
require("cropperjs");
require("@strapi/design-system/v2");
require("cropperjs/dist/cropper.css");
require("react-dnd");
require("date-fns/parseISO");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const PropTypes__default = /* @__PURE__ */ _interopDefault(PropTypes);
const isEmpty__default = /* @__PURE__ */ _interopDefault(isEmpty);
const getBreadcrumbDataML = (folder, { pathname, query }) => {
  let data = [
    {
      id: null,
      label: { id: index.getTrad("plugin.name"), defaultMessage: "Media Library" },
      href: folder ? index.getFolderURL(pathname, query) : void 0
    }
  ];
  if (folder?.parent?.parent) {
    data.push([]);
  }
  if (folder?.parent) {
    data.push({
      id: folder.parent.id,
      label: folder.parent.name,
      href: index.getFolderURL(pathname, query, {
        folder: folder.parent.id,
        folderPath: folder.parent.path
      })
    });
  }
  if (folder) {
    data.push({
      id: folder.id,
      label: folder.name
    });
  }
  return data;
};
const FolderCardCheckbox = (props) => {
  const { id } = index.useFolderCard();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { position: "relative", zIndex: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.BaseCheckbox, { "aria-labelledby": `${id}-title`, ...props }) });
};
const PaginationFooter = ({ pagination }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-end", justifyContent: "space-between", children: [
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.PageSizeURLQuery, {}),
    /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.PaginationURLQuery, { pagination })
  ] }) });
};
PaginationFooter.defaultProps = {
  pagination: {
    pageCount: 0,
    pageSize: 10,
    total: 0
  }
};
PaginationFooter.propTypes = {
  pagination: PropTypes__default.default.shape({
    page: PropTypes__default.default.number,
    pageCount: PropTypes__default.default.number,
    pageSize: PropTypes__default.default.number,
    total: PropTypes__default.default.number
  })
};
const BulkDeleteButton = ({ selected, onSuccess }) => {
  const { formatMessage } = reactIntl.useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const { isLoading, remove } = index.useBulkRemove();
  const handleConfirmRemove = async () => {
    await remove(selected);
    onSuccess();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        variant: "danger-light",
        size: "S",
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}),
        onClick: () => setShowConfirmDialog(true),
        children: formatMessage({ id: "global.delete", defaultMessage: "Delete" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      helperPlugin.ConfirmDialog,
      {
        isConfirmButtonLoading: isLoading,
        isOpen: showConfirmDialog,
        onToggleDialog: () => setShowConfirmDialog(false),
        onConfirm: handleConfirmRemove
      }
    )
  ] });
};
BulkDeleteButton.propTypes = {
  selected: PropTypes__default.default.arrayOf(index.AssetDefinition, index.FolderDefinition).isRequired,
  onSuccess: PropTypes__default.default.func.isRequired
};
const useBulkMove = () => {
  const toggleNotification = helperPlugin.useNotification();
  const queryClient = reactQuery.useQueryClient();
  const { post } = helperPlugin.useFetchClient();
  const bulkMoveQuery = ({ destinationFolderId, filesAndFolders }) => {
    const payload = filesAndFolders.reduce((acc, selected) => {
      const { id, type } = selected;
      const key = type === "asset" ? "fileIds" : "folderIds";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(id);
      return acc;
    }, {});
    return post("/upload/actions/bulk-move", { ...payload, destinationFolderId });
  };
  const mutation = reactQuery.useMutation(bulkMoveQuery, {
    onSuccess(res) {
      const {
        data: { data }
      } = res;
      if (data?.files?.length > 0) {
        queryClient.refetchQueries([index.pluginId, "assets"], { active: true });
        queryClient.refetchQueries([index.pluginId, "asset-count"], { active: true });
      }
      queryClient.refetchQueries([index.pluginId, "folders"], { active: true });
      toggleNotification({
        type: "success",
        message: {
          id: index.getTrad("modal.move.success-label"),
          defaultMessage: "Elements have been moved successfully."
        }
      });
    }
  });
  const move = (destinationFolderId, filesAndFolders) => mutation.mutateAsync({ destinationFolderId, filesAndFolders });
  return { ...mutation, move };
};
const BulkMoveDialog = ({ onClose, selected, currentFolder }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { data: folderStructure, isLoading } = index.useFolderStructure();
  const { move } = useBulkMove();
  if (!folderStructure) {
    return null;
  }
  const handleSubmit = async (values, { setErrors }) => {
    try {
      await move(values.destination.value, selected);
      onClose();
    } catch (error) {
      const normalizedError = helperPlugin.normalizeAPIError(error);
      const formikErrors = normalizedError.errors.reduce((acc, error2) => {
        acc[error2.values?.path?.length || "destination"] = error2.defaultMessage;
        return acc;
      }, {});
      if (!isEmpty__default.default(formikErrors)) {
        setErrors(formikErrors);
      }
    }
  };
  const handleClose = () => {
    onClose();
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalLayout, { onClose: handleClose, labelledBy: "title", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalBody, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
      id: index.getTrad("content.isLoading"),
      defaultMessage: "Content is loading."
    }) }) }) }) });
  }
  const initialFormData = {
    destination: {
      value: currentFolder?.id || "",
      label: currentFolder?.name || folderStructure[0].label
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalLayout, { onClose: handleClose, labelledBy: "title", children: /* @__PURE__ */ jsxRuntime.jsx(formik.Formik, { validateOnChange: false, onSubmit: handleSubmit, initialValues: initialFormData, children: ({ values, errors, setFieldValue }) => /* @__PURE__ */ jsxRuntime.jsxs(helperPlugin.Form, { noValidate: true, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage({
      id: index.getTrad("modal.folder.move.title"),
      defaultMessage: "Move elements to"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.ModalBody, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid, { gap: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { xs: 12, col: 12, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.FieldLabel, { htmlFor: "folder-destination", children: formatMessage({
        id: index.getTrad("form.input.label.folder-location"),
        defaultMessage: "Location"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        index.SelectTree,
        {
          options: folderStructure,
          onChange: (value) => {
            setFieldValue("destination", value);
          },
          defaultValue: values.destination,
          name: "destination",
          menuPortalTarget: document.querySelector("body"),
          inputId: "folder-destination",
          error: errors?.destination,
          ariaErrorMessage: "destination-error"
        }
      ),
      errors.destination && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Typography,
        {
          variant: "pi",
          as: "p",
          id: "folder-destination-error",
          textColor: "danger600",
          children: errors.destination
        }
      )
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.ModalFooter,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleClose, variant: "tertiary", name: "cancel", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }),
        endActions: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", loading: isLoading, children: formatMessage({ id: "modal.folder.move.submit", defaultMessage: "Move" }) })
      }
    )
  ] }) }) });
};
BulkMoveDialog.defaultProps = {
  currentFolder: void 0
};
BulkMoveDialog.propTypes = {
  onClose: PropTypes__default.default.func.isRequired,
  currentFolder: index.FolderDefinition,
  selected: PropTypes__default.default.arrayOf(index.FolderDefinition, index.AssetDefinition).isRequired
};
const BulkMoveButton = ({ selected, onSuccess, currentFolder }) => {
  const { formatMessage } = reactIntl.useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const handleConfirmMove = () => {
    setShowConfirmDialog(false);
    onSuccess();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        variant: "secondary",
        size: "S",
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Folder, {}),
        onClick: () => setShowConfirmDialog(true),
        children: formatMessage({ id: "global.move", defaultMessage: "Move" })
      }
    ),
    showConfirmDialog && /* @__PURE__ */ jsxRuntime.jsx(
      BulkMoveDialog,
      {
        currentFolder,
        onClose: handleConfirmMove,
        selected
      }
    )
  ] });
};
BulkMoveButton.defaultProps = {
  currentFolder: void 0
};
BulkMoveButton.propTypes = {
  onSuccess: PropTypes__default.default.func.isRequired,
  currentFolder: index.FolderDefinition,
  selected: PropTypes__default.default.arrayOf(index.AssetDefinition, index.FolderDefinition).isRequired
};
const BulkActions = ({ selected, onSuccess, currentFolder }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, paddingBottom: 5, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage(
      {
        id: index.getTrad("list.assets.selected"),
        defaultMessage: "{numberFolders, plural, one {1 folder} other {# folders}} - {numberAssets, plural, one {1 asset} other {# assets}} selected"
      },
      {
        numberFolders: selected.filter(({ type }) => type === "folder").length,
        numberAssets: selected.filter(({ type }) => type === "asset").length
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(BulkDeleteButton, { selected, onSuccess }),
    /* @__PURE__ */ jsxRuntime.jsx(BulkMoveButton, { currentFolder, selected, onSuccess })
  ] });
};
BulkActions.defaultProps = {
  currentFolder: void 0
};
BulkActions.propTypes = {
  onSuccess: PropTypes__default.default.func.isRequired,
  currentFolder: index.FolderDefinition,
  selected: PropTypes__default.default.arrayOf(index.AssetDefinition, index.FolderDefinition).isRequired
};
const getContentIntlMessage = ({ isFiltering, canCreate, canRead }) => {
  if (isFiltering) {
    return {
      id: "list.assets-empty.title-withSearch",
      defaultMessage: "There are no elements with the applied filters"
    };
  }
  if (canRead) {
    if (canCreate) {
      return {
        id: "list.assets.empty-upload",
        defaultMessage: "Upload your first assets..."
      };
    }
    return {
      id: "list.assets.empty",
      defaultMessage: "Media Library is empty"
    };
  }
  return {
    id: "header.actions.no-permissions",
    defaultMessage: "No permissions to view"
  };
};
const EmptyOrNoPermissions = ({ canCreate, isFiltering, canRead, onActionClick }) => {
  const { formatMessage } = reactIntl.useIntl();
  const content = getContentIntlMessage({ isFiltering, canCreate, canRead });
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.EmptyAssets,
    {
      icon: !canRead ? icons.EmptyPermissions : null,
      action: canCreate && !isFiltering && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "secondary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: onActionClick, children: formatMessage({
        id: index.getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }),
      content: formatMessage({
        ...content,
        id: index.getTrad(content.id)
      })
    }
  );
};
EmptyOrNoPermissions.propTypes = {
  canCreate: PropTypes__default.default.bool.isRequired,
  canRead: PropTypes__default.default.bool.isRequired,
  isFiltering: PropTypes__default.default.bool.isRequired,
  onActionClick: PropTypes__default.default.func.isRequired
};
const Filters = () => {
  const buttonRef = React.useRef(null);
  const [isVisible, setVisible] = React.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = helperPlugin.useTracking();
  const [{ query }, setQuery] = helperPlugin.useQueryParams();
  const filters = query?.filters?.$and || [];
  const toggleFilter = () => setVisible((prev) => !prev);
  const handleRemoveFilter = (nextFilters) => {
    setQuery({ filters: { $and: nextFilters }, page: 1 });
  };
  const handleSubmit = (filters2) => {
    trackUsage("didFilterMediaLibraryElements", {
      location: "content-manager",
      filter: Object.keys(filters2[filters2.length - 1])[0]
    });
    setQuery({ filters: { $and: filters2 }, page: 1 });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        variant: "tertiary",
        ref: buttonRef,
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Filter, {}),
        onClick: toggleFilter,
        size: "S",
        children: formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" })
      }
    ),
    isVisible && /* @__PURE__ */ jsxRuntime.jsx(
      index.FilterPopover,
      {
        displayedFilters: index.displayedFilters,
        filters,
        onSubmit: handleSubmit,
        onToggle: toggleFilter,
        source: buttonRef
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.FilterList,
      {
        appliedFilters: filters,
        filtersSchema: index.displayedFilters,
        onRemoveFilter: handleRemoveFilter
      }
    )
  ] });
};
const Header = ({
  breadcrumbs,
  canCreate,
  folder,
  onToggleEditFolderDialog,
  onToggleUploadAssetDialog
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { pathname } = reactRouterDom.useLocation();
  const [{ query }] = helperPlugin.useQueryParams();
  const backQuery = {
    ...query,
    folder: folder?.parent?.id ?? void 0,
    folderPath: folder?.parent?.path ?? void 0
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.HeaderLayout,
    {
      title: formatMessage({
        id: index.getTrad("plugin.name"),
        defaultMessage: `Media Library`
      }),
      subtitle: breadcrumbs && folder && /* @__PURE__ */ jsxRuntime.jsx(
        index.Breadcrumbs,
        {
          as: "nav",
          label: formatMessage({
            id: index.getTrad("header.breadcrumbs.nav.label"),
            defaultMessage: "Folders navigation"
          }),
          breadcrumbs,
          currentFolderId: folder?.id
        }
      ),
      navigationAction: folder && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Link,
        {
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}),
          to: `${pathname}?${qs.stringify(backQuery, { encode: false })}`,
          children: formatMessage({
            id: index.getTrad("header.actions.folder-level-up"),
            defaultMessage: "Back"
          })
        }
      ),
      primaryAction: canCreate && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", onClick: onToggleEditFolderDialog, children: formatMessage({
          id: index.getTrad("header.actions.add-folder"),
          defaultMessage: "Add new folder"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: onToggleUploadAssetDialog, children: formatMessage({
          id: index.getTrad("header.actions.add-assets"),
          defaultMessage: "Add new assets"
        }) })
      ] })
    }
  );
};
Header.defaultProps = {
  breadcrumbs: false,
  folder: null
};
Header.propTypes = {
  breadcrumbs: PropTypes__default.default.oneOfType([index.BreadcrumbsDefinition, PropTypes__default.default.bool]),
  canCreate: PropTypes__default.default.bool.isRequired,
  folder: index.FolderDefinition,
  onToggleEditFolderDialog: PropTypes__default.default.func.isRequired,
  onToggleUploadAssetDialog: PropTypes__default.default.func.isRequired
};
const BoxWithHeight = styled__default.default(designSystem.Box)`
  height: ${32 / 16}rem;
  display: flex;
  align-items: center;
`;
const TypographyMaxWidth = styled__default.default(designSystem.Typography)`
  max-width: 100%;
`;
const ActionContainer = styled__default.default(designSystem.Box)`
  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const MediaLibrary = () => {
  const { push } = reactRouterDom.useHistory();
  const {
    canRead,
    canCreate,
    canUpdate,
    canCopyLink,
    canDownload,
    isLoading: permissionsLoading
  } = index.useMediaLibraryPermissions();
  const currentFolderToEditRef = React.useRef();
  const { formatMessage } = reactIntl.useIntl();
  const { pathname } = reactRouterDom.useLocation();
  const { trackUsage } = helperPlugin.useTracking();
  const [{ query }, setQuery] = helperPlugin.useQueryParams();
  const isFiltering = Boolean(query._q || query.filters);
  const [view, setView] = helperPlugin.usePersistentState(index.localStorageKeys.view, index.viewOptions.GRID);
  const isGridView = view === index.viewOptions.GRID;
  const {
    data: assetsData,
    isLoading: assetsLoading,
    errors: assetsError
  } = index.useAssets({
    skipWhen: !canRead,
    query
  });
  const {
    data: foldersData,
    isLoading: foldersLoading,
    errors: foldersError
  } = index.useFolders({
    enabled: canRead && assetsData?.pagination?.page === 1 && !index.containsAssetFilter(query),
    query
  });
  const {
    data: currentFolder,
    isLoading: isCurrentFolderLoading,
    error: currentFolderError
  } = index.useFolder(query?.folder, {
    enabled: canRead && !!query?.folder
  });
  if (currentFolderError?.response?.status === 404) {
    push(pathname);
  }
  const folders = foldersData?.map((folder) => ({
    ...folder,
    type: "folder",
    folderURL: index.getFolderURL(pathname, query, folder.id),
    isSelectable: canUpdate
  })) ?? [];
  const folderCount = folders?.length || 0;
  const assets = assetsData?.results?.map((asset) => ({ ...asset, type: "asset", isSelectable: canUpdate })) || [];
  const assetCount = assets?.length ?? 0;
  const totalAssetCount = assetsData?.pagination?.total;
  const isLoading = isCurrentFolderLoading || foldersLoading || permissionsLoading || assetsLoading;
  const [showUploadAssetDialog, setShowUploadAssetDialog] = React.useState(false);
  const [showEditFolderDialog, setShowEditFolderDialog] = React.useState(false);
  const [assetToEdit, setAssetToEdit] = React.useState(void 0);
  const [folderToEdit, setFolderToEdit] = React.useState(void 0);
  const [selected, { selectOne, selectAll }] = helperPlugin.useSelectionState(["type", "id"], []);
  const indeterminateBulkSelect = selected?.length > 0 && selected?.length !== assetCount + folderCount;
  const toggleUploadAssetDialog = () => setShowUploadAssetDialog((prev) => !prev);
  const toggleEditFolderDialog = ({ created = false } = {}) => {
    if (created && query?.page !== "1") {
      setQuery({
        ...query,
        page: 1
      });
    }
    setShowEditFolderDialog((prev) => !prev);
  };
  const handleBulkSelect = (event, elements) => {
    if (event.target.checked) {
      trackUsage("didSelectAllMediaLibraryElements");
    }
    selectAll(elements);
  };
  const handleChangeSort = (value) => {
    trackUsage("didSortMediaLibraryElements", {
      location: "upload",
      sort: value
    });
    setQuery({ sort: value });
  };
  const handleEditFolder = (folder) => {
    setFolderToEdit(folder);
    setShowEditFolderDialog(true);
  };
  const handleEditFolderClose = (payload) => {
    setFolderToEdit(null);
    toggleEditFolderDialog(payload);
    if (currentFolderToEditRef.current) {
      currentFolderToEditRef.current.focus();
    }
  };
  const handleAssetDeleted = (numberOfAssets) => {
    if (numberOfAssets === assetCount && assetsData.pagination.page === assetsData.pagination.pageCount && assetsData.pagination.page > 1) {
      setQuery({
        ...query,
        page: assetsData.pagination.page - 1
      });
    }
  };
  const handleBulkActionSuccess = () => {
    selectAll();
    handleAssetDeleted(selected.length);
  };
  helperPlugin.useFocusWhenNavigate();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Layout, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Header,
        {
          breadcrumbs: !isCurrentFolderLoading && getBreadcrumbDataML(currentFolder, { pathname, query }),
          canCreate,
          onToggleEditFolderDialog: toggleEditFolderDialog,
          onToggleUploadAssetDialog: toggleUploadAssetDialog,
          folder: currentFolder
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.ActionLayout,
        {
          startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            canUpdate && isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsxRuntime.jsx(
              BoxWithHeight,
              {
                paddingLeft: 2,
                paddingRight: 2,
                background: "neutral0",
                hasRadius: true,
                borderColor: "neutral200",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.BaseCheckbox,
                  {
                    "aria-label": formatMessage({
                      id: index.getTrad("bulk.select.label"),
                      defaultMessage: "Select all folders & assets"
                    }),
                    indeterminate: indeterminateBulkSelect,
                    value: (assetCount > 0 || folderCount > 0) && selected.length === assetCount + folderCount,
                    onChange: (e) => handleBulkSelect(e, [...assets, ...folders])
                  }
                )
              }
            ),
            canRead && isGridView && /* @__PURE__ */ jsxRuntime.jsx(index.SortPicker, { value: query?.sort, onChangeSort: handleChangeSort }),
            canRead && /* @__PURE__ */ jsxRuntime.jsx(Filters, {})
          ] }),
          endActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.CheckPermissions, { permissions: index.PERMISSIONS.configureView, children: /* @__PURE__ */ jsxRuntime.jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                forwardedAs: reactRouterDom.Link,
                to: {
                  pathname: `${pathname}/configuration`,
                  search: qs.stringify(query, { encode: false })
                },
                icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Cog, {}),
                label: formatMessage({
                  id: "app.links.configure-view",
                  defaultMessage: "Configure the view"
                })
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                icon: isGridView ? /* @__PURE__ */ jsxRuntime.jsx(icons.List, {}) : /* @__PURE__ */ jsxRuntime.jsx(icons.Grid, {}),
                label: isGridView ? formatMessage({
                  id: index.getTrad("view-switch.list"),
                  defaultMessage: "List View"
                }) : formatMessage({
                  id: index.getTrad("view-switch.grid"),
                  defaultMessage: "Grid View"
                }),
                onClick: () => setView(isGridView ? index.viewOptions.LIST : index.viewOptions.GRID)
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              helperPlugin.SearchURLQuery,
              {
                label: formatMessage({
                  id: index.getTrad("search.label"),
                  defaultMessage: "Search for an asset"
                }),
                trackedEvent: "didSearchMediaLibraryElements",
                trackedEventDetails: { location: "upload" }
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.ContentLayout, { children: [
        selected.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
          BulkActions,
          {
            currentFolder,
            selected,
            onSuccess: handleBulkActionSuccess
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}),
        (assetsError || foldersError) && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.AnErrorOccurred, {}),
        folderCount === 0 && assetCount === 0 && /* @__PURE__ */ jsxRuntime.jsx(
          EmptyOrNoPermissions,
          {
            canCreate,
            canRead,
            isFiltering,
            onActionClick: toggleUploadAssetDialog
          }
        ),
        canRead && !isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsxRuntime.jsx(
          index.TableList,
          {
            assetCount,
            folderCount,
            indeterminate: indeterminateBulkSelect,
            onChangeSort: handleChangeSort,
            onChangeFolder: (folderID, folderPath) => push(index.getFolderURL(pathname, query, { folder: folderID, folderPath })),
            onEditAsset: setAssetToEdit,
            onEditFolder: handleEditFolder,
            onSelectOne: selectOne,
            onSelectAll: handleBulkSelect,
            rows: [...folders, ...assets],
            selected,
            shouldDisableBulkSelect: !canUpdate,
            sortQuery: query?.sort ?? ""
          }
        ),
        canRead && isGridView && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          folderCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            index.FolderGridList,
            {
              title: (
                // Folders title should only appear if:
                // user is filtering and there are assets to display, to divide both type of elements
                // user is not filtering
                (isFiltering && assetCount > 0 || !isFiltering) && formatMessage(
                  {
                    id: index.getTrad("list.folders.title"),
                    defaultMessage: "Folders ({count})"
                  },
                  { count: folderCount }
                ) || ""
              ),
              children: folders.map((folder) => {
                const selectedFolders = selected.filter(({ type }) => type === "folder");
                const isSelected = !!selectedFolders.find(
                  (currentFolder2) => currentFolder2.id === folder.id
                );
                const url = index.getFolderURL(pathname, query, {
                  folder: folder?.id,
                  folderPath: folder?.path
                });
                return /* @__PURE__ */ jsxRuntime.jsx(designSystem.GridItem, { col: 3, children: /* @__PURE__ */ jsxRuntime.jsx(
                  index.FolderCard,
                  {
                    ref: folderToEdit && folder.id === folderToEdit.id ? currentFolderToEditRef : void 0,
                    ariaLabel: folder.name,
                    id: `folder-${folder.id}`,
                    to: url,
                    startAction: selectOne && folder.isSelectable ? /* @__PURE__ */ jsxRuntime.jsx(
                      FolderCardCheckbox,
                      {
                        "data-testid": `folder-checkbox-${folder.id}`,
                        value: isSelected,
                        onChange: () => selectOne(folder)
                      }
                    ) : null,
                    cardActions: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.IconButton,
                      {
                        icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}),
                        "aria-label": formatMessage({
                          id: index.getTrad("list.folder.edit"),
                          defaultMessage: "Edit folder"
                        }),
                        onClick: () => handleEditFolder(folder)
                      }
                    ),
                    children: /* @__PURE__ */ jsxRuntime.jsx(index.FolderCardBody, { children: /* @__PURE__ */ jsxRuntime.jsx(index.FolderCardBodyAction, { to: url, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { as: "h2", direction: "column", alignItems: "start", maxWidth: "100%", children: [
                      /* @__PURE__ */ jsxRuntime.jsxs(TypographyMaxWidth, { fontWeight: "semiBold", ellipsis: true, children: [
                        folder.name,
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: ":" })
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsx(
                        TypographyMaxWidth,
                        {
                          as: "span",
                          textColor: "neutral600",
                          variant: "pi",
                          ellipsis: true,
                          children: formatMessage(
                            {
                              id: index.getTrad("list.folder.subtitle"),
                              defaultMessage: "{folderCount, plural, =0 {# folder} one {# folder} other {# folders}}, {filesCount, plural, =0 {# asset} one {# asset} other {# assets}}"
                            },
                            {
                              folderCount: folder.children.count,
                              filesCount: folder.files.count
                            }
                          )
                        }
                      )
                    ] }) }) })
                  }
                ) }, `folder-${folder.id}`);
              })
            }
          ),
          assetCount > 0 && folderCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}) }),
          assetCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            index.AssetGridList,
            {
              assets,
              onEditAsset: setAssetToEdit,
              onSelectAsset: selectOne,
              selectedAssets: selected.filter(({ type }) => type === "asset"),
              title: (
                // Assets title should only appear if:
                // - user is not filtering
                // - user is filtering and there are folders to display, to separate them
                // - user is on page 1 since folders won't appear on any other page than the first one (no need to visually separate them)
                (!isFiltering || isFiltering && folderCount > 0) && assetsData?.pagination?.page === 1 && formatMessage(
                  {
                    id: index.getTrad("list.assets.title"),
                    defaultMessage: "Assets ({count})"
                  },
                  { count: totalAssetCount }
                ) || ""
              )
            }
          )
        ] }),
        assetsData?.pagination && /* @__PURE__ */ jsxRuntime.jsx(PaginationFooter, { pagination: assetsData.pagination })
      ] })
    ] }),
    showUploadAssetDialog && /* @__PURE__ */ jsxRuntime.jsx(
      index.UploadAssetDialog,
      {
        onClose: toggleUploadAssetDialog,
        trackedLocation: "upload",
        folderId: query?.folder
      }
    ),
    showEditFolderDialog && /* @__PURE__ */ jsxRuntime.jsx(
      index.EditFolderDialog,
      {
        onClose: handleEditFolderClose,
        folder: folderToEdit,
        parentFolderId: query?.folder,
        location: "upload"
      }
    ),
    assetToEdit && /* @__PURE__ */ jsxRuntime.jsx(
      index.EditAssetDialog,
      {
        onClose: (editedAsset) => {
          if (editedAsset === null) {
            handleAssetDeleted(1);
          }
          setAssetToEdit(void 0);
        },
        asset: assetToEdit,
        canUpdate,
        canCopyLink,
        canDownload,
        trackedLocation: "upload"
      }
    )
  ] });
};
const ConfigureTheView = React.lazy(() => Promise.resolve().then(() => require("./index-488d112b.js")));
const Upload = () => {
  const {
    config: { isLoading, isError, data: config }
  } = index.useConfig();
  const [{ rawQuery }, setQuery] = helperPlugin.useQueryParams();
  const { formatMessage } = reactIntl.useIntl();
  const title = formatMessage({ id: index.getTrad("plugin.name"), defaultMessage: "Media Library" });
  React.useEffect(() => {
    if (isLoading || isError || rawQuery) {
      return;
    }
    setQuery({ sort: config.sort, page: 1, pageSize: config.pageSize });
  }, [isLoading, isError, config, rawQuery, setQuery]);
  helperPlugin.useFocusWhenNavigate();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactHelmet.Helmet, { title }),
    isLoading && /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}),
    rawQuery ? /* @__PURE__ */ jsxRuntime.jsx(React.Suspense, { fallback: /* @__PURE__ */ jsxRuntime.jsx(helperPlugin.LoadingIndicatorPage, {}), children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Switch, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { exact: true, path: `/plugins/${index.pluginId}`, component: MediaLibrary }),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactRouterDom.Route,
        {
          exact: true,
          path: `/plugins/${index.pluginId}/configuration`,
          render: () => /* @__PURE__ */ jsxRuntime.jsx(ConfigureTheView, { config })
        }
      )
    ] }) }) : null
  ] });
};
exports.default = Upload;
//# sourceMappingURL=index-5f5fcb8f.js.map
