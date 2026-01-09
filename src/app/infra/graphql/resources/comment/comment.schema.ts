const commentTypes = `
  # Comment definition types
  type Comment {
   id: ID!
   text: String!
   post: Post!
   user: User!
  }

  input CreateCommentInput {
    text: String!
    post: Int!
    user: Int!
  }

  input UpdateCommentInput {
    text: String!
  }
`;

const commentQueries = `
  commentsByPost(post: ID!, page: Int, limit: Int): [ Comment! ]!
`;

const commentMutations = `
  createComment(input: CreateCommentInput!): Comment
  updateComment(id: ID!, input: UpdateCommentInput!): Comment
  deleteComment(id: ID!): Boolean
`;

export { commentMutations, commentQueries, commentTypes };

