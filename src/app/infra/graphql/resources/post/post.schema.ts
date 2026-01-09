const postTypes = `
  # Post definition types
  type Post {
    id: ID!
    title: String!
    content: String!
    photo: String!
    author: User!
    comments(page: Int, limit: Int): [ Comment! ]!
  }

  input PostCreateInput {
    title: String!
    content: String!
    photo: String!
    author: Int!
  }

  input PostUpdateInput {
    title: String!
    content: String!
    photo: String!
  }
`;

const postQueries = `
  posts(page: Int!, limit: Int!): [ Post! ]!
  post(id: ID!): Post!
`;

const postMutations = `
  createPost(input: PostCreateInput!): Post
  updatePost(id: ID!, input: PostUpdateInput!): Post
  deletePost(id: ID!, input: PostUpdateInput!): Boolean
`;

export { postMutations, postQueries, postTypes };

