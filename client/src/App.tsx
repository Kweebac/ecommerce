import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import Home from "./components/Home";
import Header from "./components/Header";
import { createContext, useEffect, useState } from "react";
import { useHandleSetUser } from "./components/Hooks";

export const UserContext = createContext<{
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
}>({
  user: null,
  setUser: () => {},
});

export default function App() {
  const handleSetUser = useHandleSetUser();
  const [user, setUser] = useState<object | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    handleSetUser(setUser);
    setRun(true);
  }, [setRun]);

  if (run)
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    );
}
