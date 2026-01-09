import database from "../../../../config/database.config";
import Post from "../../../../models/post.model";
import User from "../../../../models/user.model";
import { errorHandle } from "../../../../utils";

export const userResolvers = {
  User: {
    posts: async (user: any, { page = 1, limit = 10 }: any) => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const posts = await Post.findAll({
        where: {
          author: user.get("id"),
        },
        offset: startIndex,
        limit: endIndex,
      });

      return posts;
    },
  },

  Query: {
    users: (_: any, { page = 1, limit = 30 }: any) => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return User.findAll({
        offset: startIndex,
        limit: endIndex,
        order: [["full_name", "ASC"]],
      }).catch(errorHandle);
    },
    user: (_: any, { id }: any) => {
      id = parseInt(id);
      return User.findByPk(id)
        .then((user) => {
          if (!user) {
            throw new Error(`Usuário com id ${id} não encontrado!`);
          }

          return user;
        })
        .catch(errorHandle)
    }
  },

  Mutation: {
    createUser: (_: any, { input }: any) => {
      return database
        .transaction(async (t) => {
          const { email } = input;
          const user = await User.findOne({
            where: {
              email,
            },
          });

          if (user)
            throw new Error("Usuário já cadastrado com e-mail informado!");

          return User.create(input, {
            transaction: t,
          });
        })
        .catch(errorHandle);
    },
    updateUser: (_: any, { id, input }: any) => {
      id = parseInt(id);

      return database
        .transaction(async (t) => {
          const user = await User.findByPk(id);

          if (!user)
            throw new Error(`Usuário com id ${id} não foi encontrado!`);

          return user.update(input, {
            transaction: t,
          });
        })
        .catch(errorHandle);
    },
    updateUserPassword: (_: any, { id, input }: any) => {
      id = parseInt(id);

      return database
        .transaction(async (t) => {
          const user = await User.findByPk(id);

          if (!user)
            throw new Error(`Usuário com id ${id} não foi encontrado!`);

          return user
            .update(input, {
              transaction: t,
            })
            .then((user: any) => !!user);
        })
        .catch(errorHandle);
    },
    deleteUser: (_: any, { id }: any) => {
      id = parseInt(id);

      return database
        .transaction(async (t) => {
          const user = await User.findByPk(id);

          if (!user)
            throw new Error(`Usuário com id ${id} não foi encontrado!`);

          return user
            .destroy({
              transaction: t,
            })
            .then((user: any) => !!user);
        })
        .catch(errorHandle);
    },
  },
};
