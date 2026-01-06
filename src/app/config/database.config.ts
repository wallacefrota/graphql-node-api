import { Dialect, Sequelize } from "sequelize";

import { config } from "./index";
const dbDialect = config.dialect as Dialect;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: dbDialect,
    logging: config.nodeEnv === "production" ? false : true,
  }
);

export default sequelize;
