import { useEffect, useState } from "react";
import Product from "../components/Product";
import TitleText from "../components/TitleText";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import { FaArrowLeft } from "react-icons/fa";
import ProductsCarousel from "../components/ProductsCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/v1/api/products")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       setItems(json);
  //     });
  // }, []);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  if (data && data.products) {
    console.log(data.products);
  }
  return (
    <section className="w-full mx-[auto] items-center px-8">
      <ProductsCarousel />
      {keyword && (
        <Link
          to={"/"}
          className="w-fit my-4 bg-green-700 text-white text-sm p-2 rounded-md flex flex-row items-center gap-2"
        >
          <FaArrowLeft /> Go back
        </Link>
      )}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <h1>{error?.message || error?.error}</h1>
      ) : (
        <>
          <TitleText title={"Latest product"} />
          <div className="flex flex-row flex-wrap items-center justify-center">
            {data.products.map((item, index) => (
              <Product key={index} item={item} />
            ))}
          </div>

          <PaginationComponent
            pages={data.pages}
            page={data.page}
            isAdmin={false}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </section>
  );
};

export default HomeScreen;
