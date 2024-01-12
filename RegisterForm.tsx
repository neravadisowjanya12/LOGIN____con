"use client"
import Link from "next/link";
import { useState } from "react";
import axios from "axios";



export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");


    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !gender || !country ||!city) {
            setError("All fields are necessary");
            return;
        }

        try {

           

            const res=await axios.post('https://api.dev2.constructn.ai/api/v1/users/register',{
                "firstName":name,
                "lastName":name,
                "email":email,
                "password":password,
                "gender":gender,
                "country":country,
                "city":city
            })
            if(res.data){
                console.log(res.data);
                        }
                        else{
                            console.log("error");
                        }

        } catch (error) {
            console.log("Error during registration", error);
        }
    };

    return (
        <>
      
      <div className="flex">
            {/* Image on the left */}
            <img src="https://app.constructn.ai/_next/static/media/Illustration.a0ccf67c.svg" alt="Left Image" className="w-4/6" />
      
     
        
        <div className="grid place-items-center h-screen "  style={{ justifyContent:'flex-end',color: '#FF69B4' }}>Registration Form
    
        
        <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-pink-500" >
                    <h1 className="text-xl font-bold my-4">Register</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3" autocomplete="off">
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name"  autoComplete="new-full-name"/>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" autoComplete="new-email"/>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"  autoComplete="new-password"/>
                        <input onChange={(e) => setGender(e.target.value)} type="gender" placeholder="Gender"  autoComplete="new-gender"/>
                        <input onChange={(e) => setCountry(e.target.value)} type="country" placeholder="Country"  autoComplete="new-country"/>
                        <input onChange={(e) => setCity(e.target.value)} type="city" placeholder="City"  autoComplete="new-city"/>

                        <button className="bg-pink-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>                        
                        {error && (
                            <div className="bg-red-500 text-white wifit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                        )}
                        <Link href="/" className="text-sm mt-3 text-right">Already have an account<span className="underline">Login</span>
                        </Link>
                    </form>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}