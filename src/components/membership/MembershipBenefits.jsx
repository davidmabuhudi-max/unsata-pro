import membership from "../../data/membership";

export default function MembershipBenefits(){

return(

<section className="py-24 bg-white">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-5xl font-black text-center text-[#0B3D91]">

Membership Benefits

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

{membership.benefits.map((item,index)=>(

<div
key={index}
className="bg-slate-100 rounded-2xl p-8 text-center"
>

{item}

</div>

))}

</div>

</div>

</section>

);

}