import { useContext, useEffect, useState } from "react";
import StringSlice from "../../../helpers/StringSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SkeletonCart from "./SkeletonCart";
import { Button, Modal } from "react-bootstrap";
import PlusMinusBtn from "../Btns/PlusMinusBtn";
import { CartContext } from "../../../Context/CartShopContext";

export default function CartShop({ open, setOpen }) {
  const [Products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const { isChange, setIsChange } = useContext(CartContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProduct);
    setLoding(false);
  }, [isChange]);

  function handleDelete(id) {
    const filterProduct = Products.filter((pro) => pro.id !== id);
    localStorage.setItem("product", JSON.stringify(filterProduct));
    setIsChange((prev) => !prev);
  }

  const changeCount = (id, btnCount) => {
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProduct.find((pro) => pro.id === +id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProduct));
  };

  const showProduct = Products.map((pro, key) => (
    <div key={key} className="d-flex gap-2 my-2">
      {pro.count}
      <div className="w-50 h-50">
        <img src={pro.images[0].image} className="w-100 h-25" alt="" />
        <div className="w-100 mt-2">
          <PlusMinusBtn
            id={pro.id}
            count={pro.count}
            setCount={setCount}
            changeCount={changeCount}
            stock={pro.stock}
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between w-100">
        <div>
          <h4 className="m-0">{StringSlice(pro.title, 7)}</h4>
          <p className="m-0 text-secondary">{pro.description}</p>
          <div className="d-flex align-items-center gap-1">
            <h5 className="m-0 text-primary">${pro.price - pro.discount}</h5>
            <p className="m-0 text-decoration-line-through">{pro.price}</p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-danger cursor-pointer"
          onClick={() => handleDelete(pro.id)}
        />
      </div>
    </div>
  ));

  function handleDeletAll() {
    localStorage.removeItem("product");
    setShow(false);
    setIsChange((prev) => !prev);
  }

  return (
    open && (
      <>
        <div className="closeCart" onClick={() => setOpen(false)} />
        <div className="CartShop position-fixed col-md-3 col-12 bg-light px-2">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="m-0 fw-bold">Cart Shop</h2>
            <button
              className="btn btn-close py-1"
              onClick={() => setOpen(false)}
            />
          </div>
          <hr />
          {!loding ? (
            Products.length > 0 ? (
              <div className="overflow-auto" style={{ maxHeight: "80%" }}>
                {showProduct}
              </div>
            ) : (
              <p className="h-75 d-flex align-items-center text-center text-secondary">
                Your shopping cart is empty; no products have been added.
              </p>
            )
          ) : (
            <SkeletonCart num={5} />
          )}
          {Products.length > 0 && (
            <div className="d-flex align-items-center justify-content-center mt-4">
              <div className="border border-2 border-secondary w-100 p-2 rounded-2 d-flex align-items-center justify-content-between">
                <div className="d-flex gap-2">
                  <p className="m-0 fw-bold">Total:</p>
                  <span>0000</span>
                </div>

                <Button variant="danger" onClick={handleShow}>
                  Delete All
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete All</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Warning! All items will be permanently deleted. Do you want
                    to continue?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleDeletAll}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
}
