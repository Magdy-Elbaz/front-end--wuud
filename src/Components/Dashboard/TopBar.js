import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menue } from "../../Context/MenueContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import "./bars.css";

export default function TopBar() {
  const context = useContext(Menue);
  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`).then((data) => setName(data.data.name));
  }, []);

  return (
    <div
      className={`Top-bar d-flex align-items-center justify-content-between bg-primary`}
    >
      <div className="d-flex align-items-center gap-2 text-light">
        <h3>{name}</h3>
        <FontAwesomeIcon
          cursor={"pointer"}
          icon={faBars}
          onClick={() => context.setIsOpen((prev) => !prev)}
        />
      </div>
      <div className="d-flex align-items-center gap-2">
        <Link to={"/"} className="btn btn-light text-primary">
          <FontAwesomeIcon icon={faHouseChimney} /> Home Page
        </Link>
      </div>
    </div>
  );
}
