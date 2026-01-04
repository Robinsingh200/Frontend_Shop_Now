import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { ShowCart } from './ShowCart';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/ReduxToolKit/Products';
import { API_URL } from '@/config/app';

export const Card_Itam = () => {
  const [GetData, SetData] = useState([])
  const searchQuery = useSelector((state) => state.search.query);

  const dispatch = useDispatch()

  console.log("Check", API_URL);


  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        withCredentials: true
      })

      if (response.data.success) {
        SetData(response.data.products);
        dispatch(setProducts(response.data.products))
      }
    } catch (error) {
      return toast.error(error?.response?.data.message || "Products fatching failed")
    }

  };

  const FilterDataForSearch = GetData.filter((item) =>
      item.productsName.toLowerCase()
      .includes(searchQuery.toLowerCase())
  )


  useEffect(() => {
    getProducts();
  }, [])

  return (
    <main >
      <ShowCart FilterDataForSearch={FilterDataForSearch} />
    </main>
  )
}

