import { FaInstagram, FaLinkedin, FaGithub, FaFacebook, FaHeart } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/ahme_dfadl/",
      color: "hover:text-pink-500"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/ahmed-fadl-753b84319/",
      color: "hover:text-blue-600"
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/ahmedfadl156",
      color: "hover:text-gray-800"
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: "https://www.facebook.com/ahmed.fadl.571249/",
      color: "hover:text-blue-500"
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col items-center space-y-6">
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">تقوى</h3>
            <p className="text-gray-300 text-sm">رفيقك الروحاني في رحلة الإيمان</p>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-125 hover:-translate-y-1`}
                aria-label={social.name}
              >
                <div className="text-2xl p-3 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>

          <div className="text-center border-t border-gray-700 pt-6 w-full">
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <span>تم التطوير بكل</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>بواسطة</span>
              <span className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
                أحمد فضل
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              © {new Date().getFullYear()} جميع الحقوق محفوظة
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
