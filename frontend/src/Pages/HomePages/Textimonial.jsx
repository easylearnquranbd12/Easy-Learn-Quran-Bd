import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import TittleAnimation from "../../components/TittleAnimation/TittleAnimation";
// import banner from "/Banner.jpg";

const Testimonial = () => {
  const banner = "https://static.vecteezy.com/system/resources/previews/028/885/619/large_2x/modern-banner-background-design-banner-template-with-dynamic-wave-shapes-free-vector.jpg"
  return (
    <div>
      <TittleAnimation
        tittle=" Students Reviews"
        subtittle="Course Complete Students"
      />
      <section className=" py-12 px-4 rounded-md">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="max-w-4xl mx-auto"
        >
          {/* Testimonial 1 */}

          <SwiperSlide>
            <div className="bg-white border-l-4 border-indigo-600 shadow-md rounded-lg p-5 lg:p-10 flex flex-col gap-4 min-h-[450px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner || "https://static.vecteezy.com/system/resources/previews/028/885/619/large_2x/modern-banner-background-design-banner-template-with-dynamic-wave-shapes-free-vector.jpg"}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-indigo-600">Alex P.</p>
                  <div className="text-yellow-500 text-base">★★★★★</div>
                </div>
              </div>

              <p className="text-gray-700 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis iste voluptas eveniet soluta iure harum assumenda
                aliquid possimus nobis voluptatem accusamus sequi neque facere
                dolorem commodi, mollitia ratione delectus quasi! Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Quam maxime unde
                eos, nisi repellat eligendi illo architecto aliquam sint.
              </p>
            </div>
          </SwiperSlide>

          {/* Testimonial 2 */}
          <SwiperSlide>
            <div className="bg-white border-l-4 border-blue-600 shadow-md rounded-lg p-8 lg:p-10 flex flex-col gap-4 min-h-[450px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-blue-600">Alex P.</p>
                  <div className="text-yellow-500 text-base">★★★★★</div>
                </div>
              </div>

              <p className="text-gray-700 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis iste voluptas eveniet soluta iure harum assumenda
                aliquid possimus nobis voluptatem accusamus sequi neque facere
                dolorem commodi, mollitia ratione delectus quasi! Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Quam maxime unde
                eos, nisi repellat eligendi illo architecto aliquam sint.
              </p>
            </div>
          </SwiperSlide>

          {/* Testimonial 3 */}

          <SwiperSlide>
            <div className="bg-white border-l-4 border-orange-600 shadow-md rounded-lg p-8 lg:p-10 flex flex-col gap-4 min-h-[450px]">
              <div className="flex items-start gap-4">
                <img
                  src={banner}
                  alt="Client"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-orange-600">Alex P.</p>
                  <div className="text-yellow-500 text-base">★★★★★</div>
                </div>
              </div>

              <p className="text-gray-700 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis iste voluptas eveniet soluta iure harum assumenda
                aliquid possimus nobis voluptatem accusamus sequi neque facere
                dolorem commodi, mollitia ratione delectus quasi! Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Quam maxime unde
                eos, nisi repellat eligendi illo architecto aliquam sint.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Testimonial;
