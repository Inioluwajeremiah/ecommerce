import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import Spinner from "../components/Spinner";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.log("create order=>", error);
    }
  };
  return (
    <div className="w-[96%] md:max-w-[80rem] mx-auto mt-10">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className=" w-[90%] mx-auto p-3 flex flex-col md:flex-row justify-between gap-3 md:gap-7 mt-7">
        <div className="w-full md:w-3/5 ">
          <div className="border-b mt-4">
            <h2 className="text-base py-2 font-bold">Shipping</h2>
            <p className="text-gray-700 text-sm py-2">
              <strong>Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div className="border-b mt-4">
            <h2 className="text-base py-2 font-bold">Payment Method</h2>
            <p className="text-gray-700 text-sm py-2">
              <strong>Method:</strong>
              {cart.paymentMethod}
            </p>
          </div>

          <div className=" mt-4">
            <h2 className="text-base font-bold py-2">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <h3>Your cart is empty</h3>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full border md:h-16 rounded-md mb-2 p-2 flex flex-col md:flex-row gap-x-2  "
                  >
                    {/* product thumbnail */}
                    <div className="w-12 h-12 ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 "
                      />
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between gap-x-2 items-left md:items-center ">
                      {/* product meta data */}
                      <div>
                        <Link
                          to={`/preview/${item.name + "-" + item._id}`}
                          state={{
                            itemData: item,
                            id: item._id.toString(),
                          }}
                          className="text-xs font-bold underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <p className="text-xs ">
                        {item.quantityNeeded} x ${item.price} = $
                        {item.quantityNeeded * item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* right div */}
        <article className="w-full md:w-2/5 h-fit border py-3 text-sm  ">
          <h2 className="text-base font-bold py-2 text-center ">
            Order summary
          </h2>
          <div className="w-full flex flex-row border-b p-2">
            <h2 className="w-1/2">Items:</h2>
            <p className="w-1/2">${cart.itemPrice}</p>
          </div>

          <div className="w-full flex flex-row border-b p-2">
            <h2 className="w-1/2">Shipping:</h2>
            <p className="w-1/2">${cart.shippingPrice}</p>
          </div>
          <div className="w-full flex flex-row border-b p-2">
            <h2 className="w-1/2">Tax:</h2>
            <p className="w-1/2">${cart.taxPrice}</p>
          </div>
          <div className="w-full flex flex-row border-b p-2">
            <h2 className="w-1/2">Total:</h2>
            <p className="w-1/2">${cart.totalPrice}</p>
          </div>
          {error ? <p>{error.message}</p> : ""}
          <button
            disabled={cart.cartItems.length === 0}
            onClick={handlePlaceOrder}
            className="mt-4 p-2 bg-purple-700 text-white rounded-md flex flex-row mx-auto"
          >
            Place order
          </button>
          {isLoading ? <Spinner /> : null}
        </article>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
