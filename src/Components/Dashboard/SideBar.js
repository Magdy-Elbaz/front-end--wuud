import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menue } from "../../Context/MenueContext";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { link } from "./NavLink";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import "./bars.css";

export default function SideBar() {
  const context = useContext(Menue);
  const { windowSize } = useContext(WindowSize);
  // User
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        className="bg-side-bar-modile"
        style={{
          display:
            windowSize <= "768" ? (context.isOpen ? "block" : "none") : "none",
        }}
        onClick={() => {
          context.setIsOpen(false);
        }}
      ></div>
      <div
        className="Side-bar pt-2"
        style={{
          left: windowSize <= "768" ? (context.isOpen ? 0 : "-100%") : 0,
          minWidth: context.isOpen
            ? windowSize <= "768"
              ? "60%"
              : "15%"
            : "fit-content",
        }}
      >
        <Link to="/dashboard" className="mb-2 link-bashboard">
          <FontAwesomeIcon
            icon={faGrip}
            style={{ display: context.isOpen ? "none" : "" }}
          />
          <p
            className="m-0 text-primary"
            style={{
              display: context.isOpen ? "block" : "none",
            }}
          >
            - Dashboard -
          </p>
        </Link>
        {link.map(
          (nav, key) =>
            nav.role.includes(user.role) && (
              <NavLink
                to={nav.path}
                className={"d-flex align-items-center px-3 gap-2 side-bar-link text-secondary"}
                key={key}
              >
                <FontAwesomeIcon icon={nav.icon} />
                <p
                  className="m-0"
                  style={{
                    display: context.isOpen ? "block" : "none",
                  }}
                >
                  {nav.name}
                </p>
              </NavLink>
            ),
        )}
      </div>
    </>
  );
}
