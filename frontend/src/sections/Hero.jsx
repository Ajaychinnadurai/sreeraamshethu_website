import { useState, useRef, useEffect } from "react";

const VIDEOS = [
  "/bg_video1.mp4",
  "/bg_video2.mp4",
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoRefs = [useRef(null), useRef(null)];

  const playVideo = (index) => {
    const video = videoRefs[index]?.current;
    if (!video) return;
    if (video.readyState < 2) video.load();
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  useEffect(() => {
    const video = videoRefs[currentIdx]?.current;
    if (!video) return;
    const p = video.play();
    if (p) p.catch(() => {});
  }, [currentIdx]);

  const handleVideoEnded = () => {
    const nextIdx = (currentIdx + 1) % VIDEOS.length;
    playVideo(nextIdx);
    setCurrentIdx(nextIdx);
  };

  return (
    <section className="hero-ver">
      {/* Full-width Video Section with Native Video Frame Display */}
      <div className="hero-ver__video-container">
        {VIDEOS.map((src, index) => (
          <video
            key={src}
            ref={videoRefs[index]}
            src={src}
            preload={index === 0 ? "auto" : "metadata"}
            autoPlay={index === 0}
            muted
            playsInline
            onEnded={handleVideoEnded}
            className={`hero-ver__video ${index === currentIdx ? "is-active" : ""}`}
          />
        ))}
        <div className="hero-ver__fade-overlay" />
      </div>
    </section>
  );
}