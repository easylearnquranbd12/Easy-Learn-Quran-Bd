import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import MediaUpload from "../../../utils/MediaUpload";

const AdminAchievements = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [resetSignal, setResetSignal] = useState(0);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      count: "",
      image: "",
    },
  });

  // ✅ GET ACHIEVEMENTS
  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features/achievements");
      return res.data;
    },
  });

  // ✅ CREATE
  const createMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/features/achievements", data),
    onSuccess: () => {
      Swal.fire("Success!", "Achievement added successfully.", "success");
      queryClient.invalidateQueries(["achievements"]);
      reset();
      setResetSignal((prev) => prev + 1);
    },
  });

  // ✅ DELETE
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axiosPublic.delete(`/features/achievements/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Achievement removed.", "success");
      queryClient.invalidateQueries(["achievements"]);
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this achievement?",
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
      <TittleAnimation
        tittle="Create Achievement"
        subtittle="Manage Achievements"
      />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className="w-full bg-white shadow-md rounded-lg p-2 md:p-5">

          {/* 🔥 FORM */}
          <div className="bg-white shadow-2xl rounded-xl border p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium">
                  Achievement Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="e.g. Students Enrolled"
                    />
                  )}
                />
              </div>

              {/* COUNT */}
              <div>
                <label className="text-sm font-medium">
                  Achievement Number
                </label>
                <Controller
                  name="count"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="e.g. 5000"
                    />
                  )}
                />
              </div>

              {/* IMAGE */}
              <MediaUpload
                control={control}
                name="image"
                label="Icon"
                type="image"
                maxSizeMB={5}
                resetSignal={resetSignal}
              />

              <button className="w-full py-2 bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white rounded-lg">
                Add Achievement
              </button>
            </form>
          </div>

          {/* 🔥 LIST */}
          <div className="bg-white shadow-lg rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4">
              Achievement List
            </h2>

            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white">
                <tr>
                  <th className="py-2">Icon</th>
                  <th>Name</th>
                  <th>Count</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {achievements.map((item) => (
                  <tr key={item._id} className="border-b text-center">
                    <td className="py-2">
                      <img
                        src={item.image}
                        className="w-10 h-10 mx-auto"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="font-bold text-green-600">
                      {item.count}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminAchievements;