import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import Swal from "sweetalert2";
import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const EnrollPages = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      fullName: "",
      age: "",
      guardianName: "",
      email: "",
      phone: "",
      gender: "",
      whatsapp: "",
      course: "",
      address: "",
      description: "",
    },
  });

  // ✅ Mutation
  const createMutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post("/enroll/enroll", newData);
      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Enroll added successfully.",
        confirmButtonColor: "#145c43",
      });

      queryClient.invalidateQueries({
        queryKey: ["enroll"],
      });

      reset();
    },

    onError: (error) => {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to enroll.",
      });
    },
  });

  // ✅ Submit
  const onSubmit = (data) => {
    const payload = {
      ...data,
      user: {
        _id: user?._id,
        name: user?.displayName,
        email: user?.email,
        role: user?.role,
        photoURL: user?.photoURL,
      },
    };

    createMutation.mutate(payload);
  };

  // ✅ Input Style
  const inputClass = (error, value) =>
    `w-full pl-10 pr-3 py-3 border rounded-xl text-gray-700 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#145c43] ${
      error
        ? "border-red-500"
        : value
          ? "border-green-300"
          : "border-gray-300"
    }`;

  // ✅ Reusable Field
  const renderField = (
    name,
    label,
    icon,
    placeholder,
    rules = {},
    type = "text",
  ) => (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text text-base mb-1 font-semibold text-gray-700">
          {label}
        </span>
      </label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { error } = fieldState;
          const Icon = icon;

          return (
            <>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Icon className="h-5 w-5 text-[#145c43]" />
                </div>

                <input
                  {...field}
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  className={inputClass(error, field.value)}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-[#f7faf8] to-[#eef7f2] min-h-screen py-10 ">
      <Helmet>
        <title>Easy Learn Quran Bd | Enroll Pages</title>
      </Helmet>

      {/* TITLE */}
      <div className="max-w-[1400px] mx-auto">
        <TittleAnimation
          tittle="Enroll Now"
          subtittle="Enroll Now Easy Learn Free Quran Learn"
        />
      </div>

      {/* FORM */}
      <div className="max-w-[1200px] mx-auto mt-6">
        <div className="bg-white border border-[#dff3e9] rounded-[30px] shadow-2xl p-6 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Student Admission Form
            </h2>

            <p className="text-gray-500 mt-2">
              Fill all information correctly
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-5">

              {renderField(
                "fullName",
                "Student Name",
                FiUser,
                "Enter full name",
                {
                  required: "Student name is required",
                },
              )}

              {renderField(
                "age",
                "Student Age",
                FiUser,
                "Enter age",
                {
                  required: "Age is required",
                },
              )}

              {renderField(
                "guardianName",
                "Guardian Name",
                FiUser,
                "Enter guardian name",
              )}

              {/* GENDER */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base mb-1 font-semibold text-gray-700">
                    Gender
                  </span>
                </label>

                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145c43]/20"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  )}
                />
              </div>

              {renderField(
                "email",
                "Email Address",
                FiMail,
                "Enter email address",
                {
                  required: "Email is required",
                },
                "email",
              )}

              {renderField(
                "phone",
                "Phone Number",
                FiPhone,
                "Enter phone number",
                {
                  required: "Phone number is required",
                },
              )}

              {/* WHATSAPP */}
              {renderField(
                "whatsapp",
                "WhatsApp Number",
                FiPhone,
                "Enter WhatsApp number",
              )}

              {/* COURSE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base mb-1 font-semibold text-gray-700">
                    Course Select
                  </span>
                </label>

                <Controller
                  name="course"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145c43]/20"
                    >
                      <option value="">Select Course</option>

                      <option value="islamic-studies-for-kids-course">
                        Islamic Studies for Kids Course
                      </option>

                      <option value="quran-translation-course">
                        Quran Translation Course
                      </option>

                      <option value="quran-reading-course">
                        Quran Reading Course
                      </option>

                      <option value="tajweed">
                        Rules of Tajweed – Quran Recitation
                      </option>

                      <option value="hifz-ul-quran">
                        Quran Memorization Course (Hifz-ul-Quran)
                      </option>

                      <option value="arabic-for-beginners-noorani-qaida">
                        Arabic For Beginners – Noorani Qaida
                      </option>
                    </select>
                  )}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base mb-1 font-semibold text-gray-700">
                  Address
                </span>
              </label>

              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Enter address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145c43]/20"
                  />
                )}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base mb-1 font-semibold text-gray-700">
                  Description
                </span>
              </label>

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Write something..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145c43]/20"
                  />
                )}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] hover:scale-[1.01] transition-all duration-300 disabled:opacity-70"
            >
              {createMutation.isPending
                ? "Submitting..."
                : "Enroll Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollPages;