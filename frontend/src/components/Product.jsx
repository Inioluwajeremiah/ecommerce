import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Rating from "./Rating";

const Product = ({ item }) => {
  const price = item.price + item.price * 0.01;
  return (
    <div className="w-[300px] h-[300px] max-w-[300px] items-center justify-center p-2 m-4 shadow-lg border border-[#ddd]">
      <Link
        to={`/preview/${item._id}`}
        state={{
          id: item._id,
        }}
      >
        <div className="flex mx-auto h-28 w-full overflow-hidden items-center justify-center">
          <img src={item.image} alt={item.name} />
        </div>
        {/* <p className="mt-2">{item.name.slice(0, 20)}...</p> */}
        <p className="mt-2 leading-7 text-ellipsis overflow-hidden whitespace-nowrap">
          {item.name}
        </p>
        <p className="text-sm">{item.description.slice(0, 50)}...</p>
        <div className="flex flex-row flex-wrap  text-sm gap-x-2">
          <p>
            <s>{price.toFixed(2)}</s>
          </p>

          <p className="text-orange-500">-10%</p>
          <p className="text-green-500"> {price.toFixed(2)}</p>

          <div>
            <Rating rate={item.rating} count={item.numReviews + " reviews"} />
          </div>
        </div>
      </Link>

      <Link
        to={`/preview/${item.name + "-" + item._id}`}
        state={{
          itemData: item,
          id: item._id.toString(),
        }}
        className="bg-[#330066] text-white p-4 w-full mx-auto items-center justify-center rounded-sm flex flex-row gap-2"
      >
        Buy Now <AiOutlineShoppingCart />
      </Link>
    </div>
  );
};

export default Product;
