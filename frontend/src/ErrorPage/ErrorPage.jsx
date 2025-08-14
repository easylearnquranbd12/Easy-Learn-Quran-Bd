import { Link } from "react-router-dom";

const ErrorPage = ({ code = 404, message = "Oops! Internal Server Error" }) => {
  const statusText =
    code === 404
      ? "The page you are looking for doesn't exist or has been moved."
      : "Something went wrong. Please try again later.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-6 text-center bg-gray-100">
      <h1 className="text-[100px] font-bold text-red-600 drop-shadow-sm">
        {code}
      </h1>
      <h2 className="text-3xl font-semibold text-gray-800">{message}</h2>
      <p className="mt-3 text-gray-600 max-w-md">{statusText}</p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300 ease-in-out"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
