import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdSearch } from "react-icons/md";
import { NotebookPen, Trash, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { setProducts } from '@/ReduxToolKit/Products';
import { API_URL } from "@/config/app";
import { setSearchQuery } from "@/ReduxToolKit/Searching";


export const Adminproduct = () => {
  const products = useSelector((state) => state.product.products) || []
  const searchQuery = useSelector(state => state.search.query)

  console.log("Admin ", products);
  const dispatch = useDispatch();

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {

      const response = await axios.delete(
        `${API_URL}/admin/delete/${productId}`, {
        withCredentials: true
      }
      )

      if (response.data.success) {
        toast.success(response?.data?.message)

        const updateProduct = products.filter((item) => item._id !== productId)
        dispatch(setProducts(updateProduct))
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Delete failed");
    }

  }

  
  const FilterDataForSearch = products.filter((item) =>
       item.productsName.toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  return (
    <section>
      <div className="flex items-center border border-gray-300 w-96 p-1 rounded-xl ml-5 sticky top-0">
        <MdSearch className="text-2xl ml-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="search....."
          className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 px-2"
        />
      </div>

      <main className='' >

        {
          FilterDataForSearch.map((item) => (
            <div key={item._id}>

              <div className=' border border-gray-500 flex gap-5  m-5 p-2 rounded-xl'>
                <img src={item.productsImg[0].url || "No image"} alt="" width={70} height={70} className='rounded-xl' />
                <span className='w-96 mt-2'>{item.productsName}</span>
                <span className='flex justify-center items-center text-xl font-semibold'>₹{item.productsPrice}</span>

                <div className=' flex items-center ml-60 gap-5'>
                  <NotebookPen className='text-green-500' />
                  <Trash2 className='text-xl text-red-500' onClick={() => handleDelete(item._id)} />
                </div>
              </div>

            </div>
          ))
        }
      </main>

    </section>
  )
}
