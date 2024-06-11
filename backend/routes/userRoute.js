import express from "express";
import {
  AddUser,
  DeleteUser,
  GetUserById,
  GetUsers,
  UpdateUser,
} from "../controllers/user.js";

const router = express.Router();

// Route for saving a new user
router.post("/", AddUser);

//Route to Get all users
router.get("/", GetUsers);

// Route to get a user by id
router.get("/:id", GetUserById);

// Route to update a user
router.put("/:id", UpdateUser);

//Route to delete a user
router.delete("/:id", DeleteUser);

export default router;
