const Post = require("../model/Post");

const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name picture gender")
      .sort({ createdAt: "desc" });

    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
