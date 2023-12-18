import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Spinner from "../../components/Spinner";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <h1>{error?.data?.message || error.error}</h1>
      ) : (
        <table>
          <thead>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.user && order.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-red" />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.DeliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-red" />
                  )}
                </td>
                <td>
                  <Link to={`/orders/${orders._id}`}></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListScreen;
