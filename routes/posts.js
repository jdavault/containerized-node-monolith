import express from "express";
import sequelize from "../config/pg.db.js";
import Post from "../models/postModel.js";

const router = express.Router();

const syncDb = async () => {
  await sequelize.sync({ force: true });
  console.log("Database synchronized");
};

syncDb();

// Create a new post
router.post("/api/posts", async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await Post.create({ title, body });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a post by ID
router.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post by ID
router.put("/api/posts/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (post) {
      post.title = title;
      post.body = body;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post by ID
router.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.status(204).json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
