import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex justify-center items-center bg-slate-600 ">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
