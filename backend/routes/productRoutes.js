import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = express.Router();

// get all products
router.route("/").post(protect, admin, createProduct).get(getProducts);
router.get("/top", getTopProducts); // get top product
// get a product
router
  .get("/:id", getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

/*
or you can write comprehensively as 
router.route('/').get(getProducts)
router.route('/:id').get(getProduct)
*/

export default router;
