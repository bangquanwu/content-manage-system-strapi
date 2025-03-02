import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, lazy, useEffect, Suspense } from "react";
import { Box, BaseCheckbox, Flex, Button, ModalLayout, ModalBody, Loader, ModalHeader, Typography, Grid, GridItem, FieldLabel, ModalFooter, HeaderLayout, Link, Layout, Main, ActionLayout, IconButton, ContentLayout, VisuallyHidden, Divider } from "@strapi/design-system";
import { PageSizeURLQuery, PaginationURLQuery, ConfirmDialog, useNotification, useFetchClient, Form, normalizeAPIError, useTracking, useQueryParams, usePersistentState, useSelectionState, useFocusWhenNavigate, CheckPermissions, SearchURLQuery, LoadingIndicatorPage, AnErrorOccurred } from "@strapi/helper-plugin";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { useLocation, useHistory, Link as Link$1, Switch, Route } from "react-router-dom";
import { g as getTrad, a as getFolderURL, u as useFolderCard, A as AssetDefinition, F as FolderDefinition, b as useBulkRemove, p as pluginId, c as useFolderStructure, S as SelectTree, E as EmptyAssets, d as FilterPopover, e as displayedFilters, f as FilterList, B as BreadcrumbsDefinition, h as Breadcrumbs, i as useMediaLibraryPermissions, l as localStorageKeys, v as viewOptions, j as useAssets, k as useFolders, m as containsAssetFilter, n as useFolder, o as SortPicker, P as PERMISSIONS, T as TableList, q as FolderGridList, r as FolderCard, s as FolderCardBody, t as FolderCardBodyAction, w as AssetGridList, U as UploadAssetDialog, x as EditFolderDialog, y as EditAssetDialog, z as useConfig } from "./index-43dc04cc.mjs";
import "byte-size";
import "date-fns";
import { stringify } from "qs";
import { Trash, Folder, EmptyPermissions, Plus, Filter, ArrowLeft, Cog, List, Grid as Grid$1, Pencil } from "@strapi/icons";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Formik } from "formik";
import isEmpty from "lodash/isEmpty";
import { useQueryClient, useMutation } from "react-query";
import "lodash/isEqual";
import "yup";
import "axios";
import "react-select";
import "cropperjs";
import "@strapi/design-system/v2";
import "cropperjs/dist/cropper.css";
import "react-dnd";
import "date-fns/parseISO";
const getBreadcrumbDataML = (folder, { pathname, query }) => {
  let data = [
    {
      id: null,
      label: { id: getTrad("plugin.name"), defaultMessage: "Media Library" },
      href: folder ? getFolderURL(pathname, query) : void 0
    }
  ];
  if (folder?.parent?.parent) {
    data.push([]);
  }
  if (folder?.parent) {
    data.push({
      id: folder.parent.id,
      label: folder.parent.name,
      href: getFolderURL(pathname, query, {
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
  const { id } = useFolderCard();
  return /* @__PURE__ */ jsx(Box, { position: "relative", zIndex: 2, children: /* @__PURE__ */ jsx(BaseCheckbox, { "aria-labelledby": `${id}-title`, ...props }) });
};
const PaginationFooter = ({ pagination }) => {
  return /* @__PURE__ */ jsx(Box, { paddingTop: 6, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "flex-end", justifyContent: "space-between", children: [
    /* @__PURE__ */ jsx(PageSizeURLQuery, {}),
    /* @__PURE__ */ jsx(PaginationURLQuery, { pagination })
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
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageCount: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number
  })
};
const BulkDeleteButton = ({ selected, onSuccess }) => {
  const { formatMessage } = useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { isLoading, remove } = useBulkRemove();
  const handleConfirmRemove = async () => {
    await remove(selected);
    onSuccess();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "danger-light",
        size: "S",
        startIcon: /* @__PURE__ */ jsx(Trash, {}),
        onClick: () => setShowConfirmDialog(true),
        children: formatMessage({ id: "global.delete", defaultMessage: "Delete" })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
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
  selected: PropTypes.arrayOf(AssetDefinition, FolderDefinition).isRequired,
  onSuccess: PropTypes.func.isRequired
};
const useBulkMove = () => {
  const toggleNotification = useNotification();
  const queryClient = useQueryClient();
  const { post } = useFetchClient();
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
  const mutation = useMutation(bulkMoveQuery, {
    onSuccess(res) {
      const {
        data: { data }
      } = res;
      if (data?.files?.length > 0) {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      }
      queryClient.refetchQueries([pluginId, "folders"], { active: true });
      toggleNotification({
        type: "success",
        message: {
          id: getTrad("modal.move.success-label"),
          defaultMessage: "Elements have been moved successfully."
        }
      });
    }
  });
  const move = (destinationFolderId, filesAndFolders) => mutation.mutateAsync({ destinationFolderId, filesAndFolders });
  return { ...mutation, move };
};
const BulkMoveDialog = ({ onClose, selected, currentFolder }) => {
  const { formatMessage } = useIntl();
  const { data: folderStructure, isLoading } = useFolderStructure();
  const { move } = useBulkMove();
  if (!folderStructure) {
    return null;
  }
  const handleSubmit = async (values, { setErrors }) => {
    try {
      await move(values.destination.value, selected);
      onClose();
    } catch (error) {
      const normalizedError = normalizeAPIError(error);
      const formikErrors = normalizedError.errors.reduce((acc, error2) => {
        acc[error2.values?.path?.length || "destination"] = error2.defaultMessage;
        return acc;
      }, {});
      if (!isEmpty(formikErrors)) {
        setErrors(formikErrors);
      }
    }
  };
  const handleClose = () => {
    onClose();
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(ModalLayout, { onClose: handleClose, labelledBy: "title", children: /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({
      id: getTrad("content.isLoading"),
      defaultMessage: "Content is loading."
    }) }) }) }) });
  }
  const initialFormData = {
    destination: {
      value: currentFolder?.id || "",
      label: currentFolder?.name || folderStructure[0].label
    }
  };
  return /* @__PURE__ */ jsx(ModalLayout, { onClose: handleClose, labelledBy: "title", children: /* @__PURE__ */ jsx(Formik, { validateOnChange: false, onSubmit: handleSubmit, initialValues: initialFormData, children: ({ values, errors, setFieldValue }) => /* @__PURE__ */ jsxs(Form, { noValidate: true, children: [
    /* @__PURE__ */ jsx(ModalHeader, { children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title", children: formatMessage({
      id: getTrad("modal.folder.move.title"),
      defaultMessage: "Move elements to"
    }) }) }),
    /* @__PURE__ */ jsx(ModalBody, { children: /* @__PURE__ */ jsx(Grid, { gap: 4, children: /* @__PURE__ */ jsx(GridItem, { xs: 12, col: 12, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
      /* @__PURE__ */ jsx(FieldLabel, { htmlFor: "folder-destination", children: formatMessage({
        id: getTrad("form.input.label.folder-location"),
        defaultMessage: "Location"
      }) }),
      /* @__PURE__ */ jsx(
        SelectTree,
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
      errors.destination && /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "pi",
          as: "p",
          id: "folder-destination-error",
          textColor: "danger600",
          children: errors.destination
        }
      )
    ] }) }) }) }),
    /* @__PURE__ */ jsx(
      ModalFooter,
      {
        startActions: /* @__PURE__ */ jsx(Button, { onClick: handleClose, variant: "tertiary", name: "cancel", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }),
        endActions: /* @__PURE__ */ jsx(Button, { type: "submit", loading: isLoading, children: formatMessage({ id: "modal.folder.move.submit", defaultMessage: "Move" }) })
      }
    )
  ] }) }) });
};
BulkMoveDialog.defaultProps = {
  currentFolder: void 0
};
BulkMoveDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentFolder: FolderDefinition,
  selected: PropTypes.arrayOf(FolderDefinition, AssetDefinition).isRequired
};
const BulkMoveButton = ({ selected, onSuccess, currentFolder }) => {
  const { formatMessage } = useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleConfirmMove = () => {
    setShowConfirmDialog(false);
    onSuccess();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "secondary",
        size: "S",
        startIcon: /* @__PURE__ */ jsx(Folder, {}),
        onClick: () => setShowConfirmDialog(true),
        children: formatMessage({ id: "global.move", defaultMessage: "Move" })
      }
    ),
    showConfirmDialog && /* @__PURE__ */ jsx(
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
  onSuccess: PropTypes.func.isRequired,
  currentFolder: FolderDefinition,
  selected: PropTypes.arrayOf(AssetDefinition, FolderDefinition).isRequired
};
const BulkActions = ({ selected, onSuccess, currentFolder }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { gap: 2, paddingBottom: 5, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage(
      {
        id: getTrad("list.assets.selected"),
        defaultMessage: "{numberFolders, plural, one {1 folder} other {# folders}} - {numberAssets, plural, one {1 asset} other {# assets}} selected"
      },
      {
        numberFolders: selected.filter(({ type }) => type === "folder").length,
        numberAssets: selected.filter(({ type }) => type === "asset").length
      }
    ) }),
    /* @__PURE__ */ jsx(BulkDeleteButton, { selected, onSuccess }),
    /* @__PURE__ */ jsx(BulkMoveButton, { currentFolder, selected, onSuccess })
  ] });
};
BulkActions.defaultProps = {
  currentFolder: void 0
};
BulkActions.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  currentFolder: FolderDefinition,
  selected: PropTypes.arrayOf(AssetDefinition, FolderDefinition).isRequired
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
  const { formatMessage } = useIntl();
  const content = getContentIntlMessage({ isFiltering, canCreate, canRead });
  return /* @__PURE__ */ jsx(
    EmptyAssets,
    {
      icon: !canRead ? EmptyPermissions : null,
      action: canCreate && !isFiltering && /* @__PURE__ */ jsx(Button, { variant: "secondary", startIcon: /* @__PURE__ */ jsx(Plus, {}), onClick: onActionClick, children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }),
      content: formatMessage({
        ...content,
        id: getTrad(content.id)
      })
    }
  );
};
EmptyOrNoPermissions.propTypes = {
  canCreate: PropTypes.bool.isRequired,
  canRead: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  onActionClick: PropTypes.func.isRequired
};
const Filters = () => {
  const buttonRef = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const [{ query }, setQuery] = useQueryParams();
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
        filters,
        onSubmit: handleSubmit,
        onToggle: toggleFilter,
        source: buttonRef
      }
    ),
    /* @__PURE__ */ jsx(
      FilterList,
      {
        appliedFilters: filters,
        filtersSchema: displayedFilters,
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
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  const [{ query }] = useQueryParams();
  const backQuery = {
    ...query,
    folder: folder?.parent?.id ?? void 0,
    folderPath: folder?.parent?.path ?? void 0
  };
  return /* @__PURE__ */ jsx(
    HeaderLayout,
    {
      title: formatMessage({
        id: getTrad("plugin.name"),
        defaultMessage: `Media Library`
      }),
      subtitle: breadcrumbs && folder && /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          as: "nav",
          label: formatMessage({
            id: getTrad("header.breadcrumbs.nav.label"),
            defaultMessage: "Folders navigation"
          }),
          breadcrumbs,
          currentFolderId: folder?.id
        }
      ),
      navigationAction: folder && /* @__PURE__ */ jsx(
        Link,
        {
          startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}),
          to: `${pathname}?${stringify(backQuery, { encode: false })}`,
          children: formatMessage({
            id: getTrad("header.actions.folder-level-up"),
            defaultMessage: "Back"
          })
        }
      ),
      primaryAction: canCreate && /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(Plus, {}), variant: "secondary", onClick: onToggleEditFolderDialog, children: formatMessage({
          id: getTrad("header.actions.add-folder"),
          defaultMessage: "Add new folder"
        }) }),
        /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(Plus, {}), onClick: onToggleUploadAssetDialog, children: formatMessage({
          id: getTrad("header.actions.add-assets"),
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
  breadcrumbs: PropTypes.oneOfType([BreadcrumbsDefinition, PropTypes.bool]),
  canCreate: PropTypes.bool.isRequired,
  folder: FolderDefinition,
  onToggleEditFolderDialog: PropTypes.func.isRequired,
  onToggleUploadAssetDialog: PropTypes.func.isRequired
};
const BoxWithHeight = styled(Box)`
  height: ${32 / 16}rem;
  display: flex;
  align-items: center;
`;
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
const MediaLibrary = () => {
  const { push } = useHistory();
  const {
    canRead,
    canCreate,
    canUpdate,
    canCopyLink,
    canDownload,
    isLoading: permissionsLoading
  } = useMediaLibraryPermissions();
  const currentFolderToEditRef = useRef();
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  const { trackUsage } = useTracking();
  const [{ query }, setQuery] = useQueryParams();
  const isFiltering = Boolean(query._q || query.filters);
  const [view, setView] = usePersistentState(localStorageKeys.view, viewOptions.GRID);
  const isGridView = view === viewOptions.GRID;
  const {
    data: assetsData,
    isLoading: assetsLoading,
    errors: assetsError
  } = useAssets({
    skipWhen: !canRead,
    query
  });
  const {
    data: foldersData,
    isLoading: foldersLoading,
    errors: foldersError
  } = useFolders({
    enabled: canRead && assetsData?.pagination?.page === 1 && !containsAssetFilter(query),
    query
  });
  const {
    data: currentFolder,
    isLoading: isCurrentFolderLoading,
    error: currentFolderError
  } = useFolder(query?.folder, {
    enabled: canRead && !!query?.folder
  });
  if (currentFolderError?.response?.status === 404) {
    push(pathname);
  }
  const folders = foldersData?.map((folder) => ({
    ...folder,
    type: "folder",
    folderURL: getFolderURL(pathname, query, folder.id),
    isSelectable: canUpdate
  })) ?? [];
  const folderCount = folders?.length || 0;
  const assets = assetsData?.results?.map((asset) => ({ ...asset, type: "asset", isSelectable: canUpdate })) || [];
  const assetCount = assets?.length ?? 0;
  const totalAssetCount = assetsData?.pagination?.total;
  const isLoading = isCurrentFolderLoading || foldersLoading || permissionsLoading || assetsLoading;
  const [showUploadAssetDialog, setShowUploadAssetDialog] = useState(false);
  const [showEditFolderDialog, setShowEditFolderDialog] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(void 0);
  const [folderToEdit, setFolderToEdit] = useState(void 0);
  const [selected, { selectOne, selectAll }] = useSelectionState(["type", "id"], []);
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
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
      /* @__PURE__ */ jsx(
        Header,
        {
          breadcrumbs: !isCurrentFolderLoading && getBreadcrumbDataML(currentFolder, { pathname, query }),
          canCreate,
          onToggleEditFolderDialog: toggleEditFolderDialog,
          onToggleUploadAssetDialog: toggleUploadAssetDialog,
          folder: currentFolder
        }
      ),
      /* @__PURE__ */ jsx(
        ActionLayout,
        {
          startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
            canUpdate && isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsx(
              BoxWithHeight,
              {
                paddingLeft: 2,
                paddingRight: 2,
                background: "neutral0",
                hasRadius: true,
                borderColor: "neutral200",
                children: /* @__PURE__ */ jsx(
                  BaseCheckbox,
                  {
                    "aria-label": formatMessage({
                      id: getTrad("bulk.select.label"),
                      defaultMessage: "Select all folders & assets"
                    }),
                    indeterminate: indeterminateBulkSelect,
                    value: (assetCount > 0 || folderCount > 0) && selected.length === assetCount + folderCount,
                    onChange: (e) => handleBulkSelect(e, [...assets, ...folders])
                  }
                )
              }
            ),
            canRead && isGridView && /* @__PURE__ */ jsx(SortPicker, { value: query?.sort, onChangeSort: handleChangeSort }),
            canRead && /* @__PURE__ */ jsx(Filters, {})
          ] }),
          endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(CheckPermissions, { permissions: PERMISSIONS.configureView, children: /* @__PURE__ */ jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsx(
              IconButton,
              {
                forwardedAs: Link$1,
                to: {
                  pathname: `${pathname}/configuration`,
                  search: stringify(query, { encode: false })
                },
                icon: /* @__PURE__ */ jsx(Cog, {}),
                label: formatMessage({
                  id: "app.links.configure-view",
                  defaultMessage: "Configure the view"
                })
              }
            ) }) }),
            /* @__PURE__ */ jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsx(
              IconButton,
              {
                icon: isGridView ? /* @__PURE__ */ jsx(List, {}) : /* @__PURE__ */ jsx(Grid$1, {}),
                label: isGridView ? formatMessage({
                  id: getTrad("view-switch.list"),
                  defaultMessage: "List View"
                }) : formatMessage({
                  id: getTrad("view-switch.grid"),
                  defaultMessage: "Grid View"
                }),
                onClick: () => setView(isGridView ? viewOptions.LIST : viewOptions.GRID)
              }
            ) }),
            /* @__PURE__ */ jsx(
              SearchURLQuery,
              {
                label: formatMessage({
                  id: getTrad("search.label"),
                  defaultMessage: "Search for an asset"
                }),
                trackedEvent: "didSearchMediaLibraryElements",
                trackedEventDetails: { location: "upload" }
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(ContentLayout, { children: [
        selected.length > 0 && /* @__PURE__ */ jsx(
          BulkActions,
          {
            currentFolder,
            selected,
            onSuccess: handleBulkActionSuccess
          }
        ),
        isLoading && /* @__PURE__ */ jsx(LoadingIndicatorPage, {}),
        (assetsError || foldersError) && /* @__PURE__ */ jsx(AnErrorOccurred, {}),
        folderCount === 0 && assetCount === 0 && /* @__PURE__ */ jsx(
          EmptyOrNoPermissions,
          {
            canCreate,
            canRead,
            isFiltering,
            onActionClick: toggleUploadAssetDialog
          }
        ),
        canRead && !isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsx(
          TableList,
          {
            assetCount,
            folderCount,
            indeterminate: indeterminateBulkSelect,
            onChangeSort: handleChangeSort,
            onChangeFolder: (folderID, folderPath) => push(getFolderURL(pathname, query, { folder: folderID, folderPath })),
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
        canRead && isGridView && /* @__PURE__ */ jsxs(Fragment, { children: [
          folderCount > 0 && /* @__PURE__ */ jsx(
            FolderGridList,
            {
              title: (
                // Folders title should only appear if:
                // user is filtering and there are assets to display, to divide both type of elements
                // user is not filtering
                (isFiltering && assetCount > 0 || !isFiltering) && formatMessage(
                  {
                    id: getTrad("list.folders.title"),
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
                const url = getFolderURL(pathname, query, {
                  folder: folder?.id,
                  folderPath: folder?.path
                });
                return /* @__PURE__ */ jsx(GridItem, { col: 3, children: /* @__PURE__ */ jsx(
                  FolderCard,
                  {
                    ref: folderToEdit && folder.id === folderToEdit.id ? currentFolderToEditRef : void 0,
                    ariaLabel: folder.name,
                    id: `folder-${folder.id}`,
                    to: url,
                    startAction: selectOne && folder.isSelectable ? /* @__PURE__ */ jsx(
                      FolderCardCheckbox,
                      {
                        "data-testid": `folder-checkbox-${folder.id}`,
                        value: isSelected,
                        onChange: () => selectOne(folder)
                      }
                    ) : null,
                    cardActions: /* @__PURE__ */ jsx(
                      IconButton,
                      {
                        icon: /* @__PURE__ */ jsx(Pencil, {}),
                        "aria-label": formatMessage({
                          id: getTrad("list.folder.edit"),
                          defaultMessage: "Edit folder"
                        }),
                        onClick: () => handleEditFolder(folder)
                      }
                    ),
                    children: /* @__PURE__ */ jsx(FolderCardBody, { children: /* @__PURE__ */ jsx(FolderCardBodyAction, { to: url, children: /* @__PURE__ */ jsxs(Flex, { as: "h2", direction: "column", alignItems: "start", maxWidth: "100%", children: [
                      /* @__PURE__ */ jsxs(TypographyMaxWidth, { fontWeight: "semiBold", ellipsis: true, children: [
                        folder.name,
                        /* @__PURE__ */ jsx(VisuallyHidden, { children: ":" })
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
                    ] }) }) })
                  }
                ) }, `folder-${folder.id}`);
              })
            }
          ),
          assetCount > 0 && folderCount > 0 && /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 4, children: /* @__PURE__ */ jsx(Divider, {}) }),
          assetCount > 0 && /* @__PURE__ */ jsx(
            AssetGridList,
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
                    id: getTrad("list.assets.title"),
                    defaultMessage: "Assets ({count})"
                  },
                  { count: totalAssetCount }
                ) || ""
              )
            }
          )
        ] }),
        assetsData?.pagination && /* @__PURE__ */ jsx(PaginationFooter, { pagination: assetsData.pagination })
      ] })
    ] }),
    showUploadAssetDialog && /* @__PURE__ */ jsx(
      UploadAssetDialog,
      {
        onClose: toggleUploadAssetDialog,
        trackedLocation: "upload",
        folderId: query?.folder
      }
    ),
    showEditFolderDialog && /* @__PURE__ */ jsx(
      EditFolderDialog,
      {
        onClose: handleEditFolderClose,
        folder: folderToEdit,
        parentFolderId: query?.folder,
        location: "upload"
      }
    ),
    assetToEdit && /* @__PURE__ */ jsx(
      EditAssetDialog,
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
const ConfigureTheView = lazy(() => import("./index-bdf561a3.mjs"));
const Upload = () => {
  const {
    config: { isLoading, isError, data: config }
  } = useConfig();
  const [{ rawQuery }, setQuery] = useQueryParams();
  const { formatMessage } = useIntl();
  const title = formatMessage({ id: getTrad("plugin.name"), defaultMessage: "Media Library" });
  useEffect(() => {
    if (isLoading || isError || rawQuery) {
      return;
    }
    setQuery({ sort: config.sort, page: 1, pageSize: config.pageSize });
  }, [isLoading, isError, config, rawQuery, setQuery]);
  useFocusWhenNavigate();
  return /* @__PURE__ */ jsxs(Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(Helmet, { title }),
    isLoading && /* @__PURE__ */ jsx(LoadingIndicatorPage, {}),
    rawQuery ? /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(LoadingIndicatorPage, {}), children: /* @__PURE__ */ jsxs(Switch, { children: [
      /* @__PURE__ */ jsx(Route, { exact: true, path: `/plugins/${pluginId}`, component: MediaLibrary }),
      /* @__PURE__ */ jsx(
        Route,
        {
          exact: true,
          path: `/plugins/${pluginId}/configuration`,
          render: () => /* @__PURE__ */ jsx(ConfigureTheView, { config })
        }
      )
    ] }) }) : null
  ] });
};
export {
  Upload as default
};
//# sourceMappingURL=index-552f6585.mjs.map
