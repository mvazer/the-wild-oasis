import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("sortBy") || options[0].value;
  function changeHandler(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} onChange={changeHandler} value={value} type={'white'} />;
}

export default SortBy;
