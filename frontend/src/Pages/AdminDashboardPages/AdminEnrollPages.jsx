import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaCopy, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AdminEnrollPages = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [copiedText, setCopiedText] = useState("");

  // ✅ Fetch Enroll Data
  const { data: enrolls = [], isLoading } = useQuery({
    queryKey: ["enrolls"],
    queryFn: async () => {
      const res = await axiosPublic.get("/enroll/enroll");
      return res.data;
    },
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosPublic.delete(`/enroll/enroll/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Enroll deleted successfully.", "success");
      queryClient.invalidateQueries(["enrolls"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete.", "error");
    },
  });

  // ✅ Copy Function
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);

    setTimeout(() => {
      setCopiedText("");
    }, 1500);
  };

  // ✅ Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        📋 Enroll Management
      </h2>

      <div className="grid gap-6">
        {enrolls.map((item) => {
          // 🔥 Section Based Data
          const sections = [
            {
              title: "👤 Personal Info",
              fields: [
                { label: "Full Name", value: item.fullName },
                { label: "Age", value: item.age },
                { label: "Gender", value: item.gender },
              ],
            },
            {
              title: "📞 Contact Info",
              fields: [
                { label: "Email", value: item.email },
                { label: "Phone", value: item.phone },
                { label: "WhatsApp", value: item.whatsapp },
              ],
            },
            {
              title: "👨‍👦 Guardian Info",
              fields: [
                { label: "Guardian Name", value: item.guardianName },
                { label: "Guardian Phone", value: item.guardianPhone },
              ],
            },
            {
              title: "📍 Location",
              fields: [
                { label: "Country", value: item.country },
                { label: "City", value: item.city },
                { label: "Address", value: item.address },
              ],
            },
            {
              title: "📚 Course Info",
              fields: [
                { label: "Course", value: item.course },
                { label: "Description", value: item.description },
              ],
            },
          ];

          return (
            <div
              key={item._id}
              className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            >
              {/* 🔥 Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold">{item.fullName}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              {/* 🔥 Sections */}
              <div className="grid md:grid-cols-2 gap-4">
                {sections.map((section, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 border">
                    <h4 className="font-semibold mb-2 text-gray-700">
                      {section.title}
                    </h4>

                    <div className="space-y-1 text-sm">
                      {section.fields.map((field, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-600">{field.label}:</span>

                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {field.value || "N/A"}
                            </span>

                            {/* 🔥 Copy only for phone fields */}
                            {(field.label.includes("Phone") ||
                              field.label === "WhatsApp") &&
                              field.value && (
                                <button
                                  onClick={() => handleCopy(field.value)}
                                  className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition ${
                                    copiedText === field.value
                                      ? "bg-green-100 text-green-600"
                                      : "text-blue-500 hover:bg-gray-200"
                                  }`}
                                >
                                  {copiedText === field.value ? (
                                    "Copied!"
                                  ) : (
                                    <>
                                      <FaCopy size={10} /> Copy
                                    </>
                                  )}
                                </button>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 🔥 Submitted User Info */}
              <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                <p>
                  <b>Submitted By:</b> {item.user?.name}
                </p>
                <p>
                  <b>User Email:</b> {item.user?.email}
                </p>
                <p>
                  <b>Role:</b> {item.user?.role}
                </p>
              </div>

              {/* 🔥 Date */}
              <p className="text-xs text-gray-400 mt-3">
                ⏱ {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminEnrollPages;
