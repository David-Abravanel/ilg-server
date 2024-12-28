import axios from "axios";
import pool from "../config/database.js";
import Post from "../models/post.model.js";

export class PostService {
  static async create(userId, title, body) {
    try {
      const [result] = await pool.execute(
        "INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)",
        [userId, title, body]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  static async findAll() {
    try {
      const [rows] = await pool.execute("SELECT * FROM posts");
      return rows.map((row) => Post.fromDB(row));
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }

  static async updateField(postId, fieldName, value) {
    try {
      // console.log(`postId = ${postId}, fieldName = ${fieldName}, value = ${value}`);
      const [result] = await pool.execute(
        `UPDATE posts SET ${fieldName} = ? WHERE id = ?`,
        [value, postId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Post not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to update post field: ${error.message}`);
    }
  }

  static async deleteAll() {
    try {
      const [result] = await pool.execute("DELETE FROM posts");

      if (result.affectedRows === 0) {
        throw new Error("Post not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete post field: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute("SELECT * FROM posts WHERE id = ?", [
        id,
      ]);
      if (rows.length === 0) {
        return null;
      }
      return Post.fromDB(rows[0]);
    } catch (error) {
      throw new Error(`Failed to fetch post by ID: ${error.message}`);
    }
  }

  static async fetchAndStorePosts() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = response.data;

      for (const post of posts) {
        await this.create(post.userId, post.title, post.body);
      }
      return await this.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch and store posts: ${error.message}`);
    }
  }
}
