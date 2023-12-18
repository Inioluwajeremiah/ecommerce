import { useState } from "react";
import Spinner from "../components/Spinner";
import FormHeader from "../components/FormHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddres } from "../slices/cartSlice";
import CheckoutSteps from "./CheckoutSteps";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setpostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddres({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div className="w-[94%] max-w-[40rem] mx-auto border shadow-sm rounded-md mt-10">
      <FormHeader />
      <CheckoutSteps step1 step2 />

      <h1 className="text-center text-xl font-bold text-purple-700">
        Shipping Details
      </h1>

      <div className="px-2">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Address"
          value={address}
          id="address"
          className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="px-2">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          placeholder="City"
          value={city}
          className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="px-2">
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          placeholder="Postal Code"
          value={postalCode}
          className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
          onChange={(e) => setpostalCode(e.target.value)}
        />
      </div>
      <div className="px-2">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          placeholder="Country"
          value={country}
          className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <button
        className="flex flex-row justify-center mx-auto px-5 py-2 bg-purple-900 rounded-md text-white"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default ShippingScreen;
