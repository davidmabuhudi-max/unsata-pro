import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import logo from "../../assets/logo/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#021938] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1 */}

          <div>

            <img
              src={logo}
              alt="UNSATA Logo"
              className="w-20"
            />

            <h2 className="mt-5 text-3xl font-black">

              UNSATA

            </h2>

            <p className="mt-4 text-blue-100 leading-8">

              University Nursing Students
              Association of Tanzania.

            </p>

            <p className="mt-5 text-cyan-300 font-semibold">

              Wisdom Forever

            </p>

          </div>

          {/* Column 2 */}

          <div>

            <h3 className="text-xl font-bold">

              Quick Links

            </h3>

            <ul className="mt-6 space-y-3">

              <li><Link to="/">Home</Link></li>

              <li><Link to="/about">About</Link></li>

              <li><Link to="/leadership">Leadership</Link></li>

              <li><Link to="/events">Events</Link></li>

              <li><Link to="/gallery">Gallery</Link></li>

              <li><Link to="/membership">Membership</Link></li>

              <li><Link to="/contact">Contact</Link></li>

            </ul>

          </div>

          {/* Column 3 */}

          <div>

            <h3 className="text-xl font-bold">

              Contact

            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">

                <FaMapMarkerAlt className="mt-1 text-cyan-300" />

                <span>

                  Dar es Salaam,
                  Tanzania

                </span>

              </div>

              <div className="flex gap-3">

                <FaEnvelope className="mt-1 text-cyan-300" />

                <span>

                  info@unsata.or.tz

                </span>

              </div>

              <div className="flex gap-3">

                <FaPhone className="mt-1 text-cyan-300" />

                <span>

                  +255 XXX XXX XXX

                </span>

              </div>

            </div>

          </div>

          {/* Column 4 */}

          <div>

            <h3 className="text-xl font-bold">

              Follow Us

            </h3>

            <p className="mt-5 text-blue-100">

              Stay connected with the latest
              news, events and opportunities.

            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm">

          <p>

            © {new Date().getFullYear()} University Nursing Students Association of Tanzania (UNSATA). All Rights Reserved.

          </p>

          <p className="mt-4 md:mt-0">

            Designed & Developed by UNSATA ICT Team

          </p>

        </div>

      </div>

    </footer>
  );
}