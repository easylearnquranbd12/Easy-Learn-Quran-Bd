import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AdminLoading from "../../../../../components/Loading/AdminLoading";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const AdminIdiomEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset, setValue } = useForm();
  // Fetch all idiom Fields
  const {
    data: idiomFields = [],
    isLoading: isLoadingIdiomFields,
    isError: isErrorIdiomFields,
    refetch,
  } = useQuery({
    queryKey: ["idiomFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/idiomField");
      return res.data.data;
    },
  });
  // 🔥 Fetch single idiom by ID
  const { data: idiom, isLoading } = useQuery({
    queryKey: ["idiom", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/first-layer/idiom/${id}`);
      return res.data.data;
    },
  });

  // 🔥 Set default values when idiom is loaded
  useEffect(() => {
    if (idiom) {
      setValue("mainWord", idiom.mainWord);
      setValue("banglaPronunciation", idiom.banglaPronunciation);
      setValue("banglaMeaning", idiom.banglaMeaning);
      setValue("synonyms", idiom.synonyms);
      setValue("antonyms", idiom.antonyms);
      setValue("exampleEnglish", idiom.exampleEnglish);
      setValue("exampleBangla", idiom.exampleBangla);
    }
  }, [idiom, setValue]);

  // 🔥 Submit update form
  const onSubmit = async (data) => {
    try {
      await axiosPublic.put(`/first-layer/idiom/${id}`, data);

      navigate(-1); // back to list
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (isLoading || isLoadingIdiomFields) return <AdminLoading />;

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Edit Idiom</title>
      </Helmet>

      <TittleAnimation tittle="Edit Idiom" subtittle="Admin / Moderator" />

      <div className="mt-10">
        <div className="card bg-white shadow-md rounded-2xl p-3 md:p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Main Word */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {idiomFields[0]?.mainWord || "Main Word"}
              </label>
              <textarea
                {...register("mainWord")}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Bangla Pronunciation */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {idiomFields[0]?.banglaPronunciation || "Bangla Pronunciation"}
              </label>
              <textarea
                {...register("banglaPronunciation")}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Bangla Meaning */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {idiomFields[0]?.banglaMeaning || "Bangla Meaning"}
              </label>
              <textarea
                {...register("banglaMeaning")}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Synonyms */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {idiomFields[0]?.synonyms || "Synonyms"}
              </label>
              <textarea
                {...register("synonyms")}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Antonyms */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {idiomFields[0]?.antonyms || "Antonyms"}
              </label>
              <textarea
                {...register("antonyms")}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Example English */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {idiomFields[0]?.exampleEnglish || "Example (English)"}
              </label>
              <textarea
                {...register("exampleEnglish")}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Example Bangla */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <label className="text-sm font-semibold text-gray-700">
                {idiomFields[0]?.exampleBangla || "Example (Bangla)"}
              </label>
              <textarea
                {...register("exampleBangla")}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
            >
              Update Idiom
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminIdiomEdit;
