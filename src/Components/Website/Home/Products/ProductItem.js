import {
  faEye,
  faStar as regularStar,
} from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../../../helpers/StringSlice";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  const saleProduct = ((props.data.discount / props.data.price) * 100).toFixed(
    1,
  );

  const roundStars = Math.round(props.data.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} className="text-warning" icon={faStar} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  function handleAddCart() {
    const getProduct = JSON.parse(localStorage.getItem("product")) || [];
    getProduct.push(props.data);
    localStorage.setItem("product", JSON.stringify(getProduct));
  }

  return (
    <div className={`${props.latestProduct && "col-md-6 col-12 pe-3 pb-3"}`}>
      <div
        className={`${props.col ? "border rounded-2" : "d-flex align-items-center gap-2 w-100 border-bottom"} ${props.latestProduct && "w-100"} border-secondary product-item p-2 position-relative`}
      >
        <img
          src={props.data.images.length > 0 && props.data.images[0].image}
          className={props.col ? "w-100" : "w-25 h-25"}
          alt=""
        />
        {props.sale && (
          <p className="sale m-0 bg-primary py-1 px-4 rounded-5 text-light position-absolute">
            {saleProduct}%
          </p>
        )}
        <div className={`${!props.col && "w-75"}`}>
          <h4 className="mt-1">{StringSlice(props.data.title, 15)}</h4>
          {props.col && <hr className="mb-0 mt-3" />}
          <div className="d-flex align-items-center justify-content-between mt-1">
            <div>
              <div className="d-flex align-items-center gap-1 mt-2">
                {showGoldStars}
                {showEmptyStars}
              </div>
              <div className="d-flex align-items-center gap-2">
                <p className="m-0 text-primary fs-4 fw-bold">
                  ${props.data.price - props.data.discount}
                </p>
                <span className="text-decoration-line-through">
                  ${props.data.price}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              {props.iconEye && (
                <Link to={`/product/${props.data.id}`}>
                  <FontAwesomeIcon icon={faEye} className="btn fs-5 p-1" />
                </Link>
              )}
              <button
                className={`btn ${props.col ? "p-1 px-3 btn-dark" : "p-1 btn-light"}`}
                onClick={handleAddCart}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
