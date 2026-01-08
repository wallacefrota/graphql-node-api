import { genSaltSync, hashSync } from "bcrypt";
import { CreateOptions, DataTypes } from "sequelize";
import dbConnection from "../config/database.config";

const User = dbConnection.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },
  },
  {
    tableName: "users",
    hooks: {
      beforeCreate: (user: any, options: CreateOptions): void => {
        const salt = genSaltSync(10);
        user.password = hashSync(user.password, salt);
      },
      beforeUpdate: (user: any, options: CreateOptions): void => {
        if (user.changed("password")) {
          const salt = genSaltSync(10);
          user.password = hashSync(user.password, salt);
        }
      },
    },
  }
);

export default User;
