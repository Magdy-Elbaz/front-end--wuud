import { Container } from "react-bootstrap";
import { FeatureData } from "./FeatureData";
import FeatureItem from "./FeatureItem";

export default function Featuries() {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-center gap-4 justify-content-md-between flex-wrap py-5 my-5">
        {FeatureData.map((item, index) => (
          <FeatureItem
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}
