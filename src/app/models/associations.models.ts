import User from "./user.model";
import Post from "./post.model";
import Comment from "./comment.model";

Post.belongsTo(User, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "author_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(User, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "author_id",
});

export { User, Post, Comment };
