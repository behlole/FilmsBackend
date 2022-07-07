const {sendErrorMessage, sendSuccessMessage} = require("../Utils/ResponseModel");
const commentsSchemaValidation = require("../Validations/CommentsValidation");
const {create, getSingle} = require('../Models/Comment');

module.exports = {
    createComment: async (req, res) => {
        try {
            const Validation = commentsSchemaValidation.validate(req.body);
            if (Validation.error) {
                return res.status(500).send(sendErrorMessage(Validation.error.message));
            }
            const comment = await create(req.body)
            return res.send(sendSuccessMessage("Comment Added", comment));
        } catch (error) {
            res.status(500).send(sendErrorMessage(error.message));
        }
    },
    getComments: async (req, res) => {
        try {
            const comment = await getSingle(req.body.film_id)
            return res.status(200).send(sendSuccessMessage("Comment Fetched", comment));
        } catch (e) {
            return res.status(500).send(sendErrorMessage(e.message));
        }

    }
}