import { useEffect, useState } from "react";
import { Axios } from "../../../../../Api/Axios";
import { TopRated } from "../../../../../Api/Api";
import SkeletonPage from "../../../SkeletonPage";
import ProductItem from "../ProductItem";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    Axios.get(`${TopRated}`)
      .then((product) => setProducts(product.data))
      .finally(() => setLoding(false));
  }, []);

  const productsShow = products.map((pro, key) => (
    <ProductItem
      key={key}
      data={pro}
      col={false}
      sale={false}
      iconEye={true}
      latestProduct={false}
    />
  ));
  return (
    <div className=" col-md-6 col-12 border border-primary border-3 my-5">
      <h1 className="text-light bg-primary text-center fw-bold p-2">
        Top Rated
      </h1>
      <div className="p-1 top-rated overflow-auto">
        {loding ? (
          <SkeletonPage
            number={5}
            height={"117px"}
            width={"100%"}
            wrap={true}
          />
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
