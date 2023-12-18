import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import Spinner from "../../components/Spinner";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { loadingDelete }] = useDeleteUserMutation();

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        toast.success("User deleted");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return isLoading ? (
    <Spinner />
  ) : error ? (
    <h1>{error?.data?.message || error.error}</h1>
  ) : (
    <div>
      <h1>Orders</h1>
      {loadingDelete && <Spinner />}
      <table>
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
          <th></th>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <FaCheck className="text-red" />
                ) : (
                  <FaTimes className="text-red" />
                )}
              </td>

              <td>
                <Link to={`/admin/users/${user._id}`}>
                  <button>
                    <FaEdit />
                  </button>
                </Link>
                <button onClick={() => handleDeleteUser(user._id)}>
                  {" "}
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListScreen;
