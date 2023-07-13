import express from "express";
import { createUser, detailUser, updateUser, deleteUser, allUsers } from "../controllers/users.js";
import uploadImage from "../middleware/users.js";

const Router = express.Router();

Router.post("/users", uploadImage, createUser);
Router.get("/user/:id", detailUser);
Router.get("/users", allUsers);
Router.patch("/user/:id", updateUser);
Router.delete("/user/:id", deleteUser);

export default Router;
