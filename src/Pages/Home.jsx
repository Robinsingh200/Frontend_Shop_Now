import { FcShop } from "react-icons/fc";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiShoppingCart2Line, RiAdminFill } from "react-icons/ri";
import { TbShoppingBag } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Feature } from "@/components/ExtraWork/Feature";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setProducts } from "@/ReduxToolKit/UserData";
import { API_URL } from "@/config/app";


export const Home = () => {
  let user = useSelector((state) => state.user);
  const [login, setLogin] = useState(false);
  const currentUser = user?.role === "admin"
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const UserLogOut = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);

    if (response.data.success) {
      dispatch(setProducts(null));
      toast.success("Logout successfully");
      navigate("/");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to logout"
    );
  }
};



  return (
    < div>
      <section className="flex items-center justify-between w-full px-40 py-3 bg-white shadow-md sticky top-0 z-50 border-b border-gray-100 ">

        <div className="">
          <p className="font-bold text-3xl flex justify-center items-center gap-3"><FcShop />
            Shop<span className="text-red-500">Now</span>
          </p>
        </div>


        <div className="flex items-center gap-10">
          <ul className="flex gap-6 font-serif text-lg">
            <li className="border-l border-gray-700 pl-10">
              <Link to={'/'}>Home</Link>
            </li>
            <li className="border-l border-gray-700 pl-10">
              <Link to={'/shop-products'}>Products</Link>
            </li>
          </ul>



          <div className="relative"
            onClick={() => setLogin(false)}>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLogin(!login)
              }}
              className="flex items-center gap-2 h-[60px] border-l border-gray-700 pl-4 pr-2"
            >

              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="h-[45px] w-[45px] rounded-full object-cover"
                />
              ) : (
                <CgProfile className="text-3xl" />
              )
              }
              <span>Profile</span>
            </button>

            {login && (
              <div className="absolute mt-2 border border-gray-200 rounded-xl shadow-xl w-[200px] bg-white z-50 p-4 space-y-3">
                <div className="border-b pb-3">
                  <h2 className="text-lg font-bold">Hello {user?.firstName || "Guest"} </h2>
                  <p className="text-xs text-gray-500">
                    To access your Shop Now account
                  </p>
                </div>

                <div className="flex justify-center">
                  {
                    user ? <button className="bg-[#9F2089] hover:bg-purple-800 text-white font-semibold w-full rounded-md p-2 transition text-center" onClick={() => UserLogOut()}>Logout</button> : <button onClick={() => navigate('/login')} className="bg-[#9F2089] hover:bg-purple-800 text-white font-semibold w-full rounded-md p-2 transition text-center">Login</button>
                  }

                </div>

                <div className="border-t pt-3" onClick={() => navigate(`/shop-products/profile/${user._id}`)}>
                  <button className="flex items-center text-gray-700 hover:text-gray-500 transition w-full cursor-pointer">
                    <TbShoppingBag size={20} className="mr-3" />
                    My Profile Data
                  </button>
                </div>

                {
                  currentUser ?
                    <div className="border-t pt-3" onClick={() => navigate(`/dashboard`)}>
                      <button className="flex items-center text-gray-700 hover:text-gray-500 transition w-full  cursor-pointer">
                        <RiAdminFill size={20} className="mr-3" />
                        Admin
                      </button>
                    </div> : null
                }

                <div className="border-t pt-3">
                  <button className="w-full text-left text-red-500 hover:text-red-700 transition">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}


          <Link to={'/shop-products/card-shop'}>
            {
              user ?
                <div className="flex items-center gap-2 border-l border-gray-700 pl-4 cursor-pointer">
                  <RiShoppingCart2Line className="text-3xl" />
                  <span>Cart</span>
                </div> : (
                  ""
                )
            }
          </Link>

        </div>

      </section >

      <nav className="">
        <img
          src="https://res.cloudinary.com/daplqp2ck/image/upload/v1767286286/image_eqi3y2.png"
          className="w-full"
        />

      </nav>

      {/* Addittion Feature  */}

      <Feature />
    </div >
  );
};

