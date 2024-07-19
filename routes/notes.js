import express from "express";
import { Note } from "../models/noteModel.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: authorization
 *   schemas:
 *     Notes:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           description: The note text
 *         author:
 *           type: string
 *           description: Author of note
 *       example:
 *         title: Harry Potter
 *         author: "J. K. Rowling"
 */

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes API (from MongoDB)
 */

// /**
//  * @swagger
//  * /:
//  *   get:
//  *     tags: [General]
//  *     summary: This api is used to check if get method is working
//  *     description: This api is used to check if get method is working
//  *     responses:
//  *       200:
//  *         description: Success
//  */

// router.get("/", (req, res) => {
//   res.send("Welcome to booksDb -- <a href='http://localhost:3003/swagger'>http://localhost:3003/swagger<a>")
// })

/**
 * @swagger
 * /api/notes:
 *   get:
 *     tags: [Notes]
 *     summary: Returns all notes
 *     description: Returns all notes
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
 *                 $ref: '#/components/schemas/Notes (MongoDB'
 *       500:
 *         description: Server Error
 */

router.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      notes,
    });
    // res.status(200).json({
    //   message: ["Hello from notes", "Hello Again, from notes", "Once More"],
    // });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      status: "No records to fetch",
    });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get the notes by id
 *     tags: [Notes]
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
 *                $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Server Error
 */

router.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    return res.status(200).json({
      note,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
    });
  }
});

router.post("/api/notes", async (req, res) => {
  console.log(req.body);
  try {
    const note = await Note.create(req.body);

    return res.status(201).json({
      note,
    });
  } catch (e) {
    console.log(e);

    return res.status(400).json({
      status: "fail",
    });
  }
});

router.patch("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      note,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
    });
  }
});

router.delete("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    console.log(note);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({ status: "success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
    });
  }
});

export default router;
