import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../componenets/Navbar.tsx";

type Video = {
  title: string;
  link: string;
};

const Course = () => {
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/load-recommendation`);

        if (response.ok) {
          let data = await response.json();
          console.log("Fetched videos:", data);
          setRecommendedVideos(data); // ✅ Store the fetched data
        } else {
          console.log("API request failed");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    const fetchTrendingVideos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/load-trending`);

        if (response.ok) {
          let data = await response.json();
          console.log("Fetched videos:", data);
          setTrendingVideos(data); // ✅ Store the fetched data
        } else {
          console.log("API request failed");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingVideos();
  }, []); 

  return (
    <>
      <Navbar />

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Recommended Videos</h2>

        {loading ? (
          <p className="text-gray-500">Loading videos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedVideos.length > 0 ? (
              recommendedVideos.map((video, index) => (
                <a 
                  key={index} 
                  href={video.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
                >
                  <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold">
                    Thumbnail
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{video.title}</h3>
                </a>
              ))
            ) : (
              <p className="text-gray-500">No videos found.</p>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Trending Topics</h2>

        {loading ? (
          <p className="text-gray-500">Loading videos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trendingVideos.length > 0 ? (
              trendingVideos.map((video, index) => (
                <a 
                  key={index} 
                  href={video.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
                >
                  <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold">
                    Thumbnail
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{video.title}</h3>
                </a>
              ))
            ) : (
              <p className="text-gray-500">No videos found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Course;
