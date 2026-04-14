import Cookie from "cookie-universal";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RequireBack() {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // لو مفيش history يروح على الهوم
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate("/", { replace: true });
      }
    }
  }, []);

  return token ? null : <Outlet />;
}
