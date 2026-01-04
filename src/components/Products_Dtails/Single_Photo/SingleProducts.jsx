import React from "react";
import { useParams } from "react-router-dom";
import { ImageSingle } from "./ImageSingle";
import { SingleDescription } from "./SingleDescription";
import { useSelector } from "react-redux";
import { BreadCursum } from "./BreadCursum";
import { Recomended_Photos } from "./Recomended_Photos";


export const SingleProducts = () => {
  const { id } = useParams();

  const { products } = useSelector(
    (state) => state.product
  );

  const singleProduct = products.find(
    (item) => item._id === id
  );

  console.log("id:", id);

  if (!singleProduct) {
    return <p className="m-10">Loading product...</p>;
  }

  return (
    <section className="mb-20">
      <div className="ml-20 font-semibold mb-8">
        <BreadCursum singleProduct={singleProduct} />
      </div>

      <main className="flex">
        <ImageSingle images={singleProduct.productsImg} productId={singleProduct._id} />
        <SingleDescription description={singleProduct} />
      </main>

      <div>
        <Recomended_Photos />
      </div>
    </section>
  );
};
