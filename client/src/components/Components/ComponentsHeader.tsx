import { Outlet } from "react-router-dom";

export default function ComponentsHeader() {
  return (
    <>
      <div>Header</div>

      <Outlet />
    </>
  );
}
