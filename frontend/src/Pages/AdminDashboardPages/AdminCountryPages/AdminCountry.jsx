import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminCountry = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });

  // ✅ GET COUNTRY
  const { data: country = [], isLoading } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features/country");
      return res.data;
    },
  });

  // ✅ CREATE COUNTRY
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/features/country", data);
      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Country added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["country"],
      });

      reset();
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong",
      });
    },
  });

  // ✅ DELETE COUNTRY
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/features/country/${id}`);
      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Country removed successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["country"],
      });
    },
  });

  // ✅ SUBMIT
  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  // ✅ DELETE HANDLER
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this country?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#145c43",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div>
      <TittleAnimation
        tittle="Create Country"
        subtittle="Manage Country"
      />

      <div className="mt-10 max-w-[1400px] mx-auto px-2">
        <div className="w-full bg-white shadow-md rounded-2xl p-3 md:p-6">
          {/* ================= FORM ================= */}
          <div className="bg-white shadow-xl rounded-2xl border p-6 mb-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Country Name
                </label>

                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Country name is required",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter country name"
                      className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-700"
                    />
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] hover:opacity-90 transition-all duration-300"
              >
                {createMutation.isPending
                  ? "Adding..."
                  : "Add Country"}
              </button>
            </form>
          </div>

          {/* ================= TABLE ================= */}
          <div className="bg-white shadow-xl rounded-2xl border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-xl font-bold text-gray-700">
                Country List
              </h2>
            </div>

            {isLoading ? (
              <div className="p-10 text-center text-gray-500">
                Loading...
              </div>
            ) : country.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No Country Found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-[#0f3d2e] via-[#145c43] to-[#0f3d2e] text-white">
                    <tr>
                      <th className="py-4 px-4 text-left">#</th>
                      <th className="py-4 px-4 text-left">
                        Country Name
                      </th>
                      <th className="py-4 px-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {country.map((item, index) => (
                      <tr
                        key={item._id}
                        className="border-b hover:bg-gray-50 transition-all"
                      >
                        <td className="py-4 px-4 font-medium">
                          {index + 1}
                        </td>

                        <td className="py-4 px-4 font-semibold text-gray-700">
                          {item.name}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCountry;