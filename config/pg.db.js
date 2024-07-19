import Sequelize from "sequelize";

const sequelize = new Sequelize("posts-db", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
