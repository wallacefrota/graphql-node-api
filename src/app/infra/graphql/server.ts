import { createSchema, createYoga } from "graphql-yoga";

import { config } from "../../config";

const users = [
  {
    id: 1,
    fullName: "Alice Silva",
    email: "alice@domain.com",
  },
  {
    id: 2,
    fullName: "Bruno Costa",
    email: "bruno@domain.com",
  },
  {
    id: 3,
    fullName: "Carla Mendes",
    email: "carla@domain.com",
  },
];

const posts = [
  {
    id: 1,
    title: "Introdução ao GraphQL",
    content: "GraphQL é uma linguagem de consulta para APIs...",
    authorId: 1,
  },
  {
    id: 2,
    title: "Node.js para iniciantes",
    content: "Node.js permite rodar JavaScript no servidor...",
    authorId: 2,
  },
  {
    id: 3,
    title: "Boas práticas em APIs REST",
    content: "Organizar rotas e validar dados é essencial...",
    authorId: 1,
  },
];

const comments = [
  {
    id: 1,
    text: "Ótimo artigo, me ajudou bastante!",
    authorId: 3,
    postId: 1,
  },
  {
    id: 2,
    text: "Muito claro e objetivo, parabéns!",
    authorId: 1,
    postId: 2,
  },
  {
    id: 3,
    text: "Gostei das dicas de validação.",
    authorId: 2,
    postId: 3,
  },
  {
    id: 4,
    text: "Gostei muito",
    authorId: 2,
    postId: 3,
  },
];

const typeDefs = `
  type User {
    id: ID!
    fullName: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(fullName: String!, email: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
    comments: () => comments,
  },
  Mutation: {
    // parent, args
    createUser: (_: any, { fullName, email }: any) => {
      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        fullName,
        email,
      };
      users.push(newUser);
      return newUser;
    },
  },
  User: {
    posts: (parent: any) => posts.filter((p) => p.authorId === parent.id),
  },
  Post: {
    author: (parent: any) => users.find((u) => u.id === parent.authorId),
    comments: (parent: any) => comments.filter((c) => c.postId === parent.id),
  },
  Comment: {
    author: (parent: any) => users.find((u) => u.id === parent.authorId),
    post: (parent: any) => posts.find((p) => p.id === parent.postId),
  },
};

const schema = createSchema({ typeDefs, resolvers });

const server = createYoga({
  schema,
  graphiql: config.nodeEnv === "production" ? false : true,
});

export default server;
