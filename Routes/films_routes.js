const router = require('express').Router();
const films_controller = require('../Controllers/FilmController');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({storage: storage});

router.get('/', films_controller.getFilms);
router.get('/:name', films_controller.getSingleFilm);

router.post('/', upload.single('image_url'), films_controller.createFilm);


module.exports = router