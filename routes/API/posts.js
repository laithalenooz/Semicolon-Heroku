const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route     GET api/posts
// @desc      Get all posts
// @access    public
router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find({post: res.data}).sort({date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     GET api/posts
// @desc      Get all posts
// @access    public
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({user: req.user.id}).sort({date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/posts
// @desc      Add new posts
// @access    public
router.post('/', auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {title, description, image, type} = req.body;

    try {

        const image = gravatar.url(title, {
            s: '200',
            r: 'pg',
            d: 'retro'
        });
        const newPost = new Post({title,
        description,
        image,
        type,
        user: req.user.id});

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
    }
});

// @route     PUT api/posts/:id
// @desc      Update posts
// @access    public
router.put('/:id', auth, async (req, res) => {
    const {title, description, image, type} = req.body;

    // Build post object
    const postFields = {};
    if(title) postFields.title = title;
    if(description) postFields.description = description;
    if(type) postFields.type = type;
    if(image) postFields.image = image;

    try {
        let post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({msg: 'Post not found'});

        // Make sure user owns the post
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        post = await Post.findByIdAndUpdate(
            req.params.id,
            {$set: postFields},
            {new: true});

        res.json(post);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

// @route     DELETE api/posts/:id
// @desc      Delete posts
// @access    public
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({msg: 'Post not found'});

        // Make sure user owns the post
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        await Post.findByIdAndRemove(req.params.id);

        res.json({msg: 'Post Removed'});
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
});

module.exports = router;