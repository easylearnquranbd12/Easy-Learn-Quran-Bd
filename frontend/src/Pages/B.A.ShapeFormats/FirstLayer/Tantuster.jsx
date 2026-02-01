import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Tantuster = () => {
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
  const { data: tantusterFields = [], isLoading: fieldLoading } = useQuery({
    queryKey: ["tantusterFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/tantusterField");

      return res.data.data || [];
    },
  });

  // Fetch tantuster data
  const { data: tantuster = [], isLoading: tantusterLoading } = useQuery({
    queryKey: ["tantuster"],
    queryFn: async () => {
      const res = await axiosPublic.get("/first-layer/tantuster");

      return res.data.data || [];
    },
  });

  if (fieldLoading || tantusterLoading) return <CustomLoading />;

  const tantusterField = tantusterFields[0] || {};
  const data = tantuster[0] || {};

  if (!data) return <p className="text-center mt-10">No tantuster data found.</p>;

  // Dynamic tab generation
  const tabs = [
    { id: "mainWord", label: tantusterField.mainWord },
    { id: "banglaPronunciation", label: tantusterField.banglaPronunciation },
    { id: "banglaMeaning", label: tantusterField.banglaMeaning },
    { id: "synonyms", label: tantusterField.synonyms },
    { id: "antonyms", label: tantusterField.antonyms },
    { id: "exampleEnglish", label: tantusterField.exampleEnglish },
    { id: "exampleBangla", label: tantusterField.exampleBangla },
  ];

const handleSectionScroll = (section) => {
  setActiveSection(section);

  const yOffset = -120; // এখানে navbar + tabs এর height অনুযায়ী adjust করো
  const element = refs[section].current;

  if (element) {
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }
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
        "warning",
      );
      return;
    }

    reset();
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="py-8 ">
        <div className="flex flex-col items-center mb-3 space-y-2">
          {tantusterFields?.map((item) => (
            <div key={item._id} className="text-center max-w-[1400px]">
              <h2 className="text-3xl font-bold text-teal-700">
                {item?.title || "Title Missing"}
              </h2>
              <p className="text-justify py-5 text-gray-700">
                {item?.description || "Description Missing"}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8 sticky top-20 z-999 w-full text-sm md:text-base">
          <div className="flex flex-wrap p-2 border-b max-w-[1400px] mx-auto px-2">
            {tabs.map(
              (tab) =>
                tab.label &&
                tab.label !== "no" &&
                tab.label !== "none" && (
                  <button
                    key={tab.id}
                    onClick={() => handleSectionScroll(tab.id)}
                    className={`px-2 md:px-6 py-2 m-1 rounded-lg font-semibold transition-all duration-300 ${
                      activeSection === tab.id
                        ? "bg-teal-800 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ),
            )}
          </div>
        </div>

        {tabs.map(
          (tab) =>
            tab.label &&
            tab.label !== "no" &&
            tab.label !== "none" && (
              <section key={tab.id} ref={refs[tab.id]} className="p-2 md:p-3">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  {tab.label}
                </h2>
                <div
                  className="prose max-w-none text-gray-700 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: data?.[tab.id] || "<p>No content available.</p>",
                  }}
                />
              </section>
            ),
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {tantusterFields?.map(
            (item) =>
              item.isActive === "ON" && (
                <div key={item._id}>
                  <div className="card bg-white shadow-md rounded-2xl p-2 md:p-5 mt-10 space-y-3 ">
                    <h3 className="text-xl font-semibold text-teal-600">
                      📖 Learning Your Exercise
                    </h3>
                    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                      <table className="table w-full">
                        <thead className="bg-teal-600 text-white text-sm">
                          <tr>
                            <th>Serial</th>
                            {item &&
                              item.mainWord !== "no" &&
                              item.mainWord !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.mainWord}
                                </th>
                              )}
                            {item &&
                              item.banglaPronunciation !== "no" &&
                              item.banglaPronunciation !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.banglaPronunciation}
                                </th>
                              )}
                            {item &&
                              item.banglaMeaning !== "no" &&
                              item.banglaMeaning !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.banglaMeaning}
                                </th>
                              )}
                            {item &&
                              item.synonyms !== "no" &&
                              item.synonyms !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.synonyms}
                                </th>
                              )}
                            {item &&
                              item.antonyms !== "no" &&
                              item.antonyms !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.antonyms}
                                </th>
                              )}
                            {item &&
                              item.exampleEnglish !== "no" &&
                              item.exampleEnglish !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.exampleEnglish}
                                </th>
                              )}
                            {item &&
                              item.exampleBangla !== "no" &&
                              item.exampleBangla !== "none" && (
                                <th className="w-72 md:w-96">
                                  {item?.exampleBangla}
                                </th>
                              )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>

                            {tantusterFields?.[0]?.mainWord !== "no" &&
                              tantusterFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.banglaPronunciation !== "no" &&
                              tantusterFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.banglaMeaning !== "no" &&
                              tantusterFields?.[0]?.banglaMeaning !== "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.synonyms !== "no" &&
                              tantusterFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.antonyms !== "no" &&
                              tantusterFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.exampleEnglish !== "no" &&
                              tantusterFields?.[0]?.exampleEnglish !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.exampleBangla !== "no" &&
                              tantusterFields?.[0]?.exampleBangla !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleBangla")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleBangla}`}
                                  />
                                </td>
                              )}
                          </tr>
                        </tbody>
                        {/* 2 */}
                        <tbody>
                          <tr>
                            <td>2</td>

                            {tantusterFields?.[0]?.mainWord !== "no" &&
                              tantusterFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.banglaPronunciation !== "no" &&
                              tantusterFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.banglaMeaning !== "no" &&
                              tantusterFields?.[0]?.banglaMeaning !== "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.synonyms !== "no" &&
                              tantusterFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.antonyms !== "no" &&
                              tantusterFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.exampleEnglish !== "no" &&
                              tantusterFields?.[0]?.exampleEnglish !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.exampleBangla !== "no" &&
                              tantusterFields?.[0]?.exampleBangla !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleBangla2")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleBangla}`}
                                  />
                                </td>
                              )}
                          </tr>
                        </tbody>
                        {/* 3 */}
                        <tbody>
                          <tr>
                            <td>3</td>

                            {tantusterFields?.[0]?.mainWord !== "no" &&
                              tantusterFields?.[0]?.mainWord !== "none" && (
                                <td>
                                  <textarea
                                    {...register("mainWord3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.mainWord}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.banglaPronunciation !== "no" &&
                              tantusterFields?.[0]?.banglaPronunciation !==
                                "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaPronunciation3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaPronunciation}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.banglaMeaning !== "no" &&
                              tantusterFields?.[0]?.banglaMeaning !== "none" && (
                                <td>
                                  <textarea
                                    {...register("banglaMeaning3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.banglaMeaning}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.synonyms !== "no" &&
                              tantusterFields?.[0]?.synonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("synonyms3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.synonyms}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.antonyms !== "no" &&
                              tantusterFields?.[0]?.antonyms !== "none" && (
                                <td>
                                  <textarea
                                    {...register("antonyms3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.antonyms}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.exampleEnglish !== "no" &&
                              tantusterFields?.[0]?.exampleEnglish !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleEnglish3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleEnglish}`}
                                  />
                                </td>
                              )}
                            {tantusterFields?.[0]?.exampleBangla !== "no" &&
                              tantusterFields?.[0]?.exampleBangla !== "none" && (
                                <td>
                                  <textarea
                                    {...register("exampleBangla3")}
                                    className="input input-base  w-72 md:w-96 min-h-20 cursor-text bg-white text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-green-300 rounded-md"
                                    placeholder={`Enter Your ${item.exampleBangla}`}
                                  />
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-center mt-5">
                      <button className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
                        Submit Now
                      </button>
                    </div>
                  </div>
                </div>
              ),
          )}
        </form>
      </div>
    </div>
  );
};

export default Tantuster;
