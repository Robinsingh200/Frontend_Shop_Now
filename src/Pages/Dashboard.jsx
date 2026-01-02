import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GrUserManager } from 'react-icons/gr'
import { FcSalesPerformance, FcMoneyTransfer } from 'react-icons/fc'
import { CgShoppingCart } from 'react-icons/cg'
import axios from 'axios'
import { Last30DaysSales } from './Admin/Last30DaysSales'
import { API_URL } from "@/config/app";

export const Dashboard = () => {
  const user = useSelector((state) => state.user)

  const [userLength, setUserLength] = useState([])
  const [productLength, setProductLength] = useState([])
  const [orderLength, setOrderLength] = useState([])
  const [revenueLength, setRevenueLength] = useState(0)

  // USERS
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/alluser`)
        if (res.data.success) setUserLength(res.data.User || [])
      } catch (err) {
        console.error("User fetch failed");
      }
    }
    getAllUsers()
  }, [])

  // PRODUCTS
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`)
        if (res.data.success) setProductLength(res.data.products || [])
      } catch (err) {
        console.error("Product fetch failed");
      }
    }
    getAllProducts()
  }, [])

  // ORDERS + REVENUE
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/shop-products/card-shop/alldata`
        )

        if (res.data.success) {
          setOrderLength(res.data.orders || [])

          const revenue = res.data.orders.reduce(
            (acc, item) => acc + (item.totalAmount || 0),
            0
          )
          setRevenueLength(revenue)
        }
      } catch (err) {
        console.error("Order fetch failed");
      }
    }
    getAllOrders()
  }, [])

  return (
    <section className="p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Hello <span className="font-semibold text-gray-700">
            {user.firstName}
          </span>, welcome back 👋
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-100 rounded-full">
            <GrUserManager className="text-3xl text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold">{userLength.length}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-green-100 rounded-full">
            <CgShoppingCart className="text-3xl text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl font-bold">{orderLength.length}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-purple-100 rounded-full">
            <FcMoneyTransfer className="text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-2xl font-bold">{productLength.length}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-pink-100 rounded-full">
            <FcSalesPerformance className="text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold">₹ {revenueLength}</h2>
          </div>
        </div>

      </div>

      {/* SALES GRAPH */}
      <Last30DaysSales orders={orderLength} />
    </section>
  )
}
