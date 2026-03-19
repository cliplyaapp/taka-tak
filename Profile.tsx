import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music } from 'lucide-react';

const MOCK_VIDEOS = [
  { id: '1', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', user: '@creator1', description: 'Check out this awesome video! #fyp #viral', likes: '1.2M', comments: '45K', shares: '12K', song: 'Original Sound - creator1' },
  { id: '2', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', user: '@creator2', description: 'Having fun! 🚗💨 #cars #fun', likes: '800K', comments: '12K', shares: '5K', song: 'Trending Song - artist' },
];

export default function Feed() {
  return (
    <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar bg-black">
      {MOCK_VIDEOS.map((video) => (
        <VideoPost key={video.id} video={video} />
      ))}
    </div>
  );
}

function VideoPost({ video }: { video: any; key?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full w-full snap-start relative bg-black">
      <video
        ref={videoRef}
        src={video.url}
        className="h-full w-full object-cover"
        loop
        playsInline
        onClick={togglePlay}
      />

      {/* Right Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
        <div className="relative w-12 h-12 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.user}`} alt="avatar" className="w-full h-full object-cover" />
          <div className="absolute -bottom-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs border border-white">+</div>
        </div>

        <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1">
          <Heart className={`w-8 h-8 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          <span className="text-white text-xs font-semibold">{video.likes}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <MessageCircle className="w-8 h-8 text-white fill-white/20" />
          <span className="text-white text-xs font-semibold">{video.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <Share2 className="w-8 h-8 text-white fill-white/20" />
          <span className="text-white text-xs font-semibold">{video.shares}</span>
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-800 border-[10px] border-gray-900 animate-[spin_4s_linear_infinite] flex items-center justify-center mt-4">
          <Music className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-20">
        <h3 className="text-white font-bold text-base mb-2">{video.user}</h3>
        <p className="text-white text-sm mb-3 line-clamp-2">{video.description}</p>
        <div className="flex items-center gap-2 text-white text-sm">
          <Music className="w-4 h-4" />
          <div className="w-48 overflow-hidden">
            <div className="animate-[marquee_5s_linear_infinite] whitespace-nowrap">
              {video.song}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
