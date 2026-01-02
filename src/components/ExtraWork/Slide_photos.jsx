import React from "react";
import { Carousel } from "flowbite-react";

export const Slide_photos = () => {
  return (
    <div className="h-48 sm:h-56 xl:h-56 2xl:h-56 mb-10 ml-10 mr-10">
      <Carousel slide={true} slideInterval={2000}>
        <img src="./public/products/image.png" alt="slide-1" />
        <img src="./public/products/Slide-2.webp" alt="slide-2" />
        <img src="./public/products/Slide-2.webp" alt="slide-2" />
      </Carousel>
    </div>
  );
};
