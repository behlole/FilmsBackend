const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createUser, getSingleUser} = require("../Models/User");
const joi = require("joi");
const userSchemaValidation = require("../Validations/UserValidation");
const {sendErrorMessage, sendSuccessMessage} = require("../Utils/ResponseModel");


module.exports = {
    register: async (req, res) => {
        try {
            const Validation = userSchemaValidation.validate(req.body);
            if (Validation.error) {
                return res.send(sendErrorMessage(Validation.error.message));
            }
            await bcrypt.hash(req.body.password, 8, async (err, hash) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Error at Bcrypt !',
                        error: err,
                    })
                } else {
                    try {
                        req.body.password = hash;
                        const user = await createUser(req.body);
                        return res.send(sendSuccessMessage("User Registered", user));
                    } catch (e) {
                        return res.status(500).send(sendErrorMessage(e.message));
                    }
                }
            });
        } catch (error) {
            return res.status(500).send(sendErrorMessage(e.message));
        }
    },
    login: async (req, res) => {
        try {
            const user = await getSingleUser(req.body.email)
            console.log(user);
            if (!user) {
                return res.send(sendErrorMessage("No User Found"), 402);
            } else {
                const Validation = userSchemaValidation.validate(req.body);
                if (Validation.error) {
                    return res.status(500).send(sendErrorMessage(Validation.error.message));
                }
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).send(sendErrorMessage("Incorrect Password"));
                    } else {

                        /**
                         * Token Generation
                         * @type {*}
                         */
                            // let secret =;
                        const token = jwt.sign({email: req.body.email}, process.env.SECRET, {expiresIn: '1h'})
                        result.token = token;
                        return res.send(sendSuccessMessage("Login Successfully", token));
                    }
                });
            }
        } catch (error) {
            return res.status(500).send(sendErrorMessage(error.message), 401);
        }
    },
}