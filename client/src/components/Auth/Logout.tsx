import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { handleSetUser } from "../../utils";

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://kweebac-ecommerce-api.up.railway.app/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (res.status === 401 || res.ok) {
        try {
          await handleSetUser(setUser);

          navigate("/login");
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [navigate, setUser]);
}
