import React, { useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setProducts } from '@/ReduxToolKit/UserData'
import { API_URL } from '@/config/app'



export const Login = () => {

    const nevigate = useNavigate()
    const dispatch = useDispatch()
    const [loding, setloding] = useState(false);
    console.log("URL ", API_URL)
    const [LoginData, setLoginData] = useState({
        gmail: "",
        password: ""
    });

    const handleChage = (e) => {
        setLoginData({
            ...LoginData,
            [e.target.name]: e.target.value
        })
    }

    const SubmitData = async (e) => {
        e.preventDefault();
        try {
            setloding(true);

            const response = await axios.post(
                `${API_URL}/log`,
                LoginData,
                {
                    withCredentials: true, // 🔥 REQUIRED
                }
            );

            if (response.data.success) {
                dispatch(setProducts(response.data.user));
                toast.success(response.data.message);
                nevigate("/");
            }

        } catch (error) {
            console.log("FULL ERROR →", error.response?.data);
            toast.error(error.response?.data?.message || "Login have failed");
        } finally {
            setloding(false);
        }
    };


    



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to continue
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <form onSubmit={SubmitData} className="flex flex-col gap-4">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Gmail</Label>
                            <Input
                                id="email"
                                name="gmail"
                                type="email"
                                value={LoginData.gmail}
                                onChange={handleChage}
                                placeholder="john@gmail.com"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password"
                                type="password"
                                name="password"
                                value={LoginData.password}
                                onChange={handleChage}
                                required />
                        </div>
                        <CardFooter className="flex-col gap-3">
                            <Button type="submit" className="w-[330px] cursor-pointer">

                                {loding ? <><Loader2 className=' animate-spin cursor-pointer' /></> : "Login"}
                            </Button>

                            <Link to={'/ForgetPassword'}>
                            <div className='hover:text-red-400 cursor-pointer'>Forgot Password ?</div>
                            </Link>

                            <p>If You don't have account ? <Link to={'/signup'} className='hover:underline cursor-pointer text-red-500'>Signup</Link></p>

                        </CardFooter>
                    </form>

                </CardContent>


            </Card>
        </div >
    )
}
