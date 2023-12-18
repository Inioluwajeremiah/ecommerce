import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="px-2  border-b">
      <ul className="flex flex-row flex-wrap gap-x-3 ">
        <li>
          {step1 ? (
            <Link to={"/login"}>Sign In</Link>
          ) : (
            <span className="text-gray-500">Sign In</span>
          )}
        </li>
        <li>
          {step2 ? (
            <Link to={"/shipping"}>Shipping</Link>
          ) : (
            <span className="text-gray-500">Shipping</span>
          )}
        </li>
        <li>
          {step3 ? (
            <Link to={"/payment"}>Payment</Link>
          ) : (
            <span className="text-gray-500">Payment</span>
          )}
        </li>
        <li>
          {step4 ? (
            <Link to={"/placeorder"}>Place order</Link>
          ) : (
            <span className="text-gray-500">Place order</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
