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
  }, [id, subCategory, mainCategory]);

  return item;
}

export function changeName(name: string) {
  switch (name) {
    case "components/gpu":
      return "GPU";
    case "components/cpu":
      return "CPU";
    case "components/motherboard":
      return "Motherboard";
    case "components/ram":
      return "RAM";
    case "components/storage":
      return "Storage";
    case "components/psu":
      return "PSU";
    case "components/case":
      return "Case";
    case "components/cpu-cooler":
      return "CPU Cooler";
    case "components/fans":
      return "Fans";
    case "components/os":
      return "OS";
    case "accessories/monitors":
      return "Monitor";
    case "accessories/keyboards":
      return "Keyboard";
    case "accessories/mice":
      return "Mouse";
    case "accessories/headphones":
      return "Headphones";
    case "accessories/webcams":
      return "Webcam";
    case "accessories/speakers":
      return "Speakers";
    case "prebuilt":
      return "Prebuilt";
  }
}
