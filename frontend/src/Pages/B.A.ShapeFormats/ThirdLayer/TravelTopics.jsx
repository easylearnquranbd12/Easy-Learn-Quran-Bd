import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiMapPin, FiMessageCircle } from "react-icons/fi"; // Travel + Remarks icons

const TravelTopics = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form Data:", data); // সব Travel Story + Remarks দেখাবে
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 text-center">
        Share Your Travel Stories
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 max-w-5xl mx-auto"
      >
        {/* Travel Story 1 */}
        <div className="form-control">
          <label className="label" htmlFor="story1">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Travel Story 1:
            </span>
          </label>
          <Controller
            name="story1"
            defaultValue=""
            control={control}
            rules={{
              required: "Travel story 1 is required.",
              minLength: { value: 10, message: "Minimum 10 characters" },
            }}
            render={({ field, fieldState }) => {
              const { error } = fieldState;
              return (
                <>
                  <div className="relative">
                    <div className="absolute left-0 inset-y-0 flex pl-3 items-center pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...field}
                      id="story1"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your travel story..."
                      aria-invalid={!!error}
                      aria-describedby="story1-feedback"
                    />
                  </div>
                  {error ? (
                    <p id="story1-feedback" className="text-red-500 text-sm mt-1 flex items-center">
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p id="story1-feedback" className="text-green-600 text-sm mt-1 flex items-center">
                      Story looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Remarks 1 */}
        <div className="form-control">
          <label className="label" htmlFor="remarks1">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Remarks 1:
            </span>
          </label>
          <Controller
            name="remarks1"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <div className="relative">
                <div className="absolute left-0 inset-y-0 flex pl-3 items-center pointer-events-none">
                  <FiMessageCircle className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  {...field}
                  id="remarks1"
                  className="w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Any remarks about your travel..."
                />
              </div>
            )}
          />
        </div>

        {/* Travel Story 2 */}
        <div className="form-control">
          <label className="label" htmlFor="story2">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Travel Story 2:
            </span>
          </label>
          <Controller
            name="story2"
            defaultValue=""
            control={control}
            rules={{
              required: "Travel story 2 is required.",
              minLength: { value: 10, message: "Minimum 10 characters" },
            }}
            render={({ field, fieldState }) => {
              const { error } = fieldState;
              return (
                <>
                  <div className="relative">
                    <div className="absolute left-0 inset-y-0 flex pl-3 items-center pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...field}
                      id="story2"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your travel story..."
                      aria-invalid={!!error}
                      aria-describedby="story2-feedback"
                    />
                  </div>
                  {error ? (
                    <p id="story2-feedback" className="text-red-500 text-sm mt-1 flex items-center">
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p id="story2-feedback" className="text-green-600 text-sm mt-1 flex items-center">
                      Story looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Remarks 2 */}
        <div className="form-control">
          <label className="label" htmlFor="remarks2">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Remarks 2:
            </span>
          </label>
          <Controller
            name="remarks2"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <div className="relative">
                <div className="absolute left-0 inset-y-0 flex pl-3 items-center pointer-events-none">
                  <FiMessageCircle className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  {...field}
                  id="remarks2"
                  className="w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200"
                  placeholder="Any remarks about your travel..."
                />
              </div>
            )}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-bgButton hover:bg-hoverBgButton text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TravelTopics;
