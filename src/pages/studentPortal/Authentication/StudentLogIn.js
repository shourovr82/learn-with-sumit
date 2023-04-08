import React, { useEffect, useState } from "react";
import learningPortalImg from "../../../assets/image/learningportal.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/authentication/authApi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../../redux/features/authentication/authSlice";

const StudentLogIn = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [login, { data, isLoading, error: responseError }] = useLoginMutation()
  const navigate = useNavigate()
  const { user } = useSelector(state => state?.auth || {})
  const dispatch = useDispatch()

  // handle login
  const handleLogin = (data) => {
    login({
      email: data.email,
      password: data.password
    })
  }

  useEffect(() => {
    if (responseError?.data) {
      toast.error(responseError?.data)
    }
    if (user?.email && user?.role === 'student') {
      navigate('/course/1')
    }
    if (data?.accessToken && data?.user && data?.user?.role !== 'student') {
      dispatch(userLoggedOut())
      localStorage.removeItem('auth')
      toast.error('You cant login admin account from here')
      return;
    }

  }, [data, responseError, navigate, user, dispatch]);

  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img
              alt="learningPortalImg"
              className="h-12 mx-auto"
              src={learningPortalImg}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Student Account
            </h2>
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-6" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  {...register("email", {
                    required: 'Email is Required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email is not valid'
                    }
                  })}
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required=""
                  className="login-input rounded-t-md"
                  placeholder="Email address"
                />

              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: 'Password is Required',
                    minLength: {
                      value: 6,
                      message: 'Password minimum length must be 6'
                    }
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required=""
                  className="login-input rounded-b-md"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-end">

              <div className="text-sm">
                <Link to='/registration'
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Create New Account
                </Link>
              </div>
            </div>
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Sign in
              </button>
            </div>
            <div>
              <div className="space-y-2">
                {errors?.email && <p className="bg-red-700    duration-300 ease-in text-white py-1 text-xs px-2 rounded-md">{errors?.email?.message}</p>}
                {errors?.password && <p className="bg-red-700 duration-300 ease-in  text-white py-1 text-xs px-2 rounded-md">{errors?.password?.message}</p>}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default StudentLogIn;
