import { useEffect, useState } from 'react';

const getLocalStorageValue = (key) => JSON.parse(localStorage.getItem(key));

const setLocalStorageValue = (key, value) => localStorage.setItem(key, value);

const encodedBookName = (value) => value?.replaceAll(' ', '+');

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  console.log('url:', url);
  console.log('data:', data);
  return [{ data, isLoading, isError }, setUrl];
};

export { getLocalStorageValue, setLocalStorageValue, encodedBookName, useDataApi };
