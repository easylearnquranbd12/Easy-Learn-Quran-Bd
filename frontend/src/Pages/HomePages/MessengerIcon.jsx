import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

const MessengerIcon = () => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">

      {/* 🔥 WhatsApp */}
      <a
        href="https://wa.me/+8801518-494454" // 👉 তোমার নাম্বার বসাও
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* 🔥 Messenger */}
      <a
        href="https://www.facebook.com/Easylearnquranbd"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
      >
        <FaFacebookMessenger size={24} />
      </a>

    </div>
  );
};

export default MessengerIcon;