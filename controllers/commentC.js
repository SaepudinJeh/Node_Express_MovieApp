const { ObjectId } = require('bson');
const createError = require('http-errors');

const { Comment } = require('../models');
const { dbCon } = require('../configuration');

const postComment = (req, res, next) => {

    if (!ObjectId.isValid(req.params.movieId)) {
        return next(createError(400));
    };

    const error = Comment.validate(req.body['text']);
    if (error) {
        return next(error);
    };

    const commentData = { text: req.body['text']};
    commentData.userId = new ObjectId(req.user['_id']);
    commentData.username = req.user['username'];
    commentData.movieId = new ObjectId(req.params['movieId']);

    const comment = new Comment(commentData);
    console.log(comment);
    comment.save()
    .then(() => {
        res.status(201).json({
            message: "the comments has been successfully created"
        })
    })
    .catch(err => next(createError(500)));
};

const putComment = (req, res, next) => {

    if (!ObjectId.isValid(req.params.commentId)) {
        return next(createError(400));
    };

    const commentId = new ObjectId(req.params.commentId);

    const error = Comment.validate(req.body['text']);
    if (error) {
        return next(error);
    };

    Comment.edit(commentId, req.body['text'])
        .then(() => {
            res.json({
                message: "done"
            })
        })
        .catch(err => next(createError(500)))
};

const deleteComment = (req, res, next) => {
    
    if (!ObjectId.isValid(req.params.movieId)) {
        return next(createError(400));
    };
    const commentId = new ObjectId(req.params.commentId);

    Comment.edit(commentId)
        .then(() => {
            res.json({
                message: "done"
            })
        })
        .catch(err => next(createError(500)))
};

const getComment = (req, res, next) => {
    if (!ObjectId.isValid(req.params.movieId)) {
        return next(createError(400));
    };
    const movieId = new ObjectId(req.params.movieId);

    const pageNum = parseInt(req.params.page);
    if (isNaN(pageNum)) {
        return next(createError(400))
    };

    const commentsToSkip = pageNum * 10;

    dbCon('comments', async(db) => {
        try {
            const comments = await db.find({movieId})
            .sort({createAt:-1})
            .skip(commentsToSkip)
            .limit(10)
            .toArray();
    
            res.json(comments)
        } catch (err) {
            next(createError(500));
        }
    });
};

module.exports = {
    postComment,
    putComment,
    deleteComment,
    getComment
};