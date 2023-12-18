import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="w-[96%] md:max-w-[80rem] mx-auto mt-10">
      <div className=" w-[90%] mx-auto p-3 flex flex-col md:flex-row justify-between gap-3 md:gap-x-10 lg:gap-x-24 mt-7">
        {/* left div */}
        <div className="w-full md:w-3/5">
          <h1 className="text-center text-xl font-bold text-purple-700">
            User Profile
          </h1>

          <div className="px-2">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              placeholder="Name"
              value={name}
              id="name"
              className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="px-2">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="flex flex-row justify-center mx-auto px-5 py-2 bg-purple-900 rounded-md text-white"
            onClick={handleSubmit}
          >
            Update
          </button>

          {loadingUpdateProfile && <Spinner />}
        </div>
        {/* right div */}
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <h1>{error?.data?.message || error.error}</h1>
        ) : (
          <article className="w-full md:w-2/5 h-fit border py-3 text-sm  ">
            <h2 className="text-base font-bold py-2 text-center ">
              Order summary
            </h2>
            {orders.map((order, index) => (
              <div className="w-full flex flex-row border-b p-2" key={index}>
                <div>id date total paid delivered</div>
                <p>{order._id}</p>
                <p>{order.createdAt}</p>
                <p>{order.totalPrice}</p>
                <p>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-red-700" />
                  )}
                </p>
                <p>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-red-700" />
                  )}
                </p>
                <Link to={`/order/${order._id}`}>Details</Link>
              </div>
            ))}
          </article>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
