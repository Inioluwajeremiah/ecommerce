import React, { useEffect, useState } from "react";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import Spinner from "./Spinner";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Meta from "./Meta";

const ProductsCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSldes, setTotalSlides] = useState(3);
  const [timeOut, settimeout] = useState(0);

  useEffect(() => {
    settimeout(
      setTimeout(() => {
        if (currentSlide <= 1) {
          setCurrentSlide(currentSlide + 1);
        } else if (currentSlide >= 2) {
          setCurrentSlide(0);
        }
      }, 5000)
    );
  }, [currentSlide, setCurrentSlide]);

  const handleNextSlide = () => {
    if (currentSlide <= 1) {
      clearTimeout(timeOut);
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide >= 2) {
      clearTimeout(timeOut);
      setCurrentSlide(0);
    }
  };
  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      clearTimeout(timeOut);
      setCurrentSlide(currentSlide - 1);
    }
    if (currentSlide === 0) {
      clearTimeout(timeOut);
      setCurrentSlide(2);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <h1>{error?.message || error?.error}</h1>
  ) : (
    <div className="relative w-full h-[16rem] mb-20 bg-white border overflow-hidden  ">
      <Meta title={"ShopHub Ng"} />
      <p className="absolute top-0 left-0 m-4 ">
        {currentSlide + 1} / {totalSldes}
      </p>
      <div className="max-w-[100%] flex flex-row  ">
        {products.map((product, index) => (
          <div
            key={index + 1}
            className={`absolute w-[70%]  ${
              index === currentSlide ? "right-0" : "-right-[100%]"
            }`}
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="h-[10rem] "
              />
            </div>
            <p>
              {index} {product.name}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handlePreviousSlide}
        className="absolute left-0 top-[50%] "
      >
        <FaChevronLeft />
      </button>
      <button onClick={handleNextSlide} className="absolute right-0 top-[50%]">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProductsCarousel;
