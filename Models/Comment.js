let mongoose = require('mongoose');
const {getFilms} = require("../Controllers/FilmController");

const commentSchema = mongoose.Schema(
    {
        name: {type: String, required: true, maxLength: 30},
        comment: {type: String, required: true, maxLength: 100},
        user_id: {type: String, required: true},
        film_id: {type: String, required: true},
    }
);
const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;

async function create(comment) {
    return await new Comment(comment).save();
}

async function getSingle(film_id) {
    return await Comment.find({film_id: film_id});
}

module.exports = {create, getSingle};