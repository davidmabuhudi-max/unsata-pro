import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">

          <img
            src={logo}
            alt="UNSATA Logo"
            className="w-14 h-14 object-contain"
          />

          <div>

            <h1 className="text-3xl font-extrabold tracking-wide text-[#0B3D91]">
              UNSATA
            </h1>

            <p className="text-sm text-gray-600 leading-5">
              University Nursing Students
              <br />
              Association of Tanzania
            </p>

          </div>

        </Link>

        {/* Navigation Menu */}

        <ul className="hidden lg:flex items-center gap-8 font-semibold text-gray-700">

          <li>
            <Link
              to="/"
              className="transition hover:text-[#1976D2]"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="transition hover:text-[#1976D2]"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/leadership"
              className="transition hover:text-[#1976D2]"
            >
              Leadership
            </Link>
          </li>

          <li>
            <Link
              to="/events"
              className="transition hover:text-[#1976D2]"
            >
              Events
            </Link>
          </li>

          <li>
            <Link
              to="/gallery"
              className="transition hover:text-[#1976D2]"
            >
              Gallery
            </Link>
          </li>

          <li>
            <Link
              to="/membership"
              className="transition hover:text-[#1976D2]"
            >
              Membership
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="transition hover:text-[#1976D2]"
            >
              Contact
            </Link>
          </li>

        </ul>

        {/* Right Side Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          
          <Link
            to="/membership"
            className="bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300"
          >
            Apply for membership
          </Link>

        </div>

      </div>
    </nav>
  );
}