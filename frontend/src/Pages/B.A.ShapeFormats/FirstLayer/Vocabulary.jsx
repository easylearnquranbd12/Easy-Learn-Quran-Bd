import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Vocabulary = () => {
  const axiosPublic = useAxiosPublic();
  const [showAll, setShowAll] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
   const queryClient = useQueryClient();
  // Fetch all vocabulary Fields
  const {
    data: vocabularyFields,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vocabularyFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/vocabularyField");
      return res.data.data;
    },
  });

  // Fetch vocabulary
  const {
    data: vocabulary = [],
    isLoading: vocabularyLoading,
    isError: vocabularyError,
    refetch: refetchVocabulary,
    error,
  } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/vocabulary");
      return res.data.data || [];
    },
  });

  
  // Create Vocabulary
  const { mutateAsync: createVocabularyExercise } = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosPublic.post("/first-layer/createExercise", newData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "Exercise created successfully!", "success");
      reset();
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
    },
    onError: (error) => {
      Swal.fire(
        "❌ Error",
        error.message || "Failed to create vocabulary",
        "error"
      );
    },
  });
 
  // Toggle show all rows
  const visibleVocabulary = showAll ? vocabulary : vocabulary.slice(0, 10);

const onSubmit = async (data) => {
  // প্রতিটি row এর ফিল্ড লিস্ট
  const row1Fields = [
    data.mainWord,
    data.banglaPronunciation,
    data.banglaMeaning,
    data.synonyms,
    data.antonyms,
    data.exampleEnglish,
    data.exampleBangla,
  ];

  const row2Fields = [
    data.mainWord2,
    data.banglaPronunciation2,
    data.banglaMeaning2,
    data.synonyms2,
    data.antonyms2,
    data.exampleEnglish2,
    data.exampleBangla2,
  ];

  const row3Fields = [
    data.mainWord3,
    data.banglaPronunciation3,
    data.banglaMeaning3,
    data.synonyms3,
    data.antonyms3,
    data.exampleEnglish3,
    data.exampleBangla3,
  ];


  const row1Completed = row1Fields.filter(
    (f) => f && f.trim() !== ""
  ).length;

  const row2Completed = row2Fields.filter(
    (f) => f && f.trim() !== ""
  ).length;

  const row3Completed = row3Fields.filter(
    (f) => f && f.trim() !== ""
  ).length;

  
  if (
    row1Completed < 3 &&
    row2Completed < 3 &&
    row3Completed < 3
  ) {
    Swal.fire("At least one row must have a minimum of 3 completed fields!", "", "warning");
    return;
  }

  createVocabularyExercise(data)

  reset();
};



  if (isLoading || vocabularyLoading) return <CustomLoading />;

  if (isError || vocabularyError)
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl text-red-500 mb-2">
            Unable to Load Vocabulary
          </h2>
          <p className="text-black mb-6">
            {error?.message || "Error occurred"}
          </p>
          <button
            onClick={refetchVocabulary}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="bg-white shadow-md border rounded-lg p-2 md:p-5 mt-10 space-y-3">
        <div className="flex flex-col items-center mb-3 space-y-2">
          {vocabularyFields?.map((item) => (
            <div key={item._id} className="text-center max-w-[1400px]">
              <h2 className="text-3xl font-bold text-teal-700">
                {item?.title || "Title Missing"}
              </h2>
              <p className=" py-5 text-gray-700 text-justify">
                {item?.description || "Description Missing"}
              </p>
            </div>
          ))}
        </div>

        {/* Vocabulary Table */}
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="table w-full">
            {vocabularyFields?.map((item, index) => (
              <thead key={item._id} className="bg-teal-600 text-white text-sm">
                <tr>
                  <th className="min-w-10">Serial</th>
                  <th className="min-w-96">{item?.mainWord}</th>
                  <th className="min-w-96">{item?.banglaPronunciation}</th>
                  <th className="min-w-96">{item?.banglaMeaning}</th>
                  <th className="min-w-96">{item?.synonyms}</th>
                  <th className="min-w-96">{item?.antonyms}</th>
                  <th className="min-w-96">{item?.exampleEnglish}</th>
                  <th className="min-w-96">{item?.exampleBangla}</th>
                </tr>
              </thead>
            ))}
            <tbody>
              {visibleVocabulary.length > 0 ? (
                visibleVocabulary.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition border-b text-sm"
                  >
                    <td className="font-semibold min-w-10">{i + 1}</td>
                    <td>
                      <textarea
                        readOnly
                        className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        defaultValue={row.mainWord}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly
                        className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        defaultValue={row.banglaPronunciation}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly
                        className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        defaultValue={row.banglaMeaning}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly
                        className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        defaultValue={row.synonyms}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly
                        className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        defaultValue={row.antonyms}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly
                        className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        defaultValue={row.exampleEnglish}
                      />
                    </td>
                    <td>
                      <textarea
                        readOnly
                        className="input input-sm w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
                        defaultValue={row.exampleBangla}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No vocabulary found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {vocabulary.length > 10 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
      {/* Vocabulary Fields Exercise */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {vocabularyFields?.map(
            (item) =>
              item.isActive === "ON" && (
                <div key={item._id}>
                  <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
                    <h3 className="text-xl font-semibold text-teal-700">
                      📖Learning Your Exercise
                    </h3>
                    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                      <table className="table w-full">
                        <thead className="bg-teal-600 text-white text-sm">
                          <tr>
                            <th className="min-w-10">Serial</th>
                            <th className="min-w-96">{item?.mainWord}</th>
                            <th className="min-w-96">
                              {item?.banglaPronunciation}
                            </th>
                            <th className="min-w-96">{item?.banglaMeaning}</th>
                            <th className="min-w-96">{item?.synonyms}</th>
                            <th className="min-w-96">{item?.antonyms}</th>
                            <th className="min-w-96">{item?.exampleEnglish}</th>
                            <th className="min-w-96">{item?.exampleBangla}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              <textarea
                                {...register("mainWord")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.mainWord}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("banglaPronunciation")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.banglaPronunciation}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("banglaMeaning")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.banglaMeaning}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("synonyms")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.synonyms}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("antonyms")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.antonyms}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("exampleEnglish")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.exampleEnglish}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("exampleBangla")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.exampleBangla}`}
                              />
                            </td>
                          </tr>
                        </tbody>
                        {/* 2 */}
                        <tbody>
                          <tr>
                            <td>2</td>
                            <td>
                              <textarea
                                {...register("mainWord2")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.mainWord}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("banglaPronunciation2")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.banglaPronunciation}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("banglaMeaning2")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.banglaMeaning}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("synonyms2")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.synonyms}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("antonyms2")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.antonyms}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("exampleEnglish2")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.exampleEnglish}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("exampleBangla2")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.exampleBangla}`}
                              />
                            </td>
                          </tr>
                        </tbody>
                        {/* 3 */}
                        <tbody>
                          <tr>
                            <td>3</td>
                            <td>
                              <textarea
                                {...register("mainWord3")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.mainWord}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("banglaPronunciation3")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.banglaPronunciation}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("banglaMeaning3")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.banglaMeaning}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("synonyms3")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.synonyms}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("antonyms3")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.antonyms}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("exampleEnglish3")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.exampleEnglish}`}
                              />
                            </td>
                            <td>
                              <textarea
                                {...register("exampleBangla3")}
                                className="input input-base w-full min-w-96 min-h-20 cursor-default bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                placeholder={`Enter Your ${item.exampleBangla}`}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-center mt-5">
                      <button
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
                       
                      >
                        Submit Now
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </form>
      </div>
    </div>
  );
};

export default Vocabulary;
