import { useEffect } from "react";
import { useNotification, useFetchClient, useAPIErrorHandler } from "@strapi/helper-plugin";
import { useQuery, useMutation } from "react-query";
import { p as pluginId } from "./index-972b74ea.mjs";
const getTrad = (id) => `${pluginId}.${id}`;
const useDocumentation = () => {
  const toggleNotification = useNotification();
  const { del, post, put, get } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  const { isLoading, isError, data, refetch, error } = useQuery(
    ["get-documentation", pluginId],
    async () => {
      const { data: data2 } = await get(`/${pluginId}/getInfos`);
      return data2;
    }
  );
  useEffect(() => {
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
  const deleteMutation = useMutation(
    ({ prefix, version }) => del(`${prefix}/deleteDoc/${version}`),
    {
      onSuccess: () => handleSuccess("info", "notification.delete.success", "Successfully deleted documentation"),
      onError: handleError
    }
  );
  const submit = useMutation(({ prefix, body }) => put(`${prefix}/updateSettings`, body), {
    onSuccess: () => handleSuccess("success", "notification.update.success", "Successfully updated settings"),
    onError: handleError
  });
  const regenerate = useMutation(
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
export {
  getTrad as g,
  useDocumentation as u
};
//# sourceMappingURL=useDocumentation-b1901301.mjs.map
