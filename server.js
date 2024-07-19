import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import morgan from "morgan";
import mongoose from "mongoose";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import booksRouter from "./routes/books.js";
import userRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";
import postRouter from "./routes/posts.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
//const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/notes-db`;

const adapter = new JSONFile("./config/db.json");
const defaultData = { books: [], users: [] };
const db = new Low(adapter, defaultData);
await db.read();
const app = express();
app.db = db;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use(booksRouter);
app.use(userRouter);
app.use(notesRouter);
app.use(postRouter);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Interview Prep API Explorer",
      description: "Sandbox Instance for Validating Authenitication",
      version: "1.0.1",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/api", async (req, res) => {
  try {
    const message = { message: "Books and Users API" };
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status("500").send(error.message);
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`succesfully connected to DB: ${process.env.mongoURI}`);
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
