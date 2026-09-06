import { useEffect, useState } from "react";
import { updateMember } from "../../../services/memberService";

export default function EditMemberModal({
    open,
    member,
    onClose,
    refresh,
}) {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        university: "",
        programme: "",
        year: "",
        registrationNumber: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (member) {

            setForm({
                fullName: member.fullName || "",
                email: member.email || "",
                phone: member.phone || "",
                university: member.university || "",
                programme: member.programme || "",
                year: member.year || "",
                registrationNumber: member.registrationNumber || "",
            });

        }

    }, [member]);

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await updateMember(member.id, form);

            await refresh();

            onClose();

        } catch (err) {

            alert(err.message);

        } finally {

            setLoading(false);

        }

    }

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        Edit Member

                    </h2>

                    <button onClick={onClose}>✕</button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-5"
                >

                    <Input
                        label="Full Name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <Input
                        label="University"
                        name="university"
                        value={form.university}
                        onChange={handleChange}
                    />

                    <Input
                        label="Programme"
                        name="programme"
                        value={form.programme}
                        onChange={handleChange}
                    />

                    <Input
                        label="Academic Year"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                    />

                    <Input
                        label="Registration Number"
                        name="registrationNumber"
                        value={form.registrationNumber}
                        onChange={handleChange}
                    />

                    <div className="col-span-2 flex justify-end gap-3 mt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-[#0B3D91] text-white"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

function Input({

    label,

    name,

    value,

    onChange,

}) {

    return (

        <div>

            <label className="block text-sm font-medium mb-2">

                {label}

            </label>

            <input
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B3D91]"
            />

        </div>

    );

}