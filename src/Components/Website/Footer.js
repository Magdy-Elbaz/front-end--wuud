import { Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Outlet />
      <div className="p-2 border-top border-secondary">
        <Container>
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
            <p className="m-0 text-secondary">
              @Copyright 2026.{" "}
              <Link to="/" className="text-decoration-none me-1">
                Wuud.com
              </Link>
              All Rights Reserved.
            </p>
            <p className="m-0">
              Developed by:
              <span className="text-primary"> Magdy Elbaz</span>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
