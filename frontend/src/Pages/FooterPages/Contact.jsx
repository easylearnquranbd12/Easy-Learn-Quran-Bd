import Lottie from "lottie-react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiEdit3, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import contactAnimation from "../../../lottie-animation/contact.json";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const Contact = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required.";
    if (!formData.user_phone.trim()) newErrors.user_phone = "Phone is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("✅ Message sent successfully!");

    setFormData({
      user_name: "",
      user_phone: "",
      subject: "",
      message: "",
    });
  };

  const renderInput = (name, placeholder, Icon, type = "text") => (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium text-gray-700">
          {placeholder}
        </span>
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-3 text-gray-400" />

        <input
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          placeholder={`Enter your ${placeholder}`}
          className={`w-full pl-10 pr-3 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
            errors[name]
              ? "border-red-500 focus:ring-red-200"
              : formData[name]
              ? "border-green-400 focus:ring-green-200"
              : "border-gray-300 focus:ring-teal-200"
          }`}
        />
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div >
      <Helmet>
        <title>Easy Learn Quran BD | Contact</title>
      </Helmet>

      <div className="py-12 ">
        {/* 🔥 TITLE */}
        <div className="text-center mb-12">
          <TittleAnimation
            tittle="Contact Us"
            subtittle="Start Your Quran Learning Journey"
          />
        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">

          {/* 🎥 Lottie */}
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Lottie
                animationData={contactAnimation}
                className="w-full max-w-sm"
              />
            </div>
          </div>

          {/* 📩 FORM */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-xl space-y-5 border"
          >
            {renderInput("user_name", "Name", FiUser)}
            {renderInput("user_phone", "Mobile Number", FiPhone)}
            {renderInput("subject", "Subject", FiEdit3)}

            {/* MESSAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Message
                </span>
              </label>

              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className={`w-full pl-10 pr-3 py-3 rounded-lg border h-32 resize-none transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500 focus:ring-red-200"
                      : formData.message
                      ? "border-green-400 focus:ring-green-200"
                      : "border-gray-300 focus:ring-teal-200"
                  }`}
                />
              </div>

              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* 🔥 BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;