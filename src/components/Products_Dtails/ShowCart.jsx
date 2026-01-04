import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai'
import { useSelector } from 'react-redux';


export const ShowCart = ({ GetData }) => {
    const user = useSelector((state)=> state.user)
    const nevigate = useNavigate();
    const users = user.role == "user" || "admin"



    return (
        <section className="ml-20 grid grid-cols-4 mt-[79px] gap-3">
          
            {GetData && GetData.length > 0 ? (
                GetData.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg mb-5 p-3 shadow-sm w-full h-[370px]"
                    >


                        <img
                            className="rounded-lg w-full h-48 object-cover"
                            src={product?.productsImg[0]?.url}
                            alt=""
                            onClick={() => nevigate(`/shop-products/${product._id}`)}
                        />


                        <div className="mt-3">
                            <p className="font-serif text-gray-600">{product.productsName}</p>

                            <p className="font-bold text-2xl">₹ {product.productsPrice}</p>

                            <div className='w-20 rounded-2xl bg-[#F8F8FF] p-0.5 mb-1'>
                                <p className="text-xs">Free delivery</p>
                            </div>

                            <div className={`w-16 rounded-2xl ${product.rating > 4 ? "bg-[#038D63]" : "bg-[#23BB75]"}`}>
                                <p className="flex justify-center items-center gap-1 text-white">{product.rating} <AiOutlineStar className='text-white' /></p>
                            </div>


                        </div>
                    </div>

                ))
            ) : (
                <div className="col-span-4 mt-10 p-5 text-center text-gray-500 border rounded-lg w-full">
                    <p>No products found matching your current filters</p>
                </div>


            )}

        </section>
    )
}
