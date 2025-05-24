import "dotenv/config"
import express from "express";
import { userRoutes } from "./routes/user.routes.js";
import { loginRoutes } from "./routes/login.routes.js";
import { postRoutes } from "./routes/posts.routes.js";

const app = express()


app.use(express.json())
app.use("/user",userRoutes)
app.use("/login",loginRoutes)
app.use("/posts",postRoutes)

export default app