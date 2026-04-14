import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CATEGORIES } from "../../Api/Api";
import StringSlice from "../../helpers/StringSlice";
import SkeletonPage from "../../Components/Website/SkeletonPage";

export default function CatigoriesHome() {
  const [catigories, setCatigories] = useState([]);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((cat) => setCatigories(cat.data))
      .finally(() => setLoding(false));
  }, []);

  const catigoriesShow = catigories.map((cat, key) => (
    <div
      key={key}
      className="catigory-item d-flex align-items-center gap-3 bg-light p-2 cursor-pointer"
    >
      <img src={cat.image} width={"50px"} height={"30px"} alt="" />
      <p className="m-0">{StringSlice(cat.title, 12)}</p>
    </div>
  ));
  return (
    <div className="categories-wrapper d-flex align-items-center justify-content-center gap-4 flex-wrap py-5">
      {loding ? (
        <SkeletonPage
          number={30}
          height={"46px"}
          width={"250px"}
          gap={"gap-4"}
          wrap={true}
        />
      ) : (
        catigoriesShow
      )}
    </div>
  );
}
