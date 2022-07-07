const Joi = require('joi')

const filmSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    release_date: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    ticket_price: Joi.number().required(),
    country: Joi.string().required(),
    genre: Joi.array().required(),
    image_url: Joi.string().required(),
});

module.exports = filmSchema;