import { useDispatch, useSelector } from "react-redux";
import React from "react";
import axios from "axios";
import { setCart } from "@/ReduxToolKit/Products";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "@/config/app"
import { RAZORPAY_KEY } from "@/config/app";

export const AddtoCart = () => {
    const { cart } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const nevigate = useNavigate()

    const ItemButtonHandle = async (productId, type) => {
        try {
            const response = await axios.patch(`${API_URL}/cartupdate`,
                { productId, type },
                {withCredentials:true}
            );
            if (response?.data?.success) {
                dispatch(setCart(response.data.cart))
            }
        } catch (error) {
            console.log(error);

        }

    }



    const HandlePayment = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/shop-products/card-shop/payment`,
                {
                    amount: cart.totalPrice,
                    cartItems: cart.item,
                    userId: cart.UserId,
                },
                {withCredentials:true}
            );


            const { order } = response.data;

            const options = {
                key: `${RAZORPAY_KEY}`,
                amount: order.totalAmount * 100,
                currency: "INR",
                name: "Shop Now",
                description: "Product Payment",
                order_id: order.razorpayOrderId,
                handler: async function (response) {
                    const verify = await axios.post(
                        `${API_URL}/shop-products/card-shop/paymentVerification`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }
                    );


                    if (verify.data.success) {
                        toast.success("Payment successful 🎉");
                        dispatch(setCart());
                        nevigate('/shop-products/Useroder'); // navigate to order page
                    }



                },
                prefill: {
                    name: "Robin Singh",
                    email: "robinosingh@gmail.com",
                    contact: "9999999999",
                },
                theme: { color: "#3399cc" },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            toast.error(error?.response?.data?.message || "Payment failed");
            console.log(error);
        }
    };


    const RemoveHandle = async (productId) => {
        try {
            console.log("userPoductId", productId);

            const response = await axios.delete(
                `${API_URL}/cartRemove`,
                { data: { productId },withCredentials:true },
            );
            if (response?.data?.success) {
                dispatch(setCart(response.data.cart))
                toast.success("Product remove seccessfully")
            }
        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className="bg-gray-50 min-h-screen py-10 ">
            <main className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

                {cart?.item?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 space-y-4">
                            {cart.item.map((item) => (
                                <div
                                    key={item.productId?._id}
                                    className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md"
                                >
                                    <img
                                        src={item?.productId?.productsImg?.[0]?.url}
                                        alt={item?.productId?.productsName}
                                        className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                                    />

                                    <div className="flex-1 mb-2 md:text-left">
                                        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">
                                            {item?.productId?.productsName}
                                        </h2>

                                        {/* {increse and dercrese button} */}

                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-700">
                                                Quantity:
                                            </span>

                                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                                <button className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 transition" onClick={() => ItemButtonHandle(item?.productId?._id, "de")}>
                                                    −
                                                </button>

                                                <p className="px-4 py-1 text-sm font-semibold text-gray-800">
                                                    {item?.quantity}
                                                </p>

                                                <button className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 transition" onClick={() => ItemButtonHandle(item?.productId?._id, "in")}>
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* ----------------- */}

                                        <div className="flex items-center md:justify-start gap-4 mt-1">
                                            <div className="text-gray-700 font-semibold">Price : </div>
                                            <span className=" font-bold text-xl">₹{item?.price}</span>
                                        </div>

                                        <div className="flex items-center md:justify-start gap-4 mt-1">
                                            <div className="text-gray-700 font-semibold cursor-pointer" onClick={() => RemoveHandle(item.productId._id)}>❌ REMOVE  </div>
                                        </div>

                                    </div>

                                    <div className="mt-4 md:mt-0 text-right">
                                        <p className="text-sm text-gray-400 font-semibold">Subtotal</p>
                                        <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* totol show  */}

                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-5">
                                <h2 className="text-xl font-bold border-b pb-4 mb-4 flex justify-center">Order Summary</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span className="font-semibold ">Subtotal</span>
                                        <span>₹{cart.totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span className="font-semibold">Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{cart.totalPrice}</span>
                                    </div>
                                </div>

                                <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg" onClick={() => HandlePayment(cart.totalPrice)}>
                                    Proceed to Checkout
                                </button>
                                <div className="mt-5">
                                    <img src="https://res.cloudinary.com/daplqp2ck/image/upload/v1767352712/cartimage_lxy5lp.webp" alt="image" />
                                </div>
                            </div>

                        </div>
                        {/* ---------------- */}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                        <p className="text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
                        <Link to={'/shop-products'}>
                            <button className="mt-6 text-indigo-600 font-medium hover:underline">
                                Continue Shopping →
                            </button>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};