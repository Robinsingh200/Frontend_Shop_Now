import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'


export const SingleDescription = ({ description }) => {
  console.log("this on", description);

  return (
    <section className='ml-5'>
      <div className='border rounded-sm ml-10 h-40 mr-10'>
        <h1 className='ml-5 mt-2'>{description.productsName} </h1>
        <h1 className='ml-5 mt-2 text-2xl font-semibold'>₹ {description.productsPrice} </h1>

        <div className={`w-16 rounded-2xl ml-5 mt-3 ${description.rating > 4 ? "bg-[#038D63]" : "bg-[#23BB75]"}`}>
          <p className="flex justify-center items-center gap-1 text-white">{description.rating} <AiOutlineStar className='text-white' /></p>
        </div>

        <div className='w-20 rounded-2xl bg-[#F8F8FF] p-1.5 mt-3 ml-5'>
          <p className="text-xs">Free delivery</p>
        </div>
      </div>

      <div className="border w-[650px] m-10 rounded-md p-5 ">
        <h1 className="text-xl font-bold mb-4">Select Size</h1>

        <ul className="flex gap-4">

          {/* XS – Disabled */}
          <li className="flex flex-col items-center border rounded-full px-4 py-1 text-gray-400 border-gray-300">
            <span className="font-bold">XS</span>
            <span className="text-xs">{description.productsPrice}</span>
          </li>

          {/* S – Disabled */}
          <li className="flex flex-col items-center border rounded-full px-4 py-1 text-gray-400 border-gray-300">
            <span className="font-bold">S</span>
            <span className="text-xs">{description.productsPrice}</span>
          </li>

          {/* M – ACTIVE (Pink) */}
          <li className="flex flex-col items-center border rounded-full px-4 py-1 text-gray-400 border-gray-300">
            <span className="font-bold">M</span>
            <span className="text-xs">{description.productsPrice}</span>
          </li>

          {/* L – Normal */}
          <li className="flex flex-col items-center border rounded-full px-4 py-1 text-gray-400 border-gray-300">
            <span className="font-bold">L</span>
            <span className="text-xs text-gray-600">{description.productsPrice}</span>
          </li>

          {/* XL – Normal */}
          <li className="flex flex-col items-center border rounded-full px-4 py-1 text-gray-400 border-gray-300">
            <span className="font-bold">XL</span>
            <span className="text-xs text-gray-600">{description.productsPrice}</span>
          </li>

          {/* XXL – Disabled */}
          <li className="flex flex-col items-center border rounded-full px-4 py-1 text-gray-400 border-gray-300">
            <span className="font-bold">XXL</span>
            <span className="text-xs">{description.productsPrice}</span>
          </li>
        </ul>
      </div>
      <article className="mx-10 border rounded-md p-6 shadow-sm">
        {/* Brand Section */}
        <section className="mb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Brand Name & Category
          </h3>
          <p className="mt-1 text-lg font-medium">
            {description.BrandName} | {description.Category}
          </p>
        </section>

        {/* Description Section */}
        <section>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Product Description
          </h3>
          <p className="mt-1 text-gray-700 leading-relaxed">
            {description.productDescription}
          </p>
        </section>
      </article>
    </section>
  )
}
