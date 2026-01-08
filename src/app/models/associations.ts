import User from "./user.model";
import Post from "./post.model";
import Comment from "./comment.model";

Post.belongsTo(User, {
  foreignKey: "author",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "author",
});

Comment.belongsTo(Post, {
  foreignKey: "post",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post",
});

Comment.belongsTo(User, {
  foreignKey: "author",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "author",
});

export { User, Post, Comment };
