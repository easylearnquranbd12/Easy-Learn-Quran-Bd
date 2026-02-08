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

    // Simple Validation
    const newErrors = {};
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required.";
    if (!formData.user_phone.trim())
      newErrors.user_phone = "Phone is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    toast.success(" Message sent!");

    setFormData({
      user_name: "",
      user_phone: "",
      subject: "",
      message: "",
    });
  };

  const renderInput = (name, placeholder, Icon, type = "text") => (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text text-base mb-1 font-medium text-gray-700">
          {placeholder} :
        </span>
      </label>
      <div className="relative">
        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
            errors[name]
              ? "border-red-500"
              : formData[name]
              ? "border-green-300"
              : "border-gray-300"
          }`}
          placeholder={`Enter Your ${placeholder}`}
        />
      </div>
      {errors[name] ? (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      ) : formData[name] ? (
        <p className="text-green-600 text-sm mt-1">{placeholder} looks good</p>
      ) : null}
    </div>
  );

  return (
    <div>
       <Helmet>
        <title>Be The Shape | contact</title>
      </Helmet>
    <div className="bg-white py-5 px-2 ">
      <div className="text-center mb-10">
        <TittleAnimation tittle="Contact Us" subtittle="Send Us a Message" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Lottie Animation */}
        <div className="flex justify-center">
          <Lottie
            animationData={contactAnimation}
            className="w-full max-w-md"
          />
        </div>

        {/* Styled Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          {renderInput("user_name", "Name", FiUser)}
          {renderInput("user_phone", "Mobile Number", FiPhone)}
          {renderInput("subject", "Subject", FiEdit3)}
          <div className="form-control">
            <label className="label" htmlFor="message">
              <span className="label-text text-base mb-1 font-medium text-gray-700">
                Message :
              </span>
            </label>
            <div className="relative">
              <div className="absolute left-0 inset-y-0 flex items-start pt-3 pl-3 pointer-events-none">
                <FiMessageSquare className="h-5 w-5 text-gray-400 mt-1" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 h-32 resize-none ${
                  errors.message
                    ? "border-red-500"
                    : formData.message
                    ? "border-green-300"
                    : "border-gray-300"
                }`}
                placeholder="Type Your Message"
              ></textarea>
            </div>
            {errors.message ? (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            ) : formData.message ? (
              <p className="text-green-600 text-sm mt-1">Message looks good</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn bg-[#1f4e43] btn-lg hover:bg-[#2e6e5f] text-white font-bold px-8 w-full"
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
