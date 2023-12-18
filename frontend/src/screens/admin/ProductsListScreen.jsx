import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/PaginationComponent";

const ProductsListScreen = () => {
  const { pageNumber } = useParams();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const handleCreateProduct = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product deleted");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <div className="px-2">
      <div className="flex flex-row  justify-between my-4">
        <h1 className="font-bold text-xl">Products</h1>
        <button
          className="bg-green-700 p-2 rounded-md text-white text-sm"
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
      </div>
      {loadingCreate && <Spinner />}
      {loadingDelete && <Spinner />}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <h1>{error?.data?.message || error.error}</h1>
      ) : (
        <div className="overflow-x-scroll">
          <table className="text-sm ">
            <thead>
              <tr className=" border border-collapse p-2">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product, index) => (
                <tr key={index} className=" border-collapse border px-2">
                  <td className="[15%] p-1">{product._id}</td>
                  <td className="w-[15%] p-1">{product.name}</td>
                  <td className="w-[15%] p-1">{product.price}</td>
                  <td className="w-[15%] p-1">{product.category}</td>
                  <td className="w-[15%] p-1">{product.brand}</td>
                  <td className="w-[15%] p-1 flex flex-row gap-x-2 items-center ">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <FaEdit className=" text-yellow-500" />
                    </Link>
                    <button onClick={() => handleDeleteProduct(product._id)}>
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationComponent
            pages={data.pages}
            page={data.page}
            isAdmin={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsListScreen;
