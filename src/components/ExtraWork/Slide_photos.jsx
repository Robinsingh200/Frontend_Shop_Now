import React from "react";
import { Carousel } from "flowbite-react";

export const Slide_photos = () => {
  return (
    <div className="h-48 sm:h-56 xl:h-56 2xl:h-56 mb-10 ml-10 mr-10">
      <Carousel slide={true} slideInterval={2000}>
        <img src="https://res.cloudinary.com/daplqp2ck/image/upload/v1767352722/Slide-2_s57h4c.webp" alt="slide-1" />
        <img src="https://res.cloudinary.com/daplqp2ck/image/upload/v1767352717/slide-3_fyqzjb.webp" alt="slide-2" />
        <img src="https://res.cloudinary.com/daplqp2ck/image/upload/v1767352704/image_gponsj.png" alt="slide-2" />
      </Carousel>
    </div>
  );
};
