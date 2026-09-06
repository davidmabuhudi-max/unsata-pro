import { FiSearch } from "react-icons/fi";

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search..."
}) {
    return (
        <div className="relative">

            <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#0B3D91]"
            />

        </div>
    );
}