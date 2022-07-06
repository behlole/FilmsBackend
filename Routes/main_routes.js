const routes = require('express').Router();
const jwt=require('jsonwebtoken');
const film_routes = require('./films_routes');
const auth_routes = require('./auth_routes');
const comment_routes = require('./comments_routes');
const {sendSuccessMessage, sendErrorMessage} = require("../Utils/ResponseModel");

function authentication_middleware(req, res,next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded) {
            next();
        }
    } catch (error) {
        return res.send(sendErrorMessage("Not Authorized"));
    }
}

routes.use('/films', film_routes);
routes.use('/comments', authentication_middleware, comment_routes);
routes.use('/auth', auth_routes);

routes.use('/**', (req, res) => {
    res.send(sendErrorMessage("No Route Found"));
})
module.exports = routes;