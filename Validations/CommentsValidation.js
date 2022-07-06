const Joi = require('joi')

const userSchema = Joi.object({
    name: Joi.string().required(),
    comment: Joi.string().required(),
    film_id: Joi.string().required(),
    user_id: Joi.string().required(),
});

module.exports = userSchema;