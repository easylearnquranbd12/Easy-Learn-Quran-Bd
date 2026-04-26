import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import MediaUpload from "../../../utils/MediaUpload";

const AdminFeatures = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [resetSignal, setResetSignal] = useState(0);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  // ✅ GET FEATURES
  const { data: features = [], isLoading } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features");
      return res.data;
    },
  });

  // ✅ CREATE FEATURE
  const createMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/features", data),
    onSuccess: () => {
      Swal.fire("Success!", "Feature added successfully.", "success");
      queryClient.invalidateQueries(["features"]);
      reset();
      setResetSignal((prev) => prev + 1);
    },
  });

  // ✅ DELETE FEATURE
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/features/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Feature removed.", "success");
      queryClient.invalidateQueries(["features"]);
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this feature?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div>
      <TittleAnimation tittle="Create Feature" subtittle="Manage Features" />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className="w-full bg-white shadow-md rounded-lg p-2 md:p-5">
          
          {/* 🔥 FORM */}
          <div className="w-full bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* NAME */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Feature Name:
                  </span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter feature name..."
                      className="w-full px-4 py-3 border rounded-md"
                    />
                  )}
                />
              </div>

              {/* IMAGE */}
              <MediaUpload
                control={control}
                name="image"
                label="Feature Icon"
                type="image"
                maxSizeMB={5}
                resetSignal={resetSignal}
              />

              {/* DESCRIPTION */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Feature Description:
                  </span>
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Enter description..."
                      className="w-full px-4 py-3 border rounded-md"
                    />
                  )}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white rounded-lg"
              >
                Add Feature
              </button>
            </form>
          </div>

          {/* 🔥 FEATURE LIST */}
          <div className="bg-white shadow-lg rounded-xl border p-4 sm:p-6 w-full">
            <h2 className="text-lg font-semibold mb-4 text-teal-700">
              Feature List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm">
                <thead className="bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white">
                  <tr>
                    <th className="px-4 py-2">Icon</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : features.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No Features found.
                      </td>
                    </tr>
                  ) : (
                    features.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50">
                        
                        <td className="px-4 py-2 text-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              className="w-12 h-12 object-cover rounded mx-auto"
                            />
                          ) : (
                            "No Icon"
                          )}
                        </td>

                        <td className="px-4 py-2">{item.name}</td>

                        <td className="px-4 py-2 text-gray-600">
                          {item.description?.slice(0, 80)}...
                        </td>

                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
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
    </div>
  );
};

export default AdminFeatures;