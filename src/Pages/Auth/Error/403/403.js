import { Link } from "react-router-dom";
import "./403.css";

export default function Err403() {
  return (
    <div className="position-relative flex-grow-1">
      <div className="page-403">
        <div className="lock"></div>
        <div className="message">
          <h1>Access to this page is restricted</h1>
          <p className="text-center">
            Oops, You don't have permission to access this page.
          </p>
        </div>
        <Link to={"writer"} className="btn btn-primary w-75">
          Go To Writer Page
        </Link>
      </div>
    </div>
  );
}
