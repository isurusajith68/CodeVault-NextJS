"use client"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import authOptions from "@/app/api/auth/[...nextauth]/route";


const Login = () => {

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")



  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {

      // try {
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const data = await response.json();

      // if (response.status === 401) {
      //   return toast.error(data.message);
      // }

      // if (response.status === 200) {
      //   toast.success(data.message);
      //   localStorage.setItem("userdata", JSON.stringify(data.data))
      //   router.push('/')
      // }

      // const res = await signIn("credentials", { email, password, redirect: false });

      // if (res.error) {
      //   toast.error("data.message", res.error.message);
      // }

      // router.replace("/")


      // } catch (error) {
      //   toast.error(error);
      // }



      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res.error) {
          setError("Invalid Credentials");
          toast.error(error)
          return;
        }
        toast.success("Login successful")
        router.replace("");
      } catch (error) {
        console.log(error);
      }

    }
  };

  //validation

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleValidation = () => {

    if (email === "") {
      toast.error("Email is requied");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (password === "") {
      toast.error("Password is requied");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  return (
    <div className="flex min-h-full flex-col px-6 py-12 lg:px-8 mb-10 mt-28">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-3">Register</a>
        </p>
      </div>
    </div>
  )
}
export default Login