import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import Rating from "../components/Rating";
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
} from "../slices/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Meta from "../components/Meta";

const ProductDetails = () => {
  const location = useLocation();
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = location.state;
  // get product details
  const {
    data: itemData,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id);

  console.log("param =>", param, id);

  const productId = id;

  if (itemData) {
    console.log("itemData => ", itemData);
  }

  // state variables
  const [quantityNeeded, setQtyNeeded] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(0);

  let price;
  if (!isLoading) {
    price = itemData.price + itemData.price * 0.01;
  }

  // create product review
  const [createReview, { isLoading: loadingReview }] =
    useCreateProductMutation();

  //  get user info
  const { userInfo } = useSelector((state) => state.auth);

  const AddToCart = () => {
    console.log("Add to cart at product details =>", itemData);
    dispatch(addToCart({ ...itemData, quantityNeeded }));
    navigate("/cart");
  };

  const handleSubmit = async () => {
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review added succesfully");
      setRating("");
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <h2>{error?.data?.message || error.error}</h2>
  ) : (
    <div className="mt-[80px] p-[4px] mx-[auto] max-w-[820px]">
      <Meta title={itemData.name} />
      <div className="w-full mx-[auto] border-[1px] border-[#ddd] p-2">
        <div className="flex flex-row flex-wrap items-center justify-center ">
          <img
            src={itemData.image}
            alt={itemData.title}
            className="h-[250px] w-[250px]"
          />
        </div>
      </div>

      <div className="p-4 items-center w-[500px] shadow-bg border mx-[auto] mt-4">
        <p className="py-2">Product Name: {itemData.name}</p>

        <p className="py-2 font-normal">
          {" "}
          Product Description: {itemData.description}
        </p>
        <p className="py-2">
          Quantity in stock:{" "}
          {itemData.countInStock > 0 ? itemData.countInStock : "Out of stock"}
        </p>
        <p className="py-2">
          Price Tag: <s>{itemData.price.toFixed(2)}</s>
        </p>
        <p className="py-2">
          Discount price tag:{" "}
          <span className="text-green-500">{price.toFixed(2)}</span>
        </p>
        <p className="py-2">
          Discount percentage:{" "}
          <span className="text-orange-500">{-10}% off</span>{" "}
        </p>

        <Rating
          rate={itemData.rating}
          count={itemData.numReviews + " reviews"}
        />

        {itemData && itemData.countInStock > 0 ? (
          <>
            <label>Quantity</label>
            <div className="flex w-[80%] flex-col">
              <input
                type="numer"
                placeholder="Number of quantity needed"
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-4 outline-none w-full"
                list="qty"
                value={quantityNeeded}
                onChange={(e) => setQtyNeeded(Number(e.target.value.trim()))}
              />
              <datalist id="qty">
                {itemData &&
                  [...Array(itemData.countInStock).keys()].map(
                    (item, index) => (
                      <option value={`${item + 1}`} key={index + 1}>
                        {item + 1}
                      </option>
                    )
                  )}
              </datalist>
            </div>
          </>
        ) : null}
        <div className="w-[300px] mx-[auto] flex items-center justify-center ">
          <button
            className={`${
              itemData.countInStock > 0 ? "bg-[#330066]" : "bg-[#72548f]"
            } p-2 text-white m-2 rounded-sm`}
            onClick={AddToCart}
            disabled={itemData.countInStock === 0}
          >
            {" "}
            Add to Cart
          </button>
          {/* <button className='bg-[#330066] p-2 text-white m-2' onClick={AddToCart}>Add to cart</button> */}
        </div>

        {/* reviews */}
        <div>
          <h1>Reviews</h1>
          {itemData.reviews.length === 0 && <h3>No Reviews</h3>}
          <div>
            {itemData.reviews.map((review, index) => (
              <div key={index}>
                <p>{review.name}</p> <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* write a reviee */}
        <div>
          <h2>Write a Customer Review</h2>
          {loadingReview && <Spinner />}

          {userInfo ? (
            <div>
              {" "}
              <div>
                <label htmlFor="ratinginput">Rating</label>
                <select name="ratinginput" id="ratinginput">
                  <option value="">--select rating--</option>
                  <option value="1">1</option>
                  <option value="2">3</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment">Comment</label>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="10"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button disabled={loadingReview} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          ) : (
            <h2>
              Please <Link to="/login">sign in</Link> to write areview
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
