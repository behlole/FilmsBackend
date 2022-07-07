let mongoose = require('mongoose');

const filmSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, maxLength: 30},
        description: {type: String, required: true, maxLength: 100},
        release_date: {type: String, required: true},
        rating: {type: Number, required: true},
        ticket_price: {type: Number, required: true},
        country: {type: String, required: true},
        genre: {
            type: Array, required: true
        },
        image_url: {type: String, required: true},
    }
);
const Film = mongoose.model('films', filmSchema);
module.exports = Film;

async function getAllFilms() {
    return await Film.find({});
}

async function create(film) {
    return await new Film({
        name: film.name,
        description: film.description,
        release_date: film.release_date,
        rating: film.rating,
        ticket_price: film.ticket_price,
        country: film.country,
        genre: film.genre,
        image_url: film.image_url
    }).save();
}

async function getSingle(name) {
    return await Film.find({name: name});
}

module.exports = {getAllFilms, create, getSingle};
