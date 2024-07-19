import { DataTypes } from "sequelize";
import sequelize from "../config/pg.db.js";

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Post;
