import { Router } from "express";
import { PostController } from "../posts/post.controller.js";
import {
  validatePostId,
  validatePostBody,
  validateUpdateField,
} from "../middleware/validation.js";

const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);
postRouter.get("/:id", validatePostId, PostController.getPostById);
postRouter.post("/", validatePostBody, PostController.createPost);
postRouter.post("/fetch", PostController.fetchExternalPosts);
postRouter.delete("/delete/:id", validatePostId, PostController.deletePost);
postRouter.patch(
  "/update/:postId/field",
  validateUpdateField,
  PostController.updatePost
);

export default postRouter;
