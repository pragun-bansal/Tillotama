// "use client";
// import React, { useState } from 'react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import LoginSVG from "@/public/images/LoginHome.svg"
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { loginUser } from '@/store/slices/userSlice';
// import { useDispatch } from 'react-redux';
//
// import {
//     useGoogleLogin,
//     GoogleLogin,
//     hasGrantedAllScopesGoogle,
// } from "@react-oauth/google";
//
// const LoginCard = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [loginCred, setLoginCred] = useState({
//         email: undefined,
//         password: undefined,
//     });
//     const [regCred, setRegCred] = useState({
//         username: undefined,
//         email: undefined,
//         password: undefined,
//     });
//
//     const [register, setRegister] = useState(false);
//
//     // Check for token in localStorage (only on client side)
//     const [token, setToken] = useState(null);
//
//     React.useEffect(() => {
//         // Only access localStorage on client side
//         if (typeof window !== 'undefined') {
//             setToken(localStorage.getItem("token"));
//         }
//     }, []);
//
//     const router = useRouter();
//     const dispatch = useDispatch();
//
//     const handleRegister = () => {
//         setRegister(!register);
//     }
//
//     const handleChange = (e) => {
//         if (!register)
//             setLoginCred((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//         else setRegCred((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//     };
//
//     const onLoginSuccess = async (tokenResponse) => {
//         try {
//             const response = await axios.get(
//                 "https://www.googleapis.com/oauth2/v3/userinfo",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${tokenResponse.access_token}`,
//                     },
//                 }
//             );
//             const decoded = response.data;
//
//             try {
//                 const data = await axios.get(
//                     `${process.env.NEXT_PUBLIC_SERVER_URL}/users/find/${decoded.email}`
//                 );
//
//                 if (data.data == null) {
//                     const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google/register`, {
//                         name: decoded.name,
//                         email: decoded.email,
//                         profile: decoded.picture,
//                     });
//
//                     toast.success(`Registered Successfully!`, {
//                         position: "top-center",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "colored",
//                     });
//
//                     if (typeof window !== 'undefined') {
//                         localStorage.setItem("token", res.data.token);
//                     }
//                     dispatch(loginUser(res.data.details));
//                     router.push("/");
//                     router.refresh();
//                 } else {
//                     const user = data.data;
//                     const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google/login`, {
//                         email: user.email,
//                     });
//
//                     console.log("Login card Line 106", res.data.details);
//                     toast.success(`Welcome ${res.data.details.name}!`, {
//                         position: "top-center",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//
//                     if (typeof window !== 'undefined') {
//                         localStorage.setItem("token", res.data.token);
//                         localStorage.setItem("user", JSON.stringify(res.data.details));
//                     }
//                     dispatch(loginUser(res.data.details));
//                     router.push("/");
//                     router.refresh();
//                 }
//             } catch (err) {
//                 console.log(err);
//                 toast.error("Login failed. Please try again.", {
//                     position: "top-center",
//                     autoClose: 2000,
//                     theme: "dark",
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Google login failed. Please try again.", {
//                 position: "top-center",
//                 autoClose: 2000,
//                 theme: "dark",
//             });
//         }
//     };
//
//     const onLoginFail = (res) => {
//         console.log(res);
//         toast.error("Google login failed", {
//             position: "top-center",
//             autoClose: 2000,
//             theme: "dark",
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (register) {
//             try {
//                 const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, regCred);
//                 if (res.status == 200) {
//                     toast.success(`Register Successfully!`, {
//                         position: "top-center",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//                     setRegister(!register);
//                 } else {
//                     toast.error(res.data?.message || "Registration failed", {
//                         position: "top-center",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//                 }
//             } catch (err) {
//                 console.log(err);
//                 toast.error(err.response?.data?.message || "Registration failed", {
//                     position: "top-center",
//                     autoClose: 2000,
//                     theme: "dark",
//                 });
//             }
//         } else {
//             try {
//                 const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, loginCred);
//                 if (res.status == 200) {
//                     console.log(res.data.user);
//                     dispatch(loginUser(res.data.user));
//
//                     if (typeof window !== 'undefined') {
//                         localStorage.setItem("user", JSON.stringify(res.data.user));
//                         localStorage.setItem("token", res.data.token);
//                     }
//
//                     toast.success(`Welcome ${res.data.user.name}!`, {
//                         position: "top-center",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//
//                     router.push("/");
//                     router.refresh();
//                 } else {
//                     console.log("check");
//                     toast.error(res.data.message, {
//                         position: "top-center",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: false,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "dark",
//                     });
//                 }
//             } catch (err) {
//                 console.log(err);
//                 toast.error(err.response?.data?.message || "Login failed", {
//                     position: "top-center",
//                     autoClose: 2000,
//                     theme: "dark",
//                 });
//             }
//
//             setLoginCred({
//                 email: undefined,
//                 password: undefined
//             });
//             setRegCred({
//                 email: undefined,
//                 password: undefined,
//                 username: undefined
//             });
//         }
//     }
//
//     const handleLogout = () => {
//         if (typeof window !== 'undefined') {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//         }
//         setToken(null);
//         router.push("/");
//         router.refresh();
//     };
//
//     return (
//         <div>
//             <ToastContainer />
//             <section className="h-screen">
//                 <div className="container h-full px-6 py-24">
//                     <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
//                         {/* Left column container with background */}
//                         <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
//                             <Image
//                                 src={LoginSVG}
//                                 className="w-full"
//                                 alt="Phone image"
//                                 priority
//                             />
//                         </div>
//
//                         {/* Right column container with form */}
//                         <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
//                             <div className='mb-4'>
//                                 <p tabIndex="0" className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
//                                     {token ? "Already Logged In" : "Login to your account"}
//                                 </p>
//                                 {!token && (
//                                     <p
//                                         onClick={() => { handleRegister() }}
//                                         tabIndex="0"
//                                         className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
//                                     >
//                                         {register ? "Already Have an Account?" : "Don't have account?"}
//                                         <span className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer ml-1">
//                                             {register ? "Login here" : "Sign up here"}
//                                         </span>
//                                     </p>
//                                 )}
//                             </div>
//
//                             {token ? (
//                                 <div className="text-center">
//                                     <p className="mb-4 text-gray-600">You are already logged in.</p>
//                                 </div>
//                             ) : register ? (
//                                 <div>
//                                     <div className="relative mb-6">
//                                         <input
//                                             type="text"
//                                             className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
//                                             id="username"
//                                             onChange={handleChange}
//                                             value={regCred.username || ''}
//                                             placeholder="Username"
//                                         />
//                                         <label
//                                             htmlFor="username"
//                                             className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
//                                         >
//                                             Username
//                                         </label>
//                                     </div>
//
//                                     <div className="relative mb-6">
//                                         <input
//                                             type="email"
//                                             className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
//                                             id="email"
//                                             value={regCred.email || ''}
//                                             onChange={handleChange}
//                                             placeholder="Email address"
//                                         />
//                                         <label
//                                             htmlFor="email"
//                                             className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
//                                         >
//                                             Email address
//                                         </label>
//                                     </div>
//
//                                     <div className="relative flex mb-6 items-center">
//                                         <input
//                                             className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
//                                             type={showPassword ? "text" : "password"}
//                                             id="password"
//                                             onChange={handleChange}
//                                             value={regCred.password || ''}
//                                             placeholder="Password"
//                                         />
//                                         <label
//                                             htmlFor="password"
//                                             className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
//                                         >
//                                             Password
//                                         </label>
//                                         <div onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-3 cursor-pointer">
//                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <div className="relative mb-6">
//                                         <input
//                                             type="email"
//                                             className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
//                                             id="email"
//                                             onChange={handleChange}
//                                             value={loginCred.email || ''}
//                                             placeholder="Email address"
//                                         />
//                                         <label
//                                             htmlFor="email"
//                                             className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
//                                         >
//                                             Email address
//                                         </label>
//                                     </div>
//
//                                     <div className="relative flex mb-6 items-center">
//                                         <input
//                                             className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
//                                             type={showPassword ? "text" : "password"}
//                                             id="password"
//                                             onChange={handleChange}
//                                             value={loginCred.password || ''}
//                                             placeholder="Password"
//                                         />
//                                         <label
//                                             htmlFor="password"
//                                             className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
//                                         >
//                                             Password
//                                         </label>
//                                         <div onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-3 cursor-pointer">
//                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//
//                             {/* Remember me checkbox / Forgot password */}
//                             <div className="mb-6 flex items-center justify-between">
//                                 {!token && (
//                                     <a
//                                         href="#!"
//                                         className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
//                                     >
//                                         Forgot password?
//                                     </a>
//                                 )}
//                             </div>
//
//                             {/* Submit button */}
//                             <button
//                                 onClick={token ? handleLogout : handleSubmit}
//                                 className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//                             >
//                                 {token ? "Log Out" : !register ? "Log in" : "Sign up"}
//                             </button>
//
//                             {/* Divider and social login */}
//                             {!token && (
//                                 <div>
//                                     <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
//                                         <p className="mx-4 mb-0 text-center font-semibold">OR</p>
//                                     </div>
//
//                                     <button
//                                         className="mb-3 flex w-full items-center justify-center rounded bg-[#FFC5C4] px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//                                         onClick={useGoogleLogin({
//                                             onSuccess: onLoginSuccess,
//                                             onError: onLoginFail,
//                                         })}
//                                     >
//                                         <div className="bg-white p-2 rounded-full">
//                                             <svg className="w-4" viewBox="0 0 533.5 544.3">
//                                                 <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"></path>
//                                                 <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"></path>
//                                                 <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"></path>
//                                                 <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"></path>
//                                             </svg>
//                                         </div>
//                                         <span className='font-bold ml-4'>Continue with Google</span>
//                                     </button>
//
//                                     <a
//                                         className="mb-3 flex w-full items-center justify-center rounded bg-[#FFC5C4] px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//                                         href="#!"
//                                         role="button"
//                                     >
//                                         <div className="bg-white p-1 rounded-full">
//                                             <svg className="w-6" viewBox="0 0 32 32">
//                                                 <path fillRule="evenodd" d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"></path>
//                                             </svg>
//                                         </div>
//                                         <p className='font-bold ml-4'>Continue with Github</p>
//                                     </a>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }
//
// export default LoginCard
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginSVG from "@/public/images/LoginHome.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

// Redux imports
import { useAppDispatch, useAuth } from '@/hooks/redux';
import {
    loginUser,
    registerUser,
    googleLogin,
    googleRegister,
    logoutUser,
    clearError
} from '@/store/slices/userSlice';

const LoginCard = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Redux state
    const { user, isAuthenticated, isLoading, error, token } = useAuth();

    // Local state
    const [showPassword, setShowPassword] = useState(false);
    const [register, setRegister] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [loginCred, setLoginCred] = useState({
        email: '',
        password: '',
    });
    const [regCred, setRegCred] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Clear errors when component mounts or mode changes
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch, register]);

    // Handle successful authentication
    useEffect(() => {
        if (isAuthenticated && user) {
            toast.success(`Welcome ${user.name || user.username}! 🎉`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            // Redirect after successful login
            router.push("/");
            router.refresh();
        }
    }, [isAuthenticated, user, router]);

    // Handle Redux errors
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        }
    }, [error]);

    const handleRegister = () => {
        setRegister(!register);
        // Clear form data when switching modes
        setLoginCred({ email: '', password: '' });
        setRegCred({ username: '', email: '', password: '' });
        dispatch(clearError());
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (!register) {
            setLoginCred((prev) => ({ ...prev, [id]: value }));
        } else {
            setRegCred((prev) => ({ ...prev, [id]: value }));
        }

        // Clear error when user starts typing
        if (error) {
            dispatch(clearError());
        }
    };

    // Google login success handler
    const onLoginSuccess = async (tokenResponse) => {
        try {
            setIsSubmitting(true);

            // Get user info from Google
            const response = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );
            const decoded = response.data;

            console.log('🔐 Google user data:', decoded);

            try {
                // Try to login first
                await dispatch(googleLogin({ email: decoded.email })).unwrap();
                console.log('✅ Google login successful');

            } catch (loginError) {
                console.log('📝 User not found, registering...');

                // If login fails, try to register
                try {
                    await dispatch(googleRegister({
                        name: decoded.name,
                        email: decoded.email,
                        profile: decoded.picture,
                    })).unwrap();

                    console.log('✅ Google registration successful');
                    toast.success(`Registered Successfully! Welcome ${decoded.name}! 🎉`, {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "colored",
                    });

                } catch (registerError) {
                    console.error('❌ Google registration failed:', registerError);
                    toast.error(registerError || "Google registration failed", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "dark",
                    });
                }
            }

        } catch (error) {
            console.error('❌ Google authentication failed:', error);
            toast.error("Google authentication failed. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const onLoginFail = (res) => {
        console.error('❌ Google login failed:', res);
        toast.error("Google login failed", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
        });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting || isLoading) return;

        // Validation
        if (register) {
            if (!regCred.username || !regCred.email || !regCred.password) {
                toast.error("Please fill in all fields", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
                return;
            }

            if (regCred.password.length < 6) {
                toast.error("Password must be at least 6 characters", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
                return;
            }
        } else {
            if (!loginCred.email || !loginCred.password) {
                toast.error("Please fill in all fields", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
                return;
            }
        }

        setIsSubmitting(true);

        try {
            if (register) {
                // Registration
                await dispatch(registerUser({
                    username: regCred.username.trim(),
                    email: regCred.email.trim().toLowerCase(),
                    password: regCred.password
                })).unwrap();

                toast.success(`Registration successful! Welcome ${regCred.username}! 🎉`, {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });

                // Don't switch to login mode after successful registration
                // User is automatically logged in

            } else {
                // Login
                await dispatch(loginUser({
                    email: loginCred.email.trim().toLowerCase(),
                    password: loginCred.password
                })).unwrap();

                console.log('✅ Login successful');
                // Success message and redirect handled in useEffect
            }

        } catch (error) {
            console.error('❌ Auth operation failed:', error);
            // Error toast handled in useEffect

        } finally {
            setIsSubmitting(false);

            // Clear form data after submission
            if (register) {
                setRegCred({ username: '', email: '', password: '' });
            } else {
                setLoginCred({ email: '', password: '' });
            }
        }
    };

    const handleLogout = async () => {
        try {
            dispatch(logoutUser());
            toast.success("Logged out successfully", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error('❌ Logout failed:', error);
        }
    };

    // Google login hook
    const googleLoginHandler = useGoogleLogin({
        onSuccess: onLoginSuccess,
        onError: onLoginFail,
    });

    return (
        <div>
            <ToastContainer />
            <section className="h-screen">
                <div className="container h-full px-6 py-24">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        {/* Left column container with background */}
                        <div className="mb-12 md:mb-0 mx-auto w-1/2 md:w-8/12 lg:w-6/12">
                            <Image
                                src={LoginSVG}
                                className="w-full"
                                alt="Phone image"
                                priority
                            />
                        </div>

                        {/* Right column container with form */}
                        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                            <div className='mb-4'>
                                <p tabIndex="0" className="focus:outline-none text-2xl text-center font-extrabold leading-6 text-gray-800">
                                    {isAuthenticated ? `Welcome back, ${user?.name || user?.username}!` : "Login to your account"}
                                </p>
                                {!isAuthenticated && (
                                    <p
                                        onClick={handleRegister}
                                        tabIndex="0"
                                        className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                                    >
                                        {register ? "Already Have an Account?" : "Don't have account?"}
                                        <span className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer ml-1">
                                            {register ? "Login here" : "Sign up here"}
                                        </span>
                                    </p>
                                )}
                            </div>

                            {isAuthenticated ? (
                                <div className="text-center">
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-green-800 font-medium">You are already logged in!</p>
                                        <p className="text-green-600 text-sm mt-1">Email: {user?.email}</p>
                                        {user?.admin && (
                                            <p className="text-blue-600 text-sm mt-1">👑 Admin Account</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => router.push('/')}
                                            className="w-full rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-0"
                                        >
                                            Go to Dashboard
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full rounded bg-red-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-0"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            ) : register ? (
                                // Registration Form
                                <form onSubmit={handleSubmit}>
                                    <div className="relative mb-6">
                                        <input
                                            type="text"
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                            id="username"
                                            onChange={handleChange}
                                            value={regCred.username}
                                            placeholder="Username"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            htmlFor="username"
                                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                                        >
                                            Username
                                        </label>
                                    </div>

                                    <div className="relative mb-6">
                                        <input
                                            type="email"
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                            id="email"
                                            value={regCred.email}
                                            onChange={handleChange}
                                            placeholder="Email address"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                                        >
                                            Email address
                                        </label>
                                    </div>

                                    <div className="relative flex mb-6 items-center">
                                        <input
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            onChange={handleChange}
                                            value={regCred.password}
                                            placeholder="Password"
                                            required
                                            minLength={6}
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            htmlFor="password"
                                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                                        >
                                            Password (min 6 characters)
                                        </label>
                                        <div
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 mr-3 cursor-pointer"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
                                            </svg>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                // Login Form
                                <form onSubmit={handleSubmit}>
                                    <div className="relative mb-6">
                                        <input
                                            type="email"
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                            id="email"
                                            onChange={handleChange}
                                            value={loginCred.email}
                                            placeholder="Email address"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                                        >
                                            Email address
                                        </label>
                                    </div>

                                    <div className="relative flex mb-6 items-center">
                                        <input
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-[#FFF5E4] px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            onChange={handleChange}
                                            value={loginCred.password}
                                            placeholder="Password"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            htmlFor="password"
                                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                                        >
                                            Password
                                        </label>
                                        <div
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 mr-3 cursor-pointer"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
                                            </svg>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* Error Display */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Remember me checkbox / Forgot password */}
                            {!isAuthenticated && (
                                <div className="mb-6 flex items-center justify-between">
                                    <a
                                        href="#!"
                                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            )}

                            {/* Submit button */}
                            {!isAuthenticated && (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || isLoading}
                                    className={`inline-block w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 bg-lightpink ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ${
                                        (isSubmitting || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting || isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                            {register ? "Signing up..." : "Logging in..."}
                                        </div>
                                    ) : (
                                        register ? "Sign up" : "Log in"
                                    )}
                                </button>
                            )}

                            {/* Divider and social login */}
                            {!isAuthenticated && (
                                <div>
                                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <p className="mx-4 mb-0 text-center font-semibold">OR</p>
                                    </div>

                                    <button
                                        className={`mb-3 flex w-full items-center justify-center rounded bg-[#FFC5C4] px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ${
                                            (isSubmitting || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        onClick={googleLoginHandler}
                                        disabled={isSubmitting || isLoading}
                                    >
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"></path>
                                                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"></path>
                                                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"></path>
                                                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"></path>
                                            </svg>
                                        </div>
                                        <span className='font-bold ml-4'>
                                            {isSubmitting ? 'Processing...' : 'Continue with Google'}
                                        </span>
                                    </button>

                                    <a
                                        className="mb-3 flex w-full items-center justify-center rounded bg-[#FFC5C4] px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                        href="#!"
                                        role="button"
                                    >
                                        <div className="bg-white p-1 rounded-full">
                                            <svg className="w-6" viewBox="0 0 32 32">
                                                <path fillRule="evenodd" d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"></path>
                                            </svg>
                                        </div>
                                        <p className='font-bold ml-4'>Continue with Github</p>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginCard;