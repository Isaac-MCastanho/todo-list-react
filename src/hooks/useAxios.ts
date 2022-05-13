import axios from "axios";
import { useEffect, useState } from "react";

export function useAxios<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isFething, setIsFething] = useState<boolean>(true);
  //  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      //.catch((error) => setError(error))
      .finally(() => setIsFething(false));
  }, []);

  return { data, isFething };
}
