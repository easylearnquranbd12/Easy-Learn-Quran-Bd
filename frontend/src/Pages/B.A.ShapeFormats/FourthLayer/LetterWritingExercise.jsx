import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiHelpCircle, FiMessageCircle } from "react-icons/fi"; // icons

const LetterWritingExercise = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form Data:", data); 
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 text-center">
        Let me help you write a letter
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 max-w-5xl mx-auto"
      >
        {/* Story Tittle */}
        <div className="form-control">
          <label className="label" htmlFor="letterTitle">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Letter Title :
            </span>
          </label>
          <Controller
            name="letterTitle"
            defaultValue=""
            control={control}
            rules={{
              required: "Letter Title is required.",
              minLength: {
                value: 5,
                message: "Letter Title must be at least 5 characters long.",
              },
            }}
            render={({ field, fieldState }) => {
              const { error } = fieldState;
              return (
                <>
                  <div className="relative">
                    <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                      <FiHelpCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...field}
                      id="letterTitle"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your letter title..."
                      aria-invalid={!!error}
                      aria-describedby="letterTitle-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="letterTitle-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="letterTitle-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Letter Title looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Story Description */}
        <div className="form-control">
          <label className="label" htmlFor="letterDescription">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Letter Description:
            </span>
          </label>
          <Controller
            name="letterDescription"
            defaultValue=""
            control={control}
            rules={{
              required: "Letter Description is required.",
              minLength: {
                value: 2,
                message: "Letter Description must be at least 2 characters long.",
              },
            }}
            render={({ field, fieldState }) => {
              const { error } = fieldState;
              return (
                <>
                  <div className="relative">
                    <div className="absolute left-0 inset-y-0 flex pt-3 pl-3 pointer-events-none">
                      <FiMessageCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...field}
                      id="letterDescription"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your letter description..."
                      aria-invalid={!!error}
                      aria-describedby="letterDescription-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="letterDescription-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="letterDescription-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Letter Description looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Submit */}
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

export default LetterWritingExercise;
