import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { MdSearch, MdDeleteForever } from "react-icons/md";
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { API_URL } from '@/config/app';
import { BiLogoGmail } from "react-icons/bi";
import { setSearchQuery } from "@/ReduxToolKit/Searching";
import { useDispatch } from 'react-redux';

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  const searchQuery = useSelector(state => state.search.query)
  const dispatch = useDispatch()

  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/alluser`, { withCredentials: true })

        if (response.data.success) {
          setUserInfo(response.data.User)
        }

      } catch (error) {
        toast.error(
          error?.response?.data?.message || "User fetch failed"
        );

      }

    }
    fatchData()

  }, [])

  
  const FilterDataForSearch = userInfo.filter((item) =>
      item.firstName.toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  return (

    <section className=''>
      <div className='justify-center items-center'>
        <h1 className='font-semibold text-2xl text-gray-600'>User Management
        </h1>
        <span>Manage your team members and their account permissions.</span>
      </div>


      <nav className='border border-gray-400 w-auto h-auto rounded-xl shadow-md mt-5'>
        <nav className="flex items-center border border-gray-200 rounded-xl w-[400px] px-5 py-1 shadow-sm bg-white m-5">
          <MdSearch className="text-2xl text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="search......"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 px-2"
          />
        </nav>

        {/* HEADER */}
        <div className="border p-4 bg-gray-200">
          <div className="grid grid-cols-5 gap-4 ml-8 font-semibold text-gray-700">
            <div>USER INFO</div>
            <div className="text-center">ROLE</div>
            <div className="text-center">VERIFY</div>
            <div className="text-center">JOIN DATE</div>
            <div className="text-center">ACTION</div>
          </div>
        </div>

        {/* BODY */}
        {FilterDataForSearch.map((user) => (
          <div key={user._id} className="border-b p-4">
            <div className="grid grid-cols-5 gap-4 ml-8 items-center">
              <div className='font-semibold'>{user.firstName}<div className='font-normal text-gray-700 flex'><BiLogoGmail className="text-xs text-gray-600" />{user.gmail}</div></div>


              <div className="text-center font-medium">
                {user.role}
              </div>

              <div className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${user.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {user.isVerified ? "Yes" : "No"}
                </span>
              </div>

              <div className="text-center">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>

              <div className='flex justify-center '>

                <button className='flex gap-5 justify-center items-center text-2xl'><AiOutlineDelete className=' text-red-500' /><BiEdit className='text-green-400' /></button>
              </div>
            </div>
          </div>
        ))}

      </nav>

    </section>
  )
}
