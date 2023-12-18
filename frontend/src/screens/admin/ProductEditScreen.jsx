import { useEffect, useState } from "react";
import {
  useGetProductDetailsQuery,
  useUpdateProductsMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  // navigate instance
  const navigate = useNavigate();
  // get product detail query
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // update product mutation
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductsMutation();

  // upload product image mutation
  const [uploadProductImage, { isLoading: loadingUploadImage }] =
    useUploadProductImageMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  // handle submit button
  const handleSubmit = async () => {
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
      refetch();
      navigate("/admin/produclist");
    }
  };

  const handleUploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/productList">Go back</Link>

      <div>
        <h1>Edit Product</h1>
        {loadingUpdate && <Spinner />}
        {loadingUploadImage && <Spinner />}

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <h1>{error?.data?.message || error.error}</h1>
        ) : (
          <div className="w-full md:w-3/5">
            <div className="px-2">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                placeholder="Name"
                value={name}
                id="name"
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="px-2">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                placeholder="Price"
                value={price}
                id="price"
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* input image */}
            <div className="px-2">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                placeholder="image"
                value={image}
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="file"
                accept="image/jpg, image/png"
                id=""
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={handleUploadImage}
              />
            </div>

            <div className="px-2">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                placeholder="brand"
                value={brand}
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="px-2">
              <label htmlFor="count_in_stock">Count in Stock</label>
              <input
                type="number"
                id="count_in_stock"
                placeholder="Count in Stock"
                value={countInStock}
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="px-2">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                placeholder="category"
                value={category}
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="px-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="description"
                value={description}
                className="border-solid rounded-sm border-[1px] border-[#ddd] mb-4 p-2 outline-none w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="flex flex-row justify-center mx-auto px-5 py-2 bg-purple-900 rounded-md text-white"
              onClick={handleSubmit}
            >
              Update
            </button>

            {loadingUpdate && <Spinner />}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductEditScreen;
