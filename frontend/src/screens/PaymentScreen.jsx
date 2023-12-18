import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import FormHeader from "../components/FormHeader";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymenMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress]);

  const handleSubmit = () => {
    dispatch(savePaymentMethod(paymenMethod));
    navigate("/placeorder");
  };

  return (
    <div className="w-[94%] max-w-[40rem] mx-auto border shadow-sm rounded-md mt-10 pb-4">
      <FormHeader />
      <CheckoutSteps step1 step2 step3 />

      <h1 className="text-center text-xl font-bold text-purple-700 py-2">
        Select Payment Method
      </h1>

      <div className="px-2">
        <input
          type="radio"
          value={"PayPal"}
          id="paypal"
          checked={paymenMethod === "PayPal"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="paypal">PayPal</label>
      </div>
      <div className="px-2">
        <input
          type="radio"
          id="credit_or_debit"
          placeholder="credit_or_debit"
          value={"Credit and Debit Cards"}
          checked={paymenMethod === "Credit and Debit Cards"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="credit_or_debit">Credit and Debit Cards</label>
      </div>
      <div className="px-2">
        <input
          type="radio"
          id="crypto"
          placeholder="crypto"
          value={"Crypto currency"}
          checked={paymenMethod === "Crypto currency"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="crypto">Crypto currency</label>
      </div>
      <button
        className="flex flex-row justify-center mx-auto px-5 py-2 bg-purple-900 rounded-md text-white mt-2"
        onClick={handleSubmit}
      >
        Proceed
      </button>
    </div>
  );
};

export default PaymentScreen;
