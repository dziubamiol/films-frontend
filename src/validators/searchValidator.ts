import Joi  from '@hapi/joi';

const validator = Joi.object().keys({
    name: Joi.string()
        .regex(/^[A-Za-z]+$|^$/)
        .allow('')
        .optional()
        .messages({
            "string.pattern.base": "Alphabetic characters only",
        }),
    actor: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .allow('')
        .optional()
        .messages({
            "string.pattern.base": "Alphabetic characters only",
        })
});

export default validator;
