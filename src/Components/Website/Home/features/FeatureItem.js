import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeatureItem(props) {
  return (
    <div className="d-flex align-items-center gap-2" style={{width: "300px"}}>
      <FontAwesomeIcon className="bg-primary p-3 rounded-circle text-light fs-5" icon={props.icon} />
      <div>
        <h5 className="m-0 fw-bold">{props.title}</h5>
        <p className="text-secondary m-0">{props.description}</p>
      </div>
    </div>
  );
}
