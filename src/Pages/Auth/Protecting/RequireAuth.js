import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { USER } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import Err403 from "../Error/403/403";
import Err404 from "../Error/404/404";
import Loding from "../../../Components/Loding/Loding";

export default function RequireAuth({ allowedRole }) {
  // User
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // token & cookie
  const cookie = Cookie();
  const token = cookie.get("Bearer");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      {token ? (
        user === "" ? (
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <Loding />
          </div>
        ) : allowedRole.includes(user.role) ? (
          <Outlet />
        ) : user.role === "2001" ? (
          <Err404 />
        ) : (
          <Err403 />
        )
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
}
