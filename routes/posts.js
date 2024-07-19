import express from "express";
import sequelize from "../config/pg.db.js";
import Post from "../models/postModel.js";

const router = express.Router();

const syncDb = async () => {
  await sequelize.sync({ force: true });
  console.log("Database synchronized");
};

syncDb();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: authorization
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: The note text
 *         body:
 *           type: string
 *           description: Author of note
 *       example:
 *         title: Harry Potter
 *         body: "J. K. Rowling"
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts API (from PostgreSQL)
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: [Posts]
 *     summary: Returns all posts
 *     description: Returns all posts
 *     security:
 *       - ApiKeyAuth: [read,write]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 *       500:
 *         description: Server Error
 */

// Get all posts
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get the posts by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ""
 *     security:
 *       - ApiKeyAuth: [read,write]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Posts'
 *       404:
 *         description: The posts was not found
 *       500:
 *         description: Server Error
 */

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

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new posts
 *     description: Create a new posts
 *     security:
 *       - ApiKeyAuth: [read,write]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posts'
 *     responses:
 *       201:
 *         description: The Posts was successfully created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Posts'
 *       500:
 *         description: Server Error
 */

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

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete book
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description:
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       404:
 *         description: Book Not Found
 *       500:
 *         description: Server Error
 */

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
