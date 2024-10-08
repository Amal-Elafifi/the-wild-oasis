import Table from "../../ui/Table";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations(){
return(
    <Table>
        <Filter filterField={"discount"} options={[
            {value: "all", label: "All"},
            {value: "with-discount", label: "With Discount"},
            {value: "no-discount", label: "No Discount"}
        ]}/>
        <SortBy options={[
            {value: "name-asc" , label: "Sort by name from(A-Z)"},
            {value: "name-desc", label: "Sort by name from (Z-A)"},
            {value: "maxCapacity-asc", label: "Sort by capacity(low first)"},
            {value: "maxCapacity-desc", label: "Sort by capacity (high first)"},
            {value: "regularPrice-asc", label: "Sort by price (low first)"},
            {value: "regularPrice-desc", label: "Sort by price (high first)"}
        ]}/>
    </Table>
)
}

export default CabinTableOperations;