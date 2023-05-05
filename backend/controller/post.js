const Post = require("../model/Post");

const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
};
