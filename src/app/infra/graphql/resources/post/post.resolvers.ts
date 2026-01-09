import database from "../../../../config/database.config";
import Comment from "../../../../models/comment.model";
import Post from "../../../../models/post.model";
import User from "../../../../models/user.model";
import { errorHandle } from "../../../../utils";

export const postResolvers = {
  Post: {
    author: (post: any) => {
      return User.findByPk(post.get("author"));
    },
    comments: async (post: any, { page, limit }: any) => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const comments = await Comment.findAll({
        where: {
          post: post.get("id"),
        },
        offset: startIndex,
        limit: endIndex,
      });

      return comments;
    },
  },

  Query: {
    posts: (_: any, { page = 1, limit = 30 }: any) => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return Post.findAll({
        offset: startIndex,
        limit: endIndex,
      }).catch(errorHandle);
    },
    post: (_: any, { id }: any) => {
      id = parseInt(id);
      return Post.findByPk(id)
        .then((post) => {
          if (!post) throw new Error(`Post com id ${id} não foi encontrado!`);

          return post;
        })
        .catch(errorHandle);
    },
  },

  Mutation: {
    createPost: (_: any, { input }: any) => {
      return database
        .transaction((t) => {
          return Post.create(input, {
            transaction: t,
          });
        })
        .catch(errorHandle);
    },
    updatePost: (_: any, { id, input }: any) => {
      id = parseInt(id);
      return database
        .transaction(async (t) => {
          const post = await Post.findByPk(id);
          if (!post) throw new Error(`Post com id ${id} não foi encontrado!`);

          return post.update(input, {
            transaction: t,
          });
        })
        .catch(errorHandle);
    },
    deletePost: (_: any, { id }: any) => {
      id = parseInt(id);
      return database
        .transaction(async (t) => {
          const post = await Post.findByPk(id);
          if (!post) throw new Error(`Post com id ${id} não foi encontrado!`);

          return post
            .destroy({
              transaction: t,
            })
            .then((post: any) => !!post);
        })
        .catch(errorHandle);
    },
  },
};
