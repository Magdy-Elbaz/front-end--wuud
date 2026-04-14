import {
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { useEffect, useState } from "react";
import Loding from "../Loding/Loding";
import PaginatedItems from "./Pagination/Pagination";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
  // Global State
  const [lodingDelet, setLodingDelete] = useState(false);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchDate, SetSearchDate] = useState("");
  const [searchLoding, setSearchLoding] = useState(false);
  const fillteredDate =
    searchDate.length !== 0
      ? props.data.filter(
          (item) => TransformDate(item.created_at) === searchDate,
        )
      : props.data;
  const fillteredSearchDate =
    searchDate.length !== 0
      ? filteredData.filter(
          (item) => TransformDate(item.created_at) === searchDate,
        )
      : filteredData;
  const showSearchDate = fillteredSearchDate.slice(
    (props.page - 1) * props.limit,
    props.page * props.limit,
  );
  const showWhichData = search.length > 0 ? showSearchDate : fillteredDate;
  const total =
    search.length === 0 && searchDate.length === 0
      ? props.totalData
      : search.length === 0 ? fillteredDate.length : fillteredSearchDate.length;

  // handle Search
  async function handleSearch() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`,
      );
      setFilteredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoding(false);
    }
  }

  // Handle Delete User
  async function handleDelete(id) {
    setId(id);
    setLodingDelete(true);
    try {
      await Axios.delete(`${props.delete}/${id}`);
      setLodingDelete(false);
      props.render((prev) => !prev);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    setSearchLoding(true);
    const debounce = setTimeout(() => {
      search.length > 0 ? handleSearch() : setSearchLoding(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  const currentUser = props.currentUser || { email: "" };

  const headerShow = props.header.map((item, key) => (
    <th key={key} className="bg-primary text-light">{item.name}</th>
  ));

  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((head, index) => (
        <td key={index}>
          {head.key === "image" ? (
            <img width={"50px"} height={"50px"} src={item[head.key]} alt="" />
          ) : head.key === "images" ? (
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {item[head.key].map((img, key) => (
                <img
                  key={key}
                  width={"40px"}
                  height={"40px"}
                  src={img.image}
                  alt=""
                />
              ))}
            </div>
          ) : head.key === "created_at" || head.key === "updated_at" ? (
            TransformDate(item[head.key])
          ) : item[head.key] === "1995" ? (
            "Admin"
          ) : item[head.key] === "2001" ? (
            "User"
          ) : item[head.key] === "1996" ? (
            "Writer"
          ) : item[head.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[head.key]
          )}
          {currentUser && item[head.key] === currentUser.email && " (You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              color="#0483cc"
              cursor={"pointer"}
              fontSize="19px"
            />
          </Link>
          {currentUser.email !== item.email &&
            (item.id === id ? (
              lodingDelet ? (
                <Loding action={true} />
              ) : (
                <FontAwesomeIcon
                  onClick={() => handleDelete(item.id)}
                  icon={faTrash}
                  color="red"
                  cursor="pointer"
                  fontSize="19px"
                />
              )
            ) : (
              <FontAwesomeIcon
                onClick={() => handleDelete(item.id)}
                icon={faTrash}
                color="red"
                cursor="pointer"
                fontSize="19px"
              />
            ))}
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="d-flex align-items-center gap-4 mb-3">
        <div className="d-flex w-50 align-content-center position-relative">
          <Form.Control
            type="input-search"
            placeholder={`Search By ${props.search}...`}
            className="px-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="icon-search position-absolute"
          />
        </div>
        <Form.Control
          type="date"
          className="px-2 w-50"
          value={searchDate}
          onChange={(e) => SetSearchDate(e.target.value)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="bg-primary text-light">id</th>
            {headerShow}
            <th className="bg-primary text-light">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loding ? (
            <tr>
              <td colSpan={12}>
                <div className="d-flex justify-content-center align-items-center position-relative">
                  <h6>Loding</h6>
                  <p className="m-0 loding-teble">
                    <span id="sp-1">.</span>
                    <span id="sp-2">.</span>
                    <span id="sp-3">.</span>
                  </p>
                </div>
              </td>
            </tr>
          ) : searchLoding ? (
            <tr>
              <td colSpan={12}>
                <div className="d-flex justify-content-center align-items-center position-relative gap-4">
                  <h6>Searching</h6>
                  <p className="m-0 loding-teble">
                    <span id="sp-1">.</span>
                    <span id="sp-2">.</span>
                    <span id="sp-3">.</span>
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div>
        {total > props.limit && (
          <div className="d-flex align-items-center justify-content-end px-3">
            <Form.Select
              aria-label="Default select example"
              style={{ width: "80px" }}
              onChange={(e) => props.setLimit(e.target.value)}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Form.Select>
            <PaginatedItems
              itemsPerPage={props.limit}
              setPage={props.setPage}
              total={total}
            />
          </div>
        )}
      </div>
    </>
  );
}
