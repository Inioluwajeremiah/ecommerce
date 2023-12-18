import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ rate, count }) => {
  return (
    <div className="flex flex-row items-center">
      <span className=" text-yellow-600">
        {rate >= 1 ? (
          <FaStar />
        ) : rate >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className=" text-yellow-600">
        {rate >= 2 ? (
          <FaStar />
        ) : rate >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className=" text-yellow-600">
        {rate >= 3 ? (
          <FaStar />
        ) : rate >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className=" text-yellow-600">
        {rate >= 4 ? (
          <FaStar />
        ) : rate >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="  text-yellow-600">
        {rate >= 5 ? (
          <FaStar />
        ) : rate >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="ml-2">{count && count}</span>
    </div>
  );
};

export default Rating;
