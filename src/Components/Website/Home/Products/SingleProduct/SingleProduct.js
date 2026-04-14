import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../../Api/Axios";
import { CART, PRODUCT } from "../../../../../Api/Api";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import ScaletonSingleProduct from "./ScaletonSingleProduct";
import LatestSaleProduct from "../SaleProducts/LatestSaleProduct";
import PlusMinusBtn from "../../../Btns/PlusMinusBtn";
import { CartContext } from "../../../../../Context/CartShopContext";

export default function SingleProduct() {
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  const [loding, setLoding] = useState(true);
  const [lodingCart, setLodingCart] = useState(false);
  const [error, setError] = useState(false);
  const { setIsChange } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const { id } = useParams();

  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} className="text-warning" icon={faStar} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((pro) => {
        setProduct(pro.data[0]);
        setImages(
          pro.data[0].images.map((img) => {
            return {
              original: img.image,
              thumbnail: img.image,
            };
          }),
        );
      })
      .finally(() => setLoding(false));
  }, []);

  const checkstock = async () => {
    try {
      setLodingCart(true);
      const getProduct = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getProduct.filter((pro) => +pro.id === +id)?.[0]
        ?.count;
      console.log(productCount);
      await Axios.post(`${CART}/check`, {
        product_id: id,
        count: count + (productCount ? productCount : 0),
      });
      setError(false);
      return true;
    } catch (err) {
      console.log(err);
      setError(true);
      return false;
    } finally {
      setLodingCart(false);
    }
  };

  const handleAddCart = async () => {
    const check = await checkstock();
    if (check) {
      const getProducts = JSON.parse(localStorage.getItem("product")) || [];
      const productExist = getProducts.findIndex((pro) => pro.id === +id);

      if (productExist !== -1) {
        if (getProducts[productExist].count) {
          getProducts[productExist].count += count;
        }
      } else {
        if (count >= 1) {
          product.count = count;
        }
        getProducts.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getProducts));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <>
      <Container className="mt-5 p-0">
        {loding ? (
          <ScaletonSingleProduct />
        ) : (
          <div className="d-flex flex-wrap">
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                showIndex={true}
                autoPlay={true}
                disableSwipe={true}
                disableKeyDown={true}
                slideInterval={6000}
              />
            </div>
            <div className="col-lg-8 col-md-6 col-12 ps-3">
              <h1>{product.title}</h1>
              <p className="m-0 text-secondary">{product.About}</p>
              <h2>{product.description}</h2>
              <div className="mt-5">
                <hr className="mb-0 mt-3" />
                <div className="d-flex align-items-center justify-content-between mt-1">
                  <div>
                    {product.stock <= 5 && (
                      <p className="m-0 text-danger">
                        There is only {product.stock} left
                      </p>
                    )}
                    <div className="d-flex align-items-center gap-1 mt-2">
                      {showGoldStars}
                      {showEmptyStars}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <p className="m-0 text-primary fs-4 fw-bold">
                        ${product.price - product.discount}
                      </p>
                      <span className="text-decoration-line-through">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                  {product.stock > 0 ? (
                    <div className="w-50">
                      {error && (
                        <div
                          className="alert alert-danger d-flex align-items-center justify-content-between"
                          role="alert"
                        >
                          <p className="m-0">
                            Sorry, the requested quantity is not available.
                          </p>
                          <button
                            className="btn btn-close"
                            onClick={() => setError(false)}
                          />
                        </div>
                      )}
                      <div className="d-flex align-items-center gap-4">
                        <div className="w-50">
                          <PlusMinusBtn
                            setCount={(data) => setCount(data)}
                            stock={product.stock}
                          />
                        </div>
                        <button
                          className={`btn p-1 px-3 btn-dark `}
                          onClick={handleAddCart}
                          disabled={count === 0}
                        >
                          {lodingCart ? (
                            "Loding"
                          ) : (
                            <span>
                              Add To Cart
                              <FontAwesomeIcon icon={faCartShopping} />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="m-0 text-danger">
                      This product is currently unavailable
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <LatestSaleProduct iconEye={false} />
      </Container>
    </>
  );
}
