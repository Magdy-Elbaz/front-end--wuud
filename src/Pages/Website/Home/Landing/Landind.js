import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="home">
      <Container>
        <div className="page-content d-flex align-items-center mb-5">
          <div>
            <h1 className="text-primary fw-bold">
              Where refined taste meets the art of living.
            </h1>
            <p className="pergraph-home text-light m-0 fs-5">
              We offer luxurious home furnishings that embody your elegance and
              reflect your personality—from living rooms to the finest details.
            </p>
            <p className="text-light fs-5">
              Exclusive designs | Exceptional quality | Service tailored to your
              needs
            </p>
            <div className="box-sale px-3 text-start">
              <h4 className="text-light">SALE UP TO</h4>
              <div className="d-flex align-items-center gap-2">
                <h4 className="text-primary fw-bold m-0">50%</h4>
                <h4 className="m-0 text-light">Off</h4>
              </div>
            </div>
            <Link to="/shop" className="btn btn-primary px-5 rounded-5 mt-4">
              Shop Now
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
