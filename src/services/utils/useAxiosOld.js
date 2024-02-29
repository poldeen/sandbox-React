import axios from 'axios';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:8080/';

export default function useAxiosOld(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await axios.get(baseUrl + url);
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url]);

  return { data, error, loading };
}
