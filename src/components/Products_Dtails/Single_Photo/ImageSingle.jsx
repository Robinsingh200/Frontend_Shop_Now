import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import axios from 'axios';
import { toast } from 'sonner';
import { setCart } from '@/ReduxToolKit/Products';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const ImageSingle = ({ images, productId }) => {
  const [image, setImgae] = useState(images[0].url);
  const dispatch = useDispatch()
  const nevigate = useNavigate()

  const handleImage = (url) => {
    //  console.log(index);
    setImgae(url)
  }



  const prductCard = async (productId) => {
    console.log('hello');

    try {
      const response = await axios.post("http://localhost:1000/api/cartAdd",
         { productId }
        );

      if (response.data.success) {
        dispatch(setCart(response.data.cart));
        toast.success("add succesfully")
      }

    } catch (error) {
      return toast.error(error?.response?.data.message || "Product add to filed")
    }

  };



  return (
    <div className=' flex gap-5 w-max'>
      <div className='flex flex-col gap-10 ml-20 mt-6' >
        {
          images.map((img, index) => (
            <div key={index}>
              <img onClick={() => handleImage(img.url)} src={img.url} alt="" className='cursor-pointer w-20 h-20 shadow-lg rounded-xs' />
            </div>
          ))
        }
      </div>

      <div>

        <Zoom>
          <div className='border border-gray rounded-xs p-5 w-[500px] flex justify-center'>
            <img src={image} alt="" className='rounded-xs shadow-lg h-[500px] ' />
          </div>
        </Zoom>

        <div className='flex w-[480px] gap-10 ml-4 mt-3 justify-center items-center'>

          <button className='flex items-center  gap-2 font-semibold border w-96 h-15 justify-center rounded-sm text-xl text-[#9F2089]' onClick={(e) => {
            e.preventDefault();
            prductCard(productId);
          }} >
            <GiShoppingCart className='text-3xl ' onClick={(e) => {
              e.preventDefault();
              prductCard(productId);
            }} />Add cart
          </button>


          <button className='flex items-center font-semibold gap-2 border w-96 h-15 justify-center bg-[#9F2089] text-white rounded-sm text-xl' onClick={(e) => {
            e.preventDefault();
            prductCard(productId);
            nevigate('/shop-products/card-shop')
          }} ><MdOutlineKeyboardDoubleArrowRight className='  text-3xl' />Buy Now</button>
        </div>


        <p className=' border border-b-black-600 mt-10'></p>
      </div>

    </div>
  )
}
