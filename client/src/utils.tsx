import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ComponentValues } from "./types/Components";

export async function handleSetUser(
  setUser: React.Dispatch<React.SetStateAction<object | null>>,
  abortController?: AbortController,
) {
  const res = await fetch("http://localhost:3000/api/user", {
    credentials: "include",
    signal: abortController?.signal,
  });

  if (res.status === 401) {
    setUser(null);
  } else if (res.ok) {
    const user = await res.json();
    setUser(user);
  }
}

export function useGetItem(
  subCategory: string,
  mainCategory: string = "components",
) {
  const [item, setItem] = useState<ComponentValues | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/${mainCategory}/${subCategory}/${id}`,
      );

      if (res.status === 404) setItem(null);
      else {
        const data = await res.json();
        setItem(data);
      }
    })();
  }, [id]);

  return item;
}
