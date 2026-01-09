import express from "express";
import graphqlServer from "./infra/graphql/schema";
const app = express();

app.use("/api/graphql", graphqlServer);

export default app;
