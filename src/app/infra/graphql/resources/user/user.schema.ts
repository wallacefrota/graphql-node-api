const userTypes = `
  # User definition types
  type User {
    id: ID!
    full_name: String!
    password: String
    email: String!
    posts(page: Int, limit: Int): [ Post! ]!
  }

  input UserCreateInput {
    full_name: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    full_name: String
    email: String
  }

  input UserUpdatePasswordInput {
    password: String!
  }
`;
const userQueries = `
  users(page: Int, limit: Int): [ User! ]!
  user(id: ID!): User
`;

const userMutations = `
  createUser(input: UserCreateInput!): User
  updateUser(id: ID!, input: UserUpdateInput!): User
  updateUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
  deleteUser(id: ID!): Boolean
`;
export { userMutations, userQueries, userTypes };

