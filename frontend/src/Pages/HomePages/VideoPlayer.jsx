// import axios from "axios";
// import { useEffect, useState } from "react";

// const VideoPlayer = () => {
//   const [isPlayable, setIsPlayable] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isIframeLoaded, setIsIframeLoaded] = useState(false);
//   const [showSkeleton, setShowSkeleton] = useState(false);
//   const [checking, setChecking] = useState(true);
//   const [videoId, setVideoId] = useState(null);

//   // 🔷 Extract YouTube ID from URL
//   const extractVideoId = (url) => {
//     if (typeof url !== "string") return null;
//     const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
//     return match ? match[1] : null;
//   };


//   // 🔷 Fetch active video from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/youtube-video/active")
//       .then((res) => {
//         const fullUrl = res.data?.title;
//         const id = extractVideoId(fullUrl);
//         if (id) setVideoId(id);
//         else setChecking(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching active video:", err);
//         setChecking(false);
//       });
//   }, []);

//   // 🔷 Check iframe loadability
//   useEffect(() => {
//     if (!videoId) return;

//     const testIframe = document.createElement("iframe");
//     testIframe.src = `https://www.youtube.com/embed/${videoId}`;
//     testIframe.style.display = "none";

//     const timeout = setTimeout(() => {
//       setIsPlayable(false);
//       setChecking(false);
//     }, 3000);

//     testIframe.onload = () => {
//       clearTimeout(timeout);
//       setIsPlayable(true);
//       setChecking(false);
//     };

//     document.body.appendChild(testIframe);

//     return () => {
//       clearTimeout(timeout);
//       document.body.removeChild(testIframe);
//     };
//   }, [videoId]);

//   const handlePlay = () => {
//     setIsPlaying(true);
//     setIsIframeLoaded(false);
//     setShowSkeleton(false);

//     setTimeout(() => {
//       if (!isIframeLoaded) {
//         setShowSkeleton(true);
//       }
//     }, 500);
//   };

//   useEffect(() => {
//     if (isIframeLoaded) {
//       setShowSkeleton(false);
//     }
//   }, [isIframeLoaded]);

//   return (
//     <div className="w-full max-w-7xl mx-auto mt-10 md:p-4 rounded-md aspect-video relative">
//       <div className="w-full h-full rounded-md overflow-hidden relative">
//         {/* 🔶 Skeleton Loader */}
//         {(showSkeleton || checking || !isPlayable) && (
//           <div className="absolute inset-0 z-30 bg-white/70 flex items-center justify-center rounded-md">
//             <div className="skeleton w-20 h-20 rounded-full"></div>
//           </div>
//         )}

//         {/* 🔶 YouTube Video Embed */}
//         {videoId && (
//           <iframe
//             className="w-full h-full rounded-md"
//             src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
//             title="YouTube video player"
//             frameBorder="0"
//             onLoad={() => setIsIframeLoaded(true)}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         )}

//         {/* 🔶 Play Button */}
//         {!isPlaying && !checking && isPlayable && (
//           <button
//             onClick={handlePlay}
//             className="absolute top-1/2 left-1/2 z-40 transform -translate-x-1/2 -translate-y-1/2 bg-[#1f4e43] text-white rounded-full p-5 transition-all hover:scale-110 hover:bg-[#508f80] shadow-xl"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-10 h-10"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
import axios from "axios";
import { useEffect, useState } from "react";

const VideoPlayer = () => {
  const [isPlayable, setIsPlayable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mediaData, setMediaData] = useState(null);
  const [showThumbnail, setShowThumbnail] = useState(true);

  // Extract YouTube ID from URL
  const extractVideoId = (url) => {
    if (typeof url !== "string") return null;
    const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  // Fetch active media from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/media/active")
      .then((res) => {
        const data = res.data;
        if (data) {
          setMediaData({
            ...data,
            videoId: data.mediaType === 'video' ? extractVideoId(data.mediaUrl) : null
          });
        }
        setChecking(false);
      })
      .catch((err) => {
        console.error("Error fetching active media:", err);
        setChecking(false);
      });
  }, []);

  // Check iframe loadability for videos
  useEffect(() => {
    if (!mediaData?.videoId) return;

    const testIframe = document.createElement("iframe");
    testIframe.src = `https://www.youtube.com/embed/${mediaData.videoId}`;
    testIframe.style.display = "none";

    const timeout = setTimeout(() => {
      setIsPlayable(false);
      setChecking(false);
    }, 3000);

    testIframe.onload = () => {
      clearTimeout(timeout);
      setIsPlayable(true);
      setChecking(false);
    };

    document.body.appendChild(testIframe);

    return () => {
      clearTimeout(timeout);
      document.body.removeChild(testIframe);
    };
  }, [mediaData?.videoId]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsIframeLoaded(false);
    setShowSkeleton(false);
    setShowThumbnail(false);

    setTimeout(() => {
      if (!isIframeLoaded) {
        setShowSkeleton(true);
      }
    }, 500);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setShowThumbnail(true);
  };

  useEffect(() => {
    if (isIframeLoaded) {
      setShowSkeleton(false);
    }
  }, [isIframeLoaded]);

  if (!mediaData) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-10 p-4 text-center">
        {checking ? (
          <div className="skeleton w-full h-64 rounded-md"></div>
        ) : (
          <p>No active media found</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      {/* Media Container */}
      <div className="relative rounded-md overflow-hidden shadow-lg">
        {/* Skeleton Loader */}
        {(showSkeleton || checking) && (
          <div className="absolute inset-0 z-30 bg-white/70 flex items-center justify-center rounded-md">
            <div className="skeleton w-20 h-20 rounded-full"></div>
          </div>
        )}

        {/* Image Display */}
        {mediaData.mediaType === 'image' && (
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
            <img
              src={mediaData.mediaUrl}
              alt={mediaData.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x450?text=Image+Not+Available";
              }}
            />
          </div>
        )}

        {/* Video Display */}
        {mediaData.mediaType === 'video' && (
          <>
            {/* Video Thumbnail */}
            {showThumbnail && !isPlaying && (
              <div className="relative w-full aspect-video">
                <img
                  src={`https://img.youtube.com/vi/${mediaData.videoId}/maxresdefault.jpg`}
                  alt={mediaData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://img.youtube.com/vi/${mediaData.videoId}/hqdefault.jpg`;
                  }}
                />
                <button
                  onClick={handlePlay}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FF0000] text-white rounded-full p-5 transition-all hover:scale-110 hover:bg-[#CC0000] shadow-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}

            {/* YouTube Video Embed */}
            {isPlaying && isPlayable && (
              <div className="relative w-full aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${mediaData.videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                  title={mediaData.title}
                  frameBorder="0"
                  onLoad={() => setIsIframeLoaded(true)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 z-10 hover:bg-black/70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

        {/* Text Display */}
        {mediaData.mediaType === 'text' && (
          <div className="w-full bg-white p-8 min-h-64">
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{mediaData.content}</p>
            </div>
          </div>
        )}
      </div>

      {/* Description/Caption */}
      {mediaData.content && mediaData.mediaType !== 'text' && (
        <div className="px-4 mt-4 text-gray-600">
          <p>{mediaData.content}</p>
        </div>
      )}
       {/* Title Section */}
      <div className="mb-4 mt-8">
        <h2 className="text-base font-medium text-gray-800">{mediaData.title}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;