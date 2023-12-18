import { useEffect, useState } from "react";
import FormHeader from "../components/FormHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  console.log(search, searchParam);
  const redirect = searchParam.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  //   handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="w-[94%] max-w-[40rem] mx-auto border shadow-sm rounded-md mt-10">
      <FormHeader />

      <h1 className="text-center text-xl font-bold text-purple-700">Sign in</h1>

      <div className="px-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          id="email"
          className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="px-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="flex flex-row justify-center mx-auto px-5 py-2 bg-purple-900 rounded-md text-white"
        onClick={handleSubmit}
      >
        Signin
      </button>
      <div></div>
      <p className="p-2 text-center">
        Not yet a member?{" "}
        <Link
          className=" italic underline"
          to={redirect ? `/register?edirect=${redirect}` : "/register"}
        >
          Sign up here
        </Link>
      </p>
      {isLoading && <Spinner />}
    </div>
  );
};

export default SignIn;
