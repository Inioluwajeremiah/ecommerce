import {
  FaCaretDown,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [toggleAdmin, setToggleAdmin] = useState(false);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleToggleAdmin = () => {
    setToggleAdmin(!toggleAdmin);
  };

  return (
    <header className="mb-20 ">
      <nav className="fixed top-0 bg-white w-full h-16 flex flex-row justify-between items-center px-8 py-2 shadow">
        <div>
          <h1 className="font-bold text-2xl ">
            <Link to={"/"}>IJ Store</Link>
          </h1>
        </div>

        <ul className="flex flex-row gap-4 items-center">
          <SearchBox />
          {/* user protected routes */}
          {userInfo && (
            <>
              <li>
                <Link to="/cart" className="flex flex-row gap-2 items-center">
                  <FaShoppingCart /> Cart{" "}
                  {cartItems.length > 0 && (
                    <h4 className=" h-6 w-6 bg-purple-900 rounded-full text-xs py-1  text-center text-white">
                      {cartItems.reduce((a, c) => a + c.quantityNeeded, 0)}
                    </h4>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex flex-row gap-1 items-center"
                >
                  <FaUser />
                  {userInfo.name}
                </Link>
              </li>
            </>
          )}

          {/* admin protected routes */}
          {userInfo && userInfo.isAdmin && (
            <div>
              <li
                className="relative flex flex-row items-center cursor-pointer"
                onClick={handleToggleAdmin}
              >
                Admin <FaCaretDown />
              </li>
              {toggleAdmin && (
                <ul className="absolute bg-white top-16 right-8 flex flex-col gap-2 shadow-md px-6 py-2">
                  <li>
                    <Link
                      to="/profile"
                      className="flex flex-row gap-1 items-center"
                      onClick={handleToggleAdmin}
                    >
                      <FaUser />
                      {userInfo.name}
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/productslist" onClick={handleToggleAdmin}>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/userslist" onClick={handleToggleAdmin}>
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orderlist" onClick={handleToggleAdmin}>
                      Orders
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}

          <li>
            <button
              onClick={handleLogOut}
              className="flex flex-row gap-1 items-center text-red-700"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>

          {/* register and sign in screens */}
          {!userInfo && (
            <>
              <li>
                <Link
                  to="/register"
                  className="flex flex-row gap-1 items-center"
                >
                  <FaUser />
                  Sign up
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex flex-row gap-1 items-center">
                  <FaUser />
                  Sign in
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
