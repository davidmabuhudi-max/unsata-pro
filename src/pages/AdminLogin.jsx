import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
);

const uid = credential.user.uid;

const adminRef = doc(db, "users", uid);

const adminSnap = await getDoc(adminRef);

if (!adminSnap.exists()) {

    await signOut(auth);

    throw new Error("Account not found.");

}

const userData = adminSnap.data();

if (userData.role !== "admin") {

    await signOut(auth);

    throw new Error("Unauthorized");

}

navigate("/admin/dashboard");

    }catch (err) {

    console.error(err);

    setError(err.message);

}

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10">

        <h1 className="text-4xl font-black text-center text-[#0B3D91]">

          Admin Login

        </h1>

        <p className="text-center text-gray-500 mt-4">

          UNSATA Content Management System

        </p>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border rounded-xl p-4"
          />

          {error && (

            <div className="bg-red-100 text-red-700 rounded-xl p-4">

              {error}

            </div>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B3D91] hover:bg-[#1565C0] text-white py-4 rounded-xl font-semibold"
          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

      </div>

    </section>
  );
}