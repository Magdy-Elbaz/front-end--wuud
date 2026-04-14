import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { CATEGORIES, LOGOUT, USER } from "../../../Api/Api";
import { useEffect, useRef, useState } from "react";
import Cookie from "cookie-universal";
import { Axios } from "../../../Api/Axios";
import BtnSubmit from "../../Dashboard/BtnSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCartShopping,
  faCircleUser,
  faMagnifyingGlass,
  faTableColumns,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./navBar.css";
import { Container, Form } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonPage from "../SkeletonPage";
import CartShop from "../CartShop/CartShop";

export default function NavBar() {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const nav = useNavigate();

  // Global State
  const [loding, setLoding] = useState(true);
  const [lodingLogout, setLodingLogout] = useState(false);
  const [user, setUser] = useState([]);
  const [catigories, setCatigoies] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  // const [loding, setLoding] = useState(true);

  useEffect(() => {
    token && Axios.get(`${USER}`).then((data) => setUser(data.data));
  }, [token]);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((data) => setCatigoies(data.data.slice(-8)))
      .finally(() => setLoding(false));
  }, []);

  const catigoryShow = catigories.map((cat, index) => (
    <NavLink
      to={`/category/${cat.id}`}
      key={index}
      className="text-nowrap cursor-pointer text-light text-decoration-none"
    >
      {StringSlice(cat.title, 15)}
    </NavLink>
  ));

  const role =
    user.role === "1995"
      ? "Admin"
      : user.role === "1999"
        ? "Product Manger"
        : "User";

  // Ref
  const iconRef = useRef();

  async function handleLogout() {
    setLodingLogout(true);
    try {
      await Axios.get(`/${LOGOUT}`);
      setLoding(true);
      iconRef.current.style.display = "none";
      cookie.remove("Bearer");
      nav("/");
    } catch (err) {
      console.log(err);
    }
  }

  function handleClickIcon() {
    if (iconRef.current.style.display === "block") {
      iconRef.current.style.display = "none";
    } else {
      iconRef.current.style.display = "block";
    }
  }

  function handleOpenCart() {
    if (iconRef.current.style.display === "block") {
      iconRef.current.style.display = "none";
    }
    setOpenCart((prev) => !prev);
  }

  return (
    <>
      <div className="navbar bg-primary">
        <CartShop open={openCart} setOpen={setOpenCart} />
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100">
            <Link to="/">
              <img
                src="https://themes.codezion.com/tm/html/wuud/assets/images/logo.png"
                alt=""
              />
            </Link>
            <div className="position-relative d-flex align-items-center col-12 col-md-6 order-md-2 order-3 mb-3 mb-md-0">
              <Form.Control
                className="input-search"
                type="search"
                placeholder="Search for Products..."
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="icon-search position-absolute text-light"
              />
            </div>
            <div className="d-flex align-items-center gap-2 order-md-3 order-2">
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-light cursor-pointer fs-4"
                  onClick={handleOpenCart}
                />
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-light cursor-pointer fs-3"
                  onClick={handleClickIcon}
                />
              </div>
              <div className="links-menu position-absolute" ref={iconRef}>
                <div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="text-secondary fs-3"
                  />
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="m-0">{user.name || "UserName"}</h5>
                      <span className="condition bg-primary text-light">
                        {role}
                      </span>
                    </div>
                    <p className="m-0">{user.email || "Email"}</p>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-column gap-2 mb-2">
                  <Link
                    to="/"
                    className="btn p-2 text-start menu-link"
                    onClick={handleClickIcon}
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </Link>
                  {user.role !== "2001" && (
                    <Link
                      to="/dashboard"
                      className="btn p-2 text-start menu-link"
                      onClick={handleClickIcon}
                      style={{ border: "none" }}
                    >
                      <FontAwesomeIcon icon={faTableColumns} /> Dashboard
                    </Link>
                  )}
                  {!token && (
                    <>
                      <hr />
                      <div className="links-auth">
                        <Link
                          to="/login"
                          className="btn btn-light w-50"
                          onClick={handleClickIcon}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="btn btn-primary w-50"
                          onClick={handleClickIcon}
                        >
                          Register
                        </Link>
                      </div>
                    </>
                  )}
                </div>
                {token && (
                  <>
                    <hr />
                    <div onClick={handleLogout}>
                      <BtnSubmit
                        loding={lodingLogout}
                        name="Logout"
                        width="100%"
                        noCenter={true}
                        className="text-danger menu-link"
                        colorLoding={"#dc3545"}
                        icon={faArrowRightFromBracket}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="catigory-nav">
        <Container>
          <div className="d-flex align-items-center justify-content-between gap-4 py-1 overflow-auto">
            {loding ? (
              <SkeletonPage number={8} height={"12px"} width={"120px"} />
            ) : (
              catigoryShow
            )}
            <Link to="/catigories" className="text-nowrap">
              Show All
            </Link>
          </div>
        </Container>
      </div>
      <Outlet />
    </>
  );
}
