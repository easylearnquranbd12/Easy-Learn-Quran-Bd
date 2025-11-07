import { useQuery } from "@tanstack/react-query";
import { Image as ImageIcon } from "lucide-react"; // ✅ Image icon import
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const NewSong = () => {
  const axiosPublic = useAxiosPublic();

  // ✅ Fetch song fields
  const { data: songFields = [], isLoading: fieldsLoading } = useQuery({
    queryKey: ["songFields"],
    queryFn: async () => {
      const res = await axiosPublic.get("/fourth-layer/goodSongField");
      return res.data?.data || [];
    },
  });

  // ✅ Fetch all good songs
  const { data: goodSongs = [], isLoading: songsLoading } = useQuery({
    queryKey: ["goodSongs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/fourth-layer/goodSongs");
      return res.data || [];
    },
  });

  const isLoading = fieldsLoading || songsLoading;

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6 space-y-10 bg-white rounded-2xl shadow-md my-10">
      {/* ✅ Song Field Section */}
      <section className="text-center">
        {songFields.length === 0 ? (
          <p className="text-gray-500">No song fields found.</p>
        ) : (
          <div>
            {songFields.map((field) => (
              <div key={field._id} className="p-4">
                <h3 className="font-semibold text-3xl">{field.title}</h3>
                <p className="text-gray-600 text-sm lg:text-base text-justify py-5">
                  {field.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Good Songs Section */}
      <section>
        {goodSongs.length === 0 ? (
          <p className="text-gray-500 text-center">No songs found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {goodSongs.map((song) => (
              <li
                key={song._id}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition"
              >
                {/* ✅ Show song image or fallback icon */}
                {song.image ? (
                  <img
                    src={song.image}
                    alt={song.songName}
                    className="h-12 w-12 object-cover rounded-md border border-gray-200"
                  />
                ) : (
                  <div className="h-12 w-12 flex items-center justify-center rounded-md bg-gray-100 border border-gray-200">
                    <ImageIcon className="text-gray-500 h-6 w-6" />
                  </div>
                )}

                <span className="font-medium text-gray-800 text-lg">
                  {song.songName}
                </span>
                {song.songLink ? (
                  <a
                    href={song.songLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-[8px] md:text-[12px]  bg-teal-600 hover:bg-teal-800  p-2 rounded-lg"
                  >
                   Watch Now
                  </a>
                ) : (
                  " "
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default NewSong;
