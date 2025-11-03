import { useQuery } from "@tanstack/react-query";
import CustomLoading from "../../../components/Loading/CustomLoading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const IdeaShare = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ Fetch ideaShares fields
  const { data: ideaSharesFields = [], isLoading: ideaSharesFieldsLoading } =
    useQuery({
      queryKey: ["ideaSharesFields"],
      queryFn: async () => {
        const res = await axiosPublic.get("/third-layer/ideaSharesField");
        return res.data?.data || [];
      },
    });

  // ✅ Fetch all idea shares
  const { data: ideaSharess = [], isLoading: ideaSharessLoading } = useQuery({
    queryKey: ["ideaSharess"],
    queryFn: async () => {
      const res = await axiosPublic.get("/third-layer/ideaShares");
      return res.data || [];
    },
  });

  if (ideaSharesFieldsLoading || ideaSharessLoading) {
    return <CustomLoading />;
  }

  return (
    <div className="max-w-[1400px] mx-auto  space-y-10 my-10">
      {/* ✅ ideaShares Fields */}
      <section className="text-center">
        {ideaSharesFields.length === 0 ? (
          <p className="text-gray-500">No idea share fields found.</p>
        ) : (
          <div className="space-y-6">
            {ideaSharesFields.map((field) => (
              <div
                key={field._id}
                className="p-6 bg-white/60 backdrop-blur-md shadow-lg rounded-2xl border border-gray-100"
              >
                <h3 className="font-semibold text-3xl text-teal-700 mb-4">
                  {field.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed text-justify">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Idea Shares Section */}
      <section>
        {ideaSharess.length === 0 ? (
          <p className="text-gray-500 text-center">No ideas found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {ideaSharess.map((item, index) => (
              <div
                key={item._id}
                className="group relative bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Image */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={item.ideaShareImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h2 className="text-xl font-semibold text-teal-700">
                    {item.name}
                  </h2>

                  {/* Render HTML description safely */}
                  <div
                    className="text-gray-700 text-sm leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t mt-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors"
                    >
                      🔗 Visit Link
                    </a>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default IdeaShare;
