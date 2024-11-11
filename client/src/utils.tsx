// @ts-nocheck

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ComponentValues } from "./types/Components";

export async function handleSetUser(
  setUser: React.Dispatch<React.SetStateAction<object | null>>,
  abortController?: AbortController,
) {
  const res = await fetch("http://localhost:3000/api/user", {
    cache: "no-store",
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

export function getUrl(location) {
  let paths = location().pathname.split("/");
  paths = paths.slice(1);
  return paths.join("/");
}

export function useGetScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const screen = {
    xxxl: width >= 1920,
    xxl: width >= 1536,
    xl: width >= 1280,
    lg: width >= 1024,
    md: width >= 768,
    sm: width >= 640,
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, []);

  return screen;
}

export function useDisableScroll(shouldWork = true) {
  useEffect(() => {
    if (shouldWork) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [shouldWork]);

  return;
}
