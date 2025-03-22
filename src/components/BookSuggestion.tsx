import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

const BookSuggestion: React.FC = () => {
  return (
    <div className="w-full  gap-4 p-4">
      <div className="">
        <h1 className="text-2xl font-medium dark:text-white">Top Choices</h1>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2500 }}
        spaceBetween={50}
        slidesPerView={5}
        loop={true}
        scrollbar={{ draggable: true }}
        navigation
        className="py-16 mb-16"
      >
        {works.map((work, index) => (
          <SwiperSlide key={index}>
            <div>
              <img
                src={work.art}
                style={{ filter: "grayscale(50%)", transition: "filter 0.3s" }}
                alt={work.artist}
                className="h-64 object-cover rounded-lg"
                onMouseOver={(e) =>
                  (e.currentTarget.style.filter =
                    "grayscale(0%) brightness(100%)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.filter = "grayscale(50%)")
                }
              />
              <p>{work.artist}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookSuggestion;
