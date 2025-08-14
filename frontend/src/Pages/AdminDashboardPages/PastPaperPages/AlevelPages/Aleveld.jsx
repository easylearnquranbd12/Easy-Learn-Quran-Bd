import { Building } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiPhone } from "react-icons/fi";

const Aleveld = () => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted", data);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500); // Mock API delay
  };

  const baseInputStyle =
    "w-full pl-10 pr-3 py-3 border-[1px] border-solid rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all";

  const baseSelectStyle =
    "w-full py-3 px-4 border-[1px] border-solid rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 transition-all";

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">A Level Post</h1>
      <div className="divider mb-5"></div>
      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Subject Dropdown */}
            <div className="form-control">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-1 block">
                Subject
              </label>
              <Controller
                name="subject"
                defaultValue=""
                control={control}
                rules={{ required: "Please select a subject." }}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      id="subject"
                      className={`${baseSelectStyle} ${
                        fieldState.error
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-indigo-100"
                      }`}
                    >
                      <option value="" disabled>
                        Select subject
                      </option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Year (Number input with icon) */}
            <div className="form-control">
              <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1 block">
                Year
              </label>
              <Controller
                name="year"
                defaultValue=""
                control={control}
                rules={{
                  required: "Year is required.",
                  pattern: {
                    value: /^\d{4}$/,
                    message: "Must be a 4-digit year",
                  },
                }}
                render={({ field, fieldState }) => {
                  const { error } = fieldState;
                  return (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...field}
                        id="year"
                        maxLength={4}
                        placeholder="Year"
                        aria-invalid={!!error}
                        className={`${baseInputStyle} ${
                          error
                            ? "border-red-500 focus:ring-red-200"
                            : field.value
                            ? "border-indigo-500 focus:ring-indigo-200"
                            : "border-gray-300 focus:ring-indigo-100"
                        }`}
                      />
                      {error ? (
                        <p className="text-red-500 text-sm mt-1">{error.message}</p>
                      ) : field.value ? (
                        <p className="text-green-600 text-sm mt-1">Year is valid</p>
                      ) : null}
                    </div>
                  );
                }}
              />
            </div>

            {/* Monthly Dropdown */}
            <div className="form-control">
              <label htmlFor="monthly" className="text-sm font-medium text-gray-700 mb-1 block">
                Month
              </label>
              <Controller
                name="monthly"
                defaultValue=""
                control={control}
                rules={{ required: "Please select a month." }}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      id="monthly"
                      className={`${baseSelectStyle} ${
                        fieldState.error
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-indigo-100"
                      }`}
                    >
                      <option value="" disabled>
                        Select Month
                      </option>
                      <option value="Jan/Feb">Jan/Feb</option>
                      <option value="Mar/Apr">Mar/Apr</option>
                      <option value="May/Jun">May/Jun</option>
                      <option value="Jul/Aug">Jul/Aug</option>
                      <option value="Sep/Oct">Sep/Oct</option>
                      <option value="Nov/Dec">Nov/Dec</option>
                    </select>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Institution Name */}
            <div className="form-control">
              <label htmlFor="institutionName" className="text-sm font-medium text-gray-700 mb-1 block">
                Institution Name (Optional)
              </label>
              <Controller
                name="institutionName"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...field}
                      id="institutionName"
                      placeholder="Your institution name"
                      className={`${baseInputStyle} border-gray-300 focus:ring-indigo-100`}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? (
              <div className="flex justify-center items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Creating Post...</span>
              </div>
            ) : (
              <span className="font-semibold text-md tracking-wider">Create Post</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Aleveld;
