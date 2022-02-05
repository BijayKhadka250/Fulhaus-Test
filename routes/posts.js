const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Post = require('../models/Post');

// get a post
router.get('/', async (req, res) => {
    console.log("req",req.query);
    // console.log("res header", response.headers['content-encoding']);
    let regex = new RegExp(req.query.search,'i')
    try{
        const count = await Post.find({acronym: regex}).count()
        console.log("count",count);
         
        const posts = await Post.find({acronym: regex}).sort( { _id: 1 } ).skip(req.query.page > 0 && req.query.limit? ( ( req.query.page - 1 ) * req.query.limit ) : 0).limit(req.query.limit);
        // console.log("posts",posts);
        console.log("count of posts", posts.length);
        res.json({posts, hasMore: (count >= req.query.limit * req.query.page) ? (count - req.query.limit * req.query.page): 0})
    }
    catch(err){
        console.log("err",err);
        res.json({message: err})
    }
})

// submit a post
router.post('/', async(req,res) => {
    const post = new Post({
        acronym: req.body.acronym,
        definition: req.body.definition
    })
    try{
        const savedPost = await post.save();
        res.json(savedPost)
    }catch(err){
        res.json(err)
    }
    
})


// Delete Post
router.delete('/:postId', async (req,res) => {
    try{
    const removedPost = await Post.remove({_id: req.params.postId})
    res.json(removedPost)
}catch(err){
    res.json({message: err})
}
})

// Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {acronym: req.body.acronym}}
        );
        res.json(updatedPost)
    }catch(err){
        res.json({message: err})
    }
})
module.exports = router