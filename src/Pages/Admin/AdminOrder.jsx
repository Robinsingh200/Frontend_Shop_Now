import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { API_URL } from '@/config/app';
import { setSearchQuery } from "@/ReduxToolKit/Searching";
import { useDispatch } from 'react-redux';


export const AdminOrder = () => {
  const [OrderInfo, setOrderInfo] = useState([]);
  const searchQuery = useSelector(state => state.search.query)
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchOrder = async () => {
      if (typeof window === "undefined") return;

      try {
        const response = await axios.get(
          `${API_URL}/shop-products/card-shop/Allorder`, {
          withCredentials: true
        }
        );

        if (response.data?.success) {
          setOrderInfo(response.data.orders || []);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Order fetch failed"
        );
      }
    };

    fetchOrder();
  }, []);


  const FilterDataForSearch = OrderInfo.filter((item) =>
      item.productsName.toLowerCase()
      .includes(searchQuery.toLowerCase())
  )


  return (
    <section className=" text-slate-800 w-[1050px]">
      {/* HEADER SECTION */}
      <div className="mb-10 ml-2">
        <h1 className="font-black text-4xl text-slate-900 tracking-tight mt-5 ml-5">
          Customer Order's
        </h1>
        <p className="text-slate-500 text-lg mt-2 font-medium ml-5 ">
          Manage your team members and their account permissions.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden ml-5">

        {/* SEARCH BAR AREA */}
        <div className="p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center border-2 border-slate-100 rounded-2xl w-full md:w-[450px] px-5 py-3 shadow-sm bg-slate-50 focus-within:bg-white focus-within:border-indigo-400 transition-all">
            <svg className="w-6 h-6 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search by customer name..."
              className="flex-1 bg-transparent border-none outline-none text-base font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="bg-gray-200 p-6">
          <div className="grid grid-cols-7 gap-4 font-bold  uppercase tracking-[0.2em] text-gray-700">
            <div className="text-center">NO</div>
            <div className="text-left pl-4">NAME</div>
            <div className="text-center">PRODUCT ID</div>
            <div className="text-center">QUANTITY</div>
            <div className="text-center">AMOUNT</div>
            <div className="text-center">ORDER DATE</div>
            <div className="text-center">STATUS ODER</div>
          </div>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y divide-slate-100">
          {OrderInfo.map((userDetails, index) => {
            // Calculating total sum of quantities for this order
            const totalQty = userDetails.products?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

            return (
              <div
                key={userDetails._id}
                className="p-6 hover:bg-indigo-50/40 transition-all duration-300 group"
              >
                <div className="grid grid-cols-7 gap-4 items-center">

                  {/* NO */}
                  <div className="text-center font-mono text-slate-400 text-lg font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* NAME */}
                  <div className=" font-semibold text-lg tracking-tight pl-4 truncate uppercase">
                    {userDetails.UserId?.firstName}
                  </div>

                  {/* PRODUCT ID */}
                  <div className="text-center">
                    <span className="text-black rounded-lg text-[12px] font-semibold ">
                      {userDetails.UserId?._id || "N/A"}
                    </span>
                  </div>

                  {/* QUANTITY */}
                  <div className="text-center">
                    <div className="flex justify-center">
                      <span className="  w-10 h-10 rounded-xl flex items-center justify-center text-lg  group-hover:border-indigo-400 transition-colors">
                        {totalQty}
                      </span>
                    </div>
                  </div>

                  {/* AMOUNT */}
                  <div className="text-center font-bold text-gray-700 text-xl tracking-tighter">
                    ₹{userDetails.totalAmount?.toLocaleString()}
                  </div>

                  {/* ORDER DATE */}
                  <div className="text-center text-slate-500 font-bold text-[15px]  py-2 rounded-xl ">
                    {new Date(userDetails.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>

                  {/* STATUS */}
                  <div className="text-center">
                    <span
                      className={`px-5 py-2 rounded-xl text-[12] font-black uppercase tracking-widest transition-all group-hover:scale-105 inline-block ${userDetails.paymentStatus === "paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : userDetails.paymentStatus === "panding"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : userDetails.paymentStatus === "created"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                    >
                      {userDetails.paymentStatus || 'Unknown'}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
