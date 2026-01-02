import React, { useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { API_URL } from "@/config/app";

export const Signup = () => {
    const nevigate = useNavigate();
    const [loding, setloding] = useState(false);

    const [Datasent, SetDatasent] = useState({
        firstName: "",
        lastName: "",
        gmail: "",
        password: "",
    });

    const HandleDataBackend = (e) => {
        SetDatasent({
            ...Datasent,
            [e.target.name]: e.target.value

        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setloding(true);
            const response = await axios.post(`${API_URL}/register`, Datasent);


            if (response.data.success) {
                nevigate('/verify-email')
                toast.success(response.data.message || "Registered successfully ✅")
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Register failed ❌"
            )
        }
        finally {
            setloding(false)
        }
    };



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details to register
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" >

                        <div className='grid grid-cols-2 gap-10'>
                            <div>
                                <div className='mb-3'>
                                    <Label htmlFor="firstName">First Name</Label>
                                </div>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={Datasent.firstName}
                                    onChange={HandleDataBackend}
                                    required
                                />
                            </div>

                            <div>
                                <div className='mb-3'>
                                    <Label htmlFor="firstName">Last Name</Label>
                                </div>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={Datasent.lastName}
                                    onChange={HandleDataBackend}
                                    required
                                />
                            </div>
                        </div>


                        {/* Gmail */}
                        <div className="grid gap-2">
                            <Label htmlFor="gmail">Gmail</Label>
                            <Input
                                id="gmail"
                                name="gmail"
                                type="email"
                                placeholder="john@gmail.com"
                                value={Datasent.gmail}
                                onChange={HandleDataBackend}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password"
                                value={Datasent.password}
                                onChange={HandleDataBackend} type="password"
                                autoComplete="new-password"
                                required />
                        </div>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                {loding ? <><Loader2 /></> : 'Signup'}
                            </Button>

                            <p>If Your already have account ? <Link to={'/login'} className='hover:underline cursor-pointer text-red-500'>Login</Link></p>

                        </CardFooter>

                    </form>
                </CardContent>


            </Card>
        </div>
    )
}
