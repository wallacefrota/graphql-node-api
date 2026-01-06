import express from "express";
const app = express();
import graphqlServer from "./infra/graphql/server";

app.use("/api/graphql", graphqlServer);

export default app;
