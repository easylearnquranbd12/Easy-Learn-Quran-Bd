import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RichTextField from "../../../shared/TextEditor/RichTextField";

const AdminFaq = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [resetSignal, setResetSignal] = useState(0);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // ✅ GET FAQ
  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/faqs");
      return res.data;
    },
  });

  // ✅ CREATE FAQ
  const createMutation = useMutation({
    mutationFn: (data) => axiosPublic.post("/faqs", data),

    onSuccess: () => {
      Swal.fire("Success!", "FAQ added successfully.", "success");

      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });

      reset();
      setResetSignal((prev) => prev + 1);
    },
  });

  // ✅ DELETE FAQ
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/faqs/${id}`),

    onSuccess: () => {
      Swal.fire("Deleted!", "FAQ removed.", "success");

      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this FAQ?",
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
        tittle="Create FAQ"
        subtittle="Manage FAQ"
      />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className="w-full bg-white shadow-md rounded-lg p-2 md:p-5">

          {/* 🔥 FORM */}
          <div className="w-full bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* QUESTION */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    FAQ Question:
                  </span>
                </label>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter FAQ question..."
                      className="w-full px-4 py-3 border rounded-md"
                    />
                  )}
                />
              </div>

              {/* ANSWER */}
              <RichTextField
                name="description"
                control={control}
                placeholder="Enter FAQ answer..."
                resetSignal={resetSignal}
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white rounded-lg"
              >
                Add FAQ
              </button>
            </form>
          </div>

          {/* 🔥 FAQ TABLE */}
          <div className="bg-white shadow-lg rounded-xl border p-4 sm:p-6 w-full">
            <h2 className="text-lg font-semibold mb-4 text-teal-700">
              FAQ List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm">
                <thead className="bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white">
                  <tr>
                    <th className="px-4 py-2">Question</th>
                    <th className="px-4 py-2">Answer</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-4"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : faqs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-4"
                      >
                        No FAQ found.
                      </td>
                    </tr>
                  ) : (
                    faqs.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b hover:bg-gray-50"
                      >
                        {/* QUESTION */}
                        <td className="px-4 py-2">
                          {item.name}
                        </td>

                        {/* ANSWER */}
                        <td
                          className="px-4 py-2 text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html:
                              item.description?.slice(0, 120) +
                              "...",
                          }}
                        />

                        {/* DELETE */}
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
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

export default AdminFaq;