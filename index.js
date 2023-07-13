import express from "express";
import cors from "cors";
import router_users from "./src/routers/users.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Panggil routers
app.use("/api/v1", router_users);

// Panggil Image
app.use("/api/v1/image/", express.static("./public"))

app.listen(3001, () => console.log("Server running at http://localhost:3001"));
