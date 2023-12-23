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
import checkObjectId from "../middleware/checkObjectId.js";
const router = express.Router();

// get all products
router.route("/").post(protect, admin, createProduct).get(getProducts);
router.get("/top", getTopProducts); // get top product
// get a product
router
  .get("/:id", checkObjectId, getProduct)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

/*
or you can write comprehensively as 
router.route('/').get(getProducts)
router.route('/:id').get(getProduct)
*/

export default router;
