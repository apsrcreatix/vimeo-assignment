import { useCallback, useEffect, useState } from "react";

const INIT_FETCH_STATE = {
  data: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isCompleted: false,
  error: null,
};

const useFetch = ({ url, method, ...inits }) => {
  const [
    { isLoading, isError, isSuccess, data, error, isCompleted },
    setState,
  ] = useState(() => INIT_FETCH_STATE);

  const [fetchCount, setFetchCount] = useState(0);

  const fetchCall = useCallback(
    () => {
      // initially setting the fetch
      setState({
        data: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
        isCompleted: false,
        error: null,
      });

      // using fetch for api call
      fetch(url, {
        method,
        ...inits,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) =>
          setState({
            data: data,
            isLoading: false,
            isError: false,
            isSuccess: true,
            isCompleted: true,
            error: null,
          })
        )
        .catch((error) =>
          setState({
            data: null,
            isLoading: false,
            isError: true,
            isSuccess: false,
            isCompleted: true,
            error: error,
          })
        );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    fetchCall();
    return () => {};
  }, [fetchCall, fetchCount]);

  return {
    refetch: () => setFetchCount((prev) => prev + 1),
    isLoading,
    isError,
    isSuccess,
    fetchCount,
    data,
    error,
    isCompleted,
  };
};
export default useFetch;
