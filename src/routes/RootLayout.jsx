import { Outlet } from "react-router";
import Header from "../components/header/Header.jsx";

export default function RootLayout() {
  return (
    <div className="page">
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
