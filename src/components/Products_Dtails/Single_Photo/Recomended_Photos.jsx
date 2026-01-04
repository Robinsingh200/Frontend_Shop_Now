import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Recomended_Photos = () => {
  const products = useSelector(
    (state) => state.product.products
  ) || [];

  const navigate = useNavigate();

  return (
    <section className="ml-20 mt-20">
      <h2 className="text-2xl font-semibold mb-6">
        People also viewed
      </h2>

      <div className="grid grid-cols-5 gap-5">
        {products.length > 0 ? (
          products.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-3 hover:shadow-md cursor-pointer"
              onClick={() => navigate(`/shop-products/${item._id}`)}
            >
              <img
                src={item.productsImg?.[0]?.url}
                alt={item.productsName}
                className="w-full h-40 object-cover rounded-md"
              />

              <div className="mt-2">
                <p className="text-gray-700 font-medium">
                  {item.productsName}
                </p>
                <p className="font-bold">
                  ₹{item.productsPrice}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No recommendations available
          </p>
        )}
      </div>
    </section>
  );
};
