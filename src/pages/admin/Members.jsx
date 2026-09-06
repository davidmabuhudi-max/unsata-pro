import { useState } from "react";

import useMembers from "../../hooks/useMembers";

import LoadingSpinner from "../../components/admin/common/LoadingSpinner";

import EmptyState from "../../components/admin/common/EmptyState";

import MembersTable from "../../components/admin/members/MembersTable";

import MemberProfileDrawer from "../../components/admin/members/MemberProfileDrawer";

export default function Members(){

const{

members,

loading,

error,

refresh

}=useMembers();

const[selected,setSelected]=useState(null);

if(loading) return <LoadingSpinner/>;

if(error) return <p>{error}</p>;

return(

<div className="space-y-6">

<div>

<h1 className="text-3xl font-bold">

Members

</h1>

<p className="text-gray-500">

Manage all registered members.

</p>

</div>

{

members.length===0?

<EmptyState message="No members found."/>

:

<MembersTable

members={members}

onView={setSelected}

/>

}

{

selected&&

<MemberProfileDrawer

member={selected}

refresh={refresh}

onClose={()=>setSelected(null)}

/>

}

</div>

);

}