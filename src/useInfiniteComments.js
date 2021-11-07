import useSWRInfinite from "swr/infinite";

const HOST = "http://localhost:7000";

const getComments = (...args) => {
  return fetch(HOST + args[0]).then((res) => res.json());
};

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `/comments?_page=${pageIndex + 1}&_limit=10`;
};

export function useInfiniteComments() {
  const { data, error, setSize, isValidating } = useSWRInfinite(
    getKey,
    getComments
  );

  return {
    comments: data,
    error,
    setSize,
    isValidating,
    end: data && data[data.length - 1].length === 0, // TODO also if it is less than limit?
  };
}
