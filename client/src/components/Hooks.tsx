import { useEffect, useState } from "react";
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
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("http://localhost:3000/api/user", {
      credentials: "include",
      signal: abortController.signal,
    })
      .then((res) => {
        if (res.status === 401) {
          setUser(null);
          return Promise.reject();
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return { user, setUser };
}
