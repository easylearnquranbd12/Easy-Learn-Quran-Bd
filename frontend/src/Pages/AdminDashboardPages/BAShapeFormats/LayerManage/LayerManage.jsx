// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
// import { useForm } from "react-hook-form";
// import TittleAnimation from "../../../../components/TittleAnimation/TittleAnimation";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";

// const LayerManage = () => {
//   const axiosPublic = useAxiosPublic();
//   const queryClient = useQueryClient();
//   const { register, handleSubmit, reset, setValue, control } = useForm({});

//   // Fetch all vocabulary Fields
//   const {
//     data: elegantFields = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["elegantFields"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/first-layer/elegantField");
//       console.log(res.data.data);
//       return res.data.data;
//     },
//   });

//   // form submit
//   const onSubmit = async (data) => {
//     console.log(data);
//   };

//   // Toggle handler using item.isActive
//   const handleToggle = (currentState) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You want to turn ${
//         currentState === "ON" ? "OFF" : "ON"
//       } this vocabulary?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         toggleIsActiveMutation.mutate(currentState);
//       }
//     });
//   };

//   // Toggle mutation using item.isActive
//   const toggleIsActiveMutation = useMutation({
//     mutationFn: async (currentState) => {
//       const res = await axiosPublic.put(`/first-layer/elegantField/toggle`, {
//         fieldName: "isActive", // ✅ এটা দিতে হবে
//         currentValue: currentState,
//       });
//       return res.data;
//     },
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: `Vocabulary is now ${data.updatedValue}`,
//       });
//       queryClient.invalidateQueries({ queryKey: ["elegantFields"] });
//     },
//     onError: (error) => {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || error.message,
//         "error"
//       );
//     },
//   });
//   return (
//     <div>
//       <Helmet>
//         <title>Quiz | Layer Manage</title>
//       </Helmet>
//       <TittleAnimation
//         tittle="Create Vocabulary"
//         subtittle="Create With admin or Moderator"
//       />
//       <div className="border rounded-lg p-4 mt-4 bg-white">
//         <div>
//           {elegantFields.map((item) => (
//             <div key={item._id} className="flex items-center gap-2 my-2">
//               <span className="font-semibold">First Layer</span>
//               <input
//                 type="checkbox"
//                 className={`toggle ${
//                   item.isActive === "ON" ? "toggle-success" : ""
//                 }`}
//                 checked={item.isActive === "ON"}
//                 onChange={() => handleToggle(item.isActive)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LayerManage;




// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Edit } from "lucide-react";
// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";

// import TittleAnimation from "../../../../components/TittleAnimation/TittleAnimation";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";
// import LayerManagementModal from "./LayerManagementModal";

// const LayerManage = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [fieldName, setFieldName] = useState("");
//   const [selectedVocabId, setSelectedVocabId] = useState(null);
//   const [currentValue, setCurrentValue] = useState("");

//   const axiosPublic = useAxiosPublic();


//   // ✅ Fetch vocabulary fields
//   const { data: fields = [] } = useQuery({
//     queryKey: ["fields"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/layer-management/field");
//       console.log(res.data.data);
//       return res.data?.data || [];
//     },
//   });
//   console.log(fields);
 
//   // ✅ Modal Edit Handler
//   const handleEditClick = (field, value, id) => {
//     setFieldName(field);
//     setCurrentValue(value);
//     setSelectedVocabId(id);
//     setModalOpen(true);
//   };

//   // ✅ Toggle Handler
//   const toggleIsActiveMutation = useMutation({
//     mutationFn: async (currentState) => {
//       const res = await axiosPublic.put(
//         `/layer-management/field/toggle`,
//         {
//           fieldName: "isActive",
//           currentValue: currentState,
//         }
//       );
//       return res.data;
//     },
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: `Song field is now ${data.updatedValue}`,
//       });
//       queryClient.invalidateQueries(["fields"]);
//     },
//     onError: (error) =>
//       Swal.fire(
//         "Error!",
//         error.response?.data?.message || error.message,
//         "error"
//       ),
//   });

//   const handleToggle = (currentState) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You want to turn ${
//         currentState === "ON" ? "OFF" : "ON"
//       } this field?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         toggleIsActiveMutation.mutate(currentState);
//       }
//     });
//   };



//   return (
//     <div className=" px-2">
//       <Helmet>
//         <title>Admin | Create Old Generation Memories</title>
//       </Helmet>

//       <TittleAnimation
//         tittle="Layer Management"
//         subtittle="Layer Management Settings"
//       />

//       <div className="mt-10 lg:min-w-[1000px]">
//         <div className=" w-full bg-white shadow-md rounded-2xl p-3 md:p-5">
//           {/* ✅ Vocabulary Fields Section */}
//           <div className="text-center mb-6">
//             {fields && fields.length > 0 && (
//               <>
//                 <div className="flex items-start justify-center gap-2 mb-2">
//                   {fields[0].title || "Title"}
//                   <Edit
//                     onClick={() =>
//                       handleEditClick(
//                         "title",
//                         fields[0].title,
//                         fields[0]._id
//                       )
//                     }
//                     className="w-5 h-5 text-green-600 cursor-pointer"
//                   />
//                 </div>
               
//               </>
//             )}

//             {fields.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex items-center gap-2 justify-center mt-3"
//               >
//                 <span className="font-semibold">
//                   Toggle {item.title || "Song Field"}
//                 </span>
//                 <input
//                   type="checkbox"
//                   className={`toggle ${
//                     item.isActive === "ON" ? "toggle-success" : ""
//                   }`}
//                   checked={item.isActive === "ON"}
//                   onChange={() => handleToggle(item.isActive)}
//                 />
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>

//       {/* ✅ Modal */}
//       {modalOpen && (
//         <LayerManagementModal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           fieldName={fieldName}
//           currentValue={currentValue}
//           vocabId={selectedVocabId}
//         />
//       )}
//     </div>
//   );
// };

// export default LayerManage;




import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import TittleAnimation from "../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import LayerManagementModal from "./LayerManagementModal";

const LayerManage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [currentValue, setCurrentValue] = useState("");

  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // ✅ Fetch all layers
  const { data: fields = [], isLoading } = useQuery({
    queryKey: ["fields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/layer-management/field");
      return res.data?.data || [];
    },
  });

  // ✅ Modal Edit Handler
  const handleEditClick = (field, value, item) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedLayer(item);
    setModalOpen(true);
  };

  // ✅ Toggle Handler
  const toggleIsActiveMutation = useMutation({
    mutationFn: async ({ layerName, currentState }) => {
      const res = await axiosPublic.put(`/layer-management/field/toggle`, {
        layerName,
        fieldName: "isActive",
        currentValue: currentState,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Layer is now ${data.updatedValue}`,
      });
      queryClient.invalidateQueries(["fields"]);
    },
    onError: (error) =>
      Swal.fire(
        "Error!",
        error.response?.data?.message || error.message,
        "error"
      ),
  });

  const handleToggle = (layerName, currentState) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to turn ${
        currentState === "ON" ? "OFF" : "ON"
      } this layer?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleIsActiveMutation.mutate({ layerName, currentState });
      }
    });
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading Layers...</p>;
  }

  return (
    <div >
      <Helmet>
        <title>Admin | Layer Management</title>
      </Helmet>

      <TittleAnimation
        tittle="Layer Management"
        subtittle="Manage Layers & Toggle Activation"
      />

      <div className="mt-10 w-full lg:min-w-[1000px]">
        <div className="w-full bg-white shadow-md rounded-2xl p-3 md:p-5">
          <div className="space-y-4">
            {fields.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.layerName}</span>
                  <Edit
                    onClick={() =>
                      handleEditClick("layerName", item.layerName, item)
                    }
                    className="w-5 h-5 text-green-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {item.isActive === "ON" ? "Active" : "Inactive"}
                  </span>
                  <input
                    type="checkbox"
                    className={`toggle ${
                      item.isActive === "ON" ? "toggle-success" : ""
                    }`}
                    checked={item.isActive === "ON"}
                    onChange={() =>
                      handleToggle(item.layerName, item.isActive)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {modalOpen && (
        <LayerManagementModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedLayer?._id}
          currentLayer={selectedLayer}
        />
      )}
    </div>
  );
};

export default LayerManage;
