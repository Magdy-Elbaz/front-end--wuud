import { useEffect, useState } from "react";
import { Axios } from "../../../../../Api/Axios";
import { LATEST } from "../../../../../Api/Api";
import SkeletonPage from "../../../SkeletonPage";
import ProductItem from "../ProductItem";

export default function LatestProducties() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    Axios.get(`${LATEST}`)
      .then((product) => setProducts(product.data))
      .finally(() => setLoding(false));
  }, []);

  const productsShow = products.map((pro, key) => (
    <ProductItem
      key={key}
      data={pro}
      sale={false}
      col={true}
      latestProduct={true}
      iconEye={true}
    />
  ));
  return (
    <div className="col-md-6 col-12 ps-3 my-5">
      <h1 className="m-0">Latest Products</h1>
      <div className="latest-products overflow-auto d-flex align-items-center justify-content-center flex-wrap mt-2">
        {loding ? (
          <SkeletonPage
            number={6}
            height={"331px"}
            width={"300px"}
            wrap={true}
          />
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
