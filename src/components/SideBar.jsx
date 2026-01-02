import {
  MdDashboard,
  MdBorderColor
} from "react-icons/md";
import {
  GrUserManager,
  GrAdd
} from "react-icons/gr";
import { BiBookAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const user = useSelector((state) => state.user);

  const base =
    "group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200";
  const active = "bg-pink-600 text-white shadow";
  const inactive =
    "text-gray-600 hover:bg-pink-50 hover:text-pink-600";

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r p-4">

      <nav className="h-full flex flex-col gap-2 rounded-2xl">

        {/* LOGO */}
        <div className="mb-6 py-4 px-2 border-b">
          <h2 className="text-xl font-black text-gray-800 uppercase italic">
            Admin
            <span className="text-pink-600 ml-2">
              {user.firstName}
            </span>
          </h2>
        </div>

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <MdDashboard className="text-xl" />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/allUser"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <GrUserManager className="text-xl" />
          Customers
        </NavLink>

        <NavLink
          to="/dashboard/adminproduct"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <BiBookAdd className="text-xl" />
          Products
        </NavLink>

        <NavLink
          to="/dashboard/add"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <GrAdd className="text-xl" />
          Add Products
        </NavLink>

        <NavLink
          to="/dashboard/adminOrder"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <MdBorderColor className="text-xl" />
          Orders
        </NavLink>

        {/* LOGOUT */}
        <div className="mt-auto p-4 rounded-xl border border-dashed flex items-center gap-3 cursor-pointer text-gray-600 hover:bg-gray-100">
          <FiLogOut />
          Logout
        </div>

      </nav>
    </aside>
  );
};
