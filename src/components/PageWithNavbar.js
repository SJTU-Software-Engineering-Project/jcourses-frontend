import { Outlet } from "react-router";


export default function PageWithNavbar() {

  return (
    <div>
      <nav>

      </nav>
      <Outlet />
    </div>
  );
}