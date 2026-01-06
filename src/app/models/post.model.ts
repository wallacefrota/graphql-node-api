import { DataTypes } from "sequelize";
import dbConnection from "../config/database.config";

const Post = dbConnection.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    photo: DataTypes.STRING,
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
  }
);

export default Post;
