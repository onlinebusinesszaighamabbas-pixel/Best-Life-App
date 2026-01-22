import { useQuery } from "@tanstack/react-query";
import VideoCard from "@/components/VideoCard";
import { ads, videos } from "@db/schema";

export default function Home() {
  // ویڈیوز اور اشتہارات کا ڈیٹا حاصل کرنا
  const { data: allVideos } = useQuery({ queryKey: ["/api/videos"] });
  const { data: allAds } = useQuery({ queryKey: ["/api/ads"] });

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory">
      {allVideos?.map((video, index) => (
        <div key={video.id}>
          {/* اصلی ویڈیو */}
          <VideoCard video={video} />

          {/* ہر 5 ویڈیوز کے بعد ایک کمپنی ایڈ دکھائیں (50 سلاٹس میں سے) */}
          {(index + 1) % 5 === 0 && allAds && allAds.length > 0 && (
            <div className="h-screen w-full snap-start relative flex items-center justify-center bg-zinc-900">
              <video 
                src={allAds[Math.floor(Math.random() * allAds.length)].mediaUrl} 
                className="w-full h-full object-cover"
                autoPlay loop muted
              />
              <div className="absolute bottom-20 left-0 right-0 p-4 text-center">
                <button 
                  onClick={() => window.open(allAds[0].targetLink)}
                  className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg"
                >
                  Visit Sponsor
                </button>
              </div>
              <div className="absolute top-10 right-5 bg-black/50 px-3 py-1 rounded text-xs">
                Sponsored Ad
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
