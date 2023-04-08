import React, { useEffect, useState } from "react";
import learningPortal from "../../../assets/image/learningportal.svg";
import { useForm } from "react-hook-form";
import { useAdminLoggedInMutation } from "../../../redux/features/authentication/authAdminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const AdminLogin = () => {
  const [adminLoggedIn, { data, isLoading, error: responseError }] = useAdminLoggedInMutation()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('')
  const { user: adminUser } = useSelector(state => state?.authAdmin)
  const handleAdminLogin = (data) => {
    adminLoggedIn({
      email: data.email,
      password: data.password
    })
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (adminUser?.email && adminUser?.role === 'admin') {
      navigate("/admin/dashboard");
    }
    if (responseError?.data) {
      setLoginError(responseError.data);
      toast.error(responseError?.data)
    }
    if (data?.accessToken && data?.user) {
      toast.success('Successfully LoggedIn')
      navigate("/admin/dashboard");
    }
  }, [data, responseError, navigate, adminUser]);

  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img
              alt="learningportal"
              className="h-12 mx-auto"
              src={learningPortal}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Admin Account
            </h2>
          </div>
          <form onSubmit={handleSubmit(handleAdminLogin)} className="mt-8 space-y-6">
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
                  type="email"
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
                <a
                  href="/"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Sign in
              </button>
            </div>
            {errors?.email && <p>{errors?.email?.message}</p>}
            {errors?.password && <p>{errors?.password?.message}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
