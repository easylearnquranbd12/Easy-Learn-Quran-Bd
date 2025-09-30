import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import TittleAnimation from "../../../../../components/TittleAnimation/TittleAnimation";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import EditModal from "../../../../../shared/EditModal/EditModal";

const AdminVocabulary = () => {
  const { register, handleSubmit, reset } = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [selectedVocabId, setSelectedVocabId] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const axiosPublic = useAxiosPublic();

  // Fetch all vocabulary
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
  console.log("res", vocabularyFields);
  // form submit
  const onSubmit = (data) => {
    console.log("Form Data:", data);

    reset();
  };

  // modal open
  const handleEditClick = (field, value, id) => {
    setFieldName(field);
    setCurrentValue(value);
    setSelectedVocabId(id);
    setModalOpen(true);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <Helmet>
        <title>Quiz | Vocabulary</title>
      </Helmet>
      <TittleAnimation
        tittle="Create Vocabulary"
        subtittle="Create With admin or Moderator"
      />

      <div className="mt-10">
        <div className="card bg-white shadow-md rounded-2xl p-3 md:p-5">
          {/* Mobile & Desktop Responsive Container */}
          <div className="w-full">
            {/* Mobile View - Vertical Layout */}
            <div className="block md:hidden space-y-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {vocabularyFields?.map((item) => (
                  <div key={item._id} className="space-y-4 p-2">
                    {/* Main Word */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 w-96">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.mainWord || "Main-Word"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "mainWord",
                              item.mainWord,
                              item.mainWord
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("mainWord")}
                        className="textarea textarea-bordered w-full min-h-[80px]"
                        placeholder={`Enter Your ${item.mainWord}`}
                      />
                    </div>

                    {/* Bangla Pronunciation */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.banglaPronunciation || "Bangla-Pronunciation"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "banglaPronunciation",
                              item.banglaPronunciation,
                              item.banglaPronunciation
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("banglaPronunciation")}
                        className="textarea textarea-bordered w-full min-h-[80px]"
                        placeholder={`Enter Your ${item.banglaPronunciation}`}
                      />
                    </div>

                    {/* Bangla Meaning */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.banglaMeaning || "Bangla-Meaning"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "bangla-Meaning",
                              item.banglaMeaning,
                              item.banglaMeaning
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("banglaMeaning")}
                        className="textarea textarea-bordered w-full min-h-[80px]"
                        placeholder={`Enter Your ${item.banglaMeaning}`}
                      />
                    </div>

                    {/* Synonyms */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.synonyms || "Synonyms"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Synonyms",
                              item.synonyms,
                              item.synonyms
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("synonyms")}
                        className="textarea textarea-bordered w-full min-h-[80px]"
                        placeholder={`Enter Your ${item.synonyms}`}
                      />
                    </div>

                    {/* Antonyms */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.antonyms || "Antonyms"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Antonyms",
                              item.antonyms,
                              item.antonyms
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("antonyms")}
                        className="textarea textarea-bordered w-full min-h-[80px]"
                        placeholder={`Enter Your ${item.antonyms}`}
                      />
                    </div>

                    {/* Example (English) */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.exampleEnglish || "Example (English)"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Example (English)",
                              item.exampleEnglish,
                              item.exampleEnglish
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("exampleEnglish")}
                        className="textarea textarea-bordered w-full min-h-[80px]"
                        placeholder={`Enter Your ${item.exampleEnglish}`}
                      />
                    </div>

                    {/* Example (Bangla) */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">
                          {item.exampleBangla || "Example (Bangla)"}
                        </label>
                        <Edit
                          onClick={() =>
                            handleEditClick(
                              "Example (Bangla)",
                              item.exampleBangla,
                              item.exampleBangla
                            )
                          }
                          className="w-4 h-4 text-green-600 cursor-pointer"
                        />
                      </div>
                      <textarea
                        {...register("exampleBangla")}
                        className="textarea textarea-bordered w-full min-h-[80px]"
                        placeholder={`Enter Your ${item.exampleBangla}`}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-6 p-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Desktop View - Table Layout */}
            <div className="hidden md:block">
              {/* Scrollable Container with proper height */}
              <div className="max-h-[calc(100vh-250px)] overflow-auto rounded-xl shadow border border-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {vocabularyFields?.map((item) => (
                    <table key={item._id} className="table w-full">
                      <thead className="bg-black text-white text-sm sticky top-0 z-10">
                        <tr>
                          <th className="min-w-16">#</th>
                          <th className="min-w-96">
                            <div className="flex items-center justify-center gap-2">
                              {item.mainWord || "Main-Word"}
                              <Edit
                                onClick={() =>
                                  handleEditClick(
                                    "mainWord",
                                    item.mainWord,
                                    item.mainWord
                                  )
                                }
                                className="w-5 h-5 text-green-600 cursor-pointer"
                              />
                            </div>
                          </th>
                          <th className="min-w-96">
                            <div className="flex items-center justify-center gap-2">
                              {item.banglaPronunciation ||
                                "Bangla-Pronunciation"}
                              <Edit
                                onClick={() =>
                                  handleEditClick(
                                    "banglaPronunciation",
                                    item.banglaPronunciation,
                                    item.banglaPronunciation
                                  )
                                }
                                className="w-5 h-5 text-green-600 cursor-pointer"
                              />
                            </div>
                          </th>
                          <th className="min-w-96">
                            <div className="flex items-center justify-center gap-2">
                              {item.banglaMeaning || "Bangla-Meaning"}
                              <Edit
                                onClick={() =>
                                  handleEditClick(
                                    "banglaMeaning",
                                    item.banglaMeaning,
                                    item.banglaMeaning
                                  )
                                }
                                className="w-5 h-5 text-green-600 cursor-pointer"
                              />
                            </div>
                          </th>
                          <th className="min-w-96">
                            <div className="flex items-center justify-center gap-2">
                              {item.synonyms || "Synonyms"}
                              <Edit
                                onClick={() =>
                                  handleEditClick(
                                    "synonyms",
                                    item.synonyms,
                                    item.synonyms
                                  )
                                }
                                className="w-5 h-5 text-green-600 cursor-pointer"
                              />
                            </div>
                          </th>
                          <th className="min-w-96">
                            <div className="flex items-center justify-center gap-2">
                              {item.antonyms || "Antonyms"}
                              <Edit
                                onClick={() =>
                                  handleEditClick(
                                    "antonyms",
                                    item.antonyms,
                                    item.antonyms
                                  )
                                }
                                className="w-5 h-5 text-green-600 cursor-pointer"
                              />
                            </div>
                          </th>
                          <th className="min-w-96">
                            <div className="flex items-center justify-center gap-2">
                              {item.exampleEnglish || "Example (English)"}
                              <Edit
                                onClick={() =>
                                  handleEditClick(
                                    "exampleEnglish",
                                    item.exampleEnglish,
                                    item.exampleEnglish
                                  )
                                }
                                className="w-5 h-5 text-green-600 cursor-pointer"
                              />
                            </div>
                          </th>
                          <th className="min-w-96">
                            <div className="flex items-center justify-center gap-2">
                              {item.exampleBangla || " Example (Bangla)"}
                              <Edit
                                onClick={() =>
                                  handleEditClick(
                                    "exampleBangla",
                                    item.exampleBangla,
                                    item.exampleBangla
                                  )
                                }
                                className="w-5 h-5 text-green-600 cursor-pointer"
                              />
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <textarea
                              {...register("mainWord")}
                              className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
                              placeholder={`Enter Your ${item.mainWord}`}
                            />
                          </td>
                          <td>
                            <textarea
                              {...register("banglaPronunciation")}
                              className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
                              placeholder={`Enter Your ${item.banglaPronunciation}`}
                            />
                          </td>
                          <td>
                            <textarea
                              {...register("banglaMeaning")}
                              className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
                              placeholder={`Enter Your ${item.banglaMeaning}`}
                            />
                          </td>
                          <td>
                            <textarea
                              {...register("synonyms")}
                              className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
                              placeholder={`Enter Your ${item.synonyms}`}
                            />
                          </td>
                          <td>
                            <textarea
                              {...register("antonyms")}
                              className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
                              placeholder={`Enter Your ${item.antonyms}`}
                            />
                          </td>
                          <td>
                            <textarea
                              {...register("exampleEnglish")}
                              className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
                              placeholder={`Enter Your ${item.exampleEnglish}`}
                            />
                          </td>
                          <td>
                            <textarea
                              {...register("exampleBangla")}
                              className="textarea textarea-bordered w-full min-h-[80px] min-w-96"
                              placeholder={`Enter Your ${item.exampleBangla}`}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </form>
              </div>

              {/* Submit Button - Outside the scrollable area */}
              <div className="flex justify-center mt-6 bg-white py-4 rounded-b-2xl border-t border-gray-200">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md text-lg font-semibold"
                >
                  Submit Vocabulary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <EditModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fieldName={fieldName}
          currentValue={currentValue}
          vocabId={selectedVocabId}
        />
      )}
    </div>
  );
};

export default AdminVocabulary;
