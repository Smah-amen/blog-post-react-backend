const PostModel = require("../models/post");

const getPosts = async (req, res) => {
    const posts = await PostModel.find({});
    res.status(200).send(posts);
};

const setPost = async (req, res) => {
    const { id: userId } = req.user;
    await PostModel.create({ userId, ...req.body });
    res.status(201).send("Post Created");
};

const updatePost = async (req, res) => {
    const { id: postId } = req.params;
    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
        new: true,
    });
    if (updatedPost) res.send("Post updated");
    else res.status(404).send("no such post exists");
};

const deletePost = async (req, res) => {
    const { id: postId } = req.params;
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (deletedPost) res.send("Post deleted");
    else res.status(404).send("no such post exists");
};

module.exports = { getPosts, setPost, updatePost, deletePost };
