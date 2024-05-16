import { useNavigate } from "react-router-dom";
import { useHandleSetUser, useIsAuthenticated } from "../Hooks";
import { useCallback, useContext } from "react";
import { UserContext } from "../../App";

export default function Logout() {
  useIsAuthenticated();

  const navigate = useNavigate();
  const handleSetUser = useHandleSetUser();
  const { setUser } = useContext(UserContext);

  const handleLogout = useCallback(async () => {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.status === 401 || res.ok) {
      await handleSetUser(setUser);
      navigate("/login");
    }
  }, [handleSetUser, navigate, setUser]);

  return <button onClick={handleLogout}>Logout</button>;
}
