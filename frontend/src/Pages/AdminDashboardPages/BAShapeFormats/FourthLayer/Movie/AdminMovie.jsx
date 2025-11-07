import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import MediaUpload from "../../../../../utils/MediaUpload";
import MoveModal from "./MoveModal";

const AdminMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Form Setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      movieName: "",
      movieImage: "",
      movieLink: "",
    },
  });

  // ✅ Fetch vocabulary fields
  const { data: movieFields = [] } = useQuery({
    queryKey: ["movieFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/fourth-layer/goodMovieField");
      return res.data?.data || [];
    },
  });
  // ✅ Create movie
  const createMutation = useMutation({
    mutationFn: (newData) =>
      axiosPublic.post("/fourth-layer/goodMovies", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["movies"]);
      Swal.fire("✅ Success!", "movie added successfully.", "success");
      resetForm();
    },
    onError: () => Swal.fire("❌ Error!", "Failed to add movie.", "error"),
  });
  // ✅ Get all movie fetch Data
  const { data: goodMovies = [], isLoading } = useQuery({
    queryKey: ["goodMovies"],
    queryFn: async () => {
      const res = await axiosPublic.get("/fourth-layer/goodMovies");
      return res.data || [];
    },
  });

  // console.log(goodMovies);
  // ✅ Delete movie
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/fourth-layer/goodMovies/${id}`),
    onSuccess: (res) => {
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "movie deleted successfully.", "success");
      } else {
        Swal.fire("Info", "movie not found or already deleted.", "info");
      }
      queryClient.invalidateQueries(["movies"]);
    },
    onError: () => Swal.fire("Error!", "Failed to delete movie.", "error"),
  });

  // ✅ Reset Form
  const resetForm = () => {
    reset({
      movieName: "",
      movieImage: "",
      movieLink: "",
    });
    setResetSignal((prev) => prev + 1);
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    const imageUrl = typeof data.movieImage === "string" ? data.movieImage : "";

    // if (!imageUrl) {
    //   Swal.fire("Error!", "Please upload a movie image.", "error");
    //   return;
    // }

    const finalData = {
      movieName: data.movieName,
      image: imageUrl,
      movieLink: data.movieLink,
    };

    createMutation.mutate(finalData);
  };

  // ✅ Delete Handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) deleteMutation.mutate(id);
  };

  // ✅ Modal Edit Handler
  const handleEditClick = (field, value, id) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedVocabId(id);
    setModalOpen(true);
  };

  // ✅ Toggle Handler
  const toggleIsActiveMutation = useMutation({
    mutationFn: async (currentState) => {
      const res = await axiosPublic.put(`/fourth-layer/goodMovieField/toggle`, {
        fieldName: "isActive",
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `movie field is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries(["movieFields"]);
    },
    onError: (error) =>
      Swal.fire(
        "Error!",
        error.response?.data?.message || error.message,
        "error"
      ),
  });

  const handleToggle = (currentState) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to turn ${
        currentState === "ON" ? "OFF" : "ON"
      } this field?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleIsActiveMutation.mutate(currentState);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin | movies Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Create Good movies"
        subtittle="Manage movies  Fields"
      />

      <div className="mt-10 max-w-7xl mx-auto">
        <div className=" w-full bg-white shadow-md rounded-2xl p-3 md:p-5">
          {/* ✅ Vocabulary Fields Section */}
          <div className="text-center mb-6">
            {movieFields && movieFields.length > 0 && (
              <>
                <div className="flex items-start justify-center gap-2 mb-2">
                  {movieFields[0].title || "Title"}
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "title",
                        movieFields[0].title,
                        movieFields[0]._id
                      )
                    }
                    className="w-5 h-5 min-h-5 min-w-5 text-green-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-center gap-2">
                  <span className="text-base text-justify">
                    {movieFields[0].description || "Description"}
                  </span>
                  <Edit
                    onClick={() =>
                      handleEditClick(
                        "description",
                        movieFields[0].description,
                        movieFields[0]._id
                      )
                    }
                    className="w-5 h-5 min-h-5 min-w-5 text-green-600 cursor-pointer"
                  />
                </div>
              </>
            )}

            {movieFields.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-2 justify-center mt-3"
              >
                <span className="font-semibold">
                  Toggle {item.title || "movie Field"}
                </span>
                <input
                  type="checkbox"
                  className={`toggle ${
                    item.isActive === "ON" ? "toggle-success" : ""
                  }`}
                  checked={item.isActive === "ON"}
                  onChange={() => handleToggle(item.isActive)}
                />
              </div>
            ))}
          </div>

          {/* ✅ Create movie Form */}
          <div className="w-full  bg-white shadow-2xl rounded-xl border p-4 sm:p-6 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Image Upload */}
              <MediaUpload
                control={control}
                name="movieImage"
                label="movie Image"
                type="image"
                maxSizeMB={5}
                resetSignal={resetSignal}
              />

              {/* movie Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    movie Name:
                  </span>
                </label>
                <Controller
                  name="movieName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter movie name..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium text-gray-700">
                    movie Link (Optional):
                  </span>
                </label>
                <Controller
                  name="movieLink"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter movie link..."
                      className="w-full px-4 py-3 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-300"
                    />
                  )}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add movie"}
              </button>
            </form>
          </div>

          {/* ✅ movies List */}
          <div className="w-full bg-white shadow-lg rounded-xl border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-700">
              movies List
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm sm:text-base">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">movie Name</th>
                    <th className="px-4 py-2">movie Link</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : goodMovies.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No movies found.
                      </td>
                    </tr>
                  ) : (
                    goodMovies.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 border-b">
                        <td className="px-4 py-2 text-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.movieName}
                              className="w-16 h-16 object-cover rounded mx-auto"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.movieName}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.movieLink ? (
                            <a
                              href={item.movieLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Listen
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>

                        <td className="px-4 py-2 text-center">
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

      {/* ✅ Modal */}
      {modalOpen && (
        <MoveModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedVocabId}
        />
      )}
    </>
  );
};

export default AdminMovie;
