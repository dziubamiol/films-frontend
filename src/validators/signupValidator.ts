import Joi from '@hapi/joi';

const validator = Joi.object().keys({
    username: Joi.string()
        .required()
        .alphanum()
        .messages({
            "any.required": "Username is required",
            "string.alphanum": "Only alphanumeric characters"
        }),
    password: Joi.string()
        .required()
        .min(8)
        .max(16)
        .messages({
            "any.required": "Password is required",
            "string.min": "Should contain at least 8 characters",
            "string.max": "Should contain less then 16 characters"
        })
});

export default validator;
