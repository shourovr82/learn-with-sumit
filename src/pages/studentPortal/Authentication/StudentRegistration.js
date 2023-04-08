import React, { useEffect, useState } from "react";
import learningPortal from "../../../assets/image/learningportal.svg";
import { useForm } from "react-hook-form";
import { useRegistrationMutation } from "../../../redux/features/authentication/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [registration, { data, isLoading, error: responseError }] = useRegistrationMutation();
  const [registerError, setRegisterError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (responseError?.data) {
      setRegisterError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/course/1");
    }
  }, [data, responseError, navigate]);

  // handle Register
  const handleRegister = (data) => {
    setConfirmPasswordError('')
    if (data?.password !== data?.confirmPassword) {
      setConfirmPasswordError('Confirm password is not Matched')
    } else if (data?.email && data?.password && data?.name) {
      const newUserData = {
        email: data?.email,
        password: data?.password,
        role: 'student',
        name: data?.name
      }
      registration(newUserData)
      toast.success("Successfully Registered ")
    }
  }
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img alt="register" className="h-12 mx-auto" src={learningPortal} />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Create Your New Account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  {...register("name", {
                    required: 'Name is Required',
                  })}
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  className="login-input rounded-t-md"
                  placeholder="Student Name"
                />

              </div>
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
                  className="login-input "
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
                  className="login-input"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", { required: 'Confirm password required' })}
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-password"
                  className="login-input rounded-b-md"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Create Account
              </button>
            </div>
            {
              errors?.name && <p className="text-sm bg-red-600 rounded-lg py-1 px-2">{errors?.name?.message}</p>
            }
            {
              errors?.email && <p className="text-sm bg-red-600 rounded-lg py-1 px-2">{errors?.email?.message}</p>
            }
            {
              errors?.password && <p className="text-sm bg-red-600 rounded-lg py-1 px-2">{errors?.password?.message}</p>
            }
            {
              confirmPasswordError && <p className="text-sm bg-red-600 rounded-lg py-1 px-2">{confirmPasswordError}</p>
            }
            {
              registerError && <p className="text-sm bg-red-600 rounded-lg py-1 px-2">{registerError}</p>
            }
          </form>
        </div>
      </section>
    </>
  );
};

export default StudentRegistration;
