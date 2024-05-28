import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../Hooks";
import { useCallback, useContext } from "react";
import { UserContext } from "../../App";

export default function Logout() {
  useIsAuthenticated();

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = useCallback(async () => {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.status === 401 || res.ok) {
      try {
        const res = await fetch("http://localhost:3000/api/user", {
          credentials: "include",
        });

        if (res.status === 401) {
          setUser(null);
        } else if (res.ok) {
          const user = await res.json();
          setUser(user);
        }

        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  }, [navigate, setUser]);

  return <button onClick={handleLogout}>Logout</button>;
}
