"use client"
import Link from 'next/link';
import { useState } from 'react';
import { setCookie } from 'nookies';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      const res = await axios.post('https://api.dev2.constructn.ai/api/v1/users/signin', {
        email: email,
        password: password,
      });

      if (res.data && res.data.result) {
        console.log("login");
        console.log(res.data);
        const token = res.data.result.token;
        setCookie(null, 'authToken', token, { path: '/' });
        window.location.href = '/dashboard';
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.log("Error during login", error);
      setError("Invalid password or network issues");
    }
  };

  return (
    <div className="flex">
            {/* Image on the left */}
            <img src="https://app.constructn.ai/_next/static/media/Illustration.a0ccf67c.svg" alt="Left Image" className="w-4/6" />
      
        <div className="grid place-items-center h-screen">login  Form
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-pink-500">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <div className="email-icon-container">
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="new-email" />
            </div>
          </div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          <button type="submit" className="bg-pink-600 text-white font-bold cursor-pointer px-6 py-2">Login</button>
          {error && <p className="text-red-500">{error}</p>}
          <Link className="text-sm mt-3 text-right" href={'/register'}>Don't have an account? <span className="underline">Register</span></Link>
        </form>
      </div>
      </div>
    </div>
  );
}

