import { get } from "env-var";

const nodeEnv = get("NODE_ENV").required().asString() || "development";

export const config = {
  nodeEnv,
  host: get("HOST").required().asString(),
  database: get("DATABASE").required().asString(),
  username: get("USERNAME").required().asString(),
  password: get("PASSWORD").required().asString(),
  dialect: get("DIALECT").required().asString(),
  port: get("PORT").required().asPortNumber(),
};
