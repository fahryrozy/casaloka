import React from "react";

const TontonVideo: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  // Extract the video ID from the provided URL
  const videoId = videoUrl && videoUrl.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h3 className="font-bold text-xl mb-2">Tonton Video</h3>
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TontonVideo;
