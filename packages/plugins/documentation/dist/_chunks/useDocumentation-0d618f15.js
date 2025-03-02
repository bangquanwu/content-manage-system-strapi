"use strict";
const react = require("react");
const helperPlugin = require("@strapi/helper-plugin");
const reactQuery = require("react-query");
const index = require("./index-688ab74a.js");
const getTrad = (id) => `${index.pluginId}.${id}`;
const useDocumentation = () => {
  const toggleNotification = helperPlugin.useNotification();
  const { del, post, put, get } = helperPlugin.useFetchClient();
  const { formatAPIError } = helperPlugin.useAPIErrorHandler();
  const { isLoading, isError, data, refetch, error } = reactQuery.useQuery(
    ["get-documentation", index.pluginId],
    async () => {
      const { data: data2 } = await get(`/${index.pluginId}/getInfos`);
      return data2;
    }
  );
  react.useEffect(() => {
    if (isError && error) {
      toggleNotification({
        type: "warning",
        message: error ? formatAPIError(error) : { id: "notification.error" }
      });
    }
  }, [isError, error, toggleNotification, formatAPIError]);
  const handleError = (err) => {
    toggleNotification({
      type: "warning",
      message: formatAPIError(err)
    });
  };
  const handleSuccess = (type, tradId, defaultMessage) => {
    refetch();
    toggleNotification({
      type,
      message: { id: getTrad(tradId), defaultMessage }
    });
  };
  const deleteMutation = reactQuery.useMutation(
    ({ prefix, version }) => del(`${prefix}/deleteDoc/${version}`),
    {
      onSuccess: () => handleSuccess("info", "notification.delete.success", "Successfully deleted documentation"),
      onError: handleError
    }
  );
  const submit = reactQuery.useMutation(({ prefix, body }) => put(`${prefix}/updateSettings`, body), {
    onSuccess: () => handleSuccess("success", "notification.update.success", "Successfully updated settings"),
    onError: handleError
  });
  const regenerate = reactQuery.useMutation(
    ({ prefix, version }) => post(`${prefix}/regenerateDoc`, { version }),
    {
      onSuccess: () => handleSuccess(
        "info",
        "notification.generate.success",
        "Successfully generated documentation"
      ),
      onError: handleError
    }
  );
  return { data, isLoading, isError, remove: deleteMutation, submit, regenerate };
};
exports.getTrad = getTrad;
exports.useDocumentation = useDocumentation;
//# sourceMappingURL=useDocumentation-0d618f15.js.map
