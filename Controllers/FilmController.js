const Film = require('../Models/Film');
const {create, getAllFilms, getSingle} = require('../Models/Film');
const {sendErrorMessage, sendSuccessMessage} = require("../Utils/ResponseModel");
const filmSchemaValidation = require("../Validations/filmValidation");


module.exports = {
    createFilm: async (req, res) => {

        try {
            req.body.image_url = req.file.path.split("\\").pop();
            req.body.genre = req.body.genre?.split(',');
            const Validation = filmSchemaValidation.validate(req.body);
            if (Validation.error) {
                return res.status(500).send(sendErrorMessage(Validation.error.message));
            }
            const film = await create(req.body);
            return res.status(200).send(sendSuccessMessage("Film Created", film))
        } catch (error) {
            return res.status(401).json({
                message: 'Error at Create Film !',
                error: error.message,
            })
        }
    },
    getSingleFilm: async (req, res) => {
        try {
            let film = await getSingle(req.params.name);
            if (!film || film.length == 0) {
                return res.status(500).send(sendErrorMessage("No Film Found"));
            } else {
                return res.send(sendSuccessMessage("Film Found", film));
            }
        } catch (error) {
            return res.status(500).send(sendErrorMessage(error.message));

        }
    },
    getFilms: async (req, res) => {
        try {
            let films = await getAllFilms();
            if (films.length < 1) {
                return res.status(500).send(sendErrorMessage("No Film Found"));
            } else {
                return res.send(sendSuccessMessage("Films found", films));
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error at Show All Films !',
                error: error.message,
            })
        }
    },
}
