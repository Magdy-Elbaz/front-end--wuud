import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, LOGIN } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import BtnSubmit from "../../../Components/Dashboard/BtnSubmit";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // states
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loding, setLoding] = useState(false);
  const [iconEye, setIconEye] = useState(false);

  // ref
  const inputOne = useRef(null);

  //   Handle Change Form
  function handleChangeForm(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  // Cookie
  const cookie = Cookie();

  //   Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoding(true);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, form);
      const token = res.data.token;
      cookie.set("Bearer", token);
      setLoding(false);
      window.location.pathname = "/";
    } catch (err) {
      setLoding(false);
      if (err.response.status === 401) {
        setErr("Wrong Email Or Password");
      } else {
        setErr("Internal Server Error");
      }
    }
  }

  // Handle Focus
  useEffect(() => {
    inputOne.current.focus();
  }, []);

  return (
    <>
      <Container>
        <div className="row">
          <Form className="form" onSubmit={handleSubmit}>
            <h1 className="text-secondary">Login Now</h1>
            <div className="custom-form">
              <Form.Group className="mb-3 form-custom">
                <Form.Control
                  id="email"
                  value={form.email}
                  onChange={handleChangeForm}
                  type="email"
                  placeholder="Enter Your Email ..."
                  ref={inputOne}
                  autoComplete="email"
                  required
                />
                <Form.Label htmlFor="email">Email :</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3 form-custom">
                <div className="position-relative d-flex align-items-center">
                  <Form.Control
                    id="password"
                    value={form.password}
                    onChange={handleChangeForm}
                    type={iconEye ? "text" : "password"}
                    placeholder="Enter Your Password ..."
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />
                  <Form.Label htmlFor="password">Password :</Form.Label>
                  <FontAwesomeIcon
                    icon={iconEye ? faEyeSlash : faEye}
                    className="icon-eye"
                    onClick={() => setIconEye((prev) => !prev)}
                  />
                </div>
              </Form.Group>
              <BtnSubmit loding={loding} name="Login" className="btn-Auth btn-primary" />
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                      alt=""
                    />
                  </div>
                  <p className="btnGoogle-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && (
                <span className="error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {err}
                </span>
              )}
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}
