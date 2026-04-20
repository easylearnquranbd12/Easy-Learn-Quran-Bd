import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";

const EnrollPages = () => {
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => setLoading(false), 1500);
  };

  const inputClass = (error, value) =>
    `w-full pl-10 pr-3 py-2 border rounded-md text-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-green-200 ${
      error ? "border-red-500" : value ? "border-green-200" : "border-gray-300"
    }`;

  const renderField = (name, label, icon, placeholder, rules = {}) => (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text text-base mb-1 font-medium text-gray-700">
          {label} :
        </span>
      </label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field, fieldState }) => {
          const { error } = fieldState;
          const Icon = icon;

          return (
            <>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>

                <input
                  {...field}
                  id={name}
                  placeholder={placeholder}
                  className={inputClass(error, field.value)}
                />
              </div>

              {error ? (
                <p className="text-red-500 text-sm mt-1">
                  {error.message}
                </p>
              ) : field.value ? (
                <p className="text-green-600 text-sm mt-1">
                  {label} Valid
                </p>
              ) : null}
            </>
          );
        }}
      />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>Easy Learn Quran Bd | Enroll Pages</title>
      </Helmet>

      <div className="py-5 max-w-[1400px] mx-auto px-2">
        <TittleAnimation
          tittle="Enroll Now"
          subtittle="Enroll Now Easy Learn Free Quran Learn"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-3 py-8">

  {/* 🔥 Card Container */}
  <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-300 hover:shadow-2xl">

    {/* 🔹 Optional Header */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Student Admission Form
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Fill all information correctly
      </p>
    </div>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* 🔹 GRID */}
          <div className="grid md:grid-cols-2 gap-4">

            {renderField("fullName", "Student Name", FiUser, "Enter full name", {
              required: "Name is required",
            })}

            {renderField("age", "Student Age", FiUser, "Enter age", {
              required: "Age is required",
            })}

            {renderField("guardianName", "Guardian Name", FiUser, "Enter guardian name")}

            {renderField("guardianPhone", "Guardian Phone", FiPhone, "Enter guardian phone")}

            {renderField("email", "Email Address", FiMail, "Enter email", {
              required: "Email is required",
            })}

            {renderField("phone", "Phone Number", FiPhone, "Enter phone number", {
              required: "Phone is required",
            })}

            {/* Gender */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base mb-1 font-medium text-gray-700">
                  Gender :
                </span>
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full px-3 py-2 border rounded-md">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                )}
              />
            </div>

            {renderField("whatsapp", "WhatsApp", FiPhone, "Enter WhatsApp number")}

          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base mb-1 font-medium text-gray-700">
                Address :
              </span>
            </label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <textarea {...field} placeholder="Enter address" className="w-full px-3 py-2 border rounded-md" />
              )}
            />
          </div>

          {/* Course + Country */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base mb-1 font-medium text-gray-700">
                  Course Select :
                </span>
              </label>
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full px-3 py-2 border rounded-md">
                    <option value="">Select Course</option>
                    <option value="quran">Quran</option>
                    <option value="tajweed">Tajweed</option>
                  </select>
                )}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base mb-1 font-medium text-gray-700">
                  Country :
                </span>
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="Enter country" className="w-full px-3 py-2 border rounded-md" />
                )}
              />
            </div>
          </div>

          {/* City */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base mb-1 font-medium text-gray-700">
                City :
              </span>
            </label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <input {...field} placeholder="Enter city" className="w-full px-3 py-2 border rounded-md" />
              )}
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base mb-1 font-medium text-gray-700">
                Description :
              </span>
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea {...field} placeholder="Write something..." className="w-full px-3 py-2 border rounded-md" />
              )}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-700 text-white rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

        </form>
       </div>
      </div>
    </div>
  );
};

export default EnrollPages;