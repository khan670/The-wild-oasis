import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By name (A to Z)" },
          { value: "name-desc", label: "Sort By name (Z to A)" },
          { value: "regularPrice-asc", label: "Sort By Price (low First)" },
          { value: "regularPrice-desc", label: "Sort By Price (high First)" },
          { value: "maxCapacity-asc", label: "Sort By Price (low first)" },
          { value: "minCapacity-desc", label: "Sort By Price (hign first)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
