import { FiInbox } from "react-icons/fi";

export default function EmptyState({

message="No data available."

}){

return(

<div className="bg-white rounded-2xl shadow p-20 text-center">

<FiInbox
size={55}
className="mx-auto text-gray-400"
/>

<h2 className="mt-5 text-xl font-semibold">

Nothing Found

</h2>

<p className="text-gray-500 mt-2">

{message}

</p>

</div>

);

}