import Landing from "./Landind";
import Featuries from "../../../../Components/Website/Home/features/Featuries";
import LatestSaleProduct from "../../../../Components/Website/Home/Products/SaleProducts/LatestSaleProduct";
import Offers from "../Offers";
import ShowTopRated from "../../../../Components/Website/Home/Products/TopRated/ShowTopRated";
import LatestProducties from "../../../../Components/Website/Home/Products/LatestProducts/LatestProducts";
import { Container } from "react-bootstrap";
import "./home.css";

export default function Home() {
  return (
    <>
      <Landing />
      <Featuries />
      <LatestSaleProduct iconEye={true} />
      <Offers />
      <Container className="d-flex align-items-start flex-wrap  p-0">
        <ShowTopRated />
        <LatestProducties />
      </Container>
    </>
  );
}
