import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import Spinner from "../components/Spinner";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOeder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // console.log(order);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };
  const onError = (err) => {
    toast.error(err.message);
  };

  // handle deliver order button by admin
  const handleDeliverButton = async () => {
    try {
      await deliverOeder({ orderId });
      refetch();
      toast.success("Order delivered!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <h1>No order items</h1>
  ) : (
    <div className="w-[96%] md:max-w-[80rem] mx-auto mt-10">
      <div className=" w-[90%] mx-auto p-3 flex flex-col md:flex-row justify-between gap-3 md:gap-x-10 lg:gap-x-24 mt-7">
        <div className="w-full md:w-3/5 ">
          <div className="border-b mt-4">
            <h2 className="text-base py-2 font-bold">Shipping</h2>
            <p className="text-gray-700 text-sm py-2">
              <strong>Name:</strong>
              {order.user.name}
            </p>
            <p className="text-gray-700 text-sm py-2">
              <strong>Email:</strong>
              {order.user.email}
            </p>
            <p className="text-gray-700 text-sm py-2">
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <h3 className="text-green-700 flex flex-row text-sm gap-x-2 py-2">
                {" "}
                <FaCheckCircle /> Delivered{" "}
              </h3>
            ) : (
              <h3 className="text-yellow-700 flex flex-row text-sm gap-x-2 py-2">
                <FaExclamationTriangle /> Not Delivered
              </h3>
            )}
          </div>
          <div className="border-b mt-4">
            <h2 className="text-base py-2 font-bold">Payment Method</h2>
            <p className="text-gray-700 text-sm py-2">
              <strong>Method:</strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <h3 className="text-green-700 flex flex-row text-sm gap-x-2 py-2">
                {" "}
                <FaCheckCircle /> {order.paidAt}{" "}
              </h3>
            ) : (
              <h3 className="text-yellow-700 flex flex-row text-sm gap-x-2 py-2">
                <FaExclamationTriangle /> Not Paid
              </h3>
            )}
          </div>

          <div className=" mt-4">
            <h2 className="text-base font-bold py-2">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <h3>You have no order</h3>
            ) : (
              <>
                {order.orderItems.map((item, index) => (
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
            <p className="w-1/2">${order.itemPrice}</p>
          </div>

          <div className="w-full flex flex-row border-b p-2">
            <h2 className="w-1/2">Shipping:</h2>
            <p className="w-1/2">${order.shippingPrice}</p>
          </div>
          <div className="w-full flex flex-row border-b p-2">
            <h2 className="w-1/2">Tax:</h2>
            <p className="w-1/2">${order.taxPrice}</p>
          </div>
          <div className="w-full flex flex-row border-b p-2">
            <h2 className="w-1/2">Total:</h2>
            <p className="w-1/2">${order.totalPrice}</p>
          </div>

          <div className="w-full">
            {!order.isPaid && (
              <div>
                {loadingPay && <Spinner />}
                {isPending ? (
                  <Spinner />
                ) : (
                  <div className="w-full">
                    <button
                      onClick={onApproveTest}
                      className="mt-4 p-2 bg-purple-700 text-white rounded-md flex flex-row mx-auto"
                    >
                      Pay Order Test
                    </button>
                    <div className="flex flex-row w-full mx-auto items-center justify-center my-4">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {loadingDeliver && <Spinner />}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <button onClick={handleDeliverButton}>Mark as Delivered</button>
            )}
        </article>
      </div>
    </div>
  );
};

export default OrderScreen;
