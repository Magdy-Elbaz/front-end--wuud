import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";

const headerTable = [
  {
    key: "name",
    name: "UserName",
  },
  {
    key: "email",
    name: "Email",
  },
  {
    key: "role",
    name: "Role",
  },
  { key: "created_at", name: "Created" },
  { key: "updated_at", name: "Last Login" },
];

export default function Users() {
  // Users
  const [users, setUsers] = useState([]);

  // Global State
  const [currentUser, setCurrentUser] = useState([]);
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState();
  const [loding, setLoding] = useState(false);

  // Get Current User
  useEffect(() => {
    Axios.get(`/${USER}`).then((data) => setCurrentUser(data.data));
  }, []);

  // Get All Users
  useEffect(() => {
    setLoding(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotalData(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoding(false));
  }, [render, limit, page]);

  return (
    <>
      <div className="p-2">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="title-page text-secondary">
            Users Page <FontAwesomeIcon icon={faUsers} />
          </h2>
          <Link to="/dashboard/user/add" className="btn btn-primary">
            Add User
          </Link>
        </div>
        <TableShow
          limit={limit}
          page={page}
          setLimit={setLimit}
          setPage={setPage}
          totalData={totalData}
          header={headerTable}
          data={users}
          delete={USER}
          currentUser={currentUser}
          render={setRender}
          loding={loding}
          search="name"
          searchLink={USER}
        />
      </div>
    </>
  );
}
