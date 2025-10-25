import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import hero1 from "../../assets/hero1.png";
import hero2 from "../../assets/hero2.png";
import hero3 from "../../assets/hero3.png";
import line1 from "../../assets/heropara1.png";
import ShopButton from "../ShopButton";

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: hero1,
    },
    {
      id: 2,
      image: hero2,
    },
    {
      id: 3,
      image: hero3,
    },
  ];

  return (
    <div className="relative w-full min-h-[60vh] md:min-h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation={{ clickable: true, backgroundColor: "#FFB535" }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 md:mb-4">
                    BEST SALE
                  </h1>
                  <div className="flex gap-2 mb-4 justify-center items-center">
                    <div className="flex flex-col">
                      <img src={line1} alt="" />
                    </div>{" "}
                    <span className="text-lg sm:text-2xl md:text-4xl font-semibold">
                      THE BLACK PHANTOM
                    </span>
                    <div className="flex flex-col">
                      <img src={line1} alt="" />
                    </div>
                  </div>
                  <ShopButton />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
