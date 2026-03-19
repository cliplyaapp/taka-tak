import { useEffect, useRef, useState } from "react";

const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
];

export default function Feed() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === current) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [current]);

  const handleScroll = (e: any) => {
    const index = Math.round(
      e.target.scrollTop / window.innerHeight
    );
    setCurrent(index);
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {videos.map((src, index) => (
        <div
          key={index}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            position: "relative",
          }}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={src}
            muted
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* ❤️ Like Button */}
          <button
            style={{
              position: "absolute",
              right: "20px",
              bottom: "100px",
              fontSize: "20px",
            }}
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
}
