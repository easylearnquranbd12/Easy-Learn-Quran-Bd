

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Sentence = () => {
  const axiosPublic = useAxiosPublic();
  const [activeSection, setActiveSection] = useState("mainWord");
  const { register, handleSubmit, reset, setValue } = useForm();
  const queryClient = useQueryClient();

  const refs = {
    mainWord: useRef(null),
    banglaPronunciation: useRef(null),
    banglaMeaning: useRef(null),
    synonyms: useRef(null),
    antonyms: useRef(null),
    exampleEnglish: useRef(null),
    exampleBangla: useRef(null),
  };

  // Fetch sentence fields
  const { data: sentenceFields = [], isLoading: fieldLoading } = useQuery({
    queryKey: ["sentenceFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/second-layer/sentenceField");
      return res.data.data || [];
    },
  });

  // Fetch sentence data
  const { data: sentence = [], isLoading: sentenceLoading } = useQuery({
    queryKey: ["sentence"],
    queryFn: async () => {
      const res = await axiosPublic.get("/second-layer/sentence");
      return res.data.data || [];
    },
  });

  if (fieldLoading || sentenceLoading) return <CustomLoading />;

  const sentenceField = sentenceFields[0] || {};
  const data = sentence[0] || {};

  if (!data.mainWord)
    return <p className="text-center mt-10">No sentence data found.</p>;

  // Dynamic tab generation
  const tabs = [
    { id: "mainWord", label: sentenceField.mainWord },
    { id: "banglaPronunciation", label: sentenceField.banglaPronunciation },
    { id: "banglaMeaning", label: sentenceField.banglaMeaning },
    { id: "synonyms", label: sentenceField.synonyms },
    { id: "antonyms", label: sentenceField.antonyms },
    { id: "exampleEnglish", label: sentenceField.exampleEnglish },
    { id: "exampleBangla", label: sentenceField.exampleBangla },
  ];

  const handleSectionScroll = (section) => {
    setActiveSection(section);
    refs[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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

    const row1Completed = row1Fields.filter((f) => f && f.trim() !== "").length;

    const row2Completed = row2Fields.filter((f) => f && f.trim() !== "").length;

    const row3Completed = row3Fields.filter((f) => f && f.trim() !== "").length;

    if (row1Completed < 3 && row2Completed < 3 && row3Completed < 3) {
      Swal.fire(
        "At least one row must have a minimum of 3 completed fields!",
        "",
        "warning"
      );
      return;
    }

    console.log(data);

    reset();
  };

  console.log(sentenceField);
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="py-8 ">
        <div className="flex flex-col items-center mb-3 space-y-2">
          {sentenceFields?.map((item) => (
            <div key={item._id} className="text-center max-w-[1400px]">
              <h2 className="text-3xl font-bold text-[#bb874a]">
                {item?.title || "Title Missing"}
              </h2>
              <p className="text-center py-5 text-gray-700">
                {item?.description || "Description Missing"}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8 sticky top-20 z-9999 w-full ">
          <div className="flex flex-wrap p-4  border-b max-w-[1400px] mx-auto px-2">
            {tabs.map(
              (tab) =>
                tab.label && (
                  <button
                    key={tab.id}
                    onClick={() => handleSectionScroll(tab.id)}
                    className={`px-6 py-2 m-1 rounded-lg font-semibold transition-all duration-300 ${
                      activeSection === tab.id
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                )
            )}
          </div>
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-12 max-w-[1400px] mx-auto ">
          {tabs.map(
            (tab) =>
              tab.label && (
                <section key={tab.id} ref={refs[tab.id]} className="p-2 md:p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {tab.label}
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700  p-4 "
                    dangerouslySetInnerHTML={{
                      __html: data?.[tab.id] || "<p>No content available.</p>",
                    }}
                  />
                </section>
              )
          )}
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {sentenceFields?.map(
            (item) =>
              item.isActive === "ON" && (
                <div key={item._id} className="max-w-[1400px] mx-auto px-4">
                  <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
                    <h3 className="text-xl font-semibold text-[#bb874a]">
                      📖Learning Your Exercise
                    </h3>
                    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                      <table className="table w-full">
                        <thead className="bg-black text-white text-sm">
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
                      <button className="px-6 py-2 bg-[#bb874a] text-white rounded-lg shadow hover:bg-[#5e4528] transition">
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

export default Sentence;
