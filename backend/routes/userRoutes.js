import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserById,
  deleteUser,
  updateUserById,
  getUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleWare.js";
const router = express.Router();

// register user
router.route("/").post(registerUser).get(protect, admin, getUsers);

// login user
router.post("/login", loginUser);

// logout user
router.post("/logout", logoutUser);

//  user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)
  .delete(protect, admin, deleteUser);

/*
or you can write comprehensively as 
router.route('/').get(getProducts)
router.route('/:id').get(getProduct)
*/

export default router;
