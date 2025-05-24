import {Router} from "express"
import { validateTokenMiddleware } from "../middleware/validateToken.middleware.js"
import { createPostController } from "../controllers/posts.controller.js"

export const postRoutes = Router()

postRoutes.post("",validateTokenMiddleware,createPostController)