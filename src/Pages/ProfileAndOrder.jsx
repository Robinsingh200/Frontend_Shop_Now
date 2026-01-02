import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Package, Camera, MapPin, Save, RefreshCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "@/config/app";

import { setProducts } from "@/ReduxToolKit/UserData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

export const ProfileAndOrder = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { userId } = useParams();


    const [orders, setOrders] = useState([]);
    const [file, setFile] = useState(null);
    const [userData, setUserData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        gmail: user?.gmail || "",
        zipCode: user?.zipCode || "",
        Phoneno: user?.Phoneno || "",
        address: user?.address || "",
        city: user?.city || "",
        avatar: user?.avatar || "",
    });

    // Profile input change
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Profile image change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setUserData((prev) => ({
            ...prev,
            avatar: URL.createObjectURL(selectedFile),
        }));
    };

    // Profile form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            Object.keys(userData).forEach((key) => {
                if (key !== "avatar") formData.append(key, userData[key]);
            });

            if (file) formData.append("file", file);

            const response = await axios.put(
                `${API_URL}/update/${userId}`,
                formData
            );

            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setProducts(response.data.user));
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Profile update failed"
            );
        }
    };


    // Fetch user orders
 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/shop-products/card-shop/alldata`
      );
      setOrders(response.data.orders || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch orders"
      );
    }
  };

  fetchOrders();
}, []);


    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Account Settings
                    </h1>
                    <p className="text-slate-500">
                        Update your personal details and manage your order history.
                    </p>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 shadow-sm border">
                        <TabsTrigger value="profile" className="flex items-center gap-2">
                            <User className="w-4 h-4" /> Profile
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="flex items-center gap-2">
                            <Package className="w-4 h-4" /> Orders
                        </TabsTrigger>
                    </TabsList>

                    {/* --- PROFILE TAB --- */}
                    <TabsContent value="profile" className="animate-in fade-in duration-500">
                        <Card className="border-none shadow-lg overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300" />
                            <CardContent className="relative px-6 md:px-10 pb-10">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col md:flex-row gap-8">
                                        {/* Profile Image */}
                                        <div className="flex flex-col items-center -mt-16 md:w-1/3">
                                            <div className="relative group">
                                                <img
                                                    src={userData.avatar || "../public/products/profile.webp"}
                                                    alt="Profile"
                                                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl group-hover:brightness-90 transition-all"
                                                />
                                                <label className="absolute bottom-2 right-2 p-2.5 bg-pink-600 text-white rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                                                    <Camera className="w-5 h-5" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <h3 className="font-bold text-xl text-slate-800">{user?.firstName}</h3>
                                                <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {user?.city || "Location not set"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Form Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-2/3 pt-4">
                                            {["firstName", "lastName", "gmail", "Phoneno", "zipCode", "address", "city"].map((field) => (
                                                <div key={field} className="space-y-2 md:col-span-2">
                                                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                                    <Input
                                                        name={field}
                                                        placeholder={field}
                                                        value={userData[field]}
                                                        onChange={handleChange}
                                                        className="bg-slate-50/50"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-10 flex justify-end gap-3 border-t pt-8">
                                        <Button variant="outline" type="button">Discard</Button>
                                        <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white min-w-[140px] gap-2">
                                            <Save className="w-4 h-4" /> Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>



                    {/* --- ORDERS TAB --- */}
                    <TabsContent value="orders" className="animate-in slide-in-from-bottom-4 duration-500">
                        <Card className="shadow-lg border-none">
                            <CardHeader className="border-b bg-slate-50/50 flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl">Purchase History</CardTitle>
                                    <CardDescription>View and track your previous orders.</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" className="text-slate-400" onClick={() => window.location.reload()}>
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="py-6 flex flex-col items-center gap-4">
                                {orders.length === 0 ? (
                                    <>
                                        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                                            <Package className="w-10 h-10 text-pink-300" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-800">No orders found</h3>
                                        <p className="text-slate-500 text-center max-w-[280px] mt-1">
                                            You haven't placed any orders yet. Start exploring our collection!
                                        </p>
                                        <Button className="mt-8 bg-slate-900 hover:bg-slate-800 px-10" onClick={() => Navigate("/shop-products")}>
                                            Go Shopping
                                        </Button>
                                    </>
                                ) : (
                                    <div className="w-full flex flex-col gap-4">
                                        {orders.map((order) => (
                                            <div key={order._id} className="border p-4 rounded-lg w-full">
                                                <h3 className="font-bold">Order ID: {order._id}</h3>
                                                <p>Status: <span className="text-green-600">{order.paymentStatus}</span></p>
                                                <p>Total Amount: ₹{order.totalAmount}</p>
                                                <div className="mt-2">
                                                    <h4 className="font-semibold">Products:</h4>

                                                    {order.products.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className=" items-center p-4 mb-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                                        >
                                                            <div className=" border-b-2 mb-5">
                                                                <p className=" transition-shadow rounded-b-2xl bg-gay mb-2">Purchased on: {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                })}</p>

                                                            </div>

                                                            {/* Left Side: Image & Name */}
                                                            <div className="flex items-center gap-4">
                                                                {item.image ? (
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="w-20 h-20 object-cover rounded-lg bg-gray-50 border border-gray-200"
                                                                    />
                                                                ) : (
                                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                                        No Image
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                                </div>
                                                            </div>

                                                            <div className="text-right">
                                                                {/* <p className="text-sm text-gray-400 line-through">
                                                                    ₹{item.price} each
                                                                </p> */}
                                                                <p className="text-xl font-bold text-gray-600">
                                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                                </p>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
