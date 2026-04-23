import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RichTextField from "../../../shared/TextEditor/RichTextField";
import MediaUpload from "../../../utils/MediaUpload";

const HometextCreate = () => {
  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      ideaShareImage: "",
    },
  });

  const [editingId, setEditingId] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Fetch
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner");
      return res.data;
    },
  });

  // ✅ Create
  const createMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/banner", data),
    onSuccess: () => {
      Swal.fire("Success!", "Banner created successfully.", "success");
      queryClient.invalidateQueries(["banners"]);
      reset();
      setResetSignal((prev) => prev + 1);
      setEditingId(null);
    },
  });

  // ✅ Update
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosPublic.put(`/banner/${id}`, data),
    onSuccess: () => {
      Swal.fire("Updated!", "Banner updated successfully.", "success");
      queryClient.invalidateQueries(["banners"]);
      reset();
      setResetSignal((prev) => prev + 1);
      setEditingId(null);
    },
  });

  // ✅ Delete
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/banner/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Banner deleted successfully.", "success");
      queryClient.invalidateQueries(["banners"]);
    },
  });

  // ✅ Submit
  const onSubmit = (data) => {
    data.status = "inactive";

    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // ✅ Edit
  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setValue("title", banner.title);
    setValue("description", banner.description);
    setValue("ideaShareImage", banner.ideaShareImage);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Delete this banner?",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  // ✅ Active
  const handleMakeActive = async (banner) => {
    if (banner.status === "active") {
      Swal.fire("Info", "Already active", "info");
      return;
    }

    const confirm = await Swal.fire({
      title: "Make Active?",
      text: "This will deactivate others",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      updateMutation.mutate({
        id: banner._id,
        data: { status: "active" },
      });
    }
  };

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <Helmet>
        <title>Admin | Banner</title>
      </Helmet>

      <TittleAnimation tittle="Create Blogs" subtittle="Manage Blogs" />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className="w-full bg-white shadow-md rounded-lg p-2 md:p-5">
          
          {/* 🔥 FORM */}
          <div className="w-full bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* TITLE */}
              <div className="form-control w-full py-2">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    Title:
                  </span>
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter title..."
                      className="w-full px-4 py-3 border rounded-md focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>

              {/* IMAGE */}
              <MediaUpload
                control={control}
                name="ideaShareImage"
                label="Blog Image"
                type="image"
                maxSizeMB={5}
                resetSignal={resetSignal}
              />

              {/* DESCRIPTION */}
              <RichTextField
                name="description"
                control={control}
                placeholder="Enter description..."
              />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white rounded-lg"
              >
                {isSubmitting
                  ? "Processing..."
                  : editingId
                  ? "Update Blog"
                  : "Add Blog"}
              </button>
            </form>
          </div>

          {/* 🔥 TABLE */}
          <div className="bg-white shadow-lg rounded-xl border p-4 sm:p-6 w-full">
            <h2 className="text-lg font-semibold mb-4 text-teal-700">
              Blog List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm">
                <thead className="bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Title</th>
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
                  ) : banners.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No Blog found.
                      </td>
                    </tr>
                  ) : (
                    banners.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50">

                        {/* IMAGE */}
                        <td className="px-4 py-2 text-center">
                          {item.ideaShareImage ? (
                            <img
                              src={item.ideaShareImage}
                              className="w-12 h-12 object-cover rounded mx-auto"
                            />
                          ) : (
                            <span className="text-gray-400">No Image</span>
                          )}
                        </td>

                        {/* TITLE */}
                        <td className="px-4 py-2 font-medium">
                          {item.title}
                        </td>

                        {/* DESCRIPTION */}
                        <td
                          className="px-4 py-2 text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html:
                              item.description?.slice(0, 80) + "...",
                          }}
                        />

                        {/* ACTIONS */}
                        <td className="px-4 py-2">
                          <div className="flex justify-center gap-2 flex-wrap">

                            {/* EDIT */}
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1 rounded hover:bg-green-100 text-green-600"
                            >
                              <Edit2 size={16} />
                            </button>

                            {/* DELETE */}
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-1 rounded hover:bg-red-100 text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>

                            {/* ACTIVE */}
                            {item.status !== "active" ? (
                              <button
                                onClick={() => handleMakeActive(item)}
                                className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                              >
                                Active
                              </button>
                            ) : (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                Active
                              </span>
                            )}

                          </div>
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

export default HometextCreate;