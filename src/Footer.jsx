import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/about" className="hover:text-gray-400">About</a></li>
            <li><a href="/pricing" className="hover:text-gray-400">Pricing</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        {/* Find Us On */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Find Us On</h2>
          <div className="flex flex-col items-center md:items-start space-y-3">
            <a href="#" className="hover:text-gray-400 flex items-center gap-2"><FaFacebook /> Facebook</a>
            <a href="#" className="hover:text-gray-400 flex items-center gap-2"><FaTwitter /> Twitter</a>
            <a href="#" className="hover:text-gray-400 flex items-center gap-2"><FaInstagram /> Instagram</a>
            <a href="#" className="hover:text-gray-400 flex items-center gap-2"><FaLinkedin /> LinkedIn</a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>Email: <a href="mailto:support@FinNance.com" className="text-gray-400 hover:text-gray-300">support@FinNance.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-gray-400 hover:text-gray-300">+254 742 171 443</a></p>
          <p className="mt-4 text-sm text-gray-400">© {new Date().getFullYear()} FinNance. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
