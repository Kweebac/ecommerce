import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import Home from "./components/Home";
import Header from "./components/Header";
import ComponentsHeader from "./components/Components/ComponentsHeader";
import { createContext, useEffect, useState } from "react";
import { handleSetUser } from "./utils";
import URLError from "./components/URLError";
import CPU from "./components/Components/CPU/Table";
import GPU from "./components/Components/GPU/Table";
import Motherboard from "./components/Components/Motherboard/Table";
import RAM from "./components/Components/RAM/Table";
import Storage from "./components/Components/Storage/Table";
import PSU from "./components/Components/PSU/Table";
import OS from "./components/Components/OS/Table";
import Case from "./components/Components/Case/Table";
import CPUCooler from "./components/Components/CPUCooler/Table";
import Fans from "./components/Components/Fans/Table";
import Item from "./components/Components/GPU/Item";

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
            <Route path="motherboard" element={<Motherboard />} />
            <Route path="ram" element={<RAM />} />
            <Route path="storage" element={<Storage />} />
            <Route path="psu" element={<PSU />} />
            <Route path="os" element={<OS />} />
            <Route path="case" element={<Case />} />
            <Route path="cpu-cooler" element={<CPUCooler />} />
            <Route path="fans" element={<Fans />} />
            <Route path=":name/:id" element={<Item />} />
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
