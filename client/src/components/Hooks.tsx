import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export async function useIsAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      try {
        const res = await fetch("http://localhost:3000/api/auth/status", {
          credentials: "include",
          signal: abortController.signal,
        });

        const authenticated = await res.json();

        if (!authenticated) navigate("/login");
      } catch (error) {
        console.error(error);
      }

      return () => {
        abortController.abort();
      };
    })();
  }, [navigate]);
}

export async function useIsNotAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      try {
        const res = await fetch("http://localhost:3000/api/auth/status", {
          credentials: "include",
          signal: abortController.signal,
        });

        const authenticated = await res.json();

        if (authenticated) navigate(-1);
      } catch (error) {
        console.error(error);
      }

      return () => {
        abortController.abort();
      };
    })();
  }, [navigate]);
}

export function useHandleSetUser() {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      try {
        const res = await fetch("http://localhost:3000/api/user", {
          credentials: "include",
          signal: abortController.signal,
        });

        if (res.status === 401) {
          return setUser(null);
        } else if (res.ok) {
          const user = await res.json();
          setUser(user);
        }
      } catch (error) {
        console.error(error);
      }

      return () => {
        abortController.abort();
      };
    })();
  }, []);

  return { user, setUser };
}
