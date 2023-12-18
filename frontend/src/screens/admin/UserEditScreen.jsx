import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = async () => {
    const updatedUser = {
      userId,
      name,
      email,
      isAdmin,
    };

    const result = await updateUser(updatedUser);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User updated");
      refetch();
      navigate("/admin/userList");
    }
  };

  return (
    <>
      <Link to="/admin/userList">Go back</Link>

      <div>
        <h1>Edit User</h1>
        {loadingUpdate && <Spinner />}

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <h1>{error?.data?.message || error.error}</h1>
        ) : (
          <div className="w-full md:w-3/5">
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
              <label htmlFor="category">Admin</label>
              <select
                onChange={(e) => setIsAdmin(e.target.value)}
                value={isAdmin}
              >
                <option value="">--admin--</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <button
              className="flex flex-row justify-center mx-auto px-5 py-2 bg-purple-900 rounded-md text-white"
              onClick={handleSubmit}
            >
              Update
            </button>

            {loadingUpdateProfile && <Spinner />}
          </div>
        )}
      </div>
    </>
  );
};

export default UserEditScreen;
