import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { label: "Sort by name(A-Z)", value: "asc-name" },
          { label: "Sort by name(Z-A)", value: "desc-name" },
          { label: "Sort by price(Low first)", value: "asc-regularPrice" },
          { label: "Sort by price(High first)", value: "desc-regularPrice" },
          { label: "Sort by capacity(Low first)", value: "asc-maxCapacity" },
          { label: "Sort by capacity(High first)", value: "desc-maxCapacity" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
