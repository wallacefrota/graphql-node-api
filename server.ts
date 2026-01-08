import app from "./src/app/";
import { config } from "./src/app/config";
import dbConnection from "./src/app/config/database.config";
import { Comment, Post, User } from "./src/app/models/associations";

async function startConnection() {
  try {
    await dbConnection.authenticate();
    await User.sync();
    await Post.sync();
    await Comment.sync();
    await dbConnection.sync();
  } catch (error) {
    throw error
  }
}

async function startServer() {
  try {
    await startConnection();

    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (error) {
    throw error;
  }
}

startServer().catch((error) => {
  console.error(error)
});
