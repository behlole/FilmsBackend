const {sendErrorMessage, sendSuccessMessage} = require("../Utils/ResponseModel");
const commentsSchemaValidation = require("../Validations/CommentsValidation");
const create = require('../Models/Comment');

module.exports = {
    createComment: async (req, res) => {
        try {
            const Validation = commentsSchemaValidation.validate(req.body);
            if (Validation.error) {
                return res.send(sendErrorMessage(Validation.error.message));
            }
            const comment = await create(req.body)
            return res.send(sendSuccessMessage("Comment Added", comment));
        } catch (error) {
            res.send(sendErrorMessage(error.message));
        }
    },
}