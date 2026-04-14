import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Offers() {
  return (
    <Container>
      <div className="d-flex align-items-center gap-3 overflow-hidden flex-wrap my-5 py-5">
        <div className="box-NonSofa rounded-5 overflow-hidden align-content-center px-5">
          <span className="text-primary fw-bold fs-5">Discount 30%</span>
          <h2 className="m-0 fw-bold">Curabitur Non Sofa</h2>
          <p className="text-secondary m-0">
            Premium fabrics, solid hardwood frames, and timeless silhouettes —
            built to last a lifetime
          </p>
          <Link to="/shop" className="btn btn-primary mt-2 px-4">
            Shop Now
          </Link>
        </div>
        <div className="box-ArmChair align-content-center rounded-5 overflow-hidden px-4">
          <span className="text-primary fw-bold fs-5">Discount 30%</span>
          <h2 className="m-0 fw-bold">Crescent ArmChair</h2>
          <p className="text-secondary m-0 w-75">
            Timeless comfort, effortless elegance.
          </p>
          <Link to="/shop" className="btn btn-primary mt-2 px-4">
            Shop Now
          </Link>
        </div>
      </div>
    </Container>
  );
}
