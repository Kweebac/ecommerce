import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import Home from "./components/Home";
import Header from "./components/Header";
import ComponentsHeader from "./components/Components/ComponentsHeader";
import CPU from "./components/Components/CPU";
import GPU from "./components/Components/GPU";
import { createContext, useEffect, useState } from "react";
import { handleSetUser } from "./utils";
import URLError from "./components/URLError";

export const UserContext = createContext<{
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
}>({
  user: null,
  setUser: () => {},
});

export default function App() {
  const [user, setUser] = useState<object | null>(null);
  const isLoggedIn = user !== null;

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      try {
        handleSetUser(setUser, abortController);
      } catch (error) {
        console.error(error);
      }

      return () => {
        abortController.abort();
      };
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route element={<Header />}>
          <Route index element={<Home />} />
          <Route path="components" element={<ComponentsHeader />}>
            <Route index element={<Navigate to="gpu" />} />
            <Route path="gpu" element={<GPU />} />
            <Route path="cpu" element={<CPU />} />
            <Route path="*" element={<URLError link="/components" />} />
          </Route>

          {isLoggedIn ? (
            <Route path="/logout" element={<Logout />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}

          <Route path="*" element={<URLError />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}
