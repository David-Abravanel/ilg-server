// src/controllers/PostController.js
import { PostService } from "./post.service.js";

export class PostController {
  static async getAllPosts(req, res, next) {
    try {
      const posts = await PostService.findAll();
      res.json({
        status: "success",
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const post = await PostService.findById(req.params.id);
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }
      res.json({
        status: "success",
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      const { userId, title, body } = req.body;
      const postId = await PostService.create(userId, title, body);
      res.status(201).json({
        status: "success",
        data: { id: postId },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const { postId } = req.params;
      const { field, value } = req.body;
      const result = await PostService.updateField(postId, field, value);
      res.status(201).json({
        status: result ? "success" : result,
        message: `Successfully update post ${postId}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const result = await PostService.deleteField(id);
      res.status(201).json({
        status: result ? "success" : result,
        message: `Successfully delete post ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchExternalPosts(req, res, next) {
    try {
      const count = await PostService.fetchAndStorePosts();
      res.json({
        status: "success",
        message: `Successfully imported ${count} posts`,
      });
    } catch (error) {
      next(error);
    }
  }
}
