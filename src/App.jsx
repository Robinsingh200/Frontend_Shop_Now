import React from "react"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Navbar } from "./components/Navbar"
import { Login } from "./Pages/Login"
import { Signup } from "./Pages/Signup"
import { Footer } from "./components/Footer"
import { VerifyEmail } from "./Pages/VerifyEmail"
import { CheckEmail } from "./Pages/VerifyShow"
import { Home } from "./Pages/Home"
import { Products } from "./Pages/Products"
import { ProfileAndOrder } from "./Pages/ProfileAndOrder"
import { AddtoCart } from "./components/PaymentAndCart/Cart"
import { Dashboard } from "./Pages/Dashboard"
import { SingleProducts } from "./components/Products_Dtails/Single_Photo/SingleProducts"

import { Add } from './Pages/Admin/Add.jsx'
import { AdminOrder } from './Pages/Admin/AdminOrder'
import { UserInfo } from './Pages/Admin/UserInfo'
import { UserOrder } from "./Pages/UserOder"
import { Dashboardlayout } from "./components/Dashboeadlayout"
import { Adminproduct } from "./Pages/Admin/Adminproduct"
import { ForgetPassword } from "./Pages/ForgetPassword" 

const router = createBrowserRouter([
  { path: '/', element: <><Home /><Footer /></> },
  { path: '/shop-products', element: <><Navbar /><Products /><Footer /></> },
  { path: '/login', element: <><Login /></> },
  { path: '/signup', element: <><Signup /></> },
  { path: '/verify-email', element: <><CheckEmail /></> },
  { path: "/EmailVerify/:token", element: <VerifyEmail /> },
  { path: "/shop-products/card-shop", element: <><Navbar /><AddtoCart /><Footer /></> },
  { path: "/shop-products/profile/:userId", element: <><Navbar /><ProfileAndOrder /><Footer/></> },
  { path: "/shop-products/Useroder", element: <><Navbar /><UserOrder /></> },
  { path: "/ForgetPassword", element: <>< ForgetPassword/></> },

  { path: "/shop-products/:id", element: <><Navbar /><SingleProducts /><Footer></Footer></> },


  {
    path: "/dashboard", element: <><Navbar /><Dashboardlayout/></>,
    children: [
      { index: true, element: <Dashboard /> }, 
      { path: "add", element: <Add /> },
      { path: "adminOrder", element: <AdminOrder /> },
      { path: "adminproduct", element: <Adminproduct /> },
      { path: "allUser", element: <UserInfo /> },
      { path: "user/oder/:userId", element: <showUser /> },
    ]
  },

])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
