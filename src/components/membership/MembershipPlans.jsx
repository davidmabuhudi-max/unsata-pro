import membership from "../../data/membership";
import { Link } from "react-router-dom";

export default function MembershipPlans(){

return(

<section className="py-24 bg-slate-50">

<div className="max-w-4xl mx-auto px-6">

{membership.plans.map(plan=>(

<div
key={plan.id}
className="bg-white rounded-3xl shadow-xl p-10 text-center"
>

<h2 className="text-4xl font-black text-[#0B3D91]">

{plan.name}

</h2>

<p className="mt-6 text-5xl font-black">

{plan.fee}

</p>

<p className="mt-4 text-gray-600">

{plan.duration}

</p>

<Link
to="/membership/apply"
className="
mt-10
inline-block
bg-[#0B3D91]
text-white
px-10
py-4
rounded-xl
hover:bg-[#1565C0]
transition
"
>

Apply Now

</Link>

</div>

))}

</div>

</section>

);

}