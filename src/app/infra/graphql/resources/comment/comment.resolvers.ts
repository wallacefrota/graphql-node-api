import database from "../../../../config/database.config";
import CommentModel from "../../../../models/comment.model";
import Post from "../../../../models/post.model";
import User from "../../../../models/user.model";
import { errorHandle } from "../../../../utils";

export const commentResolvers = {
  // resolvers not trivial
  Comment: {
    post: (comment: any) => {
      return Post.findByPk(comment.get("post"));
    },
    user: (comment: any) => {
      return User.findByPk(comment.get("user"));
    },
  },

  Query: {
    commentsByPost: (_: any, { post, page = 1, limit = 15 }: any) => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return CommentModel.findAll({
        where: {
          post,
        },
        offset: startIndex,
        limit: endIndex,
      }).catch(errorHandle);
    },
  },

  Mutation: {
    createComment: (_: any, { input }: any) => {
      return database
        .transaction((t) => {
          return CommentModel.create(input, {
            transaction: t,
          });
        })
        .catch(errorHandle);
    },
    updateComment: (_: any, { id, input }: any) => {
      id = parseInt(id);
      return database
        .transaction(async (t) => {
          const comment = await CommentModel.findByPk(id);

          if (!comment)
            throw new Error(`Comentário com id ${id} não foi encontrado!`);

          return comment.update(input, {
            transaction: t,
          });
        })
        .catch(errorHandle);
    },
    deleteComment: (_: any, { id }: any) => {
      id = parseInt(id);
      return database
        .transaction(async (t) => {
          const comment = await CommentModel.findByPk(id);

          if (!comment)
            throw new Error(`Comentário com id ${id} não foi encontrado!`);

          return comment
            .destroy({
              transaction: t,
            })
            .then((comment: any) => !!comment);
        })
        .catch(errorHandle);
    },
  },
};
