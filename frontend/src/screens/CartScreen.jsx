import { useSelector, useDispatch } from "react-redux";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useState } from "react";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log("cart at cartscreen => ", cart);

  const CheckOut = () => {
    navigate("/login?redirect=/shipping");
  };
  const increaseQty = (qty) => {
    return qty + 1;
  };
  const decreaseQty = (qty) => {
    return qty - 1;
  };

  const AddToCart = (itemData, e) => {
    e.preventDefault();
    console.log("Add to cart at cart screen => ", itemData);
    const quantityNeeded = Number(e.target.value);
    dispatch(addToCart({ ...itemData, quantityNeeded }));
  };

  const RemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="mt-[1rem] p-5 mx-[auto] w-full ">
      <h1 className="font-bold text-2xl text-center text-[#330066]">Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          No cart item
          <span
            className=" cursor-pointer text-blue-500 italic"
            onClick={() => navigate(-1)}
          >
            Go back
          </span>
        </p>
      ) : (
        <div className="flex flex-row flex-wrap gap-2">
          {cartItems.map((itemData, index) => (
            <div
              key={index}
              className="p-4 items-center w-[15rem] shadow-bg border mx-[auto] mt-4 rounded-md"
            >
              {/* image */}
              <Link
                to={`/preview/${itemData.name + "-" + itemData._id}`}
                state={{
                  itemData: itemData,
                  id: itemData._id.toString(),
                }}
                className="flex flex-row flex-wrap items-center justify-center "
              >
                <img
                  src={itemData.image}
                  alt={itemData.title}
                  className=" h-[12rem] w-full"
                />
              </Link>
              {/* meta data */}
              <div className="text-xs">
                <p className=" underline mt-2 leading-7 text-ellipsis overflow-hidden whitespace-nowrap">
                  <Link
                    to={`/preview/${itemData.name + "-" + itemData._id}`}
                    state={{
                      itemData: itemData,
                      id: itemData._id.toString(),
                    }}
                  >
                    {itemData.name}
                  </Link>
                </p>

                <p className="">
                  Quantity in stock:{" "}
                  {itemData.countInStock > 0
                    ? itemData.countInStock
                    : "Out of stock"}
                </p>
                <p className="">
                  Price Tag: <s>{itemData.price.toFixed(2)}</s>
                </p>
                <p className="">
                  Discount price tag:{" "}
                  <span className="text-green-500">
                    {(itemData.price + itemData.price * 0.01).toFixed(2)}
                  </span>
                </p>
                <p className="">
                  Discount percentage:{" "}
                  <span className="text-orange-500">{-10}% off</span>{" "}
                </p>

                <Rating
                  rate={itemData.rating}
                  count={itemData.numReviews + " reviews"}
                />
              </div>
              {/* buttons */}
              <div className="flex flex-row items-center gap-2">
                <div>
                  <label className="text-xs ">Quantity</label>
                  {itemData && itemData.countInStock > 0 ? (
                    <div className="flex w-full flex-col">
                      <input
                        type="numer"
                        placeholder="Number of quantity needed"
                        className="border-solid rounded-sm border-[1px] border-[#ddd] p-2 outline-none w-full"
                        list="qty"
                        value={itemData.quantityNeeded}
                        onChange={(e) => AddToCart(itemData, e)}
                      />
                      <datalist id="qty">
                        {itemData &&
                          [...Array(itemData.countInStock).keys()].map(
                            (item, index) => (
                              <option value={`${item + 1}`} key={index + 1}>
                                {item + 1}
                              </option>
                            )
                          )}
                      </datalist>
                    </div>
                  ) : null}
                </div>
                {/* delete button */}
                <button
                  className=" p-2 h-10 mt-5"
                  onClick={() => RemoveFromCart(itemData._id)}
                >
                  <FaTrash className="text-red-700" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* checkout */}
      {cartItems.length > 0 ? (
        <div className="w-fit fixed top-[50%] right-0 bg-white flex flex-row items-center p-2 shadow-sm border rounded-l-lg ">
          <div>
            <h2>
              Subtotal(
              {cartItems.reduce((acc, item) => acc + item.quantityNeeded, 0)})
              items
            </h2>
            <span className="text-xs">
              $
              {cartItems
                .reduce(
                  (acc, item) => acc + item.quantityNeeded * item.price,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
          <button
            className={`${
              cartItems.length > 0 ? "bg-[#330066]" : "bg-[#72548f]"
            } p-2 text-white m-2 rounded-md`}
            disabled={cartItems.length === 0}
            onClick={CheckOut}
          >
            Checkout
          </button>
          {/* <button className='bg-[#330066] p-2 text-white m-2' onClick={AddToCart}>Add to cart</button> */}
        </div>
      ) : null}
    </div>
  );
};

export default CartScreen;
