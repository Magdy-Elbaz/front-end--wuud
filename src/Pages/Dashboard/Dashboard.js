import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loding from "../../Components/Loding/Loding";
import "./dashboard.css";

export default function Dashboard() {
  const location = useLocation();

  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      {user === "" && <Loding />}
      <div className="position-relative w-100 dashboard d-flex gap-1 w-100">
        <SideBar />
        <div className="flex-grow-1">
          <TopBar />
          {location.pathname.toLocaleLowerCase() === "/dashboard" ? (
            <div className="dashboard-body">
              <h2 className="text-primary">Welcome To The Dashboard</h2>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
}
