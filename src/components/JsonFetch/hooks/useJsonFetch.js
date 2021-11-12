import { useState, useEffect } from 'react';

function useJsonFetch(url, opts) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, opts);
        if (!response.ok) throw new Error(`${response.url} ${response.status} ${response.statusText}`);
        const data = await response.json();
        setData(data);

      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    fetchData();

  }, [url]);

  return [{ data, error, loading }];

}

export default useJsonFetch;