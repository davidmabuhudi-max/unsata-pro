export default function FilterDropdown({
    value,
    onChange,
}) {

    return (

        <select
            value={value}
            onChange={(e)=>onChange(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B3D91]"
        >

            <option value="All">
                All
            </option>

            <option value="Pending">
                Pending
            </option>

            <option value="Approved">
                Approved
            </option>

            <option value="Rejected">
                Rejected
            </option>

        </select>

    );

}