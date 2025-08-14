import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminTestimonialsSection = () => {
  const { handleSubmit, control, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/authorInfo");
      return res.data;
    },
  });
  const createMutation = useMutation({
    mutationFn: (newData) => axiosPublic.post("/authorInfo", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["banners"]);
      Swal.fire("Success!", "Author info added successfully.", "success");
      reset();
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error?.response?.data?.message || "Failed to add author",
        "error"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/authorInfo/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Author info deleted.", "success");
      } else {
        Swal.fire("Failed", "Already deleted or not found.", "info");
      }
      queryClient.invalidateQueries(["banners"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete.", "error"),
  });

  const onSubmit = (data) => {
    if (banners.length >= 3) {
      Swal.fire(
        "Limit Exceeded",
        "You can only add up to 3 authors.",
        "warning"
      );
      return;
    }

    createMutation.mutate(data);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin | Author Info</title>
      </Helmet>

      <div className="flex flex-col items-center min-h-[80vh] py-6 space-y-8 px-4">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl border p-6">
          <h1 className="text-center text-xl font-semibold mb-6 text-primary">
            Add Author Info
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Author Name */}
            <Controller
              name="authorName"
              defaultValue=""
              control={control}
              rules={{
                required: "Author name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Author Name..."
                    className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Author Address */}
            <Controller
              name="authorAddress"
              defaultValue=""
              control={control}
              rules={{
                required: "Author address is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    placeholder="Author Address..."
                    className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              defaultValue=""
              control={control}
              rules={{
                required: "Description is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Author Description..."
                    className={`w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-green-200"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-hoverPrimary text-white font-medium rounded-lg"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Author Info List */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4 text-indigo-700">
            Author Info List
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200 min-w-[700px]">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="border px-4 py-2 text-left">Author Name</th>
                  <th className="border px-4 py-2 text-left">Address</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : banners.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No data found.
                    </td>
                  </tr>
                ) : (
                  banners.map((item) => (
                    <tr key={item._id} className="text-sm border-t">
                      <td className="border px-4 py-2">{item.authorName}</td>
                      <td className="border px-4 py-2">{item.authorAddress}</td>
                      <td className="border px-4 py-2">{item.description}</td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonialsSection;
