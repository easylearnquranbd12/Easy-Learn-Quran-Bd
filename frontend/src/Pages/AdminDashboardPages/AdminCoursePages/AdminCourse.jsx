import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import MediaUpload from "../../../utils/MediaUpload";

const AdminCourse = () => {
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

  // ✅ GET COURSES
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features/courses");
      return res.data;
    },
  });

  // ✅ CREATE COURSE
  const createMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/features/courses", data),
    onSuccess: () => {
      Swal.fire("Success!", "Course added successfully.", "success");
      queryClient.invalidateQueries(["courses"]);
      reset();
      setResetSignal((prev) => prev + 1);
    },
  });

  // ✅ DELETE COURSE
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/features/courses/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Course removed.", "success");
      queryClient.invalidateQueries(["courses"]);
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this course?",
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
      <TittleAnimation tittle="Create Course" subtittle="Manage Courses" />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className="bg-white shadow-md rounded-lg p-4">

          {/* 🔥 FORM */}
          <div className="bg-white shadow-xl rounded-xl border p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Course Name</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="Enter course name..."
                    />
                  )}
                />
              </div>

              {/* IMAGE */}
              <MediaUpload
                control={control}
                name="image"
                label="Course Image"
                type="image"
                maxSizeMB={5}
                resetSignal={resetSignal}
              />

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium">Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="Enter description..."
                    />
                  )}
                />
              </div>

              <button className="w-full py-2 bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white rounded-lg">
                Add Course
              </button>
            </form>
          </div>

          {/* 🔥 COURSE LIST */}
          <div className="bg-white shadow-lg rounded-xl border p-6">
            <h2 className="text-lg font-semibold mb-4 text-green-700">
              Course List
            </h2>

            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white">
                <tr>
                  <th className="py-2">Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No Courses Found
                    </td>
                  </tr>
                ) : (
                  courses.map((item) => (
                    <tr key={item._id} className="border-b text-center">
                      <td className="py-2">
                        {item.image ? (
                          <img
                            src={item.image}
                            className="w-12 h-12 mx-auto rounded"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description?.slice(0, 80)}...</td>
                      <td>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500"
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
  );
};

export default AdminCourse;