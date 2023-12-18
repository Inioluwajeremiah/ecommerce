import {
  addOrderItems,
  getUserOrder,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import express from "express";
import { admin, protect } from "../middleware/authMiddleWare.js";
const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getUserOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

/*
or you can write comprehensively as 
router.route('/').get(getProducts)
router.route('/:id').get(getProduct)
*/

export default router;
