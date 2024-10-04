import React from 'react';

const videos = [
  {
    title: "First Video",
    url: "https://www.youtube.com/embed/ZJICpdknak8"
  },
  {
    title: "Second Video",
    url: "https://www.youtube.com/embed/ZJICpdknak8"
  },
  {
    title: "Third Video",
    url: "https://www.youtube.com/embed/ZJICpdknak8"
  }
];

function VideoList() {
  return (
    <div className="w-[80%] mx-auto mb-[2rem]">
      <h1 className='text-red-600 font-extrabold text-[1.8rem] md:text-[2.5rem]'>My Videos:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
        {videos.map((video, index) => (
          <div key={index} className="w-full lg:h-[20rem]">
          <iframe
            key={index}
            className="w-full h-full"
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
