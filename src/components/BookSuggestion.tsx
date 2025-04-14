import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useEffect, useState } from "react";
import { TOP_CHOICES_API } from "@/apiRoute";

const BookSuggestion: React.FC = () => {
  const [suggestion, setSuggestions] = useState<
    {
      image: string;
      author: string;
    }[]
  >([]);

  useEffect(() => {
    axios.get(TOP_CHOICES_API).then((res) => {
      setSuggestions(res.data);
    });
  }, []);

  return (
    <div className="w-full gap-4 p-4 mt-2 ">
      <div className="">
        <h1 className="text-2xl font-medium dark:text-white">Famous Books</h1>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2500 }}
        spaceBetween={50}
        slidesPerView={5}
        breakpoints={{
          390: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
        loop={true}
        scrollbar={{ draggable: true }}
        navigation
        className="py-16  mt-4 mb-6"
      >
        {suggestion.map((suggestion, index) => (
          <SwiperSlide key={index}>
            <div>
              <img
                src={suggestion.image}
                style={{
                  filter: "grayscale(50%)",
                  transition: "filter 0.3s",
                  width: "100%",
                }}
                alt={suggestion.author}
                className="h-64 object-cover  rounded-lg"
                onMouseOver={(e) => {
                  e.currentTarget.style.filter =
                    "grayscale(0%) brightness(100%)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.filter = "grayscale(50%)";
                }}
              />
              <p className="text-start">{suggestion.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookSuggestion;
