import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(props.count || 1);

  useEffect(() => {
    props.setCount(+btn);
    if (+btn < 0 || btn === "") {
      setBtn(0);
    } else if (props.stock) {
      if (+btn > props.stock) {
        setBtn(props.stock);
      }
    }

    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  return (
    <div className="d-flex align-items-center gap-2 w-100">
      <button
        className="btn btn-primary fw-bold py-1 px-2"
        onClick={() => {
          if (+btn > 0) {
            setBtn((prev) => prev - 1);
          } else {
            setBtn(0);
          }
        }}
        disabled={+btn === 0}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <input
        type="number"
        value={btn}
        onChange={(e) => setBtn(e.target.value)}
        style={{ width: "60px" }}
        className="ps-2 border border-secondary rounded-2"
      />
      <button
        className="btn btn-primary fw-bold py-1 px-2"
        onClick={() => setBtn((prev) => ++prev)}
        disabled={+btn === props.stock}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
