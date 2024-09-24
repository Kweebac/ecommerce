import { Navigate, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { handleSetUser } from "./utils";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import Home from "./components/Home";
import Header from "./components/Header";
import ComponentsHeader from "./components/Components/ComponentsHeader";
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
import GPUItem from "./components/Components/GPU/Item";
import CPUItem from "./components/Components/CPU/Item";
import MotherboardItem from "./components/Components/Motherboard/Item";
import RAMItem from "./components/Components/RAM/Item";
import StorageItem from "./components/Components/Storage/Item";
import PSUItem from "./components/Components/PSU/Item";
import CaseItem from "./components/Components/Case/Item";
import CPUCoolerItem from "./components/Components/CPUCooler/Item";
import FanItem from "./components/Components/Fans/Item";
import OSItem from "./components/Components/OS/Item";
import Footer from "./components/Footer";

export const UserContext = createContext<{
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const CartContext = createContext<{
  cart: Array | null;
  setCart: React.Dispatch<React.SetStateAction<Array | null>>;
}>({
  cart: [],
  setCart: () => {},
});

export default function App() {
  const [user, setUser] = useState<object | null>(null);
  const [cart, setCart] = useState<Array | null>([]);
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
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route element={<Header />}>
            <Route index element={<Home />} />
            <Route path="components" element={<ComponentsHeader />}>
              <Route index element={<Navigate to="gpu" />} />

              <Route path="gpu" element={<GPU />} />
              <Route path="gpu/:id" element={<GPUItem />} />

              <Route path="cpu" element={<CPU />} />
              <Route path="cpu/:id" element={<CPUItem />} />

              <Route path="motherboard" element={<Motherboard />} />
              <Route path="motherboard/:id" element={<MotherboardItem />} />

              <Route path="ram" element={<RAM />} />
              <Route path="ram/:id" element={<RAMItem />} />

              <Route path="storage" element={<Storage />} />
              <Route path="storage/:id" element={<StorageItem />} />

              <Route path="psu" element={<PSU />} />
              <Route path="psu/:id" element={<PSUItem />} />

              <Route path="case" element={<Case />} />
              <Route path="case/:id" element={<CaseItem />} />

              <Route path="cpu-cooler" element={<CPUCooler />} />
              <Route path="cpu-cooler/:id" element={<CPUCoolerItem />} />

              <Route path="fans" element={<Fans />} />
              <Route path="fans/:id" element={<FanItem />} />

              <Route path="os" element={<OS />} />
              <Route path="os/:id" element={<OSItem />} />

              <Route path="*" element={<URLError />} />
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

        <Footer />
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
