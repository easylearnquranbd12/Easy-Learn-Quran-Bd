import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiHelpCircle, FiMessageCircle } from "react-icons/fi"; // icons

const InputInterviewsQustion = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form Data:", data); // এখানে সব Question+Answer দেখাবে
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 text-center">
        Before Going to Personal life in your Interviews
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 max-w-5xl mx-auto"
      >
        {/* Question 1 */}
        <div className="form-control">
          <label className="label" htmlFor="question1">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Question 1 :
            </span>
          </label>
          <Controller
            name="question1"
            defaultValue=""
            control={control}
            rules={{
              required: "Question 1 is required.",
              minLength: {
                value: 5,
                message: "Question must be at least 5 characters long.",
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
                      id="question1"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your question..."
                      aria-invalid={!!error}
                      aria-describedby="question1-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="question1-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="question1-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Question looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Answer 1 */}
        <div className="form-control">
          <label className="label" htmlFor="answer1">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Answer 1:
            </span>
          </label>
          <Controller
            name="answer1"
            defaultValue=""
            control={control}
            rules={{
              required: "Answer 1 is required.",
              minLength: {
                value: 2,
                message: "Answer must be at least 2 characters long.",
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
                      id="answer1"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your answer..."
                      aria-invalid={!!error}
                      aria-describedby="answer1-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="answer1-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="answer1-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Answer looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Question 2 */}
        <div className="form-control">
          <label className="label" htmlFor="question2">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Question 2 :
            </span>
          </label>
          <Controller
            name="question2"
            defaultValue=""
            control={control}
            rules={{
              required: "Question 2 is required.",
              minLength: {
                value: 5,
                message: "Question must be at least 5 characters long.",
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
                      id="question2"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your question..."
                      aria-invalid={!!error}
                      aria-describedby="question2-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="question2-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="question2-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Question looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Answer 2 */}
        <div className="form-control">
          <label className="label" htmlFor="answer2">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Answer 2:
            </span>
          </label>
          <Controller
            name="answer2"
            defaultValue=""
            control={control}
            rules={{
              required: "Answer 2 is required.",
              minLength: {
                value: 2,
                message: "Answer must be at least 2 characters long.",
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
                      id="answer2"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your answer..."
                      aria-invalid={!!error}
                      aria-describedby="answer2-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="answer2-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="answer2-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Answer looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Question 3 */}
        <div className="form-control">
          <label className="label" htmlFor="question3">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Question 3 :
            </span>
          </label>
          <Controller
            name="question3"
            defaultValue=""
            control={control}
            rules={{
              required: "Question 3 is required.",
              minLength: {
                value: 5,
                message: "Question must be at least 5 characters long.",
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
                      id="question3"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your question..."
                      aria-invalid={!!error}
                      aria-describedby="question3-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="question3-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="question3-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Question looks good
                    </p>
                  ) : null}
                </>
              );
            }}
          />
        </div>

        {/* Answer 3 */}
        <div className="form-control">
          <label className="label" htmlFor="answer3">
            <span className="label-text text-base mb-1 font-medium text-gray-700">
              Answer 3:
            </span>
          </label>
          <Controller
            name="answer3"
            defaultValue=""
            control={control}
            rules={{
              required: "Answer 3 is required.",
              minLength: {
                value: 2,
                message: "Answer must be at least 2 characters long.",
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
                      id="answer3"
                      className={`w-full pl-10 pr-3 py-3 border rounded-md text-gray-700 transition-colors hover:border-purple-300 focus:outline-none focus:ring-1 focus:ring-green-200 ${
                        error
                          ? "border-red-500"
                          : field.value
                          ? "border-green-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Write your answer..."
                      aria-invalid={!!error}
                      aria-describedby="answer3-feedback"
                    />
                  </div>

                  {error ? (
                    <p
                      id="answer3-feedback"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      {error.message}
                    </p>
                  ) : field.value ? (
                    <p
                      id="answer3-feedback"
                      className="text-green-600 text-sm mt-1 flex items-center"
                    >
                      Answer looks good
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

export default InputInterviewsQustion;
