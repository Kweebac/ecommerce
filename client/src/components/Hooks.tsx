import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export async function useIsAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    fetch("http://localhost:3000/api/auth/status", {
      credentials: "include",
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((authenticated) => {
        if (!authenticated) navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      abortController.abort();
    };
  }, [navigate]);
}

export async function useIsNotAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    fetch("http://localhost:3000/api/auth/status", {
      credentials: "include",
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((authenticated) => {
        if (authenticated) navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      abortController.abort();
    };
  }, [navigate]);
}

export function useHandleSetUser() {
  return async (
    setUser: React.Dispatch<React.SetStateAction<object | null>>,
  ) => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        credentials: "include",
      });

      if (res.status === 401) setUser(null);
      else if (res.ok) {
        const user = await res.json();
        setUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
