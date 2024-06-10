import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/authContext";

//we define a schema using zod so that we have a single source of truth on server and client side
const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3, "Password should be minimum 3 characters long"),
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords need to match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.terms === true, {
    message: "Accept terms and conditions",
    path: ["terms"],
  });

const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const labelStyle =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await login({ email: data.email, password: data.password }, "signup");
      toast.success("Signup successful");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during signup");
      return;
    }
    reset();
    navigate("/");
  };
  useEffect(() => {
    //to prevent going back to login page once the login is successful
    if (localStorage.getItem("access_token")) {
      navigate("/active");
    }
  }, []);
  return (
    <section className="dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <NavLink
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Todo App
        </NavLink>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label htmlFor="email" className={labelStyle}>
                  Your email
                </label>
                <input
                  {...register("email")}
                  name="email"
                  id="email"
                  className={inputStyle}
                  placeholder="name@company.com"
                />
                {errors && (
                  <p className="text-red-500">
                    {errors.email?.message?.toString()}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className={labelStyle}>
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={inputStyle}
                />
                {errors && (
                  <p className="text-red-500">
                    {errors.password?.message?.toString()}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelStyle}>
                  Confirm password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={inputStyle}
                />
                {errors && (
                  <p className="text-red-500">
                    {errors.confirmPassword?.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register("terms")}
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  <p className="text-red-500">
                    {errors.terms?.message?.toString()}
                  </p>
                </div>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isSubmitting ? "Signing Up.." : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <NavLink
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
