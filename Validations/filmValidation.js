const Joi = require('joi')

const filmSchema = Joi.object({
    name: Joi.string().max(30).required(),
    description: Joi.string().max(100).required(),
    release_date: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    ticket_price: Joi.number().required(),
    country: Joi.string().required(),
    genre: Joi.array().required(),
    image_url: Joi.string().required(),
});

module.exports = filmSchema;