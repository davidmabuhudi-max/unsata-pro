import SearchBar from "../common/SearchBar";
import FilterDropdown from "../common/FilterDropdown";

export default function ApplicationFilters({
  search,
  onSearch,
  status,
  onStatusChange,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-4">

      <div className="flex-1">
        <SearchBar
          value={search}
          onChange={onSearch}
        />
      </div>

      <FilterDropdown
        value={status}
        onChange={onStatusChange}
      />

    </div>
  );
}